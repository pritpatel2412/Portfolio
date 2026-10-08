'use client';

import React, { useState } from 'react';
import { FrameCard } from '@/components/darkroom/FrameCard';
import { usePicks, MAX_PICKS } from '@/lib/picks';
import { PicksTray } from '@/components/darkroom/PicksTray';
import { useToast } from '@/components/system/Toast';

const DEMO_PROJECTS = [
  {
    slug: 'redforge-infra',
    frameNumber: '01',
    title: 'RedForge Infrastructure',
    year: '2025',
    role: 'Lead Architect',
    outcome: 'Sub-80ms p95 latency across distributed edge nodes',
    imageSrc: '/RedForge.png',
  },
  {
    slug: 'searchmind-api',
    frameNumber: '02',
    title: 'SearchMind API',
    year: '2024',
    role: 'Staff Engineer',
    outcome: 'Real-time neural search index serving 12M requests/day',
    imageSrc: '/Searchmind API.png',
  },
  {
    slug: 'kemlang-compiler',
    frameNumber: '03',
    title: 'KemLang Compiler',
    year: '2024',
    role: 'Author',
    outcome: 'Deterministic bytecode generation with zero runtime GC',
    imageSrc: '/kemlang_thumbnail.png',
  },
];

export function M5PicksStage() {
  const { picks, count, clear } = usePicks();
  const { showToast } = useToast();
  const [isTrayOpen, setIsTrayOpen] = useState(false);

  const simulateLimitAttempt = () => {
    showToast('Maximum 5 shortlisted picks reached. Shortlist is full.');
  };

  return (
    <div
      className="rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface)] overflow-hidden p-6 sm:p-8"
      role="region"
      aria-label="M5 Picks & Grease-Pencil Stage"
    >
      {/* Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[var(--line)] font-mono text-xs text-[var(--text-dim)]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--safelight)]" />
          <strong className="text-[var(--text)] uppercase">
            M5 · PICKS (GREASE-PENCIL MARKS)
          </strong>
          <span className="text-[var(--safelight)] font-bold">
            [{count} / {MAX_PICKS} STORED]
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsTrayOpen(true)}
            className="px-3 py-1.5 rounded-[var(--radius-ui)] bg-[var(--surface-2)] border border-[var(--line)] hover:border-[var(--safelight)] text-[var(--text)] transition-colors cursor-pointer"
          >
            OPEN PICKS TRAY ({count})
          </button>
          <button
            type="button"
            onClick={simulateLimitAttempt}
            className="px-3 py-1.5 rounded-[var(--radius-ui)] border border-amber-500/40 text-amber-400 hover:bg-amber-500/10 transition-colors cursor-pointer"
          >
            TEST 6TH LIMIT SHAKE
          </button>
          {count > 0 && (
            <button
              type="button"
              onClick={clear}
              className="text-[var(--text-dim)] hover:text-[var(--safelight)] transition-colors"
            >
              CLEAR PICKS
            </button>
          )}
        </div>
      </div>

      {/* Frame Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DEMO_PROJECTS.map((proj) => (
          <FrameCard key={proj.slug} {...proj} />
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[var(--text-dim)]">
        <p>
          [ Click the 24px circular Mark button on any frame to draw the red grease-pencil ellipse (420ms ease-out) ]
        </p>
        <span className="text-[var(--safelight)]">
          Persistence: sessionStorage only (no PII)
        </span>
      </div>

      {/* Embedded Tray Demo */}
      <PicksTray isOpen={isTrayOpen} onClose={() => setIsTrayOpen(false)} />
    </div>
  );
}
