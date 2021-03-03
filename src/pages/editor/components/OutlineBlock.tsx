import React from "react";
import Block, { BlockProps } from "./Block";

const OutlineBlock: React.FC<OutlineBlockProps> = ({ children, ...restProps }) => {
  return <Block {...restProps}>{children}</Block>;
};

export interface OutlineBlockProps extends BlockProps {
  data?: any;
}

export default OutlineBlock;
