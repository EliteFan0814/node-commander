module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    // indent: ["error", "tab"],
    // "linebreak-style": ["error", "windows"],
    // quotes: ["error", "double"],
    // semi: ["error", "always"],
    "prettier/prettier": [
      "warn",
      {
        singleQuote: false,
        tabs: false,
        parser: "flow",
        endOfLine: "auto",
        trailingComma: "es5",
        proseWrap: "always",
      },
    ],
  },
};
