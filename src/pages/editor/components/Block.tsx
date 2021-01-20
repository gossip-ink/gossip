import React from "react";
import styled from "styled-components";
import { NodeType } from "../../../models/node";
import Icon from "../../../components/Icon";

const Container = styled.div`
  & > span {
    opacity: 0;
    cursor: pointer;
  }

  &:hover > span {
    opacity: 1;
  }
`;

const Block: React.FC<BlockProps> = ({ children, onAdd }) => {
  return (
    <Container className="flex" draggable>
      <div className="w-full">{children}</div>
      <span className="ml-2">
        <Icon icon="plus" onClick={onAdd} />
      </span>
      <span className="ml-2">
        <Icon icon="arrows-alt" />
      </span>
    </Container>
  );
};

export interface BlockProps {
  children?: React.ReactNode;
  type?: NodeType;
  onAdd?: () => void;
}

export default Block;
