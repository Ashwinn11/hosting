import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Camera, Shield, Hexagon } from 'lucide-react';
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

const BG      = '#F4F1EB';
const PAPER2  = '#EDE9DF';
const INK     = '#16140f';
const INK2    = 'rgba(22,20,15,0.55)';
const INK3    = 'rgba(22,20,15,0.35)';
const HONEY   = '#FBB152';
const HONEY_D = '#e89a35';
const BORDER  = 'rgba(22,20,15,0.10)';
const CARD    = '#FDFAF5';
const HEADING = '"Fraunces", "Georgia", serif';
const BODY    = '"Hanken Grotesk", "Inter", system-ui, sans-serif';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700&family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap');
  @keyframes hh-marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .hh-marquee { display: flex; width: max-content; animation: hh-marquee 30s linear infinite; }
  .hh-marquee:hover { animation-play-state: paused; }
  @keyframes hexFloat {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    50%     { transform: translateY(-8px) rotate(3deg); }
  }
  .hh-hex-float { animation: hexFloat 4s ease-in-out infinite; }
  .hh-cta { transition: background 0.15s, transform 0.15s; }
  .hh-cta:hover { background: #e89a35 !important; transform: scale(1.03); }
  .hh-nav-cta { transition: background 0.15s; }
  .hh-nav-cta:hover { background: ${HONEY_D} !important; }
  .hh-faq-item summary { cursor: pointer; list-style: none; }
  .hh-faq-item summary::-webkit-details-marker { display: none; }
  .hh-ss-scroll { display: flex; gap: 14px; overflow-x: auto; padding-bottom: 24px; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; scrollbar-width: none; padding-left: 24px; }
  .hh-ss-scroll::-webkit-scrollbar { display: none; }
  .hh-feature-card { transition: transform 0.2s, box-shadow 0.2s; }
  .hh-feature-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(22,20,15,0.10) !important; }
  @media (max-width: 768px) {
    .hh-hero-grid { flex-direction: column !important; }
    .hh-hero-copy { max-width: 100% !important; }
    .hh-how-grid { flex-direction: column !important; }
    .hh-features-grid { grid-template-columns: 1fr !important; }
  }
`;

// SVG honeycomb hex shape as a simple clip/fill
const HexShape: React.FC<{ size: number; fill: string; opacity?: number }> = ({ size, fill, opacity = 1 }) => (
  <svg width={size} height={size * 1.1547} viewBox="0 0 100 115.47" style={{ display: 'block', opacity }}>
    <polygon points="50,2 98,27.5 98,87.97 50,113.47 2,87.97 2,27.5" fill={fill} />
  </svg>
);

const HabitHiveLanding: React.FC<Props> = ({ app, section }) => {
  if (section) {
    return (
      <AppLayout app={app}>
        <div style={{ color: INK, fontFamily: BODY }}>
          <LegalContent app={app} section={section} />
        </div>
      </AppLayout>
    );
  }

  return (
    <div style={{ backgroundColor: BG, color: INK, fontFamily: BODY, minHeight: '100vh' }}>
      <style>{css}</style>
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

      {/* ── NAV ── */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, backdropFilter: 'blur(14px)', backgroundColor: 'rgba(244,241,235,0.92)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 5, color: INK3, textDecoration: 'none', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = INK)}
            onMouseLeave={e => (e.currentTarget.style.color = INK3)}
          >
            <ChevronLeft size={14} /> All Apps
          </Link>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, overflow: 'hidden', border: `1px solid ${BORDER}` }}>
              <img src="/habithive.png" alt="Habit Hive" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span style={{ fontFamily: HEADING, fontWeight: 600, fontSize: 17, color: INK }}>Habit Hive</span>
          </Link>
          <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer"
            className="hh-nav-cta"
            style={{ backgroundColor: HONEY, color: INK, fontFamily: BODY, fontWeight: 700, fontSize: 13, padding: '8px 18px', borderRadius: 12, textDecoration: 'none', letterSpacing: '-0.01em' }}
          >
            Download
          </a>
        </div>
      </nav>

      <main style={{ paddingTop: 60 }}>

        {/* ── HERO ── */}
        <section style={{ padding: '80px 24px 64px' }}>
          <div className="hh-hero-grid" style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', gap: 56, alignItems: 'center', justifyContent: 'space-between' }}>

            {/* Copy */}
            <div className="hh-hero-copy" style={{ flex: '1 1 340px', maxWidth: 540 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 14px', borderRadius: 24, backgroundColor: `${HONEY}22`, border: `1px solid ${HONEY}44`, width: 'fit-content' }}>
                  <span style={{ fontSize: 13 }}>🐝</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#7a5a10', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Photo · App Blocking · Streak Hive</span>
                </div>
              </div>
              <h1 style={{ fontFamily: HEADING, fontSize: 'clamp(2.4rem,4.5vw,3.8rem)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em', color: INK, marginBottom: 18 }}>
                Your apps stay<br />locked until<br />you log it.
              </h1>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: INK2, marginBottom: 36 }}>
                Habit Hive blocks Instagram, TikTok, and any app you choose until you photograph today's habit. No willpower needed — just do the thing, unlock your phone, and watch your honeycomb grow.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
                <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" style={{ transition: 'transform 0.15s', display: 'inline-block' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                >
                  <img src="/appstore.png" alt="Download on the App Store" style={{ height: 46 }} />
                </a>
                <span style={{ fontSize: 11, fontWeight: 600, color: INK3, padding: '5px 12px', backgroundColor: PAPER2, borderRadius: 14, display: 'inline-block', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Free trial · iOS 16+ · iPhone
                </span>
              </div>
            </div>

            {/* Honeycomb visual */}
            <div style={{ flex: '0 0 auto', position: 'relative' }}>
              <div style={{ position: 'relative', width: 260 }}>
                {/* Main screenshot */}
                <div style={{ width: 200, borderRadius: 28, overflow: 'hidden', boxShadow: `0 24px 64px rgba(22,20,15,0.14), 0 4px 16px ${HONEY}44`, border: `1px solid ${BORDER}`, margin: '0 auto' }}>
                  <img src="/habithive/01.png" alt="Habit Hive App" style={{ width: '100%', display: 'block' }} />
                </div>
                {/* Floating hex decoration */}
                <div className="hh-hex-float" style={{ position: 'absolute', top: -20, right: -10, opacity: 0.85 }}>
                  <HexShape size={52} fill={HONEY} />
                </div>
                <div style={{ position: 'absolute', bottom: 40, left: -24, opacity: 0.45 }}>
                  <HexShape size={36} fill={HONEY} />
                </div>
                <div style={{ position: 'absolute', bottom: 0, right: -18, opacity: 0.25 }}>
                  <HexShape size={28} fill={INK} />
                </div>
                {/* Streak badge */}
                <div style={{ position: 'absolute', bottom: 60, right: -30, backgroundColor: CARD, borderRadius: 14, padding: '8px 14px', border: `1px solid ${BORDER}`, boxShadow: '0 6px 20px rgba(22,20,15,0.08)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 18 }}>🔥</span>
                  <div>
                    <p style={{ fontFamily: BODY, fontWeight: 800, fontSize: 14, color: INK, lineHeight: 1 }}>21</p>
                    <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 9, color: INK3, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>day streak</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST STRIP ── */}
        <div style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, backgroundColor: PAPER2 }}>
          <div style={{ maxWidth: 1080, margin: '0 auto', padding: '14px 24px', textAlign: 'center' }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: INK3 }}>
              Photo proof logging &nbsp;·&nbsp; iOS Screen Time blocking &nbsp;·&nbsp; Honeycomb streak hive &nbsp;·&nbsp; No account needed &nbsp;·&nbsp; 100% on-device
            </p>
          </div>
        </div>

        {/* ── SCREENSHOTS ── */}
        <section style={{ padding: '72px 0', backgroundColor: BG }}>
          <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px', marginBottom: 36 }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: INK3, marginBottom: 10 }}>See it in action</p>
            <h2 style={{ fontFamily: HEADING, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 600, color: INK, lineHeight: 1.1 }}>Built around the habit, not the app.</h2>
          </div>
          <div className="hh-ss-scroll">
            {(app.marketing.screenshots || []).map((src, i) => (
              <div key={i} style={{ flexShrink: 0, scrollSnapAlign: 'start' }}>
                <div style={{ width: 220, borderRadius: 22, overflow: 'hidden', border: `1px solid ${BORDER}`, boxShadow: '0 8px 28px rgba(22,20,15,0.08)' }}>
                  <img src={src} alt={`Habit Hive Screenshot ${i + 1}`} style={{ width: '100%', display: 'block' }} loading="lazy" />
                </div>
              </div>
            ))}
            <div style={{ flexShrink: 0, width: 24 }} />
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{ padding: '80px 24px', backgroundColor: PAPER2 }}>
          <div style={{ maxWidth: 1080, margin: '0 auto', textAlign: 'center', marginBottom: 52 }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: INK3, marginBottom: 12 }}>Simple by design</p>
            <h2 style={{ fontFamily: HEADING, fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 600, color: INK, lineHeight: 1.1 }}>Three steps to a habit that sticks.</h2>
          </div>
          <div className="hh-how-grid" style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 0 }}>
            {[
              { num: '01', icon: '🐝', heading: 'Create a habit hive', body: 'Name your habit, pick a time window, and choose which apps to block. Takes 30 seconds.' },
              { num: '02', icon: '📸', heading: 'Log it with a photo', body: 'Take a photo as proof you showed up today. Your chosen apps stay locked until you do.' },
              { num: '03', icon: '🍯', heading: 'Watch your hive grow', body: 'Every logged day fills a hex. Your honeycomb builds over time — a visual record of every day you showed up.' },
            ].map(({ num, icon, heading, body }, i) => (
              <div key={i} style={{ flex: '1 1 0', padding: '32px 28px', borderLeft: i > 0 ? `1px solid ${BORDER}` : 'none', textAlign: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16, backgroundColor: `${HONEY}22`, border: `1px solid ${HONEY}44`, margin: '0 auto 16px' }}>
                  {icon}
                </div>
                <p style={{ fontFamily: BODY, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: HONEY, marginBottom: 10 }}>{num}</p>
                <h3 style={{ fontFamily: HEADING, fontWeight: 600, fontSize: 19, color: INK, marginBottom: 10, lineHeight: 1.2 }}>{heading}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: INK2 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── HONEY MARQUEE ── */}
        <div style={{ backgroundColor: HONEY, overflow: 'hidden', padding: '11px 0' }}>
          <div className="hh-marquee">
            {[1, 2].map(rep => (
              <span key={rep} style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(22,20,15,0.65)', whiteSpace: 'nowrap', paddingRight: 56 }}>
                Photo Proof &nbsp;·&nbsp; App Blocking &nbsp;·&nbsp; Streak Hive &nbsp;·&nbsp; Screen Time &nbsp;·&nbsp; Daily Habit &nbsp;·&nbsp; No Login &nbsp;·&nbsp; 100% On-Device &nbsp;·&nbsp; Honeycomb &nbsp;·&nbsp; Accountability &nbsp;·&nbsp; Build Discipline &nbsp;·&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* ── FEATURES ── */}
        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto', textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: INK3, marginBottom: 12 }}>Everything you need</p>
            <h2 style={{ fontFamily: HEADING, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 600, color: INK }}>Built for people who keep failing the easy part.</h2>
          </div>
          <div className="hh-features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, maxWidth: 1080, margin: '0 auto' }}>
            {[
              { Icon: Camera, label: 'Photo logging', color: '#c7742c', bg: '#FBE4C0', headline: 'Proof over promises', body: 'A checkbox is easy to fake. A photo isn\'t. Log your habit with a real photo every day — it becomes a visual archive of every time you showed up.' },
              { Icon: Shield, label: 'App blocking', color: '#D2683E', bg: '#FBE0D6', headline: 'Your phone works for you', body: 'Choose Instagram, TikTok, YouTube — any app. They stay locked via iOS Screen Time until you log your photo. No hacks, no third-party spyware — just Apple\'s own framework.' },
              { Icon: Hexagon, label: 'Honeycomb hive', color: '#7a5a10', bg: `${HONEY}33`, headline: 'A streak you can see', body: 'Every logged day fills a hex in your honeycomb. The hive grows ring by ring. Miss a day and it pauses at your last checkpoint — a kinder approach that keeps you coming back.' },
            ].map(({ Icon, label, color, bg, headline, body }, i) => (
              <div key={i} className="hh-feature-card" style={{ backgroundColor: CARD, borderRadius: 20, padding: '28px 24px', border: `1px solid ${BORDER}`, boxShadow: '0 4px 16px rgba(22,20,15,0.05)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={20} color={color} />
                </div>
                <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color, marginBottom: 8 }}>{label}</p>
                <h3 style={{ fontFamily: HEADING, fontWeight: 600, fontSize: 18, color: INK, marginBottom: 10, lineHeight: 1.2 }}>{headline}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: INK2 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── BLOCKING DETAIL ── */}
        <section style={{ padding: '72px 24px', backgroundColor: PAPER2, borderTop: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
            <span style={{ fontSize: 32, display: 'block', marginBottom: 20 }}>🔒</span>
            <h2 style={{ fontFamily: HEADING, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 600, color: INK, lineHeight: 1.2, marginBottom: 20 }}>
              Real blocking.<br />Not just reminders.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: INK2, maxWidth: 560, margin: '0 auto 40px' }}>
              Habit Hive uses Apple's own Screen Time framework — the same system parents use to manage kids' devices. The apps you choose are truly locked at the OS level. No workarounds. No VPNs. No battery drain.
            </p>
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {['Instagram', 'TikTok', 'YouTube', 'Twitter / X', 'Reddit', 'Snapchat', 'Games', 'Any App'].map(app => (
                <span key={app} style={{ padding: '6px 14px', borderRadius: 20, backgroundColor: CARD, border: `1px solid ${BORDER}`, fontSize: 12, fontWeight: 600, color: INK2 }}>
                  {app}
                </span>
              ))}
            </div>
          </div>
        </section>

        <Testimonials
          items={app.testimonials}
          rating={app.aggregateRating}
          theme={{ primary: HONEY_D, bg: BG, ink: INK, card: CARD, border: BORDER, heading: HEADING }}
        />

        <CompareStrip
          items={app.comparisonHighlights}
          appName={app.name}
          theme={{ primary: HONEY_D, bg: PAPER2, ink: INK, card: CARD, border: BORDER, heading: HEADING }}
        />

        {/* ── CTA SECTION ── */}
        <section style={{ padding: '80px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>🍯</div>
            <h2 style={{ fontFamily: HEADING, fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, color: INK, lineHeight: 1.1, marginBottom: 16 }}>
              Your hive won't build itself.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: INK2, marginBottom: 36 }}>
              Start your first habit today. Log a photo, lock your apps, fill a hex. Repeat.
            </p>
            <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', transition: 'transform 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
            >
              <img src="/appstore.png" alt="Download on the App Store" style={{ height: 50 }} />
            </a>
            <p style={{ marginTop: 14, fontSize: 12, color: INK3, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Free trial · No account · iPhone only</p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ padding: '72px 24px', backgroundColor: PAPER2, borderTop: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <h2 style={{ fontFamily: HEADING, fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 600, color: INK, marginBottom: 36 }}>Common questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {(app.marketing.faqs || []).map((faq, i) => (
                <details key={i} className="hh-faq-item" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 0 }}>
                  <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', gap: 16 }}>
                    <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: 15, color: INK, lineHeight: 1.4 }}>{faq.question}</span>
                    <span style={{ flexShrink: 0, color: HONEY, fontSize: 20, fontWeight: 300 }}>+</span>
                  </summary>
                  <p style={{ padding: '0 0 20px', fontSize: 14, lineHeight: 1.7, color: INK2 }}>{faq.answer}</p>
                </details>
              ))}
              <div style={{ borderTop: `1px solid ${BORDER}` }} />
            </div>
          </div>
        </section>

        {/* Guides & Comparisons (dynamic — links every Habit Hive pSEO page) */}
        <div style={{ backgroundColor: BG, borderTop: `1px solid ${BORDER}` }}>
          <GuidesGrid app={app} heading="Habit & Focus Guides" />
        </div>

        <FounderNote
          appName={app.name}
          theme={{ primary: HONEY_D, bg: PAPER2, ink: INK, card: CARD, border: BORDER, heading: HEADING }}
        />

        {/* ── FOOTER ── */}
        <footer style={{ padding: '40px 24px', borderTop: `1px solid ${BORDER}`, backgroundColor: BG }}>
          <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, overflow: 'hidden', border: `1px solid ${BORDER}` }}>
                <img src="/habithive.png" alt="Habit Hive" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontFamily: HEADING, fontWeight: 600, fontSize: 15, color: INK }}>Habit Hive</span>
              <span style={{ fontSize: 11, color: INK3 }}>© 2026</span>
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[
                { label: 'Privacy Policy', to: `/${app.id}/privacy-policy` },
                { label: 'Terms of Use', to: `/${app.id}/terms-of-service` },
                { label: 'Support', to: `/${app.id}/support` },
              ].map(({ label, to }) => (
                <Link key={to} to={to} style={{ fontSize: 13, color: INK3, textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = INK)}
                  onMouseLeave={e => (e.currentTarget.style.color = INK3)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default HabitHiveLanding;
