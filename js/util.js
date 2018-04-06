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

// 对Date的扩展，将 Date 转化为指定格式的String  
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
  
Date.prototype.Format = function(fmt){  
    var o = {  
         "M+": this.getMonth()+1,  
         "d+": this.getDate(),  
         "H+": this.getHours(),  
         "m+": this.getMinutes(),  
         "s+": this.getSeconds(),  
         "S+": this.getMilliseconds()  
    };  
  
    //因位date.getFullYear()出来的结果是number类型的,所以为了让结果变成字符串型，下面有两种方法：  
  
      
  
    if(/(y+)/.test(fmt)){  
        //第一种：利用字符串连接符“+”给date.getFullYear()+""，加一个空字符串便可以将number类型转换成字符串。  
  
        fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));  
    }  
    for(var k in o){  
        if (new RegExp("(" + k +")").test(fmt)){  
  
            //第二种：使用String()类型进行强制数据类型转换String(date.getFullYear())，这种更容易理解。  
  
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(String(o[k]).length)));  
        }  
    }     
    return fmt;  
}  