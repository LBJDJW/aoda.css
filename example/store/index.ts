import { createPinia } from 'pinia'
import commonStore from './modules/common'
import userStore from './modules/user'

const store = createPinia()

export { commonStore, userStore }
export default store
