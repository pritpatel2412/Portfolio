'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ProjectDetail } from '@/lib/projects';
import { Develop } from '@/components/motion/Develop';

interface NextProjectFooterProps {
  nextProject: ProjectDetail;
}

export function NextProjectFooter({ nextProject }: NextProjectFooterProps) {
  return (
    <div className="mt-20 pt-10 border-t border-[var(--line)]">
      <div className="flex items-center gap-2 font-mono text-xs text-[var(--safelight)] uppercase tracking-wider mb-4">
        <span>▷ SEQUENTIAL CASE STUDY</span>
        <span className="text-[var(--text-dim)]">/</span>
        <span className="text-[var(--text-dim)]">FRAME {nextProject.frameNumber}</span>
      </div>

      <Link
        href={`/projects/${nextProject.slug}`}
        className="group relative block p-8 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--text-dim)] transition-colors overflow-hidden"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest block mb-1">
              NEXT UP:
            </span>
            <h3 className="font-display font-black text-2xl sm:text-4xl tracking-tight text-[var(--text)] group-hover:text-[var(--safelight)] transition-colors">
              {nextProject.title}
            </h3>
            <p className="font-text text-sm sm:text-base text-[var(--text-dim)] mt-2 line-clamp-2">
              {nextProject.oneLiner}
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--safelight)] font-bold mt-4 uppercase">
              <span>EXPLORE CASE STUDY</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Developing Thumbnail */}
          <div className="relative w-full md:w-64 aspect-[3/2] rounded-[var(--radius-frame)] overflow-hidden border border-[var(--line)] bg-[var(--surface-2)] shrink-0">
            <Develop className="w-full h-full">
              <Image
                src={nextProject.imageSrc}
                alt={`${nextProject.title} frame preview`}
                fill
                sizes="300px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </Develop>
          </div>
        </div>
      </Link>
    </div>
  );
}
