module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'prefer-object-spread': 0,
    'import/order': 2,
    'no-param-reassign': 0,
    '@typescript-eslint/no-unused-expressions': 0,
    'no-underscore-dangle': 0,
    '@typescript-eslint/no-this-alias': 0,
    '@typescript-eslint/no-shadow': 0,
    'prefer-const': [0, { destructuring: 'all' }],
    'no-restricted-syntax': 0,
    'consistent-return': [0, { treatUndefinedAsUnspecified: true }],
    '@typescript-eslint/no-use-before-define': [0, { functions: true }],
  },
  ignorePatterns: ['src/__tests__/**', 'rollup.config.js', 'commitlint.config.js'],
};
