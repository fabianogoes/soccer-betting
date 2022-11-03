import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'

const api = axios.create({ baseURL: 'https://api.example.com' })

const app = createApp(App)

app
    .use(store)
    .use(router)

app.config.globalProperties.$axios = axios
app.config.globalProperties.$api = api    

app.mount('#app')

export { api }

import "bootstrap/dist/js/bootstrap.js"