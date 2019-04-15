<template>
 <div>
   <el-checkbox-group v-model="checkedList">
     <el-checkbox v-for="control in defaultControlList" 
                  :label="control.label" 
                  :key="control.id"
                  @change="checked=>ifDisplay(checked,control.id)">
       {{ control.label }}
     </el-checkbox>
   </el-checkbox-group>
 </div>
</template>

<script>
import defaultControlCode from './defaultControlCode.js'
import { mapGetters } from 'vuex'
 export default {
   name: 'defaultControl',
   data () {
     return {
       checkedList: [],
       defaultControlList: [
          {
            "id": "zoomToExtend",
            "label": "导航控件"
          },{
            "id": "zoomSlider",
            "label": "缩放控件"
          },{
            "id": "mousePosition",
            "label": "鼠标位置"
          },{
            "id": "scaleLine",
            "label": "比例尺"
          },{
            "id": "overviewMap",
            "label": "鹰眼控件"
          }
      ]
     }
   },   
   computed: {
     ...mapGetters([
      //地图底图
      'layers',
      //地图中心位置
      'center',
      //地图缩放控件显示状态
      'isShowZoomSlider',
      //地图鼠标位置控件显示状态
      'isShowMousePosition',
      //地图比例尺控件
      'getScaleLine',
      //地图比例尺控件显示状态
      'isShowScaleLine',
      //地图鹰眼控件
      'getOverviewMap',
      //地图鹰眼控件显示状态
      'isShowOverviewMap',
      //地图导航控件
      'getZoomToExtent',
      //地图导航控件显示状态
      'isShowZoomToExtent'
    ])
   },
   methods: {
     ifDisplay(checked,id) {
       switch(id){
         //缩放控件
         case 'zoomSlider':{
           //获取zoomslider的目前显示状态 true/false
           let haszoomSlider = this.isShowZoomSlider
           //如果勾选选择框且地图中没有缩放控件，则进行添加
           if(checked && !haszoomSlider){
             this.$store.commit('addZoomSlider',defaultControlCode.zoomslider())
           }
           //如果没有勾选选择框且地图中有缩放控件,则进行删除
           else if(!checked && haszoomSlider){
             this.$store.commit('removeZoomSlider')
           }
           break;
         }
         //鼠标位置控件
         case 'mousePosition':{
           //获取mousePosition目前显示状态
           let hasmousePosition = this.isShowMousePosition
           //如果勾选选择框且地图中没有鼠标位置控件，则进行添加
           if(checked && !hasmousePosition){
             this.$store.commit('addMousePosition',defaultControlCode.mouseposition())
           }//如果没有勾选选择框且地图中有鼠标位置控件,则进行删除
           else if(!checked && hasmousePosition){
             this.$store.commit('removeMousePosition')
           }
           break;
         }
         //比例尺控件
         case 'scaleLine':{
            //获取scaleLine目前显示状态
           let hasscaleLine = this.isShowScaleLine
           //如果勾选选择框且地图中没有比例尺控件，则进行添加
           if(checked && !hasscaleLine){
             this.$store.commit('addScaleLine',defaultControlCode.scaleline())
           }//如果没有勾选选择框且地图中有比例尺控件,则进行删除
           else if(!checked && hasscaleLine){
             this.$store.commit('removeScaleLine')
           }
           break;
         }
         //鹰眼控件
         case 'overviewMap':{
           //获取overviewMap目前显示状态
           let hasoverviewMap = this.isShowOverviewMap
           //如果勾选选择框且地图中没有鹰眼控件，则进行添加
           if(checked && !hasoverviewMap){
             this.$store.commit('addOverviewMap',defaultControlCode.overviewmap())
           }//如果没有勾选选择框且地图中有鹰眼控件,则进行删除
           else if(!checked && hasoverviewMap){
             this.$store.commit('removeOverviewMap')
           }
           break;
         }
         //导航控件
         case 'zoomToExtend':{
           //获取zoomToExtend目前显示状态
           let haszoomToExtend = this.isShowZoomToExtent
           //如果勾选选择框且地图中没有鹰眼控件，则进行添加
           if(checked && !haszoomToExtend){
             this.$store.commit('addZoomToExtent',defaultControlCode.zoomtoextent())
           }//如果没有勾选选择框且地图中有鹰眼控件,则进行删除
           else if(!checked && haszoomToExtend){
             this.$store.commit('removeZoomToExtent')
           }
           break;
         }
       }       
     }
   },
   
 }
</script>

<style>

 
</style>
