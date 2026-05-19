import React from 'react';
import { apps } from '../config/apps';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Twitter } from 'lucide-react';
import SEOBox from '../components/SEOBox';

const MARQUEE = ['Health', 'Education', 'Mindfulness', 'Biohacking', 'AI', 'iOS', 'Wellness', 'Precision', 'Design', 'Code'];

const Home: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .mq-track { animation: marquee 28s linear infinite; display: flex; width: max-content; }
        .mq-track:hover { animation-play-state: paused; }

        @keyframes revealUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .reveal { opacity: 0; animation: revealUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .d0  { animation-delay: 0.05s; }
        .d1  { animation-delay: 0.18s; }
        .d2  { animation-delay: 0.31s; }
        .d3  { animation-delay: 0.44s; }
        .d4  { animation-delay: 0.57s; }
        .d5  { animation-delay: 0.70s; }
        .d6  { animation-delay: 0.83s; }

        .strip { transition: background 0.35s ease; }
        .strip:hover { background: rgba(212,168,67,0.04) !important; }
        .strip-color {
          width: 260px; flex-shrink: 0; overflow: hidden;
          transition: width 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .strip:hover .strip-color { width: 340px; }
        .strip-arrow {
          opacity: 0; transform: translate(-6px, 6px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .strip:hover .strip-arrow { opacity: 1; transform: translate(0, 0); }
        .strip-num { transition: color 0.3s ease; }
        .strip:hover .strip-num { color: rgba(212,168,67,0.6) !important; }
        .strip-name { transition: color 0.3s ease; }

        .icon-link { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .icon-link:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(0,0,0,0.4); }

        .nav-link { transition: color 0.2s ease; }
        .nav-link:hover { color: #EDE8DF !important; }

        .cta-link { transition: opacity 0.25s ease; }
        .cta-link:hover { opacity: 0.75 !important; }

        @media (max-width: 768px) {
          .strip-color { width: 0 !important; }
          .strip:hover .strip-color { width: 0 !important; }
          .hero-grid { flex-direction: column !important; }
          .stats-row { grid-template-columns: repeat(2, 1fr) !important; gap: 28px !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .section-pad { padding-left: 28px !important; padding-right: 28px !important; }
          .strip-pad { padding-left: 28px !important; }
          .strip-num { display: none !important; }
          .cta-h2 { font-size: clamp(2.4rem, 8vw, 5rem) !important; }
        }
      `}</style>

      <div style={{ background: '#0B0B0F', color: '#EDE8DF', minHeight: '100vh', fontFamily: '"DM Mono", monospace', overflowX: 'hidden' }}>
        <SEOBox
          title="Ashwin Anbazhagan | iOS App Developer & Founder"
          description="Four iOS apps across health, education, biohacking, and mindfulness. Each one built to solve one specific problem, precisely."
          keywords={['Ashwin Anbazhagan', 'iOS App Developer', 'Indie App Maker', 'SaaS Founder', 'App Developer India']}
        />
        <div className="grain-overlay" style={{ opacity: 0.04 }} />

        {/* ── Nav ── */}
        <nav style={{
          position: 'fixed', inset: '0 0 auto 0', zIndex: 50, height: 60,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 48px',
          borderBottom: '1px solid rgba(237,232,223,0.07)',
          backdropFilter: 'blur(14px)', background: 'rgba(11,11,15,0.85)'
        }}>
          <span style={{ fontSize: 13, letterSpacing: '0.22em', fontWeight: 700, color: '#EDE8DF' }}>
            BRIEFLY<span style={{ color: '#D4A843' }}>.</span>
          </span>
          <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
            <a href="#works" className="nav-link section-pad" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(237,232,223,0.38)', textDecoration: 'none' }}>WORKS</a>
            <a href="#about" className="nav-link" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(237,232,223,0.38)', textDecoration: 'none' }}>ABOUT</a>
            <a href="https://github.com/Ashwinn11" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ color: 'rgba(237,232,223,0.38)', textDecoration: 'none', display: 'flex' }}>
              <Github size={15} />
            </a>
            <a href="https://twitter.com/shwiinn" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ color: 'rgba(237,232,223,0.38)', textDecoration: 'none', display: 'flex' }}>
              <Twitter size={15} />
            </a>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: 60 }}>

          {/* Background color band */}
          <div aria-hidden style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '38%', display: 'flex', flexDirection: 'column', pointerEvents: 'none' }}>
            {apps.map((app) => (
              <div key={app.id} style={{ flex: 1, background: app.design.primary, opacity: 0.07 }} />
            ))}
          </div>

          {/* Radial glow */}
          <div aria-hidden style={{ position: 'absolute', top: '30%', left: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div className="section-pad" style={{ padding: '0 60px', position: 'relative', zIndex: 2, maxWidth: 1100 }}>

            {/* Eyebrow */}
            <div className="reveal d0" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 52 }}>
              <span style={{ display: 'block', width: 28, height: 1, background: '#D4A843' }} />
              <span style={{ fontSize: 10, letterSpacing: '0.22em', color: '#D4A843' }}>ASHWIN ANBAZHAGAN · iOS DEVELOPER & FOUNDER</span>
            </div>

            {/* H1 */}
            <h1 style={{ margin: '0 0 52px 0', padding: 0 }}>
              <span className="reveal d1" style={{
                display: 'block',
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(3.6rem, 7.5vw, 7.2rem)',
                fontWeight: 800,
                lineHeight: 0.96,
                letterSpacing: '-0.025em',
                color: '#EDE8DF'
              }}>Apps built for</span>
              <span className="reveal d2" style={{
                display: 'block',
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(3.6rem, 7.5vw, 7.2rem)',
                fontWeight: 800,
                lineHeight: 0.96,
                letterSpacing: '-0.025em',
                fontStyle: 'italic',
                color: '#D4A843'
              }}>specific people</span>
              <span className="reveal d3" style={{
                display: 'block',
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(3.6rem, 7.5vw, 7.2rem)',
                fontWeight: 800,
                lineHeight: 0.96,
                letterSpacing: '-0.025em',
                color: '#EDE8DF'
              }}>with real problems.</span>
            </h1>

            {/* Sub */}
            <p className="reveal d4" style={{ fontSize: 14, lineHeight: 1.85, color: 'rgba(237,232,223,0.45)', maxWidth: 460, margin: '0 0 60px 0' }}>
              Four iOS apps. Gut health, study discipline, peptide research, morning focus. Each one solves exactly one thing — and does it precisely.
            </p>

            {/* Stats */}
            <div className="reveal d5 stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: '0 48px', borderTop: '1px solid rgba(237,232,223,0.1)', paddingTop: 28, marginBottom: 52, width: 'fit-content' }}>
              {[['04', 'LIVE_APPS'], ['50K+', 'DOWNLOADS'], ['iOS', 'PLATFORM'], ['2024–', 'SINCE']].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: '"Outfit", sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, color: '#EDE8DF', lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: 9, letterSpacing: '0.18em', color: 'rgba(237,232,223,0.3)', marginTop: 6 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* App icon chips */}
            <div className="reveal d6" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              {apps.map((app) => (
                <Link key={app.id} to={`/${app.id}`} className="icon-link" title={app.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px 8px 8px', borderRadius: 14, background: 'rgba(237,232,223,0.05)', border: '1px solid rgba(237,232,223,0.1)', textDecoration: 'none' }}>
                  <img src={`/${app.id}.png`} alt={app.name} style={{ width: 36, height: 36, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                  <span style={{ fontSize: 11, letterSpacing: '0.08em', color: 'rgba(237,232,223,0.6)', fontFamily: '"Outfit", sans-serif', fontWeight: 700 }}>{app.name}</span>
                </Link>
              ))}
              <a href="#works" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, letterSpacing: '0.18em', color: '#D4A843', textDecoration: 'none', marginLeft: 4 }}>
                EXPLORE <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </section>

        {/* ── Marquee ── */}
        <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(237,232,223,0.08)', borderBottom: '1px solid rgba(237,232,223,0.08)', padding: '15px 0', background: 'rgba(212,168,67,0.025)' }}>
          <div className="mq-track">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={i} style={{ padding: '0 0 0 56px', fontSize: 10, letterSpacing: '0.26em', color: 'rgba(237,232,223,0.3)', whiteSpace: 'nowrap', fontWeight: 500 }}>
                {item.toUpperCase()}<span style={{ color: '#D4A843', paddingLeft: 56 }}>·</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Works ── */}
        <section id="works" style={{ paddingTop: 100 }}>
          <div className="section-pad" style={{ padding: '0 60px 48px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 10, letterSpacing: '0.22em', color: 'rgba(237,232,223,0.3)' }}>01 / SELECTED WORKS</span>
            <span style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(237,232,223,0.2)' }}>{apps.length} PROJECTS · 2024–2026</span>
          </div>

          {apps.map((app, i) => (
            <Link key={app.id} to={`/${app.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div className="strip" style={{ display: 'flex', alignItems: 'stretch', borderTop: '1px solid rgba(237,232,223,0.08)', minHeight: 176, position: 'relative', background: 'transparent', cursor: 'pointer' }}>

                {/* Number */}
                <div className="strip-num strip-pad section-pad" style={{ width: 108, flexShrink: 0, display: 'flex', alignItems: 'center', paddingLeft: 60, fontSize: 11, letterSpacing: '0.18em', color: 'rgba(237,232,223,0.18)' }}>
                  0{i + 1}
                </div>

                {/* Content */}
                <div style={{ flex: 1, padding: '36px 40px 36px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: app.design.primary, flexShrink: 0 }} />
                    <span style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(237,232,223,0.32)' }}>{app.category.toUpperCase()} · iOS</span>
                  </div>
                  <h3 className="strip-name" style={{ fontFamily: '"Outfit", sans-serif', fontSize: 'clamp(1.7rem, 2.8vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.05, margin: '0 0 10px 0', color: '#EDE8DF' }}>
                    {app.name}
                  </h3>
                  <p style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontSize: 15, color: 'rgba(237,232,223,0.4)', margin: 0, lineHeight: 1.5 }}>
                    {app.tagline}
                  </p>
                </div>

                {/* Arrow */}
                <div className="strip-arrow" style={{ display: 'flex', alignItems: 'center', paddingRight: 44, color: '#D4A843', flexShrink: 0 }}>
                  <ArrowUpRight size={22} />
                </div>

                {/* Brand color bleed */}
                <div className="strip-color" style={{ background: app.design.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0 }}>
                  <img src={`/${app.id}.png`} alt={app.name} style={{ width: 72, height: 72, borderRadius: 18, objectFit: 'cover', boxShadow: '0 16px 36px rgba(0,0,0,0.35)' }} />
                </div>
              </div>
            </Link>
          ))}

          {/* Bottom border */}
          <div style={{ borderTop: '1px solid rgba(237,232,223,0.08)' }} />
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
