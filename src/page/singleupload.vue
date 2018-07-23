<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="12" :offset="4">
                <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                    <el-form-item label="题库类型" prop='qbanktype'>
                        <el-select v-model="formData.qbanktype" :placeholder="placeholder">
                            <el-option v-for="item in options1" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="题目类型" prop='qtype'>
                        <el-select v-model="formData.qtype" @change="changeqtype()" :placeholder="placeholder">
                            <el-option v-for="item in options2" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="题目类别" prop='qcategory'>
                        <el-select v-model="formData.qcategory" :placeholder="placeholder">
                            <el-option v-for="item in options3" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <header class="form_header">题目信息</header>
                    <el-form-item label="题目内容" prop="qname">
                        <el-input type="textarea" autosize placeholder="请输入内容" v-model="formData.qname">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="上传题目配图">
                        <el-upload class="avatar-uploader" action="" :before-upload="update_ques">
                            <img v-if="ques_url" :src="ques_url" class="avatar">
                            <!-- <img v-if="formData.question_image" src="" class="avatar"> -->
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <!--                    <el-table :data="activities" style="min-width: 600px;margin-bottom: 20px;" align="cneter">
                        <el-table-column prop="choice" label="选项" align="cneter" width="120">
                        </el-table-column>
                        <el-table-column prop="selections" align="cneter" label="选择内容">
                            <template scope="scope">
                                <el-form-item  label="题目内容" prop="selections">
                                <el-input type="textarea" autosize placeholder="请输入" v-model="scope.row.selections">
                                </el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                    </el-table> -->
                    <!--                     <el-form-item  :label="item.choice" v-for='item in formData.activities' :prop='item.choice'>
                                <el-input type="textarea" autosize placeholder="请输入" v-model="item.selections">
                                </el-input>
                    </el-form-item> -->
                    <el-form-item label="A" prop="choiceA">
                        <el-input type="textarea" autosize placeholder="请输入选项内容" v-model="formData.choiceA">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="B" prop="choiceB">
                        <el-input type="textarea" autosize placeholder="请输入选项内容" v-model="formData.choiceB">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="C" prop="choiceC" v-if="formData.qtype!='判断题'">
                        <el-input type="textarea" autosize placeholder="请输入选项内容" v-model="formData.choiceC">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="D" prop="choiceD" v-if="formData.qtype!='判断题'">
                        <el-input type="textarea" autosize placeholder="请输入选项内容" v-model="formData.choiceD">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="答案" prop='mulanswer'>
                        <el-checkbox-group v-model="formData.mulanswer">
                            <el-checkbox label="A" name="mulanswer"></el-checkbox>
                            <el-checkbox label="B" name="mulanswer"></el-checkbox>
                            <el-checkbox label="C" name="mulanswer" v-if="formData.qtype!='判断题'"></el-checkbox>
                            <el-checkbox label="D" name="mulanswer" v-if="formData.qtype!='判断题'"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="解析内容" prop="resolve">
                        <el-input type="textarea" autosize placeholder="请输入内容" v-model="formData.resolve">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="上传解析配图">
                        <el-upload class="avatar-uploader" action="" :before-upload="update_parse">
                            <img v-if="parse_url" :src="parse_url" class="avatar">
                            <!-- <img v-if="formData.resolve_image" :src="picurl" class="avatar"> -->
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item class="button_submit" style="text-align: center;">
                        <el-button type="primary" @click="tijiao('formData')">立即创建</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import headTop from '@/components/headTop'
import { deal_data, my_url, my_url_pic } from '@/api/my_function'
export default {
    data() {
        var judge_mulanswer = (rule, value, callback) => {
            if (this.formData.qbanktype === '科目一' && this.formData.mulanswer.length !== 1) {
                callback(new Error('科目一只有单个答案'));
            } else {
                callback();
            }
        };
        return {
            city: {},
            formData: {
                qbanktype: '',
                qtype: '',
                qcategory: '',
                qname: '', //题目
                answer: '',
                mulanswer: [],
                resolve: '', //解析
                choiceA: '',
                choiceB: '',
                choiceC: '',
                choiceD: '',
            },
            rules: {
                qbanktype: [
                    { required: true, message: '请选择题库类型', trigger: 'change' }
                ],
                qtype: [
                    { required: true, message: '请选择题目类型', trigger: 'change' }
                ],
                qcategory: [
                    { required: true, message: '请选择题库类别', trigger: 'change' }
                ],
                answer: [
                    { required: true, message: '请选择答案', trigger: 'change' }
                ],
                mulanswer: [
                    { type: 'array', required: true, message: '请至少选择一个答案', trigger: 'change' },
                    { validator: judge_mulanswer, trigger: 'blur' },
                ],
                qname: [
                    { required: true, message: '请输入题目内容', trigger: 'blur' },
                ],
                resolve: [
                    { required: true, message: '请输入解析内容', trigger: 'blur' }
                ],
                choiceA: [
                    { required: true, message: '请输入选项内容', trigger: 'blur' }
                ],
                choiceB: [
                    { required: true, message: '请输入选项内容', trigger: 'blur' }
                ],
                choiceC: [
                    { required: true, message: '请输入选项内容', trigger: 'blur' },
                ],
                choiceD: [
                    { required: true, message: '请输入选项内容', trigger: 'blur' }
                ],
            },
            options1: [{
                value: '科目一'
            }, {
                value: '科目四'
            }],
            options2: [{
                value: '判断题'
            }, {
                value: '选择题'
            }],
            options3: [],
            options4: [{
                value: 'A'
            }, {
                value: 'B'
            }, {
                value: 'C'
            }, {
                value: 'D'
            }],
            options5: [{
                value: 'A'
            }, {
                value: 'B'
            }],
            placeholder: '请选择',
            qbanktype: '',
            qtype: '',
            qcategory: '',
            answer: '',
            mulanswer: 'A',
            multiple: false,
            // activities: [{
            //     choice: 'A',
            //     selections: '',
            // }, {
            //     choice: 'B',
            //     selections: '',
            // }, {
            //     choice: 'C',
            //     selections: '',
            // }, {
            //     choice: 'D',
            //     selections: '',
            // }],
            ques_url: '',
            parse_url: '',
            question_image: "",
            resolve_image: "",

            tt__: ""
        }
    },
    components: {
        headTop,
    },
    mounted() {
        this.$http.post(my_url+'Admin/get_adminlogin',{},{emulateJSON:true}).then(function(data){  
              var res = deal_data(data);})
        this.get_class_three()
        this.tt__ = this.formData.mulanswer
    },
    methods: {
        tijiao(formData) {
            this.$refs[formData].validate(async(valid) => {
                if (valid) {
                    var file = this.question_image;
                    var file1 = this.resolve_image; //获取文件支持jgp/png
                    if (file != null && file != "") {
                        let Xls = file.name.substring(file.name.length - 3, file.name.length);
                    const fileisLt2M = file.size / 1024 / 1024 < 2;
                        if (!(Xls === 'jpg' || Xls === 'png'|| Xls === 'gif')) {
                            this.$message.error('上传图片只能是 jpg/png/gif 格式!')
                            return false
                        }else if(!fileisLt2M){
                             this.$message.error('上传图片不大于2M!')
                              return false
                        }
                    }
                    if (file1 != null && file1 != "") {
                    const file1isLt2M = file1.size / 1024 / 1024 < 2;
                        let Xls1 = file1.name.substring(file1.name.length - 3, file1.name.length);
                        if (!(Xls1 === 'jpg' || Xls1 === 'png'|| Xls1 === 'gif')) {
                            this.$message.error('上传图片只能是 jpg/png/gif 格式!')
                            return false
                        }else if(!file1isLt2M){
                             this.$message.error('上传图片不大于2M!')
                              return false
                        }
                    }

                    event.preventDefault(); //取消默认行为

                      
                    let formdata = new FormData();

                      
                    formdata.append('question_pic', this.question_image);
                    formdata.append('parse_pic', this.resolve_image);

                    formdata.append('questions', this.formData.qname);
                    formdata.append('parse_str', this.formData.resolve);

                    formdata.append('class_one', this.formData.qbanktype == "科目一" ? 1 : 4);
                    formdata.append('quesType', this.formData.qtype == "选择题" ? 0 : 1);

                    formdata.append('typeName', this.formData.qcategory);

                    var mulanswer = ''
                    this.formData.mulanswer.forEach(function(value, index, array) {
                        mulanswer += array[index]
                    })
                    formdata.append('answer', mulanswer);
                    formdata.append('optionA', this.formData.choiceA == null ? "" : this.formData.choiceA);
                    formdata.append('optionB', this.formData.choiceB == null ? "" : this.formData.choiceB);

                    if (this.formData.qtype == "选择题") {
                        formdata.append('optionC', this.formData.choiceC == null ? "" : this.formData.choiceC);
                        formdata.append('optionD', this.formData.choiceD == null ? "" : this.formData.choiceD);
                    }

                      
                    let config = {            
                        headers: {                 'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
                                         },
                        emulateJSON: true     
                    };        
                    this.$http.post(my_url + 'Admin/upload_question', formdata, config).then((data) => {        //做处理
                        var res = deal_data(data)
                        if (res.status == 'success') {
                            this.$message({
                                type: 'success',
                                message: '上传成功'
                            });
                            this.ques_url= ''
                            this.parse_url= ''
                            this.question_image = ""
                            this.resolve_image = ""
                            this.$refs[formData].resetFields();
                            // this.$router.go(0)

                            //刷新页面  方法未写
                        } else {
                            this.$message({
                                type: 'info',
                                message: '上传失败，请检查数据是否正确'
                            });
                        }       
                    });
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '请检查输入内容',
                        offset: 100,
                        duration: 1000
                    });
                    return false;
                }
            })


        },
        update_parse(file) {
            this.resolve_image = file
            var that = this
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e) { that.parse_url = this.result }

        },
        update_ques(file) {
            this.question_image = file
            var that = this
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e) { that.ques_url = this.result }
        },
        get_class_three() {
            var that = this
            this.$http.post(my_url + 'Pub/get_quesClass', { class_one: 1 }, { emulateJSON: true }).then(function(data) {
                var res = deal_data(data)
                this.options3 = []
                if (res.status == 'success') {
                    var listInfo = res.listInfo
                    listInfo.forEach(function(item) {
                        that.options3.push({
                            value: item.typeName
                        })
                    })
                } else {
                    this.$message({
                        type: 'info',
                        message: '题目类别为空'
                    });
                }
            });
        },
        changeqtype() {
            switch (this.formData.qtype) {
                case '判断题':
                    this.formData.choiceA = '正确'
                    this.formData.choiceB = '错误'

                    break;
                case '选择题':
                    this.formData.choiceA = ''
                    this.formData.choiceB = ''
                    break;
            }
        },
    }
}

</script>
<style lang="less">
select {
    border: 1px solid #bfcbd9!important;
    background-color: #F5F5F5;
}

@import '../style/mixin';
.form {
    min-width: 400px;
    margin-bottom: 30px;
    &:hover {
        box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
        border-radius: 6px;
        transition: all 400ms;
    }
}

.food_form {
    border: 1px solid #eaeefb;
    padding: 10px 10px 0;
}

.form_header {
    text-align: center;
    margin-bottom: 10px;
}

.category_select {
    border: 1px solid #eaeefb;
    padding: 10px 30px 10px 10px;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
}

.add_category_row {
    height: 0;
    overflow: hidden;
    transition: all 400ms;
    background: #f9fafc;
}

.showEdit {
    height: 185px;
}

.add_category {
    background: #f9fafc;
    padding: 10px 30px 0px 10px;
    border: 1px solid #eaeefb;
    border-top: none;
}

.add_category_button {
    text-align: center;
    line-height: 40px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border: 1px solid #eaeefb;
    border-top: none;
    transition: all 400ms;
    &:hover {
        background: #f9fafc;
        span,
        .edit_icon {
            color: #20a0ff;
        }
    }
    span {
        .sc(14px, #999);
        transition: all 400ms;
    }
    .edit_icon {
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

.cell {
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

</style>
