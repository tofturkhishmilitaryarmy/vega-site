/**
 * @file tailwind.config.js
 * @description Vega Discord Bot tanıtım sitesi renk ve font yapılandırması.
 */

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        vega: {
          bg: '#0a0a0f',
          surface: '#12121a',
          primary: '#9B59B6',
          purple: '#8B5CF6',
          light: '#A78BFA',
          pale: '#C4B5FD',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
