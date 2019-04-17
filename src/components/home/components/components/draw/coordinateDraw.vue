<template>
 <div>
  选择绘制的类型:
  <el-select v-model="value" placeholder="请选择" size="small">
      <el-option
        v-for="item in type"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        >
      </el-option>
  </el-select>
  
  <span style="margin-top: 5px;">输入坐标:</span>
  
  <el-input
    type="textarea"
    placeholder="请输入内容"
    v-model="textarea"
    >
  </el-input>
  <el-button type="primary" size="small" @click="startDraw">确定</el-button>
  <el-button type="primary" size="small">清空图形</el-button>
 </div>
</template>

<script>
import initializationDrawElements from './initializationDrawElements'
import { mapGetters } from 'vuex'
 export default {
   name: 'coordinateDraw',
   data () {
     return {
       textarea: '',
       value: 'None',
       type: []
     }
   },
   created() {
     //获取画图类型列表
    let dataOfType = require("../../../../../../static/json/drawType.json");
    this.type = dataOfType.type
   },
   computed: {
     ...mapGetters([
       'getFeature',
       'getViewVector',
       'getDrawVectorSource'
     ])
   },
   //监控value的变化,如果不为None就创建画图控件
   watch: {

   },
   methods: {
     startDraw() {

       //格式化处理textarea中的数组字符串为数组

       //将该数组存入到store中进行初始化(还是作为参数传入到mutation中,然后mutation调用initializationDrawElements中的方法进行初始化要素)
        let PointFeature = initializationDrawElements.PointFeature()
        PointFeature.setStyle(initializationDrawElements.PointStyle)

       //将PointFeature传到map-component试试
        this.$bus.$emit('PointFeature',PointFeature)
      /** 
        console.log(PointFeature)
       //要素存入store中
        this.$store.commit('addFeature',{PointFeature:PointFeature,FeatureType:'PointFeature'})
       //如果有vectorSource画布(绘制层Vector)则继续,没有则进行初始化
       if(!this.getDrawVectorSource){
         console.log('新增绘图图层')
         this.$store.commit('addDrawVectorSource',initializationDrawElements.DrawVectorSource)
       }
       //要素加入到画布中
       
       this.getDrawVectorSource.addFeature(PointFeature)

       console.log(this.getDrawVectorSource.getFeatures())

       //画布加入到显示图层中
       //先看store中有没有显示图层,如果有则不用新建,如果没有则添加
       if(!this.getViewVector){
         let ViewVector = initializationDrawElements.ViewVector;
         console.log('新增显示绘图图层')
         this.$store.commit('addViewVector',ViewVector)
       }
       //将画布加入到显示图层
       this.getViewVector.setSource(this.getDrawVectorSource);
       
       //传给Bus
      //  this.$bus.$emit('viewVector',this.getViewVector)
      this.$bus.$emit('viewVector',this.getViewVector)
       //显示图层加入到地图中(在map-component中进行)
       
      */
     },
   }
 }
</script>

<style>

 
</style>
