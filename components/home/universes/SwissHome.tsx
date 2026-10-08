'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { ALL_PROJECTS } from '@/lib/projects';

export function SwissHome() {
  return (
    <div className="w-full bg-[#F8F8FA] text-[#0A0A0A] min-h-screen px-4 sm:px-8 md:px-12 py-10 sm:py-20 transition-colors duration-300 font-sans selection:bg-[#E11D48] selection:text-white">
      <div className="max-w-7xl mx-auto space-y-24 sm:space-y-36">
        {/* ======================================================== */}
        {/* 1. SWISS 12-COLUMN MATHEMATICAL HERO                     */}
        {/* ======================================================== */}
        <section aria-label="Swiss Grid Hero" className="relative border-b-2 border-black pb-16">
          {/* Top Running Grid Coordinates */}
          <div className="flex items-center justify-between font-mono text-xs uppercase font-bold text-black border-b border-black pb-3 mb-12">
            <span>№ 01 · INTERNATIONAL TYPOGRAPHIC SYSTEM</span>
            <span>BASE GRID: 12 COLUMNS · 24PX GUTTER</span>
            <span className="text-[#E11D48]">VADODARA / IN</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 Columns: Giant Sans Typography */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-sans font-black text-xs uppercase tracking-widest text-[#E11D48] block">
                FULL-STACK &amp; AI SYSTEMS ENGINEER
              </span>

              <h1 className="font-sans font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter leading-[0.88] uppercase text-black">
                PRIT<br />PATEL.
              </h1>

              <div className="space-y-4 max-w-lg border-l-2 border-black pl-6 pt-2">
                <p className="font-sans text-base sm:text-lg text-[#222222] font-medium leading-normal">
                  Engineering deterministic, high-throughput systems. 400+ algorithmic solutions and verified edge benchmarks in production.
                </p>
                <div className="flex items-center gap-4 font-mono text-xs uppercase font-bold pt-2">
                  <Link
                    href="/projects"
                    className="px-5 py-2.5 bg-black text-white hover:bg-[#E11D48] transition-colors"
                  >
                    System Registry [06]
                  </Link>
                  <Link
                    href="/resume"
                    className="px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors"
                  >
                    Curriculum Vitae
                  </Link>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Concentric Circles with Iconic Red Focal Disc */}
            <div className="lg:col-span-5 flex justify-center items-center py-6">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                {/* Concentric Circle Rules */}
                <div className="absolute inset-0 rounded-full border border-black/30" />
                <div className="absolute inset-6 rounded-full border border-black/50" />
                <div className="absolute inset-12 rounded-full border border-black/70" />

                {/* Swiss Signal Red Solid Focal Disc */}
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#E11D48] flex items-center justify-center shadow-lg">
                  <span className="text-white font-sans font-black text-lg tracking-wider">
                    12-COL
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Rational Spec Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 mt-12 border-t border-black font-sans text-xs">
            <div className="border-l border-black pl-3">
              <span className="text-[#777777] block text-[10px] uppercase font-bold">ALGORITHMIC RECORD</span>
              <strong className="text-lg text-black font-black">400+ LEETCODE</strong>
            </div>
            <div className="border-l border-black pl-3">
              <span className="text-[#777777] block text-[10px] uppercase font-bold">ACADEMIC GPA</span>
              <strong className="text-lg text-black font-black">9.67 CS CUMULATIVE</strong>
            </div>
            <div className="border-l border-black pl-3">
              <span className="text-[#777777] block text-[10px] uppercase font-bold">EDGE LATENCY</span>
              <strong className="text-lg text-black font-black">SUB-80MS P95</strong>
            </div>
            <div className="border-l border-black pl-3">
              <span className="text-[#777777] block text-[10px] uppercase font-bold">AVAILABILITY</span>
              <strong className="text-lg text-[#E11D48] font-black">OPEN FOR HIRE</strong>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. NUMBERED SYSTEM PROJECT DIRECTORY                     */}
        {/* ======================================================== */}
        <section aria-label="System Directory" className="space-y-16">
          <div className="flex items-baseline justify-between border-b-2 border-black pb-3">
            <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight">
              02 // SYSTEM REGISTRY
            </h2>
            <span className="font-mono text-xs font-bold">ALL ARTIFACTS VERIFIED</span>
          </div>

          <div className="divide-y-2 divide-black">
            {ALL_PROJECTS.slice(0, 4).map((proj, idx) => (
              <article
                key={proj.slug}
                className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* 4 Columns: Specs */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center gap-2 font-mono text-xs font-black text-[#E11D48]">
                    <span>0{idx + 1}</span>
                    <span>/</span>
                    <span>{proj.category.toUpperCase()}</span>
                    <span>/</span>
                    <span>{proj.year}</span>
                  </div>

                  <h3 className="font-sans font-black text-3xl sm:text-4xl text-black uppercase tracking-tight">
                    <Link href={`/projects/${proj.slug}`} className="hover:text-[#E11D48] transition-colors">
                      {proj.title}
                    </Link>
                  </h3>

                  <p className="font-sans text-sm text-[#333333] leading-relaxed">
                    {proj.oneLiner}
                  </p>

                  <div className="font-mono text-xs bg-black/5 p-3 border border-black/20">
                    <span className="text-[#777777] block text-[10px] uppercase font-bold">MEASURED OUTCOME</span>
                    <strong className="text-sm text-black">
                      {proj.tenSecond.keyMetric.value} {proj.tenSecond.keyMetric.label}
                    </strong>
                  </div>

                  <Link
                    href={`/projects/${proj.slug}`}
                    className="inline-flex items-center gap-1 font-mono text-xs uppercase font-bold text-black hover:text-[#E11D48] transition-colors"
                  >
                    <span>View Specification</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* 8 Columns: Precise Architectural Frame */}
                <div className="lg:col-span-8">
                  <Link
                    href={`/projects/${proj.slug}`}
                    className="block relative aspect-[16/9] overflow-hidden border-2 border-black bg-white group"
                  >
                    <Image
                      src={proj.imageSrc}
                      alt={proj.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-102"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
