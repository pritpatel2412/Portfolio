'use client';

import { useEffect, useRef } from 'react';
import { site } from '@/content/site';

export function ConsoleHello() {
  const hasLogged = useRef(false);

  useEffect(() => {
    if (hasLogged.current || typeof window === 'undefined') return;
    hasLogged.current = true;

    const email = site.email || 'pritpatel2412@gmail.com';
    const banner = `
  %c┌────────────────────────────────────────────────────────────┐
  │  PRIT PATEL · BACKEND & DISTRIBUTED SYSTEMS ARCHITECT      │
  │  Building high-throughput engines, compilers & AI swarms.  │
  │  Available for hire · ${email.padEnd(35)} │
  └────────────────────────────────────────────────────────────┘
`;

    // Stylized console output in Darkroom orange & cream
    console.info(
      banner,
      'color: #FF5B2E; font-family: monospace; font-size: 11px; font-weight: bold;'
    );
    console.info(
      '%c▷ Darkroom Design System active. Press ? for keyboard shortcuts or ⌘K for command palette.',
      'color: #A39B8F; font-family: monospace; font-size: 11px;'
    );
  }, []);

  return null;
}
