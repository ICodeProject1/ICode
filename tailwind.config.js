/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    keyframes: {
      fadeIn: {
        "0%, 100%": { opacity: "0" },
        "50%": { opacity: "1" },
      },
      moveUpDown: {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-10px)" },
      },
    },
    animation: {
      fadeIn: "fadeIn 3s ease-in-out infinite",
      moveUpDown: "moveUpDown 3s ease-in-out infinite",
    },
  },
  plugins: [],
};
