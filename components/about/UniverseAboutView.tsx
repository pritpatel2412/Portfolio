'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Award, BookOpen, Terminal, Sparkles, CheckCircle2, Cpu } from 'lucide-react';
import { useUniverse } from '@/lib/universe';
import profileData from '@/content/profile.json';

export function UniverseAboutView() {
  const { universe } = useUniverse();
  const { name, role, portrait, aboutParagraphs, principles, uses, currently, proofPoints, joke } = profileData;

  // =========================================================================
  // 1. EDITORIAL ABOUT (Magazine Feature Profile)
  // =========================================================================
  if (universe === 'editorial') {
    return (
      <div className="min-h-screen bg-[#F7F2EB] text-[#1A1816] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-5xl mx-auto space-y-20">
          <header className="border-b border-[#1A1816]/20 pb-12">
            <div className="flex flex-wrap items-center justify-between font-mono text-xs uppercase tracking-widest text-[#6B645C] border-b border-[#1A1816]/10 pb-3 mb-6">
              <span>PROFILE FEATURE · VOL. 2026</span>
              <span>BIOGRAPHY &amp; DOCTRINE</span>
              <span className="text-[#B43A12]">VADODARA, GUJARAT</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              <div className="md:col-span-8">
                <h1 className="font-serif font-black text-6xl sm:text-8xl tracking-tight leading-[0.9]">
                  Architecting <br />
                  <span className="italic font-normal">Determinism.</span>
                </h1>
              </div>
              <div className="md:col-span-4">
                <span className="font-mono text-xs uppercase text-[#B43A12] block mb-1 font-bold">
                  {role}
                </span>
                <p className="font-serif italic text-sm text-[#6B645C]">
                  A personal monograph on writing verifiable algorithms, distributed swarms, and high-performance interfaces.
                </p>
              </div>
            </div>
          </header>

          {/* Profile Double Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="relative aspect-[3/4] w-full rounded overflow-hidden shadow-xl border border-[#1A1816]/10 bg-white">
                <Image
                  src={portrait}
                  alt={name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              </div>
              <div className="font-mono text-[11px] text-[#6B645C] border-t border-[#1A1816]/10 pt-3">
                FIG. 01 — PRIT PATEL IN VADODARA. 9.67 GPA IN COMPUTER SCIENCE, 400+ LEETCODE ALGORITHMIC SOLUTIONS SHIPPED.
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8 font-serif">
              <p className="text-xl sm:text-2xl text-[#1A1816] leading-relaxed first-letter:float-left first-letter:text-6xl first-letter:font-black first-letter:mr-3 first-letter:text-[#B43A12]">
                {aboutParagraphs[0]}
              </p>
              <p className="text-base sm:text-lg text-[#4A453E] leading-relaxed">
                {aboutParagraphs[1]}
              </p>
              <p className="text-base sm:text-lg text-[#4A453E] leading-relaxed">
                {aboutParagraphs[2]}
              </p>

              <blockquote className="border-l-2 border-[#B43A12] pl-6 py-2 my-6 italic text-[#1A1816] text-lg font-serif">
                &ldquo;Proof before poetry: Every engineering claim must be backed by reproducible benchmark metrics and unit tests.&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Principles Manifesto */}
          <section className="border-t border-[#1A1816]/20 pt-16 space-y-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#B43A12] block">
              THE DOCTRINE · FIVE ENGINEERING PRINCIPLES
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
              {principles.map((pr) => (
                <div key={pr.num} className="p-6 rounded bg-white/70 border border-[#1A1816]/10 space-y-2">
                  <span className="font-mono text-xs text-[#B43A12] font-bold block">
                    PRINCIPLE {pr.num}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-[#1A1816]">{pr.title}</h3>
                  <p className="text-sm text-[#6B645C] leading-relaxed">{pr.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. NEO MAXIMALIST ABOUT (Visual Identity Poster)
  // =========================================================================
  if (universe === 'maximalist') {
    return (
      <div className="min-h-screen bg-[#FFF952] text-black px-4 sm:px-8 md:px-12 py-16 font-sans selection:bg-[#FF0055] selection:text-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <header className="border-4 border-black p-8 bg-white shadow-[10px_10px_0px_#000]">
            <div className="inline-block bg-[#FF0055] text-white font-black text-xs px-3 py-1 uppercase rotate-[-2deg] mb-3">
              ★ WHO AM I? HERE IS THE REAL TALK ★
            </div>
            <h1 className="font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter">
              MEET PRIT PATEL!
            </h1>
            <p className="font-bold text-xl text-slate-800 mt-2">
              Full-Stack &amp; AI Systems Developer building high-speed resilient web engines.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Polaroid with Washi Tape */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-4 pb-12 bg-white border-4 border-black shadow-[10px_10px_0px_#000] rotate-[-2deg] max-w-sm w-full">
                <div className="absolute -top-3 left-1/3 w-28 h-6 bg-[#00E5FF]/80 border border-black/40 rotate-[3deg] shadow-sm" />
                <div className="relative aspect-square w-full border-2 border-black overflow-hidden bg-slate-100">
                  <Image
                    src={portrait}
                    alt={name}
                    fill
                    priority
                    className="object-cover"
                    sizes="350px"
                  />
                </div>
                <div className="mt-4 font-black text-center text-sm uppercase tracking-wider text-black">
                  PRIT PATEL · VADODARA 2026
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="border-4 border-black p-6 bg-[#00E5FF] shadow-[8px_8px_0px_#000] space-y-4">
                <h2 className="font-black text-2xl uppercase">THE IDENTITY BRIEF</h2>
                <p className="font-bold text-base leading-relaxed text-slate-900">
                  {aboutParagraphs[0]}
                </p>
                <p className="font-bold text-sm leading-relaxed text-slate-800">
                  {aboutParagraphs[1]}
                </p>
              </div>

              {/* Joke Speech Bubble */}
              <div className="border-4 border-black p-5 bg-[#FF0055] text-white shadow-[6px_6px_0px_#000] space-y-2 rotate-[1deg]">
                <div className="font-black text-xs uppercase bg-black inline-block px-2 py-0.5">
                  DEBUGGING CONFESSION:
                </div>
                <p className="font-black text-base italic">
                  &ldquo;{joke}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Graphic Rule Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {principles.slice(0, 3).map((pr, i) => (
              <div key={pr.num} className="border-4 border-black p-5 bg-white shadow-[6px_6px_0px_#000] space-y-2">
                <span className="font-black text-xs bg-[#FF8A00] text-black px-2 py-0.5 uppercase">
                  RULE 0{i + 1}
                </span>
                <h3 className="font-black text-xl uppercase">{pr.title}</h3>
                <p className="font-bold text-xs text-slate-700">{pr.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. JAPANDI POP ABOUT (Quiet Personal Portrait)
  // =========================================================================
  if (universe === 'japandi') {
    return (
      <div className="min-h-screen bg-[#F4EFEA] text-[#2C2926] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-4xl mx-auto space-y-20">
          <header className="border-b border-[#2C2926]/10 pb-8 flex items-start justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#B35446] block mb-2">
                人物紹介 · PERSONAL ESSENCE
              </span>
              <h1 className="font-serif text-5xl sm:text-7xl text-[#2C2926]">
                About Prit.
              </h1>
              <p className="text-base text-[#7D756C] mt-2 max-w-md">
                Systems engineer grounded in calm precision, computational rigor, and intentional software architecture.
              </p>
            </div>
            <div className="w-14 h-14 rounded-full border border-[#B35446] flex items-center justify-center text-[#B35446] font-serif font-bold text-xl">
              印
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5">
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-[#2C2926]/15 bg-[#EAE4DC] shadow-sm">
                <Image
                  src={portrait}
                  alt={name}
                  fill
                  priority
                  className="object-cover"
                  sizes="350px"
                />
              </div>
            </div>

            <div className="md:col-span-7 space-y-6 font-serif text-[#4A453E]">
              <p className="text-lg leading-relaxed text-[#2C2926]">
                {aboutParagraphs[0]}
              </p>
              <p className="text-sm leading-relaxed text-[#7D756C]">
                {aboutParagraphs[1]}
              </p>
              <div className="pt-4 border-t border-[#2C2926]/10 flex items-center gap-6 text-xs font-mono text-[#B35446]">
                <span>GPA: 9.67</span>
                <span>400+ LEETCODE</span>
                <span>VADODARA, IN</span>
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-10 border-t border-[#2C2926]/10">
            <h2 className="font-serif text-2xl text-[#2C2926]">設計の美徳 · Core Tenets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {principles.slice(0, 4).map((pr) => (
                <div key={pr.num} className="p-5 rounded bg-white/50 border border-[#2C2926]/10 space-y-2">
                  <span className="font-mono text-xs text-[#B35446]">0{pr.num}</span>
                  <h3 className="font-serif text-lg text-[#2C2926]">{pr.title}</h3>
                  <p className="text-xs text-[#7D756C] leading-relaxed">{pr.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. SWISS ABOUT (Structured Identity System)
  // =========================================================================
  if (universe === 'swiss') {
    return (
      <div className="min-h-screen bg-[#F0F0EE] text-black px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-6xl mx-auto space-y-16">
          <header className="border-t-4 border-b-2 border-black py-8 grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E62B1E] block mb-1">
                SYSTEM 01 // IDENTITÄTSDOKUMENT
              </span>
              <h1 className="font-black text-5xl sm:text-7xl uppercase tracking-tighter">
                PRIT PATEL
              </h1>
            </div>
            <div className="col-span-12 md:col-span-4 flex justify-end">
              <span className="font-mono text-xs uppercase font-bold text-slate-600">
                INFORMATIK · 9.67 GPA
              </span>
            </div>
          </header>

          <div className="grid grid-cols-12 gap-8 border-b-2 border-black pb-12 items-start">
            <div className="col-span-12 md:col-span-4">
              <div className="relative aspect-[3/4] w-full border-2 border-black overflow-hidden bg-white">
                <Image
                  src={portrait}
                  alt={name}
                  fill
                  priority
                  className="object-cover"
                  sizes="350px"
                />
              </div>
            </div>

            <div className="col-span-12 md:col-span-8 space-y-6">
              <h2 className="font-black text-3xl uppercase tracking-tight">
                01 / PHILOSOPHIE &amp; PRAXIS
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-slate-800 font-medium">
                {aboutParagraphs[0]}
              </p>
              <p className="text-sm leading-relaxed text-slate-700">
                {aboutParagraphs[1]}
              </p>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black">
                {proofPoints.map((pt, i) => (
                  <div key={i}>
                    <div className="font-mono text-[10px] text-[#E62B1E] uppercase font-bold">BEWEIS 0{i+1}</div>
                    <div className="font-black text-2xl">{pt.value}</div>
                    <div className="text-[11px] text-slate-600 uppercase">{pt.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 5. BRUTALIST ABOUT (Developer Spec Sheet)
  // =========================================================================
  if (universe === 'brutalist') {
    return (
      <div className="min-h-screen bg-black text-[#E0E0E0] px-4 sm:px-8 py-16 font-mono">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="border border-white p-6 bg-[#111] space-y-3">
            <div className="text-xs text-[#FFEB3B] font-bold">
              ~/PRIT/SPECS.ENV [OPERATOR_PROFILE_DUMP]
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold uppercase text-white">
              $ CAT /PROC/OPERATOR
            </h1>
            <p className="text-xs text-slate-400">
              Raw telemetry and verified credentials of the system architect.
            </p>
          </header>

          <div className="border border-zinc-700 p-6 space-y-6 bg-[#0a0a0a]">
            <div className="text-xs text-[#FFEB3B] uppercase">== BIOLOGICAL_OPERATOR ==</div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4">
                <div className="relative aspect-[3/4] border border-white overflow-hidden">
                  <Image
                    src={portrait}
                    alt={name}
                    fill
                    priority
                    className="object-cover grayscale"
                    sizes="250px"
                  />
                </div>
              </div>
              <div className="md:col-span-8 space-y-4 text-xs font-sans">
                <p className="text-slate-300 leading-relaxed">
                  {aboutParagraphs[0]}
                </p>
                <p className="text-slate-400 leading-relaxed">
                  {aboutParagraphs[1]}
                </p>
                <div className="font-mono text-[#FFEB3B] text-[11px] pt-2 border-t border-zinc-800">
                  STATUS: 400+ LEETCODE // 9.67 GPA // PRODUCTION READY
                </div>
              </div>
            </div>
          </div>

          <div className="border border-zinc-700 p-6 bg-[#111] space-y-4">
            <div className="text-xs text-[#FFEB3B] uppercase">== RUNTIME_ENVIRONMENT (USES) ==</div>
            <div className="divide-y divide-zinc-800 text-xs">
              {uses.map((u, i) => (
                <div key={i} className="py-2 flex flex-col sm:flex-row justify-between gap-2">
                  <span className="text-zinc-400 font-bold">{u.category}:</span>
                  <span className="text-white font-mono">{u.items}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 6. NOIR ABOUT (Cinematic Character Introduction)
  // =========================================================================
  if (universe === 'noir') {
    return (
      <div className="min-h-screen bg-[#080808] text-[#E5E5E5] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-5xl mx-auto space-y-20">
          <header className="border-b border-zinc-800 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF9500] block mb-2">
                DOSSIER · THE NOCTURNAL PROTAGONIST
              </span>
              <h1 className="font-serif italic text-5xl sm:text-7xl text-white">
                Prit Patel.
              </h1>
              <p className="text-sm text-zinc-400 mt-2 max-w-lg">
                Engineering in silence. Solving complex systems equations while the city sleeps.
              </p>
            </div>
            <div className="font-mono text-xs text-zinc-500">
              FRAME // 03.CHARACTER
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl">
                <Image
                  src={portrait}
                  alt={name}
                  fill
                  priority
                  className="object-cover"
                  sizes="350px"
                />
              </div>
            </div>

            <div className="md:col-span-7 space-y-6">
              <p className="font-serif italic text-xl sm:text-2xl text-zinc-200 leading-relaxed">
                {aboutParagraphs[0]}
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                {aboutParagraphs[1]}
              </p>
              <div className="p-4 rounded bg-zinc-950 border border-zinc-800 font-mono text-xs text-[#FF9500]">
                ACTIVE PURSUIT: {currently.building}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 7. ARCHIVE ABOUT (Personnel Lab Record)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#E2E8F0] px-4 sm:px-8 md:px-12 py-16 font-mono">
      <div className="max-w-5xl mx-auto space-y-16">
        <header className="border border-cyan-800/40 p-8 rounded bg-[#111827]/60 space-y-3">
          <div className="flex items-center gap-2 text-xs text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>PERSONNEL DOSSIER // OPERATOR_PATEL_01</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
            BIOGRAPHICAL RECORD
          </h1>
          <p className="font-sans text-sm text-slate-300 max-w-xl">
            Correlated academic credentials, engineering tenets, and active research directives.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4">
            <div className="relative aspect-[3/4] rounded border border-cyan-800/40 overflow-hidden bg-[#0B0F17]">
              <Image
                src={portrait}
                alt={name}
                fill
                priority
                className="object-cover"
                sizes="300px"
              />
            </div>
          </div>

          <div className="md:col-span-8 p-6 rounded border border-cyan-800/30 bg-[#111827]/40 space-y-4 font-sans text-sm text-slate-300">
            <p className="leading-relaxed text-base text-white">
              {aboutParagraphs[0]}
            </p>
            <p className="leading-relaxed">
              {aboutParagraphs[1]}
            </p>
            <div className="font-mono text-xs text-cyan-400 pt-3 border-t border-cyan-900/40">
              [TELEMETRY: 9.67 GPA // 400+ LEETCODE SOLVED]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
