/**
 * @description @babel/core配置文件
 * @author aodazhang 2022.05.09
 * @extends https://www.babeljs.cn/docs/presets
 */

module.exports = {
  // 1.babel预设
  presets: [
    [
      '@babel/preset-env', // 使用 @babel/preset-env 基础编译预设
      {
        useBuiltIns: 'usage', // 采用 core-js 的 polyfill 方案
        corejs: 3
      }
    ],
    [
      '@babel/preset-typescript', // 使用 @babel/preset-typescript 编译 ts
      {
        allExtensions: true // 支持所有文件扩展名，否则在vue文件中使用ts会报错
      }
    ]
  ],
  // 2.babel插件
  plugins: [
    '@babel/plugin-proposal-class-properties' // 允许 babel-loader 转换装饰器语法
  ]
}
