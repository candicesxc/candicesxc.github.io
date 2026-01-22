/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#B7C3F3', // Soft periwinkle
        surface: '#4F6272',    // Muted slate (Secondary/Containers)
        primary: '#DD7596',    // Dusty rose (Accent 1 - Buttons/Links)
        highlight: '#CF1259',  // Deep raspberry (Accent 2 - Highlight/Bold)
        text: '#404E5C',       // Dark navy
        neutral: {
          light: '#F7F7F5',
          dark: '#333333',
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
