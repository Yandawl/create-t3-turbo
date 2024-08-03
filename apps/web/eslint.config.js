import baseConfig, { restrictEnvAccess } from "@webmeric/eslint-config/base";
import nextjsConfig from "@webmeric/eslint-config/web";
import reactConfig from "@webmeric/eslint-config/react";

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
