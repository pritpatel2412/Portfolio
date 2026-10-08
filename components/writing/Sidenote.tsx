'use client';

import React from 'react';
import { Info } from 'lucide-react';

interface SidenoteProps {
  children: React.ReactNode;
  number?: number;
}

export function Sidenote({ children, number = 1 }: SidenoteProps) {
  return (
    <>
      {/* Desktop Margin Sidenote (>= 1280px) */}
      <aside
        className="hidden 2xl:block absolute -right-72 w-64 p-3 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface-2)]/60 text-xs font-mono text-[var(--text-dim)] leading-normal shadow-sm"
        aria-label={`Sidenote ${number}`}
      >
        <div className="flex items-center gap-1.5 text-[var(--safelight)] font-bold text-[10px] uppercase mb-1">
          <span>▷ NOTE [0{number}]</span>
        </div>
        <p>{children}</p>
      </aside>

      {/* Inline Sidenote for Screens < 1280px */}
      <aside
        className="2xl:hidden my-4 p-3.5 rounded-[var(--radius-ui)] border-l-2 border-l-[var(--safelight)] border border-[var(--line)] bg-[var(--surface-2)] text-xs font-mono text-[var(--text-dim)]"
        aria-label={`Inline Note ${number}`}
      >
        <div className="flex items-center gap-1.5 text-[var(--safelight)] font-bold text-[10px] uppercase mb-1">
          <Info className="w-3.5 h-3.5" />
          <span>NOTE [0{number}]</span>
        </div>
        <p>{children}</p>
      </aside>
    </>
  );
}
