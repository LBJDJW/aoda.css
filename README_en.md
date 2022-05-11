# aoda.css

[![sass](https://img.shields.io/badge/dart--sass-v1.51.0-orange?style=flat-square&logo=github)](https://github.com/sass/dart-sass) [![stylelint](https://img.shields.io/badge/stylelint-v14.8.2-orange?style=flat-square&logo=github)](https://github.com/stylelint/stylelint) ![gzip](https://img.shields.io/badge/gzip-14.2kb-blue?style=flat-square)

🎨 Lighter and faster atomic stylesheet, make writing css more enjoyable!

[中文](./README.md) | English

## Documentation

You can see the effect through the [demo](https://aodazhang.com/project/aoda-css/#/) , get started with the [documentation](https://aodazhang.com/aoda-css) , focus on [changelog](./CHANGELOG.md) of the project to get the latest progress !

## Installation and Usage

#### 1.Installation

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

#### 2.Usage

- main.ts

  ```typescript
  import { createApp } from 'vue'
  import App from './App.vue'
  // 1.import aoda.css in your entry file
  import 'aoda.css'

  createApp(App).mount('#app')
  ```

- App.vue

  ```html
  <template>
    <!-- 2.using aoda.css's attribute selector -->
    <div id="app" bg-5>
      <ul fl-r>
        <li co-2></li>
        <li co-2></li>
        <li co-2></li>
      </ul>
    </div>
  </template>
  ```
