'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useUniverse, Universe, UNIVERSES } from '@/lib/universe';
import { Sparkles, X, Check, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sound } from '@/lib/sound';

export function VibeSwitcher() {
  const { universe, setUniverse, meta } = useUniverse();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Keyboard shortcut 'v' to toggle vibe switcher
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }
      if (e.key.toLowerCase() === 'v' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelect = (u: Universe) => {
    sound.click();
    setUniverse(u);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
      aria-label="Universe Transformation Engine"
    >
      {/* 7 Universes Floating Tray / Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Choose Visual Universe"
          className={cn(
            'mb-3 w-[92vw] max-w-4xl p-4 sm:p-5 rounded-2xl',
            'bg-[#121110]/95 text-[#EDE8DF] backdrop-blur-xl border border-white/15 shadow-2xl',
            'animate-in fade-in slide-in-from-bottom-4 duration-200'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 font-mono text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF5B2E]" />
              <span className="font-bold uppercase tracking-wider text-white">
                One Person. Seven Universes.
              </span>
              <span className="hidden sm:inline text-white/40">·</span>
              <span className="hidden sm:inline text-white/50">
                Same content. Complete layout transformation.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/40 font-mono hidden md:inline">
                SHORTCUT: [V]
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close universe switcher"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
            {UNIVERSES.map((item) => {
              const isSelected = item.id === universe;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  onMouseEnter={() => sound.tick()}
                  className={cn(
                    'group relative text-left p-2.5 rounded-xl transition-all duration-200 cursor-pointer flex flex-col justify-between h-40',
                    'border text-xs',
                    isSelected
                      ? 'border-[#FF5B2E] bg-white/10 ring-2 ring-[#FF5B2E]/50 shadow-lg'
                      : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30'
                  )}
                  aria-pressed={isSelected}
                >
                  {/* Miniature Visual Representation Card */}
                  <div
                    className="w-full h-16 rounded-lg p-1.5 flex flex-col justify-between overflow-hidden shadow-inner border border-black/10 relative"
                    style={{ backgroundColor: item.palette.bg, color: item.palette.text }}
                  >
                    {/* Visual Preview Archetype according to universe */}
                    {item.id === 'editorial' && (
                      <div className="h-full flex flex-col justify-between">
                        <span className="font-serif italic text-[10px] leading-none opacity-80">
                          Vol. '26
                        </span>
                        <div className="w-full h-[1px] bg-black/20 my-auto" />
                        <span className="font-serif font-black text-xs leading-none">
                          Prit.
                        </span>
                      </div>
                    )}

                    {item.id === 'maximalist' && (
                      <div className="h-full flex flex-col justify-between">
                        <span className="inline-block px-1 py-0.5 rounded-full bg-blue-600 text-[8px] font-black text-white w-fit leading-none">
                          POP!
                        </span>
                        <span className="font-black text-sm uppercase tracking-tighter text-black leading-none">
                          PRIT★
                        </span>
                      </div>
                    )}

                    {item.id === 'japandi' && (
                      <div className="h-full flex flex-col justify-between">
                        <span className="text-[8px] tracking-widest text-[#BC5A36] font-mono">
                          普・利特
                        </span>
                        <div className="w-3 h-3 rounded-full bg-[#BC5A36] self-end opacity-90" />
                        <span className="text-[10px] font-serif tracking-widest">
                          Patel.
                        </span>
                      </div>
                    )}

                    {item.id === 'swiss' && (
                      <div className="h-full flex items-center justify-between">
                        <span className="font-sans font-black text-xs tracking-tighter text-black">
                          04/
                        </span>
                        <div className="w-6 h-6 rounded-full bg-[#E11D48] shrink-0" />
                      </div>
                    )}

                    {item.id === 'brutalist' && (
                      <div className="h-full flex flex-col justify-between font-mono text-[9px] bg-black/5 p-1 border border-black/20">
                        <span className="text-blue-700 font-bold">&gt;_PRIT</span>
                        <span className="text-black/60">[200 OK]</span>
                      </div>
                    )}

                    {item.id === 'noir' && (
                      <div className="h-full flex flex-col justify-between bg-black text-[#EAE5DC] p-1 border border-amber-900/30">
                        <span className="text-[8px] tracking-widest uppercase text-amber-500/80 font-mono">
                          SCENE 06
                        </span>
                        <span className="font-serif text-[11px] italic text-amber-200">
                          Darkroom
                        </span>
                      </div>
                    )}

                    {item.id === 'archive' && (
                      <div className="h-full flex flex-col justify-between bg-[#0B0F17] text-cyan-400 p-1 border border-cyan-800/40 font-mono">
                        <span className="text-[8px] opacity-80">SYS//07</span>
                        <span className="text-[9px] text-white">#SPECIMEN</span>
                      </div>
                    )}
                  </div>

                  {/* Text Description */}
                  <div className="mt-2 space-y-0.5">
                    <div className="flex items-center justify-between font-bold text-xs text-white">
                      <span className="truncate">{item.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#FF5B2E] shrink-0" />}
                    </div>
                    <span className="text-[10px] text-white/50 font-mono block leading-tight">
                      {item.vibe}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Vibe Trigger Pill */}
      <button
        type="button"
        onClick={() => {
          sound.click();
          setIsOpen((prev) => !prev);
        }}
        className={cn(
          'group flex items-center gap-2.5 px-4 py-2.5 rounded-full',
          'bg-[var(--surface-2,#1D1916)]/95 text-[var(--text,#EDE8DF)]',
          'border border-[var(--line,rgba(255,255,255,0.15))] shadow-xl backdrop-blur-md',
          'hover:border-[var(--safelight,#FF5B2E)] hover:scale-105 transition-all duration-200 cursor-pointer',
          'font-mono text-xs font-semibold focus-visible:outline-2 focus-visible:outline-[var(--safelight)]'
        )}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={`Current Universe: ${meta.name}. Click to change visual universe.`}
      >
        {/* Color Palette Indicators */}
        <div className="flex items-center -space-x-1.5" aria-hidden="true">
          <span
            className="w-3 h-3 rounded-full border border-black/30 shadow-sm"
            style={{ backgroundColor: meta.palette.bg }}
          />
          <span
            className="w-3 h-3 rounded-full border border-black/30 shadow-sm"
            style={{ backgroundColor: meta.palette.accent }}
          />
          <span
            className="w-3 h-3 rounded-full border border-black/30 shadow-sm"
            style={{ backgroundColor: meta.palette.text }}
          />
        </div>

        {/* Label */}
        <span className="text-[var(--text-dim)] font-mono text-[11px] uppercase tracking-wider">
          VIBE
        </span>
        <span className="font-bold text-[var(--text)] uppercase tracking-wide">
          {meta.name}
        </span>
        <span className="px-1.5 py-0.5 rounded bg-[var(--surface)] text-[10px] text-[var(--safelight)] font-mono font-bold">
          {meta.num} / 07
        </span>

        {/* Arrow Glyph */}
        <span
          className={cn(
            'text-[10px] text-[var(--text-dim)] transition-transform duration-200',
            isOpen ? 'rotate-180' : 'rotate-0'
          )}
        >
          ▲
        </span>
      </button>
    </div>
  );
}
