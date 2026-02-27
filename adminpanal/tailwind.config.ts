import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#05070d',
        card: '#0f172a',
        primary: {
          DEFAULT: '#3b82f6',
          foreground: '#f8fafc',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(59, 130, 246, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
