const { merge } = require("webpack-merge");
const base = require("./base");

module.exports = merge(base, {
  mode: "production",
  devtool: "source-map",
});
