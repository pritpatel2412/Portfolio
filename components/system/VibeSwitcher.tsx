'use client';

import React, { useEffect, useRef } from 'react';
import { useVibe } from './VibeProvider';
import { VIBES, VibeId } from '@/lib/vibes';
import { cn } from '@/lib/utils';
import { Sparkles, X, Check, Eye } from 'lucide-react';

export function VibeSwitcher() {
  const { activeVibe, currentConfig, setVibe, isSwitcherOpen, setIsSwitcherOpen } = useVibe();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSwitcherOpen) {
        setIsSwitcherOpen(false);
      }
      // Quick key shortcut: 'V' toggles vibe switcher
      if ((e.key === 'v' || e.key === 'V') && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        setIsSwitcherOpen(!isSwitcherOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSwitcherOpen, setIsSwitcherOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node) && isSwitcherOpen) {
        const toggleBtn = document.getElementById('vibe-dock-trigger');
        if (toggleBtn && toggleBtn.contains(e.target as Node)) return;
        setIsSwitcherOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSwitcherOpen, setIsSwitcherOpen]);

  return (
    <>
      {/* Floating Compact Dock (Bottom Right / Edge) */}
      <aside aria-label="Visual edition controls" className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <button
          id="vibe-dock-trigger"
          type="button"
          onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
          className={cn(
            'group flex items-center gap-3 px-3.5 py-2 rounded-full border border-[var(--line)]',
            'bg-[var(--bg)]/90 backdrop-blur-md text-[var(--ink)] shadow-[0_4px_24px_rgba(0,0,0,0.12)]',
            'hover:border-[var(--accent)] transition-all duration-300 cursor-pointer select-none'
          )}
          title="Switch Art Direction Edition (Press 'V')"
          aria-expanded={isSwitcherOpen}
        >
          {/* Swatch indicator dots */}
          <div className="flex items-center -space-x-1">
            <span
              className="w-2.5 h-2.5 rounded-full border border-[var(--bg)]"
              style={{ backgroundColor: currentConfig.swatches.bg }}
            />
            <span
              className="w-2.5 h-2.5 rounded-full border border-[var(--bg)]"
              style={{ backgroundColor: currentConfig.swatches.accent }}
            />
            <span
              className="w-2.5 h-2.5 rounded-full border border-[var(--bg)]"
              style={{ backgroundColor: currentConfig.swatches.ink }}
            />
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs tracking-wider">
            <span className="text-[var(--ink-muted)] text-[10px]">EDITION</span>
            <span className="font-bold text-[var(--accent)]">{currentConfig.number}</span>
            <span className="font-semibold hidden sm:inline">{currentConfig.name}</span>
          </div>

          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
        </button>
      </aside>

      {/* Expanded Modal / Horizontal Selector Drawer */}
      {isSwitcherOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div
            ref={drawerRef}
            className={cn(
              'w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--line)]',
              'bg-[var(--bg)] text-[var(--ink)] shadow-[0_24px_64px_rgba(0,0,0,0.3)] flex flex-col p-6 sm:p-8',
              'transition-all duration-300'
            )}
            style={{
              backgroundColor: currentConfig.swatches.bg,
              color: currentConfig.swatches.ink,
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[var(--line)] pb-5 mb-6">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent)] tracking-widest font-bold uppercase mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Art Direction Engine / 6 Original Editions</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  One Person. One Content System. Six Worlds.
                </h2>
                <p className="text-xs sm:text-sm opacity-70 mt-1 max-w-2xl leading-relaxed">
                  Switching an edition reimagines the typography, grid discipline, motion personality, and visual grammar of the entire portfolio.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsSwitcherOpen(false)}
                className="p-2 rounded-full border border-[var(--line)] hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Close edition switcher"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 6 Visual Worlds Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {VIBES.map((v) => {
                const isActive = activeVibe === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      setVibe(v.id);
                    }}
                    className={cn(
                      'group text-left relative flex flex-col justify-between p-4 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden',
                      isActive
                        ? 'border-[2px] ring-2 ring-offset-2'
                        : 'border-[var(--line)] opacity-85 hover:opacity-100 hover:scale-[1.01]'
                    )}
                    style={{
                      backgroundColor: v.swatches.surface,
                      borderColor: isActive ? v.swatches.accent : undefined,
                      color: v.swatches.ink,
                    }}
                  >
                    {/* Top Row: Number & Active Indicator */}
                    <div className="flex items-center justify-between mb-3 w-full">
                      <span
                        className="font-mono text-xs font-bold px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: v.swatches.bg,
                          color: v.swatches.accent,
                        }}
                      >
                        {v.number}
                      </span>

                      {isActive ? (
                        <span
                          className="flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: v.swatches.accent,
                            color: v.swatches.bg,
                          }}
                        >
                          <Check className="w-3 h-3" />
                          <span>ACTIVE</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono opacity-50 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>PREVIEW</span>
                        </span>
                      )}
                    </div>

                    {/* Miniature Representation / Visual DNA Box */}
                    <div
                      className="w-full h-24 rounded-lg p-3 flex flex-col justify-between border my-2 transition-transform duration-300 group-hover:shadow-md"
                      style={{
                        backgroundColor: v.swatches.bg,
                        borderColor: v.swatches.accent,
                      }}
                    >
                      {/* Mini typography preview */}
                      <div className="flex items-baseline justify-between">
                        <span
                          className="text-2xl font-bold tracking-tight leading-none"
                          style={{
                            color: v.swatches.ink,
                            fontFamily: v.typography.display,
                          }}
                        >
                          Aa
                        </span>
                        <div className="flex items-center gap-1">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: v.swatches.accent }}
                          />
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: v.swatches.ink }}
                          />
                        </div>
                      </div>

                      {/* Mini layout wireframe lines */}
                      <div className="space-y-1">
                        <div
                          className="h-1.5 rounded w-3/4 opacity-70"
                          style={{ backgroundColor: v.swatches.ink }}
                        />
                        <div
                          className="h-1 rounded w-1/2 opacity-40"
                          style={{ backgroundColor: v.swatches.accent }}
                        />
                      </div>
                    </div>

                    {/* Identity & Tagline */}
                    <div className="mt-2">
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-bold text-base tracking-tight">{v.name}</h3>
                      </div>
                      <span
                        className="block font-mono text-[11px] font-medium tracking-wide mt-0.5"
                        style={{ color: v.swatches.accent }}
                      >
                        {v.tagline}
                      </span>
                      <p className="text-xs opacity-70 mt-1.5 line-clamp-2 leading-relaxed">
                        {v.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer Tip */}
            <div className="mt-6 pt-4 border-t border-[var(--line)] flex flex-wrap items-center justify-between text-xs font-mono opacity-60">
              <span>Tip: Press &apos;V&apos; anytime to reopen the edition switcher</span>
              <span>Preferences automatically saved to local storage</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
