import React from 'react';
import type { Metadata } from 'next';
import { DarkroomHero } from '@/components/home/DarkroomHero';
import { SelectedWork } from '@/components/home/SelectedWork';
import { WorkWithMe } from '@/components/home/WorkWithMe';
import { StackMatrix } from '@/components/home/StackMatrix';
import { WritingTeaser } from '@/components/home/WritingTeaser';
import { ClosingCTA } from '@/components/home/ClosingCTA';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: `${site.name} — Full-Stack & AI Systems Developer`,
  description: `${site.positioning.lead} ${site.positioning.italicPhrase} ${site.positioning.trail}`,
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* 1. HERO (100svh): Kinetic Wordmark, Positioning, Proof Strip, Latent Monogram */}
      <DarkroomHero />

      {/* 2. SELECTED WORK: Flagship Case Studies with Develop Reveal & Metrics */}
      <SelectedWork />

      {/* 3. WORK WITH ME: 4 Structured Engagement Models */}
      <WorkWithMe />

      {/* 4. STACK MATRIX: Confident Tiering & Bidirectional Cross-Highlighting */}
      <StackMatrix />

      {/* 5. WRITING: Latest Deep Dives on Systems & Security */}
      <WritingTeaser />

      {/* 6. CLOSING CTA: "Let's develop something." + Click-to-Copy Email */}
      <ClosingCTA />
    </div>
  );
}
