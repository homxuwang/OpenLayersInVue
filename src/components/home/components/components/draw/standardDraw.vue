<template>
 <div>
    选择绘制的类型:
    <el-select v-model="value" placeholder="请选择" size="small">
      <el-option
        v-for="item in typeList"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
  </el-select>
  <el-button type="primary" size="small">清空图形</el-button>
 </div>
</template>

<script>
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
   }
 }
</script>

<style>

 
</style>
