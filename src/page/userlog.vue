<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">

            <el-col :span="24" class="toolbar mysearch" >
                <el-form :inline="true" :model="filters">
                    <el-form-item label="操作类型">
                        <el-select v-model="filters.type" @change="sceachChange()">
                            <el-option v-for="item in options1"  :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  class="searchname" >
                        <el-button type="primary" @click="sceachChange()">重载数据</el-button>
                    </el-form-item>
                </el-form>

            </el-col>

            <el-table
                :data="tableData"
                @expand='expand'
                style="width: 100%">
                <el-table-column type="index" width="60"> </el-table-column>

                <el-table-column label="操作类型" prop="type"> </el-table-column>

                <el-table-column label="操作时间" prop="time"> </el-table-column>
                
                <el-table-column label="操作人数" prop="num"> </el-table-column>
                
                <el-table-column label="成功人数" prop="successNum"> </el-table-column>

                <el-table-column label="账号密码" prop="password"> </el-table-column>
                
                <el-table-column label="被生成账号信息" width="160">
                  <template scope="scope">
                    <a :href="scope.row.excelName" v-if="scope.row.type_uk==1" download="model"><el-button size="mini" type="primary" >下载报表</el-button></a>
                    <!-- <div class="cell" @click="seeRow(scope.row.excelName)" v-else>{{scope.row.excelName}}</div> -->
                    <el-button size="mini" type="primary" @click="seeRow(scope.row.excelName)" v-else>{{scope.row.excelName}}</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page.sync="pageNum"
                  :page-size="limit"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
            
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
                tableData: [],
                filters:{
                    type: "全部",
                },
                options1: [{
                    value: '全部'
                },{
                    value: '批量'
                }, {
                    value: '非批量'
                }],

                type:'',
                getExc: my_url+'Admin/getExc?exc=',
                
            }
        },
        components: {
            headTop,
        },mounted(){
            this.$http.post(my_url+'Admin/get_adminlogin',{},{emulateJSON:true}).then(function(data){  
              var res = deal_data(data);})
             this.initData(1,null)
        },
        methods: {
            
            async initData(pageNum,type){
                var that = this
                this.$http.post(my_url+'Admin/get_userlog',{pageNum,type},{emulateJSON:true}).then(function(data){
                       var res = deal_data(data)
                       that.tableData = []
                       if(res.status == 'success'){
                            
                            var listInfo = res.listInfo
                            listInfo.forEach(function(item){
                                console.log(that.getExc+item.excelName)
                                that.tableData.push({
                                  ID: item.ID,
                                  excelName:item.type==1?(that.getExc+item.excelName):item.excelName,
                                  type: item.type==1?"批量生成":"非批量生成",
                                  type_uk: item.type,
                                  time: item.time,
                                  num: item.num,
                                  successNum: item.successNum,
                                  password:item.password
                                })
                            })
                            that.count = res.TotalRow
                            // that.count = that.tableData.length
                            
                       }else{
                            this.$message({
                                type: 'info',
                                message: '暂无用户'
                            });
                            that.count = 0
                       }
                });
            },
            handleCurrentChange(val) {
                this.pageNum = val
                this.initData(this.pageNum,this.type)
            },
            sceachChange(){
                this.type = this.filters.type=="全部"?null:(this.filters.type=="批量"?1:0)
                this.initData(this.pageNum,this.type)
                this.$message({
                                type: 'success',
                                message: '加载成功'
                            });
            },
            seeRow(phone){
                var that = this
                this.$http.post(my_url+'Admin/getUserID_phone',{phone},{emulateJSON:true}).then(function(data){
                       var res = deal_data(data)
                       if(res.status == 'success'){
                            that.seeRow_byID(res.ID)
                       }else{
                            this.$message({
                                type: 'info',
                                message: '该用户已不存在'
                            });
                       }
                });
            },
            seeRow_byID(loginID){
                this.$router.push({ path: '/userdetail', query: { loginID }});
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
</style>
