/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#fdf0d5', // Papaya Whip
        text: '#003049',       // Deep Space Blue
        primary: '#780000',    // Molten Lava
        secondary: '#669bbc',  // Steel Blue
        accent: '#c1121f',     // Flag Red
        surface: '#669bbc',    // Using Steel Blue for some surface/borders
      },
      fontFamily: {
        heading: ['DynaPuff', 'cursive'],
        body: ['Lexend', 'sans-serif'],
      },
      fontSize: {
        'h1': '4rem',
        'h2': '3rem',
        'h3': '2rem',
        'body': '1.125rem',
        'small': '0.875rem',
      },
      lineHeight: {
        'heading': '1.1',
        'body': '1.6',
      },
      borderRadius: {
        'card': '12px',
        'large': '16px',
      },
    },
  },
  plugins: [],
}
