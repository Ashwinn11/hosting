/**
 * Local, repeatable image pipeline (run with: node scripts/images.mjs).
 * Outputs are committed to public/ — this is NOT part of the Netlify build,
 * so no build-time image dependency is required.
 *
 *   1. Compresses oversized app-icon PNGs (resize ≤512px + recompress).
 *   2. Generates a per-app social-share image at public/og/<id>.png (1200×630).
 *
 * Requires the `sharp` devDependency.
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, '..', 'public');
const OG_DIR = path.join(PUBLIC, 'og');
fs.mkdirSync(OG_DIR, { recursive: true });

// Presentation data (mirrors src/config/apps.ts for display only).
// `headline` is the emotional hook (#18) — the OG image is the thumbnail (#5),
// so it leads with the hook, NOT the SEO category tagline.
const apps = [
  { id: 'gutpal',    name: 'GutPal',      headline: 'Know what to eat. Without wrecking your gut.', primary: '#d97757', bg: '#f4ede2' },
  { id: 'masterly',  name: 'Masterly AI', headline: 'Your phone stays locked until you pass the quiz.', primary: '#2D4F1E', bg: '#FDFBF7' },
  { id: 'honestly',  name: 'Honestly',    headline: "Don't start your day on someone else's feed.", primary: '#E07B39', bg: '#FDFCF9' },
  { id: 'shotly',    name: 'Shotly',      headline: 'Watch the weight come off, week by week.',   primary: '#FF6B00', bg: '#101A13', text: '#E8F5E9' },
  { id: 'yumeship',  name: 'YumeShip',    headline: 'A quiet place for the ones you love from afar.', primary: '#9b4f6e', bg: '#FDF4F8' },
  { id: 'habithive', name: 'Habit Hive',  headline: 'Your apps stay locked until you log it.',    primary: '#C98A2E', bg: '#F4F1EB' },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Greedy word-wrap to a max chars-per-line, so long headlines render as a
// stacked, thumbnail-style block instead of overflowing a single line.
function wrap(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars && line) { lines.push(line); line = w; }
    else { line = (line + ' ' + w).trim(); }
  }
  if (line) lines.push(line);
  return lines;
}

// Perceived luminance → choose readable text color when not explicitly set.
function inkFor(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? '#15140f' : '#FFFFFF';
}

// ── 1. Compress oversized icons (≤512px, palette PNG) ───────────────────────
async function compressIcons() {
  const files = fs.readdirSync(PUBLIC).filter(f => /\.png$/i.test(f) && fs.statSync(path.join(PUBLIC, f)).isFile());
  for (const f of files) {
    const p = path.join(PUBLIC, f);
    const before = fs.statSync(p).size;
    if (before < 120_000) continue; // already small enough
    try {
      const buf = await sharp(p)
        .resize(512, 512, { fit: 'inside', withoutEnlargement: true })
        .png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 })
        .toBuffer();
      if (buf.length < before) {
        fs.writeFileSync(p, buf);
        console.log(`  compressed ${f}: ${(before / 1024).toFixed(0)}KB → ${(buf.length / 1024).toFixed(0)}KB`);
      }
    } catch (e) {
      console.warn(`  skip ${f}: ${e.message}`);
    }
  }
}

// ── 2. Per-app OG images (1200×630) ─────────────────────────────────────────
async function makeOgImages() {
  for (const app of apps) {
    const ink = app.text || inkFor(app.bg);
    // Light or dark muted tone, decided by the ink's luminance (not an exact
    // hex match) so custom light inks like Shotly's stay readable on dark bgs.
    const inkHex = ink.replace('#', '');
    const inkLum = (0.299 * parseInt(inkHex.slice(0, 2), 16) + 0.587 * parseInt(inkHex.slice(2, 4), 16) + 0.114 * parseInt(inkHex.slice(4, 6), 16)) / 255;
    const muted = inkLum > 0.6 ? 'rgba(255,255,255,0.62)' : 'rgba(21,20,15,0.6)';
    const iconPath = path.join(PUBLIC, `${app.id}.png`);
    const hasIcon = fs.existsSync(iconPath);

    // Thumbnail-style layout (#5): app name as a small eyebrow, the emotional
    // headline (#18) as the dominant, wrapped hero text.
    const lines = wrap(app.headline, 22);
    const lineH = 70;
    const blockH = lines.length * lineH;
    const startY = 315 - blockH / 2 + 56; // vertically center the headline block
    const headlineTspans = lines
      .map((ln, i) => `<tspan x="96" y="${startY + i * lineH}">${esc(ln)}</tspan>`)
      .join('');

    // Background + text layer as SVG (librsvg falls back to a default sans if
    // the named family is unavailable — fine for an OG card).
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
      <rect width="1200" height="630" fill="${app.bg}"/>
      <rect x="0" y="0" width="14" height="630" fill="${app.primary}"/>
      <text x="96" y="120" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="1" fill="${app.primary}">${esc(app.name)}</text>
      <text font-family="Helvetica, Arial, sans-serif" font-size="60" font-weight="800" fill="${ink}">${headlineTspans}</text>
      <rect x="96" y="520" width="190" height="46" rx="23" fill="${app.primary}"/>
      <text x="191" y="551" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="700" fill="#ffffff" text-anchor="middle">Free on iOS</text>
      <text x="310" y="552" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="600" fill="${muted}">briefly.live</text>
    </svg>`;

    let img = sharp(Buffer.from(svg));

    if (hasIcon) {
      // Rounded icon, 300×300, placed on the right.
      const size = 300;
      const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="66" fill="#fff"/></svg>`);
      const icon = await sharp(iconPath)
        .resize(size, size, { fit: 'cover' })
        .composite([{ input: mask, blend: 'dest-in' }])
        .png()
        .toBuffer();
      img = img.composite([{ input: icon, top: 165, left: 800 }]);
    }

    const out = path.join(OG_DIR, `${app.id}.png`);
    await img.png({ compressionLevel: 9 }).toFile(out);
    console.log(`  og/${app.id}.png (${(fs.statSync(out).size / 1024).toFixed(0)}KB)`);
  }
}

console.log('\nGenerating images...');
await compressIcons();
await makeOgImages();
console.log('Done.\n');
