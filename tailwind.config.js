/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#FB8B24",
        red: "#FF6868",
        secondary: "#555",
        prigmayBG: "#FCFCFC",
      },
    },
  },
  plugins: [require("daisyui")],
};

