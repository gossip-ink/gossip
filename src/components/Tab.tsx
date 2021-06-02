import React, { createContext, useState } from "react";
import styled from "styled-components";
import classNames from "classnames";

import TabPanel, { TabPanelProps } from "./TabPanel";
import Icon from "./Icon";

import { tuple } from "../utils/type";

const TabTypes = tuple("line", "card", "editable-card");
type TabType = typeof TabTypes[number];

const TabModes = tuple("single", "multiple");
type TabMode = typeof TabModes[number];

export type TabProps = {
  type?: TabType;
  defaultActiveIndex?: string;
  onEdit?: (targetKey: string, action: string) => void;
  onChange?: (activeKey: string) => void;
  onExpand?: (isSingle: boolean) => void;
  children?: React.ReactNode;
  expandable?: boolean;
  defaultMode?: TabMode;
  className?: string;
};

export type TabConsumerProps = {
  activeIndex?: string;
  mode?: TabMode;
};

export const TabContext = createContext<TabConsumerProps>({ activeIndex: "0" });

const Container = styled.div``;

const Header = styled.ul`
  display: flex;
  position: relative;
`;

const Item = styled.li<{ type?: TabType }>``;

const Body = styled.div``;

const ActionIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translate(0, -50%);
`;

const InternalTab: React.FC<TabProps> = ({
  children,
  type = "line",
  defaultActiveIndex = "0",
  onChange,
  expandable = false,
  defaultMode = "single",
  className,
  onExpand,
  ...restProps
}) => {
  const [activeIndex, setActiveIndex] = useState<string>(defaultActiveIndex);
  const [mode, setMode] = useState<TabMode>(defaultMode);
  const tabContextValue: TabConsumerProps = {
    activeIndex,
    mode,
  };
  const classes = classNames(className, "h-full");

  function handleClickItem(index: string) {
    setActiveIndex(index);
    onChange && onChange(index);
  }

  function handleClickActionIcon() {
    mode === "single" ? setMode("multiple") : setMode("single");
    onExpand && onExpand(mode === "single");
  }

  function renderTabItem(child: React.ReactNode, childIndex: number) {
    const childElement = child as React.FunctionComponentElement<TabPanelProps>;
    const { displayName } = childElement.type;
    if (displayName === "TabPanel") {
      const { label, index } = childElement.props;
      const key = index ? index : childIndex.toString();
      const isMultiple = mode === "multiple";
      const classes = classNames(
        {
          "text-gray-400": key !== activeIndex && !isMultiple,
          "hover:text-gray-600": key !== activeIndex && !isMultiple,
          "flex-1": isMultiple,
        },
        "p-2 cursor-pointer transition-all duration-150 text-sm"
      );
      return (
        <Item type={type} onClick={() => !isMultiple && handleClickItem(key)} className={classes}>
          {label}
        </Item>
      );
    } else {
      console.error("[Warning] Tab has a child which is not a TabPane.");
      return childElement;
    }
  }

  function renderTabPane(child: React.ReactNode, childIndex: number) {
    const childElement = child as React.FunctionComponentElement<TabPanelProps>;
    const { displayName } = childElement.type;
    if (displayName === "TabPanel") {
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
    <Container {...restProps} className={classes}>
      <TabContext.Provider value={tabContextValue}>
        <Header className="bg-gray-50 border-b border-gray-200">
          {React.Children.map(children, renderTabItem)}
          {expandable && (
            <ActionIcon
              icon={mode === "single" ? "arrow-right" : "arrow-left"}
              className="cursor-pointer"
              onClick={handleClickActionIcon}
            />
          )}
        </Header>
        <Body className="flex h-full">{React.Children.map(children, renderTabPane)}</Body>
      </TabContext.Provider>
    </Container>
  );
};

export type ExternalTab = React.FC<TabProps> & {
  TabPanel: typeof TabPanel;
};

const Tab = InternalTab as ExternalTab;

Tab.TabPanel = TabPanel;
Tab.displayName = "Tab";

export default Tab;
