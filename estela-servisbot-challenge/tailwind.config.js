/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2047CE",
        primaryTransparency: "rgba(32,71,206,0.2)",
        secondary: "#fb7000",
        success: "#80cbc4",
        error: "#e57373",
        warning: "#ffe082",
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
          "max-width": "1200px",
          margin: "auto",
        },
        "@screen sm": {
          ".wrapper": {
            width: "85%",
          },
        },
        ".ellipsis": {
          "max-width": "200px",
          overflow: "hidden",
          "text-overflow": "ellipsis",
          "white-space": "nowrap",
        },
      })
    },
  ],
}
