'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  magnetic?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  magnetic = true,
  children,
  className,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!magnetic || disabled) return;
    
    // Disable magnetic effect on touch or reduced-motion
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return;
    }

    const element = buttonRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Brief §5: Magnetic buttons: max 8px pull
    const pullFactor = 0.22;
    const maxPull = 8;

    const deltaX = (e.clientX - centerX) * pullFactor;
    const deltaY = (e.clientY - centerY) * pullFactor;

    const clampedX = Math.max(-maxPull, Math.min(maxPull, deltaX));
    const clampedY = Math.max(-maxPull, Math.min(maxPull, deltaY));

    setPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    if (!magnetic) return;
    setPosition({ x: 0, y: 0 });
  };

  // Base typography & sizing
  const sizeClasses = {
    sm: 'min-h-[38px] px-3.5 py-1.5 text-xs',
    md: 'min-h-[44px] px-5 py-2.5 text-xs sm:text-sm', // 44px touch target floor (WCAG 2.2)
    lg: 'min-h-[48px] px-7 py-3 text-sm tracking-widest',
  };

  // Variants per brief §4 & §6:
  // Primary = safelight fill
  // Secondary = outline
  const variantClasses = {
    primary:
      'bg-[var(--safelight)] text-[var(--bg)] font-semibold border border-[var(--safelight)] hover:brightness-110 active:brightness-95',
    secondary:
      'bg-transparent text-[var(--text)] border border-[var(--line)] hover:border-[var(--text)] active:bg-[var(--surface-2)]',
    ghost:
      'bg-transparent text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-[var(--surface)] border border-transparent',
  };

  const sharedClasses = cn(
    'relative inline-flex items-center justify-center gap-2 font-mono uppercase tracking-wider',
    'rounded-[var(--radius-ui)] cursor-pointer select-none transition-colors duration-200',
    'focus-visible:outline-2 focus-visible:outline-[var(--safelight)] focus-visible:outline-offset-2',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  const transformStyle: React.CSSProperties = {
    transform: position.x || position.y ? `translate3d(${position.x}px, ${position.y}px, 0)` : undefined,
    transition: position.x || position.y ? 'transform 100ms ease-out' : 'transform 240ms cubic-bezier(0.16, 1, 0.3, 1), background-color 200ms ease, border-color 200ms ease',
    ...style,
  };

  if (href) {
    if (external) {
      return (
        <a
          ref={buttonRef as unknown as React.RefObject<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={sharedClasses}
          style={transformStyle}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        ref={buttonRef as unknown as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={sharedClasses}
        style={transformStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={buttonRef as unknown as React.RefObject<HTMLButtonElement>}
      type={props.type || 'button'}
      disabled={disabled}
      className={sharedClasses}
      style={transformStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}
