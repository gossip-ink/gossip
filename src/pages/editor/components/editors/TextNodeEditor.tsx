import React from "react";
import PropTypes from "prop-types";
import * as N from "../../../../models/node";

const TextNodeEditor: React.FC<TextNodeEditorProps> = ({ node }) => {
  return <div className="hover:border hover:border-blue-400">{node.text}</div>;
};

TextNodeEditor.displayName = "TextNodeEditor";

TextNodeEditor.propTypes = {
  node: PropTypes.object.isRequired as PropTypes.Validator<N.TextNode>,
};

export default TextNodeEditor;

export type TextNodeEditorProps = { node: N.TextNode };
