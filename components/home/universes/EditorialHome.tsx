'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowDownRight, Compass, Sparkles } from 'lucide-react';
import { site } from '@/content/site';
import { ALL_PROJECTS } from '@/lib/projects';
import { ARTICLES } from '@/content/articles';

export function EditorialHome() {
  return (
    <div className="w-full bg-[#F7F2EB] text-[#1A1816] min-h-screen px-4 sm:px-8 md:px-12 py-8 sm:py-16 transition-colors duration-300 font-sans">
      <div className="max-w-6xl mx-auto space-y-24 sm:space-y-36">
        {/* ======================================================== */}
        {/* 1. EDITORIAL COVER (Hero Spread)                         */}
        {/* ======================================================== */}
        <section aria-label="Editorial Cover" className="border-b border-[#1A1816]/20 pb-16 sm:pb-24">
          {/* Top Running Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-[#6B645C] border-b border-[#1A1816]/15 pb-4 mb-12 sm:mb-20">
            <span>VOL. 2026 · ISSUE IV</span>
            <span>MONOGRAPH ON AI &amp; SYSTEMS ARCHITECTURE</span>
            <span className="text-[#B43A12] font-semibold">VADODARA, GUJARAT, IN</span>
          </div>

          {/* Main Title & Asymmetric Cover Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <span className="font-mono text-xs uppercase tracking-widest text-[#B43A12] block mb-3 font-semibold">
                ( FULL-STACK &amp; AI SYSTEMS DEVELOPER )
              </span>
              <h1 className="font-serif font-black text-6xl sm:text-8xl md:text-9xl tracking-tight leading-[0.9] text-[#1A1816]">
                Prit <br />
                <span className="italic font-normal">Patel.</span>
              </h1>
            </div>

            {/* Right Column: Rotating Available Stamp & Positioning */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full pt-4 space-y-8">
              {/* Spinning Badge Stamp */}
              <div className="relative w-28 h-28 self-end hidden sm:flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-dashed border-[#1A1816]/40 animate-[spin_18s_linear_infinite]" />
                <div className="text-center font-mono text-[9px] uppercase tracking-tighter text-[#1A1816] leading-tight font-bold">
                  AVAILABLE<br />FOR WORK<br />✦ 2026 ✦
                </div>
              </div>

              <div className="space-y-4">
                <p className="font-serif text-lg sm:text-xl text-[#3A3530] leading-relaxed italic">
                  &ldquo;I build high-throughput systems and precision web interfaces. 400+ algorithmic solutions and autonomous agent swarms in production.&rdquo;
                </p>
                <div className="flex items-center gap-4 pt-2 font-mono text-xs">
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1A1816] text-[#F7F2EB] font-bold uppercase hover:bg-[#B43A12] transition-colors"
                  >
                    <span>Index of Work</span>
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/resume"
                    className="inline-flex items-center gap-1 text-[#1A1816] hover:text-[#B43A12] underline underline-offset-4 uppercase tracking-wider"
                  >
                    <span>Curriculum Vitae</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Hairline Editorial Fact Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 mt-12 border-t border-[#1A1816]/15 font-mono text-xs text-[#6B645C]">
            <div>
              <span className="block text-[10px] uppercase text-[#B43A12] font-bold">ACADEMIC RECORD</span>
              <strong className="text-base text-[#1A1816] font-serif">9.67 GPA</strong>
              <span className="block text-[10px]">Computer Science &amp; Eng</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-[#B43A12] font-bold">ALGORITHMIC RIGOR</span>
              <strong className="text-base text-[#1A1816] font-serif">400+ Solved</strong>
              <span className="block text-[10px]">LeetCode: prit__2412</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-[#B43A12] font-bold">CORE DOMAIN</span>
              <strong className="text-base text-[#1A1816] font-serif">AI &amp; Systems</strong>
              <span className="block text-[10px]">RAG · Swarms · Compilers</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-[#B43A12] font-bold">AVAILABILITY</span>
              <strong className="text-base text-[#1A1816] font-serif">Open for Hire</strong>
              <span className="block text-[10px]">Full-Time &amp; High-Impact</span>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. SELECTED PROJECTS AS MAGAZINE SPREADS                 */}
        {/* ======================================================== */}
        <section aria-label="Selected Projects" className="space-y-16">
          <div className="flex items-baseline justify-between border-b border-[#1A1816] pb-3">
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#1A1816]">
              Selected Works &amp; Architecture
            </h2>
            <span className="font-mono text-xs uppercase text-[#6B645C]">
              [ 06 PRODUCTION ARTIFACTS ]
            </span>
          </div>

          <div className="space-y-24">
            {ALL_PROJECTS.slice(0, 4).map((project, index) => (
              <article
                key={project.slug}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#1A1816]/15 pb-16"
              >
                {/* Left: Metadata & Story */}
                <div className={`lg:col-span-5 space-y-4 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-3 font-mono text-xs text-[#B43A12] font-semibold">
                    <span>№ 0{index + 1}</span>
                    <span>·</span>
                    <span>{project.category}</span>
                    <span>·</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-serif font-bold text-3xl sm:text-4xl text-[#1A1816] leading-tight">
                    <Link href={`/projects/${project.slug}`} className="hover:text-[#B43A12] transition-colors">
                      {project.title}
                    </Link>
                  </h3>

                  <p className="font-serif italic text-base text-[#4A453F] leading-relaxed">
                    &ldquo;{project.oneLiner}&rdquo;
                  </p>

                  <p className="font-sans text-sm text-[#6B645C] leading-relaxed">
                    {project.tenSecond.problem}
                  </p>

                  <div className="pt-2 font-mono text-xs text-[#6B645C]">
                    <span className="block text-[10px] uppercase text-[#B43A12] font-bold mb-1">
                      KEY METRIC
                    </span>
                    <strong className="text-sm text-[#1A1816]">
                      {project.tenSecond.keyMetric.value}
                    </strong>{' '}
                    <span>{project.tenSecond.keyMetric.label}</span>
                  </div>

                  <div className="pt-3">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 font-mono text-xs uppercase font-bold text-[#1A1816] hover:text-[#B43A12] transition-colors"
                    >
                      <span>Read Full Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right: Large Editorial Picture Frame */}
                <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group block relative aspect-[16/10] overflow-hidden rounded-[2px] bg-[#EDE5DB] border border-[#1A1816]/20 shadow-sm"
                  >
                    <Image
                      src={project.imageSrc}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    <div className="absolute inset-0 bg-[#1A1816]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center pt-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#1A1816] font-mono text-xs font-bold uppercase tracking-wider text-[#1A1816] hover:bg-[#1A1816] hover:text-[#F7F2EB] transition-colors"
            >
              <span>Explore Entire Catalog (06 Projects)</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. ESSAYS & CRITICAL REFLECTIONS                         */}
        {/* ======================================================== */}
        <section aria-label="Essays" className="border-t border-[#1A1816] pt-16">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-serif font-black text-3xl text-[#1A1816]">
              Publications &amp; Field Notes
            </h2>
            <Link href="/writing" className="font-mono text-xs uppercase text-[#B43A12] hover:underline">
              View All ↗
            </Link>
          </div>

          <div className="divide-y divide-[#1A1816]/15">
            {ARTICLES.map((article) => (
              <article key={article.slug} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
                <div className="md:col-span-3 font-mono text-xs text-[#6B645C]">
                  {article.date} · {article.readTime}
                </div>
                <div className="md:col-span-7">
                  <h3 className="font-serif font-bold text-xl text-[#1A1816] hover:text-[#B43A12] transition-colors">
                    <Link href={`/writing/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="font-serif italic text-xs text-[#6B645C] mt-1">
                    {article.summary}
                  </p>
                </div>
                <div className="md:col-span-2 text-right">
                  <span className="font-mono text-[10px] uppercase text-[#B43A12] border border-[#B43A12]/30 px-2 py-0.5 rounded-full">
                    {article.category}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. CLOSING MONOGRAPH FOOTNOTE                            */}
        {/* ======================================================== */}
        <footer className="border-t-2 border-[#1A1816] pt-12 pb-8 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-[#6B645C]">
          <div>
            <span>EDITED &amp; ENGINEERED BY PRIT PATEL</span>
            <span className="block text-[10px] text-[#A8A196]">TYPESET IN NEWSREADER &amp; GEIST MONO</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:try.prit24@gmail.com" className="text-[#1A1816] hover:text-[#B43A12] font-bold">
              TRY.PRIT24@GMAIL.COM ↗
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
