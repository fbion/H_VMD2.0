/******************************************************************
 ** 文件名:HwEMC.js
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
function HwEMC (host,appid,appkey) {
    this.token= "",//认证token
    this.ecyLogin="",//加密用户名
    this.host=host||"",//服务器ip及端口
    this.ip= "",
    this.mqtt_port="" ,
    this.appid=appid||"074fce19-1c29-4ee5-a12b-108224d711b5",
    this.appkey= appkey||"16c16c4e-8f10-49dc-9dc4-2072ebaed7a9"

}

HwEMC.prototype.init = function (ip, mqtt_port, host) {
    this.ip = ip;
    this.mqtt_port = mqtt_prot;
    this.host = host;
    this.appid = appid;
    this.appkey = appkey;
}
HwEMC.prototype.initMore = function (ip, mqtt_port, host, appid, appkey) {
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
HwEMC.prototype.get = function (func, successback, errorback) {
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
HwEMC.prototype.getagrs = function (func, args , successback, errorback) {
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
HwEMC.prototype.post = function (func, args , successback, errorback) {
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
HwEMC.prototype.postJson = function (func, args, successback, errorback) {
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
 方法功能:获取权限信息
 参数说明:
 entitlement_id:权限id
 */
HwEMC.prototype.getentitlementinfo = function (entitlement_id, successback, errorback) {
    var func = 'isipmanage/appENTITLEMENT/ENTITLEMENT'
    var obj = {employee_ba_id: employee_ba_id}
    this.getagrs(func, obj, successback, errorback);
}
/**
 方法功能:获取权限下模块列表
 参数说明:
 entitlement_id:权限id
 */
HwEMC.prototype.getentitlement_comp_app = function (entitlement_id, successback, errorback) {
    var func = 'isipmanage/appENTITLEMENT/ENTITLEMENTComp'
    var obj = {employee_ba_id: employee_ba_id}
    this.getagrs(func, obj, successback, errorback);
}
/**
 方法功能:获取权限列表
 参数说明:
 */
HwEMC.prototype.getentitlementbyuser = function ( successback, errorback) {
    var func = 'isipmanage/appENTITLEMENT/getentitlementbyuser'
    this.get(func, successback, errorback);
}
/**
 方法功能:核实权限是否存在
 参数说明:
 entitlement_id:权限id
 */
HwEMC.prototype.checkentitlement = function (entitlement_id, successback, errorback) {
    var func = 'isipmanage/appENTITLEMENT/checkentitlement'
	var obj = {entitlement_id: entitlement_id}
    this.getagrs(func, obj, successback, errorback);
}
/**
 方法功能:核实权限是否存在
 参数说明:
 sw_application_id:应用id
 */
HwEMC.prototype.getentitlementcompfuc = function (entitlement_id, successback, errorback) {
    var func = 'isipmanage/appENTITLEMENT/getentitlementcompfuc'
	var obj = {sw_application_id: sw_application_id}
    this.getagrs(func, obj, successback, errorback);
}