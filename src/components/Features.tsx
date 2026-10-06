/**
 * @file Features.tsx
 * @description Scale AI, Framer ve GPT-X görsellerindeki karanlık ızgaralı (grid) cam kartlarla
 * Vega'nın 9 temel sistemini sergileyen bölüm.
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  Brain,
  Shield,
  Star,
  Ticket,
  Music,
  Gamepad2,
  DollarSign,
  FileText,
  Crown,
} from 'lucide-react';
import { FEATURES_DATA, FeatureItem } from '../data/features';

const iconMap: Record<FeatureItem['iconName'], React.ReactNode> = {
  Brain: <Brain className="w-5 h-5 text-[#C4B5FD]" />,
  Shield: <Shield className="w-5 h-5 text-[#60A5FA]" />,
  Star: <Star className="w-5 h-5 text-[#FDE047]" />,
  Ticket: <Ticket className="w-5 h-5 text-[#A78BFA]" />,
  Music: <Music className="w-5 h-5 text-[#EC4899]" />,
  Gamepad2: <Gamepad2 className="w-5 h-5 text-[#60A5FA]" />,
  DollarSign: <DollarSign className="w-5 h-5 text-emerald-400" />,
  FileText: <FileText className="w-5 h-5 text-[#C4B5FD]" />,
  Crown: <Crown className="w-5 h-5 text-[#FDE047]" />,
};

export const Features: React.FC = () => {
  return (
    <section id="ozellikler" className="py-24 relative bg-black border-y border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bölüm Başlığı */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="text-xs font-semibold tracking-widest uppercase text-[#60A5FA] mb-3">
            9 ÇEKİRDEK SİSTEM · TEK BOT
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight [text-wrap:balance]">
            İşletmeniz ve Topluluğunuz İçin{' '}
            <span className="scale-gradient-text">Akıllı Otomasyon</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/65 leading-relaxed">
            Birden fazla bot ekleme karmaşasına son verin. Vega, moderasyondan yapay zekaya kadar sunucunuzun ihtiyaç duyduğu tüm sistemleri tek çatı altında sunar.
          </p>
        </motion.div>

        {/* 3x3 Karanlık Cam Kart Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES_DATA.map((feature, index) => (
            <motion.article
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="vega-card vega-grid-bg p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-[#A78BFA]/50 transition-colors">
                    {iconMap[feature.iconName]}
                  </div>
                  <span className="font-mono text-xs text-white/50 group-hover:text-[#C4B5FD] transition-colors">
                    {feature.number} · {feature.highlight}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-white group-hover:text-[#C4B5FD] transition-colors">
                  {feature.title}
                </h3>

                <p className="mt-2.5 text-sm text-white/65 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs">
                <span className="text-white/45">Komut</span>
                <code className="font-mono text-[#C4B5FD] font-medium">
                  {feature.commandPreview}
                </code>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
