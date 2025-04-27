/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          darkblue: "#0F172A",
        },
        borderRadius: {
          xl: "1rem",
          '2xl': "1.5rem"
        }
      },
    },
    plugins: [],
  };
  