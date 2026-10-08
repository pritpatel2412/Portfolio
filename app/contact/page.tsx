import React from 'react';
import type { Metadata } from 'next';
import { site } from '@/content/site';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfoSide } from '@/components/contact/ContactInfoSide';

export const metadata: Metadata = {
  title: 'Contact & Proposals — Prit Patel',
  description:
    'Start a project dialogue. Available for backend systems engineering, AI agents, compiler design, and high-concurrency consulting.',
  openGraph: {
    title: 'Contact & Proposals — Prit Patel',
    description:
      'Start a project dialogue. Available for backend systems engineering, AI agents, compiler design, and high-concurrency consulting.',
    url: 'https://pritpatel.dev/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col gap-12 sm:gap-16">
      {/* Header Eyebrow */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-6 font-mono text-xs text-[var(--text-dim)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--safelight)]" />
          <span className="uppercase tracking-widest">▷ 06 · PROJECT INQUIRIES &amp; DIALOGUE</span>
        </div>
        <span className="hidden sm:inline">VADODARA, GUJARAT · UTC+05:30</span>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Direct Info & Timezone Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="space-y-4">
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-[var(--text)] tracking-tight leading-[1.05]">
              Let’s Build Something{' '}
              <span className="font-serif italic font-normal text-[var(--safelight)]">
                Enduring
              </span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-[var(--text-dim)] leading-relaxed">
              Whether you need high-throughput distributed backends, autonomous AI agent workflows, or custom compiler tooling, I design resilient systems that scale cleanly under production pressure.
            </p>
          </div>

          <ContactInfoSide />
        </div>

        {/* Right Column: Interactive Qualifying Form (7 cols) */}
        <div className="lg:col-span-7 w-full">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
