import React, { useContext } from "react";
import { TabContext } from "./Tab";
import styled from "styled-components";
import classNames from "classnames";

export interface TabPanelProps {
  label?: string;
  index?: string;
  children?: React.ReactNode;
}

const Container = styled.div``;

const TabPanel: React.FC<TabPanelProps> = ({ children, index }) => {
  const { activeIndex, mode } = useContext(TabContext);
  const classes = classNames(
    {
      hidden: activeIndex !== index && mode === "single",
      "flex-1": mode === "multiple",
      "border-l border-gray-200": mode === "multiple",
    },
    "h-full transition-all duration-150 w-full"
  );
  return <Container className={classes}>{children}</Container>;
};

TabPanel.displayName = "TabPanel";

TabPanel.defaultProps = {
  label: "Tab",
};

export default TabPanel;
