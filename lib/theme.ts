import { reduced } from '@/lib/motion';

export type Theme = 'dark' | 'light';

export async function setThemeWithIris(
  next: Theme,
  origin: HTMLElement,
  apply: (t: Theme) => void
) {
  const doc = document as unknown as {
    startViewTransition?: (callback: () => void) => { ready: Promise<void> };
  };

  if (!doc.startViewTransition || reduced()) {
    return apply(next);
  }

  const { left, top, width, height } = origin.getBoundingClientRect();
  const x = left + width / 2;
  const y = top + height / 2;
  const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  const transition = doc.startViewTransition(() => apply(next));
  await transition.ready;

  document.documentElement.animate(
    { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
    {
      duration: 600,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      pseudoElement: '::view-transition-new(root)',
    }
  );
}
