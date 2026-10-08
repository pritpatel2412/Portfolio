import React from 'react';
import type { Metadata } from 'next';
import { UniverseResumeView } from '@/components/resume/UniverseResumeView';

export const metadata: Metadata = {
  title: 'Résumé & CV · Prit Patel',
  description:
    'Verified engineering resume of Prit Patel. Full-Stack and AI Systems Developer with direct PDF download.',
};

export default function ResumePage() {
  return <UniverseResumeView />;
}
