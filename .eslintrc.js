module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  overrides: [
    {
      files: '*.js',
      env: { node: true },
    },
    {
      files: '*.spec.js',
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
    },
  ],
};
