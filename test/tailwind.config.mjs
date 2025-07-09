import type { Config } from 'tailwindcss';

const gold = '#D4AF37';
const black = '#111111';
const white = '#FFFFFF';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold,
        black,
        white,
        accent: gold,
        background: white,
        'background-dark': black,
      },
      fontFamily: {
        header: ['Montserrat', 'Poppins', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        glass: '8px',
      },
      backgroundImage: {
        'luxury-pattern': "url('/luxury-bg.webp')",
      },
      transitionProperty: {
        'height': 'height',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};

export default config;
