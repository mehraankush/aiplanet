import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface100: '#f8f9fd',
        gray300:' #64607D',
        greenVariant: '#45924C',
        deepBlue: '#003145',
        darkBlue: '#002A3B',
        transparentYellow: '#F2C94C40',
        goldenYellow: '#FFCE5C',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
