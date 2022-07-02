const NO_ERROR = 0;

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': NO_ERROR,
    'no-use-before-define': NO_ERROR,
    'consistent-return': NO_ERROR,
  },
};
