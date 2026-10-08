'use client';

import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';

type Mode = 'surface' | 'source';
type Theme = 'light' | 'dark';

interface LensContextValue {
  mode: Mode;
  theme: Theme;
  isSourceMode: boolean;
  toggleMode: (targetX?: number, targetY?: number) => void;
  toggleTheme: () => void;
  showGridOverlay: boolean;
  toggleGridOverlay: () => void;
  pointerPos: { x: number; y: number };
}

const LensContext = createContext<LensContextValue | null>(null);

const defaultLensValue: LensContextValue = {
  mode: 'surface',
  theme: 'dark',
  isSourceMode: false,
  toggleMode: () => {},
  toggleTheme: () => {},
  showGridOverlay: false,
  toggleGridOverlay: () => {},
  pointerPos: { x: -999, y: -999 },
};

export function useLens(): LensContextValue {
  const context = useContext(LensContext);
  return context || defaultLensValue;
}

export function LensProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>('surface');
  const [theme, setTheme] = useState<Theme>('dark');
  const [showGridOverlay, setShowGridOverlay] = useState(false);
  const pointerPosRef = useRef({ x: -999, y: -999 });
  const targetPosRef = useRef({ x: -999, y: -999 });
  const lensRadiusRef = useRef(56);
  const targetRadiusRef = useRef(56);
  const rAFRef = useRef<number | null>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize from localStorage and prefers-color-scheme
  useEffect(() => {
    try {
      const savedMode = localStorage.getItem('mode') as Mode | null;
      if (savedMode === 'source' || savedMode === 'surface') {
        setMode(savedMode);
        document.documentElement.setAttribute('data-mode', savedMode);
      }

      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = prefersDark ? 'dark' : 'light';
        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
      }
    } catch {
      // localStorage unavailable fallback
    }
  }, []);

  // Sync mode attribute on <html>
  const updateModeDOM = useCallback((newMode: Mode) => {
    setMode(newMode);
    try {
      localStorage.setItem('mode', newMode);
    } catch {}
    if (newMode === 'source') {
      document.documentElement.setAttribute('data-mode', 'source');
    } else {
      document.documentElement.removeAttribute('data-mode');
    }
  }, []);

  // View Transition or fallback toggle
  const toggleMode = useCallback(
    (originX?: number, originY?: number) => {
      const nextMode: Mode = mode === 'surface' ? 'source' : 'surface';

      // Check for View Transitions API and reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion && typeof document !== 'undefined' && 'startViewTransition' in document) {
        document.startViewTransition(() => {
          updateModeDOM(nextMode);
        });
      } else {
        updateModeDOM(nextMode);
      }
    },
    [mode, updateModeDOM]
  );

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('theme', nextTheme);
    } catch {}
    document.documentElement.setAttribute('data-theme', nextTheme);
  }, [theme]);

  const toggleGridOverlay = useCallback(() => {
    setShowGridOverlay((prev) => !prev);
  }, []);

  // Keyboard shortcut listener ('I' for inspect, 'G' for grid in source mode)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if (e.key === 'i' || e.key === 'I') {
        e.preventDefault();
        toggleMode();
      } else if ((e.key === 'g' || e.key === 'G') && mode === 'source') {
        e.preventDefault();
        toggleGridOverlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, toggleMode, toggleGridOverlay]);

  // Pointer tracking & rAF spring interpolation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (!hasFinePointer) return;

    const handlePointerMove = (e: PointerEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };

      const elementUnder = document.elementFromPoint(e.clientX, e.clientY);
      const isOverLensBlock = elementUnder?.closest('[data-lens="true"]');
      targetRadiusRef.current = isOverLensBlock ? 140 : 56;
    };

    const handlePointerLeave = () => {
      targetPosRef.current = { x: -999, y: -999 };
      targetRadiusRef.current = 56;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    const lerp = (current: number, target: number, factor: number) => {
      return current + (target - current) * factor;
    };

    const updateLoop = () => {
      if (!prefersReducedMotion) {
        pointerPosRef.current.x = lerp(pointerPosRef.current.x, targetPosRef.current.x, 0.18);
        pointerPosRef.current.y = lerp(pointerPosRef.current.y, targetPosRef.current.y, 0.18);
        lensRadiusRef.current = lerp(lensRadiusRef.current, targetRadiusRef.current, 0.16);
      } else {
        pointerPosRef.current = { ...targetPosRef.current };
        lensRadiusRef.current = targetRadiusRef.current;
      }

      const root = document.documentElement;
      root.style.setProperty('--lens-x', `${Math.round(pointerPosRef.current.x)}px`);
      root.style.setProperty('--lens-y', `${Math.round(pointerPosRef.current.y)}px`);
      root.style.setProperty('--lens-r', `${Math.round(lensRadiusRef.current)}px`);

      rAFRef.current = requestAnimationFrame(updateLoop);
    };

    rAFRef.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    };
  }, []);

  // Touch device long-press (350ms) peek
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) return;

    let activeTouchBlock: HTMLElement | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      const block = el?.closest('[data-lens="true"]') as HTMLElement | null;

      if (block) {
        activeTouchBlock = block;
        longPressTimerRef.current = setTimeout(() => {
          if (navigator.vibrate) navigator.vibrate(8);
          block.setAttribute('data-peek', 'true');
        }, 350);
      }
    };

    const handleTouchEnd = () => {
      if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
      if (activeTouchBlock) {
        activeTouchBlock.removeAttribute('data-peek');
        activeTouchBlock = null;
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  return (
    <LensContext.Provider
      value={{
        mode,
        theme,
        isSourceMode: mode === 'source',
        toggleMode,
        toggleTheme,
        showGridOverlay,
        toggleGridOverlay,
        pointerPos: pointerPosRef.current,
      }}
    >
      {children}
      {showGridOverlay && mode === 'source' && (
        <div className="fixed inset-0 pointer-events-none z-[9999] grid grid-cols-12 gap-4 px-4 md:px-12 max-w-[1440px] mx-auto">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full bg-[rgba(92,255,176,0.04)] border-x border-[rgba(92,255,176,0.12)]" />
          ))}
        </div>
      )}
    </LensContext.Provider>
  );
}
