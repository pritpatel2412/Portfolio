'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUniverse } from '@/lib/universe';
import { cn } from '@/lib/utils';
import { sound } from '@/lib/sound';
import { site } from '@/content/site';

interface UniverseHeaderProps {
  onOpenPalette: () => void;
  onOpenMenu: () => void;
}

export function UniverseHeader({ onOpenPalette, onOpenMenu }: UniverseHeaderProps) {
  const { universe, meta } = useUniverse();
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home', num: '01' },
    { href: '/projects', label: 'Projects', num: '02' },
    { href: '/experience', label: 'Experience', num: '03' },
    { href: '/about', label: 'About', num: '04' },
    { href: '/skills', label: 'Skills', num: '05' },
    { href: '/resume', label: 'Résumé', num: '06' },
    { href: '/writing', label: 'Writing', num: '07' },
    { href: '/contact', label: 'Contact', num: '08' },
  ];

  // 1. EDITORIAL HEADER (Magazine Masthead)
  if (universe === 'editorial') {
    return (
      <header className="fixed top-0 left-0 right-0 z-40 bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--line)] px-4 sm:px-8 py-3 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Top metadata strip */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4 font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)] border-b md:border-b-0 border-[var(--line)] pb-2 md:pb-0">
            <span>VOL. 2026 · ISSUE IV</span>
            <span>22.3072° N · 73.1812° E</span>
            <span className="text-[var(--safelight)] font-bold">● OPEN TO HIRE</span>
          </div>

          {/* Central publication wordmark */}
          <Link
            href="/"
            className="font-serif font-black text-xl sm:text-2xl tracking-tight text-[var(--text)] hover:text-[var(--safelight)] transition-colors"
          >
            Prit Patel.
          </Link>

          {/* Quiet publication index nav */}
          <nav aria-label="Editorial Index" className="hidden lg:flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-[var(--text-dim)]">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'hover:text-[var(--text)] transition-colors py-1',
                    isActive && 'text-[var(--safelight)] font-bold border-b border-[var(--safelight)]'
                  )}
                >
                  <span className="text-[9px] opacity-60 mr-1">{link.num}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={onOpenPalette}
            className="hidden sm:inline-flex px-2.5 py-1 text-[11px] font-mono border border-[var(--line)] rounded-[var(--radius-ui)] text-[var(--text-dim)] hover:text-[var(--text)] transition-colors"
          >
            INDEX ⌘K
          </button>
        </div>
      </header>
    );
  }

  // 2. NEO MAXIMALIST HEADER (Graphic Poster & Badges)
  if (universe === 'maximalist') {
    return (
      <header className="fixed top-0 left-0 right-0 z-40 bg-[var(--bg)] border-b-3 border-black px-4 sm:px-6 py-2.5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="px-3 py-1 rounded-xl bg-black text-white font-display font-black text-lg tracking-wider transform -rotate-2 hover:rotate-0 transition-transform shadow-[3px_3px_0px_#2563EB]"
          >
            PRIT!★
          </Link>

          <nav aria-label="Pop Nav" className="hidden lg:flex items-center gap-2">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-1 rounded-full font-display font-bold text-xs uppercase transition-all shadow-[2px_2px_0px_#000]',
                    isActive
                      ? 'bg-blue-600 text-white -translate-y-0.5'
                      : 'bg-white text-black hover:bg-black hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-pink-500 text-white font-mono text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0px_#000]">
              AVAILABLE!
            </span>
            <button
              type="button"
              onClick={onOpenPalette}
              className="px-2.5 py-1 rounded-lg bg-black text-white font-mono text-xs font-bold shadow-[2px_2px_0px_#FFF]"
            >
              ⌘K
            </button>
          </div>
        </div>
      </header>
    );
  }

  // 3. JAPANDI POP HEADER (Wabi-sabi Calm & Inkan Seal)
  if (universe === 'japandi') {
    return (
      <header className="fixed top-0 left-0 right-0 z-40 bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--line)] px-4 sm:px-8 py-3.5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-6 h-6 rounded bg-[#BC5A36] text-white font-serif flex items-center justify-center text-xs font-bold shadow-sm">
              印
            </div>
            <div>
              <span className="font-serif text-lg tracking-wider text-[var(--text)] font-semibold block leading-none">
                Prit Patel
              </span>
              <span className="font-mono text-[9px] text-[#BC5A36] tracking-widest block mt-0.5">
                エンジニア · 2026
              </span>
            </div>
          </Link>

          <nav aria-label="Japandi Zen Nav" className="hidden lg:flex items-center gap-8 font-sans text-xs tracking-widest uppercase text-[var(--text-dim)]">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'hover:text-[var(--text)] transition-colors',
                    isActive && 'text-[#BC5A36] font-semibold'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <span className="font-mono text-xs text-[var(--text-dim)] hidden sm:inline">
            和敬清寂
          </span>
        </div>
      </header>
    );
  }

  // 4. SWISS MODERNIST HEADER (12-Column Grid & Signal Red Disc)
  if (universe === 'swiss') {
    return (
      <header className="fixed top-0 left-0 right-0 z-40 bg-[var(--bg)] border-b-2 border-black px-4 sm:px-8 py-3 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="w-4 h-4 rounded-full bg-[#E11D48] inline-block" />
            <span className="font-sans font-black text-xl tracking-tight text-black uppercase">
              PRIT PATEL.
            </span>
          </Link>

          <nav aria-label="Swiss Grid System" className="hidden lg:flex items-center divide-x divide-black border-l border-r border-black font-sans text-xs uppercase font-bold text-black">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-1.5 transition-colors',
                    isActive ? 'bg-black text-white' : 'hover:bg-black/10'
                  )}
                >
                  <span className="text-[10px] mr-1 text-[#E11D48]">{link.num}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="font-mono text-xs text-black font-bold hidden sm:flex items-center gap-2">
            <span>GRID: ON</span>
            <span className="px-1.5 py-0.5 bg-black text-white text-[10px]">12-COL</span>
          </div>
        </div>
      </header>
    );
  }

  // 5. CLASSIC BRUTALIST HEADER (Raw Terminal HTML Document)
  if (universe === 'brutalist') {
    return (
      <header className="fixed top-0 left-0 right-0 z-40 bg-[var(--bg)] border-b border-black font-mono text-xs text-black transition-colors duration-300">
        <div className="bg-black text-white px-4 py-1 flex items-center justify-between text-[11px]">
          <span>~/PRIT_PATEL/INDEX.HTML</span>
          <div className="flex items-center gap-4 text-[10px]">
            <span>NODES: 384</span>
            <span>STATUS: 200 OK</span>
            <span className="bg-yellow-300 text-black px-1 font-bold">AVAILABLE</span>
          </div>
        </div>
        <div className="px-4 py-2 flex items-center justify-between overflow-x-auto">
          <nav aria-label="Brutalist Document Index" className="flex items-center gap-3 font-mono font-bold uppercase text-[11px]">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'hover:bg-black hover:text-white px-1 transition-colors',
                    isActive && 'bg-black text-white'
                  )}
                >
                  [{link.label}]
                </Link>
              );
            })}
          </nav>
          <span className="text-[10px] opacity-60 hidden md:inline">
            &lt;!-- RAW HTML / NO APOLOGIES --&gt;
          </span>
        </div>
      </header>
    );
  }

  // 6. NOIR / AFTER HOURS HEADER (Cinematic 35mm Frame)
  if (universe === 'noir') {
    return (
      <header className="fixed top-0 left-0 right-0 z-40 bg-[var(--bg)]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-serif italic text-lg sm:text-xl text-[#EDE7DF] tracking-wide hover:text-[#E07A28] transition-colors">
            Prit Patel · After Hours
          </Link>

          <nav aria-label="Noir Cinematic Nav" className="hidden lg:flex items-center gap-8 font-mono text-[11px] uppercase tracking-widest text-white/50">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'hover:text-white transition-colors',
                    isActive && 'text-[#E07A28] font-bold'
                  )}
                >
                  <span>SCENE {link.num}</span>
                  <span className="ml-1.5 text-white/80">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="font-mono text-[10px] text-white/40 tracking-wider">
            REC ● 00:24:18:04
          </div>
        </div>
      </header>
    );
  }

  // 7. DIGITAL ARCHIVE HEADER (Museum & Laboratory Specimen Index)
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0B0F17]/95 backdrop-blur-md border-b border-cyan-800/40 px-4 sm:px-8 py-3 transition-colors duration-300 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-cyan-400 font-bold tracking-wider">
          <span className="w-2 h-2 bg-cyan-400 animate-pulse" />
          <span>ARCHIVE // PRIT PATEL</span>
        </Link>

        <nav aria-label="Archive Registry" className="hidden lg:flex items-center gap-6 text-[11px] text-slate-400">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'hover:text-cyan-300 transition-colors',
                  isActive && 'text-cyan-400 font-bold border-b border-cyan-400 pb-0.5'
                )}
              >
                <span>[CAT-{link.num}] {link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 text-[10px] text-cyan-400/80">
          <span>SPECIMENS: 06</span>
          <button
            type="button"
            onClick={onOpenPalette}
            className="px-2 py-0.5 rounded border border-cyan-500/40 hover:bg-cyan-950/40 transition-colors"
          >
            INDEX ⌘K
          </button>
        </div>
      </div>
    </header>
  );
}
