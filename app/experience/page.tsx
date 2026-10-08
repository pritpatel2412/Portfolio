import React from 'react';
import type { Metadata } from 'next';
import experienceData from '@/content/experience.json';
import { TimelineRole } from '@/components/experience/TimelineRole';
import { GraduationCap, Award, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Experience & Career Log · Prit Patel',
  description:
    'Chronological engineering timeline of production roles, systems delivered, and technical impact.',
};

export default function ExperiencePage() {
  const { summary, roles, education } = experienceData;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12">
        {/* Header */}
        <header className="mb-10 pb-8 border-b border-[var(--line)]">
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--safelight)] uppercase tracking-wider mb-2">
            <span>▷ 02 · CAREER TIMELINE</span>
            <span className="text-[var(--text-dim)]">/</span>
            <span className="text-[var(--text-dim)]">CHRONOLOGICAL LOG</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-[-0.03em] text-[var(--text)]">
            Engineering Experience
          </h1>
          <p className="font-text text-sm sm:text-base text-[var(--text-dim)] mt-3 max-w-2xl leading-relaxed">
            Record of professional engineering internships, distributed backend architectures, and AI infrastructure systems shipped to production.
          </p>

          {/* Computed Summary Totals Strip (Brief §7.4) */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-[var(--radius-ui)] bg-[var(--surface-2)] border border-[var(--line)]">
            <div>
              <span className="font-mono text-[10px] text-[var(--text-dim)] uppercase block">
                ROLES HELD
              </span>
              <strong className="font-display font-black text-xl text-[var(--text)]">
                {summary.totalRoles}
              </strong>
            </div>
            <div>
              <span className="font-mono text-[10px] text-[var(--text-dim)] uppercase block">
                DURATION
              </span>
              <strong className="font-display font-black text-xl text-[var(--text)]">
                {summary.totalYears}
              </strong>
            </div>
            <div>
              <span className="font-mono text-[10px] text-[var(--text-dim)] uppercase block">
                DELIVERY MODE
              </span>
              <strong className="font-display font-black text-xl text-[var(--safelight)]">
                100% Remote
              </strong>
            </div>
            <div>
              <span className="font-mono text-[10px] text-[var(--text-dim)] uppercase block">
                CURRENT FOCUS
              </span>
              <strong className="font-mono text-xs font-bold text-[var(--text)] block truncate">
                {summary.currentlyAt}
              </strong>
            </div>
          </div>
        </header>

        {/* Vertical Timeline */}
        <section aria-label="Professional Roles Timeline" className="my-10">
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-dim)] uppercase tracking-wider mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--safelight)]" />
            <h2 className="text-[var(--text)] font-bold">ROLES &amp; INTERNSHIPS</h2>
          </div>

          <div className="space-y-6">
            {roles.map((role, idx) => (
              <TimelineRole key={role.id} role={role} index={idx} />
            ))}
          </div>
        </section>

        {/* Education & Academic Rigor Strip (Brief §7.4) */}
        <section
          aria-label="Education & Academic Background"
          className="mt-16 pt-10 border-t border-[var(--line)]"
        >
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-dim)] uppercase tracking-wider mb-6">
            <GraduationCap className="w-4 h-4 text-[var(--safelight)]" />
            <h2 className="text-[var(--text)] font-bold">EDUCATION &amp; ACADEMIC RIGOR</h2>
          </div>

          {education.map((edu, idx) => (
            <div
              key={idx}
              className="p-6 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--safelight)] uppercase font-bold mb-1">
                  <span>{edu.period}</span>
                  <span>·</span>
                  <span>{edu.institution}</span>
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--text)]">
                  {edu.degree}
                </h3>
                <ul className="mt-3 space-y-1">
                  {edu.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="font-text text-xs sm:text-sm text-[var(--text-dim)] flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--line)]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* GPA Badge */}
              <div className="p-4 rounded-[var(--radius-ui)] bg-[var(--surface-2)] border border-[var(--safelight)]/40 text-center shrink-0 w-full md:w-auto">
                <span className="font-mono text-[10px] text-[var(--text-dim)] uppercase block">
                  CUMULATIVE GPA
                </span>
                <span className="font-display font-black text-3xl text-[var(--safelight)]">
                  {edu.gpa}
                </span>
                <span className="font-mono text-[10px] text-[var(--text)] block mt-0.5">
                  Academic Excellence
                </span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
