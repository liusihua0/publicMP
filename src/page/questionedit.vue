<template>
    <div class="fillcontain" id="questionedit">
        <head-top></head-top>
        <div class="table_container">
            <el-col :span="24" class="toolbar mysearch">
                <el-form :inline="true" :model="filters">
                    <el-form-item label="科目">
                        <el-select v-model="filters.class_one" @change="sceachChange()">
                            <el-option v-for="item in options1" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="题目类型">
                        <el-select v-model="filters.class_two" @change="sceachChange()">
                            <el-option v-for="item in options2" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="题目类别" >
                        <el-select v-model="filters.class_three" @change="sceachChange()"  style="width: 120px">
                            <el-option v-for="item in options3" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="paixu_tt()">{{paixu?"切换为升序":"切换为降序"}}</el-button>
                    </el-form-item>
                    <el-form-item class="searchname">
                        <el-button type="primary" @click="sceachChange()">搜索</el-button>
                    </el-form-item>
                    <el-form-item class="searchname">
                        <el-input v-model="filters.search_str" @keyup.enter.native="sceachChange()" placeholder="输入关键字"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-table :data="tableData"  row-class-name='sss' style="width: 100%">
                <el-table-column label="序号" type="index" width="70">
                </el-table-column>
                <el-table-column label="题目" prop="questions_" >
                </el-table-column>
                <el-table-column label="上传日期" prop="scTime">
                </el-table-column>
                <el-table-column label="题库类型" prop="class_one">
                </el-table-column>
                <el-table-column label="题目类型" prop="class_two">
                </el-table-column>
                <el-table-column label="题库类别" prop="class_three">
                </el-table-column>
                <el-table-column label="操作" width="160">
                    <template scope="scope">
                        <el-button size="small" type="primary" @click="showRow(scope.$index, scope.row)">详情</el-button>
                        <el-button size="small" type="danger" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-size="limit" layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>
            <el-dialog title="题目详情" v-model="dialogFormVisible">
                <el-form :model="dialogform" ref='dialogform'>
                    <el-row :gutter="5">
                        <el-col :span="7">
                            <el-form-item label="题库类型：" label-width="100px" prop="videocaption">{{dialogform.qbanktype}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="题目类型：" label-width="100px" prop="videocaption">
                                {{dialogform.qtype}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="题目类别：" label-width="100px" prop="videocaption">
                                {{dialogform.qcategory}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="题目内容：" label-width="100px">
                        {{dialogform.qname}}
                    </el-form-item>
                    <el-form-item label="题目配图：" label-width="100px">
                        <img v-if='dialogform.question_pic!=""&&dialogform.question_pic!="-1"' :src="my_url_questionpic+dialogform.question_pic" style="width:400px">
                        <span v-else>无</span>
                    </el-form-item>
                    <el-form-item class="choice" label="A：" label-width="100px">
                        {{dialogform.choiceA}}
                    </el-form-item>
                    <el-form-item class="choice" label="B：" label-width="100px">
                        {{dialogform.choiceB}}
                    </el-form-item>
                    <el-form-item v-if="dialogform.choiceC" class="choice" label="C：" label-width="100px">
                        {{dialogform.choiceC}}
                    </el-form-item>
                    <el-form-item v-if="dialogform.choiceC" class="choice" label="D：" label-width="100px">
                        {{dialogform.choiceD}}
                    </el-form-item>
                    <el-form-item label="答案：" label-width="100px">
                        {{dialogform.answer}}
                    </el-form-item>
                    <el-form-item label="解析：" label-width="100px">
                        {{dialogform.parse}}
                    </el-form-item>
                    <el-form-item label="解析配图：" label-width="100px">
                        <img  v-if='dialogform.parse_pic!=""&&dialogform.parse_pic!="-1"' :src="my_url_questionpic+dialogform.parse_pic" style="width:400px">
                        <span v-else>无</span>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import headTop from '../components/headTop'
import { deal_data, my_url, my_url_pic,my_url_questionpic } from '@/api/my_function'
export default {
    data() {
        return {
            //每页数据/条
            limit: 10,
            //现有数据/条
            count: 0,
            //当前页面
            pageNum: 1,
            my_url_questionpic:my_url_questionpic,
            tableData: [],
            dialogFormVisible: false,
            dialogform: {
            },
            paixu: true,

            filters: {
                class_one: "全部",
                class_two: "全部",
                class_three: "全部",
                search_str: null
            },
            options1: [{
                value: '全部'
            }, {
                value: '科目一'
            }, {
                value: '科目四'
            }],
            options2: [{
                value: '全部'
            }, {
                value: '选择题'
            }, {
                value: '判断题'
            }],
            options3: [],
        }
    },
    created() {
        this.$http.post(my_url+'Admin/get_adminlogin',{},{emulateJSON:true}).then(function(data){  
              var res = deal_data(data);})
        this.initData(1, null, null, null, null, this.paixu);
    },
    computed: {

    },
    components: {
        headTop,
    },
    methods: {
        showRow(index, rows){
            this.dialogFormVisible=true
            this.dialogform.qbanktype = this.tableData[index].class_one
            this.dialogform.qtype = this.tableData[index].class_two
            this.dialogform.qcategory = this.tableData[index].class_three
            this.dialogform.qname = this.tableData[index].questions
            this.dialogform.choiceA= this.tableData[index].choiceA
            this.dialogform.choiceB= this.tableData[index].choiceB
            this.dialogform.choiceC= this.tableData[index].choiceC
            this.dialogform.choiceD= this.tableData[index].choiceD
            this.dialogform.answer= this.tableData[index].answer
            this.dialogform.parse= this.tableData[index].parse
            this.dialogform.question_pic = this.tableData[index].question_pic
            this.dialogform.parse_pic = this.tableData[index].parse_pic
        },
        deleteRow(index, rows) {
            this.$confirm('确定删除？').then(_ => {
                    var ID = rows.ID
                    this.$http.post(my_url + 'Admin/del_question', { ID }, { emulateJSON: true }).then(function(data) {
                        var res = deal_data(data)
                        var that = this
                        if (res.status == 'success') {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                            this.tableData.splice(index, 1);
                            this.count--
                                this.sceachChange()
                        } else {
                            this.$message({
                                type: 'info',
                                message: '加载失败，请稍后重试'
                            });
                        }
                    });

                })
                .catch(_ => {});
        },
        paixu_tt() {
            this.paixu = !this.paixu
            this.sceachChange()
        },
        sceachChange() {
            var class_one = this.filters.class_one == '全部' ? null : (this.filters.class_one == '科目一' ? 1 : 4)
            var class_two = this.filters.class_two == '全部' ? null : (this.filters.class_two == '选择题' ? 0 : 1)
            var class_three = this.filters.class_three == '全部' ? null : this.filters.class_three
            this.initData(this.pageNum, class_one, class_two, class_three, this.filters.search_str, this.paixu);
        },
        handleCurrentChange(val) {
            this.pageNum = val
            var class_one = this.filters.class_one == '全部' ? null : (this.filters.class_one == '科目一' ? 1 : 4)
            var class_two = this.filters.class_two == '全部' ? null : (this.filters.class_two == '选择题' ? 0 : 1)
            var class_three = this.filters.class_three == '全部' ? null : this.filters.class_three
            this.initData(val, class_one, class_two, class_three, this.filters.search_str, this.paixu);
        },
        get_class_three(class_one) {
            var that = this
            this.$http.post(my_url + 'Pub/get_quesClass', { class_one }, { emulateJSON: true }).then(function(data) {
                var res = deal_data(data)
                this.options3 = [{ value: '全部' }]
                if (res.status == 'success') {
                    var listInfo = res.listInfo
                    var ttlist = []
                    listInfo.forEach(function(item) {

                        if (ttlist != null && ttlist.length != 0) {
                            var i = 0
                            ttlist.forEach(function(element, index) {
                                if (element.typeName == item.typeName) {
                                    i = 1
                                }
                            });
                            if (i == 0) {
                                that.options3.push({
                                    value: item.typeName
                                })
                                ttlist.push({
                                    typeName: item.typeName
                                })
                            }
                        } else {
                            that.options3.push({
                                value: item.typeName
                            })
                            ttlist.push({
                                typeName: item.typeName
                            })
                        }

                    })
                } else {
                    this.$message({
                        type: 'info',
                        message: '题目类别为空'
                    });
                }
            });
        },
        async initData(pageNum, class_one, class_two, class_three, search_str, paixu) {
            var that = this
            this.get_class_three(class_one)
            this.$http.post(my_url + 'Pub/get_questions', { pageNum, class_one, class_two, class_three, search_str, paixu }, { emulateJSON: true }).then(function(data) {
                var res = deal_data(data)
                this.tableData = []
                if (res.status == 'success') {

                    var listInfo = res.listInfo
                    listInfo.forEach(function(item) {
                        that.tableData.push({
                            ID: item.ID,
                            class_three: item.typeName,
                            class_one: item.class_one == 1 ? "科目一" : "科目四",
                            class_two: item.quesType == 0 ? "选择题" : "判断题",
                            questions: item.questions,
                            questions_: item.questions.length>8?item.questions.substring(0, 8)+"...":item.questions,
                            scTime: item.scTime.substring(0, 10),
                            choiceA: item.optionA,
                            choiceB: item.optionB,
                            choiceC: item.optionC,
                            choiceD: item.optionD,
                            answer: item.answer,
                            parse: item.parse,
                            question_pic: item.question_pic,
                            parse_pic: item.parse_pic,
                        })
                    })
                    this.count = res.TotalRow
                } else {
                    this.$message({
                        type: 'info',
                        message: '暂无题目'
                    });
                    this.count = 0
                }
            });
        },

        deleteSpecs(index) {
            this.specs.splice(index, 1);
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

.table_container {
    padding: 20px;
}

.Pagination {
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

#questionedit {
    .el-form-item {
        margin-bottom: 10px;
        line-height: 22px;
    }
    .choice {
        margin-bottom: 3px;
    }
    .el-form-item__content {
        line-height: 22px;
    }
    .el-form-item__label {
        padding: 0 12px 0 0;
        line-height: 22px;
    }
    .sss .el-table_1_column_2 .cell{
        white-space: nowarp;
        overflow:hidden;
    }
}

</style>
