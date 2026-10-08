'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/content/projects';
import { sound } from '@/lib/sound';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export function KineticProjectExhibition() {
  const [activeProject, setActiveProject] = useState<(typeof projects)[0] | null>(null);
  const [coords, setCoords] = useState({ x: -999, y: -999 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const previewRef = useRef<HTMLDivElement>(null);

  const featured = projects.slice(0, 5);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });

      // Calculate tilt based on distance from center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const tiltX = ((e.clientY - centerY) / centerY) * 12;
      const tiltY = ((centerX - e.clientX) / centerX) * 12;
      setTilt({ x: tiltX, y: tiltY });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <section className="py-24 md:py-36 border-t border-[var(--line)] relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 flex flex-col gap-14">
        {/* Header */}
        <div className="flex items-center justify-between font-mono text-xs text-[var(--ink-muted)]">
          <span>( 03 — SELECTED PRODUCTION WORKS &amp; SYSTEMS )</span>
          <span>{projects.length} SYSTEMS ENGINEERED</span>
        </div>

        {/* Project Typographic Exhibition Rows */}
        <div className="divide-y divide-[var(--line)] border-t border-b border-[var(--line)]">
          {featured.map((p, idx) => (
            <div
              key={p.slug}
              onMouseEnter={() => {
                sound.tick();
                setActiveProject(p);
              }}
              onMouseLeave={() => setActiveProject(null)}
              className="group py-8 md:py-12 transition-all duration-300 relative"
            >
              <Link
                href={`/projects/${p.slug}`}
                className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-6 select-none"
              >
                {/* Index + Title */}
                <div className="flex items-baseline gap-6 md:gap-10">
                  <span className="font-mono text-xs md:text-sm text-[var(--ink-muted)] font-bold">
                    [0{idx + 1}]
                  </span>

                  <div>
                    <h3 className="font-sans text-4xl sm:text-6xl md:text-7xl font-black text-[var(--ink)] tracking-tight group-hover:text-[var(--accent)] transition-colors leading-[0.95]">
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 font-mono text-xs text-[var(--ink-muted)]">
                      <span className="uppercase text-[var(--accent)] font-semibold">
                        {p.kind}
                      </span>
                      <span>·</span>
                      <span>{p.year}</span>
                    </div>
                  </div>
                </div>

                {/* Metric & Description */}
                <div className="flex flex-col lg:items-end gap-2 pl-12 lg:pl-0">
                  {p.metrics[0] && (
                    <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                      <span>{p.metrics[0].value}</span>
                      <span className="text-[var(--ink-muted)] font-normal">({p.metrics[0].label})</span>
                    </div>
                  )}

                  <p className="text-sm text-[var(--ink-muted)] max-w-md lg:text-right leading-relaxed font-sans">
                    {p.oneLiner}
                  </p>

                  <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--ink)] font-bold group-hover:text-[var(--accent)] transition-colors mt-2">
                    <span>Inspect Case Study</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Floating Kinetic Preview Cursor Frame */}
        {activeProject && (
          <div
            ref={previewRef}
            aria-hidden="true"
            className="hidden lg:block fixed pointer-events-none z-50 transition-opacity duration-300"
            style={{
              left: `${coords.x + 30}px`,
              top: `${coords.y - 120}px`,
              transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="w-[340px] p-3 bg-[var(--bg-surface)] border border-[var(--line)] shadow-2xl space-y-2">
              <div className="relative aspect-[16/10] overflow-hidden bg-black/10">
                {activeProject.cover?.src ? (
                  <Image
                    src={activeProject.cover.src}
                    alt={activeProject.cover.alt || activeProject.title}
                    fill
                    className="object-cover"
                    sizes="340px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-xs text-[var(--ink-muted)]">
                    {activeProject.title}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between font-mono text-[10px] text-[var(--ink-muted)] px-1">
                <span className="font-bold text-[var(--ink)]">{activeProject.title}</span>
                <span>{activeProject.metrics[0]?.value || 'Production'}</span>
              </div>
            </div>
          </div>
        )}

        {/* View All Directory Link */}
        <div className="flex justify-end pt-4">
          <Link
            href="/projects"
            onMouseEnter={() => sound.tick()}
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-[var(--accent)] hover:underline"
          >
            <span>Complete Architecture &amp; Project Archive ({projects.length})</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
