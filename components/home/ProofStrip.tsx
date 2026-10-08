'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StatTileProps {
  value: string;
  label: string;
  evidenceLabel: string;
  href: string;
  external?: boolean;
}

const STATS: StatTileProps[] = [
  {
    value: '400+',
    label: 'Algorithmic Problems Solved',
    evidenceLabel: 'LeetCode Profile',
    href: 'https://leetcode.com/u/prit__2412/',
    external: true,
  },
  {
    value: '9.67',
    label: 'Cumulative CS GPA',
    evidenceLabel: 'Academic Record',
    href: '/resume',
    external: false,
  },
  {
    value: 'Sub-80ms',
    label: 'RAG Grounding & Search Latency',
    evidenceLabel: 'SearchMind API Spec',
    href: '/projects/searchmind',
    external: false,
  },
];

export function ProofStrip({ className }: { className?: string }) {
  return (
    <div
      aria-label="Verified Engineering Proof Points"
      className={cn(
        'w-full grid grid-cols-1 md:grid-cols-3 border-t border-b border-[var(--line)] bg-[var(--surface)]',
        className
      )}
    >
      {STATS.map((stat, idx) => {
        const Content = (
          <div className="group p-6 sm:p-8 flex flex-col justify-between h-full transition-colors duration-200 hover:bg-[var(--surface-2)]">
            <div className="flex items-start justify-between gap-4">
              <span className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[var(--text)] group-hover:text-[var(--safelight)] transition-colors tabular-nums">
                {stat.value}
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[var(--text-dim)] group-hover:text-[var(--safelight)] transition-colors border border-[var(--line)] px-2 py-0.5 rounded-[var(--radius-ui)] shrink-0">
                <span>{stat.evidenceLabel}</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-dim)] group-hover:text-[var(--text)] transition-colors">
                {stat.label}
              </p>
              <span className="font-mono text-[10px] text-[var(--text-dim)]">
                ▷ 0{idx + 1}
              </span>
            </div>
          </div>
        );

        return stat.external ? (
          <a
            key={stat.href}
            href={stat.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'block focus-visible:outline-2 focus-visible:outline-[var(--safelight)] focus-visible:outline-offset-[-2px]',
              idx !== 0 && 'md:border-l md:border-[var(--line)]',
              idx !== 0 && 'border-t md:border-t-0 border-[var(--line)]'
            )}
          >
            {Content}
          </a>
        ) : (
          <Link
            key={stat.href}
            href={stat.href}
            className={cn(
              'block focus-visible:outline-2 focus-visible:outline-[var(--safelight)] focus-visible:outline-offset-[-2px]',
              idx !== 0 && 'md:border-l md:border-[var(--line)]',
              idx !== 0 && 'border-t md:border-t-0 border-[var(--line)]'
            )}
          >
            {Content}
          </Link>
        );
      })}
    </div>
  );
}
