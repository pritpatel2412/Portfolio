'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, Clock, Tag, Terminal } from 'lucide-react';
import { useUniverse } from '@/lib/universe';
import { ARTICLES } from '@/content/articles';

export function UniverseWritingView() {
  const { universe } = useUniverse();

  // =========================================================================
  // 1. EDITORIAL WRITING (Magazine Publication Index)
  // =========================================================================
  if (universe === 'editorial') {
    return (
      <div className="min-h-screen bg-[#F7F2EB] text-[#1A1816] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-5xl mx-auto space-y-20">
          <header className="border-b border-[#1A1816]/20 pb-12">
            <div className="flex flex-wrap items-center justify-between font-mono text-xs uppercase tracking-widest text-[#6B645C] border-b border-[#1A1816]/10 pb-3 mb-6">
              <span>DISPATCHES · MONOGRAPH JOURNAL</span>
              <span>TECHNICAL ESSAYS &amp; INTERNALS</span>
              <span className="text-[#B43A12]">3 EDITIONS</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              <div className="md:col-span-8">
                <h1 className="font-serif font-black text-6xl sm:text-8xl tracking-tight leading-[0.9]">
                  Collected <br />
                  <span className="italic font-normal">Dispatches.</span>
                </h1>
              </div>
              <div className="md:col-span-4">
                <p className="font-serif italic text-sm text-[#6B645C] leading-relaxed">
                  Rigorous long-form analyses on compiler tokenization, semantic vector caching, and cultural programming paradigms.
                </p>
              </div>
            </div>
          </header>

          <div className="divide-y divide-[#1A1816]/15">
            {ARTICLES.map((art, idx) => (
              <article key={art.slug} className="py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline group">
                <div className="md:col-span-3 font-mono text-xs text-[#6B645C] space-y-1">
                  <div className="text-[#B43A12] font-bold">ARTICLE № 0{idx + 1}</div>
                  <div>{art.date}</div>
                  <div>{art.readTime}</div>
                </div>

                <div className="md:col-span-9 space-y-3">
                  <h2 className="font-serif font-black text-2xl sm:text-4xl text-[#1A1816] group-hover:text-[#B43A12] transition-colors">
                    <Link href={`/writing/${art.slug}`}>
                      {art.title}
                    </Link>
                  </h2>
                  <p className="font-serif text-base text-[#4A453E] leading-relaxed">
                    {art.summary}
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    {art.tags.map((t) => (
                      <span key={t} className="font-mono text-[11px] px-2 py-0.5 bg-[#1A1816]/5 text-[#6B645C] rounded">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. NEO MAXIMALIST WRITING (Poster Previews)
  // =========================================================================
  if (universe === 'maximalist') {
    return (
      <div className="min-h-screen bg-[#FFF952] text-black px-4 sm:px-8 md:px-12 py-16 font-sans selection:bg-[#FF0055] selection:text-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <header className="border-4 border-black p-8 bg-white shadow-[10px_10px_0px_#000]">
            <div className="inline-block bg-[#FF0055] text-white font-black text-xs px-3 py-1 uppercase rotate-[-2deg] mb-3">
              ★ SYSTEM INTERNALS &amp; DEEP DIVES ★
            </div>
            <h1 className="font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter">
              THE BLOG VAULT!
            </h1>
            <p className="font-bold text-lg text-slate-800 mt-2">
              No generic top-10 lists. Uncompromising engineering essays with code samples.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTICLES.map((art, idx) => {
              const bgColors = ['bg-[#00E5FF]', 'bg-[#FF8A00]', 'bg-[#00FF66]'];
              const bg = bgColors[idx % bgColors.length];
              return (
                <div key={art.slug} className={`border-4 border-black p-6 ${bg} shadow-[8px_8px_0px_#000] flex flex-col justify-between space-y-6 hover:-translate-y-1.5 transition-transform`}>
                  <div className="space-y-3">
                    <div className="flex justify-between font-black text-xs uppercase border-b-2 border-black pb-2">
                      <span className="bg-black text-white px-2 py-0.5">POST 0{idx + 1}</span>
                      <span>{art.readTime}</span>
                    </div>
                    <h2 className="font-black text-2xl uppercase leading-tight">
                      <Link href={`/writing/${art.slug}`}>
                        {art.title}
                      </Link>
                    </h2>
                    <p className="font-bold text-xs text-slate-900 leading-normal">
                      {art.summary}
                    </p>
                  </div>

                  <Link
                    href={`/writing/${art.slug}`}
                    className="block text-center py-2 bg-white text-black border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_#000] hover:bg-black hover:text-white transition-colors"
                  >
                    READ ARTICLE ↗
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. JAPANDI POP WRITING (Quiet Journal)
  // =========================================================================
  if (universe === 'japandi') {
    return (
      <div className="min-h-screen bg-[#F4EFEA] text-[#2C2926] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-4xl mx-auto space-y-16">
          <header className="border-b border-[#2C2926]/10 pb-8 flex items-start justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#B35446] block mb-2">
                随筆集 · THOUGHTS ON CRAFT
              </span>
              <h1 className="font-serif text-5xl sm:text-7xl text-[#2C2926]">
                Journal.
              </h1>
              <p className="text-base text-[#7D756C] mt-2 max-w-md">
                Reflections on systems design, tokenization dynamics, and engineering rigor.
              </p>
            </div>
            <div className="w-12 h-12 rounded border border-[#B35446] flex items-center justify-center text-[#B35446] font-serif font-bold text-lg">
              筆
            </div>
          </header>

          <div className="space-y-12">
            {ARTICLES.map((art) => (
              <article key={art.slug} className="p-6 rounded bg-white/60 border border-[#2C2926]/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#7D756C]">
                  <span>{art.date}</span>
                  <span className="text-[#B35446]">[{art.readTime}]</span>
                </div>
                <h2 className="font-serif text-2xl text-[#2C2926] hover:text-[#B35446] transition-colors">
                  <Link href={`/writing/${art.slug}`}>
                    {art.title}
                  </Link>
                </h2>
                <p className="text-sm text-[#7D756C] font-serif leading-relaxed">
                  {art.summary}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. SWISS WRITING (Numbered Article Grid)
  // =========================================================================
  if (universe === 'swiss') {
    return (
      <div className="min-h-screen bg-[#F0F0EE] text-black px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-6xl mx-auto space-y-16">
          <header className="border-t-4 border-b-2 border-black py-8 grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E62B1E] block mb-1">
                SYSTEM 05 // PUBLIKATIONEN
              </span>
              <h1 className="font-black text-5xl sm:text-7xl uppercase tracking-tighter">
                ESSAY INDEX
              </h1>
            </div>
            <div className="col-span-12 md:col-span-4 flex justify-end">
              <span className="font-mono text-xs uppercase font-bold text-slate-600">
                3 ARTIKEL
              </span>
            </div>
          </header>

          <div className="border-t-2 border-black divide-y-2 divide-black">
            {ARTICLES.map((art, idx) => (
              <div key={art.slug} className="py-8 grid grid-cols-12 gap-6 items-center">
                <div className="col-span-2 sm:col-span-1 font-mono font-black text-3xl text-[#E62B1E]">
                  0{idx + 1}
                </div>
                <div className="col-span-10 sm:col-span-6">
                  <h2 className="font-black text-2xl uppercase tracking-tight">
                    <Link href={`/writing/${art.slug}`} className="hover:text-[#E62B1E] transition-colors">
                      {art.title}
                    </Link>
                  </h2>
                  <span className="font-mono text-xs text-slate-600 uppercase block mt-1">
                    {art.date} · {art.readTime}
                  </span>
                </div>
                <div className="col-span-12 sm:col-span-5 text-xs text-slate-800 leading-relaxed flex items-center justify-between gap-4">
                  <p>{art.summary}</p>
                  <Link
                    href={`/writing/${art.slug}`}
                    className="px-3 py-1.5 bg-black text-white font-bold text-xs uppercase shrink-0 hover:bg-[#E62B1E] transition-colors"
                  >
                    LESEN ↗
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 5. BRUTALIST WRITING (Plain Text Archive)
  // =========================================================================
  if (universe === 'brutalist') {
    return (
      <div className="min-h-screen bg-black text-[#E0E0E0] px-4 sm:px-8 py-16 font-mono">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="border border-white p-6 bg-[#111] space-y-3">
            <div className="text-xs text-[#FFEB3B] font-bold">
              ~/PRIT/PUBLICATIONS/ [ASCII_FILE_INDEX]
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold uppercase text-white">
              $ LS -LA /ARTICLES
            </h1>
            <p className="text-xs text-slate-400">
              Technical essays and compiler disassembly notes.
            </p>
          </header>

          <div className="space-y-4">
            {ARTICLES.map((art, idx) => (
              <div key={art.slug} className="border border-zinc-700 p-6 space-y-3 bg-[#0a0a0a] hover:border-[#FFEB3B] transition-colors">
                <div className="flex justify-between text-xs text-[#FFEB3B]">
                  <span>FILE_{idx + 1}.MD</span>
                  <span>{art.readTime}</span>
                </div>
                <h2 className="text-xl font-bold uppercase text-white">
                  <Link href={`/writing/${art.slug}`} className="hover:text-[#FFEB3B]">
                    {art.title}
                  </Link>
                </h2>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  {art.summary}
                </p>
                <div className="pt-2 text-right">
                  <Link href={`/writing/${art.slug}`} className="text-xs text-[#FFEB3B] hover:underline">
                    VIEW_FILE ↗
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 6. NOIR WRITING (Cinematic Journal)
  // =========================================================================
  if (universe === 'noir') {
    return (
      <div className="min-h-screen bg-[#080808] text-[#E5E5E5] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-5xl mx-auto space-y-20">
          <header className="border-b border-zinc-800 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF9500] block mb-2">
                ESSAY CHRONICLES · NOCTURNAL ESSAYS
              </span>
              <h1 className="font-serif italic text-5xl sm:text-7xl text-white">
                Cinematic Dispatches.
              </h1>
              <p className="text-sm text-zinc-400 mt-2 max-w-lg">
                Field notes on compiler theory and distributed LLM latency.
              </p>
            </div>
            <div className="font-mono text-xs text-zinc-500">
              FRAME // 05.DISPATCHES
            </div>
          </header>

          <div className="space-y-12">
            {ARTICLES.map((art, idx) => (
              <article key={art.slug} className="p-8 rounded bg-zinc-950 border border-zinc-800 space-y-4">
                <div className="flex justify-between text-xs font-mono text-zinc-500">
                  <span className="text-[#FF9500]">DISPATCH 0{idx + 1}</span>
                  <span>{art.readTime}</span>
                </div>
                <h2 className="font-serif italic text-3xl text-white hover:text-[#FF9500] transition-colors">
                  <Link href={`/writing/${art.slug}`}>
                    {art.title}
                  </Link>
                </h2>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  {art.summary}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 7. ARCHIVE WRITING (Research Notes)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#E2E8F0] px-4 sm:px-8 md:px-12 py-16 font-mono">
      <div className="max-w-5xl mx-auto space-y-16">
        <header className="border border-cyan-800/40 p-8 rounded bg-[#111827]/60 space-y-3">
          <div className="flex items-center gap-2 text-xs text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>LABORATORY FIELD NOTES // SECTION 05</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
            RESEARCH DISPATCHES
          </h1>
          <p className="font-sans text-sm text-slate-300 max-w-xl">
            Correlated scientific observations on parser concurrency and cache hit rates.
          </p>
        </header>

        <div className="space-y-6">
          {ARTICLES.map((art, idx) => (
            <article key={art.slug} className="p-6 rounded border border-cyan-800/40 bg-[#111827]/40 space-y-3">
              <div className="flex justify-between text-xs text-cyan-400">
                <span>NOTE #{idx + 1} // {art.slug.toUpperCase()}</span>
                <span>{art.readTime}</span>
              </div>
              <h2 className="text-2xl font-bold text-white hover:text-cyan-400">
                <Link href={`/writing/${art.slug}`}>
                  {art.title}
                </Link>
              </h2>
              <p className="font-sans text-sm text-slate-300 leading-relaxed">
                {art.summary}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
