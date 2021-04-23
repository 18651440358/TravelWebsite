import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 字体注册


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
