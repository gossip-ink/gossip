import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styled from "styled-components";

export interface PanelProps {
  style?: React.CSSProperties;
  className?: string;
  width?: number;
  resizable?: boolean;
  children: React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
  initialWidth?: number;
  onResize?: (width: number) => void;
}

const Container = styled.div<{ width?: number; drag: boolean }>`
  position: relative;
  width: ${(props) => props.width}px;
  overflow: hidden;
  cursor: ${(props) => (props.drag ? "ew-resize" : "default")};
`;

const ResizeHandle = styled.div`
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  width: 10px;
  transform: translate(50%, 0);
  cursor: ew-resize;
`;

const Panel: React.FC<PanelProps> = ({
  className,
  children,
  resizable = false,
  initialWidth = 240,
  width: controlWidth,
  minWidth = 240,
  maxWidth = 240 * 3,
  onResize,
  ...restProps
}) => {
  const [innerWidth, setInnerWidth] = useState<number>(initialWidth);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const width = controlWidth !== undefined ? controlWidth : innerWidth;
  const classes = classNames(className, "h-full bg-gray-50 border-r border-gray-200 shadow-sm", {
    "transition-all duration-150": !isDragging,
  });

  function handleResize(width: number) {
    if (controlWidth === undefined) {
      setInnerWidth(width);
    } else {
      onResize && onResize(width);
    }
  }

  useEffect(() => {
    const mousemoveHandler = (e: MouseEvent) => {
      if (!isDragging) return;
      const { pageX } = e;
      if (width <= minWidth && pageX < minWidth) return;
      if (width >= maxWidth && pageX > maxWidth) return;
      handleResize(pageX + 1);
    };
    const mouseupHandler = () => {
      if (isDragging) setIsDragging(false);
    };
    window.addEventListener("mousemove", mousemoveHandler);
    window.addEventListener("mouseup", mouseupHandler);
    return () => {
      window.removeEventListener("mousemove", mousemoveHandler);
      window.removeEventListener("mouseup", mouseupHandler);
    };
  });

  return (
    <Container {...restProps} className={classes} width={width} drag={isDragging}>
      {children}
      {resizable && <ResizeHandle onMouseDown={() => setIsDragging(true)} />}
    </Container>
  );
};

export default Panel;
