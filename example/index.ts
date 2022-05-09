import VConsole from 'vconsole'
import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import './registerServiceWorker'
import './index.scss'

new VConsole()

createApp(App).use(router).use(store).mount('#root')
