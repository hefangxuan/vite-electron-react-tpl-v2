module.exports = {
  env: {
    browser: true,
    node: false,
  },
  // extends: [
  //   /** @see https://eslint.vuejs.org/rules/ */
  //   'plugin:vue/vue3-recommended',
  // ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
  },
};
