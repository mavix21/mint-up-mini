import baseConfig, { restrictEnvAccess } from "@mint-up/eslint-config/base";
import nextjsConfig from "@mint-up/eslint-config/next-js";
import reactConfig from "@mint-up/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
