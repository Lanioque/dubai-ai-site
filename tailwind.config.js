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
      fontFamily: {
        space: ["'Space Grotesk'", "sans-serif"],
        inter: ["'Inter'", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "float-up": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
      },
      animation: {
        marquee:    "marquee 35s linear infinite",
        "float-1":  "float-up 4s ease-in-out infinite",
        "float-2":  "float-up 4s ease-in-out 1.3s infinite",
        "float-3":  "float-up 4s ease-in-out 2.6s infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            primary:   { DEFAULT: "#1A9DD9", foreground: "#FFFFFF" },
            secondary: { DEFAULT: "#A78BFA", foreground: "#FFFFFF" },
            warning:   { DEFAULT: "#D4A843", foreground: "#0D1B3E" },
            success:   { DEFAULT: "#10B981", foreground: "#FFFFFF" },
            danger:    { DEFAULT: "#EF4444", foreground: "#FFFFFF" },
          },
        },
      },
    }),
  ],
};
