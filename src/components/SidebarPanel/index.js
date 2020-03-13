import classNames from "./index.css";
import Outline from "../Outline";
import Thumbnails from "../Thumbnails";
import Box from "../Box";
import { useState } from "react";
export default function({ height, isDrag, setIsDrag }) {
  const content = height - 10;
  const [tree, setTree] = useState(true);
  const props = {
    outline: {
      setIsDrag,
      height: content - 50
    },
    thumbnails: {
      height: content - 50,
      isDrag,
      setIsDrag
    }
  };

  return (
    <Box
      height={height}
      nodata={false}
      title={tree ? "大纲" : "缩略图"}
      onSwitch={() => setTree(!tree)}
    >
      {tree ? (
        <Outline {...props.outline} />
      ) : (
        <Thumbnails {...props.thumbnails} />
      )}
    </Box>
  );
}
