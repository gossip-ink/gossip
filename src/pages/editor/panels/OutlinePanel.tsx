import React, { useState } from "react";
import styled from "styled-components";
import Icon from "../../../components/Icon";

const Container = styled.div``;

const SwitchIcon = styled(Icon).attrs((props) => ({
  className: "ml-2 cursor-pointer",
}))``;

const OutlinePanel: React.FC<OutlinePanelProps> = (props) => {
  const [isOutlineMode, setIsOutlineMode] = useState<boolean>(true);
  const [isTreeThumbnail, setIsTreeThumbnail] = useState<boolean>(true);

  return (
    <Container className="w-full">
      <div className="flex flex-row justify-end p-2 cursor-pointer">
        <SwitchIcon
          icon="tree"
          onClick={() => setIsOutlineMode(true)}
          selected={isOutlineMode}
        ></SwitchIcon>
        {isOutlineMode && (
          <SwitchIcon
            icon="film"
            onClick={() => setIsOutlineMode(false)}
            selected={!isOutlineMode}
          ></SwitchIcon>
        )}
        {!isOutlineMode && (
          <>
            <SwitchIcon
              icon="indent"
              selected={isTreeThumbnail}
              onClick={() => setIsTreeThumbnail(true)}
            />
            <SwitchIcon
              icon="list-ul"
              selected={!isTreeThumbnail}
              onClick={() => setIsTreeThumbnail(false)}
            />
          </>
        )}
      </div>
    </Container>
  );
};

export interface OutlinePanelProps {}
export default OutlinePanel;
