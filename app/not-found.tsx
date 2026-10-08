'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Search, Home, Code2, BookOpen } from 'lucide-react';

export default function NotFound() {
  const triggerPalette = () => {
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'k',
        metaKey: true,
        bubbles: true,
      })
    );
  };

  return (
    <div className="min-h-[80vh] max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 flex flex-col items-center justify-center text-center">
      {/* M10: Photographic Contact Sheet Blank Frame */}
      <div className="relative w-full max-w-xs sm:max-w-sm aspect-[4/3] rounded-[var(--radius-ui)] border-2 border-[var(--line)] bg-[var(--surface-2)] p-4 flex flex-col justify-between shadow-2xl mb-10 overflow-hidden">
        {/* Film Header Metadata */}
        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-[var(--text-dim)] border-b border-[var(--line)] pb-1.5 opacity-60">
          <span>KODAK 404 TM</span>
          <span>EXP. 00/00</span>
          <span>LATENT</span>
        </div>

        {/* Center: Hand-drawn grease-pencil X in safelight amber */}
        <div className="relative flex-1 flex items-center justify-center">
          <svg
            className="w-28 h-28 text-[var(--safelight)]"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {/* Grease-pencil X stroke 1 */}
            <path
              d="M18 22 C 32 38, 62 68, 82 80"
              strokeDasharray="120"
              strokeDashoffset="0"
              className="opacity-90"
            />
            {/* Grease-pencil X stroke 2 */}
            <path
              d="M82 20 C 65 38, 35 66, 16 82"
              strokeDasharray="120"
              strokeDashoffset="0"
              className="opacity-90"
            />
            {/* Grease-pencil circle enclosing X */}
            <circle
              cx="50"
              cy="50"
              r="40"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              className="opacity-60"
            />
          </svg>
          <span className="absolute bottom-2 font-mono text-[10px] uppercase tracking-wider text-[var(--safelight)] font-bold">
            BLANK NEGATIVE
          </span>
        </div>

        {/* Film Footer Sprocket */}
        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-[var(--text-dim)] border-t border-[var(--line)] pt-1.5 opacity-60">
          <span>▷ 404 NO SIGNAL</span>
          <span>SAFETY FILM</span>
        </div>
      </div>

      {/* Editorial Text */}
      <div className="space-y-4 max-w-xl">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--safelight)]">
          <span className="w-1.5 h-1.5 rounded-none bg-[var(--safelight)] rotate-45" />
          <span>FRAME NOT FOUND · OVEREXPOSED</span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--text)] tracking-tight">
          Frame not found — this link was overexposed.
        </h1>

        <p className="font-sans text-sm sm:text-base text-[var(--text-dim)] leading-relaxed">
          The emulsion requested has no chemical trace or was washed out during processing. The negative may have been relocated or never developed.
        </p>
      </div>

      {/* Quick Search Action */}
      <div className="mt-8 w-full max-w-md">
        <button
          type="button"
          onClick={triggerPalette}
          className="w-full px-4 py-3 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface-2)] hover:border-[var(--safelight)] text-[var(--text-dim)] hover:text-[var(--text)] font-mono text-xs flex items-center justify-between gap-3 transition-colors cursor-pointer min-h-[44px]"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[var(--safelight)]" />
            <span>Search routes, projects &amp; essays...</span>
          </div>
          <kbd className="px-2 py-0.5 rounded bg-[var(--surface-3)] border border-[var(--line)] text-[10px] text-[var(--text)]">
            ⌘K / /
          </kbd>
        </button>
      </div>

      {/* Three Curated Recovery Pages */}
      <div className="mt-8 pt-8 border-t border-[var(--line)] w-full max-w-xl flex flex-col gap-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)] text-left">
          SUGGESTED RETRIEVAL PATHWAYS
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/"
            className="group p-3.5 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface-2)]/60 hover:border-[var(--safelight)] transition-colors flex flex-col items-start gap-1 text-left"
          >
            <div className="flex items-center justify-between w-full font-mono text-[10px] text-[var(--safelight)]">
              <span>01 · HOME</span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <span className="font-display text-xs font-bold text-[var(--text)] group-hover:text-[var(--safelight)] transition-colors">
              Studio Overview
            </span>
          </Link>

          <Link
            href="/projects"
            className="group p-3.5 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface-2)]/60 hover:border-[var(--safelight)] transition-colors flex flex-col items-start gap-1 text-left"
          >
            <div className="flex items-center justify-between w-full font-mono text-[10px] text-[var(--safelight)]">
              <span>02 · WORK</span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <span className="font-display text-xs font-bold text-[var(--text)] group-hover:text-[var(--safelight)] transition-colors">
              Contact Sheet
            </span>
          </Link>

          <Link
            href="/writing"
            className="group p-3.5 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface-2)]/60 hover:border-[var(--safelight)] transition-colors flex flex-col items-start gap-1 text-left"
          >
            <div className="flex items-center justify-between w-full font-mono text-[10px] text-[var(--safelight)]">
              <span>03 · ESSAYS</span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <span className="font-display text-xs font-bold text-[var(--text)] group-hover:text-[var(--safelight)] transition-colors">
              Field Dispatches
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
