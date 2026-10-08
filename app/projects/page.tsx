'use client';

import React, { useState, useMemo } from 'react';
import {
  ALL_PROJECTS,
  type ProjectDetail,
} from '@/lib/projects';
import {
  ProjectFilterBar,
  type ProjectCategory,
  type ViewMode,
} from '@/components/projects/ProjectFilterBar';
import { ContactSheetGrid } from '@/components/projects/ContactSheetGrid';
import { ProjectListView } from '@/components/projects/ProjectListView';

export default function ProjectsPage() {
  const [currentCategory, setCurrentCategory] = useState<ProjectCategory>('All');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<ProjectCategory, number> = {
      All: ALL_PROJECTS.length,
      Security: 0,
      'AI Systems': 0,
      Compilers: 0,
      Product: 0,
    };

    ALL_PROJECTS.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category] += 1;
      }
    });

    return counts;
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (currentCategory === 'All') return ALL_PROJECTS;
    return ALL_PROJECTS.filter((p) => p.category === currentCategory);
  }, [currentCategory]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12">
        {/* Page Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--safelight)] uppercase tracking-wider mb-2">
            <span>▷ 01 · CONTACT-SHEET ARCHIVE</span>
            <span className="text-[var(--text-dim)]">/</span>
            <span className="text-[var(--text-dim)]">{ALL_PROJECTS.length} FRAMES EXPOSED</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-[-0.03em] text-[var(--text)]">
            Selected Works
          </h1>
          <p className="font-text text-sm sm:text-base text-[var(--text-dim)] mt-3 max-w-2xl leading-relaxed">
            A chronological contact-sheet index of production software: autonomous vulnerability assessment engines, low-latency search APIs, and regional compilers.
          </p>
        </header>

        {/* Filter Bar with GSAP Flip & View Mode Switch */}
        <ProjectFilterBar
          currentCategory={currentCategory}
          onSelectCategory={setCurrentCategory}
          viewMode={viewMode}
          onToggleViewMode={setViewMode}
          categoryCounts={categoryCounts}
          totalCount={ALL_PROJECTS.length}
        />

        {/* Main Display: Contact Sheet Grid vs List View */}
        {viewMode === 'grid' ? (
          <ContactSheetGrid
            projects={filteredProjects}
            onResetFilter={() => setCurrentCategory('All')}
          />
        ) : (
          <ProjectListView projects={filteredProjects} />
        )}
      </div>
    </div>
  );
}
