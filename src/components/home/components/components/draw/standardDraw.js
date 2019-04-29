//***画图相关 */
import {Draw as interactionDraw} from 'ol/interaction.js'
import {createRegularPolygon,createBox} from 'ol/interaction/Draw.js'
import Polygon from 'ol/geom/Polygon'
//***画图相关 */

const standardDrawUtils = {
    /**
   * 绘图控件
   */
  interactionDraw: (source,data) => {
    return new interactionDraw({
      source: source,
      type: data.type,
      geometryFunction: data.geometryFunction,
      maxPoints: data.maxPoints
   })
  },

  /**
   * 画正方形(圆)
   */
  createRegularPolygon: createRegularPolygon(4),
  /**
   * 画矩形
   */
  createRectangle: createBox() 

}

export default standardDrawUtils