'use client';

import React from 'react';
import { useLens } from './LensProvider';
import { cn } from '@/lib/utils';

interface LayeredProps {
  surface: React.ReactNode;
  source: React.ReactNode;
  className?: string;
  dataLens?: boolean;
}

/**
 * Layered renders two identical stacked representations:
 * Surface (editorial/crafted) and Source (blueprint/x-ray).
 * In Surface mode: Source is clipped by the pointer lens (or revealed on touch long-press).
 * In Source mode: Source is 100% visible.
 */
export function Layered({ surface, source, className, dataLens = true }: LayeredProps) {
  const { isSourceMode } = useLens();

  return (
    <div
      className={cn('relative w-full', className)}
      data-lens={dataLens ? 'true' : undefined}
    >
      {/* Surface Layer */}
      <div
        className={cn(
          'w-full transition-opacity duration-300',
          isSourceMode ? 'opacity-0 pointer-events-none select-none' : 'opacity-100'
        )}
        aria-hidden={isSourceMode}
      >
        {surface}
      </div>

      {/* Source Layer */}
      <div
        className={cn(
          'w-full transition-opacity duration-300',
          isSourceMode
            ? 'relative opacity-100'
            : 'absolute inset-0 pointer-events-none opacity-100 [clip-path:circle(var(--lens-r)_at_var(--lens-x)_var(--lens-y))]'
        )}
        aria-hidden={!isSourceMode}
      >
        <div className="w-full font-mono text-sm text-[var(--ink)] bg-[var(--bg)] border border-[var(--line)] p-4 rounded-[2px] shadow-sm">
          {source}
        </div>
      </div>
    </div>
  );
}
