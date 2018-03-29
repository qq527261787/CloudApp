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
	},
	/**
	 *	文件下载 
	 * @param {Object} filePath 文件路径
	 */
	fileDown: function(filePath){
		console.log(filePath);
		var url = "http://snip.qq.com/resources/Snip_V2.0_5771.dmg";
//		var url = downUrl.left + filePath + downUrl.right;
		console.log(url);
		var options = {method:"GET"};
		var dtask = plus.downloader.createDownload( url, options);
		console.log(dtask.filename);
		dtask.addEventListener( "statechanged", function(task, status){
			if(!dtask){ 
				mui.toast('下载任务创建失败');
				return; 
			}
			else{
				dtask.flag = true;
				mui.toast('下载任务创建成功');
			}
			switch(task.state) {
				case 1: // 开始
					mui.toast( '开始下载...');
					break;
				case 2: // 已连接到服务器
				    console.log( "链接到服务器..." );
				    break;
				case 3:	// 已接收到数据
				    console.log(task.downloadedSize + "/" + task.totalSize );
				    break;
				case 4:	// 下载完成
				    mui.toast(dtask.filename + '下载完成！' );
				    dtask.flag = 0;
				    break;
			}
		});
		return dtask;
	}
}