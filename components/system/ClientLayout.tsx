'use client';

import React, { useState, useEffect } from 'react';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { ToastProvider } from './Toast';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileMenu } from './MobileMenu';
import { CommandPalette } from './CommandPalette';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // Global keyboard shortcuts (⌘K, Ctrl+K, '/')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input/textarea
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      } else if (e.key === '/' && !isInput) {
        e.preventDefault();
        setIsPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ToastProvider>
      <SmoothScroll>
        {/* Skip to Main Content Link (WCAG 2.2 AA Floor) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[9999] px-4 py-2 bg-[var(--safelight)] text-[var(--bg)] font-mono text-xs uppercase font-bold rounded-[var(--radius-ui)] shadow-lg"
        >
          Skip to main content
        </a>

        {/* Global Navigation Header */}
        <Header
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenPalette={() => setIsPaletteOpen(true)}
        />

        {/* Main Content Area */}
        <main id="main-content" className="min-h-screen pt-16 sm:pt-20">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Full-screen Mobile Menu */}
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onOpenPalette={() => {
            setIsMenuOpen(false);
            setIsPaletteOpen(true);
          }}
        />

        {/* Command Palette */}
        <CommandPalette
          isOpen={isPaletteOpen}
          onClose={() => setIsPaletteOpen(false)}
        />
      </SmoothScroll>
    </ToastProvider>
  );
}
