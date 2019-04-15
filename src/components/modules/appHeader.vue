<template>
  <div id="app_header">
    <!-- 时间部分 -->
    <div class="time-widget">
      <div class="dateTime">{{ theDateTime }}</div>
      <div class="week">{{ week }}</div>
    </div>

    <div class="main-title"><img :src="this.$loadImages.loadImages('header_logo.png')" />OpenLayersInVue</div>
    
    <!-- 用户信息部分 -->
    <div class="userInfo">
      <img :src="this.$loadImages.loadImages('user.png')" />
      <!-- 用户 -->
      <el-dropdown @command="userInfoClick">
        <span class="el-dropdown-link">
          {{ loginUserName }} <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div><!-- 用户信息部分 -->
    <svgs style="display: none;"></svgs>

    <!--全屏按钮-->
    <div class="guide-item" @click="ifFullScreen()" v-show="fullScreen==false">
      <svg class="icon_style">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#fullScreen'" fill="#000"></use>
      </svg>
    </div>
    <!-- 退出全屏按钮 -->
    <div class="guide-item" @click="ifFullScreen()" v-show="fullScreen==true">
      <svg class="icon_style">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#exitFullScreen'" fill="#000"></use>
      </svg>
    </div>
    <pop-for-confirm v-show="popForConfirmShow"
                     @enterBtnClick="confirmPopEnterBtnClick" 
                     @cancelBtnClick="popForConfirmShow=false;" 
                     @closeBtnClick="popForConfirmShow=false;"></pop-for-confirm>
  </div>
</template>

<script>
import popForConfirm from '@/components/modules/popForConfirm'
import svgs from '@/assets/images/svgs'
import LS from '@/components/utils/localStorage'
import { dateFormater } from '@/components/utils/dateUtil'
export default {
  name: 'appHeader',
  components: {
    svgs,
    popForConfirm
  },
  data() {
    return {
      fullScreen: false, //全屏,初始为false
      theDateTime: '',
      timer: null,// 定时器
      week: '',  //星期
      loginUserName: LS.getLS('userInfo').name || '',
      popForConfirmShow: false // 弹出框是否显示
    }
  },
  /**
   * created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
   * mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
   */
  created() {
    this.theDateTime = dateFormater(new Date(), 'yyyy-MM-dd hh:mm:ss')
    var that = this
    this.timer = setInterval(() => {
      that.theDateTime = dateFormater(new Date(), 'yyyy-MM-dd hh:mm:ss')
    },1000)
    this.week = '星期' + '日一二三四五六'.charAt(new Date().getDay())
  },
  methods: {
    /**
     * 进入或退出全屏
     */
    ifFullScreen() {
      let element = document.documentElement;
      this.fullScreen = !this.fullScreen
      if(this.fullScreen) { //如果fullScreen为true
         if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      }else {
        if(document.exitFullscreen){
          document.exitFullscreen()
        }else if( document.mozCancelFullScreen){
          document.mozCancelFullScreen()
        }else if(document.webkitExitFullscreen){
          document.webkitExitFullscreen()
        }else if(!document.msRequestFullscreen){
          document.msExitFullscreen()
        }
      }     
    },
    /**
     * 用户下拉列表点击事件
     * 点击菜单项触发的事件回调,回调参数是dropdown-item 的指令
     */
    userInfoClick(command) {
      //如果是登出指令
      if(command === 'logout'){
        this.popForConfirmShow = true //// 弹出框显示
      }
    },
    /**
     * 弹出框确认点击事件
     */
    confirmPopEnterBtnClick() {
      this.popForConfirmShow = false // 关闭弹窗
      LS.cleanLS('userInfo') // 清理用户信息
      this.$router.replace('/login')
    },
    beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer) // 销毁之前清除定时器
    }
  }
  }
}
</script>

<style lang="less" scoped>
#app_header {
  // box-shadow:0px 0px 5px 2px #00eeee;
  width: 100%;
  height: 40px;
  position: relative;
  background-color: #FFFFFF;
  background-repeat: no-repeat;
  justify-content: space-between;
  .time-widget {    
    position: absolute;
    left: 20px;
    top: 5px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    line-height: 20px;
    color: #000;
    text-shadow: 0px 0px 13px rgb(238,238 , 238);
    font-size: 13px;
    .week {
      margin-left: 10px;
    }
  }
  .main-title {    
    position: absolute;
    left: 30%;
    -ms-transform: translate(50%,50%);
    -moz-transform: translate(50%,50%);
    -o-transform: translate(50%,50%);
    transform: translate(50%,50%);
    color: #000;
    text-shadow: 0px 0px 13px rgb(0, 238, 238);
    font-family: "moderat",sans-serif;
    font-size: 20px;
    img {
      filter: drop-shadow(0 0 2px #000) drop-shadow(0 0 15px #000) drop-shadow(0 0 5px #fff);
      -webkit-filter: drop-shadow(0 0 2px #000) drop-shadow(0 0 15px #000) drop-shadow(0 0 5px #fff);
      width: 40px;
      vertical-align: middle;
      margin-top: -20px;
      margin-right: 8px;
    }
  }
  .guide-item {
    cursor: pointer;
    float: right;
    margin-right: 10px;
    padding: 5px;
    z-index: 2;
    .icon_style {
      display: inline-block;
      width: 22px;
      height: 22px;
      color: #000;
      margin-top: 5px;
    }
  }
  .userInfo {
    float: right;
    cursor: pointer;
    height: 30px;
    margin-top: 5px;
    img {
      width: 30px;
      height: 30px;
      display: inline-block;
      filter: drop-shadow(0 0 2px #fff) drop-shadow(0 0 15px #fff) drop-shadow(0 0 5px #fff);
      -webkit-filter: drop-shadow(0 0 2px #fff) drop-shadow(0 0 15px #fff) drop-shadow(0 0 5px #fff);
    }
    div {
      display: inline-block;
      height: 100%;
      line-height: 30px;
      vertical-align: top;
      color: #000;
      text-shadow: 0px 0px 13px #00eeee;
      font-size: 13px;
      margin-right: 12px;
    }
  }
}
</style>

