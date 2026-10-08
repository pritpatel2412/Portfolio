'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { VibeId, VibeConfig, VIBES, DEFAULT_VIBE } from '@/lib/vibes';

interface VibeContextValue {
  activeVibe: VibeId;
  currentConfig: VibeConfig;
  setVibe: (id: VibeId) => void;
  isSwitcherOpen: boolean;
  setIsSwitcherOpen: (open: boolean) => void;
}

const VibeContext = createContext<VibeContextValue | null>(null);

const defaultVibeValue: VibeContextValue = {
  activeVibe: DEFAULT_VIBE,
  currentConfig: VIBES[0],
  setVibe: () => {},
  isSwitcherOpen: false,
  setIsSwitcherOpen: () => {},
};

export function useVibe(): VibeContextValue {
  const ctx = useContext(VibeContext);
  return ctx || defaultVibeValue;
}

export function VibeProvider({ children }: { children: React.ReactNode }) {
  const [activeVibe, setActiveVibeState] = useState<VibeId>(DEFAULT_VIBE);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio-vibe') as VibeId | null;
      if (saved && VIBES.some((v) => v.id === saved)) {
        setActiveVibeState(saved);
        document.documentElement.setAttribute('data-vibe', saved);
      } else {
        document.documentElement.setAttribute('data-vibe', DEFAULT_VIBE);
      }
    } catch {
      document.documentElement.setAttribute('data-vibe', DEFAULT_VIBE);
    }
  }, []);

  const setVibe = useCallback((id: VibeId) => {
    setActiveVibeState(id);
    try {
      localStorage.setItem('portfolio-vibe', id);
    } catch {}
    document.documentElement.setAttribute('data-vibe', id);
  }, []);

  const currentConfig = VIBES.find((v) => v.id === activeVibe) || VIBES[0];

  return (
    <VibeContext.Provider
      value={{
        activeVibe,
        currentConfig,
        setVibe,
        isSwitcherOpen,
        setIsSwitcherOpen,
      }}
    >
      {children}
    </VibeContext.Provider>
  );
}
