import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import type { AppConfig } from '../config/apps';
import SEOBox from '../components/SEOBox';
import AppLayout from '../components/AppLayout';
import LegalContent from './LegalContent';

interface Props {
  app: AppConfig;
  section?: 'privacy' | 'terms' | 'support';
}

// ── Shotly design system ──────────────────────────────────────────────────────
const BG        = '#F7F5F0';   // warm parchment
const SURFACE   = '#FDFCF9';   // cream card
const SURFACE2  = '#EFE9DE';   // aged paper
const CORAL     = '#FF6B00';   // brand primary
const PEACH     = '#FF9240';   // brand secondary
const TEXT      = '#1C0F06';   // deep warm charcoal
const TEXT2     = '#6B4E3C';   // warm secondary
const TEXT3     = '#A89080';   // warm tertiary
const BORDER    = 'rgba(28,15,6,0.08)';
const AMBER     = '#D97706';
const GREEN     = '#16A34A';

const gradientText: React.CSSProperties = {
  background: `linear-gradient(135deg, ${CORAL}, ${PEACH})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const cardShadow = '0 2px 16px rgba(28,15,6,0.07), 0 1px 4px rgba(28,15,6,0.05)';


// ── Hero phone mockup card ────────────────────────────────────────────────────
const HeroCard: React.FC = () => {
  const weightPoints = [245, 242.5, 240, 237.5, 235, 232, 229.5, 226.5, 224, 221.5, 219, 216.8, 215.2];
  const min = Math.min(...weightPoints);
  const max = Math.max(...weightPoints);
  const h = 64;
  const w = 240;
  const pts = weightPoints.map((v, i) => {
    const x = (i / (weightPoints.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * h;
    return `${x},${y}`;
  });
  const pathD = `M ${pts.join(' L ')}`;
  const fillD = `M 0,${h} L ${pts.join(' L ')} L ${w},${h} Z`;

  return (
    <div style={{
      width: '100%', maxWidth: 320,
      borderRadius: 28, overflow: 'hidden',
      backgroundColor: SURFACE,
      border: `1.5px solid ${BORDER}`,
      boxShadow: `0 0 0 6px rgba(255,107,0,0.06), 0 24px 64px rgba(28,15,6,0.13)`,
    }}>
      {/* Status bar */}
      <div style={{ backgroundColor: CORAL, padding: '10px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11, fontWeight: 700 }}>9:41</span>
        <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11, fontWeight: 600 }}>Shotly</span>
        <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 10 }}>●●●</span>
      </div>

      {/* Next injection countdown */}
      <div style={{ padding: '16px 16px 12px', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>Next Injection</p>
            <p style={{ fontSize: 26, fontWeight: 900, color: TEXT, lineHeight: 1, letterSpacing: '-0.02em' }}>5 <span style={{ fontSize: 14, fontWeight: 600, color: TEXT2 }}>days</span></p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>Mounjaro</p>
            <p style={{ fontSize: 13, fontWeight: 800, color: CORAL }}>10 mg</p>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ height: 5, borderRadius: 99, backgroundColor: SURFACE2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '71%', borderRadius: 99, background: `linear-gradient(90deg, ${CORAL}, ${PEACH})` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ fontSize: 9, color: TEXT3 }}>Last: Mon Jun 2</span>
          <span style={{ fontSize: 9, color: TEXT3 }}>Next: Mon Jun 9</span>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${BORDER}` }}>
        {[
          { label: 'Lost', value: '29.8 lbs', color: GREEN },
          { label: 'Streak', value: '12 wks', color: CORAL },
          { label: 'Goal', value: '40 lbs', color: AMBER },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ flex: 1, padding: '10px 8px', textAlign: 'center', borderRight: label !== 'Goal' ? `1px solid ${BORDER}` : 'none' }}>
            <p style={{ fontSize: 12, fontWeight: 800, color, lineHeight: 1 }}>{value}</p>
            <p style={{ fontSize: 9, fontWeight: 600, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Weight chart */}
      <div style={{ padding: '12px 16px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Weight Trend</p>
          <p style={{ fontSize: 10, fontWeight: 800, color: GREEN }}>↓ 29.8 lbs</p>
        </div>
        <svg width={w} height={h + 4} style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CORAL} stopOpacity={0.18} />
              <stop offset="100%" stopColor={CORAL} stopOpacity={0} />
            </linearGradient>
          </defs>
          <path d={fillD} fill="url(#chartGrad)" />
          <path d={pathD} fill="none" stroke={CORAL} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          {/* Last point dot */}
          <circle cx={w} cy={h - ((215.2 - min) / (max - min)) * h} r={4} fill={CORAL} />
          <circle cx={w} cy={h - ((215.2 - min) / (max - min)) * h} r={7} fill={CORAL} fillOpacity={0.15} />
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ fontSize: 9, color: TEXT3 }}>Mar 15</span>
          <span style={{ fontSize: 9, fontWeight: 700, color: TEXT2 }}>215.2 lbs</span>
          <span style={{ fontSize: 9, color: TEXT3 }}>Today</span>
        </div>
      </div>

      {/* Today's meals strip */}
      <div style={{ margin: '0 12px 12px', borderRadius: 14, backgroundColor: SURFACE2, padding: '10px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <p style={{ fontSize: 9, fontWeight: 700, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Today's Nutrition</p>
          <p style={{ fontSize: 9, fontWeight: 800, color: AMBER }}>700 / 1500 kcal</p>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { label: 'Protein', val: '60g', color: GREEN },
            { label: 'Fiber', val: '9g', color: AMBER },
            { label: 'Fat', val: '17g', color: CORAL },
          ].map(({ label, val, color }) => (
            <div key={label} style={{ flex: 1, textAlign: 'center' }}>
              <p style={{ fontSize: 11, fontWeight: 800, color }}>{val}</p>
              <p style={{ fontSize: 8, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Feature section card ──────────────────────────────────────────────────────
const FeatureCard: React.FC<{
  label: string;
  heading: string;
  body: string;
  children: React.ReactNode;
  flip?: boolean;
}> = ({ label, heading, body, children, flip = false }) => (
  <div style={{ borderTop: `1px solid ${BORDER}`, padding: '72px 24px' }}>
    <div style={{
      maxWidth: 1024, margin: '0 auto',
      display: 'flex', flexDirection: 'column', gap: 48, alignItems: 'center',
    }}
      className={`lg:flex-row${flip ? '-reverse' : ''}`}
    >
      <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}>
        {children}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>{label}</p>
        <h3 style={{ fontFamily: '"Libre Baskerville", Georgia, serif', fontSize: 'clamp(1.5rem,2.8vw,2.2rem)', fontWeight: 700, color: TEXT, lineHeight: 1.2, marginBottom: 16 }}>{heading}</h3>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: TEXT2, maxWidth: 440 }}>{body}</p>
      </div>
    </div>
  </div>
);

// ── Mini card used in features ────────────────────────────────────────────────
const MiniCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    width: 240, borderRadius: 24, overflow: 'hidden',
    backgroundColor: SURFACE, border: `1.5px solid ${BORDER}`,
    boxShadow: `0 8px 32px rgba(28,15,6,0.10)`,
    padding: 20,
  }}>
    {children}
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const ShotlyLanding: React.FC<Props> = ({ app, section }) => {
  if (section) {
    return (
      <AppLayout app={app}>
        <LegalContent app={app} section={section} />
      </AppLayout>
    );
  }

  return (
    <div style={{ backgroundColor: BG, color: TEXT, fontFamily: '"DM Sans", sans-serif', minHeight: '100vh' }}>
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

      {/* Subtle grain texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.4,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
      }} />

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 50,
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(247,245,240,0.88)',
        borderBottom: `1px solid ${BORDER}`,
      }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 6, color: TEXT3, textDecoration: 'none', opacity: 0.6 }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
          >
            <ChevronLeft size={15} />
            <span style={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>All Apps</span>
          </Link>

          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, overflow: 'hidden', border: `1px solid ${BORDER}` }}>
              <img src="/shotly.png" alt="Shotly" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span style={{ fontWeight: 800, fontSize: 17, color: TEXT, letterSpacing: '-0.01em' }}>Shotly</span>
          </Link>

          <a
            href={app.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: `linear-gradient(135deg, ${CORAL}, ${PEACH})`,
              color: '#fff', fontWeight: 700, fontSize: 13,
              padding: '8px 20px', borderRadius: 12, textDecoration: 'none',
              boxShadow: `0 4px 16px rgba(255,107,0,0.28)`,
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >
            Download Free
          </a>
        </div>
      </nav>

      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* ── HERO ── */}
        <section style={{ paddingTop: 128, paddingBottom: 96, padding: '128px 24px 96px' }}>
          <div style={{ maxWidth: 1024, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 64, alignItems: 'center' }}
            className="lg:flex-row lg:gap-16"
          >
            {/* Copy */}
            <div style={{ flex: 1, maxWidth: 520 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 12px', borderRadius: 8,
                backgroundColor: 'rgba(255,107,0,0.08)',
                border: `1px solid rgba(255,107,0,0.18)`,
                marginBottom: 28,
              }}>
                <img src="/shotly.png" alt="" style={{ width: 16, height: 16, borderRadius: 4 }} />
                <span style={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 700, color: CORAL, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  GLP-1 Tracker · iOS
                </span>
              </div>

              <h1 style={{ fontFamily: '"Libre Baskerville", Georgia, serif', fontSize: 'clamp(2.2rem,4.5vw,3.4rem)', fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.15, color: TEXT, marginBottom: 20 }}>
                Your injections.{' '}
                <span style={gradientText}>Your weight.</span>
                <br />Your story. One place that gets it.
              </h1>

              <p style={{ fontSize: 17, lineHeight: 1.7, color: TEXT2, marginBottom: 36, maxWidth: 440 }}>
                Shotly tracks Ozempic, Wegovy, Mounjaro, and Zepbound — so your health journey is logged privately, all in one place.
              </p>

              {/* Single warm stat */}
              <div style={{ padding: '14px 20px', borderRadius: 14, backgroundColor: SURFACE, border: `1px solid ${BORDER}`, boxShadow: cardShadow, marginBottom: 36, display: 'inline-flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: GREEN }}>↓ 2.3 lbs/wk</span>
                <span style={{ fontSize: 13, color: TEXT3 }}>average · tracked privately on your phone</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer"
                  style={{ transition: 'transform 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                >
                  <img src="/appstore.png" alt="Download on the App Store" style={{ height: 48 }} />
                </a>
                <span style={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 600, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.1em' }}>iOS · Free to start</span>
              </div>
            </div>

            {/* Hero card */}
            <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}>
              <HeroCard />
            </div>
          </div>
        </section>

        {/* ── TICKER STRIP ── */}
        <div style={{ backgroundColor: SURFACE2, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: '12px 0' }}>
          <p style={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 700, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.2em', textAlign: 'center' }}>
            OZEMPIC &nbsp;·&nbsp; WEGOVY &nbsp;·&nbsp; MOUNJARO &nbsp;·&nbsp; ZEPBOUND &nbsp;·&nbsp; SAXENDA &nbsp;·&nbsp; DOSE ESCALATION &nbsp;·&nbsp; WEEKLY INJECTION LOG &nbsp;·&nbsp; WEIGHT CHART &nbsp;·&nbsp; PROTEIN TRACKER &nbsp;·&nbsp; 100% PRIVATE
          </p>
        </div>

        {/* ── FEATURES ── */}
        <FeatureCard
          label="Injection Tracker"
          heading="Never lose track of a dose again."
          body="Log every injection with your medication, dose, site, and personal notes. Built-in dose escalation schedules for Ozempic, Wegovy, Mounjaro, and Zepbound. A full calendar view shows every shot at a glance."
        >
          <MiniCard>
            <p style={{ fontSize: 9, fontWeight: 700, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Injection Log</p>
            {[
              { date: 'Mon Jun 2', dose: '10 mg', med: 'Mounjaro', site: 'Left Thigh', note: 'Feeling confident 💪' },
              { date: 'Mon May 26', dose: '7.5 mg', med: 'Mounjaro', site: 'Right Thigh', note: 'Clothes getting loose' },
              { date: 'Mon May 19', dose: '7.5 mg', med: 'Mounjaro', site: 'Abdomen', note: '' },
            ].map(({ date, dose, med, site, note }) => (
              <div key={date} style={{ padding: '10px 0', borderBottom: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: TEXT }}>{date}</p>
                  <p style={{ fontSize: 9, color: TEXT3, marginTop: 1 }}>{site} {note && `· ${note}`}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 12, fontWeight: 800, color: CORAL }}>{dose}</p>
                  <p style={{ fontSize: 9, color: TEXT3 }}>{med}</p>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ height: 4, borderRadius: 99, flex: 1, backgroundColor: SURFACE2 }}>
                <div style={{ width: '71%', height: '100%', borderRadius: 99, background: `linear-gradient(90deg, ${CORAL}, ${PEACH})` }} />
              </div>
              <span style={{ fontSize: 9, fontWeight: 700, color: CORAL }}>5 days</span>
            </div>
          </MiniCard>
        </FeatureCard>

        <FeatureCard
          label="Weight Loss Chart"
          heading="See the slope that matters."
          body="Log your weight weekly and watch the chart slope downward. Total pounds lost, average weekly loss, and progress toward your goal — visible at a glance. Twelve weeks of momentum in one clean graph."
          flip
        >
          <MiniCard>
            <p style={{ fontSize: 9, fontWeight: 700, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Weight Progress</p>
            {(() => {
              const pts2 = [245, 240, 235, 229.5, 224, 219, 215.2];
              const mn = Math.min(...pts2);
              const mx = Math.max(...pts2);
              const h2 = 72, w2 = 200;
              const p2 = pts2.map((v, i) => `${(i / (pts2.length - 1)) * w2},${h2 - ((v - mn) / (mx - mn)) * h2}`);
              return (
                <svg width={w2} height={h2 + 6} style={{ width: '100%', display: 'block', marginBottom: 10 }}>
                  <defs>
                    <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={CORAL} stopOpacity={0.15} />
                      <stop offset="100%" stopColor={CORAL} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <path d={`M 0,${h2} L ${p2.join(' L ')} L ${w2},${h2} Z`} fill="url(#wg)" />
                  <path d={`M ${p2.join(' L ')}`} fill="none" stroke={CORAL} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx={w2} cy={h2 - ((215.2 - mn) / (mx - mn)) * h2} r={4} fill={CORAL} />
                </svg>
              );
            })()}
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1, backgroundColor: SURFACE2, borderRadius: 10, padding: '8px 10px', textAlign: 'center' }}>
                <p style={{ fontSize: 14, fontWeight: 900, color: GREEN }}>29.8</p>
                <p style={{ fontSize: 8, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 1 }}>lbs lost</p>
              </div>
              <div style={{ flex: 1, backgroundColor: SURFACE2, borderRadius: 10, padding: '8px 10px', textAlign: 'center' }}>
                <p style={{ fontSize: 14, fontWeight: 900, color: AMBER }}>2.3</p>
                <p style={{ fontSize: 8, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 1 }}>lbs / wk</p>
              </div>
              <div style={{ flex: 1, backgroundColor: SURFACE2, borderRadius: 10, padding: '8px 10px', textAlign: 'center' }}>
                <p style={{ fontSize: 14, fontWeight: 900, color: CORAL }}>75%</p>
                <p style={{ fontSize: 8, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 1 }}>to goal</p>
              </div>
            </div>
          </MiniCard>
        </FeatureCard>

        <FeatureCard
          label="Nutrition Tracker"
          heading="Eat right for your medication."
          body="GLP-1 medications suppress appetite dramatically. Shotly's meal logger helps you hit high-protein, fiber-rich targets — so you lose fat, not muscle. Log meals in seconds with automatic macro breakdowns."
        >
          <MiniCard>
            <p style={{ fontSize: 9, fontWeight: 700, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Today · June 8</p>
            {[
              { type: '🌅 Breakfast', name: 'Greek yogurt with berries', cal: 280, protein: 18 },
              { type: '☀️ Lunch', name: 'Grilled chicken salad', cal: 420, protein: 42 },
            ].map(({ type, name, cal, protein }) => (
              <div key={type} style={{ padding: '8px 0', borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontSize: 9, fontWeight: 700, color: TEXT3 }}>{type}</p>
                    <p style={{ fontSize: 11, fontWeight: 600, color: TEXT, marginTop: 1 }}>{name}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: AMBER }}>{cal} kcal</p>
                    <p style={{ fontSize: 9, color: GREEN }}>{protein}g protein</p>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 10, backgroundColor: SURFACE2, borderRadius: 12, padding: '10px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Daily total</span>
                <span style={{ fontSize: 10, fontWeight: 800, color: AMBER }}>700 / 1500 kcal</span>
              </div>
              <div style={{ height: 4, borderRadius: 99, backgroundColor: SURFACE, overflow: 'hidden' }}>
                <div style={{ width: '47%', height: '100%', borderRadius: 99, background: `linear-gradient(90deg, ${CORAL}, ${PEACH})` }} />
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <span style={{ fontSize: 9, color: GREEN, fontWeight: 700 }}>60g protein</span>
                <span style={{ fontSize: 9, color: AMBER, fontWeight: 700 }}>9g fiber</span>
                <span style={{ fontSize: 9, color: TEXT3 }}>17g fat</span>
              </div>
            </div>
          </MiniCard>
        </FeatureCard>

        {/* ── PRIVACY CTA ── */}
        <section style={{ backgroundColor: SURFACE2, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: '64px 24px' }}>
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 700, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>Privacy First</p>
            <h2 style={{ fontFamily: '"Libre Baskerville", Georgia, serif', fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 700, color: TEXT, lineHeight: 1.2, marginBottom: 16 }}>Your health data stays on your phone.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: TEXT2 }}>
              Shotly stores all injection logs, weight entries, and meal data locally on your device. Nothing is sent to any server. No account required. No cloud sync. Just your private health journey.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p style={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 700, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>Common questions</p>
            <h2 style={{ fontFamily: '"Libre Baskerville", Georgia, serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700, color: TEXT, lineHeight: 1.2, marginBottom: 40 }}>Everything you need to know.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {(app.marketing.faqs ?? []).map(({ question, answer }) => (
                <details key={question} style={{ borderTop: `1px solid ${BORDER}`, padding: '20px 0' }}>
                  <summary style={{ fontWeight: 700, fontSize: 15, color: TEXT, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {question}
                    <span style={{ color: CORAL, fontSize: 18, marginLeft: 12, flexShrink: 0 }}>+</span>
                  </summary>
                  <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7, color: TEXT2 }}>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section style={{ padding: '96px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,107,0,0.07) 0%, transparent 70%)` }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ width: 72, height: 72, borderRadius: 20, overflow: 'hidden', margin: '0 auto 24px', border: `2px solid ${BORDER}`, boxShadow: `0 8px 32px rgba(255,107,0,0.2)` }}>
              <img src="/shotly.png" alt="Shotly" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <p style={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 700, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20 }}>Free on iOS</p>
            <h2 style={{ fontFamily: '"Libre Baskerville", Georgia, serif', fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 700, color: TEXT, lineHeight: 1.15, marginBottom: 20 }}>
              Every dose logged.{' '}
              <span style={gradientText}>Every pound tracked.</span>
            </h2>
            <p style={{ fontSize: 17, color: TEXT2, marginBottom: 40, maxWidth: 380, margin: '0 auto 40px' }}>
              Your journey, not theirs. Private. Warm. Yours.
            </p>
            <a
              href={app.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', transition: 'transform 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
            >
              <img src="/appstore.png" alt="Download on the App Store" style={{ height: 56 }} />
            </a>
            <p style={{ marginTop: 24, fontFamily: 'monospace', fontSize: 10, fontWeight: 600, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Not medical advice · Personal tracking only
            </p>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: `1px solid ${BORDER}`, padding: '32px 24px' }}>
          <div style={{ maxWidth: 1024, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}
            className="md:flex-row md:justify-between"
          >
            <div style={{ display: 'flex', gap: 28 }}>
              {[
                { label: 'Privacy', to: '/shotly/privacy-policy' },
                { label: 'Terms', to: '/shotly/terms-of-service' },
                { label: 'Support', to: '/shotly/support' },
              ].map(({ label, to }) => (
                <Link key={label} to={to} style={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: TEXT3, textDecoration: 'none', opacity: 0.6, transition: 'opacity 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '0.6'; }}
                >
                  {label}
                </Link>
              ))}
            </div>
            <p style={{ fontFamily: 'monospace', fontSize: 10, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5 }}>
              © 2026 Ashwin Anbazhagan // briefly.live
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ShotlyLanding;
