import React from "react";
import classNames from "classnames";

const Block: React.FC<BlockProps> = ({ selected = false, className, children, ...restProps }) => {
  const classes = classNames(className, "h-full w-full border p-2", {
    "border-blue-400": selected,
    "border-transparent": !selected,
  });

  return (
    <div className={classes} {...restProps}>
      {children}
    </div>
  );
};

export type BlockProps = {
  selected?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
};

export default Block;
