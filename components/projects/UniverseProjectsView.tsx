'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowDownRight, Filter, ShieldCheck, Database, Cpu, Sparkles, Terminal } from 'lucide-react';
import { useUniverse } from '@/lib/universe';
import { ALL_PROJECTS } from '@/lib/projects';

type ProjectCategory = 'Security' | 'AI Systems' | 'Compilers' | 'Product';

export function UniverseProjectsView() {
  const { universe } = useUniverse();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>('All');

  const filteredProjects = selectedCategory === 'All'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter((p) => p.category === selectedCategory);

  const categories: (ProjectCategory | 'All')[] = ['All', 'Security', 'AI Systems', 'Compilers', 'Product'];

  // =========================================================================
  // 1. EDITORIAL PROJECTS (Magazine Spread Catalogue)
  // =========================================================================
  if (universe === 'editorial') {
    return (
      <div className="min-h-screen bg-[#F7F2EB] text-[#1A1816] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-6xl mx-auto space-y-20">
          {/* Masthead Header */}
          <header className="border-b border-[#1A1816]/20 pb-12">
            <div className="flex flex-wrap items-center justify-between text-xs font-mono uppercase tracking-widest text-[#6B645C] border-b border-[#1A1816]/15 pb-3 mb-8">
              <span>FOLIO 02 · PRODUCTION SYSTEMS</span>
              <span>INDEX: 01—06</span>
              <span className="text-[#B43A12]">MONOGRAPH SERIES</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              <div className="md:col-span-8">
                <h1 className="font-serif font-black text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.95]">
                  Selected <br />
                  <span className="italic font-normal">Works.</span>
                </h1>
              </div>
              <div className="md:col-span-4">
                <p className="font-serif italic text-base sm:text-lg text-[#6B645C] leading-relaxed">
                  A documented compendium of autonomous agent swarms, distributed search engines, and regional compilers shipped to real users.
                </p>
              </div>
            </div>

            {/* Quiet Category Tabs */}
            <div className="flex flex-wrap items-center gap-3 pt-10 font-mono text-xs uppercase tracking-wider">
              <span className="text-[#6B645C] mr-2">Discipline:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#1A1816] text-[#F7F2EB] font-bold'
                      : 'hover:bg-[#1A1816]/10 text-[#6B645C]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </header>

          {/* Magazine Spreads */}
          <div className="space-y-28">
            {filteredProjects.map((p, index) => {
              const isEven = index % 2 === 0;
              return (
                <article
                  key={p.slug}
                  className="border-b border-[#1A1816]/20 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                >
                  <div className={`lg:col-span-6 space-y-6 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                    <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-[#B43A12]">
                      <span>SPREAD № 0{index + 1}</span>
                      <span>—</span>
                      <span>{p.category}</span>
                      <span>—</span>
                      <span>{p.year}</span>
                    </div>

                    <h2 className="font-serif font-black text-3xl sm:text-5xl text-[#1A1816] leading-tight">
                      <Link href={`/projects/${p.slug}`} className="hover:text-[#B43A12] transition-colors">
                        {p.title}
                      </Link>
                    </h2>

                    <p className="font-sans text-base text-[#4A453E] leading-relaxed">
                      {p.tenSecond.problem}
                    </p>

                    <blockquote className="border-l-2 border-[#B43A12] pl-4 italic font-serif text-[#6B645C] text-sm sm:text-base">
                      &ldquo;{p.tenSecond.result}&rdquo;
                    </blockquote>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {p.stack.slice(0, 5).map((s) => (
                        <span key={s} className="font-mono text-[11px] px-2.5 py-1 bg-[#1A1816]/5 text-[#1A1816] rounded">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4">
                      <Link
                        href={`/projects/${p.slug}`}
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B43A12] hover:text-[#1A1816] font-bold group"
                      >
                        <span>READ FULL SPREAD</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  <div className={`lg:col-span-6 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                    <Link href={`/projects/${p.slug}`} className="block relative aspect-[4/3] overflow-hidden rounded shadow-lg group">
                      <Image
                        src={p.imageSrc}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute bottom-3 right-3 bg-[#1A1816]/80 text-[#F7F2EB] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur-sm">
                        PLATE {p.frameNumber}
                      </div>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. NEO MAXIMALIST PROJECTS (Graphic Poster Gallery)
  // =========================================================================
  if (universe === 'maximalist') {
    const posterColors = ['bg-[#FF0055]', 'bg-[#00E5FF]', 'bg-[#FF8A00]', 'bg-[#7000FF]', 'bg-[#00FF66]', 'bg-[#FFF952]'];
    const textColors = ['text-white', 'text-black', 'text-black', 'text-white', 'text-black', 'text-black'];

    return (
      <div className="min-h-screen bg-[#FFF952] text-black px-4 sm:px-8 md:px-12 py-16 font-sans selection:bg-[#FF0055] selection:text-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <header className="border-4 border-black p-8 bg-white shadow-[10px_10px_0px_#000]">
            <div className="inline-block bg-[#FF0055] text-white font-black text-sm px-4 py-1.5 uppercase rotate-[-1.5deg] mb-4">
              ★ SHIPPED PRODUCTIONS · 100% REAL CODE ★
            </div>
            <h1 className="font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter">
              POSTER REEL!
            </h1>
            <p className="font-bold text-lg text-slate-800 mt-2 max-w-2xl">
              Every project is an independent graphic poster. Explore the architecture, verified telemetry, and live repositories!
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_#000] active:translate-y-0.5 transition-transform ${
                    selectedCategory === cat ? 'bg-[#FF0055] text-white' : 'bg-white text-black hover:bg-[#FFE600]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((p, idx) => {
              const bg = posterColors[idx % posterColors.length];
              const fg = textColors[idx % textColors.length];
              return (
                <div
                  key={p.slug}
                  className={`border-4 border-black p-5 shadow-[8px_8px_0px_#000] flex flex-col justify-between space-y-6 ${bg} ${fg} transition-transform hover:-translate-y-1.5`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between font-black text-xs uppercase border-b-2 border-current pb-2">
                      <span className="bg-black text-white px-2 py-0.5">POSTER 0{idx + 1}</span>
                      <span>{p.year}</span>
                    </div>

                    <Link href={`/projects/${p.slug}`} className="block relative aspect-[16/10] border-2 border-black overflow-hidden bg-black">
                      <Image
                        src={p.imageSrc}
                        alt={p.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </Link>

                    <h2 className="font-black text-3xl uppercase tracking-tight leading-none">
                      <Link href={`/projects/${p.slug}`}>
                        {p.title}
                      </Link>
                    </h2>

                    <p className="font-bold text-sm leading-snug line-clamp-3">
                      {p.oneLiner}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t-2 border-current">
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-2 py-0.5 bg-black text-white font-black text-[10px] uppercase">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/projects/${p.slug}`}
                      className="block text-center py-2.5 px-4 bg-white text-black border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_#000] hover:bg-black hover:text-white transition-colors"
                    >
                      ENTER POSTER ↗
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. JAPANDI POP PROJECTS (Art Catalogue Spreads)
  // =========================================================================
  if (universe === 'japandi') {
    return (
      <div className="min-h-screen bg-[#F4EFEA] text-[#2C2926] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-6xl mx-auto space-y-20">
          <header className="border-b border-[#2C2926]/10 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#B35446] block mb-2">
                作品集 · REPOSITORY CATALOGUE
              </span>
              <h1 className="font-serif text-5xl sm:text-7xl text-[#2C2926]">
                Crafted Works.
              </h1>
              <p className="text-sm sm:text-base text-[#7D756C] mt-2 max-w-lg">
                Systems constructed with care and clarity. Every repository reflects intentional restraint and architectural harmony.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs rounded transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#B35446] text-[#F4EFEA]'
                      : 'bg-white/60 text-[#2C2926] hover:bg-white border border-[#2C2926]/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {filteredProjects.map((p, idx) => (
              <article key={p.slug} className="p-8 rounded-lg bg-white/60 border border-[#2C2926]/10 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#7D756C]">
                    <span>作品 0{idx + 1}</span>
                    <span className="text-[#B35446]">[{p.category}]</span>
                    <span>{p.year}</span>
                  </div>

                  <Link href={`/projects/${p.slug}`} className="block relative aspect-[16/10] rounded overflow-hidden bg-[#EAE4DC]">
                    <Image
                      src={p.imageSrc}
                      alt={p.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </Link>

                  <h2 className="font-serif text-2xl sm:text-3xl text-[#2C2926]">
                    <Link href={`/projects/${p.slug}`} className="hover:text-[#B35446] transition-colors">
                      {p.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-[#7D756C] leading-relaxed">
                    {p.tenSecond.problem}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#2C2926]/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#B35446]">
                    {p.tenSecond.keyMetric.value} {p.tenSecond.keyMetric.label}
                  </span>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs text-[#2C2926] hover:text-[#B35446] font-medium"
                  >
                    <span>鑑賞する</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. SWISS PROJECTS (12-Column Mathematical Information Grid)
  // =========================================================================
  if (universe === 'swiss') {
    return (
      <div className="min-h-screen bg-[#F0F0EE] text-black px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-7xl mx-auto space-y-16">
          <header className="border-t-4 border-b-2 border-black py-8 grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-8">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E62B1E] block mb-1">
                SYSTEM 02 // PROJEKTVERZEICHNIS
              </span>
              <h1 className="font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter">
                INDEX 01—06
              </h1>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col items-end gap-4">
              <div className="w-14 h-14 rounded-full bg-[#E62B1E] text-white flex items-center justify-center font-black text-xl">
                +
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 font-bold text-xs uppercase tracking-wider transition-colors ${
                      selectedCategory === cat ? 'bg-black text-white' : 'bg-white text-black border border-black hover:bg-[#E62B1E] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <div className="border-t-2 border-black divide-y-2 divide-black">
            {filteredProjects.map((p, idx) => (
              <div key={p.slug} className="py-8 grid grid-cols-12 gap-6 items-center group">
                <div className="col-span-2 sm:col-span-1 font-mono font-black text-2xl sm:text-4xl text-[#E62B1E]">
                  0{idx + 1}
                </div>
                <div className="col-span-10 sm:col-span-4">
                  <h2 className="font-black text-2xl sm:text-3xl uppercase tracking-tight">
                    <Link href={`/projects/${p.slug}`} className="hover:text-[#E62B1E] transition-colors">
                      {p.title}
                    </Link>
                  </h2>
                  <span className="font-mono text-xs text-slate-600 block mt-1 uppercase">
                    {p.category} · {p.year}
                  </span>
                </div>
                <div className="col-span-12 sm:col-span-4 text-xs sm:text-sm text-slate-800 leading-relaxed">
                  {p.oneLiner}
                </div>
                <div className="col-span-12 sm:col-span-3 flex items-center justify-between sm:justify-end gap-4">
                  <span className="font-mono text-xs font-bold bg-[#E62B1E]/10 text-[#E62B1E] px-2 py-1">
                    {p.tenSecond.keyMetric.value}
                  </span>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="px-4 py-2 bg-black text-white font-bold text-xs uppercase hover:bg-[#E62B1E] transition-colors"
                  >
                    ÖFFNEN ↗
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
  // 5. BRUTALIST PROJECTS (Raw Internet Document Directory)
  // =========================================================================
  if (universe === 'brutalist') {
    return (
      <div className="min-h-screen bg-black text-[#E0E0E0] px-4 sm:px-8 py-16 font-mono">
        <div className="max-w-5xl mx-auto space-y-12">
          <header className="border border-white p-6 bg-[#111] space-y-4">
            <div className="text-xs text-[#FFEB3B] font-bold">
              ~/PRIT/PROJECTS.MD --RAW-DOCUMENT-SYSTEM
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold uppercase text-white">
              $ LIST_REPOSITORIES
            </h1>
            <p className="text-xs text-slate-400">
              Unfiltered technical breakdown of production engines. No marketing fluff.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-1 text-xs uppercase border ${
                    selectedCategory === cat ? 'bg-[#FFEB3B] text-black border-[#FFEB3B] font-bold' : 'border-zinc-700 text-white hover:border-white'
                  }`}
                >
                  [{cat}]
                </button>
              ))}
            </div>
          </header>

          <div className="space-y-6">
            {filteredProjects.map((p, idx) => (
              <div key={p.slug} className="border border-zinc-700 p-6 space-y-4 hover:border-[#FFEB3B] transition-colors bg-[#0a0a0a]">
                <div className="flex flex-wrap items-center justify-between text-xs text-[#FFEB3B]">
                  <span>/ENTRY/0{idx + 1}</span>
                  <span>DOMAIN: {p.category.toUpperCase()}</span>
                  <span>YEAR: {p.year}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold uppercase text-white">
                  <Link href={`/projects/${p.slug}`} className="hover:text-[#FFEB3B]">
                    {p.title}
                  </Link>
                </h2>

                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {p.tenSecond.problem}
                </p>

                <div className="p-3 bg-black border border-zinc-800 text-xs text-zinc-400">
                  <span className="text-[#FFEB3B] font-bold block mb-1">TELEMETRY_OUTCOME:</span>
                  <span>{p.tenSecond.keyMetric.value} ({p.tenSecond.keyMetric.label})</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex flex-wrap gap-2">
                    {p.stack.slice(0, 5).map((s) => (
                      <span key={s} className="text-[11px] text-zinc-500">
                        #{s}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="text-xs text-[#FFEB3B] hover:underline font-bold"
                  >
                    READ_SPEC.DOC ↗
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
  // 6. NOIR PROJECTS (Cinematic Chapters)
  // =========================================================================
  if (universe === 'noir') {
    return (
      <div className="min-h-screen bg-[#080808] text-[#E5E5E5] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-6xl mx-auto space-y-24">
          <header className="border-b border-zinc-800 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF9500] block mb-2">
                SCENARIO ARCHIVE · 35MM CHRONICLES
              </span>
              <h1 className="font-serif italic text-5xl sm:text-7xl md:text-8xl text-white">
                Cinematic Chapters.
              </h1>
              <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-lg">
                Six narratives of engineering resilience. Each chapter details an escalating technical conflict and its autonomous resolution.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs rounded uppercase tracking-wider transition-colors ${
                    selectedCategory === cat ? 'bg-[#FF9500] text-black font-bold' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </header>

          <div className="space-y-28">
            {filteredProjects.map((p, idx) => (
              <article key={p.slug} className="space-y-6">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 border-b border-zinc-900 pb-2">
                  <span className="text-[#FF9500]">CHAPTER 0{idx + 1}</span>
                  <span>REEL: {p.frameNumber}</span>
                  <span>{p.category.toUpperCase()}</span>
                </div>

                <Link href={`/projects/${p.slug}`} className="block relative aspect-[21/9] rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 group">
                  <Image
                    src={p.imageSrc}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1200px) 100vw, 80vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-6 sm:p-10">
                    <div className="space-y-2">
                      <h2 className="font-serif italic text-3xl sm:text-5xl text-white">
                        {p.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl font-light">
                        {p.oneLiner}
                      </p>
                    </div>
                  </div>
                </Link>

                <div className="flex items-center justify-between pt-2">
                  <div className="font-mono text-xs text-zinc-400">
                    KEY METRIC: <span className="text-[#FF9500] font-bold">{p.tenSecond.keyMetric.value}</span> ({p.tenSecond.keyMetric.label})
                  </div>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF9500] hover:text-white transition-colors"
                  >
                    <span>PLAY SCENE</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 7. DIGITAL ARCHIVE PROJECTS (Museum Specimen Catalog)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#E2E8F0] px-4 sm:px-8 md:px-12 py-16 font-mono">
      <div className="max-w-6xl mx-auto space-y-16">
        <header className="border border-cyan-800/40 p-6 sm:p-8 rounded bg-[#111827]/60 relative">
          <div className="flex items-center gap-2 text-xs text-cyan-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>ACCESSION SPECIMENS // SECTION 02</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
            SPECIMEN REGISTRY
          </h1>
          <p className="font-sans text-sm text-slate-300 mt-2 max-w-xl">
            Correlated scientific repository archives. Telemetry, computational complexity, and architectural schematics.
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs uppercase border transition-colors ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-black border-cyan-400 font-bold'
                    : 'bg-[#0B0F17] text-slate-300 border-cyan-900/60 hover:border-cyan-500/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="space-y-10">
          {filteredProjects.map((p, idx) => (
            <article
              key={p.slug}
              className="p-6 sm:p-8 rounded border border-cyan-800/40 bg-[#111827]/40 hover:border-cyan-400 transition-colors grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3 text-xs text-cyan-400">
                  <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60">
                    SPECIMEN #{p.slug.toUpperCase()}
                  </span>
                  <span>YEAR: {p.year}</span>
                  <span>FIELD: {p.category}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  <Link href={`/projects/${p.slug}`} className="hover:text-cyan-400">
                    {p.title}
                  </Link>
                </h2>

                <p className="font-sans text-sm text-slate-300 leading-relaxed">
                  {p.tenSecond.problem}
                </p>

                <div className="p-3 rounded bg-[#0B0F17] border border-cyan-900/40 text-xs text-slate-400">
                  <strong className="text-cyan-300 block mb-1">VERIFIED TELEMETRY:</strong>
                  <span>{p.tenSecond.keyMetric.value} {p.tenSecond.keyMetric.label}</span>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-2 text-xs text-cyan-400 hover:text-white font-bold"
                  >
                    <span>ANALYZE SPECIMEN</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <Link
                  href={`/projects/${p.slug}`}
                  className="block relative aspect-[16/10] rounded overflow-hidden border border-cyan-800/40 bg-[#0B0F17]"
                >
                  <Image
                    src={p.imageSrc}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
