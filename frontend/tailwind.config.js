/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bree: ["Bree Serif", "serif"],
        exo: ["Exo", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        primary: "#352F44",
        secondary: "#5C5470",
        accent: "#B9B4C7",
        background: "#FAF0E6",
        purple: "#90a8ed",
        blue: "#23a094",
      },

      boxShadow: {
        dark: "3px 4px 0px 1px rgba(0, 0, 0)",
      },
      translate: {
        "-0.25rem": "-0.25rem",
      },
    },
  },
  plugins: [],
};
