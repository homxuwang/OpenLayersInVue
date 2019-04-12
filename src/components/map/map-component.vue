<template>
  <div ref="mapCont" id='map'></div>
</template>

<script>
import Vue from 'vue'
import 'ol/ol.css';
import { Map, View } from 'ol';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import mapconfig from '../../config/mapconfig.js'

//Vue.extend会将该组件挂在到vue上(全局组件)
export default {
  data() {
    return {
      map: null
    }
  },
  //页面渲染完成后
  mounted() {
    var mapcontainer = this.$refs.mapCont;
    this.map = new Map({
      target: mapcontainer,
      layers: mapconfig.streetmap(0),      
      view: new View({
        projection: "EPSG:4326",
        zoom: mapconfig.view.zoom,
        center: [mapconfig.view.x, mapconfig.view.y]
      })
    });
  }
}
</script>

<style>
 #map{
  height: 100%;
  }

</style>    
