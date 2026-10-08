import React from 'react';
import type { Metadata } from 'next';
import { UniverseExperienceView } from '@/components/experience/UniverseExperienceView';

export const metadata: Metadata = {
  title: 'Experience & Career Log · Prit Patel',
  description:
    'Chronological engineering timeline of production roles, systems delivered, and technical impact.',
};

export default function ExperiencePage() {
  return <UniverseExperienceView />;
}
