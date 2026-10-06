/**
 * @file App.tsx
 * @description Vega Discord Bot & Platformu Tanıtım Sitesi (Landing Page) ana bileşeni.
 * Scale AI ve Framer ilhamlı koyu (Pitch Black #000000) tema, mor-mavi neon ışımalar ve
 * cam efektli (glassmorphism) bileşenlerle tüm bölümleri birleştirir.
 */

import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { StarfieldCanvas } from './components/StarfieldCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Commands } from './components/Commands';
import { CommandSimulator } from './components/CommandSimulator';
import { Screenshots } from './components/Screenshots';
import { ComparisonTable } from './components/ComparisonTable';
import { Stats } from './components/Stats';
import { TestimonialsAndServers } from './components/TestimonialsAndServers';
import { RoadmapAndChangelog } from './components/RoadmapAndChangelog';
import { BlogSection } from './components/BlogSection';
import { FAQ } from './components/FAQ';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { GlobalOverlays } from './components/GlobalOverlays';

export default function App() {
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    if (path !== '/' && path !== '/index.html') {
      setIsNotFound(true);
    }

    // İstemci & Sunucu 7/24 Keep-Alive Heartbeat
    const heartbeat = window.setInterval(() => {
      fetch('/api/health').catch(() => {});
    }, 3 * 60 * 1000);

    return () => window.clearInterval(heartbeat);
  }, []);

  if (isNotFound) {
    return (
      <div className="min-h-screen bg-black text-[#e5e5e5] flex flex-col items-center justify-center px-4 text-center">
        <div className="font-mono text-xs uppercase tracking-widest text-[#A78BFA] mb-2">
          HATA KODU · 404
        </div>
        <h1 className="font-display text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-[#9B59B6] via-[#8B5CF6] to-[#60A5FA] bg-clip-text text-transparent">
          Yörünge Dışı
        </h1>
        <p className="mt-4 text-base text-[#9ca3af] max-w-md">
          Aradığınız sayfa uzay boşluğunda kaybolmuş görünüyor. Vega ana sayfasına dönerek keşfe devam edebilirsiniz.
        </p>
        <button
          type="button"
          onClick={() => {
            window.history.pushState({}, '', '/');
            setIsNotFound(false);
          }}
          className="mt-8 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#9B59B6] to-[#3B82F6] text-white text-sm font-semibold shadow-[0_0_25px_rgba(139,92,246,0.5)] cursor-pointer"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  return (
    <AppProvider>
      <div className="min-h-screen bg-black text-[#e5e5e5] flex flex-col selection:bg-[#9B59B6]/30 selection:text-white relative">
        <StarfieldCanvas />
        <Navbar />
        <main className="flex-1 relative z-10">
          <Hero />
          <Features />
          <Commands />
          <CommandSimulator />
          <Screenshots />
          <ComparisonTable />
          <Stats />
          <TestimonialsAndServers />
          <RoadmapAndChangelog />
          <BlogSection />
          <FAQ />
          <About />
          <Contact />
        </main>
        <Footer />
        <GlobalOverlays />
      </div>
    </AppProvider>
  );
}
