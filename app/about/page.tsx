import React from 'react';
import type { Metadata } from 'next';
import { site } from '@/content/site';
import { Develop } from '@/components/motion/Develop';

export const metadata: Metadata = {
  title: `About the Engineer — ${site.name}`,
  description: 'First-person narrative, operating principles, hardware setup, and background.',
};

export default function AboutPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 sm:py-24 flex flex-col gap-12">
      <Develop>
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--safelight)] mb-4">
          <span>▷ FRAME 03</span>
          <span>·</span>
          <span>BIOGRAPHY &amp; OPERATING SYSTEM</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-[var(--text)] tracking-tight">
          About Prit Patel
        </h1>
        <p className="font-text text-base sm:text-lg text-[var(--text-dim)] max-w-2xl mt-4 leading-relaxed">
          {site.positioning.lead} {site.positioning.italicPhrase} {site.positioning.trail}
        </p>
      </Develop>

      {/* Skeleton Content - Populated fully in Phase 4 */}
      <div className="border border-[var(--line)] p-8 rounded-[var(--radius-ui)] bg-[var(--surface)] text-[var(--text-dim)] font-mono text-xs">
        <p>[ About &amp; Portrait skeleton — will develop narrative &amp; setup in Phase 4 ]</p>
      </div>
    </div>
  );
}
