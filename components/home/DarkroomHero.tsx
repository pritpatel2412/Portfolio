'use client';

import React, { useState, useEffect } from 'react';
import { KineticWordmark } from './KineticWordmark';
import { ProofStrip } from './ProofStrip';
import { Button } from '@/components/system/Button';
import { AvailabilityPill } from '@/components/system/AvailabilityPill';
import { Develop } from '@/components/motion/Develop';
import { site } from '@/content/site';
import { ArrowDown } from 'lucide-react';

export function DarkroomHero() {
  const scrollToSelectedWork = () => {
    const target = document.getElementById('selected-work');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      aria-label="Hero Overview"
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden pt-8 sm:pt-12"
    >

      {/* Subtle Safelight Glow behind name (Brief §4: <= 8% opacity) */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] safelight-glow"
        aria-hidden="true"
      />

      {/* Main Hero Container */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 py-8 sm:py-16 flex-1 flex flex-col justify-center gap-10 sm:gap-14">
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--safelight)]">
            <span>▷ FRAME 00</span>
            <span>·</span>
            <span>DEVELOPER &amp; ARCHITECT</span>
          </div>

          <AvailabilityPill status="Available for Q2/Q3 Roles" />
        </div>

        {/* Centerpiece: Monumental Kinetic Wordmark & Side Latent Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Huge Name in Archivo Display */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex flex-col gap-0 select-none">
              <KineticWordmark
                text="PRIT"
                className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] tracking-[-0.03em] text-[var(--text)] leading-[0.85]"
              />
              <KineticWordmark
                text="PATEL"
                className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] tracking-[-0.03em] text-[var(--text)] leading-[0.85]"
              />
            </div>

            {/* Positioning Sentence: ≤ 22 words (Brief §7.1 & §8) */}
            <p className="font-text text-lg sm:text-xl lg:text-2xl text-[var(--text-dim)] max-w-2xl leading-relaxed">
              I build resilient backend systems and autonomous AI agents for high-throughput platforms so that mission-critical workflows execute with deterministic reliability.
            </p>

            {/* Actions / CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToSelectedWork}
              >
                <span>See Selected Work</span>
                <ArrowDown className="w-4 h-4 ml-1" />
              </Button>

              <Button
                variant="secondary"
                size="lg"
                href="/contact"
              >
                <span>Get in Touch</span>
              </Button>
            </div>
          </div>

          {/* Right: Latent Monogram Frame developing in */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <Develop className="w-full max-w-[320px] aspect-[4/5] border border-[var(--line)] bg-[var(--surface)] p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]">
                <span>EMULSION · LATENT</span>
                <span className="text-[var(--safelight)]">ISO 400</span>
              </div>

              <div className="text-center my-auto">
                <span className="font-display font-black text-6xl sm:text-7xl text-[var(--text)] tracking-tight">
                  PP
                </span>
                <p className="font-mono text-xs text-[var(--safelight)] uppercase tracking-widest mt-2">
                  [ 22.3072° N · Vadodara ]
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-[var(--line)] pt-3 font-mono text-[10px] uppercase text-[var(--text-dim)]">
                <span>SYSTEMS &amp; AGENTS</span>
                <span>▷ PRINT 01</span>
              </div>
            </Develop>
          </div>
        </div>
      </div>

      {/* Bottom Proof Strip */}
      <ProofStrip />
    </section>
  );
}
