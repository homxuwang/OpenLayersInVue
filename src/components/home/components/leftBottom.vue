<template>
 <div class="left_bottom">
   <div class="tab">
     <span>功能选择</span>
   </div>

   <div class="panel" ref="panel">
     <el-tree style="padding: 0 0 5px 5px;background-color: rgba(20,36,68,0)!important;"
              :data="options"
              @node-click="toRouter">

     </el-tree>
   </div>
 </div>
</template>

<script>
 export default {
   name: 'leftBottom',
   data () {
     return {
       options: []
     }
   },
   created() {
    //获取操作列表
    let dataOfOptions = require("../../../../static/json/options.json");
    this.options = dataOfOptions.options
    console.log(dataOfOptions.options)
   },
   components: {

   },
   methods: {
     toRouter(data) {
        this.$bus.$emit('changeTab',1)
        console.log(data.id)
        if(data.id == "addByStandardDraw" || data.id == "addByFreeDraw"){
          this.$bus.$emit('endDraw')
        }
        this.$router.push({path:'/home/'+data.path})
     }
   }
 }
</script>

<style lang="less">
.tab {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  height: 9%;
  justify-content: center;
  align-items: center;
  color: #00eeee;
  text-shadow: 0px 0px 13px #00eeee;
  font-weight: 600;
  span {
    box-sizing: border-box;    
    padding: 8px 8px 8px 0;
    line-height: 1;
    cursor: pointer;
  }
}
.panel {
  height: 78%;
  overflow: auto;
  box-sizing: border-box;
  width: 99%;
  padding: 10px 0;
  .active {
    	color: #00eeee !important;
	    text-shadow: 0px 0px 13px #00eeee;
	    font-weight: 400;
      background-color: rgba(255, 255, 255, 1);
    }
}
 
</style>
<style>
.el-tree-node:focus > .el-tree-node__content {
  background-color: rgba(0, 211, 255, 0.4) !important;
  color: #fff !important;
}
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: rgba(0, 211, 255, 0.4) !important;
  color: #fff !important;
}
.el-tree-node__content:hover {
  /*树杈悬浮 背景色*/
  background-color: rgba(151, 160, 167, 0.952) !important;
}
.el-checkbox-button__inner:hover {
  /*悬浮文字色*/
  color: #fff !important;
}
</style>
</style>
