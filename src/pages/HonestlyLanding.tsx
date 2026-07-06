import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Lock, Search, Moon } from 'lucide-react';
import type { AppConfig } from '../config/apps';
import SEOBox from '../components/SEOBox';
import GuidesGrid from '../components/GuidesGrid';
import AppLayout from '../components/AppLayout';
import Testimonials from '../components/Testimonials';
import CompareStrip from '../components/CompareStrip';
import FounderNote from '../components/FounderNote';
import LegalContent from './LegalContent';

interface Props {
  app: AppConfig;
  section?: 'privacy' | 'terms' | 'support';
}

// ── Design tokens (match the app's Palette.swift 1:1) ────────────────────────
const T = {
  bg:         '#FAF8F5',   // paper — warm unbleached background
  card:       '#FFFDF8',   // cream — card surface
  ink:        '#33261A',   // espresso — primary text
  inkBody:    '#4A3B2C',
  inkSoft:    '#8A7A67',
  inkSofter:  '#B7A991',
  hairline:   '#D8CBB6',
  amber:      '#F5851F',   // primary accent
  amberLight: '#FF9A4D',
  amberDeep:  '#BC5E17',
  sunDisc:    '#F7B23C',
  success:    '#5B9A6B',
  rust:       '#BC5E17',   // headline ink — matches the marketing key art
  sage:       '#5B7A4B',   // headline ink — matches the marketing key art
};

const MOOD_FILL: string[] = ['#F7C24B', '#A8CB8C', '#90B4DC', '#C79ACD', '#6E9BD6'];
const MOOD_INK: string[]  = ['#5A3D12', '#33471F', '#22344D', '#4E3357', '#22406B'];
const MOOD_LABEL = ['Happy', 'Confused', 'Sad', 'Awful', 'Cry'] as const;

// Two shadow languages, ported 1:1 from the app (App/DesignSystem/Decor.swift + Components.swift):
// `tactile` — hard, zero-blur ink ledge offset straight down (buttons, pressed/selected states).
// `soft` — the SoftCard ambient shadow: warm brown, blurred, offset down (regular content cards).
const tactileShadow = '0px 4px 0px #33261A';
const softShadow = '0 10px 24px rgba(120,80,30,0.12)';
const border = `1.5px solid rgba(51,38,26,0.2)`; // Palette.outlineSoft = ink.opacity(0.2)

// The app's PaperBackground: Palette.paper + a 4.5%-intensity grain shader. Approximated on the
// web as a tiled SVG noise texture at the same 0.045 opacity.
const GRAIN_BG = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E\")";

// ── Fonts — the app's own two-family system: Shantell Sans (display) + Nunito (ui) ──
const display = '"Shantell Sans", cursive';
const ui = 'Nunito, sans-serif';

// ── Helpers ───────────────────────────────────────────────────────────────────
const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ backgroundColor: T.card, border, borderRadius: 22, boxShadow: softShadow, ...style }}>
    {children}
  </div>
);

const Accent: React.FC<{ children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties }> = ({
  children, size = 16, color = T.amberDeep, style,
}) => (
  <span style={{ fontFamily: display, fontSize: size, color, fontWeight: 600, ...style }}>
    {children}
  </span>
);

const H2: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <p style={{ fontFamily: display, fontWeight: 700, fontSize: 'clamp(1.7rem,3.2vw,2.5rem)', color: T.ink, lineHeight: 1.2, ...style }}>
    {children}
  </p>
);

// ── SunMark — the app's recurring brand glyph: a small sun disc with rays ────
function SunMark({ size = 28, muted = false }: { size?: number; muted?: boolean }) {
  const fill = muted ? T.hairline : T.sunDisc;
  const stroke = muted ? T.inkSofter : T.ink;
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    const r1 = size * 0.42, r2 = size * 0.5;
    return {
      x1: size / 2 + Math.cos(a) * r1, y1: size / 2 + Math.sin(a) * r1,
      x2: size / 2 + Math.cos(a) * r2, y2: size / 2 + Math.sin(a) * r2,
    };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {rays.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke={stroke} strokeWidth={size * 0.06} strokeLinecap="round" />
      ))}
      <circle cx={size / 2} cy={size / 2} r={size * 0.32} fill={fill} stroke={stroke} strokeWidth={size * 0.045} />
    </svg>
  );
}

// ── MoodFace — ported 1:1 from App/DesignSystem/MoodFace.swift (viewBox 0 0 100 100) ──
function MoodFace({ mood, size = 56, expressive = false }: { mood: number; size?: number; expressive?: boolean }) {
  const face = MOOD_FILL[mood];
  const inkC = MOOD_INK[mood];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx={50} cy={50} r={48} fill={face} stroke={T.ink} strokeWidth={3.5} />
      {mood === 0 && (
        <>
          <circle cx={31} cy={38} r={5.5} fill={inkC} />
          <circle cx={69} cy={38} r={5.5} fill={inkC} />
          <path d="M28,63 Q50,83 72,63" stroke={inkC} strokeWidth={5} strokeLinecap="round" fill="none" />
        </>
      )}
      {mood === 1 && (
        <>
          <circle cx={31} cy={39} r={5.5} fill={inkC} />
          <circle cx={69} cy={39} r={5.5} fill={inkC} />
          <path d="M36,70 L64,63" stroke={inkC} strokeWidth={4.5} strokeLinecap="round" fill="none" />
        </>
      )}
      {mood === 2 && (
        <>
          <circle cx={31} cy={38} r={5.5} fill={inkC} />
          <circle cx={69} cy={38} r={5.5} fill={inkC} />
          <path d="M28,75 Q50,59 72,75" stroke={inkC} strokeWidth={5} strokeLinecap="round" fill="none" />
        </>
      )}
      {mood === 3 && (expressive ? (
        <>
          <path d="M20,27 L32,35 L20,43" stroke={inkC} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M80,27 L68,35 L80,43" stroke={inkC} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M24,71 Q30.5,63 37,71 Q43.5,79 50,71 Q56.5,63 63,71 Q69.5,79 76,71" stroke={inkC} strokeWidth={4.5} strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <circle cx={31} cy={39} r={5.5} fill={inkC} />
          <circle cx={69} cy={39} r={5.5} fill={inkC} />
          <path d="M30,72 Q40,64 50,71 Q60,78 70,70" stroke={inkC} strokeWidth={4.5} strokeLinecap="round" fill="none" />
        </>
      ))}
      {mood === 4 && (
        <>
          <path d="M21,39 Q30,29 39,39" stroke={inkC} strokeWidth={4.5} strokeLinecap="round" fill="none" />
          <path d="M61,39 Q70,29 79,39" stroke={inkC} strokeWidth={4.5} strokeLinecap="round" fill="none" />
          {expressive && (
            <>
              <path d="M30,46 C24,56 23,65 30,67 C37,65 36,56 30,46 Z" fill="#5B8FD6" />
              <path d="M70,46 C64,56 63,65 70,67 C77,65 76,56 70,46 Z" fill="#5B8FD6" />
            </>
          )}
          <path d="M34,79 Q50,66 66,79" stroke={inkC} strokeWidth={5} strokeLinecap="round" fill="none" />
        </>
      )}
    </svg>
  );
}

// ── Demo data for the "your mornings, all told" section ──────────────────────
const WEEKDAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const DEMO_MOOD_CYCLE = [0, 0, 1, 0, 0, 2, 0, 1, 0, 3, 0, 0, 1, 0, 4, 0, 0, 1, 2, 0, 0, 1, 0, 0, 3, 0, 1, 0, 0, 2, 0];

function monthGrid() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const todayDate = today.getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leading = new Date(year, month, 1).getDay();
  const cells: (number | null)[] = Array(leading).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const label = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const monthShort = today.toLocaleDateString('en-US', { month: 'short' });
  return { cells, todayDate, label, monthShort };
}


const SAMPLE_ENTRIES = [
  { day: 'Jul 6', mood: 0, line: 'Woke up before the alarm and just sat with the quiet for a minute.' },
  { day: 'Jul 5', mood: 1, line: 'A slow morning. A clear mind. A fresh start.' },
  { day: 'Jul 4', mood: 0, line: 'Coffee first, then the page. Best order for a morning.' },
  { day: 'Jul 3', mood: 2, line: 'Rough night of sleep, but I still showed up for the page.' },
  { day: 'Jul 2', mood: 0, line: 'Grateful for the small stuff today — the light, the quiet.' },
  { day: 'Jul 1', mood: 3, line: 'Anxious about the week ahead, so I wrote it out instead of scrolling.' },
];

// ── Main component ────────────────────────────────────────────────────────────
const HonestlyLanding: React.FC<Props> = ({ app, section }) => {
  const [activeMood, setActiveMood] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMood, setFilterMood] = useState<number | null>(null);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => { i = (i + 1) % 5; setActiveMood(i); }, 2000);
    return () => clearInterval(id);
  }, []);

  const { cells: monthCells, todayDate, label: monthLabel, monthShort } = monthGrid();
  // Derived from the same demo data the calendar grid renders, so the stats below it
  // always agree with what the calendar actually shows for "past" days this month.
  const writtenDays = Math.max(todayDate - 1, 0);
  const moodCounts = [0, 0, 0, 0, 0];
  for (let d = 1; d < todayDate; d++) moodCounts[DEMO_MOOD_CYCLE[(d - 1) % DEMO_MOOD_CYCLE.length]]++;
  const moodTotal = Math.max(moodCounts.reduce((a, b) => a + b, 0), 1);
  const filteredEntries = SAMPLE_ENTRIES.filter(e =>
    (filterMood === null || e.mood === filterMood) &&
    (searchQuery.trim() === '' || e.line.toLowerCase().includes(searchQuery.trim().toLowerCase()))
  );

  if (section) {
    return <AppLayout app={app}><LegalContent app={app} section={section} /></AppLayout>;
  }

  return (
    <div style={{ backgroundColor: T.bg, backgroundImage: GRAIN_BG, backgroundRepeat: 'repeat', color: T.ink, minHeight: '100vh', fontFamily: ui }}>
      <SEOBox
        title={app.seo.title}
        description={app.seo.description}
        keywords={app.seo.keywords}
        appId={app.id}
        appStoreUrl={app.appStoreUrl}
        appCategory={app.seoApplicationCategory}
        aggregateRating={app.aggregateRating}
        screenshots={app.marketing.screenshots}
        faqs={app.marketing.faqs}
        appNumericId={app.appNumericId}
      />

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, backgroundColor: 'rgba(250,248,245,0.92)', backdropFilter: 'blur(12px)', borderBottom: border }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 6, color: T.inkSoft, textDecoration: 'none', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: ui, fontWeight: 700 }}>
            <ChevronLeft size={14}/> All Apps
          </Link>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, overflow: 'hidden', border: `2px solid ${T.ink}` }}>
              <img src="/honestly.png" alt="Honestly" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
            </div>
            <span style={{ fontFamily: display, fontWeight: 700, fontSize: 18, color: T.ink }}>Honestly</span>
          </Link>
          <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer"
            style={{ backgroundColor: T.amber, color: '#fff', fontFamily: ui, fontWeight: 800, fontSize: 14, padding: '8px 20px', borderRadius: 999, border: `1.5px solid ${T.ink}`, boxShadow: tactileShadow, textDecoration: 'none' }}>
            Download Free
          </a>
        </div>
      </nav>

      <main style={{ paddingTop: 60 }}>

        {/* ── HERO ── */}
        <section style={{ minHeight: '92vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '8%', left: '4%', width: 300, height: 300, borderRadius: '50%', background: `${T.sunDisc}28`, filter: 'blur(60px)', pointerEvents: 'none' }}/>
          <div style={{ position: 'absolute', bottom: '8%', right: '4%', width: 240, height: 240, borderRadius: '50%', background: `${MOOD_FILL[1]}38`, filter: 'blur(50px)', pointerEvents: 'none' }}/>

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 680 }}>
            <Accent size={20} style={{ display: 'block', marginBottom: 18 }}>✦ a morning journal</Accent>

            <h1 style={{ fontFamily: display, fontWeight: 700, fontSize: 'clamp(2.4rem,5.5vw,4rem)', lineHeight: 1.1, marginBottom: 20 }}>
              <span style={{ display: 'block', color: T.rust }}>Journal first.</span>
              <span style={{ display: 'block', color: T.sage }}>Then your apps unlock.</span>
            </h1>
            <p style={{ fontFamily: ui, fontSize: 'clamp(1rem,2vw,1.2rem)', color: T.inkSoft, lineHeight: 1.7, marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
              Pick your mood. Write to a genuinely blank page — no prompts, no rules. Say a few things to yourself. Then your morning is yours.
            </p>

            {/* Rating badge */}
            {app.aggregateRating && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 12, backgroundColor: T.card, border, marginBottom: 28, fontSize: 14, fontFamily: ui, fontWeight: 700, color: T.ink }}>
                <span>⭐</span>
                <span>{app.aggregateRating.ratingValue}</span>
                <span style={{ color: T.inkSoft }}>·</span>
                <span style={{ color: T.inkSoft }}>{app.aggregateRating.ratingCount} ratings</span>
              </div>
            )}

            {/* Live mood picker */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
              {MOOD_LABEL.map((m, i) => (
                <button key={m} onClick={() => setActiveMood(i)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '10px 14px', backgroundColor: i === activeMood ? `${MOOD_FILL[i]}33` : T.card, border: `1.5px solid ${i === activeMood ? T.ink : 'rgba(51,38,26,0.12)'}`, borderRadius: 18, boxShadow: i === activeMood ? tactileShadow : 'none', cursor: 'pointer', transition: 'all 0.2s', transform: i === activeMood ? 'translateY(-3px)' : 'none' }}>
                  <MoodFace mood={i} size={44} expressive/>
                  <Accent size={12} color={T.ink}>{m}</Accent>
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
              <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex' }}>
                <img src="/appstore.png" alt="Download on App Store" style={{ height: 52, display: 'block' }}/>
              </a>

              {/* Platform chip */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '10px 16px', borderRadius: 10, backgroundColor: T.card, border, fontSize: 13, fontFamily: ui, fontWeight: 700, color: T.ink }}>
                <span>Free</span>
                <span style={{ color: T.inkSoft }}>·</span>
                <span>iOS 18+</span>
                <span style={{ color: T.inkSoft }}>·</span>
                <span>iPhone &amp; iPad</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── SCREENSHOTS ── */}
        <section style={{ borderTop: border, padding: '64px 24px', backgroundColor: T.card, overflow: 'hidden' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', marginBottom: 40 }}>
            <Accent size={20} style={{ display: 'block', marginBottom: 8 }}>see it in action</Accent>
          </div>
          <div style={{ overflowX: 'auto', paddingBottom: 24, WebkitOverflowScrolling: 'touch' }}
            className="hide-scrollbar">
            <div style={{ display: 'flex', gap: 16, width: 'max-content', margin: '0 auto', padding: '20px 24px 0', scrollSnapType: 'x mandatory' }}>
              {[
                { src: '/honestly/screenshots/01.png', alt: 'Reclaim your mornings — apps stay asleep until you write', rotate: '-3deg', mt: 0 },
                { src: '/honestly/screenshots/02.png', alt: 'Journal first, then your apps unlock — Home screen', rotate: '1.5deg', mt: 20 },
                { src: '/honestly/screenshots/03.png', alt: 'Remember your best mornings — entry detail', rotate: '-2deg', mt: 8 },
                { src: '/honestly/screenshots/04.png', alt: 'A little encouragement every day — Lock Screen affirmation', rotate: '2.5deg', mt: 16 },
                { src: '/honestly/screenshots/05.png', alt: 'See your progress — mood calendar', rotate: '-1deg', mt: 4 },
              ].map(({ src, alt, rotate, mt }) => (
                <div key={src} style={{ flexShrink: 0, scrollSnapAlign: 'center', transform: `rotate(${rotate})`, marginTop: mt }}>
                  <div style={{ width: 220, height: 478, borderRadius: 24, overflow: 'hidden', border, boxShadow: softShadow }}>
                    <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy"/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{ borderTop: border, padding: '80px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <Accent size={20} style={{ display: 'block', marginBottom: 8 }}>how it works</Accent>
            <H2 style={{ marginBottom: 48 }}>Three steps. Under three minutes.</H2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: 20 }}>
              {[
                { num: '01', title: 'How are you, really?', desc: 'Happy, Confused, Sad, Awful, or Cry — tap what fits, before the day has an opinion.', bg: MOOD_FILL[0], face: <MoodFace mood={0} size={56} expressive/> },
                { num: '02', title: 'Empty your head', desc: 'No prompts, no rotating questions. A genuinely blank page — write whatever’s actually there.', bg: MOOD_FILL[1], face: <span style={{ fontSize: 40, lineHeight: 1 }}>✍️</span> },
                { num: '03', title: 'Affirm yourself', desc: 'Say a few things to yourself, in your own words. They’ll echo back to you later.', bg: MOOD_FILL[4], face: <SunMark size={48}/> },
              ].map(({ num, title, desc, bg, face }) => (
                <Card key={num} style={{ padding: 28, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, backgroundColor: bg, borderRadius: '22px 22px 0 0' }}/>
                  <Accent size={28} color="rgba(51,38,26,0.12)" style={{ display: 'block', marginBottom: 10, marginTop: 8 }}>{num}</Accent>
                  <div style={{ marginBottom: 14 }}>{face}</div>
                  <p style={{ fontFamily: display, fontWeight: 700, fontSize: 19, color: T.ink, marginBottom: 10 }}>{title}</p>
                  <p style={{ color: T.inkSoft, fontSize: 15, lineHeight: 1.65, fontFamily: ui }}>{desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── BANNER ── */}
        <div style={{ borderTop: border, borderBottom: border, backgroundColor: T.amber, padding: '14px 24px', textAlign: 'center' }}>
          <Accent size={15} color="rgba(255,255,255,0.94)">✦ &nbsp; No prompts. No stock quotes. Just your own words, before the noise. &nbsp; ✦</Accent>
        </div>

        {/* ── AFFIRMATIONS ── */}
        <section style={{ borderTop: border, padding: '80px 24px', backgroundColor: T.card }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 48, alignItems: 'center' }}>
            <div>
              <Accent size={18} style={{ display: 'block', marginBottom: 10 }}>✦ your own words, echoed back</Accent>
              <H2 style={{ marginBottom: 16 }}>Affirmations that actually stick.</H2>
              <p style={{ color: T.inkSoft, fontSize: 16, lineHeight: 1.7, marginBottom: 24, fontFamily: ui }}>
                Say up to five things to yourself each morning — not a stock quote, your own words. They resurface later on your Lock Screen and widgets, when you need the reminder most.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'I am allowed to take my mornings slow.',
                  'My energy today is a gift, not a given.',
                  'I trust myself to handle whatever this day brings.',
                ].map((line) => (
                  <Card key={line} style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <SunMark size={22}/>
                    <span style={{ fontFamily: ui, fontSize: 14.5, color: T.ink, lineHeight: 1.5 }}>{line}</span>
                  </Card>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Accent size={16} color={T.inkSoft} style={{ display: 'block' }}>✦ on your Lock Screen</Accent>
              <Card style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, overflow: 'hidden', border, flexShrink: 0 }}>
                    <img src="/honestly.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontFamily: ui, fontSize: 13, fontWeight: 800, color: T.ink }}>Today's affirmation</span>
                      <span style={{ fontFamily: ui, fontSize: 11.5, color: T.inkSofter }}>now</span>
                    </div>
                    <span style={{ fontFamily: ui, fontSize: 13.5, color: T.inkBody, lineHeight: 1.5 }}>i am proud of getting this far 🧡</span>
                  </div>
                </div>
              </Card>
              <p style={{ fontFamily: ui, fontSize: 13, color: T.inkSofter, lineHeight: 1.6 }}>
                Right on your Lock Screen and widgets — no need to open the app.
              </p>
            </div>
          </div>
        </section>

        {/* ── STREAK, CALENDAR & HISTORY ── */}
        <section style={{ borderTop: border, padding: '80px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <Accent size={20} style={{ display: 'block', marginBottom: 10 }}>your mornings, all told</Accent>
            <H2 style={{ marginBottom: 12 }}>Every morning, every mood, in one place.</H2>
            <p style={{ color: T.inkSoft, fontSize: 16, lineHeight: 1.7, maxWidth: 520, marginBottom: 40, fontFamily: ui }}>
              A day streak that keeps you honest, a month-at-a-glance mood calendar, and a searchable archive of every page you've ever written.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 20, marginBottom: 20 }}>
              {/* Real calendar grid, computed for the actual current month */}
              <Card style={{ padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <Accent size={15} color={T.inkSoft}>{monthLabel}</Accent>
                  <SunMark size={20}/>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
                  {WEEKDAY_LETTERS.map((l, i) => (
                    <div key={i} style={{ textAlign: 'center', fontFamily: ui, fontWeight: 800, fontSize: 10.5, color: T.inkSofter }}>{l}</div>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                  {monthCells.map((day, i) => (
                    <div key={i} style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {day == null ? null : day < todayDate ? (
                        <MoodFace mood={DEMO_MOOD_CYCLE[(day - 1) % DEMO_MOOD_CYCLE.length]} size={22}/>
                      ) : day === todayDate ? (
                        <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${T.amber}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontFamily: ui, fontWeight: 800, fontSize: 10.5, color: T.amberDeep }}>{day}</span>
                        </div>
                      ) : (
                        <span style={{ fontFamily: ui, fontWeight: 700, fontSize: 11, color: T.hairline }}>{day}</span>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Month card (HomeView's streak card) + mood stats (CalendarView's moods card), stacked to match the calendar card's height */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Card style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: T.amber, border: `2px solid ${T.ink}`, boxShadow: `${tactileShadow}, 0 14px 22px rgba(245,133,31,0.35)` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 15 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <SunMark size={26}/>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{ fontFamily: display, fontWeight: 800, fontSize: 28, color: '#fff' }}>{writtenDays}</span>
                      <span style={{ fontFamily: ui, fontWeight: 600, fontSize: 12.5, color: 'rgba(255,255,255,0.92)', lineHeight: 1.3 }}>mornings written<br/>in {monthShort}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontFamily: ui, fontWeight: 800, fontSize: 10, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>This week</span>
                    <div style={{ flex: 1, height: 7, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.32)', overflow: 'hidden' }}>
                      <div style={{ width: '100%', height: '100%', backgroundColor: '#fff', borderRadius: 999 }}/>
                    </div>
                    <span style={{ fontFamily: ui, fontWeight: 800, fontSize: 11.5, color: '#fff', whiteSpace: 'nowrap' }}>Goal met</span>
                  </div>
                </Card>

                <Card style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Accent size={14} style={{ display: 'block', marginBottom: 13 }}>Your moods, all told</Accent>
                  <div style={{ display: 'flex', height: 14, borderRadius: 8, overflow: 'hidden', border: `2px solid ${T.ink}`, marginBottom: 14 }}>
                    {moodCounts.map((c, i) => (
                      c > 0 && <div key={i} style={{ width: `${(c / moodTotal) * 100}%`, backgroundColor: MOOD_FILL[i] }}/>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {moodCounts.map((c, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <MoodFace mood={i} size={26}/>
                        <span style={{ fontFamily: ui, fontWeight: 800, fontSize: 13, color: T.ink }}>{c}</span>
                        <span style={{ fontFamily: ui, fontWeight: 700, fontSize: 9, color: T.inkSofter }}>{MOOD_LABEL[i]}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            {/* Live search + mood-filter demo — actually filters the sample pages below */}
            <Card style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', borderRadius: 16, backgroundColor: T.bg, border: `2px solid ${T.ink}`, marginBottom: 14 }}>
                <Search size={15} color={T.inkSofter}/>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search your pages…"
                  style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: ui, fontSize: 13.5, color: T.ink }}
                />
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                <button
                  onClick={() => setFilterMood(null)}
                  style={{ fontFamily: ui, fontWeight: 800, fontSize: 12, padding: '7px 14px', borderRadius: 999, border: `2px solid ${T.ink}`, backgroundColor: filterMood === null ? T.ink : 'transparent', color: filterMood === null ? T.bg : T.ink, cursor: 'pointer' }}>
                  All
                </button>
                {[0, 1, 2, 3, 4].map((i) => (
                  <button
                    key={i}
                    onClick={() => setFilterMood(filterMood === i ? null : i)}
                    aria-label={MOOD_LABEL[i]}
                    style={{ width: 36, height: 36, borderRadius: 12, border: `2px solid ${filterMood === i ? T.ink : 'rgba(51,38,26,0.22)'}`, backgroundColor: filterMood === i ? `${MOOD_FILL[i]}40` : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                    <MoodFace mood={i} size={22}/>
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {filteredEntries.length === 0 ? (
                  <p style={{ fontFamily: ui, fontSize: 13, color: T.inkSofter, textAlign: 'center', padding: '18px 0' }}>No pages match — try another mood or word.</p>
                ) : filteredEntries.map((e) => (
                  <div key={e.day} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 14, backgroundColor: T.bg }}>
                    <MoodFace mood={e.mood} size={26}/>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: ui, fontWeight: 800, fontSize: 11, color: T.inkSofter, marginBottom: 1 }}>{e.day}</div>
                      <div style={{ fontFamily: ui, fontSize: 13, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.line}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* ── APP BLOCKER ── */}
        <section style={{ borderTop: border, padding: '80px 24px', backgroundColor: T.card }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 48, alignItems: 'center' }}>
            <div>
              <Accent size={18} style={{ display: 'block', marginBottom: 10 }}>✦ the gate</Accent>
              <H2 style={{ marginBottom: 16 }}>Apps stay asleep<br/>until you've written.</H2>
              <p style={{ color: T.inkSoft, fontSize: 16, lineHeight: 1.7, marginBottom: 16, fontFamily: ui }}>
                Every morning from 4 AM, Honestly keeps your chosen apps — Instagram, TikTok, X, whatever pulls you in — asleep via iOS Screen Time until your page is done. Honestly is only ever shown opaque tokens, never which apps you picked.
              </p>
              <Accent size={20} style={{ display: 'block' }}>Not a timer. Not willpower. A gate.</Accent>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                {['instagram', 'tiktok', 'snapchat', 'whatsapp', 'x', 'youtube'].map((brand) => (
                  <div key={brand} style={{ position: 'relative' }}>
                    <div style={{ width: 60, height: 60, borderRadius: 16, overflow: 'hidden', border: `1.5px solid ${T.hairline}`, opacity: 0.65, filter: 'grayscale(0.4)' }}>
                      <img src={`/honestly/brands/${brand}.jpg`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy"/>
                    </div>
                    <div style={{ position: 'absolute', top: -6, right: -6, width: 22, height: 22, borderRadius: '50%', backgroundColor: T.card, border, boxShadow: softShadow, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Lock size={10} color={T.amberDeep}/>
                    </div>
                    <div style={{ position: 'absolute', bottom: -6, left: -6, width: 20, height: 20, borderRadius: '50%', backgroundColor: T.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Moon size={10} color={T.sunDisc} fill={T.sunDisc}/>
                    </div>
                  </div>
                ))}
              </div>
              <Accent size={14} color={T.inkSoft}>write your page to wake them up →</Accent>
            </div>
          </div>
        </section>

        <Testimonials
          items={app.testimonials}
          rating={app.aggregateRating}
          theme={{ primary: T.amber, bg: T.bg, ink: T.ink, card: T.card, border: 'rgba(51,38,26,0.14)', heading: display }}
        />

        <CompareStrip
          items={app.comparisonHighlights}
          appName={app.name}
          theme={{ primary: T.amber, bg: T.card, ink: T.ink, card: T.bg, border: 'rgba(51,38,26,0.14)', heading: display }}
        />

        {/* ── FAQ ── */}
        {app.marketing.faqs && app.marketing.faqs.length > 0 && (
          <section style={{ borderTop: border, padding: '80px 24px' }}>
            <div style={{ maxWidth: 720, margin: '0 auto' }}>
              <Accent size={18} style={{ display: 'block', marginBottom: 10 }}>✦ questions</Accent>
              <H2 style={{ marginBottom: 40 }}>Common questions</H2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {app.marketing.faqs.map(faq => (
                  <Card key={faq.question} style={{ padding: '20px 24px' }}>
                    <p style={{ fontFamily: display, fontWeight: 700, fontSize: 16, color: T.ink, marginBottom: 8 }}>{faq.question}</p>
                    <p style={{ color: T.inkSoft, fontSize: 15, lineHeight: 1.65, fontFamily: ui }}>{faq.answer}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section style={{ borderTop: border, padding: '100px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 500, height: 300, borderRadius: '50%', background: `${T.sunDisc}22`, filter: 'blur(80px)', pointerEvents: 'none' }}/>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              <SunMark size={90}/>
            </div>
            <Accent size={22} style={{ display: 'block', marginBottom: 14 }}>✦ start tomorrow morning</Accent>
            <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: 'clamp(2rem,4.5vw,3.4rem)', color: T.ink, marginBottom: 16, lineHeight: 1.15 }}>
              Under three minutes.<br/>Before the scroll. Before the noise.
            </h2>
            <p style={{ color: T.inkSoft, fontSize: 17, marginBottom: 12, maxWidth: 360, margin: '0 auto 12px', fontFamily: ui }}>
              Your apps unlock the moment your page is done.
            </p>
            <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 24 }}>
              <img src="/appstore.png" alt="Download on App Store" style={{ height: 56 }}/>
            </a>
            <p style={{ fontFamily: ui, fontSize: 11, color: T.inkSofter, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: 12 }}>Free on iPhone</p>
          </div>
        </section>

        {/* Comparisons & Guides (dynamic — links every Honestly pSEO page) */}
        <div style={{ backgroundColor: T.card, borderTop: border }}>
          <GuidesGrid app={app} heading="How Honestly Compares" />
        </div>

        <FounderNote
          appName={app.name}
          theme={{ primary: T.amber, bg: T.card, ink: T.ink, card: T.bg, border: 'rgba(51,38,26,0.14)', heading: display }}
        />

        {/* Footer */}
        <footer style={{ borderTop: border, padding: '28px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, opacity: 0.4 }}>
            <div style={{ display: 'flex', gap: 28, fontSize: 12, fontFamily: ui, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              <Link to="/honestly/privacy-policy" style={{ color: T.ink, textDecoration: 'none' }}>Privacy</Link>
              <Link to="/honestly/terms-of-service" style={{ color: T.ink, textDecoration: 'none' }}>Terms</Link>
              <Link to="/honestly/support" style={{ color: T.ink, textDecoration: 'none' }}>Support</Link>
            </div>
            <p style={{ fontSize: 12, fontFamily: ui, color: T.ink }}>© 2026 Ashwin Anbazhagan // briefly.live</p>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default HonestlyLanding;
