'use client';

import React, { useState } from 'react';
import { Mail, ArrowUpRight, CheckCircle2, Send, Terminal, Sparkles, Copy } from 'lucide-react';
import { useUniverse } from '@/lib/universe';
import profileData from '@/content/profile.json';

export function UniverseContactView() {
  const { universe } = useUniverse();
  const { email, location, links } = profileData;

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmail || !formMsg) return;
    setSubmitted(true);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // =========================================================================
  // 1. EDITORIAL CONTACT (Final Magazine Spread & Colophon)
  // =========================================================================
  if (universe === 'editorial') {
    return (
      <div className="min-h-screen bg-[#F7F2EB] text-[#1A1816] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-5xl mx-auto space-y-20">
          <header className="border-b border-[#1A1816]/20 pb-12">
            <div className="flex flex-wrap items-center justify-between font-mono text-xs uppercase tracking-widest text-[#6B645C] border-b border-[#1A1816]/10 pb-3 mb-6">
              <span>FOLIO 07 · THE FINAL SPREAD</span>
              <span>COMMUNICATION &amp; COMMISSIONS</span>
              <span className="text-[#B43A12]">VADODARA, GUJARAT</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              <div className="md:col-span-8">
                <h1 className="font-serif font-black text-6xl sm:text-8xl tracking-tight leading-[0.9]">
                  Let’s Build <br />
                  <span className="italic font-normal">Enduring Works.</span>
                </h1>
              </div>
              <div className="md:col-span-4">
                <p className="font-serif italic text-base text-[#6B645C] leading-relaxed">
                  Available for full-stack engineering, high-throughput backend architecture, and autonomous AI system commissions.
                </p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5 space-y-8">
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-widest text-[#B43A12] block">
                  DIRECT TRANSMISSION
                </span>
                <button
                  onClick={copyEmail}
                  className="font-serif font-black text-2xl text-[#1A1816] hover:text-[#B43A12] transition-colors text-left flex items-center gap-2"
                >
                  <span>{email}</span>
                  <Copy className="w-4 h-4 text-[#6B645C]" />
                </button>
                {copied && <span className="font-mono text-xs text-[#B43A12]">Copied to clipboard.</span>}
              </div>

              <div className="font-serif text-sm text-[#4A453E] space-y-2 border-t border-[#1A1816]/10 pt-6">
                <div><strong>Location:</strong> {location} (UTC+05:30)</div>
                <div><strong>Response time:</strong> Within 24 hours</div>
                <div className="pt-4 flex gap-4 font-mono text-xs text-[#B43A12]">
                  <a href={links.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GITHUB ↗</a>
                  <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LINKEDIN ↗</a>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 bg-white/70 p-8 rounded border border-[#1A1816]/15 shadow-sm">
              {submitted ? (
                <div className="text-center py-12 space-y-3 font-serif">
                  <CheckCircle2 className="w-12 h-12 text-[#B43A12] mx-auto" />
                  <h3 className="text-2xl font-bold">Transmission Logged</h3>
                  <p className="text-sm text-[#6B645C]">Thank you for reaching out. I will respond to your dispatch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-[#6B645C] block mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-4 py-3 rounded bg-transparent border border-[#1A1816]/20 font-serif text-base focus:border-[#B43A12] outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-[#6B645C] block mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded bg-transparent border border-[#1A1816]/20 font-serif text-base focus:border-[#B43A12] outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-[#6B645C] block mb-2">Message &amp; Project Scope</label>
                    <textarea
                      rows={4}
                      required
                      value={formMsg}
                      onChange={(e) => setFormMsg(e.target.value)}
                      className="w-full px-4 py-3 rounded bg-transparent border border-[#1A1816]/20 font-serif text-base focus:border-[#B43A12] outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#1A1816] text-[#F7F2EB] font-mono text-xs uppercase tracking-widest hover:bg-[#B43A12] transition-colors font-bold"
                  >
                    DISPATCH PROPOSAL ↗
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. NEO MAXIMALIST CONTACT (Giant Poster)
  // =========================================================================
  if (universe === 'maximalist') {
    return (
      <div className="min-h-screen bg-[#FFF952] text-black px-4 sm:px-8 md:px-12 py-16 font-sans selection:bg-[#FF0055] selection:text-white">
        <div className="max-w-5xl mx-auto space-y-16">
          <header className="border-4 border-black p-8 bg-white shadow-[10px_10px_0px_#000]">
            <div className="inline-block bg-[#FF0055] text-white font-black text-xs px-3 py-1 uppercase rotate-[-2deg] mb-3">
              ★ READY TO SHIP? LET’S TALK! ★
            </div>
            <h1 className="font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter">
              DROP A LINE!
            </h1>
            <p className="font-bold text-xl text-slate-800 mt-2">
              Have a high-concurrency architecture or AI product in mind? Send a message now!
            </p>
          </header>

          <div className="border-4 border-black p-8 bg-[#00E5FF] shadow-[12px_12px_0px_#000]">
            {submitted ? (
              <div className="text-center py-10 bg-white border-4 border-black p-8 space-y-3">
                <div className="font-black text-4xl uppercase text-[#FF0055]">MESSAGE SENT! ★</div>
                <p className="font-bold text-base">Thanks for dropping by. I will get back to you ASAP.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-black text-xs uppercase block mb-1">YOUR NAME</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full p-3 border-4 border-black font-bold text-sm bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-black text-xs uppercase block mb-1">YOUR EMAIL</label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full p-3 border-4 border-black font-bold text-sm bg-white outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-black text-xs uppercase block mb-1">WHAT ARE WE BUILDING?</label>
                  <textarea
                    rows={4}
                    required
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                    className="w-full p-3 border-4 border-black font-bold text-sm bg-white outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 border-4 border-black bg-[#FF0055] text-white font-black text-sm uppercase shadow-[6px_6px_0px_#000] hover:bg-black transition-colors"
                >
                  SEND TRANSMISSION! 🚀
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. JAPANDI POP CONTACT (Quiet Final Composition)
  // =========================================================================
  if (universe === 'japandi') {
    return (
      <div className="min-h-screen bg-[#F4EFEA] text-[#2C2926] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-4xl mx-auto space-y-16">
          <header className="border-b border-[#2C2926]/10 pb-8 flex items-start justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#B35446] block mb-2">
                連絡 · COMMENCE DIALOGUE
              </span>
              <h1 className="font-serif text-5xl sm:text-7xl text-[#2C2926]">
                Begin.
              </h1>
              <p className="text-base text-[#7D756C] mt-2 max-w-md">
                Every fruitful collaboration begins with quiet intention and mutual respect for craft.
              </p>
            </div>
            <div className="w-12 h-12 rounded border border-[#B35446] flex items-center justify-center text-[#B35446] font-serif font-bold text-lg">
              和
            </div>
          </header>

          <div className="p-8 sm:p-12 rounded-lg bg-white/60 border border-[#2C2926]/10 space-y-6">
            <div className="text-center space-y-2 pb-6 border-b border-[#2C2926]/10">
              <span className="text-xs font-mono text-[#7D756C] uppercase">電子メール · DIRECT EMAIL</span>
              <div className="font-serif text-3xl text-[#2C2926]">{email}</div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto pt-4">
              <div>
                <label className="text-xs font-mono text-[#7D756C] uppercase block mb-2">お名前 · Name</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded bg-white border border-[#2C2926]/15 text-sm outline-none focus:border-[#B35446]"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-[#7D756C] uppercase block mb-2">返信用メール · Email</label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded bg-white border border-[#2C2926]/15 text-sm outline-none focus:border-[#B35446]"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-[#7D756C] uppercase block mb-2">ご用件 · Message</label>
                <textarea
                  rows={4}
                  required
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                  className="w-full px-4 py-2.5 rounded bg-white border border-[#2C2926]/15 text-sm outline-none focus:border-[#B35446]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded bg-[#B35446] text-[#F4EFEA] text-xs font-mono uppercase tracking-wider hover:bg-[#2C2926] transition-colors"
              >
                送信 · SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. SWISS CONTACT (Massive Typographic Statement)
  // =========================================================================
  if (universe === 'swiss') {
    return (
      <div className="min-h-screen bg-[#F0F0EE] text-black px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-6xl mx-auto space-y-16">
          <header className="border-t-4 border-b-2 border-black py-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#E62B1E] block mb-1 font-bold">
              SYSTEM 06 // KOMMUNIKATION
            </span>
            <h1 className="font-black text-6xl sm:text-8xl md:text-9xl uppercase tracking-tighter leading-none">
              LET’S TALK.
            </h1>
          </header>

          <div className="grid grid-cols-12 gap-8 border-b-2 border-black pb-12">
            <div className="col-span-12 md:col-span-5 space-y-4 font-mono text-xs">
              <div className="font-black text-lg font-sans uppercase">DIREKTKONTAKT:</div>
              <div className="text-xl font-bold">{email}</div>
              <div className="text-slate-600">STANDORT: {location}</div>
              <div className="text-[#E62B1E] font-bold">VERFÜGBAR AB SOFORT</div>
            </div>

            <div className="col-span-12 md:col-span-7 bg-white border-2 border-black p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-mono text-xs font-bold uppercase block mb-1">NAME</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full p-2.5 border border-black font-sans text-sm outline-none focus:bg-[#E62B1E]/5"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs font-bold uppercase block mb-1">EMAIL</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full p-2.5 border border-black font-sans text-sm outline-none focus:bg-[#E62B1E]/5"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs font-bold uppercase block mb-1">NACHRICHT</label>
                  <textarea
                    rows={4}
                    required
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                    className="w-full p-2.5 border border-black font-sans text-sm outline-none focus:bg-[#E62B1E]/5"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-black text-white font-bold text-xs uppercase hover:bg-[#E62B1E] transition-colors"
                >
                  ABSCHICKEN ↗
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 5. BRUTALIST CONTACT (Raw Contact Document)
  // =========================================================================
  if (universe === 'brutalist') {
    return (
      <div className="min-h-screen bg-black text-[#E0E0E0] px-4 sm:px-8 py-16 font-mono">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="border border-white p-6 bg-[#111] space-y-3">
            <div className="text-xs text-[#FFEB3B] font-bold">
              ~/PRIT/CONTACT.SH [COMMUNICATION_PROTOCOL]
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold uppercase text-white">
              $ POST /API/MESSAGE
            </h1>
            <p className="text-xs text-slate-400">
              Direct socket endpoint to the developer. Zero tracking pixels.
            </p>
          </header>

          <div className="border border-zinc-700 p-6 space-y-6 bg-[#0a0a0a]">
            <div className="text-xs text-[#FFEB3B]">
              MAILTO: {email}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">CLIENT_IDENTITY (NAME):</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2 bg-black border border-zinc-700 text-white outline-none focus:border-[#FFEB3B]"
                />
              </div>
              <div>
                <label className="text-zinc-400 block mb-1">RETURN_SOCKET (EMAIL):</label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full p-2 bg-black border border-zinc-700 text-white outline-none focus:border-[#FFEB3B]"
                />
              </div>
              <div>
                <label className="text-zinc-400 block mb-1">PAYLOAD (MESSAGE):</label>
                <textarea
                  rows={4}
                  required
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                  className="w-full p-2 bg-black border border-zinc-700 text-white outline-none focus:border-[#FFEB3B]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-[#FFEB3B] text-black font-bold uppercase hover:bg-white transition-colors"
              >
                EXECUTE_TRANSMISSION
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 6. NOIR CONTACT (Movie-Credit Ending)
  // =========================================================================
  if (universe === 'noir') {
    return (
      <div className="min-h-screen bg-[#080808] text-[#E5E5E5] px-4 sm:px-8 md:px-12 py-16 font-sans">
        <div className="max-w-4xl mx-auto space-y-16">
          <header className="border-b border-zinc-800 pb-10 text-center space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF9500]">
              THE FINAL SCENE · CURTAIN CLOSE
            </span>
            <h1 className="font-serif italic text-6xl sm:text-8xl text-white">
              The Credits Roll.
            </h1>
            <p className="text-sm text-zinc-400 max-w-md mx-auto">
              Initiate communication for forthcoming cinematic software productions.
            </p>
          </header>

          <div className="p-8 rounded bg-zinc-950 border border-zinc-800 space-y-8">
            <div className="text-center font-mono text-xs text-zinc-500 space-y-1">
              <div>ENGINEERING // PRIT PATEL</div>
              <div className="text-[#FF9500] font-bold">{email}</div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-3 bg-black border border-zinc-800 rounded text-sm text-white placeholder-zinc-600 outline-none focus:border-[#FF9500]"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full p-3 bg-black border border-zinc-800 rounded text-sm text-white placeholder-zinc-600 outline-none focus:border-[#FF9500]"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="Production Script / Inquiry"
                  required
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                  className="w-full p-3 bg-black border border-zinc-800 rounded text-sm text-white placeholder-zinc-600 outline-none focus:border-[#FF9500]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#FF9500] text-black font-mono text-xs uppercase font-bold tracking-widest hover:bg-white transition-colors"
              >
                DISPATCH WIRE ↗
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 7. ARCHIVE CONTACT (Communication Record)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#E2E8F0] px-4 sm:px-8 md:px-12 py-16 font-mono">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="border border-cyan-800/40 p-8 rounded bg-[#111827]/60 space-y-3">
          <div className="flex items-center gap-2 text-xs text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>COMMUNICATION TELEMETRY // DISPATCH_CONSOLE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
            COMMUNICATION RECORD
          </h1>
          <p className="font-sans text-sm text-slate-300">
            Secure uplink to laboratory operator. Verified delivery protocol.
          </p>
        </header>

        <div className="p-8 rounded border border-cyan-800/40 bg-[#111827]/40 space-y-6">
          <div className="text-xs text-cyan-400">
            TARGET_INBOX: {email}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="OPERATOR_NAME"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full p-3 bg-[#0B0F17] border border-cyan-900/60 rounded text-xs text-cyan-300 placeholder-slate-500 outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="RETURN_SIGNAL (EMAIL)"
                required
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                className="w-full p-3 bg-[#0B0F17] border border-cyan-900/60 rounded text-xs text-cyan-300 placeholder-slate-500 outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <textarea
                rows={4}
                placeholder="DISPATCH_PAYLOAD"
                required
                value={formMsg}
                onChange={(e) => setFormMsg(e.target.value)}
                className="w-full p-3 bg-[#0B0F17] border border-cyan-900/60 rounded text-xs text-cyan-300 placeholder-slate-500 outline-none focus:border-cyan-400"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-cyan-500 text-black font-bold text-xs uppercase hover:bg-white transition-colors"
            >
              TRANSMIT_TO_ARCHIVE ↗
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
