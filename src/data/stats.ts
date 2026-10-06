/**
 * @file stats.ts
 * @description Vega Discord Bot'un canlı istatistik verileri, güncellenebilir Discord davet/destek bağlantıları
 * ve @rayttx yönetici iletişim yapılandırması.
 */

export interface StatMetric {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  decimals?: number;
  description: string;
}

const envSupportUrl =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_DISCORD_SUPPORT_URL
    ? import.meta.env.VITE_DISCORD_SUPPORT_URL
    : 'https://discord.com/invite/Hh2yYqk6m';

const envWebhookUrl =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_DISCORD_WEBHOOK_URL
    ? import.meta.env.VITE_DISCORD_WEBHOOK_URL
    : '';

export const BOT_LINKS = {
  inviteUrl:
    'https://discord.com/oauth2/authorize?client_id=1527692118586425384&permissions=8&scope=bot%20applications.commands',
  supportServerUrl: envSupportUrl,
  developerHandle: '@rayttx',
  developerDiscordUrl: envSupportUrl,
  defaultWebhookUrl: envWebhookUrl,
};

export const HERO_STATS = [
  { label: 'Aktif Sunucu', value: '10+' },
  { label: 'Toplam Kullanıcı', value: '400+' },
  { label: 'Hazır Komut', value: '183' },
  { label: 'Kesintisiz Uptime', value: '%99.9' },
];

export const DETAILED_STATS: StatMetric[] = [
  {
    id: 'servers',
    label: 'Sunucu Sayısı',
    value: 10,
    suffix: '+',
    description: 'Aktif olarak korunan ve yönetilen topluluklar',
  },
  {
    id: 'users',
    label: 'Kullanıcı Sayısı',
    value: 400,
    suffix: '+',
    description: 'Vega komutlarıyla etkileşime geçen üyeler',
  },
  {
    id: 'commands',
    label: 'Komut Sayısı',
    value: 183,
    suffix: '',
    description: '15 kategoride zengin yönetim ve eğlence aracı',
  },
  {
    id: 'uptime',
    label: 'Uptime Oranı',
    value: 99.9,
    prefix: '%',
    suffix: '',
    decimals: 1,
    description: '7/24 kesintisiz bulut çalışma performansı',
  },
  {
    id: 'ping',
    label: 'Ortalama Ping',
    value: 50,
    suffix: 'ms',
    description: 'Düşük gecikmeli anlık WebSocket tepki süresi',
  },
];
