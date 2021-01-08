import React, { createContext, useState } from "react";
import styled from "styled-components";

import { tuple } from "../utils/type";
import TabPane, { TabPaneProps } from "./TabPane";

const TabTypes = tuple("line", "card", "editable-card");
type TabType = typeof TabTypes[number];

export interface TabProps {
  type?: TabType;
  defaultActiveIndex?: string;
  onEdit?: (tartgetKey: string, action: string) => void;
  onChange?: (activeKey: string) => void;
  children?: React.ReactNode;
}

export interface ITab extends React.FC<TabProps> {
  Pane: typeof TabPane;
}

export interface ITabContext {
  activeIndex?: string;
}

export const TabContext = createContext<ITabContext>({ activeIndex: "0" });

const Container = styled.div``;

const Header = styled.ul`
  display: flex;
`;

const Item = styled.li<{ type?: TabType }>``;

const Body = styled.div``;

const InternalTab: React.FC<TabProps> = ({
  children,
  type,
  defaultActiveIndex,
  onChange,
  ...restProps
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const tabContextValue: ITabContext = {
    activeIndex,
  };

  function handleClickItem(index: string) {
    setActiveIndex(index);
    onChange && onChange(index);
  }

  function toItem(child: React.ReactNode, childIndex: number) {
    const childElement = child as React.FunctionComponentElement<TabPaneProps>;
    const { displayName } = childElement.type;
    if (displayName === "TabPane") {
      const { text, index } = childElement.props;
      const key = index ? index : childIndex.toString();
      return (
        <Item
          type={type}
          onClick={() => handleClickItem(key)}
          className="p-1 cursor-pointer transition duration-150 hover:bg-white hover:shadow-sm"
        >
          {text}
        </Item>
      );
    } else {
      console.error("[Warning] Tab has a child which is not a TabPane.");
      return childElement;
    }
  }

  function toPane(child: React.ReactNode, childIndex: number) {
    const childElement = child as React.FunctionComponentElement<TabPaneProps>;
    const { displayName } = childElement.type;
    if (displayName === "TabPane") {
      const { index } = childElement.props;
      return React.cloneElement(childElement, {
        index: index ? index : childIndex.toString(),
      });
    } else {
      console.error("[Warning] Tab has a child which is not a TabPane.");
      return childElement;
    }
  }

  return (
    <Container {...restProps}>
      <TabContext.Provider value={tabContextValue}>
        <Header className="bg-gray-50">{React.Children.map(children, toItem)}</Header>
        <Body>{React.Children.map(children, toPane)}</Body>
      </TabContext.Provider>
    </Container>
  );
};

const Tab = InternalTab as ITab;

Tab.Pane = TabPane;
Tab.displayName = "Tab";
Tab.defaultProps = {
  type: "line",
  defaultActiveIndex: "0",
};

export default Tab;
