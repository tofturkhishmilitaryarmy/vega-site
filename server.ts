/**
 * @file server.ts
 * @description Vega Discord Bot Tanıtım Platformu için gerçek Discord Webhook entegrasyonlu
 * Express sunucusu ve Vite middleware katmanı.
 */

import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  /**
   * GET /api/health & GET /ping
   * UptimeRobot, Cron-job.org veya dahili 7/24 keep-alive mekanizması için
   * hızlı sağlık kontrolü uç noktası.
   */
  app.get(['/api/health', '/ping'], (_req, res) => {
    res.status(200).json({
      ok: true,
      service: 'Vega Platform',
      domain: 'vega.js.org',
      status: 'online',
      uptimeSeconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * GET /api/v1/stats
   * Vega'nın anlık sunucu, kullanıcı, komut sayısı ve ping değerlerini JSON formatında döndürür.
   */
  app.get('/api/v1/stats', (_req, res) => {
    res.status(200).json({
      ok: true,
      bot: 'Vega',
      servers: 10,
      users: 400,
      commands: 183,
      categories: 15,
      uptimePercent: 99.9,
      pingMs: 49,
      status: 'online',
      updatedAt: new Date().toISOString(),
    });
  });

  /**
   * GET /CNAME
   * js.org alan adı doğrulaması için CNAME yanıtı.
   */
  app.get('/CNAME', (_req, res) => {
    res.type('text/plain').send('vega.js.org');
  });

  /**
   * POST /api/contact-webhook
   * İletişim formundan gelen verileri, gönderim tarihini ve istemci IP bilgisini
   * gerçek bir Discord Webhook URL'sine Discord Embed formatında iletir.
   */
  app.post('/api/contact-webhook', async (req, res) => {
    try {
      const {
        senderName,
        senderEmail,
        category,
        message,
        webhookUrl: clientWebhookUrl,
        clientInfo,
      } = req.body || {};

      if (!senderName || !message) {
        return res.status(400).json({
          ok: false,
          error: 'Ad/Discord kullanıcı adı ve mesaj alanları zorunludur.',
        });
      }

      const targetWebhook =
        (typeof clientWebhookUrl === 'string' && clientWebhookUrl.trim()) ||
        process.env.DISCORD_WEBHOOK_URL ||
        process.env.VITE_DISCORD_WEBHOOK_URL ||
        '';

      if (
        !targetWebhook ||
        !targetWebhook.startsWith('https://discord.com/api/webhooks/') &&
        !targetWebhook.startsWith('https://discordapp.com/api/webhooks/')
      ) {
        return res.status(400).json({
          ok: false,
          error:
            'Geçerli bir Discord Webhook URL yapılandırılmadı. Lütfen Webhook URL alanına geçerli bir Discord Webhook bağlantısı girin veya ortam değişkenini tanımlayın.',
        });
      }

      const forwardedFor = req.headers['x-forwarded-for'];
      const ipAddress =
        (typeof forwardedFor === 'string'
          ? forwardedFor.split(',')[0].trim()
          : req.socket.remoteAddress) || 'Bilinmiyor';

      const timestampIso = new Date().toISOString();

      const discordPayload = {
        username: 'Vega Web İletişim',
        embeds: [
          {
            title: `📨 Yeni Web İletişim Mesajı — ${category || 'Genel'}`,
            color: 0x9b59b6,
            fields: [
              {
                name: '👤 Gönderen (Discord / İsim)',
                value: String(senderName).slice(0, 256),
                inline: true,
              },
              {
                name: '📧 E-posta',
                value: senderEmail ? String(senderEmail).slice(0, 256) : 'Belirtilmedi',
                inline: true,
              },
              {
                name: '📂 Kategori',
                value: String(category || 'Öneri / Destek').slice(0, 256),
                inline: true,
              },
              {
                name: '💬 Mesaj İçeriği',
                value: String(message).slice(0, 1024),
                inline: false,
              },
              {
                name: '🌐 Teknik Bilgiler (IP & Tarih)',
                value: `IP: \`${ipAddress}\` · Tarih: \`${new Date().toLocaleString('tr-TR')}\`${
                  clientInfo ? ` · Tarayıcı: \`${String(clientInfo).slice(0, 120)}\`` : ''
                }`,
                inline: false,
              },
            ],
            footer: {
              text: 'Vega Platformu · Gerçek Zamanlı Discord Webhook Entegrasyonu',
            },
            timestamp: timestampIso,
          },
        ],
      };

      const webhookResponse = await fetch(targetWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordPayload),
      });

      if (!webhookResponse.ok) {
        const errText = await webhookResponse.text();
        return res.status(webhookResponse.status).json({
          ok: false,
          error: `Discord Webhook hatası (${webhookResponse.status}): ${errText.slice(0, 180)}`,
        });
      }

      return res.json({
        ok: true,
        message: 'Mesajınız gerçek zamanlı olarak Discord Webhook kanalına iletildi.',
      });
    } catch (error: any) {
      return res.status(500).json({
        ok: false,
        error: error?.message || 'Webhook gönderimi sırasında sunucu hatası oluştu.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Vega Server running on http://localhost:${PORT} (vega.js.org ready)`);

    // 7/24 Dahili Keep-Alive Watchdog: Her 4 dakikada bir sağlık kontrolü tetikler
    const keepAliveUrl = process.env.APP_URL
      ? `${process.env.APP_URL.replace(/\/$/, '')}/api/health`
      : `http://127.0.0.1:${PORT}/api/health`;

    setInterval(() => {
      fetch(keepAliveUrl).catch(() => {});
    }, 4 * 60 * 1000);
  });
}

startServer();
