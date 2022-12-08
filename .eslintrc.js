module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "simple-import-sort"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "simple-import-sort/imports": 1,
    "simple-import-sort/exports": 1,
    "@typescript-eslint/no-unused-vars": 1,
    "prefer-const": 1,
  },
};
