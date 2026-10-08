import React from 'react';
import type { Metadata } from 'next';
import { UniverseAboutView } from '@/components/about/UniverseAboutView';

export const metadata: Metadata = {
  title: 'About · Prit Patel',
  description:
    'Full-stack and AI systems engineer. Background, engineering principles, hardware setup, and active pursuits.',
};

export default function AboutPage() {
  return <UniverseAboutView />;
}
