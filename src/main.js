import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import '@mdi/font/css/materialdesignicons.css'
import '@tabler/icons-webfont/dist/tabler-icons.min.css';


loadFonts()

createApp(App).use(router).use(vuetify).mount('#app')
