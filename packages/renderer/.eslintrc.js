module.exports = {
  env: {
    browser: true,
    node: false,
  },
  extends: [
    /** @see https://eslint.vuejs.org/rules/ */
    'plugin:vue/vue3-recommended',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 12,
    sourceType: 'module',
  },
}
