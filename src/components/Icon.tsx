import React from "react";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

const Icon: React.FC<IconProps> = ({ className, selected = true, ...restProps }) => {
  const classes = classNames(className, {
    "text-gray-400": !selected,
    "hover:text-gray-500": !selected,
  });
  return <FontAwesomeIcon className={classes} size="sm" {...restProps} />;
};

Icon.displayName = "Icon";

export interface IconProps extends FontAwesomeIconProps {
  selected?: boolean;
}
export default Icon;
