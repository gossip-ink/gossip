import { Config } from "@swc/core";

export const ecmascript: Config = {
  env: {
    targets: "> 0.25%, not dead",
    dynamicImport: true,
    mode: "entry",
    coreJs: "3",
  },
  jsc: {
    parser: {
      syntax: "ecmascript",
      jsx: true,
    },
  },
  minify: true,
};

export const typescript: Config = {
  env: {
    targets: "> 0.25%, not dead",
    dynamicImport: true,
    mode: "entry",
    coreJs: "3",
  },
  jsc: {
    parser: {
      syntax: "typescript",
      tsx: true,
    },
  },
  minify: true,
};
