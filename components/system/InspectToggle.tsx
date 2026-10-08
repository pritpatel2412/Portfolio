'use client';

import React from 'react';
import { useLens } from './LensProvider';
import { cn } from '@/lib/utils';

interface InspectToggleProps {
  className?: string;
}

export function InspectToggle({ className }: InspectToggleProps) {
  const { isSourceMode, toggleMode } = useLens();

  return (
    <button
      type="button"
      aria-pressed={isSourceMode}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;
        toggleMode(originX, originY);
      }}
      className={cn(
        'group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all duration-200 select-none cursor-pointer',
        isSourceMode
          ? 'bg-[var(--signal)] text-[var(--on-signal)] border-[var(--signal)] shadow-[0_0_12px_rgba(92,255,176,0.25)]'
          : 'bg-transparent text-[var(--ink)] border-[var(--line)] hover:border-[var(--ink-muted)]',
        className
      )}
      title="Toggle Inspect mode (Key: I)"
    >
      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full transition-transform',
          isSourceMode ? 'bg-[var(--on-signal)] scale-125 animate-pulse' : 'bg-[var(--ink-muted)]'
        )}
      />
      <span className="font-medium tracking-wide">
        {isSourceMode ? 'SOURCE' : 'INSPECT'}
      </span>
      <kbd className="hidden sm:inline-block ml-0.5 px-1 py-0.2 rounded border text-[10px] opacity-60 uppercase">
        I
      </kbd>
    </button>
  );
}
