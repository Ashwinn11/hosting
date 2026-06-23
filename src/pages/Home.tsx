import React from 'react';
import { apps } from '../config/apps';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SEOBox from '../components/SEOBox';

const MARQUEE = ['FODMAP', 'Gut-Safe Meals', 'GLP-1 Tracker', 'Morning Ritual', 'Syllabus AI', 'Mood Check', 'Weight Chart', 'Gratitude', 'Injection Log', 'Relationship Journal', 'Daily Prompt', 'IBS Meal Plan'];

// Per-app card worlds — each card breaks out of the dark studio shell into its own design system
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
    cardBg: '#f4ede2',
    cardText: '#141413',
    cardText2: 'rgba(20,20,19,0.55)',
    accent: '#d97757',
    fontDisplay: '"Bricolage Grotesque", sans-serif',
    teaser: (
      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[['Mon','Lemon herb salmon'],['Tue','Chickpea bowl'],['Wed','Turkey stir-fry']].map(([day, meal]) => (
          <div key={day} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: '#d97757', width: 24 }}>{day}</span>
            <span style={{ fontSize: 11, color: 'rgba(20,20,19,0.6)' }}>{meal}</span>
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
    fontDisplay: '"Chalkboard SE", "Comic Sans MS", cursive',
    teaser: (
      <div style={{ marginTop: 18, display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 32, fontWeight: 700, color: '#2D4F1E', lineHeight: 1 }}>47</span>
        <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, color: 'rgba(26,43,18,0.45)', letterSpacing: '0.06em' }}>DAYS UNTIL EXAM</span>
      </div>
    ),
    decorators: (
      <div style={{ position: 'absolute', top: 20, right: 20, width: 40, height: 40, border: '2px dashed rgba(45,79,30,0.2)', borderRadius: 4, transform: 'rotate(8deg)' }} />
    ),
  },
  honestly: {
    cardBg: '#FDFCF9',
    cardText: '#1C1917',
    cardText2: '#78716C',
    accent: '#E07B39',
    fontDisplay: '"Caveat", cursive',
    teaser: (
      <div style={{ marginTop: 16, display: 'flex', gap: 6 }}>
        {['😊','😐','😢','👿','😭'].map((e) => (
          <span key={e} style={{ fontSize: 22, filter: 'grayscale(0.25)' }}>{e}</span>
        ))}
      </div>
    ),
    decorators: (
      <div style={{ position: 'absolute', bottom: 28, right: 24, width: 60, height: 8, background: 'rgba(224,123,57,0.18)', borderRadius: 2, transform: 'rotate(-1deg)' }} />
    ),
  },
  shotly: {
    cardBg: '#101A13',
    cardText: '#E8F5E9',
    cardText2: '#81C784',
    accent: '#27AE60',
    fontDisplay: '"Libre Baskerville", Georgia, serif',
    teaser: (
      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 28, fontWeight: 800, color: '#27AE60', lineHeight: 1 }}>↓ 2.3 lbs</span>
        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 10, color: 'rgba(232,245,233,0.4)', letterSpacing: '0.08em' }}>AVERAGE PER WEEK · TRACKED PRIVATELY</span>
      </div>
    ),
  },
  yumeship: {
    cardBg: '#FDF4F8',
    cardText: '#2D1B2E',
    cardText2: '#7B4B6B',
    accent: '#9B4F6E',
    fontDisplay: '"Instrument Serif", Georgia, serif',
    teaser: (
      <div style={{ marginTop: 16, display: 'flex', gap: 10, alignItems: 'center' }}>
        {[['#FADADD','Sakura'],['#E8E0F0','Lavender'],['#D4E8D4','Sage'],['#FFF3C4','Butter']].map(([c,n]) => (
          <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: c, border: '1.5px solid rgba(155,79,110,0.2)' }} />
            <span style={{ fontSize: 8, color: 'rgba(45,27,46,0.4)', letterSpacing: '0.06em' }}>{n.toUpperCase()}</span>
          </div>
        ))}
      </div>
    ),
    decorators: (
      <div style={{ position: 'absolute', top: 18, right: 18, fontFamily: '"Caveat", cursive', fontSize: 22, color: 'rgba(155,79,110,0.25)', transform: 'rotate(8deg)' }}>✦</div>
    ),
  },
  habithive: {
    cardBg: '#F4F1EB',
    cardText: '#16140f',
    cardText2: 'rgba(22,20,15,0.55)',
    accent: '#FBB152',
    fontDisplay: '"Georgia", serif',
    teaser: (
      <div style={{ marginTop: 16, display: 'flex', gap: -4 }}>
        {['#FFE2A0','#C7CAFF','#FFD9CB','#D4EFD6','#FFCFA8'].map((c, i) => (
          <div key={i} style={{ width: 28, height: 32, clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', backgroundColor: c, marginLeft: i === 0 ? 0 : -6, border: '1px solid rgba(22,20,15,0.08)' }} />
        ))}
        <span style={{ marginLeft: 10, fontSize: 11, color: 'rgba(22,20,15,0.45)', alignSelf: 'center' }}>🐝 hive growing</span>
      </div>
    ),
    decorators: (
      <div style={{ position: 'absolute', top: 16, right: 16, fontSize: 22, opacity: 0.3 }}>🍯</div>
    ),
  },
};

const Home: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .mq-track  { animation: marquee 28s linear infinite; display: flex; width: max-content; }
        .mq-track:hover { animation-play-state: paused; }

        @keyframes namescroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ns-track { animation: namescroll 40s linear infinite; display: flex; width: max-content; }
        .ns-track:hover { animation-play-state: paused; }

        @keyframes revealUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .reveal { opacity: 0; animation: revealUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .d0 { animation-delay: 0.05s; } .d1 { animation-delay: 0.18s; }
        .d2 { animation-delay: 0.31s; } .d3 { animation-delay: 0.44s; }
        .d4 { animation-delay: 0.57s; } .d5 { animation-delay: 0.70s; }

        .app-card {
          position: relative; overflow: hidden; border-radius: 24px;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer; text-decoration: none; display: block;
        }
        .app-card:hover { transform: translateY(-6px); }
        .app-card-visit {
          opacity: 0; transform: translateY(8px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .app-card:hover .app-card-visit { opacity: 1; transform: translateY(0); }

        .nav-link { transition: color 0.2s ease; }
        .nav-link:hover { color: #EDE8DF !important; }
        .cta-link { transition: opacity 0.25s ease; }
        .cta-link:hover { opacity: 0.7 !important; }

        @media (max-width: 768px) {
          .hero-pad { padding: 0 28px !important; }
          .app-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .stats-row { grid-template-columns: repeat(2, auto) !important; gap: 0 36px !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .section-pad { padding-left: 28px !important; padding-right: 28px !important; }
          .cta-h2 { font-size: clamp(2.4rem, 8vw, 5rem) !important; }
          .ns-name { font-size: clamp(2rem, 6vw, 3.2rem) !important; }
        }
      `}</style>

      <div style={{ background: '#0B0B0F', color: '#EDE8DF', minHeight: '100vh', fontFamily: '"DM Mono", monospace', overflowX: 'hidden' }}>
        <SEOBox
          title="Ashwin Anbazhagan | iOS App Developer & Founder"
          description="Six iOS apps across health, education, biohacking, and mindfulness. Each one built to solve one specific problem, precisely."
          keywords={['Ashwin Anbazhagan', 'iOS App Developer', 'Indie App Maker', 'SaaS Founder', 'App Developer India']}
        />

        {/* ── Nav ── */}
        <nav style={{
          position: 'fixed', inset: '0 0 auto 0', zIndex: 50, height: 60,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 48px',
          borderBottom: '1px solid rgba(237,232,223,0.07)',
          backdropFilter: 'blur(14px)', background: 'rgba(11,11,15,0.85)',
        }}>
          <span style={{ fontSize: 13, letterSpacing: '0.22em', fontWeight: 700, color: '#EDE8DF' }}>
            BRIEFLY<span style={{ color: '#D4A843' }}>.</span>
          </span>
          <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
            <a href="#works" className="nav-link" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(237,232,223,0.38)', textDecoration: 'none' }}>WORKS</a>
            <a href="#about" className="nav-link" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(237,232,223,0.38)', textDecoration: 'none' }}>ABOUT</a>
            <a href="https://twitter.com/shwiinn" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(237,232,223,0.38)', textDecoration: 'none' }}>TWITTER</a>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: 60 }}>

          {/* Radial glow */}
          <div aria-hidden style={{ position: 'absolute', top: '30%', left: '-10%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,67,0.055) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div className="hero-pad" style={{ padding: '0 60px', position: 'relative', zIndex: 2, maxWidth: 1100 }}>

            {/* Eyebrow */}
            <div className="reveal d0" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 52 }}>
              <span style={{ display: 'block', width: 28, height: 1, background: '#D4A843' }} />
              <span style={{ fontSize: 10, letterSpacing: '0.22em', color: '#D4A843' }}>ASHWIN ANBAZHAGAN · iOS DEVELOPER & FOUNDER</span>
            </div>

            {/* H1 */}
            <h1 style={{ margin: '0 0 52px 0', padding: 0 }}>
              <span className="reveal d1" style={{ display: 'block', fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(3.6rem, 7.5vw, 7.2rem)', fontWeight: 800, lineHeight: 0.96, letterSpacing: '-0.025em', color: '#EDE8DF' }}>Apps built for</span>
              <span className="reveal d2" style={{ display: 'block', fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(3.6rem, 7.5vw, 7.2rem)', fontWeight: 800, lineHeight: 0.96, letterSpacing: '-0.025em', fontStyle: 'italic', color: '#D4A843' }}>specific people</span>
              <span className="reveal d3" style={{ display: 'block', fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(3.6rem, 7.5vw, 7.2rem)', fontWeight: 800, lineHeight: 0.96, letterSpacing: '-0.025em', color: '#EDE8DF' }}>with real problems.</span>
            </h1>

            {/* Sub */}
            <p className="reveal d4" style={{ fontSize: 14, lineHeight: 1.85, color: 'rgba(237,232,223,0.45)', maxWidth: 460, margin: '0 0 60px 0' }}>
              Five iOS apps. Gut health, study discipline, peptide tracking, morning focus. Each one solves exactly one thing — and does it precisely.
            </p>

            {/* Stats */}
            <div className="reveal d5 stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: '0 48px', borderTop: '1px solid rgba(237,232,223,0.1)', paddingTop: 28, marginBottom: 52, width: 'fit-content' }}>
              {[['06', 'LIVE_APPS'], ['50K+', 'DOWNLOADS'], ['iOS', 'PLATFORM'], ['2024–', 'SINCE']].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: '"Outfit", sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, color: '#EDE8DF', lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: 9, letterSpacing: '0.18em', color: 'rgba(237,232,223,0.3)', marginTop: 6 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Scroll hint */}
            <div className="reveal d5" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <a href="#works" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 10, letterSpacing: '0.2em', color: '#D4A843', textDecoration: 'none' }}>
                EXPLORE THE APPS <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </section>

        {/* ── App name scroll strip ── */}
        <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(237,232,223,0.08)', borderBottom: '1px solid rgba(237,232,223,0.06)', padding: '28px 0', background: 'rgba(11,11,15,1)' }}>
          <div className="ns-track">
            {[...apps, ...apps].map((app, i) => {
              const w = WORLDS[app.id];
              return (
                <span key={i} style={{ paddingLeft: 64, whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'baseline', gap: 16 }}>
                  <span className="ns-name" style={{ fontFamily: w?.fontDisplay ?? '"Outfit", sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, color: '#EDE8DF', opacity: 0.18, lineHeight: 1 }}>
                    {app.name}
                  </span>
                  <span style={{ fontSize: 10, letterSpacing: '0.2em', color: '#D4A843', opacity: 0.3 }}>·</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* ── Marquee ── */}
        <div style={{ overflow: 'hidden', borderBottom: '1px solid rgba(237,232,223,0.08)', padding: '14px 0', background: 'rgba(212,168,67,0.025)' }}>
          <div className="mq-track">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={i} style={{ padding: '0 0 0 48px', fontSize: 10, letterSpacing: '0.22em', color: 'rgba(237,232,223,0.3)', whiteSpace: 'nowrap', fontWeight: 500 }}>
                {item.toUpperCase()}<span style={{ color: '#D4A843', paddingLeft: 48 }}>·</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Works ── */}
        <section id="works" style={{ padding: '100px 0 120px' }}>
          <div className="section-pad" style={{ padding: '0 60px 56px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 10, letterSpacing: '0.22em', color: 'rgba(237,232,223,0.3)' }}>01 / SELECTED WORKS</span>
            <span style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(237,232,223,0.2)' }}>{apps.length} PROJECTS · 2024–2026</span>
          </div>

          {/* App card grid */}
          <div className="section-pad app-grid" style={{ padding: '0 60px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {apps.map((app) => {
              const w = WORLDS[app.id];
              if (!w) return null;
              return (
                <Link key={app.id} to={`/${app.id}`} className="app-card" style={{ background: w.cardBg, boxShadow: '0 4px 24px rgba(0,0,0,0.18)' }}>
                  {/* Decorator (optional per app) */}
                  {w.decorators}

                  <div style={{ padding: '36px 36px 32px' }}>
                    {/* Top row: icon + category */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                      <img src={`/${app.id}.png`} alt={app.name} style={{ width: 52, height: 52, borderRadius: 14, objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 9, letterSpacing: '0.18em', fontFamily: '"DM Mono", monospace', color: w.cardText2, fontWeight: 500 }}>
                          {app.category.toUpperCase()} · iOS
                        </span>
                        <div className="app-card-visit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', background: w.accent, color: '#fff', flexShrink: 0 }}>
                          <ArrowUpRight size={14} />
                        </div>
                      </div>
                    </div>

                    {/* App name */}
                    <h3 style={{ fontFamily: w.fontDisplay, fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.05, margin: '0 0 10px 0', color: w.cardText }}>
                      {app.name}
                    </h3>

                    {/* Tagline */}
                    <p style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontSize: 13, color: w.cardText2, margin: 0, lineHeight: 1.5, opacity: 0.8 }}>
                      {app.tagline}
                    </p>

                    {/* Teaser */}
                    {w.teaser}
                  </div>

                  {/* Bottom accent line */}
                  <div style={{ height: 3, background: w.accent, opacity: 0.45 }} />
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" style={{ padding: '140px 60px' }} className="section-pad">
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', maxWidth: 1060 }}>
            <div>
              <span style={{ display: 'block', fontSize: 10, letterSpacing: '0.22em', color: 'rgba(237,232,223,0.28)', marginBottom: 36 }}>02 / ABOUT THE WORK</span>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.9rem, 3.5vw, 3.2rem)', fontWeight: 700, fontStyle: 'italic', lineHeight: 1.18, color: '#EDE8DF', margin: 0 }}>
                Every app starts from a gap that shouldn't exist.
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 28 }}>
              <p style={{ fontSize: 14, lineHeight: 1.85, color: 'rgba(237,232,223,0.48)', margin: 0 }}>
                I build iOS apps for people who've looked for something specific and couldn't find it. Gut health scanning that knows FODMAP. Study blocking that actually sticks. Peptide tracking with real reconstitution math. Each product solves one thing — nothing more.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {['iOS-native, no bloat', 'AI where it genuinely helps', 'One problem, solved precisely', 'Free to download, honest monetization'].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, letterSpacing: '0.1em', color: 'rgba(237,232,223,0.38)' }}>
                    <span style={{ color: '#D4A843', flexShrink: 0 }}>→</span>
                    {item}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 24, paddingTop: 8 }}>
                <a href="https://twitter.com/shwiinn" target="_blank" rel="noopener noreferrer" className="cta-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 10, letterSpacing: '0.18em', color: '#D4A843', textDecoration: 'none', opacity: 1 }}>
                  TWITTER <ArrowUpRight size={12} />
                </a>
                <a href="https://github.com/Ashwinn11" target="_blank" rel="noopener noreferrer" className="cta-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 10, letterSpacing: '0.18em', color: 'rgba(237,232,223,0.38)', textDecoration: 'none', opacity: 1 }}>
                  GITHUB <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ borderTop: '1px solid rgba(237,232,223,0.08)', padding: '110px 60px 100px 60px', position: 'relative', overflow: 'hidden' }} className="section-pad">
          <div aria-hidden style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: 700, height: 350, background: 'radial-gradient(ellipse, rgba(212,168,67,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ display: 'block', fontSize: 10, letterSpacing: '0.22em', color: 'rgba(237,232,223,0.28)', marginBottom: 40 }}>03 / LET'S WORK TOGETHER</span>
            <h2 className="cta-h2" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(3rem, 7.5vw, 6.8rem)', fontWeight: 800, fontStyle: 'italic', lineHeight: 0.95, letterSpacing: '-0.02em', color: '#EDE8DF', margin: '0 0 32px 0' }}>
              Have a vision?<br />
              <a href="mailto:ashwinnanbazhagan@gmail.com" className="cta-link" style={{ color: '#D4A843', textDecoration: 'none' }}>
                Let's build it.
              </a>
            </h2>
            <p style={{ fontSize: 12, letterSpacing: '0.15em', color: 'rgba(237,232,223,0.28)', margin: 0 }}>
              ashwinnanbazhagan@gmail.com · OPEN TO PARTNERSHIPS
            </p>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer style={{ borderTop: '1px solid rgba(237,232,223,0.06)', padding: '28px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="section-pad">
          <span style={{ fontSize: 12, letterSpacing: '0.22em', fontWeight: 700 }}>BRIEFLY<span style={{ color: '#D4A843' }}>.</span></span>
          <span style={{ fontSize: 9, letterSpacing: '0.14em', color: 'rgba(237,232,223,0.22)' }}>© 2026 ASHWIN ANBAZHAGAN · ALL RIGHTS RESERVED</span>
        </footer>
      </div>
    </>
  );
};

export default Home;
