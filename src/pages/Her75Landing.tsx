import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { AppConfig } from '../config/apps';
import { ShaderCanvas } from '../lib/ShaderCanvas';
import { ConfettiBurst } from '../lib/Confetti';
import { swiftSpring, springTransition } from '../lib/springs';
import { useReveal } from '../lib/useInView';
import { useMounted } from '../lib/useMounted';

interface Props {
  app: AppConfig;
  section?: 'privacy' | 'terms' | 'support';
}

/* ────────────────────────────────────────────────────────────────────────────
   HER 75 — the landing page IS the app's design system.
   Every value below is lifted verbatim from the app source:
   Theme.swift, Typography.swift, Motion.swift, HabitColor.swift, Shaders.metal.
   "Soft luxe": warm cream stationery, espresso ink, muted earth accents.
   ──────────────────────────────────────────────────────────────────────────── */

const PAPER  = '#FAF6EF';
const VELLUM = '#FFFDF8';
const INK    = '#2B2420';
const INK2   = 'rgba(43,36,32,0.5)';   // Theme.textSecondary = ink.opacity(0.5)
const CLAY   = '#C4765A';
const CLAY_D = '#AD5F43';
const MIST   = '#94A8B1';
const OLIVE  = '#6E7B54';
const MAUVE  = '#A98290';
const SAND   = '#B69B7C';
const CHIP   = '#F1EAE0';
const RING   = '#E7DFD2';
const TICKET = '#F6F0E4';

const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS  = "'Hanken Grotesk', -apple-system, sans-serif";

/* The app's one motion vocabulary (Motion.swift), solved as real springs. */
const SNAPPY = swiftSpring(0.32, 0.86);
const BOUNCY = swiftSpring(0.42, 0.68);
const GENTLE = swiftSpring(0.55, 0.9);
const POP    = swiftSpring(0.35, 0.6);

/* HabitColor.swift — the five sticky-tile gradients (top → bottom). */
const STICKY: [string, string][] = [
  ['#DCA48E', '#C4765A'], // clay
  ['#C0CDD3', '#94A8B1'], // mist
  ['#B4BE9C', '#8D9A70'], // olive
  ['#C9ABB5', '#A98290'], // mauve
  ['#D0BA9E', '#B69B7C'], // sand
];
const stickyGrad = (i: number) => {
  const [a, b] = STICKY[((i % 5) + 5) % 5];
  return `linear-gradient(to bottom, ${a}, ${b})`;
};

/* Models.swift `ChallengeTrack` — deterministic djb2 seed for strip palettes. */
const trackSeed = (id: string) => {
  let h = 5381;
  for (let i = 0; i < id.length; i++) h = (Math.imul(h, 33) + id.charCodeAt(i)) >>> 0;
  return h;
};

/* ── The challenge catalog, verbatim from Models.swift ─────────────────────── */

interface Track {
  id: string;
  title: string;
  blurb: string;
  tagline: string;
  days: number;
  restartOnMiss: boolean;
  habits: string[];
}

const TRACKS: Track[] = [
  { id: 'her75', title: 'Her 75 Challenge', blurb: 'Made for women, by women', tagline: 'our signature', days: 75, restartOnMiss: false,
    habits: ['Eat clean (no junk food and no alcohol)', 'Drink only water', 'Walk 10,000 steps a day', 'One 45-minute workout per day', 'Read 10 pages or a podcast (5+ min)', 'Progress photo'] },
  { id: 'hard', title: '75 Day Hard', blurb: 'The original, no compromises', tagline: 'the original', days: 75, restartOnMiss: true,
    habits: ['Two 45-minute workouts (one outdoors)', 'Drink 1 gallon of water', 'Read 10 pages of non-fiction', 'Follow a strict diet — no cheat meals', 'No alcohol', 'Progress photo'] },
  { id: 'medium', title: '75 Medium', blurb: 'Disciplined, but realistic', tagline: 'firm but fair', days: 75, restartOnMiss: false,
    habits: ['One 45-minute workout', 'Drink 3L of water', 'Read 10 pages', 'Eat clean (1 exception a week)', 'No alcohol', 'Progress photo'] },
  { id: 'soft', title: '75 Soft', blurb: 'A gentle reset', tagline: 'a gentle start', days: 75, restartOnMiss: false,
    habits: ['Eat clean (2 exceptions a week)', 'Drink water', 'Walk 10,000 steps a day', 'Listen to a podcast (5+ min)', 'Progress photo'] },
  { id: 'betterMe', title: 'Better Me', blurb: 'Habits that actually stick', tagline: 'small habits, kept', days: 75, restartOnMiss: false,
    habits: ['Move your body 20 min', 'Drink water', 'Read or learn 10 min', 'One mindful meal', 'Progress photo'] },
  { id: 'glowUp', title: 'Glow Up', blurb: 'Look and feel your best', tagline: '30 days of glow', days: 30, restartOnMiss: false,
    habits: ['Skincare AM & PM', 'Drink water', 'Walk 10,000 steps', 'Sleep 8 hours', 'Eat whole foods', 'Progress photo'] },
  { id: 'sugarFree', title: 'Sugar Free', blurb: 'Kick the sugar habit', tagline: 'the sweet reset', days: 30, restartOnMiss: false,
    habits: ['Fruit is okay (whole, in moderation)', 'Drink water', 'No added sugar (check labels)', 'No sweets (cookies, chocolate, pastries)', 'No sugary drinks (soda, juices)', 'No alcohol'] },
  { id: 'mentalWellness', title: 'Mental Wellness', blurb: 'Calm, clear, grounded', tagline: 'quiet the noise', days: 30, restartOnMiss: false,
    habits: ['Write 1 happy, 1 to improve, 1 proud of', 'Take a walk', 'Read 10 pages or a podcast', 'Meditate or breathe (5–10 min)', 'Limit social media & screens'] },
  { id: 'hotter', title: '75 Hotter Challenge', blurb: 'Disciplined, all the way up', tagline: 'all the way up', days: 75, restartOnMiss: true,
    habits: ['Two workouts a day', 'Drink 1 gallon of water', 'Eat high-protein & clean', 'Walk 10,000 steps', 'No alcohol', 'Progress photo'] },
  { id: 'squat30', title: '30 Squat Challenge', blurb: '30 days, stronger legs', tagline: 'quick + fierce', days: 30, restartOnMiss: false,
    habits: ['4 squats', '20 pulses', '7 squats', '4 squats (second set)', '20 pulses (second set)'] },
];

/* ── AppBackground: the app's breathing mesh + paper grain, in GLSL ──────────
   Ports Theme.swift's `AppBackground` (3×3 MeshGradient, drift = sin(t/10)·0.16,
   warmth 0.05 ± 0.06) and Shaders.metal's `grain` (hash21(floor(p)) · 0.045). */

const MESH_FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_paper;
uniform vec3 u_tint;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;

  float t = u_time / 10.0;
  float drift = sin(t) * 0.16;
  float warmth = 0.05 + drift * 0.06;

  // Breathing center patch (the mesh's moving middle control point).
  vec2 center = vec2(0.5 + drift * 0.5, 0.5 - drift * 0.4);
  vec2 ac = vec2(uv.x * aspect, uv.y);
  float d = distance(ac, vec2(center.x * aspect, center.y));
  float breath = smoothstep(0.85, 0.0, d) * warmth;

  // Corner tints (0.035, like the mesh's corner colors).
  float c1 = smoothstep(1.0, 0.0, distance(ac, vec2(0.0, 1.0))) * 0.035;
  float c2 = smoothstep(1.0, 0.0, distance(ac, vec2(aspect, 0.0))) * 0.035;

  vec3 col = mix(u_paper, u_tint, clamp(breath + c1 + c2, 0.0, 0.25));

  // grain — static paper grain (0.045), per physical pixel.
  col += (hash21(floor(gl_FragCoord.xy)) - 0.5) * 0.045;

  gl_FragColor = vec4(col, 1.0);
}
`;

const hexToRgb = (hex: string): [number, number, number] => [
  parseInt(hex.slice(1, 3), 16) / 255,
  parseInt(hex.slice(3, 5), 16) / 255,
  parseInt(hex.slice(5, 7), 16) / 255,
];

const AppBackground: React.FC = () => (
  <div
    aria-hidden
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      background: `
        radial-gradient(90% 70% at 50% 46%, rgba(182,155,124,0.055), transparent 70%),
        radial-gradient(50% 50% at 0% 100%, rgba(182,155,124,0.035), transparent 75%),
        radial-gradient(50% 50% at 100% 0%, rgba(182,155,124,0.035), transparent 75%),
        ${PAPER}`,
    }}
  >
    <ShaderCanvas frag={MESH_FRAG} uniforms={{ u_paper: hexToRgb(PAPER), u_tint: hexToRgb(SAND) }} fps={30} />
  </div>
);

/* ── Shared page styles ────────────────────────────────────────────────────── */

const css = `
  .her-page * { box-sizing: border-box; }
  @keyframes her-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
  .her-rise { opacity: 0; animation: her-rise 0.85s cubic-bezier(0.22,1,0.36,1) forwards; }
  .hd1 { animation-delay: 0.08s; } .hd2 { animation-delay: 0.18s; } .hd3 { animation-delay: 0.30s; } .hd4 { animation-delay: 0.42s; }
  @keyframes her-row-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes her-foil {
    0% { transform: translateX(-70%); opacity: 0; }
    12% { opacity: 1; }
    88% { opacity: 1; }
    100% { transform: translateX(70%); opacity: 0; }
  }
  @keyframes her-shimmer {
    0% { transform: translateX(-120%) skewX(-18deg); }
    100% { transform: translateX(240%) skewX(-18deg); }
  }
  .her-cta { transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease; }
  .her-cta:hover { transform: translateY(-2px); box-shadow: 0 16px 32px rgba(173,95,67,0.30); }
  .her-cta:active { transform: translateY(0) scale(0.98); }
  .her-faq summary::-webkit-details-marker { display: none; }
  .her-track { cursor: pointer; -webkit-tap-highlight-color: transparent; }
  .her-track:hover .her-track-strip { transform: translateY(-3px); }
  .her-ticket-sheen { position: absolute; inset: 0; overflow: hidden; border-radius: 26px; pointer-events: none; }
  .her-ticket-sheen::after {
    content: ''; position: absolute; top: -30%; bottom: -30%; left: 20%; width: 45%;
    background: linear-gradient(105deg, transparent 8%, rgba(196,118,90,0.13) 32%, rgba(169,130,144,0.15) 50%, rgba(148,168,177,0.13) 68%, transparent 92%);
    transform: translateX(-260%) skewX(-14deg); transition: none; opacity: 0;
  }
  .her-ticket:hover .her-ticket-sheen::after { animation: her-shimmer 1.15s cubic-bezier(0.4,0,0.2,1) forwards; opacity: 1; }
  .her-rail { scroll-snap-type: x proximity; }
  .her-rail > * { scroll-snap-align: center; }
  @media (max-width: 900px) {
    .her-hero-grid { grid-template-columns: 1fr !important; text-align: center; }
    .her-hero-copy { align-items: center !important; }
    .her-phone-wrap { margin: 26px auto 0 !important; }
    .her-feat-grid { grid-template-columns: 1fr 1fr !important; }
    .her-tracks-grid { grid-template-columns: 1fr !important; }
    .her-invite-grid { grid-template-columns: 1fr !important; }
    .her-pad { padding-left: 24px !important; padding-right: 24px !important; }
    .her-compare-grid { grid-template-columns: 1fr !important; gap: 26px !important; }
  }
  @media (max-width: 560px) {
    .her-feat-grid { grid-template-columns: 1fr !important; }
  }
  @media (prefers-reduced-motion: reduce) {
    .her-rise { animation: none; opacity: 1; }
    .her-ticket:hover .her-ticket-sheen::after { animation: none; }
  }
`;

/* ── Small pieces ──────────────────────────────────────────────────────────── */

const Eyebrow: React.FC<{ children: React.ReactNode; color?: string; center?: boolean }> = ({ children, color = CLAY, center }) => (
  <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: 2.6, textTransform: 'uppercase', color, textAlign: center ? 'center' : undefined }}>
    {children}
  </div>
);

const DownloadBtn: React.FC<{ url: string; label?: string }> = ({ url, label = 'Download on the App Store' }) => (
  <a
    className="her-cta"
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      background: `linear-gradient(135deg, ${CLAY}, ${CLAY_D})`, color: '#fff',
      fontFamily: SANS, fontWeight: 700, fontSize: 15, padding: '16px 30px',
      borderRadius: 30, textDecoration: 'none', boxShadow: '0 10px 24px rgba(173,95,67,0.22)',
    }}
  >
    {label}
  </a>
);

/* The frosted floating badge (UIComponents.FloatingPill). */
const FloatingPill: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '5px 10px', borderRadius: 999,
      background: 'rgba(255,255,255,0.68)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
      boxShadow: '0 3px 7px rgba(0,0,0,0.12)',
      fontFamily: SANS, fontSize: 11, fontWeight: 700, color: INK, whiteSpace: 'nowrap',
      ...style,
    }}
  >
    {children}
  </div>
);

/* CheckCircle — ink fill pops in, the checkmark draws itself on (TodayView). */
const CheckCircle: React.FC<{ done: boolean; size?: number }> = ({ done, size = 26 }) => (
  <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
    <div
      style={{
        position: 'absolute', inset: 0, borderRadius: '50%', background: INK,
        transform: done ? 'scale(1)' : 'scale(0.4)', opacity: done ? 1 : 0,
        transition: springTransition(POP, 'transform', 'opacity'),
      }}
    />
    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `2px solid ${done ? INK : RING}`, transition: 'border-color 0.25s ease' }} />
    <svg viewBox="0 0 12 10" style={{ position: 'absolute', left: '50%', top: '50%', width: size * 0.46, height: size * 0.38, transform: 'translate(-50%, -50%)', overflow: 'visible' }}>
      <path
        d="M0.5 5.5 L4.3 9.5 L11.5 0.8"
        fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={done ? 0 : 1}
        style={{ transition: done ? 'stroke-dashoffset 0.4s cubic-bezier(0.3,0.9,0.4,1) 0.1s' : 'none' }}
      />
    </svg>
  </div>
);

/* One habit row in the phone demo — photo tile · name (strikethrough) · check. */
const DemoHabitRow: React.FC<{ title: string; index: number; done: boolean; onToggle: () => void; }> = ({ title, index, done, onToggle }) => {
  const TIMES = ['7:12 AM', '8:03 AM', '12:26 PM', '5:41 PM', '8:58 PM', '9:32 PM'];
  return (
    <button
      onClick={onToggle}
      aria-pressed={done}
      style={{
        display: 'flex', alignItems: 'center', gap: 10, width: '100%',
        background: 'none', border: 'none', padding: '7px 0', cursor: 'pointer', textAlign: 'left',
        animation: `her-row-in 0.45s cubic-bezier(0.22,1,0.36,1) ${index * 0.05}s both`,
      }}
    >
      {/* Proof-photo tile: camera placeholder → the "photo" pops in on completion. */}
      <div style={{ position: 'relative', width: 42, height: 54, borderRadius: 11, overflow: 'hidden', background: CHIP, flexShrink: 0 }}>
        <svg viewBox="0 0 24 24" width={16} height={16} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', opacity: 0.25 }} fill={INK}>
          <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zM9 2 7.17 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3.17L15 2H9z" />
        </svg>
        <div
          style={{
            position: 'absolute', inset: 0, background: stickyGrad(index),
            transform: done ? 'scale(1)' : 'scale(0.6)', opacity: done ? 1 : 0,
            transition: springTransition(BOUNCY, 'transform', 'opacity'),
          }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            position: 'relative', display: 'inline', fontFamily: SANS, fontSize: 11.5, fontWeight: 700, lineHeight: 1.3,
            color: done ? 'rgba(43,36,32,0.4)' : INK, transition: 'color 0.3s ease',
          }}
        >
          {title}
          <span
            aria-hidden
            style={{
              position: 'absolute', left: -1, right: -1, top: '54%', height: 1.4,
              background: 'rgba(43,36,32,0.5)', transform: `scaleX(${done ? 1 : 0})`,
              transformOrigin: 'left center', transition: springTransition(SNAPPY, 'transform'),
            }}
          />
        </div>
        <div style={{ fontFamily: SANS, fontSize: 9, fontWeight: 600, color: 'rgba(43,36,32,0.4)', height: 12, marginTop: 1, opacity: done ? 1 : 0, transition: 'opacity 0.3s ease 0.15s' }}>
          {TIMES[index % TIMES.length]}
        </div>
      </div>
      <CheckCircle done={done} size={24} />
    </button>
  );
};

/* Day sticker card — the editorial "day N" receipt (UIComponents.DayStickerCard). */
const DayStickerCard: React.FC<{ tasks: string[]; challengeTitle: string; range: string; placed: boolean }> = ({ tasks, challengeTitle, range, placed }) => (
  <div
    style={{
      position: 'relative', background: '#fff', borderRadius: 22, padding: 18, overflow: 'hidden',
      boxShadow: '0 22px 44px rgba(0,0,0,0.14)',
      transform: placed ? 'scale(1) rotate(0deg)' : 'scale(1.12) rotate(3deg)',
      opacity: placed ? 1 : 0,
      transition: springTransition(BOUNCY, 'transform') + ', opacity 0.25s ease',
    }}
  >
    <div style={{ fontFamily: SERIF, fontSize: 22, color: INK, lineHeight: 1 }}>
      <span style={{ fontStyle: 'italic', fontWeight: 500 }}>day</span>
      <span style={{ fontWeight: 600 }}> one</span>
    </div>
    <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, color: INK2, marginTop: 6 }}>{range}</div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 10 }}>
      {tasks.map((t, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
          <svg viewBox="0 0 12 10" width={10} height={9} style={{ marginTop: 2, flexShrink: 0 }}>
            <path d="M0.5 5.5 L4.3 9.5 L11.5 0.8" fill="none" stroke={INK} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 600, color: INK, lineHeight: 1.35 }}>{t}</span>
        </div>
      ))}
    </div>
    <div style={{ borderTop: `1px solid ${RING}`, marginTop: 12, paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ fontFamily: SANS, fontSize: 7.5, fontWeight: 700, letterSpacing: 1, color: 'rgba(43,36,32,0.35)' }}>{challengeTitle.toUpperCase()}</span>
      <span style={{ fontFamily: SANS, fontSize: 7.5, fontWeight: 700, letterSpacing: 1, color: 'rgba(43,36,32,0.35)' }}>BY 75 HER</span>
    </div>
    {/* foilSweepOnce — the laminated-sticker sheen (Shaders.metal `foilSweep`). */}
    {placed && (
      <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 22, pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute', top: '-30%', bottom: '-30%', left: '18%', width: '50%',
            background: 'linear-gradient(105deg, transparent 8%, rgba(196,118,90,0.16) 32%, rgba(169,130,144,0.18) 50%, rgba(148,168,177,0.16) 68%, transparent 92%)',
            animation: 'her-shimmer 1.2s cubic-bezier(0.4,0,0.2,1) 0.45s both',
          }}
        />
      </div>
    )}
  </div>
);

/* The interactive phone — a working recreation of the app's Today screen. */
const PhoneDemo: React.FC<{ onAllDone: () => void }> = ({ onAllDone }) => {
  const track = TRACKS[0]; // Her 75 Challenge
  const [done, setDone] = useState<boolean[]>(() => track.habits.map(() => false));
  const [celebrating, setCelebrating] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [range, setRange] = useState('day 1 of 75');
  const allDone = done.every(Boolean);
  const doneCount = done.filter(Boolean).length;
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    if (!allDone || celebrating) return;
    timers.current.push(
      window.setTimeout(() => {
        // Live date range like challengeRangeText() — computed post-interaction only.
        const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toLowerCase();
        const start = new Date();
        const end = new Date(start.getTime() + (track.days - 1) * 86400000);
        setRange(`${fmt(start)} → ${fmt(end)}`);
        setCelebrating(true);
        onAllDone();
      }, 500)
    );
    timers.current.push(window.setTimeout(() => setPlaced(true), 620));
  }, [allDone, celebrating, onAllDone, track.days]);

  const reset = () => { setDone(track.habits.map(() => false)); setCelebrating(false); setPlaced(false); };

  return (
    <div
      className="her-phone-wrap"
      style={{ position: 'relative', width: 292, flexShrink: 0 }}
    >
      <div aria-hidden style={{ position: 'absolute', inset: -34, background: 'radial-gradient(circle at 50% 42%, rgba(196,118,90,0.16), transparent 70%)', filter: 'blur(10px)' }} />
      {/* Frame */}
      <div style={{ position: 'relative', borderRadius: 46, padding: 10, background: INK, boxShadow: '0 42px 84px rgba(43,36,32,0.24)' }}>
        <div style={{ position: 'relative', borderRadius: 37, background: PAPER, overflow: 'hidden', padding: '18px 16px 16px' }}>
          {/* Header — avatar · day pill · edit (TabHeader) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: `linear-gradient(135deg, ${CLAY}, ${CLAY_D})`, border: '2px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: SERIF, fontSize: 17, fontWeight: 600 }}>
              a
            </div>
            <FloatingPill>day 1 of {track.days}</FloatingPill>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke={INK} strokeWidth={2.2} strokeLinecap="round">
                <path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
            </div>
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 600, color: INK, lineHeight: 1.06, margin: '8px 0 2px' }}>
            Today's<br /><span style={{ color: CLAY }}>missions</span>
          </div>
          <div style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 600, color: INK2, marginBottom: 6 }}>
            {doneCount} of {track.habits.length} complete
          </div>
          {/* Thin progress bar */}
          <div style={{ height: 3, borderRadius: 2, background: CHIP, overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ height: '100%', borderRadius: 2, background: CLAY, width: `${(doneCount / track.habits.length) * 100}%`, transition: springTransition(GENTLE, 'width') }} />
          </div>
          {/* Habit rows */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {track.habits.map((h, i) => (
              <React.Fragment key={i}>
                <DemoHabitRow title={h} index={i} done={done[i]} onToggle={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))} />
                {i < track.habits.length - 1 && <div style={{ height: 1, background: RING, marginLeft: 52 }} />}
              </React.Fragment>
            ))}
          </div>

          {/* Day-complete celebration: scrim + sticker slap (DayCelebration) */}
          <div
            style={{
              position: 'absolute', inset: 0, zIndex: 3,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: 18, background: 'rgba(250,246,239,0.72)',
              backdropFilter: 'blur(9px)', WebkitBackdropFilter: 'blur(9px)',
              opacity: celebrating ? 1 : 0, pointerEvents: celebrating ? 'auto' : 'none',
              transition: 'opacity 0.45s ease',
            }}
          >
            <DayStickerCard tasks={track.habits} challengeTitle={track.title} range={range} placed={placed} />
            <button
              onClick={reset}
              style={{
                marginTop: 14, fontFamily: SANS, fontSize: 12, fontWeight: 700, color: '#fff',
                background: OLIVE, border: 'none', borderRadius: 30, padding: '10px 22px', cursor: 'pointer',
                boxShadow: '0 5px 12px rgba(110,123,84,0.3)',
              }}
            >
              Start tomorrow
            </button>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', fontFamily: SANS, fontSize: 12, fontWeight: 600, color: INK2, marginTop: 14 }}>
        Go on — check one off.
      </div>
    </div>
  );
};

/* Challenge photo-strip card (UIComponents.ChallengeStripCard, gradient fallback). */
const TrackCard: React.FC<{ track: Track; selected: boolean; onSelect: () => void }> = ({ track, selected, onSelect }) => {
  const seed = trackSeed(track.id);
  return (
    <button
      className="her-track"
      onClick={onSelect}
      aria-pressed={selected}
      style={{
        background: 'none', border: 'none', padding: 0, width: 212, flexShrink: 0, textAlign: 'left',
        opacity: 1, outlineOffset: 4,
      }}
    >
      <div
        className="her-track-strip"
        style={{
          position: 'relative',
          transition: springTransition(GENTLE, 'transform', 'box-shadow'),
          borderRadius: 18,
          boxShadow: selected ? `0 0 0 2px ${PAPER}, 0 0 0 4px ${INK}` : '0 0 0 0 transparent',
        }}
      >
        <div style={{ display: 'flex', gap: 3, borderRadius: 18, overflow: 'hidden', aspectRatio: '3 / 1' }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ flex: 1, background: stickyGrad(seed + i) }} />
          ))}
        </div>
        {track.tagline && (
          <FloatingPill style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)' }}>
            {track.tagline}
          </FloatingPill>
        )}
      </div>
      <div style={{ fontFamily: SERIF, fontSize: 21, fontWeight: 600, color: INK, marginTop: 10, lineHeight: 1.1 }}>{track.title}</div>
      <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 500, color: INK2, marginTop: 3 }}>{track.blurb}</div>
      <div style={{ display: 'flex', gap: 6, marginTop: 9, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 700, color: INK, background: CHIP, borderRadius: 999, padding: '4px 10px' }}>
          {track.days} days
        </span>
        <span style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 700, color: track.restartOnMiss ? CLAY_D : OLIVE, background: track.restartOnMiss ? 'rgba(173,95,67,0.10)' : 'rgba(110,123,84,0.12)', borderRadius: 999, padding: '4px 10px' }}>
          {track.restartOnMiss ? 'miss = restart' : 'streak protection'}
        </span>
      </div>
    </button>
  );
};

/* Numbered sticky-tile row (UIComponents.TaskListEditor). */
const StickyTaskRow: React.FC<{ index: number; title: string; animateKey: string }> = ({ index, title, animateKey }) => (
  <div
    key={animateKey}
    style={{
      display: 'flex', alignItems: 'center', gap: 15, padding: '9px 0',
      animation: `her-row-in 0.45s cubic-bezier(0.22,1,0.36,1) ${index * 0.06}s both`,
    }}
  >
    <div
      style={{
        position: 'relative', width: 46, height: 46, borderRadius: 8, flexShrink: 0,
        background: stickyGrad(index), boxShadow: '0 4px 5px rgba(0,0,0,0.22)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <span style={{ fontFamily: SERIF, fontSize: 22, fontStyle: 'italic', fontWeight: 500, color: 'rgba(43,36,32,0.8)' }}>{index + 1}</span>
    </div>
    <span style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: INK, lineHeight: 1.35 }}>{title}</span>
  </div>
);

/* Letterpress invite ticket (UIComponents.InviteTicket). */
const InviteTicket: React.FC = () => (
  <div
    className="her-ticket"
    style={{
      position: 'relative', maxWidth: 400, width: '100%', margin: '0 auto',
      background: TICKET, borderRadius: 26,
      boxShadow: '0 20px 40px rgba(0,0,0,0.09)',
      border: '1px solid rgba(43,36,32,0.14)',
    }}
  >
    <div aria-hidden style={{ position: 'absolute', inset: 7, borderRadius: 20, border: '1px solid rgba(43,36,32,0.10)', pointerEvents: 'none' }} />
    <div className="her-ticket-sheen" aria-hidden />
    <div style={{ padding: '44px 28px 30px', textAlign: 'center' }}>
      <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, letterSpacing: 5, color: 'rgba(43,36,32,0.4)' }}>75 HER</div>
      <div style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 600, color: INK, lineHeight: 1.18, marginTop: 12 }}>
        Join <span style={{ fontStyle: 'italic' }}>Maya</span>
        <br />
        for the challenge
      </div>
    </div>
    <div style={{ borderTop: '1.2px dashed rgba(43,36,32,0.18)', margin: '0 34px' }} />
    <div style={{ padding: '26px 28px 44px', textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: SANS, fontSize: 32, fontWeight: 800, letterSpacing: 4, color: INK }}>2547 8861</span>
        <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(43,36,32,0.08)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke={INK} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" opacity={0.55}>
            <path d="M12 15V3m0 0L7 8m5-5 5 5" /><path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
          </svg>
        </span>
      </div>
      <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 500, color: 'rgba(43,36,32,0.4)', marginTop: 8 }}>
        Share this code with your circle
      </div>
    </div>
  </div>
);

/* ── Legal page (privacy / terms / support) ────────────────────────────────── */

const LegalPage: React.FC<{ app: AppConfig; section: 'privacy' | 'terms' | 'support' }> = ({ app, section }) => {
  const content = section === 'privacy' ? app.legal.privacyPolicy : section === 'terms' ? app.legal.termsOfService : app.legal.support;
  const titles = { privacy: 'Privacy Policy', terms: 'Terms of Service', support: 'Support' };
  return (
    <div className="her-page" style={{ minHeight: '100vh', backgroundColor: PAPER, fontFamily: SANS, color: INK }}>
      <style>{css}</style>
      <nav style={{ borderBottom: `1px solid ${RING}`, padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/her75" style={{ display: 'flex', alignItems: 'center', gap: 6, color: INK2, textDecoration: 'none', fontSize: 13 }}>
          ← back to Her 75
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
                  <p key={j} style={{ margin: '0 0 4px', fontWeight: heading && j === 0 ? 700 : 400, fontSize: heading && j === 0 ? 16 : 15, color: heading && j === 0 ? INK : INK2 }}>{line}</p>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ── The landing page ──────────────────────────────────────────────────────── */

const Her75Landing: React.FC<Props> = ({ app, section }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [confetti, setConfetti] = useState(0);
  const mounted = useMounted();
  const heroRef = useRef<HTMLElement | null>(null);

  const [compareRef, compareStyle] = useReveal<HTMLDivElement>();
  const [tracksHeadRef, tracksHeadStyle] = useReveal<HTMLDivElement>();
  const [featsHeadRef, featsHeadStyle] = useReveal<HTMLDivElement>();
  const [storyRef, storyStyle] = useReveal<HTMLDivElement>();
  const [inviteRef, inviteStyle] = useReveal<HTMLDivElement>({ y: 34 });
  const [faqHeadRef, faqHeadStyle] = useReveal<HTMLDivElement>();
  const [finalCtaRef, finalCtaStyle] = useReveal<HTMLDivElement>({ y: 30 });

  const track = TRACKS[selectedTrack];

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: app.name,
      operatingSystem: 'iOS', applicationCategory: 'HealthApplication',
      description: app.seo.description, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      ...(app.aggregateRating ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: app.aggregateRating.ratingValue, ratingCount: app.aggregateRating.ratingCount } } : {}),
    }),
    [app]
  );

  if (section) return <LegalPage app={app} section={section} />;

  const m = app.marketing;
  const dl = app.downloadUrl || app.appStoreUrl || '#';

  return (
    <div className="her-page" style={{ position: 'relative', color: INK, fontFamily: SANS, minHeight: '100vh', overflowX: 'hidden', background: PAPER }}>
      <style>{css}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AppBackground />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Nav — All Apps · wordmark · CTA, like every other landing */}
        <nav className="her-pad" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '20px 40px', maxWidth: 1180, margin: '0 auto', gap: 12 }}>
          <Link to="/" style={{ justifySelf: 'start', display: 'inline-flex', alignItems: 'center', gap: 6, color: INK2, textDecoration: 'none', fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            All Apps
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/her75.png" alt="Her 75" style={{ width: 34, height: 34, borderRadius: 9 }} />
            <span style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 600 }}>Her <span style={{ color: CLAY }}>75</span></span>
          </div>
          <a
            href={dl} target="_blank" rel="noopener noreferrer"
            style={{ justifySelf: 'end', fontFamily: SANS, fontWeight: 700, fontSize: 14, color: INK, textDecoration: 'none', background: CHIP, padding: '10px 20px', borderRadius: 24 }}
          >
            Get the app
          </a>
        </nav>

        {/* Hero — copy + the working Today demo */}
        <section ref={heroRef} className="her-pad" style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', padding: '44px 40px 96px' }}>
          <div className="her-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 48, alignItems: 'center' }}>
            <div className="her-hero-copy" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div className="her-rise hd1" style={{ marginBottom: 18 }}><Eyebrow>75-day challenge · made for women</Eyebrow></div>
              <h1 className="her-rise hd2" style={{ fontFamily: SERIF, fontSize: 'clamp(3.2rem, 6vw, 5.3rem)', fontWeight: 600, lineHeight: 0.98, letterSpacing: '-0.01em', margin: 0 }}>
                Become <span style={{ color: CLAY }}>her</span>
                <br />in 75 days.
              </h1>
              <p className="her-rise hd3" style={{ fontSize: 18, lineHeight: 1.6, color: INK2, maxWidth: 460, margin: '22px 0 30px', fontWeight: 400 }}>
                {m.subheadline}
              </p>
              <div className="her-rise hd4" style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
                <DownloadBtn url={dl} />
                <span style={{ fontSize: 13, color: INK2 }}>Free to download · Choose your hard</span>
              </div>
            </div>
            <div className="her-rise hd3" style={{ justifySelf: 'center' }}>
              <PhoneDemo onAllDone={() => setConfetti((c) => c + 1)} />
            </div>
          </div>
          {/* Confetti poppers fire over the whole hero when the demo day completes. */}
          {mounted && <ConfettiBurst trigger={confetti} palette={[CLAY, MIST, OLIVE, MAUVE, SAND]} style={{ zIndex: 5 }} />}
        </section>

        {/* Comparison strip */}
        {app.comparisonHighlights && (
          <section style={{ backgroundColor: VELLUM, borderTop: `1px solid ${RING}`, borderBottom: `1px solid ${RING}` }}>
            <div ref={compareRef} className="her-pad her-compare-grid" style={{ maxWidth: 1000, margin: '0 auto', padding: '54px 40px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, ...compareStyle }}>
              {app.comparisonHighlights.map((c, i) => (
                <div key={i}>
                  <p style={{ fontSize: 14, color: INK2, textDecoration: 'line-through', textDecorationColor: 'rgba(43,36,32,0.3)', margin: '0 0 8px' }}>{c.them}</p>
                  <p style={{ fontFamily: SERIF, fontSize: 21, fontWeight: 600, color: INK, margin: 0, lineHeight: 1.25 }}>{c.us}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Choose your hard — the real catalog drives a live task list */}
        <section className="her-pad" style={{ maxWidth: 1180, margin: '0 auto', padding: '96px 40px 40px' }}>
          <div ref={tracksHeadRef} style={{ textAlign: 'center', marginBottom: 46, ...tracksHeadStyle }}>
            <Eyebrow color={SAND} center>Ten tracks + your own</Eyebrow>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 600, margin: '12px 0 0', lineHeight: 1.05 }}>
              Choose your <span style={{ color: CLAY }}>hard</span>.
            </h2>
            <p style={{ fontSize: 15.5, color: INK2, maxWidth: 520, margin: '14px auto 0', lineHeight: 1.6 }}>
              The same challenge engine, tuned ten ways — from the original 75 Hard to a 30-day glow up. Tap one to see its daily missions.
            </p>
          </div>

          <div className="her-rail hide-scrollbar" style={{ display: 'flex', gap: 26, overflowX: 'auto', padding: '18px 6px 26px', margin: '0 -6px' }}>
            {TRACKS.map((t, i) => (
              <TrackCard key={t.id} track={t} selected={i === selectedTrack} onSelect={() => setSelectedTrack(i)} />
            ))}
            {/* Custom track — offered separately in the app, dashed here. */}
            <div style={{ width: 212, flexShrink: 0 }}>
              <div style={{ borderRadius: 18, aspectRatio: '3 / 1', border: `1.6px dashed ${SAND}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SERIF, fontSize: 30, color: SAND }}>+</div>
              <div style={{ fontFamily: SERIF, fontSize: 21, fontWeight: 600, color: INK, marginTop: 10 }}>Custom Challenge</div>
              <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 500, color: INK2, marginTop: 3 }}>Build your own from scratch</div>
            </div>
          </div>

          {/* Selected track's daily missions — TaskListEditor's numbered stickies */}
          <div className="her-tracks-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 44, alignItems: 'start', maxWidth: 940, margin: '26px auto 0' }}>
            <div>
              <div style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 600, lineHeight: 1.1 }}>
                {track.title}
              </div>
              <p style={{ fontSize: 15, color: INK2, lineHeight: 1.65, margin: '12px 0 0', maxWidth: 380 }}>
                {track.blurb}. {track.restartOnMiss
                  ? 'This one is strict — miss a day and the challenge restarts from day one.'
                  : 'Streak protection and missed-day recovery keep one off day from sending you back to zero.'}
              </p>
              <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
                <span style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: '#fff', background: INK, borderRadius: 999, padding: '8px 16px' }}>{track.days} days</span>
                <span style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: INK, background: CHIP, borderRadius: 999, padding: '8px 16px' }}>{track.habits.length} daily missions</span>
              </div>
            </div>
            <div style={{ background: VELLUM, border: `1px solid ${RING}`, borderRadius: 26, padding: '20px 26px' }}>
              {track.habits.map((h, i) => (
                <React.Fragment key={`${track.id}-${i}`}>
                  <StickyTaskRow index={i} title={h} animateKey={`${track.id}-${i}`} />
                  {i < track.habits.length - 1 && <div style={{ height: 1, background: RING, marginLeft: 61 }} />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="her-pad" style={{ maxWidth: 1100, margin: '0 auto', padding: '96px 40px' }}>
          <div ref={featsHeadRef} style={{ textAlign: 'center', marginBottom: 52, ...featsHeadStyle }}>
            <Eyebrow color={MAUVE} center>Everything to finish</Eyebrow>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 600, margin: '12px 0 0', lineHeight: 1.05 }}>
              Discipline that actually sticks.
            </h2>
          </div>
          <div className="her-feat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {m.benefits.map((b, i) => (
              <FeatureCard key={i} index={i} title={b.title} description={b.description} />
            ))}
          </div>
        </section>

        {/* Why / story */}
        <section style={{ backgroundColor: INK, color: PAPER }}>
          <div ref={storyRef} className="her-pad" style={{ maxWidth: 760, margin: '0 auto', padding: '96px 40px', textAlign: 'center', ...storyStyle }}>
            <Eyebrow color={SAND} center>Why Her 75</Eyebrow>
            <p style={{ fontFamily: SERIF, fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', fontWeight: 500, lineHeight: 1.35, margin: '20px 0 0' }}>{m.problem}</p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(250,246,239,0.72)', margin: '24px 0 0' }}>{m.solution}</p>
          </div>
        </section>

        {/* Friends — the letterpress invite */}
        <section className="her-pad" style={{ maxWidth: 1000, margin: '0 auto', padding: '96px 40px' }}>
          <div ref={inviteRef} className="her-invite-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center', ...inviteStyle }}>
            <div>
              <Eyebrow color={OLIVE}>Finish with friends</Eyebrow>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 3.6vw, 2.9rem)', fontWeight: 600, margin: '14px 0 0', lineHeight: 1.08 }}>
                The women who finish don't go it alone.
              </h2>
              <p style={{ fontSize: 16, color: INK2, lineHeight: 1.7, margin: '18px 0 0', maxWidth: 400 }}>
                Every challenger gets a join code on letterpress stationery. Share it with your circle, follow each other's days, and keep each other honest for all 75.
              </p>
            </div>
            <InviteTicket />
          </div>
        </section>

        {/* FAQ */}
        {m.faqs && (
          <section className="her-pad" style={{ maxWidth: 720, margin: '0 auto', padding: '10px 40px 96px' }}>
            <div ref={faqHeadRef} style={{ textAlign: 'center', marginBottom: 40, ...faqHeadStyle }}>
              <Eyebrow center>Questions</Eyebrow>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 600, margin: '12px 0 0' }}>Good to know</h2>
            </div>
            {m.faqs.map((f, i) => (
              <details
                key={i} className="her-faq" open={openFaq === i}
                onClick={(e) => { e.preventDefault(); setOpenFaq(openFaq === i ? null : i); }}
                style={{ borderBottom: `1px solid ${RING}`, padding: '20px 4px', cursor: 'pointer' }}
              >
                <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none', fontFamily: SANS, fontWeight: 600, fontSize: 17, color: INK, gap: 14 }}>
                  {f.question}
                  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke={CLAY} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"
                       style={{ transition: springTransition(SNAPPY, 'transform'), transform: openFaq === i ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <div style={{ display: 'grid', gridTemplateRows: openFaq === i ? '1fr' : '0fr', transition: 'grid-template-rows 0.35s cubic-bezier(0.22,1,0.36,1)' }}>
                  <div style={{ overflow: 'hidden' }}>
                    <p style={{ fontSize: 15, lineHeight: 1.65, color: INK2, margin: '14px 0 0' }}>{f.answer}</p>
                  </div>
                </div>
              </details>
            ))}
          </section>
        )}

        {/* Final CTA */}
        <section className="her-pad" style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px 100px', textAlign: 'center' }}>
          <div ref={finalCtaRef} style={{ background: `linear-gradient(135deg, ${CLAY}, ${CLAY_D})`, borderRadius: 34, padding: '64px 32px', color: '#fff', ...finalCtaStyle }}>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', fontWeight: 600, margin: 0, lineHeight: 1.02 }}>Your 75 days start now.</h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.85)', margin: '16px 0 30px' }}>Choose your hard. Become her.</p>
            <a
              className="her-cta" href={dl} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', background: '#fff', color: CLAY_D, fontFamily: SANS, fontWeight: 800, fontSize: 15, padding: '16px 36px', borderRadius: 30, textDecoration: 'none' }}
            >
              Download on the App Store
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: `1px solid ${RING}`, backgroundColor: VELLUM }}>
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
    </div>
  );
};

/* Feature card — sticky-tile numeral + serif title, per the app's task rows. */
const FeatureCard: React.FC<{ index: number; title: string; description: string }> = ({ index, title, description }) => {
  const [ref, revealStyle] = useReveal<HTMLDivElement>({ delay: (index % 3) * 90 });
  return (
    <div
      ref={ref}
      style={{
        background: VELLUM, border: `1px solid ${RING}`, borderRadius: 24, padding: '28px 26px',
        transition: 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s ease',
        ...revealStyle,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 18px 40px rgba(43,36,32,0.08)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
    >
      <div
        style={{
          width: 46, height: 46, borderRadius: 8, background: stickyGrad(index), marginBottom: 18,
          boxShadow: '0 4px 5px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span style={{ fontFamily: SERIF, fontSize: 22, fontStyle: 'italic', fontWeight: 500, color: 'rgba(43,36,32,0.8)' }}>{index + 1}</span>
      </div>
      <h3 style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 600, margin: '0 0 8px' }}>{title}</h3>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: INK2, margin: 0 }}>{description}</p>
    </div>
  );
};

export default Her75Landing;
