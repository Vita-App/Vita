exports = {
  env: {
    node: true,
    jest: true,
  },
  extends: ['xo', 'plugin:node/recommended-module', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    indent: ['error', 2],
    'object-curly-spacing': ['error', 'always'],
  },
};
