'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface ChapterItem {
  id: string;
  label: string;
}

interface ChapterRailProps {
  chapters: ChapterItem[];
}

export function ChapterRail({ chapters }: ChapterRailProps) {
  const [activeId, setActiveId] = useState<string>(chapters[0]?.id || '');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall scroll progress for mobile bar
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      if (totalH > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalH) * 100)));
      }

      // Scroll-spy active chapter detection
      const scrollY = window.scrollY + 200;
      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveId(chapters[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapters]);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile Top Reading Progress Hairline (< 1280px) */}
      <div
        className="xl:hidden fixed top-16 sm:top-20 left-0 right-0 h-1 bg-[var(--line)] z-30"
        aria-hidden="true"
      >
        <div
          className="h-full bg-[var(--safelight)] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Desktop Sticky Rail (>= 1280px) */}
      <nav
        aria-label="Case Study Chapters"
        className="hidden xl:block sticky top-28 self-start w-64 pr-6 shrink-0 font-mono text-xs"
      >
        <div className="text-[10px] uppercase tracking-widest text-[var(--text-dim)] pb-3 mb-3 border-b border-[var(--line)] flex items-center justify-between">
          <span>CHAPTER INDEX</span>
          <span className="text-[var(--safelight)]">SPINE ▷</span>
        </div>

        <ul className="space-y-1.5 border-l border-[var(--line)] pl-3">
          {chapters.map((ch, idx) => {
            const isActive = activeId === ch.id;

            return (
              <li key={ch.id} className="relative">
                {isActive && (
                  <span className="absolute -left-[15px] top-1.5 w-1.5 h-1.5 rounded-none bg-[var(--safelight)] rotate-45" />
                )}
                <button
                  type="button"
                  onClick={() => scrollToChapter(ch.id)}
                  className={cn(
                    'text-left transition-colors cursor-pointer block py-1 uppercase tracking-wider text-[11px]',
                    isActive
                      ? 'text-[var(--safelight)] font-bold'
                      : 'text-[var(--text-dim)] hover:text-[var(--text)]'
                  )}
                >
                  <span className="opacity-50 mr-1.5">0{idx + 1}</span>
                  <span>{ch.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
