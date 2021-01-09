import React, { useState } from "react";
import Container from "../../components/Container";
import FileCard from "./components/FileCard";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
// import PropTypes from "prop-types";

const BrowserPage: React.FC<BrowserPageProps> = () => {
  const [navigationWidth, setNavigationWidth] = useState(240);
  return (
    <Container>
      <Header />
      <div className="flex">
        <Navigation width={navigationWidth} />
        <main className="h-full flex-1 overflow-y-auto">
          <div className="p-6 grid grid-cols-files grid-rows-files gap-4">
            <FileCard />
            <FileCard />
            <FileCard />
          </div>
        </main>
      </div>
    </Container>
  );
};

BrowserPage.propTypes = {};

export default BrowserPage;

export type BrowserPageProps = {};
