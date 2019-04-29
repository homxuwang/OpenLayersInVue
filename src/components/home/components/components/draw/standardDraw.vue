<template>
 <div>
    选择绘制的类型:
    <el-select v-model="value" placeholder="请选择" size="small" @change="drawType">
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
import standardDrawUtils from './standardDraw'
 export default {
   name: 'standardDraw',
   data () {
     return {
       value: 'None',  //选中的选项的值
       typeList: []

     }
   },
   components: {

   },
   created() {
     //获取画图类型列表
    let dataOfType = require("../../../../../../static/json/drawType.json");
    this.typeList = dataOfType.root
   },
   methods: {
     drawType(drawType) {
      
      let drawType_ = drawType
      let geometryFunction,maxPoints;
       if(drawType_ !== 'None') {        

          if( drawType_ === 'Square'){
            drawType_ = 'Circle';
            console.log(drawType_)
            //画正方形(圆)
            geometryFunction = standardDrawUtils.createRegularPolygon
          }else if( drawType_ === 'Rectangle' ){
            drawType_ = 'LineString';
            maxPoints = 2;
            geometryFunction = standardDrawUtils.createRectangle
          }
          let standardDraw = {
            type: drawType_,
            //几何信息变更时调用函数
            geometryFunction: geometryFunction,
            //最大点数
            maxPoints: maxPoints,
            //是否是自由绘图
            freeDraw: false
          }
          this.$bus.$emit('interactionDrawEvent',standardDraw)
       }else{
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
     
   }
 }
</script>

<style>

 
</style>
