'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUp, ExternalLink } from 'lucide-react';
import { site } from '@/content/site';

const SITEMAP = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/about', label: 'About' },
  { href: '/writing', label: 'Writing' },
  { href: '/resume', label: 'Résumé' },
  { href: '/contact', label: 'Contact' },
  { href: '/colophon', label: 'Colophon' },
];

export function Footer() {
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setLocalTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-[var(--line)] bg-[var(--surface)] text-[var(--text)] mt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 flex flex-col gap-12">
        {/* Top Tier: Wordmark, Mission & Back to Top */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-12 border-b border-[var(--line)]">
          <div className="max-w-md">
            <span className="font-display font-extrabold text-2xl tracking-[-0.03em] text-[var(--text)]">
              PRIT PATEL
            </span>
            <p className="font-text text-sm text-[var(--text-dim)] mt-3 leading-relaxed">
              Full-Stack &amp; AI Systems Developer. Engineering resilient architectures,
              autonomous agent swarms, and high-performance software at scale.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-[var(--radius-ui)] border border-[var(--line)] hover:border-[var(--text)] font-mono text-xs uppercase tracking-wider text-[var(--text-dim)] hover:text-[var(--text)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--safelight)]"
              aria-label="Scroll back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[var(--safelight)]" />
            </button>
          </div>
        </div>

        {/* Middle Tier: Sitemap, Networks & Telemetry */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Sitemap */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--safelight)]">
              SITEMAP
            </span>
            <ul className="flex flex-col gap-2 font-mono text-xs text-[var(--text-dim)]">
              {SITEMAP.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[var(--text)] transition-colors min-h-[32px] inline-flex items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--safelight)]">
              INDEX
            </span>
            <ul className="flex flex-col gap-2 font-mono text-xs text-[var(--text-dim)]">
              {SITEMAP.slice(4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[var(--text)] transition-colors min-h-[32px] inline-flex items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials / External */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--safelight)]">
              NETWORKS
            </span>
            <ul className="flex flex-col gap-2 font-mono text-xs text-[var(--text-dim)]">
              <li>
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text)] transition-colors inline-flex items-center gap-1.5 min-h-[32px]"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text)] transition-colors inline-flex items-center gap-1.5 min-h-[32px]"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href={site.links.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text)] transition-colors inline-flex items-center gap-1.5 min-h-[32px]"
                >
                  <span>LeetCode (400+)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Telemetry / Timezone */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--safelight)]">
              DARKROOM TELEMETRY
            </span>
            <div className="flex flex-col gap-2 font-mono text-xs text-[var(--text-dim)]">
              <div>
                <span className="text-[var(--text)]">Location:</span> {site.location}
              </div>
              <div>
                <span className="text-[var(--text)]">Local Time:</span>{' '}
                <span className="text-[var(--safelight)] tabular-nums">{localTime || 'IST'}</span>
              </div>
              <div>
                <span className="text-[var(--text)]">Coordinates:</span> 22.3072° N, 73.1812° E
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Colophon & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--line)] font-mono text-xs text-[var(--text-dim)]">
          <div>
            &copy; {new Date().getFullYear()} Prit Patel. Built with Next.js 15 &amp; Darkroom tokens.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/colophon" className="hover:text-[var(--text)] underline transition-colors">
              Colophon &amp; Specs
            </Link>
            <Link href="/dev/styleguide" className="hover:text-[var(--safelight)] transition-colors">
              Styleguide [Dev]
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
