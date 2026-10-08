'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface DevelopProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  threshold?: number;
  forceDevelop?: boolean;
  as?: 'div' | 'span' | 'section' | 'article' | 'h1' | 'h2' | 'h3' | 'figure';
}

export function Develop({
  children,
  className,
  delayMs = 0,
  threshold = 0.15,
  forceDevelop = false,
  as: Component = 'div',
}: DevelopProps) {
  const ref = useRef<HTMLElement>(null);
  const [isDeveloped, setIsDeveloped] = useState(forceDevelop);

  useEffect(() => {
    if (forceDevelop) {
      setIsDeveloped(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // Check if reduced motion is requested
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          if (delayMs > 0 && !prefersReducedMotion) {
            const timer = setTimeout(() => {
              setIsDeveloped(true);
            }, delayMs);
            observer.unobserve(element);
            return () => clearTimeout(timer);
          } else {
            setIsDeveloped(true);
            observer.unobserve(element);
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -5% 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, delayMs, forceDevelop]);

  return (
    <Component
      ref={ref as unknown as React.RefObject<HTMLDivElement>}
      className={cn(
        'develop-filter',
        isDeveloped && 'is-developed',
        className
      )}
    >
      {children}
    </Component>
  );
}
