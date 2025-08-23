/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#165CDE",
        primaryLight: "#CADDFF",
        midnight: "#092456",
      },
      boxShadow: {
        card: "0 20px 40px rgba(0,0,0,.35)",
      },
      borderRadius: {
        "3.5xl": "32px",
      },
    },
  },
  plugins: [],
};
