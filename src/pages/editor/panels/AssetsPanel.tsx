import React, { useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import Icon from "../../../components/Icon";
import { Node, NodeType } from "../../../models/node";
import AdptiveHeightTextarea from "../components/AdptiveHeightTextarea";
import Block from "../components/Block";

export interface AssetsPanelProps {}

const Container = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;

  & > input:focus,
  & > input {
    border-width: 0;
    outline: none;
  }
`;

const Body = styled.div``;

function createAsset(): Node {
  const id = nanoid();
  return {
    id,
    type: NodeType.Text,
    text: `thought ${id.slice(0, 5)}`,
  };
}

const AssetsPanel: React.FC<AssetsPanelProps> = (props) => {
  const sampleData: Node[] = [createAsset(), createAsset(), createAsset()];
  const [value, setValue] = useState<string>("");
  const [assets, setAssets] = useState<Node[]>(sampleData);

  function handleAdd(index: number) {
    const newAsset = createAsset();
    assets.splice(index, 0, newAsset);
    setAssets([...assets]);
  }

  return (
    <Container className="w-full">
      <Search className="p-2">
        <Icon icon="search" />
        <input
          className="bg-transparent ml-2 placeholder-gray-400 w-full"
          placeholder="Search"
        ></input>
        <Icon icon="filter" className="m-1" />
      </Search>
      <AdptiveHeightTextarea
        className="pl-2 pr-2 w-full placeholder-gray-400"
        placeholder="Type '/' for commands"
        value={value}
        onChange={setValue}
      />
      <Body className="p-2">
        {assets.map((d, index) => (
          <Block key={d.id} onAdd={() => handleAdd(index)}>
            {d.type === NodeType.Text && d.text}
          </Block>
        ))}
      </Body>
    </Container>
  );
};

export default AssetsPanel;
