import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
// import PropTypes from "prop-types";

const BrowserPage: React.FC<BrowserPageProps> = () => {
  const [navigationWidth, setNavigationWidth] = useState(240);
  return (
    <Container>
      <Header />
      <div className="flex">
        <Navigation width={navigationWidth} />
        <main className="p-6">
          <p>
            Hi, welcome to Gossip — the best presentation authoring tool. Please head to the editor:{" "}
            <Link className="text-red-500" to="/editor">
              click me
            </Link>
            .
          </p>
        </main>
      </div>
    </Container>
  );
};

BrowserPage.propTypes = {};

export default BrowserPage;

export type BrowserPageProps = {};
