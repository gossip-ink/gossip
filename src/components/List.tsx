import React from "react";
import styled from "styled-components";
import classNames from "classnames";

const Container = styled.div``;

const List: React.FC<ListProps> = ({ children, className, draggable = false }) => {
  const classes = classNames(className);
  return <Container className={classes}>{children}</Container>;
};

export interface ListProps {
  draggable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default List;
