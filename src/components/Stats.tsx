/**
 * @file Stats.tsx
 * @description Vega Discord Bot'un sayısal verilerini (10+ Sunucu, 400+ Kullanıcı, 183 Komut, %99.9 Uptime, 50ms Ping)
 * C2 ("Canlı" etiketi + "Yakında canlı API" notu) ve D4 (Uptime Geçmişi & Status Modalı açma butonu) ile gösteren bölüm.
 */

import React from 'react';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';
import { DETAILED_STATS, StatMetric } from '../data/stats';
import { useAppContext } from '../context/AppContext';

interface StatCardProps {
  metric: StatMetric;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ metric, index }) => {
  const formattedValue = metric.decimals
    ? metric.value.toFixed(metric.decimals)
    : metric.value.toString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="vega-card p-6 text-center flex flex-col justify-between"
    >
      <div>
        <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#C4B5FD] via-[#9B59B6] to-[#60A5FA] bg-clip-text text-transparent tabular-nums">
          {metric.prefix || ''}
          {formattedValue}
          {metric.suffix}
        </div>
        <h3 className="mt-3 font-display text-base sm:text-lg font-bold text-white">
          {metric.label}
        </h3>
      </div>
      <p className="mt-2 text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
        {metric.description}
      </p>
    </motion.div>
  );
};

export const Stats: React.FC = () => {
  const { setIsStatusModalOpen } = useAppContext();

  return (
    <section id="istatistikler" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          {/* C2: Canlı İstatistik Etiketi & Yakında Canlı Notu */}
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#A78BFA] mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>CANLI İSTATİSTİKLER · DISCORD API (YAKINDA CANLI)</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Vega Rakamlarla
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#9ca3af]">
            Optimize edilmiş altyapı ve düşük gecikme süresiyle sunucunuza kesintisiz hizmet verir.
          </p>

          {/* D4: Status / Uptime Grafiği Modalı Tetikleyici */}
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setIsStatusModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#12121a] border border-[#9B59B6]/35 hover:border-[#A78BFA] text-xs font-semibold text-[#C4B5FD] hover:text-white transition-colors cursor-pointer"
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Canlı Sistem Durumu &amp; Uptime Grafiğini Gör</span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {DETAILED_STATS.map((metric, idx) => (
            <StatCard key={metric.id} metric={metric} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
