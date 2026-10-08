import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, ExternalLink, ShieldCheck, Code2 } from 'lucide-react';
import {
  ALL_PROJECTS,
  getProjectBySlug,
  getNextProject,
} from '@/lib/projects';
import { ChapterRail, type ChapterItem } from '@/components/projects/ChapterRail';
import { ChapterStamp } from '@/components/projects/ChapterStamp';
import { ArchitectureDiagram } from '@/components/projects/ArchitectureDiagram';
import { DecisionCard } from '@/components/projects/DecisionCard';
import { ScreensGallery } from '@/components/projects/ScreensGallery';
import { NextProjectFooter } from '@/components/projects/NextProjectFooter';
import { Develop } from '@/components/motion/Develop';

export function generateStaticParams() {
  return ALL_PROJECTS.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(slug);

  const fullChapters: ChapterItem[] = [
    { id: 'summary-10s', label: '10-SEC SUMMARY' },
    { id: 'context', label: 'CONTEXT & LIMITS' },
    { id: 'develop', label: 'DEVELOP (ARCH)' },
    { id: 'stop', label: 'STOP (BREAK & TEST)' },
    { id: 'fix', label: 'FIX (SHIP & SCALE)' },
    { id: 'decisions', label: 'DECISION LOG' },
    { id: 'screens', label: 'SCREENS & PROOF' },
    { id: 'retrospective', label: 'WHAT I WOULD CHANGE' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-28">
      {/* Return Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-dim)] hover:text-[var(--safelight)] transition-colors min-h-[44px]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO CONTACT-SHEET ARCHIVE</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4 flex flex-col xl:flex-row gap-12">
        {/* Sticky Left Chapter Rail (Full case-study only on >= 1280px) */}
        {project.isFullCaseStudy && <ChapterRail chapters={fullChapters} />}

        {/* Main Case-Study Content Area */}
        <main className="flex-1 max-w-4xl min-w-0">
          {/* Chapter 1: Hero */}
          <header className="pb-12 border-b border-[var(--line)]">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--text-dim)] mb-4">
              <span className="text-[var(--safelight)] font-bold">
                ▷ FRAME {project.frameNumber}
              </span>
              <span>·</span>
              <span className="uppercase">{project.category}</span>
              <span>·</span>
              <span>{project.year}</span>
              <span>·</span>
              <span className="text-[var(--text)] font-semibold">{project.role}</span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-[-0.03em] text-[var(--text)]">
              {project.title}
            </h1>

            <p className="font-text text-lg sm:text-xl text-[var(--text-dim)] mt-4 leading-relaxed">
              {project.oneLiner}
            </p>

            {/* Links & Meta Strip */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--line)]">
              <div className="flex flex-wrap items-center gap-2">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-[var(--radius-ui)] text-xs font-mono bg-[var(--surface-2)] border border-[var(--line)] text-[var(--text-dim)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {project.links.repo && (
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface-2)] font-mono text-xs uppercase hover:text-[var(--safelight)] hover:border-[var(--safelight)] transition-colors min-h-[44px]"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>SOURCE REPO</span>
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-ui)] bg-[var(--safelight)] text-[var(--on-safelight,#0A0908)] font-mono text-xs uppercase font-bold hover:opacity-90 transition-opacity min-h-[44px]"
                  >
                    <span>LIVE APP</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Hero Image Container with Shared-Element Transition support */}
            <div className="mt-8 relative aspect-[16/9] w-full rounded-[var(--radius-frame)] overflow-hidden border border-[var(--line)] bg-[var(--surface-2)] shadow-xl">
              <Develop className="w-full h-full">
                <Image
                  src={project.imageSrc}
                  alt={`${project.title} flagship project exposure`}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 900px"
                  className="object-cover"
                  style={{ viewTransitionName: `frame-${project.slug}` }}
                />
              </Develop>
            </div>
          </header>

          {/* Chapter 2: The 10-Second Version (Problem · Approach · Result) */}
          <section id="summary-10s" className="py-12 border-b border-[var(--line)]">
            <ChapterStamp
              label="▷ 01 · EXECUTIVE SUMMARY"
              sublabel="The 10-Second Architecture Breakdown"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
              {/* Problem */}
              <div className="p-6 rounded-[var(--radius-ui)] bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs uppercase text-amber-400 font-bold tracking-wider block mb-2">
                    01. PROBLEM
                  </span>
                  <p className="font-text text-sm text-[var(--text-dim)] leading-relaxed">
                    {project.tenSecond.problem}
                  </p>
                </div>
              </div>

              {/* Approach */}
              <div className="p-6 rounded-[var(--radius-ui)] bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs uppercase text-[var(--safelight)] font-bold tracking-wider block mb-2">
                    02. APPROACH
                  </span>
                  <p className="font-text text-sm text-[var(--text-dim)] leading-relaxed">
                    {project.tenSecond.approach}
                  </p>
                </div>
              </div>

              {/* Result & Verified Metric */}
              <div className="p-6 rounded-[var(--radius-ui)] bg-[var(--surface-2)] border border-[var(--safelight)]/40 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs uppercase text-emerald-400 font-bold tracking-wider block mb-2">
                    03. RESULT
                  </span>
                  <p className="font-text text-sm text-[var(--text)] leading-relaxed mb-4">
                    {project.tenSecond.result}
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--line)]">
                  <span className="font-mono text-[10px] uppercase text-[var(--text-dim)] block">
                    KEY OUTCOME METRIC:
                  </span>
                  <div className="font-display font-black text-2xl text-[var(--safelight)]">
                    {project.tenSecond.keyMetric.value}
                  </div>
                  <span className="font-mono text-xs text-[var(--text)]">
                    {project.tenSecond.keyMetric.label}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Chapter 3: Context & Constraints (<= 120 words) */}
          <section id="context" className="py-12 border-b border-[var(--line)]">
            <ChapterStamp
              label="▷ 02 · ENVIRONMENT"
              sublabel="Context & Constraints"
            />
            <p className="font-text text-base text-[var(--text)] leading-relaxed max-w-2xl">
              {project.context.summary}
            </p>

            <div className="mt-6 p-5 rounded-[var(--radius-ui)] bg-[var(--surface)] border border-[var(--line)]">
              <span className="font-mono text-xs uppercase text-[var(--text-dim)] tracking-wider block mb-3">
                SYSTEM CONSTRAINTS &amp; INVARIANTS:
              </span>
              <ul className="space-y-2.5">
                {project.context.constraints.map((c, i) => (
                  <li
                    key={i}
                    className="font-text text-sm text-[var(--text-dim)] flex items-start gap-3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--safelight)] mt-2 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Full Case Study Specific Chapters (Develop -> Stop -> Fix -> Decisions -> Screens) */}
          {project.isFullCaseStudy && (
            <>
              {/* Chapter 4: DEVELOP */}
              <section id="develop" className="py-12 border-b border-[var(--line)]">
                <ChapterStamp
                  label="▷ 03A · DEVELOP"
                  sublabel="System Architecture & Pipeline"
                />
                <p className="font-text text-base text-[var(--text)] leading-relaxed mb-6">
                  {project.develop.description}
                </p>

                {/* Interactive SVG Architecture Diagram */}
                {project.develop.nodes.length > 0 && (
                  <ArchitectureDiagram
                    nodes={project.develop.nodes}
                    edges={project.develop.edges}
                    title={`${project.title} Architectural Execution Graph`}
                  />
                )}
              </section>

              {/* Chapter 5: STOP (Break & Test) */}
              <section id="stop" className="py-12 border-b border-[var(--line)]">
                <ChapterStamp
                  label="▷ 04A · STOP"
                  sublabel="Failure Modes, Edge Cases & Testing"
                />
                <p className="font-text text-base text-[var(--text)] leading-relaxed mb-4">
                  {project.stop.failureTesting}
                </p>

                <div className="p-6 rounded-[var(--radius-ui)] bg-amber-500/10 border border-amber-500/30 my-6">
                  <span className="font-mono text-xs uppercase text-amber-400 font-bold tracking-wider block mb-2">
                    CRITICAL BREAKING POINT DISCOVERED:
                  </span>
                  <p className="font-text text-sm sm:text-base text-[var(--text)] leading-relaxed">
                    {project.stop.breakingPoint}
                  </p>
                </div>

                <div className="space-y-2 mt-4">
                  <span className="font-mono text-xs uppercase text-[var(--text-dim)] tracking-wider block">
                    EDGE CASES UNCOVERED IN STRESS HARNESS:
                  </span>
                  <ul className="space-y-2">
                    {project.stop.edgeCasesFound.map((ec, idx) => (
                      <li
                        key={idx}
                        className="font-text text-sm text-[var(--text-dim)] flex items-center gap-2"
                      >
                        <span className="font-mono text-xs text-[var(--safelight)] font-bold">
                          [#{idx + 1}]
                        </span>
                        <span>{ec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Chapter 6: FIX (Ship & Scale) */}
              <section id="fix" className="py-12 border-b border-[var(--line)]">
                <ChapterStamp
                  label="▷ 05A · FIX"
                  sublabel="Production Hardening & Verification"
                />
                <p className="font-text text-base text-[var(--text)] leading-relaxed mb-6">
                  {project.fix.shippedSolutions}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-8">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-[var(--radius-ui)] bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between"
                    >
                      <div className="font-display font-black text-3xl text-[var(--safelight)] mb-1">
                        {m.value}
                      </div>
                      <div>
                        <span className="font-mono text-xs font-bold text-[var(--text)] block">
                          {m.label}
                        </span>
                        <span className="font-mono text-[10px] text-[var(--text-dim)] block mt-0.5">
                          {m.note}
                        </span>
                        <span className="font-mono text-[9px] text-[var(--text-dim)] opacity-60 block mt-2 border-t border-[var(--line)] pt-1">
                          Source: {m.source}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Chapter 7: DECISION LOG */}
              <section id="decisions" className="py-12 border-b border-[var(--line)]">
                <ChapterStamp
                  label="▷ 06A · SENIOR DECISION LOG"
                  sublabel="Architectural Choices & Trade-offs"
                />
                <p className="font-text text-sm text-[var(--text-dim)] mb-6">
                  Engineering seniority is defined by intentional trade-offs. The decision log captures what was considered, why alternatives were rejected, and the accepted costs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.decisions.map((dec, idx) => (
                    <DecisionCard key={idx} decision={dec} index={idx} />
                  ))}
                </div>
              </section>

              {/* Chapter 8: SCREENS & LIGHTBOX */}
              <section id="screens" className="py-12 border-b border-[var(--line)]">
                <ChapterStamp
                  label="▷ 07A · VISUAL PROOF"
                  sublabel="Screen Exposures & Artifacts"
                />
                <ScreensGallery screens={project.gallery} />
              </section>
            </>
          )}

          {/* Chapter 9: WHAT I'D CHANGE NEXT */}
          <section id="retrospective" className="py-12 border-b border-[var(--line)]">
            <ChapterStamp
              label="▷ 08A · RETROSPECTIVE"
              sublabel="What I Would Change Next"
            />
            <ul className="space-y-3 mt-4">
              {project.whatIdChangeNext.map((point, idx) => (
                <li
                  key={idx}
                  className="font-text text-sm sm:text-base text-[var(--text-dim)] flex items-start gap-3"
                >
                  <span className="font-mono text-xs text-[var(--safelight)] font-bold mt-1">
                    0{idx + 1}.
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Content Integrity TODO Flag (Brief §9 & Rule 1) */}
            {project.contentTodos && project.contentTodos.length > 0 && (
              <div className="mt-8 p-4 rounded-[var(--radius-ui)] bg-[var(--surface-2)] border border-[var(--line)] font-mono text-xs text-[var(--text-dim)]">
                <span className="text-[var(--safelight)] font-bold block mb-1">
                  CONTENT INTEGRITY AUDIT:
                </span>
                {project.contentTodos.map((todo, idx) => (
                  <p key={idx} className="opacity-80">
                    {todo}
                  </p>
                ))}
              </div>
            )}
          </section>

          {/* Next Project Footer */}
          <NextProjectFooter nextProject={nextProject} />
        </main>
      </div>
    </div>
  );
}
