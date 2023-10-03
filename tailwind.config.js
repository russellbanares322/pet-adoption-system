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
        orange: "#FE6F45",
        "soft-orange": "#FBDBA2",
        maroon: "#41272C",
        whitesmoke: "#F2F2F2",
      },
    },
  },
  plugins: [],
};
