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
        primary: {
          default: '#FFD836',
          dark: '#FFD826',
        },
        dark: {
          lightest: '#FAFAFA',
          lighter: '#F1F1F1',
          light: '#303030',
          default: '#000000',
        },
      },
      transitionDuration: {
        default: '200ms',
      },
      animation: {
        'fast-pulse': 'fast-pulse 1s cubic-bezier(0.2, 0, 0.8, 1) infinite',
      },
    },
  },
  plugins: [],
};
export default config;
