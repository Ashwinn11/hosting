import React, { useEffect, useRef } from 'react';
import { apps } from '../config/apps';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import SEOBox from '../components/SEOBox';
import { ShaderCanvas } from '../lib/ShaderCanvas';

/* ──────────────────────────────────────────────────────────────────────────
   BRIEFLY — indie iOS studio. A dark gallery wall at night: three works hang
   under three colored lights (each app's true accent), and every world card
   is alive — hover one and its app plays a tiny, truthful demo of itself.
   Shell type: Bricolage Grotesque display · Hanken Grotesk body · DM Mono meta.
   ────────────────────────────────────────────────────────────────────────── */

const INK = '#0A0A0C';
const CREAM = '#EDE8DF';
const GOLD = '#D4A843';
const MUTE = 'rgba(237,232,223,0.46)';
const FAINT = 'rgba(237,232,223,0.28)';
const HAIR = 'rgba(237,232,223,0.09)';

const DISPLAY = '"Bricolage Grotesque", "Hanken Grotesk", sans-serif';
const BODY = '"Hanken Grotesk", sans-serif';
const MONO = '"DM Mono", monospace';

/* ── The gallery lights — three app accents washing down the wall (GLSL) ──
   Amber (Honestly) · sakura (YumeShip) · postal-red (Snipsy), each pool
   breathing on its own phase. */

const WALL_FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;      // origin bottom-left
  float t = u_time;

  vec3 wall = vec3(0.039, 0.039, 0.047);  // #0A0A0C

  vec3 accents[3];
  accents[0] = vec3(0.961, 0.522, 0.122); // amber   — Honestly
  accents[1] = vec3(0.843, 0.478, 0.553); // sakura  — YumeShip
  accents[2] = vec3(0.839, 0.314, 0.227); // postal  — Snipsy

  vec3 col = wall;
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float cx = (fi + 0.5) / 3.0 + sin(t * 0.05 + fi * 1.7) * 0.025;
    float dx = (uv.x - cx) * 2.1;
    float dy = (1.0 - uv.y) * 1.35;         // pools hang from the top edge
    float pool = exp(-(dx * dx + dy * dy) * 3.2);
    float breath = 0.72 + 0.28 * sin(t * 0.11 + fi * 1.9);
    col += accents[i] * pool * breath * 0.075;
  }

  // Soft vignette so the wall falls away at the corners.
  float v = distance(uv, vec2(0.5, 0.42));
  col *= 1.0 - v * v * 0.35;

  // Film grain, per physical pixel.
  col += (hash21(floor(gl_FragCoord.xy)) - 0.5) * 0.05;

  gl_FragColor = vec4(col, 1.0);
}
`;

const GalleryWall: React.FC = () => (
  <div
    aria-hidden
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      background: `
        radial-gradient(46% 38% at 10% 0%, rgba(196,118,90,0.07), transparent 70%),
        radial-gradient(46% 38% at 30% 0%, rgba(217,119,87,0.07), transparent 70%),
        radial-gradient(46% 38% at 50% 0%, rgba(245,133,31,0.06), transparent 70%),
        radial-gradient(46% 38% at 70% 0%, rgba(233,180,76,0.07), transparent 70%),
        radial-gradient(46% 38% at 90% 0%, rgba(215,122,141,0.07), transparent 70%),
        ${INK}`,
    }}
  >
    <ShaderCanvas frag={WALL_FRAG} fps={30} dprCap={1.25} />
  </div>
);

/* ── Cursor spotlight — a hand-held light moving across the gallery wall ── */

const Spotlight: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let tx = -600;
    let ty = -600;
    let cx = tx;
    let cy = ty;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.style.opacity = '1';
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.transform = `translate3d(${cx - 300}px, ${cy - 300}px, 0)`;
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'fixed', top: 0, left: 0, width: 600, height: 600, zIndex: 1,
        borderRadius: '50%', pointerEvents: 'none', opacity: 0,
        background: 'radial-gradient(circle, rgba(212,168,67,0.05) 0%, transparent 65%)',
        transform: 'translate3d(-600px, -600px, 0)',
        transition: 'opacity 0.6s ease',
      }}
    />
  );
};

/* ── Magnetic pill — leans toward the cursor, settles back on leave ── */

const MagneticLink: React.FC<{ href: string; children: React.ReactNode; style?: React.CSSProperties; className?: string }> = ({ href, children, style, className }) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${dx * 0.16}px, ${dy * 0.3}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
  };
  return (
    <a ref={ref} href={href} className={className} onMouseMove={onMove} onMouseLeave={onLeave} style={{ transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)', willChange: 'transform', ...style }}>
      {children}
    </a>
  );
};

/* ── Tilt — the framed work leans gently toward your light ── */

const useTilt = () => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateX(${(-py * 2.4).toFixed(2)}deg) rotateY(${(px * 2.4).toFixed(2)}deg) translateY(-7px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
  };
  return [ref, onMove, onLeave] as const;
};

/* ── Tiny truthful pieces for the world-card demos ── */

/* Honestly's mood face, compact (exact palette from the app). */
const MOOD_FILL = ['#F7C24B', '#A8CB8C', '#90B4DC', '#C79ACD', '#6E9BD6'];
const MOOD_INK = ['#5A3D12', '#33471F', '#22344D', '#4E3357', '#22406B'];
const MiniFace: React.FC<{ mood: number; size?: number; className?: string; style?: React.CSSProperties }> = ({ mood, size = 24, className, style }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style}>
    <circle cx={50} cy={50} r={46} fill={MOOD_FILL[mood]} stroke="#33261A" strokeWidth={4} />
    <circle cx={33} cy={40} r={6} fill={MOOD_INK[mood]} />
    <circle cx={67} cy={40} r={6} fill={MOOD_INK[mood]} />
    {mood === 0 && <path d="M30,62 Q50,80 70,62" stroke={MOOD_INK[mood]} strokeWidth={5} strokeLinecap="round" fill="none" />}
    {mood === 1 && <path d="M36,68 L64,62" stroke={MOOD_INK[mood]} strokeWidth={5} strokeLinecap="round" fill="none" />}
    {mood === 2 && <path d="M30,72 Q50,58 70,72" stroke={MOOD_INK[mood]} strokeWidth={5} strokeLinecap="round" fill="none" />}
    {mood === 3 && <path d="M30,70 Q40,62 50,69 Q60,76 70,68" stroke={MOOD_INK[mood]} strokeWidth={5} strokeLinecap="round" fill="none" />}
    {mood === 4 && <path d="M34,76 Q50,64 66,76" stroke={MOOD_INK[mood]} strokeWidth={5} strokeLinecap="round" fill="none" />}
  </svg>
);

/* ── Per-app world definitions — exact app tokens + a hover-choreographed demo ── */

interface World {
  cardBg: string;
  cardText: string;
  cardText2: string;
  accent: string;
  fontDisplay: string;
  fontStyle?: 'italic';
  demo: React.ReactNode;
  decorators?: React.ReactNode;
}

const WORLDS: Record<string, World> = {
  honestly: {
    cardBg: '#FAF8F5',
    cardText: '#33261A',
    cardText2: '#8A7A67',
    accent: '#F5851F',
    fontDisplay: '"Shantell Sans", cursive',
    demo: (
      <div style={{ marginTop: 20, display: 'flex', gap: 9, alignItems: 'center', flexWrap: 'wrap' }}>
        {[0, 1, 2, 3, 4].map((m) => (
          <MiniFace key={m} mood={m} size={26} className={`hon-face hon-face-${m}`} />
        ))}
        <span className="hon-note" style={{ fontFamily: '"Shantell Sans", cursive', fontSize: 12, color: '#BC5E17', marginLeft: 4 }}>
          how are you, really?
        </span>
      </div>
    ),
  },
  yumeship: {
    cardBg: '#fdf3ee',
    cardText: '#2b1a26',
    cardText2: '#5a3f53',
    accent: '#d77a8d',
    fontDisplay: '"Instrument Serif", Georgia, serif',
    fontStyle: 'italic',
    demo: (
      <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
        {[['#f3b6c4', 'sakura'], ['#c7b5e3', 'lavender'], ['#b4c8a5', 'sage'], ['#f0d189', 'butter']].map(([c, n]) => (
          <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: c, border: '1.5px solid rgba(110,58,90,0.18)' }} />
            <span style={{ fontSize: 8.5, color: '#8a7383', letterSpacing: '0.04em' }}>{n}</span>
          </div>
        ))}
        <span className="ys-script" style={{ fontFamily: '"Caveat", cursive', fontSize: 17, color: '#8b3a4a', marginLeft: 6 }}>you ♡ V</span>
        {/* Petals drift while you're here */}
        {[0, 1, 2].map((i) => (
          <div key={i} className={`ys-petal ys-petal-${i}`} aria-hidden style={{
            position: 'absolute', top: -46 - i * 12, left: `${24 + i * 30}%`,
            width: 9, height: 13, borderRadius: '50% 0 50% 0',
            background: 'linear-gradient(135deg, #f3b6c4, #fadde5)', opacity: 0,
          }} />
        ))}
      </div>
    ),
  },
  snipsy: {
    cardBg: '#F8F2E3',
    cardText: '#4A3728',
    cardText2: 'rgba(74,55,40,0.55)',
    accent: '#D6503A',
    fontDisplay: 'system-ui, -apple-system, sans-serif',
    demo: (
      <div style={{ marginTop: 20, display: 'flex', alignItems: 'flex-end', gap: 14 }}>
        {/* Mini stamp that gets a cancellation mark on hover */}
        <div className="snip-mini-stamp" style={{ position: 'relative', width: 56, height: 72, flexShrink: 0 }}>
          <svg viewBox="0 0 56 72" width={56} height={72}>
            {/* Perforated edge via circle clip */}
            <defs>
              <clipPath id="snip-mini-perf">
                <path d="M5,0 Q8,-3 11,0 Q14,-3 17,0 Q20,-3 23,0 Q26,-3 29,0 Q32,-3 35,0 Q38,-3 41,0 Q44,-3 47,0 Q50,-3 53,0 L56,0 Q59,3 56,6 Q59,10 56,14 Q59,18 56,22 Q59,26 56,30 Q59,34 56,38 Q59,42 56,46 Q59,50 56,54 Q59,58 56,62 Q59,66 56,70 L56,72 Q53,75 50,72 Q47,75 44,72 Q41,75 38,72 Q35,75 32,72 Q29,75 26,72 Q23,75 20,72 Q17,75 14,72 Q11,75 8,72 Q5,75 2,72 L0,72 Q-3,69 0,66 Q-3,62 0,58 Q-3,54 0,50 Q-3,46 0,42 Q-3,38 0,34 Q-3,30 0,26 Q-3,22 0,18 Q-3,14 0,10 Q-3,6 0,2 Z" />
              </clipPath>
            </defs>
            <rect x={0} y={0} width={56} height={72} fill="#C4956A" clipPath="url(#snip-mini-perf)" />
            <rect x={6} y={6} width={44} height={42} rx={2} fill="rgba(34,31,26,0.08)" clipPath="url(#snip-mini-perf)" />
            {/* Mountain icon */}
            <g clipPath="url(#snip-mini-perf)" opacity={0.4}>
              <circle cx={36} cy={16} r={5} fill="#221F1A" opacity={0.3} />
              <path d="M8,46 L20,24 L28,34 L36,22 L48,46Z" fill="#221F1A" opacity={0.2} />
            </g>
            <text x={28} y={60} textAnchor="middle" fontFamily="Georgia, serif" fontWeight={600} fontSize={7} fill="#221F1A" opacity={0.6}>SNIPSY</text>
            {/* Cancellation mark — draws on hover */}
            <g className="snip-cancel-mark" opacity={0}>
              <circle cx={38} cy={22} r={14} fill="none" stroke="#D6503A" strokeWidth={1.2} opacity={0.5} />
              <line x1={26} y1={16} x2={50} y2={28} stroke="#D6503A" strokeWidth={1} opacity={0.5} />
              <line x1={26} y1={20} x2={50} y2={32} stroke="#D6503A" strokeWidth={0.8} opacity={0.3} />
            </g>
          </svg>
        </div>
        <div>
          <span className="snip-tag" style={{ fontFamily: 'system-ui', fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: '#D6503A', textTransform: 'uppercase' }}>№ 042</span>
          <span className="snip-label" style={{ display: 'block', fontFamily: 'Georgia, serif', fontSize: 11, color: 'rgba(74,55,40,0.55)', fontStyle: 'italic', marginTop: 3 }}>tinted edition</span>
        </div>
      </div>
    ),
    decorators: (
      <div aria-hidden style={{ position: 'absolute', top: 18, right: 20, width: 28, height: 28, borderRadius: '50%', border: '1.5px solid rgba(214,80,58,0.18)' }} />
    ),
  },
};

// Grid rhythm — 3 apps, 3 cells, asymmetric spans. No empty cells.
const LAYOUT: { id: string; cls: string }[] = [
  { id: 'honestly', cls: 'gc-7 gc-feature' },
  { id: 'yumeship', cls: 'gc-5' },
  { id: 'snipsy', cls: 'gc-12 gc-feature' },
];

const PRINCIPLES: [string, string][] = [
  ['iOS native, no bloat', 'Built for one platform and tuned to it. No cross-platform compromises, no web view pretending to be an app.'],
  ['One problem, solved fully', 'Each app does a single job and refuses to sprawl into ten. The scope stays small so the craft can go deep.'],
  ['Quietly built, not gimmicked', 'No chatbot bolted onto the home screen, no feature added just to fill a slide. Only what the app actually needs.'],
  ['Free to try, honest to pay', 'Download free and use the core. Pay only once an app is already working for you, never before.'],
];

/* One world card with tilt physics. */
const WorldCard: React.FC<{ id: string; cls: string; idx: number }> = ({ id, cls, idx }) => {
  const app = apps.find((a) => a.id === id);
  const w = WORLDS[id];
  const [tiltRef, onTiltMove, onTiltLeave] = useTilt();
  if (!app || !w) return null;
  const feature = cls.includes('feature');
  return (
    <Link
      ref={tiltRef}
      to={`/${id}`}
      className={`app-card reveal-scroll ${cls}`}
      onMouseMove={onTiltMove}
      onMouseLeave={onTiltLeave}
      style={{
        background: w.cardBg,
        boxShadow: '0 6px 28px rgba(0,0,0,0.24)',
        minHeight: feature ? 380 : 330,
        padding: feature ? '38px 40px 34px' : '34px 34px 30px',
        transitionDelay: `${(idx % 2) * 0.06}s`,
      }}
    >
      {w.decorators}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: feature ? 30 : 26 }}>
          <img src={`/${id}.png`} alt={app.name} width={54} height={54} style={{ width: 54, height: 54, borderRadius: 14, objectFit: 'cover', flexShrink: 0, boxShadow: '0 6px 16px rgba(0,0,0,0.18)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.12em', color: w.cardText2, fontWeight: 500 }}>
              {app.category}
            </span>
            <span className="app-visit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: '50%', background: w.accent, color: '#fff', flexShrink: 0 }}>
              <ArrowUpRight size={15} strokeWidth={2} />
            </span>
          </div>
        </div>

        <h3 style={{ fontFamily: w.fontDisplay, fontStyle: w.fontStyle, fontSize: feature ? 'clamp(2.4rem, 3.6vw, 3.2rem)' : 'clamp(1.9rem, 3vw, 2.5rem)', fontWeight: w.fontStyle === 'italic' ? 400 : 700, letterSpacing: '-0.02em', lineHeight: 1.02, margin: '0 0 12px 0', color: w.cardText }}>
          {app.name}
        </h3>
        <p style={{ fontFamily: BODY, fontSize: 13.5, color: w.cardText2, margin: 0, lineHeight: 1.5, maxWidth: 360 }}>
          {app.tagline}
        </p>
      </div>

      {w.demo}
      <div aria-hidden className="app-underline" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, background: w.accent, opacity: 0.5, transform: 'scaleX(0.3)', transformOrigin: 'left' }} />
    </Link>
  );
};

const Home: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  // Scroll-reveal via IntersectionObserver. SSR/no-JS safe: elements are
  // visible by default; the `js` class only hides them once JS has mounted,
  // then the observer reveals each as it enters the viewport.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.add('js');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = Array.from(root.querySelectorAll<HTMLElement>('.reveal-scroll'));
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Hero icon parallax — each icon drifts at its own depth as the cursor moves.
  const heroIconsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const wrap = heroIconsRef.current;
    if (!wrap) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const icons = Array.from(wrap.querySelectorAll<HTMLElement>('.brf-icon-inner'));
    let raf = 0;
    let mx = 0;
    let my = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      raf = 0;
      icons.forEach((el, i) => {
        const depth = 8 + (i % 3) * 7;
        el.style.transform = `translate(${(-mx * depth).toFixed(1)}px, ${(-my * depth).toFixed(1)}px)`;
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes brf-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .brf-track { animation: brf-marquee 46s linear infinite; display: flex; width: max-content; will-change: transform; }
        .brf-track:hover { animation-play-state: paused; }
        .brf-marquee-mask { mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }

        @keyframes brf-rise { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .rise { opacity: 0; animation: brf-rise 0.9s cubic-bezier(0.22,1,0.36,1) forwards; }
        .h0 { animation-delay: 0.04s; } .h1 { animation-delay: 0.16s; } .h2 { animation-delay: 0.28s; }
        .h3 { animation-delay: 0.40s; } .h4 { animation-delay: 0.52s; }

        @keyframes brf-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .brf-icon { animation: brf-float 6s ease-in-out infinite; }
        .brf-icon-inner { transition: transform 0.2s ease-out; will-change: transform; }

        /* Scroll reveal — visible unless JS is present (SSR/SEO safe) */
        .js .reveal-scroll { opacity: 0; transform: translateY(28px); transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1); }
        .js .reveal-scroll.in { opacity: 1; transform: none; }

        .app-card { position: relative; overflow: hidden; border-radius: 24px; text-decoration: none; display: flex; flex-direction: column; justify-content: space-between;
          transition: transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.45s cubic-bezier(0.25,0.46,0.45,0.94); will-change: transform; }
        .app-card:hover { box-shadow: 0 22px 52px rgba(0,0,0,0.4); }
        .app-visit { opacity: 0; transform: translateY(6px) scale(0.9); transition: opacity 0.3s ease, transform 0.3s ease; }
        .app-card:hover .app-visit { opacity: 1; transform: translateY(0) scale(1); }
        .app-underline { transition: transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease; }
        .app-card:hover .app-underline { transform: scaleX(1); opacity: 0.85; }

        /* ── World-card demos: each app performs itself on hover ── */

        /* Honestly — the faces take a bow, one by one */
        .hon-face { transition: transform 0.4s cubic-bezier(0.3,1.5,0.4,1); }
        .app-card:hover .hon-face-0 { transform: translateY(-5px); transition-delay: 0.02s; }
        .app-card:hover .hon-face-1 { transform: translateY(-5px); transition-delay: 0.1s; }
        .app-card:hover .hon-face-2 { transform: translateY(-5px); transition-delay: 0.18s; }
        .app-card:hover .hon-face-3 { transform: translateY(-5px); transition-delay: 0.26s; }
        .app-card:hover .hon-face-4 { transform: translateY(-5px); transition-delay: 0.34s; }
        .hon-note { opacity: 0.55; transition: opacity 0.3s ease; }
        .app-card:hover .hon-note { opacity: 1; }

        /* YumeShip — petals drift down through the card */
        @keyframes ys-fall {
          0% { opacity: 0; transform: translateY(0) rotate(0deg); }
          12% { opacity: 0.75; }
          88% { opacity: 0.75; }
          100% { opacity: 0; transform: translateY(74px) rotate(140deg); }
        }
        .app-card:hover .ys-petal-0 { animation: ys-fall 2.6s ease-in-out infinite 0s; }
        .app-card:hover .ys-petal-1 { animation: ys-fall 3.1s ease-in-out infinite 0.6s; }
        .app-card:hover .ys-petal-2 { animation: ys-fall 2.8s ease-in-out infinite 1.2s; }
        .ys-script { opacity: 0.65; transition: opacity 0.3s ease; }
        .app-card:hover .ys-script { opacity: 1; }

        /* Snipsy — cancellation mark appears, stamp number fades in */
        .snip-cancel-mark { opacity: 0; transition: opacity 0.5s ease 0.2s; }
        .app-card:hover .snip-cancel-mark { opacity: 1; }
        .snip-mini-stamp { transition: transform 0.45s cubic-bezier(0.3,1.4,0.4,1); }
        .app-card:hover .snip-mini-stamp { transform: translateY(-3px) rotate(-2deg); }
        .snip-tag { opacity: 0; transform: translateY(4px); transition: opacity 0.3s ease 0.3s, transform 0.4s cubic-bezier(0.3,1.4,0.4,1) 0.3s; }
        .app-card:hover .snip-tag { opacity: 1; transform: translateY(0); }
        .snip-label { opacity: 0.55; transition: opacity 0.3s ease; }
        .app-card:hover .snip-label { opacity: 1; }

        .nav-link { transition: color 0.2s ease; }
        .nav-link:hover { color: ${CREAM} !important; }
        .soft-link { transition: opacity 0.25s ease, color 0.2s ease; }
        .soft-link:hover { opacity: 0.7 !important; }
        .cta-pill { transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease; }
        .cta-pill:hover { box-shadow: 0 14px 30px rgba(212,168,67,0.22); }
        .cta-pill:active { transform: scale(0.985); }
        .prin-row { transition: background 0.3s ease; }
        .prin-row:hover { background: rgba(237,232,223,0.02); }

        .app-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 20px; }
        .gc-7 { grid-column: span 7; } .gc-5 { grid-column: span 5; } .gc-6 { grid-column: span 6; } .gc-12 { grid-column: span 12; }

        @media (max-width: 1023px) {
          .app-grid { grid-template-columns: repeat(2, 1fr); }
          .gc-7, .gc-5, .gc-6, .gc-12 { grid-column: span 1; }
          .gc-feature { grid-column: span 2; }
          .hero-visual { display: none !important; }
          .hero-wrap { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .app-grid { grid-template-columns: 1fr; }
          .gc-7, .gc-5, .gc-6, .gc-12, .gc-feature { grid-column: span 1; }
          .pad-x { padding-left: 28px !important; padding-right: 28px !important; }
          .hero-pad { padding: 0 28px !important; }
          .stat-row { gap: 0 30px !important; }
          .prin-grid { grid-template-columns: 1fr !important; }
          .about-actions { flex-wrap: wrap; }
        }

        @media (prefers-reduced-motion: reduce) {
          .rise, .brf-icon, .brf-track { animation: none !important; opacity: 1 !important; transform: none !important; }
          .js .reveal-scroll { opacity: 1 !important; transform: none !important; transition: none !important; }
          .app-card:hover .ys-petal-0, .app-card:hover .ys-petal-1, .app-card:hover .ys-petal-2 { animation: none; }
        }
      `}</style>

      <div ref={rootRef} style={{ background: INK, color: CREAM, minHeight: '100dvh', fontFamily: BODY, overflowX: 'hidden', position: 'relative' }}>
        <GalleryWall />
        <Spotlight />
        <SEOBox
          title="Ashwin Anbazhagan | iOS App Developer & Founder"
          description="Indie iOS apps for morning journaling, fandom, and photo stamps. Each one solves one specific problem, precisely."
          keywords={['Ashwin Anbazhagan', 'iOS App Developer', 'Indie App Maker', 'SaaS Founder', 'App Developer India']}
        />

        {/* ItemList structured data — lists every app for richer home-page markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'iOS Apps by Ashwin Anbazhagan',
              itemListElement: apps.map((a, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'MobileApplication',
                  name: a.name,
                  applicationCategory: a.seoApplicationCategory,
                  operatingSystem: 'iOS',
                  url: `https://briefly.live/${a.id}`,
                  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                },
              })),
            }),
          }}
        />

        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* ── Nav ── */}
          <nav style={{
            position: 'fixed', inset: '0 0 auto 0', zIndex: 50, height: 64,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 48px', borderBottom: `1px solid ${HAIR}`,
            backdropFilter: 'blur(14px)', background: 'rgba(10,10,12,0.82)',
          }} className="pad-x">
            <a href="#top" className="soft-link" style={{ fontFamily: DISPLAY, fontSize: 16, letterSpacing: '0.02em', fontWeight: 700, color: CREAM, textDecoration: 'none' }}>
              BRIEFLY<span style={{ color: GOLD }}>.</span>
            </a>
            <div style={{ display: 'flex', gap: 34, alignItems: 'center' }}>
              <a href="#works" className="nav-link" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.14em', color: MUTE, textDecoration: 'none' }}>Apps</a>
              <a href="#about" className="nav-link" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.14em', color: MUTE, textDecoration: 'none' }}>About</a>
              <a href="https://twitter.com/shwiinn" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.14em', color: MUTE, textDecoration: 'none' }}>Twitter</a>
            </div>
          </nav>

          {/* ── Hero — asymmetric split: left copy, right real app-icon constellation ── */}
          <section id="top" style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 64 }}>
            <div className="hero-wrap pad-x" style={{ width: '100%', maxWidth: 1400, margin: '0 auto', padding: '0 60px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 40, alignItems: 'center', position: 'relative', zIndex: 2 }}>
              {/* Left column */}
              <div className="hero-pad">
                <div className="rise h0" style={{ display: 'inline-flex', alignItems: 'center', gap: 13, marginBottom: 38 }}>
                  <span style={{ display: 'block', width: 26, height: 1, background: GOLD }} />
                  <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.16em', color: GOLD }}>iOS developer and founder</span>
                </div>

                <h1 style={{ margin: '0 0 32px 0', padding: 0, fontFamily: DISPLAY, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 0.98, fontSize: 'clamp(2.9rem, 5.6vw, 5.4rem)' }}>
                  <span className="rise h1" style={{ display: 'block', color: CREAM }}>Three iOS apps,</span>
                  <span className="rise h2" style={{ display: 'block', color: CREAM }}>each for <span style={{ color: GOLD }}>one real problem.</span></span>
                </h1>

                <p className="rise h3" style={{ fontSize: 16, lineHeight: 1.7, color: MUTE, maxWidth: 460, margin: '0 0 40px 0' }}>
                  Morning journaling, fandom, and photo stamps. Every app does one thing, and does it precisely.
                </p>

                <MagneticLink href="#works" className="rise h4 cta-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: GOLD, color: '#1A1406', fontFamily: MONO, fontSize: 12.5, fontWeight: 500, letterSpacing: '0.04em', padding: '15px 26px', borderRadius: 999, textDecoration: 'none' }}>
                  Browse the apps <ArrowRight size={15} strokeWidth={2} />
                </MagneticLink>
              </div>

              {/* Right column — real app icons, floating at different depths */}
              <div ref={heroIconsRef} className="hero-visual rise h2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 34, justifyItems: 'center', padding: '0 10px' }} aria-hidden>
                {apps.map((app, i) => (
                  <div key={app.id} className="brf-icon" style={{
                    animationDelay: `${(i % 6) * 0.5}s`,
                    transform: i % 2 === 0 ? 'translateY(-16px)' : 'translateY(16px)',
                  }}>
                    <div className="brf-icon-inner">
                      <img
                        src={`/${app.id}.png`}
                        alt=""
                        width={112}
                        height={112}
                        loading="eager"
                        style={{ width: 112, height: 112, borderRadius: 26, objectFit: 'cover', boxShadow: '0 20px 48px rgba(0,0,0,0.5)', border: '1px solid rgba(237,232,223,0.08)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── App-name marquee (the single marquee on the page) ── */}
          <div className="brf-marquee-mask" style={{ overflow: 'hidden', borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}`, padding: '24px 0', background: 'rgba(212,168,67,0.02)' }}>
            <div className="brf-track">
              {[...apps, ...apps].map((app, i) => {
                const w = WORLDS[app.id];
                return (
                  <span key={i} style={{ paddingLeft: 72, whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'baseline', gap: 20 }}>
                    <span style={{ fontFamily: w?.fontDisplay ?? DISPLAY, fontStyle: w?.fontStyle, fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', fontWeight: w?.fontStyle === 'italic' ? 400 : 700, color: CREAM, opacity: 0.2, lineHeight: 1 }}>
                      {app.name}
                    </span>
                    <span style={{ color: GOLD, opacity: 0.35, fontSize: 12 }}>/</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* ── Works — the three worlds ── */}
          <section id="works" style={{ padding: '110px 0 128px', maxWidth: 1400, margin: '0 auto' }}>
            <div className="pad-x reveal-scroll" style={{ padding: '0 60px 60px 60px', maxWidth: 780 }}>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4vw, 3.4rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.02, color: CREAM, margin: '0 0 16px 0' }}>
                Three apps, three worlds.
              </h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.65, color: MUTE, margin: 0, maxWidth: 540 }}>
                Every product gets its own look and voice, built around the person it is for — hover any card and it plays itself. All of them live on iOS, all built solo since 2024.
              </p>
            </div>

            <div className="pad-x app-grid" style={{ padding: '0 60px' }}>
              {LAYOUT.map(({ id, cls }, idx) => (
                <WorldCard key={id} id={id} cls={cls} idx={idx} />
              ))}
            </div>
          </section>

          {/* ── How I build — divided list (distinct layout family) ── */}
          <section style={{ borderTop: `1px solid ${HAIR}`, padding: '104px 0', maxWidth: 1400, margin: '0 auto' }}>
            <div className="pad-x" style={{ padding: '0 60px' }}>
              <h2 className="reveal-scroll" style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4vw, 3.4rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.02, color: CREAM, margin: '0 0 56px 0' }}>
                How I build.
              </h2>

              <div className="prin-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 64 }}>
                {PRINCIPLES.map(([title, body], i) => (
                  <div key={title} className="prin-row reveal-scroll" style={{
                    display: 'grid', gridTemplateColumns: '48px 1fr', alignItems: 'start', gap: 20,
                    padding: '30px 8px', borderTop: `1px solid ${HAIR}`,
                    transitionDelay: `${(i % 2) * 0.08}s`,
                  }}>
                    <span style={{ fontFamily: MONO, fontSize: 13, color: GOLD, opacity: 0.7, paddingTop: 3 }}>{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.2rem, 1.7vw, 1.55rem)', fontWeight: 700, letterSpacing: '-0.01em', color: CREAM, margin: '0 0 10px 0' }}>{title}</h3>
                      <p style={{ fontSize: 14.5, lineHeight: 1.65, color: MUTE, margin: 0, maxWidth: '52ch' }}>{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── About — vertical stack ── */}
          <section id="about" style={{ borderTop: `1px solid ${HAIR}`, padding: '112px 0', maxWidth: 1400, margin: '0 auto' }}>
            <div className="pad-x" style={{ padding: '0 60px', maxWidth: 780 }}>
              <h2 className="reveal-scroll" style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.06, color: CREAM, margin: '0 0 32px 0' }}>
                Every app starts from a gap that should not exist.
              </h2>
              <p className="reveal-scroll" style={{ fontSize: 17, lineHeight: 1.75, color: 'rgba(237,232,223,0.62)', margin: '0 0 40px 0', maxWidth: '62ch' }}>
                I build iOS apps for people who went looking for something specific and came back empty. A morning journal that keeps distracting apps asleep until you've written. A private vault for the fictional characters you love. Photos turned into stamps you'd keep forever. Each one solves a single thing, then stops.
              </p>
              <div className="about-actions reveal-scroll" style={{ display: 'flex', gap: 26 }}>
                <a href="https://twitter.com/shwiinn" target="_blank" rel="noopener noreferrer" className="soft-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: MONO, fontSize: 11.5, letterSpacing: '0.1em', color: GOLD, textDecoration: 'none' }}>
                  Twitter <ArrowUpRight size={13} strokeWidth={2} />
                </a>
                <a href="https://github.com/Ashwinn11" target="_blank" rel="noopener noreferrer" className="soft-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: MONO, fontSize: 11.5, letterSpacing: '0.1em', color: MUTE, textDecoration: 'none' }}>
                  GitHub <ArrowUpRight size={13} strokeWidth={2} />
                </a>
              </div>
            </div>
          </section>

          {/* ── Contact CTA — statement ── */}
          <section style={{ borderTop: `1px solid ${HAIR}`, padding: '116px 0 108px', position: 'relative', overflow: 'hidden', maxWidth: 1400, margin: '0 auto' }}>
            <div aria-hidden style={{ position: 'absolute', top: '42%', left: '38%', transform: 'translate(-50%,-50%)', width: 680, height: 340, background: 'radial-gradient(ellipse, rgba(212,168,67,0.055) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div className="pad-x reveal-scroll" style={{ padding: '0 60px', position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.6rem, 6.5vw, 5.6rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 0.98, color: CREAM, margin: '0 0 28px 0' }}>
                Have a vision?<br />
                <a href="mailto:ashwinnanbazhagan@gmail.com" className="soft-link" style={{ color: GOLD, textDecoration: 'none' }}>Let us build it.</a>
              </h2>
              <p style={{ fontFamily: MONO, fontSize: 12.5, letterSpacing: '0.06em', color: FAINT, margin: 0 }}>
                ashwinnanbazhagan@gmail.com
              </p>
            </div>
          </section>

          {/* ── Footer ── */}
          <footer style={{ borderTop: `1px solid ${HAIR}`, padding: '30px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="pad-x">
            <span style={{ fontFamily: DISPLAY, fontSize: 15, fontWeight: 700 }}>BRIEFLY<span style={{ color: GOLD }}>.</span></span>
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.08em', color: FAINT }}>© 2026 Ashwin Anbazhagan</span>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Home;
