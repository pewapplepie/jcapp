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
        white: "#fff",
        black: "#000",
        blue: "#4b12f8",
        darkslategray: "#262f3f",
        primary: '#6171fe',
        secondary: '#9f6afe',
        tertiary: '#b79dfe',
        highlight: '#ddd0fe',
        light: '#fefefe',
        dark: '#6658fe',
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
    },
  },
  corePlugins: {
    preflight: false,
  },
};
