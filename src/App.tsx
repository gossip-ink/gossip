import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BrowserPage from "./pages/BrowserPage";
import EditorPage from "./pages/EditorPage";

export type AppProps = {};

const App: React.FC<AppProps> = () => (
  <Router>
    <Switch>
      <Route path="/editor">
        <EditorPage />
      </Route>
      <Route path="/">
        <BrowserPage />
      </Route>
    </Switch>
  </Router>
);

export default App;
