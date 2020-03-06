import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import VModal from 'vue-js-modal'
import VueChatScroll from 'vue-chat-scroll'

import '@/assets/styles/index.css'
import '@/assets/styles/tailwind.css'
import store from './store'

// icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserTie)

Vue.config.productionTip = false

Vue.component('fa', FontAwesomeIcon)
Vue.use(VModal)
Vue.use(VueChatScroll)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
