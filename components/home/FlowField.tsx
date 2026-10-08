'use client';

import React, { useRef, useEffect, useState } from 'react';

export function FlowField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canRenderWebGL, setCanRenderWebGL] = useState(false);

  useEffect(() => {
    // Only initialize on desktop with fine pointer and motion allowed
    const hasHover = window.matchMedia('(hover: hover) and (min-width: 1024px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasHover || prefersReducedMotion) {
      return;
    }

    setCanRenderWebGL(true);
  }, []);

  useEffect(() => {
    if (!canRenderWebGL || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const pointer = { x: width / 2, y: height / 2 };
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Grid of vectors
    const spacing = 48;
    const cols = Math.floor(width / spacing);
    const rows = Math.floor(height / spacing);
    let time = 0;

    const render = () => {
      // Pause if tab is hidden
      if (document.hidden) {
        animationId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'var(--signal)';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.16;

      time += 0.01 + scrollVelocity * 0.002;
      scrollVelocity *= 0.95; // decay velocity

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing + spacing / 2;
          const y = j * spacing + spacing / 2;

          // Compute angle towards pointer + ambient wave
          const dx = pointer.x - x;
          const dy = pointer.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pullAngle = Math.atan2(dy, dx);

          const waveAngle = Math.sin(x * 0.005 + time) + Math.cos(y * 0.005 + time);
          const pullInfluence = Math.max(0, 1 - dist / 350);
          const angle = waveAngle * (1 - pullInfluence) + pullAngle * pullInfluence;

          const len = 14 + pullInfluence * 10;
          const x2 = x + Math.cos(angle) * len;
          const y2 = y + Math.sin(angle) * len;

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [canRenderWebGL]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {canRenderWebGL ? (
        <canvas ref={canvasRef} className="w-full h-full" />
      ) : (
        /* Static SVG Fallback for touch/low-power */
        <svg
          className="w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <defs>
            <pattern id="flow-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <line x1="16" y1="24" x2="32" y2="24" stroke="var(--signal)" strokeWidth="1" strokeLinecap="round" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#flow-grid)" />
        </svg>
      )}
    </div>
  );
}
