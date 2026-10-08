import React from 'react';
import type { Metadata } from 'next';
import { site } from '@/content/site';
import { Develop } from '@/components/motion/Develop';

export const metadata: Metadata = {
  title: `Colophon & Specs — ${site.name}`,
  description: 'Technical specifications, typography provenance, and architecture notes for the Darkroom portfolio.',
};

export default function ColophonPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-16 sm:py-24 flex flex-col gap-12">
      {/* Header */}
      <Develop>
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--safelight)] mb-4">
          <span>▷ FRAME 07</span>
          <span>·</span>
          <span>SYSTEM SPECIFICATIONS &amp; COLOPHON</span>
        </div>

        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-[var(--text)] tracking-tight">
          System Colophon
        </h1>
        <p className="font-text text-base sm:text-lg text-[var(--text-dim)] max-w-2xl mt-4 leading-relaxed">
          The technical architecture, typography, and performance engineering behind this digital artifact.
        </p>
      </Develop>

      {/* Specifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
        {/* Architecture */}
        <div className="p-6 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius-ui)] space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 font-bold text-sm text-[var(--text)]">
            <span>01 / ARCHITECTURE &amp; RUNTIME</span>
            <span className="text-[var(--safelight)]">NEXT 15</span>
          </div>
          <ul className="space-y-2.5 text-[var(--text-dim)] leading-relaxed">
            <li>
              <strong className="text-[var(--text)]">Framework:</strong> Next.js 15.2 App Router with React 19 Server Components.
            </li>
            <li>
              <strong className="text-[var(--text)]">Styling:</strong> Tailwind CSS v4 driven strictly by CSS variable design tokens.
            </li>
            <li>
              <strong className="text-[var(--text)]">Theming:</strong> Darkroom (dark `#0A0908`) &amp; Lightbox (light `#F1EDE4`) with iris circular View Transitions.
            </li>
            <li>
              <strong className="text-[var(--text)]">Motion:</strong> GSAP 3.15 + Lenis smooth scroll with strict reduced-motion &amp; save-data guards.
            </li>
          </ul>
        </div>

        {/* Typography */}
        <div className="p-6 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius-ui)] space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 font-bold text-sm text-[var(--text)]">
            <span>02 / TYPOGRAPHY PROVENANCE</span>
            <span className="text-[var(--safelight)]">VARIABLE</span>
          </div>
          <ul className="space-y-2.5 text-[var(--text-dim)] leading-relaxed">
            <li>
              <strong className="text-[var(--text)]">Display:</strong> Archivo Variable (wght 100–900, wdth 62–125) with pointer proximity kinetics.
            </li>
            <li>
              <strong className="text-[var(--text)]">Body Text:</strong> Geist (400/500) set at 18px / 1.6 line-height for high legibility.
            </li>
            <li>
              <strong className="text-[var(--text)]">Metadata &amp; Counters:</strong> Geist Mono with tabular numerals and uppercase tracking.
            </li>
            <li>
              <strong className="text-[var(--text)]">Loading:</strong> Self-hosted via next/font with zero cumulative layout shift.
            </li>
          </ul>
        </div>

        {/* Photographic Metaphor */}
        <div className="p-6 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius-ui)] space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 font-bold text-sm text-[var(--text)]">
            <span>03 / THE METAPHOR: DARKROOM</span>
            <span className="text-[var(--safelight)]">CHEMICAL</span>
          </div>
          <p className="text-[var(--text-dim)] leading-relaxed">
            A developer is the chemical catalyst that turns an exposed negative into a sharp print on paper.
            Pages arrive dark and develop into focus via filter transitions. Projects form a 12-column contact sheet.
            Case studies follow Develop → Stop → Fix.
          </p>
        </div>

        {/* Accessibility & Gates */}
        <div className="p-6 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius-ui)] space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 font-bold text-sm text-[var(--text)]">
            <span>04 / ACCESSIBILITY &amp; BUDGETS</span>
            <span className="text-[var(--safelight)]">WCAG 2.2 AA</span>
          </div>
          <ul className="space-y-2.5 text-[var(--text-dim)] leading-relaxed">
            <li>
              <strong className="text-[var(--text)]">Contrast:</strong> Body text ≥ 14:1, secondary ≥ 5:1, UI ≥ 3:1.
            </li>
            <li>
              <strong className="text-[var(--text)]">Touch Targets:</strong> 44px min dimension across all interactive controls.
            </li>
            <li>
              <strong className="text-[var(--text)]">Keyboard:</strong> 100% reachable with visible 2px safelight focus rings.
            </li>
            <li>
              <strong className="text-[var(--text)]">Motion Safety:</strong> Animations drop to instantaneous or 150ms opacity fades on reduced-motion.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
