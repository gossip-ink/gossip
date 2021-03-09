import React from "react";
import styled from "styled-components";
import classNames from "classnames";

import Block, { BlockProps } from "../../../components/Block";

const Container = styled(Block)<{ width: number; ratio: number }>`
  width: ${(props) => props.width}%;
  padding-bottom: ${(props) => props.ratio * props.width}%;
  height: 0px;
`;

const ThumbnailBlock: React.FC<ThumbnailBlockProps> = ({
  data,
  width = 80,
  ratio = 0.6,
  className,
  ...restProps
}) => {
  const classes = classNames(className, "bg-gray-200");
  return (
    <Container {...restProps} className={classes} width={width} ratio={ratio}>
      {}
    </Container>
  );
};

export interface ThumbnailBlockProps extends BlockProps {
  data?: any;
  width?: number;
  ratio?: number;
}

export default ThumbnailBlock;
