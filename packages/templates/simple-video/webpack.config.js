const path = require('path');
const { merge } = require('webpack-merge');
const common = require('@scrowl/config/webpack');
const config = require('./package.json');

module.exports = merge(common, {
  entry: {
    [`${path.basename(config.exports['./web'], '.js')}`]: './web/index.ts',
  },
  module: {
    noParse: [
      require.resolve('@scrowl/template-core'),
      require.resolve('@scrowl/ui'),
    ],
  },
  externals: {
    '@scrowl/template-core': {
      root: 'Scrowl',
      commonjs: '@scrowl/template-core',
      commonjs2: '@scrowl/template-core',
    },
    '@scrowl/ui': {
      root: 'Scrowl',
      commonjs: '@scrowl/ui',
      commonjs2: '@scrowl/ui',
    },
  },
  output: {
    libraryTarget: "umd",
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
});