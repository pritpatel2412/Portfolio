'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Layered } from '@/components/system/Layered';

const THESIS_WORDS = [
  { text: 'Great', italic: false },
  { text: 'software', italic: false },
  { text: 'is', italic: false },
  { text: 'never', italic: false },
  { text: 'defined', italic: false },
  { text: 'by', italic: false },
  { text: 'incidental', italic: true },
  { text: 'complexity,', italic: true },
  { text: 'but', italic: false },
  { text: 'by', italic: false },
  { text: 'the', italic: false },
  { text: 'clarity', italic: false },
  { text: 'of', italic: false },
  { text: 'its', italic: false },
  { text: 'underlying', italic: false },
  { text: 'system', italic: false },
  { text: 'model.', italic: false },
  { text: 'I', italic: false },
  { text: 'engineer', italic: false },
  { text: 'autonomous', italic: false },
  { text: 'agents', italic: false },
  { text: 'and', italic: false },
  { text: 'high-throughput', italic: false },
  { text: 'backends', italic: false },
  { text: 'that', italic: false },
  { text: 'scale', italic: false },
  { text: 'under', italic: false },
  { text: 'production', italic: false },
  { text: 'stress', italic: false },
  { text: 'with', italic: false },
  { text: 'uncompromising', italic: true },
  { text: 'craft.', italic: true },
];

export function Thesis() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current || !textRef.current) return;

    const words = textRef.current.querySelectorAll('.thesis-word');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.18 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: 0.5,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const rawMarkdown = `## Thesis / Point of View\n\nGreat software is never defined by *incidental complexity*, but by the clarity of its underlying system model. I engineer autonomous agents and high-throughput backends that scale under production stress with *uncompromising craft*.`;

  return (
    <section ref={containerRef} className="py-24 md:py-36 border-t border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-12 flex flex-col gap-6">
        <div className="font-mono text-xs uppercase tracking-widest text-[var(--ink-muted)]">
          02 / PHILOSOPHY & THESIS
        </div>

        <Layered
          surface={
            <p
              ref={textRef}
              className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.15]"
            >
              {THESIS_WORDS.map((w, i) => (
                <span
                  key={i}
                  className={`thesis-word inline-block mr-[0.3em] transition-colors duration-75 ${
                    w.italic ? 'font-serif italic font-normal text-[var(--signal)]' : ''
                  }`}
                >
                  {w.text}
                </span>
              ))}
            </p>
          }
          source={
            <div className="space-y-2 font-mono text-xs text-[var(--ink-muted)]">
              <div className="text-[var(--phosphor)] font-bold">// RAW THESIS SOURCE</div>
              <pre className="whitespace-pre-wrap leading-relaxed p-3 bg-black/40 rounded border border-[var(--line)]">
                {rawMarkdown}
              </pre>
            </div>
          }
        />
      </div>
    </section>
  );
}
