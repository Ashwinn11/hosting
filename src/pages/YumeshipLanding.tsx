import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Heart, Mail, BookOpen, Lock, ChevronDown, Plus } from 'lucide-react';
import type { AppConfig } from '../config/apps';
import SEOBox from '../components/SEOBox';
import GuidesGrid from '../components/GuidesGrid';
import Testimonials from '../components/Testimonials';
import CompareStrip from '../components/CompareStrip';
import FounderNote from '../components/FounderNote';
import { useMounted } from '../lib/useMounted';
import { useInViewOnce } from '../lib/useInView';

interface Props {
  app: AppConfig;
  section?: 'privacy' | 'terms' | 'support';
}

/* ────────────────────────────────────────────────────────────────────────────
   YUMESHIP — tokens lifted verbatim from src/constants/theme.ts:
   warm sakura paper, deep-wine ink, plum-tinted shadows, and the app's full
   soft-pastel families (sakura · lavender · sage · butter · peach · plum).
   Type: Instrument Serif Italic (display) · Fredoka (ui) · Caveat (script).
   ──────────────────────────────────────────────────────────────────────────── */

const PAPER      = '#fdf3ee';
const PAPER_DEEP = '#f7e6dc';
const VELLUM     = '#fffaf5';
const INK        = '#2b1a26';
const INK2       = '#5a3f53';
const INK3       = '#8a7383';
const LINE       = '#f0d8c8';
const LINE_STR   = '#e5b9a0';

const SAKURA       = '#f3b6c4';
const SAKURA_SOFT  = '#fadde5';
const SAKURA_DEEP  = '#d77a8d';
const SAKURA_INK   = '#8b3a4a';
const PLUM         = '#6e3a5a';
const LAVENDER     = '#c7b5e3';
const LAVENDER_SOFT = '#ece4f7';
const LAVENDER_DEEP = '#8b6fc4';
const SAGE_SOFT    = '#e0ebd4';
const SAGE_DEEP    = '#6e8762';
const BUTTER_SOFT  = '#fbecc4';
const BUTTER_DEEP  = '#b8902a';
const PEACH_DEEP   = '#b76b48';

// RelationshipColors (theme.ts) — romantic / platonic / familial.
const REL = [
  { key: 'romantic', color: SAKURA_DEEP },
  { key: 'platonic', color: SAGE_DEEP },
  { key: 'familial', color: PEACH_DEEP },
] as const;

// Plum-tinted shadows (Shadow.s2 / s3).
const SHADOW_2 = '0 6px 14px rgba(110,58,90,0.08)';
const SHADOW_3 = '0 12px 28px rgba(110,58,90,0.12)';

// Easing tokens (theme.ts) — soft settle & snappy overshoot.
const EASE_SOFT = 'cubic-bezier(0.32, 0.72, 0.24, 1)';
const EASE_OUT  = 'cubic-bezier(0.16, 1, 0.3, 1)';

const DISPLAY = "'Instrument Serif', serif";
const UI      = "'Fredoka', sans-serif";
const SCRIPT  = "'Caveat', cursive";

/* Fonts load once via index.html — no render-blocking @import here. */
const css = `
  .ys-page * { box-sizing: border-box; }
  @keyframes ys-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
  .ys-rise { opacity: 0; animation: ys-rise 0.8s ${EASE_OUT} forwards; }
  .yd1 { animation-delay: 0.05s; } .yd2 { animation-delay: 0.15s; } .yd3 { animation-delay: 0.26s; } .yd4 { animation-delay: 0.38s; }
  @keyframes ys-pop {
    0% { opacity: 0; transform: scale(0.6); }
    62% { transform: scale(1.12); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes ys-heartbeat {
    0%, 100% { transform: scale(1); }
    18% { transform: scale(1.09); }
    36% { transform: scale(1); }
    54% { transform: scale(1.07); }
  }
  .ys-cta { transition: transform 0.35s ${EASE_OUT}, box-shadow 0.35s ease; }
  .ys-cta:hover { transform: translateY(-2px); box-shadow: 0 14px 28px rgba(110,58,90,0.22); }
  .ys-cta:active { transform: translateY(0) scale(0.97); }
  .ys-shot { transition: transform 0.5s ${EASE_OUT}, box-shadow 0.5s ease; }
  .ys-shot:hover { transform: rotate(0deg) translateY(-10px) !important; box-shadow: ${SHADOW_3} !important; }
  .ys-template { transition: transform 0.4s ${EASE_OUT}, box-shadow 0.4s ease; }
  .ys-template:hover { transform: translateY(-6px) rotate(-0.4deg); box-shadow: ${SHADOW_3}; }
  .ys-heart-frame:hover .ys-heart-img { animation: ys-heartbeat 1.1s ease-in-out; }
  .ys-caret { animation: ys-caret 0.9s step-end infinite; }
  @keyframes ys-caret { 50% { opacity: 0; } }
  .ys-rail { scroll-snap-type: x proximity; }
  .ys-rail > * { scroll-snap-align: center; }
  @media (prefers-reduced-motion: reduce) {
    .ys-rise { animation: none; opacity: 1; }
    .ys-shot, .ys-template, .ys-cta { transition: none; }
    .ys-heart-frame:hover .ys-heart-img { animation: none; }
    .ys-caret { animation: none; }
  }
`;

const ICON_MAP: Record<string, React.ReactNode> = {
  Heart:    <Heart size={20} strokeWidth={1.5} />,
  Mail:     <Mail size={20} strokeWidth={1.5} />,
  BookOpen: <BookOpen size={20} strokeWidth={1.5} />,
  Lock:     <Lock size={20} strokeWidth={1.5} />,
};

/* ── Falling sakura petals — a real particle field (deterministic, canvas) ── */

const rnd = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const PetalField: React.FC<{ count?: number }> = ({ count = 14 }) => {
  const mounted = useMounted();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const COLORS = [SAKURA, '#f9d0da', SAKURA_SOFT, LAVENDER];
    const petals = Array.from({ length: count }, (_, i) => ({
      x0: rnd(i, 1),
      y0: rnd(i, 2) * 1.2,
      speed: 14 + rnd(i, 3) * 14,            // px/s downward
      amp: 12 + rnd(i, 4) * 22,              // sway amplitude
      freq: 0.4 + rnd(i, 5) * 0.5,           // sway frequency
      phase: rnd(i, 6) * Math.PI * 2,
      size: 6 + rnd(i, 7) * 7,
      rot0: rnd(i, 8) * Math.PI * 2,
      rotSpeed: (rnd(i, 9) - 0.5) * 1.6,
      alpha: 0.3 + rnd(i, 10) * 0.3,
      color: COLORS[Math.floor(rnd(i, 11) * COLORS.length) % COLORS.length],
    }));

    const drawPetal = (x: number, y: number, s: number, rot: number, alpha: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.7);
      ctx.quadraticCurveTo(s * 0.62, -s * 0.18, 0, s * 0.7);
      ctx.quadraticCurveTo(-s * 0.62, -s * 0.18, 0, -s * 0.7);
      ctx.fill();
      ctx.restore();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of petals) {
        const y = (((p.y0 * h + p.speed * t) % (h + 44)) + h + 44) % (h + 44) - 22;
        const x = p.x0 * w + Math.sin(t * p.freq + p.phase) * p.amp;
        drawPetal(x, y, p.size, p.rot0 + t * p.rotSpeed, p.alpha, p.color);
      }
    };

    let raf = 0;
    let visible = true;
    let pageVisible = !document.hidden;
    const start = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || !pageVisible) return;
      draw((now - start) / 1000);
    };

    if (reduced) {
      draw(4); // a pleasant static scatter
    } else {
      raf = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const onVis = () => (pageVisible = !document.hidden);
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize', resize);
    };
  }, [mounted, count]);

  if (!mounted) return null;
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
};

/* ── Washi tape strip (templateConfig.ts patterns: stripe · dot · heart · check) ── */

const HEART_URI = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='12' viewBox='0 0 24 22'%3E%3Cpath d='M12 21 C4 14 1 9.5 1 6.4 A5.4 5.4 0 0 1 12 4.6 A5.4 5.4 0 0 1 23 6.4 C23 9.5 20 14 12 21 Z' fill='rgba(255,255,255,0.85)'/%3E%3C/svg%3E")`;

const tapePattern = (pattern: string): React.CSSProperties => {
  switch (pattern) {
    case 'stripe':
      return { backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.55) 0 5px, transparent 5px 11px)' };
    case 'dot':
      return { backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.75) 1.6px, transparent 2.1px)', backgroundSize: '9px 9px' };
    case 'heart':
      return { backgroundImage: HEART_URI, backgroundSize: '14px 12px', backgroundRepeat: 'space' };
    case 'check':
      return { backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0 5px, transparent 5px 10px), repeating-linear-gradient(0deg, rgba(255,255,255,0.4) 0 5px, transparent 5px 10px)' };
    default:
      return {};
  }
};

const WashiTape: React.FC<{ gradStart: string; gradEnd: string; pattern: string }> = ({ gradStart, gradEnd, pattern }) => (
  <div
    aria-hidden
    style={{
      position: 'absolute', top: -10, left: '50%', width: 92, height: 22,
      transform: 'translateX(-50%) rotate(-2.5deg)',
      background: `linear-gradient(90deg, ${gradStart}, ${gradEnd})`,
      opacity: 0.9, borderRadius: 2, boxShadow: '0 1px 3px rgba(110,58,90,0.18)',
    }}
  >
    <div style={{ position: 'absolute', inset: 0, ...tapePattern(pattern) }} />
  </div>
);

/* Template card chrome: vellum card + washi tape + title, mini demo inside. */
const TemplateCard: React.FC<{
  title: string;
  gradStart: string;
  gradEnd: string;
  pattern: string;
  className?: string;
  children: React.ReactNode;
}> = ({ title, gradStart, gradEnd, pattern, className, children }) => (
  <div
    className={`ys-template ${className ?? ''}`}
    style={{
      position: 'relative', width: 250, flexShrink: 0,
      background: VELLUM, border: `1px solid ${LINE}`, borderRadius: 18,
      boxShadow: SHADOW_2, padding: '26px 18px 18px', marginTop: 10,
    }}
  >
    <WashiTape gradStart={gradStart} gradEnd={gradEnd} pattern={pattern} />
    <div style={{ minHeight: 158 }}>{children}</div>
    <div style={{ borderTop: `1px dashed ${LINE_STR}`, marginTop: 14, paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontFamily: UI, fontWeight: 500, fontSize: 13, color: INK }}>{title}</span>
      <span style={{ fontFamily: SCRIPT, fontSize: 14, color: INK3 }}>in the app ♡</span>
    </div>
  </div>
);

/* ── The template minis — each one a real, working micro-recreation ── */

const ThisOrThatMini: React.FC = () => {
  const [pick, setPick] = useState<number | null>(null);
  const options = ['rainy day in', 'festival day out'];
  return (
    <div>
      <p style={{ fontFamily: SCRIPT, fontSize: 17, color: INK2, margin: '4px 0 12px' }}>a saturday together would be…</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {options.map((opt, i) => (
          <button
            key={opt}
            onClick={() => setPick(i)}
            style={{
              fontFamily: UI, fontWeight: 500, fontSize: 14, textAlign: 'left',
              padding: '10px 14px', borderRadius: 12, cursor: 'pointer',
              backgroundColor: pick === i ? SAGE_DEEP : SAGE_SOFT,
              color: pick === i ? '#fff' : INK2,
              border: `1.5px solid ${pick === i ? SAGE_DEEP : 'transparent'}`,
              transform: pick === i ? 'scale(1.03)' : 'scale(1)',
              transition: `transform 0.35s ${EASE_OUT}, background-color 0.25s ease, color 0.25s ease`,
            }}
          >
            {pick === i ? '✓ ' : ''}{opt}
          </button>
        ))}
      </div>
      {pick != null && (
        <p style={{ fontFamily: SCRIPT, fontSize: 15, color: SAGE_DEEP, margin: '10px 0 0', animation: 'ys-pop 0.4s both' }}>
          noted — {options[pick]} it is.
        </p>
      )}
    </div>
  );
};

const LOVE_LETTER = 'dear V — you make ordinary tuesdays feel like festivals. stay close. yours, always.';

const LoveLetterMini: React.FC = () => {
  const [ref, inView] = useInViewOnce<HTMLDivElement>(0.6);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const id = window.setInterval(() => {
      setN((v) => {
        if (v >= LOVE_LETTER.length) {
          clearInterval(id);
          return v;
        }
        return v + 1;
      });
    }, reduced ? 4 : 38);
    return () => clearInterval(id);
  }, [inView]);
  const done = n >= LOVE_LETTER.length;
  return (
    <div ref={ref}>
      <div style={{ position: 'relative', background: '#fff', border: `1px solid ${LINE}`, borderRadius: 10, padding: '12px 14px', minHeight: 108 }}>
        <p style={{ fontFamily: SCRIPT, fontSize: 17.5, lineHeight: 1.45, color: INK2, margin: 0 }}>
          {LOVE_LETTER.slice(0, n)}
          {!done && <span className="ys-caret" style={{ color: SAKURA_DEEP }}>|</span>}
        </p>
        {/* wax seal */}
        <div
          style={{
            position: 'absolute', bottom: -10, right: -8, width: 30, height: 30, borderRadius: '50%',
            background: PLUM, display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: SHADOW_2, opacity: done ? 1 : 0, transform: done ? 'scale(1)' : 'scale(0.4)',
            transition: `opacity 0.3s ease, transform 0.45s ${EASE_OUT}`,
          }}
        >
          <Heart size={13} color={SAKURA_SOFT} fill={SAKURA_SOFT} />
        </div>
      </div>
    </div>
  );
};

const HeartFrameMini: React.FC = () => (
  <div className="ys-heart-frame" style={{ display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
    <svg viewBox="0 0 100 100" width={132} height={132} className="ys-heart-img" style={{ display: 'block' }}>
      <defs>
        <clipPath id="ys-heart-clip">
          <path d="M50 88 C22 66 6 48 6 30 A21 21 0 0 1 50 18 A21 21 0 0 1 94 30 C94 48 78 66 50 88 Z" />
        </clipPath>
      </defs>
      <path d="M50 88 C22 66 6 48 6 30 A21 21 0 0 1 50 18 A21 21 0 0 1 94 30 C94 48 78 66 50 88 Z" fill={SAKURA_SOFT} />
      <image href="/yumeship/1.webp" x="8" y="2" width="84" height="96" preserveAspectRatio="xMidYMid slice" clipPath="url(#ys-heart-clip)" />
      <path d="M50 88 C22 66 6 48 6 30 A21 21 0 0 1 50 18 A21 21 0 0 1 94 30 C94 48 78 66 50 88 Z" fill="none" stroke={SAKURA_DEEP} strokeWidth={2.5} />
    </svg>
  </div>
);

const KawaiiMini: React.FC = () => {
  const [hearts, setHearts] = useState(3);
  return (
    <div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: LAVENDER_SOFT, borderRadius: 999, padding: '5px 12px', marginBottom: 12 }}>
        <span style={{ fontFamily: UI, fontWeight: 500, fontSize: 12, color: LAVENDER_DEEP }}>bond level</span>
        <span style={{ fontFamily: DISPLAY, fontStyle: 'italic', fontSize: 15, color: INK }}>{hearts}/5</span>
      </div>
      <div style={{ display: 'flex', gap: 7, marginBottom: 12 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <button
            key={i}
            onClick={() => setHearts(i + 1)}
            aria-label={`bond level ${i + 1}`}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', animation: i < hearts ? 'ys-pop 0.35s both' : 'none' }}
          >
            <Heart
              size={22}
              color={LAVENDER_DEEP}
              fill={i < hearts ? LAVENDER_DEEP : 'transparent'}
              style={{ transition: 'fill 0.2s ease' }}
            />
          </button>
        ))}
      </div>
      <p style={{ fontFamily: SCRIPT, fontSize: 16, color: INK3, margin: 0 }}>
        {hearts === 5 ? 'maxed out!! ♡♡♡' : 'tap the hearts — no judgement.'}
      </p>
    </div>
  );
};

const AboutUsMini: React.FC = () => {
  const [rel, setRel] = useState(0);
  const c = REL[rel].color;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: `1px solid ${LINE}`, borderRadius: 12, padding: '10px 12px', marginBottom: 12, transition: 'border-color 0.3s ease' }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: `linear-gradient(135deg, ${SAKURA}, ${c})`, transition: 'background 0.4s ease', flexShrink: 0 }} />
        <div>
          <p style={{ fontFamily: UI, fontWeight: 500, fontSize: 13.5, color: INK, margin: 0 }}>you ♡ V</p>
          <p style={{ fontFamily: UI, fontWeight: 400, fontSize: 11, color: c, margin: 0, transition: 'color 0.3s ease' }}>{REL[rel].key}</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {REL.map((r, i) => (
          <button
            key={r.key}
            onClick={() => setRel(i)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontFamily: UI, fontWeight: 500, fontSize: 11, cursor: 'pointer',
              padding: '5px 10px', borderRadius: 999,
              backgroundColor: rel === i ? `${r.color}22` : 'transparent',
              color: rel === i ? r.color : INK3,
              border: `1px solid ${rel === i ? r.color : LINE}`,
              transition: 'all 0.25s ease',
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: r.color }} />
            {r.key}
          </button>
        ))}
      </div>
      <p style={{ fontFamily: SCRIPT, fontSize: 15, color: INK3, margin: '10px 0 0' }}>every bond type gets its own colour.</p>
    </div>
  );
};

const HEADCANON_LINES = [
  'hums when they cook, always off-key',
  'keeps every ticket stub, "for the archive"',
  'texts back in 0.2 seconds, always',
];

const HeadcanonsMini: React.FC = () => {
  const [shown, setShown] = useState(1);
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {HEADCANON_LINES.slice(0, shown).map((line, i) => (
          <div key={i} style={{ background: BUTTER_SOFT, borderRadius: 9, padding: '8px 12px', animation: 'ys-pop 0.4s both', transformOrigin: 'top left' }}>
            <p style={{ fontFamily: SCRIPT, fontSize: 16.5, color: INK2, margin: 0, lineHeight: 1.3 }}>{line}</p>
          </div>
        ))}
      </div>
      {shown < HEADCANON_LINES.length ? (
        <button
          onClick={() => setShown((s) => s + 1)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 10,
            fontFamily: UI, fontWeight: 500, fontSize: 12, color: BUTTER_DEEP,
            background: 'none', border: `1.5px dashed ${BUTTER_DEEP}`, borderRadius: 999,
            padding: '6px 12px', cursor: 'pointer',
          }}
        >
          <Plus size={12} strokeWidth={3} /> add headcanon
        </button>
      ) : (
        <p style={{ fontFamily: SCRIPT, fontSize: 15, color: BUTTER_DEEP, margin: '10px 0 0' }}>canon now. all of it.</p>
      )}
    </div>
  );
};

/* The rest of the catalog (real template titles from the app). */
const MORE_TEMPLATES = [
  'Aesthetic Board', 'Boundaries', 'Storyline', 'Poly Chart', 'Poly Dynamics',
  'Quick Poly', 'Flip Phone', 'Bond Banner', 'Talking About',
];

/* ── Legal page ── */
const LegalPage: React.FC<{ app: AppConfig; section: 'privacy' | 'terms' | 'support' }> = ({ app, section }) => {
  const content =
    section === 'privacy' ? app.legal.privacyPolicy :
    section === 'terms'   ? app.legal.termsOfService :
    app.legal.support;

  const titles = { privacy: 'Privacy Policy', terms: 'Terms of Service', support: 'Support' };

  return (
    <div className="ys-page" style={{ minHeight: '100vh', backgroundColor: PAPER, fontFamily: UI, color: INK }}>
      <style>{css}</style>
      <nav style={{ borderBottom: `1px solid ${LINE}`, padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/yumeship" style={{ display: 'flex', alignItems: 'center', gap: 6, color: INK3, textDecoration: 'none', fontSize: 13 }}>
          <ChevronLeft size={14} /> back to yumeship
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src="/yumeship.png" alt="YumeShip" style={{ width: 26, height: 26, borderRadius: 7 }} />
          <span style={{ fontFamily: DISPLAY, fontStyle: 'italic', fontSize: 18, color: INK }}>yumeship</span>
        </div>
      </nav>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '60px 32px 100px' }}>
        <div style={{ marginBottom: 8, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: SAKURA_INK, fontFamily: UI, fontWeight: 500 }}>
          yumeship
        </div>
        <h1 style={{ fontFamily: DISPLAY, fontStyle: 'italic', fontSize: 40, fontWeight: 400, color: INK, marginBottom: 6, lineHeight: 1.1 }}>
          {titles[section]}
        </h1>
        <p style={{ fontSize: 12, color: INK3, marginBottom: 48, fontWeight: 300 }}>Last updated: {app.legal.lastUpdated}</p>
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

/* ── FAQ item (smooth open) ── */
const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{ borderBottom: `1px solid ${LINE}`, padding: '18px 0', cursor: 'pointer' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <span style={{ fontFamily: UI, fontWeight: 500, fontSize: 15, color: INK }}>{q}</span>
        <ChevronDown size={16} color={INK3} style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: `transform 0.35s ${EASE_OUT}` }} />
      </div>
      <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: `grid-template-rows 0.4s ${EASE_SOFT}` }}>
        <div style={{ overflow: 'hidden' }}>
          <p style={{ margin: '12px 0 0', fontFamily: UI, fontWeight: 300, fontSize: 14, color: INK2, lineHeight: 1.7 }}>{a}</p>
        </div>
      </div>
    </div>
  );
};

/* ── Main landing ── */
const YumeshipLanding: React.FC<Props> = ({ app, section }) => {
  if (section) return <LegalPage app={app} section={section} />;

  return (
    <div className="ys-page" style={{ minHeight: '100vh', backgroundColor: PAPER, color: INK, overflowX: 'hidden' }}>
      <style>{css}</style>
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
        backgroundColor: 'rgba(253,243,238,0.92)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${LINE}`,
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 6, color: INK3, textDecoration: 'none', fontSize: 12, opacity: 0.7 }}>
            <ChevronLeft size={13} />
            <span style={{ fontFamily: UI, letterSpacing: 1.5, textTransform: 'uppercase', fontSize: 10 }}>all apps</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/yumeship.png" alt="YumeShip" style={{ width: 28, height: 28, borderRadius: 8 }} />
            <span style={{ fontFamily: DISPLAY, fontStyle: 'italic', fontSize: 20, color: INK, letterSpacing: -0.3 }}>yumeship</span>
          </div>
          <a
            href={app.appStoreUrl || '#'}
            className="ys-cta"
            style={{
              fontFamily: UI, fontWeight: 500, fontSize: 13,
              padding: '7px 18px', borderRadius: 100,
              backgroundColor: SAKURA_DEEP, color: '#fff',
              textDecoration: 'none', boxShadow: SHADOW_2,
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
        {/* Falling petals */}
        <PetalField />

        <div style={{ position: 'relative', maxWidth: 780, margin: '0 auto', padding: '0 28px' }}>
          <div className="ys-rise yd1" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
            <div style={{ width: 28, height: 1, backgroundColor: SAKURA }} />
            <span style={{ fontFamily: UI, fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', color: SAKURA_INK, fontWeight: 500 }}>
              for fans · for you
            </span>
            <div style={{ width: 28, height: 1, backgroundColor: SAKURA }} />
          </div>

          <h1 className="ys-rise yd2" style={{
            fontFamily: DISPLAY, fontStyle: 'italic',
            fontSize: 'clamp(38px, 6vw, 68px)', fontWeight: 400,
            lineHeight: 1.1, letterSpacing: -0.5, color: INK, margin: '0 0 24px',
          }}>
            {app.marketing.headline}
          </h1>

          <p className="ys-rise yd3" style={{
            fontFamily: SCRIPT, fontSize: 'clamp(18px, 2.5vw, 24px)',
            color: INK2, lineHeight: 1.5, margin: '0 auto 28px', maxWidth: 520,
          }}>
            {app.marketing.subheadline}
          </p>

          {app.aggregateRating && (
            <div className="ys-rise yd3" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 12, backgroundColor: VELLUM, border: `1px solid ${LINE}`, marginBottom: 28, fontSize: 14, fontWeight: 500, color: INK, fontFamily: UI }}>
              <span>⭐</span>
              <span>{app.aggregateRating.ratingValue}</span>
              <span style={{ color: INK3 }}>·</span>
              <span style={{ color: INK3 }}>{app.aggregateRating.ratingCount} ratings</span>
            </div>
          )}

          <div className="ys-rise yd4" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={app.appStoreUrl || '#'}
              className="ys-cta"
              style={{
                fontFamily: UI, fontWeight: 500, fontSize: 15,
                padding: '13px 32px', borderRadius: 100,
                backgroundColor: SAKURA_DEEP, color: '#fff',
                textDecoration: 'none', boxShadow: SHADOW_2,
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              download on ios
            </a>
            <a
              href="#templates"
              style={{
                fontFamily: UI, fontWeight: 400, fontSize: 15,
                padding: '13px 32px', borderRadius: 100,
                border: `1.5px solid ${LINE_STR}`, color: INK2,
                textDecoration: 'none', backgroundColor: 'transparent',
              }}
            >
              see the templates
            </a>
          </div>

          <div className="ys-rise yd4" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '10px 16px', borderRadius: 10, backgroundColor: VELLUM, border: `1px solid ${LINE}`, marginTop: 14, fontSize: 13, fontWeight: 500, color: INK, fontFamily: UI }}>
            <span>Free</span>
            <span style={{ color: INK3 }}>·</span>
            <span>iOS 15+</span>
            <span style={{ color: INK3 }}>·</span>
            <span>iPhone & iPad</span>
          </div>

          {/* Screenshots — plum shadows, straighten on hover */}
          {app.marketing.screenshots && app.marketing.screenshots.length > 0 && (
            <div style={{ marginTop: 64, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              {app.marketing.screenshots.slice(0, 4).map((src, i) => {
                const rotations = ['-4deg', '0deg', '0deg', '2deg'];
                const yOffsets  = ['10px',  '0px',  '0px',  '-8px'];
                const gaps      = [20, 2, 20, 20];
                return (
                  <div key={i} className="ys-shot" style={{
                    width: 160, borderRadius: 28, overflow: 'hidden',
                    border: `1.5px solid ${i % 2 === 0 ? SAKURA : LAVENDER}`,
                    boxShadow: SHADOW_3,
                    transform: `rotate(${rotations[i]}) translateY(${yOffsets[i]})`,
                    flexShrink: 0, marginRight: i < 3 ? gaps[i] : 0,
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
        padding: '28px 28px', textAlign: 'center',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Lock size={14} color={SAKURA_INK} strokeWidth={1.5} />
          <span style={{ fontFamily: SCRIPT, fontSize: 19, color: INK, lineHeight: 1.4 }}>
            everything stays on your phone — no accounts, no cloud, no sharing.
          </span>
          <Lock size={14} color={SAKURA_INK} strokeWidth={1.5} />
        </div>
      </section>

      {/* ── Template gallery — live minis ── */}
      <section id="templates" style={{ padding: '100px 0 90px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', textAlign: 'center', marginBottom: 30 }}>
          <p style={{ fontFamily: SCRIPT, fontSize: 16, color: SAKURA_INK, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
            the templates
          </p>
          <h2 style={{ fontFamily: DISPLAY, fontStyle: 'italic', fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 400, color: INK, margin: '0 0 14px' }}>
            every ship gets its own page.
          </h2>
          <p style={{ fontFamily: UI, fontWeight: 300, fontSize: 16, color: INK2, maxWidth: 460, margin: '0 auto' }}>
            These little ones actually work — go on, play with them. In the app each is a full page for your ship.
          </p>
        </div>

        <div className="ys-rail hide-scrollbar" style={{ display: 'flex', gap: 24, overflowX: 'auto', padding: '16px 28px 24px' }}>
          <TemplateCard title="This or That" gradStart="#b4c8a5" gradEnd="#6e8762" pattern="dot">
            <ThisOrThatMini />
          </TemplateCard>
          <TemplateCard title="Love Letter" gradStart="#fadde5" gradEnd="#6e3a5a" pattern="heart">
            <LoveLetterMini />
          </TemplateCard>
          <TemplateCard title="Heart Frame" gradStart="#fadde5" gradEnd="#d77a8d" pattern="heart" className="ys-heart-frame">
            <HeartFrameMini />
          </TemplateCard>
          <TemplateCard title="Kawaii UI" gradStart="#c7b5e3" gradEnd="#8b6fc4" pattern="dot">
            <KawaiiMini />
          </TemplateCard>
          <TemplateCard title="All About Us" gradStart="#f3b6c4" gradEnd="#d77a8d" pattern="heart">
            <AboutUsMini />
          </TemplateCard>
          <TemplateCard title="Headcanons" gradStart="#fbecc4" gradEnd="#b8902a" pattern="dot">
            <HeadcanonsMini />
          </TemplateCard>
        </div>

        {/* The rest of the catalog */}
        <div style={{ maxWidth: 800, margin: '18px auto 0', padding: '0 28px', textAlign: 'center' }}>
          <p style={{ fontFamily: UI, fontWeight: 300, fontSize: 13, color: INK3, marginBottom: 12 }}>also waiting in the app:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {MORE_TEMPLATES.map((t) => (
              <span key={t} style={{ fontFamily: UI, fontWeight: 400, fontSize: 12.5, color: INK2, padding: '6px 14px', borderRadius: 999, background: PAPER_DEEP, border: `1px solid ${LINE}` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" style={{ padding: '20px 28px 100px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontFamily: DISPLAY, fontStyle: 'italic', fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 400, color: INK, margin: '0 0 16px' }}>
            a vault made with care.
          </h2>
          <p style={{ fontFamily: UI, fontWeight: 300, fontSize: 16, color: INK2, maxWidth: 440, margin: '0 auto' }}>
            {app.marketing.solution}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {app.marketing.benefits.map((b, i) => {
            // The app's soft families: sakura · lavender · butter · sage.
            const colors = [
              { bg: SAKURA_SOFT,   border: SAKURA,   icon: SAKURA_INK },
              { bg: LAVENDER_SOFT, border: LAVENDER, icon: LAVENDER_DEEP },
              { bg: BUTTER_SOFT,   border: '#f0d189', icon: BUTTER_DEEP },
              { bg: SAGE_SOFT,     border: '#b4c8a5', icon: SAGE_DEEP },
            ];
            const c = colors[i % colors.length];
            return (
              <div key={i} className="ys-template" style={{
                backgroundColor: c.bg,
                border: `1px solid ${c.border}`,
                borderRadius: 18,
                padding: '28px 24px',
                boxShadow: SHADOW_2,
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: VELLUM, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, color: c.icon, boxShadow: SHADOW_2 }}>
                  {ICON_MAP[b.icon] ?? <Heart size={20} strokeWidth={1.5} />}
                </div>
                <h3 style={{ fontFamily: UI, fontWeight: 500, fontSize: 17, color: INK, margin: '0 0 8px' }}>{b.title}</h3>
                <p style={{ fontFamily: UI, fontWeight: 300, fontSize: 14, color: INK2, margin: 0, lineHeight: 1.6 }}>{b.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Washi-tape divider — true sakura/lavender tokens */}
      <div style={{ height: 14, background: `repeating-linear-gradient(90deg, ${SAKURA}66 0px, ${SAKURA}66 40px, ${LAVENDER}66 40px, ${LAVENDER}66 80px, ${SAKURA_SOFT} 80px, ${SAKURA_SOFT} 120px)` }} />

      {/* ── Why section ── */}
      <section style={{ backgroundColor: VELLUM, borderBottom: `1px solid ${LINE}`, padding: '80px 28px', position: 'relative', overflow: 'hidden' }}>
        <PetalField count={6} />
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <p style={{ fontFamily: SCRIPT, fontSize: 15, color: SAKURA_INK, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>
            why yumeship
          </p>
          <h2 style={{ fontFamily: DISPLAY, fontStyle: 'italic', fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 400, color: INK, margin: '0 0 24px', lineHeight: 1.3 }}>
            "{app.marketing.problem}"
          </h2>
          <p style={{ fontFamily: UI, fontWeight: 300, fontSize: 16, color: INK2, lineHeight: 1.8, margin: '0 0 16px' }}>
            {app.marketing.agitation}
          </p>
          <div style={{ width: 40, height: 2, backgroundColor: SAKURA, margin: '32px auto 0', borderRadius: 2 }} />
        </div>
      </section>

      <Testimonials
        items={app.testimonials}
        rating={app.aggregateRating}
        heading="Held close by the people who use it."
        theme={{ primary: SAKURA_DEEP, bg: PAPER, ink: INK, card: VELLUM, border: LINE, heading: DISPLAY }}
      />

      <CompareStrip
        items={app.comparisonHighlights}
        appName={app.name}
        theme={{ primary: SAKURA_DEEP, bg: VELLUM, ink: INK, card: PAPER, border: LINE, heading: DISPLAY }}
      />

      {/* ── FAQ ── */}
      {app.marketing.faqs && app.marketing.faqs.length > 0 && (
        <section style={{ padding: '100px 28px', maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontFamily: DISPLAY, fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: INK, margin: '0 0 48px', textAlign: 'center' }}>
            questions & soft answers.
          </h2>
          {app.marketing.faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.question} a={faq.answer} />
          ))}
        </section>
      )}

      {/* ── CTA band — plum, the app's "special" color ── */}
      <section style={{
        backgroundColor: PLUM,
        padding: '80px 28px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', backgroundColor: 'rgba(243,182,196,0.08)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', backgroundColor: 'rgba(243,182,196,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ fontFamily: DISPLAY, fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, color: SAKURA_SOFT, margin: '0 0 16px', lineHeight: 1.2 }}>
            Your ship deserves a soft place.
          </h2>
          <p style={{ fontFamily: SCRIPT, fontSize: 22, color: SAKURA, margin: '0 0 40px' }}>
            ✦ &nbsp; free on iPhone &nbsp;·&nbsp; your vault is waiting &nbsp; ✦
          </p>
          <a
            href={app.appStoreUrl || '#'}
            className="ys-cta"
            style={{
              fontFamily: UI, fontWeight: 500, fontSize: 15,
              padding: '14px 36px', borderRadius: 100,
              backgroundColor: SAKURA_SOFT, color: PLUM,
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            download on ios — it's free
          </a>
        </div>
      </section>

      {/* ── Guides (dynamic — links every YumeShip pSEO page) ── */}
      <div style={{ backgroundColor: VELLUM, borderTop: `1px solid ${LINE}` }}>
        <GuidesGrid app={app} heading="Guides & Comparisons" />
      </div>

      <FounderNote
        appName={app.name}
        note={`I'm Ashwin. I made YumeShip as a soft, private place for the ones you love from afar. I'd love to hear what you keep here.`}
        theme={{ primary: SAKURA_DEEP, bg: VELLUM, ink: INK, card: PAPER, border: LINE, heading: DISPLAY }}
      />

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: PAPER, borderTop: `1px solid ${LINE}`, padding: '40px 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
          <span style={{ fontFamily: DISPLAY, fontStyle: 'italic', fontSize: 18, color: INK }}>yumeship</span>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {[
              { label: 'privacy policy', href: '/yumeship/privacy-policy' },
              { label: 'terms of service', href: '/yumeship/terms-of-service' },
              { label: 'support', href: '/yumeship/support' },
            ].map(l => (
              <Link key={l.href} to={l.href} style={{ fontFamily: UI, fontWeight: 300, fontSize: 13, color: INK2, textDecoration: 'none', opacity: 0.7 }}>
                {l.label}
              </Link>
            ))}
          </div>
          <span style={{ fontFamily: UI, fontWeight: 300, fontSize: 12, color: INK3, opacity: 0.7 }}>
            ashwinnanbazhagan@gmail.com
          </span>
        </div>
      </footer>
    </div>
  );
};

export default YumeshipLanding;
