import React from 'react';
import type { Metadata } from 'next';
import profileData from '@/content/profile.json';
import experienceData from '@/content/experience.json';
import { ALL_PROJECTS } from '@/lib/projects';
import { ResumeActions } from '@/components/resume/ResumeActions';

export const metadata: Metadata = {
  title: 'Résumé · Prit Patel',
  description:
    'ATS-optimized semantic engineering résumé for Prit Patel. Full-Stack and AI Systems Developer.',
};

export default function ResumePage() {
  const { name, role, email, location, links } = profileData;
  const { roles, education } = experienceData;
  const featuredProjects = ALL_PROJECTS.slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: role,
    email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Vadodara',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Parul University',
    },
    sameAs: [links.github, links.linkedin, links.leetcode, links.resume].filter(Boolean),
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-24 print:bg-white print:text-black print:pb-0">
      {/* Inject Person JSON-LD (Brief §10 & §7.6) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Scoped Single-Page Print Stylesheet */}
      <style>{`
        @page {
          size: A4 portrait;
          margin: 8mm 10mm;
        }
        @media print {
          body {
            background: #ffffff !important;
            color: #111111 !important;
            font-size: 9.5pt !important;
            line-height: 1.3 !important;
          }
          header, footer, nav, .print\\:hidden, #main-content > a {
            display: none !important;
          }
          main {
            padding-top: 0 !important;
          }
          .resume-container {
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            background: #ffffff !important;
            color: #111111 !important;
          }
          .resume-section {
            break-inside: avoid;
            margin-bottom: 8px !important;
            padding-bottom: 6px !important;
          }
          .resume-title {
            color: #000000 !important;
            border-bottom: 1px solid #333333 !important;
            font-size: 10.5pt !important;
            margin-bottom: 4px !important;
            padding-bottom: 2px !important;
          }
          .resume-item-title {
            color: #000000 !important;
            font-weight: bold !important;
            font-size: 9.5pt !important;
          }
          .resume-meta {
            color: #444444 !important;
            font-size: 8.5pt !important;
          }
          .resume-desc {
            color: #222222 !important;
            font-size: 9pt !important;
          }
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-8">
        {/* Interactive Action Bar (Hidden when printing) */}
        <ResumeActions resumeUrl={links.resume} />

        {/* ATS-Friendly Semantic Résumé Document */}
        <article
          className="resume-container p-8 sm:p-12 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface)] shadow-lg print:border-none print:shadow-none print:p-0"
          aria-label="Prit Patel Curriculum Vitae"
        >
          {/* Header */}
          <header className="resume-section border-b border-[var(--line)] pb-6 mb-6 print:border-b print:border-black print:pb-3 print:mb-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="font-display font-black text-3xl sm:text-4xl text-[var(--text)] print:text-black">
                {name}
              </h1>
              <span className="font-mono text-sm text-[var(--safelight)] font-bold print:text-black">
                {role}
              </span>
            </div>

            {/* Contact Row */}
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-[var(--text-dim)] resume-meta">
              <span>{location}</span>
              <span>·</span>
              <a href={`mailto:${email}`} className="hover:underline text-[var(--text)] print:text-black">
                {email}
              </a>
              <span>·</span>
              <a href={links.github} target="_blank" rel="noreferrer" className="hover:underline">
                github.com/pritpatel2412
              </a>
              <span>·</span>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                linkedin.com/in/prit-patel-904272307
              </a>
              <span>·</span>
              <a
                href={links.resume}
                target="_blank"
                rel="noreferrer"
                className="hover:underline text-[var(--safelight)] print:text-black font-semibold inline-flex items-center gap-1"
                aria-label="Direct Google Drive PDF Résumé"
              >
                <span>Google Drive PDF ↗</span>
              </a>
            </div>
          </header>

          {/* Education */}
          <section className="resume-section mb-6 print:mb-3">
            <h2 className="resume-title font-mono text-xs font-bold uppercase tracking-wider text-[var(--safelight)] border-b border-[var(--line)] pb-1 mb-3 print:text-black print:border-black">
              EDUCATION
            </h2>
            {education.map((edu, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <strong className="resume-item-title font-display text-sm text-[var(--text)]">
                    {edu.institution}
                  </strong>
                  <span className="font-mono text-xs text-[var(--text-dim)] resume-meta">
                    {edu.period}
                  </span>
                </div>
                <div className="flex justify-between items-baseline font-mono text-xs text-[var(--text-dim)] resume-meta">
                  <span>{edu.degree}</span>
                  <strong className="text-[var(--safelight)] print:text-black font-bold">
                    GPA: {edu.gpa}
                  </strong>
                </div>
              </div>
            ))}
          </section>

          {/* Experience */}
          <section className="resume-section mb-6 print:mb-3">
            <h2 className="resume-title font-mono text-xs font-bold uppercase tracking-wider text-[var(--safelight)] border-b border-[var(--line)] pb-1 mb-3 print:text-black print:border-black">
              ENGINEERING EXPERIENCE
            </h2>
            <div className="space-y-4 print:space-y-2.5">
              {roles.map((roleItem) => (
                <div key={roleItem.id} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <strong className="resume-item-title font-display text-sm text-[var(--text)]">
                      {roleItem.role} · {roleItem.company}
                    </strong>
                    <span className="font-mono text-xs text-[var(--text-dim)] resume-meta">
                      {roleItem.period}
                    </span>
                  </div>
                  <p className="font-text text-xs text-[var(--text-dim)] resume-desc leading-relaxed">
                    {roleItem.story}
                  </p>
                  <ul className="list-disc list-inside space-y-0.5 text-xs font-text text-[var(--text-dim)] resume-desc">
                    {roleItem.outcomes.map((out, i) => (
                      <li key={i}>{out}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Projects */}
          <section className="resume-section mb-6 print:mb-3">
            <h2 className="resume-title font-mono text-xs font-bold uppercase tracking-wider text-[var(--safelight)] border-b border-[var(--line)] pb-1 mb-3 print:text-black print:border-black">
              KEY SYSTEMS &amp; OPEN SOURCE
            </h2>
            <div className="space-y-3 print:space-y-2">
              {featuredProjects.map((proj) => (
                <div key={proj.slug} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <strong className="resume-item-title font-display text-sm text-[var(--text)]">
                      {proj.title} <span className="font-mono text-xs text-[var(--text-dim)] font-normal">({proj.category})</span>
                    </strong>
                    <span className="font-mono text-xs text-[var(--safelight)] font-bold print:text-black resume-meta">
                      {proj.tenSecond.keyMetric.value} {proj.tenSecond.keyMetric.label}
                    </span>
                  </div>
                  <p className="font-text text-xs text-[var(--text-dim)] resume-desc leading-relaxed">
                    {proj.oneLiner}
                  </p>
                  <div className="font-mono text-[10px] text-[var(--text-dim)] resume-meta">
                    Stack: {proj.stack.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Skills */}
          <section className="resume-section mb-6 print:mb-3">
            <h2 className="resume-title font-mono text-xs font-bold uppercase tracking-wider text-[var(--safelight)] border-b border-[var(--line)] pb-1 mb-3 print:text-black print:border-black">
              TECHNICAL COMPETENCIES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <strong className="text-[var(--text)] print:text-black">Languages:</strong>{' '}
                <span className="text-[var(--text-dim)] resume-meta">TypeScript, Python, JavaScript, SQL, C/C++</span>
              </div>
              <div>
                <strong className="text-[var(--text)] print:text-black">Frameworks:</strong>{' '}
                <span className="text-[var(--text-dim)] resume-meta">React, Next.js, FastAPI, Node.js, Express, Tailwind CSS</span>
              </div>
              <div>
                <strong className="text-[var(--text)] print:text-black">Databases &amp; Queues:</strong>{' '}
                <span className="text-[var(--text-dim)] resume-meta">PostgreSQL, Redis Streams, Vector Databases</span>
              </div>
              <div>
                <strong className="text-[var(--text)] print:text-black">Tools &amp; Systems:</strong>{' '}
                <span className="text-[var(--text-dim)] resume-meta">Docker, Git, Linux, Playwright, Monaco Editor, REST, WebSockets</span>
              </div>
            </div>
          </section>

          {/* Footer Timestamp */}
          <footer className="pt-4 border-t border-[var(--line)] flex justify-between font-mono text-[10px] text-[var(--text-dim)] resume-meta">
            <span>Verified from content/profile.json &amp; content/experience.json</span>
            <span>Last Updated: October 2026</span>
          </footer>
        </article>
      </div>
    </div>
  );
}
