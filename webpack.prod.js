const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base.js');
const Merge = require('webpack-merge');

module.exports = Merge(baseConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',

  // 优化压缩选项
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({}),
    ]
  },
});
