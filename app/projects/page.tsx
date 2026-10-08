import React from 'react';
import type { Metadata } from 'next';
import { UniverseProjectsView } from '@/components/projects/UniverseProjectsView';

export const metadata: Metadata = {
  title: 'Selected Works & Engineering Projects · Prit Patel',
  description:
    'Documented compendium of autonomous AI systems, high-concurrency search APIs, regional compilers, and production platforms.',
};

export default function ProjectsPage() {
  return <UniverseProjectsView />;
}
