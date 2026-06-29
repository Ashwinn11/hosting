import React from 'react';
import type { ComparisonHighlight } from '../config/apps';

interface Theme {
  primary: string;
  bg: string;
  ink: string;
  card: string;
  border: string;
  heading: string;
}

interface Props {
  items?: ComparisonHighlight[];
  appName: string;
  theme: Theme;
  guidesHref?: string; // link to full pSEO comparisons
}

/**
 * Compact "us vs. the usual" strip (#31). Short by design — the full feature
 * tables live on the pSEO compare pages linked at the bottom.
 */
const CompareStrip: React.FC<Props> = ({ items, appName, theme, guidesHref }) => {
  if (!items || items.length === 0) return null;

  return (
    <section style={{ padding: '72px 24px', backgroundColor: theme.bg, borderTop: `1px solid ${theme.border}` }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <h2 style={{ fontFamily: theme.heading, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 600, color: theme.ink, textAlign: 'center', marginBottom: 32 }}>
          Why {appName}, not the usual?
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map((row, i) => (
            <div
              key={i}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'stretch' }}
            >
              <div style={{ padding: '16px 18px', borderRadius: 14, backgroundColor: `${theme.ink}08`, border: `1px solid ${theme.border}`, color: `${theme.ink}88`, fontSize: 15, lineHeight: 1.4, textDecoration: 'line-through', textDecorationColor: `${theme.ink}33` }}>
                {row.them}
              </div>
              <div style={{ padding: '16px 18px', borderRadius: 14, backgroundColor: theme.card, border: `1px solid ${theme.primary}55`, color: theme.ink, fontSize: 15, lineHeight: 1.4, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: theme.primary, flexShrink: 0 }}>✓</span>
                {row.us}
              </div>
            </div>
          ))}
        </div>
        {guidesHref && (
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <a href={guidesHref} style={{ color: theme.primary, fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
              See full comparisons →
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompareStrip;
