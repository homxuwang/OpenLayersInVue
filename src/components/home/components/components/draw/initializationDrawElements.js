import olFeature from 'ol/Feature'
import olgeom from 'ol/geom'
import olPoint from 'ol/geom/Point'
import olCircle from 'ol/geom/Circle'
import olLineString from 'ol/geom/LineString'
import olPolygon from 'ol/geom/Polygon'

import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
//***样式相关 */
import { Icon,Style,Circle} from 'ol/style.js'
import Stroke from 'ol/style/Stroke'
import Fill from 'ol/style/Fill'

//***样式相关 */
const initializationDrawElements = {

  PointFeature: (point) => { 
    return new olFeature({
    geometry: new olPoint([114.29144842, 30.57285152])
    // geometry: new olPoint([11505912.0, 4011415.0])
  })},

  PointStyle: new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      // src: 'https://openlayers.org/en/v3.20.1/examples/data/icon.png' 
      src: require('./icon.png')
    })
  }),

  DrawVectorSource : () => {return new VectorSource()},

  ViewVector:() =>{ return new VectorLayer() } 


}


export default initializationDrawElements