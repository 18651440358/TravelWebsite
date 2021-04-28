import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 字体注册
import './assets/font/Poppins/font.css';
import './assets/font/SourceHanSans/font.css';
import './assets/font/Pattaya/font.css';

// i18n
import i18n from './i18n'

// vuex
import store from './store'

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
