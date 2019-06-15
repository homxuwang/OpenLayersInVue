<template>
 <div>
  编辑图形:
  <br />
  <el-button type="primary" size="small" @click="beginEdit">开始编辑</el-button>
 </div>
</template>

<script>
import editFunctions from './index.js'
import { mapGetters } from 'vuex'
 export default {
   name: 'clickCheck',
   data () {
     return {
       VectorSource: null
     }
   },
   created() {
     let _this = this;
     this.$bus.on('selectSource',(VectorSource) => {
       _this.VectorSource = VectorSource;
       this.$bus.$emit('featureModification',editFunctions.newModify(_this.VectorSource))
     })
   },
   computed: {
     ...mapGetters([
       'getDrawVectorSource'
     ])
   },
   components: {

   },
   methods: {
     beginEdit() {
       //创建交互选择控件
       var featureSelection = editFunctions.newSelection(); 
      //  将交互选择控件和交互编辑控件加入到map容器中
      this.$bus.$emit('featureSelection',featureSelection);
     }
   }
 }
</script>

<style>

 
</style>
