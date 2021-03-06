import React, { useState } from "react";
import styled from "styled-components";
import Icon from "../../../components/Icon";
import Tree from "../../../components/Tree";
import { NodeType, PageNode } from "../../../models/node";
import { OutlineNode } from "../../../models/file";
import List from "../../../components/List";
import { nanoid } from "nanoid";
import OutlineBlock from "../components/OutlineBlock";
import ThumbnailBlock from "../components/ThumbnailBlock";
import { nodes } from "../../../utils/tree";

const { ListItem } = List;

const Container = styled.div``;

const SwitchIcon = styled(Icon).attrs((props) => ({
  className: "ml-2 cursor-pointer",
}))``;

const OutlinePanel: React.FC<OutlinePanelProps> = (props) => {
  const simpleTreeData: OutlineNode = {
    id: nanoid(),
    data: {
      title: "0",
      labels: [],
      pageNodes: [
        {
          id: nanoid(),
          type: NodeType.Page,
          children: [
            {
              id: nanoid(),
              type: NodeType.Text,
              text: "A",
            },
          ],
        },
      ],
    },
    children: [
      {
        id: nanoid(),
        data: {
          title: "0-0",
          labels: [],
          pageNodes: [
            {
              id: nanoid(),
              type: NodeType.Page,
              children: [
                {
                  id: nanoid(),
                  type: NodeType.Text,
                  text: "B",
                },
              ],
            },
            {
              id: nanoid(),
              type: NodeType.Page,
              children: [
                {
                  id: nanoid(),
                  type: NodeType.Text,
                  text: "C",
                },
              ],
            },
          ],
        },
        children: [
          {
            id: nanoid(),
            data: {
              labels: [],
              title: "0-0-0",
              pageNodes: [
                {
                  id: nanoid(),
                  type: NodeType.Page,
                  children: [
                    {
                      id: nanoid(),
                      type: NodeType.Text,
                      text: "D",
                    },
                  ],
                },
              ],
            },
            children: [],
          },
        ],
      },
      {
        id: nanoid(),
        data: {
          title: "0-1",
          labels: [],
          pageNodes: [
            {
              id: nanoid(),
              type: NodeType.Page,
              children: [
                {
                  id: nanoid(),
                  type: NodeType.Text,
                  text: "E",
                },
              ],
            },
          ],
        },
        children: [],
      },
    ],
  };

  const simpleNodes: PageNode[] = nodes(simpleTreeData).reduce(
    (total: PageNode[], cur: OutlineNode) => {
      const nodes = cur.data.pageNodes ? cur.data.pageNodes : [];
      return [...total, ...nodes];
    },
    []
  );

  const [isOutlineMode, setIsOutlineMode] = useState<boolean>(true);
  const [isTreeThumbnail, setIsTreeThumbnail] = useState<boolean>(true);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <Container className="w-full h-full">
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
      <div
        style={{
          height: `calc(100% - 37px - 30px)`,
        }}
        className="p-2"
      >
        {isOutlineMode || isTreeThumbnail ? (
          <Tree
            nested={!isOutlineMode && isTreeThumbnail}
            data={simpleTreeData}
            node={isOutlineMode ? <OutlineBlock /> : <ThumbnailBlock />}
          />
        ) : (
          <List>
            {simpleNodes.map((d, index) => (
              <ListItem key={d.id} className="flex justify-center items-center p-2">
                <ThumbnailBlock
                  data={d}
                  selected={selectedIndex === index}
                  onClick={() => setSelectedIndex(index)}
                />
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </Container>
  );
};

export interface OutlinePanelProps {}
export default OutlinePanel;
