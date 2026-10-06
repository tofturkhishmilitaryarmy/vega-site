/**
 * @file TestimonialsAndServers.tsx
 * @description 3. ve 4. Maddeler:
 * - "Sunucu Sahipleri Ne Diyor?" (Yorumlar/Referanslar) alanı için şık cam efektli "Yakında" (Coming Soon) yer tutucu kartları.
 * - "Vega'yı Kullanan Sunucular" alanı için şık cam efektli "Yakında" (Coming Soon) yer tutucu kartları.
 */

import React from 'react';
import { motion } from 'motion/react';
import { MessageSquareQuote, Server, Sparkles, Clock } from 'lucide-react';

export const TestimonialsAndServers: React.FC = () => {
  return (
    <section id="topluluk" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* 3. MADDE: "SUNUCU SAHİPLERİ NE DİYOR?" — YAKINDA (COMING SOON) */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#A78BFA] mb-3">
              <Clock className="w-3.5 h-3.5 text-[#60A5FA]" />
              <span>TOPLULUK GÖRÜŞLERİ · YAKINDA (COMING SOON)</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Sunucu Sahipleri Ne Diyor?
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#9ca3af]">
              Doğrulanmış sunucu sahiplerinin ve topluluk yöneticilerinin Vega deneyimleri çok yakında bu alanda yer alacak.
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
                className="vega-card p-8 relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[230px] group"
              >
                <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-gradient-to-br from-[#9B59B6]/20 to-[#3B82F6]/20 blur-2xl pointer-events-none" />

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#9B59B6]/20 to-[#3B82F6]/20 border border-[#A78BFA]/35 flex items-center justify-center mb-4">
                  <MessageSquareQuote className="w-6 h-6 text-[#C4B5FD]" />
                </div>

                <span className="font-mono text-xs uppercase tracking-widest text-[#A78BFA] mb-1">
                  Referans Yorumu #{slot}
                </span>
                <h3 className="font-display text-xl font-bold text-white">
                  Yakında (Coming Soon)
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#9ca3af] max-w-xs leading-relaxed">
                  Kullanıcı geri bildirimleri ve onaylı sunucu yorumları derleniyor.
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. MADDE: "VEGA'YI KULLANAN SUNUCULAR" — YAKINDA (COMING SOON) */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#A78BFA] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#60A5FA]" />
              <span>PARTNER &amp; REFERANS TOPLULUKLAR · YAKINDA</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Vega&apos;yı Kullanan Sunucular
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#9ca3af]">
              Vega ile korunan ve yönetilen öne çıkan Discord topluluklarının vitrini yakında aktif edilecektir.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((slot) => (
              <motion.div
                key={slot}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: slot * 0.05 }}
                className="vega-card p-6 flex flex-col items-center justify-center text-center min-h-[190px] relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-[#9B59B6]/35 flex items-center justify-center mb-3.5">
                  <Server className="w-5 h-5 text-[#A78BFA]" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#C4B5FD]">
                  Topluluk Vitrini #{slot}
                </span>
                <h3 className="mt-1 font-display text-lg font-bold text-white">
                  Yakında
                </h3>
                <p className="mt-1 text-xs text-[#9ca3af]">
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
