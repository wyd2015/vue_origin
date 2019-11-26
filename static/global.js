/**
 * 全局变量/函数
 * 此文件不通过编译处理，没有统一兼容处理，使用ES5
 * 修改此文件前应详细了解其特性，一般公用函数应写在src/assets/中
 */

// 全局变量
var gl = {
	// 接口服务器地址
    serverURL: "http://127.0.0.1:8085",
    websocketURL: 'ws://192.168.1.182:8085',
	develop : true,
	// 用于存储菜单信息
	menu: {
		firstActive:'', // 一级菜单
		secondActive:'', // 二级菜单
		loginU:'simaliuyang',
	},
	pager: {
		pageSize:'' //单页列表容量
	},
	loginU:'simaliuyang',
}

// 自动切换服务端地址
if(!window.location.href.match(/http[s]{0,1}\:\/\/(192\.|localhost|127\.)/)){
	// 非本地路径
	gl.serverURL = "http://"+window.location.host+"/api";
	if(window.location.href.indexOf('http://10.136.88.103') >= 0){
		gl.develop = false;
	}
}

/**
 * 设置菜单激活状态
 */
menuActive = function(firstActive, secondActive) {
	gl.menu.firstActive = firstActive;
	gl.menu.secondActive = secondActive;
}


