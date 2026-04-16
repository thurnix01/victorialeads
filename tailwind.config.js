/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "step-enter": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "step-enter": "step-enter 0.38s ease-out both",
      },
      colors: {
        brand: {
          950: "#0c1e2e",
          900: "#132f45",
          800: "#1a3d56",
        },
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(ellipse 90% 60% at 50% -25%, rgba(13, 148, 136, 0.18), transparent 55%), radial-gradient(ellipse 60% 45% at 100% 0%, rgba(19, 47, 69, 0.08), transparent 50%)",
      },
    },
  },
  plugins: [],
}

