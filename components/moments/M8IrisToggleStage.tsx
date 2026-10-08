'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { setThemeWithIris, type Theme } from '@/lib/theme';

export function M8IrisToggleStage() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [hasViewTransitions, setHasViewTransitions] = useState(false);
  const [lastCoords, setLastCoords] = useState<{ x: number; y: number; r: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const currentTheme =
      (document.documentElement.getAttribute('data-theme') as Theme) || 'dark';
    setTheme(currentTheme);
    setHasViewTransitions('startViewTransition' in document);
  }, []);

  const handleToggle = async () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    const origin = buttonRef.current;
    if (!origin) return;

    const { left, top, width, height } = origin.getBoundingClientRect();
    const x = Math.round(left + width / 2);
    const y = Math.round(top + height / 2);
    const r = Math.round(
      Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    );
    setLastCoords({ x, y, r });

    await setThemeWithIris(next, origin, (t) => {
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem('theme', t);
      setTheme(t);
    });
  };

  return (
    <div
      className="rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface)] overflow-hidden p-6 sm:p-8"
      role="region"
      aria-label="M8 Iris Theme Toggle Stage"
    >
      {/* Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[var(--line)] font-mono text-xs text-[var(--text-dim)]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--safelight)]" />
          <strong className="text-[var(--text)] uppercase">M8 · IRIS THEME TOGGLE</strong>
          <span className="text-[var(--safelight)] font-bold">
            [CURRENT THEME: {theme.toUpperCase()}]
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>
            VIEW TRANSITIONS API:{' '}
            <strong className={hasViewTransitions ? 'text-emerald-400' : 'text-amber-400'}>
              {hasViewTransitions ? 'SUPPORTED' : 'UNSUPPORTED (FALLBACK)'}
            </strong>
          </span>
          <span>DURATION: <strong>600ms ease-out</strong></span>
        </div>
      </div>

      {/* Iris Sandbox */}
      <div className="flex flex-col items-center justify-center p-8 bg-[var(--surface-2)] rounded-[var(--radius-ui)] border border-[var(--line)] text-center">
        <p className="font-text text-sm sm:text-base text-[var(--text)] max-w-md mb-6">
          The Iris toggle calculates the origin button coordinates and expands a circular{' '}
          <code className="font-mono text-xs bg-[var(--surface)] px-1 py-0.5 rounded text-[var(--safelight)]">
            clip-path
          </code>{' '}
          mask across the viewport at 600ms.
        </p>

        <button
          ref={buttonRef}
          type="button"
          onClick={handleToggle}
          className="flex items-center gap-3 px-6 py-3 rounded-[var(--radius-ui)] bg-[var(--safelight)] text-[var(--on-safelight,#0A0908)] font-mono text-xs uppercase font-bold tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-lg focus-visible:outline-2 focus-visible:outline-[var(--safelight)] min-h-[44px]"
          aria-label={`Trigger Iris exposure wipe to ${theme === 'dark' ? 'Lightbox' : 'Darkroom'}`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span>TRIGGER IRIS WIPE TO {theme === 'dark' ? 'LIGHTBOX' : 'DARKROOM'}</span>
        </button>

        {lastCoords && (
          <div className="mt-6 font-mono text-xs text-[var(--text-dim)] bg-[var(--surface)] px-4 py-2 border border-[var(--line)] rounded">
            Origin Coordinates: X={lastCoords.x}px, Y={lastCoords.y}px | Max Hypotenuse Radius={lastCoords.r}px
          </div>
        )}
      </div>
    </div>
  );
}
