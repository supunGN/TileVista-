import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        darkBg: "#0f172a",
        glassBg: "rgba(30, 41, 59, 0.4)",
        glassBorder: "rgba(255, 255, 255, 0.08)",
        indigoVibrant: "#4f46e5",
        blueVibrant: "#3b82f6",
        emeraldVibrant: "#10b981",
        roseVibrant: "#ef4444",
        primary: "#1A1A1A",
        secondary: "#D4C5B9",
        brandBlack: "#1A1A1A",
        brandSand: "#D4C5B9",
        brandLight: "#F9F9F7",
        brandGray: "#F3F3F1",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "premium": "0 10px 40px -10px rgba(0, 0, 0, 0.5)",
        "premium-glow": "0 0 50px -5px rgba(79, 70, 229, 0.35)",
      }
    },
  },
  plugins: [],
};
export default config;
