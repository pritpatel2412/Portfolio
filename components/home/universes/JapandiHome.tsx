'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { ALL_PROJECTS } from '@/lib/projects';
import profileData from '@/content/profile.json';

export function JapandiHome() {
  const { principles } = profileData;

  return (
    <div className="w-full bg-[#EAE4D9] text-[#201E1B] min-h-screen px-4 sm:px-8 md:px-12 py-10 sm:py-20 transition-colors duration-300 font-sans selection:bg-[#BC5A36] selection:text-white">
      <div className="max-w-5xl mx-auto space-y-28 sm:space-y-40">
        {/* ======================================================== */}
        {/* 1. ZEN MEDITATIVE HERO                                   */}
        {/* ======================================================== */}
        <section aria-label="Japandi Cover" className="relative border-b border-[#201E1B]/15 pb-20">
          <div className="flex items-start justify-between">
            {/* Left: Serene Large Typography */}
            <div className="space-y-8 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded bg-[#BC5A36] text-white flex items-center justify-center text-xs font-serif shadow-sm">
                  印
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#666157]">
                  和敬清寂 · ARTISAN SYSTEMS 2026
                </span>
              </div>

              <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.95] text-[#201E1B]">
                Prit Patel
                <span className="block font-sans font-light text-2xl sm:text-3xl text-[#666157] mt-3 tracking-normal">
                  プリット · パテル
                </span>
              </h1>

              <p className="font-serif text-lg sm:text-xl text-[#423E37] leading-relaxed max-w-xl">
                Engineering software as quiet, deterministic craft. Solved 400+ algorithmic structures, building autonomous intelligence and high-throughput systems from first principles.
              </p>

              <div className="flex items-center gap-6 pt-4 font-mono text-xs">
                <Link
                  href="/projects"
                  className="px-5 py-2.5 rounded-full bg-[#201E1B] text-[#EAE4D9] hover:bg-[#BC5A36] transition-colors"
                >
                  View Catalogue (06)
                </Link>
                <Link
                  href="/about"
                  className="text-[#666157] hover:text-[#201E1B] underline underline-offset-4"
                >
                  Philosophy &amp; Principles
                </Link>
              </div>
            </div>

            {/* Right: Vertical Typography Column */}
            <div className="hidden md:flex flex-col items-center gap-6 text-xs font-serif text-[#666157] tracking-[0.3em] select-none border-l border-[#201E1B]/15 pl-8">
              <span className="writing-vertical-rl text-sm text-[#BC5A36] font-semibold">
                自然 · 簡素 · 静寂
              </span>
              <div className="w-[1px] h-16 bg-[#201E1B]/20" />
              <span className="writing-vertical-rl text-[11px] font-mono">
                9.67 GPA · 400+ LEETCODE
              </span>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. ART CATALOGUE PROJECT SPREADS                         */}
        {/* ======================================================== */}
        <section aria-label="Catalogue Works" className="space-y-20">
          <div className="flex items-baseline justify-between border-b border-[#201E1B]/15 pb-4">
            <h2 className="font-serif text-3xl sm:text-4xl">
              Selected Works
            </h2>
            <span className="font-mono text-xs text-[#666157] uppercase tracking-widest">
              COLLECTION // 2026
            </span>
          </div>

          <div className="space-y-24">
            {ALL_PROJECTS.slice(0, 4).map((p, idx) => (
              <article
                key={p.slug}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                {/* Visual Artwork Frame */}
                <div className={`md:col-span-7 ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="block relative aspect-[16/10] rounded-xl overflow-hidden bg-[#DFD7C9] border border-[#201E1B]/10 shadow-sm group"
                  >
                    <Image
                      src={p.imageSrc}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                  </Link>
                </div>

                {/* Minimalist Art Notes */}
                <div className={`md:col-span-5 space-y-3 ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#BC5A36]">
                    <span>作品 0{idx + 1}</span>
                    <span>·</span>
                    <span>{p.category}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#201E1B]">
                    <Link href={`/projects/${p.slug}`} className="hover:text-[#BC5A36] transition-colors">
                      {p.title}
                    </Link>
                  </h3>

                  <p className="font-serif italic text-sm text-[#423E37]">
                    {p.oneLiner}
                  </p>

                  <p className="font-sans text-xs text-[#666157] leading-relaxed">
                    {p.tenSecond.problem}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="inline-flex items-center gap-1 font-mono text-xs text-[#201E1B] hover:text-[#BC5A36] uppercase tracking-wider font-semibold"
                    >
                      <span>Examine Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. WABI-SABI ENGINEERING PRINCIPLES                      */}
        {/* ======================================================== */}
        <section aria-label="Core Philosophy" className="border-t border-[#201E1B]/15 pt-16 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="font-mono text-xs uppercase text-[#BC5A36] tracking-[0.2em]">
              PRINCIPLES OF INTENTION
            </span>
            <h2 className="font-serif text-3xl">Craft Before Complexity</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {principles.slice(0, 3).map((pr) => (
              <div
                key={pr.num}
                className="p-6 rounded-2xl bg-[#DFD7C9]/60 border border-[#201E1B]/10 space-y-3"
              >
                <span className="font-serif text-sm text-[#BC5A36] block">
                  {pr.num} · 意図
                </span>
                <h3 className="font-serif font-bold text-lg text-[#201E1B]">
                  {pr.title}
                </h3>
                <p className="font-sans text-xs text-[#666157] leading-relaxed">
                  {pr.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
