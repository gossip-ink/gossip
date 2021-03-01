import { merge } from "webpack-merge";
import base from "./webpack.common";

export default merge(base, {
  mode: "production",
  devtool: "source-map",
});
