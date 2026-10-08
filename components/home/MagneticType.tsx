'use client';

import React, { useRef, useEffect, useState } from 'react';

interface MagneticTypeProps {
  text: string;
  className?: string;
  onTelemetry?: (telemetry: { wght: number; wdth: number }) => void;
}

export function MagneticType({ text, className = '', onTelemetry }: MagneticTypeProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pointerRef = useRef({ x: -999, y: -999 });
  const [telemetry, setTelemetry] = useState({ wght: 700, wdth: 100 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (prefersReducedMotion || !hasFinePointer) return;

    const handlePointerMove = (e: PointerEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerLeave = () => {
      pointerRef.current = { x: -999, y: -999 };
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    let animationId: number;

    const updateLoop = () => {
      let maxFactor = 0;
      let activeWght = 400;
      let activeWdth = 85;

      letterRefs.current.forEach((span) => {
        if (!span) return;
        const rect = span.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const letterCenterY = rect.top + rect.height / 2;

        const dx = pointerRef.current.x - letterCenterX;
        const dy = pointerRef.current.y - letterCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 240;

        let factor = 0;
        if (dist < radius) {
          factor = Math.max(0, 1 - dist / radius);
          if (factor > maxFactor) maxFactor = factor;
        }

        const targetWght = Math.round(350 + factor * 450); // 350 -> 800
        const targetWdth = Math.round(80 + factor * 20); // 80 -> 100

        span.style.fontVariationSettings = `'wght' ${targetWght}, 'wdth' ${targetWdth}`;
      });

      if (maxFactor > 0) {
        activeWght = Math.round(350 + maxFactor * 450);
        activeWdth = Math.round(80 + maxFactor * 20);
        setTelemetry({ wght: activeWght, wdth: activeWdth });
        onTelemetry?.({ wght: activeWght, wdth: activeWdth });
      }

      animationId = requestAnimationFrame(updateLoop);
    };

    animationId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(animationId);
    };
  }, [onTelemetry]);

  return (
    <div className="relative select-none">
      <h1
        ref={containerRef}
        aria-label={text}
        className={`font-display text-[clamp(3.5rem,15.5vw,16rem)] font-extrabold tracking-[-0.045em] leading-[0.84] text-[var(--ink)] flex flex-wrap ${className}`}
      >
        {text.split('').map((char, index) => {
          if (char === ' ') {
            return (
              <span key={index} className="inline-block w-[0.25em]" aria-hidden="true">
                &nbsp;
              </span>
            );
          }
          return (
            <span
              key={index}
              ref={(el) => { letterRefs.current[index] = el; }}
              aria-hidden="true"
              className="inline-block transition-[font-variation-settings] duration-75 will-change-[font-variation-settings]"
              style={{ fontVariationSettings: "'wght' 700, 'wdth' 100" }}
            >
              {char}
            </span>
          );
        })}
      </h1>
    </div>
  );
}
