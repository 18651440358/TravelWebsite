import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 当前登陆用户
    currentlyUser: {
      userName: undefined,
      userCode: undefined
    },
    // 汇率
    exchangeRate: {
      USA: 0.1545
    },
    // 热门地区
    destinations: require('@/data/destinations.js')
  },
  mutations: {

  },
  getters: {

  },
  actions: {
  },
  modules: {
  }
})
