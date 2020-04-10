//----------------------------------------------------------------------------------------------------------
//-----公共函数对象---------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
if(!vmd) window.vmd = {}
Ext.applyIf(vmd, {
	confirm: function(title, text, yesCallBack, noCallback) {
		Ext.Msg.confirm(title || "提示", text || "确定？", function(type) {
			if(type == "yes") {
				yesCallBack()
			} else {
				noCallback()
			}
		})
	},
	getStore: function(storename) {
		return Ext.StoreMgr.get(storename);
	}
})
//------获取微服务地址----------------------------------------------------------------------------------------------------
if(!vmd.MicService) window.vmd.MicService = {}
Ext.applyIf(vmd.MicService, {
	getDasIp: function(isVmd) {
		var proIp = vmd.projectInfo?vmd.projectInfo.dataServiceIp:"";
		var wsIp =vmd.workspace?vmd.workspace.dataServiceIp:"";
		var dIp = vmdSettings?vmdSettings.dataServiceIp:"";
		if(isVmd)
			return dIp || "";
		else
			return proIp || wsIp || dIp || "";
	},
	getDMCIp: function(isVmd) {
		var proIp = vmd.projectInfo?vmd.projectInfo.docIp:"" ;
		var wsIp = vmd.workspace?vmd.workspace.dataServiceIp:"";
		var dIp = vmdSettings?vmdSettings.dataServiceIp:"";
		if(isVmd)
			return dIp || "";
		else
			return proIp || wsIp || dIp || "";
	},
	getAMCIp: function(isVmd) {
		var proIp = vmd.projectInfo?vmd.projectInfo.dataServiceIp:"";
		var wsIp = vmd.workspace?vmd.workspace.dataServiceIp:"";
		var dIp = vmdSettings?vmdSettings.dataServiceIp:"";
		if(isVmd)
			return dIp || "";
		else
			return proIp || wsIp || dIp || "";
	},
	getEMCIp: function(isVmd) {
		var proIp = vmd.projectInfo?vmd.projectInfo.dataServiceIp:"";
		var wsIp = vmd.workspace?vmd.workspace.dataServiceIp:"";
		var dIp =vmdSettings? vmdSettings.dataServiceIp:"";
		if(isVmd)
			return dIp || "";
		else
			return proIp || wsIp || dIp || "";
	},
	getLGCIp: function(isVmd) {
		var proIp = vmd.projectInfo?vmd.projectInfo.logIp:"" ;		
		var dIp = vmdSettings?vmdSettings.dataServiceIp:"";
		if(isVmd)
			return dIp || "";
		else
			return proIp  || "";
	},
	getMSCIp: function(isVmd) {
		var proIp = vmd.projectInfo?vmd.projectInfo.msgIp:"";
		var wsIp = vmd.workspace?vmd.workspace.msgIp:"";
		var dIp =vmdSettings? vmdSettings.msgIp:"";
		if(isVmd)
			return dIp || "";
		else
			return proIp || wsIp || dIp || "";
	},
	getTDCIp: function(isVmd) {
		var proIp = vmd.projectInfo?vmd.projectInfo.todoIp:"";
		var dIp =vmdSettings? vmdSettings.msgIp:"";
		if(isVmd)
			return dIp || "";
		else
			return proIp || "";
	},
	getUMCIp: function(isVmd) {
		var proIp = vmd.projectInfo?vmd.projectInfo.dataServiceIp:"";
		var wsIp = vmd.workspace?vmd.workspace.dataServiceIp:"";
		var dIp = vmdSettings?vmdSettings.dataServiceIp:"";
		if(isVmd)
			return dIp || "";
		else
			return proIp || wsIp || dIp || "";
	},
	getWorkFlowIp: function(isVmd) {
		var proIp = vmd.projectInfo?vmd.projectInfo.workflowIp:"";
		var wsIp = vmd.workspace?vmd.workspace.workflowIp:"";
		var dIp = vmdSettings?vmdSettings.workflowIp:"";
		if(isVmd)
			return dIp || "";
		else
			return proIp || wsIp || dIp || "";
	},
	getAuthIp: function(isVmd) {
		var proIp = vmd.projectInfo?vmd.projectInfo.authIp:"";
		var dIp = vmdSettings?vmdSettings.vmdAuthIp:"";
		if(isVmd)
			return dIp || "";
		else
			return proIp ||  dIp || "";
	},
	getReportIp: function(isVmd) {
		var proIp = vmd.projectInfo?vmd.projectInfo.reportIp:"";
		var dIp = vmdSettings?vmdSettings.vmdReportIp:"";
		if(isVmd)
			return dIp || "";
		else
			return proIp || dIp || "";
	},
	getGrapAasIp: function(isVmd) {
		var proIp = vmd.projectInfo?vmd.projectInfo.grapAasIp:"";
		var dIp = vmdSettings?vmdSettings.grapAasIp:"";
		if(isVmd)
			return dIp || "";
		else
			return proIp || dIp || "";
	},
	getGrapDasIp: function(isVmd) {
		var proIp = vmd.projectInfo?vmd.projectInfo.grapDasIp:"";
		var dIp = vmdSettings?vmdSettings.grapDasIp:"";
		if(isVmd)
			return dIp || "";
		else
			return proIp || dIp || "";
	},
	getMicService:function(code,isVmd)
	{		
		var proIp = vmd.projectInfo?vmd.projectInfo[code]:"";
		var dIp = vmdSettings?vmdSettings[code]:"";
		if(isVmd)
			return dIp || "";
		else
			return proIp || dIp || "";
	}
})
//----------------------------------------------------------------------------------------------------------
//-----公共函数对象---------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
if(!vmd.Array) window.vmd.Array = {}
Ext.applyIf(vmd.Array, {
	confirm: function(title, text, yesCallBack, noCallback) {
		Ext.Msg.confirm(title || "提示", text || "确定？", function(type) {
			if(type == "yes") {
				yesCallBack()
			} else {
				noCallback()
			}
		})
	}
})

//----------------------------------------------------------------------------------------------------------
//-----公共函数对象---------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
if(!vmd.Dialog) window.vmd.Dialog = {}
Ext.applyIf(vmd.Dialog, {
	confirm: function(title, text, yesCallBack, noCallback) {
		Ext.Msg.confirm(title || "提示", text || "确定？", function(type) {
			if(type == "yes") {
				yesCallBack()
			} else {
				noCallback()
			} 
		})
	}
})
//----------------------------------------------------------------------------------------------------------
//-----认证服务---------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
window.hwAuth = {}
Ext.applyIf(hwAuth, {
	login: function(host,name, pwd, success, error) {
		var hostIp=host
		if(vmdSettings.vmdAuthIp) 
			hostIp= vmdSettings.vmdAuthIp;	
		if(vmd.projectInfo && vmd.projectInfo.authIp) 
			hostIp= vmd.projectInfo.authIp;	
		if(host)
			hostIp=host	
		if(hostIp) {
			var authLogin = new HwCao(hostIp, true, 20 * 1000); //参数分别为服务器地址,是否异步,超时时间(单位ms)
			authLogin.login("", name, pwd, function(res) {
				if(success)
					success(res)
			}, function(res) {
				if(error)
					error(res)
			});
		}
	},	
	token: function(host,appid, appkey, code, success, error) {
		var hostIp=host
		if(vmdSettings.vmdAuthIp) 
			hostIp= vmdSettings.vmdAuthIp;	
		if(vmd.projectInfo && vmd.projectInfo.authIp) 
			hostIp= vmd.projectInfo.authIp;	
		if(host)	
			hostIp=host	
		if(hostIp) {
			var authLogin = new HwCao(hostIp, true, 20 * 1000); //参数分别为服务器地址,是否异步,超时时间(单位ms)
			authLogin.token(appid, appkey, code, function(res) {
				if(success)
					success(res)
			}, function(res) {
				if(error)
					error(res)
			});
		}
	},
	refresh: function(host,appid, appkey, token, success, error) {
		var hostIp=host
		if(vmdSettings.vmdAuthIp) 
			hostIp= vmdSettings.vmdAuthIp;	
		if(vmd.projectInfo && vmd.projectInfo.authIp) 
			hostIp= vmd.projectInfo.authIp;	
		if(host)	
			hostIp=host	
		if(hostIp) {
			var authLogin = new HwCao(hostIp, true, 20 * 1000); //参数分别为服务器地址,是否异步,超时时间(单位ms)
			authLogin.refresh(appid, appkey, token, function(res) {
				if(success)
					success(res)
			}, function(res) {
				if(error)
					error(res)
			});
		}
	},
	signin: function(host,appid, appkey, success, error) {
		var hostIp=host
		if(vmdSettings.vmdAuthIp) 
			hostIp= vmdSettings.vmdAuthIp;	
		if(vmd.projectInfo && vmd.projectInfo.authIp) 
			hostIp= vmd.projectInfo.authIp;	
		if(host)	
			hostIp=host	
		if(hostIp) {
			var authLogin = new HwCao(hostIp, true, 20 * 1000); //参数分别为服务器地址,是否异步,超时时间(单位ms)
			authLogin.signin(appid, appkey, function(res) {
				if(success)
					success(res)
			}, function(res) {
				if(error)
					error(res)
			});
		}
	},
	logout: function(host,hwtoken, success, error) {
		var hostIp=host
		if(vmdSettings.vmdAuthIp) 
			hostIp= vmdSettings.vmdAuthIp;	
		if(vmd.projectInfo && vmd.projectInfo.authIp) 
			hostIp= vmd.projectInfo.authIp;	
		if(host)	
			hostIp=host	
		if(hostIp) {
			var authLogin = new HwCao(hostIp, true, 20 * 1000); //参数分别为服务器地址,是否异步,超时时间(单位ms)
			authLogin.logout(hwtoken, function(res) {
				if(success)
					success(res)
			}, function(res) {
				if(error)
					error(res)
			});
		}
	},
	auth: function(host,appid,appkey,hwtoken,success, error) {
		var hostIp=host
		if(vmdSettings.vmdAuthIp) 
			hostIp= vmdSettings.vmdAuthIp;	
		if(vmd.projectInfo && vmd.projectInfo.authIp) 
			hostIp= vmd.projectInfo.authIp;	
		if(host)	
			hostIp=host	
		if(hostIp) {
			var authLogin = new HwCao(hostIp, true, 20 * 1000); //参数分别为服务器地址,是否异步,超时时间(单位ms)
			authLogin.auth(appid,appkey,hwtoken, function(res) {
				if(success)
					success(res)
			}, function(res) {
				if(error)
					error(res)
			});
		}
	}
})


//----------------------------------------------------------------------------------------------------------
//-----数据集---------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
Ext.define('vmd.data.Store', {
	extend: 'vmd.store.JsonStore',
	statics: {
		dateFormat: function(date, format) {
			return Ext.Date.dateFormat(date, format)
		},
		format: function(date, format) {
			return Ext.Date.format(date, format)
		}
	}
})
//----------------------------------------------------------------------------------------------------------
//-----行记录---------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------

Ext.define('vmd.data.Record', {
	extend: 'Ext.data.Record',
	statics: {
		dateFormat: function(date, format) {
			return Ext.Date.dateFormat(date, format)
		},
		format: function(date, format) {
			return Ext.Date.format(date, format)
		}
	}
})

//----------------------------------------------------------------------------------------------------------
//-----动态加载公共方法api---------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
//var lab = $LAB.script(bootPATH+'/design/js/ide-methods-zh-config.js')

// 全局对象-浏览器类型
Ext.applyIf(vmd,{
	isIE:Ext.isIE,
    isIE6:Ext.isIE6,
    isIE7:Ext.isIE7,
    isIE8:Ext.isIE8,
    isIE9:Ext.isIE9,
    isIE10:Ext.isIE10,
    isIE11:Ext.isIE11,
    isWebKit:Ext.isWebKit,
    isChrome:Ext.isChrome,
    chromeVersion :Ext.chromeVersion,
    firefoxVersion:Ext.firefoxVersion,
    ieVersion:Ext.ieVersion
})
// 全局对象-公共变量
Ext.apply(vmd,{
    getUserName:function () {
		return Ext.util.Cookies.get('userName')
    },
    getUserId:function () {
    	return Ext.util.Cookies.get('hwLogin')||Ext.util.Cookies.get('HWLogin')
    },
    getSysTime:function(){
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
	},
    getSysDate:function(){
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        return currentdate;
	},
    getGuid:function(num){
    	if(!num){
            return vmd.util.guid();
		}else{
           return vmd.util.randomWord(false,num);
		}
	},
	getUrlParam:function(name,isEscape){
		if(!isEscape){
			return vmd.util.getUrlParam(name)
		}else{
			return vmd.util.getUrlParam2(name)
		}
	}
})
// 全局对象-数据类型
Ext.applyIf(vmd,{
    isEmpty:Ext.isEmpty,
    isArray:Ext.isArray,
	isDate:Ext.isDate,
	isObject:Ext.isObject,
	isEmptyObject:Ext.isEmptyObject,
	isFunction:Ext.isFunction,
	isNumber:Ext.isNumber,
	isString:Ext.isString,
	isBoolean:Ext.isBoolean
})
// 全局对象-常用方法
vmd.util.apply = Ext.apply;
vmd.util.applyIf = Ext.applyIf;
vmd.util.clone = Ext.clone;
vmd.urlEncode = Ext.urlEncode;
vmd.urlDecode = Ext.urlDecode;
vmd.urlAppend = Ext.urlAppend;
vmd.util.each = Ext.each;
vmd.getDom = Ext.getDom ;
vmd.getBody = Ext.getBody;
vmd.TaskRunner = Ext.util.TaskRunner;
vmd.trim = Ext.String.trim;



// 公共函数-数组
vmd.Array = Ext.Array;
// 公共函数-日期
vmd.Date = Ext.Date;
// 公共函数-数字
vmd.Number = Ext.Number;
// 公共函数-字符串
vmd.String = Ext.String;
// 公共函数-函数
vmd.Function = Ext.Function;
// 公共函数-cookie
vmd.Cookie = (typeof Cookie!="undefined")?Cookie:{};

// 公共函数-窗口


// 公共函数-键盘操作
vmd.KeyNav = Ext.KeyNav;
vmd.KeyMap = Ext.KeyMap;

// 公共函数-json
Ext.applyIf(vmd,{
    encode:Ext.isEmpty,
    decode:Ext.decode
})
// 公共函数-Ajax


// 公共函数-集合结构（Collection）
vmd.Collection = Ext.util.MixedCollection;
// 公共函数-字段结构（Map）
vmd.Map = (typeof StringMap!="undefined")?StringMap:{};
//页面操作-Dom操作
vmd.DomHelper = Ext.DomHelper;
// 页面操作-进度条
vmd.LoadMask = Ext.LoadMask;
// 页面操作-元素操作
vmd.getElement = Ext.get;

//平台操作相关函数
vmd.webBase={};
Ext.apply(vmd.webBase,{
    //平台数据服务相对路径
    ptServer:{
        organizationInfo: '/platform/v1/organization',//单位信息服务
        userInfo: '/platform/v1/UserManage',//用户信息服务
        userPosition: '/platform/v1/positionUser',//用户岗位服务
        power: '/platform/v1/userEntList',//权限服务
        useRole: '/platform/v1/roleUser',//用户角色服务
        syslog: '/platform/v1/logs',//日志服务
        moduleInfo: '/platform/v1/moduleQuery',//模块信息服务
        modulePower:'/platform/v1/userModule', //模块权限
        functionPower:'/platform/v1/userFunction',//功能点权限
        ipLogin:"/platform/v1/ipValidate",//ip登录服务
        cache: '/platform/v1/cache'//缓存服务
    },
	
	
    //用户权限分类
    powerType:{
        module:'module',//模块
        fun:'function',//功能点
        organization:'organization',//单位
        unit:'unit',//单元
        well:'well'//单井
    },
     //日志记录操作类型
    operationType:{
        login:"login",    //登入
        logout:"logout",  //注销
        exit:"exit",      //退出
        query:"query",    //查询
        save:"save",      //保存
        'delete':"delete",  //删除
        edit:"edit",      //编辑
        print:"print",    //打印
        'import':"import",  //导入
        'export':"export"   //导出
    },
    //日志类型
    logType:{
        info:"info",  //信息
        debug:"debug",//调试
        warn:"warn",  //警告
        error:"error",//错误
        fatal:"fatal"  //致命bug
    },
        //通用hwdas请求处理方法
	autoHwDas:function(method,urlconfig,headers,params,callback){
			var model = {}
			if(method.toUpperCase()=="GET"){
				hwDas.get(urlconfig,headers,params,
				function(result){
					if(result&&result.isSucceed){
						   if(result.data[0].size==0){
									result.isSucceed=false;
									result.errCode="nodata";
									result.errMsg="没有获取到数据";
								}
							   
								/*给对象赋值*/
								if(result.data[0].size>0){
                                                                       
									model=[].concat(result.data[0].datas);
                                                                        
								}
						   
					   }
					 if(callback&&typeof callback==="function"){
						 callback(result,model);
					 }
				},
				function(msg){
					var res = {
						 isSucceed:false,
						 errCode:"error",
						 errMsg:msg,
						 token:""
					 };
					 if(callback&&typeof callback==="function"){
						 callback(res,model);
					 }
				})
			}
	},
		//平台验证
	loginByParam:function(login,passwd,callback){
		model={};
		hwDas.call("get", {host:vmd.workspace.dataServiceIp,url:"login",type:"ssodas"}, {}, { login: login, password: passwd }, {}, function(result){
			if(result&&result.isSucceed){
				/*给用户对象赋值*/
				if(result.user){
					model.name=result.user.name;
					model.login=result.user.login;
				}
			}
			if(callback&&typeof callback==="function"){
				callback(result,model);
			}
		}, function(msg){
			var res = {
				isSucceed:false,
				errCode:"error",
				errMsg:msg,
				token:""
			};
			if(callback&&typeof callback==="function"){
				callback(res,model);
			}
		});   
	},
    //平台IP验证
    //loginByIP:function(callback){
     //   this.autoHwDas("get",{host:vmd.workspace.dataServiceIp,url:vmd.webBase.ptServer.ipLogin},{},{},callback);
    //},
    //获取用户信息
    getUserInfo:function(callback){
        this.autoHwDas("get",{host:vmd.workspace.dataServiceIp,url:vmd.webBase.ptServer.userInfo},{},{},callback);
    },
    //获取单位信息
    getUnitInfo:function(dwdm,callback){
		this.autoHwDas("get",{host:vmd.workspace.dataServiceIp,url:vmd.webBase.ptServer.organizationInfo},{},{dwdm: dwdm},callback);
    },
    //获取模块信息
    getModuleInfo:function(moduleid,moduleurl,callback){
		this.autoHwDas("get",{host:vmd.workspace.dataServiceIp,url:vmd.webBase.ptServer.moduleInfo},{},{mmoduleid:moduleid,moduleurl:moduleurl},callback);
    },
    //获取当前用户角色权限
    getUserRoleInfo:function(callback){
		this.autoHwDas("get",{host:vmd.workspace.dataServiceIp,url:vmd.webBase.ptServer.useRole},{},{operationtype:"user"},callback);
    },
    //获取当前用户岗位权限
    getUserPositionInfo:function(callback){
        this.autoHwDas("get",{host:vmd.workspace.dataServiceIp,url:vmd.webBase.ptServer.userPosition},{},{},callback);
    },
    //模块权限判断
    powerCheck:function(moduleid,callback){
        var params={};
        params.mmoduleid = moduleid;
        moduleid = moduleid || "";
        if(vmd.trim(moduleid).length==0){
             params.moduleurl = decodeURI(window.location.pathname); 
        }else{
            params.moduleurl ="";
        }
		this.autoHwDas("get",{host:vmd.workspace.dataServiceIp,url:vmd.webBase.ptServer.modulePower},{},params,callback);
    },
    //子功能权限判断
    powerCheckSubModule:function(moduleid,functionname,callback){
          var params={};
        params.mmoduleid = moduleid;
        moduleid = moduleid || "";
        if(vmd.trim(moduleid).length==0){
             params.moduleurl = decodeURI(window.location.pathname); 
        }else{
            params.moduleurl ="";
        }
        params.functionname = functionname;
		this.autoHwDas("get",{host:vmd.workspace.dataServiceIp,url:vmd.webBase.ptServer.functionPower},{},params,callback);
    },
    //获取用户权限
    getUserPower:function(powertype,callback){
        powertype = powertype || vmd.webBase.powerType.module;
        this.autoHwDas("get",{host:vmd.workspace.dataServiceIp,url:vmd.webBase.ptServer.power},{},{powertype:powertype},callback); 
    },
    //系统日志
    syslog:function(loginfo,logtype,operationtype,callback){
        var paras={
                    logtype:logtype,
                    operationtype:operationtype,
                    content:loginfo
                };
        this.autoHwDas("post",{host:vmd.workspace.dataServiceIp,url:vmd.webBase.ptServer.syslog},{},paras,callback);
        //传递参数
        var paras={
            logtype:logtype,
            operationtype:operationtype,
            content:loginfo
        };

        hwDas.add({host:vmd.workspace.dataServiceIp,url:vmd.webBase.ptServer.syslog}, {}, {}, paras,function(res){
            if(callback&&typeof callback==="function"){
				callback(res);
			}
        },function(res){    /*失败回调函数*/
            var res = {
				isSucceed:false,
				errCode:"error",
				errMsg:msg,
				token:""
			};
			if(callback&&typeof callback==="function"){
				callback(res);
			}
        });
    }
})
//----------------------------------------------------------------------------------------------------------
//-----动态加载公共方法api---------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
//var lab = $LAB.script(bootPATH+'/design/js/ide-methods-zh-config.js')