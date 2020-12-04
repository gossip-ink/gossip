import Outline from "../Outline";
import Thumbnails from "../Thumbnails";
import Box from "../Box";
import { useState } from "react";
import { connect } from "dva";

export default connect(({ global }) => ({
  lang: global.lang,
  locales: global.locales,
}))(function({ height, name, lang, locales }) {
  const content = height - 10;
  const [tree, setTree] = useState(true);
  const props = {
    outline: {
      height: content - 60,
    },
    thumbnails: {
      height: content - 60,
    },
  };

  return (
    <Box
      height={height}
      nodata={false}
      title={tree ? locales.OUTLINE[lang] : locales.THUMBNAILS[lang]}
      onSwitch={() => setTree(!tree)}
      name={name}
      closable={false}
      url="https://github.com/pearmini/gossip#organizing-outline-and-thumnails"
    >
      {tree ? (
        <Outline {...props.outline} />
      ) : (
        <Thumbnails {...props.thumbnails} />
      )}
    </Box>
  );
});
