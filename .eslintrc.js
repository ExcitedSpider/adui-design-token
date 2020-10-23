const prettierConfig = require('./.prettierrc.js');

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true,
  },
  extends: [
    '@tencent/eslint-config-tencent',
    '@tencent/eslint-config-tencent/ts',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': ['warn', prettierConfig],
    'no-require-imports': false,
  },
};
