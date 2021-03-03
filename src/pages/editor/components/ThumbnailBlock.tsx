import React from "react";
import Block, { BlockProps } from "./Block";

const ThumbnailBlock: React.FC<ThumbnailBlockProps> = ({ data, ...restProps }) => {
  return <Block {...restProps}>{}</Block>;
};

export interface ThumbnailBlockProps extends BlockProps {
  data?: any;
}

export default ThumbnailBlock;
