import React, { useContext } from "react";
import { TabContext } from "./Tab";
import styled from "styled-components";

export interface TabPanelProps {
  text?: string;
  index?: string;
  children?: React.ReactNode;
}

const Container = styled.div<{ active?: boolean }>`
  display: ${(props) => (props.active ? "block" : "none")};
`;

const TabPanel: React.FC<TabPanelProps> = ({ children, index }) => {
  const { activeIndex } = useContext(TabContext);
  return (
    <Container active={activeIndex === index} className="h-full">
      {children}
    </Container>
  );
};

TabPanel.displayName = "TabPanel";

TabPanel.defaultProps = {
  text: "Tab",
};

export default TabPanel;
