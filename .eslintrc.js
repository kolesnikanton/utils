module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // Off
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'valid-typeof': 'off',
    'no-plusplus': 'off',

    // Error
    'arrow-parens': ['error', 'as-needed'],
  },
};
