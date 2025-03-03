/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}" // If using Next.js App Router
    ],
    theme: {
      extend: {
        fontFamily: {
          garamond: ["'EB Garamond'", "serif"],
        },
      },
    },
    plugins: [],
  };