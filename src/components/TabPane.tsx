import React, { useContext } from "react";
import { TabContext } from "./Tab";
import styled from "styled-components";

export interface TabPaneProps {
  text?: string;
  index?: string;
  children?: React.ReactNode;
}

const Container = styled.div<{ active?: boolean }>`
  display: ${(props) => (props.active ? "block" : "none")};
`;

const TabPane: React.FC<TabPaneProps> = ({ children, index }) => {
  const { activeIndex } = useContext(TabContext);
  return (
    <Container active={activeIndex === index} className="h-full">
      {children}
    </Container>
  );
};

TabPane.displayName = "TabPane";

TabPane.defaultProps = {
  text: "Tab",
};

export default TabPane;
