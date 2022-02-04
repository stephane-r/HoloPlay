module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "@react-native-community",
    "plugin:react/recommended",
    "airbnb",
    "airbnb/hooks",
    "prettier",
    "prettier/react"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: [
    "react",
    "react-hook",
    "react-native",
    "@typescript-eslint",
    "react-hook",
    "prettier"
  ],
  rules: { "prettier/prettier": "error" }
};
