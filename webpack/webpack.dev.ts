import { merge } from "webpack-merge";
import base from "./webpack.common";
import { root } from "./path";
import * as webpack from "webpack";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";

type DevelopmentConfiguration = webpack.Configuration & {
  devServer?: DevServerConfiguration;
};

export default merge<DevelopmentConfiguration>(base, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: { contentBase: root("build"), hot: true, historyApiFallback: true },
});
