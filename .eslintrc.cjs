module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended', 'prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  rules: {
    'no-console': 'off',
    'global-require': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'max-len': [
      'error',
      {
        code: 140,
        ignoreComments: true,
      },
    ],
    'import/prefer-default-export': 'off',
    'no-useless-escape': 'off',
    'no-await-in-loop': 'off',
    'noelse-return': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': ['warn', 'never'],
  },
};
