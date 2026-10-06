/**
 * @file features.ts
 * @description Vega Discord Bot'un öne çıkan 9 ana özelliğinin veri yapısı ve içerikleri.
 */

export interface FeatureItem {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName:
    | 'Brain'
    | 'Shield'
    | 'Star'
    | 'Ticket'
    | 'Music'
    | 'Gamepad2'
    | 'DollarSign'
    | 'FileText'
    | 'Crown';
  commandPreview: string;
  highlight: string;
}

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: 'ai',
    number: '01',
    title: 'Yapay Zeka',
    description:
      'Gemini ve Groq destekli akıllı sohbet motoru ile sorularınızı yanıtlar, kod yazar ve sunucu üyeleriyle doğal diyalog kurar.',
    iconName: 'Brain',
    commandPreview: '.ai <mesaj>',
    highlight: 'Gemini & Groq Destekli',
  },
  {
    id: 'security',
    number: '02',
    title: 'Güvenlik',
    description:
      'Anti-spam, anti-raid, küfür/reklam engelleme ve sahte phishing bağlantı koruması ile sunucunuzu 7/24 koruma altında tutar.',
    iconName: 'Shield',
    commandPreview: '.antiraid aktif',
    highlight: 'Otomatik Koruma Kalkanı',
  },
  {
    id: 'level',
    number: '03',
    title: 'Seviye Sistemi',
    description:
      'Ses ve metin aktifliğine göre XP kazanımı, özelleştirilebilir uzay temalı rank kartları ve sunucu içi liderlik tablosu sunar.',
    iconName: 'Star',
    commandPreview: '.rank @kullanıcı',
    highlight: 'Özel Rank Kartı',
  },
  {
    id: 'ticket',
    number: '04',
    title: 'Ticket Sistemi',
    description:
      'Tek tıkla butonlu destek talepleri oluşturun, kategori seçimi yapın ve konuşma geçmişini HTML/TXT olarak kayıt altına alın.',
    iconName: 'Ticket',
    commandPreview: '.ticket-kur',
    highlight: 'Butonlu & Transkriptli',
  },
  {
    id: 'music',
    number: '05',
    title: 'Müzik',
    description:
      'YouTube ve Spotify çalma listelerini kesintisiz ses kalitesiyle dinleyin; sıra yönetimi, ses filtreleri ve şarkı sözü desteği.',
    iconName: 'Music',
    commandPreview: '.oynat <şarkı adı>',
    highlight: 'YouTube + Spotify',
  },
  {
    id: 'fun',
    number: '06',
    title: 'Eğlence',
    description:
      'İnteraktif mini oyunlar, düellolar, kelime türetmece, bilgi yarışmaları ve gelişmiş çekiliş sistemleriyle aktifliği artırın.',
    iconName: 'Gamepad2',
    commandPreview: '.çekiliş-başlat',
    highlight: 'Oyunlar & Çekilişler',
  },
  {
    id: 'economy',
    number: '07',
    title: 'Ekonomi',
    description:
      'Küresel ve sunucu bazlı Vega Coin bakiyesi, günlük ödüller, banka transferleri, market ürünleri ve görevlerle rekabetçi ekonomi.',
    iconName: 'DollarSign',
    commandPreview: '.günlük • .bakiye',
    highlight: 'Bakiye & Günlük Ödül',
  },
  {
    id: 'logs',
    number: '08',
    title: 'Log Sistemi',
    description:
      'Mesaj silme/düzenleme, ses kanalı hareketleri, rol değişimleri, giriş-çıkış ve moderasyon işlemleri dahil 6 farklı log türü.',
    iconName: 'FileText',
    commandPreview: '.log-ayarla tümü',
    highlight: '6 Farklı Log Türü',
  },
  {
    id: 'roles',
    number: '09',
    title: 'Rol Yönetimi',
    description:
      'Yeni katılan üyelere otomatik rol (otorol), butonlu veya emojili reaksiyon-rol menüleri ve seviye ödül rolleri atayın.',
    iconName: 'Crown',
    commandPreview: '.otorol • .rol-menü',
    highlight: 'Otorol & Reaksiyon Rol',
  },
];
