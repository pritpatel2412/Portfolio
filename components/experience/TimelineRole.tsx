'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, ArrowRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Develop } from '@/components/motion/Develop';

export interface RoleData {
  id: string;
  company: string;
  role: string;
  period: string;
  current: boolean;
  mode: string;
  story: string;
  outcomes: string[];
  linkedProject?: string;
  linkedProjectTitle?: string;
  stack: string[];
}

interface TimelineRoleProps {
  role: RoleData;
  index: number;
}

export function TimelineRole({ role, index }: TimelineRoleProps) {
  // Current role is open by default; older roles can collapse/expand
  const [isExpanded, setIsExpanded] = useState(role.current);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpand();
    }
  };

  return (
    <article
      className="relative pl-6 sm:pl-8 pb-12 border-l border-[var(--line)] last:pb-0 group"
      aria-labelledby={`role-heading-${role.id}`}
    >
      {/* Timeline Node Mark (Develops in for active role per Brief §7.4) */}
      <div className="absolute -left-[5px] top-1">
        {role.current ? (
          <Develop>
            <span className="w-2.5 h-2.5 rounded-none bg-[var(--safelight)] block rotate-45 shadow-[0_0_12px_var(--safelight)]" />
          </Develop>
        ) : (
          <span className="w-2.5 h-2.5 rounded-none border border-[var(--line-strong,var(--text-dim))] bg-[var(--bg)] block rotate-45 group-hover:border-[var(--safelight)] transition-colors" />
        )}
      </div>

      {/* Role Card Container */}
      <div className="rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface)] overflow-hidden transition-colors hover:border-[var(--text-dim)]">
        {/* Sticky Header Bar */}
        <header
          className={cn(
            'px-5 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] cursor-pointer select-none',
            role.current ? 'bg-[var(--surface-2)]/80' : 'bg-[var(--surface-2)]/40'
          )}
          onClick={toggleExpand}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-expanded={isExpanded}
          aria-controls={`role-content-${role.id}`}
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--text-dim)] uppercase tracking-wider mb-1">
              <span className="text-[var(--safelight)] font-bold">
                ▷ 0{index + 1}
              </span>
              <span>·</span>
              <span>{role.period}</span>
              <span>·</span>
              <span>{role.mode}</span>
              {role.current && (
                <span className="px-2 py-0.5 rounded-full bg-[var(--safelight)]/20 text-[var(--safelight)] font-bold text-[10px] ml-1">
                  CURRENT
                </span>
              )}
            </div>

            <h3
              id={`role-heading-${role.id}`}
              className="font-display font-black text-lg sm:text-xl text-[var(--text)]"
            >
              {role.role} <span className="text-[var(--text-dim)] font-normal">at</span>{' '}
              <strong className="text-[var(--text)]">{role.company}</strong>
            </h3>
          </div>

          <div className="flex items-center gap-2 text-[var(--text-dim)]">
            <span className="hidden sm:inline font-mono text-[10px] uppercase">
              {isExpanded ? 'COLLAPSE' : 'EXPAND'}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-[var(--safelight)]" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </header>

        {/* Collapsible Content */}
        {isExpanded && (
          <div
            id={`role-content-${role.id}`}
            className="p-5 sm:p-6 space-y-5 animate-in fade-in duration-200"
          >
            {/* Story */}
            <p className="font-text text-sm sm:text-base text-[var(--text)] leading-relaxed">
              {role.story}
            </p>

            {/* Key Outcomes */}
            <div>
              <span className="font-mono text-xs uppercase text-[var(--text-dim)] tracking-wider block mb-2 font-bold">
                KEY IMPACT &amp; DELIVERABLES:
              </span>
              <ul className="space-y-2">
                {role.outcomes.map((outcome, i) => (
                  <li
                    key={i}
                    className="font-text text-xs sm:text-sm text-[var(--text-dim)] flex items-start gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--safelight)] mt-1.5 shrink-0" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Chips & Linked Project */}
            <div className="pt-4 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5">
                {role.stack.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--surface-2)] border border-[var(--line)] text-[var(--text-dim)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {role.linkedProject && (
                <Link
                  href={`/projects/${role.linkedProject}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--safelight)] font-bold hover:underline"
                >
                  <span>View Project Case Study ({role.linkedProjectTitle})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
