const { merge } = require("webpack-merge");
const base = require("./base");
const { root } = require("./path");

module.exports = merge(base, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: { contentBase: root("build"), hot: true, historyApiFallback: true },
});
