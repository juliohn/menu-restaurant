import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        header: "var(--header-color)",
        brown500: "#4f372f",

        black1: "#121212",
        black2: "#2C2C2C",

        gray40: "#464646",
        gray30: "#5F5F5F",
        gray20: "#8a94a4",
        gray10: "#dadada",
        gray5: "#eeeeee",
        blue10: " #f8F9fa",

        white: "#ffffff",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        ":root": {
          "--primary": "#4F372F",
          "--header": "#4F372F",
        },
      });
    }),
  ],
};
export default config;
