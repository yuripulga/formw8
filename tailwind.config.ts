import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          900: "#064e3b",
          950: "#022c22",
        },
      },
      borderRadius: {
        card: "1.5rem",
        input: "1rem",
        btn: "0.875rem",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        btn: "var(--shadow-btn)",
        glow: "var(--shadow-glow)",
      },
    },
  },
  plugins: [],
};

export default config;
