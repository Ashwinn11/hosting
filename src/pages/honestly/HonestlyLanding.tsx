import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import type { AppConfig } from '../../config/apps';
import { findPseoPage } from '../../config/pseo';
import SEOBox from '../../components/SEOBox';
import AppLayout from '../../components/AppLayout';
import GuidesGrid from '../../components/GuidesGrid';
import LegalContent from '../LegalContent';
import MonthBook from './MonthBook';

interface Props {
  app: AppConfig;
  section?: 'privacy' | 'terms' | 'support';
}

// One offer, one audience, one action: a free morning journal that keeps your apps asleep until
// you've written — download it. Colours and type are the app's own (Shared/Palette.swift, Manrope).
const T = {
  paper: '#FAF8F5',
  cream: '#FFFDF8',
  ink: '#33261A',
  inkSoft: '#6F604C',
  inkSofter: '#A2937B',
  line: 'rgba(51,38,26,0.14)',
  amber: '#F5851F',
  amberDeep: '#A9510F',
  sun: '#F7B23C',
  selected: '#FFF1DC',
};
const SANS = 'Manrope, system-ui, -apple-system, sans-serif';
const SERIF = '"Libre Baskerville", Baskerville, Georgia, serif';

const css = `
  .hl { background: ${T.paper}; color: ${T.ink}; font-family: ${SANS}; }
  .hl * { box-sizing: border-box; }
  .hl-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
  .hl-eyebrow { font-size: 12px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; color: ${T.amberDeep}; }
  .hl-h2 { font-size: clamp(1.8rem, 3.6vw, 2.6rem); font-weight: 800; line-height: 1.15; letter-spacing: -.02em; margin: 10px 0 14px; text-wrap: balance; }
  .hl-body { font-size: 17px; line-height: 1.65; color: ${T.inkSoft}; max-width: 34em; }
  .hl-section { padding: 96px 0; border-top: 1px solid ${T.line}; }
  .hl-hero { display: grid; grid-template-columns: 1.05fr .95fr; gap: 48px; align-items: center; padding: 120px 0 88px; }
  .hl-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 40px; }
  .hl-benefit { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
  .hl-benefit + .hl-benefit { margin-top: 96px; }
  .hl-benefit.flip .hl-benefit-visual { order: -1; }
  .hl-benefit-visual { display: flex; justify-content: center; }
  .hl-reviews { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 36px; }
  .hl-plans { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 36px; }
  .hl-card { background: ${T.cream}; border: 1.5px solid ${T.line}; border-radius: 22px; }
  .hl-shot { width: 100%; max-width: 270px; aspect-ratio: 1320 / 2868; border-radius: 26px; overflow: hidden;
    border: 1.5px solid ${T.line}; box-shadow: 0 18px 40px rgba(120,80,30,.16); background: ${T.cream}; }
  .hl-shot img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .hl-press { transition: transform .18s cubic-bezier(.3,1.2,.4,1), box-shadow .18s; }
  .hl-press:active { transform: translateY(3px); box-shadow: 0 1px 0 ${T.ink} !important; }
  .hl-faq summary { list-style: none; cursor: pointer; display: flex; justify-content: space-between; gap: 16px;
    font-weight: 800; font-size: 17px; padding: 20px 0; }
  .hl-faq summary::-webkit-details-marker { display: none; }
  .hl-faq summary::after { content: '+'; font-weight: 700; color: ${T.amberDeep}; font-size: 22px; line-height: 1; }
  .hl-faq details[open] summary::after { content: '–'; }
  .hl-faq details { border-bottom: 1px solid ${T.line}; }
  .hl a:focus-visible, .hl summary:focus-visible { outline: 2px solid ${T.amber}; outline-offset: 3px; border-radius: 6px; }
  @media (max-width: 880px) {
    .hl-hero, .hl-benefit, .hl-reviews, .hl-plans { grid-template-columns: 1fr; }
    .hl-hero { padding-top: 104px; text-align: center; }
    .hl-hero .hl-body { margin-left: auto; margin-right: auto; }
    .hl-hero-cta { justify-content: center; }
    .hl-benefit.flip .hl-benefit-visual { order: 0; }
    .hl-steps { grid-template-columns: 1fr; }
    .hl-section { padding: 72px 0; }
  }
  @media (prefers-reduced-motion: reduce) { .hl-press { transition: none; } }
`;

const Stars: React.FC = () => (
  <span aria-label="Five stars" style={{ color: T.sun, letterSpacing: 2, fontSize: 14 }}>★★★★★</span>
);

const AppStoreBadge: React.FC<{ href?: string; height?: number }> = ({ href, height = 52 }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex' }}>
    <img src="/appstore.png" alt="Download on the App Store" style={{ height, display: 'block' }} />
  </a>
);

const Screenshot: React.FC<{ src: string; alt: string; rotate?: number }> = ({ src, alt, rotate = 0 }) => (
  <div className="hl-shot" style={{ transform: `rotate(${rotate}deg)` }}>
    <img src={src} alt={alt} loading="lazy" />
  </div>
);

const STEPS = [
  { title: 'Choose the apps that wait', body: "Pick the apps that pull you in. Apple's Screen Time keeps them asleep each morning, and Honestly never sees which ones you chose.", tag: 'Premium' },
  { title: "Write today's page", body: 'A question is already waiting. Three honest lines count as a page. Tap the face to note how you feel.' },
  { title: 'Open your morning', body: "Your apps wake up, the page goes into this month's book, and today's affirmation arrives." },
];

const FREE = ['A new question every morning', 'A book for every month, with its own cover', 'Mood check-ins, calendar and streak', '1,510 affirmations across 16 topics', 'Journal and affirmation reminders'];
const PREMIUM = ['Apps stay asleep until you’ve written', 'Your own prompts and affirmations', '35 page themes', 'Home Screen and Lock Screen widgets', 'Full searchable history and iCloud backup'];

const HonestlyLanding: React.FC<Props> = ({ app, section }) => {
  if (section) {
    return <AppLayout app={app}><LegalContent app={app} section={section} /></AppLayout>;
  }
  const store = app.appStoreUrl;
  const review = app.testimonials?.[0];

  return (
    <div className="hl" style={{ minHeight: '100vh' }}>
      <style>{css}</style>
      <SEOBox
        title={app.seo.title}
        description={app.seo.description}
        keywords={app.seo.keywords}
        appId={app.id}
        appName={app.appStoreName || app.name}
        appIcon={app.icon}
        appStoreUrl={app.appStoreUrl}
        appCategory={app.seoApplicationCategory}
        aggregateRating={app.aggregateRating}
        screenshots={app.marketing.screenshots}
        faqs={app.marketing.faqs}
        appNumericId={app.appNumericId}
      />

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(250,248,245,.92)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${T.line}` }}>
        <div className="hl-wrap" style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" aria-label="All apps" style={{ display: 'flex', alignItems: 'center', gap: 10, color: T.ink, textDecoration: 'none' }}>
            <ChevronLeft size={16} color={T.inkSofter} />
            <img src={app.icon} alt="" width={32} height={32} style={{ borderRadius: 9, border: `1.5px solid ${T.ink}` }} />
            <span style={{ fontWeight: 800, fontSize: 18 }}>Honestly</span>
          </Link>
          <a href={store} target="_blank" rel="noopener noreferrer" className="hl-press"
            style={{ background: T.amber, color: T.ink, fontWeight: 800, fontSize: 14, padding: '9px 18px', borderRadius: 14, border: `2px solid ${T.ink}`, boxShadow: `0 3px 0 ${T.ink}`, textDecoration: 'none' }}>
            Download free
          </a>
        </div>
      </nav>

      <main>
        {/* 1 · Hero */}
        <section className="hl-wrap hl-hero">
          <div>
            <span className="hl-eyebrow">Morning journal · Affirmations</span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5.6vw, 4.2rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-.03em', margin: '14px 0 20px', textWrap: 'balance' }}>
              Your journal opens before your apps do.
            </h1>
            <p className="hl-body" style={{ fontSize: 19, marginBottom: 30 }}>
              Honestly keeps the apps you choose asleep until you&rsquo;ve written a few honest lines, then sends you into your day with a kind word you can believe.
            </p>
            <div className="hl-hero-cta" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <AppStoreBadge href={store} height={54} />
              <span style={{ fontSize: 14, fontWeight: 700, color: T.inkSoft }}>Free · iPhone &amp; iPad</span>
            </div>
            {review && (
              <figure style={{ margin: '34px 0 0', maxWidth: 440 }} className="hl-card">
                <div style={{ padding: '16px 18px' }}>
                  <Stars />
                  <blockquote style={{ margin: '6px 0 6px', fontSize: 15, fontWeight: 600, lineHeight: 1.55 }}>&ldquo;{review.quote}&rdquo;</blockquote>
                  <figcaption style={{ fontSize: 13, fontWeight: 700, color: T.inkSofter }}>{review.author} · {review.detail}</figcaption>
                </div>
              </figure>
            )}
          </div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', padding: '10px 0 30px' }}>
            <div aria-hidden style={{ position: 'absolute', inset: '8% 4%', borderRadius: '50%', background: `${T.sun}33`, filter: 'blur(60px)' }} />
            <Screenshot src="/honestly/screenshots/01.webp" alt="Journal first, unlock your apps: today's page in Honestly" rotate={2} />
            <div style={{ position: 'absolute', left: 'max(0px, calc(50% - 250px))', bottom: 0 }}>
              <MonthBook design="botanical" month="October" width={130} pages={18} current style={{ transform: 'rotate(-7deg)' }} />
            </div>
          </div>
        </section>

        {/* 2 · Problem → solution */}
        <section className="hl-section" style={{ background: T.cream }}>
          <div className="hl-wrap" style={{ maxWidth: 820, textAlign: 'center' }}>
            <span className="hl-eyebrow">The first five minutes</span>
            <h2 className="hl-h2">Most mornings start in someone else&rsquo;s feed.</h2>
            <p className="hl-body" style={{ margin: '0 auto' }}>
              You reach for your phone before you&rsquo;ve had a thought of your own. Timers get snoozed, and willpower is gone before breakfast.
            </p>
            <p style={{ fontSize: 20, fontWeight: 800, marginTop: 22 }}>Honestly puts one small page between you and the scroll.</p>
          </div>
        </section>

        {/* 3 · How it works */}
        <section className="hl-section">
          <div className="hl-wrap">
            <span className="hl-eyebrow">How it works</span>
            <h2 className="hl-h2">Three steps, every morning.</h2>
            <div className="hl-steps">
              {STEPS.map((s, i) => (
                <div key={s.title} className="hl-card" style={{ padding: 26 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <span style={{ width: 34, height: 34, borderRadius: '50%', background: T.amber, border: `2px solid ${T.ink}`, display: 'grid', placeItems: 'center', fontWeight: 800 }}>{i + 1}</span>
                    {s.tag && <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: T.amberDeep, background: T.selected, padding: '4px 9px', borderRadius: 999 }}>{s.tag}</span>}
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 8px' }}>{s.title}</h3>
                  <p style={{ fontSize: 15.5, lineHeight: 1.6, color: T.inkSoft, margin: 0 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 · Benefits */}
        <section className="hl-section" style={{ background: T.cream }}>
          <div className="hl-wrap">
            <div className="hl-benefit">
              <div>
                <span className="hl-eyebrow">Never a blank page</span>
                <h2 className="hl-h2">A question is waiting before you are.</h2>
                <p className="hl-body">A new prompt sits on your page every morning. Not the one you need? Swap it for another from the library. Write your own with Premium.</p>
              </div>
              <div className="hl-benefit-visual"><Screenshot src="/honestly/screenshots/05.webp" alt="The prompt library in Honestly" rotate={-2} /></div>
            </div>

            <div className="hl-benefit flip">
              <div>
                <span className="hl-eyebrow">A book for every month</span>
                <h2 className="hl-h2">Your mornings fill a book.</h2>
                <p className="hl-body">Every page goes into this month&rsquo;s book, and every month gets its own cover. Keep it, pick another design, or use one of your photos.</p>
              </div>
              <div className="hl-benefit-visual" style={{ position: 'relative', paddingBottom: 24 }}>
                <Screenshot src="/honestly/screenshots/02.webp" alt="This month's book and your library in Honestly" rotate={-2} />
                <div style={{ position: 'absolute', right: 'max(0px, calc(50% - 250px))', bottom: 0, display: 'flex', alignItems: 'flex-end', gap: 6 }}>
                  <MonthBook design="night" month="September" width={92} pages={21} style={{ transform: 'rotate(-4deg)' }} />
                  <MonthBook design="daisies" month="August" width={92} pages={28} style={{ transform: 'rotate(5deg)' }} />
                </div>
              </div>
            </div>

            <div className="hl-benefit">
              <div>
                <span className="hl-eyebrow">Kind words you can believe</span>
                <h2 className="hl-h2">An affirmation that fits your day.</h2>
                <p className="hl-body">1,510 affirmations across 16 topics. Choose the ones that fit your life, and one line a day finds you, with a free reminder at the times you pick.</p>
                <p style={{ fontFamily: SERIF, fontSize: 19, lineHeight: 1.5, marginTop: 22, maxWidth: 420 }}>&ldquo;I can take a breath when I feel overwhelmed.&rdquo;</p>
              </div>
              <div className="hl-benefit-visual"><Screenshot src="/honestly/screenshots/04.webp" alt="Affirmations in Honestly" rotate={2} /></div>
            </div>

            <div className="hl-benefit flip">
              <div>
                <span className="hl-eyebrow">On your Home Screen</span>
                <h2 className="hl-h2">Today&rsquo;s affirmation, where you&rsquo;ll see it.</h2>
                <p className="hl-body">Keep today&rsquo;s line on your Home Screen and Lock Screen, in the theme, colors and font you like. Widgets and 35 page themes come with Premium.</p>
              </div>
              <div className="hl-benefit-visual"><Screenshot src="/honestly/screenshots/03.webp" alt="Affirmation widgets on the Home Screen" rotate={-2} /></div>
            </div>

            <div className="hl-benefit">
              <div>
                <span className="hl-eyebrow">See your mornings add up</span>
                <h2 className="hl-h2">Notice how you&rsquo;re really doing.</h2>
                <p className="hl-body">Tap a face to say how you feel. Your calendar shows each month in moods, and your streak counts the mornings you showed up.</p>
              </div>
              <div className="hl-benefit-visual"><Screenshot src="/honestly/screenshots/06.webp" alt="The mood calendar in Honestly" rotate={2} /></div>
            </div>
          </div>
        </section>

        {/* 5 · Social proof */}
        {app.testimonials && app.testimonials.length > 0 && (
          <section className="hl-section">
            <div className="hl-wrap">
              <span className="hl-eyebrow">From the App Store</span>
              <h2 className="hl-h2">What people say about their mornings.</h2>
              <div className="hl-reviews">
                {app.testimonials.map((t) => (
                  <figure key={t.author} className="hl-card" style={{ margin: 0, padding: 26 }}>
                    <Stars />
                    <blockquote style={{ margin: '10px 0 12px', fontSize: 18, fontWeight: 700, lineHeight: 1.5 }}>&ldquo;{t.quote}&rdquo;</blockquote>
                    <figcaption style={{ fontSize: 13.5, fontWeight: 700, color: T.inkSofter }}>{t.author} · {t.detail}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 6 · Risk reversal */}
        <section className="hl-section" style={{ background: T.cream }}>
          <div className="hl-wrap">
            <span className="hl-eyebrow">Pricing</span>
            <h2 className="hl-h2">Free to start. Premium when you want more.</h2>
            <div className="hl-plans">
              <div className="hl-card" style={{ padding: 28, background: T.paper }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 16px' }}>Free</h3>
                {FREE.map((f) => (
                  <p key={f} style={{ display: 'flex', gap: 10, margin: '0 0 12px', fontSize: 15.5, fontWeight: 600 }}><Check size={18} color={T.amberDeep} style={{ flexShrink: 0, marginTop: 2 }} />{f}</p>
                ))}
              </div>
              <div className="hl-card" style={{ padding: 28, border: `2px solid ${T.ink}`, boxShadow: `0 5px 0 ${T.ink}` }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 16px' }}>Premium</h3>
                {PREMIUM.map((f) => (
                  <p key={f} style={{ display: 'flex', gap: 10, margin: '0 0 12px', fontSize: 15.5, fontWeight: 600 }}><Check size={18} color={T.amberDeep} style={{ flexShrink: 0, marginTop: 2 }} />{f}</p>
                ))}
                <p style={{ fontSize: 14, lineHeight: 1.6, color: T.inkSoft, margin: '18px 0 0' }}>
                  Pay once for Lifetime, or choose a yearly or monthly plan you can cancel anytime. Prices are shown in the app.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7 · FAQ */}
        {app.marketing.faqs && app.marketing.faqs.length > 0 && (
          <section className="hl-section">
            <div className="hl-wrap hl-faq" style={{ maxWidth: 760 }}>
              <span className="hl-eyebrow">Questions</span>
              <h2 className="hl-h2" style={{ marginBottom: 18 }}>Before you download.</h2>
              {app.marketing.faqs.map((faq) => {
                const more = faq.learnMoreSlug ? findPseoPage(app.id, faq.learnMoreSlug) : undefined;
                return (
                  <details key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p style={{ margin: '0 0 20px', fontSize: 16, lineHeight: 1.65, color: T.inkSoft }}>
                      {faq.answer}
                      {more && (
                        <> <Link to={`/${app.id}/${more.type}/${more.slug}`} style={{ color: T.amberDeep, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>Learn more →</Link></>
                      )}
                    </p>
                  </details>
                );
              })}
            </div>
          </section>
        )}

        {/* 8 · Final CTA */}
        <section className="hl-section" style={{ background: T.cream, textAlign: 'center' }}>
          <div className="hl-wrap" style={{ maxWidth: 720 }}>
            <img src={app.icon} alt="" width={84} height={84} style={{ display: 'block', margin: '0 auto 22px', borderRadius: 20, border: `2px solid ${T.ink}` }} />
            <h2 className="hl-h2">Tomorrow morning, open a page first.</h2>
            <p className="hl-body" style={{ margin: '0 auto 28px' }}>A few honest lines before the feed. That&rsquo;s the whole habit.</p>
            <AppStoreBadge href={store} height={56} />
            <p style={{ fontSize: 13, fontWeight: 700, color: T.inkSofter, marginTop: 14 }}>Free · iPhone &amp; iPad</p>
          </div>
        </section>

        <div style={{ borderTop: `1px solid ${T.line}` }}>
          <GuidesGrid app={app} heading="Guides & comparisons" />
        </div>

        <footer style={{ borderTop: `1px solid ${T.line}`, padding: '28px 0' }}>
          <div className="hl-wrap" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, fontSize: 13, fontWeight: 700, color: T.inkSofter }}>
            <div style={{ display: 'flex', gap: 24 }}>
              <Link to="/honestly/privacy-policy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</Link>
              <Link to="/honestly/terms-of-service" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</Link>
              <Link to="/honestly/support" style={{ color: 'inherit', textDecoration: 'none' }}>Support</Link>
            </div>
            <span>© 2026 Ashwin Anbazhagan</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default HonestlyLanding;
