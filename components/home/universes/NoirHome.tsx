'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Film, Clock, Sparkles } from 'lucide-react';
import { ALL_PROJECTS } from '@/lib/projects';
import { ARTICLES } from '@/content/articles';

export function NoirHome() {
  return (
    <div className="w-full bg-[#070707] text-[#EDE7DF] min-h-screen px-4 sm:px-8 md:px-16 py-12 sm:py-24 transition-colors duration-300 font-sans selection:bg-[#E07A28] selection:text-black">
      <div className="max-w-6xl mx-auto space-y-32 sm:space-y-48">
        {/* ======================================================== */}
        {/* 1. CINEMATIC TITLE SEQUENCE (Hero)                       */}
        {/* ======================================================== */}
        <section aria-label="Cinematic Sequence" className="relative space-y-12 border-b border-white/10 pb-24">
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
            <span>SCENE I // THE OPENING</span>
            <span>35MM ASPECT RATIO // 2.39:1</span>
            <span className="text-[#E07A28]">REC ● 24 FPS</span>
          </div>

          <div className="space-y-6 max-w-4xl">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E07A28]">
              Prit Patel Presents
            </span>

            <h1 className="font-serif italic font-normal text-6xl sm:text-8xl md:text-9xl tracking-tight leading-[0.92] text-[#EDE7DF]">
              After <br />
              <span className="not-italic font-black text-white">Hours.</span>
            </h1>

            <p className="font-serif text-lg sm:text-2xl text-white/70 max-w-2xl leading-relaxed italic pt-4">
              &ldquo;Engineering software as dramatic, high-concurrency systems. When the editor closes, distributed kernels and autonomous agents keep watch.&rdquo;
            </p>

            <div className="flex items-center gap-6 pt-6 font-mono text-xs">
              <Link
                href="/projects"
                className="px-6 py-3 bg-[#EDE7DF] text-[#070707] font-bold uppercase tracking-wider hover:bg-[#E07A28] hover:text-white transition-colors"
              >
                Screenings (06 Works)
              </Link>
              <Link
                href="/about"
                className="text-white/60 hover:text-white underline underline-offset-4 tracking-wider uppercase"
              >
                Character Profile
              </Link>
            </div>
          </div>

          {/* Cinematic Letterbox Specs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-white/10 font-mono text-xs text-white/40">
            <div>
              <span className="block text-[10px] text-[#E07A28]">ALGORITHMIC PROOF</span>
              <strong className="text-base text-white font-serif">400+ LeetCode</strong>
            </div>
            <div>
              <span className="block text-[10px] text-[#E07A28]">ACADEMIC RECORD</span>
              <strong className="text-base text-white font-serif">9.67 CS GPA</strong>
            </div>
            <div>
              <span className="block text-[10px] text-[#E07A28]">SYSTEM BENCHMARK</span>
              <strong className="text-base text-white font-serif">Sub-80ms P95</strong>
            </div>
            <div>
              <span className="block text-[10px] text-[#E07A28]">STATUS</span>
              <strong className="text-base text-[#E07A28] font-serif">Open for Hire</strong>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. PROJECTS AS CINEMATIC CHAPTERS                        */}
        {/* ======================================================== */}
        <section aria-label="Cinematic Chapters" className="space-y-28">
          <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
            <h2 className="font-serif text-3xl sm:text-5xl italic text-white">
              Selected Chapters
            </h2>
            <span className="font-mono text-xs uppercase tracking-widest text-[#E07A28]">
              FILM CATALOGUE
            </span>
          </div>

          <div className="space-y-36">
            {ALL_PROJECTS.slice(0, 4).map((p, idx) => (
              <article key={p.slug} className="space-y-8">
                {/* Widescreen 21:9 Letterbox Still */}
                <Link
                  href={`/projects/${p.slug}`}
                  className="block relative aspect-[21/9] rounded-sm overflow-hidden bg-white/5 border border-white/10 group shadow-2xl"
                >
                  <Image
                    src={p.imageSrc}
                    alt={p.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-102 transition-all duration-700 ease-out"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                  <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                    <span className="font-mono text-xs text-[#E07A28] tracking-widest">
                      CHAPTER 0{idx + 1} // {p.category.toUpperCase()}
                    </span>
                    <span className="hidden sm:inline font-mono text-xs text-white/60">
                      METRIC: {p.tenSecond.keyMetric.value} {p.tenSecond.keyMetric.label}
                    </span>
                  </div>
                </Link>

                {/* Chapter Story */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-8 space-y-3">
                    <h3 className="font-serif font-black text-3xl sm:text-4xl text-white">
                      <Link href={`/projects/${p.slug}`} className="hover:text-[#E07A28] transition-colors">
                        {p.title}
                      </Link>
                    </h3>
                    <p className="font-serif italic text-base sm:text-lg text-white/70 leading-relaxed">
                      &ldquo;{p.oneLiner}&rdquo;
                    </p>
                    <p className="font-sans text-sm text-white/50 leading-relaxed">
                      {p.tenSecond.problem}
                    </p>
                  </div>

                  <div className="md:col-span-4 flex md:justify-end pt-2">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border border-white/20 text-xs font-mono uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors"
                    >
                      <span>Read Treatment</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. CLOSING CREDITS                                       */}
        {/* ======================================================== */}
        <footer className="border-t border-white/10 pt-16 pb-12 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-white/40">
          <div>
            <span className="text-white">DIRECTED &amp; ARCHITECTED BY PRIT PATEL</span>
            <span className="block text-[10px] mt-1">CINEMATIC RUNTIME // 2026 // GUJARAT, INDIA</span>
          </div>
          <div>
            <a href="mailto:try.prit24@gmail.com" className="text-[#E07A28] hover:underline">
              TRY.PRIT24@GMAIL.COM ↗
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
