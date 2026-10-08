'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = containerRef.current.querySelectorAll('.word');
    
    gsap.fromTo(
      words,
      { y: '100%', opacity: 0, rotateZ: 5 },
      {
        y: '0%',
        opacity: 1,
        rotateZ: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: 'power4.out',
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      }
    );
  }, [delay]);

  return (
    <span ref={containerRef} className={`inline-block overflow-hidden ${className}`}>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          className="word inline-block origin-bottom-left will-change-transform"
          style={{ marginRight: '0.25em' }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
