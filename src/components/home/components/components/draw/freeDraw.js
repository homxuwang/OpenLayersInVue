import Draw from 'ol/interaction/Draw.js'

const freeDrawUtils = {
   freeDraw: (source,type) => {
     return new Draw({
       source: source,
       type: type,
       freehand: true
     })
   }
}


export default freeDrawUtils