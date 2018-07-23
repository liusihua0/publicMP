<template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>黔通驾考后台管理系统</p>
		  		</div>

		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>                          
				  	</el-form-item>
				</el-form>
				<br>
				<p class="tip">温馨提示：本系统无法注册</p>
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
    import {deal_data,my_url,set_tttt} from '@/api/my_function'
	export default {
	    data(){
			return {
				loginForm: {
					username: '',
					password: '',
				},
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			            { min: 6, message: '最小长度为6位'},
						{ max: 16, message: '最大长度为16位'}
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 6, message: '最小长度为6位'},
						{ max: 16, message: '最大长度为16位'}
					],
				},
				showLogin: false,
			}
		},
		mounted(){
			

			this.showLogin = true;

			if (window.history && window.history.pushState) {
			　　window.onpopstate = function () { 
				window.history.pushState('forward', null, '#');
			　　window.history.forward(1);
			　　}
		　　}
		　　window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
		　　window.history.forward(1);
			
		},
		computed: {
			
		},
		methods: {
			async submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {

						var admin_username = this.loginForm.username
						var admin_password = this.loginForm.password
						// this.myfunction(phone: this.loginForm.username, password: this.loginForm.password).then(function (data){}
						// const res = await login({user_name: this.loginForm.username, password: this.loginForm.password})
				// this.$http.jsonp(my_url+'Pub/login',{params: {phone: this.loginForm.username, password: this.loginForm.password},jsonp:"_callback"}) .then(function (data){
                     this.$http.post(my_url+'Admin/admin_login',{admin_username, admin_password},{emulateJSON:true}).then(function(data){  
							var res = eval('(' + data.bodyText + ')');
							if (res.status == 'success') {
								this.$message({
			                        type: 'success',
			                        message: '登录成功'
			                    });
			                    set_tttt()
								this.$router.push('rank')
							}else{
								this.$message({
			                        type: 'error',
			                        message: '账号密码错误'
			                    });
							}
						});
					} else {
						this.$notify.error({
							title: '错误',
							message: '请输入正确的用户名密码',
							offset: 100
						});
						return false;
					}
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.login_page{
		background-color: #324057;
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p{
			font-size: 34px;
			color: #fff;
		}
	}
	.form_contianer{
		.wh(320px, 210px);
		.ctp(320px, 210px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
