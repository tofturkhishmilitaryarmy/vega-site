/**
 * @file CommandSimulator.tsx
 * @description 2. Madde: Modern ve dinamik "Komut Gönder" & Canlı Terminal Konsolu.
 * Kullanıcı hazır komut kartlarına tıklayabilir veya kendi komutunu yazıp göndererek
 * geçmiş (history) destekli canlı Discord konsolunda bot yanıtını anında deneyimleyebilir.
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Terminal,
  Send,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { SIMULATOR_PRESETS, SimulatedCommandResponse } from '../data/communityData';

interface ConsoleLogEntry {
  id: string;
  userCommand: string;
  timestamp: string;
  response: SimulatedCommandResponse;
}

export const CommandSimulator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [logs, setLogs] = useState<ConsoleLogEntry[]>([
    {
      id: 'initial-1',
      userCommand: SIMULATOR_PRESETS[0].command,
      timestamp: 'Az önce',
      response: SIMULATOR_PRESETS[0],
    },
  ]);

  const executeCommand = (rawCmd: string) => {
    const clean = rawCmd.trim();
    if (!clean) return;

    const lower = clean.toLowerCase();
    let computedResponse: SimulatedCommandResponse | undefined = SIMULATOR_PRESETS.find(
      (preset) => {
        const baseCmd = preset.command.split(' ')[0].toLowerCase();
        return (
          lower.startsWith(baseCmd) ||
          (baseCmd === '.yardim' && lower.startsWith('/yardim'))
        );
      }
    );

    if (lower.startsWith('.ai') && clean.length > 4) {
      const userQuestion = clean.slice(3).trim();
      computedResponse = {
        command: clean,
        label: '.ai',
        category: 'Yapay Zeka',
        botTitle: '🤖 Vega AI — Gemini & Groq LPU Yanıtı',
        botDescription: `"${userQuestion}" mesajınız işlendi: Vega yapay zeka motoru sunucu üyelerinizin sorularını 0.4 saniye içinde akıcı Türkçe ile yanıtlar.`,
        fields: [
          { name: 'Aktif Motor', value: '`Gemini + Groq Hibrit`' },
          { name: 'Gecikme', value: '`0.36s`' },
        ],
        footer: 'Gerçek sunucu deneyimi için Vega’yı davet edin.',
      };
    } else if (lower.startsWith('.oynat') && clean.length > 7) {
      const songName = clean.slice(6).trim();
      computedResponse = {
        command: clean,
        label: '.oynat',
        category: 'Müzik',
        botTitle: `🎵 Şimdi Çalıyor: ${songName}`,
        botDescription: 'Parça ses kanalında kesintisiz HD kalitede oynatılıyor.',
        fields: [
          { name: 'Platform', value: '`Spotify / YouTube`' },
          { name: 'Ses Kalitesi', value: '`320kbps Stereo`' },
        ],
        footer: 'Müzik kuyruğu aktif',
      };
    } else if (!computedResponse) {
      computedResponse = {
        command: clean,
        label: clean.split(' ')[0],
        category: 'Özel Test',
        botTitle: `⚡ Komut İşlendi: ${clean.split(' ')[0]}`,
        botDescription: `Gönderdiğiniz \`${clean}\` komutu Vega komut ayrıştırıcısı tarafından doğrulandı ve ilgili modül tetiklendi.`,
        fields: [
          {
            name: 'Prefix Durumu',
            value:
              clean.startsWith('.') || clean === '/yardim'
                ? '`✅ Geçerli Prefix`'
                : '`ℹ️ Nokta (.) prefixi önerilir`',
          },
          { name: 'Yanıt Süresi', value: '`48ms`' },
        ],
        footer: '183+ komutun tamamı için .yardim yazabilirsiniz.',
      };
    }

    const nowStr = new Date().toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    setLogs((prev) => [
      {
        id: `${Date.now()}-${Math.random()}`,
        userCommand: clean,
        timestamp: `Bugün ${nowStr}`,
        response: computedResponse!,
      },
      ...prev.slice(0, 3),
    ]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    executeCommand(inputValue);
    setInputValue('');
  };

  return (
    <section
      id="dene"
      className="py-24 relative bg-gradient-to-b from-black via-[#080711] to-black border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#A78BFA] mb-3">
            <Zap className="w-3.5 h-3.5 text-[#60A5FA]" />
            <span>İNTERAKTİF KOMUT KONSOLU · CANLI TEST</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Komut Gönder &amp; Vega&apos;yı Dene
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#9ca3af]">
            Aşağıdaki dinamik konsola istediğiniz Vega komutunu yazıp gönderin veya hazır modül kartlarından birini seçerek botun gerçek zamanlı Discord yanıtını inceleyin.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sol Panel: Komut Gönderme Formu & Hızlı Modül Tetikleyicileri */}
          <div className="lg:col-span-5 vega-card p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-white flex items-center gap-2.5">
                <Terminal className="w-5 h-5 text-[#A78BFA]" />
                <span>Komut Gönder</span>
              </h3>
              <span className="text-xs font-mono text-emerald-400">● Konsol Hazır</span>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Komut yazın (örn: .ban @kullanıcı, .oynat, .ai...)"
                  aria-label="Komut Gönder"
                  className="w-full pl-4 pr-28 py-4 rounded-2xl bg-black/80 border border-[#9B59B6]/45 font-mono text-sm text-white placeholder-[#9ca3af]/60 focus:outline-none focus:border-[#60A5FA] transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#9B59B6] via-[#8B5CF6] to-[#3B82F6] text-white text-xs font-semibold inline-flex items-center gap-1.5 hover:opacity-95 active:scale-95 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gönder</span>
                </button>
              </div>
              <p className="text-[11px] text-[#9ca3af]">
                İpucu: <code className="font-mono text-[#C4B5FD]">.ai Merhaba</code> veya{' '}
                <code className="font-mono text-[#C4B5FD]">.oynat şarkı adı</code> yazarak özel argümanlarla test edebilirsiniz.
              </p>
            </form>

            {/* Hazır Komut Seçenekleri */}
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center justify-between text-xs font-medium text-[#9ca3af] mb-3">
                <span>Hızlı Komut Tetikleyicileri:</span>
                <button
                  type="button"
                  onClick={() =>
                    setLogs([
                      {
                        id: 'reset-1',
                        userCommand: SIMULATOR_PRESETS[0].command,
                        timestamp: 'Şimdi',
                        response: SIMULATOR_PRESETS[0],
                      },
                    ])
                  }
                  className="inline-flex items-center gap-1 text-[#C4B5FD] hover:text-white cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Konsolu Sıfırla</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {SIMULATOR_PRESETS.map((preset) => {
                  const isLatest = logs[0]?.response.label === preset.label;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => executeCommand(preset.command)}
                      className={`p-3 rounded-xl text-left transition-all cursor-pointer border ${
                        isLatest
                          ? 'bg-gradient-to-r from-[#9B59B6]/30 to-[#3B82F6]/20 border-[#A78BFA] text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                          : 'bg-black/60 border-white/10 text-[#e5e5e5] hover:border-[#9B59B6]/50 hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="font-mono text-xs font-bold text-[#C4B5FD]">
                        {preset.label}
                      </div>
                      <div className="text-[11px] text-[#9ca3af] mt-0.5 truncate">
                        {preset.category}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sağ Panel: Canlı Discord Çıktı Ekranı */}
          <div className="lg:col-span-7 vega-card overflow-hidden">
            <div className="px-6 py-4 bg-black/60 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-xs sm:text-sm font-semibold text-white ml-2">
                  # ⚡・vega-komut-konsolu
                </span>
              </div>
              <span className="text-xs font-mono text-[#A78BFA]">
                Canlı Yanıt Önizlemesi
              </span>
            </div>

            <div className="p-6 space-y-6 max-h-[460px] overflow-y-auto">
              {logs.map((entry) => (
                <div
                  key={entry.id}
                  className="space-y-4 pb-5 border-b border-white/10 last:border-none last:pb-0"
                >
                  {/* Kullanıcının Gönderdiği Komut */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#3B82F6] text-white font-bold flex items-center justify-center text-xs shrink-0">
                      S
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white">Sen</span>
                        <span className="text-[11px] text-[#9ca3af]">{entry.timestamp}</span>
                      </div>
                      <div className="mt-1 font-mono text-xs sm:text-sm text-[#C4B5FD] bg-black/70 border border-white/10 px-3 py-1.5 rounded-xl inline-block">
                        {entry.userCommand}
                      </div>
                    </div>
                  </div>

                  {/* Vega Bot Embed Yanıtı */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#9B59B6] to-[#3B82F6] flex items-center justify-center shrink-0 text-white font-display font-bold text-sm shadow-[0_0_15px_rgba(155,89,182,0.5)]">
                      V
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">Vega</span>
                        <span className="bg-[#5865F2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded inline-flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5" /> BOT
                        </span>
                        <span className="text-[11px] text-[#9ca3af]">48ms</span>
                      </div>

                      <div className="mt-2 rounded-2xl bg-black/65 border border-white/10 border-l-4 border-l-[#9B59B6] p-4 sm:p-5 space-y-3">
                        <h4 className="font-display font-bold text-white text-base">
                          {entry.response.botTitle}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#e5e5e5]/90 leading-relaxed">
                          {entry.response.botDescription}
                        </p>

                        {entry.response.fields && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                            {entry.response.fields.map((field) => (
                              <div
                                key={field.name}
                                className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs"
                              >
                                <div className="font-semibold text-[#C4B5FD] mb-0.5">
                                  {field.name}
                                </div>
                                <div className="text-white font-mono text-[11px]">
                                  {field.value}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[#9ca3af]">
                          <span>{entry.response.footer}</span>
                          <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
