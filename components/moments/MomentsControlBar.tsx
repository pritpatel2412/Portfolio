'use client';

import React, { useEffect, useState, useRef } from 'react';
import { RotateCcw, Smartphone, Monitor, Zap, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MomentsControls {
  speed: number;
  isReduced: boolean;
  isMobile: boolean;
  replayKey: number;
  setSpeed: (s: number) => void;
  setIsReduced: (r: boolean) => void;
  setIsMobile: (m: boolean) => void;
  triggerReplay: () => void;
}

export function useMomentsControls(): MomentsControls {
  const [speed, setSpeed] = useState<number>(1.0);
  const [isReduced, setIsReduced] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [replayKey, setReplayKey] = useState<number>(0);

  const triggerReplay = () => {
    setReplayKey((k) => k + 1);
  };

  return {
    speed,
    isReduced,
    isMobile,
    replayKey,
    setSpeed,
    setIsReduced,
    setIsMobile,
    triggerReplay,
  };
}

interface MomentsControlBarProps {
  controls: MomentsControls;
}

export function MomentsControlBar({ controls }: MomentsControlBarProps) {
  const {
    speed,
    isReduced,
    isMobile,
    setSpeed,
    setIsReduced,
    setIsMobile,
    triggerReplay,
  } = controls;

  // Real-time FPS telemetry
  const [fps, setFps] = useState<number>(60);
  const frameTimesRef = useRef<number[]>([]);
  const lastTimeRef = useRef<number>(performance.now());

  // Long tasks telemetry (> 50ms)
  const [longTaskCount, setLongTaskCount] = useState<number>(0);
  const [totalBlockingTime, setTotalBlockingTime] = useState<number>(0);

  useEffect(() => {
    let animId: number;

    const calcFps = (time: number) => {
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (delta > 0) {
        const currentFps = 1000 / delta;
        frameTimesRef.current.push(currentFps);
        if (frameTimesRef.current.length > 30) {
          frameTimesRef.current.shift();
        }
        const avgFps = Math.round(
          frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length
        );
        setFps(Math.min(60, avgFps));
      }

      animId = requestAnimationFrame(calcFps);
    };

    animId = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  // PerformanceObserver for Long Tasks
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          setLongTaskCount((c) => c + 1);
          setTotalBlockingTime((t) => Math.round(t + entry.duration));
        }
      });
      observer.observe({ entryTypes: ['longtask'] });
      return () => observer.disconnect();
    } catch {
      // Long task observer not supported in some test environments
    }
  }, []);

  return (
    <div className="sticky top-16 sm:top-20 z-30 bg-[var(--surface)]/95 backdrop-blur-md border-b border-[var(--line)] px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        {/* Left: Replay & Speed */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            type="button"
            onClick={triggerReplay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-ui)] bg-[var(--safelight)] text-[var(--on-safelight,#0A0908)] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity min-h-[36px]"
            title="Replay all signature moments"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>REPLAY ALL</span>
          </button>

          {/* Speed Selectors */}
          <div className="flex items-center border border-[var(--line)] rounded-[var(--radius-ui)] overflow-hidden bg-[var(--surface-2)]">
            <span className="px-2 py-1 text-[var(--text-dim)] uppercase text-[10px] border-r border-[var(--line)]">
              SPEED:
            </span>
            {[0.25, 0.5, 1.0].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSpeed(s)}
                className={cn(
                  'px-2.5 py-1 transition-colors min-h-[36px]',
                  speed === s
                    ? 'bg-[var(--text)] text-[var(--bg)] font-bold'
                    : 'text-[var(--text-dim)] hover:text-[var(--text)]'
                )}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Reduced-Motion Simulation Toggle */}
          <button
            type="button"
            onClick={() => setIsReduced(!isReduced)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-ui)] border transition-all min-h-[36px]',
              isReduced
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                : 'border-[var(--line)] text-[var(--text-dim)] hover:text-[var(--text)]'
            )}
            title="Simulate prefers-reduced-motion: reduce"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>REDUCED MOTION: {isReduced ? 'ON' : 'OFF'}</span>
          </button>

          {/* Viewport Width Toggle */}
          <button
            type="button"
            onClick={() => setIsMobile(!isMobile)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-ui)] border transition-all min-h-[36px]',
              isMobile
                ? 'bg-[var(--safelight)]/20 border-[var(--safelight)] text-[var(--safelight)] font-bold'
                : 'border-[var(--line)] text-[var(--text-dim)] hover:text-[var(--text)]'
            )}
            title="Toggle between Desktop and 390px Mobile View"
          >
            {isMobile ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
            <span>VIEWPORT: {isMobile ? '390px (PHONE)' : 'RESPONSIVE'}</span>
          </button>
        </div>

        {/* Right: Live Telemetry */}
        <div className="flex items-center gap-4 text-[11px] text-[var(--text-dim)]">
          <div className="flex items-center gap-1.5">
            <Zap className={cn('w-3.5 h-3.5', fps >= 55 ? 'text-emerald-400' : 'text-amber-400')} />
            <span>
              FPS: <strong className="text-[var(--text)]">{fps}</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                'w-2 h-2 rounded-full',
                longTaskCount === 0 ? 'bg-emerald-400' : 'bg-rose-400'
              )}
            />
            <span>
              LONG TASKS (&gt;50ms):{' '}
              <strong className="text-[var(--text)]">{longTaskCount}</strong> ({totalBlockingTime}ms)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
