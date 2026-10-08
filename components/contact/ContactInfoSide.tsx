'use client';

import React, { useState, useEffect } from 'react';
import { site } from '@/content/site';
import { useToast } from '@/components/system/Toast';
import { track } from '@/lib/track';
import {
  Mail,
  Copy,
  Check,
  Clock,
  Globe2,
  Calendar,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

export function ContactInfoSide() {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [visitorTz, setVisitorTz] = useState('UTC');
  const [visitorTime, setVisitorTime] = useState('');
  const [ownerTime, setOwnerTime] = useState('');

  const email = site.email || 'pritpatel2412@gmail.com';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      showToast('Copied. Say hi.');
      track('email_copied');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Could not copy email automatically.');
    }
  };

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
      setVisitorTz(tz);

      const updateTimes = () => {
        const now = new Date();
        const vTime = new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(now);

        const oTime = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(now);

        setVisitorTime(vTime);
        setOwnerTime(oTime);
      };

      updateTimes();
      const timer = setInterval(updateTimes, 10000);
      return () => clearInterval(timer);
    } catch {
      // Fallback
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Click-to-copy Email Card */}
      <div className="p-5 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface-2)]/60 flex flex-col gap-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]">
          DIRECT EMAIL DISPATCH
        </span>

        <div className="flex items-center justify-between gap-3">
          <a
            href={`mailto:${email}`}
            className="font-mono text-sm sm:text-base font-bold text-[var(--text)] hover:text-[var(--safelight)] transition-colors truncate"
          >
            {email}
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="px-3 py-1.5 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--safelight)] text-[var(--text)] font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 min-h-[36px]"
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[var(--safelight)]" />
                <span>COPY</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Response Guarantee & Availability */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface-2)]/40 space-y-1.5">
          <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--safelight)] font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>REPLY PROMISE</span>
          </div>
          <p className="font-sans text-xs text-[var(--text-dim)]">
            Replies guaranteed within 24 hours across all timezones.
          </p>
        </div>

        <div className="p-4 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface-2)]/40 space-y-1.5">
          <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--safelight)] font-bold">
            <span className="w-2 h-2 rounded-full bg-[var(--safelight)] animate-pulse" />
            <span>AVAILABILITY</span>
          </div>
          <p className="font-sans text-xs text-[var(--text-dim)]">
            Available for Q4 contracts, advisory &amp; senior roles.
          </p>
        </div>
      </div>

      {/* Timezone Overlap Card */}
      <div className="p-5 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface-2)]/60 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between text-[var(--text-dim)] pb-2 border-b border-[var(--line)]">
          <span className="flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5 text-[var(--safelight)]" />
            <span>TIMEZONE OVERLAP</span>
          </span>
          <span className="text-[10px] text-[var(--safelight)]">LIVE SYNC</span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="text-[10px] text-[var(--text-dim)]">MY TIME (IST)</div>
            <div className="text-base font-bold text-[var(--text)] mt-0.5">
              {ownerTime || '13:00'}
            </div>
            <div className="text-[10px] text-[var(--text-dim)] opacity-75">Vadodara, IN</div>
          </div>

          <div>
            <div className="text-[10px] text-[var(--text-dim)]">YOUR LOCAL TIME</div>
            <div className="text-base font-bold text-[var(--text)] mt-0.5">
              {visitorTime || '13:00'}
            </div>
            <div className="text-[10px] text-[var(--text-dim)] opacity-75 truncate max-w-[140px]">
              {visitorTz}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
