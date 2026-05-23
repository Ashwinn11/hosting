import React from 'react';
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

const PURPLE = '#594CF2';
const DARK = '#0D051E';
const SURFACE = '#111827';
const BORDER = 'rgba(89,76,242,0.2)';
const DIM = 'rgba(255,255,255,0.45)';

const HonestlyLanding: React.FC<Props> = ({ app, section }) => {
  if (section) {
    return (
      <AppLayout app={app}>
        <LegalContent app={app} section={section} />
      </AppLayout>
    );
  }

  return (
    <div className="min-h-screen font-playfair" style={{ backgroundColor: DARK, color: '#fff' }}>
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
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md" style={{ backgroundColor: 'rgba(13,5,30,0.92)', borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity" style={{ color: '#a89cf5' }}>
            <ChevronLeft size={15} />
            <span className="font-sans text-xs font-mono uppercase tracking-widest">All Apps</span>
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl overflow-hidden border" style={{ borderColor: BORDER }}>
              <img src="/morningjournal.png" alt="Honestly" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-base text-white">Honestly</span>
          </Link>
          <a
            href={app.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans font-bold text-sm px-5 py-2 rounded-full text-white transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: PURPLE, boxShadow: `0 0 20px ${PURPLE}50` }}
          >
            Download Free
          </a>
        </div>
      </nav>

      <main>
        {/* ── HERO ── */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden pt-16">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 30%, rgba(89,76,242,0.18) 0%, transparent 65%)`,
          }} />
          {/* Mesh bg */}
          <div className="absolute inset-0 pointer-events-none opacity-30" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(89,76,242,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(120,100,220,0.1) 0%, transparent 50%)`,
          }} />

          <div className="relative z-10 max-w-3xl">
            {/* Time display */}
            <div className="relative inline-block mb-6">
              <div
                className="font-light text-white leading-none"
                style={{
                  fontSize: 'clamp(4.5rem, 16vw, 10rem)',
                  fontFamily: '"Playfair Display", Georgia, serif',
                  letterSpacing: '-0.02em',
                  textShadow: `0 0 80px rgba(89,76,242,0.5), 0 0 40px rgba(89,76,242,0.3)`,
                }}
              >
                6:47 AM
              </div>
            </div>

            <h1
              className="font-bold leading-snug mb-6 text-white"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Your morning doesn't have to start<br className="hidden md:block" /> with someone else's content.
            </h1>
            <p className="text-xl leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: DIM, fontFamily: 'system-ui, sans-serif' }}>
              A 4-step ritual that takes 5 minutes and changes how your whole day feels.
            </p>
            <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-block hover:scale-105 transition-transform active:scale-95">
              <img src="/appstore.png" alt="Download on App Store" className="h-13 mx-auto" style={{ height: '52px' }} />
            </a>
            <p className="font-sans font-mono text-xs uppercase tracking-widest mt-4" style={{ color: 'rgba(255,255,255,0.2)' }}>iOS · Free</p>
          </div>
        </section>

        {/* ── THE RITUAL ── */}
        <section style={{ borderTop: `1px solid ${BORDER}` }}>
          <div className="max-w-6xl mx-auto px-6 py-16">
            <p className="font-sans font-mono text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: DIM }}>The morning ritual</p>
            <h2 className="font-bold text-3xl mb-0" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>Four steps. Five minutes.</h2>
          </div>

          {[
            {
              num: '01',
              name: 'Mood',
              desc: 'How are you actually feeling?',
              tint: 'rgba(89,76,242,0.05)',
            },
            {
              num: '02',
              name: 'Journal',
              desc: '3 minutes. No judgment. No audience.',
              tint: 'rgba(89,76,242,0.08)',
            },
            {
              num: '03',
              name: 'Three Big Wins',
              desc: 'What will you actually do today that matters?',
              tint: 'rgba(89,76,242,0.12)',
            },
            {
              num: '04',
              name: 'Gratitude',
              desc: 'Before you open a single app.',
              tint: 'rgba(89,76,242,0.17)',
            },
          ].map(({ num, name, desc, tint }, i) => (
            <div
              key={i}
              className="px-6 py-10 md:py-12"
              style={{
                backgroundColor: tint,
                borderTop: `1px solid ${BORDER}`,
              }}
            >
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-4 md:gap-16">
                {/* Number */}
                <div
                  className="flex-shrink-0 font-light"
                  style={{
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    color: `${PURPLE}`,
                    fontFamily: '"Playfair Display", Georgia, serif',
                    lineHeight: 1,
                    opacity: 0.7,
                  }}
                >
                  {num}
                </div>
                {/* Name */}
                <div className="flex-1">
                  <h3
                    className="font-bold text-white"
                    style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontFamily: '"Playfair Display", Georgia, serif' }}
                  >
                    {name}
                  </h3>
                </div>
                {/* Desc */}
                <div className="md:max-w-xs">
                  <p className="text-lg leading-relaxed" style={{ color: DIM, fontFamily: 'system-ui, sans-serif' }}>{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ── WIDGET SHOWCASE ── */}
        <section className="py-24 px-6" style={{ backgroundColor: SURFACE, borderTop: `1px solid ${BORDER}` }}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <p className="font-sans font-mono text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: DIM }}>Home screen widgets</p>
              <h2 className="font-bold text-3xl md:text-4xl mb-6 leading-snug" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                Your wins.<br />On your home screen.
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: DIM, fontFamily: 'system-ui, sans-serif' }}>
                Honestly places interactive widgets on your iPhone home screen so your Big Wins and streak are visible the moment you pick up your phone — not buried inside an app.
              </p>
              <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-block hover:scale-105 transition-transform active:scale-95">
                <img src="/appstore.png" alt="Download on App Store" className="h-11" />
              </a>
            </div>

            {/* Right: iPhone mockup */}
            <div className="flex justify-center">
              <div
                className="relative"
                style={{
                  width: '220px',
                  height: '440px',
                  borderRadius: '40px',
                  backgroundColor: '#0a0a1a',
                  border: `2px solid rgba(255,255,255,0.1)`,
                  boxShadow: `0 0 60px ${PURPLE}30, 0 24px 60px rgba(0,0,0,0.5)`,
                  padding: '24px 16px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full" style={{ backgroundColor: '#000' }} />

                {/* Widget 1: Big Wins */}
                <div
                  className="rounded-[20px] p-4 mt-4"
                  style={{ backgroundColor: `rgba(89,76,242,0.2)`, border: `1px solid ${BORDER}` }}
                >
                  <p className="font-sans font-mono text-[9px] uppercase tracking-widest mb-3" style={{ color: `${PURPLE}cc` }}>3 Big Wins</p>
                  {['Ship the landing page', 'Gym at 7am', 'Read 20 pages'].map((win, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <div className="w-3.5 h-3.5 rounded-full border flex-shrink-0 flex items-center justify-center" style={{ borderColor: PURPLE, backgroundColor: i === 0 ? PURPLE : 'transparent' }}>
                        {i === 0 && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="font-sans text-[10px]" style={{ color: i === 0 ? DIM : 'rgba(255,255,255,0.7)', textDecoration: i === 0 ? 'line-through' : 'none' }}>{win}</span>
                    </div>
                  ))}
                </div>

                {/* Widget 2: Streak */}
                <div
                  className="rounded-[20px] p-4 flex items-center gap-3"
                  style={{ backgroundColor: `rgba(89,76,242,0.12)`, border: `1px solid ${BORDER}` }}
                >
                  <span className="text-2xl">🔥</span>
                  <div>
                    <p className="font-bold text-white text-2xl leading-none">7</p>
                    <p className="font-sans font-mono text-[9px] uppercase tracking-widest mt-1" style={{ color: DIM }}>day streak</p>
                  </div>
                </div>

                {/* App grid placeholder */}
                <div className="grid grid-cols-4 gap-2 mt-auto">
                  {['#FF3B30', '#1877F2', '#FF9500', '#34C759'].map((color, i) => (
                    <div key={i} className="aspect-square rounded-[10px]" style={{ backgroundColor: `${color}30`, border: `1px solid ${color}40` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── APP BLOCKER ── */}
        <section className="py-24 px-6" style={{ borderTop: `1px solid ${BORDER}` }}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <div>
              <h2 className="font-bold text-3xl md:text-4xl mb-6 leading-snug" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                Apps stay locked<br />until you finish.
              </h2>
              <p className="text-lg leading-relaxed mb-4" style={{ color: DIM, fontFamily: 'system-ui, sans-serif' }}>
                Honestly uses iOS Screen Time to keep your chosen distracting apps locked until you complete your 4-step morning ritual.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'system-ui, sans-serif' }}>
                Not willpower. Not a timer. A gate.
              </p>
            </div>

            {/* Right: locked app icons */}
            <div className="flex flex-col items-center gap-6">
              <div className="grid grid-cols-4 gap-4">
                {[
                  { color: '#FF3B30' },
                  { color: '#1877F2' },
                  { color: '#FF2D55' },
                  { color: '#FF9500' },
                ].map(({ color }, i) => (
                  <div key={i} className="relative">
                    <div
                      className="w-16 h-16 rounded-[18px] flex items-center justify-center"
                      style={{
                        backgroundColor: `${color}18`,
                        border: `1.5px solid ${color}30`,
                        filter: 'blur(0.5px)',
                        opacity: 0.5,
                      }}
                    >
                      <div className="w-8 h-8 rounded-xl" style={{ backgroundColor: `${color}50` }} />
                    </div>
                    <div
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: DARK, border: `1px solid ${BORDER}` }}
                    >
                      <Lock size={9} style={{ color: PURPLE }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-sans font-mono text-xs uppercase tracking-widest text-center" style={{ color: DIM }}>
                Complete ritual to unlock →
              </p>
            </div>
          </div>
        </section>

        {/* ── ICLOUD SYNC CALLOUT ── */}
        <section className="py-10 px-6 text-center" style={{ borderTop: `1px solid ${BORDER}` }}>
          <p className="text-sm max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'system-ui, sans-serif' }}>
            Journal entries, streaks, and widgets sync across all your Apple devices via iCloud.
          </p>
        </section>

        {/* ── CTA ── */}
        <section className="py-32 px-6 text-center relative overflow-hidden" style={{ borderTop: `1px solid ${BORDER}` }}>
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `radial-gradient(ellipse 80% 70% at 50% 100%, rgba(89,76,242,0.2) 0%, transparent 65%)`,
          }} />
          <div className="relative z-10">
            <h2
              className="font-bold text-white mb-6 leading-snug"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Start tomorrow morning.
            </h2>
            <p className="text-lg mb-10 max-w-xs mx-auto" style={{ color: DIM, fontFamily: 'system-ui, sans-serif' }}>
              Five minutes. Before the scroll. Before the noise.
            </p>
            <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-block hover:scale-105 transition-transform active:scale-95">
              <img src="/appstore.png" alt="Download on App Store" className="h-14 mx-auto" />
            </a>
            <p className="font-sans font-mono text-xs uppercase tracking-widest mt-5" style={{ color: 'rgba(255,255,255,0.2)' }}>Free on iPhone</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 px-6" style={{ borderTop: `1px solid ${BORDER}` }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 opacity-30 hover:opacity-100 transition-opacity">
            <div className="flex gap-8 font-sans font-mono text-xs uppercase tracking-widest font-bold text-white">
              <Link to="/morningjournal/privacy-policy" className="hover:opacity-60 transition-opacity">Privacy</Link>
              <Link to="/morningjournal/terms-of-service" className="hover:opacity-60 transition-opacity">Terms</Link>
              <Link to="/morningjournal/support" className="hover:opacity-60 transition-opacity">Support</Link>
            </div>
            <p className="font-sans font-mono text-xs uppercase tracking-widest text-white">© 2026 Ashwin Anbazhagan // briefly.live</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default HonestlyLanding;
