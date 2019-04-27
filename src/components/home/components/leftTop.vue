<template>
 <div>
   <div class="tab">
     <span @click="changeTabIndex(0)" :class="{active:tabIndex==0}">
       图层管理
     </span>
     <span @click="changeTabIndex(1)" :class="{active:tabIndex==1}">
       操作
     </span>
   </div>

    <!-- 图层视图 -->
   <div class="panel" ref="layers_panel" v-show="tabIndex==0">
     <!-- 图层树组件 -->
     <el-tree style="padding: 0 0 5px 5px;background-color: rgba(20,36,68,0)!important;"
              :data="dataTree"
              show-checkbox
              node-key="id"
              ref="tree"
              :expand-on-click-node="false"
              :highlight-current="isHighLight"
              @check-change="changeTreeLayer">
     </el-tree>

     <!-- 地图check组件 -->
     <el-radio-group 
        v-model="checkedBaseMap"
        :min="0"
        :max="1">
        <el-radio  style="padding:0 0 5px 5px;background-color: rgba(20,36,68,0)!important;"
                   v-for="baseMap in dataBaseMapCheckList" 
                   :label="baseMap.url" 
                   :key="baseMap.url"
                   @change="changeBaseLayer(baseMap.url)">
          {{ baseMap.name }}
        </el-radio>
     </el-radio-group>
   </div>

   <!-- 操作视图 -->
   <div class="panel" ref="options_panel" v-show="tabIndex==1">
     <keep-alive>
      <router-view />
     </keep-alive>     
   </div>
 </div>
</template>

<script>
import mapConfig from '@/config/mapconfig.js'
import { mapMutations } from 'vuex'
import vectorLayerFactory from '@/components/utils/vectorLayerFactory'
 const baseMaps = mapConfig.leftTopBaseLayers
 export default {
   name: 'leftTop',
   data () {
     return {
       dataTree: mapConfig.vectorLayers, //树结构的数据
       dataBaseMapCheckList: baseMaps, //底图数据
       checkedBaseMap: baseMaps[0].url,
       isHighLight: true,
       tabIndex: 0,                      //切换标签的值,默认为0
     }
   },
   mounted() {
     console.log( mapConfig.leftTopBaseLayers)
   },
   components: {

   },
   methods: {
     ...mapMutations([
       'changeBaseLayer'
      ]),
     //上部标签发生变化
     changeTabIndex(index) {
       this.tabIndex = index
     },
     //切换底图的radio选中
     changeRadio(data) {
      this.$store.commit('changeBaseLayer',data);
     },
     //图层树控件变化时
     changeTreeLayer(data,ischecked,child) {
       //如果没有孩子节点的话
       if(!data.children){
         console.log(data,ischecked,child)
         if(!data.vectorLayer){
           let vectorSource = vectorLayerFactory.VectorSource(data.url)
           let vectorLayer = vectorLayerFactory.VectorLayer(vectorSource)
           data.vectorLayer = vectorLayer
         }
         //如果选中,则创建对应的矢量图层对象,传递给map
         if(ischecked){
           this.$bus.$emit('addwhLayer',data.vectorLayer)
         }
         //如果取消选中,则将图层对象传给map,让其进行remove
         else{
           this.$bus.$emit('removewhLayer',data.vectorLayer)
           data.vectorLayer = null
         }
       }
     }
    
   },
  computed: {
    
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
  height: 17.13%;
  justify-content: center;
  align-items: center;
  color: #00eeee;
  font-weight: 600;
  span {
    box-sizing: border-box;    
    padding: 8px 8px 8px 0;
    line-height: 1;
    cursor: pointer;
    .active {
      color: #eee !important;
      text-shadow: 0px 0px 13px #00eeee;
      font-weight: 400;
      background-color: rgba(20, 36, 68, 0.75);
    }
  }

}

.panel {
  height: 78%;
  overflow: auto;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 0;
}
</style>
<style>
.el-tree-node:focus > .el-tree-node__content {
  background-color: rgba(0,238,238,0.4) !important;
  color: #eee !important;
}
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: rgba(0,238,238,0.4) !important;
  color: #eee !important;
}
.el-tree-node__content:hover {
  /*树杈悬浮 背景色*/
  background-color: rgba(0,238,238,0.4) !important;
  color: #eee;
}
.el-checkbox-button__inner:hover {
  /*悬浮文字色*/
  color: #eee !important;
}
::-webkit-scrollbar {
  width: 6px;
  height: 7px;
  background-color: rgba(20, 36, 68, 0.5);
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 0;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(0, 211, 255, 0.44);
}
::-webkit-scrollbar-corner {
  background: rgba(0, 211, 255, 0.44);
}
.el-input__inner {
  line-height: 1 !important;
}
</style>

