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

const BG       = '#F6F2EA';   // warm cream canvas
const SURFACE  = '#FFFFFF';   // card white
const INSET    = '#F1EADB';   // inset bg
const SAFE     = '#1A9E52';   // SAFE green
const SAFE_BG  = '#E8F4E8';   // SAFE light
const LIMIT    = '#C0860F';   // LIMIT gold
const LIMIT_BG = '#FAEDCB';   // LIMIT light
const AVOID    = '#DD4A26';   // AVOID coral
const AVOID_BG = '#FAE6DB';   // AVOID light
const TEXT     = '#1C150D';   // ink
const TEXT2    = '#5F5448';   // secondary
const TEXT3    = '#9C8E7E';   // tertiary

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
    <div style={{ backgroundColor: BG, color: TEXT, fontFamily: '"Outfit", sans-serif', minHeight: '100vh' }}>
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
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, backdropFilter: 'blur(12px)', backgroundColor: `rgba(246,242,234,0.92)`, borderBottom: `1px solid rgba(28,21,13,0.06)` }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 6, color: TEXT3, textDecoration: 'none', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.6, transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
          >
            <ChevronLeft size={15} />
            All Apps
          </Link>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, overflow: 'hidden', border: `1px solid rgba(28,21,13,0.08)` }}>
              <img src="/menucheck.png" alt="Menu Check" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span style={{ fontWeight: 700, fontSize: 16, color: TEXT, letterSpacing: '-0.01em' }}>Menu Check</span>
          </Link>
          <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer"
            style={{ backgroundColor: SAFE, color: '#fff', fontWeight: 700, fontSize: 14, padding: '8px 20px', borderRadius: 12, textDecoration: 'none', transition: 'transform 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >
            Get Free
          </a>
        </div>
      </nav>

      <main style={{ paddingTop: 64 }}>
        {/* ── HERO ── */}
        <section style={{ padding: '100px 24px 80px' }}>
          <div style={{ maxWidth: 1024, margin: '0 auto' }} className="flex flex-col gap-[60px] items-center lg:flex-row lg:gap-16">
            {/* Left: copy */}
            <div style={{ flex: 1, maxWidth: 520 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 24, backgroundColor: `${SAFE}12`, border: `1px solid ${SAFE}20`, marginBottom: 32 }}>
                <CheckCircle size={14} style={{ color: SAFE }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: TEXT2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>IBS · FODMAP · Celiac · 100+ conditions</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2.2rem,4.5vw,3.6rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, color: TEXT, marginBottom: 20 }}>
                Finally know what's<br />in your food.
              </h1>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: TEXT2, marginBottom: 36 }}>
                Point your camera at any menu or barcode. Menu Check's AI verdicts every dish in seconds — Safe, Limit, or Avoid — based on your exact conditions.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" style={{ transition: 'transform 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                >
                  <img src="/appstore.png" alt="Download on App Store" style={{ height: 48 }} />
                </a>
                <span style={{ fontSize: 10, fontWeight: 600, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Free on iOS</span>
              </div>
            </div>

            {/* Right: Verdict card UI */}
            <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', maxWidth: 280, borderRadius: 28, overflow: 'hidden', backgroundColor: SURFACE, border: `1px solid rgba(28,21,13,0.1)`, boxShadow: `0 16px 48px rgba(28,21,13,0.08)` }}>
                {/* Card header */}
                <div style={{ padding: '16px', borderBottom: `1px solid rgba(28,21,13,0.06)`, backgroundColor: INSET }}>
                  <p style={{ fontSize: 9, fontWeight: 700, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Analyzing</p>
                  <p style={{ fontWeight: 700, fontSize: 16, color: TEXT }}>Pasta Primavera</p>
                </div>

                {/* Verdict badge */}
                <div style={{ padding: '16px', backgroundColor: LIMIT_BG }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <AlertCircle size={20} style={{ color: LIMIT, flexShrink: 0 }} />
                    <div>
                      <span style={{ fontWeight: 800, fontSize: 20, color: LIMIT, lineHeight: 1 }}>LIMIT</span>
                      <p style={{ fontSize: 10, marginTop: 2, color: TEXT2 }}>Moderate triggers</p>
                    </div>
                  </div>
                </div>

                {/* Ingredient rows */}
                <div style={{ padding: '12px', backgroundColor: SURFACE }}>
                  {[
                    { name: 'Garlic', verdict: 'AVOID', color: AVOID },
                    { name: 'Olive oil', verdict: 'SAFE', color: SAFE },
                    { name: 'Parmesan', verdict: 'LIMIT', color: LIMIT },
                    { name: 'Pasta', verdict: 'AVOID', color: AVOID },
                  ].map(({ name, verdict, color }) => (
                    <div key={name} style={{ padding: '8px 0', borderBottom: `1px solid rgba(28,21,13,0.06)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 12, color: TEXT }}>{name}</span>
                      <span style={{ fontWeight: 700, fontSize: 9, color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{verdict}</span>
                    </div>
                  ))}
                </div>

                {/* Card footer */}
                <div style={{ padding: '12px', backgroundColor: INSET, borderTop: `1px solid rgba(28,21,13,0.06)` }}>
                  <p style={{ fontSize: 10, lineHeight: 1.5, color: TEXT3 }}>Gluten, garlic, dairy detected.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST STRIP ── */}
        <div style={{ borderTop: `1px solid rgba(28,21,13,0.06)`, borderBottom: `1px solid rgba(28,21,13,0.06)`, backgroundColor: INSET }}>
          <div style={{ maxWidth: 1024, margin: '0 auto', padding: '16px 24px', textAlign: 'center' }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: TEXT3 }}>
              3M+ products scanned &nbsp;·&nbsp; 100+ conditions &nbsp;·&nbsp; Free on iOS
            </p>
          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1024, margin: '0 auto', textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: TEXT3, marginBottom: 12 }}>Three seconds to a verdict</p>
            <h2 style={{ fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 700, color: TEXT, lineHeight: 1.1 }}>How it works.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 0, maxWidth: 1024, margin: '0 auto' }}>
            {[
              { num: '01', heading: 'Point your camera', body: 'Aim at any restaurant menu, grocery barcode, or dish. Menu Check reads it instantly.' },
              { num: '02', heading: 'Your profile checks everything', body: 'Every ingredient is cross-referenced against your conditions, diet, and strictness level.' },
              { num: '03', heading: 'Safe. Limit. Avoid.', body: 'A clear, color-coded verdict in seconds. No guessing. No decoding ingredient lists.' },
            ].map(({ num, heading, body }, i) => (
              <div key={i} style={{ padding: '32px 24px', borderLeft: i > 0 ? `1px solid rgba(28,21,13,0.08)` : 'none' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, marginBottom: 16, backgroundColor: `${SAFE}12`, color: SAFE, border: `1px solid ${SAFE}25` }}>
                  {num}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 12, color: TEXT }}>{heading}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: TEXT2 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── VERDICT SYSTEM ── */}
        <section style={{ backgroundColor: INSET }}>
          <div style={{ maxWidth: 1024, margin: '0 auto', padding: '64px 24px 48px', textAlign: 'center' }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: TEXT3, marginBottom: 12 }}>Every scan returns one of three results</p>
            <h2 style={{ fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 700, color: TEXT }}>Clear verdicts. No confusion.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 0 }}>
            {[
              { verdict: 'SAFE', icon: CheckCircle, color: SAFE, bg: SAFE_BG, food: 'Grilled salmon + rice', reason: 'No triggers detected. All ingredients within your safe limits.' },
              { verdict: 'LIMIT', icon: AlertCircle, color: LIMIT, bg: LIMIT_BG, food: 'Caesar salad', reason: 'Contains onion powder — a moderate FODMAP trigger. Safe in small portions.' },
              { verdict: 'AVOID', icon: AlertTriangle, color: AVOID, bg: AVOID_BG, food: 'Garlic bread pasta', reason: 'Gluten, lactose, and garlic detected — multiple high triggers.' },
            ].map(({ verdict, icon: Icon, color, bg, food, reason }) => (
              <div key={verdict} style={{ padding: '40px 32px', backgroundColor: bg, borderTop: `4px solid ${color}`, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <Icon size={20} style={{ color, flexShrink: 0 }} />
                  <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: TEXT3 }}>Verdict</span>
                </div>
                <div style={{ fontSize: 'clamp(2.4rem,5vw,4rem)', fontWeight: 800, color, lineHeight: 1, marginBottom: 12 }}>{verdict}</div>
                <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: TEXT3, marginBottom: 16 }}>{food}</p>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: TEXT2, flex: 1 }}>{reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONDITIONS MARQUEE ── */}
        <div style={{ backgroundColor: SAFE, overflow: 'hidden', padding: '12px 0' }}>
          <div className="marquee-track">
            {[1, 2].map((rep) => (
              <span key={rep} style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.75)', whiteSpace: 'nowrap', paddingRight: 48 }}>
                IBS &nbsp;·&nbsp; FODMAP &nbsp;·&nbsp; Celiac &nbsp;·&nbsp; Crohn's &nbsp;·&nbsp; SIBO &nbsp;·&nbsp; Histamine &nbsp;·&nbsp; Gluten-Free &nbsp;·&nbsp; Dairy-Free &nbsp;·&nbsp; Nut-Free &nbsp;·&nbsp; Lactose &nbsp;·&nbsp; Fructose &nbsp;·&nbsp; IBD &nbsp;·&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* ── FEATURE PAIR ── */}
        <section style={{ padding: '80px 0', borderTop: `1px solid rgba(28,21,13,0.06)` }}>
          <div style={{ maxWidth: 1024, margin: '0 auto', padding: '0 24px 48px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 700, color: TEXT }}>Two ways to scan. One verdict.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', borderTop: `1px solid rgba(28,21,13,0.06)` }}>
            {[
              { title: 'Barcode Scanner', sub: '3M+ grocery products', body: 'Point your camera at any grocery barcode. Menu Check cross-references every ingredient against your full health profile. Verdict in under a second. Works offline for previously scanned products.' },
              { title: 'Menu Photo AI', sub: 'At any restaurant, anywhere', body: 'Photograph any restaurant menu — handwritten, printed, or digital. The AI reads every dish and scores it against your conditions. No more guessing at the table.' },
            ].map(({ title, sub, body }, i) => (
              <div key={i} style={{ padding: '48px 32px', borderLeft: i === 1 ? `1px solid rgba(28,21,13,0.08)` : 'none' }}>
                <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: SAFE, marginBottom: 12 }}>{sub}</p>
                <h3 style={{ fontWeight: 700, fontSize: 22, color: TEXT, marginBottom: 16 }}>{title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: TEXT2 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── GUT HEALTH FOCUS ── */}
        <section style={{ padding: '80px 24px', backgroundColor: INSET }}>
          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: TEXT3, marginBottom: 16 }}>Built for gut-sensitive people</p>
            <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 700, color: TEXT, lineHeight: 1.2, marginBottom: 20 }}>
              Your gut doesn't need<br />yet another app. It needs the right one.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: TEXT2, maxWidth: 520, margin: '0 auto 40px' }}>
              Menu Check was built specifically for people with IBS, Celiac, SIBO, Crohn's, and FODMAP sensitivities. Your profile is yours — every verdict is calibrated to your exact triggers, not a generic list.
            </p>
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {['IBS', 'FODMAP', 'Celiac Disease', 'Crohn\'s', 'SIBO', 'Histamine', 'Dairy-Free', 'Gluten-Free'].map(cond => (
                <span key={cond} style={{ padding: '6px 14px', borderRadius: 24, backgroundColor: SURFACE, border: `1px solid rgba(28,21,13,0.1)`, fontSize: 12, fontWeight: 500, color: TEXT2, boxShadow: '0 1px 4px rgba(28,21,13,0.04)' }}>
                  {cond}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        {app.marketing.faqs && app.marketing.faqs.length > 0 && (
          <section style={{ padding: '80px 24px' }}>
            <div style={{ maxWidth: 720, margin: '0 auto' }}>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: TEXT3, marginBottom: 12 }}>Common questions</p>
              <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 700, color: TEXT, marginBottom: 40 }}>Everything you need to know.</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {app.marketing.faqs.map(({ question, answer }) => (
                  <details key={question} style={{ borderTop: `1px solid rgba(28,21,13,0.08)`, padding: '20px 0' }}>
                    <summary style={{ fontWeight: 600, fontSize: 15, color: TEXT, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {question}
                      <span style={{ color: SAFE, fontSize: 18, marginLeft: 12, flexShrink: 0 }}>+</span>
                    </summary>
                    <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7, color: TEXT2 }}>{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section style={{ padding: '100px 24px', textAlign: 'center', backgroundColor: '#1A4D34' /* SAFE dark */ }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>Free on iOS</p>
          <h2 style={{ fontSize: 'clamp(2.2rem,5vw,3.6rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
            Stop guessing.<br />Start eating safely.
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', marginBottom: 40, maxWidth: 360, margin: '0 auto 40px' }}>
            For everyone with IBS, Celiac, Crohn's, and food sensitivities who want to eat out without anxiety.
          </p>
          <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', transition: 'transform 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >
            <img src="/appstore.png" alt="Download on App Store" style={{ height: 56 }} />
          </a>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: `1px solid rgba(28,21,13,0.06)`, padding: '28px 24px', backgroundColor: BG }}>
          <div style={{ maxWidth: 1024, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, opacity: 0.4 }}>
            <div style={{ display: 'flex', gap: 28, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <Link to="/menucheck/privacy-policy" style={{ color: TEXT, textDecoration: 'none' }}>Privacy</Link>
              <Link to="/menucheck/terms-of-service" style={{ color: TEXT, textDecoration: 'none' }}>Terms</Link>
              <Link to="/menucheck/support" style={{ color: TEXT, textDecoration: 'none' }}>Support</Link>
            </div>
            <p style={{ fontSize: 11, color: TEXT }}>© 2026 Ashwin Anbazhagan // briefly.live</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default MenuCheckLanding;
