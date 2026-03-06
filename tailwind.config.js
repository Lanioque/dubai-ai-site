const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#09090B",
        surface: "#111113",
        elevated: "#18181B",
        "b-subtle": "#27272A",
        "b-hover": "#3F3F46",
        "t-primary": "#FAFAFA",
        "t-secondary": "#A1A1AA",
        "t-tertiary": "#71717A",
        accent: "#3B82F6",
        "accent-glow": "#60A5FA",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "mesh-drift": {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0, 0) scale(1)" },
        },
        "mesh-drift-2": {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-40px, 30px) scale(1.15)" },
          "66%": { transform: "translate(25px, -35px) scale(0.95)" },
          "100%": { transform: "translate(0, 0) scale(1)" },
        },
      },
      animation: {
        marquee: "marquee 45s linear infinite",
        "mesh-1": "mesh-drift 20s ease-in-out infinite",
        "mesh-2": "mesh-drift-2 25s ease-in-out infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            primary: { DEFAULT: "#3B82F6", foreground: "#FFFFFF" },
            secondary: { DEFAULT: "#60A5FA", foreground: "#FFFFFF" },
          },
        },
      },
    }),
  ],
};
