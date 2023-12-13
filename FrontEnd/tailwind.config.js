/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: [
    {
      myThemes : {
        "navy" : "#0C356A"
      }
    }
  ],
  plugins: [require("daisyui")],
} 