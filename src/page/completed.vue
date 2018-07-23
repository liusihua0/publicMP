<template>
    <div class="fillcontain"> 
        <head-top></head-top>
        <div class="table_container">
            <el-table
            
                :data="tableData"
                style="width: 100%">
                <el-table-column type="expand">
                  <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="申请人ID">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item label="状态">
                        <span>{{ props.row.type }}</span>
                      </el-form-item>
                      <el-form-item label="申请科目">
                        <span>{{ props.row.subject }}</span>
                      </el-form-item>
                      <el-form-item label="备注">
                        <span>{{ props.row.remark }}</span>
                      </el-form-item>
                      <el-form-item label="申请资料">
                        <img class='datapic' src="../assets/img/avator.jpg">
                        <img class='datapic' src="../assets/img/avator.jpg">
                        <img class='datapic' src="../assets/img/avator.jpg">
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  type="index"
                  width="100">
                </el-table-column>
                <el-table-column
                  label="申请人ID"
                  prop="name">
                </el-table-column>
                <el-table-column
                  label="状态"
                  prop="type">
                </el-table-column>
                <el-table-column
                  label="申请科目"
                  prop="subject">
                </el-table-column>
                <el-table-column label="操作" width="200">
                  <template scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
            <el-dialog title="审批" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-steps :active="audittype" style="margin-left:100px;margin-bottom:20px">
                      <el-step title="待审核"></el-step>
                      <el-step title="待退款"></el-step>
                      <el-step title="结束"></el-step>
                    </el-steps>
                   <!--  <el-form-item label="申请人ID：" label-width="100px">
                        <span>{{selectTable.name}}</span>
                    </el-form-item>
                    </el-form-item>
                    <el-form-item label="申请科目：" label-width="100px">
                        <span>{{selectTable.subject}}</span>
                    </el-form-item>
                    <el-form-item label="申请资料：" label-width="100px">
                        <img class='datapic' src="../assets/img/avator.jpg">
                        <img class='datapic' src="../assets/img/avator.jpg">
                        <img class='datapic' src="../assets/img/avator.jpg">
                    </el-form-item>
                    <el-form-item label="备注：" label-width="100px">
                        <span>{{selectTable.remark}}</span>
                    </el-form-item> -->
                    <el-form-item label="审核结果：" label-width="100px" :style="style1">
                        <el-select v-model="selectTable.audit" :placeholder="placeholder">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审核备注：" prop="audit_remark" label-width="100px" :style="style1">
                        <el-input
                          class="ddd"
                          type="textarea"
                          autosize
                          placeholder="请输入内容"
                          v-model="selectTable.audit_remark">
                        </el-input>
                    </el-form-item>
                    <p style='text-align:center; font-size:20px' :style="style2">确认已退款？</p>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateShop">确 定</el-button>
              </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,
                city: {},
                offset: 0,
                limit: 20,
                count: 0,
                tableData: [{
                  name: '王小虎',
                  type: '已完成',
                  subject: '科目一',
                  remark: '科目一挂科了，快退钱！',
                  audit:'',
                },{
                  name: '王大虎',
                  type: '已完成',
                  subject: '科目四',
                  remark: '科目四也挂科了，快退钱！',
                  audit:''
                }],
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
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false,
                categoryOptions: [],
                selectedCategory: [],
                address: {},
            }
        },
        created(){
            this.$http.post(my_url+'Admin/get_adminlogin',{},{emulateJSON:true}).then(function(data){  
              var res = deal_data(data);})
            this.initData();
        },
        components: {
            headTop,
        },
        methods: {
            async initData(){
                try{
                    this.city = await cityGuess();
                    const countData = await getResturantsCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getResturants();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            async getCategory(){
                try{
                    const categories = await foodCategory();
                    categories.forEach(item => {
                        if (item.sub_categories.length) {
                            const addnew = {
                                value: item.name,
                                label: item.name,
                                children: []
                            }
                            item.sub_categories.forEach((subitem, index) => {
                                if (index == 0) {
                                    return
                                }
                                addnew.children.push({
                                    value: subitem.name,
                                    label: subitem.name,
                                })
                            })
                            this.categoryOptions.push(addnew)
                        }
                    })
                }catch(err){
                    console.log('获取商铺种类失败', err);
                }
            },
            async getResturants(){
                const {latitude, longitude} = this.city;
                const restaurants = await getResturants({latitude, longitude, offset: this.offset, limit: this.limit});
                this.tableData = [];
                restaurants.forEach(item => {
                    const tableData = {};
                    tableData.name = item.name;
                    tableData.address = item.address;
                    tableData.description = item.description;
                    tableData.id = item.id;
                    tableData.phone = item.phone;
                    tableData.rating = item.rating;
                    tableData.recent_order_num = item.recent_order_num;
                    tableData.category = item.category;
                    tableData.image_path = item.image_path;
                    this.tableData.push(tableData);
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getResturants()
            },
            addFood(index, row){
                this.$router.push({ path: 'addGoods', query: { restaurant_id: row.id }})
            },
            async handleDelete(index, row) {
                try{
                    const res = await deleteResturant(row.id);
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除店铺成功'
                        });
                        this.tableData.splice(index, 1);
                    }else{
                        throw new Error(res.message)
                    }
                }catch(err){
                    this.$message({
                        type: 'error',
                        message: err.message
                    });
                    console.log('删除店铺失败')
                }
            },
            async querySearchAsync(queryString, cb) {
                if (queryString) {
                    try{
                        const cityList = await searchplace(this.city.id, queryString);
                        if (cityList instanceof Array) {
                            cityList.map(item => {
                                item.value = item.address;
                                return item;
                            })
                            cb(cityList)
                        }
                    }catch(err){
                        console.log(err)
                    }
                }
            },
            addressSelect(vale){
                const {address, latitude, longitude} = vale;
                this.address = {address, latitude, longitude};
            },
            handleServiceAvatarScucess(res, file) {
                if (res.status == 1) {
                    this.selectTable.image_path = res.image_path;
                }else{
                    this.$message.error('上传图片失败！');
                }
            },
            beforeAvatarUpload(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isRightType && isLt2M;
            },
            async updateShop(){
                this.dialogFormVisible = false;
                try{
                    Object.assign(this.selectTable, this.address);
                    this.selectTable.category = this.selectedCategory.join('/');
                    const res = await updateResturant(this.selectTable)
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '更新店铺信息成功'
                        });
                        this.getResturants();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                }catch(err){
                    console.log('更新餐馆信息失败', err);
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
