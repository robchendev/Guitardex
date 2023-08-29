/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      fredoka: ["Fredoka", "sans"],
    },
    colors: {
      text: "var(--text)",
      bg: "var(--bg)",
      bg2: "var(--bg2)",
      grey: "var(--grey)",
      greyChecked: "var(--greyChecked)",
      ghost: "var(--ghost)",
      bgAlpha: "var(--bgAlpha)",
      link: "var(--link)",
      linkHover: "var(--linkHover)",
      tooltip: "var(--tooltip)",
      tooltipText: "var(--tooltipText)",
      purple: "#7C3AED",
      purpleHover: "#6D28D9",
      white: "#FAFAFA",
      whiteHard: "#fff",
      green: "#16A34A",
      yellow: "#F59E0B",
      red: "#E11D48",
    },
  },
  plugins: [],
};
