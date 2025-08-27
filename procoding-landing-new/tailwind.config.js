/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
            primary: '#F28237',
            secondary: '#D726B3',
            lightBg: '#f5f5f5',
            darkBg: '#0e0e0e',
        },
        fontFamily: {
            sans: ["var(--font-open-sans)", "sans-serif"],
          },
      },
    },
    plugins: [],
  };