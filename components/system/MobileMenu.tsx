'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AvailabilityPill } from './AvailabilityPill';
import { ThemeToggle } from './ThemeToggle';
import { site } from '@/content/site';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPalette: () => void;
}

const NAV_ITEMS = [
  { href: '/', label: 'Home', frame: '00' },
  { href: '/projects', label: 'Projects', frame: '01' },
  { href: '/experience', label: 'Experience', frame: '02' },
  { href: '/about', label: 'About', frame: '03' },
  { href: '/writing', label: 'Writing', frame: '04' },
  { href: '/resume', label: 'Résumé', frame: '05' },
  { href: '/contact', label: 'Contact', frame: '06' },
];

export function MobileMenu({ isOpen, onClose, onOpenPalette }: MobileMenuProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Lock body scroll and handle Escape key
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

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      ref={menuRef}
      className="fixed inset-0 z-[60] bg-[var(--bg)] flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-200"
    >
      {/* Top Bar with Close button and ThemeToggle */}
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-5">
        <Link
          href="/"
          onClick={onClose}
          className="font-display font-extrabold text-xl tracking-tight text-[var(--text)]"
        >
          PRIT PATEL
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center rounded-[var(--radius-ui)] border border-[var(--line)] text-[var(--text)] hover:border-[var(--safelight)] transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Navigation Stack */}
      <nav className="flex flex-col gap-3 my-auto py-6">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'group flex items-center justify-between py-2 border-b border-[var(--line)] transition-all',
                isActive ? 'text-[var(--safelight)]' : 'text-[var(--text)] hover:text-[var(--safelight)]'
              )}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-[var(--text-dim)]">
                  ▷ {item.frame}
                </span>
                <span className="font-display font-bold text-3xl sm:text-4xl tracking-tight">
                  {item.label}
                </span>
              </div>
              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          );
        })}
      </nav>

      {/* Bottom Footer Details */}
      <div className="flex flex-col gap-4 border-t border-[var(--line)] pt-5">
        <AvailabilityPill status="Available for Q2/Q3 roles" />
        <div className="flex items-center justify-between font-mono text-xs text-[var(--text-dim)]">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenPalette();
            }}
            className="text-[var(--safelight)] hover:underline flex items-center gap-1.5 cursor-pointer py-1"
          >
            <span>Open Command Palette</span>
            <kbd className="px-1 py-0.5 border border-[var(--line)] rounded text-[10px]">⌘K</kbd>
          </button>
          <span>Vadodara, IN</span>
        </div>
      </div>
    </div>
  );
}
