import React from 'react';
import type { Testimonial } from '../config/apps';

interface Theme {
  primary: string;
  bg: string;
  ink: string;
  card: string;
  border: string;
  heading: string; // font-family string for headings
}

interface Props {
  items?: Testimonial[];
  rating?: { ratingValue: string; ratingCount: string };
  theme: Theme;
  heading?: string;
}

/**
 * Social proof (#29). Renders nothing without real testimonials — never a
 * placeholder or fabricated quote. Prop-driven so it matches each page's palette.
 */
const Testimonials: React.FC<Props> = ({ items, rating, theme, heading = 'Loved by the people who use it.' }) => {
  if (!items || items.length === 0) return null;
  const stars = rating ? Math.round(parseFloat(rating.ratingValue)) : 5;

  return (
    <section style={{ padding: '80px 24px', backgroundColor: theme.bg, borderTop: `1px solid ${theme.border}` }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontFamily: theme.heading, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 600, color: theme.ink, lineHeight: 1.15 }}>
            {heading}
          </h2>
          {rating && (
            <p style={{ marginTop: 12, color: `${theme.ink}99`, fontSize: 15 }}>
              <span style={{ color: theme.primary, letterSpacing: 2 }}>{'★'.repeat(stars)}</span>
              {'  '}{rating.ratingValue} · {rating.ratingCount} ratings
            </p>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(260px, 1fr))`, gap: 20 }}>
          {items.map((t, i) => (
            <figure
              key={i}
              style={{ margin: 0, backgroundColor: theme.card, borderRadius: 20, padding: '26px 24px', border: `1px solid ${theme.border}`, boxShadow: '0 4px 16px rgba(22,20,15,0.05)', display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              <div style={{ color: theme.primary, letterSpacing: 2, fontSize: 14 }}>{'★'.repeat(5)}</div>
              <blockquote style={{ margin: 0, color: theme.ink, fontSize: 16, lineHeight: 1.5 }}>"{t.quote}"</blockquote>
              <figcaption style={{ marginTop: 'auto', color: `${theme.ink}99`, fontSize: 13, fontWeight: 600 }}>
                {t.author}
                {t.detail ? <span style={{ fontWeight: 400 }}> · {t.detail}</span> : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
