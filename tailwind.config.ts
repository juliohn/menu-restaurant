import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        // primary: "var(--primary-color)",
        primary: "#4F372F",
        brown500: "#4F372F",
        black: "#121212",
        gray40: "#464646",
        gray30: "#5F5F5F",
        gray20: "#8A94A4",
        gray10: "#dadada",
        gray5: "#EEEEEE",
        gradient: "#36231C",
        blue10: " #F8F9FA",

        white: "#ffffff",
      },
    },
  },
  plugins: [],
};
export default config;
