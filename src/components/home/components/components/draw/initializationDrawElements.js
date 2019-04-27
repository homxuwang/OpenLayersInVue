import olFeature from 'ol/Feature'
import olPoint from 'ol/geom/Point'
import olCircle from 'ol/geom/Circle'
import olLineString from 'ol/geom/LineString'
import {fromCircle as fromCircle,fromExtent as fromExtent} from 'ol/geom/Polygon'
import olPolygon from 'ol/geom/Polygon'
//坐标转换
import {transform} from 'ol/proj.js'
import VectorSource from 'ol/source/Vector'
import LayerVector from 'ol/layer/Vector'
//***样式相关 */
import { Icon,Style,Circle,Fill,Stroke} from 'ol/style.js'
//***样式相关 */

// var wgs84Sphere = new Sphere(6378137);
// var groundRadius = wgs84Sphere.haversineDistance(
//   ProjTransforms(center, 'EPSG:3857', 'EPSG:4326'), 
//   ProjTransforms(edgeCoordinate, 'EPSG:3857', 'EPSG:4326') 
// ); 
const initializationDrawElements = {

  //根据类型生成要素
  FeatureFactory: (featureTpye,coordinate) => {
    switch(featureTpye){
      case 'Point':{
        return new olFeature({
          geometry: new olPoint(coordinate)
        })
        break;
      }         
      case 'LineString':{
        return new olFeature({
          geometry: new olLineString([coordinate[0],coordinate[1]])
        })
        break;
      }
      case 'Circle': {
        let circleIn3857 = new olCircle(transform(coordinate[0], 'EPSG:4326', 'EPSG:3857'),coordinate[1],'XY');
        let circleIn4326 = circleIn3857.transform('EPSG:3857','EPSG:4326');
        return new olFeature({
          geometry: circleIn4326
        })
       break;
      }
      case 'Square': {
        let circleIn3857 = new olCircle(transform(coordinate[0], 'EPSG:4326', 'EPSG:3857'), coordinate[1],'XY');
        let circleIn4326 = circleIn3857.transform('EPSG:3857','EPSG:4326');
        let Square = new fromCircle(circleIn4326,4,150)
        // console.log(Square)
        return new olFeature({
          geometry:  Square
        })
      }
      case 'Rectangle':{
        let Rectangle = new fromExtent(coordinate)
        let ret = null
        try{
          ret = new olFeature({
            geometry: Rectangle
          })
          return ret;
        }
        catch(ex){
          this.$message.error(ex)
          return;
        }

      }
      case 'Polygon':{
        let Polygon = new olPolygon([coordinate])
        return new olFeature({
          geometry: Polygon
        })
      }
    }
  },

  /**
   * 根据类型生成样式
   * 后面可以封装成一个函数，根据用户的输入生成各种要素的类型
   *  */
  StyleFactory: (featureTpye) => {
    switch(featureTpye) {
      case 'Point':{
        return new Style({
            image: new Icon({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            // src: 'https://openlayers.org/en/v3.20.1/examples/data/icon.png' 
            src: require('./icon.png')
          })
        })
      }
      case 'LineString': {
        return new Style({
           //填充色
           fill: new Fill({
             color: 'rgba(255, 255, 255, 0.2)'
           }),
           //边线颜色
           stroke: new Stroke({
              color: '#0099FF',
              width: 5
           }),
           //形状
           image: new Circle({
              radius: 7,
              fill: new Fill({
                  color: '#ffcc33'
              })
           })
        })
      }
      case 'Circle': {
        return new Style({
          //填充色
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.5)'
          }),
          //边线颜色
          stroke: new Stroke({
              color: '#0099FF',
              width: 6
          }),
          //形状
          image: new Circle({
              radius: 7,
              fill: new Fill({
                  color: '#ffcc33'
              })
          })
        })
      }
      case 'Square': {
        return new Style({
          //填充色
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.8)'
          }),
          //边线颜色
          stroke: new Stroke({
              color: 'red',
              width: 2
          }),
          //形状
          image: new Circle({
              radius: 7,
              fill: new Fill({
                  color: '#0099FF'
              })
          })
        })
      }
      case 'Polygon': {
        return new Style({
          //填充色
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.8)'
          }),
          //边线颜色
          stroke: new Stroke({
              color: '#0099FF',
              width: 2
          }),
          //形状
          image: new Circle({
              radius: 7,
              fill: new Fill({
                  color: '#0099FF'
              })
          })
        })
      }
    }
  },
  


  DrawVectorSource : () => {return new VectorSource()},

  LayerVector:() =>{ return new LayerVector() } 


}


export default initializationDrawElements