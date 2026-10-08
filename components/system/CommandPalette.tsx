'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, CornerDownLeft, Copy, Sun, Moon, ExternalLink, Download } from 'lucide-react';
import { useToast } from './Toast';
import { site } from '@/content/site';
import { track } from '@/lib/track';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  category: 'Pages' | 'Projects' | 'Actions';
  title: string;
  subtitle?: string;
  action: () => void;
  icon?: React.ReactNode;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input on open & manage body overflow
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Command items per Brief §3 & §6
  const items: CommandItem[] = [
    // Pages
    {
      id: 'nav-home',
      category: 'Pages',
      title: 'Home',
      subtitle: 'Overview & proof points',
      action: () => { router.push('/'); onClose(); },
    },
    {
      id: 'nav-projects',
      category: 'Pages',
      title: 'Projects Directory',
      subtitle: 'Contact sheet of systems & applications',
      action: () => { router.push('/projects'); onClose(); },
    },
    {
      id: 'nav-experience',
      category: 'Pages',
      title: 'Experience & Career',
      subtitle: 'Engineering roles, milestones, and education',
      action: () => { router.push('/experience'); onClose(); },
    },
    {
      id: 'nav-about',
      category: 'Pages',
      title: 'About the Engineer',
      subtitle: 'Biography, operating principles, and setup',
      action: () => { router.push('/about'); onClose(); },
    },
    {
      id: 'nav-resume',
      category: 'Pages',
      title: 'Résumé',
      subtitle: 'Semantic ATS profile & PDF view',
      action: () => { router.push('/resume'); onClose(); },
    },
    {
      id: 'nav-writing',
      category: 'Pages',
      title: 'Writing & Articles',
      subtitle: 'Deep dives on compiler design & agent swarms',
      action: () => { router.push('/writing'); onClose(); },
    },
    {
      id: 'nav-contact',
      category: 'Pages',
      title: 'Contact',
      subtitle: 'Direct channel & availability booking',
      action: () => { router.push('/contact'); onClose(); },
    },
    {
      id: 'nav-colophon',
      category: 'Pages',
      title: 'Colophon',
      subtitle: 'Typography, tech stack, and performance specs',
      action: () => { router.push('/colophon'); onClose(); },
    },

    // Projects
    {
      id: 'proj-redforge',
      category: 'Projects',
      title: 'RedForge AI',
      subtitle: 'Autonomous offensive security assessment platform',
      action: () => { router.push('/projects/redforge'); onClose(); },
    },
    {
      id: 'proj-searchmind',
      category: 'Projects',
      title: 'SearchMind API',
      subtitle: 'Sub-80ms hybrid search & RAG grounding engine',
      action: () => { router.push('/projects/searchmind'); onClose(); },
    },
    {
      id: 'proj-kemlang',
      category: 'Projects',
      title: 'KemLang Compiler',
      subtitle: 'Regional Gujarati programming language interpreter',
      action: () => { router.push('/projects/kemlang'); onClose(); },
    },
    {
      id: 'proj-aria',
      category: 'Projects',
      title: 'Aria Voice Assistant',
      subtitle: 'Real-time bidirectional speech orchestration',
      action: () => { router.push('/projects/aria'); onClose(); },
    },

    // Actions
    {
      id: 'act-copy-email',
      category: 'Actions',
      title: 'Copy Email',
      subtitle: site.email,
      icon: <Copy className="w-3.5 h-3.5" />,
      action: () => {
        navigator.clipboard.writeText(site.email);
        showToast('Copied. Say hi.');
        onClose();
      },
    },
    {
      id: 'act-toggle-theme',
      category: 'Actions',
      title: 'Toggle Theme',
      subtitle: 'Switch between Darkroom and Lightbox',
      icon: <Sun className="w-3.5 h-3.5" />,
      action: () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        showToast(`Theme switched to ${next === 'dark' ? 'Darkroom' : 'Lightbox'}`);
        onClose();
      },
    },
    {
      id: 'act-github',
      category: 'Actions',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/pritpatel2412',
      icon: <ExternalLink className="w-3.5 h-3.5" />,
      action: () => {
        window.open(site.links.github, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
    {
      id: 'act-resume-drive',
      category: 'Actions',
      title: 'Download PDF Résumé',
      subtitle: 'Open direct PDF hosted on Google Drive',
      icon: <Download className="w-3.5 h-3.5" />,
      action: () => {
        window.open(site.links.resume || 'https://drive.google.com/file/d/1Bt-CZQPBR7nR3JIpSOiYxlooDv3V93MS/view?usp=drive_link', '_blank', 'noopener,noreferrer');
        track('resume_download');
        onClose();
      },
    },
  ];

  // Filtering
  const filteredItems = items.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q)
    );
  });

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[aria-selected="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-[70] flex items-start justify-center pt-[12vh] sm:pt-[15vh] px-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[var(--bg)]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Palette Container */}
      <div
        className="relative w-full max-w-xl bg-[var(--surface)] border border-[var(--line-strong)] rounded-[var(--radius-ui)] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[70vh] animate-in fade-in zoom-in-95 duration-150"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--line)] bg-[var(--surface-2)]">
          <Search className="w-4 h-4 text-[var(--safelight)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-list"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or jump to page..."
            className="w-full bg-transparent font-mono text-sm text-[var(--text)] placeholder-[var(--text-dim)] focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 font-mono text-[10px] uppercase text-[var(--text-dim)] border border-[var(--line)] rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          id="command-list"
          role="listbox"
          className="flex-1 overflow-y-auto p-2 divide-y divide-transparent"
        >
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center font-mono text-xs text-[var(--text-dim)]">
              No matching commands or routes found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-[var(--radius-ui)] cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[var(--surface-2)] text-[var(--text)] border-l-2 border-[var(--safelight)]'
                      : 'text-[var(--text-dim)] hover:text-[var(--text)]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-dim)] shrink-0 w-16">
                      {item.category}
                    </span>
                    <div className="min-w-0">
                      <div className="font-sans font-medium text-sm text-[var(--text)] truncate">
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div className="font-mono text-xs text-[var(--text-dim)] truncate">
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-3">
                    {item.icon}
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-[var(--safelight)]" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-[var(--line)] bg-[var(--surface-2)]/50 flex items-center justify-between font-mono text-[10px] text-[var(--text-dim)]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span className="hidden sm:inline tracking-wider">DARKROOM ARCHITECTURE</span>
        </div>
      </div>
    </div>
  );
}
