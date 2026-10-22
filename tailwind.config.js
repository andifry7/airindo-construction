/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#1261d9", light: "#3b82f0", navy: "#0b2557", deep: "#04214d", ink: "#0f2447", muted: "#5b6b86" },
      },
      fontFamily: { sans: ["var(--font-inter)", "system-ui", "sans-serif"] },
      boxShadow: { card: "0 4px 18px rgba(15, 36, 71, 0.08)" },
    },
  },
  plugins: [],
};
