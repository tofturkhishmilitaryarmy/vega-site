/**
 * @file BlogSection.tsx
 * @description Görsel 4 (GPT-X "Articles & resources" + "Subscribe to our newsletter")
 * ile birebir aynı mimari ve görsel düzen:
 * - Üstte "Makaleler & Kaynaklar" başlığı ve sağda "Ara" kapsül butonu bulunan arama kutusu
 * - Sol tarafta büyük öne çıkan makale kartı (içinde ızgaralı karanlık UI diyagramı + V rozeti),
 *   sağ tarafta 2 adet yatay kompakt makale kartı
 * - Alt kısımda mor-mavi ışıltılı "Güncellemelerden Haberdar Olun" bülten / duyuru aboneliği alanı
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, CheckCircle2 } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/communityData';

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [articleSearch, setArticleSearch] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filteredPosts = useMemo(() => {
    const q = articleSearch.trim().toLowerCase();
    if (!q) return BLOG_POSTS;
    return BLOG_POSTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [articleSearch]);

  const featuredPost = filteredPosts[0] || BLOG_POSTS[0];
  const sidePosts = filteredPosts.slice(1);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <section id="blog" className="py-24 relative bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Üst Başlık + Sağ Arama Kutusu (Görsel 4 "Articles & resources" Düzeni) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Makaleler &amp; Kaynaklar
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/60 max-w-xl leading-relaxed">
              Vega güncellemeleri, sunucu güvenliği mimarisi ve topluluk yönetimi rehberlerini inceleyin.
            </p>
          </div>

          {/* Görsel 4'teki İçinde Beyaz "Ara" Butonu Olan Kapsül Arama Kutusu */}
          <div className="w-full md:w-80 rounded-full bg-[#0d0d14] border border-white/15 p-1.5 flex items-center">
            <input
              type="text"
              value={articleSearch}
              onChange={(e) => setArticleSearch(e.target.value)}
              placeholder="Makalelerde ara..."
              aria-label="Makalelerde ara"
              className="flex-1 bg-transparent px-4 py-1.5 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => {}}
              className="px-5 py-2 text-xs btn-white-pill cursor-pointer shrink-0"
            >
              Ara
            </button>
          </div>
        </motion.div>

        {/* Görsel 4'teki Asimetrik Makale Düzeni: Sol Büyük Kart + Sağ 2 Yatay Kart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sol: Büyük Öne Çıkan Makale */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            onClick={() => setSelectedPost(featuredPost)}
            className="lg:col-span-6 group cursor-pointer space-y-5"
          >
            {/* Görsel 4'teki Karanlık Izgaralı Diyagram Küp Görseli */}
            <div className="vega-card vega-grid-bg h-64 sm:h-72 p-6 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.22),transparent_70%)]" />

              {/* Üst Küçük Komut Kutusu */}
              <div className="relative z-10 w-36 h-10 rounded-lg bg-black/80 border border-white/10 mb-5 flex flex-col justify-center px-3 gap-1">
                <span className="w-16 h-1.5 rounded bg-white/30" />
                <span className="w-24 h-1.5 rounded bg-white/15" />
              </div>

              {/* Ortada Parlayan 'V' İkonu ve Yanlarda Karanlık Modül Kareleri */}
              <div className="relative z-10 grid grid-cols-3 gap-3 items-center">
                <div className="w-11 h-11 rounded-xl bg-black/80 border border-white/10" />
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center text-white font-display font-extrabold text-xl shadow-[0_0_30px_rgba(139,92,246,0.75)]">
                  V
                </div>
                <div className="w-11 h-11 rounded-xl bg-black/80 border border-white/10" />
                <div className="w-11 h-11 rounded-xl bg-black/80 border border-white/10" />
                <div className="w-11 h-11 rounded-xl bg-black/80 border border-white/10" />
                <div className="w-11 h-11 rounded-xl bg-black/80 border border-white/10" />
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-white/60">
                <span className="text-white font-medium">{featuredPost.category}</span>
                <span>|</span>
                <span>{featuredPost.date}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white group-hover:text-[#C4B5FD] transition-colors leading-snug">
                {featuredPost.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {featuredPost.excerpt}
              </p>
            </div>
          </motion.article>

          {/* Sağ: 2 Adet Yatay Kompakt Makale Kartı (Görsel 4 Sağ Sütun) */}
          <div className="lg:col-span-6 divide-y divide-white/10">
            {sidePosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (idx + 1) * 0.08 }}
                onClick={() => setSelectedPost(post)}
                className={`group cursor-pointer flex flex-col sm:flex-row items-start sm:items-center gap-6 ${
                  idx === 0 ? 'pb-8' : 'pt-8'
                }`}
              >
                {/* Küçük Karanlık UI Thumbnail */}
                <div className="w-full sm:w-44 h-36 vega-card vega-grid-bg shrink-0 flex items-center justify-center relative overflow-hidden p-4">
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-[#8B5CF6]/30 blur-xl" />
                  <div className="w-full h-full rounded-xl bg-black/80 border border-white/10 p-3 flex flex-col justify-between">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                      <span className="w-10 h-1.5 rounded bg-white/25" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="w-full h-2 rounded bg-gradient-to-r from-[#8B5CF6]/50 to-[#3B82F6]/50" />
                      <div className="w-2/3 h-2 rounded bg-white/15" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <span className="text-white font-medium">{post.category}</span>
                    <span>|</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-[#C4B5FD] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Görsel 4 Alt Kısım: Mor Radyal Işıltılı Bülten / Güncelleme Aboneliği Banner'ı */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-24 relative rounded-3xl border border-white/10 bg-[#07070c] px-6 py-16 sm:py-20 text-center overflow-hidden"
        >
          {/* Merkez Mor-Mavi Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.28)_0%,rgba(37,99,235,0.1)_45%,transparent_75%)] pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h3 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Yeni Sürümlerden Haberdar Olun
            </h3>
            <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
              Vega v3.5 yol haritası, yeni eklenen komutlar ve güvenlik güncellemeleri yayınlandığında anında bildirim alın.
            </p>

            {subscribed ? (
              <div className="pt-3 inline-flex items-center gap-2 text-sm text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Bülten aboneliğiniz başarıyla kaydedildi!</span>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="mt-6 max-w-md mx-auto rounded-full bg-black/90 border border-white/15 p-1.5 flex items-center shadow-xl"
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="E-posta adresinizi girin"
                  aria-label="E-posta adresinizi girin"
                  className="flex-1 bg-transparent px-4 py-2 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs sm:text-sm btn-white-pill cursor-pointer shrink-0"
                >
                  Abone Ol
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      {/* Makale Detay Modalı */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="max-w-2xl w-full vega-card p-6 sm:p-8 shadow-2xl space-y-5 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#A78BFA] mb-1.5">
                  <span>{selectedPost.category}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1 text-white/60">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedPost.date}
                  </span>
                </div>
                <h3
                  id="blog-modal-title"
                  className="font-display text-xl sm:text-2xl font-bold text-white"
                >
                  {selectedPost.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                aria-label="Kapat"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-white/85 leading-relaxed">
              {selectedPost.content.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="px-6 py-2.5 text-xs sm:text-sm btn-white-pill cursor-pointer"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
