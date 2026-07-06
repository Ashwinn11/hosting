import { useEffect, useRef, useState, type CSSProperties } from 'react';

/**
 * Scroll-reveal that is prerender- and hydration-safe.
 *
 * The server (and the first client render) outputs the element fully visible —
 * crawlers and no-JS visitors always see complete content, and hydration never
 * mismatches. After mount, elements still below the fold are hidden and then
 * revealed with a transition as they scroll into view; elements already
 * on-screen never blink.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(opts?: {
  y?: number;
  dur?: number;
  delay?: number;
  ease?: string;
  scale?: number;
}) {
  const { y = 26, dur = 800, delay = 0, ease = 'cubic-bezier(0.22, 1, 0.36, 1)', scale } = opts ?? {};
  const ref = useRef<T | null>(null);
  const [state, setState] = useState<'initial' | 'hidden' | 'shown'>('initial');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // The observer's first (async) callback tells us whether the element was
    // already on screen at mount: if so it must never animate, so we leave it
    // visible and disconnect. Only elements still below the fold get hidden,
    // then revealed on their real entrance.
    let hidden = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!hidden) {
          if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
            io.disconnect();
            return;
          }
          hidden = true;
          setState('hidden');
        } else if (entry.isIntersecting) {
          setState('shown');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -7% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hiddenTransform = `translateY(${y}px)${scale != null ? ` scale(${scale})` : ''}`;
  const style: CSSProperties =
    state === 'initial'
      ? {}
      : state === 'hidden'
        ? { opacity: 0, transform: hiddenTransform }
        : {
            opacity: 1,
            transform: 'none',
            transition: `opacity ${dur}ms ease ${delay}ms, transform ${dur}ms ${ease} ${delay}ms`,
          };

  return [ref, style] as const;
}

/**
 * Plain in-view flag (fires once) for triggering demos — count-ups, draws, etc.
 * False during SSR; consumers must render sensible static content when false.
 */
export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(threshold = 0.35) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}
