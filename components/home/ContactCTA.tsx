'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { site } from '@/content/site';
import { sound } from '@/lib/sound';
import { Copy, Check, ArrowUpRight } from 'lucide-react';

export function ContactCTA() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    sound.click(2200, 0.03);
    navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="py-24 md:py-36 border-t border-[var(--line)] bg-[var(--bg-surface)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 flex flex-col gap-16">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between font-mono text-xs text-[var(--ink-muted)]">
            <span>( 04 — DIRECT CHANNELS &amp; COLLABORATION )</span>
            <span className="text-[var(--accent)] font-semibold">2026 ENGAGEMENTS</span>
          </div>

          <h2 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-light text-[var(--ink)] tracking-tight leading-[1.02] max-w-4xl">
            Have an ambitious system that demands <span className="italic text-[var(--accent)]">deterministic engineering?</span>
          </h2>

          <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
            <Link
              href="/contact"
              onMouseEnter={() => sound.tick()}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--ink)] text-[var(--bg)] font-bold hover:bg-[var(--accent)] transition-colors"
            >
              <span>INITIATE CONTACT DISCUSSIONS</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] hover:border-[var(--ink)] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[var(--accent)]" />}
              <span>{copied ? 'EMAIL COPIED TO CLIPBOARD' : site.email.toUpperCase()}</span>
            </button>
          </div>
        </div>

        {/* Footer Meta Row (Hairline Ledger) */}
        <div className="pt-12 border-t border-[var(--line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-mono text-xs text-[var(--ink-muted)]">
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.tick()}
              className="hover:text-[var(--ink)]"
            >
              GITHUB ↗
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.tick()}
              className="hover:text-[var(--ink)]"
            >
              LINKEDIN ↗
            </a>
            <a
              href={site.links.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.tick()}
              className="hover:text-[var(--ink)]"
            >
              LEETCODE (400+) ↗
            </a>
            <Link
              href="/colophon"
              onMouseEnter={() => sound.tick()}
              className="hover:text-[var(--ink)]"
            >
              COLOPHON ↗
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <span>VADODARA, INDIA</span>
            <span>·</span>
            <span>© {new Date().getFullYear()} PRIT PATEL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
