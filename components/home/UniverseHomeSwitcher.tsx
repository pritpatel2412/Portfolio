'use client';

import React from 'react';
import { useUniverse } from '@/lib/universe';
import { EditorialHome } from './universes/EditorialHome';
import { MaximalistHome } from './universes/MaximalistHome';
import { JapandiHome } from './universes/JapandiHome';
import { SwissHome } from './universes/SwissHome';
import { BrutalistHome } from './universes/BrutalistHome';
import { NoirHome } from './universes/NoirHome';
import { ArchiveHome } from './universes/ArchiveHome';

export function UniverseHomeSwitcher() {
  const { universe, isTransitioning } = useUniverse();

  return (
    <div
      className={`w-full transition-opacity duration-300 ${
        isTransitioning ? 'opacity-70' : 'opacity-100'
      }`}
    >
      {universe === 'editorial' && <EditorialHome />}
      {universe === 'maximalist' && <MaximalistHome />}
      {universe === 'japandi' && <JapandiHome />}
      {universe === 'swiss' && <SwissHome />}
      {universe === 'brutalist' && <BrutalistHome />}
      {universe === 'noir' && <NoirHome />}
      {universe === 'archive' && <ArchiveHome />}
    </div>
  );
}
