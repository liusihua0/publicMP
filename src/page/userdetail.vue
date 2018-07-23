<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-row style="margin-top: 20px">
            <el-col :span="18" :offset="3">
                <el-form :model="formData" inline ref="formData" label-width="110px" class="userdetail">
                    <el-form-item label="头像：">
                        <img v-bind:src="formData.pic" @click="showpic(formData.pic)" style="height:80px;width:80px;cursor:pointer">
                    </el-form-item>
                    <br>
                    <el-form-item label="帐号：">
                        <span>{{ formData.phone }}</span>
                    </el-form-item>
                    <el-form-item label="创建时间：">
                        <span>{{ formData.scTime }}</span>
                    </el-form-item>
                    <el-form-item label="购买时长：">
                        <span>{{ formData.type }}</span>
                    </el-form-item>
                    <el-form-item label="到期时间：">
                        <span>{{ formData.zfTime }}</span>
                    </el-form-item>
                    <el-form-item label="所住地区：">
                        <span>{{ formData.localt }}</span>
                    </el-form-item>
                    <el-form-item label="是否认证：">
                        <span>{{ formData.zt }}</span>
                    </el-form-item>
                    <el-form-item label="真实名称：">
                        <span>{{ formData.realName }}</span>
                    </el-form-item>
                    <el-form-item label="身份证号：">
                        <span>{{ formData.sfz }}</span>
                    </el-form-item>
                    <el-form-item class="button_submit" style="text-align: right">
                        <el-button v-if="formData.rzzt==1" type="primary" @click="alertdata()">修改资料</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <!-- 图片预览（此处，data定义，js方法，样式） -->
        <el-dialog class="pic_dialog" title="" v-model="dialogFormPic" top="30px" style="text-align:center;">
            <img class='detailpic' :model="picurl" :src="picurl">
        </el-dialog>
        <el-dialog title="实名信息修改" v-model="dialogFormVisible">
            <el-form :model="selectTable" :rules="rules" ref="selectTable">
                <el-form-item label="真实姓名" label-width="100px" prop='realName'>
                    <el-input v-model="selectTable.realName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" label-width="100px" prop='sfz'>
                    <el-input type="text" v-model="selectTable.sfz" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="购买时长" label-width="100px" prop='type'>
                    <el-input type="text" v-model="selectTable.type" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="update('selectTable')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import headTop from '@/components/headTop'
import { deal_data, my_url, my_url_pic } from '@/api/my_function'
export default {
    data() {
        var validatePass1 = (rule, value, callback) => {
            if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(value))) {
                callback(new Error('身份证格式错误'));
            } else {
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (!(/^\d{1,4}$/.test(value))) {
                callback(new Error('长度为1-4位数字'));
            } else {
                callback();
            }
        };

        return {
            formData: {},
            selectTable: {},
            //图片预览
            dialogFormPic: false,
            picurl: '',
            dialogFormVisible: false,
            rules: {
                realName: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                sfz: [
                    { validator: validatePass1, trigger: 'blur' },
                    { required: true, message: '身份证号不能为空', trigger: 'blur' },
                    { min: 18, max: 18, message: '身份证号为18位' },
                ],
                type:[
                    { validator: validatePass2},
                    { required: true, message: '购买时长不能为空'},
                ]
            },
        }
    },
    created() {

    },
    components: {
        headTop,
    },

    mounted() {
        this.$http.post(my_url+'Admin/get_adminlogin',{},{emulateJSON:true}).then(function(data){  
              var res = deal_data(data);})
    },
    activated() {
        if (this.$route.query.loginID) {
            this.id = this.$route.query.loginID;
            this.itinData(this.id)
        }
    },
    beforeupdata() {
    },
    methods: {
        alertdata() {
            this.selectTable.realName = this.formData.realName
            this.selectTable.sfz = this.formData.sfz
            this.selectTable.type = this.formData.type
            this.dialogFormVisible = true
        },
        showpic(url) {
            this.dialogFormPic = true;
            this.picurl = url;
        },
        itinData(ID) {
            var that = this
            // this.$http.jsonp(my_url+'Admin/get_user',{params: {ID},jsonp:"_callback"}).then(function (data){
            this.$http.post(my_url + 'Admin/get_user', { ID }, { emulateJSON: true }).then(function(data) {
                var res = deal_data(data)
                if (res.status == 'success') {
                    var item = res.user
                    that.formData = {
                        ID: item.ID,
                        type: item.type,
                        realName: item.realName,
                        phone: item.phone,
                        sfz: item.sfz,
                        zt: item.zt == 1 ? '已认证' : '未认证',
                        pic: my_url_pic + item.pic,
                        localt: item.localt,
                        scTime: item.scTime,
                        zfTime: res.dqTime==null||res.dqTime=='null'||res.dqTime.length==0?"无":res.dqTime,
                        rzzt:item.zt
                    }
                } else {
                    this.$message({
                        type: 'error',
                        message: '获取用户失败，请稍后重试',
                    });
                }
            });
        },
        update(selectTable) {
            this.$refs[selectTable].validate(async(valid) => {
                if (valid) {
                    var ID = this.formData.ID
                    var sfz = this.selectTable.sfz
                    var name = this.selectTable.realName
                    var type = this.selectTable.type
                    var realName = this.selectTable.realName
            this.$http.post(my_url+'Admin/update_rz',{ID,sfz,name,realName,type},{emulateJSON:true}).then(function(data){  
              var res = deal_data(data);
              if (res.status == 'fail'){
                    this.$message({type: 'error',message: '修改失败'});
                }else{
                    this.itinData(this.id)
                    this.dialogFormVisible = false
                    this.$message({type: 'success',message: '修改成功'});
                }
        })
                     
                } else {
                    this.$notify.error({
                        title: '警告',
                        message: '请正确输入数据',
                        duration: 1500
                    });
                }
            });
        },
    }
}

</script>
<style lang="less">
.userdetail .el-form-item {
    width: 45%;
}


.detailpic {
    margin: 5px;
    max-width: 80%;
}

.pic_dialog .el-dialog {
    background: rgba(0, 0, 0, 0.3);
}

</style>
