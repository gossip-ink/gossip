import React, { useContext, useRef } from "react";
import { ListContext } from "./List";
import styled from "styled-components";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import classname from "classnames";
import { XYCoord } from "dnd-core";

const Container = styled.div<{ visible: boolean }>`
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

interface DragItem {
  index: number;
  type: string;
}

const ListItem: React.FC<ListItemProps> = ({ children, className, index = 0, ...restProps }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { draggable, type = "list", onMove } = useContext(ListContext);
  const [, drop] = useDrop({
    accept: type,
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onMove && onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const classes = classname(className);
  draggable && drag(drop(ref));

  return (
    <Container {...restProps} className={classes} ref={ref} visible={!isDragging}>
      {children}
    </Container>
  );
};

ListItem.displayName = "ListItem";

export interface ListItemProps {
  index?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default ListItem;
