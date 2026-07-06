import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Lock, Unlock, Upload, Calendar, Flame, Check } from 'lucide-react';
import type { AppConfig } from '../config/apps';
import SEOBox from '../components/SEOBox';
import GuidesGrid from '../components/GuidesGrid';
import AppLayout from '../components/AppLayout';
import Testimonials from '../components/Testimonials';
import CompareStrip from '../components/CompareStrip';
import FounderNote from '../components/FounderNote';
import LegalContent from './LegalContent';
import { useInViewOnce } from '../lib/useInView';

interface Props {
  app: AppConfig;
  section?: 'privacy' | 'terms' | 'support';
}

// CrayonColors (constants/Colors.ts) + the app's three type families
// (tailwind.config.js): chalk = Chalkboard SE (Patrick Hand covers non-Apple
// devices), display = Syne-Bold, mono = Space Mono.
const PRIMARY = '#2D4F1E';
const SECONDARY = '#5C7A4E';
const ACCENT = '#E9B44C';
const DANGER = '#A44231';
const BG = '#FDFBF7';
const IDLE = '#F5F2EA';
const IDLE_BORDER = '#DECFBA';
const CHALK = '"Chalkboard SE", "Patrick Hand", "Comic Sans MS", cursive';
const DISPLAY = '"Syne", sans-serif';
const MONO = '"Space Mono", monospace';

// The crayon button ledge (MasterlyDesignSystem: boxShadow 1px 2px 0).
const crayonShadow = '1px 2px 0px rgba(45,79,30,0.15)';

const mstCss = `
  @keyframes mst-shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-7px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(3px); }
  }
  @keyframes mst-stamp {
    0% { opacity: 0; transform: scale(2.2) rotate(14deg); }
    60% { opacity: 1; transform: scale(0.92) rotate(-10deg); }
    100% { opacity: 1; transform: scale(1) rotate(-8deg); }
  }
  @keyframes mst-unlock {
    0% { transform: scale(1); }
    45% { transform: scale(1.14) rotate(2deg); }
    100% { transform: scale(1); }
  }
  @keyframes mst-card-in {
    from { opacity: 0; transform: translateX(38px) rotate(2deg); }
    to { opacity: 1; transform: translateX(0) rotate(0deg); }
  }
  .mst-flip-inner { transition: transform 0.55s cubic-bezier(0.32, 1.3, 0.4, 1); transform-style: preserve-3d; }
  .mst-crayon { transition: transform 0.16s ease, box-shadow 0.16s ease; }
  .mst-crayon:hover { transform: translateY(-1px); }
  .mst-crayon:active { transform: translateY(2px); box-shadow: 0px 0px 0px rgba(45,79,30,0.15) !important; }
  @media (prefers-reduced-motion: reduce) {
    .mst-flip-inner { transition: none; }
  }
`;

/* Chalk underline that draws itself when scrolled into view. */
const ChalkUnderline: React.FC<{ width?: number }> = ({ width = 190 }) => {
  const [ref, inView] = useInViewOnce<HTMLDivElement>(0.9);
  return (
    <div ref={ref} style={{ height: 12, width, marginTop: 2 }}>
      <svg viewBox="0 0 190 12" width={width} height={12} style={{ overflow: 'visible', display: 'block' }}>
        <path
          d="M4 8 C 42 3, 96 11, 186 5"
          fill="none" stroke={ACCENT} strokeWidth={5} strokeLinecap="round"
          pathLength={1} strokeDasharray={1} strokeDashoffset={inView ? 0 : 1}
          style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(0.6,0,0.3,1) 0.15s' }}
        />
      </svg>
    </div>
  );
};

/* Syne numeral that counts when scrolled into view. */
const CountOnView: React.FC<{ from: number; to: number; dur?: number; style?: React.CSSProperties; className?: string }> = ({ from, to, dur = 1400, style, className }) => {
  const [ref, inView] = useInViewOnce<HTMLSpanElement>(0.8);
  const [n, setN] = useState(from);
  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const p = reduced ? 1 : Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, from, to, dur]);
  return <span ref={ref} className={className} style={{ fontFamily: DISPLAY, fontVariantNumeric: 'tabular-nums', ...style }}>{n}</span>;
};

/* ── Today's session, playable: flip flashcards → pass the quiz → apps unlock ── */

const DEMO_CARDS = [
  { q: 'What does the mitochondria do?', a: 'Powerhouse of the cell — it turns glucose + oxygen into ATP.' },
  { q: 'Inputs of photosynthesis?', a: 'CO₂ + H₂O + light → glucose + O₂.' },
];
const DEMO_QUIZ = {
  q: 'Which molecule carries energy inside cells?',
  options: ['DNA', 'ATP', 'RNA', 'Cellulose'],
  answer: 1,
};

// Shared brand tiles (public/brands) — the same real app icons Honestly's gate uses.
const LOCKED_APPS = ['tiktok', 'instagram', 'snapchat', 'youtube'];

const AppTiles: React.FC<{ unlocked: boolean }> = ({ unlocked }) => (
  <div className="inline-flex items-end gap-3">
    {LOCKED_APPS.map((brand, i) => (
      <div key={brand} className="relative flex-shrink-0" style={{ transform: 'rotate(-1deg)', animation: unlocked ? `mst-unlock 0.55s cubic-bezier(0.3,1.4,0.4,1) ${0.15 + i * 0.1}s both` : 'none' }}>
        <div
          className="w-14 h-14 rounded-[16px] overflow-hidden"
          style={{
            border: `2px solid ${unlocked ? PRIMARY : IDLE_BORDER}`,
            filter: unlocked ? 'none' : 'grayscale(0.75) blur(0.5px)',
            opacity: unlocked ? 1 : 0.55,
            boxShadow: '2px 3px 0 rgba(45,79,30,0.12)',
            transition: `opacity 0.45s ease ${i * 0.1}s, filter 0.45s ease ${i * 0.1}s, border-color 0.45s ease ${i * 0.1}s`,
          }}
        >
          <img src={`/brands/${brand}.jpg`} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center shadow-md"
          style={{ backgroundColor: unlocked ? ACCENT : PRIMARY, transition: `background-color 0.35s ease ${0.15 + i * 0.1}s` }}
        >
          {unlocked ? <Unlock size={9} color={PRIMARY} strokeWidth={3} /> : <Lock size={9} color="white" />}
        </div>
      </div>
    ))}
    <p className="text-xs pb-1 ml-2 max-w-[110px]" style={{ color: unlocked ? PRIMARY : `${PRIMARY}50`, fontFamily: CHALK, transition: 'color 0.4s ease' }}>
      {unlocked ? 'Quiz passed — apps unlocked!' : 'Locked until quiz passed'}
    </p>
  </div>
);

const SessionDemo: React.FC = () => {
  const [phase, setPhase] = useState<'cards' | 'quiz' | 'passed'>('cards');
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [cardKey, setCardKey] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [wrongPick, setWrongPick] = useState<number | null>(null);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const grade = () => {
    if (cardIdx < DEMO_CARDS.length - 1) {
      setCardIdx((i) => i + 1);
      setFlipped(false);
      setCardKey((k) => k + 1);
    } else {
      setPhase('quiz');
    }
  };

  const pick = (i: number) => {
    if (phase !== 'quiz' || picked === DEMO_QUIZ.answer) return;
    setPicked(i);
    if (i === DEMO_QUIZ.answer) {
      timers.current.push(window.setTimeout(() => setPhase('passed'), 850));
    } else {
      setWrongPick(i);
      timers.current.push(window.setTimeout(() => setWrongPick(null), 500));
    }
  };

  const reset = () => {
    setPhase('cards');
    setCardIdx(0);
    setFlipped(false);
    setCardKey((k) => k + 1);
    setPicked(null);
    setWrongPick(null);
  };

  const card = DEMO_CARDS[cardIdx];

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* The session card */}
      <div>
        {/* Progress: card · card · quiz */}
        <div className="flex items-center gap-2 mb-5">
          {[...DEMO_CARDS.map((_, i) => i), DEMO_CARDS.length].map((step) => {
            const isQuiz = step === DEMO_CARDS.length;
            const active = phase === 'cards' ? cardIdx === step : isQuiz;
            const done = phase !== 'cards' ? !isQuiz || phase === 'passed' : cardIdx > step;
            return (
              <div
                key={step}
                style={{
                  height: 7, borderRadius: 999, flex: isQuiz ? 1.6 : 1,
                  backgroundColor: done ? PRIMARY : active ? ACCENT : IDLE,
                  border: `1.5px solid ${done || active ? PRIMARY : IDLE_BORDER}`,
                  transition: 'background-color 0.35s ease, border-color 0.35s ease',
                }}
              />
            );
          })}
          <span className="text-xs ml-2" style={{ fontFamily: MONO, color: `${PRIMARY}50` }}>
            {phase === 'cards' ? `card ${cardIdx + 1}/${DEMO_CARDS.length}` : phase === 'quiz' ? 'quiz' : 'passed ✓'}
          </span>
        </div>

        {phase === 'cards' && (
          <div key={cardKey} style={{ animation: 'mst-card-in 0.45s cubic-bezier(0.22,1,0.36,1) both' }}>
            {/* Flip card */}
            <button
              onClick={() => setFlipped((f) => !f)}
              aria-pressed={flipped}
              className="block w-full text-left"
              style={{ perspective: 1100, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              <div className="mst-flip-inner relative w-full" style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)', minHeight: 210 }}>
                {/* Front */}
                <div
                  className="absolute inset-0 rounded-[24px] p-7 flex flex-col justify-between"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', backgroundColor: '#fff', border: `2px solid ${PRIMARY}`, boxShadow: '3px 5px 0 rgba(45,79,30,0.12)', transform: 'rotate(-0.6deg)' }}
                >
                  <p className="text-xs uppercase tracking-widest" style={{ fontFamily: MONO, color: `${PRIMARY}45` }}>Flashcard · from your notes</p>
                  <p className="font-bold text-2xl leading-snug" style={{ fontFamily: CHALK, color: PRIMARY }}>{card.q}</p>
                  <p className="text-sm" style={{ fontFamily: CHALK, color: ACCENT }}>tap to flip ↺</p>
                </div>
                {/* Back */}
                <div
                  className="absolute inset-0 rounded-[24px] p-7 flex flex-col justify-between"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg) rotate(0.6deg)', backgroundColor: PRIMARY, border: `2px solid ${PRIMARY}`, boxShadow: '3px 5px 0 rgba(45,79,30,0.12)' }}
                >
                  <p className="text-xs uppercase tracking-widest" style={{ fontFamily: MONO, color: 'rgba(253,251,247,0.4)' }}>Answer</p>
                  <p className="font-bold text-xl leading-snug text-white" style={{ fontFamily: CHALK }}>{card.a}</p>
                  <p className="text-sm" style={{ fontFamily: CHALK, color: ACCENT }}>got it?</p>
                </div>
              </div>
            </button>
            {/* Grade buttons — crayon style */}
            <div className="flex gap-3 mt-5" style={{ opacity: flipped ? 1 : 0.35, pointerEvents: flipped ? 'auto' : 'none', transition: 'opacity 0.3s ease' }}>
              <button
                onClick={() => { setFlipped(false); }}
                className="mst-crayon flex-1 py-2.5 rounded-full font-bold text-[15px]"
                style={{ fontFamily: CHALK, backgroundColor: BG, color: PRIMARY, border: `2px solid ${PRIMARY}`, boxShadow: crayonShadow, cursor: 'pointer' }}
              >
                Again
              </button>
              <button
                onClick={grade}
                className="mst-crayon flex-1 py-2.5 rounded-full font-bold text-[15px] text-white"
                style={{ fontFamily: CHALK, backgroundColor: PRIMARY, border: `2px solid ${PRIMARY}`, boxShadow: crayonShadow, cursor: 'pointer' }}
              >
                Got it →
              </button>
            </div>
          </div>
        )}

        {(phase === 'quiz' || phase === 'passed') && (
          <div className="relative" style={{ animation: 'mst-card-in 0.45s cubic-bezier(0.22,1,0.36,1) both' }}>
            <div className="rounded-[24px] p-7" style={{ backgroundColor: '#fff', border: `2px solid ${PRIMARY}`, boxShadow: '3px 5px 0 rgba(45,79,30,0.12)', transform: 'rotate(0.4deg)' }}>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ fontFamily: MONO, color: `${PRIMARY}45` }}>Daily quiz · 1 of 1</p>
              <p className="font-bold text-xl mb-5" style={{ fontFamily: CHALK, color: PRIMARY }}>{DEMO_QUIZ.q}</p>
              <div className="grid grid-cols-2 gap-3">
                {DEMO_QUIZ.options.map((opt, i) => {
                  const isRight = picked === i && i === DEMO_QUIZ.answer;
                  const isWrong = wrongPick === i;
                  return (
                    <button
                      key={opt}
                      onClick={() => pick(i)}
                      className="mst-crayon py-2.5 px-3 rounded-2xl font-bold text-[15px]"
                      style={{
                        fontFamily: CHALK,
                        backgroundColor: isRight ? PRIMARY : isWrong ? 'rgba(164,66,49,0.12)' : IDLE,
                        color: isRight ? '#fff' : isWrong ? DANGER : PRIMARY,
                        border: `2px solid ${isRight ? PRIMARY : isWrong ? DANGER : IDLE_BORDER}`,
                        boxShadow: crayonShadow,
                        cursor: 'pointer',
                        animation: isWrong ? 'mst-shake 0.45s ease' : 'none',
                      }}
                    >
                      {isRight && <Check size={14} className="inline mr-1 -mt-0.5" strokeWidth={3.5} />}
                      {opt}
                    </button>
                  );
                })}
              </div>
              {phase === 'passed' && (
                <button
                  onClick={reset}
                  className="mt-5 text-sm font-bold underline"
                  style={{ fontFamily: CHALK, color: SECONDARY, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  study again tomorrow →
                </button>
              )}
            </div>
            {/* Gold shield stamp */}
            {phase === 'passed' && (
              <div
                className="absolute -top-6 -right-4 flex flex-col items-center justify-center"
                style={{ width: 92, height: 92, animation: 'mst-stamp 0.5s cubic-bezier(0.3,1.3,0.4,1) 0.1s both' }}
              >
                <svg viewBox="0 0 24 24" width={92} height={92} style={{ position: 'absolute', inset: 0 }}>
                  <path d="M12 1.7 20 5v6.3c0 5-3.4 9.2-8 10.9-4.6-1.7-8-5.9-8-10.9V5l8-3.3z" fill={ACCENT} stroke={PRIMARY} strokeWidth={1.4} strokeLinejoin="round" />
                </svg>
                <Check size={26} color={PRIMARY} strokeWidth={4} style={{ position: 'relative', marginTop: -8 }} />
                <span className="text-[11px] font-black tracking-widest" style={{ fontFamily: DISPLAY, color: PRIMARY, position: 'relative' }}>PASSED</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* The payoff — apps unlock */}
      <div className="flex flex-col items-start gap-6">
        <h3 className="font-bold text-2xl" style={{ fontFamily: CHALK, color: PRIMARY }}>
          {phase === 'passed' ? 'And just like that —' : 'Meanwhile, on your phone…'}
        </h3>
        <AppTiles unlocked={phase === 'passed'} />
        <p className="text-base max-w-sm" style={{ color: `${PRIMARY}60` }}>
          {phase === 'passed'
            ? 'That’s the deal Masterly makes with you, every single day: prove you learned, get your phone back.'
            : 'Your chosen apps are held shut by iOS Screen Time. Flip the cards, pass the quiz, and watch what happens.'}
        </p>
      </div>
    </div>
  );
};

const MasterlyLanding: React.FC<Props> = ({ app, section }) => {
  if (section) {
    return (
      <AppLayout app={app}>
        <div style={{ color: PRIMARY }}>
          <LegalContent app={app} section={section} />
        </div>
      </AppLayout>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: BG, color: PRIMARY, fontFamily: CHALK }}>
      <style>{mstCss}</style>
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
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md" style={{ backgroundColor: 'rgba(253,251,247,0.95)', borderBottom: `2px solid rgba(45,79,30,0.08)` }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity" style={{ color: PRIMARY }}>
            <ChevronLeft size={15} />
            <span className="text-sm">All Apps</span>
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg overflow-hidden border-2" style={{ borderColor: 'rgba(45,79,30,0.2)' }}>
              <img src="/masterly.png" alt="Masterly" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-xl" style={{ color: PRIMARY }}>Masterly AI</span>
          </Link>
          <a
            href={app.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-sm px-5 py-2 rounded-2xl transition-all hover:scale-105 active:scale-95 text-white"
            style={{ backgroundColor: PRIMARY, boxShadow: '2px 3px 0px rgba(45,79,30,0.15)' }}
          >
            Download Free
          </a>
        </div>
      </nav>

      <main>
        {/* ── HERO ── */}
        <section className="pt-36 pb-20 px-6 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: countdown + copy */}
            <div>
              {/* Countdown display */}
              <div className="mb-8">
                <div className="font-black leading-none mb-1" style={{ fontSize: 'clamp(5rem, 12vw, 9rem)', color: PRIMARY, lineHeight: 1 }}>
                  <CountOnView from={75} to={47} dur={1600} />
                </div>
                <p className="text-xs uppercase tracking-[0.25em]" style={{ fontFamily: MONO, color: `${PRIMARY}50` }}>days until your exam</p>
              </div>

              <h1 className="font-bold leading-snug mb-6" style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', color: PRIMARY, fontFamily: CHALK }}>
                Stop planning to study. Start.
              </h1>
              <p className="text-lg leading-relaxed mb-6 max-w-lg" style={{ color: `${PRIMARY}70` }}>
                Upload your syllabus. AI builds the plan. Pass the quiz. Unlock your apps.
              </p>

              {/* Rating badge */}
              {app.aggregateRating && (
                <div className="mb-10 inline-flex items-center gap-2 px-4 py-2 rounded-lg border" style={{ backgroundColor: 'rgba(233,180,76,0.1)', borderColor: 'rgba(233,180,76,0.3)', color: PRIMARY, fontSize: '0.875rem', fontWeight: 600 }}>
                  <span>⭐</span>
                  <span>{app.aggregateRating.ratingValue}</span>
                  <span style={{ color: `${PRIMARY}60` }}>·</span>
                  <span style={{ color: `${PRIMARY}60` }}>{app.aggregateRating.ratingCount} ratings</span>
                </div>
              )}

              <div className="flex flex-wrap gap-4 items-center">
                <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform active:scale-95">
                  <img src="/appstore.png" alt="Download on App Store" className="h-12" />
                </a>
              </div>

              {/* Platform chip */}
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-semibold" style={{ backgroundColor: 'rgba(45,79,30,0.05)', borderColor: 'rgba(45,79,30,0.15)', color: PRIMARY }}>
                <span>Free</span>
                <span style={{ color: `${PRIMARY}60` }}>·</span>
                <span>iOS 15+</span>
                <span style={{ color: `${PRIMARY}60` }}>·</span>
                <span>iPhone & iPad</span>
              </div>
            </div>

            {/* Right: video + streak badge */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative group" style={{ width: '260px' }}>
                <div className="absolute -inset-6 rounded-[50px] blur-3xl opacity-15 group-hover:opacity-25 transition-opacity duration-700" style={{ backgroundColor: PRIMARY }} />
                <div className="relative rounded-[44px] overflow-hidden border-[4px] shadow-2xl" style={{ borderColor: PRIMARY, boxShadow: '6px 8px 0px rgba(45,79,30,0.12)' }}>
                  {app.marketing.videoHero ? (
                    <video src={app.marketing.videoHero} className="w-full" autoPlay loop muted playsInline style={{ aspectRatio: '9/19', objectFit: 'cover' }} />
                  ) : (
                    <img src="/masterly.png" alt="Masterly" className="w-full" style={{ aspectRatio: '9/19', objectFit: 'cover' }} />
                  )}
                </div>
                <div className="absolute -bottom-4 -right-4 rounded-2xl px-4 py-3 shadow-xl border-[3px]" style={{ backgroundColor: BG, borderColor: PRIMARY, boxShadow: '3px 4px 0px rgba(45,79,30,0.12)' }}>
                  <div className="font-bold text-3xl leading-none" style={{ color: ACCENT, fontFamily: DISPLAY }}>07</div>
                  <div className="text-xs mt-1 opacity-60">day streak</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── THE MECHANISM ── */}
        <section className="py-24 px-6" style={{ borderTop: `2px solid rgba(45,79,30,0.08)`, borderBottom: `2px solid rgba(45,79,30,0.08)` }}>
          <div className="max-w-6xl mx-auto mb-2">
            <h2 className="font-bold text-3xl inline-block" style={{ color: PRIMARY, fontFamily: CHALK }}>
              How it works.
              <ChalkUnderline width={170} />
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Step 01 */}
            <div className="py-12 flex flex-col md:flex-row md:items-center gap-8" style={{ borderBottom: `1.5px solid rgba(45,79,30,0.08)` }}>
              <div className="flex-shrink-0 font-black text-6xl md:text-8xl" style={{ color: `${PRIMARY}15`, fontFamily: MONO }}>01</div>
              <div className="flex-1" style={{ transform: 'rotate(-0.5deg)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${PRIMARY}12`, border: `1.5px solid ${PRIMARY}20`, boxShadow: `2px 2px 0 rgba(45,79,30,0.10)` }}>
                    <Upload size={18} style={{ color: ACCENT }} />
                  </div>
                  <h3 className="font-bold text-2xl" style={{ color: PRIMARY, fontFamily: CHALK }}>Upload your syllabus or lecture notes</h3>
                </div>
                <p className="text-lg max-w-xl" style={{ color: `${PRIMARY}60` }}>Drop in a PDF or paste your notes. Any subject, any format. Masterly reads your material and understands what you need to learn.</p>
              </div>
            </div>

            {/* Step 02 */}
            <div className="py-12 flex flex-col md:flex-row md:items-center gap-8" style={{ borderBottom: `1.5px solid rgba(45,79,30,0.08)` }}>
              <div className="flex-shrink-0 font-black text-6xl md:text-8xl" style={{ color: `${PRIMARY}15`, fontFamily: MONO }}>02</div>
              <div className="flex-1" style={{ transform: 'rotate(0.4deg)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${PRIMARY}12`, border: `1.5px solid ${PRIMARY}20`, boxShadow: `2px 2px 0 rgba(45,79,30,0.10)` }}>
                    <Calendar size={18} style={{ color: ACCENT }} />
                  </div>
                  <h3 className="font-bold text-2xl" style={{ color: PRIMARY, fontFamily: CHALK }}>AI builds your day-by-day study plan</h3>
                </div>
                <p className="text-lg max-w-xl" style={{ color: `${PRIMARY}60` }}>Set your exam date. Masterly breaks your entire syllabus into daily sessions — perfectly paced so you cover everything with time to review.</p>
              </div>
            </div>

            {/* Step 03 — THE DIFFERENTIATOR */}
            <div className="py-12 flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-shrink-0 font-black text-6xl md:text-8xl" style={{ color: `${ACCENT}30`, fontFamily: MONO }}>03</div>
              <div className="flex-1" style={{ transform: 'rotate(-0.3deg)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${ACCENT}20`, border: `1.5px solid ${ACCENT}40`, boxShadow: `2px 2px 0 rgba(45,79,30,0.10)` }}>
                    <Lock size={18} style={{ color: PRIMARY }} />
                  </div>
                  <h3 className="font-bold text-2xl" style={{ color: PRIMARY, fontFamily: CHALK }}>Pass the quiz. Unlock your apps.</h3>
                </div>
                <p className="text-lg max-w-xl mb-8" style={{ color: `${PRIMARY}60` }}>Each day generates flashcards and a quiz from your own material. Your chosen apps stay locked via iOS Screen Time until you pass. No bypass. No excuses.</p>

                <p className="text-base font-bold" style={{ fontFamily: CHALK, color: ACCENT }}>↓ try the whole loop yourself, just below</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── TODAY'S SESSION — playable ── */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="font-bold text-3xl inline-block" style={{ color: PRIMARY, fontFamily: CHALK }}>
                Today's session. Actually try it.
                <ChalkUnderline width={230} />
              </h2>
              <p className="text-base mt-3 max-w-lg" style={{ color: `${PRIMARY}60` }}>
                Two flashcards and one quiz question, exactly like a Masterly day — except yours are generated from your own notes.
              </p>
            </div>
            <SessionDemo />
          </div>
        </section>

        {/* ── PAIN POINTS ── */}
        <section className="py-20 px-6" style={{ backgroundColor: PRIMARY }}>
          <div className="max-w-6xl mx-auto">
            <p className="text-sm text-center mb-12" style={{ color: 'rgba(253,251,247,0.4)' }}>Does this sound familiar?</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                '"I open Instagram to quickly check something and lose an hour."',
                '"I don\'t know what to study or in what order. So I study nothing."',
                '"The night before the exam, my notes still feel pointless."',
              ].map((quote, i) => (
                <div key={i} className="p-8 rounded-[28px] border-[2px]" style={{ backgroundColor: 'rgba(253,251,247,0.04)', borderColor: `rgba(233,180,76,0.2)` }}>
                  <p className="text-xl leading-relaxed" style={{ color: 'rgba(253,251,247,0.85)' }}>{quote}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BEFORE / AFTER ── */}
        <section className="py-28 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-bold text-3xl md:text-4xl" style={{ color: PRIMARY, fontFamily: CHALK }}>The difference is one habit.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-[28px] border-[2px]" style={{ borderColor: `rgba(45,79,30,0.12)` }}>
              {/* Without */}
              <div className="p-10" style={{ backgroundColor: 'rgba(164,66,49,0.04)', borderRight: '1px solid rgba(45,79,30,0.1)' }}>
                <p className="font-mono text-xs uppercase tracking-widest mb-8" style={{ color: 'rgba(0,0,0,0.25)' }}>Without Masterly</p>
                <ul className="space-y-5">
                  {[
                    "Open Instagram to 'quickly check' — lose an hour",
                    'No idea what to study or in what order',
                    'Cram the night before. Panic.',
                    'Apps win. Every time.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="font-bold mt-0.5 flex-shrink-0" style={{ color: '#A44231' }}>×</span>
                      <span className="text-base leading-snug" style={{ color: '#A44231' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* With */}
              <div className="p-10" style={{ backgroundColor: 'rgba(45,79,30,0.04)' }}>
                <p className="font-mono text-xs uppercase tracking-widest mb-8" style={{ color: `${PRIMARY}50` }}>With Masterly</p>
                <ul className="space-y-5">
                  {[
                    'Plan done. Study session waiting.',
                    'Quiz passed. Apps unlocked.',
                    'Streak growing. Habit forming.',
                    "Exam ready. Not just 'hopefully'.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="font-bold mt-0.5 flex-shrink-0" style={{ color: PRIMARY }}>✓</span>
                      <span className="text-base leading-snug font-bold" style={{ color: PRIMARY }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── STREAK CALLOUT ── */}
        <section className="py-24 px-6 text-center" style={{ backgroundColor: 'rgba(45,79,30,0.04)', borderTop: `2px solid rgba(45,79,30,0.06)`, borderBottom: `2px solid rgba(45,79,30,0.06)` }}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <Flame size={48} style={{ color: ACCENT }} />
            <span className="font-black leading-none" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', color: PRIMARY }}><CountOnView from={0} to={14} dur={1200} /></span>
          </div>
          <p className="font-bold text-2xl mb-4" style={{ color: PRIMARY }}>day streak</p>
          <p className="text-base max-w-xs mx-auto" style={{ color: `${PRIMARY}50` }}>Students average 11 consecutive days before their first exam.</p>
        </section>

        {/* ── FEATURE LIST ── */}
        <section className="py-24 px-6 max-w-4xl mx-auto">
          <h3 className="font-bold text-2xl mb-10 text-center" style={{ color: PRIMARY, fontFamily: CHALK }}>Everything else</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
            {[
              'AI flashcard generation',
              'Multiple-choice quizzes',
              'Subject management',
              'Screen Time integration',
              'Progress tracking',
              'Works offline',
            ].map((feat) => (
              <div key={feat} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: ACCENT }} />
                <span className="text-base" style={{ color: `${PRIMARY}70` }}>{feat}</span>
              </div>
            ))}
          </div>
        </section>

        <CompareStrip
          items={app.comparisonHighlights}
          appName={app.name}
          theme={{ primary: PRIMARY, bg: '#FDFBF7', ink: PRIMARY, card: '#FFFFFF', border: 'rgba(45,79,30,0.12)', heading: CHALK }}
        />

        <Testimonials
          items={app.testimonials}
          rating={app.aggregateRating}
          theme={{ primary: ACCENT, bg: BG, ink: PRIMARY, card: '#FFFFFF', border: 'rgba(45,79,30,0.12)', heading: CHALK }}
        />

        {/* ── CTA ── */}
        <section className="py-32 px-6 text-center" style={{ backgroundColor: PRIMARY }}>
          <h2 className="font-bold text-white mb-8 leading-tight" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontFamily: CHALK }}>
            Your exam won't wait.
          </h2>
          <p className="text-xl mb-12 max-w-sm mx-auto" style={{ color: 'rgba(253,251,247,0.55)' }}>
            Download free. Your apps stay locked until you learn.
          </p>
          <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-block hover:scale-105 transition-transform active:scale-95">
            <img src="/appstore.png" alt="Download on App Store" className="h-14" />
          </a>
        </section>

        {/* Comparisons & Guides (dynamic — links every Masterly pSEO page) */}
        <div style={{ backgroundColor: '#FDFBF7' }}>
          <GuidesGrid app={app} heading="Comparisons & Guides" />
        </div>

        <FounderNote
          appName={app.name}
          theme={{ primary: PRIMARY, bg: BG, ink: PRIMARY, card: '#FFFFFF', border: 'rgba(45,79,30,0.12)', heading: CHALK }}
        />

        {/* Footer */}
        <footer className="py-10 px-6" style={{ borderTop: '2px solid rgba(45,79,30,0.08)' }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 opacity-30 hover:opacity-100 transition-opacity text-sm" style={{ color: PRIMARY }}>
            <div className="flex gap-8 font-bold">
              <Link to="/masterly/privacy-policy" className="hover:opacity-60 transition-opacity">Privacy</Link>
              <Link to="/masterly/terms-of-service" className="hover:opacity-60 transition-opacity">Terms</Link>
              <Link to="/masterly/support" className="hover:opacity-60 transition-opacity">Support</Link>
            </div>
            <p>© 2026 Ashwin Anbazhagan // briefly.live</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default MasterlyLanding;
