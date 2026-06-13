import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Heart, Mail, BookOpen, Lock, ChevronDown } from 'lucide-react';
import type { AppConfig } from '../config/apps';
import SEOBox from '../components/SEOBox';

interface Props {
  app: AppConfig;
  section?: 'privacy' | 'terms' | 'support';
}

const SAKURA      = '#f3b6c4';
const SAKURA_DEEP = '#9b4f6e';
const LAVENDER    = '#c9b8e8';
const LAV_DEEP    = '#6b4da3';
const PAPER       = '#faf8f5';
const VELLUM      = '#fdf5f7';
const INK         = '#2d2020';
const INK2        = '#7a6a6a';
const LINE        = '#e8dce0';

const fonts = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Caveat:wght@400;600;700&family=Fredoka:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; }
  body { margin: 0; }
`;

const ICON_MAP: Record<string, React.ReactNode> = {
  Heart:    <Heart size={20} strokeWidth={1.5} />,
  Mail:     <Mail size={20} strokeWidth={1.5} />,
  BookOpen: <BookOpen size={20} strokeWidth={1.5} />,
  Lock:     <Lock size={20} strokeWidth={1.5} />,
};

/* ── Petal decoration (pure CSS) ── */
const Petal: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div style={{
    width: 10, height: 14,
    borderRadius: '50% 0 50% 0',
    background: `linear-gradient(135deg, ${SAKURA}, #f9d0da)`,
    opacity: 0.55,
    transform: 'rotate(-20deg)',
    ...style,
  }} />
);

/* ── Legal page ── */
const LegalPage: React.FC<{ app: AppConfig; section: 'privacy' | 'terms' | 'support' }> = ({ app, section }) => {
  const content =
    section === 'privacy' ? app.legal.privacyPolicy :
    section === 'terms'   ? app.legal.termsOfService :
    app.legal.support;

  const titles = { privacy: 'Privacy Policy', terms: 'Terms of Service', support: 'Support' };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: PAPER, fontFamily: "'Fredoka', sans-serif", color: INK }}>
      <style>{fonts}</style>
      <nav style={{ borderBottom: `1px solid ${LINE}`, padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/yumeship" style={{ display: 'flex', alignItems: 'center', gap: 6, color: INK2, textDecoration: 'none', fontSize: 13, opacity: 0.7 }}>
          <ChevronLeft size={14} /> back to yumeship
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src="/yumeship.png" alt="YumeShip" style={{ width: 26, height: 26, borderRadius: 7 }} />
          <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 18, color: INK }}>yumeship</span>
        </div>
      </nav>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '60px 32px 100px' }}>
        <div style={{ marginBottom: 8, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: SAKURA_DEEP, fontFamily: "'Fredoka', sans-serif", fontWeight: 500 }}>
          yumeship
        </div>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 40, fontWeight: 400, color: INK, marginBottom: 6, lineHeight: 1.1 }}>
          {titles[section]}
        </h1>
        <p style={{ fontSize: 12, color: INK2, marginBottom: 48, fontWeight: 300 }}>Last updated: {app.legal.lastUpdated}</p>
        <div style={{ color: INK2, lineHeight: 1.9, fontSize: 15, fontWeight: 300 }}>
          {content?.split('\n\n').map((block, i) => {
            const lines = block.split('\n');
            return (
              <div key={i} style={{ marginBottom: 28 }}>
                {lines.map((line, j) => (
                  <p key={j} style={{
                    margin: '0 0 4px',
                    fontWeight: j === 0 && lines.length > 1 ? 500 : 300,
                    fontSize: j === 0 && lines.length > 1 ? 16 : 15,
                    color: j === 0 && lines.length > 1 ? INK : INK2,
                  }}>{line}</p>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ── FAQ item ── */
const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        borderBottom: `1px solid ${LINE}`,
        padding: '18px 0',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <span style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 500, fontSize: 15, color: INK }}>{q}</span>
        <ChevronDown size={16} color={INK2} style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </div>
      {open && (
        <p style={{ margin: '12px 0 0', fontFamily: "'Fredoka', sans-serif", fontWeight: 300, fontSize: 14, color: INK2, lineHeight: 1.7 }}>{a}</p>
      )}
    </div>
  );
};

/* ── Main landing ── */
const YumeshipLanding: React.FC<Props> = ({ app, section }) => {
  if (section) return <LegalPage app={app} section={section} />;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: PAPER, color: INK, overflowX: 'hidden' }}>
      <style>{fonts}</style>
      <SEOBox
        title={app.seo.title}
        description={app.seo.description}
        keywords={app.seo.keywords}
        appId={app.id}
        appStoreUrl={app.appStoreUrl}
        appCategory={app.seoApplicationCategory}
        appNumericId={app.appNumericId}
        aggregateRating={app.aggregateRating}
        screenshots={app.marketing.screenshots}
        faqs={app.marketing.faqs}
      />

      {/* ── Nav ── */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 50,
        backgroundColor: 'rgba(250,248,245,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${LINE}`,
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 6, color: INK2, textDecoration: 'none', fontSize: 12, opacity: 0.6 }}>
            <ChevronLeft size={13} />
            <span style={{ fontFamily: "'Fredoka', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', fontSize: 10 }}>all apps</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/yumeship.png" alt="YumeShip" style={{ width: 28, height: 28, borderRadius: 8 }} />
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 20, color: INK, letterSpacing: -0.3 }}>yumeship</span>
          </div>
          <a
            href={app.appStoreUrl || '#'}
            style={{
              fontFamily: "'Fredoka', sans-serif", fontWeight: 500, fontSize: 13,
              padding: '7px 18px', borderRadius: 100,
              backgroundColor: SAKURA_DEEP, color: '#fff',
              textDecoration: 'none',
            }}
          >
            get the app
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ paddingTop: 130, paddingBottom: 100, textAlign: 'center', position: 'relative' }}>
        {/* Soft blobs */}
        <div style={{ position: 'absolute', top: 60, left: '10%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${SAKURA}44, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 100, right: '8%', width: 320, height: 320, borderRadius: '50%', background: `radial-gradient(circle, ${LAVENDER}44, transparent 70%)`, pointerEvents: 'none' }} />

        {/* Scattered petals */}
        <div style={{ position: 'absolute', top: 90, left: '22%', pointerEvents: 'none' }}><Petal /></div>
        <div style={{ position: 'absolute', top: 140, right: '24%', pointerEvents: 'none' }}><Petal style={{ transform: 'rotate(45deg)', opacity: 0.4 }} /></div>
        <div style={{ position: 'absolute', top: 200, left: '35%', pointerEvents: 'none' }}><Petal style={{ transform: 'rotate(-60deg)', width: 7, height: 10 }} /></div>
        <div style={{ position: 'absolute', top: 80, right: '38%', pointerEvents: 'none' }}><Petal style={{ transform: 'rotate(10deg)', opacity: 0.3 }} /></div>

        <div style={{ position: 'relative', maxWidth: 780, margin: '0 auto', padding: '0 28px' }}>
          {/* Eyebrow */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
            <div style={{ width: 28, height: 1, backgroundColor: SAKURA }} />
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', color: SAKURA_DEEP, fontWeight: 500 }}>
              for fans · for you
            </span>
            <div style={{ width: 28, height: 1, backgroundColor: SAKURA }} />
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(38px, 6vw, 68px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: -0.5,
            color: INK,
            margin: '0 0 24px',
          }}>
            {app.marketing.headline}
          </h1>

          {/* Subheadline in Caveat */}
          <p style={{
            fontFamily: "'Caveat', cursive",
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            color: INK2,
            lineHeight: 1.5,
            margin: '0 auto 28px',
            maxWidth: 520,
          }}>
            {app.marketing.subheadline}
          </p>

          {/* Rating badge */}
          {app.aggregateRating && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 12, backgroundColor: VELLUM, border: `1px solid ${LINE}`, marginBottom: 28, fontSize: 14, fontWeight: 500, color: INK, fontFamily: "'Fredoka', sans-serif" }}>
              <span>⭐</span>
              <span>{app.aggregateRating.ratingValue}</span>
              <span style={{ color: INK2 }}>·</span>
              <span style={{ color: INK2 }}>{app.aggregateRating.ratingCount} ratings</span>
            </div>
          )}

          {/* CTA */}
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={app.appStoreUrl || '#'}
              style={{
                fontFamily: "'Fredoka', sans-serif", fontWeight: 500, fontSize: 15,
                padding: '13px 32px', borderRadius: 100,
                backgroundColor: SAKURA_DEEP, color: '#fff',
                textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              download on ios
            </a>
            <a
              href="#features"
              style={{
                fontFamily: "'Fredoka', sans-serif", fontWeight: 400, fontSize: 15,
                padding: '13px 32px', borderRadius: 100,
                border: `1.5px solid ${LINE}`,
                color: INK2,
                textDecoration: 'none',
                backgroundColor: 'transparent',
              }}
            >
              learn more
            </a>
          </div>

          {/* Platform chip */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '10px 16px', borderRadius: 10, backgroundColor: VELLUM, border: `1px solid ${LINE}`, marginTop: 14, fontSize: 13, fontWeight: 500, color: INK, fontFamily: "'Fredoka', sans-serif" }}>
            <span>Free</span>
            <span style={{ color: INK2 }}>·</span>
            <span>iOS 15+</span>
            <span style={{ color: INK2 }}>·</span>
            <span>iPhone & iPad</span>
          </div>

          {/* Screenshots */}
          {app.marketing.screenshots && app.marketing.screenshots.length > 0 && (
            <div style={{ marginTop: 64, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              {app.marketing.screenshots.slice(0, 4).map((src, i) => {
                const rotations = ['-4deg', '0deg', '0deg', '2deg'];
                const yOffsets  = ['10px',  '0px',  '0px',  '-8px'];
                const gaps      = [20, 2, 20, 20];
                return (
                  <div key={i} style={{
                    width: 160,
                    borderRadius: 28,
                    overflow: 'hidden',
                    border: `1.5px solid ${i % 2 === 0 ? SAKURA : LAVENDER}`,
                    boxShadow: `0 20px 60px ${i % 2 === 0 ? SAKURA : LAVENDER}44`,
                    transform: `rotate(${rotations[i]}) translateY(${yOffsets[i]})`,
                    flexShrink: 0,
                    marginRight: i < 3 ? gaps[i] : 0,
                  }}>
                    <img src={src} alt={`YumeShip screenshot ${i + 1}`} style={{ width: '100%', display: 'block' }}/>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Privacy callout ── */}
      <section style={{
        backgroundColor: VELLUM,
        borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`,
        padding: '28px 28px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Lock size={14} color={SAKURA_DEEP} strokeWidth={1.5} />
          <span style={{ fontFamily: "'Caveat', cursive", fontSize: 19, color: INK, lineHeight: 1.4 }}>
            everything stays on your phone — no accounts, no cloud, no sharing.
          </span>
          <Lock size={14} color={SAKURA_DEEP} strokeWidth={1.5} />
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" style={{ padding: '100px 28px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 400, color: INK, margin: '0 0 16px' }}>
            a vault made with care.
          </h2>
          <p style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 300, fontSize: 16, color: INK2, maxWidth: 440, margin: '0 auto' }}>
            {app.marketing.solution}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {app.marketing.benefits.map((b, i) => {
            const colors = [
              { bg: '#fef0f4', border: '#f5ccd8', icon: SAKURA_DEEP },
              { bg: '#f3eef8', border: '#ddd0ef', icon: LAV_DEEP },
              { bg: '#fef7ec', border: '#f5e4c0', icon: '#a07030' },
              { bg: '#eef6f1', border: '#c4dece', icon: '#3a7050' },
            ];
            const c = colors[i % colors.length];
            return (
              <div key={i} style={{
                backgroundColor: c.bg,
                border: `1px solid ${c.border}`,
                borderRadius: 20,
                padding: '28px 24px',
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, color: c.icon, boxShadow: `0 2px 8px ${c.border}` }}>
                  {ICON_MAP[b.icon] ?? <Heart size={20} strokeWidth={1.5} />}
                </div>
                <h3 style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600, fontSize: 17, color: INK, margin: '0 0 8px' }}>{b.title}</h3>
                <p style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 300, fontSize: 14, color: INK2, margin: 0, lineHeight: 1.6 }}>{b.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Washi-tape divider */}
      <div style={{ height: 14, background: `repeating-linear-gradient(90deg, ${SAKURA}55 0px, ${SAKURA}55 40px, ${LAVENDER}55 40px, ${LAVENDER}55 80px, ${SAKURA}22 80px, ${SAKURA}22 120px)` }} />

      {/* ── Why section ── */}
      <section style={{ backgroundColor: VELLUM, borderBottom: `1px solid ${LINE}`, padding: '80px 28px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: -20, left: '15%', pointerEvents: 'none' }}><Petal style={{ opacity: 0.4 }} /></div>
          <div style={{ position: 'absolute', bottom: -10, right: '20%', pointerEvents: 'none' }}><Petal style={{ transform: 'rotate(30deg)', opacity: 0.3 }} /></div>
          <p style={{ fontFamily: "'Caveat', cursive", fontSize: 15, color: SAKURA_DEEP, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>
            why yumeship
          </p>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 400, color: INK, margin: '0 0 24px', lineHeight: 1.3 }}>
            "{app.marketing.problem}"
          </h2>
          <p style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 300, fontSize: 16, color: INK2, lineHeight: 1.8, margin: '0 0 16px' }}>
            {app.marketing.agitation}
          </p>
          <div style={{ width: 40, height: 2, backgroundColor: SAKURA, margin: '32px auto 0', borderRadius: 2 }} />
        </div>
      </section>

      {/* ── FAQ ── */}
      {app.marketing.faqs && app.marketing.faqs.length > 0 && (
        <section style={{ padding: '100px 28px', maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: INK, margin: '0 0 48px', textAlign: 'center' }}>
            questions & soft answers.
          </h2>
          {app.marketing.faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.question} a={faq.answer} />
          ))}
        </section>
      )}

      {/* ── CTA band ── */}
      <section style={{
        background: `linear-gradient(135deg, ${SAKURA_DEEP}, #7a3558)`,
        padding: '80px 28px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, color: '#fff', margin: '0 0 16px', lineHeight: 1.2 }}>
            Your ship deserves a soft place.
          </h2>
          <p style={{ fontFamily: "'Caveat', cursive", fontSize: 22, color: 'rgba(255,255,255,0.82)', margin: '0 0 40px' }}>
            ✦ &nbsp; free on iPhone &nbsp;·&nbsp; your vault is waiting &nbsp; ✦
          </p>
          <a
            href={app.appStoreUrl || '#'}
            style={{
              fontFamily: "'Fredoka', sans-serif", fontWeight: 500, fontSize: 15,
              padding: '14px 36px', borderRadius: 100,
              backgroundColor: '#fff', color: SAKURA_DEEP,
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            download on ios — it's free
          </a>
        </div>
      </section>

      {/* ── Guides ── */}
      <section style={{ padding: '80px 28px', backgroundColor: VELLUM, borderTop: `1px solid ${LINE}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 24, height: 1, backgroundColor: SAKURA }} />
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', color: SAKURA_DEEP, fontWeight: 500 }}>
              guides
            </span>
            <div style={{ width: 24, height: 1, backgroundColor: SAKURA }} />
          </div>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            fontWeight: 400,
            color: INK,
            marginBottom: 40,
          }}>
            Learn about long-distance relationships
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            <Link to="/yumeship/guide/long-distance-relationship-app-2026" style={{
              padding: 24, borderRadius: 12, border: `1px solid ${LINE}`, backgroundColor: PAPER, textDecoration: 'none', color: INK,
              transition: 'all 0.2s', display: 'block'
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = SAKURA_DEEP;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = LINE;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: SAKURA_DEEP, marginBottom: 8 }}>📖 Guide</div>
              <p style={{ fontSize: 16, fontWeight: 700 }}>Best Long Distance Relationship App</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: PAPER, borderTop: `1px solid ${LINE}`, padding: '40px 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 18, color: INK }}>yumeship</span>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {[
              { label: 'privacy policy', href: '/yumeship/privacy-policy' },
              { label: 'terms of service', href: '/yumeship/terms-of-service' },
              { label: 'support', href: '/yumeship/support' },
            ].map(l => (
              <Link key={l.href} to={l.href} style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 300, fontSize: 13, color: INK2, textDecoration: 'none', opacity: 0.7 }}>
                {l.label}
              </Link>
            ))}
          </div>
          <span style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 300, fontSize: 12, color: INK2, opacity: 0.5 }}>
            ashwinnanbazhagan@gmail.com
          </span>
        </div>
      </footer>
    </div>
  );
};

export default YumeshipLanding;
