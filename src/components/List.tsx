import React, { createContext } from "react";
import styled from "styled-components";
import classNames from "classnames";
import ListItem, { ListItemProps } from "./ListItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { nanoid } from "nanoid";

const Container = styled.div``;

export const ListContext = createContext<ListConsumerProps>({ draggable: false });

const InternalList: React.FC<ListProps> = ({ children, className, draggable = false, onMove }) => {
  const classes = classNames(className, "h-full overflow-auto");
  const listContextValue: ListConsumerProps = {
    draggable,
    onMove,
  };

  function renderListItem(child: React.ReactNode, childIndex: number) {
    const childElement = child as React.FunctionComponentElement<ListItemProps>;
    const { displayName } = childElement.type;
    if (displayName === "ListItem") {
      const { index } = childElement.props;
      return React.cloneElement(childElement, {
        index: index ? index : childIndex,
        id: nanoid(),
      });
    } else {
      console.error("[Warning] List has a child which is not a ListItem.");
      return childElement;
    }
  }

  return (
    <ListContext.Provider value={listContextValue}>
      <Container className={classes}>
        <DndProvider backend={HTML5Backend}>
          {React.Children.map(children, renderListItem)}
        </DndProvider>
      </Container>
    </ListContext.Provider>
  );
};

const List = InternalList as ExternalList;
List.displayName = "List";
List.ListItem = ListItem;

export type ExternalList = React.FC<ListProps> & {
  ListItem: typeof ListItem;
};

export type ListConsumerProps = {
  draggable?: boolean;
  type?: string;
  onMove?: (dragIndex: number, hoverIndex: number) => void;
};

export type ListProps = {
  draggable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onMove?: (dragIndex: number, hoverIndex: number) => void;
};

export default List;
