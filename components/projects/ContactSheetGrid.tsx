'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { FrameCard } from '@/components/darkroom/FrameCard';
import { ProjectDetail } from '@/lib/projects';
import { reduced } from '@/lib/motion';
import { cn } from '@/lib/utils';

gsap.registerPlugin(Flip);

interface ContactSheetGridProps {
  projects: ProjectDetail[];
  onResetFilter?: () => void;
}

export function ContactSheetGrid({ projects, onResetFilter }: ContactSheetGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevProjectsRef = useRef<ProjectDetail[]>(projects);

  useLayoutEffect(() => {
    if (reduced() || !containerRef.current) return;

    // Run GSAP Flip animation if the project list changed
    if (prevProjectsRef.current !== projects) {
      const items = containerRef.current.querySelectorAll('.frame-item');
      if (items.length > 0) {
        const state = Flip.getState(items);
        Flip.from(state, {
          duration: 0.45,
          ease: 'power2.out',
          scale: true,
          absolute: false,
          stagger: 0.03,
        });
      }
    }
    prevProjectsRef.current = projects;
  }, [projects]);

  if (projects.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center p-8 border border-[var(--line)] rounded-[var(--radius-ui)] bg-[var(--surface)] my-8">
        {/* M10 Empty State: Blank frame with grease-pencil X */}
        <div className="relative w-48 h-32 border border-[var(--line)] bg-[var(--surface-2)] rounded flex items-center justify-center mb-6">
          <svg className="w-20 h-20 text-[var(--safelight)]" viewBox="0 0 100 100" fill="none">
            <path
              d="M 20 20 L 80 80 M 80 20 L 20 80"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute bottom-2 font-mono text-[9px] text-[var(--text-dim)] uppercase">
            [ FRAME UNEXPOSED ]
          </span>
        </div>
        <h3 className="font-display font-bold text-xl text-[var(--text)]">
          Frame not found — this link was overexposed.
        </h3>
        <p className="font-text text-sm text-[var(--text-dim)] mt-2 max-w-sm">
          No projects currently match this filter criteria in the archive.
        </p>
        {onResetFilter && (
          <button
            type="button"
            onClick={onResetFilter}
            className="mt-6 px-4 py-2 rounded-[var(--radius-ui)] bg-[var(--safelight)] text-[var(--on-safelight,#0A0908)] font-mono text-xs uppercase font-bold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      id="contact-sheet-grid"
      className="grid grid-cols-12 gap-6 my-8"
    >
      {projects.map((project) => {
        // Mixed spans per Brief §7.2: Feature flagships span 6, secondary span 3 or 4
        const spanClass = project.isFlagship
          ? 'col-span-12 lg:col-span-6'
          : 'col-span-12 sm:col-span-6 lg:col-span-4';

        return (
          <div
            key={project.slug}
            data-flip-id={project.slug}
            className={cn('frame-item flex flex-col', spanClass)}
          >
            <FrameCard
              slug={project.slug}
              frameNumber={project.frameNumber}
              title={project.title}
              year={project.year}
              role={project.role}
              outcome={project.oneLiner}
              imageSrc={project.imageSrc}
              aspectRatio={project.isFlagship ? '16/9' : '3/2'}
            />
          </div>
        );
      })}
    </div>
  );
}
