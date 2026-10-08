'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface AvailabilityPillProps {
  status?: string;
  className?: string;
}

export function AvailabilityPill({
  status = 'Available for Q2/Q3 roles & high-impact contracts',
  className,
}: AvailabilityPillProps) {
  return (
    <div
      role="status"
      aria-label={status}
      className={cn(
        'inline-flex items-center gap-2.5 px-3 py-1',
        'rounded-[var(--radius-pill)] border border-[var(--line)] bg-[var(--surface)]',
        'text-[var(--text-dim)] hover:text-[var(--text)] transition-colors',
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        {/* Pulse effect - disabled under reduced motion via CSS */}
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--safelight)] opacity-75 [animation-duration:3s]" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--safelight)]" />
      </span>
      <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider select-none truncate">
        {status}
      </span>
    </div>
  );
}
