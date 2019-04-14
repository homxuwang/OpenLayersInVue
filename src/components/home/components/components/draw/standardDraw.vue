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
   name: 'standardDraw',
   data () {
     return {
       value: 'None',  //选中的选项的值
       type: []
     }
   },
   components: {

   },
   created() {
     //获取画图类型列表
    let dataOfType = require("../../../../../../static/json/drawType.json");
    this.type = dataOfType.type
   }
 }
</script>

<style>

 
</style>
