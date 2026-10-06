/**
 * @file Contact.tsx
 * @description 1., 6., 7. ve 8. Maddeler:
 * - Tüm sahte/mock kodlar ve açık kaynak/GitHub ifadeleri temizlendi.
 * - Form gönderildiğinde gerçek bir Discord Webhook URL'sine (/api/contact-webhook üzerinden veya doğrudan)
 *   kullanıcı mesajını, tarih/IP ve form verilerini eksiksiz aktaran gerçek entegrasyon sağlandı.
 * - @rayttx Discord profili ve güncellenebilir destek sunucusu bağlantısı eklendi.
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  MessageSquare,
  Send,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
  Webhook,
  UserCheck,
  Settings2,
} from 'lucide-react';
import { BOT_LINKS } from '../data/stats';

export const Contact: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [category, setCategory] = useState('Öneri / Yeni Komut');
  const [message, setMessage] = useState('');
  const [webhookUrl, setWebhookUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('vega_custom_webhook_url') || BOT_LINKS.defaultWebhookUrl || '';
    } catch {
      return BOT_LINKS.defaultWebhookUrl || '';
    }
  });
  const [showWebhookConfig, setShowWebhookConfig] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    try {
      if (webhookUrl.trim()) {
        localStorage.setItem('vega_custom_webhook_url', webhookUrl.trim());
      }
    } catch {}
  }, [webhookUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!senderName.trim() || !message.trim()) {
      setErrorMsg('Lütfen Discord kullanıcı adınızı (veya isminizi) ve mesajınızı eksiksiz girin.');
      return;
    }

    if (
      senderEmail.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail.trim())
    ) {
      setErrorMsg('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch('/api/contact-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName: senderName.trim(),
          senderEmail: senderEmail.trim(),
          category,
          message: message.trim(),
          webhookUrl: webhookUrl.trim(),
          clientInfo: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setShowWebhookConfig(true);
        throw new Error(
          data.error ||
            'Discord Webhook gönderimi başarısız oldu. Lütfen geçerli bir Discord Webhook URL girin.'
        );
      }

      setSubmitted(true);
      setSenderName('');
      setSenderEmail('');
      setMessage('');
    } catch (err: any) {
      setErrorMsg(
        err?.message || 'Mesaj gönderilirken bir bağlantı hatası oluştu.'
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="iletisim"
      className="py-24 relative bg-gradient-to-b from-black via-[#090814] to-black border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="text-xs font-medium tracking-widest uppercase text-[#A78BFA] mb-3">
            DOĞRUDAN DESTEK &amp; GERÇEK ZAMANLI WEBHOOK
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            İletişim &amp; Canlı Destek
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#9ca3af]">
            Sorularınız için resmi Discord destek sunucumuza katılabilir, doğrudan <strong className="text-[#C4B5FD]">{BOT_LINKS.developerHandle}</strong> ile iletişime geçebilir veya aşağıdaki gerçek zamanlı Discord Webhook formunu kullanabilirsiniz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Sol: Discord Destek Sunucusu & @rayttx Doğrudan İletişim Kartları */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            {/* Resmi Discord Destek Sunucusu Kartı */}
            <div className="vega-card p-6 sm:p-7 flex flex-col justify-between gap-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    7/24 Aktif Topluluk &amp; Yardım
                  </span>
                  <span className="font-mono text-xs text-[#C4B5FD]">Discord</span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  Vega Resmi Destek Sunucusu
                </h3>
                <p className="text-sm text-[#9ca3af] leading-relaxed">
                  Bot kurulumu, komut yardımı, güncellemeler ve duyurular için resmi Discord topluluğumuza hemen katılın.
                </p>
              </div>

              <a
                href={BOT_LINKS.supportServerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#9B59B6] via-[#8B5CF6] to-[#3B82F6] text-white text-sm font-semibold shadow-[0_0_25px_rgba(139,92,246,0.45)] hover:opacity-95 active:scale-98 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Destek Sunucusuna Katıl</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* @rayttx Doğrudan Geliştirici Profili Kartı */}
            <div className="vega-card p-6 sm:p-7 flex flex-col justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#9B59B6] to-[#3B82F6] flex items-center justify-center shrink-0 text-white font-display font-bold text-lg shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                  R
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-bold text-white">
                      Doğrudan İletişim
                    </h3>
                    <span className="font-mono text-xs text-[#C4B5FD]">
                      {BOT_LINKS.developerHandle}
                    </span>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                    Özel destek ve yönetici iletişimi için Discord üzerinden doğrudan <strong className="text-white">{BOT_LINKS.developerHandle}</strong> profiline ulaşabilirsiniz.
                  </p>
                </div>
              </div>

              <a
                href={BOT_LINKS.developerDiscordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#9B59B6]/45 bg-white/[0.03] hover:bg-[#9B59B6]/20 text-xs sm:text-sm font-semibold text-[#C4B5FD] hover:text-white transition-colors"
              >
                <UserCheck className="w-4 h-4 text-[#A78BFA]" />
                <span>Discord: {BOT_LINKS.developerHandle} ile İletişime Geç</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Sağ: Gerçek Discord Webhook İletişim Formu */}
          <div className="lg:col-span-7 vega-card p-6 sm:p-8 flex flex-col justify-center">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Webhook className="w-5 h-5 text-[#A78BFA]" />
                <span>Discord Webhook İletişim Formu</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowWebhookConfig((prev) => !prev)}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C4B5FD] hover:text-white cursor-pointer"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>{showWebhookConfig ? 'Webhook Ayarını Gizle' : 'Webhook URL Yapılandır'}</span>
              </button>
            </div>
            <p className="text-sm text-[#9ca3af] mb-6">
              Gönderdiğiniz mesaj, tarih/saat ve teknik bilgilerle birlikte doğrudan yapılandırılmış Discord Webhook kanalına gerçek zamanlı embed olarak iletilir.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-display text-lg font-bold text-white">
                  Mesajınız Discord Webhook Kanalına İletildi!
                </h4>
                <p className="text-sm text-[#9ca3af]">
                  Form verileriniz gerçek zamanlı olarak Discord sunucusuna başarıyla aktarıldı.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-white/10 text-xs font-semibold text-white hover:bg-white/15 cursor-pointer"
                >
                  Yeni Mesaj Gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* İsteğe Bağlı / Dinamik Webhook URL Alanı */}
                {showWebhookConfig && (
                  <div className="p-4 rounded-2xl bg-black/70 border border-[#9B59B6]/40 space-y-2">
                    <label
                      htmlFor="webhook-url-input"
                      className="block text-xs font-mono text-[#C4B5FD]"
                    >
                      Hedef Discord Webhook URL (https://discord.com/api/webhooks/...)
                    </label>
                    <input
                      id="webhook-url-input"
                      type="url"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      placeholder="https://discord.com/api/webhooks/..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/15 font-mono text-xs text-white placeholder-[#9ca3af]/50 focus:outline-none focus:border-[#60A5FA]"
                    />
                    <p className="text-[11px] text-[#9ca3af]">
                      Sunucuda <code className="font-mono text-[#C4B5FD]">DISCORD_WEBHOOK_URL</code> ortam değişkeni tanımlıysa bu alanı boş bırakabilirsiniz; aksi halde kendi Discord kanalınızın Webhook bağlantısını buraya yapıştırabilirsiniz.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-[#e5e5e5] mb-1.5"
                    >
                      Adınız veya Discord Kullanıcı Adınız *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Örn: @rayttx veya Kuzey"
                      className="w-full px-4 py-3 rounded-xl bg-black/80 border border-[#9B59B6]/35 text-sm text-white placeholder-[#9ca3af]/60 focus:outline-none focus:border-[#A78BFA]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-[#e5e5e5] mb-1.5"
                    >
                      E-posta Adresiniz (Opsiyonel)
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="ornek@alanadi.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/80 border border-[#9B59B6]/35 text-sm text-white placeholder-[#9ca3af]/60 focus:outline-none focus:border-[#A78BFA]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-category"
                    className="block text-xs font-medium text-[#e5e5e5] mb-1.5"
                  >
                    Konu Kategorisi
                  </label>
                  <select
                    id="contact-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/80 border border-[#9B59B6]/35 text-sm text-white focus:outline-none focus:border-[#A78BFA]"
                  >
                    <option value="Öneri / Yeni Komut">Öneri / Yeni Komut</option>
                    <option value="Hata (Bug) Bildirimi">Hata (Bug) Bildirimi</option>
                    <option value="Destek & Kurulum">Destek &amp; Kurulum</option>
                    <option value="İşbirliği & Partnerlik">İşbirliği &amp; Partnerlik</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-[#e5e5e5] mb-1.5"
                  >
                    Mesajınız *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mesajınızı, önerinizi veya destek talebinizi detaylıca yazın..."
                    className="w-full px-4 py-3 rounded-xl bg-black/80 border border-[#9B59B6]/35 text-sm text-white placeholder-[#9ca3af]/60 focus:outline-none focus:border-[#A78BFA] resize-none"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#9B59B6] via-[#8B5CF6] to-[#3B82F6] text-white text-sm font-semibold hover:opacity-95 active:scale-98 transition-all cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSending ? 'Discord Webhook’a Gönderiliyor...' : 'Mesajı Gönder'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
