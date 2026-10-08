'use client';

import React from 'react';
import { roles } from '@/content/roles';
import { useLens } from '@/components/system/LensProvider';
import { GitCommit, ArrowUpRight } from 'lucide-react';

export default function WorkPage() {
  const { isSourceMode } = useLens();

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-12 py-12 md:py-20 flex flex-col gap-16">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-8">
        <div className="flex items-center justify-between font-mono text-xs text-[var(--ink-muted)]">
          <span>03 / CAREER & ENGINEERING ROLES</span>
          <span>3 ROLES · 2025 — PRESENT</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-[var(--ink)] tracking-tight">
          Work & <span className="font-serif italic font-normal text-[var(--signal)]">Experience</span>
        </h1>
        <p className="text-base text-[var(--ink-muted)] max-w-2xl leading-relaxed">
          Production internships and software roles delivering scalable distributed backends, LLM evaluation pipelines, and developer ecosystems.
        </p>
      </div>

      {/* Surface Chapters vs Source Git Log */}
      {!isSourceMode ? (
        <div className="flex flex-col gap-12 relative border-l border-[var(--line)] pl-6 md:pl-10 ml-2 md:ml-4">
          {roles.map((role) => (
            <div key={role.id} className="relative flex flex-col gap-4">
              {/* Timeline Marker */}
              <div
                className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-3 h-3 rounded-full border-2 ${
                  role.current
                    ? 'border-[var(--signal)] bg-[var(--signal)] shadow-[0_0_8px_var(--signal)]'
                    : 'border-[var(--ink-muted)] bg-[var(--bg)]'
                }`}
              />

              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                <span className="text-[var(--ink-muted)]">
                  {role.start} — {role.end}
                </span>
                <span className="px-2 py-0.5 rounded-full border border-[var(--line)] text-[var(--ink-muted)] uppercase text-[10px]">
                  {role.mode} · {role.location}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ink)]">
                  {role.company}
                </h2>
                <span className="font-mono text-sm font-semibold text-[var(--signal)]">
                  {role.role}
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {role.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm md:text-base text-[var(--ink-muted)] leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              {/* Shipped List */}
              <div className="p-4 rounded-xl border border-[var(--line)] bg-[var(--bg-raised)] space-y-2 mt-2">
                <span className="font-mono text-xs font-bold text-[var(--ink)] uppercase tracking-wider">
                  Key Accomplishments & Shipped Artifacts:
                </span>
                <ul className="space-y-1.5 pt-1">
                  {role.shipped.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-[var(--ink-muted)]">
                      <span className="text-[var(--signal)] font-mono">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {role.stack.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-2 py-0.5 rounded border border-[var(--line)] text-[var(--ink-muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="font-mono text-xs text-[var(--ink-muted)] italic pt-1 border-t border-[var(--line)]/50">
                Advice to past self: "{role.adviceToPastSelf}"
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Source Git Log View (§6.1, §7.4) */
        <div className="font-mono text-xs border border-[var(--line)] rounded-xl bg-[var(--bg-raised)] p-6 space-y-6">
          <div className="text-[var(--phosphor)] font-bold flex items-center gap-2 border-b border-[var(--line)] pb-3">
            <GitCommit className="w-4 h-4" />
            <span>$ git log --oneline --graph --stat roles/</span>
          </div>

          <div className="space-y-6">
            {roles.map((role) => (
              <div key={role.id} className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-[var(--warn)] font-bold">commit {role.source.commitHash}</span>
                  {role.current && (
                    <span className="px-1.5 py-0.2 bg-[var(--signal)] text-[var(--on-signal)] rounded text-[9px] uppercase">
                      {"HEAD -> current"}
                    </span>
                  )}
                  <span className="text-[var(--ink-muted)] ml-auto text-[11px]">{role.start} — {role.end}</span>
                </div>
                <div className="text-[var(--ink)] font-bold">
                  Author: Prit Patel &lt;try.prit24@gmail.com&gt;
                </div>
                <div className="text-[var(--ink)] font-semibold">
                  Role: {role.role} @ {role.company}
                </div>
                <div className="text-[11px] text-[var(--ink-muted)] pl-4 border-l border-[var(--line)]">
                  {role.shipped[0]}
                </div>
                <div className="text-[11px] text-[var(--phosphor)]">
                  {role.source.filesChanged} files changed, +{role.source.additions} insertions(+), -{role.source.deletions} deletions(-)
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
