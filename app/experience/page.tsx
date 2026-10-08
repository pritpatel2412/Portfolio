import React from 'react';
import type { Metadata } from 'next';
import { site } from '@/content/site';
import { Develop } from '@/components/motion/Develop';

export const metadata: Metadata = {
  title: `Experience & Career — ${site.name}`,
  description: 'Chronological timeline of engineering roles, internships, and technical leadership.',
};

export default function ExperiencePage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 sm:py-24 flex flex-col gap-12">
      <Develop>
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--safelight)] mb-4">
          <span>▷ FRAME 02</span>
          <span>·</span>
          <span>CHRONOLOGY &amp; CAREER</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-[var(--text)] tracking-tight">
          Experience &amp; Trajectory
        </h1>
        <p className="font-text text-base sm:text-lg text-[var(--text-dim)] max-w-2xl mt-4 leading-relaxed">
          Production software engineering, AI systems orchestration, and performance tuning across startups and platforms.
        </p>
      </Develop>

      {/* Skeleton Content - Populated fully in Phase 4 */}
      <div className="border border-[var(--line)] p-8 rounded-[var(--radius-ui)] bg-[var(--surface)] text-[var(--text-dim)] font-mono text-xs">
        <p>[ Experience timeline skeleton — will develop full interactive roles in Phase 4 ]</p>
      </div>
    </div>
  );
}
