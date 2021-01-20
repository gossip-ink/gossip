import React from "react";
import styled from "styled-components";
import Icon from "../../../components/Icon";

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

const AssetsPanel: React.FC<AssetsPanelProps> = (props) => {
  return (
    <Container className="w-full">
      <Search className="p-2">
        <Icon icon="search" />
        <input
          className="bg-transparent ml-2 text-gray-600 placeholder-gray-400 w-full"
          placeholder="search"
        ></input>
        <Icon icon="filter" className="m-1" />
        <Icon icon="plus" className="m-1" />
      </Search>
    </Container>
  );
};

export default AssetsPanel;
