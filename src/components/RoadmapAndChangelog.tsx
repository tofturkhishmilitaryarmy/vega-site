/**
 * @file RoadmapAndChangelog.tsx
 * @description B4 ("Gelecek Planları" dikey timeline yol haritası) ve
 * B5 ("Güncellemeler" v3.4 - v3.0 sürüm geçmişi akordeonu) bölümleri.
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, GitCommit, Milestone } from 'lucide-react';
import { ROADMAP_DATA, CHANGELOG_DATA } from '../data/communityData';

export const RoadmapAndChangelog: React.FC = () => {
  const [openVersion, setOpenVersion] = useState<string>('v3.4');

  return (
    <section id="yol-haritasi" className="py-24 relative bg-[#12121a]/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sol Sütun (B4): ROADMAP - GELECEK PLANLARI (Dikey Timeline) */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <div className="inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-[#A78BFA] mb-2">
                <Milestone className="w-3.5 h-3.5" />
                <span>YOL HARİTASI · ROADMAP (PLACEHOLDER)</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Gelecek Planları
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#9ca3af]">
                Vega&apos;nın tamamlanan, üzerinde çalışılan ve gelecekte eklenecek yeni nesil özellikleri.
              </p>
            </motion.div>

            {/* Dikey Timeline */}
            <div className="relative pl-6 border-l-2 border-[#9B59B6]/35 space-y-6">
              {ROADMAP_DATA.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="relative vega-card p-5"
                >
                  {/* Timeline Noktası */}
                  <span
                    className={`absolute -left-[31px] top-6 w-3.5 h-3.5 rounded-full border-2 ${
                      item.status === 'completed'
                        ? 'bg-emerald-400 border-emerald-200 shadow-[0_0_10px_#34d399]'
                        : item.status === 'in-progress'
                        ? 'bg-[#A78BFA] border-white animate-pulse shadow-[0_0_12px_#A78BFA]'
                        : 'bg-[#12121a] border-[#9B59B6]'
                    }`}
                  />

                  <div className="flex items-center justify-between gap-2 text-xs font-mono mb-1.5">
                    <span
                      className={
                        item.status === 'completed'
                          ? 'text-emerald-400 font-semibold'
                          : item.status === 'in-progress'
                          ? 'text-[#C4B5FD] font-semibold'
                          : 'text-[#9ca3af]'
                      }
                    >
                      {item.statusLabel}
                    </span>
                    <span className="text-[#9ca3af]">{item.date}</span>
                  </div>

                  <h3 className="font-display text-base sm:text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sağ Sütun (B5): SÜRÜM GEÇMİŞİ (CHANGELOG v3.4 - v3.0) */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <div className="inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-[#A78BFA] mb-2">
                <GitCommit className="w-3.5 h-3.5" />
                <span>SÜRÜM GEÇMİŞİ · CHANGELOG (PLACEHOLDER)</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Güncellemeler
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#9ca3af]">
                v3.0 sürümünden bugüne yapılan eklemeler, hata düzeltmeleri ve iyileştirmeler.
              </p>
            </motion.div>

            <div className="space-y-3.5">
              {CHANGELOG_DATA.map((rel) => {
                const isOpen = openVersion === rel.version;
                return (
                  <div
                    key={rel.version}
                    className={`rounded-2xl border transition-colors ${
                      isOpen
                        ? 'bg-[#9B59B6]/10 border-[#A78BFA]/50'
                        : 'bg-[#0a0a0f]/80 border-[#9B59B6]/20 hover:border-[#9B59B6]/40'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenVersion((prev) => (prev === rel.version ? '' : rel.version))
                      }
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-[#C4B5FD]">
                          {rel.version}
                        </span>
                        <span className="font-display font-bold text-white text-sm sm:text-base">
                          {rel.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-mono text-[#9ca3af] hidden sm:inline">
                          {rel.date}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#A78BFA] transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-2 border-t border-white/10 space-y-3 text-xs sm:text-sm">
                        {rel.added.length > 0 && (
                          <div>
                            <div className="font-mono text-xs text-emerald-400 font-semibold mb-1">
                              + Eklenenler
                            </div>
                            <ul className="list-disc list-inside space-y-1 text-[#e5e5e5]/90">
                              {rel.added.map((a, i) => (
                                <li key={i}>{a}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {rel.fixed.length > 0 && (
                          <div>
                            <div className="font-mono text-xs text-amber-300 font-semibold mb-1">
                              ~ Düzeltilenler
                            </div>
                            <ul className="list-disc list-inside space-y-1 text-[#9ca3af]">
                              {rel.fixed.map((f, i) => (
                                <li key={i}>{f}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {rel.removed.length > 0 && (
                          <div>
                            <div className="font-mono text-xs text-rose-400 font-semibold mb-1">
                              - Kaldırılanlar
                            </div>
                            <ul className="list-disc list-inside space-y-1 text-[#9ca3af]">
                              {rel.removed.map((r, i) => (
                                <li key={i}>{r}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
