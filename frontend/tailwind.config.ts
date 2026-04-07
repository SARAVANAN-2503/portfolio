import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0a0f1e',
          50: '#e8ecf4',
          100: '#c5cee3',
          200: '#8b9dc2',
          400: '#2d3f6b',
          600: '#141c35',
          700: '#111827',
          800: '#0e1322',
          900: '#0a0f1e',
          950: '#070b16',
        },
        accent: {
          DEFAULT: '#f59e0b',
          dim: 'rgba(245, 158, 11, 0.15)',
          hover: '#fbbf24',
          muted: 'rgba(245, 158, 11, 0.08)',
        },
        terminal: '#4ade80',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Menlo', 'monospace'],
      },
      backgroundImage: {
        'dot-grid':
          'radial-gradient(circle, rgba(148, 163, 184, 0.07) 1px, transparent 1px)',
        'glow-radial':
          'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(245, 158, 11, 0.08), transparent)',
      },
      backgroundSize: {
        'dot-grid': '24px 24px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out both',
        'slide-up': 'slideUp 0.6s ease-out both',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
