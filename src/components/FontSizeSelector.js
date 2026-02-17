'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'maequeora-font-size';
const MIN_PX = 14;
const MAX_PX = 24;
const STEP_PX = 2;
const DEFAULT_PX = 16;

const FontSizeContext = createContext(null);

export function FontSizeProvider({ children }) {
  const [fontSizePx, setFontSizePx] = useState(DEFAULT_PX);
  const [mounted, setMounted] = useState(false);

  const applyFontSize = useCallback((px) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.style.fontSize = `${px}px`;
    try {
      localStorage.setItem(STORAGE_KEY, String(px));
    } catch (e) { }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let saved = DEFAULT_PX;
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v != null) {
        const n = parseInt(v, 10);
        if (!Number.isNaN(n) && n >= MIN_PX && n <= MAX_PX) saved = n;
      }
    } catch (e) { }
    setFontSizePx(saved);
    applyFontSize(saved);
  }, [mounted, applyFontSize]);

  const increase = useCallback(() => {
    setFontSizePx((prev) => {
      const next = Math.min(MAX_PX, prev + STEP_PX);
      applyFontSize(next);
      return next;
    });
  }, [applyFontSize]);

  const decrease = useCallback(() => {
    setFontSizePx((prev) => {
      const next = Math.max(MIN_PX, prev - STEP_PX);
      applyFontSize(next);
      return next;
    });
  }, [applyFontSize]);

  const value = { fontSizePx, increase, decrease, min: MIN_PX, max: MAX_PX };
  return (
    <FontSizeContext.Provider value={value}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const ctx = useContext(FontSizeContext);
  if (!ctx) throw new Error('useFontSize must be used within FontSizeProvider');
  return ctx;
}

export function FontSizeSelector({ className = '' }) {
  const { fontSizePx, increase, decrease, min, max } = useFontSize();

  return (
    <div
      className={`flex flex-col items-center gap-1.5 rounded-xl border border-bronze/20 bg-white/80 backdrop-blur-sm shadow-sm px-3 py-2 ${className}`}
      role="group"
      aria-label="Ajustar tamanho da fonte"
    >
      <span className="text-brown text-[10px] font-black uppercase tracking-[0.2em] text-center whitespace-nowrap">
        Tamanho do texto
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={decrease}
          disabled={fontSizePx <= min}
          aria-label="Diminuir tamanho da fonte (A-)"
          title="Diminuir o tamanho das letras da página"
          className="min-w-[2rem] h-8 flex items-center justify-center rounded-lg font-bold text-brown bg-sand border border-bronze/10 hover:bg-bronze hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs focus:outline-none"
        >
          A-
        </button>
        <button
          type="button"
          onClick={increase}
          disabled={fontSizePx >= max}
          aria-label="Aumentar tamanho da fonte (A+)"
          title="Aumentar o tamanho das letras da página"
          className="min-w-[2rem] h-8 flex items-center justify-center rounded-lg font-bold text-brown bg-sand border border-bronze/10 hover:bg-bronze hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs focus:outline-none"
        >
          A+
        </button>
      </div>
      <span className="text-bronze/60 text-[9px] font-bold leading-tight text-center max-w-[80px]">
        Aumentar ou diminuir
      </span>
    </div>
  );
}
