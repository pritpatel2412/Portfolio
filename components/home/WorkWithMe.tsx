'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/system/Button';

interface EngagementModel {
  frame: string;
  title: string;
  goodFitIf: string;
  duration: string;
  deliverables: string[];
  caseStudyTitle: string;
  caseStudyHref: string;
}

const ENGAGEMENTS: EngagementModel[] = [
  {
    frame: '01',
    title: 'Autonomous AI Agents & RAG',
    goodFitIf: 'You need deterministic multi-step agent execution, parallel tool calling, and sub-100ms semantic grounding without hallucinations.',
    duration: '2 – 6 Weeks',
    deliverables: ['Custom tool orchestration', 'Sub-100ms vector / LSH cache', 'Deterministic evaluation harness'],
    caseStudyTitle: 'RedForge AI',
    caseStudyHref: '/projects/redforge',
  },
  {
    frame: '02',
    title: 'High-Throughput Backend & APIs',
    goodFitIf: 'Your system is hitting latency or concurrency ceilings and requires async event-driven worker pools with Redis Streams and PostgreSQL.',
    duration: '3 – 8 Weeks',
    deliverables: ['Async FastAPI / Go service mesh', 'Sub-80ms P99 API architecture', 'Stress-testing & telemetry suite'],
    caseStudyTitle: 'SearchMind API',
    caseStudyHref: '/projects/searchmind',
  },
  {
    frame: '03',
    title: 'Developer Tooling & Compilers',
    goodFitIf: 'You require AST-level code inspection, automated security scanning, or domain-specific language interpreters with zero runtime crashes.',
    duration: '2 – 5 Weeks',
    deliverables: ['AST tokenizer & parser', 'CLI developer workflow', 'Structural test harness'],
    caseStudyTitle: 'KemLang Compiler',
    caseStudyHref: '/projects/kemlang',
  },
  {
    frame: '04',
    title: 'Full-Time Systems Engineering',
    goodFitIf: 'Your engineering organization is scaling and needs a developer who builds defensively, respects performance budgets, and ships clean code.',
    duration: 'Permanent / Full-Time',
    deliverables: ['Autonomous ownership', 'Defensive architecture', 'Full-stack production delivery'],
    caseStudyTitle: 'Experience & History',
    caseStudyHref: '/experience',
  },
];

export function WorkWithMe() {
  return (
    <section
      aria-label="Ways to Engage"
      className="w-full border-b border-[var(--line)] bg-[var(--surface)] py-16 sm:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[var(--line)] pb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--safelight)] mb-3">
              <span>▷ FRAME 02</span>
              <span>·</span>
              <span>ENGAGEMENT MODELS</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[var(--text)] tracking-tight">
              Work With Me
            </h2>
            <p className="font-text text-base sm:text-lg text-[var(--text-dim)] mt-3 max-w-xl">
              Concrete technical deliverables over generic skill buzzwords. Four structured ways to partner.
            </p>
          </div>

          <Button href="/contact" variant="primary" size="md">
            <span>Initiate Project</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {ENGAGEMENTS.map((item) => (
            <div
              key={item.frame}
              className="p-6 sm:p-8 border border-[var(--line)] bg-[var(--bg)] rounded-none flex flex-col justify-between gap-8 group hover:border-[var(--text-dim)] transition-colors"
            >
              <div className="flex flex-col gap-5">
                {/* Meta Top Bar */}
                <div className="flex items-center justify-between font-mono text-xs text-[var(--text-dim)] border-b border-[var(--line)] pb-3">
                  <span className="flex items-center gap-1.5 uppercase tracking-widest text-[var(--safelight)] font-bold">
                    ▷ MODEL {item.frame}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[var(--text)] uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5 text-[var(--safelight)]" />
                    <span>{item.duration}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text)] tracking-tight">
                  {item.title}
                </h3>

                {/* Good Fit If */}
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--safelight)]">
                    Good fit if:
                  </span>
                  <p className="font-text text-sm sm:text-base text-[var(--text-dim)] leading-relaxed">
                    {item.goodFitIf}
                  </p>
                </div>

                {/* Key Deliverables */}
                <div className="flex flex-col gap-2 pt-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-dim)]">
                    Key Outcomes:
                  </span>
                  <ul className="flex flex-col gap-1.5 font-mono text-xs text-[var(--text-dim)]">
                    {item.deliverables.map((deliv, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--safelight)] shrink-0" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Matching Case Study Link */}
              <div className="border-t border-[var(--line)] pt-4 flex items-center justify-between font-mono text-xs">
                <span className="text-[var(--text-dim)] uppercase tracking-wider">
                  Reference System:
                </span>
                <Link
                  href={item.caseStudyHref}
                  className="inline-flex items-center gap-1 text-[var(--safelight)] hover:underline font-semibold"
                >
                  <span>{item.caseStudyTitle}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
