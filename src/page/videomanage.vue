<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-button type="primary" icon="upload" style="position:absolute;right:20px;z-index: 1" @click="rr_t()">上传视频</el-button>
            <el-tabs v-model="activeName" @tab-click="sceachChange()">
                <el-tab-pane label="科目二" name="2"></el-tab-pane>
                <el-tab-pane label="科目三" name="3"></el-tab-pane>
            </el-tabs>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="expand">
                    <template scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="视频内容">
                                <video controls="controls" :src="props.row.videoUrl" style="height:100px;width:200px;margin-left::;0px">
                                    <source :src="props.row.videoUrl" type="video/*">
                                </video>
                                <!-- <video controls="controls" :src="props.row.videoUrl"></video> -->
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column type="index" label="序号" width="100">
                </el-table-column>
                <el-table-column label="编号" prop="code">
                </el-table-column>
                <el-table-column label="标题" prop="mainTitle">
                </el-table-column>
                <el-table-column label="描述" prop="subTitle">
                </el-table-column>
                <el-table-column label="上传日期" prop="updateTime">
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template scope="scope">
                        <el-button size="mini" type="primary" @click="addonsub(scope.row.ID,scope.row.text,scope.$index)">{{scope.row.text}}</el-button>
                        <el-button size="mini" type="danger" @click="deleteRow(scope.$index,scope.row.ID)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination @current-change="pageChange" :current-page.sync="pageNum" :page-size="10" layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>
            <el-dialog title="上传视频" v-model="dialogFormVisible">
                <el-form :model="formData" :rules="rule" ref="formData">
                    <el-upload class="upload-demo" name="file" action='' :before-upload="before_upload" style="margin-left: 60px;margin-bottom:20px">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <span style="">{{video_name}}</span>
                    <el-progress v-if='progress' :percentage="progress"></el-progress>
                        <div slot="tip" class="el-upload__tip">只能上传mp4文件，且不超过1G</div>
                    </el-upload>
                    <el-form-item label="科目" label-width="100px" prop="sub">
                        <el-select v-model="formData.sub" placeholder="请选择">
                            <el-option v-for="item in options2" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标题" label-width="100px" prop="newcaption">
                        <el-input type="text" autosize placeholder="请输入内容" v-model="formData.newcaption">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="描述" label-width="100px" prop="newdescripton">
                        <el-input type="textarea" autosize placeholder="请输入内容" v-model="formData.newdescripton">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" v-if="!listLoading" @click="submitUpload('formData')">开始上传</el-button>
                <el-button type="primary" v-else >上传中</el-button>
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
            headers_my: {
                'Content-Type': 'multipart/form-data',
            },
            //每页数据/条
            limit: 10,
            //现有数据/条
            count: 0,
            //当前页面
            pageNum: 1,

            // 上传视频的名称
            video_name: '',
            progress: '', 

            tableData: [],
            options: [{
                value: '通过'
            }, {
                value: '不通过'
            }],
            options2: [{
                value: '科目二'
            }, {
                value: '科目三'
            }],
            style1: {
                display: 'none'
            },
            style2: {
                display: 'none'
            },
            formData: {
                sub: '',
                newcaption: '',
                newdescripton: '',
            },
            rule: {
                sub: [
                    { required: true, message: '请选择科目', trigger: 'change' }
                ],
                newcaption: [
                    { required: true, message: '请输入标题', trigger: 'blur' },
                    { max: 15, message: '小于15字',}
                ],
                newdescripton: [
                    { required: true, message: '请输入描述', trigger: 'blur' },
                    { max: 50, message: '小于50字',}
                ]
            },
            audittype: '1',
            activeName: "2",
            currentPage: 1,
            selectTable: {},
            dialogFormVisible: false,
            categoryOptions: [],
            selectedCategory: [],
            address: {},


            file: "",
            listLoading: false,
            rr_flag: false,

            up_flag:false
        }
    },
     activated() {
        this.$http.post(my_url+'Admin/get_adminlogin',{},{emulateJSON:true}).then(function(data){  
              var res = deal_data(data);})
        this.initData(2, 1);
    },
    components: {
        headTop,
    },
    methods: {
        tt_p() {

        },
        rr_t() {
            this.listLoading = this.rr_flag
            this.dialogFormVisible = true
        },
        rr_f() {
            this.dialogFormVisible = false
            this.listLoading = false
        },
        pageChange(val) {
            this.pageNum = val
            this.initData(this.activeName, this.pageNum)
        },
        sceachChange() {
            this.initData(this.activeName, 1)
        },
        async initData(class_one, pageNum) {
            try {
                this.$http.post(my_url + 'Admin/get_v', { pageNum, class_one }, { emulateJSON: true }).then(function(data) {
                    var res = deal_data(data)
                    var that = this
                    that.tableData = [];
                    if (res.status == 'success') {
                        res.listInfo.forEach(function(item) {
                            that.tableData.push({
                                ID: item.ID,
                                code: "VIDEO_0" + item.videoName.substring(6, item.videoName.length - 4),
                                mainTitle: item.mainTitle,
                                videoUrl: my_url + "Pub/get_video?video=" + item.videoName,
                                class_one: item.class_one,
                                subTitle: item.subTitle,
                                updateTime: item.updateTime.substring(0, 10),
                                isTuto: item.isTuto,
                                text: item.isTuto == 0 ? "添加到教程" : "从教程移除"
                            })

                        });

                        that.count = res.totalRow
                    } else {
                        this.$message({
                            type: 'info',
                            message: '获取用户失败，请稍后重试'
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
        before_upload(file) {
            this.file = file;
            this.video_name = this.file.name
        },
        submitUpload(formData) {
            this.$refs[formData].validate(async(valid) => {

                if (valid) {
                    if(this.up_flag){return}
                    this.up_flag = true
                    const isRightType = (this.file.type === 'video/mp4');
                    const isLt2G = this.file.size / 1024 / 1024 < 2048;
                    if (this.file == "" || this.file == null) {
                        this.$message.error('请先选择要上传的视频!');
                        return
                    }
                    if (!isRightType) {
                        this.$message.error('上传视频只能是 mp4 格式!');
                        return 
                    }
                    if (!isLt2G) {
                        this.$message.error('上传视频大小不能超过 1G!');
                        return 
                    }
                    this.listLoading = true
                    this.rr_flag = true
                    var file = this.file; //获取文件avi/mp4/flv/mkv
                    let Xls = file.name.substring(file.name.length - 3, file.name.length);
                    // if(Xls === 'avi'||Xls === 'mp4'||Xls === 'flv'||Xls === 'mkv'||'xls'){
                    console.log(file)
                    if (Xls === 'mp4') {
                        event.preventDefault(); //取消默认行为

                          
                        let formdata = new FormData();

                          
                        formdata.append('file', this.file);
                        formdata.append('class_one',this.formData.sub=="科目二"?2:3);
                        formdata.append('mainTitle', this.formData.newcaption);
                        formdata.append('subTitle', this.formData.newdescripton);  
                        let config = {            
                            headers: {                 'Content-Type': 'multipart/form-data',  //
                            // 'Access-Control-Allow-Origin': '*'
                                             },
                            emulateJSON: true ,
               
                        };
                           var interval = setInterval(() => {
                                if(this.progress<90){
                                    this.progress ++
                                }
                              }, 5000)
                        var this_=this    
                        this.$http.post(my_url + 'Admin/upload_video', formdata, config).then((data) => {        //做处理
                            var res = deal_data(data)
                            this.up_flag = false
                            if (res.status == 'success') {
                                this.$message({
                                    type: 'success',
                                    message: '上传成功'
                                });
                                
                                setTimeout(function(){
                                    this_.$router.go(0)
                                }, 1000)
                                
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: '上传失败，请检查数据是否正确'
                                });
                                this.listLoading = false
                                this.rr_flag = false
                                this.progress= ''
                                clearInterval(interval);
                            }       
                        }, function(error) {
                            console.log(error)
                            this.up_flag = false
                            if (error.status == 0) {
                                this.$message({
                                    type: 'success',
                                    message: '上传成功'
                                });
                                
                                setTimeout(function(){
                                    this_.$router.go(0)
                                }, 1000)
                            }else{
                                this.$message({
                                type: 'error',
                                message: '网络异常'
                                });
                                this.listLoading = false
                                this.rr_flag = false
                                this.progress= ''
                                    clearInterval(interval);
                            }
                            
                        });
                    } else {
                        this.listLoading = false
                        this.rr_flag = false
                        this.$message.error('上传视频只能是 mp4 格式!')
                        return false
                    }

                } else {

                }
            });
        },
        deleteRow(index, ID) {
            this.$confirm('确定删除？').then(_ => {
                this.$http.post(my_url + 'Admin/del_video', { ID }, { emulateJSON: true }).then((data) => {        //做处理
                    var res = deal_data(data)
                    if (res.status == 'success') {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });

                        this.sceachChange()
                        this.count--
                    } else {
                        this.$message({
                            type: 'info',
                            message: '删除失败'
                        });
                    }       
                });
            }).catch(_ => {});
        },
        addonsub(ID, text, index) {
            var tt = 0
            if (text == "添加到教程") tt = 1
            this.$confirm(tt == 1 ? '确定将本视频添加为教程？' : '确定将本视频从教程中删除？').then(_ => {
                if (tt == 1) {
                    this.$http.post(my_url + 'Admin/add_tutorial', { ID }, { emulateJSON: true }).then((data) => {        //做处理
                        var res = deal_data(data)
                        if (res.status == 'success') {
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            });
                            this.tableData[index].text = '从教程删除'
                        } else {
                            this.$message({
                                type: 'info',
                                message: '添加失败'
                            });
                        }       
                    });
                } else {
                    this.$http.post(my_url + 'Admin/del_tuto', { ID }, { emulateJSON: true }).then((data) => {        //做处理
                        var res = deal_data(data)
                        if (res.status == 'success') {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                            this.tableData[index].text = '添加到教程'
                        } else {
                            this.$message({
                                type: 'info',
                                message: '删除失败'
                            });
                        }       
                    });
                }
            }).catch(_ => {});
        },
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

</style>
