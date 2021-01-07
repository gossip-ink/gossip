const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.tsx"],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        brand: ["'Luckiest Guy'", "cursive"],
      },
      gridTemplateColumns: {
        files: "repeat(auto-fill, minmax(16rem, 1fr))",
      },
      gridTemplateRows: {
        files: "1fr",
        "holy-grail": "3.5rem minmax(0, 1fr)",
      },
      padding: {
        full: "100%",
        "3/4": "75%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
