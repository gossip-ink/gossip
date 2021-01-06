const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { root, src } = require("./path");

const isProduction = process.env.NODE_ENV === "production";
const styleLoader = isProduction ? MiniCssExtractPlugin.loader : "style-loader";

const config = {
  entry: src("index.tsx"),
  output: {
    chunkFilename: "[name].[fullhash].js",
    filename: "[name].[fullhash].js",
    path: root("build"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      { test: /\.css$/, use: [styleLoader, "css-loader"] },
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.pcss?$/, use: [styleLoader, "css-loader", "postcss-loader"] },
      { test: /\.s[ac]ss$/i, use: [styleLoader, "css-loader", "sass-loader"] },
      { test: /\.(?:gif|jpg|png|svg|webp)$/, use: ["file-loader"] },
      { test: /\.(?:eot|otf|ttf|woff|woff2)$/, use: ["file-loader"] },
    ],
  },
  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin({ template: src("index.html") })],
  optimization: {},
};

if (isProduction) {
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: "[name].[fullhash].css",
      chunkFilename: "[name].[fullhash].css",
    })
  );
  config.optimization.minimizer = ["...", new CssMinimizerPlugin()];
}

module.exports = config;
