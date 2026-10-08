'use client';

import React, { useEffect, useState } from 'react';

export function ReadingProgress() {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      if (totalH > 0) {
        const current = (window.scrollY / totalH) * 100;
        setProgress(Math.min(100, Math.max(0, current)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-16 sm:top-20 left-0 right-0 h-[2px] bg-[var(--line)] z-40 pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-[var(--safelight)] transition-all duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
