/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#A855F7',
          orange: '#F97316',
        },
        fontFamily: {
            sans: ["var(--font-open-sans)", "sans-serif"],
          },
      },
    },
    plugins: [],
  };