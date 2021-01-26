import React from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import Icon from "../../../components/Icon";
import { Node, NodeType } from "../../../models/node";

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

function createAsset(): Node {
  return {
    id: nanoid(),
    type: NodeType.Text,
    text: "",
  };
}

const AssetsPanel: React.FC<AssetsPanelProps> = (props) => {
  const sampleData: Node[] = [createAsset(), createAsset(), createAsset()];

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
    </Container>
  );
};

export default AssetsPanel;
