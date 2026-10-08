'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { ALL_PROJECTS } from '@/lib/projects';
import profileData from '@/content/profile.json';

export function BrutalistHome() {
  const { principles } = profileData;

  return (
    <div className="w-full bg-[#E2DDD5] text-black min-h-screen px-4 sm:px-8 py-8 sm:py-16 transition-colors duration-300 font-mono selection:bg-yellow-300 selection:text-black">
      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
        {/* ======================================================== */}
        {/* 1. RAW INTERNET DOCUMENT HEADER                          */}
        {/* ======================================================== */}
        <section aria-label="Brutalist Document" className="border-2 border-black p-4 sm:p-8 bg-[#EAE6DD] shadow-[6px_6px_0px_#000]">
          {/* Telemetry Bar */}
          <div className="border-b border-black pb-3 mb-8 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-bold">FILE: ~/PRIT_PATEL/INDEX.HTML</span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="bg-yellow-300 text-black px-1.5 py-0.5 font-bold">
                [STATUS: AVAILABLE]
              </span>
              <span>DOM: 384 NODES</span>
              <span>PROTO: HTTP/2</span>
            </div>
          </div>

          {/* Raw Name Header */}
          <div className="space-y-4">
            <span className="text-xs uppercase bg-black text-white px-2 py-0.5 inline-block font-bold">
              ROLE: FULL-STACK &amp; AI SYSTEMS DEVELOPER
            </span>

            <h1 className="font-mono font-black text-5xl sm:text-7xl md:text-8xl tracking-tight leading-none uppercase">
              PRIT PATEL<span className="text-blue-700">.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#222222] max-w-2xl leading-relaxed pt-2">
              &lt;!-- I build high-throughput systems and precision web interfaces. 400+ algorithmic solutions and autonomous agent swarms in production. No boilerplate. --&gt;
            </p>

            <div className="pt-4 flex flex-wrap gap-4 text-xs font-bold">
              <Link
                href="/projects"
                className="px-4 py-2 bg-black text-white hover:bg-blue-700 transition-colors"
              >
                [01] VIEW_PROJECTS
              </Link>
              <Link
                href="/resume"
                className="px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
              >
                [02] GET_RESUME_PDF
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 border-2 border-black hover:bg-yellow-300 hover:text-black transition-colors"
              >
                [03] INITIATE_PING
              </Link>
            </div>
          </div>

          {/* Raw Verification Metric Table */}
          <div className="mt-8 pt-6 border-t-2 border-black">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-black text-[10px] text-[#555]">
                  <th className="py-1">METRIC_KEY</th>
                  <th className="py-1">VERIFIED_VALUE</th>
                  <th className="py-1">SOURCE_CITATION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/20 font-bold">
                <tr>
                  <td className="py-2">LEETCODE_SOLUTIONS</td>
                  <td className="py-2 text-blue-700">400+ Solved</td>
                  <td className="py-2 text-[11px] font-normal">leetcode.com/u/prit__2412/</td>
                </tr>
                <tr>
                  <td className="py-2">ACADEMIC_GPA</td>
                  <td className="py-2 text-blue-700">9.67 / 10.0</td>
                  <td className="py-2 text-[11px] font-normal">B.Tech Computer Science &amp; Eng</td>
                </tr>
                <tr>
                  <td className="py-2">P95_SEARCH_LATENCY</td>
                  <td className="py-2 text-blue-700">&lt; 80ms</td>
                  <td className="py-2 text-[11px] font-normal">SearchMind Redis Cache Engine</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. PROJECTS AS TECHNICAL DOCUMENTS                       */}
        {/* ======================================================== */}
        <section aria-label="Project Documents" className="space-y-8">
          <div className="flex items-center justify-between border-b-2 border-black pb-2 text-xs font-bold">
            <h2>/ETC/PROJECTS/SELECTED/</h2>
            <span>[COUNT: 04]</span>
          </div>

          <div className="space-y-8">
            {ALL_PROJECTS.slice(0, 4).map((p, idx) => (
              <article
                key={p.slug}
                className="border-2 border-black bg-white p-6 shadow-[5px_5px_0px_#000] space-y-4"
              >
                <div className="flex items-center justify-between border-b border-black pb-2 text-xs">
                  <span className="font-bold text-blue-700">
                    /SYS/0{idx + 1}/{p.slug.toUpperCase()}
                  </span>
                  <span className="bg-black text-white px-1.5 text-[10px]">
                    {p.year} // {p.category}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 space-y-3">
                    <h3 className="text-2xl font-black uppercase">
                      <Link href={`/projects/${p.slug}`} className="hover:text-blue-700">
                        {p.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-[#333] leading-relaxed">
                      {p.tenSecond.problem}
                    </p>

                    <div className="p-3 bg-black/5 border border-black text-xs space-y-1">
                      <div>
                        <strong>OUTCOME:</strong> {p.tenSecond.keyMetric.value} {p.tenSecond.keyMetric.label}
                      </div>
                      <div>
                        <strong>STACK:</strong> [{p.stack.join(', ')}]
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/projects/${p.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold hover:bg-black hover:text-white px-2 py-1 border border-black"
                      >
                        <span>&gt; READ_CASE_STUDY</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="md:col-span-5">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="block relative aspect-[16/10] border-2 border-black overflow-hidden bg-[#E2DDD5]"
                    >
                      <Image
                        src={p.imageSrc}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. RAW PRINCIPLES DUMP                                   */}
        {/* ======================================================== */}
        <section aria-label="System Rules" className="border-2 border-black p-6 bg-white shadow-[5px_5px_0px_#000] space-y-4 text-xs">
          <h2 className="font-bold border-b border-black pb-2 uppercase">
            /SYS/CORE_DIRECTIVES.CONF
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {principles.slice(0, 3).map((pr) => (
              <div key={pr.num} className="p-3 border border-black bg-[#E2DDD5]/40 space-y-1">
                <span className="text-blue-700 font-bold">#{pr.num}</span>
                <div className="font-bold">{pr.title}</div>
                <p className="text-[11px] text-[#444] leading-relaxed">
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
