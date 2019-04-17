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
import defaultControlFactory from './defaultControlFactory.js'
import { mapGetters } from 'vuex'
 export default {
   name: 'defaultControl',
   data () {
     return {
       checkedList: [],
       defaultControlList: [
          {
            "id": "ZoomToExtent",
            "label": "导航控件"
          },{
            "id": "ZoomSlider",
            "label": "缩放控件"
          },{
            "id": "MousePosition",
            "label": "鼠标位置"
          },{
            "id": "ScaleLine",
            "label": "比例尺"
          },{
            "id": "OverviewMap",
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
      // 获取地图控件总函数
      'getDefaultControl',
      //获取地图默认控件显示状态总函数
      'getDefaultControlShowState'
    ])
   },
   methods: {
     ifDisplay(checked,id) {
       let isShowId = 'isShow' + id
       switch(id){
         //缩放控件
         case 'ZoomSlider':{
           //获取zoomslider的目前显示状态 true/false
           let haszoomSlider = this.getDefaultControlShowState(isShowId)
           //如果勾选选择框且地图中没有缩放控件，则进行添加
           if(checked && !haszoomSlider){
             this.$store.commit('addDefaultControl',{
               DefaultControl:defaultControlFactory.zoomslider(),
               ControlType:id}
               )
           }
           //如果没有勾选选择框且地图中有缩放控件,则进行删除
           else if(!checked && haszoomSlider){
             this.$store.commit('removeDefaultControl',isShowId)
           }
           break;
         }
         //鼠标位置控件
         case 'MousePosition':{
           //获取mousePosition目前显示状态
           let hasmousePosition = this.getDefaultControlShowState(isShowId)
           //如果勾选选择框且地图中没有鼠标位置控件，则进行添加
           if(checked && !hasmousePosition){
             this.$store.commit('addDefaultControl',{
               DefaultControl:defaultControlFactory.mouseposition(),
               ControlType:id})
           }//如果没有勾选选择框且地图中有鼠标位置控件,则进行删除
           else if(!checked && hasmousePosition){
             this.$store.commit('removeDefaultControl',isShowId)
           }
           break;
         }
         //比例尺控件
         case 'ScaleLine':{
            //获取scaleLine目前显示状态
           let hasscaleLine = this.getDefaultControlShowState(isShowId)
           //如果勾选选择框且地图中没有比例尺控件，则进行添加
           if(checked && !hasscaleLine){
             this.$store.commit('addDefaultControl',{
               DefaultControl:defaultControlFactory.scaleline(),
               ControlType:id})
           }//如果没有勾选选择框且地图中有比例尺控件,则进行删除
           else if(!checked && hasscaleLine){
             this.$store.commit('removeDefaultControl',isShowId)
           }
           break;
         }
         //鹰眼控件
         case 'OverviewMap':{
           //获取overviewMap目前显示状态
           let hasoverviewMap = this.getDefaultControlShowState(isShowId)
           //如果勾选选择框且地图中没有鹰眼控件，则进行添加
           if(checked && !hasoverviewMap){
             this.$store.commit('addDefaultControl',{
               DefaultControl:defaultControlFactory.overviewmap(),
               ControlType:id})
           }//如果没有勾选选择框且地图中有鹰眼控件,则进行删除
           else if(!checked && hasoverviewMap){
             this.$store.commit('removeDefaultControl',isShowId)
           }
           break;
         }
         //导航控件
         case 'ZoomToExtent':{
           //获取zoomToExtend目前显示状态
           let haszoomToExtent = this.getDefaultControlShowState(isShowId)
           console.log(haszoomToExtent)
           //如果勾选选择框且地图中没有鹰眼控件，则进行添加
           if(checked && !haszoomToExtent){
             this.$store.commit('addDefaultControl',{
               DefaultControl:defaultControlFactory.zoomtoextent(),
               ControlType:id})
           }//如果没有勾选选择框且地图中有鹰眼控件,则进行删除
           else if(!checked && haszoomToExtent){
             this.$store.commit('removeDefaultControl',isShowId)
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
