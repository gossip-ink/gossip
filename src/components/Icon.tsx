import React from "react";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

const Icon: React.FC<IconProps> = ({ className, ...restProps }) => {
  const classes = classNames("text-gray-600", className);
  return <FontAwesomeIcon className={classes} size="sm" {...restProps} />;
};

Icon.displayName = "Icon";

export interface IconProps extends FontAwesomeIconProps {}
export default Icon;
