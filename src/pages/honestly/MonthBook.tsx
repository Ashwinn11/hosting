import React, { useId } from 'react';

// The app's month book (App/History/MonthBookCover.swift) and four of its cover designs
// (App/History/CoverDesigns.swift), ported from SwiftUI to SVG. Covers are laid out on the app's
// own 120 × 170 canvas, so every number below is the Swift one.

const INK = '#33261A';
const CREAM = '#FFFDF8';
const AMBER = '#F5851F';
const HAIRLINE = '#D8CBB6';
const LEATHER_INK = '#FFF7EA';
const SANS = 'Manrope, system-ui, sans-serif';
const SERIF = '"Libre Baskerville", Baskerville, Georgia, serif';

export type CoverDesign = 'botanical' | 'daisies' | 'night' | 'citrus';

const BASE: Record<CoverDesign, string> = {
  botanical: '#9DB592',
  daisies: '#B9D4C2',
  night: '#2F3654',
  citrus: '#F2C35B',
};

// SwiftUI shrinks a one-line title to fit its frame (minimumScaleFactor 0.3); this estimates the same.
function fit(text: string, size: number, width: number, em: number) {
  const natural = text.length * size * em;
  return natural > width ? Math.max(size * 0.3, (size * width) / natural) : size;
}

// The Swift painter's seeded generator, so scattered stars land where they do in the app.
function seeded() {
  let seed = 7;
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

const Small: React.FC<{ text: string; x: number; y: number; fill: string; size?: number; tracking?: number; anchor?: 'middle' | 'start' }> = ({
  text, x, y, fill, size = 7, tracking = 1.2, anchor = 'middle',
}) => (
  <text x={x} y={y} fill={fill} fontFamily={SANS} fontWeight={800} fontSize={size} letterSpacing={tracking}
    textAnchor={anchor} dominantBaseline={anchor === 'middle' ? 'central' : 'auto'}>
    {text}
  </text>
);

function Artwork({ design, month, year, uid }: { design: CoverDesign; month: string; year: string; uid: string }) {
  const rnd = seeded();
  switch (design) {
    case 'botanical': {
      const leaf = (x: number, y: number, rotate: number, scale: number, key: number) => {
        let d = 'M0 0 C2 -18 -2 -36 0 -54';
        for (let k = 0; k < 5; k++) {
          const yy = -8 - k * 10;
          d += ` M0 ${yy} C8 ${yy - 3} 12 ${yy - 10} 13 ${yy - 14} C6 ${yy - 12} 1 ${yy - 7} 0 ${yy}`;
          d += ` M0 ${yy - 4} C-8 ${yy - 7} -12 ${yy - 14} -13 ${yy - 18} C-6 ${yy - 16} -1 ${yy - 11} 0 ${yy - 4}`;
        }
        return (
          <path key={key} d={d} transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
            fill="none" stroke="#F4F1E6" strokeWidth={1.6} strokeLinecap="round" />
        );
      };
      return (
        <>
          {leaf(30, -4, 165, 1.1, 0)}{leaf(94, -8, 195, 1.2, 1)}{leaf(104, 178, -14, 1.2, 2)}
          <text x={62} y={75.5} fill={CREAM} fontFamily={SERIF} fontStyle="italic" fontSize={fit(month, 22, 92, 0.5)}
            textAnchor="middle" dominantBaseline="central">{month}</text>
          <Small text={year} x={62} y={96.6} fill="#F4F1E6" size={6.5} tracking={3} />
        </>
      );
    }
    case 'daisies': {
      const daisy = (x: number, y: number, r: number, key: number) => (
        <g key={key} transform={`translate(${x} ${y})`}>
          {Array.from({ length: 12 }, (_, k) => (
            <ellipse key={k} cx={0} cy={-r * 0.6} rx={r * 0.2} ry={r * 0.5} transform={`rotate(${k * 30})`}
              fill={CREAM} stroke={INK} strokeWidth={0.6} />
          ))}
          <circle r={r * 0.3} fill="#F7C24B" stroke={INK} strokeWidth={0.6} />
        </g>
      );
      return (
        <>
          {daisy(24, 24, 18, 0)}{daisy(96, 36, 14, 1)}{daisy(100, 98, 17, 2)}{daisy(20, 112, 12, 3)}{daisy(60, 154, 18, 4)}
          <g transform="translate(60 92)">
            {Array.from({ length: 16 }, (_, k) => (
              <ellipse key={k} cx={0} cy={-30} rx={7} ry={17} transform={`rotate(${k * 22.5})`}
                fill={CREAM} stroke={INK} strokeWidth={0.9} />
            ))}
            <circle r={22} fill="#F7C24B" stroke={INK} strokeWidth={1.2} />
            <text y={-4.3} fill={INK} fontFamily={SANS} fontWeight={800} fontSize={fit(month, 10, 36, 0.62)}
              textAnchor="middle" dominantBaseline="central">{month}</text>
            <Small text={year} x={0} y={7.3} fill="#5A3D12" size={5.5} tracking={1} />
          </g>
        </>
      );
    }
    case 'night': {
      const stars = Array.from({ length: 38 }, () => {
        const x = rnd() * 120, y = rnd() * 120, r = 0.5 + rnd() * 1.1, o = 0.5 + rnd() * 0.5;
        return { x, y, r, o };
      });
      const name = fit(month, 17, 96, 0.62);
      return (
        <>
          {stars.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#F5E7B5" opacity={s.o} />)}
          <mask id={`${uid}-moon`}>
            <rect width={120} height={170} fill="#fff" />
            <circle cx={95} cy={29} r={11} fill="#000" />
          </mask>
          <circle cx={88} cy={34} r={14} fill="#F5E7B5" mask={`url(#${uid}-moon)`} />
          <polygon points="24,52 26,57 31,59 26,61 24,66 22,61 17,59 22,57" fill="#F5E7B5" />
          <Small text={year} x={15} y={135.5} fill={LEATHER_INK} anchor="start" />
          <text x={15} y={138.6 + name * 1.066} fill={LEATHER_INK} fontFamily={SANS} fontWeight={800} fontSize={name}>{month}</text>
        </>
      );
    }
    case 'citrus': {
      const slice = (x: number, y: number, r: number, key: number) => (
        <g key={key}>
          <circle cx={x} cy={y} r={r} fill="#FFF3C4" stroke={INK} strokeWidth={1.2} />
          <circle cx={x} cy={y} r={r - 3} fill="#FBE08A" />
          {Array.from({ length: 8 }, (_, k) => {
            const a = (k * Math.PI) / 4;
            return <line key={k} x1={x} y1={y} x2={x + Math.cos(a) * (r - 3)} y2={y + Math.sin(a) * (r - 3)} stroke="#FFF3C4" strokeWidth={1.4} />;
          })}
        </g>
      );
      return (
        <>
          {slice(26, 26, 14, 0)}{slice(94, 46, 11, 1)}{slice(30, 146, 12, 2)}{slice(98, 140, 15, 3)}
          <text x={62} y={92} fill="#2F5E3A" fontFamily={SERIF} fontStyle="italic" fontSize={fit(month, 22, 96, 0.5)}
            textAnchor="middle" dominantBaseline="central">{month}</text>
          <Small text={year} x={98} y={140} fill={INK} size={6.5} tracking={0.5} />
        </>
      );
    }
  }
}

/** A month as a closed book: its cover, the spine's fold, the page edges, and a ribbon while it's
 *  still being written. `width` is the cover's width on the page, in CSS pixels. */
export const MonthBook: React.FC<{
  design: CoverDesign;
  month: string;
  year?: string;
  width?: number;
  pages?: number;
  current?: boolean;
  style?: React.CSSProperties;
}> = ({ design, month, year = '2026', width = 150, pages = 12, current = false, style }) => {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const w = 120, h = 170;
  const edge = w * (0.03 + 0.003 * Math.min(pages, 31));
  const outline = (Math.min(2, Math.max(1, width * 0.016)) * w) / width; // points → canvas units
  const cover = `M3.6 0 H${w - 10.8} Q${w} 0 ${w} 10.8 V${h - 10.8} Q${w} ${h} ${w - 10.8} ${h} H3.6 Q0 ${h} 0 ${h - 3.6} V3.6 Q0 0 3.6 0 Z`;
  const edgeX = w - w * 0.08, edgeY = w * 0.035, edgeW = edge + w * 0.08, edgeH = h - w * 0.07;
  const ribbonW = w * 0.1, ribbonH = h * 0.3;
  const top = -6, total = w + edge + 1;
  return (
    <svg
      width={(width * total) / w}
      viewBox={`0 ${top} ${total} ${h - top + 1}`}
      role="img"
      aria-label={`${month} ${year}`}
      style={{ display: 'block', overflow: 'visible', filter: `drop-shadow(0 ${width * 0.07}px ${width * 0.08}px rgba(120,80,30,0.22))`, ...style }}
    >
      {/* Page edges past the cover's open side */}
      <clipPath id={`${uid}-edges`}>
        <rect x={edgeX} y={edgeY} width={edgeW} height={edgeH} rx={4} />
      </clipPath>
      <g clipPath={`url(#${uid}-edges)`}>
        <rect x={edgeX} y={edgeY} width={edgeW} height={edgeH} fill={CREAM} />
        {Array.from({ length: Math.floor(edgeW / 2.5) }, (_, i) => (
          <rect key={i} x={edgeX + 2 + i * 2.5} y={edgeY} width={0.75} height={edgeH} fill={HAIRLINE} />
        ))}
      </g>
      <rect x={edgeX} y={edgeY} width={edgeW} height={edgeH} rx={4} fill="none" stroke={INK} strokeWidth={outline} />

      {/* The cover */}
      <clipPath id={`${uid}-cover`}><path d={cover} /></clipPath>
      <g clipPath={`url(#${uid}-cover)`}>
        <rect width={w} height={h} fill={BASE[design]} />
        <Artwork design={design} month={month} year={year} uid={uid} />
        <rect width={w * 0.07} height={h} fill="#000" opacity={0.16} />
      </g>
      <path d={cover} fill="none" stroke={INK} strokeWidth={outline} />

      {current && (
        <path
          d={`M${w * 0.72} ${-w * 0.04} h${ribbonW} v${ribbonH} l${-ribbonW / 2} ${-ribbonW * 0.7} l${-ribbonW / 2} ${ribbonW * 0.7} Z`}
          fill={AMBER} stroke={INK} strokeWidth={outline * 0.75} strokeLinejoin="round"
        />
      )}
    </svg>
  );
};

export default MonthBook;
