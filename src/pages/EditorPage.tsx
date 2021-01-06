import React from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
// import PropTypes from "prop-types";

const EditorPage: React.FC<EditorPageProps> = () => (
  <Container>
    <h1 className="text-lg">Gossip</h1>
    <p>Hello, this is the Gossip editor.</p>
    <Link className="text-red-500" to="/">
      Back to home
    </Link>
  </Container>
);

EditorPage.propTypes = {};

export default EditorPage;

export type EditorPageProps = {};
