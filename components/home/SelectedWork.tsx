'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/system/Button';
import { Develop } from '@/components/motion/Develop';
import { projects } from '@/content/projects';

const FEATURED_SLUGS = ['redforge', 'searchmind', 'kemlang', 'aria'];

export function SelectedWork() {
  const featured = FEATURED_SLUGS.map((slug) =>
    projects.find((p) => p.slug === slug)
  ).filter(Boolean);

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check reduced motion & coarse pointer
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion || isTouch) return;

    // Use IntersectionObserver on each desktop frame to update active frame indicator
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    const frameEls = containerRef.current?.querySelectorAll('[data-index]');
    frameEls?.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="selected-work"
      aria-label="Selected Engineering Work"
      className="relative w-full border-b border-[var(--line)] bg-[var(--bg)]"
    >
      {/* Section Header */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-16 sm:pt-24 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--safelight)] mb-3">
            <span>▷ FRAME 01</span>
            <span>·</span>
            <span>FLAGSHIP SYSTEMS</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-[var(--text)] tracking-tight">
            Selected Work
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-dim)]">
            [ 01 — 0{featured.length} ]
          </span>
          <Button href="/projects" variant="secondary" size="sm">
            <span>Full Directory</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>

      {/* Selected Work Stream */}
      <div ref={containerRef} className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {featured.map((project, idx) => {
          if (!project) return null;
          const frameNum = `0${idx + 1}`;
          const topMetric = project.metrics?.[0];

          return (
            <article
              key={project.slug}
              data-index={idx}
              className="py-16 sm:py-24 border-b border-[var(--line)] last:border-b-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
            >
              {/* Left Column: Visual Print Frame */}
              <div className="lg:col-span-7">
                <div className="relative border border-[var(--line)] rounded-none overflow-hidden bg-[var(--surface)] group">
                  {/* Top Bar of Print */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--line)] bg-[var(--bg)] font-mono text-xs text-[var(--text-dim)]">
                    <span className="flex items-center gap-1.5 uppercase tracking-widest">
                      <span className="text-[var(--safelight)] font-bold">▷</span>
                      <span>FRAME {frameNum} / 0{featured.length}</span>
                    </span>
                    <span className="uppercase tracking-wider">
                      {project.kind} · {project.year}
                    </span>
                  </div>

                  {/* Image Frame or Typographic Latent Frame */}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="relative block aspect-[16/10] overflow-hidden bg-[var(--surface-2)] cursor-pointer"
                  >
                    {project.cover?.src ? (
                      <Develop className="w-full h-full">
                        <Image
                          src={project.cover.src}
                          alt={project.cover.alt || `${project.title} screenshot`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        />
                      </Develop>
                    ) : (
                      <div className="w-full h-full flex flex-col justify-between p-8 select-none bg-[radial-gradient(ellipse_at_top_right,var(--surface-2),var(--surface))]">
                        <div className="flex justify-between font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest">
                          <span>NEGATIVE EXPOSURE</span>
                          <span>LATENT {frameNum}</span>
                        </div>
                        <div className="text-center my-auto">
                          <span className="font-display font-black text-4xl sm:text-5xl text-[var(--text)] group-hover:text-[var(--safelight)] transition-colors">
                            {project.title}
                          </span>
                          <p className="font-mono text-xs text-[var(--safelight)] mt-2 uppercase tracking-widest">
                            [ {project.role} ]
                          </p>
                        </div>
                        <div className="flex justify-between font-mono text-[11px] text-[var(--text-dim)] border-t border-[var(--line)] pt-3">
                          <span>{project.stack?.slice(0, 3).join(' · ')}</span>
                          <span>{project.year}</span>
                        </div>
                      </div>
                    )}
                  </Link>
                </div>
              </div>

              {/* Right Column: Case Intel & Outcome */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-dim)] uppercase tracking-wider">
                  <span className="text-[var(--safelight)] font-bold">▷ {frameNum}</span>
                  <span>·</span>
                  <span>{project.role}</span>
                  <span>·</span>
                  <span>{project.year}</span>
                </div>

                <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[var(--text)] tracking-tight">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:text-[var(--safelight)] transition-colors"
                  >
                    {project.title}
                  </Link>
                </h3>

                <p className="font-text text-base sm:text-lg text-[var(--text-dim)] leading-relaxed">
                  {project.oneLiner}
                </p>

                {/* Key Metric Badge */}
                {topMetric && (
                  <div className="p-4 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius-ui)] flex items-baseline gap-3">
                    <span className="font-display font-black text-2xl sm:text-3xl text-[var(--safelight)] tabular-nums">
                      {topMetric.value}
                    </span>
                    <span className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-wider">
                      {topMetric.label} {topMetric.note ? `(${topMetric.note})` : ''}
                    </span>
                  </div>
                )}

                {/* Stack Chips */}
                {project.stack && project.stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.stack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider border border-[var(--line)] bg-[var(--surface-2)] text-[var(--text-dim)] rounded-[var(--radius-ui)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA Action */}
                <div className="pt-4 flex items-center gap-4">
                  <Button
                    variant="primary"
                    size="md"
                    href={`/projects/${project.slug}`}
                  >
                    <span>Open Case Study</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>

                  {project.links?.[0]?.href && (
                    <Button
                      variant="ghost"
                      size="md"
                      href={project.links[0].href}
                      external
                    >
                      <span>Repository</span>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
