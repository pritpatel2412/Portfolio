'use client';

import React from 'react';
import Link from 'next/link';
import { Download, ExternalLink, FileText, ArrowUpRight, CheckCircle2, GraduationCap, Briefcase, Award } from 'lucide-react';
import { useUniverse } from '@/lib/universe';
import resumeData from '@/content/resume.json';

const RESUME_DRIVE_URL = 'https://drive.google.com/file/d/1Bt-CZQPBR7nR3JIpSOiYxlooDv3V93MS/view?usp=drive_link';

export function UniverseResumeView() {
  const { universe } = useUniverse();
  const { basics, work, education, skills, projects } = resumeData;

  // Shared metadata header values
  const docMeta = {
    edition: '2026.IV',
    version: 'v3.2.0-PROD',
    year: '2026',
    name: basics.name,
  };

  // =========================================================================
  // 1. EDITORIAL RESUME (Typeset Print Monograph)
  // =========================================================================
  if (universe === 'editorial') {
    return (
      <div className="min-h-screen bg-[#F7F2EB] text-[#1A1816] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Metadata Dossier Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#1A1816]/20 pb-4 font-mono text-xs uppercase tracking-widest text-[#6B645C]">
            <span>EDITION: {docMeta.edition}</span>
            <span>VERSION: {docMeta.version}</span>
            <span>YEAR: {docMeta.year}</span>
            <span className="text-[#B43A12] font-bold">NAME: {docMeta.name}</span>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white/70 p-6 rounded border border-[#1A1816]/10 shadow-sm">
            <div>
              <h2 className="font-serif font-black text-2xl text-[#1A1816]">Curriculum Vitae</h2>
              <p className="font-serif italic text-xs text-[#6B645C]">Standard A4 PDF ready for formal executive review.</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={RESUME_DRIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-[#1A1816] font-mono text-xs uppercase tracking-wider text-[#1A1816] hover:bg-[#1A1816] hover:text-[#F7F2EB] transition-colors inline-flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" /> VIEW PDF
              </a>
              <a
                href={RESUME_DRIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#B43A12] font-mono text-xs uppercase tracking-wider text-white hover:bg-[#1A1816] transition-colors inline-flex items-center gap-1.5 font-bold"
              >
                <Download className="w-3.5 h-3.5" /> DOWNLOAD
              </a>
            </div>
          </div>

          {/* Typeset Editorial Document */}
          <article className="bg-white p-8 sm:p-14 rounded shadow-md border border-[#1A1816]/10 space-y-12">
            <header className="border-b border-[#1A1816]/20 pb-8 text-center space-y-3">
              <h1 className="font-serif font-black text-4xl sm:text-5xl text-[#1A1816]">{basics.name}</h1>
              <p className="font-serif italic text-lg text-[#B43A12]">{basics.label}</p>
              <div className="font-mono text-xs text-[#6B645C] space-x-3">
                <span>{basics.email}</span>
                <span>•</span>
                <span>{basics.location.city}, {basics.location.region}</span>
                <span>•</span>
                <span>leetcode.com/u/prit__2412</span>
              </div>
            </header>

            {/* Experience */}
            <section className="space-y-6">
              <h2 className="font-serif font-black text-2xl text-[#1A1816] border-b border-[#1A1816]/15 pb-2">
                I. Professional Engagements
              </h2>
              <div className="space-y-6">
                {work.map((w, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex flex-wrap items-baseline justify-between">
                      <h3 className="font-serif font-bold text-lg text-[#1A1816]">{w.name}</h3>
                      <span className="font-mono text-xs text-[#6B645C]">{w.startDate} — {w.endDate || 'Present'}</span>
                    </div>
                    <div className="font-serif italic text-sm text-[#B43A12]">{w.position}</div>
                    <p className="font-serif text-sm text-[#4A453E] leading-relaxed">{w.summary}</p>
                    <ul className="list-disc list-inside text-xs text-[#4A453E] space-y-1">
                      {w.highlights.map((h, idx) => (
                        <li key={idx}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Education & Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#1A1816]/15 pt-8">
              <section className="space-y-4">
                <h2 className="font-serif font-black text-xl text-[#1A1816]">II. Education</h2>
                <div className="space-y-1">
                  <div className="font-serif font-bold text-base">{education[0].institution}</div>
                  <div className="font-mono text-xs text-[#B43A12]">B.Tech in Computer Science · 9.67 GPA</div>
                  <div className="text-xs text-[#6B645C] pt-2">Coursework: {education[0].courses.join(', ')}</div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif font-black text-xl text-[#1A1816]">III. Core Capabilities</h2>
                <div className="space-y-3">
                  {skills.map((s, i) => (
                    <div key={i} className="text-xs">
                      <strong className="font-mono text-[#1A1816] block mb-1">{s.name}:</strong>
                      <span className="text-[#6B645C]">{s.keywords.join(' · ')}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </article>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. NEO MAXIMALIST RESUME (Graphic Poster CV)
  // =========================================================================
  if (universe === 'maximalist') {
    return (
      <div className="min-h-screen bg-[#FFF952] text-black px-4 sm:px-8 md:px-12 py-16 font-sans selection:bg-[#FF0055] selection:text-white">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header Bar */}
          <div className="border-4 border-black p-4 bg-white shadow-[6px_6px_0px_#000] flex flex-wrap items-center justify-between gap-4">
            <div className="font-black text-xs uppercase space-x-2">
              <span className="bg-[#FF0055] text-white px-2 py-0.5">EDITION: {docMeta.edition}</span>
              <span className="bg-[#00E5FF] px-2 py-0.5">VER: {docMeta.version}</span>
              <span className="bg-[#FF8A00] px-2 py-0.5">{docMeta.year}</span>
            </div>
            <div className="flex gap-2">
              <a
                href={RESUME_DRIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 border-2 border-black bg-[#00FF66] font-black text-xs uppercase shadow-[2px_2px_0px_#000] hover:bg-black hover:text-white transition-colors"
              >
                VIEW PDF ↗
              </a>
              <a
                href={RESUME_DRIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 border-2 border-black bg-[#FF0055] text-white font-black text-xs uppercase shadow-[2px_2px_0px_#000] hover:bg-black transition-colors"
              >
                DOWNLOAD ↓
              </a>
            </div>
          </div>

          {/* Graphic Document */}
          <article className="border-4 border-black p-8 sm:p-12 bg-white shadow-[12px_12px_0px_#000] space-y-10">
            <header className="border-b-4 border-black pb-6 space-y-2">
              <h1 className="font-black text-5xl sm:text-6xl uppercase tracking-tight">{basics.name}!</h1>
              <p className="font-black text-lg bg-[#FF8A00] inline-block px-3 py-1 uppercase">{basics.label}</p>
              <div className="font-bold text-xs text-slate-700 pt-2">
                {basics.email} · {basics.location.city}, {basics.location.region} · 400+ LEETCODE
              </div>
            </header>

            <section className="space-y-6">
              <h2 className="font-black text-2xl uppercase bg-black text-white px-3 py-1 inline-block">
                ★ WORK EXPERIENCES
              </h2>
              <div className="space-y-6">
                {work.map((w, i) => (
                  <div key={i} className="border-2 border-black p-4 bg-[#F0F0F0] space-y-2">
                    <div className="flex justify-between font-black text-base uppercase">
                      <span>{w.name} — {w.position}</span>
                      <span className="text-xs bg-[#FF0055] text-white px-2 py-0.5">{w.startDate}</span>
                    </div>
                    <p className="font-bold text-xs text-slate-800">{w.summary}</p>
                  </div>
                ))}
              </div>
            </section>
          </article>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. JAPANDI POP RESUME (Wabi-Sabi Minimalist CV)
  // =========================================================================
  if (universe === 'japandi') {
    return (
      <div className="min-h-screen bg-[#F4EFEA] text-[#2C2926] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="flex items-center justify-between text-xs font-mono text-[#7D756C] border-b border-[#2C2926]/10 pb-4">
            <span>版: {docMeta.edition} · {docMeta.year}</span>
            <span>氏名: {docMeta.name}</span>
            <div className="flex gap-4">
              <a href={RESUME_DRIVE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#B35446]">閲覧 · VIEW PDF ↗</a>
              <a href={RESUME_DRIVE_URL} target="_blank" rel="noopener noreferrer" className="text-[#B35446] font-bold">保存 · DOWNLOAD</a>
            </div>
          </div>

          <article className="p-8 sm:p-12 rounded-lg bg-white/70 border border-[#2C2926]/10 space-y-10 shadow-sm">
            <header className="border-b border-[#2C2926]/10 pb-6">
              <h1 className="font-serif text-4xl text-[#2C2926]">{basics.name}</h1>
              <p className="font-serif italic text-base text-[#B35446] mt-1">{basics.label}</p>
              <div className="text-xs font-mono text-[#7D756C] mt-2">{basics.email} · {basics.location.city}</div>
            </header>

            <section className="space-y-6">
              <h2 className="font-serif text-xl text-[#2C2926]">職務経歴 · Work History</h2>
              <div className="space-y-4">
                {work.map((w, i) => (
                  <div key={i} className="space-y-1 border-l border-[#B35446] pl-4">
                    <div className="text-base font-serif text-[#2C2926]">{w.name} <span className="text-xs text-[#7D756C] font-mono">({w.startDate})</span></div>
                    <div className="text-xs text-[#B35446]">{w.position}</div>
                    <p className="text-xs text-[#7D756C] leading-relaxed">{w.summary}</p>
                  </div>
                ))}
              </div>
            </section>
          </article>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. SWISS RESUME (12-Column Typographic System)
  // =========================================================================
  if (universe === 'swiss') {
    return (
      <div className="min-h-screen bg-[#F0F0EE] text-black px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-5xl mx-auto space-y-12">
          <header className="border-t-4 border-b-2 border-black py-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase font-bold text-[#E62B1E] block">
                DOKUMENT // LEBENSLAUF
              </span>
              <h1 className="font-black text-4xl sm:text-5xl uppercase tracking-tighter">
                {docMeta.name}
              </h1>
            </div>
            <div className="flex gap-3">
              <a
                href={RESUME_DRIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white text-black border border-black font-bold text-xs uppercase hover:bg-black hover:text-white transition-colors"
              >
                PDF ÖFFNEN ↗
              </a>
              <a
                href={RESUME_DRIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#E62B1E] text-white font-bold text-xs uppercase hover:bg-black transition-colors"
              >
                DOWNLOAD
              </a>
            </div>
          </header>

          <article className="border-2 border-black bg-white p-8 sm:p-12 divide-y-2 divide-black space-y-8">
            <div className="grid grid-cols-12 gap-6 pb-8">
              <div className="col-span-12 sm:col-span-4 font-black text-xl uppercase">01 / KONTAKT</div>
              <div className="col-span-12 sm:col-span-8 font-mono text-xs space-y-1">
                <div>EMAIL: {basics.email}</div>
                <div>ORT: {basics.location.city}, {basics.location.region}</div>
                <div>STATUS: B.TECH CSE · 9.67 GPA</div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6 py-8">
              <div className="col-span-12 sm:col-span-4 font-black text-xl uppercase">02 / POSITIONEN</div>
              <div className="col-span-12 sm:col-span-8 space-y-6">
                {work.map((w, i) => (
                  <div key={i} className="space-y-1">
                    <div className="font-bold text-base uppercase">{w.name} — {w.position}</div>
                    <div className="font-mono text-xs text-[#E62B1E]">{w.startDate}</div>
                    <p className="text-xs text-slate-700">{w.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 5. BRUTALIST RESUME (Raw RFC Markdown Document)
  // =========================================================================
  if (universe === 'brutalist') {
    return (
      <div className="min-h-screen bg-black text-[#E0E0E0] px-4 sm:px-8 py-16 font-mono">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="border border-white p-4 bg-[#111] flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-[#FFEB3B]">
              EDITION: {docMeta.edition} | VER: {docMeta.version} | YR: {docMeta.year}
            </div>
            <div className="flex gap-2">
              <a href={RESUME_DRIVE_URL} target="_blank" rel="noopener noreferrer" className="px-3 py-1 border border-white text-xs hover:bg-white hover:text-black">
                VIEW_PDF ↗
              </a>
              <a href={RESUME_DRIVE_URL} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-[#FFEB3B] text-black font-bold text-xs">
                WGET_RESUME.PDF
              </a>
            </div>
          </div>

          <article className="border border-zinc-700 p-6 sm:p-10 bg-[#0a0a0a] space-y-8">
            <div className="border-b border-zinc-800 pb-4">
              <h1 className="text-3xl font-bold uppercase text-white"># RESUME_{basics.name.toUpperCase().replace(' ', '_')}</h1>
              <div className="text-xs text-zinc-400 mt-1">&gt; {basics.label}</div>
            </div>

            <div className="space-y-4">
              <div className="text-xs text-[#FFEB3B] uppercase">== 01. WORK_HISTORY ==</div>
              {work.map((w, i) => (
                <div key={i} className="border border-zinc-800 p-4 space-y-1 text-xs">
                  <div className="text-white font-bold">{w.name} [{w.position}]</div>
                  <div className="text-zinc-500">START: {w.startDate}</div>
                  <p className="text-zinc-400 font-sans">{w.summary}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 6. NOIR RESUME (Confidential Operative Dossier)
  // =========================================================================
  if (universe === 'noir') {
    return (
      <div className="min-h-screen bg-[#080808] text-[#E5E5E5] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="border-b border-zinc-800 pb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF9500] block">
                DOSSIER DECLASSIFIED // {docMeta.edition}
              </span>
              <h1 className="font-serif italic text-4xl text-white">{docMeta.name}.</h1>
            </div>
            <div className="flex gap-3">
              <a href={RESUME_DRIVE_URL} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white uppercase">
                EXAMINE DOSSIER ↗
              </a>
              <a href={RESUME_DRIVE_URL} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#FF9500] text-black font-bold text-xs font-mono uppercase">
                RETRIEVE PDF
              </a>
            </div>
          </header>

          <article className="p-8 rounded bg-zinc-950 border border-zinc-800 space-y-8">
            <h2 className="font-serif italic text-2xl text-white">Record of Assignments</h2>
            <div className="space-y-6">
              {work.map((w, i) => (
                <div key={i} className="border-l-2 border-[#FF9500] pl-4 space-y-1">
                  <div className="font-serif italic text-lg text-white">{w.name} — {w.position}</div>
                  <div className="font-mono text-xs text-zinc-500">{w.startDate}</div>
                  <p className="text-xs text-zinc-400 font-light">{w.summary}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 7. ARCHIVE RESUME (Laboratory Accession Dossier)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#E2E8F0] px-4 sm:px-8 md:px-12 py-16 font-mono">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="border border-cyan-800/40 p-4 rounded bg-[#111827]/60 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-cyan-400">
            [ACCESSION: {docMeta.edition}] [REV: {docMeta.version}]
          </div>
          <div className="flex gap-3">
            <a href={RESUME_DRIVE_URL} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 border border-cyan-500/40 text-cyan-300 text-xs">
              INSPECT_FILE ↗
            </a>
            <a href={RESUME_DRIVE_URL} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-cyan-500 text-black font-bold text-xs">
              DOWNLOAD_DOCUMENT
            </a>
          </div>
        </div>

        <article className="border border-cyan-800/30 p-8 rounded bg-[#111827]/40 space-y-8">
          <header className="border-b border-cyan-800/40 pb-4">
            <h1 className="text-3xl font-black text-white">{basics.name}</h1>
            <div className="text-xs text-cyan-400 uppercase mt-1">{basics.label}</div>
          </header>

          <section className="space-y-4">
            <span className="text-xs text-cyan-400 uppercase font-bold block">VERIFIED ASSIGNMENTS:</span>
            {work.map((w, i) => (
              <div key={i} className="p-4 rounded bg-[#0B0F17] border border-cyan-900/40 space-y-1 text-xs">
                <div className="text-white font-bold">{w.name} [{w.position}]</div>
                <p className="text-slate-300 font-sans">{w.summary}</p>
              </div>
            ))}
          </section>
        </article>
      </div>
    </div>
  );
}
