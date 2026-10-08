'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/system/Button';
import { Develop } from '@/components/motion/Develop';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] max-w-[1440px] mx-auto px-4 sm:px-8 py-20 flex flex-col justify-center items-center text-center">
      <Develop className="flex flex-col items-center max-w-2xl">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--safelight)] uppercase tracking-widest border border-[var(--line)] px-3 py-1 rounded-[var(--radius-ui)] mb-8">
          <span>▷ FRAME 404</span>
          <span>·</span>
          <span>LATENT NEGATIVE</span>
        </div>

        <h1 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight text-[var(--text)] mb-6">
          Frame not found — this link was overexposed.
        </h1>

        <p className="font-text text-base sm:text-lg text-[var(--text-dim)] max-w-xl mx-auto mb-10 leading-relaxed">
          The requested emulsion has no recorded data. The negative may have been retired,
          relocated, or never developed into the chemical bath.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button href="/" variant="primary" size="md">
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Return Home</span>
          </Button>

          <Button href="/projects" variant="secondary" size="md">
            <span>Browse Contact Sheet</span>
          </Button>
        </div>
      </Develop>
    </div>
  );
}
