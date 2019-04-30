import Vue from 'vue'
import Router from 'vue-router'
import freeDraw from '@/components/home/components/components/draw/freeDraw.vue'
import standardDraw from '@/components/home/components/components/draw/standardDraw.vue'
import coordinateDraw from '@/components/home/components/components/draw/coordinateDraw'
import clickCheck from '@/components/home/components/components/check/clickCheck'
import valueCheck from '@/components/home/components/components/check/valueCheck'

import defaultControl from '@/components/home/components/components/defaultControl/defaultControl'
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
      children: [
        {
          path: 'freeDraw',
          component: freeDraw
        },
        {
          path: 'standardDraw',
          component: standardDraw
        },
        {
          path: 'coordinateDraw',
          component: coordinateDraw
        },
        {
          path: 'clickCheck',
          component: clickCheck
        },
        {
          path: 'valueCheck',
          component: valueCheck
        },
        {
          path: 'defaultControl',
          component: defaultControl
        }
      ],
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
