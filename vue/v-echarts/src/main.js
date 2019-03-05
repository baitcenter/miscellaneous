import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/plugins/echarts'

Vue.config.productionTip = false

new Vue({
  router,
  ...App,
}).$mount('#app')
