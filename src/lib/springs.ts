/**
 * Real spring physics as CSS easing.
 *
 * Each app on this site has its own motion vocabulary defined as spring tokens
 * (SwiftUI `response/dampingFraction` for the native apps, RN `stiffness/damping`
 * for the Expo apps). This module solves the damped-oscillator equation for
 * those exact parameters and emits a CSS `linear()` easing so web transitions
 * share the apps' physical feel — including overshoot, which no cubic-bezier
 * without y>1 control points can express.
 */

export interface SpringEasing {
  /** Settle duration in ms. */
  dur: number;
  /** CSS timing function — `linear(…)` where supported, cubic-bezier fallback otherwise. */
  ease: string;
}

let linearSupported: boolean | null = null;
function supportsLinear(): boolean {
  if (linearSupported !== null) return linearSupported;
  // On the server assume support: prerendered styles then match hydration in
  // every modern browser (linear() shipped across engines in 2023). Browsers
  // without it drop the whole transition declaration — states snap, content fine.
  if (typeof CSS === 'undefined' || !CSS.supports) return (linearSupported = true);
  return (linearSupported = CSS.supports('transition-timing-function', 'linear(0, 1)'));
}

const cache = new Map<string, SpringEasing>();

/** Solve x(t) for a unit spring with natural frequency omega0 (rad/s) and damping ratio zeta. */
function solve(omega0: number, zeta: number, t: number): number {
  if (zeta < 1) {
    const wd = omega0 * Math.sqrt(1 - zeta * zeta);
    return 1 - Math.exp(-zeta * omega0 * t) * (Math.cos(wd * t) + ((zeta * omega0) / wd) * Math.sin(wd * t));
  }
  // Critically damped (none of our tokens are overdamped).
  return 1 - Math.exp(-omega0 * t) * (1 + omega0 * t);
}

function build(omega0: number, zeta: number): SpringEasing {
  const key = `${omega0.toFixed(4)}:${zeta.toFixed(4)}`;
  const hit = cache.get(key);
  if (hit) return hit;

  // Settle when the amplitude envelope drops below 0.1% of travel.
  const dur = Math.min(2000, (-Math.log(0.001) / (Math.max(zeta, 0.05) * omega0)) * 1000);

  let ease: string;
  if (supportsLinear()) {
    const N = 80;
    const pts: string[] = [];
    for (let i = 0; i <= N; i++) {
      pts.push(solve(omega0, zeta, ((i / N) * dur) / 1000).toFixed(4));
    }
    ease = `linear(${pts.join(', ')})`;
  } else {
    // Fallback: overshoot expressed through a y>1 control point, scaled by how
    // underdamped the spring is. Not exact, but preserves the character.
    const overshoot = zeta < 1 ? Math.exp((-zeta * Math.PI) / Math.sqrt(1 - zeta * zeta)) : 0;
    ease = overshoot > 0.01
      ? `cubic-bezier(0.3, ${(1 + overshoot * 1.7).toFixed(3)}, 0.4, 1)`
      : 'cubic-bezier(0.25, 1, 0.4, 1)';
  }

  const out = { dur: Math.round(dur), ease };
  cache.set(key, out);
  return out;
}

/** SwiftUI parametrization: `.spring(response:dampingFraction:)`. */
export function swiftSpring(response: number, dampingFraction: number): SpringEasing {
  return build((2 * Math.PI) / response, dampingFraction);
}

/** React Native / Reanimated parametrization: `{ stiffness, damping, mass }`. */
export function rnSpring(stiffness: number, damping: number, mass = 1): SpringEasing {
  const omega0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  return build(omega0, zeta);
}

/** Compose a transition shorthand for several properties on one spring. */
export function springTransition(spring: SpringEasing, ...props: string[]): string {
  return props.map((p) => `${p} ${spring.dur}ms ${spring.ease}`).join(', ');
}
