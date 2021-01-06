const path = require("path");
const root = path.join.bind(null, __dirname, "..");
const src = path.join.bind(null, root(), "src");
module.exports = { root, src };
