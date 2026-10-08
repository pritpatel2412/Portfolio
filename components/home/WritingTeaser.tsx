'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/system/Button';
import { articles } from '@/content/articles';

export function WritingTeaser() {
  if (!articles || articles.length === 0) return null;

  const latestPosts = articles.slice(0, 2);

  return (
    <section
      aria-label="Recent Technical Writing"
      className="w-full border-b border-[var(--line)] bg-[var(--surface)] py-16 sm:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[var(--line)] pb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--safelight)] mb-3">
              <span>▷ FRAME 04</span>
              <span>·</span>
              <span>TECHNICAL WRITING</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[var(--text)] tracking-tight">
              Selected Notes
            </h2>
            <p className="font-text text-base sm:text-lg text-[var(--text-dim)] mt-3 max-w-xl">
              Architectural lessons from building compilers, vulnerability scanners, and agent memory systems.
            </p>
          </div>

          <Button href="/writing" variant="secondary" size="sm">
            <span>All Articles ({articles.length})</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>

        {/* Large Typographic Rows */}
        <div className="flex flex-col divide-y divide-[var(--line)] border border-[var(--line)] bg-[var(--bg)]">
          {latestPosts.map((post, idx) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="group p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
            >
              <div className="flex flex-col gap-3 max-w-3xl">
                <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-dim)] uppercase tracking-wider">
                  <span className="text-[var(--safelight)] font-bold">▷ 0{idx + 1}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="hidden sm:inline border border-[var(--line)] px-2 py-0.5 rounded-[var(--radius-ui)] text-[10px]">
                    {post.category}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text)] group-hover:text-[var(--safelight)] transition-colors tracking-tight">
                  {post.title}
                </h3>

                <p className="font-text text-sm sm:text-base text-[var(--text-dim)] leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-dim)] group-hover:text-[var(--safelight)] transition-colors shrink-0">
                <span className="uppercase tracking-wider">Read Note</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
