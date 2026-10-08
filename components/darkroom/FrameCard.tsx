'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Develop } from '@/components/motion/Develop';

export interface FrameCardProps {
  slug: string;
  frameNumber: string; // e.g. "01"
  title: string;
  year: string;
  role: string;
  outcome?: string;
  imageSrc?: string;
  aspectRatio?: '3/2' | '4/5' | '16/9';
  priority?: boolean;
  className?: string;
}

export function FrameCard({
  slug,
  frameNumber,
  title,
  year,
  role,
  outcome,
  imageSrc,
  aspectRatio = '3/2',
  priority = false,
  className,
}: FrameCardProps) {
  const aspectClass = {
    '3/2': 'aspect-[3/2]',
    '4/5': 'aspect-[4/5]',
    '16/9': 'aspect-[16/9]',
  }[aspectRatio];

  return (
    <article
      className={cn(
        'group relative flex flex-col bg-[var(--surface)]',
        'border border-[var(--line)] rounded-[var(--radius-frame)] overflow-hidden',
        'transition-colors duration-300 hover:border-[var(--text-dim)]',
        className
      )}
    >
      {/* Contact Sheet Frame Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-[var(--line)] bg-[var(--bg)]/80 text-[var(--text-dim)]">
        <span className="font-mono text-[11px] uppercase tracking-widest flex items-center gap-1.5">
          <span className="text-[var(--safelight)] font-bold">▷</span>
          <span>{frameNumber}</span>
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider">
          {year} · {role}
        </span>
      </div>

      {/* Frame Visual / Image Container */}
      <Link
        href={`/projects/${slug}`}
        className={cn(
          'relative w-full overflow-hidden bg-[var(--surface-2)] cursor-pointer block',
          aspectClass
        )}
      >
        {imageSrc ? (
          <Develop className="w-full h-full">
            <Image
              src={imageSrc}
              alt={`${title} project frame`}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </Develop>
        ) : (
          /* Typographic Placeholder Frame (Brief §4: If missing, render typographic placeholder — never stock imagery) */
          <div className="w-full h-full flex flex-col justify-between p-6 select-none bg-[radial-gradient(circle_at_top_right,var(--surface-2),var(--surface))]">
            <div className="flex justify-between items-start font-mono text-[10px] text-[var(--text-dim)] uppercase tracking-widest">
              <span>EXPOSURE LATENT</span>
              <span>ISO 400</span>
            </div>
            <div className="text-center my-auto">
              <span className="font-display font-bold text-2xl tracking-tight text-[var(--text)] group-hover:text-[var(--safelight)] transition-colors">
                {title}
              </span>
              <p className="font-mono text-[11px] text-[var(--text-dim)] mt-1 uppercase tracking-wider">
                [ LATENT FRAME {frameNumber} ]
              </p>
            </div>
            <div className="flex justify-between items-end font-mono text-[10px] text-[var(--text-dim)] uppercase tracking-widest border-t border-[var(--line)] pt-3">
              <span>{role}</span>
              <span>{year}</span>
            </div>
          </div>
        )}
      </Link>

      {/* Bottom Meta & Outcome */}
      <div className="p-4 flex flex-col gap-1.5 border-t border-[var(--line)]">
        <Link
          href={`/projects/${slug}`}
          className="font-display font-bold text-lg text-[var(--text)] hover:text-[var(--safelight)] transition-colors inline-flex items-center justify-between"
        >
          <span>{title}</span>
          <span className="font-mono text-xs opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--safelight)]">
            →
          </span>
        </Link>
        {outcome && (
          <p className="font-text text-sm text-[var(--text-dim)] leading-relaxed">
            {outcome}
          </p>
        )}
      </div>
    </article>
  );
}
