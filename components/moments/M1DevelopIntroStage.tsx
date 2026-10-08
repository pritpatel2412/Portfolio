'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface M1StageProps {
  speed: number;
  isReduced: boolean;
  isMobile: boolean;
  replayKey: number;
}

const NAME_LETTERS = 'PRIT PATEL'.split('');

export function M1DevelopIntroStage({ speed, isReduced, isMobile, replayKey }: M1StageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const ctasRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<'IDLE' | 'VEIL' | 'DEVELOP' | 'CTAS' | 'COMPLETE'>('IDLE');
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [skipped, setSkipped] = useState<boolean>(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const finishIntro = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.progress(1);
    }
    setPhase('COMPLETE');
    setSkipped(true);
  }, []);

  useEffect(() => {
    // Reset state on replayKey change
    setSkipped(false);
    setElapsedMs(0);

    if (isReduced) {
      setPhase('COMPLETE');
      if (veilRef.current) veilRef.current.style.opacity = '0';
      if (ctasRef.current) {
        ctasRef.current.style.opacity = '1';
        ctasRef.current.style.transform = 'none';
      }
      letterRefs.current.forEach((el) => {
        if (el) el.style.fontVariationSettings = "'wdth' 125";
      });
      return;
    }

    setPhase('VEIL');
    const startTime = performance.now();

    // Kill any prior timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Set initial styles
    if (veilRef.current) {
      gsap.set(veilRef.current, {
        opacity: 1,
        clipPath: 'circle(0% at 50% 50%)',
        filter: 'brightness(0.25) contrast(1.5)',
      });
    }

    letterRefs.current.forEach((el) => {
      if (el) gsap.set(el, { fontVariationSettings: "'wdth' 62" });
    });

    if (ctasRef.current) {
      gsap.set(ctasRef.current, { opacity: 0, y: 24 });
    }

    const tl = gsap.timeline({
      timeScale: speed,
      onUpdate: () => {
        setElapsedMs(Math.round(performance.now() - startTime));
      },
      onComplete: () => {
        setPhase('COMPLETE');
      },
    });

    timelineRef.current = tl;

    // Timeline steps per spec:
    // 0 -> 150ms: grain & black veil hold at 100%
    tl.to({}, { duration: 0.15 });

    // 150 -> 950ms (0.8s duration):
    // Radial clip-path opens while filter settles from brightness .25 / contrast 1.5 to 1
    // Name wdth axis eases 62 -> 125 with 22ms per-letter stagger (disabled on mobile)
    tl.add(() => setPhase('DEVELOP'));

    tl.to(
      veilRef.current,
      {
        clipPath: 'circle(150% at 50% 50%)',
        filter: 'brightness(1) contrast(1)',
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      },
      0.15
    );

    const letterStagger = isMobile ? 0 : 0.022;
    letterRefs.current.forEach((el, i) => {
      if (el) {
        tl.to(
          el,
          {
            fontVariationSettings: "'wdth' 125",
            duration: 0.8,
            ease: 'expo.out',
          },
          0.15 + i * letterStagger
        );
      }
    });

    // 950 -> 1400ms (0.45s duration): CTAs and availability pill rise 24px and fade in
    tl.add(() => setPhase('CTAS'), 0.95);
    tl.to(
      ctasRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: 'expo.out',
      },
      0.95
    );

    // Skip listener: keydown, click, scroll
    const handleSkip = () => finishIntro();
    window.addEventListener('keydown', handleSkip, { once: true });

    return () => {
      tl.kill();
      window.removeEventListener('keydown', handleSkip);
    };
  }, [speed, isReduced, isMobile, replayKey, finishIntro]);

  return (
    <div
      ref={containerRef}
      className="relative rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface)] overflow-hidden p-6 sm:p-8"
      onClick={finishIntro}
      role="region"
      aria-label="M1 Develop Intro Isolated Stage"
    >
      {/* Telemetry Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[var(--line)] font-mono text-xs text-[var(--text-dim)]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--safelight)]" />
          <strong className="text-[var(--text)] uppercase">M1 · DEVELOP INTRO</strong>
          <span className="text-[var(--safelight)]">[{phase}]</span>
          {skipped && <span className="text-amber-400 font-bold">(SKIPPED)</span>}
        </div>
        <div>
          <span>ELAPSED: </span>
          <strong className="text-[var(--text)]">{elapsedMs}ms</strong> / 1400ms spec
          <span className="ml-2 opacity-60">(Click anywhere or press any key to skip)</span>
        </div>
      </div>

      {/* Stage Sandbox Area */}
      <div className="relative min-h-[300px] flex flex-col justify-center items-center select-none py-8">
        {/* Real Painted Name underneath (LCP element) */}
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-[-0.03em] text-[var(--text)] text-center flex flex-wrap justify-center">
          {NAME_LETTERS.map((char, idx) => (
            <span
              key={idx}
              ref={(el) => {
                letterRefs.current[idx] = el;
              }}
              className="inline-block transition-none"
              style={{
                fontVariationSettings: "'wdth' 62",
                marginRight: char === ' ' ? '0.3em' : '0.02em',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        <p className="font-text text-sm sm:text-base text-[var(--text-dim)] mt-4 max-w-lg text-center">
          I build high-throughput systems and precision web interfaces. 400+ PRs in production.
        </p>

        {/* CTAs Container (Animates in at 950–1400ms) */}
        <div
          ref={ctasRef}
          className="mt-6 flex flex-wrap items-center justify-center gap-4"
        >
          <span className="px-5 py-2.5 bg-[var(--safelight)] text-[var(--on-safelight,#0A0908)] font-mono text-xs uppercase font-bold rounded-[var(--radius-ui)]">
            See selected work
          </span>
          <span className="px-5 py-2.5 border border-[var(--line)] text-[var(--text)] font-mono text-xs uppercase rounded-[var(--radius-ui)]">
            Get in touch
          </span>
        </div>

        {/* Fixed Veil Overlay */}
        <div
          ref={veilRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[var(--bg)] z-10 flex items-center justify-center"
        >
          <div className="w-full h-full bg-[radial-gradient(circle,rgba(255,91,46,0.1)_0%,rgba(10,9,8,0.98)_80%)]" />
        </div>
      </div>
    </div>
  );
}
