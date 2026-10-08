'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, GraduationCap, Building2, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { useUniverse } from '@/lib/universe';
import experienceData from '@/content/experience.json';

export function UniverseExperienceView() {
  const { universe } = useUniverse();
  const { summary, roles, education } = experienceData;

  // =========================================================================
  // 1. EDITORIAL EXPERIENCE (Publication Career Monograph)
  // =========================================================================
  if (universe === 'editorial') {
    return (
      <div className="min-h-screen bg-[#F7F2EB] text-[#1A1816] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-5xl mx-auto space-y-20">
          <header className="border-b border-[#1A1816]/20 pb-12">
            <div className="flex flex-wrap items-center justify-between font-mono text-xs uppercase tracking-widest text-[#6B645C] border-b border-[#1A1816]/10 pb-3 mb-6">
              <span>RECORD OF SERVICE · VOL. 2026</span>
              <span>CHRONOLOGICAL CHRONICLE</span>
              <span className="text-[#B43A12]">ACTIVE CAREER</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              <div className="md:col-span-8">
                <h1 className="font-serif font-black text-6xl sm:text-8xl tracking-tight leading-[0.9]">
                  Career <br />
                  <span className="italic font-normal">Monograph.</span>
                </h1>
              </div>
              <div className="md:col-span-4">
                <p className="font-serif italic text-sm text-[#6B645C] leading-relaxed">
                  A documented history of software internships, distributed LLM pipelines, and compiler architectures shipped to production.
                </p>
              </div>
            </div>
          </header>

          <div className="space-y-16">
            {roles.map((r, i) => (
              <article key={r.id} className="border-b border-[#1A1816]/15 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#B43A12] block">
                    STAGE 0{i + 1} · {r.period}
                  </span>
                  <h2 className="font-serif font-bold text-2xl text-[#1A1816]">{r.company}</h2>
                  <div className="font-serif italic text-base text-[#6B645C]">{r.role}</div>
                  <span className="inline-block px-2 py-0.5 rounded bg-[#1A1816]/5 font-mono text-[11px] text-[#6B645C]">
                    {r.mode}
                  </span>
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <p className="font-serif text-lg text-[#1A1816] leading-relaxed">
                    {r.story}
                  </p>
                  <ul className="space-y-2 font-sans text-sm text-[#4A453E] border-t border-[#1A1816]/10 pt-4">
                    {r.outcomes.map((o, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#B43A12] font-serif font-bold mt-0.5">—</span>
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {r.stack.map((s) => (
                      <span key={s} className="font-mono text-xs px-2.5 py-1 bg-[#1A1816]/5 text-[#1A1816] rounded">
                        {s}
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
  // 2. NEO MAXIMALIST EXPERIENCE (Graphic Milestones)
  // =========================================================================
  if (universe === 'maximalist') {
    return (
      <div className="min-h-screen bg-[#FFF952] text-black px-4 sm:px-8 md:px-12 py-16 font-sans selection:bg-[#FF0055] selection:text-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <header className="border-4 border-black p-8 bg-white shadow-[10px_10px_0px_#000]">
            <div className="inline-block bg-[#FF0055] text-white font-black text-xs px-3 py-1 uppercase rotate-[-2deg] mb-3">
              ★ CAREER ACCELERATION TRACK ★
            </div>
            <h1 className="font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter">
              BATTLE MILESTONES!
            </h1>
            <p className="font-bold text-lg text-slate-800 mt-2">
              Every role delivered critical infrastructure, low-latency caches, and high-concurrency platforms.
            </p>
          </header>

          <div className="space-y-10">
            {roles.map((r, i) => {
              const bgColors = ['bg-[#00E5FF]', 'bg-[#FF8A00]', 'bg-[#00FF66]'];
              const bg = bgColors[i % bgColors.length];
              return (
                <div key={r.id} className={`border-4 border-black p-8 ${bg} shadow-[10px_10px_0px_#000] space-y-6`}>
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black pb-4">
                    <div>
                      <span className="bg-black text-white font-black text-xs px-2 py-0.5 uppercase">
                        {r.period}
                      </span>
                      <h2 className="font-black text-3xl sm:text-4xl uppercase mt-1">{r.company}</h2>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-lg uppercase bg-white border-2 border-black px-3 py-1 inline-block shadow-[2px_2px_0px_#000]">
                        {r.role}
                      </span>
                    </div>
                  </div>

                  <p className="font-bold text-base text-slate-900 leading-snug">
                    {r.story}
                  </p>

                  <div className="border-2 border-black p-4 bg-white space-y-2">
                    <span className="font-black text-xs uppercase bg-[#FF0055] text-white px-2 py-0.5 inline-block">
                      DELIVERABLES:
                    </span>
                    <ul className="space-y-1 text-sm font-bold text-slate-800">
                      {r.outcomes.map((o, idx) => (
                        <li key={idx}>★ {o}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {r.stack.map((s) => (
                      <span key={s} className="px-2.5 py-1 bg-black text-white font-black text-xs uppercase">
                        {s}
                      </span>
                    ))}
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
  // 3. JAPANDI POP EXPERIENCE (Vertical Scroll)
  // =========================================================================
  if (universe === 'japandi') {
    return (
      <div className="min-h-screen bg-[#F4EFEA] text-[#2C2926] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-4xl mx-auto space-y-20">
          <header className="border-b border-[#2C2926]/10 pb-8 flex items-start justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#B35446] block mb-2">
                経歴記録 · CAREER CHRONOLOGY
              </span>
              <h1 className="font-serif text-5xl sm:text-7xl text-[#2C2926]">
                Experience.
              </h1>
              <p className="text-base text-[#7D756C] mt-2 max-w-md">
                Disciplined engineering across production environments. Measured in impact and enduring quality.
              </p>
            </div>
            <div className="w-12 h-12 rounded border border-[#B35446] flex items-center justify-center text-[#B35446] font-serif font-bold text-lg">
              歴
            </div>
          </header>

          <div className="border-l border-[#2C2926]/20 pl-8 space-y-16">
            {roles.map((r) => (
              <div key={r.id} className="relative space-y-4">
                <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full border-2 border-[#B35446] bg-[#F4EFEA]" />
                <div className="flex flex-wrap items-baseline gap-4">
                  <h2 className="font-serif text-2xl text-[#2C2926]">{r.company}</h2>
                  <span className="font-mono text-xs text-[#B35446]">[{r.period}]</span>
                </div>
                <div className="font-serif italic text-sm text-[#7D756C]">{r.role} · {r.mode}</div>
                <p className="text-sm text-[#4A453E] leading-relaxed">
                  {r.story}
                </p>
                <ul className="space-y-1.5 text-xs text-[#7D756C]">
                  {r.outcomes.map((o, idx) => (
                    <li key={idx}>・{o}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. SWISS EXPERIENCE (12-Column Grid)
  // =========================================================================
  if (universe === 'swiss') {
    return (
      <div className="min-h-screen bg-[#F0F0EE] text-black px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-6xl mx-auto space-y-16">
          <header className="border-t-4 border-b-2 border-black py-8 grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E62B1E] block mb-1">
                SYSTEM 03 // BERUFLICHE LAUFBAHN
              </span>
              <h1 className="font-black text-5xl sm:text-7xl uppercase tracking-tighter">
                CAREER MATRIX
              </h1>
            </div>
            <div className="col-span-12 md:col-span-4 flex justify-end">
              <span className="font-mono text-xs uppercase font-bold text-slate-600">
                TOTAL: 3 POSITIONEN
              </span>
            </div>
          </header>

          <div className="border-t-2 border-black divide-y-2 divide-black">
            {roles.map((r, i) => (
              <div key={r.id} className="py-8 grid grid-cols-12 gap-6 items-start">
                <div className="col-span-12 sm:col-span-3">
                  <div className="font-mono text-xs font-bold text-[#E62B1E] uppercase">
                    0{i + 1} / {r.period}
                  </div>
                  <h2 className="font-black text-2xl uppercase mt-1">{r.company}</h2>
                  <div className="font-mono text-xs text-slate-600 mt-1 uppercase">{r.role}</div>
                </div>

                <div className="col-span-12 sm:col-span-9 space-y-4">
                  <p className="text-sm font-medium text-slate-800 leading-relaxed">
                    {r.story}
                  </p>
                  <div className="space-y-1 text-xs text-slate-700">
                    {r.outcomes.map((o, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-[#E62B1E]">+</span>
                        <span>{o}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {r.stack.map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-black text-white text-[11px] font-bold uppercase">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 5. BRUTALIST EXPERIENCE (Raw Chronological Syslog)
  // =========================================================================
  if (universe === 'brutalist') {
    return (
      <div className="min-h-screen bg-black text-[#E0E0E0] px-4 sm:px-8 py-16 font-mono">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="border border-white p-6 bg-[#111] space-y-3">
            <div className="text-xs text-[#FFEB3B] font-bold">
              ~/PRIT/CAREER_SYSLOG.SH [CHRONOLOGICAL_AUDIT]
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold uppercase text-white">
              $ CAT /VAR/LOG/EXPERIENCE
            </h1>
            <p className="text-xs text-slate-400">
              Verified operational history and deployed backend microservices.
            </p>
          </header>

          <div className="space-y-6">
            {roles.map((r, i) => (
              <div key={r.id} className="border border-zinc-700 p-6 space-y-4 bg-[#0a0a0a]">
                <div className="flex flex-wrap items-center justify-between text-xs text-[#FFEB3B]">
                  <span>[ENTRY_0{i + 1}] {r.company.toUpperCase()}</span>
                  <span>{r.period}</span>
                </div>
                <div className="text-lg font-bold text-white uppercase">{r.role}</div>
                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  {r.story}
                </p>
                <div className="border-t border-zinc-800 pt-3 space-y-1 text-xs text-zinc-400">
                  {r.outcomes.map((o, idx) => (
                    <div key={idx}>&gt; {o}</div>
                  ))}
                </div>
                <div className="text-[11px] text-zinc-500 pt-2">
                  RUNTIME: {r.stack.join(' // ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 6. NOIR EXPERIENCE (Cinematic Chapters)
  // =========================================================================
  if (universe === 'noir') {
    return (
      <div className="min-h-screen bg-[#080808] text-[#E5E5E5] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-5xl mx-auto space-y-20">
          <header className="border-b border-zinc-800 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF9500] block mb-2">
                SCENARIOS · RECORD OF ENGAGEMENTS
              </span>
              <h1 className="font-serif italic text-5xl sm:text-7xl text-white">
                Battle Chapters.
              </h1>
              <p className="text-sm text-zinc-400 mt-2 max-w-lg">
                Three operational tenures in production software environments.
              </p>
            </div>
            <div className="font-mono text-xs text-zinc-500">
              FRAME // 02.ENGAGEMENTS
            </div>
          </header>

          <div className="space-y-16">
            {roles.map((r, i) => (
              <article key={r.id} className="p-8 rounded bg-zinc-950 border border-zinc-800 space-y-6">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span className="text-[#FF9500]">REEL 0{i + 1}</span>
                  <span>{r.period}</span>
                </div>
                <div>
                  <h2 className="font-serif italic text-3xl text-white">{r.company}</h2>
                  <div className="font-mono text-xs text-[#FF9500] uppercase mt-1">{r.role} · {r.mode}</div>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed font-light">
                  {r.story}
                </p>
                <div className="space-y-1.5 border-t border-zinc-900 pt-4 text-xs text-zinc-400">
                  {r.outcomes.map((o, idx) => (
                    <div key={idx}>▪ {o}</div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 7. ARCHIVE EXPERIENCE (Indexed Records)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#E2E8F0] px-4 sm:px-8 md:px-12 py-16 font-mono">
      <div className="max-w-5xl mx-auto space-y-16">
        <header className="border border-cyan-800/40 p-8 rounded bg-[#111827]/60 space-y-3">
          <div className="flex items-center gap-2 text-xs text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>ARCHIVE LEDGER // PROFESSIONAL ENGAGEMENTS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
            SERVICE LEDGER
          </h1>
          <p className="font-sans text-sm text-slate-300 max-w-xl">
            Correlated employment record and verified infrastructural outcomes.
          </p>
        </header>

        <div className="space-y-8">
          {roles.map((r, i) => (
            <div key={r.id} className="p-6 rounded border border-cyan-800/40 bg-[#111827]/40 space-y-4">
              <div className="flex flex-wrap items-center justify-between text-xs text-cyan-400">
                <span>SERVICE_RECORD // 0{i + 1}</span>
                <span>{r.period}</span>
              </div>
              <h2 className="text-2xl font-bold text-white">{r.company}</h2>
              <div className="text-xs text-cyan-300 uppercase">{r.role} // {r.mode}</div>
              <p className="font-sans text-sm text-slate-300 leading-relaxed">
                {r.story}
              </p>
              <div className="space-y-1 text-xs text-slate-400 border-t border-cyan-900/40 pt-3">
                {r.outcomes.map((o, idx) => (
                  <div key={idx}>[OK] {o}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
