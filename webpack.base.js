const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      // 处理 js
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除 node_modules 目录
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      chrome: '50',
                    },
                  },
                ],
              ],

              // babel 插件
              plugins: [
                [
                  '@babel/plugin-transform-runtime',
                  {
                    absoluteRuntime: false,
                    corejs: 2, // 不污染全局作用域
                    helpers: true,
                    regenerator: true,
                    useESModules: false,
                  },
                ],
              ],
            },
          },
          {
            loader: 'eslint-loader',
            options: {
              enforce: 'pre',
              fix: true,
            },
          },
        ],
      },

      // 处理字体
      {
        test: /\.(eot|json|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              filename: '[name].[ext]',
              outputPath: 'fonts',
            },
          },
        ],
      },

      // 处理图片
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: 'images/',
              limit: 1024 * 100, // 100k
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },


      // 处理样式
      {
        test: /\.(c|le)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // 将css代码抽离为为单独的文件, 然后使用 link 标签导入
          },
          'css-loader',
          'less-loader',
          'postcss-loader',
        ],
      },
    ],
  },

  plugins: [
    // 将打包内容插入到html模板插件
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true, // 删除空格和换行
        removeComments: true, // 删除注释
        useShortDoctype: true, // 使用 html5 的的 doctype
      },
      template: './index.html',
    }),

    // 抽离 css 插件
    new MiniCssExtractPlugin(),

    // 清除上一次打包结果插件
    new CleanWebpackPlugin(),

    // 复制静态文件插件
    new CopyWebpackPlugin([
      {
        from: './docs',
        to: 'docs',
      },
    ]),
  ],
};
