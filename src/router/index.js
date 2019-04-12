import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        index: 0,
        keepAlive: true,
        title: '主窗口'
      },
      component: resolve => require(['@/components/home/home'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        index: 0,
        keepAlive: true,
        title: '登陆'
      },
      component: resolve => require(['@/components/login/login'], resolve)
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
