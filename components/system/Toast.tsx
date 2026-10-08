'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ToastContextValue {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((message: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setToast(message);
    timerRef.current = setTimeout(() => {
      setToast(null);
    }, 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            'fixed bottom-6 right-6 z-[70]',
            'font-mono text-xs px-4 py-2.5 rounded-[var(--radius-ui)]',
            'border border-[var(--line-strong)] bg-[var(--surface-2)] text-[var(--text)]',
            'shadow-2xl flex items-center gap-2.5 backdrop-blur-md',
            'animate-in fade-in slide-in-from-bottom-2 duration-200'
          )}
        >
          <span className="w-2 h-2 rounded-full bg-[var(--safelight)]" />
          <span className="tracking-wide">{toast}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
}
