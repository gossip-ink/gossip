import Outline from "../Outline";
import Thumbnails from "../Thumbnails";
import Box from "../Box";
import { useState } from "react";
export default function({ height }) {
  const content = height - 10;
  const [tree, setTree] = useState(true);
  const props = {
    outline: {
      height: content - 60
    },
    thumbnails: {
      height: content - 60
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
