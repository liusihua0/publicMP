<template>
    <div class="fillcontain" id='adduser'>
        <head-top></head-top>

        <el-row style="margin-top: 20px;">
            <el-col :span="12" :offset="4">
                <el-form :model="formData" :rules="rule" ref="formData" label-width="110px" class="demo-formData">
                    <!-- <header class="form_header">单个生成(默认前缀为:Z)</header>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="formData.phone" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="formData.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="地区" prop="localt">
                        <template>
                          <el-radio-group v-model="formData.localt">
                            <el-radio label="1">贵州123123</el-radio>
                            <el-radio label="2">非贵州</el-radio>
                          </el-radio-group>
                        </template>
                    </el-form-item>
                    <el-form-item class="button_submit">
                        <el-button type="primary" @click="add_one('formData')">立即创建</el-button>
                    </el-form-item> -->
                    <header class="form_header" style="margin-bottom: 50px">账号生成</header>
                    <!-- <el-upload class="upload-demo" :before-upload="before_upload" :limit="3" action="" style="margin-left:50px">
                        <el-button size="small" type="primary">上传excel</el-button><span style="margin-left:5px">{{excel_name}}</span>
                        <div slot="tip" class="el-upload__tip">批量生成时请按照模板样本填写excel表。如需下载，请戳<a :href="getModelExc" download="model">
                            下载模板
                        </a></div>
                    </el-upload> -->
                    <el-form-item label="生成数量" prop="num">
                        <el-input v-model="formData.num" placeholder="请输入生成数量"></el-input>
                    </el-form-item>
                    <el-form-item label="账号前缀" prop="str">
                        <el-input v-model="formData.str" placeholder="请输入账号附带的前缀"></el-input>
                    </el-form-item>
                    <el-form-item class="button_submit" style="margin-top:50px">

                        <el-button type="primary" @click="add_more_new()" v-loading.body="listLoading">立即生成</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import headTop from '@/components/headTop'
import { deal_data, my_url } from '@/api/my_function'
export default {
    data() {
        var checknumber = (rule, value, callback) => {
            if (isNaN(value)) {
                callback(new Error('只能为数字'));
            } else {
                callback();
            }
        };
        var checkphone = (rule, value, callback) => {
            if (value<1) {
                callback(new Error('请大于0'));
            }  else if (value>9999) {
                callback(new Error('请小于9999'));
            }else {
                callback();
            }
        };
        var checkpassword = (rule, value, callback) => {
            var re = /^[0-9a-zA-Z]*$/g;
            if (!re.test(value)) {
                callback(new Error('前缀只能是数字和字母的组合'));
            } else {
                callback();
            }
        };
        return {
            formData: {
                phone: '', //帐号
                password: '', //密码
                localt:0,
                num:"",
                str:"",
            },
            
            rule: {
                num: [
                    { required: true, message: '请输入生成数量', trigger: 'blur' },
                    { validator: checknumber, trigger: 'blur' },
                    { validator: checkphone, trigger: 'blur' }
                ],
                str: [
                    { required: true, message: '请输入账号前缀', trigger: 'blur' },
                    { max: 2, message: '前缀只能为1或2位' },
                    { validator: checkpassword, trigger: 'blur' }
                ],
                localt: [
                    { required: true, message: '请选择地区', trigger: 'change' }
                ],
            },
            //文件上传
            excel_name: '',
            file: '',
            src: '',
            listLoading: false,
            getModelExc: my_url + 'Admin/getModelExc?exc=model.xls',
            state:0
        }
    },
    components: {
        headTop,
    },
    mounted() {
        this.$http.post(my_url+'Admin/get_adminlogin',{},{emulateJSON:true}).then(function(data){  
              var res = deal_data(data);})
    },
    methods: {
        add_more_new(){

            var num = this.formData.num
            var str = this.formData.str
            if(this.state==1){
                this.$message({
                    type: 'info',
                    message: '账号生成中，请勿频繁操作'
                });
                return
            }else{
                this.state=1
            }
            this.$http.post(my_url + 'Admin/more_add_user', { num,str }, { emulateJSON: true }).then((data) => {        //做处理
                var res = deal_data(data)
                if (res.status == 'success') {
                    this.$message({
                        type: 'success',
                        message: '操作成功，请移驾至生成记录页面查看结果'
                    });
                    this.file = ""
                    this.excel_name = ""
                    // window.location.reload();
                    this.state=0
                } else {
                    this.$message({
                        type: 'error',
                        message: '生成失败，请检查数据或网络'
                    });
                    this.state=0
                }       
            },function(error){
                this.$message({
                    type: 'error',
                    message: '生成失败，请检查数据或网络'
                });
                this.state=0
            });
        },
        before_upload(file) {
            this.file = file;
            this.excel_name = this.file.name
        },
        add_more() {
            if (this.file == "") {
                this.$message({
                    type: 'error',
                    message: '请先选择要上传的excel表'
                });
                return
            }
            this.listLoading = true
            var file = this.file; //获取文件
            let Xls = file.name.substring(file.name.length - 4, file.name.length);
            if (Xls.substring(1, 4) === 'xls' || Xls === 'xlsx') {
                event.preventDefault(); //取消默认行为

                  
                let formdata = new FormData();

                  
                formdata.append('file', this.file);
                formdata.append('zfType', 1);  
                let config = {            
                    headers: {                 'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
                                     },
                    emulateJSON: true     
                };        
                this.$http.post(my_url + 'Admin/excel_add_user', formdata, config).then((data) => {        //做处理
                    var res = deal_data(data)
                    if (res.status == 'success') {
                        this.$message({
                            type: 'success',
                            message: '操作成功，请移驾至生成记录页面查看结果'
                        });
                        this.file = ""
                        this.excel_name = ""
                        // window.location.reload();
                    } else {
                        this.$message({
                            type: 'info',
                            message: '生成失败，请检查数据是否正确'
                        });
                    }       
                });
            } else {
                this.$message.error('上传文件只能是 xls/xlsx 格式!')
                this.listLoading = false
                return false
            }
            this.listLoading = false
        },
        add_one(formName) {
            this.$refs[formName].validate(async(valid) => {
                if (valid) {
                    var phone = this.formData.phone
                    var password = this.formData.password
                    var localt = this.formData.localt==1?"贵州":"非贵州"
                    this.$http.post(my_url + 'Admin/add_user', { phone, password,localt }, { emulateJSON: true }).then((data) => {        //做处理
                        var res = deal_data(data)
                        if (res.status == 'success') {
                            this.$message({
                                type: 'success',
                                message: '操作成功，请移驾至生成记录页面查看结果'
                            });
                            // this.formData.phone = ""
                            // this.formData.password = ""
                            this.$refs[formName].resetFields();

                            // window.location.reload();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '生成失败，帐号已存在'
                            });
                        }       
                    }).catch((error) => {
                        this.$message({
                            type: 'error',
                            message: '异常，请检查网络或数据'
                        });    
                    });
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '请正确输入',
                        offset: 100,
                        duration: 1000
                    });
                    return false;
                }
            })
        },
    },
}

</script>
<style lang="less">
@import '../style/mixin';
.form_header {
    text-align: center;
    margin-bottom: 10px;
}

#adduser .button_submit {
    text-align: right;
}

</style>
