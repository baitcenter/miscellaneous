import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/scss/style'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  ...App,
}).$mount('#app')
