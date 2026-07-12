import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { AppConfig } from '../config/apps';
import { ShaderCanvas } from '../lib/ShaderCanvas';

interface Props {
  app: AppConfig;
  section?: 'privacy' | 'terms' | 'support';
}

/* ────────────────────────────────────────────────────────────────────────────
   SNIPSY — every value lifted from Theme.swift.
   Paper cream, coffee-brown ink, postal red accent. Light-only, warm stationery.
   ──────────────────────────────────────────────────────────────────────────── */

const PAPER   = '#F8F2E3';
const PAPER_D = '#EFE6D0';
const INK     = '#4A3728';
const INK2    = '#7E6E58';
const INK3    = 'rgba(74,55,40,0.4)';
const RED     = '#D6503A';
const RED_D   = '#C04430';

const DISPLAY = "system-ui, -apple-system, 'Helvetica Neue', sans-serif";
const SERIF   = "Georgia, 'Times New Roman', serif";

/* Stamp variant colours from StampView.swift paperFill */
const VARIANTS: { id: string; label: string; paper: string; ink: string }[] = [
  { id: 'tinted',        label: 'Tinted',        paper: '#C4956A', ink: '#221F1A' },
  { id: 'ivory',         label: 'Ivory',          paper: '#B7A6D6', ink: '#3B2F4A' },
  { id: 'ink',           label: 'Ink',            paper: '#2A2621', ink: '#EDE6D6' },
  { id: 'airmail',       label: 'Airmail',        paper: '#FCFBF6', ink: '#221F1A' },
  { id: 'commemorative', label: 'Commemorative',  paper: '#8A6AA8', ink: '#F4EEE1' },
  { id: 'foil',          label: 'Foil',           paper: '#6E5A34', ink: '#E8DCC0' },
  { id: 'revenue',       label: 'Revenue',        paper: '#2A8390', ink: '#C8E8D8' },
  { id: 'botanical',     label: 'Botanical',      paper: '#6FA84F', ink: '#1A3A14' },
  { id: 'night',         label: 'Night',          paper: '#1B2740', ink: '#E8E4DC' },
  { id: 'sweetheart',    label: 'Sweetheart',     paper: '#E39AA6', ink: '#4A2828' },
];

/* Demo subjects — the real bundled onboarding assets. */
const SUBJECTS = [
  { photo: '/snipsy/coffee.jpg',  cutout: '/snipsy/coffee_cutout.png',  title: 'Coffee' },
  { photo: '/snipsy/robot.jpg',   cutout: '/snipsy/robot_cutout.png',   title: 'Tin Robot' },
  { photo: '/snipsy/teapot.jpg',  cutout: '/snipsy/teapot_cutout.png',  title: 'Teapot' },
];

/* Paper-grain GLSL — ports the app's PaperBackdrop. */
const GRAIN_FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
float hash21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  vec3 paper=vec3(0.973,0.949,0.890);
  vec3 deep=vec3(0.937,0.902,0.816);
  float t=u_time*0.06;
  vec2 c=vec2(0.5+sin(t)*0.12,0.5-cos(t*0.7)*0.1);
  float d=distance(uv,c);
  float breath=smoothstep(0.9,0.0,d)*0.04;
  vec3 col=mix(paper,deep,breath+smoothstep(0.0,1.0,uv.y)*0.08);
  col+=(hash21(floor(gl_FragCoord.xy))-0.5)*0.04;
  gl_FragColor=vec4(col,1.0);
}`;

const PaperBg: React.FC = () => (
  <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, background: PAPER }}>
    <ShaderCanvas frag={GRAIN_FRAG} fps={24} dprCap={1.25} />
  </div>
);

/* ════════════════════════════════════════════════════════════════════════════
   THE STAMP DEMO — mirrors the onboarding's choreography:
   raw photo → punch (die-cut appears) → waste shatters → sticker settles →
   paper dresses behind → caption rises → hold → fade → loop.
   ════════════════════════════════════════════════════════════════════════════ */

type DemoPhase = 'photo' | 'punch' | 'shatter' | 'settle' | 'dress' | 'caption' | 'hold' | 'fade';

const PHASE_LABELS: Record<DemoPhase, string> = {
  photo:   'Your subject is lifted and die-cut…',
  punch:   'Your subject is lifted and die-cut…',
  shatter: 'The background falls away…',
  settle:  'A sticker, cut on device…',
  dress:   '…or a stamp on the paper you choose.',
  caption: 'Dated and kept forever.',
  hold:    'Dated and kept forever.',
  fade:    '',
};

const StampDemoHero: React.FC = () => {
  const [phase, setPhase] = useState<DemoPhase>('photo');
  const [subjectIdx, setSubjectIdx] = useState(0);
  const [variantIdx, setVariantIdx] = useState(0);
  const genRef = useRef(0);
  const subject = SUBJECTS[subjectIdx];
  const variant = VARIANTS[variantIdx];

  const runCycle = useCallback(async (gen: number) => {
    const alive = () => genRef.current === gen;
    const wait = (ms: number) => new Promise<void>(r => {
      const id = setTimeout(r, ms);
      // No cleanup needed — short sleeps in an async loop
    });

    // 1. Show raw photo
    setPhase('photo');
    await wait(900);
    if (!alive()) return;

    // 2. Punch — die-cut sticker border slams in
    setPhase('punch');
    await wait(500);
    if (!alive()) return;

    // 3. Shatter — waste dissolves away
    setPhase('shatter');
    await wait(1200);
    if (!alive()) return;

    // 4. Settle — sticker is bare
    setPhase('settle');
    await wait(1400);
    if (!alive()) return;

    // 5. Dress — paper unfurls behind, becomes a stamp
    setPhase('dress');
    await wait(600);
    if (!alive()) return;

    // 6. Caption — title and date rise
    setPhase('caption');
    await wait(1800);
    if (!alive()) return;

    // 7. Hold
    setPhase('hold');
    await wait(1200);
    if (!alive()) return;

    // 8. Fade and cycle
    setPhase('fade');
    await wait(500);
    if (!alive()) return;

    // Next subject and variant
    setSubjectIdx(i => (i + 1) % SUBJECTS.length);
    setVariantIdx(i => (i + 1) % VARIANTS.length);
  }, []);

  useEffect(() => {
    genRef.current += 1;
    const gen = genRef.current;
    let cancelled = false;

    const loop = async () => {
      while (!cancelled && genRef.current === gen) {
        await runCycle(gen);
      }
    };
    loop();
    return () => { cancelled = true; genRef.current += 1; };
  }, [runCycle]);

  /* Layout — stamp is 4:5 content in a frame that's W × 1.3125W.
     Content rect: 7.5% inset on each side, 85% width, height = W × 1.0625.
     Caption area: bottom 15.625% of the stamp. */
  const W = 240;
  const H = W * 1.3125;
  const contentInset = W * 0.075;
  const contentW = W * 0.85;
  const contentH = W * 1.0625;

  const isPunched = phase !== 'photo';
  const wasteGone = phase !== 'photo' && phase !== 'punch' && phase !== 'shatter';
  const isShattered = phase === 'shatter';
  const isDressed = phase === 'dress' || phase === 'caption' || phase === 'hold';
  const captionIn = phase === 'caption' || phase === 'hold';
  const isFading = phase === 'fade';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <div
        style={{
          position: 'relative',
          width: W, height: H,
          opacity: isFading ? 0 : 1,
          transform: isFading ? 'scale(0.95)' : 'scale(1)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        {/* Paper layer — the stamp frame unfurls behind the sticker */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background: variant.paper,
            borderRadius: 4,
            transform: isDressed ? 'scale(1)' : 'scale(0.85)',
            opacity: isDressed ? 1 : 0,
            transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease, background 0.6s ease',
            boxShadow: isDressed ? `0 24px 48px rgba(74,50,32,0.22), 0 4px 12px rgba(74,50,32,0.12)` : 'none',
          }}
        >
          {/* Perforated edge — a repeating circle border simulation */}
          <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <mask id="perf-mask">
                <rect width={W} height={H} fill="white" />
                {/* Top & bottom perf holes */}
                {Array.from({ length: 14 }, (_, i) => {
                  const x = 8 + i * ((W - 16) / 13);
                  return <React.Fragment key={`tb${i}`}>
                    <circle cx={x} cy={0} r={3.5} fill="black" />
                    <circle cx={x} cy={H} r={3.5} fill="black" />
                  </React.Fragment>;
                })}
                {/* Left & right perf holes */}
                {Array.from({ length: 18 }, (_, i) => {
                  const y = 8 + i * ((H - 16) / 17);
                  return <React.Fragment key={`lr${i}`}>
                    <circle cx={0} cy={y} r={3.5} fill="black" />
                    <circle cx={W} cy={y} r={3.5} fill="black" />
                  </React.Fragment>;
                })}
              </mask>
            </defs>
            <rect width={W} height={H} fill={variant.paper} mask="url(#perf-mask)" style={{ transition: 'fill 0.6s ease' }} />
          </svg>

          {/* Content frame border */}
          <div style={{
            position: 'absolute',
            left: contentInset - 1, top: contentInset - 1,
            width: contentW + 2, height: contentH + 2,
            border: `1.5px solid ${variant.ink}`,
            opacity: 0.15,
            borderRadius: 2,
            transition: 'border-color 0.6s ease',
          }} />
        </div>

        {/* Content area — photo → sticker crossfade */}
        <div style={{
          position: 'absolute',
          left: contentInset, top: contentInset,
          width: contentW, height: contentH,
          borderRadius: 2,
          overflow: 'hidden',
        }}>
          {/* Raw photo — fades after waste shatters */}
          <img
            src={subject.photo}
            alt=""
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              opacity: wasteGone ? 0 : 1,
              transition: isShattered
                ? 'opacity 1.1s cubic-bezier(0.4,0,0.2,1)'
                : 'opacity 0.3s ease',
            }}
          />

          {/* Die-cut sticker — the cutout subject with a white border filter */}
          <img
            src={subject.cutout}
            alt=""
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              opacity: isPunched ? 1 : 0,
              transform: isPunched
                ? `scale(${phase === 'punch' ? 1.03 : 1})`
                : 'scale(0.95)',
              filter: isPunched ? 'url(#die-cut-filter) drop-shadow(0 4px 12px rgba(74,50,32,0.25))' : 'none',
              transition: phase === 'punch'
                ? 'opacity 0.15s ease, transform 0.32s cubic-bezier(0.22,1,0.36,1)'
                : 'opacity 0.3s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)',
              zIndex: 2,
            }}
          />

          {/* SVG Filter Definition for the white sticker die-cut border */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
            <defs>
              <filter id="die-cut-filter">
                {/* Dilate alpha to create the border thickness */}
                <feMorphology in="SourceAlpha" result="dilated" operator="dilate" radius="4" />
                {/* Color the dilated region solid white */}
                <feFlood flood-color="white" result="white-color" />
                <feComposite in="white-color" in2="dilated" operator="in" result="white-border" />
                {/* Layer the original cutout over the white border */}
                <feMerge>
                  <feMergeNode in="white-border" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Waste overlay — the parts around the cut. Dissolves via opacity on the raw photo. */}
          {/* The shatter effect: the raw photo breaks into a grid of fragments */}
          {isShattered && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
              {Array.from({ length: 25 }, (_, i) => {
                const row = Math.floor(i / 5);
                const col = i % 5;
                const delay = (row * 0.06 + col * 0.04 + Math.random() * 0.08);
                const angle = (Math.random() - 0.5) * 30;
                const tx = (Math.random() - 0.5) * 40;
                const ty = 20 + Math.random() * 30;
                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: `${col * 20}%`, top: `${row * 20}%`,
                      width: '20%', height: '20%',
                      backgroundImage: `url(${subject.photo})`,
                      backgroundSize: '500% 500%',
                      backgroundPosition: `${col * 25}% ${row * 25}%`,
                      animation: `snip-grain-out 0.9s cubic-bezier(0.4,0,1,1) ${delay}s both`,
                      '--tx': `${tx}px`, '--ty': `${ty}px`, '--rot': `${angle}deg`,
                    } as React.CSSProperties}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Caption area — rises from below like the real app */}
        <div style={{
          position: 'absolute',
          left: 0, right: 0,
          bottom: 0,
          height: H - contentH - contentInset,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 2,
          opacity: captionIn ? 1 : 0,
          transform: captionIn ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)',
        }}>
          <span style={{
            fontFamily: DISPLAY, fontSize: 8, fontWeight: 800,
            letterSpacing: 2, color: variant.ink, opacity: 0.5,
            textTransform: 'uppercase',
            transition: 'color 0.6s ease',
          }}>
            SNIPSY · №001
          </span>
          <span style={{
            fontFamily: SERIF, fontSize: 13, fontWeight: 600,
            color: variant.ink, fontStyle: 'italic',
            transition: 'color 0.6s ease',
          }}>
            {subject.title}
          </span>
          <span style={{
            fontFamily: DISPLAY, fontSize: 7, fontWeight: 600,
            letterSpacing: 1.5, color: variant.ink, opacity: 0.35,
            textTransform: 'uppercase',
            transition: 'color 0.6s ease',
          }}>
            {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()}
          </span>
        </div>

        {/* Sticker shadow — only when undressed */}
        {!isDressed && isPunched && (
          <div style={{
            position: 'absolute',
            left: contentInset + 4, top: contentInset + 4,
            width: contentW, height: contentH,
            borderRadius: 2,
            background: 'rgba(74,50,32,0.12)',
            filter: 'blur(16px)',
            zIndex: -1,
            opacity: wasteGone ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }} />
        )}
      </div>

      {/* Phase label — just like the onboarding */}
      <div style={{
        fontFamily: DISPLAY, fontSize: 14, fontWeight: 500,
        color: INK2,
        minHeight: 20,
        opacity: isFading ? 0 : 0.8,
        transition: 'opacity 0.3s ease',
        textAlign: 'center',
      }}>
        {PHASE_LABELS[phase]}
      </div>
    </div>
  );
};


/* ── CSS ──────────────────────────────────────────────────────────────────── */

const css = `
  .snip-page * { box-sizing: border-box; }
  @keyframes snip-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
  .snip-rise { opacity: 0; animation: snip-rise 0.85s cubic-bezier(0.22,1,0.36,1) forwards; }
  .sd1 { animation-delay: 0.08s; } .sd2 { animation-delay: 0.18s; } .sd3 { animation-delay: 0.30s; } .sd4 { animation-delay: 0.42s; }

  /* Grain shatter — each fragment spins out and fades */
  @keyframes snip-grain-out {
    0% { opacity: 1; transform: translate(0,0) rotate(0deg) scale(1); }
    100% { opacity: 0; transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(0.6); }
  }

  .snip-cta { transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease; }
  .snip-cta:hover { transform: translateY(-2px); box-shadow: 0 16px 32px rgba(214,80,58,0.25); }
  .snip-cta:active { transform: translateY(0) scale(0.98); }

  .snip-faq summary::-webkit-details-marker { display: none; }
  .snip-faq summary { cursor: pointer; -webkit-tap-highlight-color: transparent; }

  .snip-chip { transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease; cursor: pointer; border: none; }
  .snip-chip:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 8px 20px rgba(74,55,40,0.15); }

  .snip-feat { transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease; }
  .snip-feat:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(74,55,40,0.12); }

  .snip-vs-row { transition: background 0.25s ease; }
  .snip-vs-row:hover { background: rgba(214,80,58,0.04); }

  @media (max-width: 900px) {
    .snip-hero-grid { grid-template-columns: 1fr !important; text-align: center; }
    .snip-hero-copy { align-items: center !important; }
    .snip-stamp-wrap { margin: 32px auto 0 !important; }
    .snip-feat-grid { grid-template-columns: 1fr 1fr !important; }
    .snip-how-grid { grid-template-columns: 1fr 1fr !important; }
    .snip-pad { padding-left: 24px !important; padding-right: 24px !important; }
  }
  @media (max-width: 560px) {
    .snip-feat-grid { grid-template-columns: 1fr !important; }
    .snip-how-grid { grid-template-columns: 1fr !important; }
  }
  @media (prefers-reduced-motion: reduce) {
    .snip-rise { animation: none; opacity: 1; }
    @keyframes snip-grain-out { 0%,100% { opacity: 0; } }
  }
`;

/* ── Small shared components ──────────────────────────────────────────────── */

const Eyebrow: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = RED }) => (
  <div style={{ fontFamily: DISPLAY, fontSize: 12, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color }}>{children}</div>
);

const DownloadBtn: React.FC<{ url: string; label?: string }> = ({ url, label = 'Download on the App Store' }) => (
  <a className="snip-cta" href={url} target="_blank" rel="noopener noreferrer"
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      background: `linear-gradient(135deg, ${RED}, ${RED_D})`, color: '#fff',
      fontFamily: DISPLAY, fontWeight: 700, fontSize: 15, padding: '16px 30px',
      borderRadius: 30, textDecoration: 'none', boxShadow: '0 10px 24px rgba(214,80,58,0.22)',
    }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
    {label}
  </a>
);

const FeatureIcon: React.FC<{ name: string }> = ({ name }) => {
  const p = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: RED, strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'Scissors': return <svg {...p}><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" /></svg>;
    case 'Stamp': return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 3v18" /></svg>;
    case 'MessageCircle': return <svg {...p}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>;
    case 'Share2': return <svg {...p}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>;
    case 'BookOpen': return <svg {...p}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>;
    case 'WifiOff': return <svg {...p}><line x1="1" y1="1" x2="23" y2="23" /><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" /><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" /><path d="M10.71 5.05A16 16 0 0 1 22.56 9" /><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg>;
    default: return <svg {...p}><circle cx="12" cy="12" r="10" /></svg>;
  }
};

/* ── How-it-works steps ───────────────────────────────────────────────────── */

const STEPS = [
  { num: '01', title: 'Capture', desc: 'Point your camera at anything — or pick from your library.', icon: 'camera' },
  { num: '02', title: 'Die-Cut', desc: 'Vision lifts the subject and cuts it cleanly from the scene.', icon: 'scissors' },
  { num: '03', title: 'Dress', desc: 'Pick from 10 paper variants — your subject becomes a stamp.', icon: 'stamp' },
  { num: '04', title: 'Collect', desc: 'Numbered, dated, and yours — in your album or in iMessage.', icon: 'book' },
];

const StepIcon: React.FC<{ name: string }> = ({ name }) => {
  const p = { width: 32, height: 32, viewBox: '0 0 24 24', fill: 'none', stroke: RED, strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'camera': return <svg {...p}><path d="M14.5 4h-5L7.5 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3.5L14.5 4z" /><circle cx="12" cy="13" r="3.5" /></svg>;
    case 'scissors': return <svg {...p}><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" /></svg>;
    case 'stamp': return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 3v18" /></svg>;
    case 'book': return <svg {...p}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>;
    default: return null;
  }
};

/* ── Legal page ───────────────────────────────────────────────────────────── */

const LegalPage: React.FC<{ app: AppConfig; section: 'privacy' | 'terms' | 'support' }> = ({ app, section }) => {
  const content = section === 'privacy' ? app.legal.privacyPolicy : section === 'terms' ? app.legal.termsOfService : app.legal.support;
  if (!content) return null;
  const title = section === 'privacy' ? 'Privacy Policy' : section === 'terms' ? 'Terms of Service' : 'Support';
  return (
    <div className="snip-page" style={{ position: 'relative', minHeight: '100dvh', fontFamily: DISPLAY, color: INK }}>
      <style>{css}</style>
      <PaperBg />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 720, margin: '0 auto', padding: '80px 32px 100px' }}>
        <Link to="/snipsy" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 48, color: INK2, textDecoration: 'none', fontSize: 14, fontWeight: 600, opacity: 0.7 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          Back to Snipsy
        </Link>
        <h1 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 12px 0' }}>{title}</h1>
        <p style={{ fontSize: 12, color: INK2, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 48 }}>Last Updated: {app.legal.lastUpdated}</p>
        <div style={{ lineHeight: 1.8, fontSize: 15 }}>
          {content.split('\n\n').map((para, i) => (
            <div key={i} style={{ marginBottom: 28 }}>
              {para.split('\n').map((line, j) => (
                <p key={j} style={{ margin: '0 0 4px 0', fontWeight: j === 0 && para.includes('\n') ? 700 : 400, fontSize: j === 0 && para.includes('\n') ? 17 : 15, color: j === 0 && para.includes('\n') ? INK : INK2 }}>{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════════════════
   MAIN LANDING
   ════════════════════════════════════════════════════════════════════════════ */

const SnipsyLanding: React.FC<Props> = ({ app, section }) => {
  useEffect(() => { document.title = app.seo.title; }, [app]);

  /* Scroll reveal — hooks must run before any early return */
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (section) return; // legal pages don't need scroll reveal
    const root = rootRef.current;
    if (!root) return;
    root.classList.add('js');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = Array.from(root.querySelectorAll<HTMLElement>('.snip-reveal'));
    if (reduced || typeof IntersectionObserver === 'undefined') { els.forEach(el => el.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [section]);

  if (section) return <LegalPage app={app} section={section} />;

  return (
    <div ref={rootRef} className="snip-page" style={{ position: 'relative', minHeight: '100dvh', fontFamily: DISPLAY, color: INK, overflowX: 'hidden' }}>
      <style>{`
        ${css}
        .js .snip-reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1); }
        .js .snip-reveal.in { opacity: 1; transform: none; }
      `}</style>
      <PaperBg />

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'MobileApplication',
        name: app.appStoreName || app.name, applicationCategory: app.seoApplicationCategory,
        operatingSystem: 'iOS', url: 'https://briefly.live/snipsy', description: app.seo.description,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      }) }} />
      {app.marketing.faqs && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: app.marketing.faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
      }) }} />}

      <div style={{ position: 'relative', zIndex: 2 }}>

        {/* Nav */}
        <nav style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          background: 'rgba(248,242,227,0.82)', borderBottom: '1px solid rgba(74,55,40,0.08)',
        }} className="snip-pad">
          <Link to="/snipsy" style={{ fontFamily: DISPLAY, fontSize: 17, fontWeight: 800, letterSpacing: 2, color: INK, textDecoration: 'none' }}>SNIPSY</Link>
          <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            <a href="#how" style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.5, color: INK2, textDecoration: 'none', textTransform: 'uppercase' }}>How</a>
            <a href="#variants" style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.5, color: INK2, textDecoration: 'none', textTransform: 'uppercase' }}>Variants</a>
            <a href="#faq" style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.5, color: INK2, textDecoration: 'none', textTransform: 'uppercase' }}>FAQ</a>
            {app.downloadUrl && <a href={app.downloadUrl} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, background: RED, color: '#fff',
              fontSize: 12, fontWeight: 700, padding: '8px 18px', borderRadius: 20, textDecoration: 'none',
            }}>Get App</a>}
          </div>
        </nav>

        {/* ── Hero ── */}
        <section style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', paddingTop: 80 }}>
          <div className="snip-hero-grid snip-pad" style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div className="snip-hero-copy" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div className="snip-rise sd1" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                <img src="/snipsy.png" alt="Snipsy" width={52} height={52} style={{ width: 52, height: 52, borderRadius: 14, boxShadow: '0 8px 24px rgba(74,50,32,0.18)' }} />
                <Eyebrow>Photo Stamps & Stickers</Eyebrow>
              </div>
              <h1 className="snip-rise sd2" style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.6rem, 5.2vw, 4.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.0, margin: '0 0 22px 0' }}>
                Every photo deserves<br />to be <span style={{ color: RED }}>kept.</span>
              </h1>
              <p className="snip-rise sd3" style={{ fontSize: 17, lineHeight: 1.7, color: INK2, maxWidth: 440, margin: '0 0 36px 0' }}>{app.marketing.subheadline}</p>
              <div className="snip-rise sd4" style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
                {app.downloadUrl && <DownloadBtn url={app.downloadUrl} />}
                <span style={{ fontSize: 13, color: INK3, fontWeight: 600 }}>Free · iOS</span>
              </div>
            </div>

            {/* THE DEMO — the real choreography */}
            <div className="snip-stamp-wrap snip-rise sd3" style={{ display: 'flex', justifyContent: 'center' }}>
              <StampDemoHero />
            </div>
          </div>
        </section>

        {/* ── Problem → Solution ── */}
        <section style={{ padding: '100px 0', borderTop: '1px solid rgba(74,55,40,0.08)' }}>
          <div className="snip-pad" style={{ maxWidth: 800, margin: '0 auto', padding: '0 60px' }}>
            <div className="snip-reveal" style={{ display: 'grid', gap: 48 }}>
              <div>
                <Eyebrow color={INK3}>The problem</Eyebrow>
                <p style={{ fontSize: 20, lineHeight: 1.7, color: INK, marginTop: 14, fontWeight: 500 }}>{app.marketing.problem}</p>
              </div>
              <div style={{ borderLeft: `3px solid ${RED}`, paddingLeft: 28 }}>
                <Eyebrow>The answer</Eyebrow>
                <p style={{ fontSize: 20, lineHeight: 1.7, color: INK, marginTop: 14, fontWeight: 500 }}>{app.marketing.solution}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="how" style={{ padding: '100px 0', borderTop: '1px solid rgba(74,55,40,0.08)' }}>
          <div className="snip-pad" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 60px' }}>
            <div className="snip-reveal" style={{ marginBottom: 60 }}>
              <Eyebrow>How it works</Eyebrow>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '14px 0 0 0' }}>
                Camera → stamp → collection.
              </h2>
            </div>
            <div className="snip-how-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
              {STEPS.map((step, i) => (
                <div key={step.num} className="snip-reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div style={{ background: 'rgba(239,230,208,0.6)', borderRadius: 22, padding: 28, border: '1px solid rgba(74,55,40,0.06)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                      <span style={{ fontFamily: DISPLAY, fontSize: 11, fontWeight: 800, letterSpacing: 2, color: RED, opacity: 0.7 }}>{step.num}</span>
                      <StepIcon name={step.icon} />
                    </div>
                    <h3 style={{ fontFamily: DISPLAY, fontSize: 20, fontWeight: 800, margin: '0 0 8px 0' }}>{step.title}</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: INK2, margin: 0 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stamp Variants ── */}
        <section id="variants" style={{ padding: '100px 0', borderTop: '1px solid rgba(74,55,40,0.08)' }}>
          <div className="snip-pad" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 60px' }}>
            <div className="snip-reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
              <Eyebrow>10 Paper Worlds</Eyebrow>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '14px 0 10px 0' }}>Every stamp, your way.</h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: INK2, maxWidth: 520, margin: '0 auto' }}>Each variant dresses your subject in a different paper world — from warm tinted stock to neon-edged night editions.</p>
            </div>
            <div className="snip-reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              {VARIANTS.map(v => (
                <div key={v.id} className="snip-chip" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 18px', borderRadius: 14,
                  background: 'rgba(239,230,208,0.5)',
                }}>
                  <div style={{ width: 22, height: 28, borderRadius: 4, background: v.paper, border: `1.5px solid rgba(74,55,40,0.12)` }} />
                  <span style={{ fontFamily: DISPLAY, fontSize: 12.5, fontWeight: 700, color: INK2, letterSpacing: 0.5 }}>{v.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section style={{ padding: '100px 0', borderTop: '1px solid rgba(74,55,40,0.08)' }}>
          <div className="snip-pad" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 60px' }}>
            <div className="snip-reveal" style={{ marginBottom: 52 }}>
              <Eyebrow>Features</Eyebrow>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '14px 0 0 0' }}>Everything you need. Nothing you don't.</h2>
            </div>
            <div className="snip-feat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {app.marketing.benefits.map((b, i) => (
                <div key={b.title} className="snip-feat snip-reveal" style={{ transitionDelay: `${i * 0.06}s`, background: 'rgba(239,230,208,0.45)', borderRadius: 22, padding: '28px 26px', border: '1px solid rgba(74,55,40,0.06)' }}>
                  <div style={{ marginBottom: 16 }}><FeatureIcon name={b.icon} /></div>
                  <h3 style={{ fontFamily: DISPLAY, fontSize: 17, fontWeight: 800, margin: '0 0 8px 0' }}>{b.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: INK2, margin: 0 }}>{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Comparison ── */}
        {app.comparisonHighlights && (
          <section style={{ padding: '100px 0', borderTop: '1px solid rgba(74,55,40,0.08)' }}>
            <div className="snip-pad" style={{ maxWidth: 900, margin: '0 auto', padding: '0 60px' }}>
              <div className="snip-reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
                <Eyebrow>Why Snipsy</Eyebrow>
                <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '14px 0 0 0' }}>Not another photo editor.</h2>
              </div>
              <div className="snip-reveal" style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(74,55,40,0.08)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'rgba(74,55,40,0.04)' }}>
                  <div style={{ padding: '14px 24px', fontFamily: DISPLAY, fontSize: 12, fontWeight: 800, letterSpacing: 2, color: INK3, textTransform: 'uppercase' }}>The usual</div>
                  <div style={{ padding: '14px 24px', fontFamily: DISPLAY, fontSize: 12, fontWeight: 800, letterSpacing: 2, color: RED, textTransform: 'uppercase' }}>Snipsy</div>
                </div>
                {app.comparisonHighlights.map((c, i) => (
                  <div key={i} className="snip-vs-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid rgba(74,55,40,0.06)' }}>
                    <div style={{ padding: '18px 24px', fontSize: 14.5, color: INK3, lineHeight: 1.5 }}>{c.them}</div>
                    <div style={{ padding: '18px 24px', fontSize: 14.5, color: INK, fontWeight: 600, lineHeight: 1.5 }}>{c.us}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ── */}
        {app.marketing.faqs && (
          <section id="faq" style={{ padding: '100px 0', borderTop: '1px solid rgba(74,55,40,0.08)' }}>
            <div className="snip-pad" style={{ maxWidth: 800, margin: '0 auto', padding: '0 60px' }}>
              <div className="snip-reveal" style={{ marginBottom: 48 }}>
                <Eyebrow>FAQ</Eyebrow>
                <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '14px 0 0 0' }}>Common questions.</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {app.marketing.faqs.map((faq, i) => (
                  <details key={i} className="snip-faq snip-reveal" style={{ transitionDelay: `${i * 0.04}s`, borderTop: i === 0 ? '1px solid rgba(74,55,40,0.1)' : 'none', borderBottom: '1px solid rgba(74,55,40,0.1)' }}>
                    <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 0', fontFamily: DISPLAY, fontSize: 16, fontWeight: 700, listStyle: 'none', userSelect: 'none' }}>
                      {faq.question}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={INK2} strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginLeft: 16 }}><path d="M6 9l6 6 6-6" /></svg>
                    </summary>
                    <div style={{ padding: '0 0 22px', fontSize: 15, lineHeight: 1.7, color: INK2, maxWidth: '90%' }}>{faq.answer}</div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Download CTA ── */}
        <section style={{ padding: '120px 0', borderTop: '1px solid rgba(74,55,40,0.08)', textAlign: 'center' }}>
          <div className="snip-reveal snip-pad" style={{ padding: '0 60px' }}>
            <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.02, margin: '0 0 18px 0' }}>
              Your moments,<br /><span style={{ color: RED }}>kept.</span>
            </h2>
            <p style={{ fontSize: 16, color: INK2, maxWidth: 440, margin: '0 auto 36px' }}>Free on iOS. One purchase unlocks everything — forever.</p>
            {app.downloadUrl && <DownloadBtn url={app.downloadUrl} />}
          </div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid rgba(74,55,40,0.08)', padding: '28px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }} className="snip-pad">
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <span style={{ fontFamily: DISPLAY, fontSize: 14, fontWeight: 800, letterSpacing: 2, color: INK }}>SNIPSY</span>
            <Link to="/snipsy/privacy-policy" style={{ fontSize: 12, color: INK3, textDecoration: 'none' }}>Privacy</Link>
            <Link to="/snipsy/terms-of-service" style={{ fontSize: 12, color: INK3, textDecoration: 'none' }}>Terms</Link>
            <Link to="/snipsy/support" style={{ fontSize: 12, color: INK3, textDecoration: 'none' }}>Support</Link>
          </div>
          <span style={{ fontSize: 11, color: INK3, letterSpacing: 1 }}>© 2026 Ashwin Anbazhagan</span>
        </footer>
      </div>
    </div>
  );
};

export default SnipsyLanding;
