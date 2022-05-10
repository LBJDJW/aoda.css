/**
 * @description stylelint配置文件
 * @author aodazhang 2022.05.10
 * @extends https://github.com/stylelint/stylelint
 */

module.exports = {
  // 1.忽略文件
  ignoreFiles: [
    'node_modules/**/*',
    'dist/**/*',
    'dist-example/**/*',
    'dist-scss/**/*'
  ],
  // 2.插件
  plugins: [
    'stylelint-order' // 配合stylelint-config-rational-order
  ],
  // 3.扩展：配置stylelint预设规则
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss',
    'stylelint-config-rational-order' // 必须按照指定顺序声明css属性：https://github.com/constverum/stylelint-config-rational-order
  ],
  // 4.自定义规则
  rules: {
    'scss/at-import-partial-extension': null, // [忽略].scss为非法扩展名
    'scss/at-import-no-partial-leading-underscore': null // [忽略]scss文件名不能以下划线开头
  }
}
