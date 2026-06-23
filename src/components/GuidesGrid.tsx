import React from 'react';
import { Link } from 'react-router-dom';
import type { AppConfig } from '../config/apps';
import { pseoPages } from '../config/pseo';

interface GuidesGridProps {
  app: AppConfig;
  /** Pass true on dark-background landings so text/borders stay legible. */
  dark?: boolean;
  /** Section heading override. */
  heading?: string;
  /** Max cards to render (default: all). */
  limit?: number;
}

/**
 * Dynamic internal-linking section. Renders a card grid linking to EVERY pSEO
 * guide/compare page for the given app, pulled live from pseo.ts. This keeps
 * every pSEO page one click from its app landing (crawlable + link equity) and
 * stays in sync automatically as pages are added — no hardcoded link lists.
 */
const GuidesGrid: React.FC<GuidesGridProps> = ({ app, dark = false, heading = 'Guides & Comparisons', limit }) => {
  let pages = pseoPages.filter((p) => p.appId === app.id);
  if (limit) pages = pages.slice(0, limit);
  if (pages.length === 0) return null;

  const primary = app.design.primary;
  const text = dark ? '#FFFFFF' : '#1A1A1A';
  const muted = dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)';
  const border = dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.10)';

  return (
    <section
      aria-label={`${app.name} guides and comparisons`}
      style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 24px' }}
    >
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: primary, marginBottom: 8 }}>
          Learn More
        </p>
        <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.02em', color: text, margin: 0 }}>
          {heading}
        </h2>
        <p style={{ fontSize: 15, color: muted, marginTop: 10, maxWidth: 560 }}>
          In-depth guides and honest comparisons to help you decide if {app.name} is right for you.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
        {pages.map((page) => (
          <Link
            key={`${page.type}-${page.slug}`}
            to={`/${app.id}/${page.type}/${page.slug}`}
            style={{
              display: 'block',
              padding: 18,
              borderRadius: 14,
              border: `1px solid ${border}`,
              textDecoration: 'none',
              color: text,
              background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)',
            }}
          >
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: primary, marginBottom: 8 }}>
              {page.type === 'compare' ? '⚖ Compare' : '📖 Guide'}
            </span>
            <span style={{ display: 'block', fontSize: 15, fontWeight: 600, lineHeight: 1.4, color: text }}>
              {page.h1}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default GuidesGrid;
