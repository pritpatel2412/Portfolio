import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ARTICLES,
  getArticleBySlug,
  getNextArticle,
  getPreviousArticle,
} from '@/content/articles';
import { ReadingProgress } from '@/components/writing/ReadingProgress';
import { TableOfContents } from '@/components/writing/TableOfContents';
import { CodeBlock } from '@/components/writing/CodeBlock';
import { Sidenote } from '@/components/writing/Sidenote';
import { HeadingAnchor } from '@/components/writing/HeadingAnchor';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  Rss,
  Share2,
  AlertTriangle,
  Lightbulb,
  Info,
  CheckCircle2,
} from 'lucide-react';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return ARTICLES.map((a) => ({
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
    openGraph: {
      title: `${article.title} — Prit Patel`,
      description: article.summary,
      url: `https://pritpatel.dev/writing/${article.slug}`,
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.updated,
      authors: ['Prit Patel'],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.summary,
    },
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

  const previousArticle = getPreviousArticle(article.slug);
  const nextArticle = getNextArticle(article.slug);

  // Schema.org BlogPosting JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    dateModified: article.updated,
    author: {
      '@type': 'Person',
      name: 'Prit Patel',
      url: 'https://pritpatel.dev',
    },
    publisher: {
      '@type': 'Person',
      name: 'Prit Patel',
      url: 'https://pritpatel.dev',
    },
    keywords: article.tags.join(', '),
    articleSection: article.category,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://pritpatel.dev/writing/${article.slug}`,
    },
  };

  return (
    <article className="min-h-screen bg-[var(--bg)] text-[var(--text)] print:bg-white print:text-black">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Reading Progress Top Hairline */}
      <div className="print:hidden">
        <ReadingProgress />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* Navigation & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-6 mb-8 sm:mb-12 font-mono text-xs text-[var(--text-dim)] print:hidden">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 hover:text-[var(--safelight)] transition-colors min-h-[36px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO WRITING ARCHIVE</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">TOPIC: {article.category.toUpperCase()}</span>
            <span>·</span>
            <Link
              href="/rss.xml"
              className="hover:text-[var(--safelight)] transition-colors inline-flex items-center gap-1"
            >
              <Rss className="w-3 h-3 text-[var(--safelight)]" />
              <span>RSS</span>
            </Link>
          </div>
        </div>

        {/* Editorial Header */}
        <header className="max-w-4xl space-y-6 mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--text-dim)]">
            <span className="px-2.5 py-0.5 rounded bg-[var(--safelight)]/10 text-[var(--safelight)] font-bold border border-[var(--safelight)]/20 text-[11px]">
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 opacity-60" />
              <span>{article.date}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 opacity-60" />
              <span>{article.readTime}</span>
            </span>
            <span>·</span>
            <span className="text-[11px] opacity-75">Updated {article.updated}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text)] tracking-tight leading-[1.08] print:text-3xl">
            {article.title}
          </h1>

          {/* Standfirst / Summary Block */}
          <div className="p-5 sm:p-7 rounded-[var(--radius-ui)] bg-[var(--surface-2)] border-l-4 border-l-[var(--safelight)] border border-[var(--line)] font-serif italic text-base sm:text-xl text-[var(--text)] leading-relaxed">
            &ldquo;{article.summary}&rdquo;
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2 print:hidden">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded border border-[var(--line)] bg-[var(--surface-3)] font-mono text-[11px] text-[var(--text-dim)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Layout: Sticky Rail TOC + Editorial Reading Measure */}
        <div className="flex flex-col xl:flex-row gap-12 lg:gap-16 items-start">
          {/* Table of Contents (Sticky on >= 1280px, collapsible on mobile) */}
          <div className="w-full xl:w-auto xl:sticky xl:top-28 shrink-0 print:hidden">
            <TableOfContents headings={article.headings} />
          </div>

          {/* Reading Column (Strict 66–70ch measure with fluid typography) */}
          <div className="flex-1 w-full max-w-[68ch] min-w-0 2xl:pr-72 relative font-sans text-[18px] sm:text-[19px] lg:text-[20px] leading-[1.65] text-[var(--text)] print:text-[14pt]">
            {article.sections.map((section, idx) => (
              <section key={section.id} className="relative mb-12">
                {/* Heading with Copy-Anchor */}
                <HeadingAnchor id={section.id} title={section.title} />

                {/* Sidenote (Margin on >= 1440px / 2xl, inline on mobile) */}
                {section.sidenote && (
                  <Sidenote number={idx + 1}>{section.sidenote}</Sidenote>
                )}

                {/* Paragraphs */}
                <div className="space-y-5 text-[var(--text)]">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="leading-[1.7]">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Callout Box (if present) */}
                {section.callout && (
                  <div
                    className={`my-6 p-4 sm:p-5 rounded-[var(--radius-ui)] border font-mono text-xs ${
                      section.callout.type === 'warning'
                        ? 'border-amber-500/30 bg-amber-950/20 text-amber-200'
                        : section.callout.type === 'tip'
                        ? 'border-[var(--safelight)]/30 bg-[var(--safelight)]/10 text-[var(--text)]'
                        : 'border-[var(--line)] bg-[var(--surface-2)] text-[var(--text)]'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold mb-2 uppercase text-[11px]">
                      {section.callout.type === 'warning' && (
                        <>
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                          <span className="text-amber-400">{section.callout.title}</span>
                        </>
                      )}
                      {section.callout.type === 'tip' && (
                        <>
                          <Lightbulb className="w-4 h-4 text-[var(--safelight)]" />
                          <span className="text-[var(--safelight)]">{section.callout.title}</span>
                        </>
                      )}
                      {section.callout.type === 'note' && (
                        <>
                          <Info className="w-4 h-4 text-[var(--text-dim)]" />
                          <span className="text-[var(--text-dim)]">{section.callout.title}</span>
                        </>
                      )}
                    </div>
                    <p className="leading-relaxed font-sans text-sm text-[var(--text-dim)]">
                      {section.callout.text}
                    </p>
                  </div>
                )}

                {/* Code Block (if present) */}
                {section.codeSnippet && (
                  <div className="my-6">
                    <CodeBlock
                      filename={section.codeSnippet.filename}
                      language={section.codeSnippet.language}
                      code={section.codeSnippet.code}
                    />
                  </div>
                )}
              </section>
            ))}

            {/* Editorial Footer / Sign-off */}
            <div className="mt-16 pt-8 border-t border-[var(--line)] flex flex-col gap-6 print:hidden">
              <div className="flex items-center justify-between font-mono text-xs text-[var(--text-dim)]">
                <span>AUTHOR: PRIT PATEL</span>
                <span>DISPATCH END</span>
              </div>

              {/* Previous / Next Article Navigation Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {previousArticle && previousArticle.slug !== article.slug && (
                  <Link
                    href={`/writing/${previousArticle.slug}`}
                    className="group p-5 rounded-[var(--radius-ui)] border border-[var(--line)] hover:border-[var(--safelight)] bg-[var(--surface-2)]/60 transition-colors flex flex-col justify-between gap-3"
                  >
                    <span className="flex items-center gap-1 font-mono text-[10px] text-[var(--text-dim)] uppercase tracking-wider">
                      <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                      PREVIOUS ESSAY
                    </span>
                    <span className="font-display text-sm sm:text-base font-bold text-[var(--text)] group-hover:text-[var(--safelight)] transition-colors line-clamp-2">
                      {previousArticle.title}
                    </span>
                  </Link>
                )}

                {nextArticle && nextArticle.slug !== article.slug && (
                  <Link
                    href={`/writing/${nextArticle.slug}`}
                    className="group p-5 rounded-[var(--radius-ui)] border border-[var(--line)] hover:border-[var(--safelight)] bg-[var(--surface-2)]/60 transition-colors flex flex-col justify-between gap-3 text-right"
                  >
                    <span className="flex items-center justify-end gap-1 font-mono text-[10px] text-[var(--text-dim)] uppercase tracking-wider">
                      NEXT ESSAY
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                    <span className="font-display text-sm sm:text-base font-bold text-[var(--text)] group-hover:text-[var(--safelight)] transition-colors line-clamp-2">
                      {nextArticle.title}
                    </span>
                  </Link>
                )}
              </div>

              {/* Soft Closing CTA */}
              <div className="mt-8 p-6 sm:p-8 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface-2)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-display text-base font-bold text-[var(--text)]">
                    Exploring compiler engineering or autonomous AI architectures?
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-[var(--text-dim)]">
                    Let&apos;s talk technical architectures, distributed systems, or consulting.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href="/contact"
                    className="px-4 py-2 rounded-[var(--radius-ui)] bg-[var(--safelight)] text-[var(--bg)] font-mono text-xs font-bold hover:opacity-90 transition-opacity min-h-[40px] flex items-center gap-1"
                  >
                    <span>START DIALOGUE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
