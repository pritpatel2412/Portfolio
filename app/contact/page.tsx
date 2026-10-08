import React from 'react';
import type { Metadata } from 'next';
import { UniverseContactView } from '@/components/contact/UniverseContactView';

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
  return <UniverseContactView />;
}
