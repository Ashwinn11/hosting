import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, CheckCircle, Utensils, ShieldCheck, Check, X } from 'lucide-react';
import type { AppConfig } from '../config/apps';
import SEOBox from '../components/SEOBox';
import GuidesGrid from '../components/GuidesGrid';
import AppLayout from '../components/AppLayout';
import Testimonials from '../components/Testimonials';
import CompareStrip from '../components/CompareStrip';
import FounderNote from '../components/FounderNote';
import LegalContent from './LegalContent';
import { rnSpring, springTransition } from '../lib/springs';
import { useInViewOnce } from '../lib/useInView';

interface Props {
  app: AppConfig;
  section?: 'privacy' | 'terms' | 'support';
}

// Design tokens — src/constants/theme.ts, verbatim. Flat surfaces; no gradients
// anywhere (brand rule: "Palette is the official brand palette, flat, no gradients").
const BG       = '#f4ede2';
const SURFACE  = '#ffffff';
const INSET    = '#ece5d8';
const ACCENT   = '#d97757';
const ACCENT_D = '#c2603f';
const TEXT     = '#141413';
const TEXT2    = 'rgba(20,20,19,0.60)';
const TEXT3    = '#9b988d';
const BORDER   = '#e3dccd';
const GREEN    = '#788c5d'; // colors.success
const GREEN_T  = 'rgba(120,140,93,0.14)';
const HEADING  = '"Bricolage Grotesque", sans-serif';
const BODY     = '"Hanken Grotesk", sans-serif';

// The app's motion table (theme.ts): durations 180/280/440ms + spring presets.
const SNAPPY = rnSpring(220, 22);
const BOUNCY = rnSpring(180, 12);

const marqueeStyle = `
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .gp-marquee {
    display: flex;
    width: max-content;
    animation: marquee 32s linear infinite;
  }
  .gp-marquee:hover { animation-play-state: paused; }
  @keyframes gp-flame {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.18); opacity: 0.85; }
  }
  @keyframes gp-toast {
    0% { opacity: 0; transform: translateY(8px) scale(0.9); }
    14% { opacity: 1; transform: translateY(0) scale(1); }
    82% { opacity: 1; transform: translateY(0) scale(1); }
    100% { opacity: 0; transform: translateY(-10px) scale(0.96); }
  }
  @keyframes gp-pop-in {
    0% { opacity: 0; transform: scale(0.7); }
    60% { transform: scale(1.06); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes gp-row-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes gp-scanline {
    0% { top: 6%; }
    100% { top: 92%; }
  }
  @media (prefers-reduced-motion: reduce) {
    .gp-marquee { animation: none; }
  }
`;

/* AnimatedNumber (src/components/ui/AnimatedNumber.tsx) — 440ms ease-out count. */
const AnimatedNumber: React.FC<{ value: number; style?: React.CSSProperties }> = ({ value, style }) => {
  const [shown, setShown] = useState(value);
  const fromRef = useRef(value);

  useEffect(() => {
    const from = fromRef.current;
    if (from === value) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dur = 440; // motion.duration.slow
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const p = reduced ? 1 : Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(Math.round(from + (value - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <span style={style}>{shown}</span>;
};

/* FlamePulse (Today tab) — the streak flame breathes while a streak is alive. */
const Flame: React.FC<{ active: boolean; size?: number }> = ({ active, size = 15 }) => (
  <svg
    viewBox="0 0 24 24" width={size} height={size}
    fill={active ? ACCENT : 'none'} stroke={active ? ACCENT_D : TEXT3} strokeWidth={1.8}
    style={{ animation: active ? 'gp-flame 1.6s ease-in-out infinite' : 'none', transition: 'fill 0.3s ease' }}
  >
    <path d="M12 2c1 4-4 6-4 10a4 4 0 0 0 8 0c0-1.5-.5-2.5-1-3.5 2 .5 4 2.5 4 5.5a7 7 0 1 1-14 0c0-5 5-7.5 7-12z" />
  </svg>
);

/* ── Today's plan, playable (the app's Today tab loop: cook → made → plants + streak) ── */

const DEMO_MEALS = [
  { meal: 'Lemon herb salmon + rice', tag: 'Low FODMAP', plants: 3 },
  { meal: 'Chickpea & spinach bowl', tag: 'High fiber', plants: 4 },
  { meal: 'Turkey zucchini stir-fry', tag: 'IBS-safe', plants: 3 },
];
const STREAK_BASE = 3; // demo streak going into today — next milestone marker in the app is [3,7,14…]

const PlanDemo: React.FC = () => {
  const [made, setMade] = useState<boolean[]>(() => DEMO_MEALS.map(() => false));
  const [toast, setToast] = useState<{ plants: number; key: number } | null>(null);
  const toastId = useRef(0);
  const madeCount = made.filter(Boolean).length;
  const plants = 9 + DEMO_MEALS.reduce((sum, m, i) => sum + (made[i] ? m.plants : 0), 0);
  const dayDone = madeCount === DEMO_MEALS.length;
  const streak = STREAK_BASE + (madeCount > 0 ? 1 : 0);

  const toggle = (i: number) => {
    const wasMade = made[i];
    setMade((m) => m.map((v, j) => (j === i ? !v : v)));
    if (!wasMade) setToast({ plants: DEMO_MEALS[i].plants, key: ++toastId.current });
  };

  return (
    <div style={{ position: 'relative', width: 296, borderRadius: 24, backgroundColor: SURFACE, border: `1px solid ${BORDER}`, boxShadow: '0 20px 60px rgba(20,20,19,0.08), 0 4px 16px rgba(217,119,87,0.12)', overflow: 'hidden' }}>
      <div style={{ padding: 16, backgroundColor: INSET, borderBottom: `1px solid ${BORDER}` }}>
        <p style={{ fontSize: 9, fontWeight: 700, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Today's plan · tap "made it"</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
            <span style={{ fontFamily: HEADING, fontWeight: 800, fontSize: 23, letterSpacing: '-0.4px', color: TEXT }}>
              🌿 <AnimatedNumber value={plants} />
            </span>
            <span style={{ fontSize: 11, fontWeight: 600, color: TEXT2 }}>plants this week</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 999, backgroundColor: madeCount > 0 ? 'rgba(217,119,87,0.12)' : SURFACE, border: `1px solid ${madeCount > 0 ? 'rgba(217,119,87,0.45)' : BORDER}`, transition: 'background-color 0.28s ease, border-color 0.28s ease' }}>
            <Flame active={madeCount > 0} />
            <span style={{ fontSize: 12, fontWeight: 700, color: madeCount > 0 ? ACCENT_D : TEXT3 }}>
              <AnimatedNumber value={streak} />
            </span>
          </div>
        </div>
      </div>

      {DEMO_MEALS.map(({ meal, tag, plants: p }, i) => (
        <div key={meal} style={{ padding: '13px 16px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: HEADING, fontSize: 13, fontWeight: 700, letterSpacing: '-0.2px', color: made[i] ? TEXT3 : TEXT, marginBottom: 2, transition: 'color 0.28s ease' }}>{meal}</p>
            <span style={{ fontSize: 9, fontWeight: 700, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{tag} · {p} plants</span>
          </div>
          <button
            onClick={() => toggle(i)}
            aria-pressed={made[i]}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5, cursor: 'pointer',
              padding: '7px 12px', borderRadius: 999, fontFamily: BODY, fontSize: 11.5, fontWeight: 700,
              backgroundColor: made[i] ? ACCENT : SURFACE,
              color: made[i] ? '#fff' : TEXT2,
              border: `1.5px solid ${made[i] ? ACCENT : BORDER}`,
              boxShadow: made[i] ? '0 6px 14px rgba(217,119,87,0.28)' : 'none',
              transform: made[i] ? 'scale(1.04)' : 'scale(1)',
              transition: springTransition(BOUNCY, 'transform') + ', background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            {made[i] && <Check size={11} strokeWidth={3.5} />}
            {made[i] ? 'Made it' : 'Made it?'}
          </button>
        </div>
      ))}

      <div style={{ padding: '12px 16px', backgroundColor: dayDone ? GREEN_T : 'rgba(217,119,87,0.04)', transition: 'background-color 0.4s ease' }}>
        {dayDone ? (
          <p style={{ fontSize: 11, fontWeight: 700, color: GREEN, animation: 'gp-pop-in 0.45s cubic-bezier(0.3,1.3,0.4,1) both' }}>
            ✓ Day complete — streak {STREAK_BASE + 1} and counting
          </p>
        ) : (
          <p style={{ fontSize: 10, color: TEXT3 }}>🌿 3 gut-booster gaps identified</p>
        )}
      </div>

      {/* "+N plants" toast — the app's plant-gain moment */}
      {toast && (
        <div
          key={toast.key}
          style={{
            position: 'absolute', top: 10, right: 12, padding: '6px 12px', borderRadius: 999,
            backgroundColor: TEXT, color: BG, fontFamily: HEADING, fontSize: 12, fontWeight: 800,
            animation: 'gp-toast 1.7s cubic-bezier(0.3,1.1,0.4,1) both', pointerEvents: 'none',
          }}
        >
          +{toast.plants} plants
        </div>
      )}
    </div>
  );
};

/* ── Eat-out guidance, playable (lib/eatout.ts result shape: order/skip/plants/summary) ── */

interface EatOutSample {
  name: string;
  order: string[];
  skip: { item: string; reason: string }[];
  plants: number;
  summary: string;
}

const EATOUT_SAMPLES: EatOutSample[] = [
  {
    name: 'Burrito bar',
    order: ['Chicken bowl, white rice', 'Mild tomato salsa', 'Lettuce + cheese'],
    skip: [
      { item: 'Black beans', reason: 'high-FODMAP GOS' },
      { item: 'Guacamole', reason: 'sorbitol load' },
    ],
    plants: 4,
    summary: 'Build a bowl, hold the beans — an easy safe order here.',
  },
  {
    name: 'Thai kitchen',
    order: ['Chicken satay skewers', 'Pad see ew (light soy)', 'Jasmine rice'],
    skip: [
      { item: 'Tom yum soup', reason: 'garlic + onion base' },
      { item: 'Green curry', reason: 'garlic-heavy paste' },
    ],
    plants: 3,
    summary: 'Grilled + noodle dishes over curries; ask for no extra garlic.',
  },
  {
    name: 'Pizzeria',
    order: ['Margherita, thin crust', 'Rocket & parmesan salad', 'Grilled chicken side'],
    skip: [
      { item: 'Garlic bread', reason: 'fructan bomb' },
      { item: 'Creamy pasta', reason: 'lactose + wheat load' },
    ],
    plants: 3,
    summary: 'Thin-crust margherita sits gentler than stuffed or creamy mains.',
  },
];

const EatOutDemo: React.FC = () => {
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const timer = useRef(0);
  const sample = picked != null ? EATOUT_SAMPLES[picked] : null;

  useEffect(() => () => clearTimeout(timer.current), []);

  const pick = (i: number) => {
    setPicked(i);
    setRevealed(false);
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setRevealed(true), 620);
  };

  return (
    <div style={{ borderRadius: 20, backgroundColor: SURFACE, border: `1px solid ${BORDER}`, boxShadow: '0 8px 24px rgba(20,20,19,0.06)', padding: 20 }}>
      <p style={{ fontSize: 9, fontWeight: 700, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
        Where are you headed? · sample guidance
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {EATOUT_SAMPLES.map((s, i) => (
          <button
            key={s.name}
            onClick={() => pick(i)}
            style={{
              padding: '8px 14px', borderRadius: 999, cursor: 'pointer',
              fontFamily: BODY, fontSize: 12.5, fontWeight: 700,
              backgroundColor: picked === i ? TEXT : INSET,
              color: picked === i ? BG : TEXT2,
              border: `1px solid ${picked === i ? TEXT : BORDER}`,
              transform: picked === i ? 'scale(1.05)' : 'scale(1)',
              transition: springTransition(SNAPPY, 'transform') + ', background-color 0.2s ease, color 0.2s ease',
            }}
          >
            {s.name}
          </button>
        ))}
      </div>

      {picked == null && (
        <p style={{ fontSize: 13, color: TEXT3, padding: '22px 0', textAlign: 'center' }}>
          Pick a restaurant — GutPal tells you what to order and what to skip.
        </p>
      )}

      {picked != null && !revealed && (
        <div style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[92, 74, 83].map((w, i) => (
            <div key={i} style={{ height: 13, width: `${w}%`, borderRadius: 7, backgroundColor: INSET, animation: 'gp-flame 1s ease-in-out infinite', animationDelay: `${i * 0.12}s` }} />
          ))}
        </div>
      )}

      {sample && revealed && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 800, color: GREEN, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Order</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {sample.order.map((o, i) => (
                  <div key={o} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, animation: `gp-row-in 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 0.09}s both` }}>
                    <span style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: GREEN_T, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <Check size={10} color={GREEN} strokeWidth={3.5} />
                    </span>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: TEXT, lineHeight: 1.35 }}>{o}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 800, color: ACCENT_D, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Skip</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {sample.skip.map((s, i) => (
                  <div key={s.item} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, animation: `gp-row-in 0.4s cubic-bezier(0.22,1,0.36,1) ${0.18 + i * 0.09}s both` }}>
                    <span style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: 'rgba(217,119,87,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <X size={10} color={ACCENT_D} strokeWidth={3.5} />
                    </span>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: TEXT, lineHeight: 1.35 }}>
                      {s.item} <span style={{ color: TEXT3, fontWeight: 500 }}>— {s.reason}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, backgroundColor: INSET, animation: 'gp-row-in 0.4s cubic-bezier(0.22,1,0.36,1) 0.4s both' }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: ACCENT_D, whiteSpace: 'nowrap' }}>🌿 {sample.plants} plants</span>
            <span style={{ fontSize: 12, color: TEXT2, lineHeight: 1.4 }}>{sample.summary}</span>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Receipt → pantry, playable (lib/vision.ts detect-pantry flow) ── */

const RECEIPT_ITEMS = ['Oats', 'Spinach', 'Blueberries', 'Chicken thighs', 'Zucchini', 'Jasmine rice', 'Eggs', 'Greek yogurt'];

const ReceiptScanDemo: React.FC = () => {
  const [ref, inView] = useInViewOnce<HTMLDivElement>(0.5);
  const [scanKey, setScanKey] = useState(0);
  const scanning = inView; // starts automatically when scrolled into view

  return (
    <div ref={ref} style={{ borderRadius: 20, backgroundColor: SURFACE, border: `1px solid ${BORDER}`, boxShadow: '0 8px 24px rgba(20,20,19,0.06)', padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <p style={{ fontSize: 9, fontWeight: 700, color: TEXT3, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Snap a grocery receipt</p>
        <button
          onClick={() => setScanKey((k) => k + 1)}
          style={{ fontSize: 10.5, fontWeight: 700, color: ACCENT_D, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          scan again ↻
        </button>
      </div>
      <div key={scanKey} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {/* The receipt */}
        <div style={{ position: 'relative', width: 108, flexShrink: 0, backgroundColor: '#fdfcf8', border: `1px solid ${BORDER}`, borderRadius: 6, padding: '10px 9px', boxShadow: '0 3px 10px rgba(20,20,19,0.07)' }}>
          <p style={{ fontFamily: HEADING, fontSize: 8, fontWeight: 800, letterSpacing: '0.08em', color: TEXT2, textAlign: 'center', marginBottom: 6 }}>FRESH MART</p>
          {RECEIPT_ITEMS.map((it) => (
            <div key={it} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 6.5, color: TEXT3, lineHeight: 1.9, fontVariantNumeric: 'tabular-nums' }}>
              <span style={{ textTransform: 'uppercase' }}>{it}</span>
              <span>·</span>
            </div>
          ))}
          <p style={{ fontSize: 6.5, color: TEXT3, textAlign: 'center', marginTop: 6, letterSpacing: '0.06em' }}>— THANK YOU —</p>
          {/* Scan line */}
          {scanning && (
            <div
              aria-hidden
              style={{
                position: 'absolute', left: 3, right: 3, height: 2, borderRadius: 2,
                backgroundColor: ACCENT, boxShadow: `0 0 10px ${ACCENT}`,
                animation: 'gp-scanline 1.6s ease-in-out both',
              }}
            />
          )}
        </div>
        {/* Detected pantry chips */}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: TEXT2, marginBottom: 8 }}>→ your pantry, filled in:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {RECEIPT_ITEMS.map((it, i) => (
              <span
                key={it}
                style={{
                  padding: '5px 11px', borderRadius: 999, fontSize: 11.5, fontWeight: 600,
                  backgroundColor: INSET, color: TEXT, border: `1px solid ${BORDER}`,
                  opacity: 0,
                  animation: scanning ? `gp-pop-in 0.4s cubic-bezier(0.3,1.3,0.4,1) ${0.55 + i * 0.13}s both` : 'none',
                }}
              >
                {it}
              </span>
            ))}
          </div>
          <p style={{ fontSize: 11, color: TEXT3, marginTop: 10, opacity: 0, animation: scanning ? `gp-row-in 0.4s ease ${0.55 + RECEIPT_ITEMS.length * 0.13 + 0.2}s both` : 'none' }}>
            Meals now build from these — nothing wasted.
          </p>
        </div>
      </div>
    </div>
  );
};

const GutPalLanding: React.FC<Props> = ({ app, section }) => {
  if (section) {
    return (
      <AppLayout app={app}>
        <div style={{ color: TEXT, fontFamily: BODY }}>
          <LegalContent app={app} section={section} />
        </div>
      </AppLayout>
    );
  }

  return (
    <div style={{ backgroundColor: BG, color: TEXT, fontFamily: BODY, minHeight: '100vh' }}>
      <style>{marqueeStyle}</style>
      <SEOBox
        title={app.seo.title}
        description={app.seo.description}
        keywords={app.seo.keywords}
        appId={app.id}
        appStoreUrl={app.appStoreUrl}
        appCategory={app.seoApplicationCategory}
        aggregateRating={app.aggregateRating}
        faqs={app.marketing.faqs}
        appNumericId={app.appNumericId}
        screenshots={app.marketing.screenshots}
      />

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, backdropFilter: 'blur(12px)', backgroundColor: 'rgba(244,237,226,0.92)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 6, color: TEXT3, textDecoration: 'none', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.6, transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
          >
            <ChevronLeft size={15} /> All Apps
          </Link>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, overflow: 'hidden', border: `1px solid ${BORDER}` }}>
              <img src="/gutpal.png" alt="GutPal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span style={{ fontFamily: HEADING, fontWeight: 700, fontSize: 16, color: TEXT, letterSpacing: '-0.01em' }}>GutPal</span>
          </Link>
          <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer"
            style={{ backgroundColor: ACCENT, color: '#fff', fontFamily: BODY, fontWeight: 700, fontSize: 14, padding: '8px 20px', borderRadius: 12, textDecoration: 'none', transition: 'background 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = ACCENT_D; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ACCENT; }}
          >
            Get Free
          </a>
        </div>
      </nav>

      <main style={{ paddingTop: 64 }}>
        {/* HERO */}
        <section style={{ padding: '100px 24px 80px' }}>
          <div style={{ maxWidth: 1024, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 60, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: '1 1 320px', maxWidth: 520 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 24, backgroundColor: `${ACCENT}14`, border: `1px solid ${ACCENT}28`, width: 'fit-content' }}>
                  <CheckCircle size={13} style={{ color: ACCENT }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: TEXT2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>IBS · FODMAP · IBD · Monash-aligned</span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 20, backgroundColor: SURFACE, border: `1px solid ${BORDER}`, width: 'fit-content' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>⭐ {app.aggregateRating?.ratingValue}</span>
                  <span style={{ fontSize: 11, color: TEXT2 }}>· {app.aggregateRating?.ratingCount} ratings</span>
                </div>
              </div>
              <h1 style={{ fontFamily: HEADING, fontSize: 'clamp(2.4rem,4.5vw,3.8rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, color: TEXT, marginBottom: 20 }}>
                Finally know<br />what to eat<br />for your gut.
              </h1>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: TEXT2, marginBottom: 36 }}>
                Tell GutPal what's in your kitchen. We hand you a week of gut-safe meals built around your IBS, IBD, or FODMAP profile — cooked from what you already have.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
                <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" style={{ transition: 'transform 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                >
                  <img src="/appstore.png" alt="Download on App Store" style={{ height: 48 }} />
                </a>
                <span style={{ fontSize: 11, fontWeight: 600, color: TEXT3, padding: '6px 12px', backgroundColor: INSET, borderRadius: 16, display: 'inline-block', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Free · iOS 16+ · iPhone</span>
              </div>
            </div>

            {/* Today's plan — live demo of the app's cook → made → plants loop */}
            <div style={{ flex: '0 0 auto' }}>
              <PlanDemo />
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <div style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, backgroundColor: INSET }}>
          <div style={{ maxWidth: 1024, margin: '0 auto', padding: '16px 24px', textAlign: 'center' }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: TEXT3 }}>
              No food logging &nbsp;·&nbsp; Monash-aligned FODMAP &nbsp;·&nbsp; Personalized to your gut &nbsp;·&nbsp; Free on iOS
            </p>
          </div>
        </div>

        {/* SCREENSHOTS */}
        {app.marketing.screenshots && app.marketing.screenshots.length > 0 && (
          <section style={{ padding: '64px 0', backgroundColor: INSET }}>
            <div style={{ maxWidth: 1024, margin: '0 auto', padding: '0 24px', marginBottom: 40 }}>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: TEXT3, marginBottom: 12 }}>See it in action</p>
              <h2 style={{ fontFamily: HEADING, fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', fontWeight: 800, color: TEXT, lineHeight: 1.1 }}>Built for gut-sensitive people.</h2>
            </div>
            <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 20, scrollSnapType: 'x mandatory', paddingLeft: 24 }}>
              {app.marketing.screenshots.map((src, i) => (
                <div key={i} style={{ flexShrink: 0, scrollSnapAlign: 'start' }}>
                  <div style={{ width: 240, height: 520, borderRadius: 20, overflow: 'hidden', border: `1px solid ${BORDER}`, boxShadow: `0 8px 24px rgba(20,20,19,0.08)` }}>
                    <img src={src} alt={`GutPal Screenshot ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* HOW IT WORKS */}
        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1024, margin: '0 auto', textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: TEXT3, marginBottom: 12 }}>Ready in minutes</p>
            <h2 style={{ fontFamily: HEADING, fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 800, color: TEXT, lineHeight: 1.1 }}>How GutPal works.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', maxWidth: 1024, margin: '0 auto' }}>
            {[
              { num: '01', heading: 'Set up your gut profile', body: 'Tell GutPal your conditions — IBS, IBD, SIBO, Crohn\'s, Celiac, GERD, lactose or histamine intolerance. Add your trigger foods and diet style.' },
              { num: '02', heading: 'Tell us what\'s in your kitchen', body: 'Enter what you have in your fridge and pantry. No specialty shopping required — GutPal works with what you already own.' },
              { num: '03', heading: 'Get your gut-safe meal plan', body: 'GutPal generates a week of personalized meals that won\'t hurt. Every suggestion is cross-checked against your profile and FODMAP data.' },
            ].map(({ num, heading, body }, i) => (
              <div key={i} style={{ padding: '32px 24px', borderLeft: i > 0 ? `1px solid ${BORDER}` : 'none' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: HEADING, fontWeight: 800, fontSize: 14, marginBottom: 16, backgroundColor: `${ACCENT}14`, color: ACCENT, border: `1px solid ${ACCENT}28` }}>
                  {num}
                </div>
                <h3 style={{ fontFamily: HEADING, fontWeight: 700, fontSize: 18, marginBottom: 12, color: TEXT }}>{heading}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: TEXT2 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MARQUEE */}
        <div style={{ backgroundColor: ACCENT, overflow: 'hidden', padding: '12px 0' }}>
          <div className="gp-marquee">
            {[1, 2].map(rep => (
              <span key={rep} style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.8)', whiteSpace: 'nowrap', paddingRight: 48 }}>
                IBS &nbsp;·&nbsp; Low FODMAP &nbsp;·&nbsp; IBD &nbsp;·&nbsp; Crohn's &nbsp;·&nbsp; Colitis &nbsp;·&nbsp; SIBO &nbsp;·&nbsp; Celiac &nbsp;·&nbsp; GERD &nbsp;·&nbsp; Histamine &nbsp;·&nbsp; Mediterranean &nbsp;·&nbsp; Lactose-Free &nbsp;·&nbsp; Monash-aligned &nbsp;·&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* FEATURES PAIR — copy + a live demo under each */}
        <section style={{ padding: '80px 0', borderTop: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: 1024, margin: '0 auto', padding: '0 24px 48px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: HEADING, fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 800, color: TEXT }}>Cook well. Eat out safely.</h2>
            <p style={{ fontSize: 14, color: TEXT3, marginTop: 10 }}>Both are live — go ahead and poke them.</p>
          </div>
          <div style={{ maxWidth: 1024, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px,1fr))', gap: 32, padding: '0 24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Utensils size={15} color={ACCENT} />
                <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: ACCENT }}>From your fridge and pantry</p>
              </div>
              <h3 style={{ fontFamily: HEADING, fontWeight: 700, fontSize: 22, color: TEXT, marginBottom: 12 }}>Weekly meal plans</h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: TEXT2, marginBottom: 20 }}>
                Enter what's in your kitchen — or just photograph the grocery receipt. GutPal fills your pantry and builds a week of gut-safe meals entirely from ingredients you already own.
              </p>
              <ReceiptScanDemo />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <ShieldCheck size={15} color={ACCENT} />
                <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: ACCENT }}>At any restaurant</p>
              </div>
              <h3 style={{ fontFamily: HEADING, fontWeight: 700, fontSize: 22, color: TEXT, marginBottom: 12 }}>Eat out without anxiety</h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: TEXT2, marginBottom: 20 }}>
                Name the restaurant — or photograph the menu — and GutPal tells you what to order and what to skip, with the reason for every skip. Share your safe picks with the table.
              </p>
              <EatOutDemo />
            </div>
          </div>
        </section>

        {/* GUT HEALTH FOCUS */}
        <section style={{ padding: '80px 24px', backgroundColor: INSET }}>
          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: TEXT3, marginBottom: 16 }}>No logging. No guessing.</p>
            <h2 style={{ fontFamily: HEADING, fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 800, color: TEXT, lineHeight: 1.2, marginBottom: 20 }}>
              Your gut doesn't need<br />another tracker. It needs answers.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: TEXT2, maxWidth: 520, margin: '0 auto 40px' }}>
              GutPal was built for people with IBS, IBD, SIBO, Crohn's, Celiac, and FODMAP sensitivities. Your profile is yours — every meal plan is calibrated to your exact conditions, not a generic list.
            </p>
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {['IBS', 'Low FODMAP', 'IBD', "Crohn's Disease", 'Colitis', 'SIBO', 'Celiac', 'GERD', 'Histamine Intolerance', 'Mediterranean'].map(cond => (
                <span key={cond} style={{ padding: '6px 14px', borderRadius: 24, backgroundColor: SURFACE, border: `1px solid ${BORDER}`, fontSize: 12, fontWeight: 500, color: TEXT2, boxShadow: '0 1px 4px rgba(20,20,19,0.04)' }}>
                  {cond}
                </span>
              ))}
            </div>
          </div>
        </section>

        <Testimonials
          items={app.testimonials}
          rating={app.aggregateRating}
          theme={{ primary: ACCENT, bg: BG, ink: TEXT, card: SURFACE, border: BORDER, heading: HEADING }}
        />

        <CompareStrip
          items={app.comparisonHighlights}
          appName={app.name}
          theme={{ primary: ACCENT, bg: INSET, ink: TEXT, card: SURFACE, border: BORDER, heading: HEADING }}
        />

        {/* FAQ */}
        {app.marketing.faqs && app.marketing.faqs.length > 0 && (
          <section style={{ padding: '80px 24px' }}>
            <div style={{ maxWidth: 720, margin: '0 auto' }}>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: TEXT3, marginBottom: 12 }}>Common questions</p>
              <h2 style={{ fontFamily: HEADING, fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 800, color: TEXT, marginBottom: 40 }}>Everything you need to know.</h2>
              <div>
                {app.marketing.faqs.map(({ question, answer }) => (
                  <details key={question} style={{ borderTop: `1px solid ${BORDER}`, padding: '20px 0' }}>
                    <summary style={{ fontFamily: BODY, fontWeight: 600, fontSize: 15, color: TEXT, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {question}
                      <span style={{ color: ACCENT, fontSize: 18, marginLeft: 12, flexShrink: 0 }}>+</span>
                    </summary>
                    <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7, color: TEXT2 }}>{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section style={{ padding: '100px 24px', textAlign: 'center', backgroundColor: '#2a1208' }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>Free on iOS</p>
          <h2 style={{ fontFamily: HEADING, fontSize: 'clamp(2.2rem,5vw,3.6rem)', fontWeight: 800, color: '#fff', lineHeight: 1.05, marginBottom: 20 }}>
            Stop guessing.<br />Start eating for your gut.
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', marginBottom: 40, maxWidth: 380, margin: '0 auto 40px' }}>
            For everyone with IBS, IBD, FODMAP sensitivities, and gut conditions who want to eat well without the anxiety.
          </p>
          <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', transition: 'transform 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >
            <img src="/appstore.png" alt="Download on App Store" style={{ height: 56 }} />
          </a>
        </section>

        {/* Guides & Comparisons (dynamic — links every GutPal pSEO page) */}
        <div style={{ backgroundColor: BG, borderTop: `1px solid ${BORDER}` }}>
          <GuidesGrid app={app} heading="IBS & FODMAP Guides" />
        </div>

        <FounderNote
          appName={app.name}
          theme={{ primary: ACCENT, bg: INSET, ink: TEXT, card: SURFACE, border: BORDER, heading: HEADING }}
        />

        {/* FOOTER */}
        <footer style={{ borderTop: `1px solid ${BORDER}`, padding: '28px 24px', backgroundColor: BG }}>
          <div style={{ maxWidth: 1024, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, opacity: 0.45 }}>
            <div style={{ display: 'flex', gap: 28, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <Link to="/gutpal/privacy-policy" style={{ color: TEXT, textDecoration: 'none' }}>Privacy</Link>
              <Link to="/gutpal/terms-of-service" style={{ color: TEXT, textDecoration: 'none' }}>Terms</Link>
              <Link to="/gutpal/support" style={{ color: TEXT, textDecoration: 'none' }}>Support</Link>
            </div>
            <p style={{ fontSize: 11, color: TEXT }}>© 2026 Ashwin Anbazhagan // briefly.live</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default GutPalLanding;
