'use client';

import React from 'react';
import { HeroMonument } from '@/components/home/HeroMonument';
import { MarqueeStream } from '@/components/home/MarqueeStream';
import { EditorialManifesto } from '@/components/home/EditorialManifesto';
import { Thesis } from '@/components/home/Thesis';
import { HorizontalDomainDeck } from '@/components/home/HorizontalDomainDeck';
import { KineticProjectExhibition } from '@/components/home/KineticProjectExhibition';
import { ContactCTA } from '@/components/home/ContactCTA';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* 1. MONUMENTAL TYPOGRAPHIC HERO & INTERACTIVE SYSTEM DECK */}
      <HeroMonument />

      {/* 2. INFINITE HAIRLINE KINETIC MARQUEE */}
      <MarqueeStream />

      {/* 3. EDITORIAL MANIFESTO, ENGINEERING DOSSIER & CHRONOLOGICAL TRAJECTORY */}
      <EditorialManifesto />

      {/* 4. PHILOSOPHICAL THESIS / SCRUB REVEAL */}
      <Thesis />

      {/* 5. ARCHITECTURAL DOMAIN SHOWCASE (ZERO PILL BADGES) */}
      <HorizontalDomainDeck />

      {/* 6. SELECTED WORKS EXHIBITION & KINETIC TILT PERSPECTIVE */}
      <KineticProjectExhibition />

      {/* 7. DIRECT CHANNELS & EDITORIAL FOOTER */}
      <ContactCTA />
    </div>
  );
}
