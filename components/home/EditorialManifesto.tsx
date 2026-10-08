'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { site } from '@/content/site';
import { sound } from '@/lib/sound';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE_RECORDS = [
  {
    period: '2026 — PRESENT',
    status: 'ACTIVE',
    company: 'StayChat AI',
    role: 'AI Developer Intern',
    description: 'Production LLM pipelines, low-latency RAG architectures, and evaluation suites.',
    detail: 'Designed multi-stage prompt caching, vector retrieval pipelines, and automated latency benchmarks.',
  },
  {
    period: 'APR 2026 — MAY 2026',
    status: 'COMPLETED',
    company: 'HorizonTechX',
    role: 'Full Stack Developer Intern',
    description: 'Engineered LUMINA social platform architecture with PostgreSQL database models and JWT security.',
    detail: 'Normalized database relational schemas, implemented session token lifecycle, and secured REST endpoints.',
  },
  {
    period: 'MAY 2025 — JUN 2025',
    status: 'COMPLETED',
    company: 'FutureTech Innovations',
    role: 'Web Developer Intern',
    description: 'KemLang compiler toolchain, interactive Monaco code runner, and VS Code extension.',
    detail: 'Built custom compiler lexer/parser, syntax highlighting tokenizer, and in-browser interactive execution sandbox.',
  },
];

export function EditorialManifesto() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const rows = containerRef.current.querySelectorAll('.dossier-row');
    const trajectoryRows = containerRef.current.querySelectorAll('.trajectory-row');

    gsap.fromTo(
      rows,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rows[0],
          start: 'top 85%',
        },
      }
    );

    gsap.fromTo(
      trajectoryRows,
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: trajectoryRows[0],
          start: 'top 85%',
        },
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-36 border-t border-[var(--line)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 flex flex-col gap-20">
        {/* Section Header */}
        <div className="flex items-center justify-between font-mono text-xs text-[var(--ink-muted)]">
          <span>( 01 — ARCHITECTURAL RECORD &amp; MANIFESTO )</span>
          <span className="hidden sm:inline">VERIFIED PROOFS · ZERO VAPORWARE</span>
        </div>

        {/* 2-Column High-Fashion Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Monumental Manifesto Typography */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="font-serif text-[clamp(2.2rem,5vw,4.5rem)] font-light leading-[1.08] tracking-tight text-[var(--ink)]">
              Websites, compilers, <span className="italic text-[var(--accent)]">autonomous swarms</span>, and high-concurrency engines.
            </h2>

            <div className="space-y-5 text-base sm:text-lg text-[var(--ink-muted)] leading-relaxed font-sans max-w-2xl">
              <p>
                I am a computer science engineer based in Vadodara, India (9.67 GPA). Most developer portfolios lean on generic buzzwords like &quot;craft and passion&quot;. I ground my work in verifiable proof: custom programming language compilers with interactive sandboxes (<span className="text-[var(--ink)] font-semibold">KemLang</span>), autonomous security assessment platforms (<span className="text-[var(--ink)] font-semibold">RedForge</span>), and <span className="text-[var(--ink)] font-semibold">400+ LeetCode algorithmic solutions</span>.
              </p>
              <p>
                My philosophy is simple: write code where the failure modes are understood before the first happy path is deployed. If software runs in production, it should remain deterministic even when context windows explode, network packets drop, or throughput spikes.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-6 font-mono text-xs">
              <Link
                href="/work"
                onMouseEnter={() => sound.tick()}
                className="inline-flex items-center gap-2 font-bold text-[var(--accent)] hover:underline"
              >
                <span>Full Career Dossier</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[var(--line)]">/</span>
              <Link
                href="/resume"
                onMouseEnter={() => sound.tick()}
                className="inline-flex items-center gap-2 text-[var(--ink-muted)] hover:text-[var(--ink)]"
              >
                <span>Curriculum Vitae</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: The Engineering Dossier (Zero Cards - Hairline Matrix) */}
          <div className="lg:col-span-5 divide-y divide-[var(--line)] border-t border-b border-[var(--line)]">
            <div className="dossier-row py-6 space-y-2">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase text-[var(--accent)] font-semibold tracking-wider">
                <span>[01 // ACADEMIC RIGOR]</span>
                <span>CHARUSAT / VADODARA</span>
              </div>
              <h3 className="font-sans text-3xl font-extrabold text-[var(--ink)] tracking-tight">
                9.67 GPA
              </h3>
              <p className="font-mono text-xs text-[var(--ink-muted)] leading-relaxed">
                Computer Science &amp; Engineering. Deep academic focus on formal grammar, compiler construction, and relational algebra.
              </p>
            </div>

            <div className="dossier-row py-6 space-y-2">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase text-[var(--accent)] font-semibold tracking-wider">
                <span>[02 // ALGORITHMIC PROOF]</span>
                <span>LEETCODE VERIFIED</span>
              </div>
              <h3 className="font-sans text-3xl font-extrabold text-[var(--ink)] tracking-tight">
                400+ Problems Solved
              </h3>
              <p className="font-mono text-xs text-[var(--ink-muted)] leading-relaxed">
                Rigorous focus on graph traversals, dynamic programming invariants, bit manipulation, and optimal asymptotic complexity.
              </p>
            </div>

            <div className="dossier-row py-6 space-y-2">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase text-[var(--accent)] font-semibold tracking-wider">
                <span>[03 // ACTIVE SYSTEM]</span>
                <span>PRODUCTION TARGET</span>
              </div>
              <h3 className="font-sans text-3xl font-extrabold text-[var(--ink)] tracking-tight">
                RedForge
              </h3>
              <p className="font-mono text-xs text-[var(--ink-muted)] leading-relaxed">
                Autonomous agentic security platform executing coordinated vulnerability scans and automated risk analysis.
              </p>
            </div>

            <div className="dossier-row py-6 space-y-2">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase text-[var(--accent)] font-semibold tracking-wider">
                <span>[04 // ORIGIN &amp; TIMEZONE]</span>
                <span>INDIA / REMOTE</span>
              </div>
              <h3 className="font-sans text-3xl font-extrabold text-[var(--ink)] tracking-tight">
                Vadodara, India
              </h3>
              <p className="font-mono text-xs text-[var(--ink-muted)] leading-relaxed">
                Asia/Kolkata (UTC+5:30). High-bandwidth asynchronous collaboration across global engineering teams.
              </p>
            </div>
          </div>
        </div>

        {/* Career Trajectory Ledger (Zero Cards - Hairline Table) */}
        <div className="pt-8 border-t border-[var(--line)] space-y-8">
          <div className="flex items-center justify-between font-mono text-xs text-[var(--ink-muted)]">
            <span>( CHRONOLOGICAL TRAJECTORY &amp; INTERNSHIP ARCHIVE )</span>
            <span className="text-[var(--accent)] font-semibold">3 VERIFIED ENGAGEMENTS</span>
          </div>

          <div className="divide-y divide-[var(--line)] border-t border-b border-[var(--line)]">
            {EXPERIENCE_RECORDS.map((rec) => (
              <div
                key={rec.company}
                className="trajectory-row py-6 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start group hover:bg-[var(--bg-surface)]/50 transition-colors px-2 -mx-2"
              >
                {/* Period & Status */}
                <div className="md:col-span-3 flex flex-col gap-1">
                  <span className="font-mono text-xs font-bold text-[var(--accent)]">
                    {rec.period}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--ink-muted)] uppercase tracking-wider">
                    {rec.status}
                  </span>
                </div>

                {/* Company & Role */}
                <div className="md:col-span-4">
                  <h4 className="font-sans text-xl font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                    {rec.company}
                  </h4>
                  <span className="font-mono text-xs text-[var(--ink-muted)] block mt-0.5">
                    {rec.role}
                  </span>
                </div>

                {/* Scope & Impact */}
                <div className="md:col-span-5 space-y-1">
                  <p className="text-sm text-[var(--ink)] font-medium leading-relaxed">
                    {rec.description}
                  </p>
                  <p className="font-mono text-xs text-[var(--ink-muted)]">
                    {rec.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
