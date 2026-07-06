import React, { useEffect, useRef } from 'react';
import { apps } from '../config/apps';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Check } from 'lucide-react';
import SEOBox from '../components/SEOBox';

/* ──────────────────────────────────────────────────────────────────────────
   BRIEFLY — indie iOS studio landing.
   Design read: redesign/overhaul of a founder portfolio. Dark studio shell
   acts as a neutral gallery wall; each app breaks out into its own colour
   world (the signature device, preserved from the original). VARIANCE 8 /
   MOTION 6 / DENSITY 4.

   Shape system (documented, per skill 4.4): world cards 24px, hero icons 20px,
   primary CTA is pill. One accent for the SHELL only (gold). App cards are
   real product brands and legitimately carry their own accent.
   ────────────────────────────────────────────────────────────────────────── */

const INK = '#0A0A0C';
const CREAM = '#EDE8DF';
const GOLD = '#D4A843';
const MUTE = 'rgba(237,232,223,0.46)';
const FAINT = 'rgba(237,232,223,0.28)';
const HAIR = 'rgba(237,232,223,0.09)';

const DISPLAY = '"Bricolage Grotesque", "Hanken Grotesk", sans-serif';
const BODY = '"Hanken Grotesk", sans-serif';
const MONO = '"DM Mono", monospace';

// Per-app card worlds — each breaks out of the dark shell into its own system.
const WORLDS: Record<string, {
  cardBg: string;
  cardText: string;
  cardText2: string;
  accent: string;
  fontDisplay: string;
  teaser: React.ReactNode;
  decorators?: React.ReactNode;
}> = {
  gutpal: {
    cardBg: '#F4EDE2',
    cardText: '#141413',
    cardText2: 'rgba(20,20,19,0.55)',
    accent: '#D97757',
    fontDisplay: '"Bricolage Grotesque", sans-serif',
    teaser: (
      <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[['Mon', 'Lemon herb salmon'], ['Tue', 'Chickpea bowl'], ['Wed', 'Turkey stir-fry']].map(([day, meal]) => (
          <div key={day} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, color: '#D97757', width: 26, letterSpacing: '0.04em' }}>{day}</span>
            <span style={{ fontSize: 12.5, color: 'rgba(20,20,19,0.62)' }}>{meal}</span>
          </div>
        ))}
      </div>
    ),
  },
  masterly: {
    cardBg: '#EDE9DF',
    cardText: '#1A2B12',
    cardText2: '#4A6A30',
    accent: '#2D4F1E',
    fontDisplay: '"Syne", sans-serif',
    teaser: (
      <div style={{ marginTop: 22, display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 34, fontWeight: 700, color: '#2D4F1E', lineHeight: 1 }}>47</span>
        <span style={{ fontFamily: MONO, fontSize: 10.5, color: 'rgba(26,43,18,0.5)', letterSpacing: '0.05em' }}>days to your exam</span>
      </div>
    ),
    decorators: (
      <div aria-hidden style={{ position: 'absolute', top: 22, right: 22, width: 38, height: 38, border: '1.5px dashed rgba(45,79,30,0.22)', borderRadius: 6, transform: 'rotate(9deg)' }} />
    ),
  },
  honestly: {
    cardBg: '#FAF8F5',
    cardText: '#33261A',
    cardText2: '#8A7A67',
    accent: '#F5851F',
    fontDisplay: '"Shantell Sans", cursive',
    teaser: (
      <div style={{ marginTop: 20, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        {[['#F7C24B', 'Happy'], ['#A8CB8C', 'Confused'], ['#90B4DC', 'Sad'], ['#C79ACD', 'Awful'], ['#6E9BD6', 'Cry']].map(([c, label]) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: c as string, border: '1px solid rgba(51,38,26,0.25)' }} />
            <span style={{ fontSize: 11, color: 'rgba(51,38,26,0.6)' }}>{label}</span>
          </div>
        ))}
      </div>
    ),
  },
  yumeship: {
    cardBg: '#FDF4F8',
    cardText: '#2D1B2E',
    cardText2: '#7B4B6B',
    accent: '#9B4F6E',
    fontDisplay: '"Playfair Display", Georgia, serif',
    teaser: (
      <div style={{ marginTop: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
        {[['#FADADD', 'Sakura'], ['#E8E0F0', 'Lavender'], ['#D4E8D4', 'Sage'], ['#FFF3C4', 'Butter']].map(([c, n]) => (
          <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: c as string, border: '1.5px solid rgba(155,79,110,0.18)' }} />
            <span style={{ fontSize: 8.5, color: 'rgba(45,27,46,0.45)', letterSpacing: '0.04em' }}>{n}</span>
          </div>
        ))}
      </div>
    ),
  },
  her75: {
    cardBg: '#FAF6EF',
    cardText: '#2B2420',
    cardText2: 'rgba(43,36,32,0.55)',
    accent: '#C4765A',
    fontDisplay: '"Cormorant Garamond", Georgia, serif',
    teaser: (
      <div style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', gap: 7 }}>
          {['#C4765A', '#A98290', '#6E7B54', '#94A8B1', '#D0BA9E'].map((c, i) => (
            <div key={i} style={{ width: 30, height: 40, borderRadius: 8, backgroundColor: c, opacity: 0.92, border: '1px solid rgba(43,36,32,0.06)' }} />
          ))}
        </div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12, fontSize: 11.5, color: 'rgba(43,36,32,0.55)' }}>
          <Check size={12} strokeWidth={2.5} color="#C4765A" /> Day 12 proof logged
        </span>
      </div>
    ),
    decorators: (
      <div aria-hidden style={{ position: 'absolute', top: 16, right: 20, fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic', fontSize: 30, fontWeight: 600, color: 'rgba(196,118,90,0.26)' }}>75</div>
    ),
  },
};

// Grid rhythm — 5 apps, 5 cells, asymmetric spans. No empty cells.
const LAYOUT: { id: string; cls: string }[] = [
  { id: 'gutpal', cls: 'gc-7 gc-feature' },
  { id: 'masterly', cls: 'gc-5' },
  { id: 'honestly', cls: 'gc-7 gc-feature' },
  { id: 'yumeship', cls: 'gc-5' },
  { id: 'her75', cls: 'gc-12 gc-feature' },
];

const PRINCIPLES: [string, string][] = [
  ['iOS native, no bloat', 'Built for one platform and tuned to it. No cross-platform compromises, no web view pretending to be an app.'],
  ['One problem, solved fully', 'Each app does a single job and refuses to sprawl into ten. The scope stays small so the craft can go deep.'],
  ['AI only where it earns it', 'No chatbot bolted onto the home screen. AI shows up in meal plans and study quizzes because there it actually helps.'],
  ['Free to try, honest to pay', 'Download free and use the core. Pay only once an app is already working for you, never before.'],
];

const Home: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  // Scroll-reveal via IntersectionObserver. SSR/no-JS safe: elements are
  // visible by default; the `js` class only hides them once JS has mounted,
  // then the observer reveals each as it enters the viewport. Motivated:
  // sequences content into view section by section (storytelling).
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.add('js');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = Array.from(root.querySelectorAll<HTMLElement>('.reveal-scroll'));
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes brf-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .brf-track { animation: brf-marquee 46s linear infinite; display: flex; width: max-content; will-change: transform; }
        .brf-track:hover { animation-play-state: paused; }

        @keyframes brf-rise { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .rise { opacity: 0; animation: brf-rise 0.9s cubic-bezier(0.22,1,0.36,1) forwards; }
        .h0 { animation-delay: 0.04s; } .h1 { animation-delay: 0.16s; } .h2 { animation-delay: 0.28s; }
        .h3 { animation-delay: 0.40s; } .h4 { animation-delay: 0.52s; }

        @keyframes brf-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .brf-icon { animation: brf-float 6s ease-in-out infinite; }

        /* Scroll reveal — visible unless JS is present (SSR/SEO safe) */
        .js .reveal-scroll { opacity: 0; transform: translateY(28px); transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1); }
        .js .reveal-scroll.in { opacity: 1; transform: none; }

        .app-card { position: relative; overflow: hidden; border-radius: 24px; text-decoration: none; display: flex; flex-direction: column; justify-content: space-between;
          transition: transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.45s cubic-bezier(0.25,0.46,0.45,0.94); }
        .app-card:hover { transform: translateY(-7px); }
        .app-visit { opacity: 0; transform: translateY(6px) scale(0.9); transition: opacity 0.3s ease, transform 0.3s ease; }
        .app-card:hover .app-visit { opacity: 1; transform: translateY(0) scale(1); }

        .nav-link { transition: color 0.2s ease; }
        .nav-link:hover { color: ${CREAM} !important; }
        .soft-link { transition: opacity 0.25s ease, color 0.2s ease; }
        .soft-link:hover { opacity: 0.7 !important; }
        .cta-pill { transition: transform 0.25s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.25s ease; }
        .cta-pill:hover { transform: translateY(-2px); box-shadow: 0 14px 30px rgba(212,168,67,0.22); }
        .cta-pill:active { transform: translateY(0) scale(0.985); }
        .prin-row { transition: background 0.3s ease; }
        .prin-row:hover { background: rgba(237,232,223,0.02); }

        .app-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 20px; }
        .gc-7 { grid-column: span 7; } .gc-5 { grid-column: span 5; } .gc-6 { grid-column: span 6; } .gc-12 { grid-column: span 12; }

        @media (max-width: 1023px) {
          .app-grid { grid-template-columns: repeat(2, 1fr); }
          .gc-7, .gc-5, .gc-6, .gc-12 { grid-column: span 1; }
          .gc-feature { grid-column: span 2; }
          .hero-visual { display: none !important; }
          .hero-wrap { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .app-grid { grid-template-columns: 1fr; }
          .gc-7, .gc-5, .gc-6, .gc-12, .gc-feature { grid-column: span 1; }
          .pad-x { padding-left: 28px !important; padding-right: 28px !important; }
          .hero-pad { padding: 0 28px !important; }
          .stat-row { gap: 0 30px !important; }
          .prin-grid { grid-template-columns: 1fr !important; }
          .about-actions { flex-wrap: wrap; }
        }

        @media (prefers-reduced-motion: reduce) {
          .rise, .brf-icon, .brf-track { animation: none !important; opacity: 1 !important; transform: none !important; }
          .js .reveal-scroll { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
      `}</style>

      <div ref={rootRef} style={{ background: INK, color: CREAM, minHeight: '100dvh', fontFamily: BODY, overflowX: 'hidden' }}>
        <SEOBox
          title="Ashwin Anbazhagan | iOS App Developer & Founder"
          description="Indie iOS apps for gut health, studying, morning journaling, and fandom. Each one solves one specific problem, precisely."
          keywords={['Ashwin Anbazhagan', 'iOS App Developer', 'Indie App Maker', 'SaaS Founder', 'App Developer India']}
        />

        {/* ItemList structured data — lists every app for richer home-page markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'iOS Apps by Ashwin Anbazhagan',
              itemListElement: apps.map((a, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'MobileApplication',
                  name: a.name,
                  applicationCategory: a.seoApplicationCategory,
                  operatingSystem: 'iOS',
                  url: `https://briefly.live/${a.id}`,
                  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                },
              })),
            }),
          }}
        />

        {/* ── Nav ── */}
        <nav style={{
          position: 'fixed', inset: '0 0 auto 0', zIndex: 50, height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 48px', borderBottom: `1px solid ${HAIR}`,
          backdropFilter: 'blur(14px)', background: 'rgba(10,10,12,0.82)',
        }} className="pad-x">
          <a href="#top" className="soft-link" style={{ fontFamily: DISPLAY, fontSize: 16, letterSpacing: '0.02em', fontWeight: 700, color: CREAM, textDecoration: 'none' }}>
            BRIEFLY<span style={{ color: GOLD }}>.</span>
          </a>
          <div style={{ display: 'flex', gap: 34, alignItems: 'center' }}>
            <a href="#works" className="nav-link" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.14em', color: MUTE, textDecoration: 'none' }}>Apps</a>
            <a href="#about" className="nav-link" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.14em', color: MUTE, textDecoration: 'none' }}>About</a>
            <a href="https://twitter.com/shwiinn" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.14em', color: MUTE, textDecoration: 'none' }}>Twitter</a>
          </div>
        </nav>

        {/* ── Hero — asymmetric split: left copy, right real app-icon constellation ── */}
        <section id="top" style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 64 }}>
          <div aria-hidden style={{ position: 'absolute', top: '32%', left: '-8%', width: 640, height: 640, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div className="hero-wrap pad-x" style={{ width: '100%', maxWidth: 1400, margin: '0 auto', padding: '0 60px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 40, alignItems: 'center', position: 'relative', zIndex: 2 }}>
            {/* Left column */}
            <div className="hero-pad">
              <div className="rise h0" style={{ display: 'inline-flex', alignItems: 'center', gap: 13, marginBottom: 38 }}>
                <span style={{ display: 'block', width: 26, height: 1, background: GOLD }} />
                <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.16em', color: GOLD }}>iOS developer and founder</span>
              </div>

              <h1 style={{ margin: '0 0 32px 0', padding: 0, fontFamily: DISPLAY, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 0.98, fontSize: 'clamp(2.9rem, 5.6vw, 5.4rem)' }}>
                <span className="rise h1" style={{ display: 'block', color: CREAM }}>Five iOS apps,</span>
                <span className="rise h2" style={{ display: 'block', color: CREAM }}>each for <span style={{ color: GOLD }}>one real problem.</span></span>
              </h1>

              <p className="rise h3" style={{ fontSize: 16, lineHeight: 1.7, color: MUTE, maxWidth: 460, margin: '0 0 40px 0' }}>
                Gut health, studying, morning journaling, fandom. Every app does one thing, and does it precisely.
              </p>

              <a href="#works" className="rise h4 cta-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: GOLD, color: '#1A1406', fontFamily: MONO, fontSize: 12.5, fontWeight: 500, letterSpacing: '0.04em', padding: '15px 26px', borderRadius: 999, textDecoration: 'none' }}>
                Browse the apps <ArrowRight size={15} strokeWidth={2} />
              </a>
            </div>

            {/* Right column — real app icons, floating */}
            <div className="hero-visual rise h2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 34, justifyItems: 'center', padding: '0 10px' }} aria-hidden>
              {apps.map((app, i) => (
                <div key={app.id} className="brf-icon" style={{
                  animationDelay: `${(i % 6) * 0.5}s`,
                  transform: i % 2 === 0 ? 'translateY(-16px)' : 'translateY(16px)',
                }}>
                  <img
                    src={`/${app.id}.png`}
                    alt=""
                    width={112}
                    height={112}
                    loading="eager"
                    style={{ width: 112, height: 112, borderRadius: 26, objectFit: 'cover', boxShadow: '0 20px 48px rgba(0,0,0,0.5)', border: '1px solid rgba(237,232,223,0.08)' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── App-name marquee (the single marquee on the page) ── */}
        <div style={{ overflow: 'hidden', borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}`, padding: '24px 0', background: 'rgba(212,168,67,0.02)' }}>
          <div className="brf-track">
            {[...apps, ...apps].map((app, i) => {
              const w = WORLDS[app.id];
              return (
                <span key={i} style={{ paddingLeft: 72, whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'baseline', gap: 20 }}>
                  <span style={{ fontFamily: w?.fontDisplay ?? DISPLAY, fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', fontWeight: 700, color: CREAM, opacity: 0.2, lineHeight: 1 }}>
                    {app.name}
                  </span>
                  <span style={{ color: GOLD, opacity: 0.35, fontSize: 12 }}>/</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* ── Works — the five worlds ── */}
        <section id="works" style={{ padding: '110px 0 128px', maxWidth: 1400, margin: '0 auto' }}>
          <div className="pad-x reveal-scroll" style={{ padding: '0 60px 60px 60px', maxWidth: 780 }}>
            <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4vw, 3.4rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.02, color: CREAM, margin: '0 0 16px 0' }}>
              Five apps, five worlds.
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.65, color: MUTE, margin: 0, maxWidth: 540 }}>
              Every product gets its own look and voice, built around the person it is for. All of them live on iOS, all built solo since 2024.
            </p>
          </div>

          <div className="pad-x app-grid" style={{ padding: '0 60px' }}>
            {LAYOUT.map(({ id, cls }, idx) => {
              const app = apps.find((a) => a.id === id);
              const w = WORLDS[id];
              if (!app || !w) return null;
              const feature = cls.includes('feature');
              return (
                <Link
                  key={id}
                  to={`/${id}`}
                  className={`app-card reveal-scroll ${cls}`}
                  style={{
                    background: w.cardBg,
                    boxShadow: '0 6px 28px rgba(0,0,0,0.24)',
                    minHeight: feature ? 380 : 330,
                    padding: feature ? '38px 40px 34px' : '34px 34px 30px',
                    transitionDelay: `${(idx % 2) * 0.06}s`,
                  }}
                >
                  {w.decorators}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: feature ? 30 : 26 }}>
                      <img src={`/${id}.png`} alt={app.name} width={54} height={54} style={{ width: 54, height: 54, borderRadius: 14, objectFit: 'cover', flexShrink: 0, boxShadow: '0 6px 16px rgba(0,0,0,0.18)' }} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.12em', color: w.cardText2, fontWeight: 500 }}>
                          {app.category}
                        </span>
                        <span className="app-visit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: '50%', background: w.accent, color: '#fff', flexShrink: 0 }}>
                          <ArrowUpRight size={15} strokeWidth={2} />
                        </span>
                      </div>
                    </div>

                    <h3 style={{ fontFamily: w.fontDisplay, fontSize: feature ? 'clamp(2.4rem, 3.6vw, 3.2rem)' : 'clamp(1.9rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.02, margin: '0 0 12px 0', color: w.cardText }}>
                      {app.name}
                    </h3>
                    <p style={{ fontFamily: BODY, fontSize: 13.5, color: w.cardText2, margin: 0, lineHeight: 1.5, maxWidth: 360 }}>
                      {app.tagline}
                    </p>
                  </div>

                  {w.teaser}
                  <div aria-hidden style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, background: w.accent, opacity: 0.5 }} />
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── How I build — divided list (distinct layout family) ── */}
        <section style={{ borderTop: `1px solid ${HAIR}`, padding: '104px 0', maxWidth: 1400, margin: '0 auto' }}>
          <div className="pad-x" style={{ padding: '0 60px' }}>
            <h2 className="reveal-scroll" style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4vw, 3.4rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.02, color: CREAM, margin: '0 0 56px 0' }}>
              How I build.
            </h2>

            <div className="prin-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 64 }}>
              {PRINCIPLES.map(([title, body], i) => (
                <div key={title} className="prin-row reveal-scroll" style={{
                  display: 'grid', gridTemplateColumns: '48px 1fr', alignItems: 'start', gap: 20,
                  padding: '30px 8px', borderTop: `1px solid ${HAIR}`,
                  transitionDelay: `${(i % 2) * 0.08}s`,
                }}>
                  <span style={{ fontFamily: MONO, fontSize: 13, color: GOLD, opacity: 0.7, paddingTop: 3 }}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.2rem, 1.7vw, 1.55rem)', fontWeight: 700, letterSpacing: '-0.01em', color: CREAM, margin: '0 0 10px 0' }}>{title}</h3>
                    <p style={{ fontSize: 14.5, lineHeight: 1.65, color: MUTE, margin: 0, maxWidth: '52ch' }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── About — vertical stack (fixes split-header) ── */}
        <section id="about" style={{ borderTop: `1px solid ${HAIR}`, padding: '112px 0', maxWidth: 1400, margin: '0 auto' }}>
          <div className="pad-x" style={{ padding: '0 60px', maxWidth: 780 }}>
            <h2 className="reveal-scroll" style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.06, color: CREAM, margin: '0 0 32px 0' }}>
              Every app starts from a gap that should not exist.
            </h2>
            <p className="reveal-scroll" style={{ fontSize: 17, lineHeight: 1.75, color: 'rgba(237,232,223,0.62)', margin: '0 0 40px 0', maxWidth: '62ch' }}>
              I build iOS apps for people who went looking for something specific and came back empty. Gut-safe meal plans that actually understand FODMAP. Study blocking that holds. A morning journal that keeps distracting apps asleep until you've written. Each one solves a single thing, then stops.
            </p>
            <div className="about-actions reveal-scroll" style={{ display: 'flex', gap: 26 }}>
              <a href="https://twitter.com/shwiinn" target="_blank" rel="noopener noreferrer" className="soft-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: MONO, fontSize: 11.5, letterSpacing: '0.1em', color: GOLD, textDecoration: 'none' }}>
                Twitter <ArrowUpRight size={13} strokeWidth={2} />
              </a>
              <a href="https://github.com/Ashwinn11" target="_blank" rel="noopener noreferrer" className="soft-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: MONO, fontSize: 11.5, letterSpacing: '0.1em', color: MUTE, textDecoration: 'none' }}>
                GitHub <ArrowUpRight size={13} strokeWidth={2} />
              </a>
            </div>
          </div>
        </section>

        {/* ── Contact CTA — statement ── */}
        <section style={{ borderTop: `1px solid ${HAIR}`, padding: '116px 0 108px', position: 'relative', overflow: 'hidden', maxWidth: 1400, margin: '0 auto' }}>
          <div aria-hidden style={{ position: 'absolute', top: '42%', left: '38%', transform: 'translate(-50%,-50%)', width: 680, height: 340, background: 'radial-gradient(ellipse, rgba(212,168,67,0.055) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div className="pad-x reveal-scroll" style={{ padding: '0 60px', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.6rem, 6.5vw, 5.6rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 0.98, color: CREAM, margin: '0 0 28px 0' }}>
              Have a vision?<br />
              <a href="mailto:ashwinnanbazhagan@gmail.com" className="soft-link" style={{ color: GOLD, textDecoration: 'none' }}>Let us build it.</a>
            </h2>
            <p style={{ fontFamily: MONO, fontSize: 12.5, letterSpacing: '0.06em', color: FAINT, margin: 0 }}>
              ashwinnanbazhagan@gmail.com
            </p>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer style={{ borderTop: `1px solid ${HAIR}`, padding: '30px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="pad-x">
          <span style={{ fontFamily: DISPLAY, fontSize: 15, fontWeight: 700 }}>BRIEFLY<span style={{ color: GOLD }}>.</span></span>
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.08em', color: FAINT }}>© 2026 Ashwin Anbazhagan</span>
        </footer>
      </div>
    </>
  );
};

export default Home;
