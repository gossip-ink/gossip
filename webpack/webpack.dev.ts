import { merge } from "webpack-merge";
import base from "./webpack.common";
import { root } from "./path";

export default merge(base, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: { contentBase: root("build"), hot: true, historyApiFallback: true },
});
