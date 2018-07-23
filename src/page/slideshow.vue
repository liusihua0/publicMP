<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                @expand='expand'
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="60">
                </el-table-column>
                <el-table-column
                  label="轮播图"
                  >
                  <template scope="scope" style="height:40px">
                      <div slot="reference" class="name-wrapper">
                        <img :src="scope.row.pic" style="height:100px;width:300px;margin-top:5px">
                      </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="标题"
                  prop="title">
                </el-table-column>
                <el-table-column
                  label="链接"
                  prop="url">
                </el-table-column>
                <el-table-column label="是否显示" width="100">
                  <template scope="scope">
                    <el-switch
                      v-model="scope.row.zt"
                      on-color="#13ce66"
                      off-color="#ff4949"
                      off-text="隐藏"
                      on-text="显示"
                      @change="state_change(scope.row)">
                    </el-switch>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="160">
                  <template scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="tt_uk(scope.row)">编辑</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <el-dialog title="轮播图设置" v-model="dialogFormVisible">
                <el-form :model="formData" ref="formData">
                    <el-upload
                          class="avatar-uploader"
                           action=""
                          :before-upload="before_upload"
                          style="margin-left: 60px;margin-bottom:20px">
                          <img v-if="parse_url" :src="parse_url" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          <div slot="tip" class="el-upload__tip">只能上传jpg,png文件，且不超过2M</div>
                        </el-upload>
                    <el-form-item label="标题" label-width="100px" prop="title">
                        <el-input
                          type="text"
                          maxlength='15'
                          autosize
                          placeholder="请输入标题,长度少于15"
                          v-model="formData.title">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="链接" label-width="100px" prop="url">
                        <el-input
                          type="text"
                          maxlength='200'
                          autosize
                          placeholder="请输入点击轮播图跳转的链接"
                          v-model="formData.url">
                        </el-input>
                    </el-form-item>
                    
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitUpload()">确定</el-button>
              </div>
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
              tableData:[],
              formData:{
                url:'',
                title:'',
                ID:'',
                zt:''
              },
              dialogFormVisible: false,
              tt_ID:"",
              file:"",
              parse_url:""
            }
        },
        components: {
            headTop,
        },mounted(){
          this.$http.post(my_url+'Admin/get_adminlogin',{},{emulateJSON:true}).then(function(data){  
              var res = deal_data(data);})
            this.load_data()
        },
        methods: {
          before_upload(file){
              this.file = file
              var that = this
              var reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = function(e){ that.parse_url=this.result }
          },
          state_change(row){
              var zt = 0  
              if(row.zt){
                  zt = 1
              }
              var ID = row.ID
              this.$http.post(my_url+'Admin/update_lunbo_flag',{zt,ID},{emulateJSON:true}).then(function(data){  
                var res = deal_data(data);
                if (res.status == 'fail') {this.$message.info('修改失败，检测网络')}
              })
          },
          submitUpload(){
              var file = this.file;
              if(file==null||file==""){
                    if(this.formData.title&&this.formData.title.length!=0){
                        var title = this.formData.title
                        var url = this.formData.url
                        var ID = this.tt_ID
              this.$http.post(my_url+'Admin/update_lunbo_title',{title,url,ID},{emulateJSON:true}).then(function(data){  
                          var res = deal_data(data);
                          if (res.status == 'fail') {this.$message.info('修改失败，检测网络')}else{
                              this.dialogFormVisible=false
                              this.parse_url=''
                              this.file=''
                              this.load_data()
                          }
                        })
                        return false
                    }else{
                        this.$message.error('请填入轮播图的标题')
                        return false
                    }
                    
                      // this.$message.error('请添加您要上传的图片')
                      
              }
              const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
              const isLt2M = file.size / 1024 / 1024 < 2;

              if (!isRightType) {
                this.$message.error('上传头像图片只能是JPG或png格式!');
                      return false
              }
              if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                      return false
              }
              // if(this.formData.title==""||this.formData.title==null){
              //     this.$message.error('请填写轮播图的标题')
              //     return false
              // }
              event.preventDefault();//取消默认行为

              let formdata = new FormData();

              formdata.append('lunbo_pic',this.file);
              formdata.append('ID',this.tt_ID);

              formdata.append('url',this.formData.url);
              formdata.append('title',this.formData.title);
              console.log(this.formData.url)
              console.log(this.formData.title)
              let config = {
                  headers: {
                      'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
                  },
                  emulateJSON:true
             };
            this.$http.post(my_url+'Admin/upload_lunbo', formdata, config).then( (data) => {
                var res = deal_data(data)
                if(res.status=="success"){
                    this.$message.success('更改成功')
                    this.dialogFormVisible=false
                    this.parse_url=''
                    this.file=''
                    this.load_data()
                }else{
                    this.$message.error('更新失败')
                }
            },function(error){
                this.$message.error('操作失败，网络异常')
            })
          },
          tt_uk(row){
            this.tt_ID = row.ID
            this.formData.url = row.url
            this.formData.title = row.title
            this.dialogFormVisible=true
          },
          load_data(){
            this.$http.post(my_url+'Pub/get_lunbo',{},{emulateJSON:true}).then(function(data){  
                   var res = deal_data(data)
                   var that = this
                  if(res.lunboInfo!=null&&res.lunboInfo.length!=0){
                      that.tableData = []
                      res.lunboInfo.forEach( function(element, index) {
                          that.tableData.push({
                            pic: my_url_pic+element.lunbo_pic,
                            title: element.title,
                            url: element.url,
                            ID:element.ID,
                            zt:element.zt==1?true:false
                          })
                      });

                  }else{
                      this.$message({
                          type: 'info',
                          message: '暂无数据'
                      });
                  }
                  //dialogFormVisible=true
                     
            },function(error){
                this.$message({
                      type: 'info',
                      message: '加载失败，请稍后重试'
                  });
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
</style>
