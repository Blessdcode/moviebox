/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      blue: "#1fb6ff",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
      darkBlack: "#00040f",
      secondary: "#00f6ff",
      dimWhite: "rgba(255, 255, 255, 0.7)",
      dimBlue: "rgba(9, 151, 124, 0.1)",
    },

    fontFamily: {
      cursive: ["Itim", "cursive"],
      serif: ["Karla", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
