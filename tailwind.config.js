/** @type {import('tailwindcss').Config} */
const tailwindСssConfig = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        xs: '400px',
      },
      gridTemplateColumns: {
        13: 'repeat(13, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};

module.exports = tailwindСssConfig;
