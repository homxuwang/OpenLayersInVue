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
      LayerVector: null   //LayerVector存放source
    }
  },
  created(){
    //接受Point元素并添加到地图
    this.$bus.on('addtoBeAddedFeature',(value) => {
      // console.log(value)
      this.toBeAddedFeature = value
      //调用私有函数判断是否有VectorSource和LayerSource
      this._checkVectorSource();
      this._checkLayerVector();

      this.VectorSource.addFeature(this.toBeAddedFeature)
      
      // this.map.render();
    }),
    //清空绘制的图形
    this.$bus.on('clearVectorSource',() => {
      if(this.VectorSource != null){
        this.VectorSource.clear();
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
        this.map && this.map.setLayerGroup(layerGroup);
      }
     },
     //检测到缩放控件变化时进行显示/隐藏操作
     isShowZoomSlider(newShow,oldShow) {
       let stateZoomSlider = this.getDefaultControl('ZoomSlider')
       if(newShow && !oldShow) {
         this.map && this.map.addControl(stateZoomSlider);
       }else if(!newShow && oldShow){
         this.map && this.map.removeControl(stateZoomSlider);
         this.$store.commit('destoryDefaultControl','ZoomSlider')
       }
     },
     //检测到鼠标位置控件变化时进行显示/隐藏操作
     isShowMousePosition(newShow,oldShow) {
       let stateMousePosition = this.getDefaultControl('MousePosition')
       if(newShow && !oldShow){
         this.map && this.map.addControl(stateMousePosition);
       }else if(!newShow && oldShow){
         this.map && this.map.removeControl(stateMousePosition);
         this.$store.commit('destoryDefaultControl','MousePosition')
       }
     },
     //检测到地图比例尺控件变化时进行显示/隐藏操作
     isShowScaleLine(newShow,oldShow) {
       let stateScaleLine = this.getDefaultControl('ScaleLine')
       if(newShow && !oldShow){
         this.map && this.map.addControl(stateScaleLine);
       }else if(!newShow && oldShow){
         this.map && this.map.removeControl(stateScaleLine);
         this.$store.commit('destoryDefaultControl','ScaleLine')
       }
     },
     //检测到鹰眼控件变化时进行显示/隐藏操作
     isShowOverviewMap(newShow,oldShow) {
       let stateScaleLine = this.getDefaultControl('OverviewMap')
       if(newShow && !oldShow){
         this.map && this.map.addControl(stateScaleLine);
       }else if(!newShow && oldShow){
         this.map && this.map.removeControl(stateScaleLine);
         this.$store.commit('destoryDefaultControl','OverviewMap')
       }
     },
     //检测到导航控件时进行显示/隐藏操作
     isShowZoomToExtent(newShow,oldShow) {
       let stateZoomToExtent = this.getDefaultControl('ZoomToExtent')
        if(newShow && !oldShow){
         this.map && this.map.addControl(stateZoomToExtent);
       }else if(!newShow && oldShow){
         this.map && this.map.removeControl(stateZoomToExtent);
         this.$store.commit('destoryDefaultControl','ZoomToExtent')
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
