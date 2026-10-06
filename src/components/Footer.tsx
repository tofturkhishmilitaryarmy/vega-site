/**
 * @file Footer.tsx
 * @description Vega Discord Bot alt bilgi (Footer) bileşeni.
 * Tüm açık kaynak ve GitHub repo ifadeleri tamamen kaldırılmış;
 * resmi Discord destek sunucusu ve @rayttx iletişim bağlantıları eklenmiştir.
 */

import React from 'react';
import {
  MessageSquare,
  Sparkles,
  Activity,
  FileCode2,
  UserCheck,
} from 'lucide-react';
import { BOT_LINKS } from '../data/stats';
import { useAppContext } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setIsStatusModalOpen, setIsApiModalOpen } = useAppContext();

  return (
    <footer className="bg-black border-t border-[#9B59B6]/20 pt-16 pb-12 text-sm text-[#9ca3af] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Sol: Vega Logosu & Kısa Açıklama */}
          <div className="md:col-span-4 space-y-4">
            <a
              href="#"
              className="inline-flex items-center gap-3 text-white font-display text-2xl font-extrabold tracking-tight"
            >
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#9B59B6] to-[#3B82F6] flex items-center justify-center text-white text-base font-bold shadow-[0_0_20px_rgba(155,89,182,0.5)]">
                V
              </span>
              <span className="bg-gradient-to-r from-white via-[#C4B5FD] to-[#60A5FA] bg-clip-text text-transparent">
                Vega
              </span>
            </a>
            <p className="text-sm text-[#9ca3af] max-w-sm leading-relaxed">
              183+ komut, yapay zeka sohbeti, gelişmiş güvenlik sistemleri, seviye ve ticket modülleriyle Discord sunucunuzu güçlendiren ücretsiz Türkçe platform.
            </p>
          </div>

          {/* Orta: Hızlı Linkler & Platform Araçları */}
          <div className="md:col-span-5 grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                Bölümler
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#ozellikler" className="hover:text-[#C4B5FD] transition-colors">
                    Özellikler
                  </a>
                </li>
                <li>
                  <a href="#komutlar" className="hover:text-[#C4B5FD] transition-colors">
                    Komutlar (183)
                  </a>
                </li>
                <li>
                  <a href="#dene" className="hover:text-[#C4B5FD] transition-colors">
                    Komut Gönder &amp; Dene
                  </a>
                </li>
                <li>
                  <a href="#karsilastirma" className="hover:text-[#C4B5FD] transition-colors">
                    Vega vs Diğerleri
                  </a>
                </li>
                <li>
                  <a href="#yol-haritasi" className="hover:text-[#C4B5FD] transition-colors">
                    Yol Haritası &amp; Sürümler
                  </a>
                </li>
                <li>
                  <a href="#blog" className="hover:text-[#C4B5FD] transition-colors">
                    Vega Günlükleri
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                Platform &amp; Durum
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => setIsStatusModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-[#C4B5FD] hover:text-white transition-colors cursor-pointer"
                  >
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span>Sistem Durumu (Status)</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setIsApiModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-[#C4B5FD] hover:text-white transition-colors cursor-pointer"
                  >
                    <FileCode2 className="w-4 h-4 text-[#A78BFA]" />
                    <span>API Dokümantasyonu</span>
                  </button>
                </li>
                <li>
                  <a href="#sss" className="hover:text-[#C4B5FD] transition-colors">
                    Sıkça Sorulan Sorular
                  </a>
                </li>
                <li>
                  <a href="#hakkinda" className="hover:text-[#C4B5FD] transition-colors">
                    Hakkında &amp; Ekip
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Sağ: Destek & @rayttx İletişim */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Destek &amp; İletişim
            </h3>
            <div className="flex flex-col gap-2.5">
              <a
                href={BOT_LINKS.supportServerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-[#9B59B6]/35 hover:border-[#A78BFA] text-[#e5e5e5] hover:text-white transition-colors text-xs font-medium"
              >
                <span className="inline-flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#A78BFA]" />
                  <span>Discord Destek Sunucusu</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400">Aktif</span>
              </a>

              <a
                href={BOT_LINKS.developerDiscordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#60A5FA] text-[#e5e5e5] hover:text-white transition-colors text-xs font-medium"
              >
                <span className="inline-flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#60A5FA]" />
                  <span>Geliştirici: {BOT_LINKS.developerHandle}</span>
                </span>
                <span className="text-[10px] font-mono text-[#C4B5FD]">Profil</span>
              </a>
            </div>

            <div>
              <a
                href={BOT_LINKS.inviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C4B5FD] hover:text-white transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Vega&apos;yı Sunucuna Davet Et →</span>
              </a>
            </div>
          </div>
        </div>

        {/* Alt Satır */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9ca3af]">
          <p>© 2026 Vega. Tüm hakları saklıdır.</p>
          <p className="text-[#C4B5FD]/80 font-medium">
            ✦ Vega bir yıldızın adıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};
