/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          obsidian: '#080808',
          dark: '#111111',
          surface: '#171717',
          card: '#1c1c1c',
          border: '#262626',
          borderLight: '#404040',
          muted: '#808080',
          silver: '#d4d4d8',
          light: '#f4f4f5',
          bone: '#f7f7f7',
          white: '#ffffff',
          accent: '#ffffff',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        heading: ['Bebas Neue', 'Archivo Narrow', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      }
    },
  },
  plugins: [],
}
