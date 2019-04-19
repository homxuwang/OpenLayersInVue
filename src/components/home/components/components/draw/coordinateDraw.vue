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
       if(drawCoordinate.length == 0){
         this.$message.error('请输入坐标！')
         return;
       }
       //去掉输入的坐标中的空白字符
       drawCoordinate = drawCoordinate.replace(/\s*/g,"");

       let coordinateArr = null;
       switch(drawType){
         case 'Point':
            coordinateArr = this._addPoint(drawCoordinate);
            break;
         case 'LineString':
            coordinateArr = this._addLineString(drawCoordinate);
            break;
         case 'Circle':
            coordinateArr = this._addCircle(drawCoordinate);
            break;
         case 'Square':
            coordinateArr = this._addCircle(drawCoordinate);
            break;
         case 'Rectangle':
            coordinateArr = this._addRectangle(drawCoordinate);
            break;
         case 'Polygon':
            coordinateArr = this._addPolygon(drawCoordinate);
            break;
       }
       //如果不是空的数据
       if(coordinateArr != null){
        this._addFeature(drawType,coordinateArr)
       }       
     },
     /**
      * 添加点时调用该内部函数进行坐标判断
      * drawCoordinate 传过来的坐标字符串
      * return 转换后的坐标数组
      */
     _addPoint(drawCoordinate) {
      //  console.log(drawCoordinate)
      //  console.log(drawCoordinate)
       //创建判断一维数组的正则,[需要加\进行转译,]不需要转译
       let regPoint = /\[-{0,1}\d*\.{0,1}\d*\,-{0,1}\d*\.{0,1}\d*]/;
       if(!regPoint.test(drawCoordinate)){
         this.$message.error('你输入的坐标格式有误,请检查后重新输入！')
         return null;
       }
      //  debugger
      //  提取出经纬度
       let lon = 0;
       let lat = 0;
       //格式化处理textarea中的数组字符串为数组
       let arr_lon_lat = drawCoordinate.split(',');
       
       lon = parseFloat(arr_lon_lat[0].substring(1));
       
       lat = parseFloat(arr_lon_lat[1].substring(0,arr_lon_lat[1].length-1))

       if(lon < -180 || lon > 180 || lat < -90 || lat > 90){
         this.$message.error('您输入的坐标超出范围！')
         return null;
       }
      //  console.log(lon,lat)
       let coordinateArr = [lon,lat];
      //  console.log(coordinateArr,coordinateArr instanceof Array)
      //将该数组存入到store中进行初始化(还是作为参数传入到mutation中,然后mutation调用initializationDrawElements中的方法进行初始化要素)
      return coordinateArr;
     },
     /**
      * 添加线段
      * drawCoordinate 传过来的坐标字符串
      * return 转换后的坐标数组  
      */
     _addLineString(drawCoordinate){        
      //正则匹配: 坐标:[114.3,30.5],[114.4,30.9]
      let regLineString = /\[-{0,1}\d*\.{0,1}\d*\,-{0,1}\d*\.{0,1}\d*]\,\[-{0,1}\d*\.{0,1}\d*\,-{0,1}\d*\.{0,1}\d*]/;

      if(!regLineString.test(drawCoordinate)){
        this.$message.error('你输入的坐标格式有误,请检查后重新输入！')
        return null;
      }
      let coordinateArr = [[],[]]
      let arr_lon_lat = drawCoordinate.split(',')

      for(let i = 0 ; i < arr_lon_lat.length ; i ++){
        //如果index为0 2
        if(i % 2 == 0){
          coordinateArr[parseInt(i/2)].push(parseFloat(arr_lon_lat[i].substring(1)))
        }else{ //如果index为1 3
            //不加parseInt会得小数
          coordinateArr[parseInt(i/2)].push(parseFloat(arr_lon_lat[i].substring(0,arr_lon_lat[i].length-1)))
        }
      }
      
      console.log(coordinateArr)
      return coordinateArr
      
     },
     /**
      * 添加圆和正方形
      * drawCoordinate 传过来的坐标字符串
      * return 转换后的坐标数组 
      */
     _addCircle(drawCoordinate) {
       //正则匹配: 例如:[114.3,30.4],500
       let regCircle = /\[-{0,1}\d*\.\d*\,-{0,1}\d*\.\d*]\,\d*/g;
       
       if(!regCircle.test(drawCoordinate)){
         this.$message.error('你输入的坐标格式有误,请检查后重新输入！')
         return null;
       }
       
       //  提取出经纬度和半径
       let lon = 0;
       let lat = 0;
       let radius = 0;
       //格式化处理textarea中的数组字符串为数组
       let arr_lon_lat = drawCoordinate.split(',');
       
       lon = parseFloat(arr_lon_lat[0].substring(1))
       lat = parseFloat(arr_lon_lat[1].substring(0,arr_lon_lat[1].length-1))
       radius = parseInt(arr_lon_lat[2])

       let coordinateArr = [[lon,lat],radius]

       return coordinateArr
     },
     /**
      * 添加矩形
      */
     _addRectangle(drawCoordinate) {
       //判断矩形的输入格式是否正确 , 例如: [-114.354,30.455,-114.354,30.455]
       let regRectangle = /\[(-{0,1}\d*\.{0,1}\d*\,-{0,1}\d*\.{0,1}\d*){1,1}(\,{0,1}-{0,1}\d*\.{0,1}\d*\,-{0,1}\d*\.{0,1}\d*){0,}]/;

       if(!regRectangle.test(drawCoordinate)){
        this.$message.error('你输入的坐标格式有误,请检查后重新输入！')
        return null;
       }
      
       let coordinateArr = []
       let arr_lon_lat = drawCoordinate.split(',')
       for(let i = 0 ; i < arr_lon_lat.length ; i ++){
         if(i == 0){
           coordinateArr.push(parseFloat(arr_lon_lat[i].substring(1)))
           continue;
         }
         if(i == arr_lon_lat.length-1){
           coordinateArr.push(parseFloat(arr_lon_lat[i].substring(0,arr_lon_lat[i].length-1)))
           break;
         }
          coordinateArr.push(parseFloat(arr_lon_lat[i]))
       }

       return coordinateArr
     },
     /**
      * 添加多边形
      */
     _addPolygon(drawCoordinate) {
       //匹配格式: 例如 [[114.7,29.7],[114.5,30.3],[114.4,30.4]]
       let regPolygon = /\[(\[-{0,1}\d*\.{0,1}\d*\,-{0,1}\d*\.{0,1}\d*]){0,1}(\,{0,1}\[-{0,1}\d*\.{0,1}\d*\,-{0,1}\d*\.{0,1}\d*]){0,}]/

       if(!regPolygon.test(drawCoordinate)){
        this.$message.error('你输入的坐标格式有误,请检查后重新输入！')
        return null;
       }
      //  console.log(JSON.parse(drawCoordinate))
       return JSON.parse(drawCoordinate)
     },
     /**
      * 将绘制要素传给map-component
      * featureType 要绘制的要素
      * coordinateArr 经过判断验证的坐标系
      */
     _addFeature(featureType,coordinateArr) {
       let addFeature = initializationDrawElements.FeatureFactory(featureType,coordinateArr)
       addFeature.setStyle(initializationDrawElements.StyleFactory(featureType))

       //将PointFeature通过event-bus传给map-component
        this.$bus.$emit('addtoBeAddedFeature',addFeature)
     },
     clearVectorSource() {
       this.$bus.$emit('clearVectorSource')
     },
     changeTextareaTips(value) {
       this.textareaValue = ''
      if(value == 'None'){
        this.input_placeholder = '请选择要绘制的类型'
        return;
      }
      if(value == 'Point'){
        this.input_placeholder = '请输入坐标,格式: [经度,纬度]'
        return;
      }
      if(value == 'Circle'){
        this.input_placeholder = '请输入坐标,格式: [圆心经度,圆心纬度],半径(单位:米).例: [114.3,30.4],500'
        return;
      }
      if(value == 'LineString'){
        this.input_placeholder = '请输入坐标,格式: [经度,纬度],[经度,纬度].例: [114.354,30.455],[114.454,30.555]'
        return;
      }
      if(value == 'Square'){
        this.input_placeholder = '请输入坐标,格式: [中心经度,中心纬度],对角线的1/2长度(单位:米).例: [114.3,30.4],500'
        return;
      }
      if(value == 'Rectangle') {
        this.input_placeholder = '请输入坐标,格式: [经度,纬度,经度,纬度].例: [114.454,31.455,114.354,30.455]'
        return;
      }
      if( value == 'Polygon'){
        this.input_placeholder = '输入坐标,格式：[[经度,纬度],[经度,纬度],[经度,纬度]].例: [[114.7,29.7],[114.5,30.3],[114.4,30.4]]'
      }
     }
   }
 }
</script>

<style>

 
</style>
