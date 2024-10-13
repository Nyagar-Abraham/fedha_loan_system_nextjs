import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark100: "#212529",
        dark90: "#343a40",
        dark80: "#495057",
        dark70: "#868e96",
        dark60: "#adb5bd",
        dark50: "#ced4da",
        dark40: "#dee2e6",
        dark30: "#e9ecef",
        dark20: "#f1f3f5",
        dark10: "#f8f9fa",

        orange100: "#d9480f",
        orange90: "#e8590c",
        orange80: "#f76707",
        orange70: "#fd7e14",
        orange60: "#ff922b",
        orange50: "#ffa94d",
        orange40: "#ffc078",
        orange30: "#ffd8a8",
        orange20: "#ffe8cc",
        orange10: "#fff4e6",

        green100: "#2b8a3e",
        green90: "#2f9e44",
        green80: "#37b24d",
        green70: "#40c057",
        green60: "#51cf66",
        green50: "#69db7c",
        green40: "#8ce99a",
        green30: "#b2f2bb",
        green20: "#d3f9d8",
        green10: "#ebfbee",

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
