import React from 'react';
import { notFound } from 'next/navigation';
import { projects, getProjectBySlug } from '@/content/projects';
import { CropFrame } from '@/components/system/CropFrame';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronRight, Terminal } from 'lucide-react';

export function generateStaticParams() {
  return projects.map((p) => ({
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

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <article className="max-w-[1200px] mx-auto px-4 md:px-12 py-12 md:py-20 flex flex-col gap-16">
      {/* Back Button */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 font-mono text-xs text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors w-fit"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Projects Directory</span>
      </Link>

      {/* Case Hero */}
      <header className="flex flex-col gap-6 border-b border-[var(--line)] pb-12">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--ink-muted)]">
          <span className="uppercase px-2.5 py-0.5 rounded-full border border-[var(--signal)] text-[var(--signal)]">
            {project.kind}
          </span>
          <span>·</span>
          <span>{project.year}</span>
          <span>·</span>
          <span>Role: {project.role}</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-[var(--ink)] tracking-tight">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl text-[var(--ink-muted)] max-w-3xl leading-relaxed">
          {project.oneLiner}
        </p>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--signal)] text-[var(--on-signal)] font-mono text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <span>{link.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>

        {/* Hero Cover */}
        <div className="pt-6">
          <CropFrame dimensions="1440×900">
            <div className="relative aspect-[16/10] w-full bg-black">
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </CropFrame>
        </div>
      </header>

      {/* Spec Strip: Metrics & Stack */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-[var(--line)] pb-12">
        <div className="md:col-span-4 flex flex-col gap-2">
          <span className="font-mono text-xs text-[var(--ink-muted)] uppercase tracking-wider">
            Verified Outcomes
          </span>
          <div className="space-y-4 pt-2">
            {project.metrics.map((m, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-display text-3xl font-bold text-[var(--ink)] font-mono">
                  {m.value}
                </span>
                <span className="font-mono text-xs text-[var(--ink)] font-medium">
                  {m.label}
                </span>
                {m.note && (
                  <span className="font-mono text-[11px] text-[var(--ink-muted)]">
                    {m.note}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-8 flex flex-col gap-6">
          <span className="font-mono text-xs text-[var(--ink-muted)] uppercase tracking-wider">
            Technical Architecture
          </span>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span
                key={t}
                className="font-mono text-xs px-3 py-1 rounded-full border border-[var(--line)] bg-[var(--bg-raised)] text-[var(--ink)]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="p-4 rounded-lg border border-[var(--line)] bg-[var(--bg-raised)] font-mono text-xs text-[var(--ink-muted)] space-y-1">
            <div className="text-[var(--phosphor)] font-bold">Topology Overview:</div>
            <div>{project.source.architecture || 'Distributed edge nodes with client proxy'}</div>
          </div>
        </div>
      </section>

      {/* Story Narrative: Problem, Constraints, Approach */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 flex flex-col gap-10">
          {/* Problem */}
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)]">
              The Problem
            </h2>
            <p className="text-base text-[var(--ink-muted)] leading-relaxed">
              {project.story.problem}
            </p>
          </div>

          {/* Constraints */}
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)]">
              Non-Negotiable Constraints
            </h2>
            <ul className="space-y-2">
              {project.story.constraints.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--ink-muted)] leading-relaxed">
                  <span className="text-[var(--signal)] font-mono font-bold mt-0.5">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Approach */}
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)]">
              Engineering Approach
            </h2>
            <p className="text-base text-[var(--ink-muted)] leading-relaxed">
              {project.story.approach}
            </p>
          </div>

          {/* Key Architectural Decisions */}
          {project.source.decisions.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-[var(--ink)]">
                Core Architectural Decisions
              </h2>
              <div className="space-y-4">
                {project.source.decisions.map((d, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-xl border border-[var(--line)] bg-[var(--bg-raised)] font-mono text-xs space-y-2"
                  >
                    <div className="font-bold text-sm text-[var(--ink)]">
                      {i + 1}. {d.title}
                    </div>
                    <div className="text-[var(--phosphor)]">
                      <span>CHOSE:</span> {d.chose}
                    </div>
                    <div className="text-[var(--warn)]">
                      <span>OVER:</span> {d.over}
                    </div>
                    <div className="text-[var(--ink-muted)] leading-relaxed">
                      <span>BECAUSE:</span> {d.because}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Result & Learned */}
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)]">
              Result & Outcomes
            </h2>
            <p className="text-base text-[var(--ink-muted)] leading-relaxed">
              {project.story.result}
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[var(--line)] bg-[var(--bg-raised)] space-y-2">
            <span className="font-mono text-xs uppercase text-[var(--signal)] font-bold">
              What I Learned
            </span>
            <p className="text-sm text-[var(--ink)] leading-relaxed italic">
              "{project.story.learned}"
            </p>
          </div>
        </div>

        {/* Sticky Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <div className="p-6 rounded-xl border border-[var(--line)] bg-[var(--bg-raised)] font-mono text-xs space-y-4 sticky top-24">
            <div className="text-xs font-bold text-[var(--ink)] uppercase tracking-wider">
              System Specifications
            </div>
            <div className="divide-y divide-[var(--line)] space-y-3">
              <div className="pt-2 flex justify-between">
                <span className="text-[var(--ink-muted)]">Slug</span>
                <span>{project.slug}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-[var(--ink-muted)]">Type</span>
                <span>{project.kind}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-[var(--ink-muted)]">Primary Language</span>
                <span>{project.stack[0]}</span>
              </div>
              {project.source.stats &&
                Object.entries(project.source.stats).map(([k, v]) => (
                  <div key={k} className="pt-2 flex justify-between">
                    <span className="text-[var(--ink-muted)]">{k}</span>
                    <span className="text-[var(--phosphor)]">{v}</span>
                  </div>
                ))}
            </div>
          </div>
        </aside>
      </section>

      {/* Under The Hood Accessible Disclosure (§6.1, §7.3) */}
      <section className="border-t border-[var(--line)] pt-8">
        <details className="group font-mono text-xs">
          <summary className="flex items-center gap-2 cursor-pointer text-[var(--ink-muted)] hover:text-[var(--ink)] py-2 select-none">
            <Terminal className="w-3.5 h-3.5 text-[var(--phosphor)]" />
            <span className="font-bold uppercase tracking-wider">
              Under the Hood / Raw Source Schema
            </span>
            <ChevronRight className="w-3.5 h-3.5 group-open:rotate-90 transition-transform ml-auto" />
          </summary>
          <div className="mt-4 p-4 rounded-xl border border-[var(--line)] bg-black/60 text-[var(--phosphor)] overflow-x-auto text-[11px] leading-relaxed">
            <pre>{JSON.stringify(project, null, 2)}</pre>
          </div>
        </details>
      </section>

      {/* Next Project Footer Handoff */}
      <footer className="border-t border-[var(--line)] pt-12 flex items-center justify-between">
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group flex flex-col gap-1 w-full"
        >
          <span className="font-mono text-xs text-[var(--ink-muted)]">NEXT CASE STUDY →</span>
          <span className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--ink)] group-hover:text-[var(--signal)] transition-colors">
            {nextProject.title}
          </span>
          <span className="text-sm text-[var(--ink-muted)]">{nextProject.oneLiner}</span>
        </Link>
      </footer>
    </article>
  );
}
