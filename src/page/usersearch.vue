<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">

            <el-col :span="24" class="toolbar mysearch" >
                <el-form :inline="true" :model="filters">
                    <el-form-item label="地区">
                        <el-select v-model="filters.localt" @change="sceachChange()">
                            <el-option v-for="item in options1"  :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否认证">
                        <el-select v-model="filters.zt" @change="sceachChange()">
                            <el-option v-for="item in options2"  :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否购买">
                        <el-select v-model="filters.zfType" @change="sceachChange()">
                            <el-option v-for="item in options3"  :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                     <el-form-item  class="searchname" >
                        <el-button type="primary" @click="sceachChange()">搜索</el-button>
                    </el-form-item>

                    <el-form-item class="searchname">
                        <el-input v-model="filters.search_str" @keyup.enter.native="sceachChange()" placeholder="输入关键字"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>

            <el-table
                :data="tableData"
                @expand='expand'
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="60">
                </el-table-column>
                <el-table-column
                  label="帐号"
                  prop="phone"
                  width="180">
                </el-table-column>
                <!-- <el-table-column
                  label="头像"
                  >
                  <template scope="scope" style="height:40px">
                      <div slot="reference" class="name-wrapper">
                        <img :src="scope.row.pic" style="height:40px;width:40px;margin-top:5px">
                      </div>
                  </template>
                </el-table-column> -->
                <el-table-column
                  label="姓名"
                  prop="realName">
                </el-table-column>
                <el-table-column
                  label="地区"
                  prop="localt">
                </el-table-column>
                <el-table-column
                  label="创建时间"
                  prop="scTime">
                </el-table-column>
                <el-table-column
                  label="购买时长"
                  prop="type">
                </el-table-column>
                <el-table-column
                  label="到期时间"
                  prop="zfTime">
                </el-table-column>
                
                <el-table-column
                  label="是否认证"
                  prop="zt">
                </el-table-column>
                <el-table-column label="操作" width="160">
                  <template scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="seeRow(scope.row.ID)">详情</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="deleteRow(scope.$index,scope.row.ID)">删除</el-button>
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
                    localt: "全部",
                    zt: "全部",
                    zfType: "全部",
                    search_str:null
                },
                options1: [{
                    value: '全部'
                },{
                    value: '贵州'
                }, {
                    value: '非贵州'
                }],
                options2: [{
                    value: '全部'
                },{
                    value: '已认证'
                }, {
                    value: '未认证'
                }],
                options3: [{
                    value: '全部'
                },{
                    value: '已购买'
                }, {
                    value: '未购买'
                }],

                zfType:'',
                zt:'',
                localt:'',
                search_str:'',
                
            }
        },
        components: {
            headTop,
        },mounted(){
            
             this.initData(1,null,null,null,null)
        },
        methods: {
            seeRow(loginID){
                this.$router.push({ path: '/userdetail', query: { loginID }});
            },
            deleteRow(index, ID) {
                this.$confirm('确定删除？').then(_ => {
                this.$http.post(my_url+'Admin/del_user', {ID}, {emulateJSON:true}).then( (data) => {
                    //做处理
                        var res = deal_data(data)
                        if (res.status == 'success') {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'
                                });
                                this.sceachChange()
                                this.count--
                            }else{
                                this.$message({
                                    type: 'info',
                                    message: '删除失败'
                                });
                            }
                    });
                }).catch(_ => {});
            },
            tijiao(){

            },
            async initData(pageNum,zfType,zt,localt,search_str){
                var that = this
                this.$http.post(my_url+'Admin/get_users',{pageNum,zfType,zt,localt,search_str},{emulateJSON:true}).then(function(data){
                       var res = deal_data(data)
                       that.tableData = []
                       if(res.status == 'success'){
                            
                            var listInfo = res.listInfo
                            listInfo.forEach(function(item){
                                that.tableData.push({
                                  ID: item.ID,
                                  name:item.name,
                                  realName: item.realName,
                                  phone: item.phone,
                                  sfz: item.sfz,
                                  zt: item.zt==1?'已认证':'未认证',
                                  //pic: my_url_pic+item.pic,
                                  type: item.type,
                                  localt: item.localt,
                                  scTime: item.scTime.substring(0, 10),
                                  zfType: item.zfType,
                                  zfTime: that.GetDateStr(item.scTime.substring(0, 10),item.type),

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
            GetDateStr(fDate,AddDayCount) {
               var fullDate = fDate.split("-");     
               var dd = new Date(fullDate[0], fullDate[1]-1, fullDate[2], 0, 0, 0);    
               dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期    
               var y = dd.getFullYear();     
               var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0    
               var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0    
               return y+"-"+m+"-"+d;     
            },
            handleCurrentChange(val) {
                this.pageNum = val
                this.initData(this.pageNum,this.zfType,this.zt,this.localt,this.search_str)
            },
            sceachChange(){
                
                this.zt = this.filters.zt=='全部'?null:(this.filters.zt=='已认证'?1:0)
                this.zfType = this.filters.zfType=='全部'?null:(this.filters.zfType=='已购买'?1:0)

                this.localt = this.filters.localt=='全部'?null:this.filters.localt
                this.search_str = this.filters.search_str
                this.initData(this.pageNum,this.zfType,this.zt,this.localt,this.search_str)
            },
            // tableRowClassName(row, index) {
            //     if (index === 1) {
            //         return 'info-row';
            //     } else if (index === 3) {
            //         return 'positive-row';
            //     }
            //     return '';
            // },
            // deleteSpecs(index){
            //     this.specs.splice(index, 1);
            // },
            // handleSizeChange(val) {
            //     console.log(`每页 ${val} 条`);
            // },
            
            expand(row, status){
                if (status) {
                    this.getSelectItemData(row)
                }else{
                    const index = this.expendRow.indexOf(row.index);
                    this.expendRow.splice(index, 1)
                }
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
