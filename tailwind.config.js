const colors = require("tailwindcss/colors")

module.exports = {
    mode: "jit",
    purge: ['./src/pages/*.{js,ts,jsx,tsx}', './src/components/*.{js,ts,jsx,tsx}', './src/layouts/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: { 
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        ...colors
      },
      fontFamily: {
        'sans': ['Inter', 'Helvatica', 'Arial', 'sans-serif'],
      },
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [],
}