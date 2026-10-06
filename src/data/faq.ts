/**
 * @file faq.ts
 * @description Vega Discord Bot hakkında sıkça sorulan 7 sorunun ve yanıtlarının veri listesi.
 * (Açık kaynak ifadeleri kaldırılmış, Vega'nın özel bulut altyapısı vurgulanmıştır.)
 */

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  commandHint?: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: 'Vega sunucuya nasıl eklenir?',
    answer:
      'Sayfanın sağ üst köşesindeki veya giriş bölümündeki "Botu Davet Et" butonuna tıklayarak Discord yetkilendirme ekranını açabilirsiniz. Yönetici yetkisine sahip olduğunuz sunucuyu seçip onaylamanız yeterlidir; Vega saniyeler içinde sunucunuza katılır.',
    commandHint: '/yardim',
  },
  {
    id: 2,
    question: 'Vega tamamen ücretsiz mi?',
    answer:
      'Evet, Vega tamamen ücretsizdir. Hiçbir gizli ücret, premium özellik veya kısıtlama yoktur. Tüm komutlar herkese açıktır.',
  },
  {
    id: 3,
    question: 'Hangi komutlar var ve nasıl görebilirim?',
    answer:
      "183+ komut 15 kategoride sunulur. Komut listesi bölümünden veya Discord'da .yardim (veya /yardim) yazarak tüm komutları görebilirsiniz.",
    commandHint: '.yardim veya /yardim',
  },
  {
    id: 4,
    question: 'Sorun yaşarsam nasıl destek alırım?',
    answer:
      'Discord destek sunucumuza katılarak veya doğrudan @rayttx üzerinden iletişime geçerek anında yardım alabilirsiniz. Ayrıca site üzerindeki gerçek zamanlı Webhook iletişim formunu da kullanabilirsiniz.',
    commandHint: '.davet',
  },
  {
    id: 5,
    question: 'Bot nasıl çalışır? Prefix mi yoksa Slash (/) komutları mı?',
    answer:
      'Vega hibrit altyapıya sahiptir. Tüm komutlar . prefixi ile çalışır (.ping, .ban, .rank). Sadece /yardim slash komut olarak kullanılabilir. /yardim yazarak tüm komutlara erişebilirsiniz.',
    commandHint: '/yardim • .ping • .ban • .rank',
  },
  {
    id: 6,
    question: 'Sunucu verilerim güvende mi?',
    answer:
      'Evet, tüm veriler izole ve şifreli SQLite veritabanı mimarisinde saklanır. Üçüncü taraf servislere veri aktarımı yoktur. Sunucu ayarlarınız tamamen size aittir.',
  },
  {
    id: 7,
    question: 'Vega 7/24 kesintisiz çalışıyor mu?',
    answer:
      'Evet, Vega yüksek performanslı özel bulut sunucularında 7/24 kesintisiz olarak barındırılmaktadır. Sizin herhangi bir sunucu kurmanıza veya barındırma işlemi yapmanıza gerek yoktur; davet ettiğiniz andan itibaren %99.9 uptime ile çalışır.',
    commandHint: '.uptime • .ping',
  },
];
