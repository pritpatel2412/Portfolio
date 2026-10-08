'use client';

import React, { useState } from 'react';
import { projects } from '@/content/projects';
import { CropFrame } from '@/components/system/CropFrame';
import { useLens } from '@/components/system/LensProvider';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Filter, Table, LayoutGrid } from 'lucide-react';

export default function ProjectsPage() {
  const { isSourceMode } = useLens();
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const allTags = ['all', ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

  const filteredProjects = projects.filter((p) => {
    if (selectedTag === 'all') return true;
    return p.tags.includes(selectedTag);
  });

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-12 md:py-20 flex flex-col gap-12">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-8">
        <div className="flex items-center justify-between font-mono text-xs text-[var(--ink-muted)]">
          <span>02 / PROJECTS DIRECTORY</span>
          <span>{projects.length} SYSTEMS DOCUMENTED (2024 — 2026)</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-[var(--ink)] tracking-tight">
          Selected Software & <span className="font-serif italic font-normal text-[var(--signal)]">Systems</span>
        </h1>
        <p className="text-base text-[var(--ink-muted)] max-w-2xl leading-relaxed">
          Production applications, autonomous agents, and systems tooling engineered with tight performance budgets and defensive architectures.
        </p>

        {/* Filter Bar & View Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            <span className="text-[var(--ink-muted)] flex items-center gap-1 mr-2 text-[11px]">
              <Filter className="w-3 h-3" />
              Filter:
            </span>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 py-1 rounded-full border text-xs cursor-pointer transition-colors ${
                  selectedTag === tag
                    ? 'bg-[var(--signal)] text-[var(--on-signal)] border-[var(--signal)] font-medium'
                    : 'border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink-muted)]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 border border-[var(--line)] rounded-full p-1 bg-[var(--bg-raised)] font-mono text-xs">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-full cursor-pointer ${
                viewMode === 'grid' && !isSourceMode ? 'bg-[var(--ink)] text-[var(--bg)]' : 'text-[var(--ink-muted)]'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-full cursor-pointer ${
                viewMode === 'table' || isSourceMode ? 'bg-[var(--ink)] text-[var(--bg)]' : 'text-[var(--ink-muted)]'
              }`}
              title="Table Index View"
            >
              <Table className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View vs Table View */}
      {viewMode === 'grid' && !isSourceMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group flex flex-col gap-4 p-5 rounded-xl border border-[var(--line)] bg-[var(--bg-raised)] hover:border-[var(--ink-muted)] transition-all"
            >
              <CropFrame dimensions={p.flagship ? '16:10 Flagship' : '16:10'}>
                <div className="relative aspect-[16/10] w-full bg-black overflow-hidden">
                  <Image
                    src={p.cover.src}
                    alt={p.cover.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </CropFrame>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between font-mono text-xs text-[var(--ink-muted)]">
                  <span>{p.year} · {p.kind.toUpperCase()}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--signal)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                <h2 className="font-display text-2xl font-bold text-[var(--ink)] group-hover:text-[var(--signal)] transition-colors">
                  {p.title}
                </h2>

                <p className="text-sm text-[var(--ink-muted)] leading-relaxed line-clamp-2">
                  {p.oneLiner}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {p.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] px-2 py-0.5 rounded border border-[var(--line)] text-[var(--ink-muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* Dense Source / Index Table View */
        <div className="overflow-x-auto border border-[var(--line)] rounded-xl bg-[var(--bg-raised)] font-mono text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--line)] bg-[var(--bg)] text-[var(--ink-muted)] text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4 hidden sm:table-cell">Primary Metric</th>
                <th className="py-3 px-4 hidden md:table-cell">Stack</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {filteredProjects.map((p) => (
                <tr key={p.slug} className="hover:bg-[var(--line)]/50 transition-colors">
                  <td className="py-3 px-4 text-[var(--ink-muted)]">{p.year}</td>
                  <td className="py-3 px-4 font-bold text-[var(--ink)]">
                    <Link href={`/projects/${p.slug}`} className="hover:text-[var(--signal)] flex items-center gap-1.5">
                      {p.title}
                      {p.flagship && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded border border-[var(--signal)] text-[var(--signal)] uppercase">
                          Flagship
                        </span>
                      )}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-[var(--ink-muted)]">{p.role}</td>
                  <td className="py-3 px-4 text-[var(--phosphor)] hidden sm:table-cell">
                    {p.metrics[0]?.value ? `${p.metrics[0].value} (${p.metrics[0].label})` : '—'}
                  </td>
                  <td className="py-3 px-4 text-[var(--ink-muted)] hidden md:table-cell">
                    {p.stack.slice(0, 3).join(', ')}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="inline-flex items-center gap-1 text-[var(--signal)] hover:underline"
                    >
                      <span>Study</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
