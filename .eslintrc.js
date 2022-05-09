/**
 * @description eslint配置文件
 * @author aodazhang 2022.05.09
 * @extends https://cn.eslint.org/docs/rules/
 */

module.exports = {
  // 1.eslint根目录：当前 .eslintrc.js 所在目录即为根目录，eslint 规则将被限制到该目录下
  root: true,
  // 2.eslint检测环境
  env: {
    browser: true, // 在浏览器环境下启动 eslint，使用 canvas 相关 interface 不会报错
    node: true, // 在node环境下启动 eslint，使用 require 相关 interface 不会报错
    es2021: true,
    'vue/setup-compiler-macros': true // 使用vue3全局注入宏（defineProps、defineEmits等）不报错
  },
  // 3.eslint解析器
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser', // 使用 @typescript-eslint/parser 解析 ts 代码
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  // 4.eslint插件
  plugins: [
    'vue', // 使用 eslint-plugin-vue 校验 vue 代码
    '@typescript-eslint', // 使用 @typescript-eslint/eslint-plugin 校验 ts 代码
    'prettier' // eslint-plugin-prettier 指定 eslint 使用 prettier 格式化代码
  ],
  // 5.eslint扩展：配置预设校验规则集
  extends: [
    'eslint:recommended', // 使用 eslint 中 recommended 规则
    'plugin:vue/vue3-recommended', // 使用 eslint-plugin-vue 中 vue3-recommended 规则'
    'plugin:@typescript-eslint/recommended', // 使用 @typescript-eslint/eslint-plugin 中 recommended 规则
    'plugin:prettier/recommended', // 使用 eslint-plugin-prettier 中 recommended 规则
    'prettier' // 使用 eslint-config-prettier 关闭两者冲突规则
  ],
  // 6.eslint自定义规则
  rules: {
    'no-console': 'warn', // [警告]使用console
    'no-debugger': 'warn', // [警告]使用debugger
    '@typescript-eslint/no-unused-vars': 'error', // [错误]存在未使用变量
    '@typescript-eslint/no-explicit-any': 'warn', // [警告]使用any类型
    '@typescript-eslint/ban-types': 'warn', // [警告]使用禁令类型
    '@typescript-eslint/ban-ts-comment': 'warn', // [警告]使用ts特殊注释
    'vue/no-mutating-props': 'warn' // [警告]子组件修改了父组件传递的props变量
  }
}
