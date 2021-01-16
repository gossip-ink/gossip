import React from "react";
import PropTypes from "prop-types";
import * as N from "../../../../models/node";

const RichTextNodeEditor: React.FC<RichTextNodeEditorProps> = ({ node }) => {
  return <div>This is the an editor for RichTextNode.</div>;
};

RichTextNodeEditor.displayName = "RichTextNodeEditor";

RichTextNodeEditor.propTypes = {
  node: PropTypes.object.isRequired as PropTypes.Validator<N.RichTextNode>,
};

export default RichTextNodeEditor;

export type RichTextNodeEditorProps = { node: N.RichTextNode };
