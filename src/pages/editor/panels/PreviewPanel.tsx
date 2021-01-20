import React from "react";
import { NodeType, PageNode } from "../../../models/node";
import { PageNodeEditor } from "../components/editors";
import { nanoid } from "nanoid";
import sampleImageUrl from "../../../images/sample.png";

const samplePage: PageNode = {
  id: nanoid(),
  type: NodeType.Page,
  children: [
    {
      id: nanoid(),
      type: NodeType.Text,
      text: "Hello, world!",
    },
    {
      id: nanoid(),
      type: NodeType.Image,
      // TODO: use real uploaded image or image data
      url: sampleImageUrl,
    },
  ],
};

const PreviewPanel: React.FC<PreviewPanelProps> = ({ page }) => {
  return <PageNodeEditor node={samplePage} />;
};

PreviewPanel.displayName = "PreviewPanel";

export default PreviewPanel;

export type PreviewPanelProps = {
  page?: PageNode;
};
