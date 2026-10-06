# 🌟 Vega — Yeni Nesil Discord Botu & Yönetim Platformu

**Vega** ("Yıldızların gücü sunucunda"), 183+ komut, yapay zeka (Gemini/Groq), gelişmiş güvenlik kalkanları, seviye sistemi, ticket yönetimi, ekonomi ve müzik modüllerine sahip Türkçe Discord platformunun resmi tanıtım ve yönetim sayfasıdır.

---

## ✨ Tasarım & Mimari Özellikler

- **Scale AI & Framer İlhamlı Görsel Tema:** Pitch Black (`#000000`) arka plan, mor-mavi gradyan ışımalar, 3D akışkan neon halkalar ve yuvarlatılmış cam efektli (`glassmorphism`) kartlar.
- **Komut Kütüphanesi & Canlı Komut Konsolu:** 15 kategoride 183+ komut, anlık arama, tek tıkla kopyalama ve geçmiş destekli interaktif "Komut Gönder" konsolu.
- **Gerçek Discord Webhook Entegrasyonu (`/api/contact-webhook`):** İletişim formundan gönderilen mesajları, gönderen bilgilerini, IP ve zaman damgasını doğrudan Discord Webhook kanalına zengin Embed olarak iletir.
- **Doğrudan Destek (`@rayttx`):** Sağ alt canlı destek widget'ı ve iletişim alanı üzerinden doğrudan `@rayttx` Discord profili ve resmi destek sunucusuna yönlendirme.

---

## 💻 Kurulum ve Çalıştırma

```bash
# 1. Bağımlılıkları yükleyin
npm install

# 2. Geliştirme sunucusunu başlatın (http://localhost:3000)
npm run dev
```

### Ortam Değişkenleri (`.env`)
İletişim formunun gerçek Discord kanalınıza mesaj göndermesi için `.env` dosyasında aşağıdaki değişkenleri tanımlayabilir veya doğrudan arayüzdeki **"Webhook URL Yapılandır"** bölümüne Webhook adresinizi girebilirsiniz:

```env
DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/WEBHOOK_ID/WEBHOOK_TOKEN"
VITE_DISCORD_SUPPORT_URL="https://discord.com/invite/Hh2yYqk6m"
```
