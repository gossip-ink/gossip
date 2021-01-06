const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.tsx"],
  darkMode: "media",
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
