'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useVibe } from './VibeProvider';
import { useLens } from './LensProvider';

export function Cursor() {
  const { activeVibe, currentConfig } = useVibe();
  const { isSourceMode } = useLens();
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ x: -999, y: -999 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only mount on devices with fine pointer support
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    setMounted(true);

    const handlePointerMove = (e: PointerEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const interactiveEl = el?.closest('a, button, [role="button"], input, textarea, select');
      const customCursorEl = el?.closest('[data-cursor]');
      const projectCard = el?.closest('[data-project-card]');

      if (customCursorEl) {
        setCursorText(customCursorEl.getAttribute('data-cursor'));
        setIsHovered(true);
      } else if (projectCard) {
        setCursorText('VIEW');
        setIsHovered(true);
      } else if (interactiveEl) {
        const href = interactiveEl.getAttribute('href');
        if (href && (href.startsWith('http') || href.startsWith('mailto:'))) {
          setCursorText('OPEN ↗');
        } else {
          setCursorText(null);
        }
        setIsHovered(true);
      } else {
        setCursorText(null);
        setIsHovered(false);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  if (!mounted) return null;

  // Theme-specific cursor style rendering
  const getCursorStyles = () => {
    const accent = currentConfig.swatches.accent;
    const ink = currentConfig.swatches.ink;

    switch (activeVibe) {
      case 'raw':
        return {
          wrapper: isHovered ? 'w-12 h-12 rounded-none' : 'w-3 h-3 rounded-none',
          style: {
            border: `2px solid ${accent}`,
            backgroundColor: isHovered ? 'rgba(255, 59, 0, 0.15)' : accent,
          },
        };
      case 'grid':
        return {
          wrapper: isHovered ? 'w-12 h-12 rounded-full' : 'w-3 h-3 rounded-full',
          style: {
            border: `1.5px solid ${accent}`,
            backgroundColor: isHovered ? 'rgba(0, 71, 255, 0.1)' : accent,
          },
        };
      case 'poster':
        return {
          wrapper: isHovered ? 'w-14 h-14 rounded-full' : 'w-3.5 h-3.5 rounded-full',
          style: {
            backgroundColor: accent,
            mixBlendMode: 'difference' as const,
          },
        };
      case 'noir':
        return {
          wrapper: isHovered ? 'w-12 h-12 rounded-full' : 'w-2.5 h-2.5 rounded-full',
          style: {
            backgroundColor: accent,
            boxShadow: `0 0 16px 2px ${accent}`,
          },
        };
      case 'colorlab':
        return {
          wrapper: isHovered ? 'w-14 h-14 rounded-2xl' : 'w-3 h-3 rounded-lg',
          style: {
            backgroundColor: accent,
            border: `1px solid ${ink}`,
          },
        };
      case 'journal':
      default:
        return {
          wrapper: isHovered ? 'w-12 h-12 rounded-full' : 'w-2 h-2 rounded-full',
          style: {
            backgroundColor: isHovered ? 'transparent' : accent,
            border: isHovered ? `1px solid ${accent}` : 'none',
          },
        };
    }
  };

  const cursorStyle = getCursorStyles();

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height,transform] duration-150 ease-out flex items-center justify-center"
      style={{
        transform: `translate3d(${coords.x}px, ${coords.y}px, 0) translate(-50%, -50%)`,
      }}
    >
      <div
        className={`${cursorStyle.wrapper} flex items-center justify-center transition-all duration-200 select-none`}
        style={cursorStyle.style}
      >
        {cursorText && (
          <span
            className="font-mono text-[9px] font-bold tracking-wider uppercase text-center px-1"
            style={{
              color: activeVibe === 'poster' ? '#000000' : 'var(--ink)',
            }}
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
