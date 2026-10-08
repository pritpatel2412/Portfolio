'use client';

import React, { useState } from 'react';
import { Hash, Check } from 'lucide-react';
import { useToast } from '@/components/system/Toast';

interface HeadingAnchorProps {
  id: string;
  title: string;
  level?: number;
}

export function HeadingAnchor({ id, title }: HeadingAnchorProps) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      window.history.pushState(null, '', `#${id}`);
      setCopied(true);
      showToast('Copied section link to clipboard.');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.hash = id;
    }
  };

  return (
    <h2
      id={id}
      className="group relative font-display text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight mt-12 mb-6 pt-4 border-t border-[var(--line)] flex items-baseline gap-2 scroll-mt-28"
    >
      <a
        href={`#${id}`}
        onClick={handleCopy}
        className="text-[var(--safelight)] opacity-60 sm:opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 cursor-pointer -ml-6 sm:-ml-7 pr-1"
        aria-label={`Copy link to section "${title}"`}
        title="Copy section link"
      >
        {copied ? (
          <Check className="inline-block w-4 h-4 text-emerald-400" />
        ) : (
          <Hash className="inline-block w-4 h-4" />
        )}
      </a>
      <span>{title}</span>
    </h2>
  );
}
