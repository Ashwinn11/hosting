import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Upload, Calendar, Lock, BookOpen, Zap, Flame } from 'lucide-react';
import type { AppConfig } from '../config/apps';
import SEOBox from '../components/SEOBox';
import AppLayout from '../components/AppLayout';
import LegalContent from './LegalContent';

interface Props {
  app: AppConfig;
  section?: 'privacy' | 'terms' | 'support';
}

const MasterlyLanding: React.FC<Props> = ({ app, section }) => {
  if (section) {
    return (
      <AppLayout app={app}>
        <div style={{ color: '#2D4F1E' }}>
          <LegalContent app={app} section={section} />
        </div>
      </AppLayout>
    );
  }

  return (
    <div className="min-h-screen font-handlee" style={{ backgroundColor: '#FDFBF7', color: '#2D4F1E' }}>
      <SEOBox
        title={app.seo.title}
        description={app.seo.description}
        keywords={app.seo.keywords}
        appId={app.id}
        appStoreUrl={app.appStoreUrl}
        appCategory="EducationApplication"
      />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md" style={{ backgroundColor: 'rgba(253,251,247,0.95)', borderBottom: '2px solid rgba(45,79,30,0.08)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity" style={{ color: '#2D4F1E' }}>
            <ChevronLeft size={16} />
            <span className="text-sm">All Apps</span>
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg overflow-hidden border-2" style={{ borderColor: 'rgba(45,79,30,0.2)' }}>
              <img src="/masterly.png" alt="Masterly" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-xl" style={{ color: '#2D4F1E' }}>Masterly AI</span>
          </Link>
          <a
            href={app.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-base px-5 py-2 rounded-2xl transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: '#2D4F1E', color: '#FDFBF7', boxShadow: '2px 3px 0px rgba(45,79,30,0.15)' }}
          >
            Download Free
          </a>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="pt-36 pb-20 px-6 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl text-sm font-bold mb-8" style={{ backgroundColor: 'rgba(233,180,76,0.15)', color: '#2D4F1E', border: '2px solid rgba(233,180,76,0.3)' }}>
                <Flame size={14} className="text-yellow-600" /> iOS · Study · Free
              </div>
              <h1 className="font-bold leading-snug mb-8" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', color: '#2D4F1E' }}>
                The AI Study App That Locks<br />
                Your Phone Until You Learn.
              </h1>
              <p className="text-xl leading-relaxed mb-10 max-w-lg" style={{ color: 'rgba(45,79,30,0.65)' }}>
                Upload your syllabus. Get a day-by-day plan to your exam. Flashcards, quizzes, and app blocking — all generated from your own notes.
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform active:scale-95">
                  <img src="/appstore.png" alt="Download on App Store" className="h-12" />
                </a>
                <span className="text-sm opacity-40">iOS Only</span>
              </div>
            </div>

            {/* Video */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative group" style={{ width: '260px' }}>
                <div className="absolute -inset-6 rounded-[50px] blur-3xl opacity-15 group-hover:opacity-25 transition-opacity duration-700" style={{ backgroundColor: '#2D4F1E' }} />
                <div className="relative rounded-[44px] overflow-hidden border-[4px] shadow-2xl" style={{ borderColor: '#2D4F1E', boxShadow: '6px 8px 0px rgba(45,79,30,0.12)' }}>
                  {app.marketing.videoHero ? (
                    <video src={app.marketing.videoHero} className="w-full" autoPlay loop muted playsInline style={{ aspectRatio: '9/19', objectFit: 'cover' }} />
                  ) : (
                    <img src="/masterly.png" alt="Masterly" className="w-full" style={{ aspectRatio: '9/19', objectFit: 'cover' }} />
                  )}
                </div>
                {/* Streak badge */}
                <div className="absolute -bottom-4 -right-4 rounded-2xl px-4 py-3 shadow-xl border-[3px]" style={{ backgroundColor: '#FDFBF7', borderColor: '#2D4F1E', boxShadow: '3px 4px 0px rgba(45,79,30,0.12)' }}>
                  <div className="font-bold text-3xl leading-none" style={{ color: '#E9B44C' }}>07</div>
                  <div className="text-xs mt-1 opacity-60" style={{ color: '#2D4F1E' }}>day streak</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pain points */}
        <section className="py-20 px-6" style={{ backgroundColor: '#2D4F1E' }}>
          <div className="max-w-6xl mx-auto">
            <p className="text-sm text-center mb-12" style={{ color: 'rgba(253,251,247,0.4)' }}>Does this sound familiar?</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { quote: '"I open Instagram to quickly check something and lose an hour."' },
                { quote: '"I don\'t know what to study or in what order. So I study nothing."' },
                { quote: '"The night before the exam, my notes still feel pointless."' },
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-[28px] border-[2px]" style={{ backgroundColor: 'rgba(253,251,247,0.04)', borderColor: 'rgba(233,180,76,0.2)' }}>
                  <p className="text-xl leading-relaxed" style={{ color: 'rgba(253,251,247,0.85)' }}>{item.quote}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-bold text-4xl md:text-5xl" style={{ color: '#2D4F1E' }}>Three steps. One habit.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { num: '01', icon: Upload, title: 'Upload your syllabus', desc: 'Drop in a PDF or paste your notes. Masterly reads your material — any subject, any format.' },
              { num: '02', icon: Calendar, title: 'Set your exam date', desc: 'AI builds a day-by-day study plan from today to your exam. You always know what to study next.' },
              { num: '03', icon: Lock, title: 'Study. Pass. Unlock.', desc: 'Each day: a lesson, flip flashcards, and a quiz — all from your notes. Pass the quiz. Your apps unlock.' },
            ].map(({ num, icon: Icon, title, desc }, i) => (
              <div key={i} className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center border-[3px] shadow-sm" style={{ backgroundColor: '#FDFBF7', borderColor: '#2D4F1E', boxShadow: '2px 3px 0px rgba(45,79,30,0.1)' }}>
                  <Icon size={22} style={{ color: '#E9B44C' }} />
                </div>
                <div>
                  <div className="text-sm mb-1 opacity-40" style={{ color: '#2D4F1E' }}>{num}</div>
                  <h3 className="font-bold text-xl mb-3" style={{ color: '#2D4F1E' }}>{title}</h3>
                  <p className="text-lg leading-relaxed" style={{ color: 'rgba(45,79,30,0.6)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature deep-dive */}
        <section className="py-24 px-6" style={{ backgroundColor: 'rgba(45,79,30,0.03)', borderTop: '2px solid rgba(45,79,30,0.06)' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-bold text-4xl md:text-5xl" style={{ color: '#2D4F1E' }}>Built around one goal: you actually learn.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: BookOpen,
                  label: 'AI Study Plan',
                  pain: 'You never know what to study next.',
                  fix: 'Upload your syllabus, set your exam date. Masterly AI breaks it into day-by-day topics — perfectly paced so nothing is left for the last night.',
                },
                {
                  icon: Zap,
                  label: 'Flashcards + Quiz',
                  pain: 'You re-read notes but can\'t tell if anything stuck.',
                  fix: 'Every day generates flip flashcards and a multiple-choice quiz directly from your own material. Active recall, not passive reading.',
                },
                {
                  icon: Lock,
                  label: 'App Blocker Gate',
                  pain: 'Willpower isn\'t enough. Apps are engineered to win.',
                  fix: 'iOS Screen Time locks your chosen apps during your study window. The only key: pass today\'s quiz. No bypass. No excuses.',
                },
                {
                  icon: Flame,
                  label: 'Streak System',
                  pain: 'You study hard for two days then lose the habit.',
                  fix: 'Your streak tracks consecutive days of completed sessions. Break it once and you feel it. That\'s the point.',
                },
              ].map(({ icon: Icon, label, pain, fix }, i) => (
                <div key={i} className="p-8 rounded-[28px] border-[2px] hover:-translate-y-1 transition-all duration-300" style={{ backgroundColor: '#FDFBF7', borderColor: 'rgba(45,79,30,0.12)', boxShadow: '0 4px 24px rgba(45,79,30,0.05)' }}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(45,79,30,0.08)' }}>
                      <Icon size={20} style={{ color: '#2D4F1E' }} />
                    </div>
                    <span className="font-bold text-xl" style={{ color: '#2D4F1E' }}>{label}</span>
                  </div>
                  <p className="text-sm mb-4 p-3 rounded-xl" style={{ color: '#A44231', backgroundColor: 'rgba(164,66,49,0.06)', border: '1.5px solid rgba(164,66,49,0.12)' }}>
                    ✗ {pain}
                  </p>
                  <p className="text-lg leading-relaxed" style={{ color: 'rgba(45,79,30,0.7)' }}>
                    {fix}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Multiple subjects */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <div className="rounded-[36px] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12" style={{ backgroundColor: '#2D4F1E' }}>
            <div className="flex-1">
              <h2 className="font-bold text-4xl mb-6" style={{ color: '#FDFBF7' }}>
                Exam season doesn't come one subject at a time.
              </h2>
              <p className="text-xl leading-relaxed mb-8" style={{ color: 'rgba(253,251,247,0.6)' }}>
                Manage multiple subjects simultaneously. Each gets its own study plan, daily session, and streak. Switch between them from the dashboard.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Physics', 'History', 'Calculus', 'Biology', '+ any subject'].map(sub => (
                  <span key={sub} className="text-sm px-4 py-2 rounded-xl font-bold" style={{ backgroundColor: 'rgba(233,180,76,0.15)', color: '#E9B44C', border: '1.5px solid rgba(233,180,76,0.25)' }}>{sub}</span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 flex flex-col gap-3" style={{ width: '200px' }}>
              {[
                { name: 'Physics', streak: 12, status: 'Unlocked' },
                { name: 'History', streak: 5, status: 'Quiz due' },
                { name: 'Calculus', streak: 8, status: 'Unlocked' },
              ].map(({ name, streak, status }) => (
                <div key={name} className="flex items-center justify-between px-4 py-3 rounded-2xl" style={{ backgroundColor: 'rgba(253,251,247,0.06)', border: '1.5px solid rgba(253,251,247,0.1)' }}>
                  <div>
                    <div className="font-bold text-base" style={{ color: '#FDFBF7' }}>{name}</div>
                    <div className="text-xs" style={{ color: status === 'Unlocked' ? '#E9B44C' : 'rgba(253,251,247,0.4)' }}>{status}</div>
                  </div>
                  <div className="font-bold text-xl" style={{ color: '#E9B44C' }}>{streak}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6 text-center border-t-[2px]" style={{ borderColor: 'rgba(45,79,30,0.08)' }}>
          <h2 className="font-bold text-5xl md:text-6xl mb-8" style={{ color: '#2D4F1E' }}>
            Download free.<br />Your exam won't wait.
          </h2>
          <p className="text-2xl mb-12 max-w-md mx-auto" style={{ color: 'rgba(45,79,30,0.5)' }}>
            Stop planning to study. Start proving you can.
          </p>
          <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-block hover:scale-105 transition-transform active:scale-95">
            <img src="/appstore.png" alt="Download on App Store" className="h-14" />
          </a>
        </section>

        {/* Footer */}
        <footer className="py-10 px-6 border-t-[2px]" style={{ borderColor: 'rgba(45,79,30,0.08)' }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 hover:opacity-100 transition-opacity text-sm" style={{ color: '#2D4F1E' }}>
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
