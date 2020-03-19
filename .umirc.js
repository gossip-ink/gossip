export default {
  base: "/uidea",
  publicPath: "/uidea/",
  plugins: [
    [
      "umi-plugin-react",
      {
        dva: {
          immer: true
        },
        antd: true
      }
    ]
  ]
};
