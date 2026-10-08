'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { projects } from '@/content/projects';

interface ToolItem {
  name: string;
  category: 'Daily' | 'Weekly' | 'Can Ramp Up';
  projects: string[]; // project slugs
}

const TOOLS: ToolItem[] = [
  // Daily
  { name: 'Python', category: 'Daily', projects: ['redforge', 'searchmind', 'kemlang', 'aria'] },
  { name: 'TypeScript', category: 'Daily', projects: ['redforge', 'kyren', 'codeguard', 'kemlang'] },
  { name: 'FastAPI', category: 'Daily', projects: ['redforge', 'searchmind', 'kemlang', 'aria'] },
  { name: 'Redis', category: 'Daily', projects: ['redforge', 'searchmind'] },
  { name: 'React', category: 'Daily', projects: ['redforge', 'searchmind', 'kyren', 'codeguard', 'kemlang'] },
  { name: 'Next.js', category: 'Daily', projects: ['kyren', 'portfolio'] },
  { name: 'PostgreSQL', category: 'Daily', projects: ['redforge', 'searchmind', 'kyren'] },
  { name: 'Docker', category: 'Daily', projects: ['redforge', 'searchmind'] },
  { name: 'Git', category: 'Daily', projects: ['redforge', 'searchmind', 'kemlang', 'kyren'] },

  // Weekly
  { name: 'SQL', category: 'Weekly', projects: ['redforge', 'searchmind', 'kyren'] },
  { name: 'Autonomous Agents', category: 'Weekly', projects: ['redforge', 'searchmind', 'aria'] },
  { name: 'RAG Architectures', category: 'Weekly', projects: ['searchmind', 'aria'] },
  { name: 'Tailwind CSS', category: 'Weekly', projects: ['redforge', 'searchmind', 'kyren', 'codeguard'] },
  { name: 'GSAP Motion', category: 'Weekly', projects: ['portfolio'] },
  { name: 'WebSockets', category: 'Weekly', projects: ['aria'] },

  // Can Ramp Up
  { name: 'Java', category: 'Can Ramp Up', projects: [] },
  { name: 'Compilers / AST', category: 'Can Ramp Up', projects: ['kemlang', 'redforge'] },
  { name: 'C++', category: 'Can Ramp Up', projects: ['kyren'] },
  { name: 'Three.js / WebGL', category: 'Can Ramp Up', projects: [] },
];

const REFERENCED_PROJECTS = [
  { slug: 'redforge', title: 'RedForge AI' },
  { slug: 'searchmind', title: 'SearchMind API' },
  { slug: 'kemlang', title: 'KemLang Compiler' },
  { slug: 'aria', title: 'Aria Voice AI' },
  { slug: 'kyren', title: 'Kyren Engine' },
  { slug: 'codeguard', title: 'CodeGuard Scanner' },
];

export function StackMatrix() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Active tools derived from hovered project
  const activeToolsForProject = hoveredProject
    ? TOOLS.filter((t) => t.projects.includes(hoveredProject)).map((t) => t.name)
    : [];

  // Active projects derived from hovered tool
  const activeProjectsForTool = hoveredTool
    ? TOOLS.find((t) => t.name === hoveredTool)?.projects || []
    : [];

  const tiers: ('Daily' | 'Weekly' | 'Can Ramp Up')[] = ['Daily', 'Weekly', 'Can Ramp Up'];

  return (
    <section
      aria-label="Technology Stack Matrix"
      className="w-full border-b border-[var(--line)] bg-[var(--bg)] py-16 sm:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[var(--line)] pb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--safelight)] mb-3">
              <span>▷ FRAME 03</span>
              <span>·</span>
              <span>TECHNICAL MATRIX</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[var(--text)] tracking-tight">
              Stack Matrix
            </h2>
            <p className="font-text text-base sm:text-lg text-[var(--text-dim)] mt-3 max-w-xl">
              Zero logo walls. Zero infinite marquees. Tools calibrated strictly by operational confidence with bidirectional project highlighting.
            </p>
          </div>

          <div className="font-mono text-xs text-[var(--text-dim)]">
            Hover tool or project to inspect correlation
          </div>
        </div>

        {/* Matrix Grid: Left Tiers, Right Project Cross-highlight strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: 3 Tiers (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {tiers.map((tier) => {
              const items = TOOLS.filter((t) => t.category === tier);
              return (
                <div
                  key={tier}
                  className="p-6 border border-[var(--line)] bg-[var(--surface)] rounded-none flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-[var(--safelight)] font-bold">
                      {tier === 'Daily' && '01 / DAILY (CORE PRODUCTION)'}
                      {tier === 'Weekly' && '02 / WEEKLY (ACTIVE ARCHITECTURE)'}
                      {tier === 'Can Ramp Up' && '03 / CAN RAMP UP (ON DEMAND)'}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--text-dim)] uppercase">
                      {items.length} Technologies
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {items.map((tool) => {
                      const isHighlightedByProject = activeToolsForProject.includes(tool.name);
                      const isSelfHovered = hoveredTool === tool.name;

                      return (
                        <button
                          key={tool.name}
                          type="button"
                          onMouseEnter={() => setHoveredTool(tool.name)}
                          onMouseLeave={() => setHoveredTool(null)}
                          onFocus={() => setHoveredTool(tool.name)}
                          onBlur={() => setHoveredTool(null)}
                          className={cn(
                            'px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded-[var(--radius-ui)] border transition-all cursor-pointer',
                            isSelfHovered
                              ? 'bg-[var(--safelight)] text-[var(--bg)] border-[var(--safelight)] font-bold scale-105'
                              : isHighlightedByProject
                              ? 'border-[var(--safelight)] text-[var(--safelight)] bg-[var(--surface-2)] font-semibold'
                              : 'border-[var(--line)] bg-[var(--bg)] text-[var(--text)] hover:border-[var(--text)]'
                          )}
                        >
                          {tool.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Project Correlation Panel (4 cols) */}
          <div className="lg:col-span-4 p-6 border border-[var(--line)] bg-[var(--surface)] flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--text)] font-bold">
                  PROJECT CROSS-REFERENCE
                </span>
                <span className="font-mono text-[10px] text-[var(--safelight)]">
                  LINKED SYSTEMS
                </span>
              </div>

              <p className="font-text text-xs text-[var(--text-dim)] leading-relaxed">
                Hover any project below to highlight every technology it employs, or hover a technology to see which systems implement it.
              </p>

              <div className="flex flex-col gap-2 pt-2">
                {REFERENCED_PROJECTS.map((proj) => {
                  const isHighlightedByTool = activeProjectsForTool.includes(proj.slug);
                  const isSelfHovered = hoveredProject === proj.slug;

                  return (
                    <Link
                      key={proj.slug}
                      href={`/projects/${proj.slug}`}
                      onMouseEnter={() => setHoveredProject(proj.slug)}
                      onMouseLeave={() => setHoveredProject(null)}
                      onFocus={() => setHoveredProject(proj.slug)}
                      onBlur={() => setHoveredProject(null)}
                      className={cn(
                        'p-3 font-mono text-xs uppercase tracking-wider border rounded-[var(--radius-ui)] transition-all flex items-center justify-between',
                        isSelfHovered
                          ? 'border-[var(--safelight)] bg-[var(--surface-2)] text-[var(--safelight)] font-bold'
                          : isHighlightedByTool
                          ? 'border-[var(--safelight)] text-[var(--safelight)] bg-[var(--surface-2)]'
                          : 'border-[var(--line)] bg-[var(--bg)] text-[var(--text-dim)] hover:text-[var(--text)] hover:border-[var(--text-dim)]'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--safelight)]">▷</span>
                        <span>{proj.title}</span>
                      </div>
                      <span className="text-[10px] opacity-60">→</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-[var(--line)] pt-3 font-mono text-[10px] text-[var(--text-dim)] flex items-center justify-between">
              <span>ZERO DEPENDENCY BLOAT</span>
              <span className="text-[var(--safelight)]">STRICT TOKENS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
