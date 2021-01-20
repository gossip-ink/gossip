import React, { useState } from "react";
import styled from "styled-components";

import Container from "../../components/Container";
import Tab from "../../components/Tab";
import Panel from "../../components/Panel";

import Toolbar from "./panels/ToolbarPanel";
import PreviewPanel from "./panels/PreviewPanel";
import OutlinePanel from "./panels/OutlinePanel";
import StylePanel from "./panels/StylePanel";
import AssetsPanel from "./panels/AssetsPanel";
import EffectsPanel from "./panels/EffectsPanel";

const { TabPanel } = Tab;

const Body = styled.div`
  position: relative;
`;

const LeftPanel = styled(Panel)`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
`;

const MainPanel = styled.div<{ left: number; right: number }>`
  width: calc(100% - ${(props) => props.left + props.right}px);
  margin-left: ${(props) => props.left}px;
  margin-right: ${(props) => props.right}px;
`;

const RightPanel = styled(Panel)`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;
`;

const EditorPage: React.FC<EditorPageProps> = () => {
  const LEFT_MIN_WIDTH = 320;
  const LEFT_MAX_WIDTH = LEFT_MIN_WIDTH * 2;
  const RIGHT_WIDTH = 240;
  const [leftSideWidth, setLeftSideWidth] = useState<number>(LEFT_MIN_WIDTH);

  function handleExpand(isSingle: boolean) {
    if (isSingle && leftSideWidth < LEFT_MAX_WIDTH) {
      setLeftSideWidth(LEFT_MAX_WIDTH);
    } else if (!isSingle && leftSideWidth > LEFT_MIN_WIDTH) {
      setLeftSideWidth(LEFT_MIN_WIDTH);
    }
  }

  return (
    <Container>
      <Toolbar />
      <Body className="w-full h-full bg-gray-200">
        <LeftPanel
          resizable
          controlWidth={leftSideWidth}
          setControlWidth={setLeftSideWidth}
          minWidth={320}
        >
          <Tab expandable defaultActiveIndex="1" onExpand={handleExpand}>
            <TabPanel label="Outline">
              <OutlinePanel />
            </TabPanel>
            <TabPanel label="Assets">
              <AssetsPanel />
            </TabPanel>
          </Tab>
        </LeftPanel>
        <MainPanel className="h-full" left={leftSideWidth} right={RIGHT_WIDTH}>
          <PreviewPanel />
        </MainPanel>
        <RightPanel initialWidth={RIGHT_WIDTH}>
          <Tab>
            <TabPanel label="Style">
              <StylePanel />
            </TabPanel>
            <TabPanel label="Effects">
              <EffectsPanel />
            </TabPanel>
          </Tab>
        </RightPanel>
      </Body>
    </Container>
  );
};

EditorPage.propTypes = {};

export default EditorPage;

export type EditorPageProps = {};
