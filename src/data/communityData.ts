/**
 * @file communityData.ts
 * @description Blog, Karşılaştırma Tablosu, Yol Haritası, Sürüm Geçmişi, Komut Simülatörü ve Uptime verileri.
 * (Açık kaynak ifadeleri tamamen kaldırılmış, Yorumlar/Referans Sunucular/Ekip alanları "Yakında" olarak ayrılmıştır.)
 */

export interface BlogPost {
  id: string;
  category: 'Güncelleme' | 'Duyuru' | 'İpucu';
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'vega-v3-4-yayinda',
    category: 'Güncelleme',
    title: 'Vega v3.4 Yayında: Groq & Gemini Hibrit Yapay Zeka Motoru',
    date: '6 Ekim 2026',
    readTime: '3 dk okuma',
    excerpt:
      'Sohbet yanıt sürelerini 0.4 saniyeye indiren yeni hibrit yapay zeka mimarisi ve gelişmiş phishing koruma veritabanı devreye alındı.',
    content: [
      'Vega v3.4 güncellemesi ile birlikte yapay zeka altyapımızı tamamen yeniledik. Artık .ai komutunu kullandığınızda Gemini ve Groq modelleri yük durumuna göre otomatik seçilerek 0.4 saniyenin altında Türkçe yanıt üretiyor.',
      'Güvenlik tarafında ise sahte Nitro ve Steam bağlantıları için gerçek zamanlı domain taraması güçlendirildi. .phishing-koruma aktif komutuyla sunucunuzu sıfır gecikmeyle koruyabilirsiniz.',
      'Ayrıca .oynat müzik modülünde ses tamponlama (buffering) iyileştirmeleri yapılarak kesintisiz dinleme deneyimi sağlandı.',
    ],
  },
  {
    id: 'sunucu-guvenligi-rehberi',
    category: 'İpucu',
    title: 'Discord Sunucunuzu Raid ve Bot Saldırılarından Koruma Rehberi',
    date: '28 Eylül 2026',
    readTime: '4 dk okuma',
    excerpt:
      'Büyüyen toplulukların en büyük kabusu olan toplu hesap saldırılarına karşı .antiraid ve .yeni-hesap-koruma ayarlarını nasıl yapılandırmalısınız?',
    content: [
      'Topluluk sunucuları büyüdükçe otomatik bot hesapların (raid) hedefi haline gelebilir. Vega’nın güvenlik modülü, insan müdahalesine gerek kalmadan saniyede 5’ten fazla şüpheli giriş tespit ettiğinde otomatik kalkanı devreye sokar.',
      'Önerilen başlangıç ayarlarımız: .antiraid aktif, .antispam aktif ve .yeni-hesap-koruma 7 komutlarını sırasıyla çalıştırmanızdır.',
      'Tüm engellenen işlemleri şeffaf biçimde takip etmek için .log-güvenlik #kanal-adı komutuyla özel bir denetim kanalı oluşturmayı unutmayın.',
    ],
  },
  {
    id: 'aktiflik-ve-seviye-ipuclari',
    category: 'Duyuru',
    title: 'Seviye Sistemi ve Özel Rank Kartlarıyla Etkileşimi 2 Katına Çıkarın',
    date: '19 Eylül 2026',
    readTime: '2 dk okuma',
    excerpt:
      'Uzay temalı yeni rank kartı arka planları, hafta sonu XP çarpanları ve otomatik seviye ödül rolleri hakkında bilmeniz gerekenler.',
    content: [
      'Üyelerin sunucuda geçirdiği vakti ödüllendirmek, kalıcı bir topluluk oluşturmanın anahtarıdır. Vega Seviye Sistemi hem yazılı sohbet hem de ses kanalı aktifliğini adil bir algoritmayla hesaplar.',
      '.seviye-rol 10 @YıldızÜye komutuyla belirli seviyelere ulaşan kullanıcılara otomatik prestij rolleri verebilirsiniz.',
      'Hafta sonu etkinliklerinde .xp-çarpanı 2x komutunu aktif ederek tüm sunucuda sohbet hareketliliğini anında artırabilirsiniz.',
    ],
  },
];

export interface ComparisonRow {
  feature: string;
  vega: string;
  mee6: string;
  dyno: string;
  carl: string;
}

export const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: 'Komut Sayısı',
    vega: '✅ 183+ Komut',
    mee6: '⚠️ Kısıtlı (~45)',
    dyno: '⚠️ ~90 Komut',
    carl: '⚠️ ~110 Komut',
  },
  {
    feature: 'Yapay Zeka (Gemini/Groq)',
    vega: '✅ Ücretsiz Dahili',
    mee6: '❌ Ücretli Ek Paket',
    dyno: '❌ Yok',
    carl: '❌ Yok',
  },
  {
    feature: 'Gelişmiş Güvenlik (Anti-Raid)',
    vega: '✅ Tam Kalkan',
    mee6: '⚠️ Kısmi',
    dyno: '⚠️ Kısmi',
    carl: '⚠️ Kısmi',
  },
  {
    feature: 'Seviye & Özel Rank Kartı',
    vega: '✅ Tamamen Ücretsiz',
    mee6: '❌ Premium Zorunlu',
    dyno: '❌ Yok',
    carl: '❌ Yok',
  },
  {
    feature: 'Müzik (YouTube + Spotify)',
    vega: '✅ Kesintisiz HD',
    mee6: '❌ Premium Zorunlu',
    dyno: '❌ Kaldırıldı',
    carl: '❌ Yok',
  },
  {
    feature: 'Butonlu Ticket & Transkript',
    vega: '✅ HTML/TXT Kayıtlı',
    mee6: '⚠️ Sınırlı',
    dyno: '❌ Yok',
    carl: '❌ Yok',
  },
  {
    feature: '%100 Ücretsiz Kullanım',
    vega: '✅ Hiçbir Ücret Yok',
    mee6: '❌ Aylık Abonelik',
    dyno: '⚠️ Premium Planlı',
    carl: '⚠️ Premium Planlı',
  },
  {
    feature: 'Tam Türkçe Dil Desteği',
    vega: '✅ Yerli & Doğal Türkçe',
    mee6: '⚠️ Kısmi Çeviri',
    dyno: '❌ İngilizce Ağırlıklı',
    carl: '❌ İngilizce',
  },
];

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  statusLabel: string;
  date: string;
}

export const ROADMAP_DATA: RoadmapItem[] = [
  {
    id: 'r1',
    title: '183+ Komut & 15 Ana Kategori Altyapısı',
    description:
      'Moderasyon, güvenlik, seviye, ekonomi, eğlence, müzik ve 6 türde log sisteminin yüksek hızlı veritabanıyla tamamlanması.',
    status: 'completed',
    statusLabel: '✅ Tamamlandı',
    date: 'Q3 2026',
  },
  {
    id: 'r2',
    title: 'Gemini & Groq Hibrit Yapay Zeka Entegrasyonu',
    description:
      'Akıllı sohbet, kod inceleme (.ai-kod) ve kanal özetleme (.ai-özetle) modüllerinin devreye alınması.',
    status: 'completed',
    statusLabel: '✅ Tamamlandı',
    date: 'Ekim 2026',
  },
  {
    id: 'r3',
    title: 'Web Yönetim Paneli (Dashboard) & Canlı İstatistik API',
    description:
      'Tarayıcı üzerinden sunucu log kanallarını, otorolleri ve özel komutları tek tıkla yönetebileceğiniz web kontrol paneli.',
    status: 'in-progress',
    statusLabel: '🔄 Devam Ediyor',
    date: 'Kasım 2026',
  },
  {
    id: 'r4',
    title: 'Sesli Yapay Zeka Asistanı & Özel Ses Efektleri',
    description:
      'Ses kanallarında Türkçe sesli komut algılama ve özelleştirilebilir sesli karşılama paketleri.',
    status: 'planned',
    statusLabel: '📋 Planlanan',
    date: 'Q1 2027',
  },
  {
    id: 'r5',
    title: 'Sunucular Arası Turnuva & Lonca Ekonomi Sistemi',
    description:
      'Farklı Discord sunucularının birbirleriyle bilgi yarışması ve mini oyun turnuvalarında rekabet edebileceği küresel lig.',
    status: 'planned',
    statusLabel: '📋 Planlanan',
    date: 'Q2 2027',
  },
];

export interface ChangelogRelease {
  version: string;
  date: string;
  title: string;
  added: string[];
  fixed: string[];
  removed: string[];
}

export const CHANGELOG_DATA: ChangelogRelease[] = [
  {
    version: 'v3.4',
    date: '6 Ekim 2026',
    title: 'Hibrit AI Motoru & Komut Optimizasyonu',
    added: [
      'Groq LPU ve Gemini hızlı yanıt yönlendiricisi (.ai, .ai-kod, .ai-özetle) eklendi.',
      '.linkkısalt ve .hava komutlarına yeni önbellek (cache) mimarisi eklendi.',
      'Ticket transkript çıktılarına karanlık mod HTML şablonu eklendi.',
    ],
    fixed: [
      '.oynat komutunda uzun Spotify listelerinin yüklenme gecikmesi giderildi.',
      '.hatırlat komutunda zaman dilimi hesaplama hatası düzeltildi.',
    ],
    removed: ['Eski ve yavaş yanıt veren yedek çeviri API uç noktası kaldırıldı.'],
  },
  {
    version: 'v3.3',
    date: '18 Eylül 2026',
    title: 'Gelişmiş Güvenlik Kalkanı & 6 Tür Log',
    added: [
      '.phishing-koruma komutuna 45.000+ zararlı domain veritabanı eklendi.',
      '.log-ayarla tümü ile 6 farklı log kanalını tek seferde kurma özelliği geldi.',
    ],
    fixed: [
      '.antispam modülünün yüksek takviyeli sunucularda yanlış uyarı verme sorunu çözüldü.',
    ],
    removed: [],
  },
  {
    version: 'v3.2',
    date: '2 Eylül 2026',
    title: 'Uzay Temalı Seviye & Rank Kartları',
    added: [
      '.kart-arkaplan ve .kart-renk komutlarıyla kişiselleştirilebilir Vega Nebula kartları eklendi.',
      'Ses kanallarında geçirilen süreye göre otomatik XP ödüllendirme sistemi eklendi.',
    ],
    fixed: ['.liderlik tablosunda sayfa geçiş butonlarının zaman aşımı düzeltildi.'],
    removed: [],
  },
  {
    version: 'v3.1',
    date: '14 Ağustos 2026',
    title: 'Ekonomi 2.0 & Çekiliş Şartları',
    added: [
      '.kasa-aç, .görevler ve .zenginler ekonomi komutları aktif edildi.',
      '.çekiliş-şartlı komutuyla rol ve minimum seviye şartlı çekiliş desteği geldi.',
    ],
    fixed: ['.transfer komutunda negatif değer girilmesiyle ilgili doğrulama hatası kapatıldı.'],
    removed: ['Kullanılmayan eski metin tabanlı market menüsü kaldırıldı.'],
  },
  {
    version: 'v3.0',
    date: '1 Ağustos 2026',
    title: 'Vega Çekirdek Yenilemesi (183 Komut)',
    added: [
      '15 kategori ve 183 komutluk yeni modüler mimariye geçiş yapıldı.',
      'SQLite yerel veritabanı ile sıfır gecikmeli ayar kaydetme sistemi kuruldu.',
    ],
    fixed: ['Tüm moderasyon komutlarında yetki hiyerarşisi kontrolü güçlendirildi.'],
    removed: ['v2 sürümünden kalan eski yapılandırma dosyaları temizlendi.'],
  },
];

export interface SimulatedCommandResponse {
  command: string;
  label: string;
  category: string;
  botTitle: string;
  botDescription: string;
  fields?: { name: string; value: string }[];
  footer: string;
}

export const SIMULATOR_PRESETS: SimulatedCommandResponse[] = [
  {
    command: '.yardim',
    label: '.yardim',
    category: 'Genel',
    botTitle: '🌟 Vega Komut & Yardım Merkezi (183 Komut)',
    botDescription:
      'Sunucunuzda tüm komutları `.` prefixi ile kullanabilirsiniz. Ayrıca `/yardim` slash komutu da aktiftir.',
    fields: [
      { name: '🛡️ Güvenlik & Moderasyon', value: '`.antiraid` `.antispam` `.ban` `.kick` `.sil`' },
      { name: '🤖 Yapay Zeka & Müzik', value: '`.ai` `.ai-kod` `.oynat` `.sıra` `.bassboost`' },
      { name: '📊 Seviye & Ekonomi', value: '`.rank` `.liderlik` `.bakiye` `.günlük` `.market`' },
    ],
    footer: 'Detaylı bilgi için: .yardim <komut_adı>',
  },
  {
    command: '.ping',
    label: '.ping',
    category: 'Genel',
    botTitle: '🏓 Pong! Vega Bağlantı Durumu',
    botDescription: 'Botun anlık WebSocket ve mesaj tepki süreleri aşağıda listelenmiştir:',
    fields: [
      { name: '⚡ Mesaj Gecikmesi', value: '`48ms` (Mükemmel)' },
      { name: '🌐 Discord API', value: '`42ms`' },
      { name: '🗄️ Veritabanı', value: '`1.2ms`' },
    ],
    footer: 'Uptime: %99.9 · Kesintisiz Çalışma',
  },
  {
    command: '.ban @kullanıcı Reklam',
    label: '.ban @kullanıcı',
    category: 'Moderasyon',
    botTitle: '🔨 Kullanıcı Sunucudan Yasaklandı',
    botDescription:
      '`@kullanıcı` adlı üye sunucu kurallarını ihlal ettiği gerekçesiyle kalıcı olarak yasaklandı.',
    fields: [
      { name: 'Yetkili', value: '`@SunucuYöneticisi`' },
      { name: 'Sebep', value: '`Reklam / Spam Paylaşımı`' },
      { name: 'Log Kaydı', value: '`#moderasyon-log kanalına işlendi`' },
    ],
    footer: 'Vega Moderasyon Kalkanı',
  },
  {
    command: '.oynat Starboy',
    label: '.oynat',
    category: 'Müzik',
    botTitle: '🎵 Şimdi Çalıyor: The Weeknd - Starboy',
    botDescription: 'Şarkı yüksek ses kalitesiyle ses kanalında oynatılmaya başlandı.',
    fields: [
      { name: 'Süre', value: '`03:50`' },
      { name: 'Kaynak', value: '`Spotify / YouTube HD`' },
      { name: 'Ses Seviyesi', value: '`%100 (Bassboost: Kapalı)`' },
    ],
    footer: 'Sıraya ekleyen: @Kuzey',
  },
  {
    command: '.rank',
    label: '.rank',
    category: 'Seviye',
    botTitle: '📊 Kuzey — Vega Seviye Kartı',
    botDescription: 'Sunucu içi metin ve ses aktifliği sıralamanız:',
    fields: [
      { name: 'Seviye', value: '`42`' },
      { name: 'Toplam XP', value: '`18.450 / 20.000 (%92)`' },
      { name: 'Sunucu Sıralaması', value: '`#1 / 400+ Kullanıcı`' },
    ],
    footer: 'Tema: Vega Nebula Moru',
  },
  {
    command: '.ai Merhaba Vega!',
    label: '.ai',
    category: 'Yapay Zeka',
    botTitle: '🤖 Vega AI (Gemini & Groq)',
    botDescription:
      'Merhaba! Ben Vega. Discord sunucunu yönetmene, kod yazmana, moderasyon sağlamanıza ve üyelerinle sohbet etmeye hazırım. Sana bugün nasıl yardımcı olabilirim?',
    fields: [
      { name: 'Model', value: '`Hibrit Gemini + Groq LPU`' },
      { name: 'Yanıt Süresi', value: '`0.38 saniye`' },
    ],
    footer: 'Sohbet geçmişini sıfırlamak için: .ai-sıfırla',
  },
  {
    command: '.bakiye',
    label: '.bakiye',
    category: 'Ekonomi',
    botTitle: '💰 Vega Coin Cüzdan Bilgisi',
    botDescription: 'Küresel ve sunucu içi ekonomi hesabınızın güncel durumu:',
    fields: [
      { name: 'Cüzdan', value: '`12.450 Vega Coin`' },
      { name: 'Banka Koruması', value: '`45.000 Vega Coin`' },
      { name: 'Günlük Ödül Serisi', value: '`7 Gün (2x Bonus Aktif)`' },
    ],
    footer: 'Günlük ödül için: .günlük',
  },
  {
    command: '.antiraid aktif',
    label: '.antiraid',
    category: 'Güvenlik',
    botTitle: '🛡️ Anti-Raid Koruma Kalkanı Aktif!',
    botDescription:
      'Sunucunuz olası bot/raid saldırılarına karşı yüksek güvenlik moduna alındı.',
    fields: [
      { name: 'Giriş Limiti', value: '`10 saniyede maks. 5 üye`' },
      { name: 'Phishing Filtresi', value: '`Aktif (Otomatik Engelleme)`' },
      { name: 'Yeni Hesap Denetimi', value: '`7 günden yeni hesaplar izleniyor`' },
    ],
    footer: 'Güvenlik durumu için: .güvenlik-durum',
  },
];

export const UPTIME_HISTORY_DATA = [
  { day: 'Pzt', uptime: 99.98, ping: 48 },
  { day: 'Sal', uptime: 99.95, ping: 51 },
  { day: 'Çar', uptime: 100.0, ping: 46 },
  { day: 'Per', uptime: 99.92, ping: 52 },
  { day: 'Cum', uptime: 99.99, ping: 49 },
  { day: 'Cmt', uptime: 99.96, ping: 50 },
  { day: 'Paz', uptime: 99.99, ping: 47 },
];

export const SHOWCASE_SERVERS: {
  id: string;
  name: string;
  category: string;
  members: string;
  initials: string;
  verified: boolean;
}[] = [];

export const TESTIMONIALS_DATA: {
  id: string;
  name: string;
  role: string;
  serverName: string;
  memberCount: string;
  comment: string;
  rating: number;
  avatarInitials: string;
}[] = [];

