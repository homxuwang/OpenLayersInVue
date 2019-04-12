<template>
    <div id="app">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view />
      </keep-alive>
      <template v-else>
        <router-view />        
      </template>
    </div>
</template>

<script>
import VMap from './components/map/map-component.vue';
export default {
  name: 'App',
  components: {
    VMap
  }
}

</script>

<style>
  * {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  
  html,body{
    height: 100%;
  }
  #app {
    height: 100%;
  }
</style>
