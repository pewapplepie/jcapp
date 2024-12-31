/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#fefeff",
          200: "rgba(0, 0, 0, 0.5)",
        },
        ayo: "#132743",
        white: "#fcfefe",
        wgray: "#f8f5f6",
        black: "#2b282a",
        blue: "#1e6fcb",
        darkslategray: "#262f3f",
        primary: "#6171fe",
        secondary: "#9f6afe",
        tertiary: "#b79dfe",
        primary_bright: "#7CF5FF",
        secondary_bright: "#00CCDD",
        tertiary_bright: "#4F75FF",
        highlight: "#ddd0fe",
        // light: "#fefefe",
        light: "#9cc3c4",
        dark: "#dc5354",
      },
      animation: {
        background: "background 2s ease-in-out infinite",
        linear: "backgroundLinear 3s linear infinite",
        slide:
          "backgroundSlide 120s linear infinite alternate-reverse forwards;",
      },
      keyframes: {
        background: {
          "0%, 100%": { backgroundPosition: "left 0% bottom 0%" },
          "50%": { backgroundPosition: "left 200% bottom 0%" },
        },
        backgroundLinear: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        backgroundSlide: {
          "0%": { backgroundPosition: "0 0%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      spacing: {},
      fontFamily: {
        inter: "Inter",
        inherit: "inherit",
        newsreader: "Newsreader",
      },
      borderRadius: {
        xl: "20px",
      },
      borderWidth: {
        DEFAULT: "2px",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
