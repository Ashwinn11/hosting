import { useSyncExternalStore } from 'react';

const subscribeNever = () => () => {};

/**
 * True only after the component has mounted in the browser.
 * Gate anything non-deterministic (live dates, canvas, WebGL) behind this so
 * the first client render matches the prerendered HTML exactly (hydration-safe).
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribeNever,
    () => true, // client snapshot
    () => false // server snapshot
  );
}
