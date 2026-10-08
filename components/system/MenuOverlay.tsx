'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ArrowUpRight } from 'lucide-react';
import { site } from '@/content/site';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  num: string;
  label: string;
  href: string;
  preview: {
    headline: string;
    subline: string;
  };
}

const NAV_ITEMS: NavItem[] = [
  {
    num: '01',
    label: 'Home',
    href: '/',
    preview: {
      headline: 'Surface / Source',
      subline: 'Builder at the intersection of AI, systems, and design.',
    },
  },
  {
    num: '02',
    label: 'Projects',
    href: '/projects',
    preview: {
      headline: 'Selected Systems',
      subline: 'RedForge, SearchMind API, Kyren, CodeGuard, KemLang, ARIA.',
    },
  },
  {
    num: '03',
    label: 'Work',
    href: '/work',
    preview: {
      headline: 'Career Timeline',
      subline: 'StayChat AI, HorizonTechX, FutureTech Innovations.',
    },
  },
  {
    num: '04',
    label: 'Résumé',
    href: '/resume',
    preview: {
      headline: 'Technical Qualifications',
      subline: 'GPA 9.67 · 400+ LeetCode · Full-Stack & AI Systems.',
    },
  },
  {
    num: '05',
    label: 'Writing',
    href: '/writing',
    preview: {
      headline: 'Field Notes & Essays',
      subline: 'Reflections on agent architecture, latency, and AST parsing.',
    },
  },
  {
    num: '06',
    label: 'Contact',
    href: '/contact',
    preview: {
      headline: 'Start a Conversation',
      subline: 'Sentence form proposal builder with timezone overlap calculator.',
    },
  },
  {
    num: '07',
    label: 'Colophon',
    href: '/colophon',
    preview: {
      headline: 'System Specifications',
      subline: 'Architecture notes, typography tokens, and accessible Lens guide.',
    },
  },
];

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<NavItem>(NAV_ITEMS[0]);
  const [localTime, setLocalTime] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);

  // Lock body scroll and handle Esc key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  // Update local time ticker for Vadodara
  useEffect(() => {
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
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className={`fixed inset-0 z-[100] bg-[var(--bg)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isOpen
          ? 'opacity-100 pointer-events-auto [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]'
          : 'opacity-0 pointer-events-none [clip-path:polygon(100%_0,100%_0,100%_0,100%_0)]'
      }`}
    >
      <div className="h-full max-w-[1440px] mx-auto px-4 md:px-12 py-6 flex flex-col justify-between">
        {/* Top bar inside menu */}
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
          <span className="font-mono text-xs tracking-wider text-[var(--ink-muted)]">
            NAVIGATION INDEX
          </span>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--line)] font-mono text-xs text-[var(--ink)] hover:border-[var(--ink-muted)] cursor-pointer"
            aria-label="Close menu"
          >
            <span>Close</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center: Links & Context Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-8">
          {/* Main Links */}
          <nav className="lg:col-span-8 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  onMouseEnter={() => setActiveItem(item)}
                  className="group flex items-baseline gap-4 py-2 text-[var(--ink)] hover:text-[var(--signal)] transition-colors"
                >
                  <span className="font-mono text-xs md:text-sm text-[var(--ink-muted)] group-hover:text-[var(--signal)] transition-colors">
                    {item.num}
                  </span>
                  <span
                    className={`font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight transition-transform duration-200 group-hover:translate-x-3 ${
                      isActive ? 'text-[var(--signal)]' : ''
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[var(--signal)] mb-2" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Contextual Preview (Desktop) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col justify-center border-l border-[var(--line)] pl-8">
            <div className="font-mono text-[11px] text-[var(--ink-muted)] tracking-wider uppercase mb-2">
              Preview / {activeItem.label}
            </div>
            <div className="font-display text-2xl font-bold text-[var(--ink)] mb-3">
              {activeItem.preview.headline}
            </div>
            <p className="text-sm text-[var(--ink-muted)] leading-relaxed max-w-sm mb-6">
              {activeItem.preview.subline}
            </p>
            <div className="font-mono text-xs text-[var(--signal)] flex items-center gap-1">
              <span>Explore section</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Footer Row */}
        <div className="border-t border-[var(--line)] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[var(--ink-muted)]">
          <div className="flex items-center gap-6">
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--ink)] transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--ink)] transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href={site.links.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--ink)] transition-colors"
            >
              LeetCode ↗
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span>{site.location}</span>
            <span>·</span>
            <span className="text-[var(--ink)] font-mono">{localTime || '00:00:00'} IST</span>
          </div>
        </div>
      </div>
    </div>
  );
}
