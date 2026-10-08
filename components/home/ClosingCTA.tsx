'use client';

import React, { useState } from 'react';
import { Copy, Check, ArrowRight, Clock, Mail } from 'lucide-react';
import { Button } from '@/components/system/Button';
import { useToast } from '@/components/system/Toast';
import { site } from '@/content/site';

export function ClosingCTA() {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(site.email);
    setCopied(true);
    showToast('Copied. Say hi.');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      aria-label="Contact and Collaboration"
      className="relative w-full border-b border-[var(--line)] bg-[var(--bg)] py-20 sm:py-32 overflow-hidden"
    >
      {/* Background Safelight Glow */}
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[350px] safelight-glow"
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col gap-12 relative z-10">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--safelight)]">
          <span>▷ FRAME 05</span>
          <span>·</span>
          <span>INITIATE COLLABORATION</span>
        </div>

        {/* Giant Headline per Brief §7.1 */}
        <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.03em] text-[var(--text)] leading-[0.95] max-w-4xl">
          Let&apos;s develop something.
        </h2>

        <p className="font-text text-lg sm:text-xl text-[var(--text-dim)] max-w-2xl leading-relaxed">
          Open for high-impact software engineering roles, autonomous agent architecture, and technical consulting.
        </p>

        {/* Interaction Panel */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
          {/* Copy Email Button */}
          <button
            type="button"
            onClick={handleCopyEmail}
            className="group flex items-center justify-between gap-4 px-6 py-4 border border-[var(--line-strong)] bg-[var(--surface)] hover:border-[var(--safelight)] rounded-[var(--radius-ui)] text-left transition-all cursor-pointer min-h-[56px] focus-visible:outline-2 focus-visible:outline-[var(--safelight)]"
            aria-label={`Copy email: ${site.email}`}
          >
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[var(--safelight)]" />
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-dim)]">
                  DIRECT EMAIL
                </span>
                <span className="font-mono text-sm sm:text-base font-semibold text-[var(--text)]">
                  {site.email}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--safelight)] pl-4 border-l border-[var(--line)]">
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Copy</span>
                </>
              )}
            </div>
          </button>

          {/* Contact Page CTA */}
          <Button href="/contact" variant="primary" size="lg" className="min-h-[56px] px-8">
            <span>Send Proposal</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Telemetry / Stated Reply Time */}
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-dim)] pt-2">
          <Clock className="w-3.5 h-3.5 text-[var(--safelight)]" />
          <span>Stated reply time: Guaranteed response within 24 hours.</span>
        </div>
      </div>
    </section>
  );
}
