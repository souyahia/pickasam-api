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
    '@typescript-eslint/no-misused-promises': OFF,
    'lines-between-class-members': OFF,
  },
  overrides: [
    {
      files: '*.entity.ts',
      rules: {
        'import/no-cycle': OFF,
        'no-use-before-define': OFF,
      },
    }
  ],
};
