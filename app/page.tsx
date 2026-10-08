import React from 'react';
import type { Metadata } from 'next';
import { UniverseHomeSwitcher } from '@/components/home/UniverseHomeSwitcher';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: `${site.name} — Full-Stack & AI Systems Developer (Seven Visual Universes)`,
  description: `${site.positioning.lead} ${site.positioning.italicPhrase} ${site.positioning.trail}`,
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden min-h-screen">
      <UniverseHomeSwitcher />
    </div>
  );
}
