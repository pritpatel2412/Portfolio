'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowUpDown } from 'lucide-react';
import { ProjectDetail } from '@/lib/projects';
import { usePicks } from '@/lib/picks';
import { useToast } from '@/components/system/Toast';
import { cn } from '@/lib/utils';

interface ProjectListViewProps {
  projects: ProjectDetail[];
}

export function ProjectListView({ projects }: ProjectListViewProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const { isPicked, toggle } = usePicks();
  const { showToast } = useToast();

  const sortedProjects = [...projects].sort((a, b) => {
    const yearA = parseInt(a.year, 10) || 0;
    const yearB = parseInt(b.year, 10) || 0;
    return sortOrder === 'desc' ? yearB - yearA : yearA - yearB;
  });

  const toggleSort = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  const hoveredProject = sortedProjects.find((p) => p.slug === hoveredSlug);

  return (
    <div className="relative my-8 border border-[var(--line)] rounded-[var(--radius-ui)] bg-[var(--surface)] overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-[var(--surface-2)] border-b border-[var(--line)] font-mono text-[11px] text-[var(--text-dim)] uppercase tracking-wider items-center">
        <div className="col-span-1">FRAME</div>
        <div className="col-span-1">
          <button
            type="button"
            onClick={toggleSort}
            className="flex items-center gap-1 hover:text-[var(--text)] transition-colors cursor-pointer"
            title="Sort by year"
          >
            <span>YEAR</span>
            <ArrowUpDown className="w-3 h-3 text-[var(--safelight)]" />
          </button>
        </div>
        <div className="col-span-4 sm:col-span-3">PROJECT / ROLE</div>
        <div className="hidden sm:block col-span-3">STACK</div>
        <div className="col-span-6 sm:col-span-4 text-right">OUTCOME / ACTION</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-[var(--line)]">
        {sortedProjects.map((project) => {
          const marked = isPicked(project.slug);

          return (
            <div
              key={project.slug}
              onMouseEnter={() => setHoveredSlug(project.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              className="grid grid-cols-12 gap-4 px-4 py-4 items-center hover:bg-[var(--surface-2)]/60 transition-colors group"
            >
              {/* Frame */}
              <div className="col-span-1 font-mono text-xs text-[var(--safelight)] font-bold">
                ▷ {project.frameNumber}
              </div>

              {/* Year */}
              <div className="col-span-1 font-mono text-xs text-[var(--text-dim)]">
                {project.year}
              </div>

              {/* Title & Role */}
              <div className="col-span-4 sm:col-span-3">
                <Link
                  href={`/projects/${project.slug}`}
                  className="font-display font-bold text-sm sm:text-base text-[var(--text)] hover:text-[var(--safelight)] transition-colors block"
                >
                  {project.title}
                </Link>
                <span className="font-mono text-[10px] text-[var(--text-dim)] uppercase block mt-0.5">
                  {project.role}
                </span>
              </div>

              {/* Stack Chips */}
              <div className="hidden sm:flex col-span-3 items-center gap-1.5 flex-wrap">
                {project.stack.slice(0, 3).map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--surface)] border border-[var(--line)] text-[var(--text-dim)]"
                  >
                    {tool}
                  </span>
                ))}
                {project.stack.length > 3 && (
                  <span className="text-[10px] font-mono text-[var(--text-dim)]">
                    +{project.stack.length - 3}
                  </span>
                )}
              </div>

              {/* Outcome & Mark CTA */}
              <div className="col-span-6 sm:col-span-4 flex items-center justify-end gap-3 text-right">
                <span className="hidden md:inline font-text text-xs text-[var(--text-dim)] line-clamp-1 max-w-xs">
                  {project.oneLiner}
                </span>

                {/* Mark Button (M5) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    const res = toggle({
                      slug: project.slug,
                      title: project.title,
                      year: project.year,
                      role: project.role,
                    });
                    if (res.limitReached) {
                      showToast('Maximum 5 shortlisted picks reached.');
                    } else if (res.added) {
                      showToast(`Marked ${project.title} as a pick.`);
                    }
                  }}
                  aria-pressed={marked}
                  aria-label={`Mark ${project.title} as pick`}
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0',
                    marked
                      ? 'bg-[var(--safelight)] text-[var(--on-safelight,#0A0908)]'
                      : 'border border-[var(--line)] text-[var(--text-dim)] hover:border-[var(--safelight)]'
                  )}
                  title={marked ? 'Remove from picks' : 'Mark as pick'}
                >
                  {marked ? (
                    <span className="text-[10px] font-bold">✓</span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                  )}
                </button>

                <Link
                  href={`/projects/${project.slug}`}
                  className="w-8 h-8 rounded flex items-center justify-center text-[var(--text-dim)] group-hover:text-[var(--safelight)] group-hover:bg-[var(--surface)] transition-all shrink-0"
                  aria-label={`Open ${project.title} case study`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Hover Preview Card (Brief §7.2) */}
      {hoveredProject && (
        <div
          aria-hidden="true"
          className="pointer-events-none hidden lg:block fixed bottom-12 right-12 z-30 w-72 aspect-[3/2] rounded-[var(--radius-frame)] overflow-hidden border border-[var(--line)] bg-[var(--surface-2)] shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        >
          <Image
            src={hoveredProject.imageSrc}
            alt=""
            fill
            sizes="300px"
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-[var(--bg)]/90 border-t border-[var(--line)] flex justify-between font-mono text-[9px] text-[var(--text-dim)] uppercase">
            <span>▷ {hoveredProject.frameNumber} · {hoveredProject.title}</span>
            <span>{hoveredProject.year}</span>
          </div>
        </div>
      )}
    </div>
  );
}
