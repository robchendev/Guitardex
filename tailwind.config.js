/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["PT Serif", "serif"],
    },
    colors: {
      white: "#fafafa",
      slate: "#e7edf3",
      transparent: "transparent",
      current: "currentColor",
      gold: "#FCDC97",
      // white: {
      //   soft: "#F7F7F7",
      //   hard: "#FFF",
      //   ghost: "#999",
      // },
      // grey: {
      //   soft: "#777",
      //   med: "#555",
      //   hard: "#303030",
      //   ghost: "#272727",
      //   dark: "#232323",
      // },
      // black: {
      //   soft: "#171717",
      //   hard: "#000",
      // },
      // carmine: {
      //   soft: "#B51C42",
      //   hard: "#901534",
      // },
      // purple: {
      //   soft: "#7C3AED",
      //   hard: "#6D28D9",
      // },
    },
  },
  plugins: [],
};
