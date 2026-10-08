'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ALL_PROJECTS } from '@/lib/projects';
import profileData from '@/content/profile.json';

export function MaximalistHome() {
  const { portrait } = profileData;

  return (
    <div className="w-full bg-[#FFF685] text-[#0D0D0D] min-h-screen px-4 sm:px-8 py-8 sm:py-16 transition-colors duration-300 font-sans selection:bg-pink-500 selection:text-white">
      <div className="max-w-6xl mx-auto space-y-24 sm:space-y-32">
        {/* ======================================================== */}
        {/* 1. GIANT GRAPHIC POSTER HERO                             */}
        {/* ======================================================== */}
        <section aria-label="Neo Maximalist Poster Hero" className="relative">
          {/* Halftone / Pop Sticker Floating Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-4 py-1.5 rounded-full bg-blue-600 text-white font-mono text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] transform -rotate-1">
              ★ FULL-STACK &amp; AI DEVELOPER
            </span>
            <span className="px-3 py-1.5 rounded-full bg-pink-500 text-white font-mono text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] transform rotate-2">
              🔥 400+ LEETCODE SOLVED
            </span>
            <span className="px-3 py-1.5 rounded-full bg-emerald-500 text-black font-mono text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] transform -rotate-2">
              ⚡ 9.67 CS GPA
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Oversized Expressive Typography */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="font-display font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter leading-[0.88] uppercase text-[#0D0D0D] drop-shadow-[4px_4px_0px_#2563EB]">
                PRIT<br />
                <span className="text-pink-500 drop-shadow-[4px_4px_0px_#000]">PATEL!</span>
              </h1>

              {/* Speech-Bubble Bio Card */}
              <div className="p-6 rounded-2xl bg-white border-3 border-black shadow-[6px_6px_0px_#000] relative max-w-lg">
                <p className="font-sans font-bold text-base sm:text-lg text-[#0D0D0D] leading-snug">
                  I design &amp; engineer high-speed systems—autonomous security scanner swarms, sub-80ms RAG pipelines, and compiler interpreters with an uncompromising point of view.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs font-black">
                  <Link
                    href="/contact"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 text-white uppercase tracking-wider hover:bg-black transition-colors shadow-[3px_3px_0px_#000]"
                  >
                    HIRE ME! 🚀
                  </Link>
                  <Link
                    href="/projects"
                    className="px-4 py-2.5 rounded-xl bg-yellow-300 text-black border-2 border-black uppercase tracking-wider hover:bg-pink-400 transition-colors shadow-[3px_3px_0px_#000]"
                  >
                    EXPLORE PROJECTS ↗
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Tilted Polaroid Cutout Photo with Washi Tape */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative transform rotate-3 hover:rotate-0 transition-transform duration-300">
                {/* Washi Tape Graphic */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-pink-400/80 backdrop-blur-sm border border-black/30 z-20 shadow-sm rotate-2" />

                {/* Starburst Badge Sticker */}
                <div className="absolute -top-6 -right-6 z-30 w-20 h-20 rounded-full bg-yellow-400 border-2 border-black flex items-center justify-center font-display font-black text-xs uppercase tracking-tighter shadow-[3px_3px_0px_#000] animate-bounce">
                  VADODARA<br />2026!
                </div>

                {/* Polaroid Frame */}
                <div className="p-4 pb-8 bg-white border-3 border-black rounded-lg shadow-[8px_8px_0px_#000] w-72 sm:w-80">
                  <div className="relative aspect-[4/5] rounded overflow-hidden border-2 border-black bg-blue-50">
                    <Image
                      src={portrait}
                      alt="Prit Patel Portrait"
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-3 text-center font-mono font-black text-xs tracking-wider uppercase">
                    PRIT PATEL // CS &amp; AI
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. PROJECTS AS POP POSTERS                                */}
        {/* ======================================================== */}
        <section aria-label="Pop Project Posters" className="space-y-12">
          <div className="flex items-center justify-between border-b-3 border-black pb-4">
            <h2 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight">
              FEATURED ARTIFACTS!
            </h2>
            <span className="px-3 py-1 bg-black text-white font-mono text-xs font-bold rounded-full">
              POSTERS 01—04
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ALL_PROJECTS.slice(0, 4).map((proj, idx) => {
              const bgColors = [
                'bg-blue-600 text-white',
                'bg-pink-500 text-white',
                'bg-emerald-400 text-black',
                'bg-purple-600 text-white',
              ];
              const cardBg = bgColors[idx % bgColors.length];

              return (
                <article
                  key={proj.slug}
                  className={`p-6 sm:p-8 rounded-3xl border-3 border-black shadow-[8px_8px_0px_#000] flex flex-col justify-between space-y-6 ${cardBg}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono text-xs font-black">
                      <span className="px-2.5 py-1 rounded-md bg-white text-black border border-black shadow-[2px_2px_0px_#000]">
                        № 0{idx + 1}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-black text-white uppercase text-[10px]">
                        {proj.category}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-3xl sm:text-4xl tracking-tight leading-none uppercase">
                      {proj.title}
                    </h3>

                    <p className="font-sans font-bold text-sm sm:text-base leading-snug opacity-95">
                      {proj.oneLiner}
                    </p>
                  </div>

                  {/* Visual Frame */}
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden border-2 border-black bg-white shadow-[4px_4px_0px_#000]">
                    <Image
                      src={proj.imageSrc}
                      alt={proj.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Footer Action */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-mono text-xs font-black">
                      {proj.tenSecond.keyMetric.value} {proj.tenSecond.keyMetric.label}
                    </span>
                    <Link
                      href={`/projects/${proj.slug}`}
                      className="px-4 py-2 rounded-xl bg-white text-black font-mono font-black text-xs uppercase shadow-[2px_2px_0px_#000] hover:scale-105 transition-transform"
                    >
                      VIEW POSTER ↗
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. VERIFIED SKILL GRAPHICS                               */}
        {/* ======================================================== */}
        <section aria-label="Skill Badges" className="p-8 rounded-3xl bg-white border-3 border-black shadow-[8px_8px_0px_#000] space-y-6">
          <h2 className="font-display font-black text-3xl uppercase">
            WEAPONS OF CHOICE!
          </h2>
          <div className="flex flex-wrap gap-2.5 font-mono text-xs font-black">
            {[
              'TypeScript',
              'Python 3.12',
              'FastAPI',
              'Next.js 15',
              'React',
              'PostgreSQL',
              'Redis Streams',
              'Docker',
              'RAG Pipelines',
              'Autonomous Agents',
              'AST Parsers',
              'Playwright QA',
              'Tailwind CSS',
            ].map((skill, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 rounded-full border-2 border-black bg-yellow-200 text-black shadow-[2px_2px_0px_#000]"
              >
                #{skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
