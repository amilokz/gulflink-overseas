/** @type {import('next').Config} */
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
          850: '#0d2550',
          800: '#10294f',
          700: '#173a68',
          600: '#1f4d88',
          500: '#2b5f9e',
          400: '#4a6ea0',
          300: '#93a8c9',
          200: '#c9d5ea',
          100: '#dbe4f3',
          50: '#eef2f9',
        },
        gold: {
          900: '#5e4a10',
          800: '#7a6115',
          700: '#8a6d1a',
          600: '#a8861f',
          500: '#c9a227',
          400: '#d9b64a',
          300: '#e7cb7c',
          200: '#f3e2b3',
          100: '#faf3df',
          50: '#fdfaf0',
        },
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
        ],
      },
    },
  },
  plugins: [],
};
