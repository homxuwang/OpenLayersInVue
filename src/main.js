// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import loadImages from './components/utils/imagePath.js'
// import 'animate.css/animate.min.css';

Vue.config.productionTip = false

Vue.use(ElementUI);

//注册全局组件
Vue.prototype.$loadImages = loadImages //获取图片

//注册全局组件

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
