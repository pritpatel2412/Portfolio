'use client';

import React from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Deconstruct Constraints',
    desc: 'Map out the core data model, latency budgets, and security boundaries before choosing libraries.',
    deliverable: 'Technical architecture specification & schema contracts',
  },
  {
    num: '02',
    title: 'Tight Incremental Build',
    desc: 'Develop in small, verifiable slices with strict type-safety, robust error recovery, and zero boilerplate.',
    deliverable: 'Working end-to-end prototype with integration tests',
  },
  {
    num: '03',
    title: 'Profile & Ship',
    desc: 'Audit real network waterfalls, memory footprint, and edge latency under realistic concurrency loads.',
    deliverable: 'Production deployment with zero-drift CI pipelines',
  },
  {
    num: '04',
    title: 'Measure & Harden',
    desc: 'Continuously verify output accuracy, monitor regression alerts, and refine agent evaluation harnesses.',
    deliverable: 'Evaluation scorecard & automated regression test suite',
  },
];

export function Process() {
  return (
    <section className="py-20 md:py-32 border-t border-[var(--line)]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 flex flex-col gap-12">
        <div className="flex items-center justify-between font-mono text-xs text-[var(--ink-muted)]">
          <span>05 / EXECUTION METHODOLOGY</span>
          <span>DISCIPLINE OVER SPECULATION</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((s) => (
            <div
              key={s.num}
              className="p-6 rounded-xl border border-[var(--line)] bg-[var(--bg-raised)] flex flex-col justify-between gap-6"
            >
              <div className="space-y-3">
                <span className="font-mono text-xs text-[var(--signal)] font-bold">
                  {s.num} / STEP
                </span>
                <h3 className="font-display text-xl font-bold text-[var(--ink)]">
                  {s.title}
                </h3>
                <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--line)] font-mono text-[11px] text-[var(--ink)]">
                <span className="text-[var(--ink-muted)] block text-[10px] uppercase">Deliverable:</span>
                {s.deliverable}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
