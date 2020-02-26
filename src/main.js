import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

import '@/assets/styles/index.css'
import '@/assets/styles/tailwind.css'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
