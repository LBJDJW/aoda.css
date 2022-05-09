import { defineStore } from 'pinia'
import commonStore from './common'

const userStore = defineStore('user', {
  state: () => ({
    token: '',
    name: ''
  }),

  actions: {
    async login() {
      try {
        const [token, name] = await Promise.all([
          new Promise<string>(resolve =>
            setTimeout(() => resolve('abcdefg'), 1000)
          ),
          new Promise<string>(resolve =>
            setTimeout(() => resolve('aodazhang'), 500)
          )
        ])
        this.$patch({ token, name })
        await commonStore().init()
      } catch (error) {
        this.$patch({ token: '', name: '' })
      }
    }
  }
})

export default userStore
