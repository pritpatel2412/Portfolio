'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/content/projects';
import { Layered } from '@/components/system/Layered';
import { ArrowUpRight } from 'lucide-react';

export function WorkIndex() {
  const [activeProject, setActiveProject] = useState<(typeof projects)[0] | null>(null);
  const [coords, setCoords] = useState({ x: -999, y: -999 });
  const [skew, setSkew] = useState(0);
  const lastXRef = useRef(0);
  const previewRef = useRef<HTMLDivElement>(null);

  const featured = projects.slice(0, 5);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const deltaX = e.clientX - lastXRef.current;
      lastXRef.current = e.clientX;
      const targetSkew = Math.max(-6, Math.min(6, deltaX * 0.3));
      setSkew(targetSkew);
      setCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <section className="py-20 md:py-32 border-t border-[var(--line)] relative">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 flex flex-col gap-10">
        <div className="flex items-center justify-between font-mono text-xs text-[var(--ink-muted)]">
          <span>03 / SELECTED WORK INDEX</span>
          <span>{projects.length} PROJECTS TOTAL</span>
        </div>

        <div className="flex flex-col divide-y divide-[var(--line)]">
          {featured.map((p, idx) => (
            <div
              key={p.slug}
              onMouseEnter={() => setActiveProject(p)}
              onMouseLeave={() => setActiveProject(null)}
              className="group py-6 md:py-8 transition-colors"
            >
              <Layered
                surface={
                  <Link
                    href={`/projects/${p.slug}`}
                    className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 select-none"
                  >
                    <div className="flex items-baseline gap-4 md:gap-8">
                      <span className="font-mono text-xs md:text-sm text-[var(--ink-muted)] w-8">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--ink)] group-hover:text-[var(--signal)] transition-colors">
                        {p.title}
                      </h3>
                      <span className="hidden lg:inline font-mono text-xs uppercase px-2 py-0.5 rounded border border-[var(--line)] text-[var(--ink-muted)]">
                        {p.kind}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-6 pl-12 md:pl-0">
                      <p className="text-sm text-[var(--ink-muted)] max-w-md hidden md:block">
                        {p.oneLiner}
                      </p>
                      <span className="font-mono text-xs text-[var(--ink-muted)]">{p.year}</span>
                      <ArrowUpRight className="w-4 h-4 text-[var(--signal)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </Link>
                }
                source={
                  <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                    <div>
                      <span className="text-[var(--phosphor)] font-bold">{p.title}</span> · Metric:{' '}
                      <span className="text-[var(--warn)] font-bold">{p.metrics[0]?.value || 'Production'}</span> ({p.metrics[0]?.label})
                    </div>
                    <div className="text-[var(--ink-muted)] text-[11px]">
                      Stack: {p.stack.slice(0, 4).join(', ')}
                    </div>
                  </div>
                }
              />
            </div>
          ))}
        </div>

        {/* View All Projects link */}
        <div className="pt-4 flex justify-end">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-[var(--signal)] hover:underline uppercase tracking-wider"
          >
            <span>All Projects & Systems ({projects.length}) →</span>
          </Link>
        </div>
      </div>

      {/* Floating Media Preview on Hover (Fine Pointers Only) */}
      {activeProject && (
        <div
          ref={previewRef}
          className="fixed pointer-events-none z-40 hidden md:block w-72 h-44 rounded-lg overflow-hidden border border-[var(--line)] shadow-2xl transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${coords.x}px`,
            top: `${coords.y}px`,
            transform: `translate(-50%, -50%) rotate(${skew}deg)`,
          }}
        >
          <div className="relative w-full h-full bg-black">
            <Image
              src={activeProject.cover.src}
              alt={activeProject.cover.alt}
              fill
              className="object-cover"
              sizes="288px"
            />
          </div>
        </div>
      )}
    </section>
  );
}
