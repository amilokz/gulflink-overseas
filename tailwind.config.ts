/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060f24',
          900: '#0a1f44',
          800: '#10294f',
          700: '#173a68',
          600: '#1f4d88',
          100: '#dbe4f3',
          50: '#eef2f9',
        },
        gold: {
          700: '#8a6d1a',
          600: '#a8861f',
          500: '#c9a227',
          400: '#d9b64a',
          300: '#e7cb7c',
          200: '#f3e2b3',
          100: '#faf3df',
        },
      },
    },
  },
  plugins: [],
};
