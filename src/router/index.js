import Vue from 'vue'
import Router from 'vue-router'
import freeDraw from '@/components/home/components/components/draw/freeDraw'
import standardDraw from '@/components/home/components/components/draw/standardDraw'
import coordinateDraw from '@/components/home/components/components/draw/coordinateDraw'
import clickCheck from '@/components/home/components/components/check/clickCheck'
import valueCheck from '@/components/home/components/components/check/valueCheck'

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
