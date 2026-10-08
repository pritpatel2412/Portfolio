'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const FEATURED_NOTES = [
  {
    slug: 'ast-vs-regex-security-scanners',
    title: 'Why Regex Backtracking Fails in Vulnerability Scanners (and ASTs Don’t)',
    summary:
      'A deep dive into parsing payloads as structural AST tokens versus regular expressions when evaluating SQL injection and XSS exploit vectors under high concurrency.',
    readTime: '6 min read',
    date: 'February 2026',
  },
  {
    slug: 'low-latency-rag-agent-memory',
    title: 'Sub-200ms RAG: Semantic Query Caching for Autonomous Browser Agents',
    summary:
      'Designing locality-sensitive embedding hashes in Redis to reduce redundant vector queries by 64% without losing factual grounding in multi-turn agent sessions.',
    readTime: '8 min read',
    date: 'January 2026',
  },
];

export function WritingTeaser() {
  return (
    <section className="py-20 md:py-32 border-t border-[var(--line)]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 flex flex-col gap-10">
        <div className="flex items-center justify-between font-mono text-xs text-[var(--ink-muted)]">
          <span>06 / FIELD NOTES & WRITING</span>
          <Link href="/writing" className="text-[var(--signal)] hover:underline flex items-center gap-1">
            <span>View All Notes</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURED_NOTES.map((note) => (
            <Link
              key={note.slug}
              href="/writing"
              className="group p-8 rounded-xl border border-[var(--line)] bg-[var(--bg-raised)] hover:border-[var(--ink-muted)] transition-colors flex flex-col justify-between gap-6"
            >
              <div className="space-y-3">
                <div className="font-mono text-xs text-[var(--ink-muted)] flex items-center gap-2">
                  <span>{note.date}</span>
                  <span>·</span>
                  <span>{note.readTime}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[var(--ink)] group-hover:text-[var(--signal)] transition-colors">
                  {note.title}
                </h3>
                <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                  {note.summary}
                </p>
              </div>

              <div className="font-mono text-xs text-[var(--signal)] flex items-center gap-1">
                <span>Read note</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
