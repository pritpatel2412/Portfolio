'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Universe =
  | 'editorial'
  | 'maximalist'
  | 'japandi'
  | 'swiss'
  | 'brutalist'
  | 'noir'
  | 'archive';

export interface UniverseMeta {
  id: Universe;
  num: string;
  name: string;
  tagline: string;
  vibe: string;
  fontBadge: string;
  palette: {
    bg: string;
    surface: string;
    text: string;
    accent: string;
  };
}

export const UNIVERSES: UniverseMeta[] = [
  {
    id: 'editorial',
    num: '01',
    name: 'Editorial',
    tagline: 'Warm paper, serif architecture, asymmetric magazine spreads.',
    vibe: 'Magazine Cover',
    fontBadge: 'Serif + Hairline',
    palette: {
      bg: '#F5EFEB',
      surface: '#EDE6DF',
      text: '#1C1917',
      accent: '#C2410C',
    },
  },
  {
    id: 'maximalist',
    num: '02',
    name: 'Neo Maximalist',
    tagline: 'Graphic poster, sticker collage, chromatic typography & energy.',
    vibe: 'Graphic Poster',
    fontBadge: 'Expressive + Collage',
    palette: {
      bg: '#FFF685',
      surface: '#FFFFFF',
      text: '#0D0D0D',
      accent: '#2563EB',
    },
  },
  {
    id: 'japandi',
    num: '03',
    name: 'Japandi Pop',
    tagline: 'Wabi-sabi calm, terracotta stamp seal, serene organic balance.',
    vibe: 'Art Publication',
    fontBadge: 'Zen + Vertical',
    palette: {
      bg: '#ECE6DC',
      surface: '#DFD8CC',
      text: '#22201D',
      accent: '#BC5A36',
    },
  },
  {
    id: 'swiss',
    num: '04',
    name: 'Swiss Modernist',
    tagline: '12-column grid, Akzidenz bold, signal red focal disc.',
    vibe: 'Information System',
    fontBadge: 'Grotesk + Grid',
    palette: {
      bg: '#F8F8F8',
      surface: '#EEEEEE',
      text: '#0A0A0A',
      accent: '#E11D48',
    },
  },
  {
    id: 'brutalist',
    num: '05',
    name: 'Classic Brutalist',
    tagline: 'Raw internet document, monospace tables, telemetry metadata.',
    vibe: 'Raw Document',
    fontBadge: 'Mono + ASCII',
    palette: {
      bg: '#EAE6DD',
      surface: '#FFFFFF',
      text: '#000000',
      accent: '#2563EB',
    },
  },
  {
    id: 'noir',
    num: '06',
    name: 'Noir / After Hours',
    tagline: 'Cinematic 35mm, deep obsidian space, warm tungsten halation.',
    vibe: 'Cinematic Film',
    fontBadge: 'Widescreen + Grain',
    palette: {
      bg: '#080808',
      surface: '#121212',
      text: '#EAE5DC',
      accent: '#E07A28',
    },
  },
  {
    id: 'archive',
    num: '07',
    name: 'Digital Archive',
    tagline: 'Personal research museum, coordinate grid, specimen taxonomy.',
    vibe: 'Laboratory Museum',
    fontBadge: 'Specimen + Matrix',
    palette: {
      bg: '#0F141C',
      surface: '#171F2C',
      text: '#E2E8F0',
      accent: '#06B6D4',
    },
  },
];

interface UniverseContextType {
  universe: Universe;
  setUniverse: (u: Universe) => void;
  meta: UniverseMeta;
  allUniverses: UniverseMeta[];
  isTransitioning: boolean;
}

const UniverseContext = createContext<UniverseContextType | undefined>(undefined);

const STORAGE_KEY = 'prit_portfolio_universe';

export function UniverseProvider({ children }: { children: React.ReactNode }) {
  const [universe, setUniverseState] = useState<Universe>('editorial');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initialize from localStorage or default to editorial
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Universe | null;
      if (stored && UNIVERSES.some((u) => u.id === stored)) {
        setUniverseState(stored);
        document.documentElement.setAttribute('data-universe', stored);
      } else {
        document.documentElement.setAttribute('data-universe', 'editorial');
      }
    } catch {
      document.documentElement.setAttribute('data-universe', 'editorial');
    }
  }, []);

  const setUniverse = (next: Universe) => {
    if (next === universe) return;
    setIsTransitioning(true);

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }

    // Set DOM attribute immediately for instant token cascade
    document.documentElement.setAttribute('data-universe', next);
    setUniverseState(next);

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 450);

    return () => clearTimeout(timer);
  };

  const currentMeta = UNIVERSES.find((u) => u.id === universe) || UNIVERSES[0];

  return (
    <UniverseContext.Provider
      value={{
        universe,
        setUniverse,
        meta: currentMeta,
        allUniverses: UNIVERSES,
        isTransitioning,
      }}
    >
      {children}
    </UniverseContext.Provider>
  );
}

export function useUniverse() {
  const ctx = useContext(UniverseContext);
  if (!ctx) {
    throw new Error('useUniverse must be used within a UniverseProvider');
  }
  return ctx;
}
