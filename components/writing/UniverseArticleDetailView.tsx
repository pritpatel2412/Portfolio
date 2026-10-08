'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Tag, ArrowUpRight, Share2, CheckCircle2 } from 'lucide-react';
import { useUniverse } from '@/lib/universe';
import type { ArticleDetail } from '@/content/articles';

interface UniverseArticleDetailViewProps {
  article: ArticleDetail;
}

export function UniverseArticleDetailView({ article }: UniverseArticleDetailViewProps) {
  const { universe } = useUniverse();

  // =========================================================================
  // 1. EDITORIAL ARTICLE (Magazine Monograph Essay)
  // =========================================================================
  if (universe === 'editorial') {
    return (
      <div className="min-h-screen bg-[#F7F2EB] text-[#1A1816] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-4xl mx-auto space-y-16">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B43A12] hover:text-[#1A1816] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO JOURNAL INDEX</span>
          </Link>

          <header className="border-b border-[#1A1816]/20 pb-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between font-mono text-xs uppercase tracking-widest text-[#6B645C] border-b border-[#1A1816]/10 pb-3">
              <span>ESSAY MONOGRAPH · {article.category}</span>
              <span>{article.date}</span>
              <span className="text-[#B43A12]">{article.readTime}</span>
            </div>

            <h1 className="font-serif font-black text-4xl sm:text-6xl text-[#1A1816] leading-tight">
              {article.title}
            </h1>

            <p className="font-serif italic text-xl sm:text-2xl text-[#6B645C] leading-relaxed">
              &ldquo;{article.summary}&rdquo;
            </p>
          </header>

          <div className="space-y-12 font-serif">
            {article.sections.map((sec, i) => (
              <section key={sec.id} className="space-y-6 border-b border-[#1A1816]/10 pb-10">
                <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#1A1816]">
                  {i === 0 ? 'I. ' : i === 1 ? 'II. ' : i === 2 ? 'III. ' : 'IV. '}
                  {sec.title}
                </h2>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-lg text-[#3A352F] leading-relaxed">
                    {p}
                  </p>
                ))}
                {sec.codeSnippet && (
                  <div className="p-5 rounded bg-[#1A1816] text-[#F7F2EB] font-mono text-xs overflow-x-auto shadow-md">
                    <div className="text-[10px] text-[#B43A12] uppercase mb-2 font-bold">{sec.codeSnippet.filename}</div>
                    <pre><code>{sec.codeSnippet.code}</code></pre>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. NEO MAXIMALIST ARTICLE (Graphic Poster Essay)
  // =========================================================================
  if (universe === 'maximalist') {
    return (
      <div className="min-h-screen bg-[#FFF952] text-black px-4 sm:px-8 md:px-12 py-16 font-sans selection:bg-[#FF0055] selection:text-white">
        <div className="max-w-4xl mx-auto space-y-12">
          <Link
            href="/writing"
            className="inline-block px-3 py-1.5 border-2 border-black bg-white font-black text-xs uppercase shadow-[3px_3px_0px_#000]"
          >
            ← BACK TO VAULT
          </Link>

          <header className="border-4 border-black p-8 bg-white shadow-[10px_10px_0px_#000] space-y-4">
            <span className="bg-[#FF0055] text-white font-black text-xs px-2.5 py-1 uppercase rotate-[-2deg] inline-block">
              ★ SYSTEM DEEP DIVE ★
            </span>
            <h1 className="font-black text-4xl sm:text-6xl uppercase tracking-tighter leading-none">
              {article.title}!
            </h1>
            <p className="font-bold text-lg text-slate-800">
              {article.summary}
            </p>
          </header>

          <div className="space-y-8">
            {article.sections.map((sec) => (
              <div key={sec.id} className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_#000] space-y-4">
                <h2 className="font-black text-2xl uppercase bg-[#00E5FF] px-2 py-0.5 inline-block border-2 border-black">
                  {sec.title}
                </h2>
                {sec.paragraphs.map((p, idx) => (
                  <p key={idx} className="font-bold text-sm text-slate-800 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. JAPANDI POP ARTICLE (Quiet Reading Monograph)
  // =========================================================================
  if (universe === 'japandi') {
    return (
      <div className="min-h-screen bg-[#F4EFEA] text-[#2C2926] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-3xl mx-auto space-y-14">
          <Link href="/writing" className="text-xs font-mono text-[#7D756C] hover:text-[#B35446]">
            ← 記事録に戻る · Return to Journal
          </Link>

          <header className="border-b border-[#2C2926]/10 pb-8 space-y-4">
            <div className="text-xs font-mono text-[#B35446]">
              {article.date} · {article.readTime}
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#2C2926] leading-tight">
              {article.title}
            </h1>
            <p className="font-serif italic text-base text-[#7D756C]">
              {article.summary}
            </p>
          </header>

          <div className="space-y-10 font-serif">
            {article.sections.map((sec) => (
              <section key={sec.id} className="space-y-4">
                <h2 className="text-xl text-[#2C2926] font-normal">{sec.title}</h2>
                {sec.paragraphs.map((p, i) => (
                  <p key={i} className="text-base text-[#4A453E] leading-relaxed">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. SWISS ARTICLE (12-Column Typographic System)
  // =========================================================================
  if (universe === 'swiss') {
    return (
      <div className="min-h-screen bg-[#F0F0EE] text-black px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-5xl mx-auto space-y-14">
          <Link href="/writing" className="font-mono text-xs uppercase font-bold hover:text-[#E62B1E]">
            ← ZURÜCK ZUR PUBLIKATIONSLISTE
          </Link>

          <header className="border-t-4 border-b-2 border-black py-8 space-y-4">
            <span className="font-mono text-xs uppercase font-bold text-[#E62B1E] block">
              DOKUMENT // {article.slug.toUpperCase()}
            </span>
            <h1 className="font-black text-4xl sm:text-6xl uppercase tracking-tighter leading-tight">
              {article.title}
            </h1>
            <p className="font-bold text-base text-slate-800">
              {article.summary}
            </p>
          </header>

          <div className="space-y-10 border-b-2 border-black pb-12">
            {article.sections.map((sec, i) => (
              <div key={sec.id} className="grid grid-cols-12 gap-6">
                <div className="col-span-12 sm:col-span-4 font-mono font-bold text-sm text-[#E62B1E] uppercase">
                  SECTION 0{i + 1}
                </div>
                <div className="col-span-12 sm:col-span-8 space-y-3">
                  <h2 className="font-black text-2xl uppercase">{sec.title}</h2>
                  {sec.paragraphs.map((p, idx) => (
                    <p key={idx} className="text-sm text-slate-800 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 5. BRUTALIST ARTICLE (Raw RFC Document)
  // =========================================================================
  if (universe === 'brutalist') {
    return (
      <div className="min-h-screen bg-black text-[#E0E0E0] px-4 sm:px-8 py-16 font-mono">
        <div className="max-w-4xl mx-auto space-y-10">
          <Link href="/writing" className="text-xs text-[#FFEB3B] hover:underline">
            [..] RETURN_TO_LIST
          </Link>

          <header className="border border-white p-6 bg-[#111] space-y-2">
            <div className="text-xs text-[#FFEB3B]">
              RFC_DOC: {article.slug.toUpperCase()}.TXT [VERIFIED]
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold uppercase text-white">
              # {article.title}
            </h1>
            <p className="text-xs text-zinc-400">&gt; {article.summary}</p>
          </header>

          <div className="space-y-6">
            {article.sections.map((sec) => (
              <div key={sec.id} className="border border-zinc-700 p-6 space-y-3 bg-[#0a0a0a]">
                <div className="text-xs text-[#FFEB3B] uppercase">== {sec.title} ==</div>
                {sec.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-xs text-zinc-300 font-sans leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 6. NOIR ARTICLE (Cinematic Journal Sequence)
  // =========================================================================
  if (universe === 'noir') {
    return (
      <div className="min-h-screen bg-[#080808] text-[#E5E5E5] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-4xl mx-auto space-y-16">
          <Link href="/writing" className="font-mono text-xs uppercase text-[#FF9500] hover:text-white">
            ← EXIT DISPATCH
          </Link>

          <header className="border-b border-zinc-800 pb-8 space-y-4">
            <div className="font-mono text-xs text-zinc-500">
              NOCTURNAL DISPATCH // {article.date}
            </div>
            <h1 className="font-serif italic text-4xl sm:text-6xl text-white">
              {article.title}
            </h1>
            <p className="text-lg text-zinc-400 font-light">
              {article.summary}
            </p>
          </header>

          <div className="space-y-12">
            {article.sections.map((sec) => (
              <section key={sec.id} className="p-8 rounded bg-zinc-950 border border-zinc-800 space-y-4">
                <h2 className="font-serif italic text-2xl text-white">{sec.title}</h2>
                {sec.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-sm text-zinc-300 font-light leading-relaxed">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 7. ARCHIVE ARTICLE (Research Specimen Notes)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#E2E8F0] px-4 sm:px-8 md:px-12 py-16 font-mono">
      <div className="max-w-4xl mx-auto space-y-14">
        <Link href="/writing" className="text-xs text-cyan-400 hover:text-white">
          ← RETURN TO LABORATORY LOGS
        </Link>

        <header className="border border-cyan-800/40 p-8 rounded bg-[#111827]/60 space-y-3">
          <div className="text-xs text-cyan-400">RESEARCH NOTE #{article.slug.toUpperCase()}</div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white">
            {article.title}
          </h1>
          <p className="font-sans text-sm text-slate-300">{article.summary}</p>
        </header>

        <div className="space-y-8">
          {article.sections.map((sec) => (
            <div key={sec.id} className="p-6 rounded border border-cyan-800/30 bg-[#111827]/40 space-y-3">
              <h2 className="text-lg font-bold text-white uppercase">{sec.title}</h2>
              {sec.paragraphs.map((p, idx) => (
                <p key={idx} className="font-sans text-sm text-slate-300 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
