'use client';

import React from 'react';

const MARQUEE_ITEMS = [
  { text: 'AUTONOMOUS AGENTS', outline: false, serif: false },
  { text: 'KemLang Compiler', outline: true, serif: true },
  { text: 'HIGH-THROUGHPUT RAG', outline: false, serif: false },
  { text: 'RedForge Pentesting', outline: false, serif: true },
  { text: '9.67 GPA RIGOR', outline: true, serif: false },
  { text: '400+ Algorithmic Proofs', outline: false, serif: true },
  { text: 'FASTAPI CONCURRENCY', outline: true, serif: false },
  { text: 'Zero Runtime Tolerance', outline: false, serif: true },
  { text: 'VADODARA · INDIA', outline: true, serif: false },
];

export function MarqueeStream() {
  return (
    <section className="relative w-full overflow-hidden border-y border-[var(--line)] bg-[var(--bg-surface)] py-6 sm:py-8 md:py-12 select-none">
      <div className="flex w-max animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused]">
        {/* Render 3 copies for seamless infinite scroll loop */}
        {[0, 1, 2].map((cycle) => (
          <div key={cycle} className="flex shrink-0 items-center">
            {MARQUEE_ITEMS.map((item, idx) => (
              <span key={`${cycle}-${idx}`} className="flex shrink-0 items-center">
                <span
                  className={`whitespace-nowrap px-4 sm:px-8 text-[clamp(2rem,5.5vw,4.5rem)] leading-none tracking-tight transition-all duration-300 hover:text-[var(--accent)] ${
                    item.serif
                      ? 'font-serif italic font-light'
                      : 'font-sans font-black tracking-[-0.03em] uppercase'
                  } ${
                    item.outline
                      ? 'text-transparent [-webkit-text-stroke:1px_var(--ink)] opacity-70'
                      : 'text-[var(--ink)]'
                  }`}
                >
                  {item.text}
                </span>
                <span className="text-sm sm:text-base text-[var(--accent)] px-2">✶</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
