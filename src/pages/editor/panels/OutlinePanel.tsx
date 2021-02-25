import React, { useState } from "react";
import styled from "styled-components";
import Icon from "../../../components/Icon";
import classNames from "classnames";

const Container = styled.div``;

const OutlinePanel: React.FC<OutlinePanelProps> = (props) => {
  const [isTreeMode, setIsTreeMode] = useState<boolean>(true);
  const treeIconClasses = classNames("ml-2 cursor-pointer", {
    "text-gray-400": !isTreeMode,
    "hover:text-gray-500": !isTreeMode,
  });

  const listIconClasses = classNames("ml-2 cursor-pointer", {
    "text-gray-400": isTreeMode,
    "hover:text-gray-500": isTreeMode,
  });

  return (
    <Container className="w-full">
      <div className="flex flex-row justify-end p-2 cursor-pointer">
        <Icon icon="tree" className={treeIconClasses} onClick={() => setIsTreeMode(true)}></Icon>
        <Icon
          icon="list-ul"
          className={listIconClasses}
          onClick={() => setIsTreeMode(false)}
        ></Icon>
      </div>
    </Container>
  );
};

export interface OutlinePanelProps {}
export default OutlinePanel;
