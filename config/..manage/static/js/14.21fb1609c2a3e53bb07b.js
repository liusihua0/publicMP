webpackJsonp([14],{194:function(e,t,a){a(249);var r=a(85)(a(216),a(264),"data-v-63a4466a",null);e.exports=r.exports},216:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0});var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__=__webpack_require__(49),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__),__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__=__webpack_require__(48),__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__),__WEBPACK_IMPORTED_MODULE_2__config_env__=__webpack_require__(86);__webpack_exports__.default={data:function(){return{loginForm:{username:"",password:""},rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:6,message:"最小长度为6位"},{max:16,message:"最大长度为16位"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,message:"最小长度为6位"},{max:16,message:"最大长度为16位"}]},showLogin:!1}},mounted:function(){this.showLogin=!0;history.back()&&alert("不可"),window.history&&window.history.pushState&&window.on("popstate",function(){window.history.pushState("forward",null,"#"),window.history.forward(1),alert("不可回退")}),window.history.pushState("forward",null,"#"),window.history.forward(1)},computed:{},methods:{submitForm:function submitForm(formName){var _this=this;return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2(){return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:_this.$refs[formName].validate(function(){var _ref=__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(valid){return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:if(!valid){_context.next=4;break}_this.$http.post(__WEBPACK_IMPORTED_MODULE_2__config_env__.c+"Pub/login",{phone:_this.loginForm.username,password:_this.loginForm.password},{emulateJSON:!0}).then(function(data){var res=eval("("+data.bodyText+")");"success"==res.status?(this.$message({type:"success",message:"登录成功"}),this.$router.replace("rank")):this.$message({type:"error",message:"账号密码错误"})}),_context.next=6;break;case 4:return _this.$notify.error({title:"错误",message:"请输入正确的用户名密码",offset:100}),_context.abrupt("return",!1);case 6:case"end":return _context.stop()}},_callee,_this)}));return function(e){return _ref.apply(this,arguments)}}());case 1:case"end":return _context2.stop()}},_callee2,_this)}))()}}}},234:function(e,t,a){t=e.exports=a(188)(!1),t.push([e.i,".allcover[data-v-63a4466a]{position:absolute;top:0;right:0}.ctt[data-v-63a4466a]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.tb[data-v-63a4466a]{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.lr[data-v-63a4466a]{position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.mysearch[data-v-63a4466a]{height:50px;background:#f5f5f5;padding-top:7px;padding-left:10px;margin-bottom:10px}.mysearch .el-select[data-v-63a4466a]{width:100px}.mysearch .searchname[data-v-63a4466a]{float:right}.login_page[data-v-63a4466a]{background-color:#324057}.manage_tip[data-v-63a4466a]{position:absolute;width:100%;top:-100px;left:0}.manage_tip p[data-v-63a4466a]{font-size:34px;color:#fff}.form_contianer[data-v-63a4466a]{width:320px;height:210px;position:absolute;top:50%;left:50%;margin-top:-105px;margin-left:-160px;padding:25px;border-radius:5px;text-align:center;background-color:#fff}.form_contianer .submit_btn[data-v-63a4466a]{width:100%;font-size:16px}.tip[data-v-63a4466a]{font-size:12px;color:red}.form-fade-enter-active[data-v-63a4466a],.form-fade-leave-active[data-v-63a4466a]{transition:all 1s}.form-fade-enter[data-v-63a4466a],.form-fade-leave-active[data-v-63a4466a]{-webkit-transform:translate3d(0,-50px,0);transform:translate3d(0,-50px,0);opacity:0}",""])},249:function(e,t,a){var r=a(234);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(189)("ceb1f9c8",r,!0)},264:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"login_page fillcontain"},[a("transition",{attrs:{name:"form-fade",mode:"in-out"}},[a("section",{directives:[{name:"show",rawName:"v-show",value:e.showLogin,expression:"showLogin"}],staticClass:"form_contianer"},[a("div",{staticClass:"manage_tip"},[a("p",[e._v("驾考app后台管理系统")])]),e._v(" "),a("el-form",{ref:"loginForm",attrs:{model:e.loginForm,rules:e.rules}},[a("el-form-item",{attrs:{prop:"username"}},[a("el-input",{attrs:{placeholder:"用户名"},model:{value:e.loginForm.username,callback:function(t){e.$set(e.loginForm,"username",t)},expression:"loginForm.username"}},[a("span",[e._v("dsfsf")])])],1),e._v(" "),a("el-form-item",{attrs:{prop:"password"}},[a("el-input",{attrs:{type:"password",placeholder:"密码"},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}})],1),e._v(" "),a("el-form-item",[a("el-button",{staticClass:"submit_btn",attrs:{type:"primary"},on:{click:function(t){e.submitForm("loginForm")}}},[e._v("登陆")])],1)],1),e._v(" "),a("br"),e._v(" "),a("p",{staticClass:"tip"},[e._v("温馨提示：本系统无法注册")])],1)])],1)},staticRenderFns:[]}}});