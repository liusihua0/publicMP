webpackJsonp([1],{205:function(t,e,a){a(251);var n=a(85)(a(227),a(266),null,null);t.exports=n.exports},206:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(49),r=a.n(n),i=a(48),o=a.n(i),s=a(50),l=a.n(s),c=a(87),p=a(86),u=a(88);e.default={data:function(){return{baseImgPath:p.b}},created:function(){this.adminInfo.id||this.getAdminData()},computed:l()({},a.i(u.b)(["adminInfo"])),methods:l()({},a.i(u.c)(["getAdminData"]),{handleCommand:function(t){var e=this;return o()(r.a.mark(function n(){var i;return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if("home"!=t){n.next=4;break}e.$router.push("/manage"),n.next=9;break;case 4:if("singout"!=t){n.next=9;break}return n.next=7,a.i(c.b)();case 7:i=n.sent,1==i.status?(e.$message({type:"success",message:"退出成功"}),e.$router.push("/")):e.$message({type:"error",message:i.message});case 9:case"end":return n.stop()}},n,e)}))()}})}},207:function(t,e,a){e=t.exports=a(188)(!1),e.push([t.i,".allcover{position:absolute;top:0;right:0}.ctt{left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{-webkit-transform:translateY(-50%);transform:translateY(-50%)}.lr{position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.mysearch{height:50px;background:#f5f5f5;padding-top:7px;padding-left:10px;margin-bottom:10px}.mysearch .el-select{width:100px}.mysearch .searchname{float:right}.header_container{background-color:#eff2f7;height:60px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding-left:20px}.avator{width:36px;height:36px;border-radius:50%;margin-right:37px}.el-dropdown-menu__item{text-align:center}",""])},208:function(t,e,a){var n=a(207);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(189)("019239ba",n,!0)},209:function(t,e,a){a(208);var n=a(85)(a(206),a(210),null,null);t.exports=n.exports},210:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"header_container"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/manage"}}},[t._v("首页")]),t._v(" "),t._l(t.$route.meta,function(e,n){return a("el-breadcrumb-item",{key:"index"},[t._v(t._s(e))])})],2),t._v(" "),a("el-dropdown",{attrs:{"menu-align":"start"},on:{command:t.handleCommand}},[a("img",{staticClass:"avator",attrs:{src:t.baseImgPath+t.adminInfo.avatar}}),t._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:"home"}},[t._v("首页")]),t._v(" "),a("el-dropdown-item",{attrs:{command:"singout"}},[t._v("退出")])],1)],1)],1)},staticRenderFns:[]}},211:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"b",function(){return deal_data}),__webpack_require__.d(__webpack_exports__,"a",function(){return my_url}),__webpack_require__.d(__webpack_exports__,"c",function(){return my_url_pic});var deal_data=function deal_data(data){null==data&&window.location.replace("login");var res=eval("("+data.bodyText+")");return"error"==res.status&&window.location.replace("login"),res},my_url="http://10.19.6.234:8080/Driving/",my_url_pic="http://10.19.6.234:8080/Driving/Pub/getPic?pic="},227:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(49),r=a.n(n),i=a(48),o=a.n(i),s=a(209),l=a.n(s),c=a(211);e.default={data:function(){return{headers_my:{"Content-Type":"multipart/form-data"},limit:10,count:0,pageNum:1,tableData:[],options:[{value:"通过"},{value:"不通过"}],options2:[{value:"科目二"},{value:"科目三"}],style1:{display:"none"},style2:{display:"none"},formData:{sub:"",newcaption:"",newdescripton:""},rule:{sub:[{required:!0,message:"请选择科目",trigger:"change"}],newcaption:[{required:!0,message:"请输入标题",trigger:"blur"}],newdescripton:[{required:!0,message:"请输入描述",trigger:"blur"}]},audittype:"1",activeName:"2",currentPage:1,selectTable:{},dialogFormVisible:!1,categoryOptions:[],selectedCategory:[],address:{},file:"",listLoading:!1,rr_flag:!1}},created:function(){this.initData(2,1)},components:{headTop:l.a},methods:{tt_p:function(){},rr_t:function(){this.listLoading=this.rr_flag,this.dialogFormVisible=!0},rr_f:function(){this.dialogFormVisible=!1,this.listLoading=!1},pageChange:function(t){this.pageNum=t,this.initData(this.activeName,this.pageNum)},sceachChange:function(){this.initData(this.activeName,1)},initData:function(t,e){var n=this;return o()(r.a.mark(function i(){return r.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:try{n.$http.post(c.a+"Admin/get_v",{pageNum:e,class_one:t},{emulateJSON:!0}).then(function(t){var e=a.i(c.b)(t),n=this;n.tableData=[],"success"==e.status?(e.listInfo.forEach(function(t){n.tableData.push({ID:t.ID,code:"VIDEO_0"+t.videoName.substring(6,t.videoName.length-4),mainTitle:t.mainTitle,videoUrl:c.a+"Pub/get_video?video="+t.videoName,class_one:t.class_one,subTitle:t.subTitle,updateTime:t.updateTime.substring(0,10),isTuto:t.isTuto,text:0==t.isTuto?"添加到教程":"从教程移除"})}),n.count=e.TotalRow):(this.$message({type:"info",message:"获取用户失败，请稍后重试"}),n.count=0)})}catch(t){n.$message({type:"error",message:"发生异常，请稍后重试"})}case 1:case"end":return r.stop()}},i,n)}))()},before_upload:function(t){this.file=t},submitUpload:function(t){var e=this;this.$refs[t].validate(function(){var t=o()(r.a.mark(function t(n){var i,o,s,l;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!n){t.next=25;break}if(""!=e.file){t.next=4;break}return e.$message({type:"error",message:"请先选择要上传的视频"}),t.abrupt("return");case 4:if(e.listLoading=!0,e.rr_flag=!0,i=e.file,o=i.name.substring(i.name.length-3,i.name.length),console.log(i),"mp4"!==o){t.next=19;break}event.preventDefault(),s=new FormData,s.append("file",e.file),s.append("mainTitle",e.formData.newcaption),s.append("subTitle",e.formData.newdescripton),l={headers:{"Content-Type":"multipart/form-data"},emulateJSON:!0},e.$http.post(c.a+"Admin/upload_video",s,l).then(function(t){"success"==a.i(c.b)(t).status?(e.$message({type:"success",message:"上传成功"}),e.file="",e.listLoading=!1,e.rr_flag=!1):(e.$message({type:"info",message:"上传失败，请检查数据是否正确"}),e.listLoading=!1,e.rr_flag=!1)},function(t){this.$message({type:"error",message:"网络异常"}),this.listLoading=!1,this.rr_flag=!1}),t.next=23;break;case 19:return e.listLoading=!1,e.rr_flag=!1,e.$message.error("上传视频只能是 mp4 格式!"),t.abrupt("return",!1);case 23:t.next=25;break;case 25:case"end":return t.stop()}},t,e)}));return function(e){return t.apply(this,arguments)}}())},deleteRow:function(t,e){var n=this;this.$confirm("确定删除？").then(function(r){n.$http.post(c.a+"Admin/del_video",{ID:e},{emulateJSON:!0}).then(function(e){"success"==a.i(c.b)(e).status?(n.$message({type:"success",message:"删除成功"}),n.tableData.splice(t,1),n.count--):n.$message({type:"info",message:"删除失败"})})}).catch(function(t){})},addonsub:function(t,e,n){var r=this,i=0;"添加到教程"==e&&(i=1),this.$confirm(1==i?"确定将本视频添加为教程？":"确定将本视频从教程中删除？").then(function(e){1==i?r.$http.post(c.a+"Admin/add_tutorial",{ID:t},{emulateJSON:!0}).then(function(t){"success"==a.i(c.b)(t).status?(r.$message({type:"success",message:"添加成功"}),r.tableData[n].text="从教程删除"):r.$message({type:"info",message:"添加失败"})}):r.$http.post(c.a+"Admin/del_tuto",{ID:t},{emulateJSON:!0}).then(function(t){"success"==a.i(c.b)(t).status?(r.$message({type:"success",message:"删除成功"}),r.tableData[n].text="添加到教程"):r.$message({type:"info",message:"删除失败"})})}).catch(function(t){})}}}},236:function(t,e,a){e=t.exports=a(188)(!1),e.push([t.i,".allcover{position:absolute;top:0;right:0}.ctt{left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{-webkit-transform:translateY(-50%);transform:translateY(-50%)}.lr{position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.mysearch{height:50px;background:#f5f5f5;padding-top:7px;padding-left:10px;margin-bottom:10px}.mysearch .el-select{width:100px}.mysearch .searchname{float:right}.demo-table-expand{font-size:0}.demo-table-expand label{width:90px;color:#99a9bf}.demo-table-expand .el-form-item{margin-right:0;margin-bottom:0;width:50%}.table_container{padding:20px}.Pagination{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;margin-top:8px}.avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden}.avatar-uploader .el-upload:hover{border-color:#20a0ff}.avatar-uploader-icon{font-size:28px;color:#8c939d;width:120px;height:120px;line-height:120px;text-align:center}.avatar{width:120px;height:120px;display:block}.datapic:hover{border:1px dashed #000;margin:4px}.datapic{height:200px;width:200px;margin:5px}",""])},251:function(t,e,a){var n=a(236);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(189)("44b59e6c",n,!0)},266:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"fillcontain"},[a("head-top"),t._v(" "),a("div",{staticClass:"table_container"},[a("el-button",{staticStyle:{position:"absolute",right:"20px","z-index":"1"},attrs:{type:"primary",icon:"upload"},on:{click:function(e){t.rr_t()}}},[t._v("上传视频")]),t._v(" "),a("el-tabs",{on:{"tab-click":function(e){t.sceachChange()}},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"科目二",name:"2"}}),t._v(" "),a("el-tab-pane",{attrs:{label:"科目三",name:"3"}})],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"视频内容"}},[a("video",{staticStyle:{height:"100px",width:"200px","margin-left":":"},attrs:{controls:"controls",src:t.row.videoUrl}},[a("source",{attrs:{src:t.row.videoUrl,type:"video/*"}})])])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{type:"index",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{label:"编号",prop:"code"}}),t._v(" "),a("el-table-column",{attrs:{label:"标题",prop:"mainTitle"}}),t._v(" "),a("el-table-column",{attrs:{label:"描述",prop:"subTitle"}}),t._v(" "),a("el-table-column",{attrs:{label:"上传日期",prop:"updateTime"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){t.addonsub(e.row.ID,e.row.text,e.$index)}}},[t._v(t._s(e.row.text))]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.deleteRow(e.$index,e.row.ID)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("div",{staticClass:"Pagination"},[a("el-pagination",{attrs:{"current-page":t.pageNum,"page-size":10,layout:"total, prev, pager, next",total:t.count},on:{"current-change":t.pageChange,"update:currentPage":function(e){t.pageNum=e}}})],1),t._v(" "),a("el-dialog",{attrs:{title:"上传视频"},model:{value:t.dialogFormVisible,callback:function(e){t.dialogFormVisible=e},expression:"dialogFormVisible"}},[a("el-form",{ref:"formData",attrs:{model:t.formData,rules:t.rule}},[a("el-upload",{staticClass:"upload-demo",staticStyle:{"margin-left":"60px","margin-bottom":"20px"},attrs:{name:"file","before-upload":t.before_upload}},[a("el-button",{attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[t._v("选取文件")]),t._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传mp4文件，且不超过2G")])],1),t._v(" "),a("el-form-item",{attrs:{label:"科目","label-width":"100px",prop:"sub"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.formData.sub,callback:function(e){t.$set(t.formData,"sub",e)},expression:"formData.sub"}},t._l(t.options2,function(t){return a("el-option",{attrs:{value:t.value}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"标题","label-width":"100px",prop:"newcaption"}},[a("el-input",{attrs:{type:"text",maxlength:"20",autosize:"",placeholder:"请输入内容"},model:{value:t.formData.newcaption,callback:function(e){t.$set(t.formData,"newcaption",e)},expression:"formData.newcaption"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"描述","label-width":"100px",prop:"newdescripton"}},[a("el-input",{attrs:{type:"textarea",maxlength:"100",autosize:"",placeholder:"请输入内容"},model:{value:t.formData.newdescripton,callback:function(e){t.$set(t.formData,"newdescripton",e)},expression:"formData.newdescripton"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{directives:[{name:"loading",rawName:"v-loading.body",value:t.listLoading,expression:"listLoading",modifiers:{body:!0}}],attrs:{type:"primary"},on:{click:function(e){t.submitUpload("formData")}}},[t._v("开始上传")])],1)],1)],1)],1)},staticRenderFns:[]}}});