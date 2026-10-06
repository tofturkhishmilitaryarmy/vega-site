/**
 * @file ComparisonTable.tsx
 * @description B3: "Vega vs Diğerleri" karşılaştırma tablosu bölümü.
 * Vega, MEE6, Dyno ve Carl-bot özelliklerini masaüstünde tablo, mobilde kart görünümüyle karşılaştırır.
 */

import React from 'react';
import { motion } from 'motion/react';
import { COMPARISON_DATA } from '../data/communityData';

export const ComparisonTable: React.FC = () => {
  return (
    <section id="karsilastirma" className="py-24 relative bg-[#12121a]/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="text-xs font-medium tracking-widest uppercase text-[#A78BFA] mb-3">
            NEDEN VEGA? · ÖZELLİK KARŞILAŞTIRMASI
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Vega vs Diğerleri
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#9ca3af]">
            Diğer popüler botlarda ücretli abonelik gerektiren veya hiç bulunmayan özellikler Vega&apos;da tamamen ücretsiz ve Türkçe olarak sunulur.
          </p>
        </motion.div>

        {/* Masaüstü Tablo Görünümü */}
        <div className="hidden md:block vega-card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#0a0a0f]/60 text-xs uppercase tracking-wider text-[#9ca3af]">
                <th className="py-4 px-6 font-display font-bold text-white">Özellik</th>
                <th className="py-4 px-6 font-display font-extrabold text-[#C4B5FD] bg-[#9B59B6]/15">
                  🌟 Vega Bot
                </th>
                <th className="py-4 px-6 font-display font-semibold">MEE6</th>
                <th className="py-4 px-6 font-display font-semibold">Dyno</th>
                <th className="py-4 px-6 font-display font-semibold">Carl-bot</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {COMPARISON_DATA.map((row) => (
                <tr key={row.feature} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">{row.feature}</td>
                  <td className="py-4 px-6 font-semibold text-emerald-400 bg-[#9B59B6]/10">
                    {row.vega}
                  </td>
                  <td className="py-4 px-6 text-[#9ca3af]">{row.mee6}</td>
                  <td className="py-4 px-6 text-[#9ca3af]">{row.dyno}</td>
                  <td className="py-4 px-6 text-[#9ca3af]">{row.carl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobil Kart Görünümü (Responsive) */}
        <div className="md:hidden space-y-4">
          {COMPARISON_DATA.map((row) => (
            <div key={row.feature} className="vega-card p-5 space-y-3">
              <h3 className="font-display text-base font-bold text-white border-b border-white/10 pb-2">
                {row.feature}
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[#9B59B6]/20 border border-[#A78BFA]/40">
                  <div className="font-bold text-[#C4B5FD]">🌟 Vega</div>
                  <div className="mt-0.5 text-emerald-400 font-semibold">{row.vega}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0a0a0f]/60 border border-white/5">
                  <div className="font-semibold text-white">MEE6</div>
                  <div className="mt-0.5 text-[#9ca3af]">{row.mee6}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0a0a0f]/60 border border-white/5">
                  <div className="font-semibold text-white">Dyno</div>
                  <div className="mt-0.5 text-[#9ca3af]">{row.dyno}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0a0a0f]/60 border border-white/5">
                  <div className="font-semibold text-white">Carl-bot</div>
                  <div className="mt-0.5 text-[#9ca3af]">{row.carl}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
