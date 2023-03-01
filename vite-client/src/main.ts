import { createApp } from 'vue/dist/vue.esm-bundler'
import VueNumber from 'vue-number-animation'
import Vue3Autocounter from 'vue3-autocounter'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import i18n from './i18n'

createApp(App).
    use(router).
    component('vue3-autocounter', Vue3Autocounter).
    use(VueNumber).
    use(i18n).
    mount('#app')

