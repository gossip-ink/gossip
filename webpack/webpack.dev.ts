import * as webpack from "webpack";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { merge } from "webpack-merge";
import { dist } from "./path";
import base from "./webpack.common";

type DevelopmentConfiguration = webpack.Configuration & {
  devServer?: DevServerConfiguration;
};

export default merge<DevelopmentConfiguration>(base, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: { contentBase: dist(), hot: true, historyApiFallback: true },
});
