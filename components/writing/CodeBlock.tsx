'use client';

import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { useToast } from '@/components/system/Toast';

interface CodeBlockProps {
  filename: string;
  language: string;
  code: string;
}

export function CodeBlock({ filename, language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      showToast('Copied code snippet to clipboard.');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Could not copy code automatically.');
    }
  };

  return (
    <div className="my-6 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface-2)] overflow-hidden shadow-md font-mono text-xs">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--bg)]/90 border-b border-[var(--line)] text-[var(--text-dim)]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[var(--safelight)]" />
          <span className="font-bold text-[var(--text)]">{filename}</span>
          <span className="text-[10px] uppercase opacity-60">[{language}]</span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--surface-2)] hover:bg-[var(--surface)] text-[var(--text)] border border-[var(--line)] transition-colors cursor-pointer min-h-[32px] focus-visible:outline-2 focus-visible:outline-[var(--safelight)]"
          aria-label="Copy code snippet to clipboard"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] text-emerald-400 font-bold">COPIED</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[var(--safelight)]" />
              <span className="text-[10px]">COPY</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto text-xs leading-relaxed text-[var(--text)] bg-[var(--surface-2)]/50">
        <pre className="font-mono">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
