'use client';

import React, { useState, useEffect } from 'react';
import { useVibe } from '@/components/system/VibeProvider';
import { site } from '@/content/site';
import { Terminal, Shield, Zap, Sparkles, Activity } from 'lucide-react';

export function HeroArtDirection() {
  const { activeVibe, currentConfig } = useVibe();
  const [domNodes, setDomNodes] = useState<number>(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Real DOM node count calculation
    if (typeof document !== 'undefined') {
      setDomNodes(document.querySelectorAll('*').length);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    });
  };

  // VIBE 01 — THE JOURNAL (European Design Magazine)
  if (activeVibe === 'journal') {
    return (
      <div className="relative w-full h-[380px] sm:h-[460px] rounded-sm border border-[var(--line)] bg-[var(--bg-surface)] p-6 flex flex-col justify-between overflow-hidden shadow-sm transition-all duration-500">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
          <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--accent)] font-semibold">
            PLATE NO. 01 — EDITION MMXVI
          </span>
          <span className="font-serif italic text-xs text-[var(--ink-muted)]">
             Vadodara Studio
          </span>
        </div>

        {/* Central Artwork Composition */}
        <div className="relative my-auto flex flex-col items-center justify-center text-center p-6">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-[var(--line)] flex items-center justify-center p-2 mb-4 bg-[var(--bg)] shadow-inner">
            <div className="w-full h-full rounded-full border border-dashed border-[var(--accent)] flex items-center justify-center font-serif text-3xl italic text-[var(--ink)]">
              {site.monogram}
            </div>
          </div>
          <h4 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[var(--ink)] max-w-sm">
            Architect of Resilient Intelligent Systems
          </h4>
          <p className="font-sans text-xs text-[var(--ink-muted)] max-w-xs mt-2 leading-relaxed">
            Synthesizing deterministic backend foundations with adaptive agentic reasoning pipelines.
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-[var(--line)] pt-3 font-mono text-[10px] text-[var(--ink-muted)]">
          <span>FIG. 01 / AUTONOMOUS WORKFLOWS</span>
          <span className="text-[var(--accent)] font-semibold">CURATED PORTFOLIO</span>
        </div>
      </div>
    );
  }

  // VIBE 02 — RAW / INTERNET OBJECT (Brutalist Raw Web)
  if (activeVibe === 'raw') {
    return (
      <div className="relative w-full h-[380px] sm:h-[460px] border-2 border-black bg-white p-5 flex flex-col justify-between font-mono text-xs text-black shadow-[6px_6px_0px_#000000] transition-all duration-300">
        <div className="flex items-center justify-between border-b-2 border-black pb-2 bg-black text-white px-2 py-1 -mx-2 -mt-2">
          <div className="flex items-center gap-1.5 font-bold">
            <Terminal className="w-3.5 h-3.5 text-[#FF3B00]" />
            <span>OBJECT_TELEMETRY.RAW</span>
          </div>
          <span className="text-[10px] bg-[#FF3B00] text-black px-1.5 font-black">LIVE</span>
        </div>

        {/* Real Technical Data Box */}
        <div className="my-auto space-y-3 py-3">
          <div className="grid grid-cols-2 gap-2 text-[11px] p-2 bg-[#F4F4F4] border border-black">
            <div>
              <span className="text-gray-500 block text-[9px]">DOM NODES</span>
              <span className="font-bold text-sm text-[#FF3B00]">{domNodes || 384}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[9px]">BUNDLE PAYLOAD</span>
              <span className="font-bold text-sm">~1.42 MB</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[9px]">STATUS</span>
              <span className="font-bold text-green-700">200 OK (AVAILABLE)</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[9px]">LEETCODE PROOFS</span>
              <span className="font-bold text-sm">400+ SOLVED</span>
            </div>
          </div>

          <div className="border-l-2 border-[#FF3B00] pl-3 py-1 space-y-1 text-[11px]">
            <p className="font-bold">ENGINEERING PROFILE:</p>
            <p className="text-gray-700">
              Prit Patel // Full-Stack &amp; AI Systems Developer. 9.67 GPA. Building RedForge security engine.
            </p>
          </div>
        </div>

        <div className="border-t-2 border-black pt-2 flex items-center justify-between text-[10px]">
          <span className="underline cursor-pointer hover:text-[#FF3B00]">[INSPECT_SOURCE]</span>
          <span>HTTP/2 · ASIA-SOUTH1</span>
        </div>
      </div>
    );
  }

  // VIBE 03 — GRID STUDY (Swiss Modernism)
  if (activeVibe === 'grid') {
    return (
      <div
        onMouseMove={handleMouseMove}
        className="relative w-full h-[380px] sm:h-[460px] border border-[var(--line)] bg-[#121216] p-6 flex flex-col justify-between overflow-hidden transition-all duration-300"
      >
        {/* Top Swiss Coordinate Ruler */}
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 font-mono text-[10px] text-[var(--ink-muted)]">
          <div className="flex items-center gap-3">
            <span className="text-[#0047FF] font-bold">GRID.03</span>
            <span>MOD_SYSTEM_X</span>
          </div>
          <span>POS: [{mousePos.x}, {mousePos.y}]</span>
        </div>

        {/* Central Geometric Modular Specimen */}
        <div className="my-auto relative grid grid-cols-3 gap-3 p-4 border border-[var(--line)] bg-[#16161A]">
          <div className="p-3 border border-[var(--line)] flex flex-col justify-between h-28">
            <span className="font-mono text-[9px] text-[#0047FF]">01 / AGENTS</span>
            <span className="font-bold text-sm">Distributed Tool Swarms</span>
          </div>
          <div className="p-3 border border-[var(--line)] flex flex-col justify-between h-28 bg-[#0047FF]/10 border-[#0047FF]">
            <span className="font-mono text-[9px] text-[#0047FF]">02 / SECURITY</span>
            <span className="font-bold text-sm text-white">AST Analysis Engine</span>
          </div>
          <div className="p-3 border border-[var(--line)] flex flex-col justify-between h-28">
            <span className="font-mono text-[9px] text-[#0047FF]">03 / SCALE</span>
            <span className="font-bold text-sm">P95 &lt; 240ms Latency</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[var(--line)] pt-3 font-mono text-[10px] text-[var(--ink-muted)]">
          <span>BASE UNIT: 8PT GRID</span>
          <span className="text-[#0047FF] font-bold">INTERNATIONAL TYPOGRAPHIC STYLE</span>
        </div>
      </div>
    );
  }

  // VIBE 04 — NEON POSTER (Cultural Street Graphics)
  if (activeVibe === 'poster') {
    return (
      <div className="relative w-full h-[380px] sm:h-[460px] rounded-lg border border-[var(--accent)]/30 bg-[#141824] p-6 flex flex-col justify-between overflow-hidden shadow-[0_0_30px_rgba(216,255,56,0.06)] transition-all duration-300">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-sm bg-[#D8FF38] text-black font-mono text-[11px] font-black tracking-wider uppercase">
            POSTER EDITION 04
          </span>
          <span className="font-mono text-xs text-[#D8FF38] font-bold tracking-widest">
            2026 // COLLECTION
          </span>
        </div>

        {/* Poster Visual Body */}
        <div className="my-auto flex items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-block px-2 py-0.5 rounded border border-[#D8FF38]/40 text-[#D8FF38] font-mono text-[10px] uppercase">
              // NO REPETITION · PURE DISCIPLINE
            </div>
            <h4 className="font-display text-4xl sm:text-5xl font-black text-white leading-none tracking-tight">
              PRIT<br />PATEL
            </h4>
            <p className="text-xs text-[#9FA6BF] max-w-[200px]">
              Full-Stack &amp; AI Systems Engineer building at the edge of performance.
            </p>
          </div>

          <div className="writing-vertical font-mono text-xs tracking-widest text-[#D8FF38] opacity-80 border-l border-[#D8FF38]/30 pl-2">
            AUTONOMOUS AGENTS · AST COMPILERS · 9.67 GPA
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#D8FF38]/20 pt-3 font-mono text-[10px] text-[#9FA6BF]">
          <span>TYPE: EXPRESSIVE BOLD</span>
          <span className="text-[#D8FF38] font-bold">STREET GRAPHICS SPEC</span>
        </div>
      </div>
    );
  }

  // VIBE 05 — AFTER HOURS (Digital Studio Noir)
  if (activeVibe === 'noir') {
    return (
      <div className="relative w-full h-[380px] sm:h-[460px] rounded-sm border border-[#E0533C]/20 bg-[#0B0D12] p-6 flex flex-col justify-between overflow-hidden shadow-[0_0_40px_rgba(224,83,60,0.05)] transition-all duration-500">
        {/* Subtle Ember Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#E0533C]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between border-b border-[var(--line)] pb-3">
          <div className="flex items-center gap-2 font-mono text-[10px] text-[#E0533C] tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#E0533C] animate-pulse" />
            <span>AFTER HOURS STUDIO</span>
          </div>
          <span className="font-mono text-[10px] text-[var(--ink-muted)]">02:30 AM IST</span>
        </div>

        {/* Central Cinematic Typography */}
        <div className="relative z-10 my-auto space-y-3 py-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-muted)]">
            A Film-Grade Digital Identity
          </span>
          <h4 className="font-serif text-3xl sm:text-4xl text-[#EDEBE6] font-normal leading-tight italic">
            &ldquo;Crafting code in the quiet hours where depth overpowers noise.&rdquo;
          </h4>
          <div className="flex items-center gap-4 pt-2 font-mono text-xs text-[var(--ink-muted)]">
            <span className="flex items-center gap-1.5 text-[#E0533C]">
              <Shield className="w-3.5 h-3.5" />
              <span>RedForge Core</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Low-Latency RAG</span>
            </span>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-[var(--line)] pt-3 font-mono text-[10px] text-[var(--ink-muted)]">
          <span>CINEMATIC TITLE SEQUENCE</span>
          <span className="text-[#E0533C]">FINE GRAIN · EMBER ACCENT</span>
        </div>
      </div>
    );
  }

  // VIBE 06 — COLOR LAB (Experimental Playground)
  return (
    <div className="relative w-full h-[380px] sm:h-[460px] rounded-3xl border border-[#FF6B97]/30 bg-[#201B34] p-6 flex flex-col justify-between overflow-hidden shadow-[0_12px_36px_rgba(255,107,151,0.12)] transition-all duration-300">
      <div className="flex items-center justify-between">
        <span className="px-3 py-1 rounded-full bg-[#FF6B97] text-white font-mono text-xs font-bold tracking-wide">
          COLOR LAB 06
        </span>
        <span className="flex items-center gap-1 text-xs font-mono text-[#FF6B97]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PLAYGROUND MODE</span>
        </span>
      </div>

      {/* Kinetic Interactive Color Tokens */}
      <div className="my-auto space-y-4">
        <div className="flex flex-wrap gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-[#FF6B97]/20 border border-[#FF6B97] text-xs font-bold text-white transform -rotate-2 hover:rotate-0 transition-transform">
            ⚡ Agent Swarms
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-[#5CFFB0]/20 border border-[#5CFFB0] text-xs font-bold text-[#5CFFB0] transform rotate-3 hover:rotate-0 transition-transform">
            🛡️ AST Scanners
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-[#FFDD53]/20 border border-[#FFDD53] text-xs font-bold text-[#FFDD53] transform -rotate-1 hover:rotate-0 transition-transform">
            🎯 400+ LeetCode
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#282242] border border-[#FF6B97]/30 space-y-2">
          <div className="flex items-center justify-between font-mono text-[11px] text-[#ABA4C9]">
            <span>DESIGN EXPERIMENTATION</span>
            <span className="text-[#FF6B97] font-bold">INTERACTIVE</span>
          </div>
          <p className="text-xs text-white leading-relaxed">
            Breaking rigid boundaries with intention. The same rigorous backend capability expressed through kinetic, vivid design tokens.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#FF6B97]/20 pt-3 font-mono text-[10px] text-[#ABA4C9]">
        <span>UNCONVENTIONAL HARMONY</span>
        <span className="text-[#FF6B97] font-bold">VIOLET × CORAL × LEMON</span>
      </div>
    </div>
  );
}
