/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["PT Serif", "serif"],
    },
    colors: {
      text: {
        light: "#1E293B",
        dark: "#E7E5E4",
      },
      slate: {
        light: "#E7EDF3",
        dark: "#1e1e1e",
      },
      purple: {
        light: "#7C3AED",
        dark: "#7C3AED",
      },
      bg2: {
        light: "#FAFAFA",
        dark: "#363636",
      },
      grey2: {
        light: "#CBD5E1",
        dark: "#737373",
      },
      bgAlpha: {
        light: "rgba(255,255,255,.4)",
        dark: "rgba(0,0,0,.4)",
      },
      link: {
        light: "#7C3AED",
        dark: "#C4B5FD",
      },
      linkHover: {
        light: "#fff",
        dark: "rgb(45,45,45)",
      },
      // tabimg: {
      //   light: 'brightness(1.017)',
      //   dark: 'invert(0.822) contrast(105%) brightness(115%)',
      // },
      // toggleName: {
      //   light: '"Dark Theme"',
      //   dark: '"Light Theme"',
      // },
      // moonIcon: {
      //   light: 'flex',
      //   dark: 'none',
      // },
      // sunIcon: {
      //   light: 'none',
      //   dark: 'flex',
      // },
      greyChecked: {
        light: "#9CA3AF",
        dark: "#6B7280",
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
      green: "#16A34A",
      yellow: "#F59E0B",
      red: "#E11D48",

      grey: {
        light: "#CBD5E1",
        dark: "#52525B",
      },
      ghost: {
        light: "#6B7280",
        dark: "#9CA3AF",
      },
    },
  },
  plugins: [],
};
