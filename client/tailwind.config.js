/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'mozilla': ['"Mozilla Text"', 'sans-serif'],
      },
      colors: {
        'custom-bg': '#f5f6ee',
        'primary-text': '#1a1a18',
        'secondary-text': '#757571',
        'accent-brown': '#736d5d',
        'accent-yellow': '#ffc219',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '6': 'repeat(6, minmax(0, 1fr))',
        '8': 'repeat(8, minmax(0, 1fr))',
        '10': 'repeat(10, minmax(0, 1fr))',
        '12': 'repeat(12, minmax(0, 1fr))',
        '13': 'repeat(13, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
} 