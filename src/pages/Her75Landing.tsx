import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronDown, Sparkles, ListChecks, Camera, Images, ShieldCheck, Users } from 'lucide-react';
import type { AppConfig } from '../config/apps';

interface Props {
  app: AppConfig;
  section?: 'privacy' | 'terms' | 'support';
}

/* ── Her 75 design system (locked): warm paper, espresso ink, clay accent ── */
const PAPER  = '#FAF6EF';
const VELLUM = '#FFFDF8';
const INK    = '#2B2420';
const INK2   = 'rgba(43,36,32,0.58)';
const CLAY   = '#C4765A';
const CLAY_D = '#AD5F43';
const MAUVE  = '#A98290';
const OLIVE  = '#6E7B54';
const SAND   = '#D0BA9E';
const CHIP   = '#F1EAE0';
const LINE   = '#E7DFD2';

const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS  = "'Hanken Grotesk', -apple-system, sans-serif";

const fonts = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500;1,600&family=Hanken+Grotesk:wght@300;400;500;600;700;800&display=swap');
  * { box-sizing: border-box; }
  body { margin: 0; }
  @keyframes her-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
  .her-rise { opacity: 0; animation: her-rise 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
  .hd1 { animation-delay: 0.08s; } .hd2 { animation-delay: 0.2s; } .hd3 { animation-delay: 0.32s; } .hd4 { animation-delay: 0.44s; }
  .her-cta { transition: transform 0.25s ease, box-shadow 0.25s ease; }
  .her-cta:hover { transform: translateY(-2px); box-shadow: 0 16px 30px rgba(173,95,67,0.28); }
  .her-feat { transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s ease; }
  .her-feat:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(43,36,32,0.08); }
  .her-faq summary::-webkit-details-marker { display: none; }
  @media (max-width: 820px) {
    .her-hero-grid { grid-template-columns: 1fr !important; text-align: center; }
    .her-hero-copy { align-items: center !important; }
    .her-phone { margin: 8px auto 0 !important; }
    .her-feat-grid { grid-template-columns: 1fr !important; }
    .her-pad { padding-left: 24px !important; padding-right: 24px !important; }
    .her-h1 { font-size: clamp(3rem, 13vw, 4.4rem) !important; }
  }
`;

const ICONS: Record<string, React.ReactNode> = {
  Sparkles:    <Sparkles size={22} strokeWidth={1.6} />,
  ListChecks:  <ListChecks size={22} strokeWidth={1.6} />,
  Camera:      <Camera size={22} strokeWidth={1.6} />,
  Images:      <Images size={22} strokeWidth={1.6} />,
  ShieldCheck: <ShieldCheck size={22} strokeWidth={1.6} />,
  Users:       <Users size={22} strokeWidth={1.6} />,
};
const FEAT_TINT = [CLAY, MAUVE, OLIVE, CLAY_D, '#94A8B1', MAUVE];

const Eyebrow: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = CLAY }) => (
  <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: 2.4, textTransform: 'uppercase', color }}>{children}</div>
);

const DownloadBtn: React.FC<{ url: string; label?: string }> = ({ url, label = 'Download on the App Store' }) => (
  <a className="her-cta" href={url} target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: `linear-gradient(135deg, ${CLAY}, ${CLAY_D})`, color: '#fff',
              fontFamily: SANS, fontWeight: 700, fontSize: 15, padding: '15px 28px', borderRadius: 30, textDecoration: 'none',
              boxShadow: '0 10px 24px rgba(173,95,67,0.22)' }}>
    {label}
  </a>
);

/* ── Legal page (privacy / terms / support) ── */
const LegalPage: React.FC<{ app: AppConfig; section: 'privacy' | 'terms' | 'support' }> = ({ app, section }) => {
  const content = section === 'privacy' ? app.legal.privacyPolicy : section === 'terms' ? app.legal.termsOfService : app.legal.support;
  const titles = { privacy: 'Privacy Policy', terms: 'Terms of Service', support: 'Support' };
  return (
    <div style={{ minHeight: '100vh', backgroundColor: PAPER, fontFamily: SANS, color: INK }}>
      <style>{fonts}</style>
      <nav style={{ borderBottom: `1px solid ${LINE}`, padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/her75" style={{ display: 'flex', alignItems: 'center', gap: 6, color: INK2, textDecoration: 'none', fontSize: 13 }}>
          <ChevronLeft size={14} /> back to Her 75
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <img src="/her75.png" alt="Her 75" style={{ width: 26, height: 26, borderRadius: 7 }} />
          <span style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 600, color: INK }}>Her <span style={{ color: CLAY }}>75</span></span>
        </div>
      </nav>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '60px 32px 100px' }}>
        <Eyebrow>Her 75</Eyebrow>
        <h1 style={{ fontFamily: SERIF, fontSize: 46, fontWeight: 600, color: INK, margin: '10px 0 6px', lineHeight: 1.05 }}>{titles[section]}</h1>
        <p style={{ fontSize: 12, color: INK2, marginBottom: 44 }}>Last updated: {app.legal.lastUpdated}</p>
        <div style={{ color: INK2, lineHeight: 1.85, fontSize: 15 }}>
          {content?.split('\n\n').map((block, i) => {
            const ls = block.split('\n');
            const heading = ls.length > 1 && /^\d+\./.test(ls[0]);
            return (
              <div key={i} style={{ marginBottom: 24 }}>
                {ls.map((line, j) => (
                  <p key={j} style={{ margin: '0 0 4px', fontWeight: heading && j === 0 ? 700 : 400,
                       fontSize: heading && j === 0 ? 16 : 15, color: heading && j === 0 ? INK : INK2 }}>{line}</p>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Her75Landing: React.FC<Props> = ({ app, section }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  if (section) return <LegalPage app={app} section={section} />;

  const m = app.marketing;
  const dl = app.downloadUrl || app.appStoreUrl || '#';
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: app.name,
    operatingSystem: 'iOS', applicationCategory: 'HealthApplication',
    description: app.seo.description, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    ...(app.aggregateRating ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: app.aggregateRating.ratingValue, ratingCount: app.aggregateRating.ratingCount } } : {}),
  };

  return (
    <div style={{ backgroundColor: PAPER, color: INK, fontFamily: SANS, minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{fonts}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Nav */}
      <nav className="her-pad" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px', maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/her75.png" alt="Her 75" style={{ width: 34, height: 34, borderRadius: 9 }} />
          <span style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 600 }}>Her <span style={{ color: CLAY }}>75</span></span>
        </div>
        <a href={dl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: SANS, fontWeight: 700, fontSize: 14, color: INK, textDecoration: 'none', background: CHIP, padding: '10px 20px', borderRadius: 24 }}>Get the app</a>
      </nav>

      {/* Hero */}
      <section className="her-pad" style={{ maxWidth: 1180, margin: '0 auto', padding: '40px 40px 90px' }}>
        <div className="her-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 56, alignItems: 'center' }}>
          <div className="her-hero-copy" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="her-rise hd1" style={{ marginBottom: 18 }}><Eyebrow>75-day challenge · made for women</Eyebrow></div>
            <h1 className="her-rise hd2 her-h1" style={{ fontFamily: SERIF, fontSize: 'clamp(3.4rem, 6vw, 5.4rem)', fontWeight: 600, lineHeight: 0.98, letterSpacing: '-0.01em', margin: 0 }}>
              Become <span style={{ color: CLAY, fontStyle: 'italic' }}>her</span><br />in 75 days.
            </h1>
            <p className="her-rise hd3" style={{ fontSize: 18, lineHeight: 1.6, color: INK2, maxWidth: 460, margin: '22px 0 30px', fontWeight: 400 }}>{m.subheadline}</p>
            <div className="her-rise hd4" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <DownloadBtn url={dl} />
              <span style={{ fontSize: 13, color: INK2 }}>Free to download · Choose your hard</span>
            </div>
          </div>

          {/* Phone preview */}
          <div className="her-phone her-rise hd3" style={{ position: 'relative', justifySelf: 'center' }}>
            <div style={{ position: 'absolute', inset: -30, background: `radial-gradient(circle at 50% 40%, rgba(196,118,90,0.16), transparent 70%)`, filter: 'blur(8px)' }} />
            <div style={{ position: 'relative', width: 268, borderRadius: 42, padding: 10, background: INK, boxShadow: '0 40px 80px rgba(43,36,32,0.22)' }}>
              <img src={m.screenshots?.[0] || '/her75/preview.png'} alt="Her 75 app" style={{ width: '100%', display: 'block', borderRadius: 32 }} />
            </div>
          </div>
        </div>
      </section>

      {/* Comparison strip */}
      {app.comparisonHighlights && (
        <section style={{ backgroundColor: VELLUM, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="her-pad" style={{ maxWidth: 1000, margin: '0 auto', padding: '54px 40px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {app.comparisonHighlights.map((c, i) => (
              <div key={i}>
                <p style={{ fontSize: 14, color: INK2, textDecoration: 'line-through', textDecorationColor: 'rgba(43,36,32,0.3)', margin: '0 0 8px' }}>{c.them}</p>
                <p style={{ fontFamily: SERIF, fontSize: 21, fontWeight: 600, color: INK, margin: 0, lineHeight: 1.25 }}>{c.us}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features */}
      <section id="features" className="her-pad" style={{ maxWidth: 1100, margin: '0 auto', padding: '90px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <Eyebrow color={MAUVE}>Everything to finish</Eyebrow>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 600, margin: '12px 0 0', lineHeight: 1.05 }}>Discipline that actually sticks.</h2>
        </div>
        <div className="her-feat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {m.benefits.map((b, i) => (
            <div key={i} className="her-feat" style={{ background: VELLUM, border: `1px solid ${LINE}`, borderRadius: 24, padding: '30px 26px' }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: CHIP, color: FEAT_TINT[i % FEAT_TINT.length], display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                {ICONS[b.icon] || <Sparkles size={22} strokeWidth={1.6} />}
              </div>
              <h3 style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 600, margin: '0 0 8px' }}>{b.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: INK2, margin: 0 }}>{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why / story */}
      <section style={{ backgroundColor: INK, color: PAPER }}>
        <div className="her-pad" style={{ maxWidth: 760, margin: '0 auto', padding: '90px 40px', textAlign: 'center' }}>
          <Eyebrow color={SAND}>Why Her 75</Eyebrow>
          <p style={{ fontFamily: SERIF, fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', fontWeight: 500, lineHeight: 1.35, margin: '20px 0 0' }}>{m.problem}</p>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(250,246,239,0.72)', margin: '24px 0 0' }}>{m.solution}</p>
        </div>
      </section>

      {/* FAQ */}
      {m.faqs && (
        <section className="her-pad" style={{ maxWidth: 720, margin: '0 auto', padding: '90px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <Eyebrow>Questions</Eyebrow>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 600, margin: '12px 0 0' }}>Good to know</h2>
          </div>
          {m.faqs.map((f, i) => (
            <details key={i} className="her-faq" open={openFaq === i}
                     onClick={(e) => { e.preventDefault(); setOpenFaq(openFaq === i ? null : i); }}
                     style={{ borderBottom: `1px solid ${LINE}`, padding: '20px 4px', cursor: 'pointer' }}>
              <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none', fontFamily: SANS, fontWeight: 600, fontSize: 17, color: INK }}>
                {f.question}
                <ChevronDown size={18} style={{ transition: 'transform 0.25s', transform: openFaq === i ? 'rotate(180deg)' : 'none', color: CLAY, flexShrink: 0 }} />
              </summary>
              {openFaq === i && <p style={{ fontSize: 15, lineHeight: 1.65, color: INK2, margin: '14px 0 0' }}>{f.answer}</p>}
            </details>
          ))}
        </section>
      )}

      {/* Final CTA */}
      <section className="her-pad" style={{ maxWidth: 900, margin: '0 auto', padding: '30px 40px 100px', textAlign: 'center' }}>
        <div style={{ background: `linear-gradient(135deg, ${CLAY}, ${CLAY_D})`, borderRadius: 34, padding: '64px 32px', color: '#fff' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', fontWeight: 600, margin: 0, lineHeight: 1.02 }}>Your 75 days start now.</h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.85)', margin: '16px 0 30px' }}>Choose your hard. Become her.</p>
          <a className="her-cta" href={dl} target="_blank" rel="noopener noreferrer"
             style={{ display: 'inline-block', background: '#fff', color: CLAY_D, fontFamily: SANS, fontWeight: 800, fontSize: 15, padding: '15px 34px', borderRadius: 30, textDecoration: 'none' }}>
            Download on the App Store
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${LINE}`, backgroundColor: VELLUM }}>
        <div className="her-pad" style={{ maxWidth: 1100, margin: '0 auto', padding: '40px', display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/her75.png" alt="Her 75" style={{ width: 28, height: 28, borderRadius: 8 }} />
            <span style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 600 }}>Her <span style={{ color: CLAY }}>75</span></span>
          </div>
          <div style={{ display: 'flex', gap: 22, fontSize: 13, fontFamily: SANS }}>
            <Link to="/her75/privacy-policy" style={{ color: INK2, textDecoration: 'none' }}>Privacy</Link>
            <Link to="/her75/terms-of-service" style={{ color: INK2, textDecoration: 'none' }}>Terms</Link>
            <Link to="/her75/support" style={{ color: INK2, textDecoration: 'none' }}>Support</Link>
            <Link to="/" style={{ color: INK2, textDecoration: 'none' }}>More apps</Link>
          </div>
          <span style={{ fontSize: 12, color: INK2 }}>© 2026 Her 75</span>
        </div>
      </footer>
    </div>
  );
};

export default Her75Landing;
