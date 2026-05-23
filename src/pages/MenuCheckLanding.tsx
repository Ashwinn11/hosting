import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import type { AppConfig } from '../config/apps';
import SEOBox from '../components/SEOBox';
import AppLayout from '../components/AppLayout';
import LegalContent from './LegalContent';

interface Props {
  app: AppConfig;
  section?: 'privacy' | 'terms' | 'support';
}

const PRIMARY = '#2D7A52';
const DARK_GREEN = '#1A4D34';

const marqueeStyle = `
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .marquee-track {
    display: flex;
    width: max-content;
    animation: marquee 28s linear infinite;
  }
  .marquee-track:hover {
    animation-play-state: paused;
  }
`;

const MenuCheckLanding: React.FC<Props> = ({ app, section }) => {
  if (section) {
    return (
      <AppLayout app={app}>
        <div style={{ color: '#1A1A1A' }}>
          <LegalContent app={app} section={section} />
        </div>
      </AppLayout>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>{marqueeStyle}</style>
      <SEOBox
        title={app.seo.title}
        description={app.seo.description}
        keywords={app.seo.keywords}
        appId={app.id}
        appStoreUrl={app.appStoreUrl}
        appCategory="HealthApplication"
        aggregateRating={app.aggregateRating}
        faqs={app.marketing.faqs}
        appNumericId={app.appNumericId}
        screenshots={app.marketing.screenshots}
      />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md" style={{ backgroundColor: 'rgba(255,255,255,0.96)', borderBottom: '1px solid rgba(45,122,82,0.1)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity" style={{ color: PRIMARY }}>
            <ChevronLeft size={15} />
            <span className="text-xs font-mono uppercase tracking-widest">All Apps</span>
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl overflow-hidden" style={{ border: `1.5px solid ${PRIMARY}25` }}>
              <img src="/menucheck.png" alt="Menu Check" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-base" style={{ color: PRIMARY }}>Menu Check</span>
          </Link>
          <a
            href={app.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold px-5 py-2 rounded-full text-white transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: PRIMARY }}
          >
            Get Free
          </a>
        </div>
      </nav>

      <main>
        {/* ── HERO ── */}
        <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-8" style={{ backgroundColor: `${PRIMARY}10`, color: PRIMARY }}>
                <CheckCircle size={12} />
                IBS · Celiac · FODMAP · 100+ conditions
              </div>
              <h1 className="font-black leading-[1.08] mb-6" style={{ fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)', color: '#0F0F0F' }}>
                You're at a restaurant.<br />
                Your gut can't afford<br />
                <span style={{ color: PRIMARY }}>to guess.</span>
              </h1>
              <p className="text-xl leading-relaxed mb-8 max-w-md" style={{ color: 'rgba(0,0,0,0.5)' }}>
                Menu Check scans any menu or barcode and gives you an instant verdict — Safe, Limit, or Avoid — based on your exact conditions.
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform active:scale-95">
                  <img src="/appstore.png" alt="Download on App Store" className="h-12" />
                </a>
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'rgba(0,0,0,0.25)' }}>iOS · Free</span>
              </div>
            </div>

            {/* Right: Verdict card UI */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-sm rounded-[28px] overflow-hidden shadow-2xl" style={{ border: `1.5px solid rgba(0,0,0,0.08)`, boxShadow: `0 24px 80px rgba(45,122,82,0.12), 0 8px 32px rgba(0,0,0,0.06)` }}>
                {/* Card header */}
                <div className="px-6 pt-6 pb-4" style={{ backgroundColor: '#F8FBF9', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] mb-1" style={{ color: 'rgba(0,0,0,0.3)' }}>Menu Check · Analyzing</p>
                  <p className="font-bold text-xl" style={{ color: '#1A1A1A' }}>Pasta Primavera</p>
                </div>

                {/* Verdict badge */}
                <div className="px-6 py-5" style={{ backgroundColor: '#FEF8E7' }}>
                  <div className="flex items-center gap-3">
                    <AlertCircle size={22} style={{ color: '#C08000' }} />
                    <div>
                      <span className="font-black text-3xl tracking-tight" style={{ color: '#C08000' }}>LIMIT</span>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(0,0,0,0.45)' }}>Contains moderate triggers for your profile</p>
                    </div>
                  </div>
                </div>

                {/* Ingredient rows */}
                <div className="px-6 py-4 space-y-3" style={{ backgroundColor: '#fff' }}>
                  <p className="font-mono text-[9px] uppercase tracking-widest mb-4" style={{ color: 'rgba(0,0,0,0.3)' }}>Ingredient breakdown</p>
                  {[
                    { name: 'Garlic', verdict: 'AVOID', color: '#C0392B', dot: '#C0392B' },
                    { name: 'Olive oil', verdict: 'SAFE', color: '#2D7A52', dot: '#2D7A52' },
                    { name: 'Parmesan', verdict: 'LIMIT', color: '#C08000', dot: '#C08000' },
                    { name: 'Pasta (wheat)', verdict: 'AVOID', color: '#C0392B', dot: '#C0392B' },
                    { name: 'Cherry tomatoes', verdict: 'SAFE', color: '#2D7A52', dot: '#2D7A52' },
                  ].map(({ name, verdict, color, dot }) => (
                    <div key={name} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: dot }} />
                        <span className="text-sm" style={{ color: '#1A1A1A' }}>{name}</span>
                      </div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color }}>{verdict}</span>
                    </div>
                  ))}
                </div>

                {/* Card footer */}
                <div className="px-6 py-4" style={{ backgroundColor: '#F8FBF9', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(0,0,0,0.45)' }}>
                    Based on your IBS + FODMAP profile. Garlic and wheat are high-trigger for your conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST STRIP ── */}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', borderBottom: '1px solid rgba(0,0,0,0.07)', backgroundColor: '#FAFAFA' }}>
          <div className="max-w-6xl mx-auto px-6 py-4">
            <p className="font-mono text-xs text-center uppercase tracking-[0.25em]" style={{ color: 'rgba(0,0,0,0.35)' }}>
              3,000,000+ products scanned &nbsp;·&nbsp; 100+ conditions supported &nbsp;·&nbsp; iOS &nbsp;·&nbsp; Free
            </p>
          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <section className="py-28 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: 'rgba(0,0,0,0.25)' }}>Three seconds to a verdict</p>
            <h2 className="font-black" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#0F0F0F' }}>How it works.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-0">
            {[
              { num: '01', heading: 'Point your camera', body: 'Aim at any restaurant menu, grocery barcode, or dish. Menu Check reads it instantly.' },
              { num: '02', heading: 'Your profile checks everything', body: 'Every ingredient is cross-referenced against your conditions, diet, and strictness level.' },
              { num: '03', heading: 'Safe. Limit. Avoid.', body: 'A clear, color-coded verdict in seconds. No guessing. No decoding ingredient lists.' },
            ].map(({ num, heading, body }, i) => (
              <div
                key={i}
                className="px-8 py-10"
                style={{
                  borderLeft: i > 0 ? '1px solid rgba(0,0,0,0.08)' : 'none',
                }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-mono font-black text-sm mb-6"
                  style={{ backgroundColor: `${PRIMARY}12`, color: PRIMARY, border: `1.5px solid ${PRIMARY}25` }}
                >
                  {num}
                </div>
                <h3 className="font-black text-xl mb-3" style={{ color: '#0F0F0F' }}>{heading}</h3>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(0,0,0,0.5)' }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── VERDICT SYSTEM ── */}
        <section className="px-0 overflow-hidden" style={{ backgroundColor: '#F8FBF9' }}>
          <div className="max-w-6xl mx-auto px-6 pt-20 pb-8 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: 'rgba(0,0,0,0.25)' }}>Every scan returns one of three results</p>
            <h2 className="font-black mb-16" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#0F0F0F' }}>Clear verdicts. No confusion.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-0">
            {[
              {
                verdict: 'SAFE',
                icon: CheckCircle,
                color: '#2D7A52',
                bg: '#F0FAF4',
                borderColor: '#2D7A52',
                food: 'Grilled Salmon + Rice',
                reason: 'No triggers detected for your IBS and FODMAP profile. All ingredients are within your safe limits.',
              },
              {
                verdict: 'LIMIT',
                icon: AlertCircle,
                color: '#C08000',
                bg: '#FEF8E7',
                borderColor: '#C08000',
                food: 'Caesar Salad',
                reason: 'Contains onion powder — a moderate FODMAP trigger. Safe in small portions. Avoid the croutons.',
              },
              {
                verdict: 'AVOID',
                icon: AlertTriangle,
                color: '#C0392B',
                bg: '#FEF0EF',
                borderColor: '#C0392B',
                food: 'Garlic Bread Pasta',
                reason: 'Gluten, lactose, and garlic all detected — multiple high triggers for your conditions.',
              },
            ].map(({ verdict, icon: Icon, color, bg, borderColor, food, reason }) => (
              <div
                key={verdict}
                className="px-10 py-16 flex flex-col"
                style={{
                  backgroundColor: bg,
                  borderTop: `4px solid ${borderColor}`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon size={20} style={{ color }} />
                  <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'rgba(0,0,0,0.4)' }}>Verdict</span>
                </div>
                <div className="font-black mb-3" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color, lineHeight: 1 }}>{verdict}</div>
                <p className="font-mono text-xs uppercase tracking-widest mb-6" style={{ color: 'rgba(0,0,0,0.4)' }}>{food}</p>
                <p className="text-base leading-relaxed mt-auto" style={{ color: 'rgba(0,0,0,0.6)' }}>{reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONDITIONS MARQUEE ── */}
        <section style={{ backgroundColor: DARK_GREEN, overflow: 'hidden' }} className="py-5">
          <div className="marquee-track">
            {[1, 2].map((rep) => (
              <span key={rep} className="font-mono text-xs uppercase tracking-widest whitespace-nowrap pr-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
                IBS &nbsp;·&nbsp; FODMAP &nbsp;·&nbsp; Celiac &nbsp;·&nbsp; Crohn's &nbsp;·&nbsp; SIBO &nbsp;·&nbsp; Histamine Intolerance &nbsp;·&nbsp; Gluten-Free &nbsp;·&nbsp; Dairy-Free &nbsp;·&nbsp; Nut-Free &nbsp;·&nbsp; IBD &nbsp;·&nbsp; Vegan &nbsp;·&nbsp; Low-FODMAP &nbsp;·&nbsp; Fructose Malabsorption &nbsp;·&nbsp; Lactose Intolerance &nbsp;·&nbsp; Egg-Free &nbsp;·&nbsp;
              </span>
            ))}
          </div>
        </section>

        {/* ── SINGLE SCREENSHOT ── */}
        <section className="py-28 px-6 text-center" style={{ backgroundColor: '#fff' }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] mb-12" style={{ color: 'rgba(0,0,0,0.25)' }}>The app</p>
          <div className="flex justify-center">
            <div
              className="overflow-hidden"
              style={{
                width: '240px',
                borderRadius: '36px',
                border: '1.5px solid rgba(0,0,0,0.1)',
                boxShadow: `0 32px 80px rgba(45,122,82,0.15), 0 8px 24px rgba(0,0,0,0.08)`,
              }}
            >
              <img
                src="/menucheck/03.png"
                alt="Menu Check app"
                className="w-full"
                style={{ aspectRatio: '9/19', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ── FEATURE PAIR ── */}
        <section className="py-24 px-6" style={{ backgroundColor: '#F8FBF9' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-black" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#0F0F0F' }}>Two ways to scan. One verdict.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-0">
              {[
                {
                  title: 'Barcode Scanner',
                  sub: '3,000,000+ grocery products',
                  body: `Point your camera at any grocery barcode and Menu Check cross-references every ingredient against your full health profile in under a second. Powered by OpenFoodFacts with over 3 million products worldwide. No manual searching, no ingredient decoding — just a clear verdict with the reasoning behind it. Works offline for previously scanned products.`,
                },
                {
                  title: 'Menu Photo AI',
                  sub: 'At any restaurant, anywhere',
                  body: `Take a photo of any restaurant menu — handwritten, printed, digital — and Menu Check's AI reads every dish and scores it against your specific conditions. No more asking waiters who aren't sure. No more guessing at the table. Get a color-coded list of every item on the menu, sorted from safest to most risky for your exact profile.`,
                },
              ].map(({ title, sub, body }, i) => (
                <div
                  key={i}
                  className="px-10 py-12"
                  style={{ borderLeft: i === 1 ? '1px solid rgba(0,0,0,0.08)' : 'none' }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: `${PRIMARY}80` }}>{sub}</p>
                  <h3 className="font-black text-2xl mb-5" style={{ color: '#0F0F0F' }}>{title}</h3>
                  <p className="text-base leading-relaxed" style={{ color: 'rgba(0,0,0,0.55)', maxWidth: '420px' }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-32 px-6 text-center" style={{ backgroundColor: DARK_GREEN }}>
          <p className="font-mono text-xs uppercase tracking-[0.3em] mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>Free on iOS</p>
          <h2 className="font-black text-white mb-8 leading-tight" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}>
            Stop guessing.<br />Start eating safely.
          </h2>
          <p className="text-lg mb-10 max-w-sm mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Join people with IBS, Celiac, Crohn's, and food sensitivities who eat out without anxiety.
          </p>
          <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-block hover:scale-105 transition-transform active:scale-95">
            <img src="/appstore.png" alt="Download on App Store" className="h-14" />
          </a>
        </section>

        {/* Footer */}
        <footer className="py-10 px-6 bg-white" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 opacity-30 hover:opacity-100 transition-opacity">
            <div className="flex gap-8 font-mono text-xs uppercase tracking-widest font-bold" style={{ color: '#1A1A1A' }}>
              <Link to="/menucheck/privacy-policy" className="hover:opacity-60 transition-opacity">Privacy</Link>
              <Link to="/menucheck/terms-of-service" className="hover:opacity-60 transition-opacity">Terms</Link>
              <Link to="/menucheck/support" className="hover:opacity-60 transition-opacity">Support</Link>
            </div>
            <p className="font-mono text-xs uppercase tracking-widest" style={{ color: '#1A1A1A' }}>© 2026 Ashwin Anbazhagan // briefly.live</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default MenuCheckLanding;
