module.exports = {
  testMatch: ['**/test/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js)'],
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
};
