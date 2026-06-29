import React from 'react';

interface Theme {
  primary: string;
  bg: string;
  ink: string;
  card: string;
  border: string;
  heading: string;
}

interface Props {
  appName: string;
  theme: Theme;
  note?: string;
  avatarSrc?: string; // drop in a real founder photo for full #15 effect
}

const TWITTER = 'https://twitter.com/shwiinn';

/**
 * Founder presence (#15). Uses an initials avatar until a real photo is added —
 * never a stock face. Pass avatarSrc to show the real photo.
 */
const FounderNote: React.FC<Props> = ({ appName, theme, note, avatarSrc }) => {
  const copy = note ?? `I'm Ashwin. I built ${appName} to solve a problem I had myself. Questions or ideas? I read everything.`;

  return (
    <section style={{ padding: '56px 24px', backgroundColor: theme.bg, borderTop: `1px solid ${theme.border}` }}>
      <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 18, justifyContent: 'center', flexWrap: 'wrap' }}>
        {avatarSrc ? (
          <img src={avatarSrc} alt="Ashwin Anbazhagan" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${theme.primary}` }} />
        ) : (
          <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: theme.primary, color: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20, flexShrink: 0 }}>
            AA
          </div>
        )}
        <div style={{ flex: '1 1 340px', minWidth: 240 }}>
          <p style={{ margin: 0, color: theme.ink, fontSize: 15, lineHeight: 1.5 }}>{copy}</p>
          <a href={TWITTER} target="_blank" rel="noopener noreferrer" style={{ color: theme.primary, fontWeight: 600, fontSize: 14, textDecoration: 'none', display: 'inline-block', marginTop: 6 }}>
            — Ashwin, on X (@shwiinn)
          </a>
        </div>
      </div>
    </section>
  );
};

export default FounderNote;
