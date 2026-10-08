import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, getArticleBySlug } from '@/content/articles';
import { ArrowLeft, ArrowUpRight, Clock, Calendar, Tag } from 'lucide-react';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return articles.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} — Prit Patel`,
    description: article.summary,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Find next article for editorial continuation
  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const nextArticle = articles[(currentIndex + 1) % articles.length];

  return (
    <article className="max-w-[840px] mx-auto px-4 md:px-8 py-12 md:py-20 flex flex-col gap-12">
      {/* Back Link */}
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-6 font-mono text-xs text-[var(--ink-muted)]">
        <Link
          href="/writing"
          className="inline-flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO WRITING ARCHIVE</span>
        </Link>
        <span>CATEGORY: {article.category.toUpperCase()}</span>
      </div>

      {/* Article Title & Metadata Header */}
      <header className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-[var(--ink-muted)]">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>{article.date}</span>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>{article.readTime}</span>
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-[var(--ink)] tracking-tight leading-[1.08]">
          {article.title}
        </h1>

        <div className="p-4 sm:p-6 rounded-lg bg-[var(--bg-surface)] border border-[var(--line)] font-serif italic text-base sm:text-lg text-[var(--ink)] leading-relaxed">
          &ldquo;{article.summary}&rdquo;
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {article.tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-[var(--line)] font-mono text-[11px] text-[var(--ink-muted)]"
            >
              <Tag className="w-3 h-3 text-[var(--accent)]" />
              <span>{t}</span>
            </span>
          ))}
        </div>
      </header>

      {/* Main Editorial Content */}
      <div className="flex flex-col gap-6 text-base sm:text-lg leading-relaxed text-[var(--ink)] font-sans border-t border-[var(--line)] pt-8">
        {article.content.map((paragraph, i) => (
          <p key={i} className="leading-[1.75]">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Next Article Recommendation Spread */}
      {nextArticle && nextArticle.slug !== article.slug && (
        <div className="border-t border-[var(--line)] pt-12 mt-8 flex flex-col gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-muted)]">
            READ NEXT ARTICLE
          </span>

          <Link
            href={`/writing/${nextArticle.slug}`}
            className="group p-6 rounded-xl border border-[var(--line)] bg-[var(--bg-surface)] hover:border-[var(--accent)] transition-all flex flex-col justify-between gap-4"
          >
            <div className="space-y-2">
              <span className="font-mono text-xs text-[var(--accent)] font-semibold">
                {nextArticle.category} · {nextArticle.readTime}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                {nextArticle.title}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--ink-muted)] line-clamp-2">
                {nextArticle.summary}
              </p>
            </div>

            <div className="flex items-center gap-1 font-mono text-xs text-[var(--accent)] font-semibold">
              <span>Read next essay</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </Link>
        </div>
      )}
    </article>
  );
}
