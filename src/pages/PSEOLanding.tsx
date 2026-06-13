import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { apps } from '../config/apps';
import { pseoPages } from '../config/pseo';
import SEOBox from '../components/SEOBox';

const PSEOLanding: React.FC = () => {
  const { appId, slug } = useParams<{ appId: string; slug: string }>();
  const page = pseoPages.find(p => p.appId === appId && p.slug === slug);
  const app = apps.find(a => a.id === appId);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!page || !app) return <Navigate to="/" replace />;

  const primary = app.design.primary;
  const bg = app.design.bg;
  const isLight = bg.startsWith('#F') || bg.startsWith('#f') || bg === '#FFFFFF' || bg === '#FDFBF7';
  const textColor = isLight ? '#1A1A1A' : '#FFFFFF';
  const mutedColor = isLight ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.55)';
  const borderColor = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)';

  return (
    <div style={{ backgroundColor: bg, color: textColor, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <SEOBox
        title={page.title}
        description={page.metaDescription}
        keywords={[page.targetKeyword, ...app.seo.keywords]}
        appId={app.id}
        appStoreUrl={app.appStoreUrl}
        appNumericId={app.appNumericId}
        appCategory={app.seoApplicationCategory}
        aggregateRating={app.aggregateRating}
        screenshots={app.marketing.screenshots}
        faqs={page.faqs}
        breadcrumbs={[
          { name: 'Home', url: 'https://briefly.live/' },
          { name: app.name, url: `https://briefly.live/${app.id}` },
          { name: page.h1, url: `https://briefly.live/${app.id}/${page.type}/${page.slug}` },
        ]}
        pageType={page.type}
        canonicalUrl={`https://briefly.live/${app.id}/${page.type}/${page.slug}`}
        datePublished={page.datePublished}
        comparisonTable={page.comparisonTable}
      />

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px',
        borderBottom: `1px solid ${borderColor}`,
        backdropFilter: 'blur(12px)',
        backgroundColor: isLight ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.85)',
      }}>
        <Link to={`/${app.id}`} style={{ display: 'flex', alignItems: 'center', gap: 8, color: primary, textDecoration: 'none', fontSize: 14 }}>
          <ChevronLeft size={16} />
          <div style={{ width: 28, height: 28, borderRadius: 7, overflow: 'hidden', border: `1.5px solid ${primary}33` }}>
            <img src={`/${app.id}.png`} alt={app.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <span style={{ fontWeight: 700 }}>{app.name}</span>
        </Link>
        <a
          href={app.appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: primary, color: '#fff', padding: '7px 16px', borderRadius: 20, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}
        >
          {page.cta}
        </a>
      </nav>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '88px 24px 80px' }}>
        {/* Visible Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, fontSize: 13, color: mutedColor }}>
          <Link to="/" style={{ color: primary, textDecoration: 'none', fontWeight: 600, opacity: 0.8, transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.opacity = '1'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.opacity = '0.8'}
          >Home</Link>
          <span>→</span>
          <Link to={`/${app.id}`} style={{ color: primary, textDecoration: 'none', fontWeight: 600, opacity: 0.8, transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.opacity = '1'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.opacity = '0.8'}
          >{app.name}</Link>
          <span>→</span>
          <span style={{ color: textColor, fontWeight: 600 }}>{page.h1}</span>
        </div>

        {/* Hero */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: primary, backgroundColor: `${primary}15`, padding: '4px 10px', borderRadius: 20, marginBottom: 16 }}>
            {page.type === 'compare' ? 'Comparison' : 'Guide'} · {app.name}
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: 20, letterSpacing: '-0.02em' }}>
            {page.h1}
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.65, color: mutedColor, marginBottom: 28 }}>
            {page.intro}
          </p>
          <a
            href={app.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, backgroundColor: primary, color: '#fff', padding: '12px 24px', borderRadius: 28, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}
          >
            <img src="/appstore.png" alt="App Store" style={{ height: 18, filter: 'brightness(0) invert(1)' }} />
            {page.cta}
          </a>
        </div>

        {/* Comparison Table */}
        {page.type === 'compare' && page.comparisonTable && (
          <div style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Feature Comparison</h2>
            <div style={{ border: `1px solid ${borderColor}`, borderRadius: 12, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ backgroundColor: `${primary}12` }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, width: '50%' }}>Feature</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: primary }}>{app.name}</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: mutedColor }}>Competitor</th>
                  </tr>
                </thead>
                <tbody>
                  {page.comparisonTable.map((row, i) => (
                    <tr key={i} style={{ borderTop: `1px solid ${borderColor}` }}>
                      <td style={{ padding: '11px 16px', color: textColor }}>{row.feature}</td>
                      <td style={{ padding: '11px 16px', textAlign: 'center', color: primary, fontWeight: 600 }}>{row.app}</td>
                      <td style={{ padding: '11px 16px', textAlign: 'center', color: mutedColor }}>{row.competitor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Body Sections */}
        <div style={{ marginBottom: 56 }}>
          {page.sections.map((section, i) => (
            <div key={i} style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>{section.heading}</h2>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: mutedColor }}>{section.body}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {page.faqs.map((faq, i) => (
              <div key={i} style={{ border: `1px solid ${borderColor}`, borderRadius: 10, overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', color: textColor, fontSize: 15, fontWeight: 600, gap: 12 }}
                >
                  {faq.question}
                  {openFaq === i ? <ChevronUp size={16} style={{ flexShrink: 0, color: primary }} /> : <ChevronDown size={16} style={{ flexShrink: 0, color: mutedColor }} />}
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 16px 14px', fontSize: 14, lineHeight: 1.65, color: mutedColor }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '40px 24px', borderRadius: 16, backgroundColor: `${primary}10`, border: `1px solid ${primary}25` }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, overflow: 'hidden', margin: '0 auto 16px', border: `2px solid ${primary}33` }}>
            <img src={`/${app.id}.png`} alt={app.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Ready to try {app.name}?</h3>
          <p style={{ fontSize: 15, color: mutedColor, marginBottom: 20 }}>Free on iOS · {app.category}</p>
          <a
            href={app.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, backgroundColor: primary, color: '#fff', padding: '13px 28px', borderRadius: 28, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}
          >
            <img src="/appstore.png" alt="App Store" style={{ height: 18, filter: 'brightness(0) invert(1)' }} />
            {page.cta}
          </a>
        </div>

        {/* Related Articles */}
        <div style={{ marginTop: 64, paddingTop: 48, borderTop: `1px solid ${borderColor}` }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, color: textColor }}>Related Articles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {pseoPages
              .filter(p => p.appId === appId && p.slug !== slug)
              .slice(0, 3)
              .map((relatedPage, i) => (
                <Link
                  key={i}
                  to={`/${app.id}/${relatedPage.type}/${relatedPage.slug}`}
                  style={{
                    padding: 16,
                    borderRadius: 10,
                    border: `1px solid ${borderColor}`,
                    textDecoration: 'none',
                    color: textColor,
                    transition: 'all 0.2s',
                    display: 'block'
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = primary;
                    (e.currentTarget as HTMLElement).style.backgroundColor = `${primary}08`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = borderColor;
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: primary, marginBottom: 8 }}>
                    {relatedPage.type === 'compare' ? '⚖️ Compare' : '📖 Guide'}
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>{relatedPage.h1}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${borderColor}`, padding: '24px', textAlign: 'center', fontSize: 12, color: mutedColor }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 8 }}>
          <Link to={`/${app.id}/privacy-policy`} style={{ color: mutedColor, textDecoration: 'none' }}>Privacy</Link>
          <Link to={`/${app.id}/terms-of-service`} style={{ color: mutedColor, textDecoration: 'none' }}>Terms</Link>
          <Link to={`/${app.id}/support`} style={{ color: mutedColor, textDecoration: 'none' }}>Support</Link>
          <Link to="/" style={{ color: mutedColor, textDecoration: 'none' }}>All Apps</Link>
        </div>
        © 2026 Ashwin Anbazhagan · briefly.live
      </footer>
    </div>
  );
};

export default PSEOLanding;
