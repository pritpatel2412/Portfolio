'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    const current = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' | null;
    if (current === 'light' || current === 'dark') {
      setTheme(current);
    } else {
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      setTheme(prefersLight ? 'light' : 'dark');
    }
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    
    // Check if View Transitions API and circular clip-path animation can be used
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const doc = document as unknown as {
      startViewTransition?: (callback: () => void) => { ready: Promise<void> };
    };

    if (!doc.startViewTransition || prefersReducedMotion) {
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
      setTheme(nextTheme);
      return;
    }

    // Iris wipe transition per Brief §6 & §5
    const rect = buttonRef.current?.getBoundingClientRect() || {
      left: e.clientX,
      top: e.clientY,
      width: 0,
      height: 0,
    };
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className={cn(
          'w-11 h-11 flex items-center justify-center rounded-[var(--radius-ui)] border border-[var(--line)] text-[var(--text-dim)]',
          className
        )}
        aria-label="Toggle theme"
      >
        <Moon className="w-4 h-4" />
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      className={cn(
        'w-11 h-11 flex items-center justify-center rounded-[var(--radius-ui)]',
        'border border-[var(--line)] hover:border-[var(--text)]',
        'text-[var(--text-dim)] hover:text-[var(--text)] transition-all cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline-[var(--safelight)] focus-visible:outline-offset-2',
        className
      )}
      aria-label={isDark ? 'Switch to Lightbox mode' : 'Switch to Darkroom mode'}
      title={isDark ? 'Switch to Lightbox mode' : 'Switch to Darkroom mode'}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[var(--safelight)] transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-[var(--safelight)] transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}
