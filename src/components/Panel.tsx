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
  background: red;
  transform: translate(50%, 0);
  cursor: ew-resize;
`;

const Panel: React.FC<PanelProps> = ({
  className,
  children,
  resizable,
  initialWidth,
  minWidth = 240,
  maxWidth = 240 * 3,
  ...restProps
}) => {
  const classes = classNames(className, "h-full bg-gray-50 border-r border-gray-200 shadow-sm");
  const [width, setWidth] = useState<number>(initialWidth as number);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    const mousemoveHandler = (e: MouseEvent) => {
      const { movementX } = e;
      if (!isDragging) return;
      if (width < minWidth && movementX < 0) return;
      if (width > maxWidth && movementX > 0) return;
      setWidth(width + movementX);
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
      {resizable && (
        <ResizeHandle
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
        />
      )}
    </Container>
  );
};

Panel.defaultProps = {
  initialWidth: 240,
  resizable: false,
};

export default Panel;
