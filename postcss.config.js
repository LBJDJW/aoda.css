/**
 * @description postcss后处理器配置文件
 * @author aodazhang 2022.05.09
 * @extends https://www.postcss.com.cn/
 */

module.exports = {
  // 1.配置插件
  plugins: {
    // 针对不同浏览器添加css前缀：https://github.com/postcss/autoprefixer
    autoprefixer: {},
    // 转换css单位px为vw：https://github.com/evrone/postcss-px-to-viewport
    'postcss-px-to-viewport': {
      exclude: [/node_modules/], // 忽略转换的目录
      selectorBlackList: ['no2vw'], // 忽略转换的类名
      minPixelValue: 1, // 忽略转换的最大px值：>1px转换
      viewportWidth: 750, // 设计稿宽度
      unitPrecision: 3, // 转换后保留有效数字
      unitToConvert: 'px', // 转换前的单位
      viewportUnit: 'vw', // 转换后的单位
      fontViewportUnit: 'vw', // 字体转后后的单位
      mediaQuery: false // 是否转换媒体查询的单位
    }
  }
}
