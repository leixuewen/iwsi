import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import u from '@/components/user/index'

Vue.use(Router)

export default new Router({
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
