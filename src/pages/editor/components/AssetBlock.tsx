import React from "react";
import Block, { BlockProps } from "../../../components/Block";

const AssetBlock: React.FC<AssetBlockProps> = ({ children, ...restProps }) => {
  return <Block {...restProps}>{children}</Block>;
};

export interface AssetBlockProps extends BlockProps {}

export default AssetBlock;