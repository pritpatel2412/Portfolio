'use client';

import { useState, useEffect, useCallback } from 'react';
import { track } from './track';

export interface PickItem {
  slug: string;
  title: string;
  year?: string;
  role?: string;
}

const STORAGE_KEY = 'portfolio_picks';
export const MAX_PICKS = 5;
export const PICKS_UPDATED_EVENT = 'portfolio:picks-updated';
export const PICKS_LIMIT_EVENT = 'portfolio:picks-limit';

export function getStoredPicks(): PickItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredPicks(picks: PickItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(picks));
    window.dispatchEvent(new CustomEvent(PICKS_UPDATED_EVENT, { detail: picks }));
  } catch {
    // sessionStorage quota or security restriction
  }
}

export function toggleStoredPick(item: PickItem): { added: boolean; limitReached: boolean; picks: PickItem[] } {
  const current = getStoredPicks();
  const exists = current.some((p) => p.slug === item.slug);

  if (exists) {
    const next = current.filter((p) => p.slug !== item.slug);
    saveStoredPicks(next);
    return { added: false, limitReached: false, picks: next };
  }

  if (current.length >= MAX_PICKS) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(PICKS_LIMIT_EVENT, { detail: { max: MAX_PICKS } }));
    }
    return { added: false, limitReached: true, picks: current };
  }

  const next = [...current, item];
  saveStoredPicks(next);
  track('pick_add', { slug: item.slug });
  return { added: true, limitReached: false, picks: next };
}

export function removeStoredPick(slug: string): PickItem[] {
  const current = getStoredPicks();
  const next = current.filter((p) => p.slug !== slug);
  saveStoredPicks(next);
  return next;
}

export function clearStoredPicks(): void {
  saveStoredPicks([]);
}

export function usePicks() {
  const [picks, setPicks] = useState<PickItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setPicks(getStoredPicks());
    setIsLoaded(true);

    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent<PickItem[]>;
      if (custom.detail) {
        setPicks(custom.detail);
      } else {
        setPicks(getStoredPicks());
      }
    };

    window.addEventListener(PICKS_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(PICKS_UPDATED_EVENT, handleUpdate);
  }, []);

  const toggle = useCallback((item: PickItem) => {
    return toggleStoredPick(item);
  }, []);

  const remove = useCallback((slug: string) => {
    removeStoredPick(slug);
  }, []);

  const clear = useCallback(() => {
    clearStoredPicks();
  }, []);

  const isPicked = useCallback(
    (slug: string) => {
      return picks.some((p) => p.slug === slug);
    },
    [picks]
  );

  return {
    picks,
    count: picks.length,
    isLoaded,
    isPicked,
    toggle,
    remove,
    clear,
  };
}
