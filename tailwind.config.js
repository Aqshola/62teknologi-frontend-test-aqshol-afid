/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ud-black": "#000000",
        "ud-white": "#ffffff",
        "ud-red": "#d82b2b",
        "ud-orange": "#ff7124",
        "ud-gray": "#99a9c7",
        "ud-blue": "#f1bf59",
        "ud-lightgreen": "#52a593",
      },
      fontFamily: {
        "ud-1": ["Pixelify Sans", "sans-serif"],
        "ud-2": ["VT323", "monospace"],
      },
    },
  },
  plugins: [],
};
