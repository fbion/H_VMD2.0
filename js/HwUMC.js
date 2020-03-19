/******************************************************************
 ** 文件名:HwUMC.js
 ** Copyright (c) 2018-2019 汉威公司技术研究院
 ** 创建人:刘文政
 ** 日 期:2019/02/28
 ** 版 本:1.0.0.1
 *
 *
 ** 修改人:刘文政
 ** 修改日 期:2019/03/26
 ** 描 述:支持对象实例化
 ** 版 本:1.0.0.2
 ******************************************************************/
function HwUMC (host,appid,appkey) {
	this.token= "",//认证token
    this.ecyLogin="",//加密用户名
    this.host=host||"",//服务器ip及端口
    this.ip= "",
    this.mqtt_port="" ,
    this.appid=appid||"074fce19-1c29-4ee5-a12b-108224d711b5",
    this.appkey= appkey||"16c16c4e-8f10-49dc-9dc4-2072ebaed7a9"

}

HwUMC.prototype.init = function (ip, mqtt_port, host) {
    this.ip = ip;
    this.mqtt_port = mqtt_prot;
    this.host = host;
    this.appid = appid;
    this.appkey = appkey;
}
HwUMC.prototype.initMore = function (ip, mqtt_port, host, appid, appkey) {
    this.ip = ip;
    this.mqtt_port = mqtt_prot;
    this.host = host;
    this.appid = appid;
    this.appkey = appkey;
}
/**
 方法功能:get形式的请求
 参数说明:
 func:要执行的方法路径
 */
HwUMC.prototype.get = function (func, successback, errorback) {
    var host = this.host
    var _url = "http://" + host + "/"
    var config = _url + func + "?appid=" + this.appid + "&appkey=" + this.appkey
    hwDas.ajax({
        url: config,
        type: 'get',
        headers: {},
        //返回数据的格式
        datatype: "jsonp",//"xml", "html", "script", "json", "jsonp", "text".
        params: {},
        data: {},
        async: true,
        success: successback,
        error: errorback
    });
}
/**
 方法功能:get形式的请求
 参数说明:
 func:要执行的方法路径
 */
HwUMC.prototype.getagrs = function (func, args , successback, errorback) {
    var host = this.host
    var _url = "http://" + host + "/"
    var config = _url + func + "?appid=" + this.appid + "&appkey=" + this.appkey
    hwDas.ajax({
        url: config,
        type: 'get',
        headers: {},
        //返回数据的格式
        datatype: "jsonp",//"xml", "html", "script", "json", "jsonp", "text".
        params: {},
        data: JSON.stringify(args),
        async: true,
        success: successback,
        error: errorback
    });
}
/**
 方法功能:post形式的请求
 参数说明:
 func:要执行的方法名
 args:方法需要的参数，字符串形式
 */
HwUMC.prototype.post = function (func, args , successback, errorback) {
    var host = this.host
    var _url = "http://" + host + "/"
    var config = _url + func + "?appid=" + this.appid + "&appkey=" + this.appkey
    hwDas.ajax({
        url: config,
        type: 'POST',
        data: JSON.stringify(args),
        success: successback,
        error: errorback
    });
}
/**
 方法功能:post形式的请求  传递Json
 参数说明:
 func:要执行的方法名
 args:方法需要的参数，字符串形式
 */
HwUMC.prototype.postJson = function (func, args, successback, errorback) {
    var host = this.host
    var _url = "http://" + host + "/"
    var config = _url + func + "?appid=" + this.appid + "&appkey=" + this.appkey
    hwDas.ajax({
        url: config,
        type: 'POST',
        data: JSON.stringify(args),
        dataType: 'json',
        contentType: "application/json,charset=utf-8",
        success: successback,
        error: errorback
    });
}
/**
 方法功能:获取用户信息
 参数说明:
 employee_ba_id:用户id
 */
HwUMC.prototype.getuserinfo = function (employee_ba_id, successback, errorback) {
    var func = 'isipmanage/userManage/user'
    var obj = {employee_ba_id: employee_ba_id}
    this.getagrs(func, obj, successback, errorback);
}
/**
 方法功能:获取单位下用户信息
 参数说明:
 org_ba_id:单位id
 name :用户名称（模糊查询用）
 */
HwUMC.prototype.getuserinfobyunit = function (org_ba_id, name, successback, errorback) {
    var func = 'isipmanage/userManage/getuserbyunit'
    var obj = {org_ba_id: org_ba_id,name:name }
    this.getagrs(func, obj, successback, errorback);
}
/**
 方法功能:查询用户岗位
 参数说明:
 */
HwUMC.prototype.getuserposition = function ( successback, errorback) {
    var func = 'isipmanage/userManage/getuserposition'
    this.get(func, successback, errorback);
}
/**
 方法功能:查询用户所属单位
 参数说明:
 */
HwUMC.prototype.getuserunit = function ( successback, errorback) {
    var func = 'isipmanage/userManage/getuserunit'
    this.get(func, successback, errorback);
}