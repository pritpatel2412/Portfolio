'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { site } from '@/content/site';
import { TextReveal } from '@/components/system/TextReveal';
import { ArrowUpRight, GraduationCap, MapPin, Code2, Cpu } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function EditorialAbout() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Animate Metadata cards
    const metaCards = containerRef.current.querySelectorAll('.meta-card');
    gsap.fromTo(metaCards, 
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: metaCards[0],
          start: 'top 85%',
        }
      }
    );

    // Animate Trajectory cards
    const trajectoryCards = containerRef.current.querySelectorAll('.trajectory-card');
    gsap.fromTo(trajectoryCards,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: trajectoryCards[0],
          start: 'top 85%',
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-36 border-t border-[var(--line)]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 flex flex-col gap-16">
        {/* Section Header */}
        <div className="flex items-center justify-between font-mono text-xs text-[var(--ink-muted)]">
          <span>01 / ABOUT &amp; TRAJECTORY</span>
          <span>DISCIPLINE · VERIFIED DATA</span>
        </div>

        {/* Large Statement & Narrative (Editorial 2-Column Spread) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Big Statement */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-[var(--ink)] tracking-tight leading-[0.95] flex flex-col gap-2">
              <TextReveal text="ENGINEER." />
              <TextReveal text="DESIGNER." delay={0.1} />
              <span className="font-serif italic font-normal text-[var(--accent)] block overflow-hidden">
                <TextReveal text="SYSTEMS BUILDER." delay={0.2} />
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[var(--ink-muted)] leading-relaxed max-w-xl">
              <TextReveal text="I build at the intersection of AI, systems, and design. Code for me is about engineering systems that think, adapt, and scale under production load—from autonomous agent swarms to compiler toolchains and resilient backends." delay={0.3} />
            </p>

            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent)] hover:underline"
              >
                <span>View Full Career Timeline</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[var(--line)]">|</span>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[var(--ink-muted)] hover:text-[var(--ink)]"
              >
                <span>Interactive Résumé</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Key Verified Metadata Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="meta-card p-5 rounded-lg border border-[var(--line)] bg-[var(--bg-surface)] flex flex-col justify-between h-36">
              <div className="flex items-center justify-between text-[var(--ink-muted)]">
                <span className="font-mono text-[10px] tracking-wider uppercase">LOCATION</span>
                <MapPin className="w-4 h-4 text-[var(--accent)]" />
              </div>
              <div>
                <span className="font-bold text-lg text-[var(--ink)] block">{site.location}</span>
                <span className="font-mono text-xs text-[var(--ink-muted)]">Timezone: Asia/Kolkata (IST)</span>
              </div>
            </div>

            <div className="meta-card p-5 rounded-lg border border-[var(--line)] bg-[var(--bg-surface)] flex flex-col justify-between h-36">
              <div className="flex items-center justify-between text-[var(--ink-muted)]">
                <span className="font-mono text-[10px] tracking-wider uppercase">ACADEMICS</span>
                <GraduationCap className="w-4 h-4 text-[var(--accent)]" />
              </div>
              <div>
                <span className="font-bold text-lg text-[var(--ink)] block">9.67 GPA</span>
                <span className="font-mono text-xs text-[var(--ink-muted)]">Computer Science &amp; Engineering</span>
              </div>
            </div>

            <div className="meta-card p-5 rounded-lg border border-[var(--line)] bg-[var(--bg-surface)] flex flex-col justify-between h-36">
              <div className="flex items-center justify-between text-[var(--ink-muted)]">
                <span className="font-mono text-[10px] tracking-wider uppercase">ALGORITHMIC MASTERY</span>
                <Code2 className="w-4 h-4 text-[var(--accent)]" />
              </div>
              <div>
                <span className="font-bold text-lg text-[var(--ink)] block">400+ Problems</span>
                <span className="font-mono text-xs text-[var(--ink-muted)]">LeetCode Verified Problem Solver</span>
              </div>
            </div>

            <div className="meta-card p-5 rounded-lg border border-[var(--line)] bg-[var(--bg-surface)] flex flex-col justify-between h-36">
              <div className="flex items-center justify-between text-[var(--ink-muted)]">
                <span className="font-mono text-[10px] tracking-wider uppercase">ACTIVE BUILDING</span>
                <Cpu className="w-4 h-4 text-[var(--accent)]" />
              </div>
              <div>
                <span className="font-bold text-base text-[var(--ink)] block">RedForge</span>
                <span className="font-mono text-xs text-[var(--ink-muted)]">Autonomous Security Engine</span>
              </div>
            </div>
          </div>
        </div>

        {/* Career Trajectory Strip */}
        <div className="pt-8 border-t border-[var(--line)]">
          <div className="font-mono text-xs uppercase tracking-wider text-[var(--ink-muted)] mb-6">
            CHRONOLOGICAL TRAJECTORY
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="trajectory-card p-5 rounded-lg border border-[var(--line)] bg-[var(--bg)] flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[var(--accent)]">2026 — PRESENT</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-green-500/10 text-green-600 font-semibold">
                  ACTIVE
                </span>
              </div>
              <div>
                <h4 className="font-bold text-base text-[var(--ink)]">StayChat AI</h4>
                <p className="font-mono text-xs text-[var(--ink-muted)] mt-0.5">AI Developer Intern</p>
                <p className="text-xs text-[var(--ink-muted)] mt-2 leading-relaxed">
                  Production LLM pipelines, low-latency RAG architectures, and evaluation suites.
                </p>
              </div>
            </div>

            <div className="trajectory-card p-5 rounded-lg border border-[var(--line)] bg-[var(--bg)] flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[var(--ink-muted)]">APR 2026 — MAY 2026</span>
              </div>
              <div>
                <h4 className="font-bold text-base text-[var(--ink)]">HorizonTechX</h4>
                <p className="font-mono text-xs text-[var(--ink-muted)] mt-0.5">Full Stack Developer Intern</p>
                <p className="text-xs text-[var(--ink-muted)] mt-2 leading-relaxed">
                  Engineered LUMINA social platform with PostgreSQL database models and JWT security.
                </p>
              </div>
            </div>

            <div className="trajectory-card p-5 rounded-lg border border-[var(--line)] bg-[var(--bg)] flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[var(--ink-muted)]">MAY 2025 — JUN 2025</span>
              </div>
              <div>
                <h4 className="font-bold text-base text-[var(--ink)]">FutureTech Innovations</h4>
                <p className="font-mono text-xs text-[var(--ink-muted)] mt-0.5">Web Developer Intern</p>
                <p className="text-xs text-[var(--ink-muted)] mt-2 leading-relaxed">
                  KemLang compiler toolchain, interactive Monaco code runner, and VS Code extension.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
