import { createApp } from 'vue'

// import App from './components/todo-list/App.vue'
// import App from './components/refs/App.vue'
import App from './App.vue'

import './index.css'

import router from './router.js'

const app = createApp(App)

app.use(router)

app.mount('#app')
