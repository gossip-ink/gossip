import React from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
// import PropTypes from "prop-types";

const BrowserPage: React.FC<BrowserPageProps> = () => (
  <Container>
    <h1 className="text-lg">Gossip</h1>
    <p>
      Please head to the editor:{" "}
      <Link className="text-red-500" to="/editor">
        click me
      </Link>
      .
    </p>
  </Container>
);

BrowserPage.propTypes = {};

export default BrowserPage;

export type BrowserPageProps = {};
