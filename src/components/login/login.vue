<template>
  <div id="login">
    <div class="app-content">
      <!--登陆模块-->
     <div v-show="mode==='login'" class="login-widget">
        <transition name="el-zoom-in-top">
          <div v-show="mode==='login'">
            <div class="login-title">用户登录</div>
            <div class="login-widget-item"><el-input v-model="login_account" clearable placeholder="请输入登录账号"></el-input></div>
            <div class="login-widget-item"><el-input v-model="login_password" type="password" clearable placeholder="请输入登录密码"></el-input></div>
            <div class="login-widget-item"><el-button style="width: 100%;" @click="loginBtnClick" type="primary">登录</el-button></div>
            <div class="login-widget-btnSet">
              <span @click="mode='register'">注册账号</span>
              <span @click="mode='changePass'">修改密码</span>
            </div>
          </div>
        </transition>
        <div class="login-logo">
          <img :src="this.$loadImages.loadImages('logo_1.png')">
          <div>OpenLayersInVue</div>
        </div>
      </div>
      
    
    <!--登陆模块-->

    <!-- 注册模块 -->
    <div v-show="mode==='register'" class="register-widget">
      <transition name="el-zoom-in-bottom">
          <div v-show="mode==='register'">
            <div class="login-title" @click="mode='login'"><i class="el-icon-back" style="margin-right: 5px;"></i>用户登录</div>
            <div class="login-widget-item"><el-input v-model="register_account" clearable placeholder="请输入登录账号"></el-input></div>
            <div class="login-widget-item"><el-input v-model="register_password" type="password" clearable placeholder="请输入登录密码"></el-input></div>
            <div class="login-widget-item"><el-input v-model="register_rePassword" type="password" clearable placeholder="再次输入登录密码"></el-input></div>
            <div class="login-widget-item"><el-button style="width: 100%;" @click="registerBtnClick" type="primary">注册账号</el-button></div>
          </div>
        </transition>
      <div class="login-logo">
        <img :src="this.$loadImages.loadImages('logo_1.png')">
        <div>OpenLayersInVue</div>
      </div>
    </div>
    <!-- 注册模块 -->

    <!-- 修改密码模块 -->
    <div v-show="mode==='changePass'" class="changePass-widget">
        <transition name="el-zoom-in-bottom">
          <div v-show="mode==='changePass'">
            <div class="login-title" @click="mode='login'"><i class="el-icon-back" style="margin-right: 5px;"></i>用户登录</div>
            <div class="login-widget-item"><el-input v-model="changePass_account" clearable placeholder="请输入账号"></el-input></div>
            <div class="login-widget-item"><el-input v-model="changePass_oldPassword" type="password" clearable placeholder="请输入旧密码"></el-input></div>
            <div class="login-widget-item"><el-input v-model="changePass_newPassword" type="password" clearable placeholder="请输入新密码"></el-input></div>
            <div class="login-widget-item"><el-input v-model="changePass_rePassword" type="password" clearable placeholder="再次输入新密码"></el-input></div>
            <div class="login-widget-item"><el-button style="width: 100%;" @click="changePassBtnClick" type="primary">修改密码</el-button></div>
          </div>
        </transition>
        <div class="login-logo">
          <img :src="this.$loadImages.loadImages('logo_1.png')">
          <div>OpenLayersInVue</div>
        </div>
      </div>
      
    </div>
    <app-bottom></app-bottom>
  </div>
  
</template>

<script>
import appBottom from '../modules/appBottom.vue'
import LS from '../utils/localStorage'
export default {
  name: 'login',
  components: {
    appBottom
  },
  data() {
    return {
      userAccountList: [{
        name: 'admin',
        password: '123'
      },{
        name: 'user',
        password: '123'
      }],
      mode: 'login',
      login_account: '', // 登录的账号
      login_password: '', // 登录的密码
      register_account: '', // 注册的账号
      register_password: '', // 注册的密码
      register_rePassword: '', // 注册的再次输入密码
      changePass_account: '', // 修改密码的账号
      changePass_oldPassword: '', // 修改密码的旧密码
      changePass_newPassword: '', // 修改密码的新密码
      changePass_rePassword: '' // 修改密码的再次输入密码
    }
  },
  created() {
    console.log(this.$loadImages.loadImages('logo_1.png'));
    console.log('userAccountList-->>',LS.getLS('userAccountList'))
    //如果不存在用户列表
    if(!LS.getLS('userAccountList')) {
      LS.setLS('userAccountList', this.userAccountList)
    }
    //监听键盘enter事件
    document.onkeyup = (e) => {
      let code = (e.charCode || e.keyCode)
      if(code === 13){
        if (this.mode === 'login') {
          this.loginBtnClick() // 帮用户点击登录按钮
        } else if (this.mode === 'register') {
          this.registerBtnClick() // 帮用户点击注册按钮
        } else if (this.mode === 'changePass') {
          this.changePassBtnClick() // 帮用户点击修改密码按钮
        }
      }
    }
  },
  methods: {
    /**
     * 登录按钮点击事件
     */
    loginBtnClick() {
      if(this.login_account === '') {
        this.$message.error('请输入账号！')
        return false
      }else if(this.login_password === '') {
        this.$message.error('请输入密码！')
        return false
      }
      let userAccountList = LS.getLS('userAccountList') //把存起来的列表取出来
      //遍历账户列表
      let match = false
      let userInfo = null
      for (let i = 0 ; i < userAccountList.length ; i ++){
        if (this.login_account === userAccountList[i].name && this.login_password === userAccountList[i].password){
          match = true //用户名密码正确
          userInfo = userAccountList[i]
          break
        }
      }

      if(match) { //如果匹配成功了
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        LS.setLS('userInfo',userInfo) //吧登陆成功的用户信息存起来
        this.$router.push(this.$route.query.redirect || '/home')  //跳转到'/home'页面
      }else {
        this.$message.error('账号或密码不正确！')
      }
    },
    /**
     * 注册账户按钮点击事件
     */
    registerBtnClick() {
      if(this.register_account === ''){
        this.$message.error('请输入账号')
        return false
      }else if(this.register_account.length > 10 || this.register_account.length < 3){
        this.$message.error('用户名长度3-10位')
        return false
      }else if (this.register_password === '') {
        this.$message.error('请输入密码')
        return false
      } else if (this.register_password.length > 10 || this.register_password.length < 3) {
        this.$message.error('密码长度3-10位')
        return false
      } else if (this.register_rePassword === '') {
        this.$message.error('请再次输入密码')
        return false
      } else if (this.register_rePassword !== this.register_password) {
        this.$message.error('两次密码不一致')
        return false
      }
      let userAccountList = LS.getLS('userAccountList')
      //遍历已有用户列表
      let match = false //用来检测账号是否已经存在
      for( let  i = 0 ;i < userAccountList.length ; i++){
        if( this.register_account === userAccountList[i].name){
          match = true
          break
        }
      }
      if (match) { //如果匹配到，说明账号已存在
        this.$message('账号已存在')
        return false
      }
      //如果没有匹配到，则加入到用户列表
      userAccountList.push({
        name: this.register_account,
        password: this.register_password
      })

      LS.setLS('userAccountList', userAccountList)
      this.$message({
        message: '注册成功',
        type: 'success'
      })
      this.login_account = this.register_account
      this.login_password = ''
      this.register_account = ''
      this.register_password = ''
      this.register_rePassword = ''
      this.mode = 'login' // 转跳回登录框
    },

    /**
     * 修改密码按钮点击事件
     */
    changePassBtnClick() {
      if(this.changePass_account === ''){
        this.$message.error('请输入账号')
        return false
      } else if (this.changePass_oldPassword === '') {
        this.$message.error('请输入旧密码')
        return false
      } else if (this.changePass_newPassword === '') {
        this.$message.error('请输入新密码')
        return false
      } else if (this.changePass_newPassword.length < 3 || this.changePass_newPassword.length > 10) {
        this.$message.error('密码长度3-10位')
        return false
      } else if (this.changePass_rePassword === '') {
        this.$message.error('请再次输入密码')
        return false
      } else if (this.changePass_rePassword !== this.changePass_newPassword) {
        this.$message.error('两次密码不一致')
        return false
      } else if (this.changePass_oldPassword === this.changePass_newPassword) {
        this.$message.error('新旧密码不能一样')
        return false
      }
      let userAccountList = LS.getLS('userAccountList')

      //遍历已有的用户表
      let match = false //检测账号密码是否匹配
      let matchedUserAccountIndex = '' //如果匹配到，则记录下index号，不用再次循环
      for(let i = 0 ; i < userAccountList.length ; i ++){
        if(this.changePass_account === userAccountList[i].name && this.changePass_oldPassword === userAccountList[i].password){
          match = true
          matchedUserAccountIndex = i
          break
        }
      }
      if(!match){
        this.$message('账号或密码不正确')
        return false
      }
      // 更新用户表的密码
      userAccountList[matchedUserAccountIndex].password = this.changePass_newPassword

      LS.setLS('userAccountList',userAccountList)

      this.$message({
        message: '密码修改成功',
        type: 'success'
      })
      this.login_account = this.changePass_account
      this.login_password = ''
      this.changePass_account = ''
      this.changePass_oldPassword = ''
      this.changePass_newPassword = ''
      this.changePass_rePassword = ''
      this.mode = 'login' // 转跳回登录框
    }
  }
}
</script>

<style lang='less' scoped>
  #login {
    width: 100%;
    height: 100%;
    position: relative;
    background-image: url("../../assets/images/bg.png");
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: center;
    background-size: 100% 100%;
    .app-content {
      width: 100%;
      height: -moz-calc(100% - 40px);
      height: -webkit-calc(100% - 40px);
      height: calc(100% - 40px);
      position: relative;
      .login-widget {
        width: 350px;
        height: 270px;
        border-radius: 10px;
        position: absolute;
        right: 18%;
        top: 278px;
        background-color: rgba(20, 36, 68, 0.8);
        .login-title {
          height: 50px;
          line-height: 50px;
          padding-left: 25px;
          color: #eee;
          font-size: 14px;
        }
        .login-widget-item {
          margin: 20px 25px;
        }
        .login-widget-item:nth-child(2) {
          margin-top: 5px;
        }
        .login-widget-btnSet {
          padding: 0px 25px;
          color: #EEE;
          font-size: 13px;
          span {
            cursor: pointer;
          }
          span:last-child {
            float: right;
          }
        }
        .login-logo {
          position: absolute;
          top: -180px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          img {
            margin-bottom: 20px;
          }
          div {
            font-size: 30px;
            white-space: nowrap;
            font-weight: 600;
            text-shadow: #FFF 2px 0 0, #FFF 0 2px 0, #FFF -2px 0 0, #FFF 0 -2px 0;
            -webkit-text-shadow: #FFF 2px 0 0,#FFF 0 2px 0,#FFF -2px 0 0,#FFF 0 -2px 0;
            -moz-text-shadow: #FFF 2px 0 0,#FFF 0 2px 0,#FFF -2px 0 0,#FFF 0 -2px 0;
          }
        }
      }

      .register-widget {
        width: 350px;
        height: 300px;
        border-radius: 10px;
        position: absolute;
        right: 18%;
        top: 278px;
        background-color: rgba(20, 36, 68, 0.8);
        .login-title {
          height: 50px;
          line-height: 50px;
          padding-left: 25px;
          color: #eee;
          font-size: 14px;
          cursor: pointer;
        }
        .login-widget-item {
          margin: 20px 25px;
        }
        .login-widget-item:nth-child(2) {
          margin-top: 5px;
        }
        .login-logo {
          position: absolute;
          top: -180px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          img {
            margin-bottom: 20px;
          }
          div {
            font-size: 30px;
            white-space: nowrap;
            font-weight: 600;
            text-shadow: #FFF 2px 0 0, #FFF 0 2px 0, #FFF -2px 0 0, #FFF 0 -2px 0;
            -webkit-text-shadow: #FFF 2px 0 0,#FFF 0 2px 0,#FFF -2px 0 0,#FFF 0 -2px 0;
            -moz-text-shadow: #FFF 2px 0 0,#FFF 0 2px 0,#FFF -2px 0 0,#FFF 0 -2px 0;
          }
        }
      }
      .changePass-widget {
        width: 350px;
        height: 355px;
        border-radius: 10px;
        position: absolute;
        right: 18%;
        top: 278px;
        background-color: rgba(20, 36, 68, 0.8);
        .login-title {
          height: 50px;
          line-height: 50px;
          padding-left: 25px;
          color: #eee;
          font-size: 14px;
          cursor: pointer;
        }
        .login-widget-item {
          margin: 20px 25px;
        }
        .login-widget-item:nth-child(2) {
          margin-top: 5px;
        }
        .login-logo {
          position: absolute;
          top: -180px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          img {
            margin-bottom: 20px;
          }
          div {
            font-size: 30px;
            white-space: nowrap;
            font-weight: 600;
            text-shadow: #FFF 2px 0 0, #FFF 0 2px 0, #FFF -2px 0 0, #FFF 0 -2px 0;
            -webkit-text-shadow: #FFF 2px 0 0,#FFF 0 2px 0,#FFF -2px 0 0,#FFF 0 -2px 0;
            -moz-text-shadow: #FFF 2px 0 0,#FFF 0 2px 0,#FFF -2px 0 0,#FFF 0 -2px 0;
          }
        }
      }
    }
  }
</style>