const path = require("path");
const name = "gossip";
export default {
  base: `/${name}`,
  publicPath: `/${name}/`,
  alias: {
    "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js")
  },
  plugins: [
    [
      "umi-plugin-react",
      {
        dva: {
          immer: true
        },
        antd: true,
        title: {
          defaultTitle: name
        }
      }
    ]
  ]
};
