/* eslint-disable indent */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    indent: "off",
    "linebreak-style": ["error", "unix"],
    "no-unused-vars": "off",
    "react/react-in-jsx-scope": "off",
    "no-var": "error",
    "no-debugger": "error",
    "react/prop-types": "off",
  },
}
