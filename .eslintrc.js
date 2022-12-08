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

    // "prettier",
  ],
  rules: {
    "simple-import-sort/imports": 1,
    "simple-import-sort/exports": 1,
    "@typescript-eslint/no-unused-vars": 1,
  },
};

// "plugin:simple-import-sort/recommended",
// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//     node: true,
//   },
//   extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],

//   overrides: [],
//   parserOptions: {
//     ecmaVersion: "latest",
//     sourceType: "module",
//   },
//   plugins: ["react", "simple-import-sort"],
//   rules: {
//     "simple-import-sort/imports": "error",
//     "simple-import-sort/exports": "error",
//     "react/react-in-jsx-scope": "off",
//     "react/prop-types": 0,
//     "no-unused-vars": 0,
//   },
// };
