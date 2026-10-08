'use client';

import React from 'react';
import { ProjectDecision } from '@/lib/projects';

interface DecisionCardProps {
  decision: ProjectDecision;
  index: number;
}

export function DecisionCard({ decision, index }: DecisionCardProps) {
  return (
    <article
      className="p-6 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--text-dim)] transition-colors flex flex-col justify-between"
      aria-labelledby={`decision-title-${index}`}
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[var(--line)] font-mono text-xs text-[var(--text-dim)] mb-4">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[var(--safelight)] font-bold">
            <span>▷ DECISION 0{index + 1}</span>
          </span>
          <span className="uppercase text-[10px]">ENGINEERING TRADE-OFF</span>
        </div>

        <h3
          id={`decision-title-${index}`}
          className="font-display font-bold text-lg text-[var(--text)] mb-3"
        >
          {decision.title}
        </h3>

        {/* Options Considered */}
        <div className="mb-4">
          <span className="font-mono text-[11px] uppercase text-[var(--text-dim)] tracking-wider block mb-1.5">
            OPTIONS EVALUATED:
          </span>
          <ul className="space-y-1">
            {decision.optionsConsidered.map((opt) => (
              <li
                key={opt}
                className="font-text text-xs text-[var(--text-dim)] flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--line)]" />
                <span>{opt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Chosen Option */}
        <div className="p-3 rounded-[var(--radius-ui)] bg-[var(--surface-2)] border border-[var(--safelight)]/30 mb-4">
          <span className="font-mono text-[10px] uppercase text-[var(--safelight)] font-bold tracking-wider block mb-1">
            CHOSEN ARCHITECTURE:
          </span>
          <p className="font-display font-bold text-sm text-[var(--text)]">
            {decision.chosen}
          </p>
        </div>

        {/* Technical Rationale */}
        <div className="mb-4">
          <span className="font-mono text-[11px] uppercase text-[var(--text-dim)] tracking-wider block mb-1">
            WHY THIS WAS CHOSEN:
          </span>
          <p className="font-text text-sm text-[var(--text)] leading-relaxed">
            {decision.why}
          </p>
        </div>
      </div>

      {/* Trade-off / Cost */}
      <div className="pt-3 border-t border-[var(--line)] bg-[var(--surface-2)]/30 -mx-6 -mb-6 p-4 rounded-b-[var(--radius-ui)]">
        <span className="font-mono text-[10px] uppercase text-amber-400 font-bold tracking-wider block mb-0.5">
          KNOWN TRADE-OFF &amp; COST:
        </span>
        <p className="font-text text-xs text-[var(--text-dim)] leading-normal">
          {decision.tradeoff}
        </p>
      </div>
    </article>
  );
}
