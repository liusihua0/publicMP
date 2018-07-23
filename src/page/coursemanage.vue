<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-tabs v-model="activeName" @tab-click="sceachChange()">
                <el-tab-pane label="科目二" name="2"></el-tab-pane>
                <el-tab-pane label="科目三" name="3"></el-tab-pane>
            </el-tabs>
            <el-table :data="tableData" style="width: 100%">
                <!--                 <el-table-column type="expand">
                  <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="视频内容">
                            <video controls="controls" :src="props.row.url" style="height:100px;width:200px;margin-left::;0px">
                              <source :src="props.row.url" type="video/mp4">
                            </video>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column> -->
                <el-table-column type="index" width="100" label="序号">
                </el-table-column>
                <el-table-column label="视频编号" prop="code">
                </el-table-column>
                <el-table-column label="标题" prop="videocaption">
                </el-table-column>
                <el-table-column label="描述" prop="description">
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template scope="scope">
                        <el-button size="mini" type="primary" @click="moveup(scope.$index, tableData)">上移</el-button>
                        <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <br>
                        <el-button size="mini" type="primary" @click="movedown(scope.$index, tableData)">下移</el-button>
                        <el-button size="mini" type="danger" @click="deleteRow(scope.$index, tableData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" v-if="bianji_show" style="margin:10px;float:right" @click="upda()">更改教程顺序</el-button>
            <div class="Pagination">
                <el-pagination @current-change="pageChange" :current-page.sync="pageNum" :page-size="10" layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>
            <el-dialog title="视频信息编辑" v-model="dialogFormVisible">
                <el-form :model="selectTable" :rules='rule' ref='selectTable'>
                    <el-form-item label="标题" label-width="100px" prop="videocaption">
                        <el-input v-model="selectTable.videocaption" maxlength='16' auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" label-width="100px" prop="description">
                        <el-input type="textarea" v-model="selectTable.description" maxlength='51' auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="update">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import headTop from '../components/headTop'
import { deal_data, my_url, my_url_pic } from '@/api/my_function'
export default {
    data() {
        return {
            //每页数据/条
            limit: 10,
            //现有数据/条
            count: 0,
            //当前页面
            pageNum: 1,

            tableData: [],
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
            audittype: '1',
            activeName: "2",
            currentPage: 1,
            selectTable: {},
            dialogFormVisible: false,
            categoryOptions: [],
            selectedCategory: [],
            address: {},

            index_my: 0,
            numList: "",
            tt_data: "",
            uu_data: "",
            bianji_show: false,
            rule: {
                videocaption: [
                    { required: true, message: '请输入标题', trigger: 'blur' },
                    { max: 15, message: '小于15字', }
                ],
                description: [
                    { required: true, message: '请输入描述', trigger: 'blur' },
                    { max: 50, message: '小于50字', }
                ]
            },
        }
    },
    activated() {
        this.$http.post(my_url+'Admin/get_adminlogin',{},{emulateJSON:true}).then(function(data){  
              var res = deal_data(data);})
        this.initData(1, 2);

    },
    components: {
        headTop,
    },
    methods: {
        update() {
            if (this.selectTable.videocaption == null || this.selectTable.description == null) {
                this.$message({
                    type: 'error',
                    message: '请完整的填写信息'
                });
                return
            }
            if (this.selectTable.videocaption == this.tableData[this.index_my].videocaption && this.selectTable.description == this.tableData[this.index_my].description) {
                this.$message({
                    type: 'info',
                    message: '您还未修改信息呢'
                });
                return
            }
            var mainTitle = this.selectTable.videocaption
            var subTitle = this.selectTable.description
            var videoName = this.tableData[this.index_my].videoName
            this.$http.post(my_url + 'Admin/update_video', { mainTitle, subTitle, videoName }, { emulateJSON: true }).then(function(data) {
                var res = deal_data(data)
                if (res.status == 'success') {
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    });
                    this.tableData[this.index_my].videocaption = mainTitle
                    this.tableData[this.index_my].description = subTitle
                    this.selectTable.videocaption = null
                    this.selectTable.description = null
                    this.dialogFormVisible = false
                } else {
                    this.$message({
                        type: 'info',
                        message: '修改失败，请稍后重试'
                    });
                }
            });
        },
        handleEdit(index, row) {
            this.index_my = index
            this.selectTable.videocaption = this.tableData[this.index_my].videocaption
            this.selectTable.description = this.tableData[this.index_my].description
            this.dialogFormVisible = true
        },
        sceachChange() {
            this.initData(1, this.activeName)
        },
        pageChange(val) {
            this.pageNum = val
            this.initData(this.pageNum, this.activeName)
        },
        addvideo() {
            this.$router.push('/videomanage');
        },
        moveup(index, rows) {
            this.bianji_show = true
            if (index == 0) {
                this.$message({
                    message: '已经是最顶部！',
                    type: 'warning',
                    duration: '1000'
                });
                return;
            }
            let newObj = rows[index];
            rows[index] = rows[index - 1];
            rows[index - 1] = newObj;
            this.tableData.push();
        },
        movedown(index, rows) {
            this.bianji_show = true
            if (index == rows.length - 1) {
                this.$message({
                    message: '已经是最底部！',
                    type: 'warning',
                    duration: '1000'
                });
                return;
            }
            let newObj = rows[index];
            rows[index] = rows[index + 1];
            rows[index + 1] = newObj;
            this.tableData.push();
        },
        deleteRow(index, rows) {
            this.$confirm('确定删除？').then(_ => {
                    var ID = this.tableData[index].ID

                    this.$http.post(my_url + 'Admin/del_tutoByID', { ID }, { emulateJSON: true }).then(function(data) {
                        var res = deal_data(data)
                        var that = this
                        if (res.status == 'success') {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                            this.tableData.splice(index, 1);
                            this.count--
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
        async initData(pageNum, class_one) {
            try {
                this.$http.post(my_url + 'Admin/get_t', { pageNum, class_one }, { emulateJSON: true }).then(function(data) {
                    var res = deal_data(data)
                    var that = this
                    console.log(res)
                    that.tableData = [];
                    if (res.status == 'success') {
                        res.listInfo.forEach(function(item) {

                            that.tableData.push({
                                ID: item.ID,
                                number: item.number,
                                videocaption: item.mainTitle,
                                description: item.subTitle,
                                code: "VIDEO_0" + item.videoName.substring(6, item.videoName.length - 4),
                                videoName: item.videoName
                            })

                        });
                        var kk_data = JSON.stringify(that.tableData);
                        this.tt_data = eval('(' + kk_data + ')');
                        console.log(res)
                        that.count = res.totalRow
                        this.numList = this.update_tutoNum()
                    } else {
                        this.$message({
                            type: 'info',
                            message: '加载失败，请稍后重试'
                        });
                        that.count = 0
                    }

                });
            } catch (e) {
                this.$message({
                    type: 'error',
                    message: '发生异常，请稍后重试'
                });
            }
        },
        //排序
        update_tutoNum() {
            var numList = "["
            var that = this
            this.tableData.forEach(function(item, index) {

                numList += "{'ID':" + item.ID + ",'number':" + that.tt_data[index].number + "},"
                that.tt_data[index].ID = item.ID
                //numList +='{"ID":'+item.ID+',"number":'+item.number+'},'
            });
            numList = numList.substring(0, numList.length - 1)
            numList += "]"
            return numList
        },
        upda() {

            var numList = this.update_tutoNum()
            if (this.numList == numList) {
                this.$message({
                    type: 'info',
                    message: '顺序没有变化'
                });
                this.bianji_show = false
                return
            }

            this.$http.post(my_url + 'Admin/update_tutoNum', { numList }, { emulateJSON: true }).then(function(data) {
                var res = deal_data(data)
                if (res.status == 'success') {
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    });
                    this.numList = numList
                } else {
                    this.$message({
                        type: 'info',
                        message: '操作失败，请稍后重试'
                    });
                }
                this.bianji_show = false
            });
        }

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

.datapic:hover {
    border: 1px dashed black;
    margin: 4px;
}

.datapic {
    height: 200px;
    width: 200px;
    margin: 5px;
}

.detailpic {
    margin: 5px;
    max-width: 80%;
}

.pic_dialog .el-dialog {
    background: rgba(0, 0, 0, 0.3);
}

//分页栏固定
#pending .el-table {
    min-height: 451px;
}

</style>
