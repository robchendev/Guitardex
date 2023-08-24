/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      fredoka: ["Fredoka", "sans"],
    },
    colors: {
      text: {
        light: "#1E293B",
        dark: "#E7E5E4",
      },
      bg: {
        light: "#E7EDF3",
        dark: "#1e1e1e",
      },
      bg2: {
        light: "#FAFAFA",
        dark: "#363636",
      },
      grey: {
        light: "#CBD5E1",
        dark: "#737373",
        dark2: "#52525B",
      },
      greyChecked: {
        light: "#9CA3AF",
        dark: "#6B7280",
      },
      ghost: {
        light: "#6B7280",
        dark: "#9CA3AF",
      },
      bgAlpha: {
        light: "rgba(255,255,255,.4)",
        dark: "rgba(0,0,0,.4)",
      },
      purple: "#7C3AED",
      link: {
        light: "#7C3AED",
        dark: "#C4B5FD",
      },
      linkHover: {
        light: "#fff",
        dark: "rgb(45,45,45)",
      },
      tooltip: {
        light: "rgba(139, 92, 246, 0.3)",
        dark: "rgba(139, 92, 246, 0.5)",
      },
      tooltipText: {
        light: "#F1F5F9",
        dark: "rgb(45,45,45)",
      },
      white: "#FAFAFA",
      whiteHard: "#fff",
      green: "#16A34A",
      yellow: "#F59E0B",
      red: "#E11D48",
    },
  },
  plugins: [],
};
