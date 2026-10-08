'use client';

import React, { useState } from 'react';
import { Button } from '@/components/system/Button';
import { Develop } from '@/components/motion/Develop';
import { AvailabilityPill } from '@/components/system/AvailabilityPill';
import { FrameCard } from '@/components/darkroom/FrameCard';
import { ThemeToggle } from '@/components/system/ThemeToggle';
import { useToast } from '@/components/system/Toast';

export default function StyleguidePage() {
  const { showToast } = useToast();
  const [developKey, setDevelopKey] = useState(0);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-12 sm:py-20 flex flex-col gap-16">
      {/* Header */}
      <div className="border-b border-[var(--line)] pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--safelight)] mb-3">
            <span>[INTERNAL NOINDEX]</span>
            <span>·</span>
            <span>TOKEN SPECIMEN</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-[var(--text)]">
            Darkroom Design System
          </h1>
          <p className="font-text text-sm sm:text-base text-[var(--text-dim)] mt-2 max-w-xl">
            Live token verification, contrast testing, typography hierarchy, and interactive primitives.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button
            variant="secondary"
            size="sm"
            onClick={() => showToast('Copied. Say hi.')}
          >
            Test Toast
          </Button>
        </div>
      </div>

      {/* 1. Colour Tokens */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
          <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--safelight)]">
            01 / COLOUR TOKENS &amp; CONTRAST PAIRS
          </h2>
          <span className="font-mono text-[10px] text-[var(--text-dim)] uppercase">
            WCAG 2.2 AA (Body ≥ 4.5:1, UI ≥ 3:1)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 font-mono text-xs">
          {/* BG */}
          <div className="p-4 border border-[var(--line)] rounded-[var(--radius-ui)] bg-[var(--bg)] flex flex-col justify-between h-36">
            <span className="text-[var(--text-dim)] text-[10px]">--bg</span>
            <div className="text-[var(--text)] font-bold">Background</div>
            <div className="text-[10px] text-[var(--text-dim)]">Base Canvas</div>
          </div>

          {/* Surface */}
          <div className="p-4 border border-[var(--line)] rounded-[var(--radius-ui)] bg-[var(--surface)] flex flex-col justify-between h-36">
            <span className="text-[var(--text-dim)] text-[10px]">--surface</span>
            <div className="text-[var(--text)] font-bold">Surface</div>
            <div className="text-[10px] text-[var(--text-dim)]">Cards &amp; Panels</div>
          </div>

          {/* Surface 2 */}
          <div className="p-4 border border-[var(--line)] rounded-[var(--radius-ui)] bg-[var(--surface-2)] flex flex-col justify-between h-36">
            <span className="text-[var(--text-dim)] text-[10px]">--surface-2</span>
            <div className="text-[var(--text)] font-bold">Surface 2</div>
            <div className="text-[10px] text-[var(--text-dim)]">Active / Modals</div>
          </div>

          {/* Line */}
          <div className="p-4 border border-[var(--line)] rounded-[var(--radius-ui)] bg-[var(--surface)] flex flex-col justify-between h-36">
            <span className="text-[var(--text-dim)] text-[10px]">--line</span>
            <div className="h-[2px] w-full bg-[var(--line)] my-auto" />
            <div className="text-[10px] text-[var(--text-dim)]">1px Hairlines</div>
          </div>

          {/* Text */}
          <div className="p-4 border border-[var(--line)] rounded-[var(--radius-ui)] bg-[var(--surface)] flex flex-col justify-between h-36">
            <span className="text-[var(--text-dim)] text-[10px]">--text</span>
            <div className="text-[var(--text)] font-bold text-base">Primary Text</div>
            <div className="text-[10px] text-[var(--safelight)] font-bold">&gt;14:1 Contrast</div>
          </div>

          {/* Text Dim */}
          <div className="p-4 border border-[var(--line)] rounded-[var(--radius-ui)] bg-[var(--surface)] flex flex-col justify-between h-36">
            <span className="text-[var(--text-dim)] text-[10px]">--text-dim</span>
            <div className="text-[var(--text-dim)] font-medium">Dimmed Text</div>
            <div className="text-[10px] text-[var(--safelight)] font-bold">&gt;6:1 Contrast</div>
          </div>

          {/* Safelight */}
          <div className="p-4 border border-[var(--line)] rounded-[var(--radius-ui)] bg-[var(--surface)] flex flex-col justify-between h-36">
            <span className="text-[var(--text-dim)] text-[10px]">--safelight</span>
            <div className="text-[var(--safelight)] font-black text-base">Safelight</div>
            <div className="text-[10px] text-[var(--safelight)] font-bold">≤5% Viewport Area</div>
          </div>
        </div>
      </section>

      {/* 2. Typography Specimen */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
          <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--safelight)]">
            02 / TYPOGRAPHY HIERARCHY &amp; VARIABLE AXES
          </h2>
          <span className="font-mono text-[10px] text-[var(--text-dim)] uppercase">
            Archivo Display · Geist Text · Geist Mono
          </span>
        </div>

        <div className="flex flex-col gap-8 p-6 border border-[var(--line)] rounded-[var(--radius-ui)] bg-[var(--surface)]">
          {/* Display Hero Clamp */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-dim)]">
              Hero Clamp [Archivo Variable wght 800 wdth 125]
            </span>
            <div className="font-display font-black text-4xl sm:text-7xl tracking-[-0.03em] text-[var(--text)] uppercase leading-none">
              PRIT PATEL
            </div>
          </div>

          {/* Section Titles */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-dim)]">
              Section Title H2 [Archivo wght 700 wdth 100]
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-[var(--text)] tracking-tight">
              Chemical Precision in Distributed Systems
            </h2>
          </div>

          {/* Body Text */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-dim)]">
              Body Text [Geist 400 18px 1.6lh]
            </span>
            <p className="font-text text-base sm:text-lg text-[var(--text)] max-w-3xl leading-relaxed">
              A developer is the chemical agent that turns an unexposed negative into a sharp print on paper.
              Code execution requires strict deterministic pipelines, low-latency evaluation, and zero unnecessary abstractions.
            </p>
          </div>

          {/* Monospace Counters */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-dim)]">
              Telemetry &amp; Counters [Geist Mono Tabular]
            </span>
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-dim)] flex items-center gap-6">
              <span>▷ FRAME 01 / 04</span>
              <span>22.3072° N, 73.1812° E</span>
              <span className="text-[var(--safelight)]">LIVE STATUS: AVAILABLE</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Button Primitives */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
          <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--safelight)]">
            03 / BUTTONS &amp; MAGNETIC PULL
          </h2>
          <span className="font-mono text-[10px] text-[var(--text-dim)] uppercase">
            44px Min Touch Target · Max 8px Pull
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 p-6 border border-[var(--line)] rounded-[var(--radius-ui)] bg-[var(--surface)]">
          <Button variant="primary" size="md">
            Primary Safelight
          </Button>

          <Button variant="secondary" size="md">
            Secondary Outline
          </Button>

          <Button variant="ghost" size="md">
            Ghost Control
          </Button>

          <Button variant="primary" size="sm">
            Small 38px
          </Button>

          <Button variant="primary" size="lg">
            Large 48px
          </Button>

          <Button variant="primary" size="md" disabled>
            Disabled State
          </Button>
        </div>
      </section>

      {/* 4. Develop Primitive & Availability Pill */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
          <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--safelight)]">
            04 / &lt;DEVELOP&gt; FILTER PRIMITIVE &amp; AVAILABILITY PILL
          </h2>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setDevelopKey((k) => k + 1)}
          >
            Re-trigger Develop
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 border border-[var(--line)] rounded-[var(--radius-ui)] bg-[var(--surface)] flex flex-col justify-between gap-6">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-dim)]">
              &lt;Develop&gt; Reveal (Blur 12px → 0, Brightness 0.2 → 1, 900ms)
            </span>

            <Develop key={developKey} forceDevelop={false} className="p-6 bg-[var(--surface-2)] border border-[var(--line)] rounded">
              <div className="font-display font-bold text-2xl text-[var(--text)] mb-2">
                Chemical Emulsion Developed
              </div>
              <p className="font-text text-sm text-[var(--text-dim)]">
                Fires once at 15% visibility. Degrades safely to a 150ms opacity fade under prefers-reduced-motion.
              </p>
            </Develop>
          </div>

          <div className="p-6 border border-[var(--line)] rounded-[var(--radius-ui)] bg-[var(--surface)] flex flex-col justify-between gap-6">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-dim)]">
              Availability Pill (Slow Pulse Indicator)
            </span>

            <div className="my-auto flex flex-col gap-4">
              <div>
                <AvailabilityPill status="Available for Q2/Q3 Roles" />
              </div>
              <div>
                <AvailabilityPill status="Open for AI Systems Consulting" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FrameCard Shell */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
          <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--safelight)]">
            05 / FRAMECARD CONTACT-SHEET TILE
          </h2>
          <span className="font-mono text-[10px] text-[var(--text-dim)] uppercase">
            1px Keyline · 0px Radius · Typographic Placeholder
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FrameCard
            slug="redforge"
            frameNumber="01"
            title="RedForge AI"
            year="2026"
            role="Systems & Security"
            outcome="Autonomous offensive security assessment engine with parallel tool calling."
          />

          <FrameCard
            slug="searchmind"
            frameNumber="02"
            title="SearchMind API"
            year="2025"
            role="AI Engineering"
            outcome="Sub-80ms hybrid search & RAG grounding engine with semantic chunking."
          />

          <FrameCard
            slug="kemlang"
            frameNumber="03"
            title="KemLang Compiler"
            year="2025"
            role="Compiler Design"
            outcome="Regional Gujarati programming language interpreter with AST visualization."
          />
        </div>
      </section>

      {/* 6. Keyboard & A11y Verification */}
      <section className="flex flex-col gap-4 p-6 border border-[var(--line)] rounded-[var(--radius-ui)] bg-[var(--surface)] font-mono text-xs text-[var(--text-dim)]">
        <div className="font-bold text-[var(--text)] uppercase tracking-wider text-sm flex items-center justify-between border-b border-[var(--line)] pb-2">
          <span>KEYBOARD &amp; ACCESSIBILITY CHECKLIST</span>
          <span className="text-[var(--safelight)]">READY FOR VERIFICATION</span>
        </div>
        <ul className="space-y-1.5 list-disc list-inside pt-2">
          <li>Press <kbd className="px-1 border border-[var(--line)] rounded">Tab</kbd> to verify skip-link and visible 2px safelight focus ring.</li>
          <li>Press <kbd className="px-1 border border-[var(--line)] rounded">⌘K</kbd> or <kbd className="px-1 border border-[var(--line)] rounded">/</kbd> to launch Command Palette.</li>
          <li>Use <kbd className="px-1 border border-[var(--line)] rounded">↑</kbd> <kbd className="px-1 border border-[var(--line)] rounded">↓</kbd> and <kbd className="px-1 border border-[var(--line)] rounded">Enter</kbd> to navigate palette without pointer.</li>
          <li>Click ThemeToggle to witness circular iris wipe View Transition.</li>
          <li>Check that minimum touch target for every interactive item is ≥ 44px.</li>
        </ul>
      </section>
    </div>
  );
}
