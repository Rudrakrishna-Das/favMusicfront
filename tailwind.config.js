/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "green-1": "rgb(141, 236, 180,0.6)",
      },
    },
  },
  plugins: [],
};
