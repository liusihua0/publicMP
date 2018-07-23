/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 * 
 */
let baseUrl = ''; 
let routerMode = 'history';
let baseImgPath;
let my_url = 'http://60.205.224.9:8089/Driving/';

if (process.env.NODE_ENV == 'development') {
	  baseUrl = 'http://localhost:8002';
    baseImgPath = 'http://localhost:8002/img/';
}else{	
	  baseUrl = 'http://cangdu.org:8001';
    baseImgPath = 'http://cangdu.org:8001/img/';
}

export {
	baseUrl,
	routerMode,
	baseImgPath,
	my_url
}
//C:\Users\Administrator\Desktop\驾考app\后台
