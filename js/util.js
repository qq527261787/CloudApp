//var baseUrl = 'http://192.168.31.85:8080/cloud/';
//var baseUrl = 'http://192.168.173.1:8080/cloud/';
//var baseUrl = 'http://172.23.226.1:8080/cloud/';
//var baseUrl = 'http://192.168.253.1:8080/cloud/';
var baseUrl = 'http://192.168.1.110:8080/cloud/';
var downUrl = {
	left: 'http://192.168.229.11:50075/webhdfs/v1/',
	right: '?op=OPEN&namenoderpcaddress=HadoopMaster:9000&offset=0'
}

var util = {
	/**
	 * ajax异步请求	
	 * @param {Object} fuc api接口
	 * @param {Object} json 请求数据
	 * @param {Object} method 请求方法GET POST
	 * @param {Object} sucback 成功反调函数
	 * @param {Object} errback 失败反调函数
	 * @param {Object} flag 请求头是否含有token
	 */
	ajax: function(fuc, json, method, sucback, errback, flag){
		var headers = {
			'Content-Type': 'application/json'
		};
		if(flag){
			headers.authorization = localStorage.getItem('token');
		}
		mui.ajax(baseUrl + fuc,{
			data: json,
			dataType: 'json',//服务器返回json格式数据
			type: method,//HTTP请求类型
			timeout: 10000,//超时时间设置为10秒；
			headers: headers,
			success: function(data){
				sucback(data); 
			},
			error: function(xhr,type,errorThrown){
				//异常处理；
				console.log(type);
				errback();
			}
		});
	}
}

Date.prototype.format = function(format)
{
	 var o = {
		 "M+" : this.getMonth()+1, //month
		 "d+" : this.getDate(),    //day
		 "h+" : this.getHours(),   //hour
		 "m+" : this.getMinutes(), //minute
		 "s+" : this.getSeconds(), //second
		 "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
		 "S" : this.getMilliseconds() //millisecond
	 }
	 if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
	 	(this.getFullYear()+"").substr(4 - RegExp.$1.length));
	 for(var k in o)if(new RegExp("("+ k +")").test(format))
	 format = format.replace(RegExp.$1,
	 RegExp.$1.length==1 ? o[k] :
	 ("00"+ o[k]).substr((""+ o[k]).length));
	 return format;
}