/**
 * @file About.tsx
 * @description 5. ve 6. Maddeler:
 * - Tüm "Açık Kaynak / Open Source / GitHub" ifadeleri tamamen kaldırıldı.
 * - "Vega Ekibi" bölümü şık cam efektli (glassmorphism) kartlarla "Yakında" (Coming Soon) olarak ayarlandı.
 */

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Sparkles, Users, Shield } from 'lucide-react';
import { BOT_LINKS } from '../data/stats';

const ABOUT_HIGHLIGHTS = [
  {
    title: 'Tamamen Türkçe',
    desc: 'Tüm komutlar, yardım menüleri, hata mesajları ve yapay zeka yanıtları akıcı Türkçe ile sunulur.',
  },
  {
    title: 'Yüksek Güvenlikli Özel Mimari',
    desc: 'İzole veritabanı ve gelişmiş koruma kalkanlarıyla sunucu verileriniz yüksek güvenlik altında tutulur.',
  },
  {
    title: '7/24 Kesintisiz Çalışma',
    desc: '%99.9 uptime oranı ve düşük gecikmeli bulut altyapısı ile sunucunuz hiçbir zaman korumasız kalmaz.',
  },
  {
    title: 'Sürekli Güncelleme',
    desc: 'Discord’un en yeni özelliklerine ve topluluk geri bildirimlerine göre düzenli olarak güncellenir.',
  },
  {
    title: 'Aktif Destek (@rayttx)',
    desc: 'Destek sunucumuz ve doğrudan geliştirici iletişimi üzerinden kurulum ve yapılandırma için hızlı çözüm alırsınız.',
  },
];

export const About: React.FC = () => {
  return (
    <section id="hakkinda" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Sol: Hakkında Metni */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#A78BFA]">
              <Shield className="w-3.5 h-3.5 text-[#60A5FA]" />
              <span>TÜRK YAPIMI · PROFESYONEL ALTYAPI · %100 ÜCRETSİZ</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight [text-wrap:balance]">
              Vega Hakkında
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#9ca3af] leading-relaxed">
              <p>
                <strong className="text-white">Vega</strong>, Türk yapımı, tamamen ücretsiz bir yeni nesil Discord botu ve sunucu yönetim platformudur.
                183+ komut, yapay zeka, güvenlik, seviye sistemi ve daha fazlasıyla sunucunu güçlendirir.
              </p>
              <p>
                Modern bulut altyapısı, sürekli güncellemeler ve Türkçe destek ile sunucuna değer katar. Çalgı (Lyra) takımyıldızının en parlak yıldızı olan Vega&apos;dan ilham alarak topluluklara rehberlik etmek için tasarlanmıştır.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={BOT_LINKS.inviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#9B59B6] via-[#8B5CF6] to-[#3B82F6] text-white text-sm font-semibold shadow-[0_0_25px_rgba(139,92,246,0.45)] hover:opacity-95 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Hemen Sunucuna Ekle</span>
              </a>
              <a
                href="#komutlar"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-[#9B59B6]/35 bg-white/[0.03] text-[#e5e5e5] hover:text-white hover:border-[#A78BFA] text-sm font-semibold transition-colors"
              >
                <span>183+ Komutu İncele</span>
              </a>
            </div>
          </motion.div>

          {/* Sağ: 5 Temel Avantaj Kartı */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-6 space-y-3.5"
          >
            {ABOUT_HIGHLIGHTS.map((item) => (
              <div
                key={item.title}
                className="vega-card p-5 flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-xl bg-[#9B59B6]/20 border border-[#9B59B6]/40 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-[#C4B5FD]" />
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#9ca3af] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 5. MADDE: "VEGA EKİBİ" — YAKINDA (COMING SOON) */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-[#A78BFA] mb-2">
              <Users className="w-3.5 h-3.5 text-[#60A5FA]" />
              <span>EKİP &amp; YÖNETİM · YAKINDA (COMING SOON)</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Vega Ekibi
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#9ca3af]">
              Vega geliştirici ve moderasyon kadrosu profilleri çok yakında burada listelenecektir.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((slot) => (
              <motion.div
                key={slot}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: slot * 0.06 }}
                className="vega-card p-8 flex flex-col items-center justify-center text-center min-h-[220px] relative overflow-hidden"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#9B59B6]/25 to-[#3B82F6]/25 border border-[#A78BFA]/40 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-[#C4B5FD]" />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#A78BFA]">
                  Ekip Üyesi #{slot}
                </span>
                <h3 className="mt-1 font-display text-xl font-bold text-white">
                  Yakında
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-[#9ca3af]">
                  Coming Soon
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
