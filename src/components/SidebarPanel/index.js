import Outline from "../Outline";
import Thumbnails from "../Thumbnails";
import Box from "../Box";
import { useState } from "react";
export default function({ height, name }) {
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
      name={name}
      closable={false}
    >
      {tree ? (
        <Outline {...props.outline} />
      ) : (
        <Thumbnails {...props.thumbnails} />
      )}
    </Box>
  );
}
