import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Shield } from 'lucide-react';
import type { AppConfig } from '../config/apps';
import SEOBox from '../components/SEOBox';
import AppLayout from '../components/AppLayout';
import LegalContent from './LegalContent';

interface Props {
  app: AppConfig;
  section?: 'privacy' | 'terms' | 'support';
}

const DARK = '#0A0E1A';
const PURPLE = '#5856D6';
const ACCENT = '#7C7AEE';
const SURFACE = '#111827';
const BORDER = 'rgba(88,86,214,0.2)';
const TEXT_DIM = 'rgba(255,255,255,0.45)';

const marqueeStyle = `
  @keyframes marquee-p {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .marquee-pep {
    display: flex;
    width: max-content;
    animation: marquee-p 32s linear infinite;
  }
`;

const PepKitLanding: React.FC<Props> = ({ app, section }) => {
  if (section) {
    return (
      <AppLayout app={app}>
        <LegalContent app={app} section={section} />
      </AppLayout>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: DARK, color: '#fff', fontFamily: '"Inter", system-ui, sans-serif' }}>
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

      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: `linear-gradient(rgba(88,86,214,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(88,86,214,0.04) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        background: `radial-gradient(ellipse 60% 50% at 50% 0%, rgba(88,86,214,0.12) 0%, transparent 70%)`,
      }} />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md" style={{ backgroundColor: 'rgba(10,14,26,0.9)', borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-100 opacity-40" style={{ color: ACCENT }}>
            <ChevronLeft size={16} />
            <span className="font-mono text-[10px] uppercase tracking-widest">All Apps</span>
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl overflow-hidden border" style={{ borderColor: BORDER }}>
              <img src="/pepkit.png" alt="PepKit" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">PepKit</span>
          </Link>
          <a
            href={app.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-sm px-5 py-2 rounded-xl transition-all hover:scale-105 active:scale-95 text-white"
            style={{ backgroundColor: PURPLE, border: `1px solid ${ACCENT}40`, boxShadow: `0 0 20px ${PURPLE}40` }}
          >
            Download Free
          </a>
        </div>
      </nav>

      <main className="relative z-10">
        {/* ── HERO ── */}
        <section className="pt-36 pb-24 px-6 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold mb-8 uppercase tracking-widest" style={{ backgroundColor: `${PURPLE}18`, color: ACCENT, border: `1px solid ${BORDER}` }}>
                <Shield size={11} /> Peptide Research Toolkit · iOS
              </div>
              <h1 className="font-black leading-[1.05] tracking-tight mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)' }}>
                Peptide reconstitution<br />
                math,{' '}
                <span style={{ color: ACCENT }}>done right.</span>
              </h1>
              <p className="text-xl leading-relaxed mb-10 max-w-lg" style={{ color: TEXT_DIM }}>
                Reconstitution calculator, cycle tracker, inventory alerts, compound level curves, and lab results — all in one place.
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform active:scale-95">
                  <img src="/appstore.png" alt="Download on App Store" className="h-12" />
                </a>
                <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: TEXT_DIM }}>iOS · Free</span>
              </div>
            </div>

            {/* Right: Calculator card */}
            <div className="flex justify-center lg:justify-end">
              <div
                className="w-full max-w-sm rounded-[24px] overflow-hidden"
                style={{
                  backgroundColor: SURFACE,
                  border: `1.5px solid ${ACCENT}50`,
                  boxShadow: `0 0 60px ${PURPLE}25, 0 16px 48px rgba(0,0,0,0.4)`,
                }}
              >
                {/* Card header */}
                <div className="px-6 pt-6 pb-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] mb-1" style={{ color: TEXT_DIM }}>PepKit</p>
                  <p className="font-bold text-sm tracking-tight" style={{ color: ACCENT }}>RECONSTITUTION CALCULATOR</p>
                </div>

                {/* Calc rows */}
                <div className="px-6 py-5 space-y-0">
                  {[
                    { label: 'Vial size', value: '5 mg', highlight: false },
                    { label: 'BAC water', value: '2 mL', highlight: false },
                    { label: 'Target dose', value: '250 mcg', highlight: false },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center py-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
                      <span className="font-mono text-xs uppercase tracking-widest" style={{ color: TEXT_DIM }}>{label}</span>
                      <span className="font-mono font-bold text-sm text-white">{value}</span>
                    </div>
                  ))}

                  {/* Divider */}
                  <div className="py-2">
                    <div className="font-mono text-[10px]" style={{ color: `${ACCENT}40` }}>{'─'.repeat(28)}</div>
                  </div>

                  {/* Result row — highlighted */}
                  <div
                    className="flex justify-between items-center px-4 py-4 rounded-xl"
                    style={{ backgroundColor: `${PURPLE}25`, border: `1px solid ${ACCENT}40` }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm" style={{ color: ACCENT }}>→</span>
                      <span className="font-mono text-xs uppercase tracking-widest" style={{ color: ACCENT }}>Draw</span>
                    </div>
                    <span className="font-black text-2xl tracking-tight text-white">10 <span className="text-base font-normal" style={{ color: TEXT_DIM }}>units</span></span>
                  </div>
                </div>

                <div className="px-6 py-4" style={{ borderTop: `1px solid ${BORDER}` }}>
                  <p className="font-mono text-[10px]" style={{ color: TEXT_DIM }}>Concentration: 2.5 mg/mL · Auto-calculated</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PRECISION STATS STRIP ── */}
        <div style={{ backgroundColor: SURFACE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }} className="py-4 overflow-hidden">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-center" style={{ color: TEXT_DIM }}>
            CLINICAL ACCURACY &nbsp;·&nbsp; AUTO-DEDUCTING INVENTORY &nbsp;·&nbsp; HALF-LIFE CURVES &nbsp;·&nbsp; LAB RESULT TRACKING &nbsp;·&nbsp; 9 COMPOUND CATEGORIES
          </p>
        </div>

        {/* ── COMPOUND BROWSER ── */}
        <section className="py-24 px-6 overflow-hidden" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div className="max-w-6xl mx-auto mb-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: TEXT_DIM }}>Compound library</p>
            <h2 className="font-black text-3xl md:text-4xl tracking-tight">Every peptide, researched.</h2>
          </div>

          {/* Marquee */}
          <div className="overflow-hidden mb-10">
            <div className="marquee-pep">
              {[1, 2].map((rep) => (
                <span key={rep} className="font-mono text-sm uppercase tracking-widest whitespace-nowrap pr-8" style={{ color: `${ACCENT}70` }}>
                  BPC-157 &nbsp;·&nbsp; TB-500 &nbsp;·&nbsp; Semaglutide &nbsp;·&nbsp; Tirzepatide &nbsp;·&nbsp; Ipamorelin &nbsp;·&nbsp; CJC-1295 &nbsp;·&nbsp; PT-141 &nbsp;·&nbsp; HGH &nbsp;·&nbsp; NAD+ &nbsp;·&nbsp; Selank &nbsp;·&nbsp; Semax &nbsp;·&nbsp; Epithalon &nbsp;·&nbsp; GHRP-2 &nbsp;·&nbsp; GHRP-6 &nbsp;·&nbsp; Hexarelin &nbsp;·&nbsp; Melanotan II &nbsp;·&nbsp;
                </span>
              ))}
            </div>
          </div>

          {/* Category pills */}
          <div className="max-w-6xl mx-auto flex flex-wrap gap-2">
            {['Healing & Recovery', 'Growth Hormone', 'Cognitive', 'Metabolic & Weight Loss', 'Fat Loss', 'Immunity & Longevity', 'Skin & Collagen', 'Libido & Sexual'].map(cat => (
              <span key={cat} className="px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wide" style={{ backgroundColor: `${PURPLE}15`, color: ACCENT, border: `1px solid ${BORDER}` }}>
                {cat}
              </span>
            ))}
          </div>
        </section>

        {/* ── ALTERNATING FEATURE SHOWCASE ── */}
        <section className="py-12">
          {[
            {
              img: '/pepkit/03.png',
              imgLeft: true,
              label: 'Reconstitution Calculator',
              heading: 'The math, done for you.',
              body: 'Enter your vial size, BAC water volume, and target dose. PepKit calculates the exact number of units to draw from your syringe — step by step, with no room for error. Supports any peptide, any dose, any concentration ratio.',
            },
            {
              img: '/pepkit/04.png',
              imgLeft: false,
              label: 'Cycle Planner',
              heading: 'Every compound. Every day.',
              body: 'Build multi-compound protocols with start and end dates. See all active cycles and which compounds are due today on a single dashboard. Half-life curves show you exactly when each compound is active in your system.',
            },
            {
              img: '/pepkit/05.png',
              imgLeft: true,
              label: 'Inventory + Lab Tracker',
              heading: 'Never run out mid-cycle.',
              body: 'Every dose you log auto-deducts from your vial inventory. When stock drops to 20%, PepKit alerts you before you run out. Log blood work alongside your cycles and track how your labs respond to each protocol over time.',
            },
          ].map(({ img, imgLeft, label, heading, body }, i) => (
            <div
              key={i}
              className="py-16 px-6"
              style={{ borderTop: i > 0 ? `1px solid ${BORDER}` : 'none' }}
            >
              <div className={`max-w-6xl mx-auto flex flex-col ${imgLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 items-center`}>
                {/* Phone */}
                <div className="flex-shrink-0 flex justify-center">
                  <div
                    className="overflow-hidden"
                    style={{
                      width: '220px',
                      borderRadius: '28px',
                      border: `1.5px solid ${BORDER}`,
                      boxShadow: `0 0 40px ${PURPLE}20, 0 16px 40px rgba(0,0,0,0.4)`,
                    }}
                  >
                    <img src={img} alt={label} className="w-full" style={{ aspectRatio: '9/19', objectFit: 'cover', display: 'block' }} loading="lazy" />
                  </div>
                </div>
                {/* Text */}
                <div className="flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: TEXT_DIM }}>{label}</p>
                  <h3 className="font-black text-3xl md:text-4xl tracking-tight mb-5">{heading}</h3>
                  <p className="text-lg leading-relaxed max-w-lg" style={{ color: TEXT_DIM }}>{body}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ── THE MATH ── */}
        <section className="py-24 px-6" style={{ backgroundColor: SURFACE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: TEXT_DIM }}>Why precision matters</p>
            <h2 className="font-black text-3xl md:text-4xl tracking-tight mb-12">The calculation that saves your vial.</h2>

            <div className="rounded-[20px] overflow-hidden text-left" style={{ backgroundColor: DARK, border: `1px solid ${BORDER}` }}>
              <div className="px-6 py-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: TEXT_DIM }}>Worked example</p>
              </div>
              <div className="px-6 py-6 space-y-4">
                {[
                  { expr: '5mg vial  ÷  2mL BAC water', result: '2.5 mg/mL', highlight: false },
                  { expr: '250mcg dose  ÷  2.5mg/mL', result: '0.1 mL', highlight: false },
                  { expr: '0.1mL  ×  100 units/mL', result: '10 units to draw', highlight: true },
                ].map(({ expr, result, highlight }, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center py-3 px-4 rounded-xl font-mono text-sm ${highlight ? '' : ''}`}
                    style={{
                      backgroundColor: highlight ? `${PURPLE}25` : 'transparent',
                      border: highlight ? `1px solid ${ACCENT}40` : `1px solid transparent`,
                    }}
                  >
                    <span style={{ color: highlight ? 'rgba(255,255,255,0.8)' : TEXT_DIM }}>{expr}</span>
                    <span className="font-bold ml-4 flex-shrink-0" style={{ color: highlight ? '#fff' : ACCENT }}>{result}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-8 text-base" style={{ color: TEXT_DIM }}>
              PepKit handles this automatically. Every time.
            </p>
          </div>
        </section>

        {/* ── PEPTIDE LIBRARY SHOWCASE ── */}
        <section className="py-24 px-6" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: TEXT_DIM }}>Peptide library</p>
                <h2 className="font-black text-4xl tracking-tight mb-6">Research-rated.<br />Not just listed.</h2>
                <p className="text-lg leading-relaxed mb-8" style={{ color: TEXT_DIM }}>
                  Every compound is rated 1–5 stars for how well-studied it is. See mechanism, typical dose range, half-life, refrigeration requirements, and step-by-step usage guide.
                </p>
                <div className="space-y-3">
                  {['Healing & Recovery', 'Growth Hormone', 'Cognitive', 'Metabolic & Weight Loss', 'Fat Loss', 'Immunity & Longevity', 'Skin & Collagen', 'Libido & Sexual'].map(cat => (
                    <div key={cat} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: PURPLE }} />
                      <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{cat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* BPC-157 compound card */}
              <div className="rounded-[28px] p-6" style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}>
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: TEXT_DIM }}>Healing & Recovery</p>
                    <h3 className="font-black text-2xl">BPC-157</h3>
                    <p className="text-sm mt-1" style={{ color: TEXT_DIM }}>Body Protection Compound</p>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 text-lg mb-1">★★★★☆</div>
                    <p className="font-mono text-[9px] uppercase tracking-widest" style={{ color: TEXT_DIM }}>Research rating</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { label: 'Half-life', value: '4h' },
                    { label: 'Typical dose', value: '250–500 mcg' },
                    { label: 'Refrigeration', value: 'Required' },
                    { label: 'Route', value: 'Subcutaneous' },
                  ].map(({ label, value }) => (
                    <div key={label} className="px-3 py-2 rounded-xl" style={{ backgroundColor: DARK }}>
                      <p className="font-mono text-[9px] uppercase tracking-widest mb-1" style={{ color: TEXT_DIM }}>{label}</p>
                      <p className="font-bold text-sm">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-xl" style={{ backgroundColor: `${PURPLE}12`, border: `1px solid ${BORDER}` }}>
                  <p className="font-mono text-[9px] uppercase tracking-widest mb-2" style={{ color: ACCENT }}>Primary benefits</p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>Accelerates tendon and ligament repair, reduces inflammation, supports gut healing, promotes angiogenesis.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-36 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${PURPLE}18 0%, transparent 70%)` }} />
          <div className="relative z-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: TEXT_DIM }}>Free on iOS</p>
            <h2 className="font-black tracking-tight mb-8" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}>
              Every dose,{' '}
              <span style={{ color: ACCENT }}>calculated.</span>
            </h2>
            <p className="text-xl mb-12 max-w-md mx-auto" style={{ color: TEXT_DIM }}>
              No more guessing. No more wasted vials. No more scattered notes.
            </p>
            <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-block hover:scale-105 transition-transform active:scale-95">
              <img src="/appstore.png" alt="Download on App Store" className="h-14" />
            </a>
            <p className="mt-8 text-xs font-mono uppercase tracking-widest" style={{ color: TEXT_DIM }}>
              Not medical advice · For research tracking only
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 px-6" style={{ borderTop: `1px solid ${BORDER}` }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 hover:opacity-100 transition-opacity">
            <div className="flex gap-8 font-mono text-[10px] uppercase tracking-widest font-bold text-white">
              <Link to="/pepkit/privacy-policy" className="hover:opacity-60 transition-opacity">Privacy</Link>
              <Link to="/pepkit/terms-of-service" className="hover:opacity-60 transition-opacity">Terms</Link>
              <Link to="/pepkit/support" className="hover:opacity-60 transition-opacity">Support</Link>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-white">© 2026 Ashwin Anbazhagan // briefly.live</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default PepKitLanding;
