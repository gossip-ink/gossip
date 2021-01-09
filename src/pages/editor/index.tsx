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
  width: 240px;
  position: absolute;
  left: 0;
  top: 0;
`;

const MainPanel = styled(Panel)`
  width: calc(100% - 480px);
  margin-left: 240px;
  margin-right: 240px;
`;

const RightPanel = styled(Panel)`
  width: 240px;
  position: absolute;
  right: 0;
  top: 0;
`;

const EditorPage: React.FC<EditorPageProps> = () => {
  return (
    <Container>
      <Toolbar />
      <Body className="w-full h-full">
        <LeftPanel>
          <Tab>
            <TabPanel text="Outline">
              <OutlinePanel />
            </TabPanel>
            <TabPanel text="Assets">
              <AssetsPanel />
            </TabPanel>
          </Tab>
        </LeftPanel>
        <MainPanel>
          <PreviewPanel />
        </MainPanel>
        <RightPanel>
          <Tab>
            <TabPanel text="Style">
              <StylePanel />
            </TabPanel>
            <TabPanel text="Effects">
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
