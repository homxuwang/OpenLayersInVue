本仓库记录学习在Vue中使用OpenLayers的过程

用到的主要组件:
```
"element-ui": "^2.4.4",
"ol": "^5.3.1"
```

# vueopenlayers

> use Vue.js & OpenLayers.

# 项目结构

本项目没有构建单元测试部分和ESLint功能(因为我太菜了ORZ,省点事吧OAO)
```
├── README.md
├── index.html                   入口页面
├── build                        构建脚本目录
│  ├── build-server.js           运行本地构建服务器，可以访问构建后的页面
│  ├── build.js                  生产环境构建脚本
│  ├── dev-client.js             开发服务器热重载脚本，主要用来实现开发阶段的页面自动刷新
│  ├── dev-server.js             运行本地开发服务器
│  ├── utils.js                  构建相关工具方法
│  ├── webpack.base.conf.js      wabpack基础配置
│  ├── webpack.dev.conf.js       wabpack开发环境配置
│  └── webpack.prod.conf.js      wabpack生产环境配置
├── config                       项目配置
│  ├── dev.env.js                开发环境变量
│  ├── index.js                  项目配置文件
│  ├── prod.env.js               生产环境变量
│  └── test.env.js               测试环境变量
├── package.json                 npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
├── src                          源码目录  
│  ├── main.js                   入口js文件
│  ├── App.vue                   根组件
│  ├── components                公共组件目录
│  │  ├── home                   主页组件目录
│  │  │  ├── components
│  │  │  │   ├── components
│  │  │  │   │  ├── check
│  │  │  │   │  │  ├── clickCheck.vue
│  │  │  │   │  │  └── valueCheck.vue
│  │  │  │   │  ├── defaultControl
│  │  │  │   │  │  ├── defaultControl.vue
│  │  │  │   │  │  └── defaultControlCode.js
│  │  │  │   │  └── draw  
│  │  │  │   │     ├── coordinateDraw.vue
│  │  │  │   │     ├── freeDraw.vue  
│  │  │  │   │     ├── initializationDrawElements.js
│  │  │  │   │     └── standardDraw.vue
│  │  │  │   ├── leftBottom.vue
│  │  │  │   └── leftTop.vue
│  │  │  └── home.vue
│  │  ├── map                    地图组件目录
│  │  │  └── map-component.vue   地图组件
│  │  ├── login                  登陆目录
│  │  │  └── login.vue           登陆组件
│  │  ├── modules                通用组件
│  │  │  ├── appHeader.vue       顶部组件
│  │  │  ├── appBottom.vue       底部组件
│  │  │  └── popForConfirm.vue   弹出框组件
│  │  ├── utils                  工具目录
│  │  │  ├── dateUtil.js         日期辅助函数
│  │  │  ├── localStorage.js     存取登录信息
│  │  │  └── imagePath.js        获取图片路径
│  ├── assets                    资源目录，这里的资源会被wabpack构建
│  │  └── images
│  │  │  ├── logo.png
│  │  │  ├── logo_1.png
│  │  │  ├── bg.png
│  │  │  └── ....
│  ├── config                   地图配置目录
│  │  └── mapconfig.js          地图配置文件
│  ├── routes                   前端路由
│  │  └── index.js
│  └── store                    vuex
│     ├── action.js
│     ├── getter.js
│     ├── index.js
│     ├── mutations.js
│     └── state.js
├── static                      纯静态资源，不会被wabpack构建。
│  │  ├── json                  json配置文件
│  │  │  └── options.json       地图操作选项配置
│  │  └── config.js             用户、服务器配置文件
```

# todoList

- [x] 切换底图          2019/04/14
- [x] 地图基本控件      2019/04/15
   - [x] 比例尺
   - [x] 鼠标位置
   - [x] 鹰眼
   - [x] 缩放条
   - [x] 定位到某位置

- [x] 正则没有加精度输入负值时的判断,后续要改
- [x] 绘图功能
   - [x] 坐标添加
      - [x] 点添加      2019/04/18
      - [x] 圆添加      2019/04/19
      - [x] 线添加      2019/04/19
      - [x] 多边形添加      2019/04/19
      - [x] 长方形添加      2019/04/19
      - [x] 正方形添加      2019/04/19
 todo:切换底图时绘制的图形会消失

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 参考
* https://github.com/openlayer-tutorial-group/ol5-primer
* http://develop.smaryun.com:81/API/JS/OL3InterfaceDemo/index.htm