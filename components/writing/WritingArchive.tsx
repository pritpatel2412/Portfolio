'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArticleDetail } from '@/content/articles';
import { ArrowUpRight, Rss, BookOpen, Clock, Calendar, Tag, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WritingArchiveProps {
  articles: ArticleDetail[];
}

const CATEGORIES = [
  'All',
  'Compilers & Security',
  'AI Systems',
  'Language Engineering',
] as const;

type CategoryFilter = (typeof CATEGORIES)[number];

export function WritingArchive({ articles }: WritingArchiveProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');

  const filteredArticles = articles.filter((art) => {
    if (activeCategory === 'All') return true;
    return art.category === activeCategory;
  });

  const featuredArticle = filteredArticles[0];
  const listArticles = filteredArticles.slice(1);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col gap-12 sm:gap-16">
      {/* Header Bar */}
      <header className="flex flex-col gap-6 border-b border-[var(--line)] pb-8 sm:pb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[var(--text-dim)]">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--safelight)]" />
            <span className="tracking-widest uppercase">▷ 04 · FIELD DISPATCHES &amp; ESSAYS</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">[{articles.length} ESSAYS PUBLISHED]</span>
            <Link
              href="/rss.xml"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface-2)] text-[var(--text)] hover:border-[var(--safelight)] hover:text-[var(--safelight)] transition-colors text-xs font-mono min-h-[32px]"
              title="Subscribe via RSS syndication feed"
            >
              <Rss className="w-3.5 h-3.5 text-[var(--safelight)]" />
              <span>RSS FEED</span>
            </Link>
          </div>
        </div>

        <div className="max-w-3xl space-y-4">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[var(--text)] tracking-tight leading-[1.05]">
            Technical Writing &amp;{' '}
            <span className="font-serif italic font-normal text-[var(--safelight)]">Dispatches</span>
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-dim)] leading-relaxed font-sans">
            Deep technical reflections on compiler architectures, AST tokenization, autonomous agent swarms, and high-concurrency systems engineering tested in production.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-[var(--text-dim)] mr-2">
            <Filter className="w-3.5 h-3.5 text-[var(--safelight)]" />
            <span>TOPIC:</span>
          </div>
          {CATEGORIES.map((cat) => {
            const count =
              cat === 'All'
                ? articles.length
                : articles.filter((a) => a.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-3.5 py-1.5 rounded-[var(--radius-ui)] border font-mono text-xs transition-colors cursor-pointer min-h-[36px] flex items-center gap-2',
                  isActive
                    ? 'border-[var(--safelight)] bg-[var(--safelight)]/10 text-[var(--safelight)] font-bold'
                    : 'border-[var(--line)] bg-[var(--surface-2)]/60 text-[var(--text-dim)] hover:text-[var(--text)] hover:border-[var(--line-strong)]'
                )}
                aria-pressed={isActive}
              >
                <span>{cat}</span>
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.2 rounded',
                    isActive
                      ? 'bg-[var(--safelight)] text-[var(--bg)] font-bold'
                      : 'bg-[var(--surface-3)] text-[var(--text-dim)]'
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Articles Content */}
      {filteredArticles.length === 0 ? (
        <div className="p-12 text-center border border-[var(--line)] rounded-[var(--radius-ui)] bg-[var(--surface-2)] font-mono text-xs text-[var(--text-dim)]">
          NO ESSAYS FOUND FOR SELECTED TOPIC.
        </div>
      ) : (
        <div className="flex flex-col gap-12 sm:gap-16">
          {/* Cover Feature (Dominant Featured Row) */}
          {featuredArticle && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-[var(--text-dim)] uppercase">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-none bg-[var(--safelight)] rotate-45" />
                  COVER FEATURE / LEAD ESSAY
                </span>
                <span>ENTRY 01</span>
              </div>

              <Link
                href={`/writing/${featuredArticle.slug}`}
                className="group relative p-6 sm:p-10 rounded-[var(--radius-ui)] border border-[var(--line)] hover:border-[var(--safelight)] bg-[var(--surface-2)]/80 hover:bg-[var(--surface-2)] transition-all flex flex-col gap-6 shadow-sm focus-visible:outline-2 focus-visible:outline-[var(--safelight)]"
              >
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[var(--text-dim)]">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-[var(--safelight)]/10 text-[var(--safelight)] font-bold border border-[var(--safelight)]/20 text-[11px]">
                      {featuredArticle.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 opacity-60" />
                      <span>{featuredArticle.date}</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 opacity-60" />
                      <span>{featuredArticle.readTime}</span>
                    </span>
                  </div>

                  <div className="hidden sm:flex items-center gap-1 text-[var(--safelight)] font-mono text-xs font-semibold group-hover:translate-x-0.5 transition-transform">
                    <span>READ ESSAY</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Title */}
                <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text)] tracking-tight leading-[1.12] group-hover:text-[var(--safelight)] transition-colors">
                  {featuredArticle.title}
                </h2>

                {/* Summary */}
                <p className="text-sm sm:text-base lg:text-lg text-[var(--text-dim)] leading-relaxed max-w-4xl font-sans">
                  {featuredArticle.summary}
                </p>

                {/* Tags & Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[var(--line)]">
                  <div className="flex flex-wrap items-center gap-2">
                    {featuredArticle.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded border border-[var(--line)] bg-[var(--surface-3)] font-mono text-[11px] text-[var(--text-dim)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <span className="sm:hidden inline-flex items-center gap-1 text-xs font-mono text-[var(--safelight)] font-bold">
                    <span>READ ESSAY</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </div>
          )}

          {/* Typographic Archive List */}
          {listArticles.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-[var(--text-dim)] uppercase border-b border-[var(--line)] pb-2">
                <span>ARCHIVE DISPATCHES [{listArticles.length}]</span>
                <span>CHRONOLOGICAL</span>
              </div>

              <div className="flex flex-col divide-y divide-[var(--line)] border-b border-[var(--line)]">
                {listArticles.map((article, idx) => {
                  const displayIndex = idx + 2;
                  return (
                    <Link
                      key={article.slug}
                      href={`/writing/${article.slug}`}
                      className="group py-8 sm:py-10 flex flex-col gap-4 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--safelight)]"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[var(--text-dim)]">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-bold text-[var(--safelight)] font-mono">
                            0{displayIndex}
                          </span>
                          <span>·</span>
                          <span>{article.category}</span>
                          <span>·</span>
                          <span>{article.date}</span>
                          <span>·</span>
                          <span>{article.readTime}</span>
                        </div>

                        <div className="flex items-center gap-1 text-xs font-mono text-[var(--text-dim)] group-hover:text-[var(--safelight)] transition-colors">
                          <span className="hidden sm:inline">READ ESSAY</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                      </div>

                      <h3 className="font-display text-xl sm:text-3xl font-bold text-[var(--text)] group-hover:text-[var(--safelight)] transition-colors leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-sm sm:text-base text-[var(--text-dim)] leading-relaxed max-w-3xl font-sans">
                        {article.summary}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {article.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded border border-[var(--line)] bg-[var(--surface-2)] font-mono text-[10px] text-[var(--text-dim)]"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* RSS & Syndication Footer Note */}
      <footer className="mt-8 p-6 sm:p-8 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface-2)]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[var(--safelight)] font-bold">
            <Rss className="w-4 h-4" />
            <span>SYNDICATION &amp; OPEN WEB</span>
          </div>
          <p className="text-[var(--text-dim)] max-w-xl">
            All essays are syndicated via standard RSS 2.0. No paywalls, zero telemetry, clean semantic markup.
          </p>
        </div>

        <Link
          href="/rss.xml"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-ui)] border border-[var(--safelight)] text-[var(--safelight)] hover:bg-[var(--safelight)] hover:text-[var(--bg)] transition-colors font-bold shrink-0 min-h-[44px]"
        >
          <span>GET RSS FEED</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </footer>
    </div>
  );
}
