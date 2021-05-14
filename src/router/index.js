import Vue from 'vue'
import VueRouter from 'vue-router'

// 着陆页
import landing from '@/pages/landing/Landing.vue';

Vue.use(VueRouter)

const routes = [
  {path: '/',redirect: '/search'},
  {
    path: '/landing',
    name: '着落页',
    component: landing
  },
  {
    path: '/search',
    name: '查找',
    component: () => import(/* webpackChunkName: "about" */ '../pages/search/search.vue')
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
