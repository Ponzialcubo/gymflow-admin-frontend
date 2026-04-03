/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mapeamos los colores de GymFlow para poder usarlos como clases
        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
        },
        slate: {
          800: "var(--slate-800)",
          900: "var(--slate-900)",
        },
        main: "var(--bg-main)",
        border: "var(--border)",
      }
    },
  },
  plugins: [],
}