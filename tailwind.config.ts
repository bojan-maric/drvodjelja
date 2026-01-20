// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Drvo paleta boja
        wood: {
          DEFAULT: '#8B5A2B',  // Primarna smeđa
          light: '#D4A574',    // Svijetlo drvo / hrast
          dark: '#5C4033',     // Tamno drvo / orah
          darker: '#3D2B1F',   // Tekst
        },
        cream: '#FDF8F3',      // Pozadina
        // Aliases za lakše korištenje
        primary: {
          DEFAULT: '#8B5A2B',
          light: '#D4A574',
          dark: '#5C4033',
        },
        background: {
          DEFAULT: '#FFFFFF',
          alt: '#FDF8F3',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
