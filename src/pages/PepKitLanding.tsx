import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, FlaskConical, Layers, Package, Activity, BarChart2, Shield, Clock } from 'lucide-react';
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
      <SEOBox
        title={app.seo.title}
        description={app.seo.description}
        keywords={app.seo.keywords}
        appId={app.id}
        appStoreUrl={app.appStoreUrl}
        appCategory="HealthApplication"
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
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-100 opacity-50" style={{ color: ACCENT }}>
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
        {/* Hero */}
        <section className="pt-36 pb-24 px-6 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold mb-8 uppercase tracking-widest" style={{ backgroundColor: `${PURPLE}18`, color: ACCENT, border: `1px solid ${BORDER}` }}>
                <Shield size={11} /> Peptide Research Toolkit · iOS
              </div>
              <h1 className="font-black leading-[1.05] tracking-tight mb-8" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)' }}>
                The Peptide Calculator<br />
                <span style={{ color: ACCENT }}>& Cycle Tracker</span><br />
                Built for Precision.
              </h1>
              <p className="text-xl leading-relaxed mb-10 max-w-lg" style={{ color: TEXT_DIM }}>
                Reconstitution math, dose logging, cycle tracking, inventory alerts, and lab results — all in one place.
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform active:scale-95">
                  <img src="/appstore.png" alt="Download on App Store" className="h-12" />
                </a>
                <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: TEXT_DIM }}>iOS · Free</span>
              </div>
            </div>

            {/* Screenshots */}
            <div className="flex justify-center lg:justify-end">
              {app.marketing.screenshots && app.marketing.screenshots.length >= 3 ? (
                <div className="flex gap-3 items-end">
                  {app.marketing.screenshots.slice(0, 3).map((src, i) => (
                    <div
                      key={i}
                      className="group relative overflow-hidden transition-all duration-500 hover:-translate-y-2"
                      style={{
                        width: i === 1 ? '130px' : '105px',
                        borderRadius: '24px',
                        border: `1.5px solid ${i === 1 ? ACCENT + '60' : BORDER}`,
                        boxShadow: i === 1 ? `0 0 40px ${PURPLE}30` : `0 10px 30px rgba(0,0,0,0.3)`,
                        marginBottom: i === 1 ? '20px' : '0',
                      }}
                    >
                      {/* Order badge */}
                      <div className="absolute top-2 left-2 w-7 h-7 rounded-lg flex items-center justify-center z-10 font-mono text-[10px] font-black" style={{ backgroundColor: DARK, color: ACCENT, border: `1px solid ${BORDER}` }}>
                        0{i + 1}
                      </div>
                      <img src={src} className="w-full" style={{ aspectRatio: '9/19', objectFit: 'cover' }} alt={`PepKit screenshot ${i + 1}`} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-64 h-96 rounded-[40px] flex items-center justify-center" style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}>
                  <img src="/pepkit.png" alt="PepKit" className="w-32 h-32 object-contain" />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Pain points */}
        <section className="py-20 px-6" style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
          <div className="max-w-6xl mx-auto">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-center mb-12" style={{ color: TEXT_DIM }}>
              Why peptide research goes wrong
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { stat: '1', unit: 'miscalculation', label: '→ entire vial wasted', desc: 'Reconstitution math is unforgiving. The wrong BAC water ratio, the wrong unit draw — and an expensive vial is gone.' },
                { stat: '0', unit: 'other apps', label: 'track half-life curves', desc: 'Nobody else visualizes compound concentration over time. You\'re flying blind on whether your last dose has cleared.' },
                { stat: '20%', unit: 'vial remaining', label: 'and no alert. No reorder.', desc: 'Most people run out of a vial mid-cycle. No app tracks your remaining stock and warns you before it\'s too late.' },
              ].map(({ stat, unit, label, desc }, i) => (
                <div key={i} className="p-7 rounded-[24px]" style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-mono font-black text-4xl" style={{ color: ACCENT }}>{stat}</span>
                    <span className="font-mono text-xs uppercase tracking-widest" style={{ color: TEXT_DIM }}>{unit}</span>
                  </div>
                  <p className="font-bold text-sm mb-4" style={{ color: 'rgba(255,255,255,0.8)' }}>{label}</p>
                  <p className="text-sm leading-relaxed" style={{ color: TEXT_DIM }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature deep-dive */}
        <section className="py-28 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: TEXT_DIM }}>Every feature</p>
            <h2 className="font-black text-4xl md:text-5xl tracking-tight">Five tools.<br />One complete protocol.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: FlaskConical,
                label: 'Reconstitution Calculator',
                pain: 'The math is complex and high-stakes.',
                fix: 'Enter vial size, BAC water volume, and desired dose. PepKit calculates exact units to draw — step-by-step, no mental math, no errors.',
              },
              {
                icon: Layers,
                label: 'Peptide Library',
                pain: 'No reliable single source for compound data.',
                fix: '9 categories (Healing, Growth Hormone, Cognitive, Metabolic, Fat Loss, Immunity, and more). Each compound: mechanism, benefits, dosing guide, safety notes, and research rating (1–5★).',
              },
              {
                icon: Clock,
                label: 'Cycle Planner',
                pain: 'Multi-compound protocols are hard to track.',
                fix: 'Build protocols with multiple compounds. Set start and end dates. See all active cycles and today\'s due doses at a glance.',
              },
              {
                icon: Package,
                label: 'Inventory Tracker',
                pain: 'Vials run out mid-cycle with no warning.',
                fix: 'Auto-deducting stock every time you log a dose. Low-vial alert at 20% remaining. Never run out mid-protocol again.',
              },
              {
                icon: BarChart2,
                label: 'Compound Level Charts',
                pain: 'No way to visualize if compound is still active.',
                fix: 'Half-life × logged doses = real-time compound curve. See 1D, 3D, 7D, or 14D windows. Know exactly when a compound has cleared.',
              },
              {
                icon: Activity,
                label: 'Lab Results Tracker',
                pain: 'Bloodwork lives in a folder, disconnected from protocol.',
                fix: 'Log any blood marker with date and value. Charts show trends over time, organized by category. See how your labs respond to your cycles.',
              },
            ].map(({ icon: Icon, label, pain, fix }, i) => (
              <div key={i} className="p-7 rounded-[24px] border transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40" style={{ backgroundColor: SURFACE, borderColor: BORDER }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${PURPLE}20` }}>
                  <Icon size={20} style={{ color: ACCENT }} />
                </div>
                <h3 className="font-bold text-lg mb-3">{label}</h3>
                <p className="text-xs font-mono p-3 rounded-lg mb-4" style={{ color: '#FF6B6B', backgroundColor: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.15)' }}>
                  ✗ {pain}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: TEXT_DIM }}>{fix}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Peptide library showcase */}
        <section className="py-24 px-6" style={{ backgroundColor: SURFACE, borderTop: `1px solid ${BORDER}` }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: TEXT_DIM }}>Peptide library</p>
                <h2 className="font-black text-4xl tracking-tight mb-6">
                  Research-rated. Not just listed.
                </h2>
                <p className="text-lg leading-relaxed mb-8" style={{ color: TEXT_DIM }}>
                  Every compound is rated 1–5 stars for how well-studied it is. See mechanism, typical dose range, half-life, refrigeration requirements, and step-by-step usage guide. No guessing.
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
              {/* Example compound card */}
              <div className="rounded-[28px] p-6" style={{ backgroundColor: DARK, border: `1px solid ${BORDER}` }}>
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
                    <div key={label} className="px-3 py-2 rounded-xl" style={{ backgroundColor: SURFACE }}>
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

        {/* CTA */}
        <section className="py-36 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${PURPLE}18 0%, transparent 70%)` }} />
          <div className="relative z-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: TEXT_DIM }}>Free on iOS</p>
            <h2 className="font-black text-5xl md:text-6xl tracking-tight mb-8">
              Download free.<br />
              <span style={{ color: ACCENT }}>Your protocol, tracked precisely.</span>
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
