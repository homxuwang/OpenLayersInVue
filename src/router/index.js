import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/map'
    },
    {
      path: '/map',
      name: 'map',
      meta: {
        index: 0,
        keepAlive: true,
        title: '地图'
      },
      component: resolve => require(['@/components/globa/map-component'], resolve)
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
