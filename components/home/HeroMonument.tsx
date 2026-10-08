'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { site } from '@/content/site';
import { sound } from '@/lib/sound';
import { ArrowDownRight, Terminal, Cpu, Database, Activity, Sparkles, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';

export function HeroMonument() {
  const [localTime, setLocalTime] = useState('');
  const [activeTab, setActiveTab] = useState<'telemetry' | 'proofs' | 'systems'>('telemetry');
  const [isMuted, setIsMuted] = useState(false);
  const [domCount, setDomCount] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMuted(sound.isMuted());

    // Live Clock
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: site.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setLocalTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    if (typeof document !== 'undefined') {
      setDomCount(document.querySelectorAll('*').length);
    }

    // GSAP Stagger Entrance
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        '.hero-masthead-item',
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }
      )
      .fromTo(
        '.hero-line-1',
        { y: 80, opacity: 0, skewY: 3 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.2 },
        '-=0.5'
      )
      .fromTo(
        '.hero-line-2',
        { y: 80, opacity: 0, skewY: -3 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.2 },
        '-=1'
      )
      .fromTo(
        '.hero-manifesto',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        '-=0.8'
      )
      .fromTo(
        '.hero-deck',
        { scale: 0.96, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 },
        '-=0.9'
      );
    }, heroRef);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, []);

  const handleTabChange = (tab: 'telemetry' | 'proofs' | 'systems') => {
    sound.click(1600, 0.02);
    setActiveTab(tab);
  };

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.switch();
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[96svh] flex flex-col justify-between max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 pt-4 pb-8 w-full select-none"
    >
      {/* 1. TOP MASTHEAD / METADATA BAND */}
      <div className="hero-masthead-item border-b border-[var(--line)] pb-4 pt-2 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-wider text-[var(--ink-muted)]">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
          </span>
          <span className="text-[var(--ink)] font-bold tracking-widest">PRIT PATEL</span>
          <span className="text-[var(--line)]">/</span>
          <span>COMPILERS &amp; AUTONOMOUS SYSTEMS</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="hidden sm:inline">22.3072° N · 73.1812° E (VADODARA)</span>
          <span className="hidden sm:inline text-[var(--line)]">|</span>
          <span className="text-[var(--accent)] font-semibold">
            {localTime ? `${localTime} IST` : 'LIVE'}
          </span>
          <span className="text-[var(--line)]">|</span>
          <button
            type="button"
            onClick={handleToggleSound}
            className="flex items-center gap-1.5 hover:text-[var(--ink)] transition-colors cursor-pointer"
            title={isMuted ? 'Unmute tactile audio' : 'Mute tactile audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[var(--accent)]" />}
            <span className="text-[10px]">{isMuted ? 'AUDIO OFF' : 'AUDIO ON'}</span>
          </button>
        </div>
      </div>

      {/* 2. THE MONUMENTAL TYPOGRAPHIC HERO */}
      <div className="my-auto py-8 md:py-12 flex flex-col gap-10">
        <div ref={nameRef} className="flex flex-col py-2">
          {/* Line 1: Heavy Architectural Grotesque */}
          <div className="hero-line-1 overflow-hidden pb-2">
            <h1 className="font-sans text-[clamp(4.2rem,15.5vw,13.5rem)] font-black text-[var(--ink)] tracking-[-0.045em] leading-[0.85] m-0 p-0 uppercase">
              PRIT
            </h1>
          </div>

          {/* Line 2: Offset Editorial Italic Serif */}
          <div className="hero-line-2 overflow-hidden pb-4 flex items-baseline">
            <h2 className="md:pl-[12vw] font-serif italic font-light text-[clamp(3.8rem,14.5vw,12.5rem)] text-[var(--accent)] tracking-[-0.03em] leading-[0.85] m-0 p-0">
              Patel<span className="text-[var(--ink)] not-italic">.</span>
            </h2>
          </div>
        </div>

        {/* 3. ASYMMETRICAL EDITORIAL ARCHITECTURE & SYSTEM DECK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pt-4 border-t border-[var(--line)]">
          {/* Left Column: Direct Authentic Manifesto */}
          <div className="hero-manifesto lg:col-span-7 space-y-6">
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-bold">
              [DISCIPLINE &amp; POSITIONING]
            </div>

            <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[var(--ink)] font-normal leading-[1.18] tracking-tight">
              I build software for environments where <span className="italic text-[var(--accent)] font-light">failure is expensive</span>. Deterministic compiler architectures, autonomous agent loops, and backends that scale without crumbling under load.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
              <Link
                href="/projects"
                onMouseEnter={() => sound.tick()}
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--ink)] text-[var(--bg)] font-bold hover:bg-[var(--accent)] transition-colors"
              >
                <span>EXPLORE PRODUCTION ARCHITECTURE</span>
                <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </Link>

              <Link
                href="/resume"
                onMouseEnter={() => sound.tick()}
                className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink)] transition-colors"
              >
                <span>VERIFIED RECORD (9.67 GPA)</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Tactile Interactive System Deck */}
          <div className="hero-deck lg:col-span-5 bg-[var(--bg-surface)] border border-[var(--line)] p-5 md:p-6 transition-all duration-300">
            {/* Header Tabs */}
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleTabChange('telemetry')}
                  className={`px-2 py-1 transition-colors cursor-pointer ${
                    activeTab === 'telemetry'
                      ? 'bg-[var(--accent)] text-[var(--bg)] font-bold'
                      : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  TELEMETRY
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange('proofs')}
                  className={`px-2 py-1 transition-colors cursor-pointer ${
                    activeTab === 'proofs'
                      ? 'bg-[var(--accent)] text-[var(--bg)] font-bold'
                      : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  PROOFS
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange('systems')}
                  className={`px-2 py-1 transition-colors cursor-pointer ${
                    activeTab === 'systems'
                      ? 'bg-[var(--accent)] text-[var(--bg)] font-bold'
                      : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  SYSTEMS
                </button>
              </div>

              <span className="text-[10px] text-[var(--ink-muted)] font-mono">
                {activeTab.toUpperCase()}
              </span>
            </div>

            {/* Tab Body */}
            <div className="py-4 font-mono text-xs space-y-3">
              {activeTab === 'telemetry' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline border-b border-[var(--line)]/50 pb-2">
                    <span className="text-[var(--ink-muted)]">LOCATION:</span>
                    <span className="text-[var(--ink)] font-bold">Vadodara, Gujarat (IN)</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-[var(--line)]/50 pb-2">
                    <span className="text-[var(--ink-muted)]">COORDINATES:</span>
                    <span className="text-[var(--ink)] font-mono">22.3072° N · 73.1812° E</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-[var(--line)]/50 pb-2">
                    <span className="text-[var(--ink-muted)]">DOM NODES:</span>
                    <span className="text-[var(--accent)] font-bold">{domCount || 420} ACTIVE</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[var(--ink-muted)]">AVAILABILITY:</span>
                    <span className="text-emerald-600 font-bold">OPEN FOR 2026 ENGAGEMENTS</span>
                  </div>
                </div>
              )}

              {activeTab === 'proofs' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline border-b border-[var(--line)]/50 pb-2">
                    <span className="text-[var(--ink-muted)]">ACADEMIC STANDING:</span>
                    <span className="text-[var(--accent)] font-bold">9.67 GPA (CSE)</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-[var(--line)]/50 pb-2">
                    <span className="text-[var(--ink-muted)]">ALGORITHMIC MASTERY:</span>
                    <span className="text-[var(--ink)] font-bold">400+ LEETCODE VERIFIED</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-[var(--line)]/50 pb-2">
                    <span className="text-[var(--ink-muted)]">FOCUS DOMAINS:</span>
                    <span className="text-[var(--ink)] font-mono">GRAPHS · DP · TREES</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[var(--ink-muted)]">ENGINEERING STANCE:</span>
                    <span className="text-[var(--ink)]">DETERMINISTIC &gt; PROBABILISTIC</span>
                  </div>
                </div>
              )}

              {activeTab === 'systems' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline border-b border-[var(--line)]/50 pb-2">
                    <span className="text-[var(--ink-muted)]">AUTONOMOUS ENGINE:</span>
                    <span className="text-[var(--accent)] font-bold">RedForge v1.4</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-[var(--line)]/50 pb-2">
                    <span className="text-[var(--ink-muted)]">COMPILER TOOLCHAIN:</span>
                    <span className="text-[var(--ink)] font-bold">KemLang / Monaco</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-[var(--line)]/50 pb-2">
                    <span className="text-[var(--ink-muted)]">VECTOR RETRIEVAL:</span>
                    <span className="text-[var(--ink)]">Searchmind (Sub-150ms)</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[var(--ink-muted)]">REALTIME VOICE:</span>
                    <span className="text-[var(--ink)]">Aria Voice Agent</span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Telemetry note */}
            <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between text-[10px] text-[var(--ink-muted)] font-mono">
              <span>LIVE ARTIFACT TELEMETRY</span>
              <span className="text-[var(--accent)]">● ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM EDGE ANNOTATION */}
      <div className="border-t border-[var(--line)] pt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[var(--ink-muted)]">
        <div className="flex items-center gap-4">
          <span>VOL. 2026</span>
          <span className="text-[var(--line)]">·</span>
          <span>DETERMINISTIC SYSTEMS ARCHIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <span>SCROLL DOWN FOR SPECIFICATIONS</span>
          <span className="text-[var(--accent)]">↓</span>
        </div>
      </div>
    </section>
  );
}
