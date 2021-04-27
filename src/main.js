import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 字体注册
import './assets/font/Poppins/font.css';
import './assets/font/SourceHanSans/font.css';
import './assets/font/Pattaya/font.css';
import i18n from './i18n'

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
