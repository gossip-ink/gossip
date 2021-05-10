const path = require("path");

export default {
  base: `/`,
  publicPath: `/`,
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
          defaultTitle: "Gossip"
        }
      }
    ]
  ]
};
