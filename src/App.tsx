import React from "react";
import styled from "styled-components";

export type AppProps = {};

const Header = styled.div`
  padding: 0.5rem 1rem;
  width: min-content;
  border: 1px solid #000000;
`;

const App: React.FC<AppProps> = () => <Header>Hello, Gossip!</Header>;

export default App;
