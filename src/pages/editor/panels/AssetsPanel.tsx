import React from "react";
import styled from "styled-components";
import Icon from "../../../components/Icon";
import { Node, NodeType } from "../../../models/node";
import { nanoid } from "nanoid";

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

const AutoTextarea = styled.div`
  outline: 0;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-user-modify: read-write-plaintext-only;

  &:empty::before {
    content: attr(placeholder);
  }
`;

const sampleData: Node[] = [
  { id: nanoid(), type: NodeType.Text, text: "" },
  { id: nanoid(), type: NodeType.Text, text: "" },
  { id: nanoid(), type: NodeType.Text, text: "" },
  { id: nanoid(), type: NodeType.Text, text: "" },
];

const AssetsPanel: React.FC<AssetsPanelProps> = (props) => {
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
      <AutoTextarea className="pl-2 pr-2 w-full" placeholder="Type '/' for commands" />
    </Container>
  );
};

export default AssetsPanel;
