export const D = { xs: 0.12, sm: 0.24, md: 0.48, lg: 0.8, xl: 1.2 } as const; // seconds
export const EASE = { out: 'expo.out', inOut: 'power3.inOut', snap: 'back.out(1.6)' } as const;

interface NavigatorHints extends Navigator {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
}

export const reduced = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const saveData = (): boolean =>
  typeof navigator !== 'undefined' && (navigator as NavigatorHints).connection?.saveData === true;

/** Pinned and camera scenes run only when every condition holds. */
export const canPin = (): boolean =>
  typeof window !== 'undefined' &&
  !reduced() &&
  !saveData() &&
  window.matchMedia('(min-width: 1024px)').matches &&
  ((navigator as NavigatorHints).deviceMemory ?? 8) >= 4;
