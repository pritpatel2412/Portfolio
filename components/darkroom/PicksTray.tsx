'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { usePicks, MAX_PICKS } from '@/lib/picks';
import { track } from '@/lib/track';
import { cn } from '@/lib/utils';

interface PicksTrayProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export function PicksTray({ isOpen, onClose, triggerRef }: PicksTrayProps) {
  const { picks, remove, clear } = usePicks();
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus trap & Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        triggerRef?.current?.focus();
        return;
      }

      if (e.key === 'Tab') {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const focusable = dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Initial focus on close button or primary CTA
    const timer = setTimeout(() => {
      const closeBtn = dialogRef.current?.querySelector<HTMLElement>('button');
      closeBtn?.focus();
    }, 50);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const contactUrl = `/contact?picks=${picks.map((p) => encodeURIComponent(p.slug)).join(',')}`;

  const handleSendPicks = () => {
    track('picks_send', { count: picks.length });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shortlisted Project Picks Tray"
      className="fixed inset-0 z-[var(--z-tray,60)] flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => {
          onClose();
          triggerRef?.current?.focus();
        }}
        aria-hidden="true"
      />

      {/* Sheet / Dialog Modal */}
      <div
        ref={dialogRef}
        className={cn(
          'relative w-full sm:max-w-lg bg-[var(--surface)] border border-[var(--line)] shadow-2xl',
          'rounded-t-lg sm:rounded-[var(--radius-ui)] overflow-hidden',
          'max-h-[85vh] sm:max-h-[70vh] flex flex-col',
          'animate-in fade-in-0 zoom-in-95 duration-200'
        )}
      >
        {/* Mobile Drag Handle */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1">
          <div className="w-12 h-1 rounded-full bg-[var(--line)]" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--line)]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--safelight)] animate-pulse" />
            <h2 className="font-mono text-xs uppercase font-bold tracking-[0.16em] text-[var(--text)]">
              SHORTLIST PICKS [{picks.length}/{MAX_PICKS}]
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {picks.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="text-[11px] font-mono text-[var(--text-dim)] hover:text-[var(--safelight)] px-2 py-1 transition-colors min-h-[36px]"
                title="Clear all shortlisted picks"
              >
                Clear all
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                onClose();
                triggerRef?.current?.focus();
              }}
              className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-ui)] text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--safelight)]"
              aria-label="Close shortlist tray"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body / Picks List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {picks.length === 0 ? (
            <div className="py-8 text-center text-[var(--text-dim)]">
              <p className="font-text text-sm">No project frames marked yet.</p>
              <p className="font-mono text-xs mt-1 text-[var(--text-dim)] opacity-70">
                Click the grease-pencil mark button on any frame to shortlist up to 5 projects.
              </p>
            </div>
          ) : (
            picks.map((pick, index) => (
              <div
                key={pick.slug}
                className="flex items-center justify-between p-3 rounded-[var(--radius-ui)] bg-[var(--surface-2)] border border-[var(--line)] transition-all hover:border-[var(--text-dim)]"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[var(--safelight)] font-bold">
                    ▷ 0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-sm text-[var(--text)]">
                      {pick.title}
                    </h3>
                    {(pick.role || pick.year) && (
                      <p className="font-mono text-[10px] text-[var(--text-dim)] uppercase">
                        {pick.role} {pick.year ? `· ${pick.year}` : ''}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => remove(pick.slug)}
                  className="w-8 h-8 flex items-center justify-center text-[var(--text-dim)] hover:text-[var(--safelight)] transition-colors rounded focus-visible:outline-2 focus-visible:outline-[var(--safelight)]"
                  aria-label={`Remove ${pick.title} from shortlisted picks`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {picks.length > 0 && (
          <div className="p-5 border-t border-[var(--line)] bg-[var(--surface-2)]/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-mono text-[11px] text-[var(--text-dim)] text-center sm:text-left">
              These {picks.length} projects will pre-fill your inquiry message.
            </p>
            <Link
              href={contactUrl}
              onClick={handleSendPicks}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[var(--radius-ui)] bg-[var(--safelight)] text-[var(--on-safelight,#0A0908)] font-mono text-xs uppercase font-bold tracking-wider hover:opacity-95 transition-opacity min-h-[44px] focus-visible:outline-2 focus-visible:outline-[var(--safelight)]"
            >
              <span>Talk about these</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
