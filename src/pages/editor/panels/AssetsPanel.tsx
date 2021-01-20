import React, { useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import Icon from "../../../components/Icon";
import { Node, NodeType } from "../../../models/node";
import AdptiveHeightTextarea from "../components/AdptiveHeightTextarea";

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

const sampleData: Node[] = [
  { id: nanoid(), type: NodeType.Text, text: "" },
  { id: nanoid(), type: NodeType.Text, text: "" },
  { id: nanoid(), type: NodeType.Text, text: "" },
];

const AssetsPanel: React.FC<AssetsPanelProps> = (props) => {
  const [value, setValue] = useState<string>("");
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
    </Container>
  );
};

export default AssetsPanel;
