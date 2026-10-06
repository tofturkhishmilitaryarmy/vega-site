/**
 * @file Hero.tsx
 * @description Paylaşılan 4 görselin (Scale AI, Framer ve GPT-X) birebir birleşimi:
 * 1. Scale AI'daki gibi devasa ortalanmış tipografi ("Yıldızların Gücüyle / Discord Sunucunu Yönet")
 *    ve etrafında süzülen 3 adet 3D iridescent neon halka (sol alt büyük, üst orta, sağ orta)
 * 2. Beyaz kapsül CTA butonu ("Botu Davet Et →") + şeffaf ikincil aksiyon ("Destek Sunucusu →")
 * 3. Framer & GPT-X görsellerindeki gibi alt kısımda yükselen karanlık cam (glassmorphic)
 *    Vega AI & Komut Kontrol Merkezi penceresi (içinde 3D mor/mavi bükümlü torus heykeli ve canlı komut akışı)
 * 4. En altta monokrom teknoloji & modül güven barı
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Shield,
  Terminal,
  Music,
  Award,
  Ticket,
  CheckCircle2,
  Sliders,
  Layers,
  Cpu,
} from 'lucide-react';
import { BOT_LINKS, HERO_STATS } from '../data/stats';
import { useAppContext } from '../context/AppContext';

const LIVE_TYPEWRITER_MESSAGES = [
  {
    cmd: '.yardim',
    module: 'Genel Modül',
    accuracy: '99.9%',
    reply: '🌟 15 kategoride 183+ komut hazır! (/yardim veya .yardim ile erişebilirsin)',
  },
  {
    cmd: '.antiraid aktif',
    module: 'Güvenlik Kalkanı',
    accuracy: '100%',
    reply: '🛡️ Anti-Raid ve Phishing koruması devreye alındı. Sunucu 7/24 izleniyor.',
  },
  {
    cmd: '.ai Sunucuda etkileşimi nasıl artırırım?',
    module: 'Gemini & Groq AI',
    accuracy: '0.38s',
    reply: '🤖 .seviye-rol ve .çekiliş-başlat komutlarıyla üyelerinize özel ödüller tanımlayabilirsiniz.',
  },
  {
    cmd: '.oynat Starboy',
    module: 'Müzik Motoru',
    accuracy: '320kbps',
    reply: '🎵 Şimdi Çalıyor: The Weeknd - Starboy (Spotify & YouTube HD)',
  },
];

/** Scale AI & GPT-X Tarzı 3D Iridescent Neon Halka SVG Bileşeni */
const IridescentRingSVG: React.FC<{ className?: string; idSuffix: string }> = ({
  className,
  idSuffix,
}) => (
  <svg
    viewBox="0 0 320 320"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient
        id={`scaleRingRim-${idSuffix}`}
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="30%" stopColor="#8B5CF6" />
        <stop offset="65%" stopColor="#EC4899" />
        <stop offset="90%" stopColor="#FDE047" />
        <stop offset="100%" stopColor="#60A5FA" />
      </linearGradient>
      <radialGradient
        id={`scaleRingInner-${idSuffix}`}
        cx="50%"
        cy="50%"
        r="50%"
      >
        <stop offset="65%" stopColor="#000000" stopOpacity="0.92" />
        <stop offset="92%" stopColor="#1e1b4b" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.85" />
      </radialGradient>
    </defs>
    <ellipse
      cx="160"
      cy="160"
      rx="138"
      ry="86"
      fill={`url(#scaleRingInner-${idSuffix})`}
      stroke={`url(#scaleRingRim-${idSuffix})`}
      strokeWidth="9"
    />
    <ellipse
      cx="160"
      cy="160"
      rx="131"
      ry="79"
      stroke="#ffffff"
      strokeOpacity="0.35"
      strokeWidth="1.5"
    />
  </svg>
);

export const Hero: React.FC = () => {
  const { lang } = useAppContext();
  const [msgIndex, setMsgIndex] = useState(0);
  const [typedCmd, setTypedCmd] = useState('');
  const [showBotReply, setShowBotReply] = useState(false);

  useEffect(() => {
    const current = LIVE_TYPEWRITER_MESSAGES[msgIndex];
    let charIdx = 0;
    setTypedCmd('');
    setShowBotReply(false);

    const typeInterval = window.setInterval(() => {
      charIdx += 1;
      setTypedCmd(current.cmd.slice(0, charIdx));
      if (charIdx >= current.cmd.length) {
        window.clearInterval(typeInterval);
        setTimeout(() => {
          setShowBotReply(true);
        }, 200);
      }
    }, 48);

    const nextSlideTimeout = window.setTimeout(() => {
      setMsgIndex((prev) => (prev + 1) % LIVE_TYPEWRITER_MESSAGES.length);
    }, 4400);

    return () => {
      window.clearInterval(typeInterval);
      window.clearTimeout(nextSlideTimeout);
    };
  }, [msgIndex]);

  const currentLive = LIVE_TYPEWRITER_MESSAGES[msgIndex];

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-black"
    >
      {/* Arka Plan Derin Mor-Mavi Atmosferik Işımalar (Framer & GPT-X) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.22)_0%,rgba(37,99,235,0.12)_45%,transparent_75%)] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SCALE AI & FRAMER TARZI MERKEZİ HERO ALANI + 3D YÜZEN HALKALAR */}
        <div className="relative max-w-5xl mx-auto text-center pt-4 pb-14">
          {/* 1. Üst-Sol 3D Neon Halka (Scale AI Görsel 1'deki Üst Halka) */}
          <motion.div
            animate={{
              y: [-8, 8, -8],
              rotate: [-28, -22, -28],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden md:block absolute -top-12 left-[18%] w-36 h-36 lg:w-44 lg:h-44 pointer-events-none drop-shadow-[0_0_35px_rgba(139,92,246,0.45)] opacity-90"
          >
            <IridescentRingSVG idSuffix="top" className="w-full h-full" />
          </motion.div>

          {/* 2. Sol-Alt Büyük 3D Neon Halka (Scale AI Görsel 1'deki Sol Alt Dev Halka) */}
          <motion.div
            animate={{
              y: [10, -10, 10],
              rotate: [22, 28, 22],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden md:block absolute -bottom-16 -left-6 lg:left-2 w-64 h-64 lg:w-80 lg:h-80 pointer-events-none drop-shadow-[0_0_50px_rgba(236,72,153,0.35)] opacity-95"
          >
            <IridescentRingSVG idSuffix="left" className="w-full h-full" />
          </motion.div>

          {/* 3. Sağ-Orta 3D Neon Halka (Scale AI Görsel 1'deki Sağ Halka) */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [-35, -27, -35],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden md:block absolute top-8 -right-4 lg:right-4 w-48 h-48 lg:w-60 lg:h-60 pointer-events-none drop-shadow-[0_0_45px_rgba(96,165,250,0.4)] opacity-90"
          >
            <IridescentRingSVG idSuffix="right" className="w-full h-full" />
          </motion.div>

          {/* Üst Kicker (Framer Görsel 2'deki "AI Tools" mavi-mor üst başlık) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="relative z-10 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#60A5FA] tracking-wide mb-4"
          >
            <span>{lang === 'tr' ? 'Vega AI & Sunucu Otomasyonu' : 'Vega AI & Server Automation'}</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span className="text-[#C4B5FD]">10+ Sunucuda Aktif</span>
          </motion.div>

          {/* Ana Başlık (Scale AI Görsel 1 & Framer Görsel 2 Birebir Tipografi) */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="relative z-10 font-display text-4xl sm:text-6xl lg:text-[72px] font-bold tracking-[-0.035em] leading-[1.06] text-white [text-wrap:balance]"
          >
            <span className="scale-gradient-text">
              {lang === 'tr' ? 'Yıldızların Gücüyle' : 'Breakthrough AI'}
            </span>{' '}
            {lang === 'tr' ? 'Sunucunu' : 'for Your'}
            <span className="block mt-1 text-white">
              {lang === 'tr' ? 'Tek Merkezden Yönet.' : 'Discord Community.'}
            </span>
          </motion.h1>

          {/* Alt Açıklama */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative z-10 mt-6 text-base sm:text-lg lg:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            {lang === 'tr'
              ? 'Vega; 183+ komut, Gemini & Groq yapay zeka motoru, anti-raid güvenlik kalkanı, seviye sistemi ve müzik altyapısını tamamen ücretsiz ve Türkçe sunar.'
              : 'Vega delivers 183+ commands, Gemini & Groq AI, anti-raid security, custom level cards, and HD music for modern Discord communities.'}
          </motion.p>

          {/* Scale AI & Framer Birebir Buton İkilisi (Beyaz Kapsül + Temiz Text Link) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="relative z-10 mt-9 flex flex-wrap items-center justify-center gap-5"
          >
            <a
              href={BOT_LINKS.inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 text-sm sm:text-base btn-white-pill inline-flex items-center gap-2"
            >
              <span>{lang === 'tr' ? 'Botu Davet Et →' : 'Invite Vega →'}</span>
            </a>

            <a
              href={BOT_LINKS.supportServerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 text-sm sm:text-base font-medium text-white hover:text-[#C4B5FD] transition-colors inline-flex items-center gap-1.5"
            >
              <span>{lang === 'tr' ? 'Destek Sunucusu →' : 'Support Server →'}</span>
            </a>
          </motion.div>
        </div>

        {/* GPT-X (Görsel 3) & FRAMER (Görsel 2) TARZI CAM EFEKTLİ KONTROL MERKEZİ PENCERESİ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10 mt-6 rounded-2xl border border-white/15 bg-[#08080e]/90 backdrop-blur-2xl shadow-[0_0_90px_-15px_rgba(124,58,237,0.38)] overflow-hidden"
        >
          {/* Üst Araç Çubuğu (Framer & GPT-X Üst Barı) */}
          <div className="px-4 sm:px-6 py-3.5 border-b border-white/10 bg-black/60 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
              </div>
              <span className="text-xs font-semibold text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
                Vega OS v3.4
              </span>
              <span className="hidden sm:inline text-xs text-white/40">|</span>
              <span className="hidden sm:inline text-xs text-white/60 font-mono">
                İşlenen Modül: <strong className="text-white">{currentLive.module}</strong>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-xs text-white/60 font-mono">
                <span>Performans:</span>
                <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="w-[96%] h-full bg-gradient-to-r from-[#8B5CF6] to-[#60A5FA]" />
                </div>
                <span className="text-emerald-400">{currentLive.accuracy}</span>
              </div>

              <a
                href="#dene"
                className="px-3.5 py-1.5 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold transition-colors"
              >
                Canlı Konsol
              </a>
            </div>
          </div>

          {/* 3 Sütunlu GPT-X Kontrol Paneli Gövdesi */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[340px]">
            {/* Sol Sütun: Aktif Sistemler & Etiketler */}
            <div className="lg:col-span-3 p-5 border-b lg:border-b-0 lg:border-r border-white/10 space-y-5 bg-black/30">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-white/45 mb-2.5 flex items-center justify-between">
                  <span>Aktif Modüller</span>
                  <Sliders className="w-3.5 h-3.5 text-[#A78BFA]" />
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="px-3 py-2 rounded-lg bg-white/[0.06] text-white font-medium flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-[#A78BFA]" />
                      Gemini &amp; Groq AI
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="px-3 py-2 rounded-lg text-white/65 hover:bg-white/[0.03] flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-[#60A5FA]" />
                      Anti-Raid Kalkanı
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="px-3 py-2 rounded-lg text-white/65 hover:bg-white/[0.03] flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-[#EC4899]" />
                      Seviye &amp; Rank Kartı
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="px-3 py-2 rounded-lg text-white/65 hover:bg-white/[0.03] flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Music className="w-3.5 h-3.5 text-[#C4B5FD]" />
                      Spotify &amp; YouTube
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <div className="text-[11px] font-mono uppercase tracking-wider text-white/45 mb-2">
                  Komut Mimarisi
                </div>
                <div className="space-y-1 text-xs font-mono text-white/70">
                  <div>• Prefix: <span className="text-[#C4B5FD]">.komut</span></div>
                  <div>• Slash: <span className="text-[#C4B5FD]">/yardim</span></div>
                  <div>• Toplam: <span className="text-white">183 Komut</span></div>
                </div>
              </div>
            </div>

            {/* Orta Sütun: GPT-X Görsel 3'teki Kesişen Kılavuz Çizgili 3D Bükümlü Mor/Mavi Heykel */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center p-6 vega-grid-bg overflow-hidden min-h-[260px]">
              {/* Kesişen Pembe/Mor Kılavuz Çizgileri (GPT-X Görsel 3) */}
              <div className="absolute inset-x-0 top-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#EC4899]/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6]/35 to-transparent" />
              <div className="absolute inset-y-0 left-1/4 w-[1px] bg-gradient-to-b from-transparent via-[#8B5CF6]/35 to-transparent" />
              <div className="absolute inset-y-0 right-1/4 w-[1px] bg-gradient-to-b from-transparent via-[#60A5FA]/35 to-transparent" />

              {/* Merkez 3D Bükümlü Akışkan Torus Knot SVG */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [0.97, 1.03, 0.97],
                }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center drop-shadow-[0_0_40px_rgba(139,92,246,0.65)]"
              >
                <svg viewBox="0 0 240 240" className="w-full h-full">
                  <defs>
                    <linearGradient id="gptxKnot1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C4B5FD" />
                      <stop offset="45%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                    <linearGradient id="gptxKnot2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#EC4899" />
                      <stop offset="50%" stopColor="#9B59B6" />
                      <stop offset="100%" stopColor="#60A5FA" />
                    </linearGradient>
                  </defs>
                  <ellipse
                    cx="120"
                    cy="120"
                    rx="88"
                    ry="46"
                    transform="rotate(30 120 120)"
                    stroke="url(#gptxKnot1)"
                    strokeWidth="18"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <ellipse
                    cx="120"
                    cy="120"
                    rx="88"
                    ry="46"
                    transform="rotate(-35 120 120)"
                    stroke="url(#gptxKnot2)"
                    strokeWidth="16"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <ellipse
                    cx="120"
                    cy="120"
                    rx="74"
                    ry="36"
                    transform="rotate(85 120 120)"
                    stroke="url(#gptxKnot1)"
                    strokeWidth="12"
                    fill="none"
                    opacity="0.85"
                  />
                  <circle cx="120" cy="120" r="16" fill="#ffffff" opacity="0.9" />
                </svg>
              </motion.div>

              <div className="relative z-10 mt-2 font-mono text-[11px] text-[#C4B5FD] tracking-widest uppercase">
                VEGA CORE · ALPHA LYRAE
              </div>
            </div>

            {/* Sağ Sütun: Canlı Discord Komut Akışı */}
            <div className="lg:col-span-4 p-5 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between bg-black/30">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-white/45">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#60A5FA]" />
                    Canlı Komut Denetimi
                  </span>
                  <span className="text-emerald-400">● 50ms</span>
                </div>

                {/* Kullanıcı Komut Satırı */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] text-white/50 mb-1">Gelen Komut:</div>
                  <code className="font-mono text-xs sm:text-sm text-[#C4B5FD] font-semibold">
                    {typedCmd}
                    <span className="animate-pulse text-white">|</span>
                  </code>
                </div>

                {/* Bot Yanıt Kutusu */}
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#8B5CF6]/15 to-[#3B82F6]/10 border border-[#8B5CF6]/35 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#60A5FA]" />
                      Vega Yanıtı
                    </span>
                    <span className="text-[10px] font-mono text-[#C4B5FD]">
                      {currentLive.module}
                    </span>
                  </div>
                  <p className="text-xs text-white/85 leading-relaxed min-h-[38px]">
                    {showBotReply ? (
                      currentLive.reply
                    ) : (
                      <span className="text-white/45 italic">İşleniyor...</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
                <span>Durum: Kusursuz</span>
                <span>Uptime: %99.9</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SCALE AI (Görsel 1) & GPT-X (Görsel 3) TARZI ALT MONOKROM MODÜL & İSTATİSTİK BARI */}
        <div className="mt-14 pt-8 border-t border-white/10">
          <p className="text-center text-xs sm:text-sm text-white/50 mb-7">
            Vega; <span className="text-white underline decoration-white/30 underline-offset-4">Modern Discord Toplulukları</span>, Oyun Sunucuları ve Geliştirici Ekipleri için tasarlandı
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="vega-card px-5 py-4 flex items-center justify-between"
              >
                <span className="text-xs sm:text-sm text-white/65 font-medium">
                  {stat.label}
                </span>
                <span className="font-display text-xl sm:text-2xl font-bold text-white tabular-nums">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
