import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import GeoJSON from 'ol/format/GeoJSON.js'
import mapconfig from '@/config/mapconfig'
const vectorLayerFactory = {

  VectorSource : (url) => {
    return new VectorSource({
      url: url,
      format: new GeoJSON()
    })
  },

  VectorLayer: (vectorSource) =>{ 
    return new VectorLayer({
      source: vectorSource
    }) 
  } 


}

export default vectorLayerFactory