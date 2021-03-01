import path from "path";

export const root = path.join.bind(null, __dirname, "..");
export const src = path.join.bind(null, root(), "src");
