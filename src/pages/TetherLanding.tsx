import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { AppConfig } from '../config/apps';

interface Props {
  app: AppConfig;
  section?: 'privacy' | 'terms' | 'support';
}

/* ────────────────────────────────────────────────────────────────────────────
   TETHER — tokens from the app's DesignSystem (Palette.swift, Ink.swift).
   The sky a letter crosses: lavender at altitude fading to paper. One navy
   accent (the app icon's), the icon's pink dashed route, and green kept for
   arrival only — the same rules the app follows.
   ──────────────────────────────────────────────────────────────────────────── */

const SKY_HIGH = '#D6D9F0';
const SKY_LOW = '#F5F5F9';
const FLIGHT_HIGH = '#A8C4F0';
const FLIGHT_LOW = '#E3EDFB';
const NAVY = '#1B1F40';
const INK = '#1F2024';
const MUTED = '#6B6C78';
const ROUTE = '#E3708F';
const LANDED = '#3DB870';
const PAPER = '#FFFFFF';
const HAIR = 'rgba(27,31,64,0.09)';

const DISPLAY = '"Cal Sans", "Bricolage Grotesque", system-ui, sans-serif';
const BODY = '"Hanken Grotesk", system-ui, -apple-system, sans-serif';
const HAND = '"Kalam", "Caveat", cursive';

const BASE = '/tether';
const SUPPORT_EMAIL = 'ashwinnanbazhagan@gmail.com';

/* ── Shared pieces ── */

const SkyBg: React.FC = () => (
  <div aria-hidden className="tt-sky">
    <div className="tt-cloud tt-cloud-a" />
    <div className="tt-cloud tt-cloud-b" />
    <div className="tt-cloud tt-cloud-c" />
  </div>
);

const Plane: React.FC<{ size?: number; color?: string; stroke?: string }> = ({ size = 22, color = PAPER, stroke = NAVY }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <path d="M2.5 11.2 21 3.5l-5.6 17-4.1-6.6-8.8-2.7Z" fill={color} stroke={stroke} strokeWidth={1.4} strokeLinejoin="round" />
    <path d="M11.3 13.9 21 3.5" fill="none" stroke={stroke} strokeWidth={1.2} strokeLinecap="round" />
  </svg>
);

const Wordmark: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: DISPLAY, fontSize: size, color: NAVY, letterSpacing: '-0.01em' }}>
    <Plane size={size * 0.95} color={NAVY} stroke={NAVY} />
    tether
  </span>
);

const Eyebrow: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = MUTED }) => (
  <div style={{ fontFamily: BODY, fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color }}>
    {children}
  </div>
);

const AppStoreButton: React.FC<{ url: string; dark?: boolean }> = ({ url, dark = true }) => (
  <a
    className="tt-cta"
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Download tether on the App Store"
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 12,
      background: dark ? NAVY : PAPER, color: dark ? PAPER : NAVY,
      padding: '13px 26px 13px 22px', borderRadius: 999, textDecoration: 'none',
      boxShadow: dark ? '0 12px 28px rgba(27,31,64,0.28)' : '0 12px 28px rgba(0,0,0,0.25)',
    }}
  >
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.37 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.83-.81-3-.79-1.55.02-2.97.9-3.77 2.28-1.6 2.78-.41 6.9 1.15 9.16.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.77-2.23.87-1.28 1.23-2.51 1.25-2.58-.03-.01-2.4-.92-2.42-3.65zM14.1 5.86c.63-.77 1.06-1.83.94-2.89-.91.04-2.01.61-2.66 1.37-.58.67-1.09 1.75-.96 2.79 1.02.08 2.05-.52 2.68-1.27z" />
    </svg>
    <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1, textAlign: 'left' }}>
      <span style={{ fontFamily: BODY, fontSize: 10.5, fontWeight: 500, opacity: 0.8 }}>Download on the</span>
      <span style={{ fontFamily: BODY, fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>App Store</span>
    </span>
  </a>
);

/* ── Hero: a letter crossing the map ──
   SMIL rather than CSS motion paths, so the plane follows the route in every
   browser; reduced motion swaps it for a plane already parked on their pin. */

const ROUTE_PATH = 'M96,318 C170,150 300,92 424,112';

const FlightScene: React.FC = () => (
  <div className="tt-scene" style={{ position: 'relative', width: '100%', maxWidth: 520 }}>
    <div style={{
      position: 'relative', borderRadius: 34, overflow: 'hidden', aspectRatio: '520 / 420',
      background: `linear-gradient(180deg, ${FLIGHT_HIGH} 0%, ${FLIGHT_LOW} 100%)`,
      boxShadow: '0 30px 70px rgba(27,31,64,0.22), inset 0 0 0 1px rgba(255,255,255,0.6)',
    }}>
      <svg viewBox="0 0 520 420" width="100%" height="100%" style={{ display: 'block' }} role="img" aria-label="A paper plane flying from London to Lisbon">
        <defs>
          <pattern id="tt-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1" />
          </pattern>
          <radialGradient id="tt-land-a" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EEF1E6" />
            <stop offset="100%" stopColor="#E3E9DA" />
          </radialGradient>
        </defs>
        <rect width="520" height="420" fill="url(#tt-grid)" />
        {/* Soft continents — a pale map, the way the app washes its own */}
        <path d="M-20,250 C40,220 70,250 120,262 C170,274 190,330 160,372 C130,414 40,430 -20,420 Z" fill="url(#tt-land-a)" opacity="0.9" />
        <path d="M330,40 C380,20 470,30 540,60 L540,200 C500,190 470,170 430,176 C390,182 350,160 336,128 C322,96 300,60 330,40 Z" fill="url(#tt-land-a)" opacity="0.9" />
        <path d="M250,300 C290,280 340,290 360,320 C380,350 350,392 300,396 C250,400 220,330 250,300 Z" fill="url(#tt-land-a)" opacity="0.7" />

        {/* The route, the icon's pink dashes */}
        <path d={ROUTE_PATH} fill="none" stroke={ROUTE} strokeWidth="2.4" strokeDasharray="6 8" strokeLinecap="round" />

        {/* Distance chip at the top of the arc */}
        <g transform="translate(236,150)">
          <rect x="-50" y="-15" width="100" height="30" rx="15" fill="rgba(255,255,255,0.86)" />
          <text x="0" y="5" textAnchor="middle" fontFamily={BODY} fontSize="13" fontWeight="700" fill={NAVY}>986 mi away</text>
        </g>

        {/* You */}
        <g transform="translate(96,318)">
          <circle r="25" fill="#6B7ADB" stroke={PAPER} strokeWidth="4" />
          <text y="6" textAnchor="middle" fontFamily={DISPLAY} fontSize="19" fill={PAPER}>A</text>
          <text y="48" textAnchor="middle" fontFamily={BODY} fontSize="13" fontWeight="700" fill={NAVY}>London</text>
        </g>

        {/* Them, with the arrival ring */}
        <g transform="translate(424,112)">
          <circle className="tt-anim" r="25" fill="none" stroke={LANDED} strokeWidth="3" opacity="0">
            <animate attributeName="r" values="25;25;56" keyTimes="0;0.62;1" dur="6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0;1;0" keyTimes="0;0.62;0.66;1" dur="6s" repeatCount="indefinite" />
          </circle>
          <circle r="25" fill="#E38A66" stroke={PAPER} strokeWidth="4" />
          <text y="6" textAnchor="middle" fontFamily={DISPLAY} fontSize="19" fill={PAPER}>M</text>
          <text y="48" textAnchor="middle" fontFamily={BODY} fontSize="13" fontWeight="700" fill={NAVY}>Lisbon</text>
        </g>

        {/* The plane */}
        <g className="tt-anim">
          <g opacity="0">
            <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.06;0.58;0.63;1" dur="6s" repeatCount="indefinite" />
            <animateMotion dur="6s" repeatCount="indefinite" rotate="auto" path={ROUTE_PATH}
              keyPoints="0;1;1" keyTimes="0;0.6;1" calcMode="spline" keySplines="0.45 0 0.25 1;0 0 1 1" />
            <path d="M-14,-10 L16,0 L-14,10 L-8,0 Z" fill={PAPER} stroke={NAVY} strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M-8,0 L16,0" stroke={NAVY} strokeWidth="1.2" />
          </g>
        </g>
        {/* Reduced motion: already landed */}
        <g className="tt-still" transform="translate(392,124) rotate(-12)">
          <path d="M-14,-10 L16,0 L-14,10 L-8,0 Z" fill={PAPER} stroke={NAVY} strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M-8,0 L16,0" stroke={NAVY} strokeWidth="1.2" />
        </g>
      </svg>
    </div>

    {/* The letter being sent */}
    <div className="tt-letter" style={{
      position: 'absolute', right: '-5%', bottom: '-13%', width: '50%', maxWidth: 250,
      background: PAPER, borderRadius: 6, padding: '18px 20px 20px',
      boxShadow: '0 18px 40px rgba(27,31,64,0.2)', transform: 'rotate(4deg)',
      fontFamily: HAND, color: '#22305E', fontSize: 'clamp(13px, 1.5vw, 16px)', lineHeight: 1.7,
    }}>
      <div>Same sky. Different cities.</div>
      <div>Counting down to our next coffee together.</div>
      <div style={{ marginTop: 6 }}>Miss you, Maya ♡</div>
    </div>
  </div>
);

/* ── How it works ── */

const STEPS: { title: string; body: string; art: React.ReactNode }[] = [
  {
    title: 'Write it by hand',
    body: 'A pen that looks like handwriting, in blue or black ink. Every letter carries your name and face.',
    art: (
      <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden>
        <rect x="12" y="8" width="40" height="48" rx="3" fill={PAPER} stroke={NAVY} strokeWidth="2" />
        <path d="M20 22c4-2 8 2 12 0s8-2 12 0M20 32c4-2 8 2 12 0s6-2 8 0M20 42c3-2 6 2 10 0" fill="none" stroke="#3A4A8C" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Fold it',
    body: 'Pull the letter down and it folds itself into a paper plane, crease by crease.',
    art: (
      <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden>
        <path d="M6 34 58 12 40 54 30 38Z" fill={PAPER} stroke={NAVY} strokeWidth="2" strokeLinejoin="round" />
        <path d="M30 38 58 12M6 34l24 4" fill="none" stroke={NAVY} strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Throw it',
    body: 'Aim at whoever you\'re writing to and flick. It flies across the real map, every mile between you.',
    art: (
      <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden>
        <path d="M8 54C20 22 40 12 58 14" fill="none" stroke={ROUTE} strokeWidth="2.2" strokeDasharray="4 5" strokeLinecap="round" />
        <circle cx="8" cy="54" r="5" fill="#6B7ADB" />
        <g transform="translate(40,17) rotate(-20)"><path d="M-9,-6 L10,0 L-9,6 L-5,0 Z" fill={PAPER} stroke={NAVY} strokeWidth="1.6" strokeLinejoin="round" /></g>
      </svg>
    ),
  },
  {
    title: 'Watch it land',
    body: 'It touches down on their city and unfolds in front of them. You\'ll see when it\'s been opened.',
    art: (
      <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden>
        <circle cx="32" cy="32" r="22" fill="none" stroke={LANDED} strokeWidth="2.4" opacity="0.5" />
        <circle cx="32" cy="32" r="13" fill="#E38A66" stroke={PAPER} strokeWidth="3" />
        <path d="m25 33 5 5 9-10" fill="none" stroke={PAPER} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const SHOTS: { src: string; alt: string }[] = [
  { src: '/tether/screenshots/01.webp', alt: 'Send love letters across the world: a handwritten letter over the map' },
  { src: '/tether/screenshots/02.webp', alt: 'Fold your note and watch it fly: a paper plane on its way to Maya in Lisbon' },
  { src: '/tether/screenshots/03.webp', alt: 'See them on your Home Screen: the tether widget with two people on the map' },
  { src: '/tether/screenshots/04.webp', alt: 'Throw a kiss: a lipstick kiss landing on the map' },
  { src: '/tether/screenshots/05.webp', alt: 'Keep every letter close: the letters between you and Maya' },
];

const THROWS: { glyph: string; name: string; line: string }[] = [
  { glyph: '💋', name: 'A kiss', line: 'Maya threw a kiss at you' },
  { glyph: '🤗', name: 'A hug', line: 'Maya sent you a hug' },
  { glyph: '💣', name: 'A bomb', line: 'Maya threw a bomb at you' },
];

const PRIVATE: { title: string; body: string }[] = [
  { title: 'Only the two of you', body: 'Letters live in your iCloud and theirs, end-to-end encrypted and shared with nobody else. Not even the developer can read them.' },
  { title: 'No sign-up', body: 'No email, no password, no account to make. Your iCloud is all tether needs.' },
  { title: 'A city, never a street', body: 'Your location is rounded to about 10 km before it\'s shared. Or skip it and type your city.' },
  { title: 'Nothing watching', body: 'No ads, no analytics, no tracking across apps. Your letters never pass through a server of ours.' },
];

/* ── Legal & support ── */

// Turn bare URLs and the support address into links; everything else stays text.
const linkify = (line: string): React.ReactNode[] =>
  line.split(/(https?:\/\/\S+|[\w.+-]+@[\w-]+\.[\w.]+)/g).map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      const href = part.replace(/[).,]+$/, '');
      return <React.Fragment key={i}><a href={href} target="_blank" rel="noopener noreferrer" style={{ color: NAVY }}>{href}</a>{part.slice(href.length)}</React.Fragment>;
    }
    if (/@/.test(part)) return <a key={i} href={`mailto:${part}`} style={{ color: NAVY, fontWeight: 600 }}>{part}</a>;
    return part;
  });

const LegalPage: React.FC<{ app: AppConfig; section: 'privacy' | 'terms' | 'support' }> = ({ app, section }) => {
  const content = section === 'privacy' ? app.legal.privacyPolicy : section === 'terms' ? app.legal.termsOfService : app.legal.support;
  const title = section === 'privacy' ? 'Privacy Policy' : section === 'terms' ? 'Terms of Use' : 'Support';
  return (
    <div className="tt-page" style={{ position: 'relative', minHeight: '100dvh', fontFamily: BODY, color: INK }}>
      <style>{css}</style>
      <SkyBg />
      <div className="tt-pad" style={{ position: 'relative', zIndex: 2, maxWidth: 760, margin: '0 auto', padding: '40px 32px 90px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 44, gap: 16 }}>
          <Link to={BASE} style={{ textDecoration: 'none' }}><Wordmark /></Link>
          <Link to={BASE} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: MUTED, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M15 18l-6-6 6-6" /></svg>
            Back to tether
          </Link>
        </div>
        <div className="tt-sheet" style={{ background: 'rgba(255,255,255,0.92)', borderRadius: 28, padding: '48px 48px 40px', boxShadow: '0 24px 60px rgba(27,31,64,0.12)' }}>
          <h1 style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(2rem, 5vw, 2.8rem)', letterSpacing: '-0.01em', color: NAVY, margin: '0 0 8px' }}>{title}</h1>
          <p style={{ fontSize: 13, color: MUTED, margin: '0 0 36px' }}>Last updated {app.legal.lastUpdated}</p>
          {section === 'support' && (
            <a href={`mailto:${SUPPORT_EMAIL}?subject=tether`} className="tt-cta" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, background: NAVY, color: PAPER, textDecoration: 'none',
              fontWeight: 700, fontSize: 15, padding: '13px 24px', borderRadius: 999, marginBottom: 40,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
              Email support
            </a>
          )}
          <div>
            {content.split('\n\n').map((block, i) => {
              const [heading, ...lines] = block.split('\n');
              return (
                <section key={i} style={{ marginBottom: 30 }}>
                  <h2 style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 21, color: NAVY, margin: '0 0 10px' }}>{heading}</h2>
                  {lines.map((line, j) => (
                    <p key={j} style={{ fontSize: 15.5, lineHeight: 1.7, color: '#3A3B44', margin: '0 0 10px' }}>{linkify(line)}</p>
                  ))}
                </section>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

const Footer: React.FC = () => (
  <footer className="tt-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, padding: '36px 0 0', fontSize: 13, color: MUTED }}>
    <div style={{ display: 'flex', gap: 22, alignItems: 'center', flexWrap: 'wrap' }}>
      <Link to={BASE} style={{ textDecoration: 'none' }}><Wordmark size={16} /></Link>
      <Link to={`${BASE}/privacy-policy`} style={{ color: MUTED, textDecoration: 'none' }}>Privacy</Link>
      <Link to={`${BASE}/terms-of-service`} style={{ color: MUTED, textDecoration: 'none' }}>Terms</Link>
      <Link to={`${BASE}/support`} style={{ color: MUTED, textDecoration: 'none' }}>Support</Link>
    </div>
    <span>© 2026 Ashwin Anbazhagan · <Link to="/" style={{ color: MUTED }}>briefly.live</Link></span>
  </footer>
);

/* ── Page ── */

const TetherLanding: React.FC<Props> = ({ app, section }) => {
  useEffect(() => {
    document.title = section
      ? `${section === 'privacy' ? 'Privacy Policy' : section === 'terms' ? 'Terms of Use' : 'Support'} | tether`
      : app.seo.title;
  }, [app, section]);

  // Scroll reveal. Visible by default (SSR, no JS); hidden only once JS has mounted.
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (section) return;
    const root = rootRef.current;
    if (!root) return;
    root.classList.add('js');
    const els = Array.from(root.querySelectorAll<HTMLElement>('.tt-reveal'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [section]);

  if (section) return <LegalPage app={app} section={section} />;

  const url = app.downloadUrl || app.appStoreUrl || '#';

  return (
    <div ref={rootRef} className="tt-page" style={{ position: 'relative', minHeight: '100dvh', fontFamily: BODY, color: INK, overflowX: 'hidden' }}>
      <style>{css}</style>
      <SkyBg />

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Nav */}
        <nav className="tt-nav tt-pad" style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px',
          backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
          background: 'rgba(236,237,247,0.72)', borderBottom: `1px solid ${HAIR}`,
        }}>
          <Link to={BASE} style={{ textDecoration: 'none' }} aria-label="tether home"><Wordmark /></Link>
          <div style={{ display: 'flex', gap: 26, alignItems: 'center' }}>
            <a href="#how" className="tt-navlink">How it works</a>
            <a href="#private" className="tt-navlink">Privacy</a>
            <a href="#faq" className="tt-navlink">FAQ</a>
            <a href={url} target="_blank" rel="noopener noreferrer" style={{
              background: NAVY, color: PAPER, fontSize: 13, fontWeight: 700, padding: '9px 18px', borderRadius: 999, textDecoration: 'none',
            }}>Get tether</a>
          </div>
        </nav>

        {/* Hero */}
        <section style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', padding: '110px 0 80px' }}>
          <div className="tt-hero tt-pad" style={{ width: '100%', maxWidth: 1180, margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="tt-rise" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 26 }}>
                <img src="/tether.png" alt="tether app icon" width={54} height={54} style={{ width: 54, height: 54, borderRadius: 14, boxShadow: '0 10px 24px rgba(27,31,64,0.28)' }} />
                <Eyebrow>Long-distance letters</Eyebrow>
              </div>
              <h1 className="tt-rise tt-d1" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(2.7rem, 6vw, 4.8rem)', lineHeight: 1.0, letterSpacing: '-0.02em', color: NAVY, margin: '0 0 22px' }}>
                Letters that fly the real miles between you.
              </h1>
              <p className="tt-rise tt-d2" style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)', lineHeight: 1.65, color: MUTED, maxWidth: 480, margin: '0 0 34px' }}>
                {app.marketing.subheadline} For a partner in another time zone, a best friend who moved away, family on the other side of the world.
              </p>
              <div className="tt-rise tt-d3" style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
                <AppStoreButton url={url} />
                <span style={{ fontSize: 14, fontWeight: 600, color: MUTED }}>{app.pricingNote}</span>
              </div>
            </div>
            <div className="tt-rise tt-d2 tt-hero-art" style={{ display: 'flex', justifyContent: 'center', paddingBottom: 40 }}>
              <FlightScene />
            </div>
          </div>
        </section>

        {/* Screenshots */}
        <section aria-label="Screenshots" style={{ padding: '40px 0 100px' }}>
          <div className="tt-shots tt-pad" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 40px' }}>
            {SHOTS.map((s, i) => (
              <img key={s.src} src={s.src} alt={s.alt} width={640} height={1391} loading="lazy" className="tt-shot tt-reveal" style={{ transitionDelay: `${i * 0.06}s` }} />
            ))}
          </div>
        </section>

        {/* Why */}
        <section style={{ padding: '100px 0', borderTop: `1px solid ${HAIR}` }}>
          <div className="tt-pad" style={{ maxWidth: 820, margin: '0 auto', padding: '0 40px' }}>
            <div className="tt-reveal">
              <Eyebrow>Why a letter</Eyebrow>
              <p style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem, 3.4vw, 2.3rem)', lineHeight: 1.25, color: NAVY, margin: '16px 0 26px' }}>
                Texts are instant, so they feel weightless. A letter you watch cross the map feels like it came from somewhere.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: MUTED, margin: 0 }}>{app.marketing.solution}</p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" style={{ padding: '100px 0', borderTop: `1px solid ${HAIR}` }}>
          <div className="tt-pad" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 40px' }}>
            <div className="tt-reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
              <Eyebrow>How it works</Eyebrow>
              <h2 style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(2rem, 4.4vw, 3.2rem)', color: NAVY, margin: '14px 0 0', letterSpacing: '-0.01em' }}>Write. Fold. Throw. Land.</h2>
            </div>
            <ol className="tt-steps" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {STEPS.map((s, i) => (
                <li key={s.title} className="tt-card tt-reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                    {s.art}
                    <span style={{ fontFamily: DISPLAY, fontSize: 15, color: 'rgba(27,31,64,0.3)' }}>0{i + 1}</span>
                  </div>
                  <h3 style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 21, color: NAVY, margin: '0 0 8px' }}>{s.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: MUTED, margin: 0 }}>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Between letters + widget */}
        <section style={{ padding: '100px 0', borderTop: `1px solid ${HAIR}` }}>
          <div className="tt-two tt-pad" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div className="tt-card tt-reveal" style={{ padding: '38px 36px' }}>
              <Eyebrow>Between letters</Eyebrow>
              <h2 style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', color: NAVY, margin: '14px 0 12px' }}>Throw a kiss. Make their day.</h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.65, color: MUTED, margin: '0 0 28px' }}>Not everything needs a letter. Throw a kiss, a hug or a bomb, and it goes off on their face, wherever they are.</p>
              <div style={{ display: 'grid', gap: 12 }}>
                {THROWS.map((t) => (
                  <div key={t.name} className="tt-throw" style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,0.75)', borderRadius: 18, padding: '12px 16px' }}>
                    <span className="tt-glyph" style={{ fontSize: 28, lineHeight: 1 }} aria-hidden>{t.glyph}</span>
                    <span style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 700, fontSize: 15, color: NAVY }}>{t.name}</span>
                      <span style={{ fontSize: 13.5, color: MUTED }}>“{t.line}”</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="tt-card tt-reveal" style={{ padding: '38px 36px', transitionDelay: '0.08s', display: 'flex', flexDirection: 'column' }}>
              <Eyebrow>On your Home Screen</Eyebrow>
              <h2 style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', color: NAVY, margin: '14px 0 12px' }}>Keep your person in sight.</h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.65, color: MUTED, margin: '0 0 28px' }}>The widget puts the two of you on the map with the last thing they sent, and a throw one tap away.</p>
              {/* A small widget, drawn the way the app draws it */}
              <div style={{ marginTop: 'auto', borderRadius: 26, overflow: 'hidden', background: PAPER, boxShadow: '0 16px 36px rgba(27,31,64,0.16)' }}>
                <div style={{ position: 'relative', background: `linear-gradient(180deg, ${FLIGHT_HIGH}, ${FLIGHT_LOW})` }}>
                  <svg viewBox="0 0 300 120" width="100%" style={{ display: 'block' }} aria-hidden>
                    <path d="M62,88 C112,46 190,28 238,36" fill="none" stroke={ROUTE} strokeWidth="2" strokeDasharray="5 7" strokeLinecap="round" />
                    <circle cx="62" cy="88" r="14" fill="#6B7ADB" stroke={PAPER} strokeWidth="3" />
                    <circle cx="238" cy="36" r="14" fill="#E38A66" stroke={PAPER} strokeWidth="3" />
                    <circle cx="248" cy="46" r="4.5" fill={LANDED} stroke={PAPER} strokeWidth="2" />
                    <rect x="112" y="50" width="76" height="20" rx="10" fill="rgba(255,255,255,0.88)" />
                    <text x="150" y="64" textAnchor="middle" fontFamily={BODY} fontSize="10" fontWeight="700" fill={NAVY}>986 mi away</text>
                  </svg>
                </div>
                <div style={{ padding: '14px 18px 16px' }}>
                  <div style={{ fontFamily: HAND, fontSize: 17, color: '#22305E', lineHeight: 1.5 }}>You made an ordinary day feel like a good one. Love you.</div>
                  <div style={{ fontSize: 12, color: MUTED, marginTop: 4 }}>Maya · 20 min ago</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Private by design */}
        <section id="private" style={{ padding: '110px 0', background: NAVY, color: PAPER, position: 'relative', overflow: 'hidden' }}>
          <svg aria-hidden viewBox="0 0 1200 300" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.35 }}>
            <path d="M-20,260 C300,60 800,40 1220,120" fill="none" stroke={ROUTE} strokeWidth="2" strokeDasharray="6 10" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="tt-pad" style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', padding: '0 40px' }}>
            <div className="tt-reveal" style={{ maxWidth: 640, marginBottom: 52 }}>
              <Eyebrow color="rgba(255,255,255,0.6)">Private by design</Eyebrow>
              <h2 style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(2rem, 4.4vw, 3.2rem)', margin: '14px 0 14px', letterSpacing: '-0.01em' }}>What you write stays between you.</h2>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.72)', margin: 0 }}>Your letters never pass through a server of ours. They travel through your iCloud and theirs, and nowhere else.</p>
            </div>
            <div className="tt-four" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
              {PRIVATE.map((p, i) => (
                <div key={p.title} className="tt-reveal" style={{ transitionDelay: `${i * 0.06}s`, borderRadius: 22, padding: '26px 24px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <h3 style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 19, margin: '0 0 8px' }}>{p.title}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', margin: 0 }}>{p.body}</p>
                </div>
              ))}
            </div>
            <p className="tt-reveal" style={{ margin: '34px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
              Read the full <Link to={`${BASE}/privacy-policy`} style={{ color: PAPER }}>privacy policy</Link>.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section id="plus" style={{ padding: '110px 0', borderBottom: `1px solid ${HAIR}` }}>
          <div className="tt-pad" style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px' }}>
            <div className="tt-reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
              <Eyebrow>tether+</Eyebrow>
              <h2 style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(2rem, 4.4vw, 3.2rem)', color: NAVY, margin: '14px 0 12px', letterSpacing: '-0.01em' }}>Try it free for three days.</h2>
              <p style={{ fontSize: 16.5, lineHeight: 1.65, color: MUTED, maxWidth: 560, margin: '0 auto' }}>Everything in tether comes with tether+: unlimited letters and throws, every pen and ink, speaking your letter, and the widget.</p>
            </div>
            <div className="tt-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div className="tt-card tt-reveal" style={{ padding: '32px 30px', border: `2px solid ${NAVY}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <h3 style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 24, color: NAVY, margin: 0 }}>Yearly</h3>
                  <span style={{ background: NAVY, color: PAPER, fontSize: 12, fontWeight: 700, padding: '5px 12px', borderRadius: 999 }}>3 days free</span>
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: MUTED, margin: 0 }}>Starts with a 3-day free trial, then renews once a year. Cancel any time before the trial ends and you won't be charged.</p>
              </div>
              <div className="tt-card tt-reveal" style={{ padding: '32px 30px', transitionDelay: '0.06s' }}>
                <h3 style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 24, color: NAVY, margin: '0 0 14px' }}>Lifetime</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: MUTED, margin: 0 }}>Pay once and keep tether+ for good. No subscription, nothing to renew.</p>
              </div>
            </div>
            <p className="tt-reveal" style={{ textAlign: 'center', fontSize: 13, color: MUTED, margin: '22px 0 0', lineHeight: 1.6 }}>
              Prices are shown in the app, in your currency. Payment is charged to your Apple Account; subscriptions renew automatically unless cancelled at least 24 hours before the end of the period, and can be managed in your Apple Account settings. <Link to={`${BASE}/terms-of-service`} style={{ color: MUTED }}>Terms of Use</Link> · <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer" style={{ color: MUTED }}>Apple EULA</a>
            </p>
          </div>
        </section>

        {/* FAQ */}
        {app.marketing.faqs && (
          <section id="faq" style={{ padding: '100px 0' }}>
            <div className="tt-pad" style={{ maxWidth: 820, margin: '0 auto', padding: '0 40px' }}>
              <div className="tt-reveal" style={{ marginBottom: 40 }}>
                <Eyebrow>FAQ</Eyebrow>
                <h2 style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(2rem, 4.4vw, 3.2rem)', color: NAVY, margin: '14px 0 0', letterSpacing: '-0.01em' }}>Questions, answered.</h2>
              </div>
              {app.marketing.faqs.map((f, i) => (
                <details key={f.question} className="tt-faq tt-reveal" style={{ transitionDelay: `${i * 0.03}s` }}>
                  <summary>
                    <span>{f.question}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M6 9l6 6 6-6" /></svg>
                  </summary>
                  <p>{f.answer}</p>
                </details>
              ))}
              <p className="tt-reveal" style={{ fontSize: 15, color: MUTED, margin: '28px 0 0' }}>
                Something else? <Link to={`${BASE}/support`} style={{ color: NAVY, fontWeight: 600 }}>Visit support</Link>.
              </p>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section style={{ padding: '110px 0 90px', textAlign: 'center', borderTop: `1px solid ${HAIR}` }}>
          <div className="tt-reveal tt-pad" style={{ padding: '0 40px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}><Plane size={44} /></div>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(2.3rem, 5.4vw, 4rem)', lineHeight: 1.04, color: NAVY, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
              Put your person on your map.
            </h2>
            <p style={{ fontSize: 17, color: MUTED, margin: '0 auto 34px', maxWidth: 440 }}>tether for iPhone. Start with three days free.</p>
            <AppStoreButton url={url} />
          </div>
        </section>

        <div className="tt-pad" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 40px 40px' }}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

const css = `
  .tt-page { -webkit-font-smoothing: antialiased; }
  .tt-page ::selection { background: rgba(27,31,64,0.16); }
  .tt-sky { position: fixed; inset: 0; z-index: 0; background: linear-gradient(180deg, ${SKY_HIGH} 0%, ${SKY_LOW} 70%); overflow: hidden; }
  .tt-cloud { position: absolute; border-radius: 50%; background: radial-gradient(closest-side, rgba(255,255,255,0.85), rgba(255,255,255,0)); filter: blur(6px); }
  .tt-cloud-a { width: 620px; height: 240px; top: 8%; left: -12%; animation: tt-drift 70s ease-in-out infinite alternate; }
  .tt-cloud-b { width: 520px; height: 200px; top: 38%; right: -14%; animation: tt-drift 90s ease-in-out infinite alternate-reverse; }
  .tt-cloud-c { width: 700px; height: 260px; bottom: -6%; left: 20%; opacity: 0.7; animation: tt-drift 110s ease-in-out infinite alternate; }
  @keyframes tt-drift { from { transform: translateX(0); } to { transform: translateX(14vw); } }

  .tt-rise { animation: tt-rise 0.9s cubic-bezier(0.22,1,0.36,1) both; }
  .tt-d1 { animation-delay: 0.08s; } .tt-d2 { animation-delay: 0.16s; } .tt-d3 { animation-delay: 0.24s; }
  @keyframes tt-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
  .js .tt-reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1); }
  .js .tt-reveal.in { opacity: 1; transform: none; }

  .tt-navlink { font-size: 14px; font-weight: 600; color: ${MUTED}; text-decoration: none; transition: color 0.2s ease; }
  .tt-navlink:hover { color: ${NAVY}; }
  .tt-cta { transition: transform 0.2s cubic-bezier(0.3,1.4,0.5,1), box-shadow 0.2s ease; }
  .tt-cta:hover { transform: translateY(-2px); }
  .tt-cta:active { transform: scale(0.97); }
  .tt-cta:focus-visible, .tt-page a:focus-visible, .tt-faq summary:focus-visible { outline: 2px solid ${NAVY}; outline-offset: 3px; border-radius: 999px; }

  .tt-card { background: rgba(255,255,255,0.62); border: 1px solid rgba(255,255,255,0.8); border-radius: 26px; padding: 28px 26px; box-shadow: 0 10px 30px rgba(27,31,64,0.07); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
  .tt-throw { transition: transform 0.25s ease; }
  .tt-throw:hover { transform: translateX(4px); }
  .tt-throw:hover .tt-glyph { display: inline-block; animation: tt-pop 0.5s cubic-bezier(0.3,1.6,0.5,1); }
  @keyframes tt-pop { 0% { transform: scale(0.6) rotate(-12deg); } 100% { transform: scale(1) rotate(0); } }

  .tt-shots { display: grid; grid-template-columns: repeat(5, 1fr); gap: 18px; }
  .tt-shot { width: 100%; height: auto; border-radius: 22px; box-shadow: 0 18px 44px rgba(27,31,64,0.16); display: block; }

  .tt-faq { border-bottom: 1px solid ${HAIR}; }
  .tt-faq:first-of-type { border-top: 1px solid ${HAIR}; }
  .tt-faq summary { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 22px 0; cursor: pointer; list-style: none; font-family: ${BODY}; font-weight: 700; font-size: 17px; color: ${NAVY}; }
  .tt-faq summary::-webkit-details-marker { display: none; }
  .tt-faq summary svg { flex-shrink: 0; transition: transform 0.25s ease; }
  .tt-faq[open] summary svg { transform: rotate(180deg); }
  .tt-faq p { margin: 0 0 22px; font-size: 15.5px; line-height: 1.7; color: ${MUTED}; max-width: 92%; }

  .tt-still { display: none; }
  @media (prefers-reduced-motion: reduce) {
    .tt-anim { display: none; }
    .tt-still { display: inline; }
    .tt-cloud, .tt-rise { animation: none; }
  }

  @media (max-width: 1000px) {
    .tt-hero { grid-template-columns: 1fr !important; gap: 56px !important; }
    .tt-hero-art { padding: 0 6% 40px; }
    .tt-steps, .tt-four { grid-template-columns: repeat(2, 1fr) !important; }
    .tt-shots { grid-template-columns: repeat(5, 62%); overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 12px !important; }
    .tt-shot { scroll-snap-align: center; }
  }
  @media (max-width: 680px) {
    .tt-pad { padding-left: 16px !important; padding-right: 16px !important; }
    .tt-navlink { display: none; }
    .tt-two, .tt-steps, .tt-four { grid-template-columns: 1fr !important; }
    .tt-sheet { padding: 32px 22px 26px !important; border-radius: 22px !important; }
    .tt-letter { right: 0 !important; bottom: -16% !important; width: 60% !important; }
  }
`;

export default TetherLanding;
