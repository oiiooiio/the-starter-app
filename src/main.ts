import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './router'
import 'virtual:windi.css'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia())

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

app.use(router)

app.mount('#app')
