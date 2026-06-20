import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0F',
      },
      fontFamily: {
        clash: ['Clash Display', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(245, 158, 11, 0.6)' },
        },
        'pulse-amber': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        'pulse-amber': 'pulse-amber 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
