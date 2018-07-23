<template>
    <div class="manage_page fillcontain"> 
        <el-row style="height: 100%;">
            <el-col :span="4" style="min-height: 100%; background-color: #324057;">
                <el-menu :default-active="defaultActive" style="min-height: 100%;" unique-opened="true" theme="dark" router>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-setting"></i>题库管理</template>
                        <el-menu-item index="questionedit">题目表列</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-picture"></i>教程视频管理</template>
                        <el-menu-item index="coursemanage">教程页面管理</el-menu-item>
                        <el-menu-item index="videomanage">视频库管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-share"></i>用户管理</template>
                        <el-menu-item index="adduser">添加用户</el-menu-item>
                        <el-menu-item index="usersearch">用户列表</el-menu-item>
                        <el-menu-item index="userlog">用户生成记录</el-menu-item>
                    </el-submenu>
<!--                     <el-submenu index="4">
                        <template slot="title"><i class="el-icon-document"></i>补考费申请</template>
                        <el-menu-item index="pending">申请列表</el-menu-item>
                    </el-submenu> -->
                    <el-menu-item index="pending" ><i class="el-icon-document"></i>补考费申请<el-badge :value='newdata' class="item">  </el-button>
</el-badge></el-menu-item>
                    <el-menu-item index="rank"><i class="el-icon-menu"></i>排行管理</el-menu-item>
                    <el-menu-item index="slideshow"><i class="el-icon-picture"></i>轮播图管理</el-menu-item>
                    <el-menu-item index="password"><i class="el-icon-edit"></i>密码更改</el-menu-item>
                    <el-menu-item @click='logout()'><i class="el-icon-warning"></i>注销</el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20" style="height: 100%;overflow: auto;">
                <keep-alive>
                    <router-view @childEvent="parentMethod"></router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import {set_zzzz,my_url,deal_data} from '@/api/my_function'
export default {
    data() {
        return {
            newdata: '',
        }
    },
    
    computed: {
            defaultActive: function(){
                return this.$route.path.replace('/', '');
            }
        },
    methods: {
        parentMethod({ name, age }) {
         this.newdata=age
        },
        logout() {
            this.$confirm('确认注销？')
                .then(_ => {
                	set_zzzz()
                	this.$message({
	                        type: 'success',
	                        message: '退出成功'
	                    });
	                    this.$router.push('/');
                })
                .catch(_ => {});
        } 
    },
    mounted() {
        
        this.$http.post(my_url+'Admin/get_sqNum',{},{emulateJSON:true}).then(function(data){  
              var res = deal_data(data);
              this.newdata = res.sqNum
        })
    }
}

</script>
<style lang="less" scoped>
@import '../style/mixin';
.manage_page {}
.item {
  float:right;
}
</style>
