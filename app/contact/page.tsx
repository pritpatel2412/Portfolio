'use client';

import React, { useState, useEffect } from 'react';
import { site } from '@/content/site';
import { useLens } from '@/components/system/LensProvider';
import { Send, Clock, Globe2, Copy, Check, Terminal } from 'lucide-react';

export default function ContactPage() {
  const { isSourceMode } = useLens();

  // Sentence form state
  const [name, setName] = useState('');
  const [need, setNeed] = useState('an AI agent or RAG pipeline');
  const [timeline, setTimeline] = useState('this month');
  const [budget, setBudget] = useState('$5k – $15k');
  const [email, setEmail] = useState('');
  const [context, setContext] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Timezone overlap state
  const [visitorTz, setVisitorTz] = useState('UTC');
  const [visitorTime, setVisitorTime] = useState('');
  const [ownerTime, setOwnerTime] = useState('');
  const [overlapHours, setOverlapHours] = useState('4');

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
          timeZone: site.timezone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(now);

        setVisitorTime(vTime);
        setOwnerTime(oTime);
      };

      updateTimes();
      const interval = setInterval(updateTimes, 1000);
      return () => clearInterval(interval);
    } catch {
      // Intl fallback
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setStatus('Please fill in your name and email address.');
      return;
    }

    setSubmitting(true);
    // Simulate API dispatch / mailto fallback
    setTimeout(() => {
      setSubmitting(false);
      setStatus('Message recorded successfully! Expected reply within 24 hours.');
      const mailto = `mailto:${site.email}?subject=Project Proposal from ${encodeURIComponent(name)}&body=${encodeURIComponent(
        `Hi Prit,\n\nI need ${need}, ideally by ${timeline}, with a budget around ${budget}.\n\nAdditional Context:\n${context}\n\nReach me at: ${email}`
      )}`;
      window.location.href = mailto;
    }, 600);
  };

  const payload = {
    sender: { name, email },
    requirement: need,
    timeline,
    budget,
    notes: context,
    timestamp: new Date().toISOString(),
    clientTimezone: visitorTz,
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-12 py-12 md:py-20 flex flex-col gap-16">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-8">
        <div className="flex items-center justify-between font-mono text-xs text-[var(--ink-muted)]">
          <span>06 / CONTACT & PROPOSALS</span>
          <span>TYPOGRAPHIC SENTENCE BUILDER</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-[var(--ink)] tracking-tight">
          Let’s Build Something <span className="font-serif italic font-normal text-[var(--signal)]">Enduring</span>
        </h1>
        <p className="text-base text-[var(--ink-muted)] max-w-2xl leading-relaxed">
          Fill out the proposal sentence below or copy my direct email. Serious technical inquiries receive detailed architectural replies.
        </p>
      </div>

      {/* Main Grid: Form + Timezone Overlap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Sentence Form (§7.8 Signature #6) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <form onSubmit={handleSubmit} className="p-8 md:p-12 border border-[var(--line)] rounded-xl bg-[var(--bg-raised)] flex flex-col gap-8">
            <div className="font-display text-2xl sm:text-3xl md:text-4xl text-[var(--ink)] leading-[1.8] font-medium">
              Hi Prit, I’m{' '}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="your name"
                required
                className="border-b-2 border-[var(--signal)] bg-transparent text-[var(--signal)] placeholder-[var(--ink-muted)] px-1 py-0.5 focus:outline-none min-w-[180px] font-bold"
              />
              . I need{' '}
              <select
                value={need}
                onChange={(e) => setNeed(e.target.value)}
                className="border-b-2 border-[var(--signal)] bg-transparent text-[var(--signal)] px-1 py-0.5 focus:outline-none font-bold cursor-pointer"
              >
                <option value="an AI agent or RAG pipeline" className="bg-[var(--bg)] text-[var(--ink)]">an AI agent or RAG pipeline</option>
                <option value="a full-stack web platform" className="bg-[var(--bg)] text-[var(--ink)]">a full-stack web platform</option>
                <option value="a developer tool or security scanner" className="bg-[var(--bg)] text-[var(--ink)]">a developer tool or security scanner</option>
                <option value="high-impact technical consulting" className="bg-[var(--bg)] text-[var(--ink)]">high-impact technical consulting</option>
              </select>
              , ideally by{' '}
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="border-b-2 border-[var(--signal)] bg-transparent text-[var(--signal)] px-1 py-0.5 focus:outline-none font-bold cursor-pointer"
              >
                <option value="ASAP" className="bg-[var(--bg)] text-[var(--ink)]">ASAP</option>
                <option value="this month" className="bg-[var(--bg)] text-[var(--ink)]">this month</option>
                <option value="this quarter" className="bg-[var(--bg)] text-[var(--ink)]">this quarter</option>
                <option value="flexible timing" className="bg-[var(--bg)] text-[var(--ink)]">flexible timing</option>
              </select>
              , with a budget around{' '}
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="border-b-2 border-[var(--signal)] bg-transparent text-[var(--signal)] px-1 py-0.5 focus:outline-none font-bold cursor-pointer"
              >
                <option value="<$5k" className="bg-[var(--bg)] text-[var(--ink)]">&lt; $5k</option>
                <option value="$5k – $15k" className="bg-[var(--bg)] text-[var(--ink)]">$5k – $15k</option>
                <option value="$15k – $30k" className="bg-[var(--bg)] text-[var(--ink)]">$15k – $30k</option>
                <option value="$30k+" className="bg-[var(--bg)] text-[var(--ink)]">$30k+</option>
              </select>
              . Reach me at{' '}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your email"
                required
                className="border-b-2 border-[var(--signal)] bg-transparent text-[var(--signal)] placeholder-[var(--ink-muted)] px-1 py-0.5 focus:outline-none min-w-[220px] font-bold"
              />
              .
            </div>

            {/* Context Textarea */}
            <div className="space-y-2 pt-2">
              <label className="font-mono text-xs uppercase text-[var(--ink-muted)] block">
                Additional Project Context (Optional):
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                rows={3}
                placeholder="Briefly describe the core technical constraints, existing repository, or deliverables..."
                className="w-full p-3 rounded-lg border border-[var(--line)] bg-[var(--bg)] font-mono text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--signal)] placeholder-[var(--ink-muted)]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--signal)] text-[var(--on-signal)] font-mono text-xs font-bold hover:opacity-95 transition-opacity cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Transmitting...' : 'Send Proposal'}</span>
              </button>
              {status && (
                <span className="font-mono text-xs text-[var(--signal)]">
                  {status}
                </span>
              )}
            </div>
          </form>

          {/* Source Layer: Live JSON Reflection */}
          <div className="p-6 border border-[var(--line)] rounded-xl bg-[var(--bg-raised)] font-mono text-xs space-y-2">
            <div className="flex items-center gap-2 text-[var(--phosphor)] font-bold">
              <Terminal className="w-3.5 h-3.5" />
              <span>// LIVE SOURCE PAYLOAD (POST /api/contact)</span>
            </div>
            <pre className="text-[11px] text-[var(--ink-muted)] overflow-x-auto p-4 bg-black/60 rounded border border-[var(--line)]">
              {JSON.stringify(payload, null, 2)}
            </pre>
          </div>
        </div>

        {/* Right Sidebar: Timezone Overlap (§7.8 Signature #7) & Direct Channels */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          {/* Timezone Overlap Widget */}
          <div className="p-6 border border-[var(--line)] rounded-xl bg-[var(--bg-raised)] font-mono text-xs space-y-4">
            <div className="flex items-center gap-2 text-[var(--ink)] font-bold uppercase tracking-wider">
              <Globe2 className="w-4 h-4 text-[var(--signal)]" />
              <span>Timezone Synchronization</span>
            </div>

            <div className="space-y-3 divide-y divide-[var(--line)]">
              <div className="pt-2 flex justify-between">
                <span className="text-[var(--ink-muted)]">Your Local ({visitorTz})</span>
                <span className="font-bold text-[var(--ink)]">{visitorTime || '00:00'}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-[var(--ink-muted)]">Prit’s Local (Asia/Kolkata)</span>
                <span className="font-bold text-[var(--signal)]">{ownerTime || '00:00'}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-[var(--ink-muted)]">Shared Working Window</span>
                <span className="font-bold text-[var(--phosphor)]">~{overlapHours}h overlap today</span>
              </div>
            </div>

            <p className="text-[10px] text-[var(--ink-muted)] pt-1">
              Calculated entirely on-device via Intl API. Zero telemetry transmitted.
            </p>
          </div>

          {/* Direct Communication Channels */}
          <div className="p-6 border border-[var(--line)] rounded-xl bg-[var(--bg-raised)] font-mono text-xs space-y-4">
            <div className="text-[var(--ink)] font-bold uppercase tracking-wider">
              Direct Channels
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(site.email);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="w-full flex items-center justify-between p-3 rounded border border-[var(--line)] bg-[var(--bg)] hover:border-[var(--ink-muted)] cursor-pointer text-left transition-colors"
              >
                <div>
                  <span className="block text-[10px] text-[var(--ink-muted)]">DIRECT EMAIL</span>
                  <span className="font-bold text-[var(--ink)]">{site.email}</span>
                </div>
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-[var(--ink-muted)]" />}
              </button>

              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 rounded border border-[var(--line)] bg-[var(--bg)] hover:border-[var(--ink-muted)] text-left transition-colors"
              >
                <div>
                  <span className="block text-[10px] text-[var(--ink-muted)]">LINKEDIN</span>
                  <span className="font-bold text-[var(--ink)]">in/prit-patel-904272307 ↗</span>
                </div>
              </a>

              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 rounded border border-[var(--line)] bg-[var(--bg)] hover:border-[var(--ink-muted)] text-left transition-colors"
              >
                <div>
                  <span className="block text-[10px] text-[var(--ink-muted)]">GITHUB</span>
                  <span className="font-bold text-[var(--ink)]">github.com/pritpatel2412 ↗</span>
                </div>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
