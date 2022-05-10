# aoda.css

[![sass](https://img.shields.io/badge/dart--sass-v1.51.0-orange?style=flat-square&logo=github)](https://github.com/sass/dart-sass) [![stylelint](https://img.shields.io/badge/stylelint-v14.8.2-orange?style=flat-square&logo=github)](https://github.com/stylelint/stylelint) ![gzip](https://img.shields.io/badge/gzip-14.2kb-blue?style=flat-square)

🎨 更轻更快的原子化 css 样式库，让切页面变的更加愉悦！

[English](./README.md) | 中文

## 文档

示例效果可参见 [demo](https://aodazhang.com/project/aoda-css/#/) ，更多内容详见 [文档]() ，您可以关注 [changelog](./CHANGELOG.md) 获取本项目的最新进展！

## 安装与使用

#### 1.安装

- npm

  ```shell
  yarn add aoda.css -S
  # or
  npm i aoda.css -S
  ```

- cdn

  ```html
  <link
    href="https://aodazhang.com/project/aoda-css/index.css"
    rel="stylesheet"
  />
  ```

#### 2.使用

- main.ts

  ```typescript
  import { createApp } from 'vue'
  import App from './App.vue'
  // 1.在你项目的入口文件中引入 aoda.css
  import 'aoda.css'

  createApp(App).mount('#app')
  ```

- App.vue

  ```html
  <template>
    <!-- 2.使用 aoda.css 生成的属性选择器 -->
    <div id="app" bg-5>
      <ul fl-r>
        <li co-2></li>
        <li co-2></li>
        <li co-2></li>
      </ul>
    </div>
  </template>
  ```
