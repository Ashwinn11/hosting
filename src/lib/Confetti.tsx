import React, { useEffect, useRef } from 'react';

/**
 * Two-corner confetti poppers — a 1:1 port of Her 75's `ConfettiBurst`
 * (Sources/Features/TodayView.swift): same launch geometry, ballistic flight,
 * flutter, tumble (width collapsing through 0 reads as a 3D flip), lifetime and
 * fade. Deterministic pseudo-random via the same sin-hash, so a given piece
 * flies the same path every frame.
 *
 * Velocities/gravity are scaled by canvasHeight/850 so the arc shape matches
 * the app regardless of the section's size.
 */

const PIECE_COUNT = 120;
const GRAVITY = 1350;

function rnd(seed: number, salt: number): number {
  const x = Math.sin(seed * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

interface ConfettiBurstProps {
  /** Increment to fire a burst. 0/undefined = idle. */
  trigger: number;
  palette: string[];
  /** Fill the nearest positioned ancestor. */
  className?: string;
  style?: React.CSSProperties;
}

export const ConfettiBurst: React.FC<ConfettiBurstProps> = ({ trigger, palette, className, style }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef(0);
  const paletteRef = useRef(palette);

  useEffect(() => {
    paletteRef.current = palette;
  }, [palette]);

  useEffect(() => {
    if (!trigger) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const scale = h / 850; // the app's canvas is a full ~850pt screen
    const colors = paletteRef.current;
    const start = performance.now();

    const drawPiece = (i: number, t: number) => {
      const leftPopper = i % 2 === 0;
      const delay = rnd(i, 1) * 0.35 + (leftPopper ? 0 : 0.12);
      const te = t - delay;
      if (te <= 0) return;

      // Launch: up and inward from a bottom corner, with spread.
      const ox = leftPopper ? w * 0.05 : w * 0.95;
      const oy = h + 10;
      const baseAngle = leftPopper ? -1.2 : -1.94;
      const angle = baseAngle + (rnd(i, 2) - 0.5) * 0.66;
      const speed = (950 + rnd(i, 3) * 650) * scale;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      // Flight: ballistic + side-to-side flutter as the piece sheds speed.
      const flutter = Math.sin(te * (3 + rnd(i, 4) * 3) + rnd(i, 5) * 6) * 26 * Math.min(te, 1.4);
      const x = ox + vx * te + flutter;
      const y = oy + vy * te + 0.5 * GRAVITY * scale * te * te;
      if (y >= h + 30) return;

      const life = 2.4 + rnd(i, 6) * 0.6;
      const alpha = te > life - 0.5 ? Math.max(0, (life - te) / 0.5) : 1;
      if (alpha <= 0) return;

      // Tumble: rotation + the width collapsing through 0 reads as a 3D flip.
      const pw = (7 + rnd(i, 7) * 7) * Math.abs(Math.cos(te * (4 + rnd(i, 8) * 4)));
      const ph = 10 + rnd(i, 9) * 9;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(te * (2 + rnd(i, 10) * 6));
      ctx.globalAlpha = alpha;
      ctx.fillStyle = colors[i % colors.length];
      ctx.beginPath();
      ctx.roundRect(-pw / 2, -ph / 2, pw, ph, 2);
      ctx.fill();
      ctx.restore();
    };

    const loop = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);
      if (t > 3.6) return; // longest delay + lifetime ≈ 3.4s
      for (let i = 0; i < PIECE_COUNT; i++) drawPiece(i, t);
      rafRef.current = requestAnimationFrame(loop);
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        display: 'block',
        ...style,
      }}
    />
  );
};
