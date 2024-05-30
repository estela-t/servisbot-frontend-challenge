/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2047CE",
        secondary: "#fb7000",
        success: "#009688",
        error: "#e53935",
        warning: "#ffc107",
        mainBg: "#f9f4f1",
        primaryText: "#232426",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".wrapper": {
          width: "90%",
          "max-width": "1400px",
          margin: "auto",
        },
      })
    },
  ],
}
