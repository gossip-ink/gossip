import "./helpers/icon";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.pcss";
import { ModalContainer, ModalStateProvider } from "./modals";

ReactDOM.render(
  <ModalStateProvider>
    <App />
    <ModalContainer />
  </ModalStateProvider>,
  document.getElementById("app-root")
);

if (module.hot) {
  module.hot.accept();
}
