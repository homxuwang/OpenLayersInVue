<template>
 <div>
   选择绘制的类型:
    <el-select v-model="value" placeholder="请选择" size="small" @change="startDraw">
      <el-option
        v-for="item in typeList"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button type="primary" size="small" @click="clearDraw">清空图形</el-button>
    <el-button type="primary" size="small" @click="endDraw">停止绘制</el-button>
 </div>
</template>

<script>
import freeDrawUtils from './freeDraw.js'
 export default {
   name: 'freeDraw',
   data () {
     return {
       value: 'None',

       typeList:[
          {
            "value": "None",
            "label": "无"
          },
          {
            "value": "LineString",
            "label": "线"
          },
          {
            "value": "Polygon",
            "label": "多边形"
          },
          {
            "value": "Circle",
            "label": "圆"
          }
      ]
     }
   },
   methods:{
     startDraw(drawType) {
       let drawType_ = drawType
       let freeDraw
       if(drawType_ !== 'None'){
          freeDraw = {
            //绘图类型
            type: drawType_,
            //是否是自由绘图
            freeDraw: true
         }
         this.$bus.$emit('interactionDrawEvent',freeDraw)
       }
       else{
         this.endDraw() 
       }
        
     },
     clearDraw() {
      //  清空绘制的图形
      this.$bus.$emit('clearVectorSource')
     },
     endDraw() {
      //  停止绘制
      this.value = 'None'
      this.$bus.$emit('endDraw')
     }
     
   },
   components: {

   }
 }
</script>

<style>

 
</style>
