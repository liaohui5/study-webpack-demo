module.exports = {
  // 配置参考文档: http://eslint.cn/docs/user-guide/configuring
  root: true,

  parserOptions: {
    // 设置 ecmaScript 语法校验的版本, 如果设置为 5 则不能使用 es6 的语法
    ecmaVersion: 10,

    // 如果代码是 import export 这样的语法就设置为 module 默认是 script
    sourceType: 'module',

    // 额外的语言特性, 比如使用 jsx 语法
    ecmaFeatures: {
      // jsx: true, 是否启用 jsx 语法
    },

    // 指定代码运行的环境
    env: {
      browser: true, // 在浏览器环境运行
      node: true, // 在 node 环境运行
      es6: true, // 支持 es6 语法
    },

    // 扩展常用的代码规范
    extends: [
      // airbnb:   https://github.com/airbnb/javascript
      // standard: https://github.com/standard/standard
      // google:   https://github.com/google/eslint-config-google

      // "aribnb",
      // "google",
      'standard',
    ],


    rules: {
      // 缩进用2个空格
      indent: ['error', 2],

      // 字符串统一使用双引号
      quotes: ['error', 'double'],

      // 语句结尾必须加分号
      semi: ['error', 'always'],
    },

  },
};
