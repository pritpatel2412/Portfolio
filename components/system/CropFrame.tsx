'use client';

import React from 'react';
import { useLens } from './LensProvider';
import { cn } from '@/lib/utils';

interface CropFrameProps {
  children: React.ReactNode;
  className?: string;
  dimensions?: string; // e.g. "1440×900" or "16:9"
}

export function CropFrame({ children, className, dimensions = '1440×900' }: CropFrameProps) {
  const { isSourceMode } = useLens();

  return (
    <div
      className={cn(
        'relative border border-[var(--line)] rounded-[2px] overflow-hidden bg-[var(--bg-raised)]',
        className
      )}
    >
      {/* Corner Registration Crosshairs */}
      <div className="absolute top-1 left-1.5 font-mono text-[10px] text-[var(--ink-muted)] pointer-events-none select-none z-10">
        +
      </div>
      <div className="absolute top-1 right-1.5 font-mono text-[10px] text-[var(--ink-muted)] pointer-events-none select-none z-10 flex items-center gap-1">
        {isSourceMode && <span className="text-[9px] text-[var(--phosphor)]">{dimensions}</span>}
        <span>+</span>
      </div>
      <div className="absolute bottom-1 left-1.5 font-mono text-[10px] text-[var(--ink-muted)] pointer-events-none select-none z-10">
        +
      </div>
      <div className="absolute bottom-1 right-1.5 font-mono text-[10px] text-[var(--ink-muted)] pointer-events-none select-none z-10">
        +
      </div>

      {children}
    </div>
  );
}
