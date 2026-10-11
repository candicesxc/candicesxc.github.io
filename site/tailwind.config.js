/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        ink: 'var(--ink)',
        card: 'var(--card)',
        line: 'var(--line)',
        muted: 'var(--muted)',
        pop: 'var(--pop)',
      },
      fontFamily: {
        display: ['Namdhinggo', 'Georgia', 'serif'],
        script: ['"Story Script"', 'cursive'],
        mono: ['"DM Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
