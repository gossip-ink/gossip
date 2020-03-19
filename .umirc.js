const path = require("path");
export default {
  base: "/uidea",
  publicPath: "/uidea/",
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
          defaultTitle: "uIdea"
        }
      }
    ]
  ]
};
