/******************************************************************
 ** 文件名:Log.js
 ** Copyright (c) 2017-2018 汉威公司技术研究院
 ** 创建人:mafei
 ** 日 期:2020/02/24
 *
 ** 修改人:李份
 ** 修改日 期:2020/02/24
 ** 描 述:日志中心操作封装类
 ** 说 明: 日志操作
 ** 版 本:1.0.0.1
 ******************************************************************/
Ext.define('vmd.proxy.Log', {
    extend: 'vmd.base.Proxy',
    constructor: function () {
        this.token = Cookie.get("hwToken");//认证token
        this.host = vmdSettings.vmdLogIp;
        this.type = "0";
        this.code = "vmd_28";
    },
    init: function () {


    },
    /*
    *@desc 获取消息中心的ip地址
    */
    getIP: function () {

        return this.host;
    },
    /**
     * @desc 方法功能:post形式的请求  传递Json
     * @param {String} func-要执行的方法名
     * @param {object} args-方法需要的参数对象
     * **/
    postMsgJson: function (func, args, successback, errorback) {
        var host = this.host
        var _url = "http://" + host + "/"
        var config = _url + func + "?type=" + this.type + "&token=" + this.token + "&code=" +this.code 
        hwDas.ajax({
            url: config,
            type: 'POST',
            data: JSON.stringify(args),
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: successback,
            error: errorback
        });
    },
    /**
	 * @desc 写入日志
	 * @param {String} opr-操作（例：新建项目）
	 * @param {String} oprobj-操作目标（例：模块id）
	 * @param {String} description-操作描述说明
	 * @param {String} classify-主题分类：项目、模块、资源、复合组件）
	 * **/
    save: function (opr, oprobj, description, classify,successback, errorback) {
        var func = 'logPush/add';
		var sobj=[];
		var items={};
        var obj = [];
        var item = {};
        item.name = "exception";//异常信息
        item.value = "";
        obj.push(item);
		 var item = {};
        item.name = "description";//操作描述
        item.value = description;
        obj.push(item);
		 var item = {};
        item.name = "result";//操作结果
        item.value = "";
        obj.push(item);
		 var item = {};
        item.name = "clientip";//客户端IP
        item.value = "";
        obj.push(item);
		 var item = {};
        item.name = "topic";//主题作为一组日志的逻辑划分
        item.value = classify;
        obj.push(item);
		 var item = {};
        item.name = "usercode";//操作用户编码
        item.value = vmd.getUserId();
        obj.push(item);
		 var item = {};
        item.name = "operation";//操作
        item.value = opr;
        obj.push(item);
		 var item = {};
        item.name = "operobj";//操作对象
        item.value = oprobj;
        obj.push(item);
		 var item = {};
        item.name = "timestamp";//时间戳
        item.value = Ext.Date.dateFormat(new Date(), 'Y-m-d H:i:s');
        obj.push(item);
		 var item = {};
        item.name = "username";//用户名称
        item.value = vmd.getUserName();
        obj.push(item);
		 var item = {};
        item.name = "tenantId";//域名
        item.value = "";
        obj.push(item);
		 var item = {};
        item.name = "code";//应用标识
        item.value = this.code ;
        obj.push(item);
		items.data=obj;
		sobj.push(items);
        this.postMsgJson(func, sobj, successback, errorback);
    },

    /**
	 方法功能:get形式的请求
	 参数说明:
	 func:要执行的方法路径
	 */
    getMsgJson: function (func, successback, errorback) {
        var host = this.host
        var _url = "http://" + host + "/"
        var config = _url + func + "?type=" + this.type + "&token=" + this.token + "&code=" + this.code
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
    },
    /**
	 * 读取日志
	 *参数：
	 *obj  日志数据对象
	 *
	 * **/
    get: function (obj, successback, errorback) {
        var func = 'logPush/get';
        this.getMsgJson(func, obj, successback, errorback);
    }

})
