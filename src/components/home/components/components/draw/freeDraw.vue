<template>
 <div>
   选择绘制的类型:
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in type"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
  </el-select>
 </div>
</template>

<script>
 export default {
   name: 'freeDraw',
   data () {
     return {
       value: 'None',
       type:[
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
   components: {

   }
 }
</script>

<style>

 
</style>
