module.exports = {
  root: true,
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./frontend/tsconfig.json", "./backend/tsconfig.json"],
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "prettier", "import"],
  rules: {
    "prettier/prettier": ["error"],
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-relative-packages": "off",
    "import/no-self-import": "off",
    "import/no-cycle": "off",
    "import/no-duplicates": "warn",
    "import/order": "warn",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "@typescript-eslint/lines-between-class-members": "off",
    "@typescript-eslint/no-throw-literal": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "no-console": "off",
    "no-param-reassign": "off",
    "react/no-array-index-key": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "react/jsx-fragments": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: ["./frontend/tsconfig.json", "./backend/tsconfig.json"],
      },
    },
    react: {
      version: require("./frontend/package.json").dependencies.react,
    },
  },
};
