/**
 * tether's widget relay: wakes someone's tether widget so it draws what was just thrown
 * at them.
 *
 * A widget is only redrawn on time by a push from Apple, and only a server holding the
 * push key can ask Apple for one. The app posts the widget's address — its push tokens,
 * and whether it's a development build — and this sends each token a "content changed"
 * widget push. It's told nothing else (no letter, no name) and keeps nothing.
 *
 * POST /.netlify/functions/widget-push  {"tokens": ["<hex>", …], "sandbox": true|false}
 *
 * Environment: APNS_KEY_ID, APNS_TEAM_ID, APNS_KEY_B64 (the .p8, base64, as a secret).
 */
import crypto from 'node:crypto';
import http2 from 'node:http2';

const TOPIC = 'com.ashwinn.tether.push-type.widgets';
const MAX_TOKENS = 8;

// Apple takes the same signed token for up to an hour; signing one per push wastes time.
let signed = { token: null, at: 0 };

const base64url = (data) =>
  Buffer.from(data).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

function providerToken() {
  const now = Math.floor(Date.now() / 1000);
  if (signed.token && now - signed.at < 45 * 60) return signed.token;
  const header = base64url(JSON.stringify({ alg: 'ES256', kid: process.env.APNS_KEY_ID }));
  const claims = base64url(JSON.stringify({ iss: process.env.APNS_TEAM_ID, iat: now }));
  const key = crypto.createPrivateKey(Buffer.from(process.env.APNS_KEY_B64, 'base64').toString('utf8'));
  const signature = crypto.sign('sha256', Buffer.from(`${header}.${claims}`), { key, dsaEncoding: 'ieee-p1363' });
  signed = { token: `${header}.${claims}.${base64url(signature)}`, at: now };
  return signed.token;
}

function send(client, token) {
  return new Promise((resolve) => {
    const request = client.request({
      ':method': 'POST',
      ':path': `/3/device/${token}`,
      authorization: `bearer ${providerToken()}`,
      'apns-push-type': 'widgets',
      'apns-topic': TOPIC,
      'content-type': 'application/json',
    });
    let status = 0;
    let reply = '';
    request.on('response', (headers) => { status = headers[':status']; });
    request.on('data', (chunk) => { reply += chunk; });
    request.on('end', () => resolve({ status, reason: reply ? JSON.parse(reply).reason : undefined }));
    request.on('error', (error) => resolve({ status: 0, reason: error.message }));
    request.end(JSON.stringify({ aps: { 'content-changed': true } }));
  });
}

export default async (request) => {
  if (request.method !== 'POST') return new Response('POST only', { status: 405 });
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response('Expected JSON', { status: 400 });
  }
  const tokens = (Array.isArray(body?.tokens) ? body.tokens : [])
    .filter((token) => typeof token === 'string' && /^[0-9a-f]{64,256}$/.test(token))
    .slice(0, MAX_TOKENS);
  if (tokens.length === 0) return new Response('No widget tokens', { status: 400 });

  const host = body.sandbox === true ? 'https://api.sandbox.push.apple.com' : 'https://api.push.apple.com';
  const client = http2.connect(host);
  client.on('error', () => {});
  try {
    const results = await Promise.all(tokens.map((token) => send(client, token)));
    return Response.json({ results });
  } finally {
    client.close();
  }
};
