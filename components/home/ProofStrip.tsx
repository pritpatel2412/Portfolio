'use client';

import React from 'react';

const METRICS = [
  { value: '400+', label: 'LeetCode Problems Solved', note: 'Data structures & algorithmic graph theory' },
  { value: '9.67', label: 'Undergraduate GPA', note: 'Computer Science & Engineering' },
  { value: '4.2x', label: 'Scan Concurrency Speedup', note: 'RedForge distributed security engine' },
  { value: '< 240ms', label: 'P95 Extraction Latency', note: 'SearchMind real-time agent RAG pipeline' },
];

export function ProofStrip() {
  return (
    <section className="py-16 md:py-24 border-t border-[var(--line)]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {METRICS.map((m, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--ink)] font-mono tracking-tight">
                {m.value}
              </span>
              <span className="font-sans font-semibold text-sm md:text-base text-[var(--ink)]">
                {m.label}
              </span>
              <span className="font-mono text-xs text-[var(--ink-muted)] leading-relaxed">
                {m.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
