import React, { useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";

import { NodeType, PageNode } from "../../../models/node";
import { OutlineNode } from "../../../models/file";

import { nodes } from "../../../utils/tree";

import Icon from "../../../components/Icon";
import Tree from "../../../components/Tree";
import List from "../../../components/List";
import OutlineBlock from "../components/OutlineBlock";
import ThumbnailBlock from "../components/ThumbnailBlock";

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
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <Container className="w-full h-full">
      <div
        className="flex flex-row justify-start p-2 cursor-pointer items-center"
        style={{
          height: 40,
        }}
      >
        <SwitchIcon
          icon="tree"
          onClick={() => setIsOutlineMode(true)}
          selected={isOutlineMode}
        ></SwitchIcon>
        <SwitchIcon
          icon="list-ul"
          selected={!isOutlineMode}
          onClick={() => setIsOutlineMode(false)}
        />
      </div>
      <div
        style={{
          height: `calc(100% - 37px - 30px)`,
        }}
        className="px-4"
      >
        {isOutlineMode ? (
          <Tree data={simpleTreeData} node={<OutlineBlock />} />
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
