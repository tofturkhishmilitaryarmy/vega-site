/**
 * @file AppContext.tsx
 * @description Tema (Dark/Light mode) ve Dil (TR/EN) yönetimini localStorage ile sağlayan
 * ve site içi arama, Status modalı, API dokümantasyonu modalı durumlarını tutan context.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'dark' | 'light';
export type Language = 'tr' | 'en';

interface AppContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isStatusModalOpen: boolean;
  setIsStatusModalOpen: (open: boolean) => void;
  isApiModalOpen: boolean;
  setIsApiModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('vega_theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('vega_lang');
      return saved === 'en' ? 'en' : 'tr';
    } catch {
      return 'tr';
    }
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    try {
      localStorage.setItem('vega_theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('vega_lang', newLang);
    } catch {}
  };

  // Klavye kısayolu: Ctrl+K veya Cmd+K ile site içi arama aç/kapa
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        lang,
        setLang,
        isSearchOpen,
        setIsSearchOpen,
        isStatusModalOpen,
        setIsStatusModalOpen,
        isApiModalOpen,
        setIsApiModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return ctx;
};
