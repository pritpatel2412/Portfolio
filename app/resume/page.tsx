'use client';

import React, { useState } from 'react';
import resumeData from '@/content/resume.json';
import { useLens } from '@/components/system/LensProvider';
import { Printer, Copy, FileText, Code2, Check } from 'lucide-react';

export default function ResumePage() {
  const { isSourceMode } = useLens();
  const [recruiterView, setRecruiterView] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyAsText = () => {
    const text = `${resumeData.basics.name}\n${resumeData.basics.label}\nEmail: ${resumeData.basics.email}\nGitHub: ${resumeData.basics.url}\n\nSummary:\n${resumeData.basics.summary}\n\nExperience:\n${resumeData.work.map(w => `${w.position} @ ${w.name} (${w.startDate})\n- ${w.summary}`).join('\n\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 md:px-12 py-12 md:py-20 flex flex-col gap-10">
      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-6 print:hidden">
        <div>
          <span className="font-mono text-xs text-[var(--ink-muted)] block">04 / CURRICULUM VITAE</span>
          <h1 className="font-display text-3xl font-extrabold text-[var(--ink)]">
            Technical Résumé
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            type="button"
            onClick={() => setRecruiterView(!recruiterView)}
            className={`px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
              recruiterView
                ? 'bg-[var(--signal)] text-[var(--on-signal)] border-[var(--signal)]'
                : 'border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink-muted)]'
            }`}
          >
            {recruiterView ? '✓ Recruiter View' : 'Recruiter View'}
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink-muted)] transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>

          <button
            type="button"
            onClick={copyAsText}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink-muted)] transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>
        </div>
      </div>

      {/* Surface HTML Sheet vs Source JSON View */}
      {!isSourceMode ? (
        <div className="bg-[var(--bg-raised)] border border-[var(--line)] rounded-xl p-8 md:p-14 shadow-sm space-y-10 print:border-none print:shadow-none print:p-0">
          {/* Header */}
          <div className="border-b border-[var(--line)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-4xl font-extrabold text-[var(--ink)]">
                {resumeData.basics.name}
              </h2>
              <p className="font-mono text-sm text-[var(--signal)] font-medium mt-1">
                {resumeData.basics.label}
              </p>
            </div>
            <div className="font-mono text-xs text-[var(--ink-muted)] space-y-0.5 text-left md:text-right">
              <div>{resumeData.basics.email}</div>
              <div>{resumeData.basics.location.city}, {resumeData.basics.location.region}</div>
              <div>github.com/pritpatel2412</div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <h3 className="font-mono text-xs uppercase text-[var(--ink-muted)] tracking-wider">
              Summary
            </h3>
            <p className="text-sm md:text-base text-[var(--ink)] leading-relaxed">
              {resumeData.basics.summary}
            </p>
          </div>

          {/* Work Experience */}
          <div className="space-y-6">
            <h3 className="font-mono text-xs uppercase text-[var(--ink-muted)] tracking-wider">
              Work Experience
            </h3>
            <div className="space-y-6">
              {resumeData.work.map((w, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 font-mono text-xs">
                    <span className="font-bold text-sm text-[var(--ink)] font-sans">
                      {w.position} — <span className="font-semibold text-[var(--signal)]">{w.name}</span>
                    </span>
                    <span className="text-[var(--ink-muted)]">
                      {w.startDate} {w.endDate ? `— ${w.endDate}` : '— Present'}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                    {w.summary}
                  </p>
                  {!recruiterView && (
                    <ul className="list-disc list-inside text-xs text-[var(--ink-muted)] space-y-1 pl-2">
                      {w.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase text-[var(--ink-muted)] tracking-wider">
              Education
            </h3>
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between font-mono text-xs">
                <div>
                  <span className="font-bold text-sm text-[var(--ink)] font-sans">
                    {edu.studyType} in {edu.area}
                  </span>
                  <span className="text-[var(--ink-muted)] block">
                    Relevant: {edu.courses.join(', ')}
                  </span>
                </div>
                <div className="text-[var(--signal)] font-bold mt-1 sm:mt-0">
                  {edu.score}
                </div>
              </div>
            ))}
          </div>

          {/* Core Technical Skills */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase text-[var(--ink-muted)] tracking-wider">
              Technical Core Competencies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {resumeData.skills.map((s, idx) => (
                <div key={idx} className="p-3 rounded border border-[var(--line)] bg-[var(--bg)] space-y-1">
                  <div className="font-bold text-[var(--ink)]">{s.name}</div>
                  <div className="text-[11px] text-[var(--ink-muted)]">{s.keywords.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Source Mode Raw JSON (§6.1, §7.5) */
        <div className="font-mono text-xs border border-[var(--line)] rounded-xl bg-[var(--bg-raised)] p-6 space-y-3">
          <div className="flex items-center gap-2 text-[var(--phosphor)] font-bold">
            <Code2 className="w-4 h-4" />
            <span>// RAW RESUME SCHEMA (/content/resume.json)</span>
          </div>
          <pre className="text-[11px] text-[var(--ink-muted)] overflow-x-auto p-4 bg-black/60 rounded border border-[var(--line)] leading-relaxed">
            {JSON.stringify(resumeData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
