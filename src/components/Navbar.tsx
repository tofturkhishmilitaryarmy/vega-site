/**
 * @file Navbar.tsx
 * @description Scale AI, Framer ve GPT-X görsellerindeki birebir minimalist üst menü:
 * Sol: Geometrik 4-noktalı mor-mavi amblem + temiz "Vega" wordmark
 * Orta: Düz, ince ve sade navigasyon linkleri
 * Sağ: Yardımcı ikonlar + "Destek" text linki + ikonik Beyaz Kapsül "Botu Davet Et →" butonu
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Sun, Moon, Globe } from 'lucide-react';
import { BOT_LINKS } from '../data/stats';
import { useAppContext } from '../context/AppContext';

interface NavLinkItem {
  labelTr: string;
  labelEn: string;
  href: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { labelTr: 'Özellikler', labelEn: 'Features', href: '#ozellikler' },
  { labelTr: 'Komutlar', labelEn: 'Commands', href: '#komutlar' },
  { labelTr: 'Konsol', labelEn: 'Console', href: '#dene' },
  { labelTr: 'Karşılaştırma', labelEn: 'Compare', href: '#karsilastirma' },
  { labelTr: 'Makaleler', labelEn: 'Articles', href: '#blog' },
  { labelTr: 'SSS', labelEn: 'FAQ', href: '#sss' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { theme, toggleTheme, lang, setLang, setIsSearchOpen } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'py-3.5 bg-black/80 backdrop-blur-2xl border-b border-white/[0.08]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Title (GPT-X / Scale AI Minimalist Lockup) */}
        <a
          href="#"
          className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-white focus-visible:outline-none shrink-0"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="6" cy="12" r="2.6" fill="#60A5FA" />
            <circle cx="12" cy="6" r="2.6" fill="#8B5CF6" />
            <circle cx="18" cy="12" r="2.6" fill="#EC4899" />
            <circle cx="12" cy="18" r="2.6" fill="#A78BFA" />
          </svg>
          <span>vega</span>
        </a>

        {/* Zone 2: Center Minimalist Links */}
        <nav aria-label="Ana Menü" className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium text-white/70 hover:text-white transition-colors whitespace-nowrap"
            >
              {lang === 'tr' ? item.labelTr : item.labelEn}
            </a>
          ))}
        </nav>

        {/* Zone 3: Right Controls + White Pill CTA (Scale AI / Framer Style) */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            aria-label={lang === 'tr' ? 'Site İçi Arama' : 'Search'}
            title="Ctrl+K"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/[0.03] text-white/75 hover:text-white hover:border-white/25 transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            aria-label="Dil Seçici"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono font-medium text-white/80 hover:text-white hover:border-white/25 transition-colors cursor-pointer"
          >
            <Globe className="w-3 h-3 text-[#A78BFA]" />
            <span>{lang.toUpperCase()}</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Tema Değiştir"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/[0.03] text-white/80 hover:text-white hover:border-white/25 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-300" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-[#7c3aed]" />
            )}
          </button>

          <a
            href={BOT_LINKS.supportServerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex text-[13px] font-medium text-white/75 hover:text-white px-2.5 py-1.5 transition-colors whitespace-nowrap"
          >
            {lang === 'tr' ? 'Destek' : 'Support'}
          </a>

          <a
            href={BOT_LINKS.inviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-[13px] btn-white-pill whitespace-nowrap shrink-0"
          >
            <span>{lang === 'tr' ? 'Botu Davet Et →' : 'Invite Bot →'}</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Menü"
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-white/[0.04] text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobil Açılır Menü */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 space-y-3 mt-3">
          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                {lang === 'tr' ? item.labelTr : item.labelEn}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <a
              href={BOT_LINKS.inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center py-3 text-sm btn-white-pill"
            >
              {lang === 'tr' ? 'Botu Davet Et →' : 'Invite Bot →'}
            </a>
            <a
              href={BOT_LINKS.supportServerUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center py-3 text-sm btn-dark-pill"
            >
              {lang === 'tr' ? 'Destek Sunucusu' : 'Support Server'}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
