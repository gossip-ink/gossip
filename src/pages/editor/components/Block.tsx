import React from "react";
import classNames from "classnames";

const Block: React.FC<BlockProps> = ({ selected = false, className, children, ...restProps }) => {
  const classes = classNames(className, "h-full w-full border p-2", {
    "border-white": !selected,
    "border-blue-400": selected,
  });

  return (
    <div className={classes} {...restProps}>
      {children}
    </div>
  );
};

export interface BlockProps {
  selected?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default Block;
