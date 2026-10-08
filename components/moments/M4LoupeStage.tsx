'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface M4StageProps {
  speed: number;
  isReduced: boolean;
  isMobile: boolean;
  replayKey: number;
}

export function M4LoupeStage({ speed, isReduced, isMobile }: M4StageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [hoverIntentReady, setHoverIntentReady] = useState<boolean>(false);
  const [lensPos, setLensPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const intentTimerRef = useRef<NodeJS.Timeout | null>(null);
  const quickToXRef = useRef<((val: number) => void) | null>(null);
  const quickToYRef = useRef<((val: number) => void) | null>(null);

  const LENS_SIZE = 140; // 140px spec
  const MAGNIFICATION = 2.2; // 2.2x spec

  useEffect(() => {
    if (!lensRef.current) return;
    const duration = isReduced ? 0 : 0.18 / speed;

    quickToXRef.current = gsap.quickTo(lensRef.current, 'x', {
      duration,
      ease: 'power2.out',
    });
    quickToYRef.current = gsap.quickTo(lensRef.current, 'y', {
      duration,
      ease: 'power2.out',
    });
  }, [speed, isReduced]);

  const handleMouseEnter = () => {
    if (isMobile) return;
    // 80ms hover-intent delay per spec
    intentTimerRef.current = setTimeout(() => {
      setHoverIntentReady(true);
      setIsActive(true);
    }, 80);
  };

  const handleMouseLeave = () => {
    if (intentTimerRef.current) clearTimeout(intentTimerRef.current);
    setIsActive(false);
    setHoverIntentReady(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !frameRef.current) return;

    const rect = frameRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    setLensPos({ x: Math.round(relX), y: Math.round(relY) });

    if (quickToXRef.current && quickToYRef.current) {
      quickToXRef.current(relX - LENS_SIZE / 2);
      quickToYRef.current(relY - LENS_SIZE / 2);
    }
  };

  return (
    <div
      className="rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface)] overflow-hidden p-6 sm:p-8"
      role="region"
      aria-label="M4 Loupe Cursor Stage"
    >
      {/* Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[var(--line)] font-mono text-xs text-[var(--text-dim)]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--safelight)]" />
          <strong className="text-[var(--text)] uppercase">M4 · LOUPE CURSOR</strong>
          <span className="text-[var(--safelight)]">
            [{isActive && hoverIntentReady ? 'ACTIVE' : 'IDLE'}]
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>
            HOVER INTENT: <strong>{hoverIntentReady ? '80ms ELAPSED' : 'WAITING'}</strong>
          </span>
          <span>
            LENS: <strong>140px · 2.2x ZOOM</strong> (quickTo 0.18s)
          </span>
        </div>
      </div>

      {/* Loupe Demo Frame */}
      <div className="flex flex-col items-center">
        <div
          ref={frameRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          className={cn(
            'relative w-full max-w-2xl aspect-[3/2] rounded-[var(--radius-frame)] overflow-hidden border border-[var(--line)] bg-[var(--surface-2)] select-none',
            isActive && hoverIntentReady && !isMobile ? 'cursor-none' : 'cursor-default'
          )}
        >
          {/* Base Image */}
          <Image
            src="/Searchmind API.png"
            alt="SearchMind API system dashboard frame"
            fill
            sizes="800px"
            className="object-cover"
          />

          {/* Contact Sheet Frame Overlay Header */}
          <div className="absolute top-0 left-0 right-0 px-3 py-1.5 bg-[var(--bg)]/90 border-b border-[var(--line)] flex justify-between font-mono text-[10px] text-[var(--text-dim)] uppercase">
            <span>▷ 02 · SEARCHMIND API</span>
            <span>MAGNIFICATION 2.2X</span>
          </div>

          {/* Loupe Magnifier Element (aria-hidden per spec) */}
          {isActive && hoverIntentReady && !isMobile && (
            <div
              ref={lensRef}
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-0 rounded-full border-2 border-[var(--text)] shadow-2xl overflow-hidden bg-[var(--bg)] z-30"
              style={{
                width: `${LENS_SIZE}px`,
                height: `${LENS_SIZE}px`,
              }}
            >
              {/* Magnified Image Content */}
              <div
                className="absolute inset-0 bg-cover bg-no-repeat"
                style={{
                  backgroundImage: "url('/Searchmind API.png')",
                  backgroundSize: `${MAGNIFICATION * 100}%`,
                  backgroundPosition: `${(lensPos.x / (frameRef.current?.clientWidth || 1)) * 100}% ${(lensPos.y / (frameRef.current?.clientHeight || 1)) * 100}%`,
                }}
              />
              {/* Subtle lens glare reflection */}
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20 pointer-events-none" />
            </div>
          )}
        </div>

        <p className="font-mono text-xs text-[var(--text-dim)] mt-4 text-center">
          [ Hover over frame with fine pointer to trigger 80ms intent delay, 140px lens and 2.2× magnification ]
        </p>
      </div>
    </div>
  );
}
