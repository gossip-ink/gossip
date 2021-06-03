import React from "react";
import styled from "styled-components";

import Node from "./TreeNode";

import { TreeNode, treeLayout } from "../utils/tree";

const Container = styled.div``;

function renderNode(child: React.ReactNode, data: any) {
  const childElement = child as React.FunctionComponentElement<any>;
  return React.cloneElement(childElement, {
    data: data.data,
  });
}

const Tree: React.FC<TreeProps<any>> = ({ data, node, ...restProps }) => {
  const nodes = treeLayout(data);
  return (
    <Container {...restProps}>
      {nodes.map((d) => (
        <Node key={d.id} paddingLeft={`${d.height}em`}>
          {renderNode(node, d)}
        </Node>
      ))}
    </Container>
  );
};

export type TreeProps<T> = {
  node?: React.ReactNode;
  data: TreeNode<T>;
};

export default Tree;
