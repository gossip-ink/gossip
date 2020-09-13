const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const basePath = path.resolve(__dirname, "..");

module.exports = {
  entry: path.join(basePath, "src", "index.tsx"),
  output: {
    filename: "[name].bundle.js",
    path: path.join(basePath, "build"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.s[ac]ss$/i, use: ["style-loader", "css-loader", "sass-loader"] },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: path.join(basePath, "src", "index.html") }),
  ],
};
