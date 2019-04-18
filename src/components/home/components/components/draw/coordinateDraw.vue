<template>
 <div>
  选择绘制的类型:
  <el-select v-model="value" placeholder="请选择" size="small" @change="changeTextareaTips">
      <el-option
        v-for="item in typeList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        >
      </el-option>
  </el-select>
  
  <div style="margin-top: 5px;">
    <label style="margin-top: 5px;">输入坐标:</label>  
    <el-input
      type="textarea"
      :placeholder="input_placeholder"
      v-model="textareaValue"
      >
    </el-input>
  </div>
  
  <el-button type="primary" size="small" @click="startDraw">确定</el-button>
  <el-button type="primary" size="small" @click="clearVectorSource">清空图形</el-button>
 </div>
</template>

<script>
import initializationDrawElements from './initializationDrawElements'
import { mapGetters } from 'vuex'
 export default {
   name: 'coordinateDraw',
   data () {
     return {
       textareaValue: '',
       value: 'None',
       typeList: [],
       input_placeholder: '请选择要绘制的类型'
     }
   },
   created() {
     //获取画图类型列表
    let dataOfType = require("../../../../../../static/json/drawType.json");
    this.typeList = dataOfType.root
   },
   computed: {
     ...mapGetters([
       'getFeature',
       'getLayerVector',
       'getDrawVectorSource'
     ])
   },
   //监控value的变化,如果不为None就创建画图控件
   watch: {

   },
   methods: {
     startDraw() {
       let drawType = this.value;
       if(drawType == 'None'){
         this.$message.error('请选择要绘制的类型！')
         return;
       }
       let drawCoordinate = this.textareaValue;
       switch(drawType){
         case 'Point':
            this._addPoint(drawCoordinate,drawType);
            break;
         
       }
       
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
       if(!this.getLayerVector){
         let LayerVector = initializationDrawElements.LayerVector;
         console.log('新增显示绘图图层')
         this.$store.commit('addLayerVector',LayerVector)
       }
       //将画布加入到显示图层
       this.getLayerVector.setSource(this.getDrawVectorSource);       
       //传给Bus
       //  this.$bus.$emit('LayerVector',this.getLayerVector)
       this.$bus.$emit('LayerVector',this.getLayerVector)
       //显示图层加入到地图中(在map-component中进行)
       
      */
     },
     _addPoint(drawCoordinate,drawType) {
       //替换字符串中所有的空格
      //  console.log(drawCoordinate)
       drawCoordinate = drawCoordinate.replace(/\s*/g,"");
      //  console.log(drawCoordinate)
       //创建判断一维数组的正则,[需要加\进行转译,]不需要转译
       let regPoint = /\[\d*\.\d*\,\d*\.\d*]/g;
       if(!regPoint.test(drawCoordinate) && drawType=="Point"){
         this.$message.error('你输入的坐标有误!')
         return;
       }
      //  debugger
      //  提取出经纬度
       let lon = 0;
       let lat = 0;
       //格式化处理textarea中的数组字符串为数组
       let arr_lon_lat = drawCoordinate.split(',');
       
       lon = parseFloat(arr_lon_lat[0].substring(1));
       
       lat = parseFloat(arr_lon_lat[1].substring(0,arr_lon_lat[1].length-1))
      //  console.log(lon,lat)
       let coordinateArr = [lon,lat];
      //  console.log(coordinateArr,coordinateArr instanceof Array)
       //将该数组存入到store中进行初始化(还是作为参数传入到mutation中,然后mutation调用initializationDrawElements中的方法进行初始化要素)
        let PointFeature = initializationDrawElements.PointFeature(coordinateArr)
        PointFeature.setStyle(initializationDrawElements.PointStyle)

       //将PointFeature通过event-bus传给map-component
        this.$bus.$emit('addPointFeature',PointFeature)
     },
     clearVectorSource() {
       this.$bus.$emit('clearVectorSource')
     },
     changeTextareaTips(value) {
      if(value == 'None'){
        this.input_placeholder = '请选择要绘制的类型'
      }
      if(value == 'Point'){
        this.input_placeholder = '请输入坐标,格式[精度,纬度]'
      }
     }
   }
 }
</script>

<style>

 
</style>
