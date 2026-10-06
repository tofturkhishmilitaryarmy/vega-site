/**
 * @file GlobalOverlays.tsx
 * @description Site İçi Arama Modalı, Sistem Durumu (Status) Modalı, API Dokümantasyonu Modalı,
 * Çerez/KVKK Bildirimi ve 8. Madde: @rayttx Discord profilini gösteren ve doğrudan yönlendiren Canlı Destek Butonu.
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  X,
  Activity,
  FileCode2,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  Download,
  ExternalLink,
  UserCheck,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useAppContext } from '../context/AppContext';
import { COMMAND_CATEGORIES } from '../data/commands';
import { FEATURES_DATA } from '../data/features';
import { FAQ_DATA } from '../data/faq';
import { UPTIME_HISTORY_DATA } from '../data/communityData';
import { BOT_LINKS } from '../data/stats';

export const GlobalOverlays: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    isStatusModalOpen,
    setIsStatusModalOpen,
    isApiModalOpen,
    setIsApiModalOpen,
  } = useAppContext();

  const [siteQuery, setSiteQuery] = useState('');
  const [supportPopupOpen, setSupportPopupOpen] = useState(false);

  const [kvkkAccepted, setKvkkAccepted] = useState<boolean>(() => {
    try {
      return localStorage.getItem('vega_kvkk_accepted') === 'true';
    } catch {
      return false;
    }
  });
  const [showKvkkModal, setShowKvkkModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleAcceptKvkk = () => {
    setKvkkAccepted(true);
    try {
      localStorage.setItem('vega_kvkk_accepted', 'true');
    } catch {}
  };

  const searchResults = useMemo(() => {
    const q = siteQuery.trim().toLowerCase();
    if (!q) return [];

    const results: { type: string; title: string; desc: string; href: string }[] = [];

    FEATURES_DATA.forEach((f) => {
      if (
        f.title.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'Özellik',
          title: f.title,
          desc: f.description,
          href: '#ozellikler',
        });
      }
    });

    COMMAND_CATEGORIES.forEach((cat) => {
      cat.commands.forEach((cmd) => {
        if (
          cmd.name.toLowerCase().includes(q) ||
          cmd.description.toLowerCase().includes(q)
        ) {
          results.push({
            type: `Komut (${cat.name})`,
            title: cmd.usage,
            desc: cmd.description,
            href: '#komutlar',
          });
        }
      });
    });

    FAQ_DATA.forEach((faq) => {
      if (
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'SSS',
          title: faq.question,
          desc: faq.answer,
          href: '#sss',
        });
      }
    });

    return results.slice(0, 12);
  }, [siteQuery]);

  return (
    <>
      {/* SİTE İÇİ ARAMA MODALI */}
      {isSearchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site İçi Arama"
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="max-w-2xl w-full vega-card p-5 sm:p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <Search className="w-5 h-5 text-[#A78BFA] shrink-0" />
              <input
                type="text"
                autoFocus
                value={siteQuery}
                onChange={(e) => setSiteQuery(e.target.value)}
                placeholder="Tüm sitede ara: komutlar (.ban, .oynat), özellikler, SSS..."
                className="w-full bg-transparent text-white text-sm sm:text-base placeholder-[#9ca3af] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9ca3af] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!siteQuery.trim() ? (
              <div className="py-6 text-center text-xs sm:text-sm text-[#9ca3af]">
                Aramak istediğiniz komutu, özelliği veya soruyu yazmaya başlayın.
              </div>
            ) : searchResults.length === 0 ? (
              <div className="py-8 text-center text-sm text-[#9ca3af]">
                &ldquo;{siteQuery}&rdquo; için sonuç bulunamadı.
              </div>
            ) : (
              <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
                {searchResults.map((res, idx) => (
                  <a
                    key={idx}
                    href={res.href}
                    onClick={() => setIsSearchOpen(false)}
                    className="block p-3.5 rounded-xl bg-black/70 border border-white/10 hover:border-[#A78BFA]/60 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs text-[#A78BFA] mb-1">
                      <span>{res.type}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                    <div className="font-mono font-bold text-white text-sm">
                      {res.title}
                    </div>
                    <div className="text-xs text-[#9ca3af] line-clamp-1 mt-0.5">
                      {res.desc}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SİSTEM DURUMU (STATUS & UPTIME GRAFİĞİ) MODALI */}
      {isStatusModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Vega Sistem Durumu ve Uptime Geçmişi"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setIsStatusModalOpen(false)}
        >
          <div
            className="max-w-3xl w-full vega-card p-6 sm:p-8 shadow-2xl space-y-6 max-h-[88vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <Activity className="w-6 h-6 text-emerald-400" />
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Vega Sistem Durumu (Status)
                  </h3>
                  <p className="text-xs text-[#9ca3af]">
                    Son 7 günlük Uptime (%) ve WebSocket Ping (ms) geçmişi
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsStatusModalOpen(false)}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#9ca3af] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-black/70 border border-emerald-500/30">
                <div className="text-xs text-[#9ca3af]">7/24 Keep-Alive Watchdog</div>
                <div className="mt-1 font-display font-bold text-emerald-400 text-base">
                  ● Aktif (4 dk Otomatik Ping)
                </div>
              </div>
              <div className="p-4 rounded-xl bg-black/70 border border-[#9B59B6]/30">
                <div className="text-xs text-[#9ca3af]">Yapılandırılan Domain</div>
                <div className="mt-1 font-mono font-bold text-white text-base">
                  vega.js.org
                </div>
              </div>
              <div className="p-4 rounded-xl bg-black/70 border border-[#9B59B6]/30">
                <div className="text-xs text-[#9ca3af]">Ortalama Gecikme</div>
                <div className="mt-1 font-mono font-bold text-[#C4B5FD] text-lg tabular-nums">
                  49ms
                </div>
              </div>
            </div>

            <div className="h-64 w-full bg-black/70 rounded-xl p-4 border border-white/10">
              <ResponsiveContainer width="100%" height={220} minWidth={260}>
                <AreaChart data={UPTIME_HISTORY_DATA}>
                  <defs>
                    <linearGradient id="vegaPingGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9B59B6" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} domain={[30, 70]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0a0a12',
                      borderColor: '#9B59B6',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="ping"
                    name="Ping (ms)"
                    stroke="#A78BFA"
                    fillOpacity={1}
                    fill="url(#vegaPingGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* VEGA API DOKÜMANTASYONU MODALI */}
      {isApiModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Vega API Dokümantasyonu"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setIsApiModalOpen(false)}
        >
          <div
            className="max-w-2xl w-full vega-card p-6 sm:p-8 shadow-2xl space-y-5 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <FileCode2 className="w-6 h-6 text-[#A78BFA]" />
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Vega Platform API Dokümantasyonu
                  </h3>
                  <p className="text-xs text-[#9ca3af]">
                    Geliştiriciler ve sunucu entegrasyonları için REST uç noktaları
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsApiModalOpen(false)}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#9ca3af] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-black/70 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 font-mono">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                    POST
                  </span>
                  <span className="text-white">/api/contact-webhook</span>
                </div>
                <p className="text-[#9ca3af]">
                  İletişim formundan gönderilen kullanıcı mesajlarını gerçek zamanlı olarak Discord Webhook kanalına iletir.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/70 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 font-mono">
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold">
                    GET
                  </span>
                  <span className="text-white">/api/v1/stats</span>
                </div>
                <p className="text-[#9ca3af]">
                  Vega&apos;nın anlık sunucu, kullanıcı, komut sayısı ve ping değerlerini JSON formatında döndürür.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ÇEREZ / KVKK BİLDİRİMİ BANNER'I */}
      {!kvkkAccepted && (
        <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-40 vega-card p-4 shadow-2xl flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#A78BFA] shrink-0 mt-0.5" />
            <p className="text-xs text-[#e5e5e5] leading-relaxed">
              Deneyiminizi iyileştirmek, tema ve dil tercihlerinizi saklamak için yerel çerezler (localStorage) kullanıyoruz.{' '}
              <button
                type="button"
                onClick={() => setShowKvkkModal(true)}
                className="text-[#C4B5FD] underline hover:text-white cursor-pointer"
              >
                KVKK Aydınlatma Metni
              </button>
            </p>
          </div>
          <div className="flex items-center justify-end gap-2">
            {deferredPrompt && (
              <button
                type="button"
                onClick={() => {
                  deferredPrompt.prompt();
                  setDeferredPrompt(null);
                }}
                className="px-3 py-1.5 rounded-lg border border-[#9B59B6]/40 text-xs font-semibold text-[#C4B5FD] inline-flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Uygulamayı Kur</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleAcceptKvkk}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#9B59B6] to-[#3B82F6] text-white text-xs font-semibold cursor-pointer"
            >
              Kabul Et
            </button>
          </div>
        </div>
      )}

      {/* KVKK Metni Modalı */}
      {showKvkkModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setShowKvkkModal(false)}
        >
          <div
            className="max-w-lg w-full vega-card p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-lg font-bold text-white">
              KVKK &amp; Gizlilik Aydınlatma Metni
            </h3>
            <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
              Vega Discord Botu ve web tanıtım platformu, kullanıcıların yalnızca tema seçimi, dil tercihi ve bot içi sunucu yapılandırma verilerini güvenli veritabanında ve tarayıcı hafızasında saklar. Üçüncü taraf reklam ağlarına hiçbir kişisel veri aktarılmaz.
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowKvkkModal(false)}
                className="px-4 py-2 rounded-xl bg-[#9B59B6] text-white text-xs font-semibold cursor-pointer"
              >
                Anladım
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. MADDE: SAĞ ALTTA @rayttx PROFİLİNİ GÖSTEREN VE DOĞRUDAN YÖNLENDİREN CANLI DESTEK WIDGET'I */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
        {supportPopupOpen && (
          <div className="w-72 sm:w-80 vega-card p-5 shadow-2xl space-y-4 border border-[#A78BFA]/50">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#9B59B6] to-[#3B82F6] flex items-center justify-center text-white font-display font-bold text-sm">
                  R
                </div>
                <div>
                  <div className="font-display font-bold text-white text-sm">
                    {BOT_LINKS.developerHandle}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-mono">
                    ● Canlı Destek &amp; Kurucu
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSupportPopupOpen(false)}
                aria-label="Canlı destek penceresini kapat"
                className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#9ca3af] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#e5e5e5] leading-relaxed">
              Vega kurulumu, özel komutlar veya destek talepleriniz için doğrudan <strong className="text-[#C4B5FD]">{BOT_LINKS.developerHandle}</strong> Discord profili ve destek kanalımız üzerinden bize ulaşabilirsiniz.
            </p>

            <div className="flex flex-col gap-2">
              <a
                href={BOT_LINKS.developerDiscordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#9B59B6] via-[#8B5CF6] to-[#3B82F6] text-white text-xs font-semibold hover:opacity-95 transition-opacity"
              >
                <UserCheck className="w-4 h-4" />
                <span>{BOT_LINKS.developerHandle} Discord Kanalına Git</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSupportPopupOpen((prev) => !prev)}
            className="inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#9B59B6] via-[#8B5CF6] to-[#3B82F6] text-white text-xs sm:text-sm font-semibold shadow-[0_0_30px_rgba(139,92,246,0.65)] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Canlı Destek ({BOT_LINKS.developerHandle})</span>
          </button>
        </div>
      </div>
    </>
  );
};
