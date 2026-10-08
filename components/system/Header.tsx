'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AvailabilityPill } from './AvailabilityPill';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenPalette: () => void;
}

const NAV_LINKS = [
  { href: '/projects', label: 'PROJECTS', frame: '01' },
  { href: '/experience', label: 'EXPERIENCE', frame: '02' },
  { href: '/about', label: 'ABOUT', frame: '03' },
  { href: '/writing', label: 'WRITING', frame: '04' },
  { href: '/contact', label: 'CONTACT', frame: '05' },
];

export function Header({ onOpenMenu, onOpenPalette }: HeaderProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Scroll-hide threshold
      if (currentScrollY > 80) {
        if (currentScrollY > lastScrollY + 8) {
          // Scrolling down -> hide header
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY - 8) {
          // Scrolling up -> show header
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 h-16 sm:h-20 px-4 md:px-8',
        'flex items-center justify-between',
        'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        isVisible ? 'translate-y-0' : '-translate-y-full',
        isScrolled
          ? 'bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--line)] shadow-sm'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      {/* Left: Monogram / Wordmark */}
      <Link
        href="/"
        className="group flex items-center gap-2.5 font-display font-extrabold text-base sm:text-lg tracking-[-0.03em] text-[var(--text)] hover:text-[var(--safelight)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--safelight)]"
      >
        <span className="w-2.5 h-2.5 rounded-none bg-[var(--safelight)] inline-block transform rotate-45 group-hover:rotate-90 transition-transform duration-300" />
        <span>PRIT PATEL</span>
      </Link>

      {/* Center: Desktop Navigation Links */}
      <nav
        aria-label="Primary Navigation"
        className="hidden lg:flex items-center gap-6 xl:gap-8"
      >
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'group relative flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] py-2 transition-colors min-h-[44px]',
                isActive
                  ? 'text-[var(--safelight)] font-semibold'
                  : 'text-[var(--text-dim)] hover:text-[var(--text)]'
              )}
            >
              <span className="text-[10px] opacity-40 group-hover:opacity-100 font-mono text-[var(--safelight)]">
                ▷
              </span>
              <span>{link.label}</span>
              {isActive && (
                <span className="absolute bottom-1 left-0 right-0 h-[1.5px] bg-[var(--safelight)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Availability Pill (Hidden on mobile) */}
        <div className="hidden xl:block">
          <AvailabilityPill status="Available for Hire" />
        </div>

        {/* Command Palette Trigger */}
        <button
          type="button"
          onClick={onOpenPalette}
          className="flex items-center gap-2 px-3 py-2 min-h-[44px] border border-[var(--line)] rounded-[var(--radius-ui)] text-xs font-mono text-[var(--text-dim)] hover:text-[var(--text)] hover:border-[var(--text)] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--safelight)]"
          aria-label="Open command palette (⌘K)"
          title="Open command palette (⌘K or /)"
        >
          <span className="hidden sm:inline">INDEX</span>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-[var(--surface-2)] border border-[var(--line)] rounded font-mono text-[var(--text)]">
            ⌘K
          </kbd>
        </button>

        {/* Theme Toggle (Iris wipe) */}
        <ThemeToggle />

        {/* Mobile Menu Hamburger (min 44px touch target) */}
        <button
          type="button"
          onClick={onOpenMenu}
          className="lg:hidden w-11 h-11 flex items-center justify-center rounded-[var(--radius-ui)] border border-[var(--line)] text-[var(--text)] hover:border-[var(--safelight)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--safelight)]"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
