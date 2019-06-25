<template>
 <div>
   <el-select v-model="value" placeholder="请选择" @change="selectBuffer">
     <el-option
       v-for="item in typeList"
       :key="item.value"
       :label="item.label"
       :value="item.value">
     </el-option>
   </el-select>

  <br />

  <label>请输入缓冲区距离(单位:m)</label>
  <el-input-number v-model="bufferDegree" @change="inputChange" :min="0" size="small" label="label"></el-input-number>

  <br/>
  <label v-if="value == 'selectAndBuffer'">选取你要生成缓冲区的要素，并点击确定</label>

  <div v-if="value == 'coordinateAndBuffer'">

  </div>

  <div v-if="value == 'geojsonAndBuffer'">
    <el-input type="textarea" v-model="bufferGeojson" :rows="5" placeholder="请输入如下格式数据:
                                                                  {'type': 'Point',
                                                                    'coordinates': [
                                                                      114.35456514358519,
                                                                      30.529413040011306
                                                                    ]}">

    </el-input>
  </div>
  <br/>

  <el-button type="primary" @click="startBuffer">确定生成缓冲区</el-button>
 </div>
</template>

<script>
import mapconfig from '@/config/mapconfig.js'
/**
 * 实现思路：
 * 选取某个要素对它生成缓冲区(添加选择器)
 * 调用后台服务,获取生成的缓冲区多边形，添加到地图上(新建一个容器对缓冲区图形进行存放)
 */
 export default {
   data () {
     return {
       value: "无",
       bufferDegree: 0,
       bufferGeojson: '',

       typeList:[
         {
           "value": "selectAndBuffer",
           "label": "选取要素并生成缓冲区"
         },
         {
           "value": "coordinateAndBuffer",
           "label": "输入坐标并生成缓冲区"
         },
         {
           "value": "geojsonAndBuffer",
           "label": "输入geojson数据并生成缓冲区"
         }
       ]
     }
   },
   components: {

   },
   methods:{
     selectBuffer(type){
       this.value = type
     },
     inputChange(value){
       this.bufferDegree = value
     },
     startBuffer(){
       let type = this.value
       if(type == 'geojsonAndBuffer'){
         fetch( mapconfig.localSrc + 'buffer',
         {
           method: 'POST',
           headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
           },
           //springboot后台传formData格式的数据接收不到，暂时不知道问题出在哪里
           body: "geojson=" + this.bufferGeojson + "&distance=" + this.bufferDegree
         }).then(response => response.json())
         .then(data => {
           console.log(data)
           alert(data)
         })
       }
     }
   }
 }
</script>

<style>

 
</style>
