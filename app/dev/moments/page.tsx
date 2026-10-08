'use client';

import React from 'react';
import Link from 'next/link';
import {
  MomentsControlBar,
  useMomentsControls,
} from '@/components/moments/MomentsControlBar';
import { M1DevelopIntroStage } from '@/components/moments/M1DevelopIntroStage';
import { M2NameResponseStage } from '@/components/moments/M2NameResponseStage';
import { M4LoupeStage } from '@/components/moments/M4LoupeStage';
import { M5PicksStage } from '@/components/moments/M5PicksStage';
import { M8IrisToggleStage } from '@/components/moments/M8IrisToggleStage';
import {
  MomentStubCard,
  type MomentSpec,
} from '@/components/moments/MomentStubCard';
import { cn } from '@/lib/utils';

const STUB_SPECS: MomentSpec[] = [
  {
    id: 'M3',
    title: 'Contact-Sheet Camera',
    target: 'Home (/), Selected Work',
    trigger: 'Scroll through selected work section (desktop >= 1024px)',
    timeline:
      'min(300vh, N × 70vh) ScrollTrigger with label per frame, snap: labels, scrub: 0.6. Each step tweens x, y, scale to 72% viewport width over 900ms; caption rises 24px over 450ms; other frames dim to 25%. Camera pulls back to scale 0.55 over 500ms between frames.',
    easing: 'inOut (power3.inOut)',
    reducedMotion:
      'No pin, no camera moves; renders as a clean stacked list of frames with captions.',
    mobile: 'Stacked cards, native touch scroll; pin and camera completely disabled.',
    performance:
      'One transformed layer (will-change only while animating); thumbnails <= 480px; initial section images <= 350KB.',
  },
  {
    id: 'M6',
    title: 'Shared-Element Transition',
    target: 'FrameCard -> Case Study Hero (/projects/[slug])',
    trigger: 'Click on any project frame card',
    timeline:
      '560ms total. view-transition-name: frame-<slug> on image. Outgoing page dims to 35% over 240ms; image morphs inOut; title wdth eases 62 -> 100 over 480ms; incoming sections develop on arrival.',
    easing: 'inOut (power3.inOut)',
    reducedMotion: 'Instant navigation with 150ms opacity fade fallback.',
    mobile: 'Shared-element transition where supported, with 200ms crossfade fallback.',
    performance:
      'Prefetch on hover/focus after 100ms intent; navigation never delayed >100ms beyond network time.',
  },
  {
    id: 'M7',
    title: 'Chapter Stamps',
    target: 'Case study spine (/projects/[slug])',
    trigger: 'Entering each chapter (Develop, Stop, Fix) via scroll',
    timeline:
      'Label types on in Geist Mono at 30ms per character (▷ 04A · DEVELOP) while chapter first image develops; rail marker updates.',
    easing: 'Linear typing, expo.out on develop',
    reducedMotion: 'Instant text display without typing stagger.',
    mobile: 'Same; rail transforms into top reading progress bar.',
    performance:
      'Transforms and text updates only; unmounts or pauses when out of view.',
  },
  {
    id: 'M9',
    title: 'Contact Success',
    target: 'Contact form (/contact)',
    trigger: 'Successful submission of contact form',
    timeline:
      'Fields fade to 0 over 240ms; container height animates to confirmation (FLIP); confirmation text develops (blur 8 -> 0, 600ms).',
    easing: 'out (expo.out)',
    reducedMotion: 'Instant swap from form to confirmation without height FLIP.',
    mobile: 'Full-width smooth height collapse.',
    performance:
      'FLIP calculation on transform/height with GPU composite.',
  },
  {
    id: 'M10',
    title: '404 and Empty States',
    target: '404 not found & empty project filter results',
    trigger: 'Navigation to non-existent route or filter query with 0 items',
    timeline:
      'Contact sheet frame rendered with hand-drawn grease-pencil red X and line "Frame not found — this link was overexposed."',
    easing: 'out (expo.out) for SVG stroke draw (420ms)',
    reducedMotion: 'Red X appears instantly without stroke animation.',
    mobile: 'Centered responsive single-frame card.',
    performance: 'Zero external requests; SVG rendered inline.',
  },
  {
    id: 'M11',
    title: 'Console Hello',
    target: 'Global developer console',
    trigger: 'First browser load / DOM ready',
    timeline: 'Instant console.info execution on startup.',
    easing: 'Immediate',
    reducedMotion: 'Identical (text only).',
    mobile: 'Identical (text only).',
    performance:
      'Small ASCII banner, one line on who you are and email. No tracking or telemetry ping.',
  },
  {
    id: 'M12',
    title: 'Keyboard Layer',
    target: 'Global keyboard shortcuts sheet',
    trigger: 'Pressing "?" key anywhere on site',
    timeline: 'Modal sheet rises 24px and fades in over 240ms.',
    easing: 'expo.out',
    reducedMotion: 'Instant display without translate.',
    mobile: 'Accessible through bottom footer shortcuts link.',
    performance:
      'Single-key shortcuts have an off switch (WCAG 2.1.4), never fire while typing in form inputs.',
  },
];

export default function MomentsPage() {
  const controls = useMomentsControls();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-24">
      {/* Motion Lab Control Bar & Telemetry */}
      <MomentsControlBar controls={controls} />

      {/* Main Container / Mobile Simulation Frame */}
      <div
        className={cn(
          'transition-all duration-300 mx-auto px-4 sm:px-8 pt-8',
          controls.isMobile
            ? 'max-w-[390px] border-2 border-[var(--line)] shadow-2xl rounded-2xl my-6 bg-[var(--bg)] p-4'
            : 'max-w-7xl'
        )}
      >
        {/* Lab Header */}
        <div className="mb-10 pb-6 border-b border-[var(--line)]">
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--safelight)] uppercase tracking-wider mb-2">
            <span>▷ 00 · MOTION ENGINEERING LAB</span>
            <span className="text-[var(--text-dim)]">/</span>
            <span className="text-[var(--text-dim)]">AGENTS.MD COMPLIANCE</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl tracking-[-0.03em]">
            Signature Moments Sandbox
          </h1>
          <p className="font-text text-sm sm:text-base text-[var(--text-dim)] mt-3 max-w-2xl leading-relaxed">
            Per Brief Section 14 and standing rules, only twelve signature moments may animate.
            Every moment is engineered, calibrated, and stress-tested in this isolated lab before
            wiring into production pages.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--text-dim)]">
            <Link
              href="/dev/styleguide"
              className="text-[var(--safelight)] hover:underline inline-flex items-center gap-1"
            >
              <span>← View Design Styleguide</span>
            </Link>
            <span>·</span>
            <Link
              href="/"
              className="text-[var(--text)] hover:underline inline-flex items-center gap-1"
            >
              <span>View Production Home →</span>
            </Link>
          </div>
        </div>

        {/* Phase 1b Active Implementations */}
        <section className="space-y-10 mb-16" aria-label="Active Signature Moments">
          <div className="flex items-center gap-3 font-mono text-sm uppercase tracking-wider text-[var(--text)]">
            <span className="w-2 h-2 rounded-full bg-[var(--safelight)]" />
            <h2 className="font-bold">ACTIVE IMPLEMENTATIONS (TUNED &amp; VERIFIED)</h2>
          </div>

          {/* M1: Develop Intro */}
          <M1DevelopIntroStage
            speed={controls.speed}
            isReduced={controls.isReduced}
            isMobile={controls.isMobile}
            replayKey={controls.replayKey}
          />

          {/* M2: Name Response & Exit */}
          <M2NameResponseStage
            speed={controls.speed}
            isReduced={controls.isReduced}
            isMobile={controls.isMobile}
            replayKey={controls.replayKey}
          />

          {/* M4: Loupe Cursor */}
          <M4LoupeStage
            speed={controls.speed}
            isReduced={controls.isReduced}
            isMobile={controls.isMobile}
            replayKey={controls.replayKey}
          />

          {/* M5: Picks (Grease-Pencil Marks & Tray) */}
          <M5PicksStage />

          {/* M8: Iris Theme Toggle */}
          <M8IrisToggleStage />
        </section>

        {/* Stubbed Moments (Section 14 Choreography Sheets) */}
        <section className="space-y-6 pt-10 border-t border-[var(--line)]" aria-label="Stubbed Signature Moments">
          <div className="flex items-center justify-between font-mono text-sm uppercase tracking-wider text-[var(--text-dim)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-none border border-[var(--safelight)] rotate-45" />
              <h2 className="font-bold text-[var(--text)]">
                SPECIFICATION CHOREOGRAPHY STUBS (M3, M6, M7, M9, M10, M11, M12)
              </h2>
            </div>
            <span>[7 REMAINING MOMENTS]</span>
          </div>

          <div className="space-y-6">
            {STUB_SPECS.map((spec) => (
              <MomentStubCard key={spec.id} spec={spec} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
