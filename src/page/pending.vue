<template>
    <div class="fillcontain" id="pending">
        <head-top></head-top>
        <div class="table_container">


            <el-col :span="24" class="toolbar mysearch" >
                <el-form :inline="true" :model="filters">
                    <el-form-item label="状态">
                        <el-select v-model="filters.type" @change="handleCurrentChange()">
                            <el-option v-for="item in options1"  :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="科目">
                        <el-select v-model="filters.sub" @change="handleCurrentChange()">
                            <el-option v-for="item in options2" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                     <el-form-item  class="searchname" >
                        <el-button type="primary" @click="handleCurrentChange()">查询</el-button>
                    </el-form-item>

                    <el-form-item class="searchname">
                        <el-input v-model="filters.name" @keyup.enter.native="handleCurrentChange()" placeholder="输入关键字"></el-input>
                    </el-form-item>
                    

                </el-form>
            </el-col>
    


            <el-table
                :data="tableData" v-loading.body="listLoading"
                style="width: 100%">
                <el-table-column type="expand">
                  <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="真实姓名">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item label="到期时间">
                        <span>{{ props.row.zfTime }}</span>
                      </el-form-item>
                      <el-form-item label="身份证号">
                        <span>{{ props.row.sfz }}</span>
                      </el-form-item>
                      <el-form-item label="备注">
                        <span>{{ props.row.bz }}</span>
                      </el-form-item>
                      <el-form-item label="申请资料">
                        <img class='datapic' style="cursor:pointer" :src="props.row.picName" @click="showpic(props.row.picName)">
                        
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  type="index"
                  width="100">
                </el-table-column>

                <el-table-column
                  label="账号"
                  prop="phone">
                </el-table-column>
                
                <el-table-column
                  label="申请科目"
                  prop="subject">
                </el-table-column>
                 <el-table-column
                  label="申请时间"
                  prop="sqTime">
                </el-table-column>
                <el-table-column
                  label="状态"
                  prop="type">
                </el-table-column>
                <el-table-column label="操作" width="200">
                  <template scope="scope">
                    <el-button
                      size="mini" 
                      :style="scope.row.style_bt"
                      :type="scope.row.deal_bt"
                      @click="handleEdit(scope.$index, scope.row)">处理</el-button>
                  </template>
                </el-table-column>
            </el-table>



           <div class="Pagination">
                <el-pagination
                  
                  @current-change="pageChange"
                  :current-page.sync="pageNum"
                  :page-size="10"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div> 

            <el-dialog title="审批" v-model="dialogFormVisible">
                <el-form :model="selectTable" :rules="rules" ref="selectTable">
                    <el-steps :active="audittype" style="margin-left:100px;margin-bottom:20px">
                      <el-step title="待审核"></el-step>
                      <el-step title="待退款"></el-step>
                      <el-step title="完成"></el-step>
                    </el-steps>
                  
                    <el-form-item label="审核结果：" prop="audit" label-width="100px" :style="style1">
                        <el-select v-model="selectTable.audit" :placeholder="placeholder">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审核备注：" prop="audit_remark" label-width="100px" :style="style1">
                        <el-input
                          type="textarea"
                          autosize
                          placeholder="请输入内容"
                          v-model="selectTable.audit_remark">
                        </el-input>
                    </el-form-item>
                    <p style='text-align:center; font-size:20px' :style="style2">确认已退款？</p>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="deal_sq('selectTable')">确 定</el-button>
              </div>
            </el-dialog>
                  <!-- 图片预览（此处，data定义，js方法，样式） -->
                  <el-dialog class="pic_dialog" title="" v-model="dialogFormPic" top="30px" size="large" style="text-align:center;"> 
                      <img class='detailpic' :model="picurl" :src="picurl">
                  </el-dialog> 
        </div>
    </div>



</template>


<script>
    import headTop from '../components/headTop'
    import {deal_data,my_url,my_url_pic} from '@/api/my_function'
    export default {
        data(){
            return {
                
               
                //每页数据/条
                limit: 10,
                //现有数据/条
                count: 0,
                //当前页面
                pageNum: 1,

                class_one: '',
                sqZt: '',
                seaech_str: '',


                placeholder: "请输入内容",

                rules: {
                    audit: [
                        { required: true, message: '请选择审核结果', trigger: 'change' }
                    ],
                    audit_remark: [
                        { required: true, message: '请输入备注内容', trigger: 'blur' },
                    ]
                },
                tableData: [],
                xqData: [],
             options: [{
                    value: '通过'
                }, {
                    value: '不通过'
                }],
             options1: [{
                    value: '全部'
                },{
                    value: '等待审核'
                }, {
                    value: '等待出库'
                }, {
                    value: '已完成'
                }, {
                    value: '不通过'
                }],
            options2: [{
                    value: '全部'
                },{
                    value: '科目一'
                }, {
                    value: '科目四'
                }],
            filters: {
                    type: "全部",
                    sub: "全部",
                    name: ''
                },
                //加载动画控制
                listLoading: false,
                
            style1: {
                    display: 'none'
                  },
            style2: {
                    display: 'none'
                  },
            style3: {
                    display: 'none'
                  },
            style4: {
                    display: 'block'
                  },


                click_ID:'',
                click_index:'',
                click_type:'',

                //图片预览
                dialogFormPic: false,
                picurl:'',


                audittype: '',  
                selectTable: {},
                dialogFormVisible: false,
                categoryOptions: [],
                selectedCategory: [],
                address: {},
            }
        },
        mounted(){
             this.tijiao();
        },
        components: {
            headTop,
        },
        created(){
            
        },
        methods: {

            showpic(url){
                this.dialogFormPic = true;
                this.picurl = url;
            },

            handleCurrentChange(){
                this.class_one = this.filters.sub=='科目一'?'1':(this.filters.sub=='科目四'?'4':null)
                this.sqZt = this.filters.type=='等待审核'?'0':(this.filters.type=='等待出库'?'1':(this.filters.type=='已完成'?'2':'-1'))
                 if(this.filters.type=='全部')this.sqZt=''
                 this.seaech_str = this.filters.name.trim()
                 this.tijiao()
            }, 
            pageChange(val){
                this.pageNum = val
                this.tijiao()
            },
            tijiao(){
                this.initData(this.pageNum,this.class_one,this.sqZt,this.seaech_str);
            },
            handleEdit(index, row) {
                this.click_index = index
                this.click_ID = row.ID
                this.click_type = row.type

                this.selectTable = row;
                this.dialogFormVisible = true;
                switch (this.selectTable.type) {
                    case '等待审核':
                        this.audittype = "1"
                        this.style1 = [{
                            display: 'block'
                        }]
                        this.style2 = [{
                            display: 'none'
                        }]
                        break;
                        case '等待出库':
                            this.audittype = "2"
                            this.style1 = [{
                                display: 'none'
                            }]
                            this.style2 = [{
                                display: 'block'
                            }]
                            break;
                }
            },
            

            async initData(pageNum,class_one,sqZt,seaech_str){
                this.listLoading = true
                // this.$http.jsonp(my_url+'Admin/get_sqs',{params: {pageNum,class_one,sqZt,seaech_str},jsonp:"_callback"}).then(function (data){
                this.$http.post(my_url+'Admin/get_sqs',{pageNum,class_one,sqZt,seaech_str},{emulateJSON:true}).then(function(data){  
                       var res = deal_data(data)
                       var that = this
                       that.tableData = [];
                       if(res.status=='success'){
                            this.$emit('childEvent', { name: 'zhangsan', age:  0 });
                            res.listInfo.forEach(function(item){
                                var style3={
                                    display: 'none'
                                  }

                                that.tableData.push({
                                  ID: item.sqID,
                                  phone: item.phone,
                                  type: item.sqZt==0?'等待审核':(item.sqZt==1?'等待出库':(item.sqZt==2?'已完成':'不通过')),
                                  subject: item.class_one==1?'科目一':'科目四',
                                  remark: item.sq_bz,
                                  audit:'',
                                  sfz: item.sfz,
                                  picName: my_url_pic+item.picName,
                                  name: item.name,
                                  bz: item.sq_bz,
                                  sqTime: item.sqTime.substring(0, 10),
                                  zfTime: that.GetDateStr(item.scTime.substring(0, 10),item.type),
                                  deal_bt: item.sqZt==0?'primary':(item.sqZt==1?'success':''),
                                  style_bt: item.sqZt==2?style3:(item.sqZt==-1?style3:''),
                                })
                                
                            });
                            
                             that.count = res.TotalRow
                           }else{
                            this.$message({
                                type: 'error',
                                message: '获取用户失败，请稍后重试'
                            });
                            that.count = 0
                        }
                       
                       
                });
                this.listLoading = false
            },

            // async getResturants(){
            //     const {latitude, longitude} = this.city;
            //     const restaurants = await getResturants({latitude, longitude, offset: this.offset, limit: this.limit});
            //     this.tableData = [];
            //     restaurants.forEach(item => {
            //         const tableData = {};
            //         tableData.name = item.name;
            //         tableData.address = item.address;
            //         tableData.description = item.description;
            //         tableData.id = item.id;
            //         tableData.phone = item.phone;
            //         tableData.rating = item.rating;
            //         tableData.recent_order_num = item.recent_order_num;
            //         tableData.category = item.category;
            //         tableData.image_path = item.image_path;
            //         this.tableData.push(tableData);
            //     })
            // },
            // handleSizeChange(val) {
            //     console.log(`每页 ${val} 条`);
            // },
            // handleCurrentChange(val) {
            //     this.currentPage = val;
            //     this.offset = (val - 1)*this.limit;
            //     this.getResturants()
            // },
            // handleEdit(index, row) {
            //     this.selectTable = row;
            //     this.dialogFormVisible = true;
            //     switch(this.selectTable.type){
            //         case '待审核': this.audittype="1"
            //         this.style1= [{
            //                     display: 'block'
            //                 }]
            //                 this.style2= [{
            //                     display: 'none'
            //                 }]
            //         break;
            //         case '待退款': this.audittype="2"
            //         this.style1= [{
            //                     display: 'none'
            //                 }]
            //                 this.style2= [{
            //                     display: 'block'
            //                 }]
            //         break;
            //     }
            // }
            deal_sq_tuikuan(){
                var that = this
                // this.$http.jsonp(my_url+'Admin/deal_sq',{params: {ID:this.click_ID,sqZt:2},jsonp:"_callback"}).then(function (data){
         this.$http.post(my_url+'Admin/deal_sq',{ID:this.click_ID,sqZt:2},{emulateJSON:true}).then(function(data){  
                       var res = deal_data(data)
                       if(res.status == 'success'){
                            that.dialogFormVisible = false;
                            this.$message({
                                type: 'success',
                                message: '处理成功'
                            });
                            var style3={
                                    display: 'none'
                                  }
                            that.tableData[this.click_index].style_bt = style3
                                that.tableData[this.click_index].type = '已完成'
                       }else{
                            that.dialogFormVisible = false;
                            this.$message({
                                type: 'error',
                                message: '处理失败，请稍后重试'
                            });
                       }

                });
            },
            GetDateStr(fDate,AddDayCount) {
               var fullDate = fDate.split("-");     
               var dd = new Date(fullDate[0], fullDate[1]-1, fullDate[2], 0, 0, 0);    
               dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期    
               var y = dd.getFullYear();     
               var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0    
               var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0    
               return y+"-"+m+"-"+d;     
            },
            deal_sq(selectTable){
                this.$refs[selectTable].validate(async (valid) => {
                    if (valid) {
                if(this.click_type=='等待出库'){
                    this.deal_sq_tuikuan()
                    return
                }

                var uk = this.selectTable.audit=='通过'?1:'-1'
                var that = this

// this.$http.jsonp(my_url+'Admin/deal_sq',{params: {ID:this.click_ID,deal_bz:this.selectTable.audit_remark,sqZt:uk},jsonp:"_callback"}).then(function (data){
         this.$http.post(my_url+'Admin/deal_sq',{ID:this.click_ID,deal_bz:this.selectTable.audit_remark,sqZt:uk},{emulateJSON:true}).then(function(data){  
                       var res = deal_data(data)
                       if(res.status == 'success'){
                            that.dialogFormVisible = false;
                            this.$message({
                                type: 'success',
                                message: '处理成功'
                            });
                            if(uk==1){
                                that.tableData[this.click_index].deal_bt = 'success'
                                that.tableData[this.click_index].type = '等待出库'
                            }else {
                                var style3={
                                    display: 'none'
                                  }
                                that.tableData[this.click_index].style_bt = style3
                                that.tableData[this.click_index].type = '不通过'
                            }
                            
                       }else{
                            that.dialogFormVisible = false; 
                            this.$message({
                                type: 'error',
                                message: '处理失败，请稍后重试'
                            });
                       }
                   });
            }else {
                        
                    }
                });
                
            },
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
    .datapic:hover{
        border:1px dashed black;
        margin:4px;
    }
    .datapic{
        height:200px;
        width:200px;
        margin:5px;
    }

    .detailpic{
    margin: 5px;
    max-width: 80%;
}
.pic_dialog .el-dialog{
    background: rgba(0,0,0,0.3);
}
//分页栏固定
#pending .el-table{
  min-height: 451px;
}
</style>
