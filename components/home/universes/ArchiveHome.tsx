'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Database, Cpu, Layers } from 'lucide-react';
import { ALL_PROJECTS } from '@/lib/projects';
import { ARTICLES } from '@/content/articles';
import profileData from '@/content/profile.json';

export function ArchiveHome() {
  const { proofPoints } = profileData;

  return (
    <div className="w-full bg-[#0B0F17] text-[#E2E8F0] min-h-screen px-4 sm:px-8 md:px-12 py-10 sm:py-20 transition-colors duration-300 font-mono selection:bg-cyan-500 selection:text-black">
      <div className="max-w-6xl mx-auto space-y-24 sm:space-y-32">
        {/* ======================================================== */}
        {/* 1. LABORATORY ACCESSION HEADER (Hero)                    */}
        {/* ======================================================== */}
        <section aria-label="Archive Accession" className="border border-cyan-800/40 p-6 sm:p-10 rounded-lg bg-[#111827]/60 backdrop-blur-md relative overflow-hidden">
          {/* Subtle Grid Coordinate Background */}
          <div className="absolute top-3 right-4 text-[10px] text-cyan-400/50">
            [GRID 22.3072° N, 73.1812° E]
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>ARCHIVE ACCESSION // 2026-PP</span>
            </div>

            <h1 className="font-mono font-black text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase text-white">
              PRIT PATEL<span className="text-cyan-400">.SYS</span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Personal software laboratory and digital research museum. Engineering autonomous multi-agent swarms, low-latency search caches, and compiler interpreters.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs">
              <Link
                href="/projects"
                className="px-4 py-2 bg-cyan-500 text-black font-bold uppercase hover:bg-white transition-colors"
              >
                Inspect Specimens (06)
              </Link>
              <Link
                href="/resume"
                className="px-4 py-2 border border-cyan-500/40 text-cyan-300 hover:border-cyan-400 transition-colors"
              >
                Accession Dossier (CV)
              </Link>
            </div>
          </div>

          {/* Verification Specimen Drawer Matrix */}
          <div className="mt-10 pt-8 border-t border-cyan-800/40 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {proofPoints.map((pt, i) => (
              <div key={i} className="p-3 bg-[#0B0F17]/80 border border-cyan-800/30 rounded">
                <span className="text-[10px] text-cyan-400 block uppercase">
                  RECORD // 0{i + 1}
                </span>
                <strong className="text-lg text-white font-mono block">
                  {pt.value}
                </strong>
                <span className="text-[11px] text-slate-400">{pt.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. SPECIMEN CATALOGUE (Projects)                         */}
        {/* ======================================================== */}
        <section aria-label="Specimens" className="space-y-12">
          <div className="flex items-center justify-between border-b border-cyan-800/40 pb-3 text-xs text-cyan-400">
            <span className="font-bold">SECTION // 02 · REPOSITORIES AS SPECIMENS</span>
            <span className="text-slate-400">INDEX: 01—04</span>
          </div>

          <div className="space-y-12">
            {ALL_PROJECTS.slice(0, 4).map((p) => (
              <article
                key={p.slug}
                className="p-6 sm:p-8 rounded-lg bg-[#111827]/40 border border-cyan-800/30 hover:border-cyan-500/60 transition-colors grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3 text-xs text-cyan-400">
                    <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60">
                      SPECIMEN #{p.slug.toUpperCase()}
                    </span>
                    <span>YEAR: {p.year}</span>
                    <span>DOMAIN: {p.category}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    <Link href={`/projects/${p.slug}`} className="hover:text-cyan-400 transition-colors">
                      {p.title}
                    </Link>
                  </h3>

                  <p className="font-sans text-sm text-slate-300 leading-relaxed">
                    {p.tenSecond.problem}
                  </p>

                  <div className="p-3 rounded bg-[#0B0F17] border border-cyan-900/40 text-xs text-slate-400">
                    <strong className="text-cyan-300 block mb-1">EMPIRICAL OUTCOME:</strong>
                    <span>{p.tenSecond.keyMetric.value} {p.tenSecond.keyMetric.label}</span>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-white font-bold"
                    >
                      <span>EXAMINE TELEMETRY</span>
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
        </section>

        {/* ======================================================== */}
        {/* 3. LABORATORY FIELD NOTES (Articles)                     */}
        {/* ======================================================== */}
        <section aria-label="Field Notes" className="border-t border-cyan-800/40 pt-16 space-y-6">
          <div className="flex items-center justify-between text-xs text-cyan-400">
            <span className="font-bold">SECTION // 03 · RESEARCH DISPATCHES</span>
            <Link href="/writing" className="hover:underline">VIEW FULL ARCHIVE ↗</Link>
          </div>

          <div className="divide-y divide-cyan-900/40">
            {ARTICLES.map((art) => (
              <div key={art.slug} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <Link href={`/writing/${art.slug}`} className="text-white hover:text-cyan-400 font-bold block text-sm">
                    {art.title}
                  </Link>
                  <span className="text-slate-400 text-[11px] font-sans">{art.summary}</span>
                </div>
                <span className="text-cyan-400/80 shrink-0 font-mono text-[11px]">
                  [{art.category}]
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
