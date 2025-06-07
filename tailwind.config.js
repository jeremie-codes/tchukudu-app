/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F7931E', // yellow-500
          dark: '#CA8A04',    // yellow-600
          light: '#FEF08A',   // yellow-200
        },
        secondary: {
          DEFAULT: '#22C55E', // green-500
          dark: '#16A34A',    // green-600
          light: '#BBF7D0',   // green-200
        },
        danger: {
          DEFAULT: '#EF4444', // red-500
          dark: '#DC2626',    // red-600
          light: '#FEE2E2',   // red-200
        }
      },
      fontFamily: {
        'montserrat': ['Montserrat_400Regular', 'sans-serif'],
        'montserrat-medium': ['Montserrat_500Medium', 'sans-serif'],
        'montserrat-bold': ['Montserrat_700Bold', 'sans-serif'],
      }
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")],

}