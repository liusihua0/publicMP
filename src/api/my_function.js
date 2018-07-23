
/**
 * 处理请求回调数据
 */
export const deal_data = (data) => {
  if(getCookie('user_uk')==null)t_login();
  if(getCookie('user_uk')=="")t_login();
  if(getCookie('user_uk').length==0)t_login();
  if(new Date()- new Date(getCookie('user_uk'))>1800*1000){
    t_login();
  }
  var res = eval('(' + data.bodyText + ')');
  set_tttt()
  return res
}
export const set_tttt = () => {
  setCookie('user_uk',new Date(),30)
}
export const set_zzzz = () => {
  setCookie('user_uk',"",30)
}
export const t_login = () => {
  window.location.replace('login')
}
export const setCookie = (name,value,day) => {
    var date = new Date();
     
    document.cookie = name + '=' + value + ';expires='+ date+';path=/';
    console.log(name + '=' + value + ';expires='+ date+';path=/')
  };
  //获取cookie
 export const getCookie = name => {
    var reg = RegExp(name+'=([^;]+)');
    var arr = document.cookie.match(reg);
    if(arr){
      return arr[1];
    }else{
      return '';
    }
  };
  //删除cookie
 export const delCookie = name => {
    setCookie(name,"",1);
  };

//let my_url = 'http://172.20.10.5:8080/Driving/';
let my_url = 'http://211.149.230.193:8080/Driving/';
let my_url_pic = my_url+'Pub/getPic?pic=';
let my_url_questionpic = my_url+'Pub/getPic?picParse=';
export{my_url,my_url_pic,my_url_questionpic}