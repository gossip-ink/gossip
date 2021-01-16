import React from "react";
import PropTypes from "prop-types";
import * as N from "../../../../models/node";

const ImageNodeEditor: React.FC<ImageNodeEditorProps> = ({ node }) => {
  return (
    <div className="overflow-hidden">
      <img className="max-w-full max-h-full" src={node.url} alt={node.alternativeText} />
    </div>
  );
};

ImageNodeEditor.displayName = "ImageNodeEditor";

ImageNodeEditor.propTypes = {
  node: PropTypes.object.isRequired as PropTypes.Validator<N.ImageNode>,
};

export default ImageNodeEditor;

export type ImageNodeEditorProps = { node: N.ImageNode };
