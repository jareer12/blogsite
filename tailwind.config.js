/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*/*.{html,js,svelte}",
    "./src/*.{html,js,svelte}",
    "./public/*.{html,js,svelte}",
  ],
  theme: {
    extend: {
      colors: {
        picton: {
          DEFAULT: "#3AA4F1",
          50: "#7AC2F6",
          100: "#73BEF5",
          200: "#65B8F4",
          300: "#57B1F3",
          400: "#48ABF2",
          500: "#3AA4F1",
          600: "#2C9DF0",
          700: "#1D97EF",
          800: "#1190EC",
          900: "#1087DE",
        },
        steel: {
          DEFAULT: "#1E1F2E",
          50: "#393B58",
          100: "#363853",
          200: "#30324A",
          300: "#2A2B41",
          400: "#242537",
          500: "#1E1F2E",
          600: "#181925",
          700: "#12131B",
          800: "#0C0C12",
          900: "#060609",
        },
      },
    },
  },
  plugins: [],
};
