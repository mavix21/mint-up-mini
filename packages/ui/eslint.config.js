import baseConfig from "@mint-up/eslint-config/base";
import reactConfig from "@mint-up/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**"],
  },
  ...baseConfig,
  ...reactConfig,
];
