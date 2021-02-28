import * as webpack from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import { root, src } from "./path";

export type Plugin =
  | webpack.WebpackPluginInstance
  | ((this: webpack.Compiler, compiler: webpack.Compiler) => void);

const isProduction = process.env.NODE_ENV === "production";
const styleLoader = isProduction ? MiniCssExtractPlugin.loader : "style-loader";

const config: webpack.Configuration = {
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
  plugins: [
    new CleanWebpackPlugin({}),
    new HtmlWebpackPlugin({ template: src("index.html") }),
    ...(isProduction
      ? [
          new MiniCssExtractPlugin({
            filename: "[name].[fullhash].css",
            chunkFilename: "[name].[fullhash].css",
          }),
        ]
      : []),
  ],
  optimization: {
    minimizer: isProduction ? ["...", new CssMinimizerPlugin()] : undefined,
  },
};

export default config;
