import "./helpers/icon";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.pcss";

ReactDOM.render(<App />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}
