webpackJsonp([1],{EV1k:function(s,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=t("fZ3C"),i=t("ht9P"),r={name:"login",components:{appBottom:a.a},data:function(){return{userAccountList:[{name:"admin",password:"123"},{name:"user",password:"123"}],mode:"login",login_account:"",login_password:"",register_account:"",register_password:"",register_rePassword:"",changePass_account:"",changePass_oldPassword:"",changePass_newPassword:"",changePass_rePassword:""}},created:function(){var s=this;console.log(this.$loadImages.loadImages("logo_1.png")),console.log("userAccountList--\x3e>",i.a.getLS("userAccountList")),i.a.getLS("userAccountList")||i.a.setLS("userAccountList",this.userAccountList),document.onkeyup=function(e){13===(e.charCode||e.keyCode)&&("login"===s.mode?s.loginBtnClick():"register"===s.mode?s.registerBtnClick():"changePass"===s.mode&&s.changePassBtnClick())}},methods:{loginBtnClick:function(){if(""===this.login_account)return this.$message.error("请输入账号！"),!1;if(""===this.login_password)return this.$message.error("请输入密码！"),!1;for(var s=i.a.getLS("userAccountList"),e=!1,t=null,a=0;a<s.length;a++)if(this.login_account===s[a].name&&this.login_password===s[a].password){e=!0,t=s[a];break}e?(this.$message({message:"登陆成功",type:"success"}),i.a.setLS("userInfo",t),this.$router.push(this.$route.query.redirect||"/home")):this.$message.error("账号或密码不正确！")},registerBtnClick:function(){if(""===this.register_account)return this.$message.error("请输入账号"),!1;if(this.register_account.length>10||this.register_account.length<3)return this.$message.error("用户名长度3-10位"),!1;if(""===this.register_password)return this.$message.error("请输入密码"),!1;if(this.register_password.length>10||this.register_password.length<3)return this.$message.error("密码长度3-10位"),!1;if(""===this.register_rePassword)return this.$message.error("请再次输入密码"),!1;if(this.register_rePassword!==this.register_password)return this.$message.error("两次密码不一致"),!1;for(var s=i.a.getLS("userAccountList"),e=!1,t=0;t<s.length;t++)if(this.register_account===s[t].name){e=!0;break}if(e)return this.$message("账号已存在"),!1;s.push({name:this.register_account,password:this.register_password}),i.a.setLS("userAccountList",s),this.$message({message:"注册成功",type:"success"}),this.login_account=this.register_account,this.login_password="",this.register_account="",this.register_password="",this.register_rePassword="",this.mode="login"},changePassBtnClick:function(){if(""===this.changePass_account)return this.$message.error("请输入账号"),!1;if(""===this.changePass_oldPassword)return this.$message.error("请输入旧密码"),!1;if(""===this.changePass_newPassword)return this.$message.error("请输入新密码"),!1;if(this.changePass_newPassword.length<3||this.changePass_newPassword.length>10)return this.$message.error("密码长度3-10位"),!1;if(""===this.changePass_rePassword)return this.$message.error("请再次输入密码"),!1;if(this.changePass_rePassword!==this.changePass_newPassword)return this.$message.error("两次密码不一致"),!1;if(this.changePass_oldPassword===this.changePass_newPassword)return this.$message.error("新旧密码不能一样"),!1;for(var s=i.a.getLS("userAccountList"),e=!1,t="",a=0;a<s.length;a++)if(this.changePass_account===s[a].name&&this.changePass_oldPassword===s[a].password){e=!0,t=a;break}if(!e)return this.$message("账号或密码不正确"),!1;s[t].password=this.changePass_newPassword,i.a.setLS("userAccountList",s),this.$message({message:"密码修改成功",type:"success"}),this.login_account=this.changePass_account,this.login_password="",this.changePass_account="",this.changePass_oldPassword="",this.changePass_newPassword="",this.changePass_rePassword="",this.mode="login"}}},n={render:function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{attrs:{id:"login"}},[t("div",{staticClass:"app-content"},[t("div",{directives:[{name:"show",rawName:"v-show",value:"login"===s.mode,expression:"mode==='login'"}],staticClass:"login-widget"},[t("transition",{attrs:{name:"el-zoom-in-top"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:"login"===s.mode,expression:"mode==='login'"}]},[t("div",{staticClass:"login-title"},[s._v("用户登录")]),s._v(" "),t("div",{staticClass:"login-widget-item"},[t("el-input",{attrs:{clearable:"",placeholder:"请输入登录账号"},model:{value:s.login_account,callback:function(e){s.login_account=e},expression:"login_account"}})],1),s._v(" "),t("div",{staticClass:"login-widget-item"},[t("el-input",{attrs:{type:"password",clearable:"",placeholder:"请输入登录密码"},model:{value:s.login_password,callback:function(e){s.login_password=e},expression:"login_password"}})],1),s._v(" "),t("div",{staticClass:"login-widget-item"},[t("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:s.loginBtnClick}},[s._v("登录")])],1),s._v(" "),t("div",{staticClass:"login-widget-btnSet"},[t("span",{on:{click:function(e){s.mode="register"}}},[s._v("注册账号")]),s._v(" "),t("span",{on:{click:function(e){s.mode="changePass"}}},[s._v("修改密码")])])])]),s._v(" "),t("div",{staticClass:"login-logo"},[t("img",{attrs:{src:this.$loadImages.loadImages("logo_1.png")}}),s._v(" "),t("div",[s._v("OpenLayersInVue")])])],1),s._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:"register"===s.mode,expression:"mode==='register'"}],staticClass:"register-widget"},[t("transition",{attrs:{name:"el-zoom-in-bottom"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:"register"===s.mode,expression:"mode==='register'"}]},[t("div",{staticClass:"login-title",on:{click:function(e){s.mode="login"}}},[t("i",{staticClass:"el-icon-back",staticStyle:{"margin-right":"5px"}}),s._v("用户登录")]),s._v(" "),t("div",{staticClass:"login-widget-item"},[t("el-input",{attrs:{clearable:"",placeholder:"请输入登录账号"},model:{value:s.register_account,callback:function(e){s.register_account=e},expression:"register_account"}})],1),s._v(" "),t("div",{staticClass:"login-widget-item"},[t("el-input",{attrs:{type:"password",clearable:"",placeholder:"请输入登录密码"},model:{value:s.register_password,callback:function(e){s.register_password=e},expression:"register_password"}})],1),s._v(" "),t("div",{staticClass:"login-widget-item"},[t("el-input",{attrs:{type:"password",clearable:"",placeholder:"再次输入登录密码"},model:{value:s.register_rePassword,callback:function(e){s.register_rePassword=e},expression:"register_rePassword"}})],1),s._v(" "),t("div",{staticClass:"login-widget-item"},[t("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:s.registerBtnClick}},[s._v("注册账号")])],1)])]),s._v(" "),t("div",{staticClass:"login-logo"},[t("img",{attrs:{src:this.$loadImages.loadImages("logo_1.png")}}),s._v(" "),t("div",[s._v("OpenLayersInVue")])])],1),s._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:"changePass"===s.mode,expression:"mode==='changePass'"}],staticClass:"changePass-widget"},[t("transition",{attrs:{name:"el-zoom-in-bottom"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:"changePass"===s.mode,expression:"mode==='changePass'"}]},[t("div",{staticClass:"login-title",on:{click:function(e){s.mode="login"}}},[t("i",{staticClass:"el-icon-back",staticStyle:{"margin-right":"5px"}}),s._v("用户登录")]),s._v(" "),t("div",{staticClass:"login-widget-item"},[t("el-input",{attrs:{clearable:"",placeholder:"请输入账号"},model:{value:s.changePass_account,callback:function(e){s.changePass_account=e},expression:"changePass_account"}})],1),s._v(" "),t("div",{staticClass:"login-widget-item"},[t("el-input",{attrs:{type:"password",clearable:"",placeholder:"请输入旧密码"},model:{value:s.changePass_oldPassword,callback:function(e){s.changePass_oldPassword=e},expression:"changePass_oldPassword"}})],1),s._v(" "),t("div",{staticClass:"login-widget-item"},[t("el-input",{attrs:{type:"password",clearable:"",placeholder:"请输入新密码"},model:{value:s.changePass_newPassword,callback:function(e){s.changePass_newPassword=e},expression:"changePass_newPassword"}})],1),s._v(" "),t("div",{staticClass:"login-widget-item"},[t("el-input",{attrs:{type:"password",clearable:"",placeholder:"再次输入新密码"},model:{value:s.changePass_rePassword,callback:function(e){s.changePass_rePassword=e},expression:"changePass_rePassword"}})],1),s._v(" "),t("div",{staticClass:"login-widget-item"},[t("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:s.changePassBtnClick}},[s._v("修改密码")])],1)])]),s._v(" "),t("div",{staticClass:"login-logo"},[t("img",{attrs:{src:this.$loadImages.loadImages("logo_1.png")}}),s._v(" "),t("div",[s._v("OpenLayersInVue")])])],1)]),s._v(" "),t("app-bottom")],1)},staticRenderFns:[]};var o=t("VU/8")(r,n,!1,function(s){t("gEKW")},"data-v-376683f8",null);e.default=o.exports},MTEG:function(s,e){},fZ3C:function(s,e,t){"use strict";var a=t("qVyR"),i={name:"appBottom",data:function(){return{theDateTime:""}},created:function(){this.theDateTime=Object(a.a)(new Date,"yyyy-MM")},methods:{}},r={render:function(){var s=this.$createElement,e=this._self._c||s;return e("div",{attrs:{id:"app_bottom"}},[e("div",{staticClass:"info"},[this._m(0),this._v(" "),e("span",[this._v("2019/04/10 -- "+this._s(this.theDateTime)+" ")])])])},staticRenderFns:[function(){var s=this.$createElement,e=this._self._c||s;return e("span",[this._v("@Copyright "),e("a",{attrs:{href:"https://homxuwang.github.io/"}},[this._v("homxuwang")])])}]};var n=t("VU/8")(i,r,!1,function(s){t("MTEG")},null,null);e.a=n.exports},gEKW:function(s,e){},ht9P:function(s,e,t){"use strict";var a=t("mvHQ"),i=t.n(a);e.a={setLS:function(s,e){window.localStorage.setItem(s,i()(e))},getLS:function(s){return JSON.parse(window.localStorage.getItem(s))},cleanLS:function(s){window.localStorage.removeItem(s)}}},mvHQ:function(s,e,t){s.exports={default:t("qkKv"),__esModule:!0}},qVyR:function(s,e,t){"use strict";t.d(e,"a",function(){return a});var a=function(s,e){var t=s||new Date,a={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};for(var i in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length))),a)new RegExp("("+i+")").test(e)&&(e=e.replace(RegExp.$1,1===RegExp.$1.length?a[i]:("00"+a[i]).substr((""+a[i]).length)));return e}},qkKv:function(s,e,t){var a=t("FeBl"),i=a.JSON||(a.JSON={stringify:JSON.stringify});s.exports=function(s){return i.stringify.apply(i,arguments)}}});
//# sourceMappingURL=1.b94795b9df0682cd1bdf.js.map