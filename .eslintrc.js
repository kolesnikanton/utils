module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
    jest: true,
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'jest',
    '@typescript-eslint',
  ],
  rules: {
    // Warn
    '@typescript-eslint/no-unused-vars': 'warn',

    // Off
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'valid-typeof': 'off',
    'no-plusplus': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',

    // Error
    'arrow-parens': ['error', 'as-needed'],
  },
};
