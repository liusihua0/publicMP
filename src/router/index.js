import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const questionedit = r => require.ensure([], () => r(require('@/page/questionedit')), 'questionedit');
const singleupload = r => require.ensure([], () => r(require('@/page/singleupload')), 'singleupload');
const batchupload = r => require.ensure([], () => r(require('@/page/batchupload')), 'batchupload');
const coursemanage = r => require.ensure([], () => r(require('@/page/coursemanage')), 'coursemanage');
const videomanage = r => require.ensure([], () => r(require('@/page/videomanage')), 'videomanage');
const adduser = r => require.ensure([], () => r(require('@/page/adduser')), 'adduser');
const usersearch = r => require.ensure([], () => r(require('@/page/usersearch')), 'usersearch');
const pending = r => require.ensure([], () => r(require('@/page/pending')),'pending');
const completed = r => require.ensure([], () => r(require('@/page/completed')),'completed');
const rank = r => require.ensure([], () => r(require('@/page/rank')),'rank');
const password = r => require.ensure([], () => r(require('@/page/password')), 'password');
const userdetail = r => require.ensure([], () => r(require('@/page/userdetail')), 'userdetail');
const userlog = r => require.ensure([], () => r(require('@/page/userlog')), 'userlog');
const slideshow = r => require.ensure([], () => r(require('@/page/slideshow')), 'slideshow');
const routes = [

	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: rank,
			meta: [],
		},{
			path: '/questionedit',
			component: questionedit,
			meta: ['题库管理', '题目表列'],
		},{
			path: '/singleupload',
			component: singleupload,
			meta: ['题库管理', '单题上传'],
		},{
			path: '/batchupload',
			component: batchupload,
			meta: ['题库管理', '批量上传'],
		},{
			path: '/coursemanage',
			component: coursemanage,
			meta: ['教程视频管理', '教程视频页面'],
		},{
			path: '/videomanage',
			component: videomanage,
			meta: ['教程视频管理', '视频库管理'],
		},{
			path: '/adduser',
			component: adduser,
			meta: ['用户管理', '添加用户'],
		},{
			path: '/usersearch',
			component: usersearch,
			meta: ['用户管理', '用户列表'],
		},{
			path: '/pending',
			component: pending,
			meta: ['补考费申请', '申请列表'],
		},{
			path: '/rank',
			component: rank,
			meta: ['排行管理', '排行信息'],
		},{
			path: '/password',
			component: password,
			meta: ['密码更改'],
		},{
			path: '/userdetail',
			component: userdetail,
			meta: ['详细信息'],
		},{
			path: '/userlog',
			component: userlog,
			meta: ['用户管理','用户生成记录'],
		},{
			path: '/slideshow',
			component: slideshow,
			meta: ['轮播图管理'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
