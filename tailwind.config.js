/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enables manual theme toggling via the 'dark' class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0f172a",   // Deepest Slate (Ink base) - PRESERVED
          slate: "#334155",   // Machinery Grey - PRESERVED
          orange: "#f97316",  // AGP Logo Orange - PRESERVED
          light: "#f1f5f9",   // Paper white (Cool/Digital) - PRESERVED
          ivory: "#F4EDE4",   // [NEW] Warm Ivory for textured backgrounds
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
}