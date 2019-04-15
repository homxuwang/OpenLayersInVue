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
  
  <span style="margin-top: 5px;">输入坐标:</span>
  
  <el-input
    type="textarea"
    autosize
    placeholder="请输入内容"
    v-model="textarea">
  </el-input>
  <el-button type="primary" size="small">确定</el-button>
 </div>
</template>

<script>
 export default {
   name: 'coordinateDraw',
   data () {
     return {
       textarea: '',
       value: 'None',
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
