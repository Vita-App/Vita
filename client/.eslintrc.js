module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'xo', 'eslint:recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prefer-arrow'],
  rules: {
    indent: ['off'],
    'object-curly-spacing': ['error', 'always'],
    camelcase: 'off',
    'capitalized-comments': 'off',
    'arrow-parens': 'off',
    'no-warning-comments': 'off',
    'no-unused-vars': 'off',
    'no-negated-condition': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'prefer-arrow/prefer-arrow-functions': [
      'warn',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
    'no-mixed-operators': [
      'warn',
      {
        groups: [
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: false,
      },
    ],
    'operator-linebreak': 'off',
    complexity: 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
