import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index.js'
import 'normalize.css'

const app = createApp(App)
app.use(store)
app.mount('#app')
