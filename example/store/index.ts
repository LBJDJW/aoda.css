import { createPinia, defineStore } from 'pinia'

const store = createPinia()

const commonStore = defineStore('common', {
  state: () => ({
    env: PROJECT_ENV,
    version: PROJECT_VERSION,
    buildTime: PROJECT_BUILDTIME,
    list: [] as string[]
  }),

  actions: {
    async init() {
      this.$patch({
        list: [
          '🍇',
          '🍈',
          '🍉',
          '🍊',
          '🍋',
          '🍌',
          '🍍',
          '🥭',
          '🍎',
          '🍏',
          '🍐',
          '🍑',
          '🍒',
          '🍓',
          '🥝',
          '🍅',
          '🥥'
        ]
      })
    }
  }
})

export { commonStore }
export default store
