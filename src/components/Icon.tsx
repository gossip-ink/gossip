import React from "react";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

const Icon: React.FC<IconProps> = (props) => {
  return <FontAwesomeIcon {...props} />;
};

Icon.displayName = "Icon";

export interface IconProps extends FontAwesomeIconProps {}
export default Icon;
