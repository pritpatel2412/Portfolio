'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, ExternalLink, Code2, Layers, Cpu, ShieldCheck, Terminal, Database } from 'lucide-react';
import { useUniverse } from '@/lib/universe';
import type { ProjectDetail } from '@/lib/projects';

interface UniverseProjectDetailViewProps {
  project: ProjectDetail;
  nextProject: ProjectDetail | null;
}

export function UniverseProjectDetailView({ project, nextProject }: UniverseProjectDetailViewProps) {
  const { universe } = useUniverse();

  // =========================================================================
  // 1. EDITORIAL CASE STUDY (Magazine Feature Spread)
  // =========================================================================
  if (universe === 'editorial') {
    return (
      <div className="min-h-screen bg-[#F7F2EB] text-[#1A1816] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Back link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B43A12] hover:text-[#1A1816] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO FOLIO INDEX</span>
          </Link>

          {/* Magazine Hero Spread */}
          <header className="border-b border-[#1A1816]/20 pb-12 space-y-6">
            <div className="flex flex-wrap items-center justify-between font-mono text-xs uppercase tracking-widest text-[#6B645C] border-b border-[#1A1816]/10 pb-3">
              <span>SPECIAL REPORT · MONOGRAPH № {project.frameNumber}</span>
              <span>{project.category} · {project.year}</span>
              <span className="text-[#B43A12]">{project.team}</span>
            </div>

            <h1 className="font-serif font-black text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.95] text-[#1A1816]">
              {project.title}.
            </h1>

            <p className="font-serif italic text-2xl sm:text-3xl text-[#4A453E] leading-relaxed max-w-3xl">
              &ldquo;{project.oneLiner}&rdquo;
            </p>

            {/* Links & metadata */}
            <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-[#1A1816]/10">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span key={s} className="font-mono text-xs px-2.5 py-1 bg-[#1A1816]/5 text-[#1A1816] rounded">
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-wider">
                {project.links.repo && (
                  <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#B43A12] hover:underline">
                    <Code2 className="w-3.5 h-3.5" /> SOURCE CODE ↗
                  </a>
                )}
                {project.links.live && (
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#1A1816] hover:underline font-bold">
                    <ExternalLink className="w-3.5 h-3.5" /> LIVE SYSTEM ↗
                  </a>
                )}
              </div>
            </div>
          </header>

          {/* Double-Page Spread Image */}
          <div className="relative aspect-[16/9] w-full rounded overflow-hidden shadow-2xl border border-[#1A1816]/10">
            <Image
              src={project.imageSrc}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1000px"
            />
          </div>

          {/* Editorial Double Columns: Context & Verification */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-[#1A1816]/20 pb-16">
            <div className="md:col-span-6 space-y-4">
              <h2 className="font-serif font-black text-2xl text-[#1A1816]">
                I. The Architectural Imperative
              </h2>
              <p className="font-sans text-base text-[#4A453E] leading-relaxed">
                {project.tenSecond.problem}
              </p>
              <p className="font-sans text-base text-[#4A453E] leading-relaxed pt-2">
                <strong>Methodology:</strong> {project.tenSecond.approach}
              </p>
            </div>

            <div className="md:col-span-6 space-y-6 bg-white/60 p-8 rounded border border-[#1A1816]/10">
              <span className="font-mono text-xs uppercase tracking-widest text-[#B43A12] block">
                EMPIRICAL VERIFICATION
              </span>
              <div className="space-y-2">
                <span className="font-serif font-black text-5xl text-[#1A1816] block">
                  {project.tenSecond.keyMetric.value}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-[#6B645C] block">
                  {project.tenSecond.keyMetric.label}
                </span>
              </div>
              <p className="font-serif italic text-sm text-[#4A453E] leading-relaxed border-t border-[#1A1816]/10 pt-4">
                &ldquo;{project.tenSecond.result}&rdquo;
              </p>
            </div>
          </div>

          {/* Decisions Log */}
          {project.decisions && project.decisions.length > 0 && (
            <section className="space-y-8">
              <h2 className="font-serif font-black text-3xl text-[#1A1816]">
                II. Critical Engineering Trade-offs
              </h2>
              <div className="space-y-6">
                {project.decisions.map((d, i) => (
                  <div key={i} className="p-6 rounded bg-white/70 border border-[#1A1816]/15 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-[#6B645C]">
                      <span>DECISION 0{i + 1}</span>
                      <span className="text-[#B43A12] font-semibold">CHOSEN: {d.chosen}</span>
                    </div>
                    <h3 className="font-serif font-bold text-xl text-[#1A1816]">{d.title}</h3>
                    <p className="text-sm text-[#4A453E] leading-relaxed">{d.why}</p>
                    <div className="text-xs text-[#6B645C] pt-2 font-mono">
                      <strong>Trade-off:</strong> {d.tradeoff}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Colophon & Next Project */}
          {nextProject && (
            <footer className="pt-12 border-t border-[#1A1816]/20 flex items-center justify-between">
              <span className="font-mono text-xs uppercase text-[#6B645C]">
                NEXT SPREAD IN MONOGRAPH:
              </span>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="font-serif font-black text-2xl text-[#1A1816] hover:text-[#B43A12] flex items-center gap-2"
              >
                <span>{nextProject.title}</span>
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </footer>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. NEO MAXIMALIST CASE STUDY (Graphic Poster Presentation)
  // =========================================================================
  if (universe === 'maximalist') {
    return (
      <div className="min-h-screen bg-[#FFF952] text-black px-4 sm:px-8 md:px-12 py-16 font-sans selection:bg-[#FF0055] selection:text-white">
        <div className="max-w-5xl mx-auto space-y-14">
          <Link
            href="/projects"
            className="inline-block px-4 py-2 border-2 border-black bg-white font-black text-xs uppercase shadow-[4px_4px_0px_#000] hover:bg-[#FF0055] hover:text-white transition-colors"
          >
            ← BACK TO POSTER REEL
          </Link>

          <header className="border-4 border-black p-8 bg-white shadow-[12px_12px_0px_#000] space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="bg-[#FF0055] text-white font-black text-sm px-3 py-1 uppercase rotate-[-2deg]">
                ★ CASE STUDY POSTER ★
              </span>
              <span className="font-black text-xs uppercase">
                DOMAIN: {project.category} · YEAR {project.year}
              </span>
            </div>

            <h1 className="font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter leading-none">
              {project.title}!
            </h1>

            <p className="font-bold text-xl sm:text-2xl text-slate-800 leading-snug">
              {project.oneLiner}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.stack.map((s) => (
                <span key={s} className="px-2.5 py-1 bg-[#00E5FF] text-black border-2 border-black font-black text-xs uppercase">
                  {s}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t-2 border-black">
              {project.links.repo && (
                <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-black text-white font-black text-xs uppercase shadow-[3px_3px_0px_#FF0055] hover:bg-[#FF0055] transition-colors">
                  VIEW ON GITHUB ↗
                </a>
              )}
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#FF8A00] text-black border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_#000]">
                  LAUNCH LIVE DEMO ↗
                </a>
              )}
            </div>
          </header>

          <div className="border-4 border-black p-4 bg-black shadow-[10px_10px_0px_#000]">
            <div className="relative aspect-[16/9] w-full border-2 border-white">
              <Image
                src={project.imageSrc}
                alt={project.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1000px"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-4 border-black p-6 bg-[#00FF66] shadow-[8px_8px_0px_#000] space-y-4">
              <h2 className="font-black text-2xl uppercase">THE MISSION &amp; CHALLENGE</h2>
              <p className="font-bold text-base leading-relaxed text-slate-900">
                {project.tenSecond.problem}
              </p>
              <p className="font-bold text-sm text-slate-800 pt-2">
                <strong>ATTACK STRATEGY:</strong> {project.tenSecond.approach}
              </p>
            </div>

            <div className="border-4 border-black p-6 bg-[#FF0055] text-white shadow-[8px_8px_0px_#000] space-y-4 flex flex-col justify-between">
              <div>
                <span className="font-black text-xs uppercase bg-black text-white px-2 py-0.5">
                  MEASURABLE IMPACT
                </span>
                <div className="font-black text-6xl mt-3 tracking-tighter">
                  {project.tenSecond.keyMetric.value}
                </div>
                <div className="font-black text-sm uppercase opacity-90 mt-1">
                  {project.tenSecond.keyMetric.label}
                </div>
              </div>
              <p className="font-bold text-sm italic bg-black/30 p-3 rounded">
                &ldquo;{project.tenSecond.result}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. JAPANDI POP CASE STUDY (Art Catalogue Monograph)
  // =========================================================================
  if (universe === 'japandi') {
    return (
      <div className="min-h-screen bg-[#F4EFEA] text-[#2C2926] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-4xl mx-auto space-y-16">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#7D756C] hover:text-[#B35446] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>作品一覧に戻る · RETURN TO CATALOGUE</span>
          </Link>

          <header className="border-b border-[#2C2926]/10 pb-10 space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-[#7D756C]">
              <span>作品番号 № {project.frameNumber}</span>
              <span className="text-[#B35446]">[{project.category}]</span>
              <span>{project.year}</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl text-[#2C2926]">
              {project.title}
            </h1>

            <p className="font-serif italic text-xl text-[#7D756C] leading-relaxed">
              {project.oneLiner}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.stack.map((s) => (
                <span key={s} className="px-3 py-1 bg-white/60 border border-[#2C2926]/10 rounded text-xs text-[#2C2926]">
                  {s}
                </span>
              ))}
            </div>
          </header>

          <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-[#2C2926]/10 shadow-sm bg-[#EAE4DC]">
            <Image
              src={project.imageSrc}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 900px"
            />
          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-2xl text-[#2C2926]">設計の文脈 · Context &amp; Purpose</h2>
            <p className="text-base text-[#7D756C] leading-relaxed font-serif">
              {project.tenSecond.problem}
            </p>
            <p className="text-sm text-[#7D756C] leading-relaxed">
              <strong>解決のアプローチ:</strong> {project.tenSecond.approach}
            </p>
          </div>

          <div className="p-6 rounded bg-white/70 border border-[#2C2926]/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-[#7D756C] block uppercase">実証された成果</span>
              <strong className="font-serif text-3xl text-[#B35446]">{project.tenSecond.keyMetric.value}</strong>
              <span className="text-xs text-[#7D756C] block">{project.tenSecond.keyMetric.label}</span>
            </div>
            {project.links.repo && (
              <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded border border-[#B35446] text-[#B35446] hover:bg-[#B35446] hover:text-[#F4EFEA] text-xs font-medium transition-colors">
                リポジトリを閲覧 ↗
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. SWISS CASE STUDY (12-Column Architectural Information System)
  // =========================================================================
  if (universe === 'swiss') {
    return (
      <div className="min-h-screen bg-[#F0F0EE] text-black px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-6xl mx-auto space-y-16">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase font-bold text-black hover:text-[#E62B1E]"
          >
            ← ZURÜCK ZUM SYSTEMINDEX
          </Link>

          <header className="border-t-4 border-b-2 border-black py-8 grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-9 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E62B1E] block font-bold">
                SYSTEMDOKUMENT // 0{project.frameNumber}
              </span>
              <h1 className="font-black text-5xl sm:text-7xl uppercase tracking-tighter">
                {project.title}
              </h1>
              <p className="text-lg font-bold text-slate-800">
                {project.oneLiner}
              </p>
            </div>
            <div className="col-span-12 md:col-span-3 flex justify-end">
              <div className="w-16 h-16 rounded-full bg-[#E62B1E] text-white flex items-center justify-center font-black text-xl">
                {project.frameNumber}
              </div>
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full border-2 border-black overflow-hidden bg-white">
            <Image
              src={project.imageSrc}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1000px"
            />
          </div>

          <div className="grid grid-cols-12 gap-8 border-b-2 border-black pb-12">
            <div className="col-span-12 md:col-span-6 space-y-4">
              <h2 className="font-black text-2xl uppercase">01 / KONTEXT &amp; PROBLEM</h2>
              <p className="text-sm leading-relaxed text-slate-800">
                {project.tenSecond.problem}
              </p>
              <p className="text-sm leading-relaxed text-slate-800 pt-2">
                <strong>SYSTEMARCHITEKTUR:</strong> {project.tenSecond.approach}
              </p>
            </div>

            <div className="col-span-12 md:col-span-6 bg-white border-2 border-black p-6 space-y-4">
              <span className="font-mono text-xs uppercase font-bold text-[#E62B1E] block">
                02 / VERIFIZIERTE METRIK
              </span>
              <div className="font-black text-5xl">{project.tenSecond.keyMetric.value}</div>
              <div className="font-mono text-xs uppercase text-slate-600 font-bold">{project.tenSecond.keyMetric.label}</div>
              <p className="text-xs text-slate-700 italic border-t border-black pt-3">
                &ldquo;{project.tenSecond.result}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 5. BRUTALIST CASE STUDY (Raw Internet RFC Document)
  // =========================================================================
  if (universe === 'brutalist') {
    return (
      <div className="min-h-screen bg-black text-[#E0E0E0] px-4 sm:px-8 py-16 font-mono">
        <div className="max-w-4xl mx-auto space-y-12">
          <Link href="/projects" className="text-xs text-[#FFEB3B] hover:underline">
            [..] RETURN_TO_DIRECTORY
          </Link>

          <header className="border border-white p-6 bg-[#111] space-y-4">
            <div className="text-xs text-[#FFEB3B]">
              /SYS/DOCS/{project.slug.toUpperCase()}.RFC [READ_ONLY]
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold uppercase text-white">
              # {project.title}
            </h1>
            <p className="text-sm text-zinc-300">
              &gt; {project.oneLiner}
            </p>
            <div className="text-xs text-zinc-500 pt-2 border-t border-zinc-800">
              STACK: {project.stack.join(' | ')}
            </div>
          </header>

          <div className="border border-zinc-700 overflow-hidden bg-black aspect-[16/9] relative">
            <Image
              src={project.imageSrc}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1000px) 100vw, 800px"
            />
          </div>

          <div className="border border-zinc-700 p-6 space-y-4 bg-[#0a0a0a]">
            <div className="text-xs text-[#FFEB3B] uppercase">== 01. TECHNICAL SPECIFICATION ==</div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {project.tenSecond.problem}
            </p>
            <p className="text-xs text-zinc-400 font-sans">
              <strong>EXECUTION_FLOW:</strong> {project.tenSecond.approach}
            </p>
          </div>

          <div className="border border-zinc-700 p-6 bg-[#111] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-zinc-500 block uppercase">MEASURED_BENCHMARK:</span>
              <strong className="text-2xl text-[#FFEB3B]">{project.tenSecond.keyMetric.value}</strong>
              <span className="text-xs text-zinc-400 block">{project.tenSecond.keyMetric.label}</span>
            </div>
            {project.links.repo && (
              <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-[#FFEB3B] text-[#FFEB3B] text-xs hover:bg-[#FFEB3B] hover:text-black transition-colors font-bold">
                GIT_CLONE ↗
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 6. NOIR CASE STUDY (Cinematic Narrative Chapter)
  // =========================================================================
  if (universe === 'noir') {
    return (
      <div className="min-h-screen bg-[#080808] text-[#E5E5E5] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-5xl mx-auto space-y-16">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF9500] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>EXIT SCENE · BACK TO CHRONICLES</span>
          </Link>

          <header className="border-b border-zinc-800 pb-10 space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
              <span className="text-[#FF9500]">CHAPTER {project.frameNumber}</span>
              <span>SCENARIO // {project.category.toUpperCase()}</span>
              <span>YEAR {project.year}</span>
            </div>

            <h1 className="font-serif italic text-5xl sm:text-7xl md:text-8xl text-white">
              {project.title}.
            </h1>

            <p className="text-lg sm:text-xl text-zinc-400 font-light max-w-2xl">
              {project.oneLiner}
            </p>
          </header>

          <div className="relative aspect-[21/9] w-full rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950">
            <Image
              src={project.imageSrc}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1000px"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-7 space-y-4">
              <h2 className="font-serif italic text-2xl text-white">The Conflict &amp; Architecture</h2>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                {project.tenSecond.problem}
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed pt-2">
                <strong>Resolution Strategy:</strong> {project.tenSecond.approach}
              </p>
            </div>

            <div className="md:col-span-5 p-6 rounded bg-zinc-950 border border-zinc-800 space-y-4">
              <span className="font-mono text-xs uppercase text-[#FF9500] block">CONFIDENTIAL TELEMETRY</span>
              <div className="font-serif italic text-4xl text-white">{project.tenSecond.keyMetric.value}</div>
              <div className="text-xs text-zinc-400 font-mono">{project.tenSecond.keyMetric.label}</div>
              <p className="text-xs text-zinc-500 italic pt-2 border-t border-zinc-900">
                &ldquo;{project.tenSecond.result}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 7. ARCHIVE CASE STUDY (Laboratory Specimen Telemetry)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#E2E8F0] px-4 sm:px-8 md:px-12 py-16 font-mono">
      <div className="max-w-5xl mx-auto space-y-14">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs text-cyan-400 hover:text-white"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO SPECIMEN ACCESSION INDEX</span>
        </Link>

        <header className="border border-cyan-800/40 p-8 rounded bg-[#111827]/60 space-y-4">
          <div className="flex items-center gap-2 text-xs text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>ACCESSION SPECIMEN #{project.slug.toUpperCase()}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase text-white tracking-tight">
            {project.title}
          </h1>

          <p className="font-sans text-base text-slate-300 max-w-2xl">
            {project.oneLiner}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.stack.map((s) => (
              <span key={s} className="px-2.5 py-1 bg-[#0B0F17] border border-cyan-900/60 rounded text-xs text-cyan-300">
                {s}
              </span>
            ))}
          </div>
        </header>

        <div className="relative aspect-[16/9] w-full rounded border border-cyan-800/40 overflow-hidden bg-[#0B0F17]">
          <Image
            src={project.imageSrc}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1000px"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7 p-6 rounded border border-cyan-800/30 bg-[#111827]/40 space-y-4">
            <h2 className="text-lg font-bold text-white uppercase">SPECIMEN DIAGNOSTIC SUMMARY</h2>
            <p className="font-sans text-sm text-slate-300 leading-relaxed">
              {project.tenSecond.problem}
            </p>
            <p className="font-sans text-xs text-slate-400 pt-2">
              <strong>METHOD:</strong> {project.tenSecond.approach}
            </p>
          </div>

          <div className="md:col-span-5 p-6 rounded border border-cyan-800/40 bg-[#111827]/60 space-y-4">
            <span className="text-xs text-cyan-400 uppercase font-bold block">VERIFIED EMPIRICAL METRIC</span>
            <div className="text-4xl font-bold text-white">{project.tenSecond.keyMetric.value}</div>
            <div className="text-xs text-slate-400">{project.tenSecond.keyMetric.label}</div>
            <div className="pt-3 border-t border-cyan-900/40 text-xs font-sans text-slate-300 italic">
              {project.tenSecond.result}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
