'use client';

import React from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ProjectCategory = 'All' | 'Security' | 'AI Systems' | 'Compilers' | 'Product';
export type ViewMode = 'grid' | 'list';

interface ProjectFilterBarProps {
  currentCategory: ProjectCategory;
  onSelectCategory: (cat: ProjectCategory) => void;
  viewMode: ViewMode;
  onToggleViewMode: (mode: ViewMode) => void;
  categoryCounts: Record<ProjectCategory, number>;
  totalCount: number;
}

const CATEGORIES: ProjectCategory[] = ['All', 'Security', 'AI Systems', 'Compilers', 'Product'];

export function ProjectFilterBar({
  currentCategory,
  onSelectCategory,
  viewMode,
  onToggleViewMode,
  categoryCounts,
  totalCount,
}: ProjectFilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4 border-y border-[var(--line)] bg-[var(--surface)]/50 backdrop-blur-sm">
      {/* Category Filter Chips */}
      <div
        role="tablist"
        aria-label="Filter projects by category"
        className="flex items-center gap-1.5 sm:gap-2 flex-wrap"
      >
        {CATEGORIES.map((cat) => {
          const count = cat === 'All' ? totalCount : categoryCounts[cat] || 0;
          const isSelected = currentCategory === cat;

          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isSelected}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-ui)] text-xs font-mono uppercase tracking-wider transition-all min-h-[38px] cursor-pointer',
                'focus-visible:outline-2 focus-visible:outline-[var(--safelight)]',
                isSelected
                  ? 'bg-[var(--text)] text-[var(--bg)] font-bold shadow-sm'
                  : 'bg-[var(--surface-2)] text-[var(--text-dim)] hover:text-[var(--text)] border border-[var(--line)] hover:border-[var(--text-dim)]'
              )}
            >
              <span>{cat}</span>
              <span
                className={cn(
                  'text-[10px] opacity-70 font-mono',
                  isSelected ? 'text-[var(--bg)]' : 'text-[var(--safelight)] font-bold'
                )}
              >
                [{count}]
              </span>
            </button>
          );
        })}
      </div>

      {/* View Mode Toggle: Contact Sheet vs List View */}
      <div className="flex items-center border border-[var(--line)] rounded-[var(--radius-ui)] bg-[var(--surface-2)] p-0.5 self-end md:self-auto">
        <button
          type="button"
          onClick={() => onToggleViewMode('grid')}
          aria-label="Contact sheet view"
          aria-pressed={viewMode === 'grid'}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-ui)] text-xs font-mono uppercase tracking-wider transition-all cursor-pointer min-h-[36px]',
            'focus-visible:outline-2 focus-visible:outline-[var(--safelight)]',
            viewMode === 'grid'
              ? 'bg-[var(--surface)] text-[var(--text)] font-bold shadow-sm border border-[var(--line)]'
              : 'text-[var(--text-dim)] hover:text-[var(--text)]'
          )}
        >
          <LayoutGrid className="w-3.5 h-3.5 text-[var(--safelight)]" />
          <span className="hidden sm:inline">CONTACT SHEET</span>
        </button>

        <button
          type="button"
          onClick={() => onToggleViewMode('list')}
          aria-label="List view"
          aria-pressed={viewMode === 'list'}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-ui)] text-xs font-mono uppercase tracking-wider transition-all cursor-pointer min-h-[36px]',
            'focus-visible:outline-2 focus-visible:outline-[var(--safelight)]',
            viewMode === 'list'
              ? 'bg-[var(--surface)] text-[var(--text)] font-bold shadow-sm border border-[var(--line)]'
              : 'text-[var(--text-dim)] hover:text-[var(--text)]'
          )}
        >
          <List className="w-3.5 h-3.5 text-[var(--safelight)]" />
          <span className="hidden sm:inline">LIST VIEW</span>
        </button>
      </div>
    </div>
  );
}
