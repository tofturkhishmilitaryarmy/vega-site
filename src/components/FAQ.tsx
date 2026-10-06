/**
 * @file FAQ.tsx
 * @description Vega Discord Bot hakkında sıkça sorulan sorular (SSS) bölümü + C6 (SSS Arama Kutusu).
 * Tüm 7 sorunun cevabı doğrudan görünür olarak başlar ve arama kutusuyla filtrelenebilir.
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import { FAQ_DATA } from '../data/faq';

export const FAQ: React.FC = () => {
  const [openIds, setOpenIds] = useState<number[]>(() => FAQ_DATA.map((item) => item.id));
  const [faqQuery, setFaqQuery] = useState<string>('');

  const toggleItem = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    const q = faqQuery.trim().toLowerCase();
    if (!q) return FAQ_DATA;
    return FAQ_DATA.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        (item.commandHint && item.commandHint.toLowerCase().includes(q))
    );
  }, [faqQuery]);

  return (
    <section id="sss" className="py-24 relative bg-[#12121a]/50 border-y border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="text-xs font-medium tracking-widest uppercase text-[#A78BFA] mb-3">
            MERAK EDİLENLER · 7 SORU &amp; YANIT
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Sıkça Sorulan Sorular
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#9ca3af]">
            Vega kurulumu, komut kullanımı ve veri güvenliği hakkında en çok sorulan sorular ve yanıtları.
          </p>
        </motion.div>

        {/* C6: SSS Arama Kutusu */}
        <div className="relative max-w-xl mx-auto mb-10">
          <Search className="w-4 h-4 text-[#A78BFA] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={faqQuery}
            onChange={(e) => setFaqQuery(e.target.value)}
            placeholder="Sorularda ara (ücretsiz, prefix, veri güvenliği...)"
            aria-label="Sıkça sorulan sorularda ara"
            className="w-full pl-11 pr-20 py-3.5 rounded-xl bg-[#0a0a0f] border border-[#9B59B6]/35 text-sm text-white placeholder-[#9ca3af] focus:outline-none focus:border-[#A78BFA] transition-colors"
          />
          {faqQuery && (
            <button
              type="button"
              onClick={() => setFaqQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#C4B5FD] hover:text-white cursor-pointer"
            >
              Temizle
            </button>
          )}
        </div>

        {/* Sorular veya "Sonuç yok" mesajı */}
        {filteredFaqs.length === 0 ? (
          <div className="vega-card p-10 text-center">
            <HelpCircle className="w-10 h-10 text-[#A78BFA] mx-auto mb-3 opacity-80" />
            <h3 className="font-display text-lg font-bold text-white">Sonuç yok</h3>
            <p className="mt-1 text-sm text-[#9ca3af]">
              &ldquo;{faqQuery}&rdquo; aramasıyla eşleşen bir soru bulunamadı.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((item) => {
              const isOpen = openIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl transition-colors border ${
                    isOpen
                      ? 'bg-[#9B59B6]/10 border-[#A78BFA]/45'
                      : 'bg-[#0a0a0f]/80 border-[#9B59B6]/20 hover:border-[#9B59B6]/40'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="font-mono text-xs text-[#A78BFA] tabular-nums">
                        0{item.id}.
                      </span>
                      <span className="font-display text-base sm:text-lg font-bold text-white">
                        {item.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#A78BFA] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-2 text-sm sm:text-base text-[#e5e5e5]/90 leading-relaxed border-t border-white/10">
                      <p>{item.answer}</p>
                      {item.commandHint && (
                        <div className="mt-3 text-xs font-mono text-[#C4B5FD]">
                          İlgili Komut: <span>{item.commandHint}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
