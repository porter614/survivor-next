/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        pulse: {
          "0%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0.85,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
      animation: {
        "animate-pulse": "pulse 2s linear infinite",
      },
    },
  },
  plugins: [],
};
