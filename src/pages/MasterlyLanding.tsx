import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Lock, Upload, Calendar, Flame } from 'lucide-react';
import type { AppConfig } from '../config/apps';
import SEOBox from '../components/SEOBox';
import GuidesGrid from '../components/GuidesGrid';
import AppLayout from '../components/AppLayout';
import LegalContent from './LegalContent';

interface Props {
  app: AppConfig;
  section?: 'privacy' | 'terms' | 'support';
}

const PRIMARY = '#2D4F1E';
const ACCENT = '#E9B44C';
const BG = '#FDFBF7';

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
    <div className="min-h-screen font-handlee" style={{ backgroundColor: BG, color: PRIMARY }}>
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
                  47
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: `${PRIMARY}50` }}>days until your exam</p>
              </div>

              <h1 className="font-bold leading-snug mb-6" style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', color: PRIMARY, fontFamily: '"Chalkboard SE", "Comic Sans MS", cursive' }}>
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
                  <div className="font-bold text-3xl leading-none" style={{ color: ACCENT }}>07</div>
                  <div className="text-xs mt-1 opacity-60">day streak</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── THE MECHANISM ── */}
        <section className="py-24 px-6" style={{ borderTop: `2px solid rgba(45,79,30,0.08)`, borderBottom: `2px solid rgba(45,79,30,0.08)` }}>
          <div className="max-w-6xl mx-auto mb-2">
            <h2 className="font-bold text-3xl" style={{ color: PRIMARY, fontFamily: '"Chalkboard SE", "Comic Sans MS", cursive', position: 'relative', display: 'inline-block' }}>
              <span style={{ position: 'absolute', inset: '-2px -8px', background: ACCENT, transform: 'skewX(-12deg)', zIndex: 0, opacity: 0.25, borderRadius: 4 }} />
              <span style={{ position: 'relative', zIndex: 1 }}>How it works.</span>
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Step 01 */}
            <div className="py-12 flex flex-col md:flex-row md:items-center gap-8" style={{ borderBottom: `1.5px solid rgba(45,79,30,0.08)` }}>
              <div className="flex-shrink-0 font-black text-6xl md:text-8xl" style={{ color: `${PRIMARY}15`, fontFamily: '"Space Mono", monospace' }}>01</div>
              <div className="flex-1" style={{ transform: 'rotate(-0.5deg)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${PRIMARY}12`, border: `1.5px solid ${PRIMARY}20`, boxShadow: `2px 2px 0 rgba(45,79,30,0.10)` }}>
                    <Upload size={18} style={{ color: ACCENT }} />
                  </div>
                  <h3 className="font-bold text-2xl" style={{ color: PRIMARY, fontFamily: '"Chalkboard SE", "Comic Sans MS", cursive' }}>Upload your syllabus or lecture notes</h3>
                </div>
                <p className="text-lg max-w-xl" style={{ color: `${PRIMARY}60` }}>Drop in a PDF or paste your notes. Any subject, any format. Masterly reads your material and understands what you need to learn.</p>
              </div>
            </div>

            {/* Step 02 */}
            <div className="py-12 flex flex-col md:flex-row md:items-center gap-8" style={{ borderBottom: `1.5px solid rgba(45,79,30,0.08)` }}>
              <div className="flex-shrink-0 font-black text-6xl md:text-8xl" style={{ color: `${PRIMARY}15`, fontFamily: '"Space Mono", monospace' }}>02</div>
              <div className="flex-1" style={{ transform: 'rotate(0.4deg)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${PRIMARY}12`, border: `1.5px solid ${PRIMARY}20`, boxShadow: `2px 2px 0 rgba(45,79,30,0.10)` }}>
                    <Calendar size={18} style={{ color: ACCENT }} />
                  </div>
                  <h3 className="font-bold text-2xl" style={{ color: PRIMARY, fontFamily: '"Chalkboard SE", "Comic Sans MS", cursive' }}>AI builds your day-by-day study plan</h3>
                </div>
                <p className="text-lg max-w-xl" style={{ color: `${PRIMARY}60` }}>Set your exam date. Masterly breaks your entire syllabus into daily sessions — perfectly paced so you cover everything with time to review.</p>
              </div>
            </div>

            {/* Step 03 — THE DIFFERENTIATOR */}
            <div className="py-12 flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-shrink-0 font-black text-6xl md:text-8xl" style={{ color: `${ACCENT}30`, fontFamily: '"Space Mono", monospace' }}>03</div>
              <div className="flex-1" style={{ transform: 'rotate(-0.3deg)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${ACCENT}20`, border: `1.5px solid ${ACCENT}40`, boxShadow: `2px 2px 0 rgba(45,79,30,0.10)` }}>
                    <Lock size={18} style={{ color: PRIMARY }} />
                  </div>
                  <h3 className="font-bold text-2xl" style={{ color: PRIMARY, fontFamily: '"Chalkboard SE", "Comic Sans MS", cursive' }}>Pass the quiz. Unlock your apps.</h3>
                </div>
                <p className="text-lg max-w-xl mb-8" style={{ color: `${PRIMARY}60` }}>Each day generates flashcards and a quiz from your own material. Your chosen apps stay locked via iOS Screen Time until you pass. No bypass. No excuses.</p>

                {/* Locked apps visual */}
                <div className="inline-flex items-end gap-3">
                  {[
                    { color: '#FF3B30', label: 'TikTok' },
                    { color: '#1877F2', label: 'Instagram' },
                    { color: '#FF2D55', label: 'Reels' },
                    { color: '#FF9500', label: 'YouTube' },
                  ].map(({ color, label }) => (
                    <div key={label} className="relative flex-shrink-0" style={{ transform: 'rotate(-1deg)' }}>
                      <div
                        className="w-14 h-14 rounded-[16px] flex items-center justify-center"
                        style={{ backgroundColor: `${color}20`, border: `1.5px solid ${color}30`, filter: 'blur(0.5px)', opacity: 0.6, boxShadow: `2px 3px 0 rgba(45,79,30,0.12)` }}
                      >
                        <div className="w-7 h-7 rounded-lg" style={{ backgroundColor: color, opacity: 0.7 }} />
                      </div>
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: PRIMARY }}>
                        <Lock size={9} color="white" />
                      </div>
                    </div>
                  ))}
                  <p className="text-xs pb-1 ml-2 max-w-[100px]" style={{ color: `${PRIMARY}50`, fontFamily: '"Chalkboard SE", cursive' }}>Locked until quiz passed</p>
                </div>
              </div>
            </div>
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
              <h2 className="font-bold text-3xl md:text-4xl" style={{ color: PRIMARY, fontFamily: '"Chalkboard SE", "Comic Sans MS", cursive' }}>The difference is one habit.</h2>
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
            <span className="font-black leading-none" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', color: PRIMARY }}>14</span>
          </div>
          <p className="font-bold text-2xl mb-4" style={{ color: PRIMARY }}>day streak</p>
          <p className="text-base max-w-xs mx-auto" style={{ color: `${PRIMARY}50` }}>Students average 11 consecutive days before their first exam.</p>
        </section>

        {/* ── FEATURE LIST ── */}
        <section className="py-24 px-6 max-w-4xl mx-auto">
          <h3 className="font-bold text-2xl mb-10 text-center" style={{ color: PRIMARY, fontFamily: '"Chalkboard SE", "Comic Sans MS", cursive' }}>Everything else</h3>
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

        {/* ── CTA ── */}
        <section className="py-32 px-6 text-center" style={{ backgroundColor: PRIMARY }}>
          <h2 className="font-bold text-white mb-8 leading-tight" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}>
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
