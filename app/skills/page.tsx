import React from 'react';
import type { Metadata } from 'next';
import { UniverseSkillsView } from '@/components/skills/UniverseSkillsView';

export const metadata: Metadata = {
  title: 'Skills & Capabilities Matrix · Prit Patel',
  description:
    'Relational matrix of software engineering skills mapped directly to shipped production systems and career experience.',
};

export default function SkillsPage() {
  return <UniverseSkillsView />;
}
