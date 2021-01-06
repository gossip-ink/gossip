const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.tsx"],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        brand: ["'Luckiest Guy'", "cursive"],
      },
      gridTemplateRows: {
        "holy-grail": "3.5rem minmax(0, 1fr)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
