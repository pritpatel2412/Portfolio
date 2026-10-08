'use client';

import React, { useState, useEffect, useRef } from 'react';
import { track } from '@/lib/track';
import { useToast } from '@/components/system/Toast';
import { getStoredPicks, PickItem } from '@/lib/picks';
import { projects } from '@/content/projects';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Clock,
  Mail,
  ArrowUpRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const TOPIC_CHIPS = [
  'Build a product',
  'AI/agent work',
  'Join a team',
  'Just saying hi',
] as const;

type TopicType = (typeof TOPIC_CHIPS)[number];

const BUDGET_OPTIONS = [
  '< $5k',
  '$5k – $15k',
  '$15k – $30k',
  '$30k+ / Enterprise',
] as const;

const TIMELINE_OPTIONS = [
  'Immediate',
  'This month',
  '1–3 months',
  'Flexible',
] as const;

export function ContactForm() {
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<TopicType>('Build a product');
  const [budget, setBudget] = useState<string>('');
  const [timeline, setTimeline] = useState<string>('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // Honeypot
  const [activePicks, setActivePicks] = useState<string[]>([]);

  const [hasStarted, setHasStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  // Check for picks from URLSearchParams or sessionStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const picksParam = urlParams.get('picks');

    let pickSlugs: string[] = [];
    if (picksParam) {
      pickSlugs = picksParam.split(',').map((s) => s.trim().toLowerCase());
    } else {
      const stored = getStoredPicks();
      pickSlugs = stored.map((p) => p.slug.toLowerCase());
    }

    if (pickSlugs.length > 0) {
      const matchedTitles: string[] = [];
      pickSlugs.forEach((slug) => {
        const found = projects.find((p) => p.slug.toLowerCase() === slug);
        if (found) matchedTitles.push(found.title);
      });

      if (matchedTitles.length > 0) {
        setActivePicks(matchedTitles);
        // Pre-fill message
        setMessage(
          `Hi Prit,\n\nI reviewed your work on ${matchedTitles.join(' and ')} and would like to discuss a project with you.`
        );
        // Select appropriate chip
        setTopic('Build a product');
      }
    }
  }, []);

  const handleInputFocus = () => {
    if (!hasStarted) {
      setHasStarted(true);
      track('form_start');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Client-side quick checks
    if (!name.trim()) {
      setErrorMessage('Please provide your name.');
      nameInputRef.current?.focus();
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      emailInputRef.current?.focus();
      return;
    }

    if (!message.trim() || message.trim().length < 5) {
      setErrorMessage('Please describe your project or reason for connecting (min 5 characters).');
      messageInputRef.current?.focus();
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          topic,
          budget: budget || undefined,
          timeline: timeline || undefined,
          message: message.trim(),
          picks: activePicks,
          website: website.trim(), // Honeypot
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus('success');
        track('form_submit', { ok: true });
        showToast('Message dispatched to darkroom queue.');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit form. Please use direct email below.');
        track('form_submit', { ok: false });
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network connection error. Please email directly.');
      track('form_submit', { ok: false });
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setStatus('idle');
    setName('');
    setEmail('');
    setMessage('');
    setBudget('');
    setTimeline('');
    setErrorMessage('');
  };

  return (
    <div className="relative w-full rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface-2)]/80 p-6 sm:p-10 shadow-lg">
      {/* Honeypot field for bot trapping */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
      />

      {/* M9: Developing Success State */}
      {status === 'success' ? (
        <div
          className="py-12 flex flex-col items-center text-center animate-in fade-in duration-500"
          style={{ filter: 'none', transition: 'all 600ms cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[var(--radius-ui)] bg-[var(--safelight)]/10 text-[var(--safelight)] border border-[var(--safelight)]/20 font-mono text-xs uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--safelight)] animate-pulse" />
            <span>▷ EMULSION DEVELOPED · QUEUED</span>
          </div>

          <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight mb-4">
            Negative Received.
          </h3>

          <p className="font-sans text-base sm:text-lg text-[var(--text-dim)] max-w-lg mx-auto leading-relaxed mb-8">
            Your dispatch has been queued in the chemical darkroom. I reply within 24 hours — check your inbox shortly.
          </p>

          <div className="p-4 rounded-[var(--radius-ui)] bg-[var(--surface-3)] border border-[var(--line)] font-mono text-xs text-[var(--text-dim)] max-w-md w-full mb-8 text-left space-y-1.5">
            <div><span className="text-[var(--safelight)] font-bold">FROM:</span> {name} &lt;{email}&gt;</div>
            <div><span className="text-[var(--safelight)] font-bold">TOPIC:</span> {topic}</div>
            {activePicks.length > 0 && (
              <div><span className="text-[var(--safelight)] font-bold">PICKS:</span> {activePicks.join(', ')}</div>
            )}
          </div>

          <button
            type="button"
            onClick={handleResetForm}
            className="px-6 py-2.5 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface-2)] hover:border-[var(--safelight)] text-[var(--text)] font-mono text-xs uppercase font-bold transition-colors cursor-pointer min-h-[44px]"
          >
            SEND ANOTHER MESSAGE
          </button>
        </div>
      ) : (
        /* Contact Form Fields */
        <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
          {/* Active Bookmarked Picks Indicator (if present) */}
          {activePicks.length > 0 && (
            <div className="p-3.5 rounded-[var(--radius-ui)] border border-[var(--safelight)]/30 bg-[var(--safelight)]/5 flex items-center justify-between gap-3 text-xs font-mono text-[var(--text)]">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[var(--safelight)]" />
                <span>
                  SHORTLISTED PICKS [{activePicks.length}]:{' '}
                  <span className="font-bold text-[var(--safelight)]">
                    {activePicks.join(', ')}
                  </span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActivePicks([])}
                className="text-[10px] uppercase text-[var(--text-dim)] hover:text-[var(--safelight)] cursor-pointer"
              >
                [CLEAR]
              </button>
            </div>
          )}

          {/* Qualifying Topic Chips */}
          <div className="space-y-2">
            <label className="block font-mono text-xs text-[var(--text-dim)] uppercase tracking-wider">
              01 · WHAT ARE YOU LOOKING FOR?
            </label>
            <div className="flex flex-wrap gap-2">
              {TOPIC_CHIPS.map((chip) => {
                const isSelected = topic === chip;
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => {
                      setTopic(chip);
                      handleInputFocus();
                    }}
                    className={cn(
                      'px-3.5 py-2 rounded-[var(--radius-ui)] border font-mono text-xs transition-colors cursor-pointer min-h-[40px] flex items-center gap-2',
                      isSelected
                        ? 'border-[var(--safelight)] bg-[var(--safelight)]/10 text-[var(--safelight)] font-bold'
                        : 'border-[var(--line)] bg-[var(--surface)] text-[var(--text-dim)] hover:text-[var(--text)] hover:border-[var(--line-strong)]'
                    )}
                    aria-pressed={isSelected}
                  >
                    <span>{chip}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="contact-name"
                className="block font-mono text-xs text-[var(--text-dim)] uppercase tracking-wider"
              >
                02 · YOUR NAME <span className="text-[var(--safelight)]">*</span>
              </label>
              <input
                id="contact-name"
                ref={nameInputRef}
                type="text"
                required
                value={name}
                onFocus={handleInputFocus}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                className="w-full px-4 py-2.5 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] font-sans text-sm focus:border-[var(--safelight)] focus:outline-none transition-colors min-h-[44px]"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-email"
                className="block font-mono text-xs text-[var(--text-dim)] uppercase tracking-wider"
              >
                03 · YOUR EMAIL <span className="text-[var(--safelight)]">*</span>
              </label>
              <input
                id="contact-email"
                ref={emailInputRef}
                type="email"
                required
                value={email}
                onFocus={handleInputFocus}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ada@example.com"
                className="w-full px-4 py-2.5 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] font-sans text-sm focus:border-[var(--safelight)] focus:outline-none transition-colors min-h-[44px]"
              />
            </div>
          </div>

          {/* Budget Range (Optional Chips) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-xs text-[var(--text-dim)]">
              <span className="uppercase tracking-wider">04 · BUDGET ESTIMATE (OPTIONAL)</span>
              {budget && (
                <button
                  type="button"
                  onClick={() => setBudget('')}
                  className="text-[10px] text-[var(--safelight)] cursor-pointer"
                >
                  CLEAR
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {BUDGET_OPTIONS.map((opt) => {
                const isSelected = budget === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setBudget(isSelected ? '' : opt);
                      handleInputFocus();
                    }}
                    className={cn(
                      'px-3 py-1.5 rounded-[var(--radius-ui)] border font-mono text-xs transition-colors cursor-pointer min-h-[36px]',
                      isSelected
                        ? 'border-[var(--safelight)] bg-[var(--safelight)]/10 text-[var(--safelight)] font-bold'
                        : 'border-[var(--line)] bg-[var(--surface)] text-[var(--text-dim)] hover:text-[var(--text)]'
                    )}
                    aria-pressed={isSelected}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline (Optional Chips) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-xs text-[var(--text-dim)]">
              <span className="uppercase tracking-wider">05 · TARGET TIMELINE (OPTIONAL)</span>
              {timeline && (
                <button
                  type="button"
                  onClick={() => setTimeline('')}
                  className="text-[10px] text-[var(--safelight)] cursor-pointer"
                >
                  CLEAR
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {TIMELINE_OPTIONS.map((opt) => {
                const isSelected = timeline === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setTimeline(isSelected ? '' : opt);
                      handleInputFocus();
                    }}
                    className={cn(
                      'px-3 py-1.5 rounded-[var(--radius-ui)] border font-mono text-xs transition-colors cursor-pointer min-h-[36px]',
                      isSelected
                        ? 'border-[var(--safelight)] bg-[var(--safelight)]/10 text-[var(--safelight)] font-bold'
                        : 'border-[var(--line)] bg-[var(--surface)] text-[var(--text-dim)] hover:text-[var(--text)]'
                    )}
                    aria-pressed={isSelected}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Details Message */}
          <div className="space-y-1.5">
            <label
              htmlFor="contact-message"
              className="block font-mono text-xs text-[var(--text-dim)] uppercase tracking-wider"
            >
              06 · PROJECT DETAILS <span className="text-[var(--safelight)]">*</span>
            </label>
            <textarea
              id="contact-message"
              ref={messageInputRef}
              required
              rows={4}
              value={message}
              onFocus={handleInputFocus}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about the project: what, for whom, and by when..."
              className="w-full px-4 py-3 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] font-sans text-sm focus:border-[var(--safelight)] focus:outline-none transition-colors resize-y leading-relaxed"
            />
          </div>

          {/* Error Banner (if error) */}
          {status === 'error' && (
            <div className="p-4 rounded-[var(--radius-ui)] border border-rose-500/40 bg-rose-950/20 text-rose-200 text-xs font-mono space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>SUBMISSION ERROR</span>
              </div>
              <p>{errorMessage}</p>
              <div className="pt-2 border-t border-rose-500/20">
                <a
                  href={`mailto:pritpatel2412@gmail.com?subject=${encodeURIComponent(
                    `Project Inquiry: ${name}`
                  )}&body=${encodeURIComponent(message)}`}
                  className="inline-flex items-center gap-1.5 text-[var(--safelight)] font-bold hover:underline"
                >
                  <span>Dispatch directly via mail client</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* Submit Action Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
            <span className="font-mono text-[11px] text-[var(--text-dim)]">
              Strict privacy: zero telemetry on form contents.
            </span>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded-[var(--radius-ui)] bg-[var(--safelight)] hover:opacity-90 text-[var(--bg)] font-mono text-xs uppercase font-bold transition-all cursor-pointer min-h-[44px] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-[var(--bg)] border-t-transparent rounded-full animate-spin" />
                  <span>DEVELOPING...</span>
                </>
              ) : (
                <>
                  <span>DISPATCH MESSAGE</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
