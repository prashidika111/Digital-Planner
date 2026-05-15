/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: "#FFFDF5",
          card: "#FFF9E5",
        },
        pink: {
          bg: "#fbd6d2",
          DEFAULT: "#f48fb1",
        },
        green: {
          DEFAULT: "#e6eadf",
          dark: "#7a8a6f"
        },
        brown: {
          DEFAULT: "#e6cfc2",
          dark: "#5c4033",
          border: "#cfaea3"
        },
        text: {
          dark: "#3f4a3c"
        }
      },
      fontFamily: {
        sans: ['Fredoka', 'sans-serif'],
        typewriter: ['"Special Elite"', 'cursive'] 
      },
      boxShadow: {
        'soft': '0 10px 25px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
