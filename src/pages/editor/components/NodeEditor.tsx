import React from "react";
import PropTypes from "prop-types";
import * as N from "../../../models/node";
import * as editors from "./editors";

/**
 * A dispatcher component that selects the right editor component for each type.
 * @param param0 the component props
 */
const NodeEditor: React.FC<NodeEditorProps> = ({ node }) => {
  switch (node.type) {
    case N.NodeType.Text:
      return <editors.TextNodeEditor node={node} />;
    case N.NodeType.Image:
      return <editors.ImageNodeEditor node={node} />;
    case N.NodeType.Chart:
      return <editors.ChartNodeEditor node={node} />;
    case N.NodeType.RichText:
      return <editors.RichTextNodeEditor node={node} />;
    case N.NodeType.Table:
      return <editors.TableNodeEditor node={node} />;
    case N.NodeType.Code:
      return <editors.CodeNodeEditor node={node} />;
    case N.NodeType.Markdown:
      return <editors.MarkdownNodeEditor node={node} />;
    case N.NodeType.Grid:
      return <editors.GridNodeEditor node={node} />;
    default:
      throw new Error(`unexpected node type "${node.type}"`);
  }
};

NodeEditor.displayName = "NodeEditor";

NodeEditor.propTypes = {
  // We only check the `type` property in the dispatcher component.
  node: PropTypes.shape({
    type: PropTypes.number.isRequired,
  }).isRequired as PropTypes.Validator<N.Node>,
};

export default NodeEditor;

export type NodeEditorProps = { node: N.Node };
