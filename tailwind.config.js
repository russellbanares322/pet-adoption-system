/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        karla: ["Karla", "sans-serif"],
      },
      colors: {
        "dark-blue": "#000928",
        "soft-pink": "#F45E84",
        pink: "",
      },
    },
  },
  plugins: [],
};
