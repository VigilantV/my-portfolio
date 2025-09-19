/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      midDesk: { max: "1381px" },
      tablet: { max: "1000px" },
      mobile: { max: "530px" },
    },
    extend: {
      fontSize: {
        sml: ["0.9rem", "1.25rem"],
        xsml: ["0.83rem", "1.25rem"],
      },
    },
  },
  plugins: [],
};
