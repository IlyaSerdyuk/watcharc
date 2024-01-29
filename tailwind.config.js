/** @type {import('tailwindcss').Config} */
const tailwindСssConfig = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        xs: '400px',
        medium: { raw: '(min-height: 560px)' },
        tall: { raw: '(min-height: 800px)' },
      },
      gridTemplateColumns: {
        13: 'repeat(13, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};

module.exports = tailwindСssConfig;
