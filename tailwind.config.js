/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    // TODO: Set theme
    colors: {
      transparent: "transparent",
      current: "currentColor",
      gold: "#FCDC97",
      white: {
        soft: "#F7F7F7",
        hard: "#FFF",
      },
      grey: {
        soft: "#777",
        hard: "#555",
      },
      black: {
        soft: "#171717",
        hard: "#000",
      },
      carmine: {
        soft: "#B51C42",
        hard: "#901534",
      },
      purple: {
        soft: "#7C3AED",
        hard: "#6D28D9",
      },
    },
  },
  plugins: [],
};
