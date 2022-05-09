# aoda.css

[![sass](https://img.shields.io/badge/dart--sass-v1.51.0-orange?style=flat-square&logo=github)](https://github.com/sass/dart-sass) ![gzip](https://img.shields.io/badge/gzip-16.4kb-blue?style=flat-square)

🎨 Lighter and faster atomic stylesheet, make writing css more enjoyable!

## Installation and Usage

1.Installation

```shell
yarn add aoda.css -S
# or
npm i aoda.css -S
```

2.Usage

- main.ts：your project entry file

  ```typescript
  import { createApp } from 'vue'
  import App from './App.vue'
  // 1.import aoda.css
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

## Documentation and Changelog

Get started with the [documentation]() , focus on [changelog](./CHANGELOG.md) of project.
