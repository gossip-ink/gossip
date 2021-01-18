import React from "react";
import styled from "styled-components";

import Container from "../../components/Container";
import Tab from "../../components/Tab";
import Panel from "../../components/Panel";

import Toolbar from "./components/Toolbar";
import PreviewPanel from "./components/PreviewPanel";
import OutlinePanel from "./components/OutlinePanel";
import StylePanel from "./components/StylePanel";
import AssetsPanel from "./components/AssetsPanel";
import EffectsPanel from "./components/EffectsPanel";

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

const MainPanel = styled.div`
  width: calc(100% - 480px);
  margin-left: 240px;
  margin-right: 240px;
`;

const RightPanel = styled(Panel)`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;
`;

const EditorPage: React.FC<EditorPageProps> = () => {
  return (
    <Container>
      <Toolbar />
      <Body className="w-full h-full bg-gray-200">
        <LeftPanel resizable>
          <Tab expandable>
            <TabPanel label="Outline">
              <OutlinePanel />
            </TabPanel>
            <TabPanel label="Assets">
              <AssetsPanel />
            </TabPanel>
          </Tab>
        </LeftPanel>
        <MainPanel className="h-full">
          <PreviewPanel />
        </MainPanel>
        <RightPanel>
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
