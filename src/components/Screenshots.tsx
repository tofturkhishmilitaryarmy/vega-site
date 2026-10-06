/**
 * @file Screenshots.tsx
 * @description Vega Discord Bot'un Discord içi görünümünü sergileyen interaktif slider/carousel bölümü.
 * /yardim menüsü, Rank kartı, Ticket sistemi ve AI sohbet ekranlarını gerçekçi Discord mockup çerçevesinde gösterir.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Ticket,
  Award,
  Terminal,
  Shield,
  CheckCircle2,
} from 'lucide-react';

interface ShowcaseSlide {
  id: string;
  tabTitle: string;
  channelName: string;
  userCommand: string;
  userName: string;
  timestamp: string;
  summary: string;
}

const SLIDES: ShowcaseSlide[] = [
  {
    id: 'yardim',
    tabTitle: '/yardim Menüsü',
    channelName: '🤖・bot-komut',
    userCommand: '/yardim',
    userName: 'Kuzey',
    timestamp: 'Bugün saat 21:14',
    summary: 'Kategorilere ayrılmış interaktif seçim menüsü ile 183+ komuta tek mesajdan ulaşın.',
  },
  {
    id: 'rank',
    tabTitle: 'Rank Kartı',
    channelName: '📊・seviye-vitrin',
    userCommand: '.rank @Kuzey',
    userName: 'Kuzey',
    timestamp: 'Bugün saat 21:16',
    summary: 'Uzay temalı özelleştirilebilir seviye kartları, ses/mesaj XP ilerlemesi ve sunucu sıralaması.',
  },
  {
    id: 'ticket',
    tabTitle: 'Ticket Sistemi',
    channelName: '🎫・destek-talebi-042',
    userCommand: '.ticket-kur #destek @Yetkili',
    userName: 'Sunucu Yöneticisi',
    timestamp: 'Bugün saat 21:19',
    summary: 'Tek tıkla özel destek kanalı açma, yetkili devralma ve HTML/TXT konuşma kaydı (transkript).',
  },
  {
    id: 'ai',
    tabTitle: 'AI Sohbet',
    channelName: '✨・vega-yapay-zeka',
    userCommand: '.ai Discord sunucumda aktifliği nasıl artırabilirim?',
    userName: 'Elif',
    timestamp: 'Bugün saat 21:22',
    summary: 'Gemini ve Groq destekli hızlı Türkçe yanıtlar, kod analizi ve akıllı kanal özetleme.',
  },
];

export const Screenshots: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = SLIDES[currentIndex];

  return (
    <section
      id="goruntuler"
      className="py-24 relative bg-[#12121a]/60 border-y border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık ve Slider Kontrolleri */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-medium tracking-widest uppercase text-[#A78BFA] mb-3">
              DISCORD İÇİ DENEYİM · CANLI ÖNİZLEME
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Vega&apos;yı Gör
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#9ca3af] max-w-2xl">
              Sunucunuzda nasıl göründüğünü inceleyin. Modern embed tasarımları, hızlı buton etkileşimleri ve görsel rank kartları.
            </p>
          </div>

          {/* İleri / Geri Okları */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Önceki ekran görüntüsü"
              className="w-11 h-11 rounded-xl bg-[#0a0a0f] border border-[#9B59B6]/35 text-[#e5e5e5] hover:text-white hover:border-[#A78BFA] hover:bg-[#9B59B6]/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Sonraki ekran görüntüsü"
              className="w-11 h-11 rounded-xl bg-[#0a0a0f] border border-[#9B59B6]/35 text-[#e5e5e5] hover:text-white hover:border-[#A78BFA] hover:bg-[#9B59B6]/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sekme Seçiciler */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {SLIDES.map((slide, idx) => {
            const active = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-left transition-all cursor-pointer border ${
                  active
                    ? 'bg-[#9B59B6]/20 border-[#A78BFA] text-white shadow-[0_0_25px_rgba(155,89,182,0.3)]'
                    : 'bg-[#0a0a0f]/80 border-white/10 text-[#9ca3af] hover:text-white hover:border-[#9B59B6]/40'
                }`}
              >
                <div className="font-mono text-[11px] text-[#A78BFA] mb-0.5">
                  0{idx + 1}
                </div>
                <div className="truncate">{slide.tabTitle}</div>
              </button>
            );
          })}
        </div>

        {/* Discord Pencere Mockup Çerçevesi */}
        <div className="rounded-2xl bg-[#1e1f22] border border-[#9B59B6]/45 shadow-[0_0_50px_-10px_rgba(155,89,182,0.4)] overflow-hidden">
          {/* Discord Üst Kanal Çubuğu */}
          <div className="px-5 py-3.5 bg-[#2b2d31] border-b border-black/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 mr-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-sm font-semibold text-white">
                {currentSlide.channelName}
              </span>
            </div>
            <span className="text-xs text-[#9ca3af] hidden sm:inline">
              Vega Resmi Önizleme Ortamı
            </span>
          </div>

          {/* Discord Mesaj Alanı */}
          <div className="p-6 sm:p-8 min-h-[390px] flex flex-col justify-between bg-[#313338]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {/* Kullanıcının Slash Komutu */}
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#b5bac1]">
                  <span className="w-5 h-5 rounded-full bg-[#8B5CF6] text-white font-bold flex items-center justify-center text-[10px]">
                    {currentSlide.userName[0]}
                  </span>
                  <span className="font-semibold text-white">{currentSlide.userName}</span>
                  <span>komutu kullandı:</span>
                  <code className="font-mono text-[#C4B5FD] bg-[#2b2d31] px-2 py-0.5 rounded">
                    {currentSlide.userCommand}
                  </code>
                </div>

                {/* Vega Bot Yanıtı */}
                <div className="flex items-start gap-4">
                  {/* Bot Avatarı */}
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#9B59B6] to-[#6366F1] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(155,89,182,0.5)]">
                    <span className="font-display font-extrabold text-white text-base">V</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Bot İsim Satırı */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-white text-base">Vega</span>
                      <span className="bg-[#5865F2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5" /> UYGULAMA
                      </span>
                      <span className="text-xs text-[#949ba4]">{currentSlide.timestamp}</span>
                    </div>

                    {/* İçerik: Seçili Slayta Göre Özel Discord Embed Tasarımı */}
                    {currentSlide.id === 'yardim' && (
                      <div className="mt-3 max-w-2xl rounded-xl bg-[#2b2d31] border-l-4 border-[#9B59B6] p-5 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-display font-bold text-white text-lg flex items-center gap-2">
                            <Terminal className="w-5 h-5 text-[#A78BFA]" />
                            Vega Komut &amp; Yardım Merkezi
                          </h3>
                          <span className="font-mono text-xs text-[#C4B5FD]">183 Komut</span>
                        </div>
                        <p className="text-sm text-[#dbdee1]">
                          Merhaba! Yardım menüsüne <code className="font-mono text-[#C4B5FD]">/yardim</code> veya <code className="font-mono text-[#C4B5FD]">.yardim</code> ile ulaşabilir, tüm komutları <code className="font-mono text-[#C4B5FD]">.</code> prefixi ile kullanabilirsiniz.
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                          <div className="p-2.5 rounded-lg bg-[#1e1f22] text-[#dbdee1]">
                            <strong className="text-[#C4B5FD] block">🛡️ Güvenlik</strong>
                            Anti-Raid, Anti-Spam, Phishing
                          </div>
                          <div className="p-2.5 rounded-lg bg-[#1e1f22] text-[#dbdee1]">
                            <strong className="text-[#C4B5FD] block">🤖 Yapay Zeka</strong>
                            Gemini &amp; Groq Sohbet, Kod
                          </div>
                          <div className="p-2.5 rounded-lg bg-[#1e1f22] text-[#dbdee1]">
                            <strong className="text-[#C4B5FD] block">📊 Seviye</strong>
                            Rank Kartı, Ses/Mesaj XP
                          </div>
                          <div className="p-2.5 rounded-lg bg-[#1e1f22] text-[#dbdee1]">
                            <strong className="text-[#C4B5FD] block">🎫 Ticket</strong>
                            Butonlu Destek &amp; Arşiv
                          </div>
                          <div className="p-2.5 rounded-lg bg-[#1e1f22] text-[#dbdee1]">
                            <strong className="text-[#C4B5FD] block">🎵 Müzik</strong>
                            YouTube, Spotify, .oynat
                          </div>
                          <div className="p-2.5 rounded-lg bg-[#1e1f22] text-[#dbdee1]">
                            <strong className="text-[#C4B5FD] block">📢 Log Sistemi</strong>
                            6 Farklı Denetim Kanalı
                          </div>
                        </div>
                      </div>
                    )}

                    {currentSlide.id === 'rank' && (
                      <div className="mt-3 max-w-2xl rounded-2xl bg-gradient-to-r from-[#12121a] via-[#1d152b] to-[#12121a] border border-[#9B59B6]/50 p-5 sm:p-6 shadow-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#9B59B6] to-[#EC4899] p-0.5">
                              <div className="w-full h-full rounded-[14px] bg-[#0a0a0f] flex items-center justify-center font-display font-bold text-xl text-white">
                                K
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-display font-bold text-white text-lg">
                                  Kuzey
                                </span>
                                <span className="text-xs font-mono text-[#A78BFA]">
                                  #SIRALAMA 1
                                </span>
                              </div>
                              <div className="text-xs text-[#9ca3af] mt-0.5">
                                Vega Yıldız Kaşifi · Aktiflik Çarpanı 2x
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-5 text-right font-mono">
                            <div>
                              <div className="text-xs text-[#9ca3af]">SEVİYE</div>
                              <div className="text-2xl font-extrabold text-[#C4B5FD] tabular-nums">
                                42
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-[#9ca3af]">TOPLAM XP</div>
                              <div className="text-lg font-bold text-white tabular-nums">
                                18.450 / 20.000
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* XP Progress Bar */}
                        <div className="mt-5">
                          <div className="flex justify-between text-xs font-mono text-[#C4B5FD] mb-1.5">
                            <span>Seviye 43 ilerlemesi</span>
                            <span>%92</span>
                          </div>
                          <div className="w-full h-3 rounded-full bg-[#0a0a0f] overflow-hidden p-0.5 border border-[#9B59B6]/30">
                            <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-[#9B59B6] via-[#A78BFA] to-[#EC4899]" />
                          </div>
                        </div>
                      </div>
                    )}

                    {currentSlide.id === 'ticket' && (
                      <div className="mt-3 max-w-2xl rounded-xl bg-[#2b2d31] border-l-4 border-[#8B5CF6] p-5 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 font-display font-bold text-white text-base">
                            <Ticket className="w-5 h-5 text-[#A78BFA]" />
                            Destek Talebi #042 — Teknik Yardım
                          </div>
                          <span className="text-xs font-mono text-emerald-400">AÇIK</span>
                        </div>
                        <p className="text-sm text-[#dbdee1]">
                          Merhaba <span className="text-[#C4B5FD] font-medium">@Kuzey</span>, destek ekibimiz kısa süre içinde seninle ilgilenecek. Lütfen sorununuzu detaylıca açıklayın.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          <span className="px-3.5 py-2 rounded-lg bg-[#5865F2] text-white text-xs font-semibold inline-flex items-center gap-1.5">
                            <Shield className="w-3.5 h-3.5" /> Talebi Devral
                          </span>
                          <span className="px-3.5 py-2 rounded-lg bg-[#4e5058] text-white text-xs font-semibold">
                            📄 Transkript Al (HTML)
                          </span>
                          <span className="px-3.5 py-2 rounded-lg bg-rose-600/80 text-white text-xs font-semibold">
                            🔒 Talebi Kapat
                          </span>
                        </div>
                      </div>
                    )}

                    {currentSlide.id === 'ai' && (
                      <div className="mt-3 max-w-2xl rounded-xl bg-[#2b2d31] border-l-4 border-[#EC4899] p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 font-display font-bold text-white text-base">
                            <Sparkles className="w-5 h-5 text-[#C4B5FD]" />
                            Vega AI Asistan (Gemini &amp; Groq)
                          </div>
                          <span className="font-mono text-[11px] text-[#9ca3af]">0.4s yanıt</span>
                        </div>
                        <p className="text-sm text-[#dbdee1] leading-relaxed">
                          Discord sunucunuzda aktifliği artırmak için hemen uygulayabileceğiniz 3 adım:
                        </p>
                        <ul className="text-xs sm:text-sm text-[#dbdee1] space-y-1.5 list-disc list-inside">
                          <li>
                            <code className="font-mono text-[#C4B5FD]">.seviye-rol</code> ile aktif üyelere özel renkli roller tanımlayın.
                          </li>
                          <li>
                            <code className="font-mono text-[#C4B5FD]">.kelime-oyunu</code> ve <code className="font-mono text-[#C4B5FD]">.bilgi-yarışması</code> kanalları açarak günlük etkileşimi tetikleyin.
                          </li>
                          <li>
                            Hafta sonları <code className="font-mono text-[#C4B5FD]">.çekiliş-başlat</code> ile Vega Coin veya özel rol ödülleri dağıtın.
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Alt Açıklama ve Sayfa Göstergesi */}
            <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-[#b5bac1]">
                <Award className="w-4 h-4 text-[#A78BFA] inline mr-1.5 -mt-0.5" />
                {currentSlide.summary}
              </p>

              <div className="flex items-center gap-2 shrink-0">
                {SLIDES.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-label={`${s.tabTitle} slaytına git`}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      i === currentIndex ? 'w-7 bg-[#A78BFA]' : 'w-2 bg-white/25 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
