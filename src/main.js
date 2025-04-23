import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate';
import { v4 as uuidv4 } from 'uuid';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.provide('uuid', uuidv4)

const pinia = createPinia()
app.use(pinia)
app.use(router)

// 使用 persist 插件
pinia.use(piniaPersist);

app.mount('#app')
