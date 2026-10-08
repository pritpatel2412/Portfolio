'use client';

import React from 'react';
import Link from 'next/link';
import { articles } from '@/content/articles';
import { ArrowUpRight, BookOpen } from 'lucide-react';

export default function WritingIndexPage() {
  return (
    <div className="max-w-[1000px] mx-auto px-4 md:px-12 py-12 md:py-20 flex flex-col gap-12">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-8">
        <div className="flex items-center justify-between font-mono text-xs text-[var(--ink-muted)]">
          <span>05 / TECHNICAL WRITING &amp; ESSAYS</span>
          <span>{articles.length} ARTICLES PUBLISHED</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-[var(--ink)] tracking-tight">
          Field Notes &amp; <span className="font-serif italic font-normal text-[var(--accent)]">Essays</span>
        </h1>
        <p className="text-base text-[var(--ink-muted)] max-w-2xl leading-relaxed">
          In-depth reflections on autonomous agent swarms, AST compilation pipelines, and real-time systems engineering learned in production.
        </p>
      </div>

      {/* Articles List */}
      <div className="flex flex-col divide-y divide-[var(--line)]">
        {articles.map((art, idx) => (
          <Link
            key={art.slug}
            href={`/writing/${art.slug}`}
            className="py-8 group flex flex-col gap-3 transition-colors select-none"
          >
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--ink-muted)]">
              <span className="font-bold text-[var(--accent)]">0{idx + 1}</span>
              <span>·</span>
              <span>{art.date}</span>
              <span>·</span>
              <span>{art.readTime}</span>
              <div className="flex gap-1.5 ml-auto">
                {art.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded border border-[var(--line)] text-[10px] bg-[var(--bg-surface)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
              {art.title}
            </h2>

            <p className="text-sm md:text-base text-[var(--ink-muted)] leading-relaxed max-w-3xl">
              {art.summary}
            </p>

            <div className="flex items-center gap-1 font-mono text-xs text-[var(--accent)] pt-2 font-semibold">
              <span>Read complete article</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
