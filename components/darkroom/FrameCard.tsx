'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Develop } from '@/components/motion/Develop';
import { usePicks } from '@/lib/picks';
import { useToast } from '@/components/system/Toast';

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

// Hand-drawn irregular grease-pencil ellipse paths
const GREASE_VARIANTS = [
  'M 12 18 C 70 4, 230 8, 288 20 C 298 45, 295 155, 282 180 C 228 196, 68 194, 14 178 C 2 152, 4 40, 15 16',
  'M 16 22 C 80 6, 220 10, 284 24 C 296 48, 292 152, 280 176 C 232 192, 72 190, 18 174 C 6 148, 5 44, 18 20',
];

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
  const { isPicked, toggle } = usePicks();
  const { showToast } = useToast();
  const marked = isPicked(slug);

  // Deterministic variation & rotation based on slug hash
  const { pathD, rotation } = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < slug.length; i++) hash = (hash << 5) - hash + slug.charCodeAt(i);
    const variantIndex = Math.abs(hash) % GREASE_VARIANTS.length;
    const rot = ((Math.abs(hash) % 5) - 2); // -2° to +2°
    return { pathD: GREASE_VARIANTS[variantIndex], rotation: `${rot}deg` };
  }, [slug]);

  const handleMarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = toggle({ slug, title, year, role });
    if (result.limitReached) {
      showToast('Maximum 5 shortlisted picks reached. Shortlist is full.');
    } else if (result.added) {
      showToast(`Marked ${title} as a pick.`);
    }
  };

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
      <div className={cn('relative w-full overflow-hidden bg-[var(--surface-2)] block', aspectClass)}>
        <Link
          href={`/projects/${slug}`}
          className="relative w-full h-full block cursor-pointer"
          tabIndex={0}
          aria-label={`View case study for ${title}`}
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
            /* Typographic Placeholder Frame (Brief §4) */
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

        {/* Hand-drawn grease-pencil mark SVG (Brief M5) */}
        <div
          className={cn(
            'pointer-events-none absolute inset-1.5 transition-opacity duration-300',
            marked ? 'opacity-100' : 'opacity-0'
          )}
          style={{ transform: `rotate(${rotation})` }}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 300 200"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d={pathD}
              fill="none"
              stroke="var(--safelight)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                'transition-[stroke-dashoffset]',
                marked
                  ? 'duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] [stroke-dasharray:1000] [stroke-dashoffset:0]'
                  : '[stroke-dasharray:1000] [stroke-dashoffset:1000]'
              )}
            />
          </svg>
        </div>

        {/* Mark Button (24px circle, bottom right, per Brief M5) */}
        <button
          type="button"
          onClick={handleMarkClick}
          aria-pressed={marked}
          aria-label={`Mark ${title} as a pick`}
          title={marked ? `Remove ${title} from picks` : `Mark ${title} as a pick`}
          className={cn(
            'absolute bottom-3 right-3 z-20 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer',
            'transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[var(--safelight)]',
            marked
              ? 'bg-[var(--safelight)] text-[var(--on-safelight,#0A0908)] shadow-md scale-105'
              : 'bg-[var(--bg)]/85 text-[var(--text-dim)] border border-[var(--line)] hover:border-[var(--safelight)] hover:text-[var(--safelight)]'
          )}
        >
          <span className="sr-only">
            {marked ? `Unmark ${title} from picks` : `Mark ${title} as a pick`}
          </span>
          {marked ? (
            <svg
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
            </svg>
          ) : (
            <span className="w-2 h-2 rounded-full border border-current opacity-70" />
          )}
        </button>
      </div>

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
