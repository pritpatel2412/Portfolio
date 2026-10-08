'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface M2StageProps {
  speed: number;
  isReduced: boolean;
  isMobile: boolean;
  replayKey: number;
}

const LETTERS = 'PRIT PATEL'.split('');

export function M2NameResponseStage({ speed, isReduced, isMobile }: M2StageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const quickTosRef = useRef<((val: number) => void)[]>([]);

  // Simulation controls
  const [scrollProgress, setScrollProgress] = useState<number>(0); // 0 to 1
  const [nearestDistance, setNearestDistance] = useState<number>(999);

  // Setup gsap.quickTo on letter widths
  useEffect(() => {
    quickTosRef.current = letterRefs.current.map((el) => {
      if (!el) return () => {};
      return gsap.quickTo(el, 'fontVariationSettings', {
        duration: 0.35 / speed,
        ease: 'power2.out',
      });
    });
  }, [speed]);

  // Pointer proximity handler (within 240px, fine pointer only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReduced || isMobile) return;

    let minD = 999;
    letterRefs.current.forEach((el, idx) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - charCenterX, e.clientY - charCenterY);

      if (dist < minD) minD = Math.round(dist);

      const quickTo = quickTosRef.current[idx];
      if (dist < 240) {
        // Linear interpolation from 100 (at 240px) up to 125 (at 0px)
        const factor = 1 - dist / 240;
        const targetWdth = Math.round(100 + factor * 25);
        el.style.fontVariationSettings = `'wdth' ${targetWdth}`;
      } else {
        el.style.fontVariationSettings = "'wdth' 100";
      }
    });

    setNearestDistance(minD);
  };

  const handleMouseLeave = () => {
    letterRefs.current.forEach((el) => {
      if (el) el.style.fontVariationSettings = "'wdth' 100";
    });
    setNearestDistance(999);
  };

  // Scroll exit scrub simulation: wdth 125 -> 62, opacity 1 -> .2, yPercent 0 -> -8
  const exitWdth = isReduced ? 100 : Math.round(125 - scrollProgress * (125 - 62));
  const exitOpacity = Number((1 - scrollProgress * 0.8).toFixed(2));
  const exitY = Number((-scrollProgress * 8).toFixed(2));

  return (
    <div
      ref={containerRef}
      className="rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface)] overflow-hidden p-6 sm:p-8"
      role="region"
      aria-label="M2 Name Response & Exit Stage"
    >
      {/* Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[var(--line)] font-mono text-xs text-[var(--text-dim)]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--safelight)]" />
          <strong className="text-[var(--text)] uppercase">M2 · NAME RESPONSE &amp; EXIT</strong>
        </div>
        <div className="flex items-center gap-4">
          <span>
            PROXIMITY (RADIUS 240px):{' '}
            <strong className="text-[var(--text)]">
              {nearestDistance < 240 ? `${nearestDistance}px (ACTIVE)` : 'OUT OF RANGE'}
            </strong>
          </span>
        </div>
      </div>

      {/* Interactive Proximity Stage */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative min-h-[220px] flex items-center justify-center p-8 bg-[var(--surface-2)] border border-[var(--line)] rounded-[var(--radius-ui)] select-none cursor-crosshair overflow-hidden"
      >
        <div
          className="text-center transition-all duration-75"
          style={{
            opacity: exitOpacity,
            transform: `translateY(${exitY}%)`,
          }}
        >
          <div className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-[-0.03em] text-[var(--text)] flex flex-wrap justify-center">
            {LETTERS.map((char, idx) => (
              <span
                key={idx}
                ref={(el) => {
                  letterRefs.current[idx] = el;
                }}
                className="inline-block transition-[font-variation-settings] duration-150"
                style={{
                  fontVariationSettings: `'wdth' ${exitWdth}`,
                  marginRight: char === ' ' ? '0.35em' : '0.02em',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
          <p className="font-mono text-[11px] text-[var(--text-dim)] mt-3">
            [ Move pointer over letters to trigger 240px proximity width expansion ]
          </p>
        </div>
      </div>

      {/* Scroll Exit Scrub Simulator */}
      <div className="mt-6 pt-4 border-t border-[var(--line)]">
        <div className="flex items-center justify-between font-mono text-xs text-[var(--text-dim)] mb-2">
          <span>SIMULATED SCROLL EXIT (0 to 100vh):</span>
          <span className="text-[var(--text)] font-bold">
            PROGRESS: {Math.round(scrollProgress * 100)}% | WDTH: {exitWdth} | OPACITY: {exitOpacity} | Y: {exitY}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={scrollProgress}
          onChange={(e) => setScrollProgress(parseFloat(e.target.value))}
          className="w-full accent-[var(--safelight)] cursor-pointer"
          aria-label="Simulate scrubbed scroll exit"
        />
        <div className="flex justify-between font-mono text-[10px] text-[var(--text-dim)] mt-1">
          <span>0vh (At rest: wdth 125, opacity 1.0)</span>
          <span>100vh (Scrubbed exit: wdth 62, opacity 0.2, y -8%)</span>
        </div>
      </div>
    </div>
  );
}
