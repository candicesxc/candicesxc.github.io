/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8BA6A9',
        accent: '#F4A261',
        neutral: {
          light: '#F7F7F5',
          dark: '#333333',
        },
        secondary: {
          gray: '#D0CBC5',
          clay: '#E8DED2',
        },
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': '36px',
        'h2': '28px',
        'h3': '20px',
        'body': '16px',
        'small': '14px',
      },
      lineHeight: {
        'heading': '1.25',
        'body': '1.6',
      },
      borderRadius: {
        'card': '12px',
        'large': '16px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}
