import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, CheckCircle, AlertCircle, AlertTriangle, ScanLine, Camera, Search, ChefHat, User } from 'lucide-react';
import type { AppConfig } from '../config/apps';
import SEOBox from '../components/SEOBox';
import AppLayout from '../components/AppLayout';
import LegalContent from './LegalContent';

interface Props {
  app: AppConfig;
  section?: 'privacy' | 'terms' | 'support';
}

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

  const PRIMARY = '#2D7A52';
  const BG = '#FFFFFF';

  return (
    <div className="min-h-screen" style={{ backgroundColor: BG, color: '#1A1A1A', fontFamily: 'system-ui, sans-serif' }}>
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
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md" style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderBottom: '1px solid rgba(45,122,82,0.1)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity" style={{ color: PRIMARY }}>
            <ChevronLeft size={16} />
            <span className="text-xs font-mono uppercase tracking-widest">All Apps</span>
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl overflow-hidden border" style={{ borderColor: `${PRIMARY}25` }}>
              <img src="/menucheck.png" alt="Menu Check" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-lg" style={{ color: PRIMARY }}>Menu Check</span>
          </Link>
          <a
            href={app.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold px-5 py-2 rounded-full transition-all hover:scale-105 active:scale-95 text-white"
            style={{ backgroundColor: PRIMARY }}
          >
            Get App Free
          </a>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-8" style={{ backgroundColor: `${PRIMARY}12`, color: PRIMARY }}>
                <CheckCircle size={13} /> IBS · Celiac · FODMAP · Gut Health
              </div>
              <h1 className="font-black leading-tight mb-6" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', color: '#1A1A1A' }}>
                The Food Scanner Built for{' '}
                <span style={{ color: PRIMARY }}>IBS, Celiac & Gut Conditions</span>
              </h1>
              <p className="text-xl leading-relaxed mb-8 max-w-lg" style={{ color: 'rgba(0,0,0,0.55)' }}>
                Scan menus, barcodes, and dishes. Get instant Safe / Limit / Avoid verdicts tailored to your exact conditions, allergies, and diet.
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform active:scale-95">
                  <img src="/appstore.png" alt="Download on App Store" className="h-12" />
                </a>
                <span className="text-xs font-mono uppercase tracking-widest opacity-35">iOS · Free</span>
              </div>
            </div>

            {/* Screenshots */}
            <div className="flex justify-center lg:justify-end">
              {app.marketing.screenshots && app.marketing.screenshots.length >= 3 ? (
                <div className="relative flex gap-3 items-end">
                  {app.marketing.screenshots.slice(0, 3).map((src, i) => (
                    <div
                      key={i}
                      className="relative group overflow-hidden rounded-[28px] shadow-xl flex-shrink-0 transition-all duration-500 hover:-translate-y-2"
                      style={{
                        width: i === 1 ? '130px' : '105px',
                        border: `2px solid ${PRIMARY}22`,
                        boxShadow: i === 1 ? `0 20px 60px ${PRIMARY}30` : `0 10px 30px rgba(0,0,0,0.1)`,
                        marginBottom: i === 1 ? '20px' : '0',
                      }}
                    >
                      <img src={src} className="w-full" style={{ aspectRatio: '9/19', objectFit: 'cover' }} alt={`Screenshot ${i + 1}`} />
                    </div>
                  ))}
                  {/* Safe badge */}
                  <div className="absolute -bottom-4 left-0 flex items-center gap-2 px-3 py-2 rounded-2xl shadow-lg" style={{ backgroundColor: '#fff', border: `1.5px solid ${PRIMARY}25` }}>
                    <CheckCircle size={14} style={{ color: PRIMARY }} />
                    <span className="text-xs font-bold" style={{ color: PRIMARY }}>Safe to eat</span>
                  </div>
                </div>
              ) : (
                <div className="w-64 h-96 rounded-[40px] flex items-center justify-center" style={{ backgroundColor: `${PRIMARY}08`, border: `2px solid ${PRIMARY}15` }}>
                  <img src="/menucheck.png" alt="Menu Check" className="w-32 h-32 object-contain" />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* The moment */}
        <section className="py-20 px-6" style={{ backgroundColor: '#F8FBF9' }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-mono uppercase tracking-[0.3em] mb-8" style={{ color: `${PRIMARY}70` }}>The moment every gut sufferer knows</p>
            <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-10" style={{ color: '#1A1A1A' }}>
              "You're at a restaurant. The menu is three pages long. You ask the waiter but they're not sure. You guess.
              <span className="font-black" style={{ color: PRIMARY }}> You pay for it the next three days.</span>"
            </blockquote>
            <p className="text-lg" style={{ color: 'rgba(0,0,0,0.5)' }}>
              Menu Check ends that.
            </p>
          </div>
        </section>

        {/* 3 scan modes */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.3em] mb-4" style={{ color: 'rgba(0,0,0,0.3)' }}>Three ways to check your food</p>
            <h2 className="font-black text-4xl md:text-5xl" style={{ color: '#1A1A1A' }}>Scan anything. Know instantly.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: ScanLine,
                title: 'Barcode Scanner',
                tagline: '3M+ grocery products',
                desc: 'Point your camera at any barcode. Instant Safe / Limit / Avoid verdict against your full health profile — conditions, allergies, and diet preferences included.',
                verdict: 'safe',
                example: 'Fage Total 0% Yoghurt',
              },
              {
                icon: Camera,
                title: 'Menu Photo Scan',
                tagline: 'At any restaurant',
                desc: 'Take a photo of any restaurant menu. AI reads every dish and scores each one for your specific conditions. No more guessing at the table.',
                verdict: 'limit',
                example: 'Mushroom Risotto',
              },
              {
                icon: Search,
                title: 'Dish Name Search',
                tagline: 'Any cuisine, anywhere',
                desc: 'Search any food, dish, or ingredient by name. Get a detailed breakdown of what\'s safe, what to limit, and what to avoid for your profile.',
                verdict: 'avoid',
                example: 'Garlic Naan',
              },
            ].map(({ icon: Icon, title, tagline, desc, verdict, example }, i) => {
              const verdictColor = verdict === 'safe' ? '#2D7A52' : verdict === 'limit' ? '#C08000' : '#C0392B';
              const verdictBg = verdict === 'safe' ? '#F0FAF4' : verdict === 'limit' ? '#FEF8E7' : '#FEF0EF';
              const VerdictIcon = verdict === 'safe' ? CheckCircle : verdict === 'limit' ? AlertCircle : AlertTriangle;
              return (
                <div key={i} className="rounded-[28px] overflow-hidden border" style={{ borderColor: 'rgba(0,0,0,0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                  <div className="p-8" style={{ backgroundColor: '#fff' }}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${PRIMARY}12` }}>
                      <Icon size={22} style={{ color: PRIMARY }} />
                    </div>
                    <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: `${PRIMARY}80` }}>{tagline}</div>
                    <h3 className="font-black text-xl mb-4" style={{ color: '#1A1A1A' }}>{title}</h3>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(0,0,0,0.55)' }}>{desc}</p>
                    {/* Verdict example */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl" style={{ backgroundColor: verdictBg }}>
                      <VerdictIcon size={16} style={{ color: verdictColor }} />
                      <div>
                        <div className="text-xs font-bold" style={{ color: verdictColor }}>{verdict.toUpperCase()}</div>
                        <div className="text-xs" style={{ color: 'rgba(0,0,0,0.5)' }}>{example}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Feature cards */}
        <section className="py-24 px-6" style={{ backgroundColor: '#F8FBF9' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-black text-4xl md:text-5xl mb-4" style={{ color: '#1A1A1A' }}>Everything you need.<br />Nothing you don't.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: User,
                  title: 'Deep Health Profile',
                  pain: 'Apps ask if you\'re "vegetarian" and call it a day.',
                  fix: 'Menu Check builds a full profile: your conditions (IBS, Celiac, Crohn\'s, IBD), diet preferences (FODMAP, vegan, gluten-free), individual allergies, specific avoidances, and strictness level. Every scan uses your complete picture.',
                },
                {
                  icon: ScanLine,
                  title: 'Barcode Scanner — 3M+ Products',
                  pain: 'Ingredient lists take 5 minutes to decode.',
                  fix: 'Powered by OpenFoodFacts with 3 million+ grocery products. Scan the barcode, get the verdict in seconds. No decoding required.',
                },
                {
                  icon: Camera,
                  title: 'AI Menu & Food Analysis',
                  pain: 'Waiters often don\'t know what\'s in the dish.',
                  fix: 'Point at a menu, type a dish name, or describe what you\'re eating. AI analyzes ingredients against your exact conditions and tells you what\'s safe, what to limit, and why.',
                },
                {
                  icon: ChefHat,
                  title: 'Safe Recipe Generator',
                  pain: 'Gut-friendly recipes online don\'t know your specific conditions.',
                  fix: 'Generate complete recipes built for your exact profile — with gut notes explaining every ingredient choice, difficulty rating, prep time, and serving size.',
                },
              ].map(({ icon: Icon, title, pain, fix }, i) => (
                <div key={i} className="p-8 rounded-[28px] bg-white border hover:-translate-y-1 transition-all duration-300" style={{ borderColor: 'rgba(0,0,0,0.07)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${PRIMARY}12` }}>
                      <Icon size={20} style={{ color: PRIMARY }} />
                    </div>
                    <span className="font-black text-lg" style={{ color: '#1A1A1A' }}>{title}</span>
                  </div>
                  <p className="text-sm p-3 rounded-xl mb-5 font-mono" style={{ color: '#C0392B', backgroundColor: '#FEF0EF', border: '1px solid #C0392B22' }}>
                    ✗ {pain}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.6)' }}>{fix}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verdict showcase */}
        <section className="py-24 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-black text-4xl" style={{ color: '#1A1A1A' }}>Clear verdicts. No confusion.</h2>
            <p className="text-lg mt-4" style={{ color: 'rgba(0,0,0,0.45)' }}>Every scan returns one of three verdicts — instantly.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { verdict: 'safe', icon: CheckCircle, label: 'Safe', color: '#2D7A52', bg: '#F0FAF4', border: '#2D7A5230', example: 'This dish is safe for your IBS and FODMAP diet. No trigger ingredients detected.', item: 'Grilled salmon + rice' },
              { verdict: 'limit', icon: AlertCircle, label: 'Limit', color: '#C08000', bg: '#FEF8E7', border: '#C0800030', example: 'Contains onion powder — a moderate FODMAP trigger. Safe in small portions.', item: 'Caesar salad' },
              { verdict: 'avoid', icon: AlertTriangle, label: 'Avoid', color: '#C0392B', bg: '#FEF0EF', border: '#C0392B30', example: 'Contains gluten, lactose, and garlic — multiple triggers for your profile.', item: 'Garlic bread pasta' },
            ].map(({ verdict, icon: Icon, label, color, bg, border, example, item }) => (
              <div key={verdict} className="p-6 rounded-[24px]" style={{ backgroundColor: bg, border: `2px solid ${border}` }}>
                <div className="flex items-center gap-3 mb-4">
                  <Icon size={22} style={{ color }} />
                  <span className="font-black text-xl" style={{ color }}>{label}</span>
                </div>
                <p className="text-xs font-bold mb-3 uppercase tracking-widest" style={{ color: 'rgba(0,0,0,0.35)' }}>{item}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.6)' }}>{example}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6 text-center" style={{ backgroundColor: PRIMARY }}>
          <p className="text-xs font-mono uppercase tracking-[0.3em] mb-6 text-white opacity-60">Free on iOS</p>
          <h2 className="font-black text-5xl md:text-6xl mb-8 text-white leading-tight">
            Stop guessing.<br />Start eating safely.
          </h2>
          <p className="text-xl mb-12 text-white opacity-70 max-w-md mx-auto">
            Join thousands of people with IBS, Celiac, Crohn's, and food sensitivities who eat out without anxiety.
          </p>
          <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-block hover:scale-105 transition-transform active:scale-95">
            <img src="/appstore.png" alt="Download on App Store" className="h-14" />
          </a>
        </section>

        {/* Footer */}
        <footer className="py-10 px-6 bg-white border-t" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 hover:opacity-100 transition-opacity">
            <div className="flex gap-8 text-xs font-mono uppercase tracking-widest font-bold" style={{ color: '#1A1A1A' }}>
              <Link to="/menucheck/privacy-policy" className="hover:opacity-60 transition-opacity">Privacy</Link>
              <Link to="/menucheck/terms-of-service" className="hover:opacity-60 transition-opacity">Terms</Link>
              <Link to="/menucheck/support" className="hover:opacity-60 transition-opacity">Support</Link>
            </div>
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: '#1A1A1A' }}>© 2026 Ashwin Anbazhagan // briefly.live</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default MenuCheckLanding;
