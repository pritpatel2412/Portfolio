'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { stackItems } from '@/content/stack';
import { ArrowUpRight, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TechCategory {
  title: string;
  domain: string;
  items: typeof stackItems;
}

export function TechnologyArchive() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const categories = sectionRef.current.querySelectorAll('.tech-category');
    
    gsap.fromTo(categories, 
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    );
    
    const panel = sectionRef.current.querySelector('.tech-panel');
    if (panel) {
      gsap.fromTo(panel,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }
  }, []);

  const categories: TechCategory[] = [
    {
      title: 'AI & AUTONOMOUS SYSTEMS',
      domain: 'ai-systems',
      items: stackItems.filter((i) => i.domain === 'ai-systems'),
    },
    {
      title: 'BACKEND & CONCURRENCY',
      domain: 'backend',
      items: stackItems.filter((i) => i.domain === 'backend'),
    },
    {
      title: 'LANGUAGES & RUNTIMES',
      domain: 'languages',
      items: stackItems.filter((i) => i.domain === 'languages'),
    },
    {
      title: 'FRONTEND & DESIGN SYSTEMS',
      domain: 'frontend',
      items: stackItems.filter((i) => i.domain === 'frontend'),
    },
    {
      title: 'DATA INFRASTRUCTURE & CLOUD',
      domain: 'data-cloud',
      items: stackItems.filter((i) => i.domain === 'data-cloud'),
    },
  ];

  const activeItem = stackItems.find((i) => i.name === selectedTech) || stackItems[0];

  return (
    <section ref={sectionRef} className="py-24 md:py-36 border-t border-[var(--line)]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 flex flex-col gap-12">
        {/* Header */}
        <div className="flex items-center justify-between font-mono text-xs text-[var(--ink-muted)]">
          <span>03 / INTERACTIVE TECHNOLOGY ARCHIVE</span>
          <span>NO ARBITRARY PERCENTAGES · PRODUCTION PROVEN</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Categories and Interactive Labels */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {categories.map((cat) => (
              <div key={cat.domain} className="tech-category space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-[var(--accent)]">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{cat.title}</span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {cat.items.map((tech) => {
                    const isSelected = selectedTech === tech.name;
                    return (
                      <button
                        key={tech.name}
                        type="button"
                        onMouseEnter={() => setSelectedTech(tech.name)}
                        onClick={() => setSelectedTech(tech.name)}
                        className={`group px-4 py-2 rounded-lg border font-mono text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)] shadow-md'
                            : 'bg-[var(--bg-surface)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--accent)]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{tech.name}</span>
                          {tech.projects.length > 0 && (
                            <span
                              className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                                isSelected
                                  ? 'bg-[var(--bg)] text-[var(--accent)]'
                                  : 'bg-[var(--bg)] text-[var(--ink-muted)]'
                              }`}
                            >
                              {tech.projects.length}
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Dynamic Deep-Dive Inspector Panel */}
          <div className="tech-panel lg:col-span-4 sticky top-24 p-6 rounded-xl border border-[var(--line)] bg-[var(--bg-surface)] shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
              <span className="font-mono text-[10px] uppercase text-[var(--ink-muted)] tracking-wider">
                TECHNOLOGY TELEMETRY
              </span>
              <span className="font-mono text-xs font-bold text-[var(--accent)]">
                {activeItem?.level.toUpperCase()} LEVEL
              </span>
            </div>

            <div>
              <h3 className="font-display text-3xl font-extrabold text-[var(--ink)]">
                {activeItem?.name}
              </h3>
              <span className="font-mono text-xs text-[var(--ink-muted)] uppercase tracking-wide block mt-1">
                Domain: {activeItem?.domain}
              </span>
            </div>

            {/* Associated Projects */}
            <div className="space-y-2 pt-2 border-t border-[var(--line)]">
              <span className="font-mono text-[11px] text-[var(--ink-muted)] block uppercase">
                Deployed in Projects:
              </span>
              {activeItem?.projects.length ? (
                <div className="flex flex-wrap gap-1.5">
                  {activeItem.projects.map((slug) => (
                    <Link
                      key={slug}
                      href={`/projects/${slug}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[var(--bg)] border border-[var(--line)] font-mono text-xs text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                    >
                      <span className="capitalize">{slug}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-[var(--ink-muted)] italic">
                  Utilized in internal tooling and algorithmic research.
                </span>
              )}
            </div>

            <div className="pt-2 text-xs text-[var(--ink-muted)] leading-relaxed border-t border-[var(--line)]">
              Hover any technology badge to inspect real project associations and production usage across this portfolio.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
