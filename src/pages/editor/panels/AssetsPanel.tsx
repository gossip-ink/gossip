import React, { useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";

import { TextNode, NodeType } from "../../../models/node";

import Icon from "../../../components/Icon";
import List from "../../../components/List";
import AssetBlock from "../components/AssetBlock";
import Popover from "../../../components/Popover";

const { ListItem } = List;

const Container = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;

  & input:focus,
  & input {
    border-width: 0;
    outline: none;
  }
`;

function createAsset(text: string): TextNode {
  const id = nanoid();
  return {
    id,
    type: NodeType.Text,
    text,
  };
}

const AssetsPanel: React.FC<AssetsPanelProps> = (props) => {
  const sampleData: TextNode[] = [
    createAsset("component1"),
    createAsset("component2"),
    createAsset("component3"),
  ];
  const [components, setComponents] = useState(sampleData);
  const [selectedId, setSelectedId] = useState("");

  function onMove(dragIndex: number, hoverIndex: number) {
    const dragComponent = components[dragIndex];
    components.splice(dragIndex, 1);
    components.splice(hoverIndex, 0, dragComponent);
    setComponents([...components]);
  }

  return (
    <Container className="w-full">
      <Popover triggerAction="click" content={<div>hello popover</div>} full>
        <Search className="p-2">
          <Icon icon="search" />
          <input
            className="bg-transparent ml-2 placeholder-gray-400 w-full"
            placeholder="Search"
          ></input>
        </Search>
      </Popover>
      <List draggable={true} onMove={onMove}>
        {components.map((d, index) => (
          <ListItem key={d.id}>
            <AssetBlock selected={selectedId === d.id} onClick={() => setSelectedId(d.id)}>
              {d.text}
            </AssetBlock>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export type AssetsPanelProps = {};

export default AssetsPanel;
