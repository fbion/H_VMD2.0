/******************************************************************
 ** 文件名:hwTDC.js
 ** Copyright (c) 2017-2018 汉威公司技术研究院
 ** 创建人:caishaoqing
 ** 日 期:2019/03/25
 *
 ** 修改人:蔡少卿
 ** 修改日 期:2019/03/25
 ** 描 述:待办中心操作封装类
 ** 说 明: 待办操作
 ** 版 本:1.0.0.1
 ******************************************************************/
function HwTDC( host,appid,appkey) {
	this.token= "";//认证token
    this.ecyLogin= "";//加密用户名
    this.ip = "";
    this.host = host;
    this.appid = appid;
    this.appkey = appkey;
}


HwTDC.prototype.init = function (ip, mqtt_port, host,appid,appkey) {
    this.ip = ip;
    this.mqtt_port = mqtt_port;
    this.host = host;
    this.appid = appid;
    this.appkey = appkey;
}
HwTDC.prototype.initMore = function (ip, mqtt_port, host, appid, appkey) {
    this.ip = ip;
    this.mqtt_port = mqtt_prot;
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
HwTDC.prototype.postMsgJson = function (func, args, successback, errorback) {
    var host = this.host
    var _url = "http://" + host + "/api/"
    //args={appName:"234",unit:"23234",contact:"23",phone:"23",appNote:"345"}
    //var obj={appName:"12",unit:"34",contact:"23",phone:"23",appNote:"345"}
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
 * 查询待办
 *参数：
 * user:用户
 * userSentry：岗位
 * page: 第几页
 * pageSize：一页多少条
 * **/
HwTDC.prototype.taskTodoGet = function (user, userSentry, page, pageSize, successback, errorback) {
    var func = 'msg_task';
    var obj = {user: user, userSentry: userSentry, selectType: "0", page: page, pageSize: pageSize}
    this.postMsgJson(func, obj, successback, errorback);

}
/**
 * 查询已办
 *参数：
 * user:用户
 * page: 第几页
 * pageSize：一页多少条
 * **/
HwTDC.prototype.taskDoGet = function (user, page, pageSize, successback, errorback) {
    var func = 'msg_task'
    var obj = {user: user, selectType: "1", page: page, pageSize: pageSize}
    this.postMsgJson(func, obj, successback, errorback);

}
/**
 * 查询审批历程
 *参数：
 * flow_inst_id:工作流实例Id
 * business_key: 业务主键
 *
 * **/
HwTDC.prototype.taskHistoryGet = function (flow_inst_id, business_key, successback, errorback) {
    var func = 'task_poa'
    var obj = {flow_inst_id: flow_inst_id, business_key: business_key}
    this.postMsgJson(func, obj, successback, errorback);
}
/**
 * 查询待办详情
 *参数：
 * task_id:工作流实例Id
 * flow_task_id: 业务主键
 *
 * **/
HwTDC.prototype.taskInfoGet = function (task_id, flow_task_id, successback, errorback) {
    var func = 'task_poa'
    var host = this.host
    var _url = "http://" + host + "/api/"
    var config = _url + func;
    hwDas.ajax({
        url: config,
        type: 'GET',
        params: {
            appid: this.appid,
            appkey: this.appkey,
            task_id: task_id,
            flow_task_id: flow_task_id
        },
        dataType: 'json',
        contentType: "application/json,charset=utf-8",
        success: successback,
        error: errorback
    });
}