/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#0d1520",
          soft: "#1a2836",
          muted: "#3d4f5f",
        },
        fog: {
          DEFAULT: "#e8eef2",
          deep: "#d2dde5",
        },
        paper: "#f5f8fa",
        sea: {
          DEFAULT: "#1a6b62",
          bright: "#21867b",
          deep: "#0f4a44",
        },
        signal: {
          DEFAULT: "#c9851a",
          soft: "#f3e2c0",
        },
        brand: {
          950: "#0d1520",
          900: "#1a2836",
          800: "#243544",
        },
      },
      keyframes: {
        "step-enter": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "line-grow": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "step-enter": "step-enter 0.38s ease-out both",
        "fade-up": "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "line-grow": "line-grow 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(ellipse 80% 50% at 20% 0%, rgba(26, 107, 98, 0.22), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 10%, rgba(201, 133, 26, 0.12), transparent 45%)",
        "grain":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
