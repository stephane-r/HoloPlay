module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "@react-native-community",
    "plugin:react/recommended",
    "airbnb",
    "airbnb/hooks",
    "prettier",
    "prettier/react",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "react-hooks",
    "react-native",
    "@typescript-eslint",
    "prettier",
  ],
  rules: {
    "prettier/prettier": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
  },
};
