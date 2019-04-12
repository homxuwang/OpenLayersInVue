<template>
 <div>
   <div class="tab">
     <span class="active">图层管理</span>
     <span class="active">操作</span>
   </div>

   <div class="panel" ref="panel">
     <!-- 图层树组件 -->
     <el-tree style="padding: 0 0 5px 5px;background-color: rgba(20,36,68,0)!important;"
              :data="dataTree"
              show-checkbox
              node-key="id"
              ref="tree"
              :expand-on-click-node="false"
              :highlight-current="isHighLight">
     </el-tree>

     <!-- 地图check组件 -->
     <el-radio-group 
        v-model="checkedBaseMap"
        :min="0"
        :max="1">
        <el-radio  style="padding:0 0 5px 5px;background-color: rgba(20,36,68,0)!important;"
            v-for="baseMap in dataBaseMapCheckList" :label="baseMap.name" :key="baseMap.name">
          {{ baseMap.name }}
        </el-radio>
     </el-radio-group>

   </div>

 </div>
</template>

<script>
import mapConfig from '@/config/mapconfig.js'
 const baseMaps = mapConfig.leftTopBaseLayers
 export default {
   name: 'leftTop',
   data () {
     return {
       dataTree: mapConfig.vectorLayers, //树结构的数据
       dataBaseMapCheckList: baseMaps, //底图数据
       checkedBaseMap: baseMaps[0].name,
       isHighLight: true,
       tabIndex:0                      //切换标签的值,默认为0
     }
   },
   mounted() {
     console.log( mapConfig.leftTopBaseLayers)
   },
   components: {

   },
   methods: {
  
   }
 }
</script>

<style lang="less" scoped>
.tab {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  /*height: 36px;
    line-height: 36px;*/
  height: 17.13%;
  justify-content: center;
  align-items: center;
  color: #00eeee;
  text-shadow: 0px 0px 13px #00eeee;
  font-weight: 600;
  span {
    box-sizing: border-box;    
    padding: 8px 8px 8px 0;
    line-height: 1;
    cursor: pointer;
  }
}
.panel {
  height: 78%;
  overflow: auto;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 0;

  .active {
    	color: #00eeee !important;
	    text-shadow: 0px 0px 13px #00eeee;
	    font-weight: 400;
      background-color: rgba(20, 36, 68, 0.75);
    }
}
</style>
<style>
.el-tree-node:focus > .el-tree-node__content {
  background-color: rgba(0, 211, 255, 0.4) !important;
  color: #fff !important;
}
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: rgba(0, 211, 255, 0.4) !important;
  color: #fff !important;
}
.el-tree-node__content:hover {
  /*树杈悬浮 背景色*/
  background-color: rgba(151, 160, 167, 0.952) !important;
}
.el-checkbox-button__inner:hover {
  /*悬浮文字色*/
  color: #fff !important;
}
</style>

