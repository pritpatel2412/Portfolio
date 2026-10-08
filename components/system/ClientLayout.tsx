'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { ToastProvider, useToast } from './Toast';
import { Header } from './Header';
import { UniverseHeader } from '@/components/universe/UniverseHeader';
import { VibeSwitcher } from '@/components/universe/VibeSwitcher';
import { Footer } from './Footer';
import { MobileMenu } from './MobileMenu';
import { CommandPalette } from './CommandPalette';
import { ConsoleHello } from './ConsoleHello';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { track } from '@/lib/track';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [singleKeysDisabled, setSingleKeysDisabled] = useState(false);

  const pendingKeySeq = useRef<string | null>(null);
  const seqTimer = useRef<NodeJS.Timeout | null>(null);

  // Load single-key disable preference on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('singleKeyShortcutsDisabled');
      if (stored === 'true') {
        setSingleKeysDisabled(true);
      }
    } catch {
      // localStorage restriction
    }
  }, []);

  const handleToggleSingleKeys = (disabled: boolean) => {
    setSingleKeysDisabled(disabled);
    try {
      localStorage.setItem('singleKeyShortcutsDisabled', String(disabled));
    } catch {
      // Fallback
    }
  };

  // Global keyboard shortcuts (⌘K, Ctrl+K, '/', '?', 't', 'g h', etc.)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input/textarea/contenteditable
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      // Palette: ⌘K or Ctrl+K (always works even inside inputs)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
        return;
      }

      if (isInput) return;

      // Quick Search: '/'
      if (e.key === '/') {
        e.preventDefault();
        setIsPaletteOpen(true);
        return;
      }

      // Help Sheet: '?'
      if (e.key === '?') {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
        return;
      }

      // If single-key shortcuts disabled by user (WCAG 2.1.4), skip single keys
      if (!singleKeysDisabled) {
        // Theme toggle: 't'
        if (e.key.toLowerCase() === 't') {
          e.preventDefault();
          const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
          const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', nextTheme);
          localStorage.setItem('theme', nextTheme);
          track('theme_toggle');
          return;
        }

        // Two-key navigation sequences ('g h', 'g p', 'g w', 'g c', 'g r')
        if (e.key.toLowerCase() === 'g') {
          pendingKeySeq.current = 'g';
          if (seqTimer.current) clearTimeout(seqTimer.current);
          seqTimer.current = setTimeout(() => {
            pendingKeySeq.current = null;
          }, 1200);
          return;
        }

        if (pendingKeySeq.current === 'g') {
          pendingKeySeq.current = null;
          if (seqTimer.current) clearTimeout(seqTimer.current);

          const key = e.key.toLowerCase();
          if (key === 'h') {
            e.preventDefault();
            router.push('/');
          } else if (key === 'p') {
            e.preventDefault();
            router.push('/projects');
          } else if (key === 'w') {
            e.preventDefault();
            router.push('/writing');
          } else if (key === 'c') {
            e.preventDefault();
            router.push('/contact');
          } else if (key === 'r') {
            e.preventDefault();
            router.push('/resume');
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, singleKeysDisabled]);

  return (
    <ToastProvider>
      <SmoothScroll>
        {/* M11: Console Hello on load */}
        <ConsoleHello />

        {/* Skip to Main Content Link (WCAG 2.2 AA Floor) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[9999] px-4 py-2 bg-[var(--safelight)] text-[var(--bg)] font-mono text-xs uppercase font-bold rounded-[var(--radius-ui)] shadow-lg"
        >
          Skip to main content
        </a>

        {/* Universe-Transforming Navigation Header */}
        <UniverseHeader
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenPalette={() => setIsPaletteOpen(true)}
        />

        {/* Main Content Area */}
        <main id="main-content" className="min-h-screen pt-16 sm:pt-20">
          {children}
        </main>

        {/* Seven Universes Floating Switcher Pill */}
        <VibeSwitcher />

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

        {/* M12: Keyboard Shortcuts Modal */}
        <KeyboardShortcuts
          isOpen={isShortcutsOpen}
          onClose={() => setIsShortcutsOpen(false)}
          singleKeysDisabled={singleKeysDisabled}
          onToggleSingleKeys={handleToggleSingleKeys}
        />
      </SmoothScroll>
    </ToastProvider>
  );
}
