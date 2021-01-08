import React from "react";
import classNames from "classnames";
import styled from "styled-components";

interface PanelProps {
  style?: React.CSSProperties;
  className?: string;
  width?: number;
  draggble?: boolean;
}

const Container = styled.div``;

const Panel: React.FC<PanelProps> = ({ className, ...restProps }) => {
  const classes = classNames(className, "h-full bg-gray-50 border-r border-gray-200 shadow-sm");
  return <Container {...restProps} className={classes}></Container>;
};

export default Panel;
