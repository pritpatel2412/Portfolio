'use client';

import React, { useEffect, useState } from 'react';
import { X, Keyboard, Command, Navigation, Sliders } from 'lucide-react';

interface KeyboardShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
  singleKeysDisabled: boolean;
  onToggleSingleKeys: (disabled: boolean) => void;
}

export function KeyboardShortcuts({
  isOpen,
  onClose,
  singleKeysDisabled,
  onToggleSingleKeys,
}: KeyboardShortcutsProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] p-6 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
          <div className="flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-[var(--safelight)]" />
            <h2
              id="shortcuts-dialog-title"
              className="font-mono text-xs uppercase tracking-widest font-bold"
            >
              KEYBOARD SHORTCUTS SPECIFICATION
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded hover:bg-[var(--surface-2)] text-[var(--text-dim)] hover:text-[var(--text)] transition-colors cursor-pointer"
            aria-label="Close keyboard shortcuts dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Shortcuts */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-[var(--safelight)] font-bold">
            <Navigation className="w-3.5 h-3.5" />
            <span>GLOBAL NAVIGATION (PRESS SEQUENTIALLY)</span>
          </div>

          <div className="grid grid-cols-1 gap-2 font-mono text-xs">
            <div className="flex items-center justify-between p-2 rounded bg-[var(--surface-2)]/60">
              <span className="text-[var(--text-dim)]">Go to Studio Home</span>
              <kbd className="px-2 py-0.5 rounded bg-[var(--surface-3)] border border-[var(--line)] text-[var(--text)]">
                g then h
              </kbd>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-[var(--surface-2)]/60">
              <span className="text-[var(--text-dim)]">Go to Projects / Contact Sheet</span>
              <kbd className="px-2 py-0.5 rounded bg-[var(--surface-3)] border border-[var(--line)] text-[var(--text)]">
                g then p
              </kbd>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-[var(--surface-2)]/60">
              <span className="text-[var(--text-dim)]">Go to Writing / Essays</span>
              <kbd className="px-2 py-0.5 rounded bg-[var(--surface-3)] border border-[var(--line)] text-[var(--text)]">
                g then w
              </kbd>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-[var(--surface-2)]/60">
              <span className="text-[var(--text-dim)]">Go to Contact &amp; Proposals</span>
              <kbd className="px-2 py-0.5 rounded bg-[var(--surface-3)] border border-[var(--line)] text-[var(--text)]">
                g then c
              </kbd>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-[var(--surface-2)]/60">
              <span className="text-[var(--text-dim)]">Go to Semantic Résumé</span>
              <kbd className="px-2 py-0.5 rounded bg-[var(--surface-3)] border border-[var(--line)] text-[var(--text)]">
                g then r
              </kbd>
            </div>
          </div>
        </div>

        {/* Global Controls */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-[var(--safelight)] font-bold">
            <Command className="w-3.5 h-3.5" />
            <span>SYSTEM ACTIONS &amp; TOOLS</span>
          </div>

          <div className="grid grid-cols-1 gap-2 font-mono text-xs">
            <div className="flex items-center justify-between p-2 rounded bg-[var(--surface-2)]/60">
              <span className="text-[var(--text-dim)]">Open Command Palette</span>
              <kbd className="px-2 py-0.5 rounded bg-[var(--surface-3)] border border-[var(--line)] text-[var(--text)]">
                ⌘K / Ctrl+K
              </kbd>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-[var(--surface-2)]/60">
              <span className="text-[var(--text-dim)]">Quick Search Filter</span>
              <kbd className="px-2 py-0.5 rounded bg-[var(--surface-3)] border border-[var(--line)] text-[var(--text)]">
                /
              </kbd>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-[var(--surface-2)]/60">
              <span className="text-[var(--text-dim)]">Toggle Darkroom / Lightbox Theme</span>
              <kbd className="px-2 py-0.5 rounded bg-[var(--surface-3)] border border-[var(--line)] text-[var(--text)]">
                t
              </kbd>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-[var(--surface-2)]/60">
              <span className="text-[var(--text-dim)]">Toggle This Shortcuts Sheet</span>
              <kbd className="px-2 py-0.5 rounded bg-[var(--surface-3)] border border-[var(--line)] text-[var(--text)]">
                ?
              </kbd>
            </div>
          </div>
        </div>

        {/* WCAG 2.1.4 Compliance Toggle */}
        <div className="pt-4 border-t border-[var(--line)] space-y-2">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={singleKeysDisabled}
              onChange={(e) => onToggleSingleKeys(e.target.checked)}
              className="mt-1 accent-[var(--safelight)] rounded cursor-pointer"
            />
            <div className="space-y-0.5 font-mono text-xs">
              <span className="font-bold text-[var(--text)]">
                Disable single-key shortcuts (WCAG 2.1.4)
              </span>
              <p className="text-[11px] text-[var(--text-dim)] leading-relaxed">
                Prevents accidental keystroke triggers when using speech recognition, screen readers, or assistive input devices.
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
