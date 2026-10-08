'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { sound } from '@/lib/sound';
import { ArrowUpRight } from 'lucide-react';

interface DomainRecord {
  id: string;
  num: string;
  title: string;
  serifTitle: string;
  lead: string;
  technologies: {
    name: string;
    level: string;
    projectSlug?: string;
    projectTitle?: string;
  }[];
}

const DOMAINS: DomainRecord[] = [
  {
    id: 'ai-agents',
    num: '01',
    title: 'AUTONOMOUS',
    serifTitle: 'Agents & RAG',
    lead: 'Agentic reasoning loops, real-time voice streaming, and sub-150ms vector retrieval architectures.',
    technologies: [
      { name: 'Autonomous Pentesting Agents', level: 'Production', projectSlug: 'redforge', projectTitle: 'RedForge' },
      { name: 'Low-Latency RAG Pipelines', level: 'Production', projectSlug: 'staychat', projectTitle: 'StayChat' },
      { name: 'Real-Time Voice Streaming (WebSockets)', level: 'Production', projectSlug: 'aria', projectTitle: 'Aria' },
      { name: 'Multi-Agent Tool Calling & Reflection', level: 'Core', projectSlug: 'redforge', projectTitle: 'RedForge' },
      { name: 'High-Dimensional Vector Embeddings', level: 'Core', projectSlug: 'searchmind', projectTitle: 'Searchmind' },
      { name: 'Context Window & Token Diet Optimizations', level: 'Core' },
    ],
  },
  {
    id: 'compilers',
    num: '02',
    title: 'COMPILERS &',
    serifTitle: 'Language Toolchains',
    lead: 'Deterministic compilation, lexical tokenizers, abstract syntax tree (AST) traversal, and interactive sandbox execution.',
    technologies: [
      { name: 'KemLang Compiler Architecture', level: 'Custom Toolchain', projectSlug: 'kemlang', projectTitle: 'KemLang' },
      { name: 'Monaco Interactive Code Runner', level: 'Production', projectSlug: 'kemlang', projectTitle: 'KemLang' },
      { name: 'Lexer & AST Parser Engine', level: 'Core', projectSlug: 'kemlang', projectTitle: 'KemLang' },
      { name: 'VS Code Language Server Extension', level: 'Production', projectSlug: 'kemlang', projectTitle: 'KemLang' },
      { name: 'Deterministic Runtime Sandbox', level: 'Core' },
    ],
  },
  {
    id: 'backend',
    num: '03',
    title: 'DISTRIBUTED',
    serifTitle: 'Backends & Concurrency',
    lead: 'High-throughput async event loops, normalized relational topologies, and distributed worker queues.',
    technologies: [
      { name: 'FastAPI Asynchronous Architecture', level: 'Production', projectSlug: 'redforge', projectTitle: 'RedForge' },
      { name: 'PostgreSQL Normalized Relational Schemas', level: 'Production', projectSlug: 'horizontechx', projectTitle: 'HorizonTechX' },
      { name: 'Redis Pub/Sub & Memory Caching', level: 'Core', projectSlug: 'scraply', projectTitle: 'Scraply' },
      { name: 'Distributed Browser Automation (Playwright)', level: 'Production', projectSlug: 'scraply', projectTitle: 'Scraply' },
      { name: 'Docker Containerization & CI/CD Pipelines', level: 'Core' },
      { name: 'Node.js & WebSocket Full-Duplex Channels', level: 'Core' },
    ],
  },
  {
    id: 'interfaces',
    num: '04',
    title: 'CREATIVE CODE &',
    serifTitle: 'High-Fidelity Interfaces',
    lead: 'Kinetic typography, fluid variable-weight physics, design system tokens, and uncompromising WCAG 2.2 AA floors.',
    technologies: [
      { name: 'Next.js 15 App Router Architecture', level: 'Production' },
      { name: 'GSAP Scroll & Kinetic Timelines', level: 'Production' },
      { name: 'Variable Fonts & Optical Sizing Dynamics', level: 'Core' },
      { name: 'Web Audio API Tactile Sound Engine', level: 'Production' },
      { name: 'Tailwind CSS Custom Design Token Architectures', level: 'Core' },
      { name: 'Accessible Semantic DOM & Keyboard Navigation', level: 'Core' },
    ],
  },
];

export function HorizontalDomainDeck() {
  const [activeDomain, setActiveDomain] = useState<string>('ai-agents');
  const selectedDomain = DOMAINS.find((d) => d.id === activeDomain) || DOMAINS[0];

  const handleSelectDomain = (id: string) => {
    sound.click(1900, 0.02);
    setActiveDomain(id);
  };

  return (
    <section className="py-24 md:py-36 border-t border-[var(--line)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 flex flex-col gap-14">
        {/* Section Header */}
        <div className="flex items-center justify-between font-mono text-xs text-[var(--ink-muted)]">
          <span>( 02 — ARCHITECTURAL DOMAINS &amp; PRODUCTION STACK )</span>
          <span className="hidden sm:inline">ZERO ARBITRARY PERCENTAGE BARS</span>
        </div>

        {/* Domain Navigation Tabs (Editorial Hairline Tabs, Zero Pills!) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-b border-[var(--line)] divide-x divide-[var(--line)]">
          {DOMAINS.map((domain) => {
            const isActive = domain.id === activeDomain;
            return (
              <button
                key={domain.id}
                type="button"
                onClick={() => handleSelectDomain(domain.id)}
                onMouseEnter={() => sound.tick()}
                className={`py-6 px-4 md:px-6 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4 ${
                  isActive
                    ? 'bg-[var(--bg-surface)] text-[var(--ink)] border-b-2 border-b-[var(--accent)] -mb-[1px]'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--bg-surface)]/30'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className={isActive ? 'text-[var(--accent)] font-bold' : ''}>
                    {domain.num}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  )}
                </div>

                <div>
                  <span className="block font-sans text-xs uppercase tracking-wider font-bold">
                    {domain.title}
                  </span>
                  <span className="block font-serif text-base italic text-[var(--accent)]">
                    {domain.serifTitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Domain Presentation Area */}
        <div className="relative border border-[var(--line)] bg-[var(--bg-surface)] p-6 sm:p-10 md:p-14 overflow-hidden">
          {/* Watermark Numeral */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 right-0 select-none font-sans font-black text-[30vw] md:text-[22vw] leading-none text-[var(--ink)]/[0.035] -z-0"
          >
            {selectedDomain.num}
          </span>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Domain Overview */}
            <div className="lg:col-span-5 space-y-5">
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-bold">
                DOMAIN {selectedDomain.num} // SPECIFICATION
              </div>

              <h3 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--ink)] tracking-tight leading-[1.02]">
                {selectedDomain.title}{' '}
                <span className="font-serif italic font-light text-[var(--accent)] block">
                  {selectedDomain.serifTitle}
                </span>
              </h3>

              <p className="font-sans text-base text-[var(--ink-muted)] leading-relaxed">
                {selectedDomain.lead}
              </p>

              <div className="pt-4 font-mono text-xs text-[var(--ink-muted)]">
                <span>VERIFIED PRODUCTION CAPABILITY</span>
              </div>
            </div>

            {/* Domain Technologies List (Typographic Hairline Rows, Zero Badges!) */}
            <div className="lg:col-span-7 divide-y divide-[var(--line)] border-t border-b border-[var(--line)]">
              {selectedDomain.technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group hover:bg-[var(--bg)]/60 px-3 -mx-3 transition-colors"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif italic text-sm text-[var(--accent)]">
                      ↳
                    </span>
                    <span className="font-sans text-base sm:text-lg font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                      {tech.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-xs pl-6 sm:pl-0">
                    <span className="text-[var(--ink-muted)] text-[11px]">
                      {tech.level}
                    </span>

                    {tech.projectSlug ? (
                      <Link
                        href={`/projects/${tech.projectSlug}`}
                        onMouseEnter={() => sound.tick()}
                        className="inline-flex items-center gap-1 text-[var(--accent)] font-semibold hover:underline"
                      >
                        <span>{tech.projectTitle}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <span className="text-[10px] text-[var(--ink-muted)] opacity-60">
                        Internal Core
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
