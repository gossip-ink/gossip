const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./common");

const basePath = path.resolve(__dirname, "..");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: { contentBase: path.join(basePath, "build"), hot: true, historyApiFallback: true },
});
