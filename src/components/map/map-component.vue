<template>
  <div ref="mapCont" id='map'>
    <div ref="mousePositionCont" id="mousePosition" v-show="isShowMousePosition"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import 'ol/ol.css';
import { Map, View } from 'ol';
import LayerGroup from 'ol/layer/Group';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import mapconfig from '../../config/mapconfig.js'
import initializationDrawElements from  '@/components/home/components/components/draw/initializationDrawElements.js'
import standardDraw from  '@/components/home/components/components/draw/standardDraw.js'
import freeDrawUtils from  '@/components/home/components/components/draw/freeDraw.js'
import { mapGetters } from 'vuex'
import VectorLayer from './VectorLayer'
//Vue.extend会将该组件挂在到vue上(全局组件)
export default {
  name: 'map-component',
  data() {
    return {
      map: null,
      viewVector: null,
      toBeAddedFeature: null, //要添加的绘图要素
      VectorSource: null, //LayerSource存放点要素
      LayerVector: null,   //LayerVector存放source
      interactiondraw: null,  //绘图控件
      featureSelection: null,   //交互选择控件
      featureModification: null //交互编辑控件
    }
  },
  created(){
    let _this = this
    //接受绘图元素并添加到地图
    this.$bus.on('addtoBeAddedFeature',(value) => {
      // console.log(value)
      _this.toBeAddedFeature = value
      //调用私有函数判断是否有VectorSource和LayerSource
      _this._checkVectorSource();
      _this._checkLayerVector();

      _this.VectorSource.addFeature(_this.toBeAddedFeature)
      
      // this.map.render();
    }),
    //清空绘制的图形
    this.$bus.on('clearVectorSource',() => {
      if(this.VectorSource != null){
        _this.VectorSource.clear();
      }
    }),
    //添加武汉市的矢量数据
    this.$bus.on('addwhLayer', (vectorLayer) => {
      _this.map.addLayer(vectorLayer)
    }),
    //删除武汉市的矢量数据
    this.$bus.on('removewhLayer', (vectorLayer) => {
      // console.log(vectorLayer.getSource().getFeatures())
      vectorLayer.getSource().clear()
      // console.log(vectorLayer.getSource().getFeatures())
      _this.map.removeLayer(vectorLayer)
      
    }),
    // 绘图
    this.$bus.on('interactionDrawEvent',(data) => {
     
      if(_this.interactiondraw != null){
        _this.map.removeInteraction(_this.interactiondraw)
      }
      
      //调用私有函数判断是否有VectorSource和LayerSource
      _this._checkVectorSource(); //矢量图层Vector作为绘制层
      _this._checkLayerVector();
      
      //初始化绘图控件
      let source  = _this.VectorSource
      if(!data.freeDraw){
        _this.interactiondraw = standardDraw.interactionDraw(source,data)
      }
      else{
        _this.interactiondraw = freeDrawUtils.freeDraw(source,data.type)
      }

      _this.map.addInteraction(_this.interactiondraw)
    }),
    //停止绘制
    this.$bus.on('endDraw',() => {
      if(_this.interactiondraw){
        _this.map.removeInteraction(_this.interactiondraw)
      }      
    }),
    //交互选择控件
    this.$bus.on('featureSelection',(selection) => {
      //添加选择控件
      if( !_this.featureSelection){
        _this.featureSelection = selection;
        _this.map.addInteraction(_this.featureSelection);
      }
      this.$bus.$emit('selectSource',_this.VectorSource);
    }),    
    //交互编辑控件
    this.$bus.on('featureModification',(modification) => {      
      //添加交互编辑控件
      if(!_this.featureModification){
        _this.featureModification = modification;
        _this.map.addInteraction(_this.featureModification);
      }
    })
  },
  //页面渲染完成后
  mounted() {
   this._initMap();
  },
  beforeDestroy() {
    this.$bus.off('value')
  },
  computed: {
    //store中的getters,全局状态
    ...mapGetters([
      //地图底图
      'layers',
      //地图中心位置
      'center',
      // 获取地图控件总函数
      'getDefaultControl',
      //获取地图默认控件显示状态总函数
      'getDefaultControlShowState',
      //地图缩放控件显示状态
      'isShowZoomSlider',
      //地图鼠标位置控件显示状态
      'isShowMousePosition',
      //地图比例尺控件显示状态
      'isShowScaleLine',
      //地图鹰眼控件显示状态
      'isShowOverviewMap',
      //地图导航控件显示状态
      'isShowZoomToExtent'
    ]),
  },  
  //注意~~！！
  //openlayers不支持响应式，要手动触发图层更新
  watch: {
    //检测到图层发生变化则手动更新图层
     layers(newLayers,oldLayers) {
      if (newLayers.length) {
        let layerGroup = new LayerGroup({
          layers: newLayers
        });
        this.map.setLayerGroup(layerGroup);
      }
     },
     //检测到缩放控件变化时进行显示/隐藏操作
     isShowZoomSlider(newShow,oldShow) {
       let stateZoomSlider = this.getDefaultControl('ZoomSlider')
       if(newShow && !oldShow) {
         this.map.addControl(stateZoomSlider);
       }else if(!newShow && oldShow){
         tthis.map.removeControl(stateZoomSlider);
         this.$store.commit('destoryDefaultControl','ZoomSlider')
       }
     },
     //检测到鼠标位置控件变化时进行显示/隐藏操作
     isShowMousePosition(newShow,oldShow) {
       let stateMousePosition = this.getDefaultControl('MousePosition')
       if(newShow && !oldShow){
         this.map.addControl(stateMousePosition);
       }else if(!newShow && oldShow){
         this.map.removeControl(stateMousePosition);
         this.$store.commit('destoryDefaultControl','MousePosition')
       }
     },
     //检测到地图比例尺控件变化时进行显示/隐藏操作
     isShowScaleLine(newShow,oldShow) {
       let stateScaleLine = this.getDefaultControl('ScaleLine')
       if(newShow && !oldShow){
         this.map.addControl(stateScaleLine);
       }else if(!newShow && oldShow){
         this.map.removeControl(stateScaleLine);
         this.$store.commit('destoryDefaultControl','ScaleLine')
       }
     },
     //检测到鹰眼控件变化时进行显示/隐藏操作
     isShowOverviewMap(newShow,oldShow) {
       let stateScaleLine = this.getDefaultControl('OverviewMap')
       if(newShow && !oldShow){
         this.map.addControl(stateScaleLine);
       }else if(!newShow && oldShow){
         this.map.removeControl(stateScaleLine);
         this.$store.commit('destoryDefaultControl','OverviewMap')
       }
     },
     //检测到导航控件时进行显示/隐藏操作
     isShowZoomToExtent(newShow,oldShow) {
       let stateZoomToExtent = this.getDefaultControl('ZoomToExtent')
        if(newShow && !oldShow){
         this.map.addControl(stateZoomToExtent);
       }else if(!newShow && oldShow){
         this.map.removeControl(stateZoomToExtent);
         this.$store.commit('destoryDefaultControl','ZoomToExtent')
       }
     },
     //监听路由变化,根据路由变化增删相应组件
     $route(to) {
       let patharr = to.path.split('/')
       let lastpath = patharr[patharr.length - 1];
       //如果是进行画图,则移除交互选择/交互编辑组件
       if(lastpath.indexOf('Draw') > -1){
         console.log(this.featureSelection)
         this.map.removeInteraction(this.featureSelection);
         this.map.removeInteraction(this.featureModification);
         this.featureModification = null;
         this.featureSelection = null;
       }
       if(lastpath.indexOf('edit') > -1){
         this.map.removeInteraction(this.interactiondraw);
       }
     }  
  },
  methods: {
    _initMap() {
      var mapcontainer = this.$refs.mapCont;
      this.map =  new Map({
        target:  mapcontainer,
        layers: this.layers,
        view: new View({
          projection: "EPSG:4326",
          zoom: mapconfig.view.zoom,
          center: this.center
        })
      });
    },    
    _checkVectorSource() {            
      //如果没有VectorSource则进行创建
      if(this.VectorSource == null){
        this.VectorSource = initializationDrawElements.DrawVectorSource();
      }      
    },
    _checkLayerVector() {
      //如果没有LayerVector则进行创建
      if(this.LayerVector == null){
        this.LayerVector = initializationDrawElements.LayerVector();
        this.LayerVector.setSource(this.VectorSource)      
        this.map.addLayer(this.LayerVector)
      }
    }
  }
}

</script>

<style>
 #map{
  height: 100%;
  }
  /* 鼠标位置控件 */
  #mousePositionValue {
    color:#FFFFFF; 
  }
 #mousePosition{
   background-color: rgba(0,60,136,.5);
   border-radius: 0 0 2px 2;
   border: none;
   width:150px; 
   height:20px; 
   display:block;
   color:#FFFFFF; 
   position:absolute; 
   right:15px; 
   top:8px; 
   z-index:999;
 }
 /* 地图缩放控件 */
 .ol-zoomslider{
    top:98px;
    left: 9px;
  }
 /* 地图比例尺控件 */
 .ol-scale-line {
   left:320px;
 }
/*=S 自定义鹰眼样式 */
.ol-custom-overviewmap, .ol-custom-overviewmap.ol-uncollapsible {
   /* 底部显示 */
    bottom: 0;
    /* 左侧显示 */
    left: 0;    
    right: auto;
    
    top: auto;
}
/* 鹰眼控件展开时控件外框的样式 */
.ol-custom-overviewmap:not(.ol-collapsed) {
    border: 1px solid black;
}
/* 鹰眼控件中地图容器样式 */
.ol-custom-overviewmap .ol-overviewmap-map {
    border: none;
    width: 300px;
}
/* 鹰眼控件中显示当前窗口中主图区域的边框 */
.ol-custom-overviewmap .ol-overviewmap-box {
    border: 2px solid red;
}
/* 鹰眼控件展开时其控件按钮图标的样式 */
.ol-custom-overviewmap:not(.ol-collapsed) button {
    bottom: auto;
    left: auto;
    right: 1px;
    top: 1px;
}
/*=E 自定义鹰眼样式 */
</style>    
