const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  extends: ['@souyahia/eslint-config-typescript'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  rules: {
    'dot-notation': OFF,
  }
};
