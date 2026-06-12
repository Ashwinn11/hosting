import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Lock } from 'lucide-react';
import type { AppConfig } from '../config/apps';
import SEOBox from '../components/SEOBox';
import AppLayout from '../components/AppLayout';
import LegalContent from './LegalContent';

interface Props {
  app: AppConfig;
  section?: 'privacy' | 'terms' | 'support';
}

// ── Design tokens (match app Theme.swift) ────────────────────────────────────
const T = {
  bg:        '#F7F5F0',
  card:      '#FDFCF9',
  paper:     '#EFEADE',
  orange:    '#FF6B00',
  ink:       '#1C1C1C',
  inkFaint:  'rgba(28,28,28,0.45)',
  inkGhost:  'rgba(28,28,28,0.10)',
  happy:     '#FEAE5E',
  okay:      '#D1E4A5',
  sad:       '#FBABA6',
  awful:     '#FE526C',
  cry:       '#A8C8E8',
  gratitude: '#FAD8D6',
  blush:     'rgba(251,171,166,0.6)',
};

const shadow = '3px 3px 0px rgba(28,28,28,0.13)';
const border = `1.5px solid rgba(28,28,28,0.10)`;

// ── Fonts ─────────────────────────────────────────────────────────────────────
const outfit = '"Outfit", sans-serif';
const caveat = '"Caveat", cursive';

// ── Helpers ───────────────────────────────────────────────────────────────────
const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ backgroundColor: T.card, border, borderRadius: 22, boxShadow: shadow, ...style }}>
    {children}
  </div>
);

const Hand: React.FC<{ children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties }> = ({
  children, size = 16, color = T.orange, style,
}) => (
  <span style={{ fontFamily: caveat, fontSize: size, color, fontWeight: 600, ...style }}>
    {children}
  </span>
);

const H2: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <p style={{ fontFamily: outfit, fontWeight: 700, fontSize: 'clamp(1.7rem,3.2vw,2.5rem)', color: T.ink, lineHeight: 1.2, ...style }}>
    {children}
  </p>
);

// ── Mood Icons (ported from MoodIcons.swift) ─────────────────────────────────
type MoodName = 'Happy' | 'Okay' | 'Sad' | 'Awful' | 'Cry';

const MOOD_COLORS: Record<MoodName, string> = {
  Happy: T.happy,
  Okay:  T.okay,
  Sad:   T.sad,
  Awful: T.awful,
  Cry:   T.cry,
};

function MoodIcon({ mood, size = 64 }: { mood: MoodName; size?: number }) {
  const s = size / 120;
  const color = MOOD_COLORS[mood];

  const facesByMood: Record<MoodName, React.ReactNode> = {
    Happy: (
      <>
        {/* eyebrows */}
        <path d={`M${34.8*s},${46.8*s} C${40.8*s},${42*s} ${49.2*s},${42*s} ${54*s},${45.6*s}`} stroke={T.ink} strokeWidth={3.6*s} strokeLinecap="round" fill="none"/>
        <path d={`M${66*s},${45.6*s} C${70.8*s},${42*s} ${79.2*s},${42*s} ${85.2*s},${46.8*s}`} stroke={T.ink} strokeWidth={3.6*s} strokeLinecap="round" fill="none"/>
        {/* eyes */}
        <path d={`M${39.6*s},${61.2*s} C${43.2*s},${54*s} ${50.4*s},${54*s} ${54*s},${61.2*s}`} stroke={T.ink} strokeWidth={4.8*s} strokeLinecap="round" fill="none"/>
        <path d={`M${66*s},${61.2*s} C${69.6*s},${54*s} ${76.8*s},${54*s} ${80.4*s},${61.2*s}`} stroke={T.ink} strokeWidth={4.8*s} strokeLinecap="round" fill="none"/>
        {/* smile */}
        <path d={`M${43.2*s},${81.6*s} C${49.2*s},${92.4*s} ${70.8*s},${92.4*s} ${76.8*s},${81.6*s}`} stroke={T.ink} strokeWidth={6*s} strokeLinecap="round" fill="none"/>
      </>
    ),
    Okay: (
      <>
        {/* asymmetric eyebrows */}
        <path d={`M${42*s},${45.6*s} C${44.4*s},${44.4*s} ${47.4*s},${43.2*s} ${50.4*s},${43.8*s}`} stroke={T.ink} strokeWidth={3*s} strokeLinecap="round" fill="none"/>
        <path d={`M${69.6*s},${43.2*s} C${72.6*s},${43.8*s} ${75.6*s},${45*s} ${78*s},${46.8*s}`} stroke={T.ink} strokeWidth={3*s} strokeLinecap="round" fill="none"/>
        {/* dot eyes */}
        <circle cx={48*s} cy={57.6*s} r={2.7*s} fill={T.ink}/>
        <circle cx={72*s} cy={57*s} r={2.7*s} fill={T.ink}/>
        {/* confused mouth */}
        <path d={`M${64.8*s},${87.6*s} C${67.2*s},${79.2*s} ${73.2*s},${72.6*s} ${82.2*s},${72*s}`} stroke={T.ink} strokeWidth={4.2*s} strokeLinecap="round" fill="none"/>
      </>
    ),
    Sad: (
      <>
        {/* eyebrows angled */}
        <path d={`M${40.4*s},${42.5*s} C${44.7*s},${46.9*s} ${51.3*s},${45.8*s} ${55.1*s},${39.8*s}`} stroke={T.ink} strokeWidth={3.3*s} strokeLinecap="round" fill="none"/>
        <path d={`M${64.9*s},${39.8*s} C${68.7*s},${45.8*s} ${75.3*s},${46.9*s} ${79.6*s},${42.5*s}`} stroke={T.ink} strokeWidth={3.3*s} strokeLinecap="round" fill="none"/>
        {/* closed eyes */}
        <path d={`M${44.7*s},${58.9*s} C${46.9*s},${65.5*s} ${53.5*s},${65.5*s} ${55.6*s},${58.9*s}`} stroke={T.ink} strokeWidth={4.4*s} strokeLinecap="round" fill="none"/>
        <path d={`M${64.4*s},${58.9*s} C${66.5*s},${65.5*s} ${73.1*s},${65.5*s} ${75.3*s},${58.9*s}`} stroke={T.ink} strokeWidth={4.4*s} strokeLinecap="round" fill="none"/>
        {/* frown */}
        <path d={`M${41.5*s},${84*s} C${50.2*s},${73.1*s} ${69.8*s},${73.1*s} ${78.5*s},${84*s}`} stroke={T.ink} strokeWidth={5.5*s} strokeLinecap="round" fill="none"/>
      </>
    ),
    Awful: (
      <>
        {/* ellipse eyes */}
        <ellipse cx={47*s} cy={56*s} rx={3.8*s} ry={5.2*s} fill={T.ink}/>
        <ellipse cx={73*s} cy={56*s} rx={3.8*s} ry={5.2*s} fill={T.ink}/>
        {/* upper lids */}
        <path d={`M${42*s},${44*s} C${45*s},${42*s} ${49*s},${42*s} ${52*s},${44*s}`} stroke={T.ink} strokeWidth={5*s} strokeLinecap="round" fill="none"/>
        <path d={`M${68*s},${44*s} C${71*s},${42*s} ${75*s},${42*s} ${78*s},${44*s}`} stroke={T.ink} strokeWidth={5*s} strokeLinecap="round" fill="none"/>
        {/* shocked open mouth */}
        <path d={`M${48*s},${82*s} C${48*s},${68*s} ${72*s},${68*s} ${72*s},${82*s} C${72*s},${92*s} ${60*s},${94*s} ${60*s},${94*s} C${60*s},${94*s} ${48*s},${92*s} ${48*s},${82*s} Z`} stroke={T.ink} strokeWidth={5*s} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </>
    ),
    Cry: (
      <>
        {/* squinting eyes */}
        <path d={`M${38*s},${50*s} C${42*s},${44*s} ${50*s},${44*s} ${54*s},${50*s}`} stroke={T.ink} strokeWidth={4.5*s} strokeLinecap="round" fill="none"/>
        <path d={`M${66*s},${50*s} C${70*s},${44*s} ${78*s},${44*s} ${82*s},${50*s}`} stroke={T.ink} strokeWidth={4.5*s} strokeLinecap="round" fill="none"/>
        {/* frown */}
        <path d={`M${40*s},${82*s} C${50*s},${68*s} ${70*s},${68*s} ${80*s},${82*s}`} stroke={T.ink} strokeWidth={4.5*s} strokeLinecap="round" fill="none"/>
        {/* teardrops */}
        <path d={`M${44*s},${55*s} C${40*s},${60*s} ${40*s},${64*s} ${44*s},${67*s} C${48*s},${64*s} ${48*s},${60*s} ${44*s},${55*s} Z`} fill={T.cry} stroke={T.ink} strokeWidth={1.8*s}/>
        <path d={`M${76*s},${55*s} C${72*s},${60*s} ${72*s},${64*s} ${76*s},${67*s} C${80*s},${64*s} ${80*s},${60*s} ${76*s},${55*s} Z`} fill={T.cry} stroke={T.ink} strokeWidth={1.8*s}/>
      </>
    ),
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${120*s} ${120*s}`}>
      <circle cx={60*s} cy={60*s} r={60*s} fill={color}/>
      <circle cx={60*s} cy={60*s} r={60*s} fill="none" stroke={T.ink} strokeWidth={Math.max(1.4, size*0.045)}/>
      {facesByMood[mood]}
    </svg>
  );
}

// ── Plant components (ported from NatureChars.swift) ──────────────────────────

function PlantFace({ s, size }: { s: number; size: number }) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
      <circle cx={33*s} cy={60*s} r={2.2*s} fill={T.ink}/>
      <circle cx={47*s} cy={60*s} r={2.2*s} fill={T.ink}/>
      <path d={`M${36*s},${66*s} Q${40*s},${70*s} ${44*s},${66*s}`} stroke={T.ink} strokeWidth={1.8*s} strokeLinecap="round" fill="none"/>
      <ellipse cx={28*s} cy={66*s} rx={3*s} ry={2*s} fill={T.blush}/>
      <ellipse cx={52*s} cy={66*s} rx={3*s} ry={2*s} fill={T.blush}/>
    </svg>
  );
}

function PotBase({ s }: { s: number; size: number }) {
  return (
    <>
      {/* shadow */}
      <ellipse cx={40*s} cy={74*s} rx={22*s} ry={3*s} fill="rgba(28,28,28,0.10)"/>
      {/* pot body */}
      <path d={`M${22*s},${50*s} L${58*s},${50*s} L${54*s},${74*s} L${26*s},${74*s} Z`} fill={T.orange} stroke={T.ink} strokeWidth={2.2*s}/>
      {/* pot rim */}
      <rect x={20*s} y={46*s} width={40*s} height={6*s} rx={1.5*s} fill={T.orange} stroke={T.ink} strokeWidth={2.2*s}/>
    </>
  );
}

function Sprout({ size = 80 }: { size?: number }) {
  const s = size / 80;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <PotBase s={s} size={size}/>
        {/* stem */}
        <line x1={40*s} y1={54*s} x2={40*s} y2={32*s} stroke={T.ink} strokeWidth={2*s} strokeLinecap="round"/>
        {/* left leaf */}
        <path d={`M${40*s},${40*s} C${30*s},${40*s} ${18*s},${32*s} ${16*s},${18*s} C${30*s},${16*s} ${40*s},${26*s} ${40*s},${40*s} Z`} fill={T.okay} stroke={T.ink} strokeWidth={2.2*s}/>
        {/* right leaf */}
        <path d={`M${40*s},${36*s} C${50*s},${36*s} ${62*s},${28*s} ${64*s},${14*s} C${50*s},${12*s} ${40*s},${22*s} ${40*s},${36*s} Z`} fill={T.okay} stroke={T.ink} strokeWidth={2.2*s}/>
      </svg>
      <PlantFace s={s} size={size}/>
    </div>
  );
}

function YoungPlant({ size = 80 }: { size?: number }) {
  const s = size / 80;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <PotBase s={s} size={size}/>
        {/* extra lower-left leaf */}
        <path d={`M${38*s},${46*s} C${24*s},${46*s} ${10*s},${40*s} ${8*s},${32*s} C${18*s},${26*s} ${34*s},${36*s} ${38*s},${46*s} Z`} fill={T.okay} stroke={T.ink} strokeWidth={2.2*s}/>
        {/* extra lower-right leaf */}
        <path d={`M${42*s},${46*s} C${56*s},${46*s} ${70*s},${40*s} ${72*s},${32*s} C${62*s},${26*s} ${46*s},${36*s} ${42*s},${46*s} Z`} fill={T.okay} stroke={T.ink} strokeWidth={2.2*s}/>
        {/* stem */}
        <line x1={40*s} y1={54*s} x2={40*s} y2={32*s} stroke={T.ink} strokeWidth={2*s} strokeLinecap="round"/>
        {/* left leaf */}
        <path d={`M${40*s},${40*s} C${30*s},${40*s} ${18*s},${32*s} ${16*s},${18*s} C${30*s},${16*s} ${40*s},${26*s} ${40*s},${40*s} Z`} fill={T.okay} stroke={T.ink} strokeWidth={2.2*s}/>
        {/* right leaf */}
        <path d={`M${40*s},${36*s} C${50*s},${36*s} ${62*s},${28*s} ${64*s},${14*s} C${50*s},${12*s} ${40*s},${22*s} ${40*s},${36*s} Z`} fill={T.okay} stroke={T.ink} strokeWidth={2.2*s}/>
      </svg>
      <PlantFace s={s} size={size}/>
    </div>
  );
}

function MaturePlant({ size = 80 }: { size?: number }) {
  const s = size / 80;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <PotBase s={s} size={size}/>
        {/* lower-left */}
        <path d={`M${38*s},${47*s} C${20*s},${47*s} ${8*s},${40*s} ${6*s},${30*s} C${14*s},${24*s} ${32*s},${36*s} ${38*s},${47*s} Z`} fill={T.okay} stroke={T.ink} strokeWidth={2.2*s}/>
        {/* lower-right */}
        <path d={`M${42*s},${47*s} C${60*s},${47*s} ${72*s},${40*s} ${74*s},${30*s} C${66*s},${24*s} ${48*s},${36*s} ${42*s},${47*s} Z`} fill={T.okay} stroke={T.ink} strokeWidth={2.2*s}/>
        {/* inner-left */}
        <path d={`M${40*s},${40*s} C${30*s},${40*s} ${20*s},${32*s} ${20*s},${20*s} C${22*s},${14*s} ${38*s},${26*s} ${40*s},${40*s} Z`} fill={T.okay} stroke={T.ink} strokeWidth={2.2*s}/>
        {/* inner-right */}
        <path d={`M${40*s},${40*s} C${50*s},${40*s} ${60*s},${32*s} ${60*s},${20*s} C${58*s},${14*s} ${42*s},${26*s} ${40*s},${40*s} Z`} fill={T.okay} stroke={T.ink} strokeWidth={2.2*s}/>
        {/* crown */}
        <path d={`M${40*s},${34*s} C${30*s},${34*s} ${26*s},${20*s} ${34*s},${8*s} C${36*s},${2*s} ${48*s},${18*s} ${40*s},${34*s} Z`} fill={T.okay} stroke={T.ink} strokeWidth={2.2*s}/>
        {/* stem */}
        <line x1={40*s} y1={54*s} x2={40*s} y2={28*s} stroke={T.ink} strokeWidth={2*s} strokeLinecap="round"/>
        {/* left leaf */}
        <path d={`M${40*s},${40*s} C${30*s},${40*s} ${18*s},${32*s} ${16*s},${18*s} C${30*s},${16*s} ${40*s},${26*s} ${40*s},${40*s} Z`} fill={T.okay} stroke={T.ink} strokeWidth={2.2*s}/>
        {/* right leaf */}
        <path d={`M${40*s},${36*s} C${50*s},${36*s} ${62*s},${28*s} ${64*s},${14*s} C${50*s},${12*s} ${40*s},${22*s} ${40*s},${36*s} Z`} fill={T.okay} stroke={T.ink} strokeWidth={2.2*s}/>
      </svg>
      <PlantFace s={s} size={size}/>
    </div>
  );
}

function FloweringPlant({ size = 80 }: { size?: number }) {
  const s = size / 80;
  const blossoms: [number, number, number][] = [[40, 16, 6], [24, 26, 4.6], [56, 26, 4.6]];
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <PotBase s={s} size={size}/>
        {/* lower-left */}
        <path d={`M${38*s},${47*s} C${20*s},${47*s} ${8*s},${40*s} ${6*s},${30*s} C${14*s},${24*s} ${32*s},${36*s} ${38*s},${47*s} Z`} fill={T.okay} stroke={T.ink} strokeWidth={2.2*s}/>
        {/* lower-right */}
        <path d={`M${42*s},${47*s} C${60*s},${47*s} ${72*s},${40*s} ${74*s},${30*s} C${66*s},${24*s} ${48*s},${36*s} ${42*s},${47*s} Z`} fill={T.okay} stroke={T.ink} strokeWidth={2.2*s}/>
        {/* inner-left */}
        <path d={`M${40*s},${40*s} C${30*s},${40*s} ${20*s},${32*s} ${20*s},${20*s} C${22*s},${14*s} ${38*s},${26*s} ${40*s},${40*s} Z`} fill={T.okay} stroke={T.ink} strokeWidth={2.2*s}/>
        {/* inner-right */}
        <path d={`M${40*s},${40*s} C${50*s},${40*s} ${60*s},${32*s} ${60*s},${20*s} C${58*s},${14*s} ${42*s},${26*s} ${40*s},${40*s} Z`} fill={T.okay} stroke={T.ink} strokeWidth={2.2*s}/>
        {/* crown */}
        <path d={`M${40*s},${34*s} C${30*s},${34*s} ${26*s},${20*s} ${34*s},${8*s} C${36*s},${2*s} ${48*s},${18*s} ${40*s},${34*s} Z`} fill={T.okay} stroke={T.ink} strokeWidth={2.2*s}/>
        {/* stem */}
        <line x1={40*s} y1={54*s} x2={40*s} y2={30*s} stroke={T.ink} strokeWidth={2*s} strokeLinecap="round"/>
        {/* left + right base leaves */}
        <path d={`M${40*s},${40*s} C${30*s},${40*s} ${18*s},${32*s} ${16*s},${18*s} C${30*s},${16*s} ${40*s},${26*s} ${40*s},${40*s} Z`} fill={T.okay} stroke={T.ink} strokeWidth={2.2*s}/>
        <path d={`M${40*s},${36*s} C${50*s},${36*s} ${62*s},${28*s} ${64*s},${14*s} C${50*s},${12*s} ${40*s},${22*s} ${40*s},${36*s} Z`} fill={T.okay} stroke={T.ink} strokeWidth={2.2*s}/>
        {/* blossoms */}
        {blossoms.map(([cx, cy, r]) =>
          Array.from({ length: 5 }).map((_, i) => {
            const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
            const pr = r * 0.82 * s;
            const px = cx * s + Math.cos(a) * r * s;
            const py = cy * s + Math.sin(a) * r * s;
            return <ellipse key={`${cx}-${cy}-${i}`} cx={px} cy={py} rx={pr} ry={pr} fill={T.sad} stroke={T.ink} strokeWidth={1.6*s}/>;
          })
        )}
        {blossoms.map(([cx, cy, r]) => {
          const cr = r * 0.7 * s;
          return <ellipse key={`center-${cx}-${cy}`} cx={cx*s} cy={cy*s} rx={cr} ry={cr} fill={T.happy} stroke={T.ink} strokeWidth={1.6*s}/>;
        })}
      </svg>
      <PlantFace s={s} size={size}/>
    </div>
  );
}

// ── Moods data ────────────────────────────────────────────────────────────────
const MOODS: MoodName[] = ['Happy', 'Okay', 'Sad', 'Awful', 'Cry'];

// ── Main component ────────────────────────────────────────────────────────────
const HonestlyLanding: React.FC<Props> = ({ app, section }) => {
  const [activeMood, setActiveMood] = useState<MoodName>('Happy');

  useEffect(() => {
    const cycle: MoodName[] = ['Happy', 'Okay', 'Sad', 'Awful', 'Cry'];
    let i = 0;
    const id = setInterval(() => { i = (i + 1) % cycle.length; setActiveMood(cycle[i]); }, 2000);
    return () => clearInterval(id);
  }, []);

  if (section) {
    return <AppLayout app={app}><LegalContent app={app} section={section} /></AppLayout>;
  }

  return (
    <div style={{ backgroundColor: T.bg, color: T.ink, minHeight: '100vh', fontFamily: outfit }}>
      <SEOBox
        title={app.seo.title}
        description={app.seo.description}
        keywords={app.seo.keywords}
        appId={app.id}
        appStoreUrl={app.appStoreUrl}
        appCategory="LifestyleApplication"
        aggregateRating={app.aggregateRating}
        faqs={app.marketing.faqs}
        appNumericId={app.appNumericId}
      />

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, backgroundColor: 'rgba(247,245,240,0.92)', backdropFilter: 'blur(12px)', borderBottom: border }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 6, color: T.inkFaint, textDecoration: 'none', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            <ChevronLeft size={14}/> All Apps
          </Link>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, overflow: 'hidden', border, boxShadow: shadow }}>
              <img src="/honestly.png" alt="Honestly" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
            </div>
            <span style={{ fontWeight: 700, fontSize: 16, color: T.ink }}>Honestly</span>
          </Link>
          <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer"
            style={{ backgroundColor: T.orange, color: '#fff', fontWeight: 700, fontSize: 14, padding: '8px 20px', borderRadius: 999, border: `1.5px solid ${T.ink}`, boxShadow: '3px 3px 0 rgba(28,28,28,0.15)', textDecoration: 'none' }}>
            Download Free
          </a>
        </div>
      </nav>

      <main style={{ paddingTop: 60 }}>

        {/* ── HERO ── */}
        <section style={{ minHeight: '92vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '8%', left: '4%', width: 300, height: 300, borderRadius: '50%', background: `${T.happy}28`, filter: 'blur(60px)', pointerEvents: 'none' }}/>
          <div style={{ position: 'absolute', bottom: '8%', right: '4%', width: 240, height: 240, borderRadius: '50%', background: `${T.okay}38`, filter: 'blur(50px)', pointerEvents: 'none' }}/>

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 680 }}>
            <Hand size={20} color={T.orange} style={{ display: 'block', marginBottom: 18 }}>✦ a morning ritual app</Hand>

            <h1 style={{ fontFamily: outfit, fontWeight: 700, fontSize: 'clamp(2.2rem,5vw,3.8rem)', color: T.ink, lineHeight: 1.15, marginBottom: 20 }}>
              Your morning doesn't have<br/>to start with someone else's content.
            </h1>
            <p style={{ fontSize: 'clamp(1rem,2vw,1.2rem)', color: T.inkFaint, lineHeight: 1.7, marginBottom: 44, maxWidth: 480, margin: '0 auto 44px' }}>
              Pick your mood. Write. Be grateful.<br/>Your apps unlock. A little plant grows.
            </p>

            {/* Live mood picker */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 44, flexWrap: 'wrap' }}>
              {MOODS.map(m => (
                <button key={m} onClick={() => setActiveMood(m)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 16px', backgroundColor: m === activeMood ? MOOD_COLORS[m] : T.card, border: `1.5px solid ${m === activeMood ? T.ink : 'rgba(28,28,28,0.10)'}`, borderRadius: 18, boxShadow: m === activeMood ? shadow : 'none', cursor: 'pointer', transition: 'all 0.2s', transform: m === activeMood ? 'translateY(-3px)' : 'none' }}>
                  <MoodIcon mood={m} size={48}/>
                  <Hand size={13} color={T.ink}>{m}</Hand>
                </button>
              ))}
            </div>

            <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
              <img src="/appstore.png" alt="Download on App Store" style={{ height: 52 }}/>
            </a>
            <p style={{ fontFamily: outfit, fontSize: 11, color: T.inkFaint, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: 10 }}>iOS · Free</p>
          </div>
        </section>

        {/* ── SCREENSHOTS — magazine stagger ── */}
        <section style={{ borderTop: border, padding: '64px 24px', backgroundColor: T.paper, overflow: 'hidden' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', marginBottom: 40 }}>
            <Hand size={20} color={T.orange} style={{ display: 'block', marginBottom: 8 }}>see it in action</Hand>
          </div>
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 24, scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', paddingLeft: 24 }}
            className="hide-scrollbar">
            {[
              { src: '/honestly/screenshots/01.png', alt: 'App blocker', rotate: '-3deg', mt: 0 },
              { src: '/honestly/screenshots/02.png', alt: 'Journal editor', rotate: '1.5deg', mt: 20 },
              { src: '/honestly/screenshots/03.png', alt: 'Mood garden', rotate: '-2deg', mt: 8 },
              { src: '/honestly/screenshots/04.png', alt: 'Widgets', rotate: '2.5deg', mt: 16 },
              { src: '/honestly/screenshots/05.png', alt: 'Sprout collection', rotate: '-1deg', mt: 4 },
            ].map(({ src, alt, rotate, mt }) => (
              <div key={src} style={{ flexShrink: 0, scrollSnapAlign: 'start', transform: `rotate(${rotate})`, marginTop: mt }}>
                <div style={{ width: 200, height: 433, borderRadius: 24, overflow: 'hidden', border, boxShadow: '5px 5px 0 rgba(28,28,28,0.12)' }}>
                  <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy"/>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{ borderTop: border, padding: '80px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <Hand size={20} color={T.orange} style={{ display: 'block', marginBottom: 8 }}>how it works</Hand>
            <H2 style={{ marginBottom: 48 }}>Three steps. Five minutes.</H2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: 20 }}>
              {[
                { num: '01', title: 'Pick your mood', desc: 'Happy, Okay, Sad, Awful, or Cry — tap how you actually feel. It sets the tone for your journal.', bg: T.happy, face: <MoodIcon mood="Happy" size={56}/> },
                { num: '02', title: 'Write to a prompt', desc: 'A daily rotating prompt tailored to your goal — Clarity, Peace, Focus, or Energy. Never the same twice.', bg: T.okay, face: <Hand size={42} color={T.ink} style={{ lineHeight: 1 }}>✍️</Hand> },
                { num: '03', title: 'Add gratitude', desc: 'A rotating gratitude question + suggestion chips. Then your apps unlock and your plant earns a sprout.', bg: T.gratitude, face: <Sprout size={56}/> },
              ].map(({ num, title, desc, bg, face }) => (
                <Card key={num} style={{ padding: 28, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, backgroundColor: bg, borderRadius: '22px 22px 0 0' }}/>
                  <Hand size={28} color={`rgba(28,28,28,0.12)`} style={{ display: 'block', marginBottom: 10, marginTop: 8 }}>{num}</Hand>
                  <div style={{ marginBottom: 14 }}>{face}</div>
                  <p style={{ fontFamily: outfit, fontWeight: 700, fontSize: 18, color: T.ink, marginBottom: 10 }}>{title}</p>
                  <p style={{ color: T.inkFaint, fontSize: 15, lineHeight: 1.65 }}>{desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF STRIP ── */}
        <div style={{ borderTop: border, borderBottom: border, backgroundColor: T.orange, padding: '14px 24px', textAlign: 'center' }}>
          <Hand size={15} color="rgba(255,255,255,0.9)">✦ &nbsp; 5,432 mornings logged this week &nbsp;·&nbsp; Your plant is waiting. &nbsp; ✦</Hand>
        </div>

        {/* ── PERSONALIZED PROMPTS ── */}
        <section style={{ borderTop: border, padding: '80px 24px', backgroundColor: T.paper }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 48, alignItems: 'center' }}>
            <div>
              <Hand size={18} color={T.orange} style={{ display: 'block', marginBottom: 10 }}>✦ personalized to you</Hand>
              <H2 style={{ marginBottom: 16 }}>Prompts that actually fit your morning.</H2>
              <p style={{ color: T.inkFaint, fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
                During onboarding you pick your goal. Honestly serves daily prompts from a rotating pool of 20+ questions matched to what you're working toward.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {([
                  { goal: 'Clarity', color: T.okay,     sample: "What thought keeps coming back that deserves attention?" },
                  { goal: 'Peace',   color: T.cry,      sample: "What does a peaceful day look like for you today?" },
                  { goal: 'Focus',   color: T.happy,    sample: "What's the one thing that would make today feel meaningful?" },
                  { goal: 'Energy',  color: T.sad,      sample: "What are you genuinely looking forward to today?" },
                ] as const).map(({ goal, color, sample }) => (
                  <Card key={goal} style={{ padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ backgroundColor: color, borderRadius: 8, padding: '3px 10px', fontSize: 12, fontWeight: 700, fontFamily: outfit, border, whiteSpace: 'nowrap', marginTop: 2 }}>{goal}</span>
                    <Hand size={14} color={T.inkFaint} style={{ lineHeight: 1.55 }}>"{sample}"</Hand>
                  </Card>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Hand size={16} color={T.inkFaint} style={{ display: 'block' }}>✦ today's gratitude chips</Hand>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[['☕','morning coffee'],['💌','a kind text'],['🏠','my quiet room'],['☀️','morning light'],['🌿','a deep breath'],['🎵','comfort song']].map(([icon, text]) => (
                  <span key={text} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 14px', backgroundColor: T.card, border, borderRadius: 999, boxShadow: shadow, fontFamily: outfit, fontSize: 13, color: T.ink, whiteSpace: 'nowrap' }}>
                    {icon} {text}
                  </span>
                ))}
              </div>
              <Card style={{ padding: 20 }}>
                <Hand size={14} color={T.orange} style={{ display: 'block', marginBottom: 10 }}>✦ what made you smile yesterday?</Hand>
                {[1,0.8,0.6].map((w, i) => <div key={i} style={{ height: 1.5, backgroundColor: `rgba(28,28,28,0.07)`, borderRadius: 2, marginBottom: 14, width: `${w*100}%` }}/>)}
                <Hand size={12} color={T.inkFaint}>write anything — even one word counts</Hand>
              </Card>
            </div>
          </div>
        </section>

        {/* ── PLANT GROWTH ── */}
        <section style={{ borderTop: border, padding: '80px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
            <Hand size={20} color={T.orange} style={{ display: 'block', marginBottom: 10 }}>your little garden</Hand>
            <H2 style={{ marginBottom: 12 }}>Every morning earns a sprout.</H2>
            <p style={{ color: T.inkFaint, fontSize: 16, lineHeight: 1.7, maxWidth: 480, margin: '0 auto 52px' }}>
              Show up each day and your plant grows through four stages. A living record of your streak — harder to quit when something is growing.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px,1fr))', gap: 16, maxWidth: 780, margin: '0 auto' }}>
              {([
                { label: 'Sprout',    range: '0–29 days',   plant: <Sprout size={80}/>,         badge: false },
                { label: 'Young',     range: '30–89 days',  plant: <YoungPlant size={80}/>,     badge: false },
                { label: 'Mature',    range: '90–179 days', plant: <MaturePlant size={80}/>,    badge: false },
                { label: 'Flowering', range: '180+ days',   plant: <FloweringPlant size={80}/>, badge: true  },
              ] as const).map(({ label, range, plant, badge }) => (
                <Card key={label} style={{ padding: '24px 20px', textAlign: 'center', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>{plant}</div>
                  <p style={{ fontFamily: outfit, fontWeight: 700, fontSize: 16, color: T.ink, marginBottom: 4 }}>{label}</p>
                  <Hand size={13} color={T.inkFaint}>{range}</Hand>
                  {badge && (
                    <div style={{ position: 'absolute', top: -8, right: -8, backgroundColor: T.orange, color: '#fff', fontSize: 10, fontWeight: 700, fontFamily: outfit, padding: '3px 8px', borderRadius: 999, border: `1.5px solid ${T.ink}`, boxShadow: shadow }}>
                      GOAL
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── APP BLOCKER ── */}
        <section style={{ borderTop: border, padding: '80px 24px', backgroundColor: T.paper }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 48, alignItems: 'center' }}>
            <div>
              <Hand size={18} color={T.orange} style={{ display: 'block', marginBottom: 10 }}>✦ the gate</Hand>
              <H2 style={{ marginBottom: 16 }}>Apps stay locked<br/>until you finish.</H2>
              <p style={{ color: T.inkFaint, fontSize: 16, lineHeight: 1.7, marginBottom: 16 }}>
                Honestly uses iOS Screen Time to keep your chosen apps locked. Finish your ritual — they unlock. Not as punishment. As permission to have your morning first.
              </p>
              <Hand size={20} color={T.orange} style={{ display: 'block' }}>Not willpower. Not a timer. A gate.</Hand>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[T.awful, '#1877F2', '#FF2D55', T.happy].map((color, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <div style={{ width: 64, height: 64, borderRadius: 18, backgroundColor: `${color}20`, border: `1.5px solid ${color}40`, opacity: 0.5 }}/>
                    <div style={{ position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%', backgroundColor: T.card, border, boxShadow: shadow, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Lock size={9} color={T.orange}/>
                    </div>
                  </div>
                ))}
              </div>
              <Hand size={14} color={T.inkFaint}>complete ritual to unlock →</Hand>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        {app.marketing.faqs && app.marketing.faqs.length > 0 && (
          <section style={{ borderTop: border, padding: '80px 24px' }}>
            <div style={{ maxWidth: 720, margin: '0 auto' }}>
              <Hand size={18} color={T.orange} style={{ display: 'block', marginBottom: 10 }}>✦ questions</Hand>
              <H2 style={{ marginBottom: 40 }}>Common questions</H2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {app.marketing.faqs.map(faq => (
                  <Card key={faq.question} style={{ padding: '20px 24px' }}>
                    <p style={{ fontFamily: outfit, fontWeight: 700, fontSize: 16, color: T.ink, marginBottom: 8 }}>{faq.question}</p>
                    <p style={{ color: T.inkFaint, fontSize: 15, lineHeight: 1.65 }}>{faq.answer}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section style={{ borderTop: border, padding: '100px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 500, height: 300, borderRadius: '50%', background: `${T.happy}22`, filter: 'blur(80px)', pointerEvents: 'none' }}/>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              <FloweringPlant size={100}/>
            </div>
            <Hand size={22} color={T.orange} style={{ display: 'block', marginBottom: 14 }}>✦ start tomorrow morning</Hand>
            <h2 style={{ fontFamily: outfit, fontWeight: 700, fontSize: 'clamp(2rem,4.5vw,3.4rem)', color: T.ink, marginBottom: 16, lineHeight: 1.15 }}>
              Five minutes.<br/>Before the scroll. Before the noise.
            </h2>
            <p style={{ color: T.inkFaint, fontSize: 17, marginBottom: 36, maxWidth: 340, margin: '0 auto 36px' }}>
              Free on iPhone. Your plant is waiting.
            </p>
            <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
              <img src="/appstore.png" alt="Download on App Store" style={{ height: 56 }}/>
            </a>
            <p style={{ fontFamily: outfit, fontSize: 11, color: T.inkFaint, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: 12 }}>Free on iPhone</p>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: border, padding: '28px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, opacity: 0.4 }}>
            <div style={{ display: 'flex', gap: 28, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              <Link to="/honestly/privacy-policy" style={{ color: T.ink, textDecoration: 'none' }}>Privacy</Link>
              <Link to="/honestly/terms-of-service" style={{ color: T.ink, textDecoration: 'none' }}>Terms</Link>
              <Link to="/honestly/support" style={{ color: T.ink, textDecoration: 'none' }}>Support</Link>
            </div>
            <p style={{ fontSize: 12, fontFamily: outfit, color: T.ink }}>© 2026 Ashwin Anbazhagan // briefly.live</p>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default HonestlyLanding;
