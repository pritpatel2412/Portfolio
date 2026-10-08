import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Terminal, BookOpen, Cpu, Sparkles } from 'lucide-react';
import profileData from '@/content/profile.json';
import { Develop } from '@/components/motion/Develop';

export const metadata: Metadata = {
  title: 'About · Prit Patel',
  description:
    'Full-stack and AI systems engineer. Background, engineering principles, hardware setup, and active pursuits.',
};

export default function AboutPage() {
  const {
    name,
    role,
    portrait,
    aboutParagraphs,
    principles,
    uses,
    currently,
    joke,
  } = profileData;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12">
        {/* Header with Developing Portrait */}
        <header className="pb-12 border-b border-[var(--line)] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--safelight)] uppercase tracking-wider mb-2">
              <span>▷ 03 · PROFILE &amp; PHILOSOPHY</span>
              <span className="text-[var(--text-dim)]">/</span>
              <span>FIRST-PERSON PERSPECTIVE</span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-[-0.03em] text-[var(--text)]">
              About Prit Patel
            </h1>
            <p className="font-mono text-xs sm:text-sm text-[var(--text-dim)] uppercase tracking-wider mt-2">
              {role} · Vadodara, India
            </p>
          </div>

          {/* Developing Portrait (Brief §4 & §7.5) */}
          <div className="relative w-36 sm:w-44 aspect-[4/5] rounded-[var(--radius-frame)] overflow-hidden border border-[var(--line)] bg-[var(--surface-2)] shadow-xl shrink-0">
            <Develop className="w-full h-full">
              <Image
                src={portrait}
                alt={`${name} portrait photo`}
                fill
                priority
                sizes="(max-width: 768px) 150px, 180px"
                className="object-cover"
              />
            </Develop>
          </div>
        </header>

        {/* 1. Three Core First-Person Paragraphs */}
        <section aria-label="First-Person Story" className="py-12 border-b border-[var(--line)]">
          <div className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--safelight)]" />
            <h2 className="text-[var(--text)] font-bold">MISSION &amp; PERSPECTIVE</h2>
          </div>

          <div className="space-y-6 max-w-3xl">
            {aboutParagraphs.map((para, idx) => (
              <p
                key={idx}
                className="font-text text-base sm:text-lg text-[var(--text)] leading-relaxed"
              >
                {para}
              </p>
            ))}
          </div>

          {/* The Site's One Joke (Brief §7.5 & §4) */}
          <div className="mt-8 p-4 rounded-[var(--radius-ui)] bg-[var(--surface-2)] border border-[var(--line)] flex items-center gap-3 text-xs font-mono text-[var(--text-dim)]">
            <Sparkles className="w-4 h-4 text-[var(--safelight)] shrink-0" />
            <span>&ldquo;{joke}&rdquo;</span>
          </div>
        </section>

        {/* 2. Five-Item "How I Work" Principles */}
        <section aria-label="How I Work" className="py-12 border-b border-[var(--line)]">
          <div className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--safelight)]" />
            <h2 className="text-[var(--text)] font-bold">HOW I WORK (ENGINEERING PRINCIPLES)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {principles.map((pr) => (
              <article
                key={pr.num}
                className="p-5 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--text-dim)] transition-colors"
              >
                <span className="font-mono text-xs text-[var(--safelight)] font-bold block mb-2">
                  ▷ {pr.num}
                </span>
                <h3 className="font-display font-bold text-base text-[var(--text)] mb-2">
                  {pr.title}
                </h3>
                <p className="font-text text-xs text-[var(--text-dim)] leading-relaxed">
                  {pr.desc}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* 3. Uses & Setup Section */}
        <section aria-label="Uses & Setup" className="py-12 border-b border-[var(--line)]">
          <div className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-wider mb-6 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[var(--safelight)]" />
            <h2 className="text-[var(--text)] font-bold">USES &amp; HARDWARE SETUP</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {uses.map((u, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[var(--radius-ui)] bg-[var(--surface)] border border-[var(--line)]"
              >
                <span className="font-mono text-[11px] text-[var(--safelight)] uppercase font-bold block mb-1">
                  {u.category}
                </span>
                <p className="font-mono text-xs text-[var(--text-dim)]">
                  {u.items}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Dated "Currently" Block */}
        <section aria-label="Currently Active" className="py-12">
          <div className="p-6 rounded-[var(--radius-ui)] bg-[var(--surface-2)] border border-[var(--line)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--safelight)] uppercase font-bold">
                <span className="w-2 h-2 rounded-full bg-[var(--safelight)] animate-pulse" />
                <span>CURRENTLY ACTIVE ({currently.date})</span>
              </div>
              <ul className="space-y-1.5 font-text text-sm text-[var(--text)]">
                <li>
                  <strong className="text-[var(--text-dim)] font-mono text-xs uppercase mr-2">
                    BUILDING:
                  </strong>
                  {currently.building}
                </li>
                <li>
                  <strong className="text-[var(--text-dim)] font-mono text-xs uppercase mr-2">
                    READING:
                  </strong>
                  {currently.reading}
                </li>
                <li>
                  <strong className="text-[var(--text-dim)] font-mono text-xs uppercase mr-2">
                    LEARNING:
                  </strong>
                  {currently.learning}
                </li>
              </ul>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-ui)] bg-[var(--safelight)] text-[var(--on-safelight,#0A0908)] font-mono text-xs uppercase font-bold hover:opacity-90 transition-opacity shrink-0 min-h-[44px]"
            >
              <span>Get in touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
