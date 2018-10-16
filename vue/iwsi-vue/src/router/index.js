import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import u from '@/components/user/index'

Vue.use(Router)

export default new Router({
  /**
   * 使用history模式 (默认为锚点 #模式)
   */
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/user/index',
      name: '/user/index',
      component: u
    }
  ]
})
