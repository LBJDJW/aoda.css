import { defineStore } from 'pinia'

const commonStore = defineStore('common', {
  state: () => ({}),

  actions: {
    async init() {
      console.log(
        '项目参数',
        PROJECT_ENV,
        PROJECT_VERSION,
        'serviceWorker' in navigator
      )
    }
  }
})

export default commonStore
