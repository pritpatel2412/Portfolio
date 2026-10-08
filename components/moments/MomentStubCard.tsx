'use client';

import React from 'react';

export interface MomentSpec {
  id: string; // e.g. "M3"
  title: string;
  target: string;
  trigger: string;
  timeline: string;
  easing: string;
  reducedMotion: string;
  mobile: string;
  performance: string;
}

interface MomentStubCardProps {
  spec: MomentSpec;
}

export function MomentStubCard({ spec }: MomentStubCardProps) {
  return (
    <div
      className="rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface)] overflow-hidden p-6 sm:p-8"
      role="region"
      aria-label={`${spec.id} ${spec.title} Choreography Specification`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[var(--line)] font-mono text-xs text-[var(--text-dim)]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-none border border-[var(--safelight)] rotate-45" />
          <strong className="text-[var(--text)] uppercase">
            {spec.id} · {spec.title}
          </strong>
          <span className="text-amber-400 font-bold">[SCHEDULED FOR PROMPT {getPromptNumber(spec.id)}]</span>
        </div>
        <div className="font-mono text-[11px] text-[var(--text-dim)]">
          TARGET: <span className="text-[var(--text)] font-bold">{spec.target}</span>
        </div>
      </div>

      {/* Specification Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        <div className="p-3 bg-[var(--surface-2)] rounded-[var(--radius-ui)] border border-[var(--line)]">
          <span className="text-[var(--safelight)] font-bold block mb-1">TRIGGER:</span>
          <p className="text-[var(--text)] font-text text-sm leading-relaxed">{spec.trigger}</p>
        </div>

        <div className="p-3 bg-[var(--surface-2)] rounded-[var(--radius-ui)] border border-[var(--line)]">
          <span className="text-[var(--safelight)] font-bold block mb-1">TIMELINE &amp; EASING:</span>
          <p className="text-[var(--text)] font-text text-sm leading-relaxed">
            {spec.timeline} (Easing: {spec.easing})
          </p>
        </div>

        <div className="p-3 bg-[var(--surface-2)] rounded-[var(--radius-ui)] border border-[var(--line)]">
          <span className="text-[var(--safelight)] font-bold block mb-1">REDUCED MOTION PATH:</span>
          <p className="text-[var(--text)] font-text text-sm leading-relaxed">{spec.reducedMotion}</p>
        </div>

        <div className="p-3 bg-[var(--surface-2)] rounded-[var(--radius-ui)] border border-[var(--line)]">
          <span className="text-[var(--safelight)] font-bold block mb-1">MOBILE PATH (&lt; 1024px):</span>
          <p className="text-[var(--text)] font-text text-sm leading-relaxed">{spec.mobile}</p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--line)] font-mono text-[11px] text-[var(--text-dim)] flex items-center justify-between">
        <span>PERFORMANCE NOTE: {spec.performance}</span>
        <span className="text-emerald-400">STATUS: SPEC LOCKED</span>
      </div>
    </div>
  );
}

function getPromptNumber(id: string): string {
  switch (id) {
    case 'M3':
      return '2 (Home)';
    case 'M6':
    case 'M7':
      return '3 (Projects & Case Studies)';
    case 'M9':
    case 'M10':
    case 'M11':
    case 'M12':
      return '6 (Contact, 404, SEO)';
    default:
      return 'LATER';
  }
}
