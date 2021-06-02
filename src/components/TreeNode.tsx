import React from "react";
import classNames from "classnames";
import Block from "./Block";

const TreeNode: React.FC<TreeNodeProps> = ({ paddingLeft, children, className, ...restProps }) => {
  const classes = classNames(className, "mb-2");
  return (
    <Block style={{ paddingLeft }} {...restProps} className={classes}>
      {children}
    </Block>
  );
};

export type TreeNodeProps = {
  paddingLeft?: number | string;
  className?: string;
};

export default TreeNode;
