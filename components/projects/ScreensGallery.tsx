'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';
import { ProjectScreen } from '@/lib/projects';

interface ScreensGalleryProps {
  screens: ProjectScreen[];
}

export function ScreensGallery({ screens }: ScreensGalleryProps) {
  const [activeScreenIndex, setActiveScreenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const activeScreen = activeScreenIndex !== null ? screens[activeScreenIndex] : null;

  // Escape key & focus trap for lightbox modal
  useEffect(() => {
    if (activeScreenIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveScreenIndex(null);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeScreenIndex]);

  return (
    <>
      <div className="my-8">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--line)] font-mono text-xs text-[var(--text-dim)]">
          <span className="uppercase text-[var(--safelight)] font-bold">
            ▷ SCREENSHOT GALLERY [{screens.length} EXPOSURES]
          </span>
          <span className="text-[11px] opacity-70">
            [ Click to open full-fidelity lightbox ]
          </span>
        </div>

        {/* Horizontal Scroll / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {screens.map((screen, idx) => (
            <figure
              key={idx}
              className="flex flex-col rounded-[var(--radius-frame)] overflow-hidden border border-[var(--line)] bg-[var(--surface)] group"
            >
              <button
                ref={idx === activeScreenIndex ? triggerRef : undefined}
                type="button"
                onClick={() => setActiveScreenIndex(idx)}
                className="relative aspect-[3/2] w-full overflow-hidden bg-[var(--surface-2)] cursor-zoom-in block focus-visible:outline-2 focus-visible:outline-[var(--safelight)]"
                aria-label={`Open lightbox for: ${screen.caption}`}
              >
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2.5 rounded-full bg-[var(--surface)]/90 text-[var(--text)] border border-[var(--line)] shadow-lg">
                    <ZoomIn className="w-4 h-4 text-[var(--safelight)]" />
                  </span>
                </div>
              </button>
              <figcaption className="p-3 bg-[var(--surface-2)] border-t border-[var(--line)] font-mono text-[11px] text-[var(--text-dim)] flex items-center justify-between">
                <span>{screen.caption}</span>
                <span className="text-[10px] text-[var(--safelight)] uppercase font-bold">
                  FRAME 0{idx + 1}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Focus-Trapped Lightbox Modal */}
      {activeScreen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveScreenIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-[var(--surface)] rounded-[var(--radius-ui)] border border-[var(--line)] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--line)] bg-[var(--bg)] font-mono text-xs text-[var(--text-dim)]">
              <span>{activeScreen.caption}</span>
              <button
                type="button"
                onClick={() => setActiveScreenIndex(null)}
                className="w-8 h-8 rounded flex items-center justify-center text-[var(--text-dim)] hover:text-[var(--text)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--safelight)] cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Lightbox Image Container */}
            <div className="relative w-full aspect-[16/10] bg-black">
              <Image
                src={activeScreen.src}
                alt={activeScreen.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Lightbox Footer Bar */}
            <div className="px-4 py-2.5 bg-[var(--surface-2)] border-t border-[var(--line)] font-mono text-[11px] text-[var(--text-dim)] flex justify-between">
              <span>Press ESC or click backdrop to close</span>
              <span className="text-[var(--safelight)]">HI-RES PROJECTION</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
