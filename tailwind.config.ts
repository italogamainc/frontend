import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#E8F4FA",
          100: "#D0E9F5",
          200: "#A1D4EB",
          300: "#71BFDF",
          400: "#4EA8DE",
          500: "#1E6F9F",
          600: "#2887BF",
          700: "#1B5C7F",
          800: "#144663",
          900: "#0D2E42",
        },
        secondary: {
          50: "#F2F3FC",
          100: "#E3E4F9",
          200: "#C6C8F2",
          300: "#A9ABEB",
          400: "#7E80E4",
          500: "#5E60CE",
          600: "#4A4CA7",
          700: "#3A3C84",
          800: "#2B2D63",
          900: "#1B1C42",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
