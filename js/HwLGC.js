/******************************************************************
 ** 文件名:hwLGC.js
 ** Copyright (c) 2017-2018 汉威公司技术研究院
 ** 创建人:caishaoqing
 ** 日 期:2019/03/25
 *
 ** 修改人:蔡少卿
 ** 修改日 期:2019/03/25
 ** 描 述:日志中心操作封装类
 ** 说 明: 日志操作
 ** 版 本:1.0.0.1
 ******************************************************************/
function HwLGC( host,appid,appkey) {
	this.token= "";//认证token
    this.ecyLogin= "";//加密用户名
    this.ip = "";
    this.host = host;
    this.appid = appid;
    this.appkey = appkey;
}
HwLGC.prototype.init = function (ip, mqtt_port, host,appid,appkey) {
    this.ip = ip;
    this.mqtt_port = mqtt_port;
    this.host = host;
    this.appid = appid;
    this.appkey = appkey;
}
/**
 方法功能:post形式的请求  传递Json
 参数说明:
 func:要执行的方法名
 args:方法需要的参数，字符串形式

 */
HwLGC.prototype.postMsgJson = function (func, args, successback, errorback) {
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
 * 写入日志
 *参数：
 *obj  日志数据对象
 *
 * **/
HwLGC.prototype.logPush = function (obj, successback, errorback) {
    var func = 'logPush';
    this.postMsgJson(func, obj, successback, errorback);

}
