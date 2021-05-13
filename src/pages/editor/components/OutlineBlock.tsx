import React from "react";
import styled from "styled-components";

import { OutlineData } from "../../../models/file";

import Block, { BlockProps } from "../../../components/Block";
import ThumbnailBlock from "./ThumbnailBlock";
import { tuple } from "../../../utils/type";

const OutlineModes = tuple("collapsed", "normal", "expand");
type OutlineMode = typeof OutlineModes[number];

const Header = styled.div``;

const Body = styled.div`
  &::after {
    display: block;
    content: "";
    clear: both;
  }
`;

const OutlineBlock: React.FC<OutlineBlockProps> = ({
  children,
  data,
  mode = "normal",
  ...restProps
}) => {
  const outlineData = data as OutlineData;
  return (
    <Block {...restProps} className="bg-gray-100">
      <Header>{outlineData.title}</Header>
      {mode !== "collapsed" && (
        <Body>
          {outlineData.pageNodes.map((d) => (
            <ThumbnailBlock key={d.id} data={d} width={40} className="float-left mr-2" />
          ))}
        </Body>
      )}
    </Block>
  );
};

export interface OutlineBlockProps extends BlockProps {
  data?: any;
  mode?: OutlineMode;
}

export default OutlineBlock;
