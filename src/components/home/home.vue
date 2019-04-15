<template>
 <div class="home">
   <app-header></app-header>

   <div class="app-content">
     <!-- 左边栏 -->
     <div class="left-content">
       <!-- 左边上半部分图层和操作 -->
       <left-top class="left-content-top">
         <router-view></router-view>
       </left-top>
       <!-- 左边下半部分操作选择 -->
       <left-bottom class="left-content-bottom"></left-bottom>
     </div>

     <!-- 右边地图 -->
     <div class="right-content">
       <v-map class="v_map"></v-map>
     </div>
   </div>

   <app-bottom></app-bottom>
 </div>
</template>

<script>
import appHeader from '@/components/modules/appHeader'
import appBottom from '@/components/modules/appBottom'
import leftTop from '@/components/home/components/leftTop'
import leftBottom from '@/components/home/components/leftBottom'
import VMap from '@/components/map/map-component'
 export default {
   name: 'home',
   components: {
     appHeader,
     leftTop,
     leftBottom,
     appBottom,
     VMap
   },
   data () {
     return {
     }
   },
   methods: {
   },
   mounted() {
   }
  }
</script>

<style lang="less" scope>
 .home {
   width: 100%;
   height: 100%;
   overflow: hidden;
   position: relative;
   background-color: #eee;
   background-size: 100% 100%;
   .app-content {
    width: 100%;
    height: calc(100% - 86px);
    padding-bottom: 5px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    position: relative;
    position: relative;
   }

  .left-content{
    width: 15%;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 5px;
    left: 5px;
    bottom: 10px;
    .left-content-top{
      width: 100%;
      height: 35%;
      background-color: #ffffff;
      background-size: 100% 100%;
      background-position: top left;
      background-repeat: no-repeat;
      box-sizing:border-box;
      &:last-child{
        padding: 0 3px 3px;
        background-color: #ffffff;
      }
    }
    .left-content-bottom{
      border-top: 2px solid black;
      width: 100%;
      height: 65%;
      background-color: #ffffff;
      background-size: 100% 100%;
      background-position: top left;
      background-repeat: no-repeat;
      box-sizing:border-box;
      // box-shadow:0px 0px 5px 2px #00eeee;
      &:last-child{
        padding: 0 3px 3px;
        background-color: #ffffff;
      }
    }
  }

  .right-content{
      width: 84%;
      position: relative;
      top: 5.7px;
      left: 47.6%;
      bottom: 10px;
      transform: translateX(-28%);
      -webkit-transform: translateX(-38%);
      box-sizing: border-box;
      padding: 1.15% 0.45% 0.35% 1.15%;
      // box-shadow: 0px 0px 13px #00eeee;
    }

  

 }
</style>
