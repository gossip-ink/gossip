const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./common");

const basePath = path.resolve(__dirname, "..");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
});
