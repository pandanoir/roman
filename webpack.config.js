module.exports = {
  mode: 'development',
  entry: require('path').resolve(__dirname, './src/main.ts'),
  output: {
    path: require('path').resolve(__dirname, './dist'),
    filename: 'roman.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
};
