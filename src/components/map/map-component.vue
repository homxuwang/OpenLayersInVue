<template>
  <div ref="mapCont" id='map'></div>
</template>

<script>
import Vue from 'vue'
import 'ol/ol.css';
import { Map, View } from 'ol';
import LayerGroup from 'ol/layer/Group';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import mapconfig from '../../config/mapconfig.js'
import { mapState,mapGetters } from 'vuex'
//Vue.extend会将该组件挂在到vue上(全局组件)
export default {
  name: 'map-component',
  data() {
    return {
      map: null
    }
  },
  //页面渲染完成后
  mounted() {
   this._initMap();
  },
  computed: {
    layers() {
      return this.$store.getters.layers
    },
    center() {
      return this.$store.getters.center
    }
  },
  watch: {
     layers(newLayers) {
      if (newLayers.length) {
        let layerGroup = new LayerGroup({
          layers: newLayers
        });
        this.map && this.map.setLayerGroup(layerGroup);
      }
     }
  },
  methods: {
    _initMap() {
      var mapcontainer = this.$refs.mapCont;
      this.map =  new Map({
        target:  this.$refs.mapCont,
        layers: this.layers,
        view: new View({
          projection: "EPSG:4326",
          zoom: mapconfig.view.zoom,
          center: this.center
        })
      });
    }
  }
}

</script>

<style>
 #map{
  height: 100%;
  }

</style>    
