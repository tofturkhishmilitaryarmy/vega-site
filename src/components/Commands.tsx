/**
 * @file Commands.tsx
 * @description 2. Madde: Tamamen yenilenmiş, modern ve dinamik Komut Listesi arayüzü.
 * Sol tarafta kategori navigasyonu (mobilde yatay kaydırmalı bar), sağ tarafta anlık filtreleme,
 * tek tıkla kopyalama ve doğrudan "Simülatörde Çalıştır" aksiyonu sunar.
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  Copy,
  Check,
  Terminal,
  Sparkles,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { COMMAND_CATEGORIES, TOTAL_COMMANDS_COUNT } from '../data/commands';

export const Commands: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(COMMAND_CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const activeCategory = useMemo(
    () =>
      COMMAND_CATEGORIES.find((cat) => cat.id === activeCategoryId) ||
      COMMAND_CATEGORIES[0],
    [activeCategoryId]
  );

  const displayedCommands = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return activeCategory.commands.map((cmd) => ({
        ...cmd,
        categoryName: activeCategory.name,
      }));
    }

    return COMMAND_CATEGORIES.flatMap((cat) =>
      cat.commands
        .filter(
          (cmd) =>
            cmd.name.toLowerCase().includes(query) ||
            cmd.description.toLowerCase().includes(query) ||
            cmd.usage.toLowerCase().includes(query)
        )
        .map((cmd) => ({
          ...cmd,
          categoryName: cat.name,
        }))
    );
  }, [activeCategory, searchQuery]);

  const handleCopy = (usage: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(usage).catch(() => {});
    }
    setCopiedCommand(usage);
    setTimeout(() => {
      setCopiedCommand((prev) => (prev === usage ? null : prev));
    }, 1800);
  };

  return (
    <section id="komutlar" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Üst Başlık ve Hızlı Arama */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#A78BFA] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>15 KATEGORİ · {TOTAL_COMMANDS_COUNT}+ DİNAMİK KOMUT</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Komut Kütüphanesi
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#9ca3af] max-w-2xl">
              Tüm komutlar <code className="font-mono text-[#C4B5FD]">.</code> prefixi ile çalışır (<code className="font-mono text-[#C4B5FD]">/yardim</code> slash desteklidir). Kopyalamak için herhangi bir komuta tıklayın.
            </p>
          </div>

          {/* Arama Kutusu */}
          <div className="relative w-full lg:w-96 shrink-0">
            <Search className="w-4 h-4 text-[#A78BFA] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="183+ komut içinde ara (.ban, .oynat, .ai...)"
              aria-label="Komut ara"
              className="w-full pl-11 pr-20 py-3.5 rounded-2xl bg-[#0d0c18]/90 backdrop-blur-xl border border-[#9B59B6]/35 text-sm text-white placeholder-[#9ca3af] focus:outline-none focus:border-[#A78BFA] shadow-[0_0_25px_rgba(139,92,246,0.15)] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#C4B5FD] hover:text-white cursor-pointer"
              >
                Temizle
              </button>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sol: 15 Kategori Seçici (Masaüstünde dikey cam panel, mobilde yatay bar) */}
          <div className="lg:col-span-3 vega-card p-3 lg:sticky lg:top-24">
            <div className="hidden lg:flex items-center justify-between px-3 py-2 mb-1 text-xs font-mono uppercase tracking-wider text-[#9ca3af]">
              <span className="inline-flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#A78BFA]" />
                Kategoriler
              </span>
              <span>15 Modül</span>
            </div>

            <div
              role="tablist"
              aria-label="Komut Kategorileri"
              className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0"
            >
              {COMMAND_CATEGORIES.map((category) => {
                const isSelected = !searchQuery && category.id === activeCategoryId;
                return (
                  <button
                    key={category.id}
                    role="tab"
                    aria-selected={isSelected}
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategoryId(category.id);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-left transition-all duration-150 whitespace-nowrap shrink-0 flex items-center justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#9B59B6] via-[#8B5CF6] to-[#3B82F6] text-white shadow-[0_0_20px_rgba(139,92,246,0.45)]'
                        : 'text-[#9ca3af] hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span
                      className={`text-[11px] font-mono ${
                        isSelected ? 'text-white/90' : 'text-[#9ca3af]/60'
                      }`}
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sağ: Aktif Kategori Başlığı ve Dinamik Komut Kartları */}
          <div className="lg:col-span-9 space-y-5">
            {/* Üst Bilgi Barı */}
            <div className="vega-card px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                {searchQuery ? (
                  <span className="text-sm text-[#e5e5e5]">
                    <strong className="text-white">&ldquo;{searchQuery}&rdquo;</strong> araması için{' '}
                    <strong className="text-[#C4B5FD] font-mono tabular-nums">
                      {displayedCommands.length}
                    </strong>{' '}
                    komut listeleniyor
                  </span>
                ) : (
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      {activeCategory.name} Komutları
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9ca3af]">
                      {activeCategory.description}
                    </p>
                  </div>
                )}
              </div>

              <a
                href="#dene"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C4B5FD] hover:text-white shrink-0 transition-colors"
              >
                <span>Canlı Konsolda Test Et</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Komut Grid */}
            {displayedCommands.length === 0 ? (
              <div className="vega-card p-12 text-center">
                <Terminal className="w-10 h-10 text-[#A78BFA] mx-auto mb-3 opacity-80" />
                <h3 className="text-lg font-bold text-white">Eşleşen komut bulunamadı</h3>
                <p className="mt-1 text-sm text-[#9ca3af]">
                  Farklı bir anahtar kelime deneyin veya sol menüden kategori seçin.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayedCommands.map((cmd) => {
                  const isCopied = copiedCommand === cmd.usage;
                  return (
                    <div
                      key={`${cmd.categoryName}-${cmd.name}`}
                      onClick={() => handleCopy(cmd.usage)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleCopy(cmd.usage);
                        }
                      }}
                      className="vega-card p-5 text-left group flex flex-col justify-between gap-3 cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-3 w-full">
                        <div className="min-w-0">
                          <code className="font-mono text-sm sm:text-base font-semibold text-[#C4B5FD] group-hover:text-white transition-colors break-all">
                            {cmd.usage}
                          </code>
                          <p className="mt-2 text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                            {cmd.description}
                          </p>
                        </div>

                        <div className="shrink-0 text-[#9ca3af] group-hover:text-[#C4B5FD] transition-colors pt-0.5">
                          {isCopied ? (
                            <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400">
                              <Check className="w-4 h-4" />
                              <span>Kopyalandı</span>
                            </span>
                          ) : (
                            <Copy className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                          )}
                        </div>
                      </div>

                      <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#9ca3af] w-full">
                        <span>Modül: {cmd.categoryName}</span>
                        <span className="text-[#A78BFA]">Prefix (.)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
