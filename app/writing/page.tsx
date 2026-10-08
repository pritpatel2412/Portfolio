import React from 'react';
import type { Metadata } from 'next';
import { UniverseWritingView } from '@/components/writing/UniverseWritingView';

export const metadata: Metadata = {
  title: 'Technical Writing & Field Notes — Prit Patel',
  description:
    'Deep reflections on compiler architectures, AST tokenization, autonomous agent swarms, and high-concurrency systems engineering learned in production.',
  openGraph: {
    title: 'Technical Writing & Field Notes — Prit Patel',
    description:
      'Deep reflections on compiler architectures, AST tokenization, autonomous agent swarms, and high-concurrency systems engineering learned in production.',
    url: 'https://pritpatel.dev/writing',
    type: 'website',
  },
};

export default function WritingIndexPage() {
  return <UniverseWritingView />;
}
