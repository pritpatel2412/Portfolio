'use client';

import React, { useEffect, useState, useRef } from 'react';
import { reduced } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface ChapterStampProps {
  label: string;
  sublabel?: string;
  className?: string;
}

export function ChapterStamp({ label, sublabel, className }: ChapterStampProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayedText, setDisplayedText] = useState<string>('');
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  useEffect(() => {
    if (reduced()) {
      setDisplayedText(label);
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          let currentIdx = 0;
          const interval = setInterval(() => {
            currentIdx += 1;
            setDisplayedText(label.slice(0, currentIdx));
            if (currentIdx >= label.length) {
              clearInterval(interval);
            }
          }, 30); // 30ms per character per Brief M7 spec
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [label, hasStarted]);

  return (
    <div ref={containerRef} className={cn('flex flex-col gap-1 my-6', className)}>
      <div className="flex items-center gap-2 font-mono text-xs text-[var(--safelight)] uppercase tracking-widest">
        <span>{displayedText}</span>
        {hasStarted && displayedText.length < label.length && (
          <span className="w-1.5 h-3.5 bg-[var(--safelight)] animate-pulse inline-block" />
        )}
      </div>
      {sublabel && (
        <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-[var(--text)] mt-1">
          {sublabel}
        </h2>
      )}
    </div>
  );
}
