<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="12" :offset="4">
                <el-form :model="ruleForm2" :rules="rule" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="旧密码" prop="oldpass">
                        <el-input type="password" v-model="ruleForm2.oldpass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newpass">
                        <el-input type="password" v-model="ruleForm2.newpass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="button_submit">
                        <el-button type="primary" @click="submitForm('ruleForm2')">立即修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {deal_data,my_url} from '@/api/my_function'

    export default {
         data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
          }
          callback();
        }
      };
      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else if (value == this.ruleForm2.oldpass) {
          callback(new Error('新密码与旧密码不能相同'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.ruleForm2.newpass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        myques:[],
        ruleForm2: {
          oldpass: '',
          newpass: '',
          checkPass: '',
        },
        rule: {
          oldpass: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' },
            { min:6, message: '密码最小长度为6位'},
            { max:15, message: '密码最大长度为16位'}
          ],
          newpass: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { validator: validatePass1, trigger: 'blur' },
            { min:6, message: '密码最小长度为6位'},
            { max:15, message: '密码最大长度为16位'}
          ],
          checkPass: [
            { required: true, message: '请再次输入新密码', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' },
            { min:6, message: '密码最小长度为6位'},
            { max:15, message: '密码最大长度为16位'}
          ]
        }
      };
    },
        components: {
            headTop,
        },
        mounted(){
            // this.$http.post(my_url+'Admin/get_adminlogin',{},{emulateJSON:true}).then(function(data){  
            //   var res = deal_data(data);})
        },
        methods: {
            async submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        console.log(this.ruleForm2)
   // this.$http.jsonp(my_url+'Pub/changePass',{params: {oldpass: this.ruleForm2.oldpass, newpass: this.ruleForm2.newpass},jsonp:"_callback"}) .then(function (data){
                this.$http.post(my_url+'Admin/changePass',{oldpass: this.ruleForm2.oldpass, newpass: this.ruleForm2.newpass},{emulateJSON:true}).then(function(data){
                            // var res = eval('(' + data.bodyText + ')');
                            var res = deal_data(data)
                            if (res.status == 'success') {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功'
                                });
                                this.ruleForm2.newpass=''
                                this.ruleForm2.checkPass=''
                                this.ruleForm2.oldpass=''
                                 // this.$router.push({path:'vueEdit',params:{page_name:'password'}})
                                // this.$router.replace('')
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: '旧密码错误，请重新输入'
                                });
                            }
                        },function(error) {
                            this.$message({
                                type: 'error',
                                message: '网络异常'
                            });
                        });
                    } else {
                    this.$notify.error({
                        title: '错误',
                        message: '请检查你的输入',
                        offset: 100,
                        duration: 1000
                    });
                    return false;
                }
                });
            },
        }
    }
</script>

<style  lang="less">
    select{
        border:1px solid #bfcbd9!important;
        background-color: #F5F5F5;
    }
        @import '../style/mixin';
    .form{
        min-width: 400px;
        margin-bottom: 30px;
        &:hover{
            box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
            border-radius: 6px;
            transition: all 400ms;
        }
    }
    .food_form{
        border: 1px solid #eaeefb;
        padding: 10px 10px 0;
    }
    .form_header{
        text-align: center;
        margin-bottom: 10px;
    }
    .category_select{
        border: 1px solid #eaeefb;
        padding: 10px 30px 10px 10px;
        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
    }
    .add_category_row{
        height: 0;
        overflow: hidden;
        transition: all 400ms;
        background: #f9fafc;
    }
    .showEdit{
        height: 185px;
    }
    .add_category{
        background: #f9fafc;
        padding: 10px 30px 0px 10px;
        border: 1px solid #eaeefb;
        border-top: none;
    }
    .add_category_button{
        text-align: center;
        line-height: 40px;
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
        border: 1px solid #eaeefb;
        border-top: none;
        transition: all 400ms;
        &:hover{
            background: #f9fafc;
            span, .edit_icon{
                color: #20a0ff;
            }
        }
        span{
            .sc(14px, #999);
            transition: all 400ms;  
        }
        .edit_icon{
            color: #ccc;
            transition: all 400ms;
        }
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
    .cell{
        text-align: center;
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
    .button_submit{
        text-align: center;
    }
</style>
