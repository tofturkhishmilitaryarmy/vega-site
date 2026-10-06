/**
 * @file StarfieldCanvas.tsx
 * @description A1: Tüm sayfa boyunca hafif hareket eden ve mor tonlarında parlayan
 * 60fps optimize HTML5 Canvas yıldız/parçacık arka plan sistemi.
 */

import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';

interface StarParticle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  deltaAlpha: number;
  color: string;
}

const STAR_COLORS_DARK = ['#C4B5FD', '#A78BFA', '#9B59B6', '#EC4899', '#FFFFFF'];
const STAR_COLORS_LIGHT = ['#8B5CF6', '#9B59B6', '#7C3AED', '#A78BFA'];

export const StarfieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useAppContext();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const palette = theme === 'light' ? STAR_COLORS_LIGHT : STAR_COLORS_DARK;
    const count = Math.min(Math.floor((width * height) / 16000), 85);

    const stars: StarParticle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.7 + 0.5,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -Math.random() * 0.22 - 0.05,
      alpha: Math.random() * 0.65 + 0.15,
      deltaAlpha: (Math.random() * 0.008 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
      color: palette[Math.floor(Math.random() * palette.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha += s.deltaAlpha;

        if (s.alpha <= 0.12 || s.alpha >= 0.85) {
          s.deltaAlpha = -s.deltaAlpha;
        }

        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(0.9, s.alpha));
        ctx.fillStyle = s.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#9B59B6';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-75"
    />
  );
};
