import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import classNames from "classnames";
import { XYCoord } from "dnd-core";
import { ListContext } from "./List";

const Container = styled.div<{ visible: boolean }>`
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

interface DragItem {
  index: number;
  type: string;
}

export interface ListItemProps {
  index?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
}

const ListItem: React.FC<ListItemProps> = ({
  children,
  className,
  id,
  index = 0,
  ...restProps
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const type = "list";
  const { draggable, onMove } = useContext(ListContext);
  const [{ handlerId }, drop] = useDrop({
    accept: type,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
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
    type,
    item: () => ({ index, id }),
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const classes = classNames(className);
  draggable && drag(drop(ref));

  return (
    <Container
      {...restProps}
      className={classes}
      ref={ref}
      visible={!isDragging}
      data-handler-id={handlerId}
    >
      {children}
    </Container>
  );
};

ListItem.displayName = "ListItem";

export default ListItem;
