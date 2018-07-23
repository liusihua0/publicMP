<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
                     
            <div class="block" style="position:absolute;right:20px;z-index: 1">
  <el-button type="primary" @click="preweek()">上周</el-button>
  <el-date-picker
    v-model="ranktime"
    type="week"
    format="yyyy 年 WW 周"
    placeholder="选择周" firstDayOfWeek="5" style="margin-bottom:20px;"
    readonly="readonly"
    >
  </el-date-picker>
  <el-button type="primary" @click="nextweek()">下周</el-button>
</div>
 <el-tabs v-model="activeName" @tab-click="sub_change">
                <el-tab-pane label="科目一" name="subone"></el-tab-pane>
                <el-tab-pane label="科目四" name="subfour"></el-tab-pane>
            </el-tabs> 

            <el-table
                :data="tableData" v-loading.body="listLoading"
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="100">
                </el-table-column>
                <el-table-column
                  label="姓名"
                  prop="name">
                </el-table-column>
                 <el-table-column
                  label="账号"
                  prop='phone'
                  width="200">
                </el-table-column>
                 <el-table-column
                  label="排名"
                  prop="ranking">
                </el-table-column>
                 <el-table-column
                  label="成绩"
                  prop="score">
                </el-table-column>
                 <el-table-column
                  label="奖金"
                  prop="prize"
                  width="160">
                  <template scope="scope">
                   <el-input
                          type="number"
                          autosize
                          placeholder="请输入"
                          v-model="scope.row.prize"
                          style="width:70px"
                          @blur="set_bouns(scope.row)"
                          >
                        </el-input> 元
                  </template>
                </el-table-column>
                <el-table-column
                  label="考试用时"
                  prop="examtime">
                </el-table-column>
                <el-table-column label="奖金发放" width="100">
                  <template scope="scope">
                    <el-switch
                      v-model="scope.row.jjtype"
                      on-color="#13ce66"
                      off-color="#ff4949"
                      off-text="未发"
                      on-text="已发"
                      @change="state_change(scope.row)">
                    </el-switch>
                  </template>
                </el-table-column>
                <el-table-column label="操作" >
                  <template scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="seeRow(scope.row.loginID)">详情</el-button>
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
            
        </div>
    </div>
</template>
<script>
    // import headTop from '@/components/headTop'
    // import {cityGuess, addShop, searchplace, foodCategory} from '@/api/getData'
    // import {baseUrl, baseImgPath, my_url} from '@/config/env'
    import headTop from '../components/headTop'
    import {deal_data,my_url} from '@/api/my_function'

    export default{
        data(){
            return {
                //每页数据/条
                limit: 10,
                //现有数据/条
                count: 1,
                //当前页面
                pageNum: 1,

                class_one: 1,
                week_tt: 0,
                
                activeName:'subone',
 
                today: new Date(),
                ranktime: "",
                tableData: [],
                listLoading: false,
                options: [{
                    value: '通过'
                }, {
                    value: '不通过'
                }],
                style1: {
                    display: 'none'
                  },
                  style2: {
                    display: 'none'
                  },
                
           }
        },
         components: {
            headTop,
        },mounted(){
             this.tijiao();
             this.set_today();
        },
        methods: {


          
          sub_change(tab, event){
              this.class_one = tab.name=='subone'?1:4
              this.initData(this.pageNum,this.class_one,this.week_tt)
          },
          async set_bouns(row){
              if(row.prize_history != row.prize){
                  this.$confirm('确定要修改 奖金 吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                      var ranking = row.ranking
                      var money = row.prize
 // this.$http.jsonp(my_url+'Admin/set_bouns',{params: {ranking,money},jsonp:"_callback"}).then(function (data){
                       this.$http.post(my_url+'Admin/set_bouns',{ranking,money},{emulateJSON:true}).then(function(data){
                       var res = deal_data(data)
                       if(res.status == 'success'){
                          this.$message({
                            type: 'success',
                            message: '修改成功!'
                          });
                          row.prize_history = row.prize
                       }else{
                            this.$message({
                                    type: 'error',
                                    message: '修改失败，请稍后重试'
                                });
                            row.prize = row.prize_history
                       }
                    });
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消修改'
                    });
                    row.prize = row.prize_history
                  });
              }
          },
         async  state_change(row){
            this.$confirm('确定要修改 奖金发放状态 吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                  var ID = row.ID
                  var money_type = row.jjtype?1:0
           // this.$http.jsonp(my_url+'Admin/set_money_type',{params: {money_type,ID},jsonp:"_callback"}).then(function (data){
                     this.$http.post(my_url+'Admin/set_money_type',{money_type,ID},{emulateJSON:true}).then(function(data){  
                      var res = deal_data(data)
                       if(res.status == 'success'){
                          this.$message({
                            type: 'success',
                            message: '修改成功!'
                          });
                       }else{
                            this.$message({
                                    type: 'error',
                                    message: '修改失败，请稍后重试'
                                });
                            row.jjtype = !row.jjtype
                       }
                    });

                  
              }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消修改'
                  });
                  row.jjtype = !row.jjtype

              });
          },
          set_today(){
            var today=new Date()
            var month=today.getMonth()+1
            this.ranktime=today.getFullYear()+"-"+month+"-"+today.getDate()
          },
            preweek(){
              // today.setDate(todays.getDate()-7);s
              // var today = new Date()
              var today=this.today
              today.setDate(today.getDate()-7) 
              var month=today.getMonth()+1
              this.ranktime=today.getFullYear()+"-"+month+"-"+today.getDate()

              this.week_tt++
              this.initData(this.pageNum,this.class_one,this.week_tt)
            },
            nextweek(){
              if(this.week_tt-1<0){
                this.$message({
                        type: 'error',
                        message: '下周的数据还未诞生呢'
                    });
              }else{
                  this.week_tt--
                  var today=this.today
                  today.setDate(today.getDate()+7) 
                  var month=today.getMonth()+1
                  this.ranktime=today.getFullYear()+"-"+month+"-"+today.getDate()
                  this.initData(this.pageNum,this.class_one,this.week_tt)
              }
             
            },
            async initData(pageNum,class_one,week_tt){
                this.listLoading = true
                var that = this
     // this.$http.jsonp(my_url+'Pub/getTop',{params: {pageNum,class_one,week_tt},jsonp:"_callback"}).then(function (data){
                this.$http.post(my_url+'Pub/getTop',{pageNum,class_one,week_tt},{emulateJSON:true}).then(function(data){
                       var res = deal_data(data)
                       
                       that.tableData = []
                       var top = []
                        if(res.status=='success'&&(res.topInfo!=null&&res.topInfo.length!=0)){
                          
                          res.topInfo.forEach(function(item,index){
                              
                            var i = top.length;  
                              while (i--) {  
                                   if (top[i] == item.loginID)return
                              }
                             if(i==-1){
                                var prize = 0
                                if(res.bounsInfo.length!=0){
                                    res.bounsInfo.forEach(function(uk){
                                        if(uk.ranking==top.length+1)
                                          prize = uk.bouns
                                    })
                                }
                                that.tableData.push({
                                  ID: item.ID,
                                  loginID: item.loginID,
                                  name: item.realName,
                                  ranking: top.length+1,
                                  score: item.score,
                                  prize: prize,
                                  prize_history: prize,
                                  examtime: item.spend+'秒',
                                  phone: item.phone,

                                  jjtype: item.money_type==1?true:'',
                                })
                                top[top.length] = item.loginID
                             }
                          });
                          that.count = res.TotalRow
                          this.listLoading = false
                        }else{
                          this.$message({
                                type: 'info',
                                message: '暂无用户'
                            });
                            that.count = 0
                            this.listLoading = false
                        }

                        

                       
                },function(error){
                	this.listLoading = false
                });
            },
            pageChange(val){
                this.pageNum = val
                this.tijiao()
            },
            tijiao(){
                this.initData(this.pageNum,this.class_one,this.week_tt)
            },
            seeRow(loginID){
                this.$router.push({ path: '/userdetail', query: { loginID }});
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        try{
                            if (result.status == 1) {
                                this.$message({
                                    type: 'success',
                                    message: '生成成功'
                                });
                                this.formData = {
                                    account: '', //帐号
                                    password: '', //密码
                                };
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: result.message
                                });
                            }
                            console.log(result)
                        }catch(err){
                            console.log(err)
                        }
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '请检查输入是否正确',
                            offset: 100
                        });
                        return false;
                    }
                });
            }
        }
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
</style>
