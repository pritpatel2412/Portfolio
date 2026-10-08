'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Cpu, Layers, Terminal, Sparkles, Database, Code2 } from 'lucide-react';
import { useUniverse } from '@/lib/universe';
import { ALL_PROJECTS } from '@/lib/projects';
import experienceData from '@/content/experience.json';

interface TechItem {
  name: string;
  category: 'AI & Agents' | 'Backend & Data' | 'Frontend & UI' | 'Systems & Tooling';
  projects: string[]; // slugs
  roles: string[]; // role titles
}

const TECH_CATALOG: TechItem[] = [
  // AI & Agents
  { name: 'LLMs', category: 'AI & Agents', projects: ['redforge', 'samvaad', 'rag-eval'], roles: ['Full-Stack & AI Systems Intern'] },
  { name: 'Autonomous Agents', category: 'AI & Agents', projects: ['redforge', 'searchmind'], roles: ['Full-Stack & AI Systems Intern'] },
  { name: 'RAG Pipelines', category: 'AI & Agents', projects: ['searchmind', 'rag-eval'], roles: ['Backend & AI Developer Intern'] },
  { name: 'Vector Databases', category: 'AI & Agents', projects: ['searchmind', 'rag-eval'], roles: ['Backend & AI Developer Intern'] },
  { name: 'FastAPI', category: 'AI & Agents', projects: ['redforge', 'searchmind', 'samvaad', 'rag-eval'], roles: ['Full-Stack & AI Systems Intern', 'Backend & AI Developer Intern'] },
  { name: 'Whisper STT', category: 'AI & Agents', projects: ['samvaad'], roles: ['Full-Stack & AI Systems Intern'] },
  { name: 'Playwright', category: 'AI & Agents', projects: ['redforge', 'searchmind'], roles: ['Full-Stack & AI Systems Intern'] },

  // Backend & Data
  { name: 'Python', category: 'Backend & Data', projects: ['redforge', 'searchmind', 'samvaad', 'rag-eval'], roles: ['Full-Stack & AI Systems Intern', 'Backend & AI Developer Intern'] },
  { name: 'PostgreSQL', category: 'Backend & Data', projects: ['redforge'], roles: ['Backend & AI Developer Intern'] },
  { name: 'Redis', category: 'Backend & Data', projects: ['redforge', 'searchmind', 'samvaad'], roles: ['Backend & AI Developer Intern'] },
  { name: 'Docker', category: 'Backend & Data', projects: ['redforge', 'searchmind'], roles: ['Full-Stack & AI Systems Intern'] },
  { name: 'Celery', category: 'Backend & Data', projects: ['redforge'], roles: ['Full-Stack & AI Systems Intern'] },
  { name: 'Node.js', category: 'Backend & Data', projects: ['kalakriti'], roles: ['Full-Stack & AI Systems Intern'] },
  { name: 'WebSockets', category: 'Backend & Data', projects: ['samvaad', 'kalakriti'], roles: ['Full-Stack & AI Systems Intern'] },

  // Frontend & UI
  { name: 'TypeScript', category: 'Frontend & UI', projects: ['kalakriti', 'portfolio'], roles: ['Full-Stack & AI Systems Intern'] },
  { name: 'React', category: 'Frontend & UI', projects: ['redforge', 'kalakriti', 'portfolio'], roles: ['Full-Stack & AI Systems Intern'] },
  { name: 'Next.js', category: 'Frontend & UI', projects: ['kalakriti', 'portfolio'], roles: ['Full-Stack & AI Systems Intern'] },
  { name: 'Tailwind CSS', category: 'Frontend & UI', projects: ['redforge', 'kalakriti', 'portfolio'], roles: ['Full-Stack & AI Systems Intern'] },
  { name: 'Canvas API', category: 'Frontend & UI', projects: ['kalakriti'], roles: ['Full-Stack & AI Systems Intern'] },

  // Systems & Tooling
  { name: 'Git', category: 'Systems & Tooling', projects: ['redforge', 'searchmind', 'kalakriti'], roles: ['Full-Stack & AI Systems Intern', 'Backend & AI Developer Intern'] },
  { name: 'Linux', category: 'Systems & Tooling', projects: ['redforge', 'searchmind'], roles: ['Backend & AI Developer Intern'] },
  { name: 'REST APIs', category: 'Systems & Tooling', projects: ['searchmind', 'redforge'], roles: ['Backend & AI Developer Intern'] },
];

export function UniverseSkillsView() {
  const { universe } = useUniverse();
  const [activeTech, setActiveTech] = useState<string | null>('FastAPI');

  const selectedItem = TECH_CATALOG.find((t) => t.name === activeTech) || TECH_CATALOG[0];
  const linkedProjects = ALL_PROJECTS.filter((p) => selectedItem.projects.includes(p.slug));

  const categories = ['AI & Agents', 'Backend & Data', 'Frontend & UI', 'Systems & Tooling'] as const;

  // Render per-universe styling
  if (universe === 'editorial') {
    return (
      <div className="min-h-screen bg-[#F7F2EB] text-[#1A1816] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-6xl mx-auto space-y-16">
          <header className="border-b border-[#1A1816]/20 pb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#B43A12] block mb-2">
              SECTION 04 · TAXONOMY OF CAPABILITIES
            </span>
            <h1 className="font-serif font-black text-5xl sm:text-7xl tracking-tight text-[#1A1816]">
              Relational Matrix.
            </h1>
            <p className="font-serif italic text-lg sm:text-xl text-[#6B645C] mt-3 max-w-2xl">
              No arbitrary progress bars. Every skill is mapped directly to shipped production systems and career responsibilities.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-10">
              {categories.map((cat) => (
                <div key={cat} className="space-y-4">
                  <h2 className="font-mono text-xs uppercase tracking-widest text-[#6B645C] border-b border-[#1A1816]/10 pb-2">
                    {cat}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {TECH_CATALOG.filter((t) => t.category === cat).map((tech) => {
                      const isSelected = activeTech === tech.name;
                      return (
                        <button
                          key={tech.name}
                          onClick={() => setActiveTech(tech.name)}
                          onMouseEnter={() => setActiveTech(tech.name)}
                          className={`px-3 py-1.5 rounded-full font-serif text-sm transition-all text-left ${
                            isSelected
                              ? 'bg-[#1A1816] text-[#F7F2EB] shadow-md scale-105'
                              : 'bg-[#1A1816]/5 text-[#1A1816] hover:bg-[#1A1816]/10'
                          }`}
                        >
                          {tech.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5 bg-white/70 border border-[#1A1816]/15 p-6 rounded-lg shadow-sm space-y-6">
              <div className="border-b border-[#1A1816]/10 pb-4">
                <span className="font-mono text-[10px] uppercase text-[#B43A12] tracking-widest block">
                  SELECTED DISCIPLINE
                </span>
                <h3 className="font-serif font-black text-3xl text-[#1A1816]">
                  {selectedItem.name}
                </h3>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase text-[#6B645C] tracking-wider mb-3">
                  LINKED PRODUCTION SYSTEMS ({linkedProjects.length})
                </h4>
                <div className="space-y-3">
                  {linkedProjects.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/projects/${p.slug}`}
                      className="block p-3 rounded border border-[#1A1816]/10 hover:border-[#B43A12] hover:bg-white transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="font-serif text-base text-[#1A1816] group-hover:text-[#B43A12]">
                          {p.title}
                        </strong>
                        <ArrowUpRight className="w-4 h-4 text-[#6B645C] group-hover:text-[#B43A12]" />
                      </div>
                      <p className="text-xs text-[#6B645C] mt-1 line-clamp-2">
                        {p.oneLiner}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase text-[#6B645C] tracking-wider mb-2">
                  VERIFIED IN ROLES
                </h4>
                <ul className="text-xs text-[#1A1816] space-y-1 list-disc list-inside">
                  {selectedItem.roles.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (universe === 'maximalist') {
    return (
      <div className="min-h-screen bg-[#FFF952] text-black px-4 sm:px-8 md:px-12 py-16 font-sans selection:bg-[#FF0055] selection:text-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <header className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_#000000]">
            <div className="inline-block bg-[#FF0055] text-white font-black text-xs px-3 py-1 uppercase rotate-[-2deg] mb-3">
              ★ NO PROGRESS BARS · ONLY SHIPPED CODE ★
            </div>
            <h1 className="font-black text-5xl sm:text-7xl uppercase tracking-tighter">
              THE TECH VAULT!
            </h1>
            <p className="font-bold text-lg text-slate-800 mt-2">
              Hover any badge below to see which real-world battle-tested software runs on it.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-8">
              {categories.map((cat, idx) => {
                const colors = ['bg-[#00E5FF]', 'bg-[#FF8A00]', 'bg-[#7000FF] text-white', 'bg-[#00FF66]'];
                return (
                  <div key={cat} className="border-4 border-black p-5 bg-white shadow-[6px_6px_0px_#000]">
                    <div className={`inline-block font-black text-xs px-2.5 py-1 border-2 border-black uppercase mb-3 ${colors[idx % colors.length]}`}>
                      {cat}
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {TECH_CATALOG.filter((t) => t.category === cat).map((tech) => {
                        const isSelected = activeTech === tech.name;
                        return (
                          <button
                            key={tech.name}
                            onClick={() => setActiveTech(tech.name)}
                            onMouseEnter={() => setActiveTech(tech.name)}
                            className={`px-3 py-2 border-2 border-black font-black text-sm uppercase transition-transform active:translate-y-1 ${
                              isSelected
                                ? 'bg-[#FF0055] text-white shadow-[4px_4px_0px_#000] scale-105'
                                : 'bg-[#F0F0F0] text-black hover:bg-[#FFE600]'
                            }`}
                          >
                            {tech.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-5 border-4 border-black p-6 bg-[#00E5FF] shadow-[8px_8px_0px_#000] space-y-6">
              <div className="border-b-4 border-black pb-4">
                <span className="font-black text-xs bg-black text-white px-2 py-0.5 uppercase">
                  ACTIVE SELECTION
                </span>
                <h3 className="font-black text-4xl uppercase mt-2">
                  {selectedItem.name}
                </h3>
              </div>

              <div>
                <h4 className="font-black text-xs uppercase mb-3">
                  POWERING THESE BUILDS:
                </h4>
                <div className="space-y-3">
                  {linkedProjects.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/projects/${p.slug}`}
                      className="block p-3 border-2 border-black bg-white hover:bg-[#FFE600] shadow-[3px_3px_0px_#000] transition-transform"
                    >
                      <div className="flex items-center justify-between font-black text-base uppercase">
                        <span>{p.title}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                      <p className="text-xs font-medium text-slate-700 mt-1">
                        {p.oneLiner}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (universe === 'japandi') {
    return (
      <div className="min-h-screen bg-[#F4EFEA] text-[#2C2926] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-5xl mx-auto space-y-16">
          <header className="border-b border-[#2C2926]/10 pb-8 flex items-start justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#B35446] block mb-2">
                技術体系 · TECHNOLOGICAL DISCIPLINES
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl text-[#2C2926]">
                Tools &amp; Craft.
              </h1>
              <p className="text-sm text-[#7D756C] mt-2 max-w-lg">
                Crafted in practice. Software tools are quiet instruments, valued only through the works they bring to fruition.
              </p>
            </div>
            <div className="w-12 h-12 rounded border border-[#B35446] flex items-center justify-center text-[#B35446] font-serif font-bold text-lg">
              術
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-7 space-y-8">
              {categories.map((cat) => (
                <div key={cat} className="space-y-3">
                  <h2 className="font-mono text-xs uppercase tracking-wider text-[#7D756C]">
                    {cat}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {TECH_CATALOG.filter((t) => t.category === cat).map((tech) => {
                      const isSelected = activeTech === tech.name;
                      return (
                        <button
                          key={tech.name}
                          onClick={() => setActiveTech(tech.name)}
                          onMouseEnter={() => setActiveTech(tech.name)}
                          className={`px-3 py-1 text-xs rounded transition-all ${
                            isSelected
                              ? 'bg-[#B35446] text-[#F4EFEA]'
                              : 'bg-white/60 text-[#2C2926] hover:bg-white border border-[#2C2926]/10'
                          }`}
                        >
                          {tech.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="md:col-span-5 p-6 rounded bg-white/50 border border-[#2C2926]/10 space-y-6">
              <div className="border-b border-[#2C2926]/10 pb-3">
                <span className="text-[10px] font-mono uppercase text-[#7D756C]">INSTRUMENT</span>
                <h3 className="font-serif text-2xl text-[#2C2926]">{selectedItem.name}</h3>
              </div>
              <div className="space-y-3">
                <span className="text-[11px] font-mono uppercase text-[#7D756C] block">REALIZED WORKS</span>
                {linkedProjects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="block p-3 rounded bg-[#F4EFEA]/80 border border-[#2C2926]/10 hover:border-[#B35446] transition-colors"
                  >
                    <div className="flex items-center justify-between text-sm font-serif">
                      <span>{p.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#B35446]" />
                    </div>
                    <p className="text-[11px] text-[#7D756C] mt-1">{p.oneLiner}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (universe === 'swiss') {
    return (
      <div className="min-h-screen bg-[#F0F0EE] text-black px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-6xl mx-auto space-y-16">
          <header className="border-t-4 border-b-2 border-black py-8 grid grid-cols-12 gap-4 items-center">
            <div className="col-span-12 md:col-span-8">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E62B1E] block mb-1">
                SYSTEM 04 // TAXONOMIE DER METHODEN
              </span>
              <h1 className="font-black text-5xl sm:text-7xl uppercase tracking-tighter">
                SKILLS MATRIX
              </h1>
            </div>
            <div className="col-span-12 md:col-span-4 flex justify-end">
              <div className="w-16 h-16 rounded-full bg-[#E62B1E] text-white flex items-center justify-center font-black text-xl">
                CH
              </div>
            </div>
          </header>

          <div className="grid grid-cols-12 gap-8 border-b-2 border-black pb-12">
            <div className="col-span-12 lg:col-span-7 space-y-8">
              {categories.map((cat, idx) => (
                <div key={cat} className="space-y-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider block text-slate-600">
                    0{idx + 1} / {cat}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {TECH_CATALOG.filter((t) => t.category === cat).map((tech) => {
                      const isSelected = activeTech === tech.name;
                      return (
                        <button
                          key={tech.name}
                          onClick={() => setActiveTech(tech.name)}
                          onMouseEnter={() => setActiveTech(tech.name)}
                          className={`px-3 py-1.5 font-bold text-xs uppercase tracking-wider transition-colors ${
                            isSelected
                              ? 'bg-black text-white'
                              : 'bg-white text-black border border-black hover:bg-[#E62B1E] hover:text-white'
                          }`}
                        >
                          {tech.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="col-span-12 lg:col-span-5 bg-white border-2 border-black p-6 space-y-6">
              <div className="border-b-2 border-black pb-3">
                <span className="font-mono text-[10px] uppercase text-[#E62B1E] block font-bold">
                  TECHNOLOGIE
                </span>
                <h3 className="font-black text-3xl uppercase">{selectedItem.name}</h3>
              </div>
              <div>
                <span className="font-mono text-xs font-bold uppercase block mb-3">
                  PROJEKTE ({linkedProjects.length})
                </span>
                <div className="space-y-2">
                  {linkedProjects.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/projects/${p.slug}`}
                      className="block p-3 border border-black hover:bg-black hover:text-white transition-colors"
                    >
                      <div className="flex items-center justify-between font-bold text-sm uppercase">
                        <span>{p.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs opacity-80 mt-1">{p.oneLiner}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (universe === 'brutalist') {
    return (
      <div className="min-h-screen bg-black text-[#E0E0E0] px-4 sm:px-8 py-16 font-mono">
        <div className="max-w-5xl mx-auto space-y-12">
          <header className="border border-white p-4 bg-[#111]">
            <div className="text-[#FFEB3B] text-xs font-bold mb-2">
              ~/PRIT/SKILLS_REGISTRY.TXT [NO_PROGRESS_BARS_DETECTED]
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold uppercase text-white">
              $ TECH_DEPENDENCIES
            </h1>
            <p className="text-xs text-slate-400 mt-2">
              Hover/select any package to inspect linked repository references.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 space-y-6">
              {categories.map((cat) => (
                <div key={cat} className="border border-zinc-700 p-4 space-y-3">
                  <div className="text-xs text-[#FFEB3B] uppercase">== {cat} ==</div>
                  <div className="flex flex-wrap gap-2">
                    {TECH_CATALOG.filter((t) => t.category === cat).map((tech) => {
                      const isSelected = activeTech === tech.name;
                      return (
                        <button
                          key={tech.name}
                          onClick={() => setActiveTech(tech.name)}
                          onMouseEnter={() => setActiveTech(tech.name)}
                          className={`px-2 py-1 text-xs uppercase border transition-colors ${
                            isSelected
                              ? 'bg-[#FFEB3B] text-black border-[#FFEB3B] font-bold'
                              : 'bg-black text-white border-zinc-600 hover:border-white'
                          }`}
                        >
                          [{tech.name}]
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="md:col-span-5 border border-white p-5 space-y-5 bg-[#0a0a0a]">
              <div className="border-b border-zinc-700 pb-3">
                <span className="text-[10px] text-[#FFEB3B] uppercase block">TARGET_MODULE</span>
                <h3 className="text-2xl font-bold text-white uppercase">{selectedItem.name}</h3>
              </div>
              <div className="space-y-3">
                <span className="text-xs text-slate-400 uppercase block">CONSUMED_BY_REPOS:</span>
                {linkedProjects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="block p-3 border border-zinc-700 hover:border-[#FFEB3B] transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs text-white font-bold">
                      <span>/repo/{p.slug}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#FFEB3B]" />
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1">{p.oneLiner}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (universe === 'noir') {
    return (
      <div className="min-h-screen bg-[#080808] text-[#E5E5E5] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-5xl mx-auto space-y-16">
          <header className="border-b border-zinc-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF9500] block mb-2">
                SCENE IV · WEAPONS OF CHOICE
              </span>
              <h1 className="font-serif italic text-5xl sm:text-7xl text-white">
                Technical Mastery.
              </h1>
              <p className="text-sm text-zinc-400 mt-2 max-w-lg">
                Crafted in nocturnal silence. Tools forged to endure critical infrastructure failure.
              </p>
            </div>
            <div className="font-mono text-xs text-zinc-500">
              FRAME // 04.NIGHT
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-7 space-y-8">
              {categories.map((cat) => (
                <div key={cat} className="space-y-3">
                  <h2 className="font-mono text-xs uppercase tracking-widest text-[#FF9500]">
                    {cat}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {TECH_CATALOG.filter((t) => t.category === cat).map((tech) => {
                      const isSelected = activeTech === tech.name;
                      return (
                        <button
                          key={tech.name}
                          onClick={() => setActiveTech(tech.name)}
                          onMouseEnter={() => setActiveTech(tech.name)}
                          className={`px-3 py-1.5 text-xs rounded tracking-wider uppercase transition-all ${
                            isSelected
                              ? 'bg-[#FF9500] text-black font-bold shadow-[0_0_15px_rgba(255,149,0,0.4)]'
                              : 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-600'
                          }`}
                        >
                          {tech.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="md:col-span-5 p-6 rounded bg-zinc-950 border border-zinc-800 space-y-6">
              <div className="border-b border-zinc-800 pb-3">
                <span className="text-[10px] font-mono uppercase text-[#FF9500]">ACTIVE INSTRUMENT</span>
                <h3 className="font-serif italic text-3xl text-white">{selectedItem.name}</h3>
              </div>
              <div className="space-y-3">
                <span className="text-[11px] font-mono uppercase text-zinc-500 block">DEPLOYED IN SCENES</span>
                {linkedProjects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="block p-3 rounded bg-black/60 border border-zinc-800 hover:border-[#FF9500] transition-colors"
                  >
                    <div className="flex items-center justify-between text-sm font-medium text-white">
                      <span>{p.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#FF9500]" />
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">{p.oneLiner}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 7. ARCHIVE
  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#E2E8F0] px-4 sm:px-8 md:px-12 py-16 font-mono">
      <div className="max-w-6xl mx-auto space-y-16">
        <header className="border border-cyan-800/40 p-6 rounded bg-[#111827]/60">
          <div className="flex items-center gap-2 text-xs text-cyan-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>SPECIMEN TAXONOMY // SKILLS_INDEX</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
            ARTIFACTS &amp; TOOLING
          </h1>
          <p className="font-sans text-sm text-slate-300 mt-2 max-w-xl">
            Correlated registry of software instruments and verified deployment occurrences.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7 space-y-6">
            {categories.map((cat) => (
              <div key={cat} className="p-4 rounded border border-cyan-800/30 bg-[#111827]/40 space-y-3">
                <span className="text-xs text-cyan-400 uppercase font-bold block">
                  INDEX // {cat}
                </span>
                <div className="flex flex-wrap gap-2">
                  {TECH_CATALOG.filter((t) => t.category === cat).map((tech) => {
                    const isSelected = activeTech === tech.name;
                    return (
                      <button
                        key={tech.name}
                        onClick={() => setActiveTech(tech.name)}
                        onMouseEnter={() => setActiveTech(tech.name)}
                        className={`px-3 py-1 text-xs uppercase border transition-colors ${
                          isSelected
                            ? 'bg-cyan-500 text-black border-cyan-400 font-bold'
                            : 'bg-[#0B0F17] text-slate-300 border-cyan-900/60 hover:border-cyan-500/60'
                        }`}
                      >
                        {tech.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-5 p-6 rounded border border-cyan-800/40 bg-[#111827]/60 space-y-6">
            <div className="border-b border-cyan-800/40 pb-3">
              <span className="text-[10px] text-cyan-400 uppercase">SPECIMEN INSTRUMENT</span>
              <h3 className="text-3xl font-black text-white">{selectedItem.name}</h3>
            </div>
            <div className="space-y-3">
              <span className="text-xs text-slate-400 uppercase block">CORRELATED SPECIMENS:</span>
              {linkedProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="block p-3 rounded bg-[#0B0F17] border border-cyan-900/40 hover:border-cyan-400 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs text-cyan-300 font-bold">
                    <span>SPECIMEN #{p.slug.toUpperCase()}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                  <p className="font-sans text-xs text-slate-300 mt-1">{p.title}: {p.oneLiner}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
