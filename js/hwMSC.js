


/******************************************************************
 ** 文件名:hwMSC.js
 ** Copyright (c) 2017-2018 汉威公司技术研究院
 ** 创建人:闫祯祯
 ** 日 期:2018/08/08
 *
 ** 修改人:蔡少卿
 ** 修改日 期:2018/09/14
 ** 描 述:消息中心操作封装类
 ** 说 明: 主题操作、MQTT连接
 ** 版 本:1.0.0.1
 *
 ** 修改人:蔡少卿
 ** 修改日 期:2018/11/15
 ** 描 述:添加待办相关操作 2018/11/24 审批历程接口添加
 ** 说 明: 主题操作、MQTT连接
 ** 版 本:1.0.0.2
 ******************************************************************/

 //兼容处理，对消息中心未组件化前的兼容
 if(typeof(Messaging)=="undefined") {
	 if(Ext.isIE8)		 
		console.log("IE8不支持消息中心订阅")
	else {
		$LAB
		.script(bootPATH+'/js/hwMSC_mqttws31.js')	
		.wait(function(){
			vmd.taskRunner(function(retur){
				if(!hwMSC)
					return false
				else{
					if(vmd.projectInfo||vmd.workspace||hwMSC.host)
						return true
					else
						return false
				}
			},function(){	
				var defaultProIp=""
				var defaultWSIp=""
				if(vmd.projectInfo&&vmd.projectInfo.msgIp)
					defaultProIp=vmd.projectInfo.msgIp
				if(vmd.workspace&&vmd.workspace.msgIp)
					defaultWSIp=vmd.workspace.msgIp	
				hwMSC.host=hwMSC.host||defaultProIp||defaultWSIp
				hwMSC.appid=hwMSC.appid||"074fce19-1c29-4ee5-a12b-108224d711b5"
				hwMSC.appkey=hwMSC.appkey||"16c16c4e-8f10-49dc-9dc4-2072ebaed7a9"
			})	
		})		
	}		
} 
 
function HwMSC(ip, mqtt_port, host,appid,appkey) {
	this.token= "";//认证token
    this.ecyLogin= "";//加密用户名
    this.ip = ip;
    this.mqtt_port = mqtt_port;
    this.host = host;
    this.appid = appid;
    this.appkey = appkey;
}


HwMSC.prototype.init = function (ip, mqtt_port, host,appid,appkey) {
    this.ip = ip;
    this.mqtt_port = mqtt_port;
    this.host = host;
    this.appid = appid;
    this.appkey = appkey;
}
HwMSC.prototype.initMore = function (ip, mqtt_port, host, appid, appkey) {
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
HwMSC.prototype.getMsg = function (func, successback, errorback) {
    var host = this.host
    var _url = "http://" + host + "/api/"
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
 方法功能:post形式的请求
 参数说明:
 func:要执行的方法名
 args:方法需要的参数，字符串形式

 */
HwMSC.prototype.postMsg = function (func, args, successback, errorback) {
    var host = this.host
    var _url = "http://" + host + "/api/"
    //args={appName:"234",unit:"23234",contact:"23",phone:"23",appNote:"345"}
    //var obj={appName:"12",unit:"34",contact:"23",phone:"23",appNote:"345"}
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
HwMSC.prototype.postMsgJson = function (func, args, successback, errorback) {
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
 方法功能:消息删除
 参数说明:
 appid：应用系统id

 */
HwMSC.prototype.deleteMsg = function (appid) {

}
/**
 方法功能:消息发送
 参数说明:
 appid:系统id
 appkey:系统key
 */
HwMSC.prototype.sendMsg = function (appid, appkey, successback, errorback) {
    var func = 'message_unify?appid=' + appid + '&appkey=' + appkey
    var obj = {appId: appid, appKey: appkey}
    this.postMsg(func, obj, successback, errorback);
}
/**
 方法功能:添加主题
 参数说明:
 topicId:主题id
 topicName:主题名称,
 topicNote:主题说明,
 appId:系统id

 */
HwMSC.prototype.addTopic = function (topicId, topicName, topicNote, appId, successback, errorback) {
    var func = 'topic_add'
    var obj = {topicId: topicId, topicName: topicName, topicNote: topicNote, appId: appId}
    this.postMsg(func, obj, successback, errorback);
}
/**
 方法功能:删除主题
 参数说明:
 topicId:主题id

 */
HwMSC.prototype.deleteTopic = function (topicId, successback, errorback) {
    var func = 'topic_delete'
    var obj = {topicId: topicId}
    this.postMsg(func, obj, successback, errorback);
}
/**
 方法功能:订阅主题
 参数说明:
 clientId：客户端id
 subscriberName ：订阅者名称
 topicName：订阅主题名称
 selector：选择器，用来过滤消息，可默认为空

 */
HwMSC.prototype.subTopic = function (clientId, subscriberName, topicId, selector, successback, errorback) {
    var func = 'topic_sub'
    var obj = {clientId: clientId, subscriberName: subscriberName, topicId: topicId, selector: selector}
    this.postMsg(func, obj, successback, errorback);
}
/**
 方法功能:取消订阅主题
 参数说明:
 clientId：客户端id
 subscriberName ：订阅者名称

 */
HwMSC.prototype.cancelSub = function (clientId, subscriberName, successback, errorback) {
    var func = 'topic_cancel_sub'
    var obj = {clientId: clientId, subscriberName: subscriberName}
    this.postMsg(func, obj, successback, errorback);
}
/**
 方法功能：主题列表查看
 参数说明:
 con:条件查询的条件（主题关键字），为空时时查看全部
 page ：当前页
 pageSize：每页最大记录数

 */
HwMSC.prototype.queryTopic = function (con, page, pageSize, appId, successback, errorback) {
    var func = 'topic_query?con=' + con + '&page=' + page + '&pageSize=' + pageSize + '&appId=' + appId
    this.getMsg(func, successback, errorback);
}
/**
 方法功能：主题详情查看
 参数说明:
 topicId:主题id

 */
HwMSC.prototype.getTopicInfo = function (topicId, successback, errorback) {
    var func = 'topic_info?topicId=' + topicId
    this.getMsg(func, successback, errorback);
}
/**
 方法功能：主题编辑（更改）
 参数说明:
 topicId:主题id
 topicName:主题名称,
 topicNote:主题说明

 */
HwMSC.prototype.updateTopic = function (topicId, topicName, topicNote, successback, errorback) {
    var func = 'topic_update'
    var obj = {topicId: topicId, topicName: topicName, topicNote: topicNote}
    this.postMsg(func, obj, successback, errorback);
}
/**
 方法功能：订阅者列表查看（用户列表查看）
 参数说明:
 */
HwMSC.prototype.querySubscribers = function (successback, errorback) {
    var func = 'topic_subscribers'
    this.getMsg(func, successback, errorback);
}
/**初始化MQTT连接对象（改变地址）
 *参数：
 * clientId : 用户终端ID
 * ip : 连接地址
 * mqtt_port : 端口号
 * **/
HwMSC.prototype.MQTTInitHost = function (clientId, ip, mqtt_port) {
    this.ip = ip;
    this.clientId = clientId;
    this.mqtt_port = mqtt_port;

    //初始化MQTT连接对象
    var client = new Messaging.Client(this.ip, Number(this.mqtt_port), this.clientId);

    return client;

}
/**MQTT客户端初始化
 *参数：
 * clientId : 用户终端ID
 * **/
HwMSC.prototype.MQTTInit = function (clientId) {
    this.clientId = clientId;
    //初始化MQTT连接对象

    var hwMqttClient = new Messaging.Client(this.ip, Number(this.mqtt_port), this.clientId);

    return hwMqttClient;

}
/**MQTT客户端连接
 *参数：
 * hwMqttClient : this.MQTTInit初始化的hwMqttClient
 * timeout ：连接超时时间 默认为30秒
 * keepAliveInterval ： 心跳连接时间 默认为60秒  这里默认设置为10
 * onConnect : 连接成功回调
 * onFailure ： 连接失败回调
 * onMessageArrived ：接收消息回调
 * onConnectionLost ： 连接断开回调
 * **/
HwMSC.prototype.MQTTConnect = function (hwMqttClient, timeout, keepAliveInterval, onConnect, onFailure, onMessageArrived, onConnectionLost) {

    hwMqttClient.onConnect = onConnect;
    hwMqttClient.onMessageArrived = onMessageArrived;
    hwMqttClient.onConnectionLost = onConnectionLost;

    if (timeout === null || timeout === "") {
        timeout = 30
    }

    if (keepAliveInterval === null || keepAliveInterval === "") {
        timeout = 10
    }

    hwMqttClient.connect({
        timeout: timeout,//如果在改时间端内尚未连接成功，则认为连接失败  默认为30秒
        //              userName:"",
        //              password:"",
        //willMessage:'willMessage',//当连接非正常断开时，发送此遗言消息
        keepAliveInterval: keepAliveInterval, //心跳信号 默认为60秒
        cleanSession: false, //若设为false，MQTT服务器将持久化客户端会话的主体订阅和ACK位置，默认为true
        useSSL: false,
        //invocationContext:"success",//作为onSuccess回调函数的参数
        onSuccess: onConnect,
        onFailure: onFailure
        //hosts:'',//备用域名
        //ports:''//备用端口
    });

    return hwMqttClient;

}
/**MQTT客户端连接断开   正常断开
 *参数：
 * hwMqttClient : this.MQTTInit初始化的hwMqttClient
 * **/
HwMSC.prototype.MQTTDisconnect = function (hwMqttClient) {
    hwMqttClient.disconnect()
}
/** 订阅主题
 *参数：
 * hwMqttClient : this.MQTTInit初始化的hwMqttClient  --不可为空
 * topicName ：订阅主题ID  --不可为空
 *  qos : 消息发送等级   不传设置为2  通常采用 2
 *                       0 --  发送者只发送一次消息，不进行重试
 *                       1--   发送者最少发送一次消息，确保消息到达Broker，Broker需要返回确认消息PUBACK
 2--   使用两阶段确认来保证消息的不丢失和不重复。
 * onSubSuccess  订阅成功回调
 * onSubSuccess  订阅失败回调
 * **/
HwMSC.prototype.MQTTSubscribe = function (hwMqttClient, topicId, qos, onSubSuccess, onSubError) {
    if (qos === null || qos === "") {
        qos = 2
    }

    hwMqttClient.subscribe(topicId, {
        qos: qos,
        onSuccess: onSubSuccess,
        onFailure: onSubError
    });

    return hwMqttClient;

}
/**
 * 取消订阅
 *参数：
 * hwMqttClient : this.MQTTInit初始化的hwMqttClient  --不可为空
 * topicId ：订阅主题ID  发送的主题--不可为空
 *  msgStr : 要发送的消息  字符串
 * **/
HwMSC.prototype.MQTTUnSubscribe = function (hwMqttClient, topicId, unSubSuccess, unSubError) {


    hwMqttClient.unsubscribe(topicId, {
        onSuccess: unSubSuccess,
        onFailure: unSubError
    });

    return hwMqttClient;

}
/**
 * 发送消息
 *参数：
 * hwMqttClient : this.MQTTInit初始化的hwMqttClient  --不可为空
 * topicId ：订阅主题ID  发送的主题--不可为空
 *  msgStr : 要发送的消息  字符串
 * **/
HwMSC.prototype.MQTTSendMsg = function (hwMqttClient, topicId, msgStr) {
    var message = new Messaging.Message(msgStr);
    message.destinationName = topicId;
    hwMqttClient.send(message);
}
/**
 * 查询待办
 *参数：
 * user:用户
 * userSentry：岗位
 * page: 第几页
 * pageSize：一页多少条
 * **/
HwMSC.prototype.taskTodoGet = function (user, userSentry, page, pageSize, successback, errorback) {
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
HwMSC.prototype.taskDoGet = function (user, page, pageSize, successback, errorback) {
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
HwMSC.prototype.taskHistoryGet = function (flow_inst_id, business_key, successback, errorback) {
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
HwMSC.prototype.taskInfoGet = function (task_id, flow_task_id, successback, errorback) {
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
/**
 * 发送即时消息
 *参数：
 * topicId:订阅主题ID
 * body: 发送内容
 *
 * **/
HwMSC.prototype.sendTopicMsg = function (topicId,body, successback, errorback) {
    var func = 'message/push/topic'
    var host = this.host
    var _url = "http://" + host + "/api/"
    var config = _url + func;
    hwDas.ajax({
        url: config,
        type: 'POST',
        params: {
            appid: this.appid,
            appkey: this.appkey,
            destination: topicId,
            topic: topicId,
            body:body
        },
        dataType: 'json',
        contentType: "application/json,charset=utf-8",
        success: successback,
        error: errorback
    });
}
/**
 * 发送短息消息
 *参数：
 * sysflowid:业务系统唯一标识
 * sysUserName: 发送人账号数组
 * userInfoPhone:发送人电话
 * content:短信内容
 * smsPriority:短信优先级
 * msgCreatorId：不需要回复填""
 * **/
HwMSC.prototype.sendSMSMsg = function (sendTime,sysflowid,sysUserName,userInfoPhone,content,smsPriority,msgCreatorId, successback, errorback) {
    var func = 'message/push/sms'
    var host = this.host
    var _url = "http://" + host + "/api/"
    var config = _url + func;
    var data ={
        sendTime:sendTime,
        sysflowid: sysflowid,
        sysUserName: sysUserName,
        userInfoPhone: userInfoPhone,
        content: content,
        msgCreatorId: msgCreatorId,
        smsPriority:smsPriority
    };
    hwDas.ajax({
        url: config,
        type: 'POST',
        params: {
            appid: this.appid,
            appkey: this.appkey,

        },
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json,charset=utf-8",
        success: successback,
        error: errorback
    });
}

/**
 * 发送即时消息(rest 兼容业务属性值)
 *参数：
 * topicId:订阅主题ID
 * body: 发送内容
 * bodyJsonStr:发送的json字符串      body  bodyjsonStr 传一个即可  都传以body为准
 * spec_type:描述类型 可为空字符串
 * spec_value：描述值  可为空字符串
 * **/
HwMSC.prototype.sendTopicMsgSPEC = function (topicId,body,bodyJsonStr,spec_type,spec_value, successback, errorback) {
    var func = 'message/push/topic'
    var host = this.host
    var _url = "http://" + host + "/api/"
    var config = _url + func;

    var par={
        appid: this.appid,
        appkey: this.appkey,
        destination: topicId,
        topic: topicId,
        spec_type:spec_type,
        spec_value:spec_value
    }
    if(body!=""){
        par.body=body;
    }
    hwDas.ajax({
        url: config,
        type: 'POST',
        params: par,
        data:bodyJsonStr,
        dataType: 'json',
        contentType: "application/json,charset=utf-8",
        success: successback,
        error: errorback
    });
}
var hwMSC=new HwMSC()

