import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gym: {
          bg: "#0B0C0E",
          card: "#13151A",
          cardHover: "#1A1D24",
          border: "#232730",
          borderLight: "#2F3543",
          accent: "#CCFF00",
          accentHover: "#B5E600",
          accentMuted: "rgba(204, 255, 0, 0.12)",
          textPrimary: "#F3F4F6",
          textMuted: "#8E95A5",
          danger: "#FF4545",
          dangerMuted: "rgba(255, 69, 69, 0.15)",
          success: "#22C55E",
        },
      },
      fontFamily: {
        display: ["var(--font-oswald)", "Oswald", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
