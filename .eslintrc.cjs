module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: [
    "react",
    "react-refresh"
  ],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/jsx-max-props-per-line": [
      "error",
      {
        "maximum": 3,
        "when": "always"
      }
    ],
    "react/jsx-first-prop-new-line": [2, "multiline"],
    "react/jsx-closing-tag-location": [2, "tag-aligned"],
    "react/prop-types": "off",
    "react/jsx-curly-brace-presence": [2, { "props": "always" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "react/react-in-jsx-scope": "off",
    "quotes": ["error", "double"],
    "jsx-quotes": ["error", "prefer-double"],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/typedef": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-inferrable-types": "warn",
    "semi": [2, "always"],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }],
    "eol-last": ["error", "always"],
    "no-console": "warn",
    "no-trailing-spaces": "error",
    'react/jsx-closing-bracket-location': [2, 'tag-aligned'],
  },
}
