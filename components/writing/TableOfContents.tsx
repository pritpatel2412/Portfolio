'use client';

import React, { useEffect, useState } from 'react';
import { ArticleHeading } from '@/content/articles';
import { cn } from '@/lib/utils';
import { List } from 'lucide-react';

interface TableOfContentsProps {
  headings: ArticleHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id || '');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 200;
      for (let i = headings.length - 1; i >= 0; i--) {
        const el = document.getElementById(headings[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveId(headings[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Drawer Trigger (< 1280px) */}
      <div className="xl:hidden my-6 p-4 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface-2)]">
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="w-full flex items-center justify-between font-mono text-xs uppercase text-[var(--text)] font-bold cursor-pointer min-h-[38px]"
          aria-expanded={isMobileOpen}
        >
          <div className="flex items-center gap-2">
            <List className="w-4 h-4 text-[var(--safelight)]" />
            <span>TABLE OF CONTENTS [{headings.length}]</span>
          </div>
          <span className="text-[10px] text-[var(--safelight)]">
            {isMobileOpen ? 'CLOSE ▲' : 'EXPAND ▼'}
          </span>
        </button>

        {isMobileOpen && (
          <ul className="mt-3 pt-3 border-t border-[var(--line)] space-y-2 font-mono text-xs animate-in fade-in duration-150">
            {headings.map((h, i) => (
              <li key={h.id}>
                <button
                  type="button"
                  onClick={() => scrollToHeading(h.id)}
                  className={cn(
                    'text-left py-1 text-xs transition-colors block w-full',
                    activeId === h.id
                      ? 'text-[var(--safelight)] font-bold'
                      : 'text-[var(--text-dim)] hover:text-[var(--text)]'
                  )}
                >
                  <span className="opacity-50 mr-2">0{i + 1}.</span>
                  <span>{h.title}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Desktop Sticky Rail (>= 1280px) */}
      <nav
        aria-label="Table of Contents"
        className="hidden xl:block sticky top-28 self-start w-64 pr-6 shrink-0 font-mono text-xs"
      >
        <div className="text-[10px] uppercase tracking-widest text-[var(--text-dim)] pb-3 mb-3 border-b border-[var(--line)] flex items-center justify-between">
          <span>TABLE OF CONTENTS</span>
          <span className="text-[var(--safelight)]">TOC ▷</span>
        </div>

        <ul className="space-y-2 border-l border-[var(--line)] pl-3">
          {headings.map((h, i) => {
            const isActive = activeId === h.id;
            return (
              <li key={h.id} className="relative">
                {isActive && (
                  <span className="absolute -left-[15px] top-1.5 w-1.5 h-1.5 rounded-none bg-[var(--safelight)] rotate-45" />
                )}
                <button
                  type="button"
                  onClick={() => scrollToHeading(h.id)}
                  className={cn(
                    'text-left transition-colors cursor-pointer block py-0.5 text-[11px] leading-snug',
                    isActive
                      ? 'text-[var(--safelight)] font-bold'
                      : 'text-[var(--text-dim)] hover:text-[var(--text)]'
                  )}
                >
                  <span className="opacity-50 mr-1.5">0{i + 1}</span>
                  <span>{h.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
