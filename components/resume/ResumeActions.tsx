'use client';

import React from 'react';
import { Printer, Download, Share2, ExternalLink } from 'lucide-react';
import { useToast } from '@/components/system/Toast';
import { track } from '@/lib/track';

interface ResumeActionsProps {
  resumeUrl?: string;
}

export function ResumeActions({
  resumeUrl = 'https://drive.google.com/file/d/1Bt-CZQPBR7nR3JIpSOiYxlooDv3V93MS/view?usp=drive_link',
}: ResumeActionsProps) {
  const { showToast } = useToast();

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Copied resume link to clipboard.');
    } catch {
      showToast('Could not copy link automatically.');
    }
  };

  return (
    <div className="print:hidden sticky top-20 z-30 mb-8 flex flex-wrap items-center justify-between gap-3 p-3 rounded-[var(--radius-ui)] bg-[var(--surface-2)]/90 backdrop-blur-md border border-[var(--line)] font-mono text-xs shadow-md">
      <div className="flex items-center gap-2 text-[var(--text-dim)]">
        <span className="w-2 h-2 rounded-full bg-[var(--safelight)]" />
        <span className="uppercase text-[11px] font-bold text-[var(--text)]">
          ATS-OPTIMIZED SEMANTIC RÉSUMÉ
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-ui)] bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--safelight)] text-[var(--text)] transition-colors cursor-pointer min-h-[38px] focus-visible:outline-2 focus-visible:outline-[var(--safelight)]"
          aria-label="Print resume to PDF or physical printer"
        >
          <Printer className="w-3.5 h-3.5 text-[var(--safelight)]" />
          <span>PRINT / PDF</span>
        </button>

        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('resume_download')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-ui)] bg-[var(--safelight)] text-[var(--on-safelight,#0A0908)] font-bold uppercase transition-opacity hover:opacity-90 cursor-pointer min-h-[38px] focus-visible:outline-2 focus-visible:outline-[var(--safelight)]"
          aria-label="Open and download hosted PDF résumé on Google Drive"
        >
          <Download className="w-3.5 h-3.5" />
          <span>DOWNLOAD PDF</span>
          <ExternalLink className="w-3 h-3 opacity-70" />
        </a>

        <button
          type="button"
          onClick={handleCopyLink}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-ui)] bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--text-dim)] text-[var(--text-dim)] hover:text-[var(--text)] transition-colors cursor-pointer min-h-[38px] focus-visible:outline-2 focus-visible:outline-[var(--safelight)]"
          aria-label="Copy resume web link"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>COPY LINK</span>
        </button>
      </div>
    </div>
  );
}
