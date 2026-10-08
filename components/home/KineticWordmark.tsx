'use client';

import React, { useRef, useEffect } from 'react';

interface KineticWordmarkProps {
  text: string;
  className?: string;
}

export function KineticWordmark({ text, className }: KineticWordmarkProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Respect accessibility and touch devices per Brief §4 & §7.1
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

    if (prefersReducedMotion || isTouch) return;

    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let targetX = -9999;
    let targetY = -9999;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(updateAxes);
      }
    };

    const updateAxes = () => {
      rafId = null;
      const letters = letterRefs.current;
      const maxDist = 240;

      for (let i = 0; i < letters.length; i++) {
        const span = letters[i];
        if (!span) continue;

        const rect = span.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dist = Math.hypot(targetX - centerX, targetY - centerY);

        if (dist < maxDist) {
          const factor = Math.cos((dist / maxDist) * (Math.PI / 2)); // Smooth cosine curve
          const width = 100 + factor * 25; // Brief §4: wdth axis 100 to 125
          const weight = 800 + factor * 100; // wght axis 800 to 900
          span.style.fontVariationSettings = `'wdth' ${width.toFixed(1)}, 'wght' ${weight.toFixed(0)}`;
        } else {
          span.style.fontVariationSettings = `'wdth' 100, 'wght' 800`;
        }
      }
    };

    const handleMouseLeave = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      const letters = letterRefs.current;
      for (let i = 0; i < letters.length; i++) {
        const span = letters[i];
        if (span) {
          span.style.fontVariationSettings = `'wdth' 100, 'wght' 800`;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const characters = text.split('');

  return (
    <h1
      ref={containerRef}
      className={className}
      aria-label={text}
      style={{
        fontFeatureSettings: '"salt", "ss01"',
        willChange: 'font-variation-settings',
      }}
    >
      {characters.map((char, index) => {
        if (char === ' ') {
          return (
            <span key={index} className="inline-block w-[0.25em]">
              &nbsp;
            </span>
          );
        }
        return (
          <span
            key={index}
            ref={(el) => {
              letterRefs.current[index] = el;
            }}
            className="inline-block transition-[font-variation-settings] duration-150 ease-out"
            style={{
              fontVariationSettings: "'wdth' 100, 'wght' 800",
            }}
          >
            {char}
          </span>
        );
      })}
    </h1>
  );
}
