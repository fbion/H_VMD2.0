/*
@filename:ide-methods-zh-config.js   //脚本文件名
@Copyright (c) 2017-2018 汉威公司技术研究院   //版权说明
@describe: 组件公共方法，ace自动关联     //脚本功能描述
@major version:2.0.3      //主版本号  vmd的主版本号
@revision version:18.1112      //修订版本号   问题修改、bug修复的版本递增    年.月日
@owner:vmd     //所属分类   此处为 vmd 报表  曲线  工作流   消息中心  数据服务 等。
@creater:成兵   //创建人
@created date:2017-06-12   //创建日期
@editer:成兵    //修改人
@edited date:2018-11-12  //修改日期
@repair:扩展工作流组件的方法，增加启动提交 方法，实现待办写入消息中心    //修复的问题     此处只填写最新的修复问题，同时要将修复的问题及版本更新到更新列表中
@exp:该文件不定时更新,不允许擅自修改,有问题,反馈后统一修改  //说明
*/

var publicMethodsType = {
	fun: "fun",// 方法
	Category: "Category",// 分类
	pro: "pro",// 属性
	pbVar: "pbvar" //
}
//创建 方法api类对象
var publicMethods = {
	text: "vmd2.0",
	value: {},
	name: "vmd",
	Class: "vmd",
	type: publicMethodsType.Category,
	items: {}
}
var allPublicMethods = publicMethods
//----------------------------------------------------------------------------------------
//创建全局参数分类----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//创建 方法api类- 全局参数 -对象
var globalArgsRoot = {
	text: "全局对象",
	value: {},
	// name: "GlobalArgs",
    name: "",
	Class: "",
	type: publicMethodsType.Category,
	parent: publicMethods,
	items: {}
};
//将全局对象添加到主分类下
publicMethods.items["GlobalArgs"] = globalArgsRoot;


//创建微服务公共函数分类
var globalArgsRoot_MicService = {
	text: "微服务",
	value: {},
	// name: "Common",
    name: "",
	Class: "MicService",
	type: publicMethodsType.Category,
	parent: globalArgsRoot,
	items: {}
}
//添加分类
globalArgsRoot.items["MicService"] = globalArgsRoot_MicService;


// 创建 方法api类- 全局参数 -对象
var globalArgsRoot_Browser = {
	text: "浏览器类型",
	value: {},
	// name: "Browser",
    name: "",
	Class: "",
	type: publicMethodsType.Category,
	parent: globalArgsRoot,
	items: {}
};
globalArgsRoot.items["Browser"] = globalArgsRoot_Browser;

//创建 方法api类- 全局参数 -对象
var globalArgsRoot_Variable = {
    text: "公共变量",
    value: {},
    // name: "Variable",
    name: "",
    Class: "",
    type: publicMethodsType.Category,
    parent: globalArgsRoot,
    items: {}
};
globalArgsRoot.items["Variable"] = globalArgsRoot_Variable;

//创建 方法api类- 全局参数 -对象
var globalArgsRoot_Data = {
	text: "数据类型",
	value: {},
	name: "",
	Class: "",
	type: publicMethodsType.Category,
	parent: globalArgsRoot,
	items: {}
};
globalArgsRoot.items["Data"] = globalArgsRoot_Data;

//创建 方法api类- 全局参数 -对象
var globalArgsRoot_Fun = {
	text: "常用方法",
	value: {},
	// name: "Fun",
    name: "",
	Class: "",
	type: publicMethodsType.Category,
	parent: globalArgsRoot,
	items: {}
};
//添加耳机分类
globalArgsRoot.items["Fun"] = globalArgsRoot_Fun;

//----------------------------------------------------------------------------------------
//创建公共函数分类----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//创建 方法api类- 公共函数 -对象
var commonRoot = {
	text: "公共函数",
	value: {},
	// name: "Common",
    name: "",
	Class: "",
	type: publicMethodsType.Category,
	parent: publicMethods,
	items: {}
}
//添加耳机分类
publicMethods.items["Common"] = commonRoot;

//创建 方法api类- 公共函数 /弹框-对象
var commonRoot_Array = {
	text: "数组",
	value: {},
	name: "Array",
	Class: "Array",
	type: publicMethodsType.Category,
	parent: commonRoot,
	items: {}
}
commonRoot.items["Array"] = commonRoot_Array;

//创建 方法api类- 公共函数 /日期-对象
var commonRoot_Date = {
	text: "日期",
	value: {},
	name: "Date",
	Class: "Date",
	type: publicMethodsType.Category,
	parent: commonRoot,
	items: {}
}
commonRoot.items["Date"] = commonRoot_Date;

//创建 方法api类- 公共函数 /字符-对象
var commonRoot_String = {
	text: "字符",
	value: {},
	name: "String",
	Class: "String",
	type: publicMethodsType.Category,
	parent: commonRoot,
	items: {}
}
commonRoot.items["String"] = commonRoot_String;

//创建 方法api类- 公共函数 /字符-对象
var commonRoot_Num = {
	text: "数字",
	value: {},
	name: "Number",
	Class: "Number",
	type: publicMethodsType.Category,
	parent: commonRoot,
	items: {}
}
commonRoot.items["Number"] = commonRoot_Num;

//创建 方法api类- 公共函数 /字符-对象
var commonRoot_Function = {
	text: "函数",
	value: {},
	name: "Function",
	Class: "Function",
	type: publicMethodsType.Category,
	parent: commonRoot,
	items: {}
}
commonRoot.items["Function"] = commonRoot_Function;

//创建 方法api类- 公共函数 /字符-对象
var commonRoot_Cookie = {
	text: "缓存",
	value: {},
	name: "Cookie",
	Class: "Cookie",
	type: publicMethodsType.Category,
	parent: commonRoot,
	items: {}
}
commonRoot.items["Cookie"] = commonRoot_Cookie;

//创建 方法api类- 公共函数 /字符-对象
var commonRoot_Window = {
	text: "窗口",
	value: {},
	name: "Window",
	Class: "",
	type: publicMethodsType.Category,
	parent: commonRoot,
	items: {}
}
commonRoot.items["Window"] = commonRoot_Window;

//创建 方法api类- 公共函数 /字符-对象
var commonRoot_KeyMap = {
	text: "键盘操作",
	value: {},
	name: "KeyMap",
	Class: "",
	type: publicMethodsType.Fun,
	parent: commonRoot,
	items: {}
}
commonRoot.items["KeyMap"] = commonRoot_KeyMap;

//创建 方法api类- 公共函数 /字符-对象
var commonRoot_Json = {
	text: "Json",
	value: {},
	name: "Json",
	Class: "",
	type: publicMethodsType.Category,
	parent: commonRoot,
	items: {}
}
commonRoot.items["Json"] = commonRoot_Json;

//创建 方法api类- 公共函数 /字符-对象
var commonRoot_Ajax = {
	text: "Ajax",
	value: {},
	name: "Ajax",
	Class: "",
	type: publicMethodsType.Category,
	parent: commonRoot,
	items: {}
}
commonRoot.items["Ajax"] = commonRoot_Ajax;

//创建 方法api类- 公共函数 /字符-对象
var commonRoot_Collection = {
	text: "集合结构",
	value: {},
	name: "Collection",
	Class: "Collection",
	type: publicMethodsType.Category,
	parent: commonRoot,
	items: {}
}
commonRoot.items["Collection"] = commonRoot_Collection;

//创建 方法api类- 公共函数 /字符-对象
var commonRoot_Map = {
	text: "字典结构",
	value: {},
	name: "Map",
	Class: "",
	type: publicMethodsType.Category,
	parent: commonRoot,
	items: {}
}
commonRoot.items["Map"] = commonRoot_Map;

//创建 方法api类- 公共函数 /曲线 -对象
var commonRoot_Chart = {
	text: "曲线对象",
	value: {},
	name: "Chart",
	Class: "",
	type: publicMethodsType.Category,
	parent: commonRoot,
	items: {}
}
commonRoot.items["Chart"] = commonRoot_Chart;

//创建 方法api类- 公共函数 /其他 -对象
var commonRoot_Utils = {
	text: "其他",
	value: {},
	name: "Utils",
	Class: "",
	type: publicMethodsType.Category,
	parent: commonRoot,
	items: {}
}
commonRoot.items["Utils"] = commonRoot_Utils;

//----------------------------------------------------------------------------------------------------------------------


//创建微服务中心
var micService={
	text: "微服务",
	value: {},
    name: "MicService",
	Class: "",
	type: publicMethodsType.Category,
	items: {}
};
var allMicService= micService;













//----------------------------------------------------------------------------------------
//创建数据服务分类----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//创建 方法api类- 全局参数 -对象
var serviceRoot = {
	text: "数据服务",
	value: {},
    name: "",
	Class: "hwDas",
	parent:allMicService,
	type: publicMethodsType.Category,
	items: {}
};
allMicService.items["hwDas"] = serviceRoot;

//创建 方法api类- 全局参数 -对象
var serviceRoot_User = {
	text: "用户验证",
	value: {},
	name: "User",
	Class: "",
	type: publicMethodsType.Category,
	parent: serviceRoot,
	items: {}
};
serviceRoot.items["User"] = serviceRoot_User;

var serviceRoot_Data = {
	text: "数据操作",
	value: {},
	name: "Data",
	Class: "",
	type: publicMethodsType.Category,
	parent: serviceRoot,
	items: {}
};
serviceRoot.items["Data"] = serviceRoot_Data;

var serviceRoot_File = {
	text: "文件操作",
	value: {},
	name: "File",
	Class: "",
	type: publicMethodsType.Category,
	parent: serviceRoot,
	items: {}
};
serviceRoot.items["File"] = serviceRoot_File;

//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
//创建工作流分类----------------------------------------------------------------------------------------
var workFlowRoot = {
	text: "流程中心",
	value: {},
    name: "hwWorkFlow",
	Class: "",
	parent: allMicService,
	type: publicMethodsType.Category,
	items: {}
};
allMicService.items["workFlow"]= workFlowRoot;
//----------------------------------------------------------------------------------------
//创建消息中心分类----------------------------------------------------------------------------------------
var messageCenterRoot = {
    text: "消息中心",
    value: {},
    name: "hwMSC",
    Class: "",
	parent: allMicService,
    type: publicMethodsType.Category,
    items: {}
};
allMicService.items["hwMSC"] = messageCenterRoot;
//认证中心
var authRoot = {
	text: "认证中心",
	value: {},
	name: "",
	Class: "",
	parent: allMicService,
	type: publicMethodsType.Category,
	items: {}
};
allMicService.items["hwAuth"]   = authRoot;
//待办中心
var hwTDCRoot = {
	text: "待办中心",
	value: {},
	name: "hwTDC",
	Class: "",
	parent: allMicService,
	type: publicMethodsType.Category,
	items: {}
};
allMicService.items["hwTDC"]   = hwTDCRoot;
//日志中心
var hwLGCRoot = {
	text: "日志中心",
	value: {},
	name: "hwLGC",
	Class: "",
	parent: allMicService,
	type: publicMethodsType.Category,
	items: {}
};
allMicService.items["hwLGC"]   = hwLGCRoot;
//文档中心
var hwDMCRoot = {
	text: "文档中心",
	value: {},
	name: "hwDMC",
	Class: "",
	parent: allMicService,
	type: publicMethodsType.Category,
	items: {}
};
allMicService.items["hwDMC"]   = hwDMCRoot;

var hwDMCRoot_DocInfo = {
	text: "文档操作",
	value: {},
	name: "",
	Class: "",
	parent: hwDMCRoot,
	type: publicMethodsType.Category,
	items: {}
};
hwDMCRoot.items["DocInfo"]   = hwDMCRoot_DocInfo;

//用户中心
var hwUMCRoot = {
	text: "用户中心",
	value: {},
	name: "hwUMC",
	Class: "",
	parent: allMicService,
	type: publicMethodsType.Category,
	items: {}
};
allMicService.items["hwUMC"]   = hwUMCRoot;
//权限中心
var hwEMCRoot = {
	text: "权限中心",
	value: {},
	name: "hwEMC",
	Class: "",
	parent: allMicService,
	type: publicMethodsType.Category,
	items: {}
};
allMicService.items["hwEMC"]   = hwEMCRoot;
//应用中心
var hwAMCRoot = {
	text: "应用中心",
	value: {},
	name: "hwAMC",
	Class: "",
	parent: allMicService,
	type: publicMethodsType.Category,
	items: {}
};
allMicService.items["hwAMC"]   = hwAMCRoot;
//----------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//创建页面操作分类----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//创建 方法api类- 组件函數  -对象
var pageRoot = {
	text: "页面操作",
	value: {},
	// name: "Page",
    name: "",
	Class: "",
	type: publicMethodsType.Category,
	parent: publicMethods,
	items: {}
};
//添加耳机分类
publicMethods.items["Page"] = pageRoot;

var pageRoot_Data = {
	text: "数据操作",
	value: {},
	name: "Data",
	Class: "",
	type: publicMethodsType.Category,
	parent: pageRoot,
	items: {}
};
pageRoot.items["data"] = pageRoot_Data;

var pageRoot_Load = {
	text: "进度条",
	value: {},
	name: "Load",
	Class: "",
	type: publicMethodsType.Category,
	parent: pageRoot,
	items: {}
};
pageRoot.items["Load"] = pageRoot_Load;

var pageRoot_Tree = {
    text: "树操作",
    value: {},
    name: "Tree",
    Class: "",
    type: publicMethodsType.Category,
    parent: pageRoot,
    items: {}
};
pageRoot.items["Tree"] = pageRoot_Tree;

var pageRoot_TreeNode = {
    text: "树节点操作",
    value: {},
    name: "TreeNode",
    Class: "",
    type: publicMethodsType.Category,
    parent: pageRoot,
    items: {}
};
pageRoot.items["TreeNode"] = pageRoot_TreeNode;

var pageRoot_Element = {
    text: "元素操作",
    value: {},
    name: "Element",
    Class: "",
    type: publicMethodsType.Category,
    parent: pageRoot,
    items: {}
};
pageRoot.items["Element"] = pageRoot_Element;

var pageRoot_Dom = {
	text: "dom操作",
	value: {},
	name: "DomHelper",
	Class: "DomHelper",
	type: publicMethodsType.Category,
	parent: pageRoot,
	items: {}
};
pageRoot.items["DomHelper"] = pageRoot_Dom;
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------
 //创建平台操作函数分类------------------------------------------------
   //--------------------------------------------------------------------
   //创建方法api类  平台操作 对象
   var platformRoot = {
    text:"平台操作",
    value:"",
    name:"",
    Class:"webBase",
    type:publicMethodsType.Category,
    parent:publicMethods,
    items:{}
}
//添加平台操作对象到全局对象
publicMethods.items["Platform"] = platformRoot;

var platformRoot_Auth = {
    text:"平台认证",
    value:{},
    name:"",
    Class:"",
    type:publicMethodsType.Category,
    parent:platformRoot,
    items:{}
}
platformRoot.items["Auth"]=platformRoot_Auth;

var platformRoot_User ={
    text:"用户操作",
    value:{},
    name:"",
    Class:"",
    type:publicMethodsType.Category,
    parent:platformRoot,
    items:{}
}
 platformRoot.items["User"]= platformRoot_User;

 var platformRoot_Unit ={
    text:"单位操作",
    value:{},
    name:"",
    Class:"",
    type:publicMethodsType.Category,
    parent:platformRoot,
    items:{}
}
 platformRoot.items["Unit"]= platformRoot_Unit;
 
 var platformRoot_Module ={
    text:"模块操作",
    value:{},
    name:"",
    Class:"",
    type:publicMethodsType.Category,
    parent:platformRoot,
    items:{}
}
 platformRoot.items["Module"]= platformRoot_Module;

   var platformRoot_Power ={
    text:"权限操作",
    value:{},
    name:"",
    Class:"",
    type:publicMethodsType.Category,
    parent:platformRoot,
    items:{}
}
 platformRoot.items["Power"]= platformRoot_Power;

 var platformRoot_Log ={
    text:"日志操作",
    value:{},
    name:"",
    Class:"",
    type:publicMethodsType.Category,
    parent:platformRoot,
    items:{}
}
 platformRoot.items["Log"]= platformRoot_Log;



//----------------------------------------------------------------------------------------------------------------------------------

//添加方法api到具体的分类对象中
function addFunc(b,a) {
	if(!a.splice) {
		a = [a]
	}
	Ext.each(a,function(e,d) {
		var c = b.items || {};
		if(e!=null)
		{
		c[e.name] = e;
		e.parent = b;
		b.items = c;
		if(e.value !== undefined) {
			exposeFunc(e)
		}}
	})
}

function exposeFunc(e,f) {
	var d = e.parent,
		b = [],
		c = f || e.value;
	while(d) {
		b.push(d.name);
		d = d.parent
	}
	var g = window;
	b.reverse();
	b.push(e.name);
	b = b.join(".").split(".");
	var a = b.splice(-1,1)[0];
	Ext.each(b,function(j,h) {
		if(!j) {
			return true
		}
		if(!g[j]) {
			g[j] = {}
		}
		g = g[j]
	});
	//g[a] = c
}

//设置api显示的样式效果
function getFormatComment(b,d,e,a) {
	var c = " <pre class='pre' style='margin: 0'>" +
        "<h3 class='name' style='margin: 0;padding: 5px 0;color: #000'>语法</h3>" +
        "<div class='code' style='font-size: 12px;white-space: pre-wrap;font-family: Menlo;line-height: 16px;padding-left: 5px'>" + b + "</div>" +
        "</pre> <pre class='pre' style='margin: 0;'>" +
        "<h3 class='name' style='margin: 0;padding: 5px 0;color: #000''>说明</h3>" +
        "<div class='code' style='font-size: 12px;white-space: pre-wrap;font-family: Menlo;line-height: 16px;padding-left: 5px'>" + d + "</div></pre> " +
        "<pre class='pre' style='margin: 0;'>" +
        "<h3 class='name' style='margin: 0;padding: 5px 0'>参数</h3>"+
        "<div class='code' style='font-size: 12px;white-space: pre-wrap;font-family: Menlo;line-height: 16px;padding-left: 5px'>"
        e.forEach(function(item,index){
            c+="<div style='margin-bottom:8px'>* "+item+"</div>"
        })
        c+="</div></pre> " +
        "<pre class='pre example' style='margin: 0;'>" +
        "<h3 class='name' style='margin: 0;padding: 5px 0'>示例</h3>" +
        "<div class='code' style='font-size: 12px;white-space: pre-wrap;padding-bottom:10px;color:blue; font-family: Menlo;line-height: 16px;padding-left: 5px'>" + a + "</div>" +
        "</pre>";
	return c
}

//publicMethods----------------------------------------------------------------------------------------------------------------------
//publicMethods----------------------------------------------------------------------------------------------------------------------
//publicMethods----------------------------------------------------------------------------------------------------------------------
//添加到主分类publicMethods下
addFunc(publicMethods,[]);

//globalArgsRoot----------------------------------------------------------------------------------------------------------------------
//globalArgsRoot----------------------------------------------------------------------------------------------------------------------
//globalArgsRoot----------------------------------------------------------------------------------------------------------------------
//添加到主分类-全局参数下
addFunc(globalArgsRoot,[]);

//globalArgsRoot/globalArgsRoot_Variable----------------------------------------------------------------------------------------------------------------------
//globalArgsRoot/globalArgsRoot_Variable----------------------------------------------------------------------------------------------------------------------
//globalArgsRoot/globalArgsRoot_Variable----------------------------------------------------------------------------------------------------------------------
//添加到主分类-全局参数-公共变量下
addFunc(globalArgsRoot_Variable,[{
    text: "相对路径",
    name: "bootPATH",
    Class: "bootPATH",
    insert:"\n var url=vmd.bootPATH; ",
    comment: getFormatComment("bootPATH",
        "网站的相对路径",
        [],
        "var url=vmd.bootPATH;"),
    value: {},
    type: publicMethodsType.pro
},{
    text: "虚拟目录",
    name: "virtualPath",
    Class: "virtualPath",
    insert:"\n var url=vmd.virtualPath; ",
    comment: getFormatComment("virtualPath",
        "网站的虚拟目录",
        [],
        "var url=vmd.virtualPath;"),
    value: {},
    type: publicMethodsType.pro
},{
    text: "获取用户名",
    name: "getUserName",
    Class: "getUserName",
    insert:"\n // 获取用户名 \n" +
        " var name=vmd.getUserName(); ",
    comment: getFormatComment("getUserName",
        "获取用户名",
        ["return String"],
        "<span class='heightlight'>vmd.getUserName()</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取用户id",
    name: "getUserId",
    Class: "getUserId",
    insert:"\n // 获取用户id \n" +
    " var id=vmd.getUserId(); ",
    comment: getFormatComment("vmd.getUserId",
        "获取用户名",
        ["return String"],
        "<span class='heightlight'>vmd.getUserId()</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取当前日期(date)",
    name: "getSysTime",
    Class: "getSysTime",
    insert:"\n // 获取当前日期 \n" +
        " var date=vmd.getSysTime(); ",
    comment: getFormatComment("getUserName",
        "获取当前日期(date)",
        ["return {String} "],
        "<span class='heightlight'>vmd.getSysTime()</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取当前日期（年月日）",
    name: "getSysDate",
    Class: "getSysDate",
    insert:"\n // 获取当前日期（年月日） \n" +
        " var date=vmd.getSysDate(); ",
    comment: getFormatComment("getSysDate",
        "获取当前日期（年月日）",
        ["return {String}"],
        "<span class='heightlight'>vmd.getSysDate()</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "记录id",
    name: "getGuid",
    Class: "getGuid",
    insert:"\n // 随机生成一个记录id \n" +
    " var id=vmd.getGuid(); ",
    comment: getFormatComment("getGuid",
        "随机生成一个记录id",
        ["{number} len (optional) 生成的指定长度，len为空默认生产一个36位guid",
        "return String 生成的记录id"],
        "<span class='heightlight'> var id=vmd.getGuid()</span>"),
    value: {},
    type: publicMethodsType.fun
}]);

//globalArgsRoot/globalArgsRoot_MicService----------------------------------------------------------------------------------------------------------------------
//添加到主分类-全局参数-微服务下
addFunc(globalArgsRoot_MicService,[{
    text: "获取数据服务地址",
    name: "getDasIp",
    Class: "getDasIp",
    insert: "// 获取应用服务地址 \n" +
    "var dasIp=vmd.MicService.getDasIp();",
    comment: getFormatComment("getDasIp",
        "获取数据服务地址",
        ["return string"],
        "<span class='heightlight'>vmd..MicService.getDasIp()</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取文档服务地址",
    name: "getDMCIp",
    Class: "getDMCIp",
    insert: "// 获取文档服务地址 \n" +
    "var DMCIp=vmd.MicService.getDMCIp();",
    comment: getFormatComment("getDMCIp",
        "获取文档服务地址",
        ["return string"],
        "<span class='heightlight'>vmd..MicService.getDMCIp()</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取应用服务地址",
    name: "getAMCIp",
    Class: "getAMCIp",
    insert: "// 获取应用服务地址 \n" +
    "var AMCIp=vmd.MicService.getAMCIp();",
    comment: getFormatComment("getAMCIp",
        "获取应用服务地址",
        ["return string"],
        "<span class='heightlight'>vmd..MicService.getAMCIp()</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取权限服务地址",
    name: "getEMCIp",
    Class: "getEMCIp",
    insert: "// 获取权限服务地址 \n" +
    "var EMCIp=vmd.MicService.getEMCIp();",
    comment: getFormatComment("getEMCIp",
        "获取权限服务地址",
        ["return string"],
        "<span class='heightlight'>vmd..MicService.getEMCIp()</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取日志中心服务地址",
    name: "getLGCIp",
    Class: "getLGCIp",
    insert: "// 获取日志中心服务地址 \n" +
    "var LGCIp=vmd.MicService.getLGCIp();",
    comment: getFormatComment("getLGCIp",
        "获取日志中心服务地址",
        ["return string"],
        "<span class='heightlight'>vmd..MicService.getLGCIp()</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取消息中心服务地址",
    name: "getMSCIp",
    Class: "getMSCIp",
    insert: "// 获取消息中心服务地址 \n" +
    "var MSCIp=vmd.MicService.getMSCIp();",
    comment: getFormatComment("getMSCIp",
        "获取消息中心服务地址",
        ["return string"],
        "<span class='heightlight'>vmd..MicService.getMSCIp()</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取待办中心服务地址",
    name: "getTDCIp",
    Class: "getTDCIp",
    insert: "// 获取待办中心服务地址 \n" +
    "var TDCIp=vmd.MicService.getTDCIp();",
    comment: getFormatComment("getTDCIp",
        "获取待办中心服务地址",
        ["return string"],
        "<span class='heightlight'>vmd..MicService.getTDCIp()</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取用户中心服务地址",
    name: "getUMCIp",
    Class: "getUMCIp",
    insert: "// 获取用户中心服务地址 \n" +
    "var UMCIp=vmd.MicService.getUMCIp();",
    comment: getFormatComment("getUMCIp",
        "获取用户中心服务地址",
        ["return string"],
        "<span class='heightlight'>vmd..MicService.getUMCIp()</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取流程中心服务地址",
    name: "getWorkFlowIp",
    Class: "getWorkFlowIp",
    insert: "// 获取流程中心服务地址 \n" +
    "var wfIp=vmd.MicService.getWorkFlowIp();",
    comment: getFormatComment("getWorkFlowIp",
        "获取流程中心服务地址",
        ["return string"],
        "<span class='heightlight'>vmd..MicService.getWorkFlowIp()</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取认证服务地址",
    name: "getAuthIp",
    Class: "getAuthIp",
    insert: "// 获取认证服务地址 \n" +
    "var authIp=vmd.MicService.getAuthIp();",
    comment: getFormatComment("getAuthIp",
        "获取认证服务地址",
        ["return string"],
        "<span class='heightlight'>vmd..MicService.getAuthIp()</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取报表中心服务地址",
    name: "getReportIp",
    Class: "getReportIp",
    insert: "// 获取报表中心服务地址 \n" +
    "var reportIp=vmd.MicService.getReportIp();",
    comment: getFormatComment("getReportIp",
        "获取报表中心服务地址",
        ["return string"],
        "<span class='heightlight'>vmd..MicService.getReportIp()</span>"),
    value: {},
    type: publicMethodsType.fun
}])
//globalArgsRoot/globalArgsRoot_Browser----------------------------------------------------------------------------------------------------------------------
//添加到主分类-全局参数-浏览器类型下
addFunc(globalArgsRoot_Browser,[{
    text: "是否为IE",
    name: "isIE",
    Class: "isIE",
    insert: "// 判断是否为IE浏览器 \n" +
    "var isIE=vmd.isIE; ",
    comment: getFormatComment("isIE",
        "是否为IE",
        ["return Boolean"],
        "<span class='heightlight'>vmd.isIE</span>"),
    value: {},
    type: publicMethodsType.pro
},{
    text: "是否为IE6",
    name: "isIE6",
    Class: "isIE6",
    insert:"\n // 判断是否为IE6浏览器 \n" +
    " var isIE6=vmd.isIE6; ",
    comment: getFormatComment("isIE6",
        "是否为IE6",
        ["return Boolean"],
        "<span class='heightlight'>vmd.isIE6</span>"),
    value: {},
    type: publicMethodsType.pro
},{
    text: "是否为IE7",
    name: "isIE7",
    Class: "isIE7",
    insert:"\n // 判断是否为IE7浏览器 \n" +
    " var isIE7=vmd.isIE7; ",
    comment: getFormatComment("isIE7",
        "是否为IE7",
        ["return Boolean"],
        "<span class='heightlight'>vmd.isIE7</span>"),
    value: {},
    type: publicMethodsType.pro
},{
    text: "是否为IE8",
    name: "isIE8",
    Class: "isIE8",
    insert:"\n // 判断是否为IE8浏览器 \n" +
    " var isIE8=vmd.isIE8; ",
    comment: getFormatComment("isIE8",
        "是否为IE8",
        ["return Boolean"],
        "<span class='heightlight'>vmd.isIE8</span>"),
    value: {},
    type: publicMethodsType.pro
},{
    text: "是否为IE9",
    name: "isIE9",
    Class: "isIE9",
    insert:"\n // 判断是否为IE9浏览器 \n" +
    " var isIE9=vmd.isIE9; ",
    comment: getFormatComment("isIE9",
        "是否为IE9",
        ["return Boolean"],
        "<span class='heightlight'>vmd.isIE9</span>"),
    value: {},
    type: publicMethodsType.pro
},{
    text: "是否为IE10",
    name: "isIE10",
    Class: "isIE10",
    insert:"\n // 判断是否为IE10浏览器 \n" +
    " var isIE10=vmd.isIE10; ",
    comment: getFormatComment("isIE10",
        "是否为IE10",
        ["return Boolean"],
        "<span class='heightlight'>vmd.isIE10</span>"),
    value: {},
    type: publicMethodsType.pro
},{
    text: "是否为IE11",
    name: "isIE11",
    Class: "isIE11",
    insert:"\n // 判断是否为IE11浏览器 \n" +
    " var isIE11=vmd.isIE11; ",
    comment: getFormatComment("isIE11",
        "是否为IE11",
        ["return Boolean"],
        "<span class='heightlight'>vmd.isIE11</span>"),
    value: {},
    type: publicMethodsType.pro
},{
    text: "是否WebKit内核",
    name: "isWebKit",
    Class: "isWebKit",
    insert:"\n // 判断是否为WebKit内核浏览器 \n" +
    " var isWebKit=vmd.isWebKit; ",
    comment: getFormatComment("isWebKit",
        "是否WebKit内核",
        ["return Boolean"],
        "<span class='heightlight'>vmd.isWebKit</span>"),
    value: {},
    type: publicMethodsType.pro
},{
    text: "是否谷歌浏览器",
    name: "isChrome",
    Class: "isChrome",
    insert:"\n // 判断是否为谷歌浏览器 \n" +
    " var isChrome=vmd.isChrome; ",
    comment: getFormatComment("isChrome",
        "是否谷歌浏览器",
        ["return Boolean"],
        "<span class='heightlight'>vmd.isChrome</span>"),
    value: {},
    type: publicMethodsType.pro
},{
    text: "谷歌浏览器版本",
    name: "chromeVersion",
    Class: "chromeVersion",
    insert:"\n // 谷歌浏览器版本 \n" +
    " var chromeVersion=vmd.chromeVersion; ",
    comment: getFormatComment("chromeVersion",
        "谷歌浏览器版本",
        ["return String"],
        "<span class='heightlight'>vmd.chromeVersion</span>"),
    value: {},
    type: publicMethodsType.pro
},{
    text: "火狐浏览器版本",
    name: "firefoxVersion",
    Class: "firefoxVersion",
    insert:"\n // 火狐浏览器版本 \n" +
    " var firefoxVersion=vmd.firefoxVersion; ",
    comment: getFormatComment("firefoxVersion",
        "火狐浏览器版本",
        ["return String"],
        "<span class='heightlight'>vmd.firefoxVersion</span>"),
    value: {},
    type: publicMethodsType.pro
},{
    text: "ie浏览器版本",
    name: "ieVersion",
    Class: "ieVersion",
    insert:"\n// IE浏览器版本 \n" +
    " var ieVersion=vmd.ieVersion; ",
    comment: getFormatComment("ieVersion",
        "ie浏览器版本",
        ["return String"],
        "<span class='heightlight'>vmd.ieVersion</span>"),
    value: {},
    type: publicMethodsType.pro
}]);

//globalArgsRoot/globalArgsRoot_Data----------------------------------------------------------------------------------------------------------------------
//globalArgsRoot/globalArgsRoot_Data----------------------------------------------------------------------------------------------------------------------
//globalArgsRoot/globalArgsRoot_Data----------------------------------------------------------------------------------------------------------------------
//添加到主分类-全局参数-数据类型下
addFunc(globalArgsRoot_Data,[{
    text: "为空判断",
    name: "isEmpty",
    Class: "isEmpty",
    insert:"\n // 判断传入的值是否为空 \n" +
        " var isEmpty=vmd.isEmpty(value); ",
    comment: getFormatComment("isEmpty",
        "判断值是否为空",
        ["{Mixed} value",
        "return {Boolean}"],
        "<span class='heightlight'>vmd.isEmpty('')</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "数组判断",
    name: "isArray",
    Class: "isArray",
    insert:"\n // 判断传入的值是否为数组 \n" +
        " var isArray=vmd.isArray(value); ",
    comment: getFormatComment("isArray",
        "判断是否为数组",
        ["{Mixed} value",
        "return {Boolean}"],
        "<span class='heightlight'>vmd.isArray([1,2])</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "日期判断",
    name: "isDate",
    Class: "isDate",
    insert: "\n // 判断传入的值是否为日期 \n" +
        " var isDate=vmd.isDate(value); ",
    comment: getFormatComment("isDate",
        "判断是否为日期",
        ["{Mixed} value",
        "return {Boolean}"],
        "<span class='heightlight'>vmd.isDate('2001-04-05')</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "对象判断",
    name: "isObject",
    Class: "isObject",
    insert:"\n// 判断传入的值是否为对象 \n" +
        " var isObject=vmd.isObject(value); ",
    comment: getFormatComment("isObject",
        "判断是否为对象",
        ["{Mixed} value",
        "return {Boolean}"],
        "<span class='heightlight'>vmd.isObject({a:1})</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "空对象判断",
    name: "isEmptyObject",
    Class: "isEmptyObject",
    insert:"\n // 判断传入的值是否为空对象 \n" +
        " var isEmptyObject=vmd.isEmptyObject(value); ",
    comment: getFormatComment("isEmptyObject",
        "判断是否为空对象",
        ["{Mixed} value",
        "return {Boolean}"],
        "<span class='heightlight'>vmd.isEmptyObject({})</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "函数判断",
    name: "isFunction",
    Class: "isFunction",
    insert:"\n // 判断传入的值是否为函数 \n" +
        " var isFunction=vmd.isFunction(value); ",
    comment: getFormatComment("isFunction",
        "判断是否为函数",
        ["{Mixed} value",
        "return {Boolean}"],
        "<span class='heightlight'>vmd.isFunction(function(){})</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "数字判断",
    name: "isNumber",
    Class: "isNumber",
    insert:"\n // 判断传入的值是否为数字 \n" +
        " var isNumber=vmd.isNumber(value); ",
    comment: getFormatComment("isNumber",
        "判断是否为数字",
        ["{Mixed} value",
        "return {Boolean}"],
        "<span class='heightlight'>vmd.isNumber(4)</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "字符串判断",
    name: "isString",
    Class: "isString",
    insert:"\n // 判断传入的值是否为字符串 \n" +
        " var isString=vmd.isString(value); ",
    comment: getFormatComment("isString",
        "判断是否为字符串",
        ["{Mixed} value","return {Boolean}"],
        "<span class='heightlight'>vmd.isString('4545')</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "布尔值判断",
    name: "isBoolean",
    Class: "isBoolean",
    insert: "\n // 判断传入的值是否为布尔值 \n" +
        " var isBoolean=vmd.isBoolean(value); ",
    comment: getFormatComment("isBoolean",
        "判断是否为布尔类型",
        ["{Mixed} value","return {Boolean}"],
        "<span class='heightlight'>vmd.isBoolean('true')</span>"),
    value: {},
    type: publicMethodsType.fun
}]);


//globalArgsRoot/globalArgsRoot_Fun----------------------------------------------------------------------------------------------------------------------
//globalArgsRoot/globalArgsRoot_Fun----------------------------------------------------------------------------------------------------------------------
//globalArgsRoot/globalArgsRoot_Fun----------------------------------------------------------------------------------------------------------------------
//添加到主分类-全局参数-常用方法下
addFunc(globalArgsRoot_Fun,[{
    text: "属性拷贝",
    name: "apply",
    Class: "util.apply",
    insert:"\n // 拷贝源对象的属性到目标对象\n" +
        "var obj1 = {a:3,b:4,e:5};\n" +
        "var obj2 = {a:1,b:2};\n" +
        "vmd.util.apply(obj2,obj1)\n" +
        "console.log(obj2); //{a: 3,b: 4,e:5} ",
    comment: getFormatComment("apply",
        "拷贝源对象的属性到目标对象",
        ["{Object} obj-目标对象",
        "{Object} c-源对象",
        "return {Object} return 目标对象"],
        "var obj1 = {a:3,b:4,e:5};\n" +
        "var obj2 = {a:1,b:2};\n" +
        "vmd.util.apply(obj2,obj1)\n" +
        "console.log(obj2); //{a: 3,b: 4,e:5} "),
    value: {},
    type: publicMethodsType.fun
},{
    text: "属性拷贝",
    name: "applyIf",
    Class: "util.applyIf",
    insert: "\n // 拷贝源对象的属性到目标对象，如果目标对象存在属性就不进行拷贝\n" +
        "var obj1 = {a:3,b:4,e:5};\n" +
        "var obj2 = {a:1,b:2};\n" +
        "vmd.util.applyIf(obj2,obj1)\n" +
        "console.log(obj2); //{a: 1,b: 2,e:5}",
    comment: getFormatComment("apply",
        "拷贝源对象的属性到目标对象，如果目标对象存在属性就不进行拷贝",
        ["{Object}o 目标对象",
        "{Object}c 源对象",
        "return {Object} return 目标对象"],
        "var obj1 = {a:3,b:4,e:5};\n" +
        "var obj2 = {a:1,b:2};\n" +
        "vmd.util.applyIf(obj2,obj1)\n" +
        "console.log(obj2) ;//{a: 1,b: 2,e:5}"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "克隆",
    name: "clone",
    Class: "util.clone",
    insert: "\n //克隆对象 \n"+
        "var obj=vmd.util.clone({a:1,b:[1,2]}); //{a:1.b:[1,2]} ",
    comment: getFormatComment("clone",
        "将对象进行深拷贝",
        ["{Object} obj-拷贝的目标对象","return {Object} 拷贝对象"],
        "var obj=vmd.util.clone({a:1,b:[1,2]}); //{a:1.b:[1,2]}"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "转换对象为url串",
    name: "urlEncode",
    Class: "urlEncode",
    insert:"\n //将一个对象转换为编码的url串 \n"+
        " var url=vmd.urlEncode({foo: 1,bar: 2}); //return 'foo=1&bar=2'; ",
    comment: getFormatComment("urlEncode",
        "将一个对象转换为编码的url串.",
        ["{Object} obj",
        "return {String}"],
        "var url=vmd.urlEncode({foo: 1,bar: 2}); //return 'foo=1&bar=2'; "),
    value: {},
    type: publicMethodsType.fun
},{
    text: "转换url为对象",
    name: "urlDecode",
    Class: "urlDecode",
    insert:"\n//将编码的url串转换为一个对象 \n"+
        " vmd.urlDecode(\"foo=1&bar=2\"); // returns {foo: \"1\",bar: \"2\"};",
    comment: getFormatComment("urlDecode",
        "将编码的url串转换为一个对象.",
        ["{string} string",
        "return {Object}"],
        " vmd.urlDecode(\"foo=1&bar=2\"); // returns {foo: \"1\",bar: \"2\"};"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "url追加参数",
    name: "urlAppend",
    Class: "urlAppend",
    insert: "\n //在url后面追加参数 \n"+
        " var url=vmd.urlAppend(String); ",
    comment: getFormatComment("urlAppend",
        "在url后面追加参数",
        ["{string} url-要追加的url",
        "{string} s-追加的查询内容",
        "return {string} 追加后的url"],
        "<span class='heightlight'>vmd.urlAppend(string)</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取url参数",
    name: "getUrlParam",
    Class: "getUrlParam",
    insert: "\n //获取url的参数值\n"+
    " var value=vmd.getUrlParam('id'); ",
    comment: getFormatComment("getUrlParam",
        "获取url参数",
        ["{String}name-参数名","return {String} value"],
        "var value=vmd.getUrlParam('id')"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "字符串去除首尾空格",
    name: "trim",
    Class: "trim",
    insert: "\n // 删除字符串两旁的空白符 \n"+
    "var s = '  foo bar  ';\n" +
    "vmd.trim(s) ; // 返回 'foo bar' ",
    comment: getFormatComment("trim",
        "删除字符串两旁的空白符",
        ["{String} str-原字符串",
            "return String  裁剪后的字符串"],
        "var s = '  foo bar  ';\n" +
        "vmd.trim(s) \n; " +
        "// 返回 'foo bar' "),
    value: {},
    type: publicMethodsType.fun
},{
    text: "数组遍历",
    name: "each",
    Class: "util.each",
    insert: "\n //遍历数组的每一项 \n"+
        "vmd.util.each(arr,function(item,index){},[scope]); ",
    comment: getFormatComment("each",
        "数组遍历函数",
        ["{Array} arr-遍历的数组",
        "{function} fn-回调函数，参数item，i，array",
        "{Object} scope-函数的作用域"],
        "<span class='heightlight'>vmd.util.each(arr,function(item,index){\n},[scope])\n" +
        "item : Object 数组当前的索引中的元素\n" +
        "index : Number 数组当前的索引</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取dom结构",
    name: "getDom",
    Class: "getDom",
    insert: "\n //获取dom结构 \n"+
        "var htmlElement = vmd.getDom(el); ",
    comment: getFormatComment("getDom",
        "获取dom结构",
        ["{Mixed} el-组件的id或组件对象",
        "return {Object} htmlElement"],
        "<span class='heightlight'>vmd.getDom(el)</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取Body对象",
    name: "getBody",
    Class: "getBody",
    insert:  "\n //获取body的Element \n"+
        "var element = vmd.getBody(); ",
    comment: getFormatComment("getBody",
        "获取body的Element",
        ["return {Object} Element"],
        "<span class='heightlight'>vmd.getBody()</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "任务轮训",
    name: "TaskRunner",
    Class: "TaskRunner",
    insert: "\n //创建一个任务轮训\n"+
    "var i = 0;\n" +
    "var updateClock = function(){\n" +
    "    console.log(i++)\n" +
    "} \n" +
    "var task = {\n" +
    "    run: updateClock,\n" +
    "    interval: 1000,//1 second\n" +
    "    duration: 5000 //超时时间\n" +
    "}\n" +
    "var runner = new vmd.TaskRunner();\n" +
    "runner.start(task);",
    comment: getFormatComment("TaskRunner",
        "创建一个任务轮训",
        [],
        "var i = 0;\n" +
        "var updateClock = function(){\n" +
        "    console.log(i++)\n" +
        "} \n" +
        "var task = {\n" +
        "    run: updateClock,\n" +
        "    interval: 1000,//1 second\n" +
        "    duration: 5000 //超时时间\n" +
        "}\n" +
        "var runner = new vmd.TaskRunner();\n" +
        "runner.start(task);"),
    value: {},
    type: publicMethodsType.fun
}]);

//commonRoot/----------------------------------------------------------------------------------------------------------------------
//commonRoot/----------------------------------------------------------------------------------------------------------------------
//commonRoot/----------------------------------------------------------------------------------------------------------------------
//添加到主分类-公共函数下
addFunc(commonRoot,[]);

//commonRoot/commonRoot_Array----------------------------------------------------------------------------------------------------------------------
//commonRoot/commonRoot_Array----------------------------------------------------------------------------------------------------------------------
//commonRoot/commonRoot_Array----------------------------------------------------------------------------------------------------------------------
//添加到主分类-公共函数-数组下
addFunc(commonRoot_Array,[{
    text: "过滤空值",
    name: "clean",
    Class: "clean",
    insert: "\n //过滤数组里的空值项\n"+
        " var arr = vmd.Array.clean([1,'',2,3,'',5]); // [1,2,3,5] ",
    comment: getFormatComment("clean",
        "过滤数组里的空值项",
        ["{Array} array-指定数组",
        "return Array 返回过滤后的数组"],
        "var arr = vmd.Array.clean([1,,2,3,,5]); // [1,2,3,5] "),
    value: {},
    type: publicMethodsType.fun
},{
    text: "克隆数组",
    name: "clone",
    Class: "clone",
    insert: "\n //克隆数组\n"+
        " var arr = vmd.Array.clone([1,2,{a:4,b:5},7]); // [1,2,{a:4,b:5},7] ",
    comment: getFormatComment("clone",
        "克隆数组",
        ["{Array} array-指定数组",
        "return Array 返回克隆数组"],
        "var arr = vmd.Array.clone([1,2,{a:4,b:5},7]); // [1,2,{a:4,b:5},7] "),
    value: {},
    type: publicMethodsType.fun
},{
    text: "元素判断",
    name: "contains",
    Class: "contains",
    insert: "\n //检查数组中是否包含给定元素\n"+
        "var isContains = vmd.Array.contains([1,[2,5],{a:4,b:5},'r'],'r'); // true ",
    comment: getFormatComment("contains",
        "检查数组中是否包含给定元素",
        ["{Array} array-指定数组",
        "{String/Number} item-给定的元素",
        "return Boolean 数组包含元素则为true，否则为false"],
        "var isContains = vmd.Array.contains([1,[2,5],{a:4,b:5},'r'],[2,5]); // false \n" +
        "var isContains = vmd.Array.contains([1,[2,5],{a:4,b:5},{a:4,b:5}],1); // false \n " +
        "var isContains = vmd.Array.contains([1,[2,5],{a:4,b:5},'r'],1); // true \n " +
        "var isContains = vmd.Array.contains([1,[2,5],{a:4,b:5},'r'],'r'); // true "),
    value: {},
    type: publicMethodsType.fun
},{
    text: "差异集合",
    name: "difference",
    Class: "difference",
    insert: "\n //返回 A-B两个数组的的差异集合\n"+
        "var arr = vmd.Array.difference([1,2,3,6],[2,3,4,5]); //[1,6]",
    comment: getFormatComment("difference",
        "返回 A-B的差异集合",
        ["{Array} array1-指定数组A",
        "{Array} array2-指定数组B",
        "return Array A中不同于B的元素的集合"],
        "var arr = vmd.Array.difference([1,2,3,6],[2,3,4,5]); //[1,6]"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "移除多个元素",
    name: "erase",
    Class: "erase",
    insert: "\n //移除除数组中的多个元素\n"+
        "var arr = vmd.Array.erase([1,2,3,4,5,6],2,3);// [1,2,6] ",
    comment: getFormatComment("erase",
        "移除数组中的多个元素",
        ["{Array} array-指定数组",
        "{Number} index-要操作的索引位置",
        "{Number} removeCount-要移除的元素数量",
        "return Array 返回处理后的数组"],
        "var arr = vmd.Array.erase([1,2,3,4,5,6],2,3);" +
        "//返回  [1,2,6] "),
    value: {},
    type: publicMethodsType.fun
},{
    text: "判断不符合项",
    name: "every",
    Class: "every",
    insert: "\n // 在数组的每个元素上执行指定函数，直到函数返回一个false值 \n" +
    "// 如果某个元素上返回了false值，本函数立即返回false 否则函数返回true\n"+
        "var isEvery = vmd.Array.every([1,3,5,7,-4],function(item,index){\n" +
        "  return item<0\n" +
        "}); // false",
    comment: getFormatComment("every",
        "在数组的每个元素上执行指定函数，直到函数返回一个false值 \n" +
        "如果某个元素上返回了false值，本函数立即返回false 否则函数返回true",
        ["{Array} array-指定数组",
        "{Function} fun-回调函数",
        "return Boolean"],
        "var isEvery = vmd.Array.every([1,3,5,7,-4],function(item,index){\n" +
        "  return item<0\n" +
        "}); // false \n" +
        "item : Object 数组当前的索引中的元素 \n" +
        "index : Number 数组当前的索引</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "筛选符合项",
    name: "filter",
    Class: "filter",
    insert: "\n // 在数组的每个元素上执行指定函数，\n" +
    "// 把符合条件的项放到一个数组中并返回\n"+
    "var arr = vmd.Array.filter([1,3,5,7,-4],function(item,index){\n" +
    "  return item<0\n" +
    "}); // 返回 [-4]",
    comment: getFormatComment("filter",
        "在数组的每个元素上执行指定函数，" +
        "把符合条件的项放到一个数组中并返回",
        ["{Array} arr-指定数组",
        "{Function} fun-回调函数. 过滤条件",
        "return Array 符合条件的项的集合"],
        "var arr = vmd.Array.filter([1,3,5,7,-4],function(item,index){\n" +
        "  return item<0\n" +
        "}); // [-4] \n" +
		"item : Object 数组当前的索引中的元素 \n" +
        "index : Number 数组当前的索引</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "严格比较",
    name: "equals",
    Class: "equals",
    insert: "\n // 使用严格相等比较2个数组的内容 \n"+
        "var isEquals = vmd.Array.equals([1,2],['1','2']); // 返回 false",
    comment: getFormatComment("equals",
        "使用严格相等比较2个数组的内容",
        ["{Array} array-指定数组A ",
        "{Array} array-指定数组B ",
        "return Boolean 是否相等"],
        "var isEquals = vmd.Array.equals([1,2],['1','2']); " +
        "// 返回 false"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "转换一维数组",
    name: "flatten",
    Class: "flatten",
    insert:"\n // 将数组和数组中的元素转换为1维数组 \n"+
        "var arr = vmd.Array.flatten([[1,2,3],[4,5,6],[7,8,9]]);// [1,2,3,4,5,6,7,8,9] ",
    comment: getFormatComment("flatten",
        "将数组和数组中的元素转换为1维数组",
        ["{Array} array-指定数组",
        "return Array 转换后的一维数组"],
        "var arr = vmd.Array.flatten([[1,2,3],[4,5,6],[7,8,9]]);" +
        "// arr = [1,2,3,4,5,6,7,8,9] "),
    value: {},
    type: publicMethodsType.fun
},{
    text: "数组遍历",
    name: "forEach",
    Class: "forEach",
    insert: "\n // 迭代一个数组，在每个元素上调用给定的回调函数 \n"+
        "var arr = [3,4,5,6];\n" +
    "    vmd.Array.forEach(arr,function(item,index){\n" +
    "        if(item>3){\n" +
    "           alert(1) \n" +
    "        }else{\n" +
    "            alert(0)\n" +
    "        }\n" +
    "    })",
    comment: getFormatComment("forEach",
        "迭代一个数组，在每个元素上调用给定的回调函数",
        ["{Array} arr 遍历的数组",
        "{function} fn 回调函数，参数item，i，array",
        "{Object} scope 函数的作用域"],
        "var arr = [3,4,5,6];\n" +
        "vmd.Array.forEach(arr,function(item,index){\n" +
        "    if(item>3){\n" +
        "       alert(1) \n" +
        "    }else{\n" +
        "    alert(0)\n" +
        "    }\n" +
        "}) \n"+
        "item : Object 数组当前的索引中的元素\n" +
        "index : Number 数组当前的索引</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "转数组",
    name: "from",
    Class: "from",
    insert: "\n // 将一个可迭代元素(具有数字下标和length属性)转换为一个真正的数组 \n"+
        "var arr = vmd.Array.from('foo'); // ['foo'] ",
    comment: getFormatComment("from",
        "将一个可迭代元素(具有数字下标和length属性)转换为一个真正的数组",
        ["{Array} value-给定的可迭代元素",
        "return Array 数组"],
        "var arr = vmd.Array.from('foo');\n " +
        "// 返回 ['f','o','o'] "),
    value: {},
    type: publicMethodsType.fun
},{
    text: "插入",
    name: "include",
    Class: "include",
    insert: "\n // 在数组中插入一个原数组不存在的元素 \n"+
    "var arr = [1,2,3] \n" +
    "vmd.Array.include(arr,4); // 返回 [1,2,3,4] ",
    comment: getFormatComment("include",
        "在数组中插入一个原数组不存在的元素",
        ["{Array} array-指定数组",
        "{Object} item-要插入的元素",
        "return Array 数组"],
        "var arr = [1,2,3] \n" +
        "vmd.Array.include(arr,4); // 返回 [1,2,3,4] \n" +
        "vmd.Array.include(arr,3); // 返回 [1,2,3]"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "查找元素位置",
    name: "indexOf",
    Class: "indexOf",
    insert:  "\n // 查找指定元素在数组中的索引位置 \n"+
        "var num = vmd.Array.indexOf([1,2,'r',4],'r'); // 返回 2",
    comment: getFormatComment("indexOf",
        "查找指定元素在数组中的索引位置",
        ["{Array} array-指定数组",
        "{Object} item-要查找的元素 ",
        "{Number} from-可选，查找开始的位置，默认从0开始",
        "return Number 元素在数组中的索引位置（找不到时为-1"],
        "var num = vmd.Array.indexOf([1,2,'r',4],'r'); // 返回 2"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "插入多个元素",
    name: "insert",
    Class: "insert",
    insert: "\n // 在数组中插入多个元素 \n"+
        "var arr = vmd.Array.insert([1,2],1,['a','b']); // [1,'a','b',2]",
    comment: getFormatComment("insert",
        "在数组中插入多个元素",
        ["{Array} array-指定数组",
        "{Number} index-要插入的位置",
        "{Array} item-要插入元素的集合",
        "return Array  插入后新的数组"],
        "var arr = vmd.Array.insert([1,2],1,['a','b']); " +
        "// 返回 [1,'a','b',2]"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "数组交集",
    name: "intersect",
    Class: "intersect",
    insert: "\n // 返回多个数组的公共交集 \n"+
        "var arr = vmd.Array.intersect([1,2],[2,3],[2,4]); // [2]",
    comment: getFormatComment("intersect",
        "返回多个数组的公共交集",
        ["{Array} array1-指定数组1",
        "{Array} array2-指定数组2 n",
        "{Array} array3...-指定数组3...  ",
        "return Array  交集数组"],
        "var arr = vmd.Array.intersect([1,2],[2,3],[2,4]);" +
        " // 返回 [2]"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "数组遍历返回新数组",
    name: "map",
    Class: "map",
    insert: "\n // 在数组的每个元素中调用一个特定函数，用结果创建一个新数组 \n"+
        " var arr = vmd.Array.map([1,2,3],function(item,index){\n" +
    "        return item+1\n" +
    "    }); // [2,3,4]",
    comment: getFormatComment("map",
        "在数组的每个元素中调用一个特定函数，用结果创建一个新数组",
        ["{Array} arr 遍历的数组",
        "{function} fn 回调函数，参数item，i，array ",
        "{Object} scope 函数的作用域 ",
        "return Array 新数组"],
        " var arr = vmd.Array.map([1,2,3],function(item,index){\n" +
        "        return item+1\n" +
        "    }); // 返回 [2,3,4] \n " +
        "item : Object 数组当前的索引中的元素\n" +
        "index : Number 数组当前的索引</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "最大值",
    name: "max",
    Class: "max",
    insert: "\n // 返回数组中的最大值\n"+
        "var maxValue = vmd.Array.max([2,5,88,66]); // 88",
    comment: getFormatComment("max",
        "返回数组中的最大值",
        ["{Array} arr 指定的数组",
        "return Object maxValue 最大值"],
        "var maxValue = vmd.Array.max([2,5,88,66]); // 88"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "最小值",
    name: "min",
    Class: "min",
    insert: "\n // 返回数组中的最小值\n"+
        "var minValue = vmd.Array.min([2,5,88,66]);// 2",
    comment: getFormatComment("min",
        "返回数组中的最小值",
        ["{Array} arr 指定的数组",
        "return Object mixValue 最大值"],
        "var minValue = vmd.Array.min([2,5,88,66]);// 2"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "平均值",
    name: "mean",
    Class: "mean",
    insert: "\n // 返回数组中元素的平均值\n"+
        "var num = vmd.Array.mean(arr);",
    comment: getFormatComment("mean",
        "返回数组中元素的平均值",
        ["{Array} array-指定数组",
        "return Number 平均值"],
        "vmd.Array.mean([2,4,6,5,3]) // 返回 4 "),
    value: {},
    type: publicMethodsType.fun
},{
    text: "合并不重复元素",
    name: "merge",
    Class: "merge",
    insert: "\n // 合并多个数组中不重复元素到一个数组\n"+
        "var arr = vmd.Array.merge([1,2],[2,3],[3,4]); // [1,2,3,4]",
    comment: getFormatComment("merge",
        "合并多个数组中不重复元素到一个数组",
        ["{Array} array1-指定数组1",
        "{Array} array2-指定数组2",
        "{Array} array3...-指定数组3... ",
        "return Array 数组"],
        "var arr = vmd.Array.merge([1,2],[2,3],[3,4]);\n " +
        "//返回 [1,2,3,4]"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "属性值集合",
    name: "pluck",
    Class: "pluck",
    insert: "\n // 获取数组中每个元素的指定属性值\n"+
        "var a = [{id:1,name:\"张三\"},{id:2,name:\"李四\"},{id:3,name:\"王五\"}]\n" +
        "var arr = vmd.Array.pluck(a,'name') // [\"张三\",\"李四\",\"王五\"]",
    comment: getFormatComment("pluck",
        "获取数组中每个元素的指定属性值",
        ["{Array} array-指定数组",
        "{String} propertyName-元素的属性名称 ",
        "return Array 数组"],
        " var a = [{id:1,name:\"张三\"},{id:2,name:\"李四\"},{id:3,name:\"王五\"}]\n" +
        " var arr = vmd.Array.pluck(a,'name')\n" +
        " // [\"张三\",\"李四\",\"王五\"] 返回 "),
    value: {},
    type: publicMethodsType.fun
},{
    text: "追加元素",
    name: "push",
    Class: "push",
    insert:"\n // 在数组的末尾添加新的元素\n"+
        "var arr = vmd.Array.push([1,2],{a:3}); // [1,2,{a:3}]",
    comment: getFormatComment("push",
        "在数组的末尾添加新的元素",
        ["{Array} array-指定数组",
        "{object/String/Number} element-追加的元素",
        "return Array 数组"],
        "var arr = vmd.Array.push([1,2],{a:3}); // [1,2,{a:3}]"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "删除元素",
    name: "remove",
    Class: "remove",
    insert: "\n // 移除数组中的指定元素 \n"+
        "var arr = vmd.Array.remove([1,'a',3,5],1);// ['a',3,5]",
    comment: getFormatComment("remove",
        "移除数组中的指定元素",
        ["{Array} array-指定的数组",
        "{Number/string/Object} item-要移除的元素",
        "return Array 处理后数组"],
        "var arr = vmd.Array.remove([1,'a',3,5],1); \n" +
        "//返回  ['a',3,5]"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "替换元素",
    name: "replace",
    Class: "replace",
    insert: "\n // 替换数组里的多个元素 \n"+
        "var a = [{id:1,name:\"张三\"},{id:2,name:\"李四\"},{id:3,name:\"王五\"}]\n" +
        "var arr = vmd.Array.replace(a,1,2,['a',1]) // [{id:1,name:\"张三\"},'a',1]",
    comment: getFormatComment("replace",
        "替换数组里的多个元素",
        ["{Array} array-指定的数组",
        "{Number} index-要操作的位置索引",
        "{Number} num-要移除的元素数量，可为0",
        "{Array} insert-可选，要插入的元素数组 ",
        "return Array 处理后数组"],
        "var a = [{id:1,name:\"张三\"},{id:2,name:\"李四\"},{id:3,name:\"王五\"}]\n" +
        "var arr = vmd.Array.replace(a,1,2,['a',1]) \n" +
        "// 返回 [{id:1,name:\"张三\"},'a',1]"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "截取数组",
    name: "slice",
    Class: "slice",
    insert: "\n // 返回一个数组中一部分的浅表复制 \n"+
        "var arr = vmd.Array.slice(['a','b','c','d',4],1,4); // ['b','c','d']",
    comment: getFormatComment("slice",
        "返回一个数组中一部分的浅表复制",
        ["{Array} array-指定的数组  ",
        "{Number} begin-起始索引。为负值则 从数组的末尾计算位移 ",
        "{Number} end-结束索引。复制元素不包括结尾处的元素。为负值则从数组的末尾计算位移 ",
        "return Array 被截取部分组成的数组"],
        "var arr = vmd.Array.slice(['a','b','c','d',4],1,4);\n " +
        "// 返回 ['b','c','d']"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "判断符合项",
    name: "some",
    Class: "some",
    insert: "\n // 在数组的每个元素上执行指定函数，直到函数返回一个true值 如果某个元素上返回了true值，本函数立即返回true \n"+
        "var array = [5,8,34,56,4];\n" +
        "var isSome = vmd.Array.some(array,function(item,index){\n" +
        "               return item>50 \n" +
        "           }); // true",
    comment: getFormatComment("some",
        "在数组的每个元素上执行指定函数，直到函数返回一个true值 如果某个元素上返回了true值，本函数立即返回true",
        ["{Array} array-指定的数组  ",
        "{Function} Fn-回掉的函数 ",
        "{Number} {Object} scope-回调函数的作用域 ",
        "return Boolean 如果回调函数返回一个true值则为true"],
        "var isSome = vmd.Array.some(array,function(item,index){\n" +
        "               return item>50 \n" +
        "           }); // true"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "排序",
    name: "sort",
    Class: "sort",
    insert: "\n // 排序数组中的元素 \n"+
        "function sortNumber(a,b){\n" +
        "   return a - b \n" +
        "}\n" +
        "var arr = vmd.Array.sort(array,sortNumber);",
    comment: getFormatComment("sort",
        "排序数组中的元素",
        ["{Array} array-指定的数组  ",
        "{Function} Fn-比较函数 ",
        "return Array 排序后的数组"],
        "function sortNumber(a,b){\n" +
        "    return a - b\n" +
        "}\n" +
        "var array = [34,56,2,3,7];\n" +
        "var arr = vmd.Array.sort(array,sortNumber);\n" +
        "// 返回 [2,3,7,34,56]"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "替换元素",
    name: "splice",
    Class: "splice",
    insert: "\n // 替换数组里的多个元素 \n"+
        "var array = [34,56,2,3,7];\n" +
        "var arr = vmd.Array.splice(array,2,1,'abc');// [34,56,'abc',3,7]",
    comment: getFormatComment("splice",
        "替换数组里的多个元素",
        ["{Array} array-指定的数组  ",
        "{Number} index-要操作的位置索引 ",
        "{Number} num-要移除的元素数量，可为0",
        "{Object...} elements-可选，要添加到数组的多个元素.如果没有指定任何元素，splice简化为从数组移除元素 ",
        "return Array 处理后数组"],
        "var array = [34,56,2,3,7];\n" +
        "var arr = vmd.Array.splice(array,2,1,'abc');\n" +
        "//返回 [34,56,'abc',3,7]"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "转换数组",
    name: "toArray",
    Class: "toArray",
    insert: "\n // 将一个可迭代元素(具有数字下标和length属性)转换为一个真正的数组 \n"+
        "var arr = vmd.Array.toArray('splitted',0,3); //  ['s','p','l']",
    comment: getFormatComment("toArray",
        "将一个可迭代元素(具有数字下标和length属性)转换为一个真正的数组",
        ["{Object} iterable-可迭代的对象  ",
        "{Number} start-表示要转换的起始位置. 默认为 0 ",
        "{Number} end-表示要转换的结束位置.默认为要迭代元素的末尾位置 ",
        "return Array 处理后的数组"],
        "<span class='heightlight'>vmd.Array.toArray(document.getElementsByTagName('div')); // 把 NodeList转换成一个数组\n" +
        "vmd.Array.toArray('splitted'); //  ['s','p','l','i','t','t','e','d']\n" +
        "vmd.Array.toArray('splitted',0,3); //  ['s','p','l']</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "map对象",
    name: "toMap",
    Class: "toMap",
    insert:"\n // 使用给定数组中的元素作为key，创建一个map对象， 值是元素的索引+1 \n"+
        "var map = vmd.Array.toMap(array,[getKey]);",
    comment: getFormatComment("toMap",
        "使用给定数组中的元素作为key，创建一个map对象， 值是元素的索引+1",
        ["{Array} array-指定的数组   ",
        "{Object} getKey-可选，可以是指定的key属性，也可以指定一个key生成函数 ",
        "return Object map对象"],
        "var map = vmd.Array.toMap(['a','b','c']); //map = { a: 1,b: 2,c: 3 };\n" +
        "var map = vmd.Array.toMap([\n" +
        "         { name: 'a' },\n" +
        "         { name: 'b' },\n" +
        "         { name: 'c' }\n" +
        "     ],'name'); // map = { a: 1,b: 2,c: 3 };"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "数组去重",
    name: "unique",
    Class: "unique",
    insert: "\n // 返回一个去掉重复元素的新数组 \n"+
        "var array = [2,4,5,2,3,4];\n" +
        "var arr = vmd.Array.unique(array); // [2,4,5,3]",
    comment: getFormatComment("unique",
        "返回一个去掉重复元素的新数组",
        ["{Array} array-指定的数组",
        "return Array 新数组"],
        "var array = [2,4,5,2,3,4];\n" +
        "var arr = vmd.Array.unique(array); " +
        "// 返回 [2,4,5,3]"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "和计算",
    name: "sum",
    Class: "sum",
    insert: "\n // 计算数组中元素的和 \n"+
        "var num = vmd.Array.sum(array);",
    comment: getFormatComment("sum",
        "计算数组中元素的和",
        ["{Array} array-指定的数组   ",
        "return Number 和"],
        "vmd.Array.sum([2,3,4]);\n" +
        "// 返回 9"),
    value: {},
    type: publicMethodsType.fun
}]);

//commonRoot/commonRoot_Date----------------------------------------------------------------------------------------------------------------------
//commonRoot/commonRoot_Date----------------------------------------------------------------------------------------------------------------------
//commonRoot/commonRoot_Date----------------------------------------------------------------------------------------------------------------------
//添加到主分类-公共函数-日期  
addFunc(commonRoot_Date,[
    // {
    //     text: "日期运算",
    //     name: "add",
    //     Class: "add",
    //     insert: "var dt = vmd.Date.add(new Date(),vmd.Date.DAY,5);",
    //     comment: getFormatComment("add",
    //         "提供执行基本日期运算的简便方法。 此方法不修改被调用的日期实例",
    //         "{Date} date-日期对象 \n" +
    //         "{Number} interval-一个有效的日期间隔枚举值 \n" +
    //         "{Number} value-向当前日期上增加的总数 \n" +
    //         "return Object 返回新的日期对象，不改变原日期对象",
    //         "<span class='heightlight'>// 基本用法：\n" +
    //         "var dt = vmd.Date.add(new Date('10/29/2006'),vmd.Date.DAY,5);\n" +
    //         "console.log(dt); //返回 'Fri Nov 03 2006 00:00:00'\n" +
    //         "// 负数将按照减法运算：\n" +
    //         "var dt2 = vmd.Date.add(new Date('10/1/2006'),vmd.Date.DAY,-5);\n" +
    //         "console.log(dt2); //返回 'Tue Sep 26 2006 00:00:00'</span>"),
    //     value: {},
    //     type: publicMethodsType.fun
    // },
 {
    text: "日期范围",
    name: "between",
    Class: "between",
    insert: "\n // 检查一个日期是否处在给定的开始日期和结束日期之间 \n"+
        "var isBetween = vmd.Date.between(date,start,end);",
    comment: getFormatComment("between",
        "检查一个日期是否处在给定的开始日期和结束日期之间",
        ["{Date} date-要检查的日期对象 ",
        "{Date} start-开始的日期对象 ",
        "{Date} end-结束的日期对象 ",
        "return Boolean 如果这个日期在给定的开始和结束日期之间（包含边界值）则返回true"],
        "vmd.Date.between(date,start,end)"),
    value: {},
    type: publicMethodsType.fun
},{
        text: "年份天数",
        name: "getDayOfYear",
        Class: "getDayOfYear",
        insert: "\n // 获取当前日期在年份中的第几天 \n"+
            "var days = vmd.Date.getDayOfYear(date);",
        comment: getFormatComment("getDayOfYear",
            "获取当前日期在年份中的第几天",
            ["{Date} date-日期对象 ",
            "return Number 天数"],
            "<span class='heightlight'>vmd.Date.getDayOfYear(date)</span>"),
        value: {},
        type: publicMethodsType.fun
    },{
        text: "克隆日期",
        name: "clone",
        Class: "clone",
        insert: "\n // 克隆当前日期 \n"+
            "var orig = vmd.Date.clone(date);",
        comment: getFormatComment("clone",
            "克隆当前日期",
            ["{Date} date-日期对象 ",
            "return Date 返回新的日期对象"],
            "var orig = new Date('10/1/2006'),\n" +
            "copy = vmd.Date.clone(orig);\n" +
            "copy.setDate(5);\n" +
            "console.log(orig); \n " +
            "//返回 'Thu Oct 01 2006'"),
        value: {},
        type: publicMethodsType.fun
    },{
        text: "格式化",
        name: "format",
        Class: "format",
        insert: "\n // 根据指定的格式将对象格式化 \n"+
            "var orig = vmd.Date.format(new Date(),'y-m-d');",
        comment: getFormatComment("format",
            "根据指定的格式将对象格式化",
            ["{Date} date-日期对象 ",
            "{String} format-日期格式字符串 \n" +
            "return String 格式化后的日期对象"],
            "vmd.Date.format(new Date(),'y-m-d')"),
        value: {},
        type: publicMethodsType.fun
    },{
        text: "月天数",
        name: "getDaysInMonth",
        Class: "getDaysInMonth",
        insert: "\n // 获取当前日期对象月份中的天数 \n"+
            "var days = vmd.Date.getDaysInMonth(date);",
        comment: getFormatComment("getDaysInMonth",
            "获取当前日期对象月份中的天数",
            ["{Date} date-日期对象 ",
            "return Number 天数"],
            "vmd.Date.getDaysInMonth(new Date('10/1/2006'))"),
        value: {},
        type: publicMethodsType.fun
    },{
        text: "时间差",
        name: "getElapsed",
        Class: "getElapsed",
        insert: "\n // 返回两个日期之间的毫秒数的差值 \n"+
            "var days = vmd.Date.getElapsed(date1,date2);",
        comment: getFormatComment("getElapsed",
            "返回两个日期之间的毫秒数的差值",
            ["{Date} date1-日期对象1 ",
            "{Date} date2-日期对象2 ",
            "return Number 毫秒数"],
            "vmd.Date.getDaysInMonth(new Date('10/1/2006'))"),
        value: {},
        type: publicMethodsType.fun
    },{
        text: "月第一天日期对象",
        name: "getFirstDateOfMonth",
        Class: "getFirstDateOfMonth",
        insert: "\n // 返回当前月份中第一天的日期对象 \n"+
            "var FistDate = vmd.Date.getFirstDateOfMonth(date);",
        comment: getFormatComment("getFirstDateOfMonth",
            "返回当前月份中第一天的日期对象",
            ["{Date} date-日期对象 ",
            "return Date 月份中第一天的日期对象"],
            "vmd.Date.getFirstDateOfMonth(new Date('10/1/2006'))"),
        value: {},
        type: publicMethodsType.fun
    },{
        text: "月第一天星期数",
        name: "getFirstDayOfMonth",
        Class: "getFirstDayOfMonth",
        insert: "\n // 返回当前月份第一天的星期数 \n"+
            "var FistDay = vmd.Date.getFirstDayOfMonth(date);",
        comment: getFormatComment("getFirstDayOfMonth",
            "返回当前月份第一天的星期数",
            ["{Date} date-日期对象 ",
            "return Number 一周中的天数（0～6）"],
            "vmd.Date.getFirstDayOfMonth(new Date('10/1/2006'))"),
        value: {},
        type: publicMethodsType.fun
    },{
        text: "月最后一天日期对象",
        name: "getLastDateOfMonth",
        Class: "getLastDateOfMonth",
        insert: "\n // 返回当前月份中最后一天的日期对象 \n"+
            "var lastDate = vmd.Date.getLastDateOfMonth(date);",
        comment: getFormatComment("getLastDateOfMonth",
            "返回当前月份中最后一天的日期对象",
            ["{Date} date-日期对象 ",
            "return Date 月份中最后一天的日期对象"],
            "vmd.Date.getLastDateOfMonth(new Date('10/1/2006'))"),
        value: {},
        type: publicMethodsType.fun
    },{
        text: "月最后一天星期数",
        name: "getLastDayOfMonth",
        Class: "getLastDayOfMonth",
        insert: "\n // 返回当前月份最后一天的星期数 \n"+
            "var lastDay = vmd.Date.getLastDayOfMonth(date);",
        comment: getFormatComment("getLastDayOfMonth",
            "返回当前月份最后一天的星期数",
            ["{Date} date-日期对象 ",
            "return Number 一周中的天数（0～6）"],
            "vmd.Date.getLastDayOfMonth(new Date('10/1/2006'))"),
        value: {},
        type: publicMethodsType.fun
    },{
        text: "相等判断",
        name: "isEqual",
        Class: "isEqual",
        insert: "\n // 通过比较两个日期对象的值来判断两个日期是否相等 \n"+
            "var isEqual = vmd.Date.isEqual(date1,date2);",
        comment: getFormatComment("isEqual",
            "通过比较两个日期对象的值来判断两个日期是否相等",
            ["{Date} date1-日期对象1 ",
            "{Date} date2-日期对象2 ",
            "return Boolean 如果日期值相等则返回true"],
            "vmd.Date.isEqual(new Date('10/1/2006'),new Date())"),
        value: {},
        type: publicMethodsType.fun
    },{
        text: "当前时间戳",
        name: "now",
        Class: "now",
        insert: "\n // 当前的时间戳 \n"+
            "var now = vmd.Date.now();",
        comment: getFormatComment("now",
            "返回当前的时间戳",
            ["return Number 当前时间戳"],
            "<span class='heightlight'>vmd.Date.now()</span>"),
        value: {},
        type: publicMethodsType.fun
    },{
        text: "星期数",
        name: "getWeekOfYear",
        Class: "getWeekOfYear",
        insert: "\n // 从年份中获取 ISO-8601 标准的星期数 \n"+
            "var weekNum = vmd.Date.getWeekOfYear(date);",
        comment: getFormatComment("getWeekOfYear",
            "从年份中获取 ISO-8601 标准的星期数",
            ["{Date} date-日期对象 ",
            "return Number 当前时间的星期数（范围从 1 到 53 中）"],
            "vmd.Date.getWeekOfYear(new Date())"),
        value: {},
        type: publicMethodsType.fun
    }]);

//commonRoot/commonRoot_String----------------------------------------------------------------------------------------------------------------------
//commonRoot/commonRoot_String----------------------------------------------------------------------------------------------------------------------
//commonRoot/commonRoot_String----------------------------------------------------------------------------------------------------------------------
//添加到主分类-公共函数-字符
addFunc(commonRoot_String,[{
    text: "首字母大写",
    name: "capitalize",
    Class: "capitalize",
    insert: "\n // 把字符串中的第一个英文字母转化为大写 \n"+
        "var newStr = vmd.String.capitalize('small');// 'Small'",
    comment: getFormatComment("capitalize",
        "把字符串中的第一个英文字母转化为大写",
        ["{String} str-指定字符串   ",
        "return String 处理后的字符串"],
        "var newStr = vmd.String.capitalize('small');\n" +
        "//返回 'Small'"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "限定长度",
    name: "ellipsis",
    Class: "ellipsis",
    insert: "\n // 对大于指定长度的字符串，进行裁剪，增加省略号('...')的显示 \n"+
        "var newStr = vmd.String.ellipsis('ellipsis',4);//'elli...'",
    comment: getFormatComment("ellipsis",
        "对大于指定长度的字符串，进行裁剪，增加省略号('...')的显示",
        ["{String} str-指定字符串 ",
        "{Number} length-裁剪后允许的最大长度（包含...） ",
        "return String 处理后的字符串"],
        "var newStr = vmd.String.ellipsis('ellipsis',4);\n" +
        "//返回 'elli...'"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "字符转译",
    name: "escape",
    Class: "escape",
    insert: "\n // 把输入的 ' 与 \\ 字符转义 \n"+
        "var newStr = vmd.String.escape(str);",
    comment: getFormatComment("ellipsis",
        "把输入的 ' 与 \\ 字符转义",
        ["{String} str-指定字符串 ",
        "return String 处理后的字符串"],
        "<span class='heightlight'>vmd.String.escape(str)</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "字符串解码",
    name: "htmlDecode",
    Class: "htmlDecode",
    insert: "\n // 将 (&,<,>,',和 \") 字符从HTML显示的格式还原 \n"+
        "var newStr = vmd.String.htmlDecode(str);",
    comment: getFormatComment("htmlDecode",
        "将 (&,<,>,',和 \") 字符从HTML显示的格式还原",
        ["{String} str-指定字符串 ",
        "return String 解码后的文本"],
        "<span class='heightlight'>vmd.String.htmlDecode(str)</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "字符串编码",
    name: "htmlEncode",
    Class: "htmlEncode",
    insert: "\n // 转义 (&,<,>,',和 \") 为能在HTML中显示的字符 \n"+
        "var newStr = vmd.String.htmlEncode(str);",
    comment: getFormatComment("htmlEncode",
        "转义 (&,<,>,',和 \") 为能在HTML中显示的字符",
        ["{String} str-指定字符串 ",
        "return String 编码后的文本"],
        "<span class='heightlight'>vmd.String.htmlEncode(str)</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "左连接",
    name: "leftPad",
    Class: "leftPad",
    insert: "\n // 在字符串左边填充指定字符 \n"+
        " var s = vmd.String.leftPad('123',5,'0'); //'00123'",
    comment: getFormatComment("leftPad",
        "在字符串左边填充指定字符",
        ["{String} str-原字符串",
        "{Number} size-原字符串与填充字符串的总长度",
        "{String} character-可选的，填充字符串（默认是''）",
        "return String 填充后的字符串"],
        " var s = vmd.String.leftPad('123',5,'0');\n" +
        " // s 现在是：'00123'"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "重复字符",
    name: "repeat",
    Class: "repeat",
    insert: "\n // 根据给定的格式字符串与指定的重复次数返回一个新的格式字符串 \n"+
        "var newStr = vmd.String.repeat('--',3,'/'); // '--/--/--'",
    comment: getFormatComment("repeat",
        "根据给定的格式字符串与指定的重复次数返回一个新的格式字符串",
        ["{String} str-原字符串",
        "{Number} count-重复格式字符串的次数(可能是0)",
        "{String} countStr-可选，要分隔每个格式字符串的选项字符串",
        "return String 填充后的字符串  "],
        "var s = vmd.String.repeat('---',4);\n" +
        " //返回 '------------'\n" +
        "var t = vmd.String.repeat('--',3,'/');\n" +
        " //返回 '--/--/--'"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "插入",
    name: "insert",
    Class: "insert",
    insert: "\n // 在原字符串中插入字符串 \n"+
        "var newStr = vmd.String.insert(str,value,index);",
    comment: getFormatComment("insert",
        "在原字符串中插入字符串",
        ["{String} str-原字符串",
        "{String} value-要插入的字符",
        "{Number} index-插入子字符串的索引。负索引将从字符串的末尾插入",
        "return String 新的字符串  "],
        "<span class='heightlight'>vmd.String.insert(\"abcdefg\",\"h\",-1); // abcdefhg</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "拆分为数组",
    name: "splitWords",
    Class: "splitWords",
    insert: "\n // 根据需要裁剪，按照一个或多个空格进行分割一个字符串并将返回的词存到数组中， 如果词已经是一个数组,它将被返回 \n"+
        "var arr = vmd.String.splitWords(\"a b c d \");//[a,b,c,d]",
    comment: getFormatComment("splitWords",
        "根据需要裁剪，按照一个或多个空格进行分割一个字符串并将返回的词存到数组中， 如果词已经是一个数组,它将被返回",
        ["{String} str-原字符串",
        "return Array 数组  "],
        "vmd.String.splitWords(\"a b c d \");\n" +
        "// 返回 [a,b,c,d]"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "比较并交换",
    name: "toggle",
    Class: "toggle",
    insert: "\n // 比较并交换字符串的值。 参数中的第一个值与当前字符串对象比较， 如果相等则返回传入的第一个参数，否则返回第二个参数 \n"+
        "var sort = 'ASC',sort1 = 'fg' ;\n" +
        "vmd.String.toggle(sort,'ASC','DESC'); // return 'ASC' \n" +
        "vmd.String.toggle(sort1,'ASC','DESC'); // return 'DESC' ",
    comment: getFormatComment("toggle",
        "比较并交换字符串的值。 参数中的第一个值与当前字符串对象比较， 如果相等则返回传入的第一个参数，否则返回第二个参数",
        ["{String} str-原字符串",
        "{String} value-第一个参数，与当前字符串相等则返回",
        "{String} other-传入的第二个参数，不等返回",
        "return String 返回新值，不改变原字符串 "],
        "var sort = 'ASC',sort1 = 'fg' ;\n" +
        "vmd.String.toggle(sort,'ASC','DESC'); // return 'ASC' \n" +
        "vmd.String.toggle(sort1,'ASC','DESC'); // return 'DESC' "),
    value: {},
    type: publicMethodsType.fun
},{
    text: "去除首尾空格",
    name: "trim",
    Class: "trim",
    insert: "\n // 删除字符串两旁的空白符 \n"+
            "var s = '  foo bar  ';\n" +
            "vmd.String.trim(s) ; // 返回 'foo bar' ",
    comment: getFormatComment("trim",
        "删除字符串两旁的空白符",
        ["{String} str-原字符串",
        "return String  裁剪后的字符串"],
        "var s = '  foo bar  ';\n" +
        "vmd.String.trim(s) \n; " +
        "// 返回 'foo bar' "),
    value: {},
    type: publicMethodsType.fun
},{
    text: "首字母小写",
    name: "uncapitalize",
    Class: "uncapitalize",
    insert: "\n // 把字符串中的第一个英文字母转化为小写 \n"+
        "var newStr = vmd.String.uncapitalize(Word);// 'word'",
    comment: getFormatComment("uncapitalize",
        "把字符串中的第一个英文字母转化为小写",
        ["{String} str-指定字符串   ",
        "return String 处理后的字符串"],
        "var newStr = vmd.String.uncapitalize('Word');\n" +
        "//返回  'word'"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "追加到URL",
    name: "urlAppend",
    Class: "urlAppend",
    insert: "\n // 把字符串追加到URL的查询字符串 \n"+
        "var url = vmd.String.urlAppend(url,str);",
    comment: getFormatComment("urlAppend",
        "把字符串追加到URL的查询字符串",
        ["{String} url-要追加到该URL  ",
        "{String} str-要追加的内容      ",
        "return String 新生成的URl"],
        "<span class='heightlight'>vmd.String.urlAppend(url,str)</span>"),
    value: {},
    type: publicMethodsType.fun
}]);

//commonRoot/commonRoot_Num----------------------------------------------------------------------------------------------------------------------
//添加到主分类-公共函数-数字
addFunc(commonRoot_Num,[{
    text: "判断数字范围",
    name: "constrain",
    Class: "constrain",
    insert:  "\n // 检查给定的数值是否在约束的范围内 \n"+
        "var num = vmd.Number.constrain(num,min,max);",
    comment: getFormatComment("constrain",
        "检查给定的数值是否在约束的范围内",
        ["{Number} num-给定的数字",
        "{Number} min-范围的最小值",
        "{Number} max-范围的最大值",
        "return Number 如果超出范围，则返回约束值，否则返回当前值"],
        "vmd.Number.constrain(num,min,max)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "是否为数字",
    name: "from",
    Class: "from",
    insert: "\n // 验证值是否为数字，并在必要时将其转换为数字。如果不是，则返回指定的默认值 \n"+
        "var num = vmd.Number.from('1.23',1); // returns 1.23;",
    comment: getFormatComment("from",
        "验证值是否为数字，并在必要时将其转换为数字。如果不是，则返回指定的默认值",
        ["{Object} value-被验证的对象",
        "{Number} defaultValue-如果原始值为非数字，则返回的值",
        "return Number 如果是数字返回value，不是数字返回defaultValue"],
        "// 在必要时将value转换为数字\n" +
        "vmd.Number.from('1.23',1);\n" +
        "// returns 1.23"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "随机数",
    name: "randomInt",
    Class: "randomInt",
    insert: "\n // 返回指定范围（包括）之间的随机整数 \n"+
        "var randNum = vmd.Number.randomInt(10,200);",
    comment: getFormatComment("randomInt",
        "返回指定范围（包括）之间的随机整数",
        ["{Number} from-开始的数字",
        "{Number} to-结束的数字",
        "return Number 指定范围（包括）之间的随机整数"],
        "vmd.Number.randomInt(0,100)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "小数位截取",
    name: "toFixed",
    Class: "toFixed",
    insert:"\n // 四舍五入为指定小数位数的数字 \n"+
        "var newNum = vmd.Number.toFixed(1.2573,2);// 1.26",
    comment: getFormatComment("randomInt",
        "四舍五入为指定小数位数的数字",
        ["{Number} value-要格式化的数字",
        "{Number} num-规定小数的位数",
        "return Number 返回转换后的数字"],
        "vmd.Number.toFixed(1.2573,2);// 1.26"),
    value: {},
    type: publicMethodsType.fun
}]);

//commonRoot/commonRoot_Function----------------------------------------------------------------------------------------------------------------------
//添加到主分类-公共函数-函数
addFunc(commonRoot_Function,[{
    text: "延迟调用",
    name: "defer",
    Class: "defer",
    insert: "\n // 延迟调用指定函数 \n"+
            "vmd.Function.defer(fn,millis,[scope],[args]);",
    comment: getFormatComment("randomInt",
        "延迟调用指定函数",
        ["{Function} fn-要延时执行的函数\n" +
        "{Number} millis-延迟时间，以毫秒为单位",
        "{Object} scope-(可选) 该函数执行的作用域(this引用)。 如果省略，默认指向window",
        "{Array} args-(可选) 覆盖原函数的参数列表 (默认为该函数的参数列表)",
        "return Number 可被clearTimeout所使用的timeout id"],
        "<span class='heightlight'>var sayHi = function(name){\n" +
        "    alert('Hi,' + name);\n" +
        "}\n" +
        "// 两秒过后执行的:\n" +
        "vmd.Function.defer(sayHi,2000,this,['Fred']);\n</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "减速代理",
    name: "createThrottled",
    Class: "createThrottled",
    insert: "\n // 创建一个指定函数的减速代理，当减速函数被反复快速回调时， 只有在上次调用完成的指定间间隔之后才会被调用 \n"+
        "vmd.Function.createThrottled(fn,millis,[scope]);",
    comment: getFormatComment("createThrottled",
        "创建一个指定函数的减速代理，当减速函数被反复快速回调时， 只有在上次调用完成的指定间间隔之后才会被调用",
        [" {Function} fn-要执行的函数",
        " {Number} millis-减速函数执行的时间间隔毫秒为单位",
        " {Object} scope-(可选) 传递的函数执行的作用域(this引用)。 如果省略，默认为调用者指定的作用域",
        " return Function 一个函数，在指定的时间间隔调用传递函数"],
        "<span class='heightlight'>vmd.Function.createThrottled(fn,millis,[scope])</span>"),
    value: {},
    type: publicMethodsType.fun
},
//     {
//     text: "函数代理",
//     name: "bind",
//     Class: "bind",
//     insert: "\n // 根据指定函数 fn 创建一个代理函数，更改 this 作用域为传入的作用域， 可以选择重写调用的参数 \n"+
//         "vmd.Function.bind(fn,[scope],[args]);",
//     comment: getFormatComment("bind",
//         "根据指定函数 fn 创建一个代理函数，更改 this 作用域为传入的作用域， 可以选择重写调用的参数",
//         "{Function} fn-要延时执行的函数\n" +
//         "{Object} scope-(可选) 该函数执行的作用域(this引用)。 如果省略，默认指向默认的全局环境对象(通常是window)\n" +
//         "{Array} args-(可选) 覆盖原函数的参数列表 (默认为该函数的参数列表)\n" +
//         "return Number 可被clearTimeout所使用的timeout id",
//         "<span class='heightlight'>vmd.Function.bind(fn,[scope],[args])</span>"),
//     value: {},
//     type: publicMethodsType.fun
// },
    {
    text: "函数拦截",
    name: "createInterceptor",
    Class: "createInterceptor",
    insert: "\n // 创建一个拦截函数。传递的函数在原函数之前被调用 \n"+
        "vmd.Function.createInterceptor(origFn,newFn,[scope]);",
    comment: getFormatComment("createInterceptor",
        "创建一个拦截函数。传递的函数在原函数之前被调用",
        ["{Function} origFn-原始函数 ",
        "{Function} newFn-新的拦截函数 ",
        "{Object} scope-(可选)函数执行的作用域(this引用)。默认指向被调用的原函数作用域或window ",
        "return Function 新产生的函数"],
        "var sayHi = function(name){\n" +
        "    alert('Hi,' + name);\n" +
        "}\n" +
        "// 创建新的验证函数:\n" +
        "var sayHiToFriend = vmd.Function.createInterceptor(sayHi,function(name){\n" +
        "    return name == 'Brian';\n" +
        "});\n" +
        "sayHiToFriend('Fred');  // 没提示\n" +
        "sayHiToFriend('Brian'); // 提示 \"Hi,Brian\""),
    value: {},
    type: publicMethodsType.fun
}]);

//commonRoot/commonRoot_Cookie----------------------------------------------------------------------------------------------------------------------
//添加到主分类-公共函数-缓存
addFunc(commonRoot_Cookie,[{
    text: "设置cookie",
    name: "set",
    Class: "set",
    insert: "\n // 设置一个cookie\n" +
        "vmd.Cookie.set(key,value,timeout);",
    comment: getFormatComment("set",
        "设置一个cookie",
        ["{String} key-设置的cookie名称 ",
        "{String} value-设置的值",
        "{number} timeout-过期的时间（单位天）"],
        "<span class='heightlight'>vmd.Cookie.set(key,value,timeout)</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取cookie",
    name: "get",
    Class: "get",
    insert:  "\n // 获取cookie\n" +
    "vmd.Cookie.get(key);",
    comment: getFormatComment("get",
        "设置一个cookie",
        ["{String} key-设置的cookie名称 ",
        "return {String} 设置的cookie值" ],
        "<span class='heightlight'>vmd.Cookie.get(key)</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "删除cookie",
    name: "del",
    Class: "del",
    insert: "\n // 删除一个指定名称的cookie \n" +
    "vmd.Cookie.del(key);",
    comment: getFormatComment("del",
        "设置一个cookie",
        ["{String} key 设置的cookie名称"],
        "<span class='heightlight'>vmd.Cookie.del(key)</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "删除所有cookie",
    name: "clear",
    Class: "clear",
    insert:"\n // 删除所有cookie \n"+
        "vmd.Cookie.clear();",
    comment: getFormatComment("clear",
        "删除所有cookie",
        [],
        "<span class='heightlight'>vmd.Cookie.clear()</span>"),
    value: {},
    type: publicMethodsType.fun
}]);

//commonRoot/commonRoot_Window----------------------------------------------------------------------------------------------------------------------
//添加到主分类-公共函数-窗口
addFunc(commonRoot_Window,[{
	text: "创建窗口",
	name: "window",
	Class: "window",
	insert: "\n // 创建一个新窗口（有url指向） \n"+
    "var newWin = new vmd.window({\n" +
    "   url: '/modules/eQ9ULgcVb1/eQ9ULgcVb5/hw637926c3.html',\n" +
    "   title: '方法设置',\n" +
    "   enableLoading: true,//启用进度加载\n" +
    "   width: 960,\n" +
    "   height:620,\n" +
    "   auto: false,//auto为true 自动适应窗口，配合offset使用\n" +
    "   params:{} //url中追加的编码的参数，json格式 \n" +
    "  })\n" +
    "  newWin.show();//窗口显示\n" +
    "  newWind.hide() //窗口隐藏 \n" +
    "\n // 创建一个新窗口（无url指向） \n"+
    " new vmd.window({\n" +
    "    title: 'Hello',\n" +
    "    height: 200,\n" +
    "    width: 400,\n" +
    "    layout: 'fit',\n" +
    "    items: {  \n" +
    "        xtype: 'grid',\n" +
    "        border: false,\n" +
    "        columns: [{header: 'World'}],\n" +
    "        style: {\n" +
    "            width: '95%',\n" +
    "            marginBottom: '10px'\n" +
    "        }\n" +
    "    }\n" +
    "}).show();",
	comment: getFormatComment("window",
		"创建一个新窗口",
		["{String} url-需要打开子页面的url地址（vmd.2.0中需要打开模块的路径，把后缀.vmd替换成.html）",
		"{String} title-提示标题",
        "{Boolean} maximized-为true时初始化以最大状态显示窗体",
        "{Boolean} maximizable-为true时显示最大化按钮并且允许用户最大化窗口，为false时隐藏最大化按钮 并且不允许最大化窗口",
        "{Boolean} minimizable-为true时显示最小化按钮并且允许用户最小化窗口，为false时隐藏最小化按钮 并且不允许最小化窗口",
        "{Boolean} resizable-为true允许用户调整每个边缘和窗口的角落，为false时禁用调",
        "{String} titleAlign-可以设置标题对齐方式为\"left\"(左),\"right\"(右) 或者 \"center\"(居中)",
        "{Object} items-单个组件,或者是以数组形式定义的子组件集合 将会自动添加到容器中去",
        "{String/Object} layout-为了保证子组件的大小和位置,通常开发者需要进行布局管理， 必须通过layout项进行配置",
        "{String/Object} style-自定义风格规范适用于该组件的元素",
        "{String} xtype-组件类型",
		"{Boolean} modal-True 表示为当window显示时对其后面的一切内容进行遮罩",
		"{Array} buttons -用于添加停靠在面板底部的按钮的便捷配置",
        ],
		" new vmd.window({\n" +
        "        xtype: \"window\",\n" +
        "        title: \"分类\",\n" +
        "        width: 300,\n" +
        "        height: 150,\n" +
        "        layout: \"form\",\n" +
        "        bodyStyle: 'padding:15px',\n" +
        "        labelAlign: \"left\",\n" +
        "        labelWidth: 40,\n" +
        "        modal: true,\n" +
        "        items: {\n" +
        "            id: 'filename',\n" +
        "            xtype: \"textfield\",\n" +
        "            fieldLabel: \"名称\",\n" +
        "            anchor: \"100%\",\n" +
        "        },\n" +
        "        buttons: [{\n" +
        "            text: \"确定\",\n" +
        "            handler: function() {\n" +
        "                // doSomething\n" +
        "            }\n" +
        "        },{\n" +
        "            text: \"取消\",\n" +
        "            handler: function() {\n" +
        "                // doSomething\n" +
        "            }\n" +
        "        }]\n" +
        "    }).show();"),
	value: {},
	type: publicMethodsType.fun
},{
    text: "提示框",
    name: "alert",
    Class: "alert",
    insert: "\n //弹窗提示\n" +
    "vmd.alert('提示','数据提交失败',[fn]);",
    comment: getFormatComment("alert",
        "弹窗提示",
        ["{String} title-标题内容",
        "{String} msg-提示内容",
        "{Function} fn-可选 回调函数",
        "{settings}-可配置的参数 如{buttons:vmd.Msg.YESNOCANCEL}"],
        "vmd.alert('提示','提交数据失败',[fn])"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "顶部浮动提示",
    name: "tip",
    Class: "tip",
    insert: "\n // 顶部浮动提示 \n" +
    "vmd.tip('提交成功',success);",
    comment: getFormatComment("tip",
        "顶部浮动提示",
        ["{String} msg-提示内容 ",
        "{String} type-提示类型，包含：'success'、'info'、'warning'、'error' ",
        "return {void}"],
        "vmd.tip('提交成功',success)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "pop提示",
    name: "pop",
    Class: "pop",
    insert: " \n // pop提示，显示位置在页面中间 \n" +
    "vmd.pop('pop提示');",
    comment: getFormatComment("pop",
        "pop提示，显示位置在页面中间 ",
        ["{String} msg  提示内容 ",
        "return {void}"],
        "vmd.pop('pop提示')"),
    value: {},
    type: publicMethodsType.fun
}]);

//commonRoot/commonRoot_KeyMap----------------------------------------------------------------------------------------------------------------------
//添加到主分类-公共函数-键盘操作
addFunc(commonRoot_KeyMap,[{
    text: "创建键盘映射",
    name: "KeyMap",
    Class: "KeyMap",
    insert: "\n //处理元素或组件键盘事件与处理函数之间的映射 \n" +
    "var map = new Ext.KeyMap(\"my-element\",{\n" +
    "     key: 13,\n" +
    "     fn: myHandler,\n" +
    "     scope: myObject\n" +
    " });\n",
    comment: getFormatComment("KeyMap",
        "处理元素或组件键盘事件与处理函数之间的映射",
        [" {String} target-事件源，元素或组件 ",
        " {String} key-键 ",
        " {Funtion} fn-事件函数 ",
        " {Object} scope-作用域 ",
        " return {void}"],
        " //创建单个键\n" +
        "var map = new vmd.KeyMap(\"my-element\",{\n" +
        "    key: 13,\n" +
        "    fn: myHandler,\n" +
        "    scope: myObject\n" +
        "});\n" +
        "//创建多个键同一个事件触发\n" +
        "var map = new vmd.KeyMap(\"my-element\",{\n" +
        "    key: \"a\\r\\n\\t\",\n" +
        "    fn: myHandler,\n" +
        "    scope: myObject\n" +
        "});\n" +
        "//创建多个键不同的事件触发\n" +
        "var map = new vmd.KeyMap(\"my-element\",[\n" +
        "    {\n" +
        "        key: [10,13],\n" +
        "        fn: function(){ alert(\"Return was pressed\"); }\n" +
        "    },{\n" +
        "        key: \"abc\",\n" +
        "        fn: function(){ alert('a,b or c was pressed'); }\n" +
        "    },{\n" +
        "        key: \"\\t\",\n" +
        "        ctrl:true,\n" +
        "        shift:true,\n" +
        "        fn: function(){ alert('Control + shift + tab was pressed.'); }\n" +
        "    }\n" +
        "]);"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "创建键盘导航",
    name: "KeyNav",
    Class: "KeyNav",
    insert: "\n //创建键盘导航 \n" +
    "var nav = new vmd.KeyNav(\"my-element\",{\n" +
    "    \"left\" : function(e){\n" +
    "        this.moveLeft(e.ctrlKey);\n" +
    "    },\n" +
    "    \"right\" : function(e){\n" +
    "        this.moveRight(e.ctrlKey);\n" +
    "    },\n" +
    "    \"enter\" : function(e){\n" +
    "        this.save();\n" +
    "    },\n" +
    "    scope : this\n" +
    "});\n" +
    "//支持的键： enter,left,right,up,down,tab,esc,pageUp,pageDown,del,home,end;",
    comment: getFormatComment("KeyNav",
        "键盘方向键加上一层快捷的包装器,允许为某个功能绑定方向键，按下的时候即调用该功能",
        [" {String} target  事件源，元素或组件 ",
        " return {void}" ],
        " var nav = new vmd.KeyNav(\"my-element\",{\n" +
        "    \"left\" : function(e){\n" +
        "        this.moveLeft(e.ctrlKey);\n" +
        "    },\n" +
        "    \"right\" : function(e){\n" +
        "        this.moveRight(e.ctrlKey);\n" +
        "    },\n" +
        "    \"enter\" : function(e){\n" +
        "        this.save();\n" +
        "    },\n" +
        "    scope : this\n" +
        "});\n" +
        "//支持的键： enter,left,right,up,down,tab,esc,pageUp,pageDown,del,home,end"),
    value: {},
    type: publicMethodsType.fun
}]);

//commonRoot/commonRoot_Json----------------------------------------------------------------------------------------------------------------------
//添加到主分类-公共函数-Json
addFunc(commonRoot_Json,[{
    text: "对象转字符串",
    name: "encode",
    Class: "encode",
    insert:"\n //将对象转为字符串 \n" +
        "var json = vmd.encode(obj);",
    comment: getFormatComment("encode",
        "将对象转为字符串",
        ["{Object} obj-序列化的对象 ",
        "return {String} json字符串"],
        "<span class='heightlight'>vmd.encode(obj)</span>"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "字符串转对象",
    name: "decode",
    Class: "decode",
    insert:"\n //将字符串转换为对象 \n" +
        "var obj = vmd.decode(json);",
    comment: getFormatComment("decode",
        "将字符串转换为对象",
        ["{String} json-字符串 ",
        "return {Object} obj 序列化的对象"],
        "<span class='heightlight'>vmd.decode(json)</span>"),
    value: {},
    type: publicMethodsType.fun
}]);

//commonRoot/commonRoot_Ajax----------------------------------------------------------------------------------------------------------------------
//添加到主分类-公共函数-Ajax
addFunc(commonRoot_Ajax,[{
    text:"ajax",
    name: "ajax",
    Class: "ajax",
    insert:"\n //发送ajax请求 \n" +
    "vmd.ajax({\n" +
    "    type: \"POST\",\n" +
    "    url: \"some.php\",\n" +
    "    cache:true,\n" +
    "    data: {name:\"Joh\",location:\"Boston\"},\n" +
    "    timeout:10000,\n" +
    "    dataType:'json',\n" +
    "    success: function(msg,textStatus,xdr){\n" +
    "      alert(\"Data Saved: \" + msg);\n" +
    "    },\n" +
    "    error:function(XMLHttpRequest,textStatus,errorThrown){\n" +
    "    }\n" +
    "  });",
    comment: getFormatComment("ajax",
        "ajax请求",
        ["{String} url-送请求地址",
        "{String} type-请求类型 'post','get'",
        "{Boolean} cache-是否读取缓存 默认true",
        "{Object} data-待发送Key/value参数",
        "{Number} timeout-超时时间",
        "{String} dataType-服务器返回的类型，为空会根据mine自动返回",
        "{function} success-载入成功时回调函数",
        "{function} error-载入失败时时回调函数"],
        "vmd.ajax({\n" +
        "    type: \"POST\",\n" +
        "    url: \"some.php\",\n" +
        "    cache:true,//默认true\n" +
        "    data: {name:\"Joh\",location:\"Boston\"},\n" +
        "    timeout:10000,//超时时间\n" +
        "    dataType:'json',//服务器返回的类型，为空会根据mine自动返回\n" +
        "    success: function(msg,textStatus,xdr){\n" +
        "      alert(\"Data Saved: \" + msg);\n" +
        "    },\n" +
        "    error:function(XMLHttpRequest,textStatus,errorThrown){\n" +
        "    }\n" +
        "  });"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "get操作",
    name: "get",
    Class: "get",
    insert:"\n //通过http get请求载入信息\n" +
    "vmd.get(\"test.cgi\",{ name: \"John\",time: \"2pm\" },\n" +
    "  function(data){\n" +
    "    alert(\"Data Loaded: \" + data);\n" +
    "  });\n",
    comment: getFormatComment("get",
        "通过http get请求载入信息",
        ["{String} url-发送请求地址",
        "{Object} data-待发送Key/value参数",
        "{function} callback-载入成功时回调函数",
        "{string} type-返回内容格式，xml,html,script,json,text,_default"],
        "vmd.get(\"test.cgi\",{ name: \"John\",time: \"2pm\" },\n" +
        "  function(data){\n" +
        "    alert(\"Data Loaded: \" + data);\n" +
        "  });\n"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "post操作",
    name: "post",
    Class: "post",
    insert:"\n //通过http post请求载入信息\n" +
    "vmd.post(\"test.cgi\",{ name: \"John\",time: \"2pm\" },\n" +
    "  function(data){\n" +
    "    alert(\"Data Loaded: \" + data);\n" +
    "  });",
    comment: getFormatComment("post",
        "通过http get请求载入信息",
        ["{String} url-发送请求地址",
        "{Object} data-待发送Key/value参数",
        "{function} callback-载入成功时回调函数",
        "{string} type-返回内容格式，xml,html,script,json,text,_default"],
        "vmd.post(\"test.cgi\",{ name: \"John\",time: \"2pm\" },\n" +
        "  function(data){\n" +
        "    alert(\"Data Loaded: \" + data);\n" +
        "  });"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "getJson操作",
    name: "getJson",
    Class: "getJson",
    insert:"\n // 通过http get请求载入Json数据\n" +
    "vmd.getJSON('test.js',function(json){ \n" +
    " alert('JSON Data: ' + json.users[3].name); \n" +
    "});",
    comment: getFormatComment("getJson",
        "通过http get请求载入信息",
        ["{String} url-发送请求地址",
        "{Object} data-待发送Key/value参数",
        "{function} callback-载入成功时回调函数"],
        "vmd.getJSON('test.js',function(json){ \n" +
        " alert('JSON Data:'+json.users[3].name); \n" +
        "});"),
    value: {},
    type: publicMethodsType.fun
}]);

//commonRoot/commonRoot_Collection----------------------------------------------------------------------------------------------------------------------
//添加到主分类-公共函数-集合结构
addFunc(commonRoot_Collection,[{
    text: "创建集合对象",
    name: "Collection",
    Class: "Collection",
    insert:"\n // 创建一个集合对象\n"+
        "var obj = new vmd.Collection();",
    comment: getFormatComment("Collection",
        "创建一个集合对象",
        ["return {Object} obj 新的集合对象"],
        "vmd.Collection();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "添加项",
    name: "add",
    Class: "",
    insert:"\n // 添加一个项目到集合\n"+
    "var obj = new vmd.Collection();\n" +
    "obj.add('name','张三');",
    comment: getFormatComment("add",
        "添加一个项目到集合",
        ["{String} key-关联到item的key",
        "{Object} item-要添加的item",
        "return {Object} 刚添加的item"],
        "var obj = new vmd.Collection();\n" +
        "obj.add('name','张三');"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "添加一组项",
    name: "addAll",
    Class: "",
    insert:"\n // 添加一个数组，或者对象的元素到集合中\n"+
    "var obj = new vmd.Collection();\n" +
    "obj.addAll(objs);",
    comment: getFormatComment("addAll",
        "添加一个数组，或者对象的元素到集合中",
        ["{Oject/Array} objs-要添加的项"],
        "var people = new vmd.Collection();\n" +
        "people.addAll([\n" +
        "    {id: 1,age: 25,name: 'Ed'},\n" +
        "    {id: 2,age: 24,name: 'Tommy'},\n" +
        "    {id: 3,age: 24,name: 'Arne'},\n" +
        "    {id: 4,age: 26,name: 'Aaron'}\n" +
        "]);"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "清空",
    name: "clear",
    Class: "",
    insert:"\n // 清空集合中的所有项\n"+
    "var obj = new vmd.Collection();\n" +
    "obj.clear();",
    comment: getFormatComment("clear",
        "清空集合中的所有项",
        [],
        "var obj = new vmd.Collection();\n" +
        "obj.clear();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "克隆",
    name: "clone",
    Class: "",
    insert:"\n // 创建此集合的一个浅拷贝\n"+
    "var obj = new vmd.Collection();\n" +
    "var newObj = obj.clone();",
    comment: getFormatComment("clone",
        "创建此集合的一个浅拷贝",
        ["return 返回新拷贝的集合"],
        "var obj = new vmd.Collection();\n" +
        "var newObj = obj.clone();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "是否包括key",
    name: "containsKey",
    Class: "",
    insert:"\n // 判断集合中是否包括要查找的key\n"+
    "var obj = new vmd.Collection();\n" +
    "var isHasKey = obj.containsKey(key);",
    comment: getFormatComment("containsKey",
        "判断集合中是否包括key",
        ["{String} key-集合中的key",
        "return {Boolean} "],
        "var obj = new vmd.Collection();\n" +
        "var isHasKey = obj.containsKey(key);"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "集合遍历",
    name: "each",
    Class: "",
    insert:"\n // 集合遍历方法\n"+
    "var obj = new vmd.Collection();\n" +
    "obj.each(function(item,index,length){},[scope]);",
    comment: getFormatComment("each",
        "集合遍历方法",
        ["{Function} fn-遍历函数，参数为item，index，length",
        "{Object} scope-可选， 传入的作用域"],
        "var people = new vmd.Collection();\n" +
        "people.addAll([\n" +
        "    {id: 1,age: 25,name: 'Ed'},\n" +
        "    {id: 2,age: 24,name: 'Tommy'},\n" +
        "    {id: 3,age: 24,name: 'Arne'},\n" +
        "    {id: 4,age: 26,name: 'Aaron'}\n" +
        "]);\n" +
        "people.each(function(item,index){\n" +
            "   if(item.age>24){ \n" +
            "       alert(item.name) \n"+
            "   }\n"+
        "},[scope]);"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "集合过滤",
    name: "filter",
    Class: "",
    insert:"\n // 通过属性过滤返回匹配的项\n"+
    "var obj = new vmd.Collection();\n" +
    "var arr = obj.filter(property,value);",
    comment: getFormatComment("filter",
        "通过属性过滤返回匹配的项",
        ["{String} property-对象的属性",
        "{String} value-匹配的值",
        "return {Object} 返回匹配的集合"],
        "var people = new vmd.Collection();\n" +
        "people.addAll([\n" +
        "    {id: 1,age: 25,name: 'Ed'},\n" +
        "    {id: 2,age: 24,name: 'Tommy'},\n" +
        "    {id: 3,age: 24,name: 'Arne'},\n" +
        "    {id: 4,age: 26,name: 'Aaron'}\n" +
        "]);\n" +
        "var middleAged = people.filter('age',24); "),
    value: {},
    type: publicMethodsType.fun
},{
    text: "集合过滤通过方法",
    name: "filterBy",
    Class: "",
    insert:"\n // 通过方法过滤\n"+
    "var obj = new vmd.Collection();\n" +
    "var arr = obj.filterBy(fn,[scope]);",
    comment: getFormatComment("filterBy",
        "通过方法过滤",
        ["{Function} fn-回调函数，参数为object,key",
        "{Object} scope-可选，作用域",
        "return {Object} 返回匹配的集合"],
        "var coll = new vmd.Collection();\n" +
        "coll.add('key1',100);\n" +
        "coll.add('key2',-100);\n" +
        "coll.add('key3',17);\n" +
        "coll.add('key4',0);\n" +
        "var biggerThanZero = coll.filterBy(function(value){\n" +
        "    return value > 0;\n" +
        "});\n" +
        "console.log(biggerThanZero);"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "集合查找通过方法",
    name: "findBy",
    Class: "",
    insert:"\n // 通过方法查找返回第一条匹配的项\n"+
    "var obj = new vmd.Collection();\n" +
    "var item = obj.findBy(fn,[scope]);",
    comment: getFormatComment("findBy",
        "通过方法查找返回第一条匹配的项",
        ["{Function} fn-回调函数，参数为object,key",
        "{Object} scope-可选，作用域",
        "return {Object} 返回匹配的第一项"],
        "var people = new vmd.Collection();\n" +
        "people.addAll([\n" +
        "    {id: 1,age: 25,name: 'Ed'},\n" +
        "    {id: 2,age: 24,name: 'Tommy'},\n" +
        "    {id: 3,age: 24,name: 'Arne'},\n" +
        "    {id: 4,age: 26,name: 'Aaron'}\n" +
        "]);\n" +
        "var item = people.findBy(function(item,index){\n" +
        "    return item.age>24 \n"+
        "},[scope]);"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "集合查找通过属性",
    name: "findIndex",
    Class: "",
    insert:"\n // 过属性查找返回第一条匹配的索引\n"+
    "var obj = new vmd.Collection();\n" +
    "var index = obj.findBy(property,value);",
    comment: getFormatComment("findIndex",
        "通过属性查找返回第一条匹配的索引",
        ["{String} property-属性",
        "{String} value-值",
        "return {Number} 返回匹配项的索引"],
        "var people = new vmd.Collection();\n" +
        "people.addAll([\n" +
        "    {id: 1,age: 25,name: 'Ed'},\n" +
        "    {id: 2,age: 24,name: 'Tommy'},\n" +
        "    {id: 3,age: 24,name: 'Arne'},\n" +
        "    {id: 4,age: 26,name: 'Aaron'}\n" +
        "]);\n" +
        "var index = people.filter('age',24); // 1"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "集合查找通过方法",
    name: "findIndexBy",
    Class: "",
    insert:"\n // 通过方法查找返回第一条匹配的索引\n"+
    "var obj = new vmd.Collection();\n" +
    "var index = obj.findIndexBy(fn,[scope]);",
    comment: getFormatComment("findIndexBy",
        "通过方法查找返回第一条匹配的索引",
        ["{Function} fn-回调函数，参数为object,key",
        "{Object} scope-可选，作用域",
        "return {Object} 返回匹配项的索引"],
        "var people = new vmd.Collection();\n" +
        "people.addAll([\n" +
        "    {id: 1,age: 25,name: 'Ed'},\n" +
        "    {id: 2,age: 24,name: 'Tommy'},\n" +
        "    {id: 3,age: 24,name: 'Arne'},\n" +
        "    {id: 4,age: 26,name: 'Aaron'}\n" +
        "]);\n" +
        "var index = people.findIndexBy(function(item,index){\n" +
        "    return item.age>24 \n"+
        "},[scope]); // 0"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "第一项",
    name: "first",
    Class: "",
    insert:"\n // 返回集合中的第一项\n"+
    "var obj = new vmd.Collection();\n" +
    "var item = obj.first();",
    comment: getFormatComment("first",
        "返回集合中的第一项",
        ["return {Object} 合中的第一项"],
        "var people = new vmd.Collection();\n" +
        "people.addAll([\n" +
        "    {id: 1,age: 25,name: 'Ed'},\n" +
        "    {id: 2,age: 24,name: 'Tommy'},\n" +
        "    {id: 3,age: 24,name: 'Arne'},\n" +
        "    {id: 4,age: 26,name: 'Aaron'}\n" +
        "]);\n" +
        "var item = people.first();\n" +
        "//{id: 1,age: 25,name: 'Ed'} "),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取指定项",
    name: "get",
    Class: "",
    insert:"\n // 获取指定集合中的项\n"+
    "var obj = new vmd.Collection();\n" +
    "var item = obj.get(key);",
    comment: getFormatComment("get",
        "获取指定集合中的项",
        ["{String/Number} key-项目索引或name",
        "return {Object} 获取指定集合中的项"],
        "var obj = new vmd.Collection();\n" +
        "var item = obj.get(key);"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "集合项数",
    name: "getCount",
    Class: "",
    insert:"\n // 获取指定集合中的项的总数\n"+
    "var obj = new vmd.Collection();\n" +
    "var sum = obj.getCount();",
    comment: getFormatComment("getCount",
        "获取指定集合中的项的总数",
        ["return {Number} 总数"],
        "var people = new vmd.Collection();\n" +
        "people.addAll([\n" +
        "    {id: 1,age: 25,name: 'Ed'},\n" +
        "    {id: 2,age: 24,name: 'Tommy'},\n" +
        "    {id: 3,age: 24,name: 'Arne'},\n" +
        "    {id: 4,age: 26,name: 'Aaron'}\n" +
        "]);\n" +
        "var sum = people.getCount();//4"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "集合截取",
    name: "getRange",
    Class: "",
    insert:"\n // 获取指定索引之间的项的集合\n"+
    "var obj = new vmd.Collection();\n" +
    "var newObj = obj.getRange(tartIndex,endIndex);",
    comment: getFormatComment("getRange",
        "获取指定索引之间的项的集合",
        ["{Number} starIndex-可选,开始索引",
        "{Number} endIndex-可选，结束索引",
        "return {Object} 区间集合"],
        "var people = new vmd.Collection();\n" +
        "people.addAll([\n" +
        "    {id: 1,age: 25,name: 'Ed'},\n" +
        "    {id: 2,age: 24,name: 'Tommy'},\n" +
        "    {id: 3,age: 24,name: 'Arne'},\n" +
        "    {id: 4,age: 26,name: 'Aaron'}\n" +
        "]);\n" +
        "var newObj = people.getRange(1,3);"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "查找项索引",
    name: "indexOf",
    Class: "",
    insert:"\n // 通过指定集合对象来返回匹配项目的索引\n"+
    "var obj = new vmd.Collection();\n" +
    "var index = obj.indexOf(obj);",
    comment: getFormatComment("indexOf",
        "通过指定集合对象来返回匹配项目的索引",
        ["{Object}o 要匹配的项",
        "return {Number}-索引"],
        "var people = new vmd.Collection();\n" +
        "people.addAll([\n" +
        "    {id: 1,age: 25,name: 'Ed'},\n" +
        "    {id: 2,age: 24,name: 'Tommy'},\n" +
        "    {id: 3,age: 24,name: 'Arne'},\n" +
        "    {id: 4,age: 26,name: 'Aaron'}\n" +
        "]);\n" +
        "var index = people.indexOf({id: 2,age: 24,name: 'Tommy'});//0"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "通过key查找项索引",
    name: "indexOfKey",
    Class: "",
    insert:"\n // 通过指定集合对象的key来返回匹配项目的索引\n"+
    "var obj = new vmd.Collection();\n" +
    "var index = obj.indexOfKey(key);",
    comment: getFormatComment("indexOfKey",
        "通过指定集合对象的key来返回匹配项目的索引",
        ["{String}key 要匹配项的key",
        "return {Number} 索引"],
        "var obj = new vmd.Collection();\n" +
        "var index = obj.indexOfKey(key);"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "插入项",
    name: "insert",
    Class: "",
    insert:"\n // 向集合中插入一项\n"+
    "var obj = new vmd.Collection();\n" +
    "obj.insert(index,key,[obj]);",
    comment: getFormatComment("insert",
        "向集合中插入一项",
        ["{Number}index-插入的位置",
        "{String}key-插入的名称",
        "{Object}obj-可选，插入的对象",
        "return {Object} 返回插入的项"],
        "var obj = new vmd.Collection();\n" +
        "var index = obj.insert(index,key,[obj]);"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "最后一项",
    name: "last",
    Class: "",
    insert:"\n // 返回集合中的最后一项\n"+
    "var obj = new vmd.Collection();\n" +
    "var item = obj.last();",
    comment: getFormatComment("last",
        "返回集合中的最后一项",
        ["return {Object} 合中的最后一项"],
        "var people = new vmd.Collection();\n" +
        "people.addAll([\n" +
        "    {id: 1,age: 25,name: 'Ed'},\n" +
        "    {id: 2,age: 24,name: 'Tommy'},\n" +
        "    {id: 3,age: 24,name: 'Arne'},\n" +
        "    {id: 4,age: 26,name: 'Aaron'}\n" +
        "]);\n" +
        "var item = people.last();\n" +
        "//{id: 4,age: 26,name: 'Aaron'}"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "删除项",
    name: "remove",
    Class: "",
    insert:"\n // 通过指定的对象，移除集合中指定项\n"+
    "var obj = new vmd.Collection();\n" +
    "obj.remove(obj);",
    comment: getFormatComment("remove",
        "通过指定的对象，移除集合中指定项",
        ["{Object} obj-要删除的项",
        "return {Object/Boolean}-返回移除的项，项不存在返回flase"],
        "var people = new vmd.Collection();\n" +
        "people.addAll([\n" +
        "    {id: 1,age: 25,name: 'Ed'},\n" +
        "    {id: 2,age: 24,name: 'Tommy'},\n" +
        "    {id: 3,age: 24,name: 'Arne'},\n" +
        "    {id: 4,age: 26,name: 'Aaron'}\n" +
        "]);\n" +
        "var item = people.remove({id: 3,age: 24,name: 'Arne'});"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "通过索引删除项",
    name: "removeAt",
    Class: "",
    insert:"\n // 通过指定的集合索引，移除集合中指定项\n"+
    "var obj = new vmd.Collection();\n" +
    "obj.removeAt(index);",
    comment: getFormatComment("removeAt",
        "通过指定的集合索引，移除集合中指定项",
        ["{Number} index-要删除项的索引",
        "return {Object/Boolean}-返回移除的项，项不存在返回flase"],
        "var people = new vmd.Collection();\n" +
        "people.addAll([\n" +
        "    {id: 1,age: 25,name: 'Ed'},\n" +
        "    {id: 2,age: 24,name: 'Tommy'},\n" +
        "    {id: 3,age: 24,name: 'Arne'},\n" +
        "    {id: 4,age: 26,name: 'Aaron'}\n" +
        "]);\n" +
        "var item = obj.removeAt(2);"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "通过key删除项",
    name: "removeKey",
    Class: "",
    insert:"\n // 通过指定的集合名称，移除集合中指定项\n"+
    "var obj = new vmd.Collection();\n" +
    "obj.removeKey(key);",
    comment: getFormatComment("removeKey",
        "通过指定的集合名称，移除集合中指定项",
        ["{Number} index-要删除项的索引",
        "return {Object}-返回移除的项，项不存在返回flase"],
        "var obj = new vmd.Collection();\n" +
        "var item = obj.removeKey(key);"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "替换项",
    name: "replace",
    Class: "",
    insert:"\n // 通过指定的key，替换集合中的项\n"+
    "var obj = new vmd.Collection();\n" +
    "obj.replace(key,[obj]);",
    comment: getFormatComment("replace",
        "通过指定的key，替换集合中的项",
        ["{String} Key-要替换的项的名称",
        "{Object} obj-与第一个参数key匹配的项",
        "return {Object} 新的项"],
        "var obj = new vmd.Collection();\n" +
        "var item = obj.replace(key,obj);"),
    value: {},
    type: publicMethodsType.fun
}]);

//commonRoot/commonRoot_Map----------------------------------------------------------------------------------------------------------------------
//添加到主分类-公共函数-字典结构
addFunc(commonRoot_Map,[{
    text: "创建map",
    name: "map",
    Class: "",
    insert:"\n // 实例化一个字段结构\n"+
        "var map = new vmd.Map();",
    comment: getFormatComment("map",
        "实例化一个字段结构",
        [],
        "var map = new vmd.Map();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "创建键值对",
    name: "put",
    Class: "",
    insert:"\n // 创建一个键值对\n"+
    "var map = new vmd.Map();\n" +
    "map.put('key1','value1');",
    comment: getFormatComment("put",
        "创建一个键值对",
        ["{String} Key ",
        "{String/Object} value"],
        "var map = new vmd.Map();\n" +
        "map.put('key1','value1');"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取键值",
    name: "get",
    Class: "",
    insert:"\n // 获取某键对应的值\n"+
    "var map = new vmd.Map();\n" +
    "var value = map.get(key);",
    comment: getFormatComment("get",
        "获取某键对应的值",
        ["{String} Key ",
        "return {String/Object} value"],
        "var map = new vmd.Map();\n" +
        "var value = map.get(key)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "键值对判断",
    name: "contains",
    Class: "",
    insert:"\n // 判断是否包含一个键值对\n"+
    "var map = new vmd.Map();\n" +
    "var ishas = map.contains(key);",
    comment: getFormatComment("contains",
        "判断是否包含一个键值对",
        ["{String} Key ",
        "return {Boolean}"],
        "var map = new vmd.Map();\n" +
        "var ishas = map.contains(key)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "删除键值对",
    name: "remvoe",
    Class: "",
    insert:"\n // 删除一个键值对\n"+
    "var map = new vmd.Map();\n" +
    "map.remove(key);",
    comment: getFormatComment("remvoe",
        "删除一个键值对",
        ["{String} Key ",
        "return {String/Object} 被删除的值"],
        "var map = new vmd.Map();\n" +
        " map.remove(key)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "键值对的数量",
    name: "size",
    Class: "",
    insert:"\n // 获取键值对的数量\n"+
    "var map = new vmd.Map();\n" +
    "var size = map.size();",
    comment: getFormatComment("size",
        "获取键值对的数量",
        ["return {Number}"],
        "var map = new vmd.Map();\n" +
        "var size = map.size(key)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "清空键值对",
    name: "clear",
    Class: "",
    insert:"\n // 清空键值对\n"+
    "var map = new vmd.Map();\n" +
    "map.clear();",
    comment: getFormatComment("clear",
        "清空键值对",
        [],
        "var map = new vmd.Map();\n" +
        "map.clear()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取键的集合",
    name: "keys",
    Class: "",
    insert:"\n // 获取键的集合\n"+
    "var map = new vmd.Map();\n" +
    "var keys = map.keys();",
    comment: getFormatComment("keys",
        "获取键的集合",
        ["return {Array}"],
        "var map = new vmd.Map();\n" +
        "var keys = map.keys()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取值的集合",
    name: "values",
    Class: "",
    insert:"\n // 获取值的集合\n"+
    "var map = new vmd.Map();\n" +
    "var values = map.values();",
    comment: getFormatComment("values",
        "获取值的集合",
        ["return {Array}"],
        "var map = new vmd.Map();\n" +
        "var values = map.values()"),
    value: {},
    type: publicMethodsType.fun
}]);

//commonRoot/commonRoot_Chart----------------------------------------------------------------------------------------------------------------------
//添加到主分类-公共函数-曲线对象
addFunc(commonRoot_Chart,[
    {
	    text: "加载必须脚本文件",
	    name: "chartJSInit",
	    Class: "",
	    insert:"\n // 加载必须脚本文件 \n"+
	        "vmd.chartJSInit(function(){ \n "+
                // 此处开始创建曲线代码
            "});",
	    comment: getFormatComment("chart",
	        "加载必须脚本文件",
	         [],
	        "\n // 加载必须脚本文件 \n"+
	        "vmd.chartJSInit(function(){ \n "+
                // 此处开始创建曲线代码
            "});"),
	    value: {},
	    type: publicMethodsType.fun
    },
	{
	    text: "创建Chart对象",
	    name: "Chart",
	    Class: "",
	    insert:"\n // 实例化一个曲线对象 \n"+
	        "var chart = new HwChart(container,type);",
	    comment: getFormatComment("chart",
	        "实例化一个曲线对象",
	         ["{Object} container-曲线容器对象（必须是vmd容器对象）",
	        "{type} type-曲线类型 line/pie/column/spline/area/annular 默认为line",
	        "return {Object} 曲线对象"],
	        "var chart = new HwChart(container,type);"),
	    value: {},
	    type: publicMethodsType.fun
    },
    {
	    text: "初始化曲线对象",
	    name: "chartInit",
	    Class: "",
	    insert:"\n // 初始化曲线基本参数 确认序列数量名称及Y轴数量名称 \n"+
	        "chart.chartInit(['产油量', '产水量'], ['产油量', '产水量']);",
	    comment: getFormatComment("chart",
	        "初始化曲线基本参数 确认序列数量名称及Y轴数量名称（创建曲线对象完成后必须要进行chartInit操作） " +
			"注：如果有多条Y轴，序列名称与y轴名称必须一一对应（领个数组长度必须一致），\n" +
            "一个Y轴可以对应多个序列，但是一个序列只能对应一个Y轴",
	         ["{Array} seriesName-序列/指标数量名称  不传或者是空默认只有一条序列",
	        "{Array} yAxisName-Y轴坐标轴的名称  不传或者是空默认只有一条Y轴"],
	        "chart.chartInit(['产油量', '产水量', '含水率'], ['产油量', '产水量', '含水率']);"),
	    value: {},
	    type: publicMethodsType.fun
    },
    {
	    text: "绑定数据",
	    name: "cSetData",
	    Class: "",
	    insert:"\n // 曲线绑定数据 \n"+
	        "chart.cSetData(data)",
	    comment: getFormatComment("chart",
	        "曲线绑定数据",
	         ["{Array} data-绑定的数组对象[{},{},{}]形式"],
	        "chart.cSetData(data)"),
	    value: {},
	    type: publicMethodsType.fun
    },
    {
	    text: "绑定字段",
	    name: "cSetSeriesField",
	    Class: "",
	    insert:"\n // 设置曲线序列对应的字段 \n"+
	        "chart.cSetSeriesField({\n" +
        "        xStr: '',\n" +
        "        yArr: ['产油量', '产水量'],\n" +
        "        yAxisArr: ['产油量', '产水量'],\n" +
        "    })",
	    comment: getFormatComment("chart",
	        "设置曲线序列对应的字段 ",
	         ["{Object} option-{xStr:xStr,yArr:yArr,yAxisArr:yAxisArr}",
	        "{String} xStr-X轴对应字段 必填",
             "{Array} yArr-Y轴对应字段的集合 必填",
             "{Array} yAxisArr-对应所属Y轴  选填  不填默认所有序列都所属第一条Y轴",
             ],
	        "chart.cSetSeriesField({\n" +
            "      xStr: '年月',\n" +
            "      yArr: ['产油量', '产水量'],\n" +
            "      yAxisArr: ['产油量', '产水量'],\n" +
            "   })"),
	    value: {},
	    type: publicMethodsType.fun
    },
    {
        text: "标题设置",
        name: "setTitle",
        Class: "",
        insert:"\n // 标题设置 \n"+
        "chart.setTitle({\n" +
        "   text: '动态曲线示例',\n" +
        "   align: 'center',\n" +
        "   color: 'red',\n" +
        "   fontSize: '20px',\n" +
        "   fontFamily:'SimSun', \n" +
        "   fontWeight: 400\n" +
        " })",
        comment: getFormatComment("chart",
            "标题设置 ",
            [" option{\n" +
            "   text:text, 标题文本 \n" +
            "   align:align, 对齐方式 left，center，right 选填\n" +
            "   color:color, 标题颜色 选填\n" +
            "   fontSize:fontSize,  标题文字大小  选填\n" +
            "   fontFamily:'SimSun', string 文本字形 选填,\n" +
            "   fontWeight:fontWeight  标题文本样式  选填\n" +
            " }"],
            "chart.setTitle({\n" +
            "   text: '动态曲线示例',\n" +
            "   align: 'center',\n" +
            "   color: 'red',\n" +
            "   fontSize: '20px',\n" +
            "   fontWeight: 400\n" +
            " })"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "标题浮动",
        name: "cSetTitleFloat",
        Class: "",
        insert:"\n // 设置标题浮动 \n"+
        "chart.cSetTitleFloat(true)",
        comment: getFormatComment("chart",
            "设置标题浮动",
            ["{Boolen} bool - true为浮动，false为不浮动"],
            "chart.cSetTitleFloat(true)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "X轴隐藏/显示",
        name: "cSetxAxisEnabled",
        Class: "",
        insert:"\n // 设置X轴X轴隐藏/显示 \n"+
        "chart.cSetxAxisEnabled(true)",
        comment: getFormatComment("chart",
            "设置X轴X轴隐藏/显示 ",
            ["{Boolen} bool - true为显示，false为隐藏"],
            "chart.cSetxAxisEnabled(true)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "X轴名称类型",
        name: "cSetxAxis",
        Class: "",
        insert:"\n // 设置X轴的轴名称及轴类型 \n"+
        "chart.cSetxAxis('年月', 2, 'mm-dd');",
        comment: getFormatComment("chart",
            "设置X轴的轴名称及轴类型 ",
            ["{Object} option-{xStr:xStr,yArr:yArr,yAxisArr:yAxisArr}",
                "{String} name-X轴轴名称 ",
                "{Number} xType-xTypeX-轴类型 不传值 默认线性轴 1-线性轴/2-时间轴/3-分类轴/4-对数轴",
                "{String} dateFormat-时间轴时间格式  轴类型为时间轴时传入 默认'yyyy-mm-dd' 选填",
            ],
            "chart.cSetxAxis('年月', 2, 'mm-dd');"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "X轴标题隐藏/显示",
        name: "cSetxAxisTitleEnabled",
        Class: "",
        insert:"\n // 设置X轴标题隐藏/显示 \n"+
        "chart.cSetxAxisTitleEnabled(true)",
        comment: getFormatComment("chart",
            "设置X轴X轴标题隐藏/显示 ",
            ["{Boolen} bool - true为显示，false为隐藏"],
            "chart.cSetxAxisTitleEnabled(true)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "X轴标题样式",
        name: "cSetxAxisTitleStyle",
        Class: "",
        insert:"\n // 设置X轴轴标题样式 \n"+
        "chart.cSetxAxisTitleStyle({\n" +
        "       align: 'high',\n" +
        "       color: '#000',\n" +
        "       fontSize: '14px',\n" +
        "       fontFamily:'SimSun', \n" +
        "       fontWeight: 400\n" +
        "  })",
        comment: getFormatComment("chart",
            "设置X轴轴标题样式 ",
            ["option{\n" +
            "    align:align, 对齐方式 low-跟最小值对齐，middle-居中对齐，high-与最大值对齐 选填\n" +
            "    color:color, 标题颜色 选填\n" +
            "    fontSize:fontSize,  标题文字大小  选填\n" +
            "    fontFamily:'SimSun', string 文本字形 选填,\n" +
            "    fontWeight:fontWeight  标题文本样式  选填\n" +
            "  }"],
            "chart.cSetxAxisTitleStyle({\n" +
            "       align: 'high',\n" +
            "       color: '#000',\n" +
            "       fontSize: '14px',\n" +
            "       fontWeight: 400\n" +
            "  })"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "X轴标题位置",
        name: "cSetxAxisTitlePostion",
        Class: "",
        insert:"\n // 设置X轴轴标题位置 \n"+
        "chart.cSetxAxisTitlePostion({\n" +
        "      align: 'middle',\n" +
        "      x: 0,\n" +
        "      y: 0\n" +
        "   })",
        comment: getFormatComment("chart",
            "设置X轴轴标题位置 ",
            ["option{\n" +
            "    align:'middle',\"low\"，\"middle\" 和 \"high\"，分别表示于最小值对齐、居中对齐、与最大值对齐\n" +
            "    offset:0, number 坐标轴标题相对于轴线的偏移量\n" +
            "    rotation:0, number 旋转度 选填\n" +
            "    x:0, number x方向偏移值 选填\n" +
            "    y:0,  number y方向偏移值 选填\n" +
            " }"],
            "chart.cSetxAxisTitlePostion({\n" +
            "       rotation: 180,\n" +
            "       x: -100,\n" +
            "       y: -20\n" +
            "   })"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "X轴标签样式",
        name: "cSetxAxisLablesStyle",
        Class: "",
        insert:"\n // 设置X轴X轴标签样式 \n"+
        "chart.cSetxAxisLablesStyle({\n" +
        "      rotation: 0,\n" +
        "      align: 'left',\n" +
        "      color: 'red',\n" +
        "      fontSize: '12px',\n" +
        "      fontWeight: 400\n" +
        "  })",
        comment: getFormatComment("chart",
            "设置X轴X轴标签样式 ",
            ["option{\n" +
            "   align:align, left\\center\\right 选填\n" +
            "   rotation:rotation, number 旋转度 选填\n" +
            "   color:color, 标题颜色 选填\n" +
            "   fontSize:fontSize,  标题文字大小  选填\n" +
            "    fontFamily:'SimSun', string 文本字形 选填,\n" +
            "   fontWeight:fontWeight  标题文本样式  选填\n" +
            " }"],
            "chart.cSetxAxisLablesStyle({\n" +
            "      rotation: 0,\n" +
            "      align: 'left',\n" +
            "      color: 'red',\n" +
            "      fontSize: '12px',\n" +
            "      fontWeight: 400\n" +
            "  })"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "X轴轴线设置",
        name: "cSetxAxislineStyle",
        Class: "",
        insert:"\n // 设置X轴轴线设置\n"+
        "chart.cSetxAxislineStyle(3, 'red')",
        comment: getFormatComment("chart",
            "设置X轴轴线设置 ",
            [
                "{Number} lineWidth-轴线宽度 ",
                "{String} lineColor-轴线颜色",
            ],
            "chart.cSetxAxislineStyle(3, 'red')"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "X轴刻度线设置",
        name: "cSetxAxisTick",
        Class: "",
        insert:"\n // 设置X轴刻度线设置\n"+
        "chart.cSetxAxisTick({\n" +
        "    color: 'red',\n" +
        "    width: 3,\n" +
        "    length: 5,\n" +
        "  })",
        comment: getFormatComment("chart",
            "设置X轴刻度线设置 ",
            [ "option{\n" +
            "     color:color, 刻度线颜色  选填\n" +
            "     width:width, number 刻度线宽度 选填\n" +
            "     length:length, number  刻度线长度  选填\n" +
            "     Interval:Interval,  number 刻度线之间数值间隔  选填\n" +
            "     PixelInterval:PixelInterval  number 刻度线之间像素间隔  选填\n" +
            "     Pos:Pos  string 刻度线位置  inside、outside   选填\n" +
            " }"],
            "chart.cSetxAxisTick({\n" +
            "    color: 'red',\n" +
            "    width: 3,\n" +
            "    length: 5,\n" +
            "  })"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "X轴网格线设置",
        name: "cSetxAxisgridLine",
        Class: "",
        insert:"\n // 设置X轴网格线设置\n"+
        "chart.cSetxAxisgridLine({\n" +
        "   color: '#666',\n" +
        "   width: 2,\n" +
        " })",
        comment: getFormatComment("chart",
            "设置X轴网格线设置 ",
            [ "option{\n" +
            "    color:color, 线条颜色  选填\n" +
            "    width:width, number 线条宽度 选填\n" +
            "    style:style, number  线条样式  选填  线型 0-10 的数值，不填默认 0 Solid 实线  \n" +
            "    ZIndex:ZIndex,  number 网格线层叠  0 在图像下面  越大层级越高  选填\n" +
            " }"],
            "chart.cSetxAxisgridLine({\n" +
            "   color: '#666',\n" +
            "   width: 2,\n" +
            " })"),
        value: {},
        type: publicMethodsType.fun
    },
		{
		    text: "X轴标示线设置",
		    name: "cSetxAxisePlotLines",
		    Class: "",
		    insert:"\n // X轴标示线设置\n"+
		    "chart.cSetxAxisePlotLines(2,'#000','2019-01-01')",
		    comment: getFormatComment("chart",
		        "X轴标示线设置 ",
		        [ "width 标示线宽度 \n"+
						"color 标示线颜色\n"+
						"value 标示线所在位置\n"+
						"textOption{\n"+
						 "    text:text, 标示线注释文本\n"+
						 "    style: {   文本样式\n"+
							"    color: '#333',  文本颜色\n"+
							"    verticalAlign: 'top', 文本对齐方式 top、middle、bottom\n"+
							"    y: 10\n"+
						 "},\n"+
						" rotation: r, // 旋转度\n"+
						 "x: 0, // 偏移值 \n"+
		  "}"],
		   "chart.cSetxAxisePlotLines(2,'#000','2019-01-01')"),
		    value: {},
		    type: publicMethodsType.fun
		},
    {
        text: "自动计算多Y轴高度位置",
        name: "cSetAtouMultiayAxis",
        Class: "",
        insert:"\n //自动计算多Y轴高度位置\n"+
        "chart.cSetAtouMultiayAxis()",
        comment: getFormatComment("chart",
            "自动计算多Y轴高度位置\n" +
            "多Y轴一侧纵向排列时可用此方法，自动计算位置及高度（均分），省去手动设置操作 ",
            [ ],
            "chart.cSetAtouMultiayAxis()"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "Y轴位置设置",
        name: "cSetyAxisPostion",
        Class: "",
        insert:"\n //Y轴位置设置\n"+
        "chart.cSetyAxisPostion('产水量',{\n" +
        "    height:120,\n" +
        "    top:140\n" +
        " })",
        comment: getFormatComment("chart",
            "Y轴位置设置 ",
            ["@param name  坐标轴的轴名称  必填",
            " option{\n" +
            " * @param height number  轴高度 数字或者百分比 空或者不填 默认100%\n" +
            " * @param top  number 轴线距离曲线顶部的距离 数字或者百分比 空或者不填 默认0\n" +
            " * @param offset number 坐标轴距离绘图区的像素值 \n" +
            " * @param opposite bool  坐标轴是否对面显示\n" +
            "  }" ],
            "chart.cSetyAxisPostion('产水量',{\n" +
            "    height:120,\n" +
            "    top:140\n" +
            " })"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "Y轴最大值最小值设置",
        name: "cSetyAxisValue",
        Class: "",
        insert:"\n //Y轴最大值最小值设置\n"+
        "chart.cSetyAxisValue('产油量', 30, 0)",
        comment: getFormatComment("chart",
            "Y轴位置设置 ",
            ["* @param name  坐标轴的轴名称  必填\n" +
            "* @param max number  坐标轴最大值  空或者null 为自动计算\n" +
            "* @param min   number 坐标轴最小值 空或者null 为自动计算" ],
            "chart.cSetyAxisValue('产油量', 30, 0)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "Y轴轴类型设置",
        name: "cSetyAxis",
        Class: "",
        insert:"\n //Y轴轴类型设置\n"+
        "chart.cSetyAxis(1，'产油量')",
        comment: getFormatComment("chart",
            "Y轴位置设置 ",
            ["@param yType String X轴类型  ''或者null 默认线性轴 1-线性轴/2-时间轴/3-分类轴/4-对数轴\n" +
            "* @param name  String  轴名称  传入\"\"或者不传则默认所有Y轴共用此设置  选填\n" +
            "* @param dateFormat  时间轴时间格式(类型为时间轴时才传入)  轴类型为时间轴时传入 默认'yyyy-mm-dd' 选填" ],
            "chart.cSetyAxis(1,'产油量')"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "Y轴隐藏/显示",
        name: "cSetyAxisEnabled",
        Class: "",
        insert:"\n // 设置Y轴隐藏/显示 \n"+
        "chart.cSetyAxisEnabled(true)",
        comment: getFormatComment("chart",
            "设置Y轴隐藏/显示 ",
            ["{Boolen} bool - true为显示，false为隐藏"],
            "chart.cSetyAxisEnabled(true)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "Y轴标题隐藏/显示",
        name: "cSetyAxisTitleEnabled",
        Class: "",
        insert:"\n // 设置Y轴标题隐藏/显示 \n"+
        "chart.cSetyAxisTitleEnabled(true)",
        comment: getFormatComment("chart",
            "设置Y轴标题隐藏/显示 ",
            ["{Boolen} bool - true为显示，false为隐藏"],
            "chart.cSetyAxisTitleEnabled(true)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "Y轴标题样式",
        name: "cSetyAxisTitleStyle",
        Class: "",
        insert:"\n // 设置Y轴轴标题样式 \n"+
        "chart.cSetyAxisTitleStyle({\n" +
        "       align: 'high',\n" +
        "       color: '#000',\n" +
        "       fontSize: '14px',\n" +
        "       fontWeight: 400\n" +
        "  },'产油量')",
        comment: getFormatComment("chart",
            "设置Y轴轴标题样式 ",
            ["option{\n" +
            "    align:align, 对齐方式 low-跟最小值对齐，middle-居中对齐，high-与最大值对齐 选填\n" +
            "    color:color, 标题颜色 选填\n" +
            "    fontSize:fontSize,  标题文字大小  选填\n" +
            "    fontFamily:'SimSun', string 文本字形 选填,\n" +
            "    fontWeight:fontWeight  标题文本样式  选填\n" +
            "  }",
            "@param name  String  轴名称  不传则默认所有Y轴共用此设置  选填"],
            "chart.cSetyAxisTitleStyle({\n" +
            "       align: 'high',\n" +
            "       color: '#000',\n" +
            "       fontSize: '14px',\n" +
            "       fontWeight: 400\n" +
            "  },'产油量')"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "Y轴标题位置",
        name: "cSetyAxisTitlePostion",
        Class: "",
        insert:"\n // 设置Y轴轴标题位置 \n"+
        "chart.cSetyAxisTitlePostion({\n" +
        "    rotation: 30,\n" +
        " }, '产油量')",
        comment: getFormatComment("chart",
            "设置Y轴轴标题位置 ",
            ["option{\n" +
            "    rotation:rotation, number 旋转度 选填\n" +
            "    x:x, number x方向偏移值 选填\n" +
            "    y:y,  number y方向偏移值 选填\n" +
            "    offset:offset,  number 与轴线之间的距离 选填\n"+
            " }",
                "@param name  String  轴名称  不传则默认所有Y轴共用此设置  选填"],
            "chart.cSetyAxisTitlePostion({\n" +
            "    rotation: 30,\n" +
            " }, '产油量')"),
        value: {},
        type: publicMethodsType.fun
    },
		{
		    text: "Y轴标签位置",
		    name: "cSetyAxisLablesPostion",
		    Class: "",
		    insert:"\n // 设置Y轴标签位置 \n"+
		    "chart.cSetyAxisLablesPostion({\n" +
		    "    rotation: 120,\n" +
		    "    align: 'left',\n" +
		    "    x: 0,\n" +
		    "  }, '产油量')",
		    comment: getFormatComment("chart",
		        "设置Y轴标签样式 ",
		        ["option{\n" +
		        "    align:align, left\\center\\right 选填\n" +
		        "    rotation:rotation, number 旋转度 选填\n" +
		       "    x: 0,number 偏移值 选填\n"  + 
		        " }",
		        "@param name  String  轴名称  不传则默认所有Y轴共用此设置  选填"],
		        "chart.cSetyAxisLablesPostion({\n" +
		        "    rotation: 120,\n" +
		        "    align: 'left',\n" +
		       "    x: 0,\n" +
		        "  }, '产油量')"),
		    value: {},
		    type: publicMethodsType.fun
		},
    {
        text: "Y轴标签样式",
        name: "cSetyAxisLablesStyle",
        Class: "",
        insert:"\n // 设置Y轴标签样式 \n"+
        "chart.cSetyAxisLablesStyle({\n" +
        "    color: 'red',\n" +
        "    fontSize: '12px',\n" +
        "    fontWeight: 400\n" +
        "  }, '产油量')",
        comment: getFormatComment("chart",
            "设置Y轴标签样式 ",
            ["option{\n" +
            "    color:color, 标题颜色 选填\n" +
            "    fontSize:fontSize,  标题文字大小  选填\n" +
            "    fontFamily:'SimSun', string 文本字形 选填,\n" +
            "    fontWeight:fontWeight  标题文本样式  选填\n" +
            " }",
            "@param name  String  轴名称  不传则默认所有Y轴共用此设置  选填"],
            "chart.cSetyAxisLablesStyle({\n" +
            "    color: 'red',\n" +
            "    fontSize: '12px',\n" +
            "    fontWeight: 400\n" +
            "  }, '产油量')"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "Y轴轴线设置",
        name: "cSetyAxislineStyle",
        Class: "",
        insert:"\n // Y轴轴线设置 \n"+
        "chart.cSetyAxislineStyle(3, 'red', '产油量')",
        comment: getFormatComment("chart",
            "Y轴轴线设置 ",
            ["@param lineWidth number  轴线宽度\n" +
            "* @param lineColor string 轴线颜色",
            "@param name  String  轴名称  不传则默认所有Y轴共用此设置  选填"],
            "chart.cSetyAxislineStyle(3, 'red', '产油量')"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "Y轴刻度线设置",
        name: "cSetyAxisTick",
        Class: "",
        insert:"\n // Y轴刻度线设置 \n"+
        "chart.cSetyAxisTick({\n" +
        "   color: 'red',\n" +
        "   width: 3,\n" +
        "   length: 5,\n" +
        " })",
        comment: getFormatComment("chart",
            "Y轴刻度线设置 ",
            ["option{\n" +
            "   color:color, 刻度线颜色  选填\n" +
            "   width:width, number 刻度线宽度 选填\n" +
            "   length:length, number  刻度线长度  选填\n" +
            "   Interval:Interval,  number 刻度线之间数值间隔  选填\n" +
            "   PixelInterval:PixelInterval  number 刻度线之间像素间隔  选填\n" +
            "   Pos:Pos  string 刻度线位置  inside、outside   选填\n" +
            " }",
                "@param name  String  轴名称  不传则默认所有Y轴共用此设置  选填"],
            "chart.cSetyAxisTick({\n" +
            "   color: 'red',\n" +
            "   width: 3,\n" +
            "   length: 5,\n" +
            " })"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "Y轴网格线设置",
        name: "cSetyAxisgridLine",
        Class: "",
        insert:"\n // Y轴网格线设置 \n"+
        "chart.cSetyAxisgridLine({\n" +
        "    color: '#666',\n" +
        "    width: 2,\n" +
        " })",
        comment: getFormatComment("chart",
            "Y轴网格线设置 ",
            ["option{\n" +
            "   color:color, 线条颜色  选填\n" +
            "   width:width, number 线条宽度 选填\n" +
            "   style:style, number  线条样式  选填  线型 0-10 的数值，不填默认 0 Solid 实线  \n" +
            "   ZIndex:ZIndex,  number 网格线层叠  0 在图像下面  越大层级越高  选填\n" +
            "}",
                "@param name  String  轴名称  不传则默认所有Y轴共用此设置  选填"],
            "chart.cSetyAxisgridLine({\n" +
            "    color: '#666',\n" +
            "    width: 2,\n" +
            " })"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "Y轴标题显示类型",
        name: "cSetyAxisShowType",
        Class: "",
        insert:"\n // y轴标题横排、竖排显示 \n"+
        "chart.cSetyAxisShowType(1, '产水量');",
        comment: getFormatComment("chart",
            "y轴标题横排、竖排显示",
            [" *@param  type String  显示方式 1 横排显示  2竖排显示 ",
                "@param name  String  轴名称  不传则默认所有Y轴共用此设置  选填"],
            "chart.cSetyAxisShowType(1, '产水量');"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "折线属性设置",
        name: "cSetLinesStyle",
        Class: "",
        insert:"\n // 折线的属性设置 \n"+
        "chart.cSetLinesStyle({\n" +
        "   color: 'red',\n" +
        "   width: 2,\n" +
        "   style: 2\n" +
        "}, '产油量')",
        comment: getFormatComment("chart",
            "折线的属性设置",
            ["option{\n" +
            "* @param color 折线图中指线的颜色，柱状图中柱子的颜色\n" +
            "* @param width 线宽\n" +
            "* @param style 线型 0-10 的数值，不填默认 0 Solid 实线 \n" +
            "1 ShortDash \n" +
            "2 ShortDot\n" +
            "3 ShortDashDot\n" +
            "4 ShortDashDotDot\n" +
            "5 Dot\n" +
            "6 Dash\n" +
            "7 LongDash\n" +
            "8 DashDot\n" +
            "9 LongDashDot\n" +
            "10 LongDashDotDot" +
            "}",
            "@param name  String  序列名称  不传则默认所有序列共用此设置  选填"],
            "chart.cSetLinesStyle({\n" +
            "   color: 'red',\n" +
            "   width: 2,\n" +
            "   style: 2\n" +
            "}, '产油量')"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "阶梯图设置",
        name: "cSetStep",
        Class: "",
        insert:"\n // 阶梯图设置 \n"+
        "chart.cSetStep('center','产油量')",
        comment: getFormatComment("chart",
            "折线的属性设置",
            ["@param type  String  阶梯类型  可用left、center 和right false、true（true默认阶梯类形为left），false为不启用",
            "@param name  String  序列名称  不传则默认所有序列共用此设置  选填"],
            "chart.cSetStep('center','产油量')"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "序列的类型设置",
        name: "cSetSeriesType",
        Class: "",
        insert:"\n // 序列的类型设置 \n"+
        "chart.cSetSeriesType('line','产油量')",
        comment: getFormatComment("chart",
            "序列的类型设置",
            ["@param type  String 曲线类型 line/pie/column/spline/area/annular ",
            "@param seriesName  设置类型的序列名称  选填 不填默认所有序列"],
            "chart.cSetSeriesType('line','产油量')"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "序列是否连接空值",
        name: "cSetSeriesConnectNulls",
        Class: "",
        insert:"\n // 序列是否连接空值 \n"+
        "chart.cSetSeriesConnectNulls(true)",
        comment: getFormatComment("chart",
            "序列是否连接空值 ",
            ["{Boolen} bool - true为连接，false为不连接",
            " name  String  序列名称  不传则默认所有序列共用此设置  选填"],
            "chart.cSetSeriesConnectNulls(true)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "点属性设置",
        name: "cSetPointStyle",
        Class: "",
        insert:"\n // 点属性设置 \n"+
        "chart.cSetPointStyle({\n" +
        "   radius: 5,\n" +
        "   fillColor: \"green\",\n" +
        "   symbol: 2,\n" +
        "   lineWidth: 2,\n" +
        "   lineColor: 'blue'\n" +
        "}, '产水量')",
        comment: getFormatComment("chart",
            "点属性设置",
            ["option{\n" +
            "@param radius 点半径\n" +
            "@param fillColor 点的颜色\n" +
            "@param symbol 点的形状 不传默认\"0\"（圆形）、\"1\"（正方形）、\"2\"（菱形）、 \"3\"（三角形）及 \"4\"（倒三角形）\n" +
            "@param lineWidth 点的线条颜色\n" +
            "@param lineColor 点的线条颜色  \n" +
            " }",
            "@param name  String  序列名称  不传则默认所有序列共用此设置  选填"],
            "chart.cSetPointStyle({\n" +
            "   radius: 5,\n" +
            "   fillColor: \"green\",\n" +
            "   symbol: 2,\n" +
            "   lineWidth: 2,\n" +
            "   lineColor: 'blue'\n" +
            "}, '产水量')"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "序列隐藏/显示",
        name: "cSetSeriesEnabled",
        Class: "",
        insert:"\n // 序列隐藏/显示 \n"+
        "chart.cSetSeriesEnabled(true)",
        comment: getFormatComment("chart",
            "序列隐藏/显示 ",
            ["{Boolen} bool - true为显示，false为隐藏",
            " name  String  序列名称  不传则默认所有序列共用此设置  选填"],
            "chart.cSetSeriesEnabled(true)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "数据标签隐藏/显示",
        name: "cSetSeriesDataLabelsEnabled",
        Class: "",
        insert:"\n // 数据标签隐藏/显示 \n"+
        "chart.cSetSeriesDataLabelsEnabled(true)",
        comment: getFormatComment("chart",
            "数据标签隐藏/显示 ",
            ["{Boolen} bool - true为显示，false为隐藏",
            "@param name  String  序列名称  不传则默认所有序列共用此设置  选填"],
            "chart.cSetSeriesDataLabelsEnabled(true)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "数据标签格式化字符串",
        name: "cSetSeriesDataLabelsFormat",
        Class: "",
        insert:"\n // 数据标签格式化字符串 \n"+
        "chart.cSetSeriesDataLabelsFormat('{y}kg')",
        comment: getFormatComment("chart",
            "数据标签格式化字符串 ",
            ["@param format  String  格式化字符串 默认'{y}' 参数例如 '{y}km' 必选",
            "@param name  String  序列名称  不传则默认所有序列共用此设置  选填"],
            "chart.cSetSeriesDataLabelsFormat('{y}kg')"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "序列数据标签位置设置",
        name: "cSetSeriesDataLabelsPostion",
        Class: "",
        insert:"\n // 序列数据标签位置设置 \n"+
        "chart.cSetSeriesDataLabelsPostion({\n" +
        "   align:'center', \n" +
        "   vAlign:'bottom', \n" +
        "   x:0, \n" +
        "   y:0 \n" +
        "})",
        comment: getFormatComment("chart",
            "序列数据标签位置设置 ",
            ["option {\n" +
            "   align:'center', string 水平对齐方式  left、center、right \n" +
            "   vAlign:'bottom', string 垂直对齐 top、middle、bottom\n" +
            "   x:x, number 水平方向偏移量\n" +
            "   y:y  number 垂直方向偏移量\n" +
            "}",
            "@param name  String  序列名称  不传则默认所有序列共用此设置  选填"],
            "chart.cSetSeriesDataLabelsPostion({\n" +
            "   align:'center', \n" +
            "   vAlign:'bottom', \n" +
            "   x:0, \n" +
            "   y:0 \n" +
            "})"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "序列数据标签样式设置",
        name: "cSetSeriesDataLabelsStyle",
        Class: "",
        insert:"\n // 序列数据标签位置设置 \n"+
        "chart.cSetSeriesDataLabelsStyle({\n" +
        "    fontSize: '14px',\n" +
        "    color: 'red',\n" +
        "    fontWeight: 400\n" +
        " }, '产油量')",
        comment: getFormatComment("chart",
            "序列数据标签位置设置 ",
            ["option {\n" +
            "     fontSize:fontSize, string 文本字号\n" +
            "     fontFamily:fontFamily, string 文本字形\n" +
            "     color:color, string 文本颜色\n" +
            "     fontWeight:fontWeight  string/ number  字体加粗\n" +
            "}",
            "@param name  String  序列名称  不传则默认所有序列共用此设置  选填"],
            "chart.cSetSeriesDataLabelsStyle({\n" +
            "    fontSize: '14px',\n" +
            "    color: 'red',\n" +
            "    fontWeight: 400\n" +
            " }, '产油量')"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "数据提示框格式化函数",
        name: "cSetTooltipFormatter",
        Class: "",
        insert:"\n // 数据标签格式化函数 \n"+
        "chart.cSetTooltipFormatter(function(){ \n" +
        "   var x = this.x; \n" +
        "   var s = \"采出程度:<b>\"+chart.date_getFormatDate(parseFloat(x),'YYYY-MM-DD')+\"</b><br/>\"+this.series.name+\":<b>\"+this.y+\"</b>\";\n" +
        "   return s;" +
        "})",
        comment: getFormatComment("chart",
            "数据标签格式化函数 ",
            ["@param fun  function  格式化函数 必选 \n" +
            "this.point\t数据点对象，可以通过该对象来获取数据点相关的属性，例如 x 值，y值等\n" +
            "this.series:\t数据点所在的数据列对象，可以通过该对象来获取数据列的属性，例如 this.series.name\n" +
            "this.x:\tx 值\n" +
            "this.y:\ty 值"],
            "chart.cSetTooltipFormatter(function(){ \n" +
            "   var x = this.x; \n" +
            "   var s = \"采出程度:<b>\"+chart.date_getFormatDate(parseFloat(x),'YYYY-MM-DD')+\"</b><br/>\"+this.series.name+\":<b>\"+this.y+\"</b>\";\n" +
            "   return s;" +
            "})"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "数据提示框共享",
        name: "cSetTooltipShared",
        Class: "",
        insert:"\n // 数据标签隐藏/显示 \n"+
        "chart.cSetTooltipShared(true)",
        comment: getFormatComment("chart",
            "数据标签隐藏/显示 ",
            ["{Boolen} bool - true为所有序列共用一个数据提示框，false为每个序列单独一个提示框"],
            "chart.cSetTooltipShared(true)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "图例隐藏/显示",
        name: "cSetlegendEnabled",
        Class: "",
        insert:"\n // 图例隐藏/显示 \n"+
        "chart.cSetlegendEnabled(true)",
        comment: getFormatComment("chart",
            "图例隐藏/显示",
            ["{Boolen} bool - true为显示，false为隐藏"],
            "chart.cSetlegendEnabled(true)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "图例布局方式",
        name: "cSetlegendlayout",
        Class: "",
        insert:"\n // 图例布局方式 \n"+
        "chart.cSetlegendlayout('v')",
        comment: getFormatComment("chart",
            "图例布局方式",
            ["@param layout  String  \"h\" 或 \"v\" 即水平布局和垂直布局 默认是：h"],
            "chart.cSetlegendlayout('v')"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "图例浮动",
        name: "cSetlegendFloat",
        Class: "",
        insert:"\n // 图例浮动 \n"+
        "chart.cSetlegendFloat(true)",
        comment: getFormatComment("chart",
            "图例浮动",
            ["{Boolen} bool - true为浮动，false为不浮动"],
            "chart.cSetlegendFloat(true)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "图例位置设置",
        name: "cSetLegendPos",
        Class: "",
        insert:"\n // 图例位置设置 \n"+
        "chart.cSetLegendPos({\n" +
        "   align: 'center',\n" +
        "   vAlign: 'top',\n" +
        "   x: 0,\n" +
        "   y: 0,\n" +
        "   reversed: false\n" +
        " })",
        comment: getFormatComment("chart",
            "图例位置设置",
            ["@param option{\n" +
            "    align:'center', String 水平对齐方式  left，center 和 right\n" +
            "    vAlign:'bottom', String 垂直对齐方式  top，middle 和 bottom\n" +
            "    x:0， number  水平方向偏移量\n" +
            "    y:0,  number  垂直方向偏移量\n" +
            "    reversed: false  Boolen 是否反序排了\n" +
            " }"],
            "chart.cSetLegendPos({\n" +
            "   align: 'center',\n" +
            "   vAlign: 'top',\n" +
            "   x: 0,\n" +
            "   y: 0,\n" +
            "   reversed: false\n" +
            " })"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "图例大小设置",
        name: "cSetLegendSzie",
        Class: "",
        insert:"\n // 图例大小设置 \n"+
        "chart.cSetLegendSzie(200,50)",
        comment: getFormatComment("chart",
            "图例大小设置",
            [" * @param width:  number 图例宽度  不填自动计算\n" +
            " * @param itemWidth, number  图例每一项的宽度  不填自动计算"],
            "chart.cSetLegendSzie(200,50)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "图表背景颜色设置",
        name: "setChartBackgroundColor",
        Class: "",
        insert:"\n // 图表背景颜色设置 \n"+
        "chart.setChartBackgroundColor('#eeff88')",
        comment: getFormatComment("chart",
            "图表背景颜色设置",
            [" * @param color:  String 图表背景颜色"],
            "chart.setChartBackgroundColor('#eeff88')"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "图表边距设置",
        name: "setChartMagin",
        Class: "",
        insert:"\n // 图表边距设置 \n"+
        "chart.setChartMagin('left',100)",
        comment: getFormatComment("chart",
            "图表边距设置",
            ["@param type  边距类型  top  bottom  left  right \n" +
            "@param value 设置的值  number "],
            "chart.setChartMagin('left',100)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: '图例拖拽模块引入',
        name: "IAddLegendDargModule",
        Class: "",
        insert:"\n // 图例拖拽模块引入 \n"+
        "chart.IAddLegendDargModule(true)",
        comment: getFormatComment("chart",
            "图例拖拽模块引入",
            [],
            "chart.IAddLegendDargModule(true)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: '顶部工具条功能模块引入',
        name: "IAddToolBarModule",
        Class: "",
        insert:"\n //顶部工具条功能模块引入 \n"+
        "chart.IAddToolBarModule(true)",
        comment: getFormatComment("chart",
            "顶部工具条功能模块引入",
            [],
            "chart.IAddToolBarModule(true)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: '曲线属性设置功能模块引入',
        name: "IAddPropertySetModule",
        Class: "",
        insert:"\n //曲线属性设置功能模块引入 \n"+
        "chart.IAddPropertySetModule(true)",
        comment: getFormatComment("chart",
            "曲线属性设置功能模块引入",
            [],
            "chart.IAddPropertySetModule(true)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: '导出图片功能模块引入',
        name: "IAddImageExportModule",
        Class: "",
        insert:"\n //导出图片功能模块引入 \n"+
        "chart.IAddImageExportModule(true)",
        comment: getFormatComment("chart",
            "导出图片功能模块引入",
            [],
            "chart.IAddImageExportModule(true)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: '数据查看及数据下载功能模块引入',
        name: "IAddDataViewModule",
        Class: "",
        insert:"\n //数据查看及数据下载功能模块引入 \n"+
        "chart.IAddDataViewModule(true)",
        comment: getFormatComment("chart",
            "数据查看及数据下载功能模块引入",
            [],
            "chart.IAddDataViewModule(true)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: '曲线绘制',
        name: "onRender",
        Class: "",
        insert:"\n //曲线绘制 \n"+
        "chart.onRender()",
        comment: getFormatComment("chart",
            "曲线对象属性设置完成后 绘制曲线",
            [],
            "chart.onRender()"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: '曲线事件监听',
        name: "addEventListener",
        Class: "",
        insert:"\n //曲线事件监听 \n"+
        "chart.addEventListener(\"saveTemplate\", function(chart,tpJson) {\n" +
        "   console.log(chart)\n" +
        "   console.log(tpJson)\n" +
        " })",
        comment: getFormatComment("chart",
            "曲线自定义事件监听",
            ["type String 事件类型 \n" +
            " listener Function  触发的函数 "],
            "chart.addEventListener(\"saveTemplate\", function(chart,tpJson) {\n" +
            "   console.log(chart)\n" +
            "   console.log(tpJson)\n" +
            " })"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: '曲线事件触发',
        name: "fireEvent",
        Class: "",
        insert:"\n //曲线事件触发 \n"+
        "chart.fireEvent('saveTemplate',chart,params);)",
        comment: getFormatComment("chart",
            "曲线自定义事件触发",
            ["type String 事件类型 \n" +
            " params 附加参数对象"],
            "chart.fireEvent('saveTemplate',chart,params))"),
        value: {},
        type: publicMethodsType.fun
    },
]);


//commonRoot/commonRoot_Utils----------------------------------------------------------------------------------------------------------------------
//添加到主分类-公共函数-其他
addFunc(commonRoot_Utils,[]);

//serviceRoot/----------------------------------------------------------------------------------------------------------------------
//添加到数据服务
addFunc(serviceRoot,[]);

//serviceRoot/serviceRoot_User----------------------------------------------------------------------------------------------------------------------
//添加到数据服务 -用户验证
addFunc(serviceRoot_User,[{
	text: "登录验证",
	name: "login",
	Class: "login",
	insert: "\n // 登录验证\n" +
    "hwDas.login ('admin','123456',function(){},function(){});",
	comment: getFormatComment("login",
		"登录验证",
        ["{String} login-登录名",
        "{String} password-密码",
        "{Function} successback-成功回调函数",
        "{Function} errorback-错误回调函数",
        "return {void}"],
		"hwDas.login ('admin','123456',function(){},function(){})"),
	value: {},
	type: publicMethodsType.fun
},{
    text: "单点登录",
    name: "signin",
    Class: "signin",
    insert:"\n // 单点登录\n" +
    "hwDas.signin('12','test.html');",
    comment: getFormatComment("signin",
        "单点登录",
        ["{String} id-应用id",
        "{String} backurl-单点页面url",
        "return {void}"],
        "hwDas.signin('12','test.html')"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "注销",
    name: "logout",
    Class: "logout",
    insert:"\n // 注销\n" +
    "hwDas.logout();",
    comment: getFormatComment("logout",
        "注销",
        ["return {void}"],
        "hwDas.logout()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "验证token",
    name: "auth",
    Class: "auth",
    insert: "\n // 认证,验证token\n" +
        "hwDas.auth(successback,errorback) ;",
    comment: getFormatComment("auth",
        "认证,验证token",
        ["{Function} successback-成功回调函数",
        "{Function} errorback-错误回调函数",
        "return {void}"],
        "hwDas.auth(successback,errorback) "),
    value: {},
    type: publicMethodsType.fun
}]);

//serviceRoot/serviceRoot_Data----------------------------------------------------------------------------------------------------------------------
//添加到数据服务 -數據操作
addFunc(serviceRoot_Data,[{
	text: "数据获取",
	name: "get",
	Class: "get",
	insert: "\n // 获取数据\n" +
		"hwDas.get({host:'192.168.1.11',url:'aa/bb'},{},\n" +
    "     {'deid': '42424'},\n" +
    "     function(result) {},\n" +
    "     function(msg) {}\n" +
    ");",
	comment: getFormatComment("get",
		"数据获取",
        [" {Object} urlconfig-路径信息,包括 url:相对Url地址,host:服务器信息,格式为{host:'',url:''}",
        " {Object} headers-请求头,格式为{}对象  如果分页要设置:startIndex: 记录开始索引,pageSize: 获取数据量,async异步(默认为true,当设置为false时 就是同步模式)",
        " {Object} params-请求参数,格式为{}对象",
        " {Object} successback-成功回调函数",
        " {Object} errorback-错误回调函数",
        " return {void}"],
		" hwDas.get(\"oabg/wjjb/deledb\",{},\n" +
        "     {'deid': '345234'},\n" +
        "     function(result) {},\n" +
        "     function(msg) {}\n" +
        ")"),
	value: {},
	type: publicMethodsType.fun
},{
    text: "数据修改",
    name: "edit",
    Class: "edit",
    insert: "\n // 修改数据\n" +
        "hwDas.edit({host:'192.168.1.11',url:'aa/bb'},{},\n" +
    "    {'deid': item},\n" +
    "    [{'deid': '34466'},{'deid': '54387'}],\n" +
    "    function(result) {},\n" +
    "    function(msg) {}\n" +
    ");",
    comment: getFormatComment("edit",
        "修改数据",
        ["{Object} urlconfig-路径信息,包括 url:相对Url地址,host:服务器信息,格式为{host:\"\",url:\"\"}",
        "{Object} headers-请求头,格式为{}对象",
        "{Object} params-请求参数,格式为{}对象",
        "{Object} datas-请求内容,格式为[{},{}]数组对象(多条记录)或是{}对象(单条记录)",
        "{Function} successback-成功回调函数",
        "{Function} errorback-错误回调函数"],
        "hwDas.edit(\"oabg/wjjb/deledb\",{},\n" +
        "    {'deid': item},\n" +
        "    [{'deid': '34466'},{'deid': '54387'}],\n" +
        "    function(result) {},\n" +
        "    function(msg) {}\n" +
        ")"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "数据删除",
    name: "del",
    Class: "del",
    insert: "\n //删除数据\n" +
    "hwDas.del({host:'192.168.1.11',url:'aa/bb'},{},\n" +
    "   {'deid': '435235'},\n" +
    "   function(result) {},\n" +
    "   function(msg) {}\n" +
    ")\n;",
    comment: getFormatComment("del",
        "数据删除",
        ["{Object} urlconfig-路径信息,包括 url:相对Url地址,host:服务器信息,格式为{host:\"\",url:\"\"}",
        "{Object} headers-请求头,格式为{}对象",
        "{Object} params-请求参数,格式为{}对象",
        "{Function} successback-成功回调函数",
        "{Function} errorback-错误回调函数",
        "return {void}"],
        "hwDas.del(\"oabg/wjjb/deledb\",{},\n" +
        "    {'deid': '34535'},\n" +
        "    function(result) {},\n" +
        "    function(msg) {}\n" +
        ")\n"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "数据插入",
    name: "add",
    Class: "add",
    insert:"\n // 添加数据\n" +
    "hwDas.add({host:'192.168.1.11',url:'aa/bb'},{},\n" +
    "    {'deid': item},\n" +
    "    [{'deid': '34466'},{'deid': '54387'}],\n" +
    "    function(result) {},\n" +
    "    function(msg) {}\n" +
    ");",
    comment: getFormatComment("add",
        "数据插入",
        ["{Object} urlconfig-路径信息,包括 url:相对Url地址,host:服务器信息,格式为{host:\"\",url:\"\"}",
        "{Object} headers-请求头,格式为{}对象",
        "{Object} params-请求参数,格式为{}对象",
        "{Object} datas-请求内容,格式为[{},{}]数组对象(多条记录)或是{}对象(单条记录)",
        "{Object} successback-成功回调函数",
        "{Object} errorback-错误回调函数"],
        "hwDas.add(\"oabg/wjjb/deledb\",{},\n" +
        "     {'deid': item},\n" +
        "     [{'deid': '34466'},{'deid': '54387'}],\n" +
        "     function(result) {},\n" +
        "     function(msg) {}\n" +
        ")"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "数据保存",
    name: "save",
    Class: "save",
    insert: "\n // 保存数据(保存数据集)\n" +
    "hwDas.save({host:'192.168.1.11',url:'aa/bb'},{},\n" +
    "    {'deid': item},\n" +
    "    [{'deid': '34466'},{'deid': '54387'}],\n" +
    "    function(result) {},\n" +
    "    function(msg) {}\n" +
    ");",
    comment: getFormatComment("save",
        "数据保存",
        ["{Object} urlconfig-路径信息,包括 url:相对Url地址,host:服务器信息,格式为{host:\"\",url:\"\"}",
        "{Object} headers-请求头,格式为{}对象",
        "{Object} params-请求参数,格式为{}对象",
        "{Object} datas-请求内容,格式为[{Value:{},Original:{},RowState:insert},{...}]数组对象(多条记录)或是{...}对象(单条记录)\n" +
        "--其中Value表示新值,RowState表示行状态(insert、update、delete),Original表示修改前的值（新增状态不需要传递）\n" +
        "--Original中的值 在服务变量中用:字段名_org的形式表示,程序默认根据该规则把数据转换成变量值",
        "{Function} successback-成功回调函数",
        "{Function} errorback-错误回调函数",
        "return {void}"],
        "hwDas.save({host:'192.168.1.11',url:'aa/bb'},{},\n" +
        "   {'deid': item},\n" +
        "   [{'deid': '34466'},{'deid': '54387'}],\n" +
        "   function(result) {},\n" +
        "   function(msg) {}\n" +
        ")"),
    value: {},
    type: publicMethodsType.fun
}]);

//serviceRoot/serviceRoot_File----------------------------------------------------------------------------------------------------------------------
//添加到数据服务 -文件操作
addFunc(serviceRoot_File,[{
	text: "检测文件是否存在",
	name: "exist",
	Class: "exist",
	insert: "\n // 检测文件是否存在 \n" +
		"hwDas.exist(urlconfig,filePath,successback,errorback);",
	comment: getFormatComment("exist",
		"检测文件是否存在",
        ["{Object} urlconfig-mark:路径标识,格式为字符串,服务管理人员获取,其中vmd2.0使用的是vmd,host:服务器信息,格式为{host:'',mark:''} ",
        "{Object} filePath-文件的相对存储路径 ",
        "{Object} successback-成功回调函数 ",
        "{Object} errorback-错误回调函数 "],
		" hwDas.exist(urlconfig,filePath,successback,errorback)"),
	value: {},
	type: publicMethodsType.fun
},{
    text: "读取文件内容或字符串格式",
    name: "read",
    Class: "read",
    insert: "\n // 读取文件内容成字符串格式\n" +
    "hwDas.read(urlconfig,filePath,successback,errorback);",
    comment: getFormatComment("read",
        "读取文件内容或字符串格式",
        ["{Object} urlconfig-mark:路径标识,格式为字符串,服务管理人员获取,其中vmd2.0使用的是vmd,host:服务器信息,格式为{host:\"\",mark:\"\"}",
        "{Object} filePath-文件的相对存储路径",
        "{Object} successback-成功回调函数",
        "{Object} errorback-错误回调函数",
        "return {void}"],
        "hwDas.read  (urlconfig,filePath,successback,errorback);"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "把字符串内容存储成文件",
    name: "write",
    Class: "write",
    insert: "\n // 把字符串内容存储成文件\n" +
    "hwDas.write (urlconfig,filePath,fileContent,successback,errorback);",
    comment: getFormatComment("write",
        "把字符串内容存储成文件",
        ["{Object} urlconfig-mark:路径标识,格式为字符串,服务管理人员获取,其中vmd2.0使用的是vmd,host:服务器信息,格式为{host:\"\",mark:\"\"}",
        "{String} filePath-文件的相对存储路径",
        "{String} fileContent-文件内容,字符串格式",
        "{Function} successback-成功回调函数",
        "{Function} errorback-错误回调函数",
        "return {void}"],
        "hwDas.write (urlconfig,filePath,fileContent,successback,errorback) "),
    value: {},
    type: publicMethodsType.fun
},{
    text: "删除文件",
    name: "remove",
    Class: "remove",
    insert: "\n // 删除文件\n" +
    "hwDas.remove (urlconfig,filePath,successback,errorback); ",
    comment: getFormatComment("remove",
        "删除文件",
        ["{Object} urlconfig-mark:路径标识,格式为字符串,服务管理人员获取,其中vmd2.0使用的是vmd,host:服务器信息,格式为{host:\"\",mark:\"\"}",
        "{String} filePath-要删除文件的相对路径",
        "{Function} successback-成功回调函数",
        "{Function} errorback-错误回调函数",
        "return {void}"],
        "hwDas.remove (urlconfig,filePath,successback,errorback)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "拷贝文件",
    name: "copy",
    Class: "copy",
    insert: "\n // 拷贝文件\n" +
    "hwDas.copy(urlconfig,filePath,destPath,successback,errorback);",
    comment: getFormatComment("copy",
        "拷贝文件",
        ["{Object} urlconfig-mark:路径标识,格式为字符串,服务管理人员获取,其中vmd2.0使用的是vmd,host:服务器信息,格式为{host:\"\",mark:\"\"}",
        "{String} filePath-源相对目录",
        "{String} destPath-目标相对目录",
        "{Function} successback-成功回调函数",
        "{Function} errorback-错误回调函数",
        "return {void}"],
        "hwDas.copy(urlconfig,filePath,destPath,successback,errorback)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "移动文件",
    name: "move",
    Class: "move",
    insert: "\n //*移动文件\n" +
        "hwDas.move (urlconfig,filePath,destPath,successback,errorback);",
    comment: getFormatComment("move",
        "移动文件",
        ["{Object} urlconfig-mark:路径标识,格式为字符串,服务管理人员获取,其中vmd2.0使用的是vmd,host:服务器信息,格式为{host:\"\",mark:\"\"}",
        "{String} filePath-源相对目录",
        "{String} destPath-目标相对目录",
        "{Function} successback-成功回调函数",
        "{Function} errorback-错误回调函数",
        "return {void}"],
        "hwDas.move (urlconfig,filePath,destPath,successback,errorback)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取文件列表",
    name: "getdirs",
    Class: "getdirs",
    insert:"\n // 获取指定目录下的文件列表\n" +
        "hwDas.getdirs (urlconfig,filePath,fileType,successback,errorback);",
    comment: getFormatComment("getdirs",
        "获取指定目录下的文件列表",
        ["{Object} urlconfig-mark:路径标识,格式为字符串,服务管理人员获取,其中vmd2.0使用的是vmd,host:服务器信息,格式为{host:\"\",mark:\"\"}",
        "{Object} filePath-相对目录",
        "{Object} fileType-参数包括:fileType 文件后缀格式例如:\".doc\"",
        "{Object} successback-成功回调函数",
        "{Object} errorback-错误回调函数",
        "return {void}"],
        "hwDas.getdirs (urlconfig,filePath,fileType,successback,errorback)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "下载文件",
    name: "down",
    Class: "down",
    insert: "\n // 下载文件\n" +
        "hwDas.down(urlconfig,filePath,destName) ;",
    comment: getFormatComment("down",
        "下载文件",
        ["{Object} urlconfig:mark:路径标识,格式为字符串,服务管理人员获取,其中vmd2.0使用的是vmd,host:服务器信息,格式为{host:\"\",mark:\"\"}",
        "{String} filePath-下载文件相对路径",
        "{String} destName-下载文件时用户下载页面文件名称"],
        "hwDas.down(urlconfig,filePath,destName) "),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取上传url",
    name: "getuploadurl",
    Class: "getuploadurl",
    insert: "\n // 获取上传url\n" +
        "hwDas.getuploadurl (urlconfig,dirPath) ;",
    comment: getFormatComment("getuploadurl",
        "获取上传url",
        ["{Object} urlconfig-mark:路径标识,格式为字符串,服务管理人员获取,其中vmd2.0使用的是vmd,host:服务器信息,格式为{host:\"\",mark:\"\"}",
        "{String} dirPath-保存相对目录,可为空",
        "return {void}"],
        "hwDas.down(urlconfig,filePath,destName) "),
    value: {},
    type: publicMethodsType.fun
}]);

//workFlowRoot/----------------------------------------------------------------------------------------------------------------------
//工作流
addFunc(workFlowRoot,[{
    text: "创建工作流",
    name: "workFlow",
    Class: "workFlow",
    insert: " \n //创建工作流 \n" +
    "var hwWorkFlow = new vmd.workFlow({ \n" +
    "    taskId:\"125852\",\n" +
    "    processInstanceId:\"sd-23189\",\n" +
    "    modelId:\"254866\",\n" +
    "    modelName:\"请假\",\n" +
    "    startNodeId:\"u1\"\n" +
    "},function(result){});",
    comment: getFormatComment("workFlow",
        "创建工作流",
        [" {object} config-工作流初始化时的参数对象，如绑定工作流，则直接使用框架进行创建；如未绑定，单独创建，则需要传递工作流信息",
        "{Function} afterloader-工作流加载完后执行的回调"],
        "var workFlow = new vmd.workFlow({ \n" +
        "    taskId:\"125852\",\n" +
        "    processInstanceId:\"sd-23189\",\n" +
        "    modelId:\"254866\",\n" +
        "    modelName:\"请假\",\n" +
        "    startNodeId:\"u1\"\n" +
        "},function(result){});"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取所有节点信息",
    name: "getAllNodesInfo",
    Class: "",
    insert: " \n //获取所有节点信息(该方法需在vmd中绑定节点后才可获取) \n" +
    " var NodesInfo=hwWorkFlow.getAllNodesInfo();",
    comment: getFormatComment("getAllNodesInfo",
        "获取所有节点信息(该方法需在vmd中绑定节点后才可获取)",
        [" return {Array} 节点信息的集合 "],
        " var NodesInfo=hwWorkFlow.getAllNodesInfo();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取指定节点信息",
    name: "getNodeInfo",
    Class: "",
    insert: " \n //获取指定节点信息(该方法需在vmd中绑定节点后才可获取) \n" +
    " var NodeInfo=hwWorkFlow.getNodeInfo(nodeId);",
    comment: getFormatComment("getNodeInfo",
        "获取节点信息(该方法需在vmd中绑定节点后才可获取)",
        ["{String/Number} nodeId-指定的节点id",
        " return {Object} 节点信息 "],
        " var NodesInfo=hwWorkFlow.getNodeInfo(nodeId);"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取节点变量",
    name: "getNodeVar",
    Class: "",
    insert: " \n //获取节点变量(该方法需在vmd中绑定节点后才可获取) \n" +
    " var NodeVar=hwWorkFlow.getNodeVar(nodeId);",
    comment: getFormatComment("getNodeVar",
        "获取节点变量(该方法需在vmd中绑定节点后才可获取)",
        ["{String/Number} nodeId-指定的节点id",
        "return {array} 节点变量集合 "],
        "var NodeVar=hwWorkFlow.getNodeVar(nodeId);"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取节点变量值",
    name: "getNodeVarValue",
    Class: "",
    insert: " \n //获取节点变量值(该方法需在vmd中绑定节点后才可获取) \n" +
    " var NodeVarValue=hwWorkFlow.getNodeVarValue(nodeId,varName);",
    comment: getFormatComment("getNodeVarValue",
        "获取节点变量值(该方法需在vmd中绑定节点后才可获取)",
        ["{String/Number} nodeId-指定的节点id",
        "{String} varName-变量名",
        "return {String} 节点变量值 "],
        "var NodeVarValue=hwWorkFlow.getNodeVar(nodeId,varName);"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取所有变量对象",
    name: "getNodeAllVarValue",
    Class: "",
    insert: " \n //获取指定节点的所有变量对象 \n" +
    " var AllVarValue=hwWorkFlow.getNodeAllVarValue(nodeId);",
    comment: getFormatComment("getNodeAllVarValue",
        "获取指定节点的所有变量对象(该方法需在vmd中绑定节点后才可获取)",
        ["{String/Number} nodeId-指定的节点id",
        "return {Array} 节点变量对象的集合 "],
        " var AllVarValue=hwWorkFlow.getNodeAllVarValue(nodeId);"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "提交工作流",
    name: "submit",
    Class: "",
    insert: "\n // 提交工作流 \n" +
    "hwWorkFlow.submit(function(result){});",
    comment: getFormatComment("submit",
        "提交工作流",
        ["{Funtion/object} callback-回调函数，回调中参数为返回值；object格式{success:function(result){},error:function(msg){}}"],
        "hwWorkFlow.submit(function(result){})"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取节点信息",
    name: "getTaskId",
    Class: "",
    insert: "\n // 通过任务id获取节点信息 \n" +
    "hwWorkFlow.getTaskId(taskId,function(result){});",
    comment: getFormatComment("getTaskId",
        "通过任务id获取节点信息",
        ["{String} taskId-当前任务id",
        "{Funtion/object} callback-回调函数，回调中参数为返回节点信息；object格式{success:function(){},error:function(){}}"],
        "hwWorkFlow.getTaskId(taskId,function(result){})"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取表单变量",
    name: "getFormVars",
    Class: "",
    insert: "\n // 通过任务id获取表单变量 \n" +
    "hwWorkFlow.getFormVars(taskId,function(result){});",
    comment: getFormatComment("getFormVars",
        "通过任务id获取表单变量",
        ["{String} taskId-当前任务id",
        "{Funtion/object} callback-回调函数，参数返回表单变量信息；object格式{success:function(result){},error:function(msg){}}"],
        "hwWorkFlow.getFormVars(taskId,function(result){})"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取节点变量",
    name: "getTaskVars",
    Class: "",
    insert: "\n // 通过任务id获取节点变量 \n" +
    "hwWorkFlow.getTaskVars(taskId,function(result){});",
    comment: getFormatComment("getTaskVars",
        "通过任务id获取节点变量",
        ["{String} taskId-当前任务id",
        "{Funtion/object} callback-回调函数，参数返回节点变量信息；object格式{success:function(result){},error:function(msg){}}"],
        "hwWorkFlow.getTaskVars(taskId,function(result){})"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取流程定义信息",
    name: "getProcessDefinitio",
    Class: "",
    insert: "\n // 获取表单绑定工作流的流程定义信息 \n" +
    "hwWorkFlow.getProcessDefinitio(function(result){});",
    comment: getFormatComment("getProcessDefinitio",
        "获取表单绑定工作流的流程定义信息",
        ["{Funtion/object} callback-成功回调，参数返回流程定义信息；object格式{success:function(result){},error:function(msg){}}"],
        "hwWorkFlow.getProcessDefinitio(function(result){})"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "流程定义信息",
    name: "getProcessDefinitioByModelId",
    Class: "",
    insert: "\n // 通过模型id获取流程定义信息 \n" +
    "hwWorkFlow.getProcessDefinitioByModelId(function(result){},modelId);",
    comment: getFormatComment("getProcessDefinitioByModelId",
        "通过工作流id获取流程定义信息",
        ["{Funtion/object} callback-成功回调，参数返回流程定义信息；object格式{success:function(result){},error:function(msg){}}",
        "{String} modelId-模型id"],
        "hwWorkFlow.getProcessDefinitioByModelId(function(result){},modelId)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "启动流程",
    name: "startProcess",
    Class: "",
    insert: "\n // 启动流程 通过回调返回流程实例信息 \n" +
    "hwWorkFlow.startProcess(function(result){});",
    comment: getFormatComment("startProcess",
        "启动流程 通过回调返回流程实例信息",
        ["{Funtion/object} callback-成功回调，参数返回流程实例信息；object格式{success:function(result){},error:function(msg){}}"],
        "hwWorkFlow.startProcess(function(result){})"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "启动流程/返回下个节点信息",
    name: "startProcess2",
    Class: "",
    insert: "\n // 启动流程 通过回调，返回下个节点信息 \n" +
    "hwWorkFlow.startProcess2(function(result){});",
    comment: getFormatComment("startProcess2",
        "启动流程 通过回调，返回下个节点信息",
        ["{Funtion/object} callback-成功回调，参数返回下个节点信息；object格式{success:function(result){},error:function(msg){}}"],
        "hwWorkFlow.startProcess2(function(result){})"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "启动流程/通过流程定义id",
    name: "startProcessByProcessDefinition",
    Class: "",
    insert: "\n // 通过流程定义id启动流程 返回流程实例信息 \n" +
    "hwWorkFlow.startProcessByProcessDefinition(function(result){},id);",
    comment: getFormatComment("startProcessByProcessDefinition",
        "通过流程定义id启动流程 返回流程实例信息",
        ["{Funtion/object} callback-成功回调，返回流程实例信息；object格式{success:function(result){},error:function(msg){}}",
        "{String} id-流程定义id"],
        "hwWorkFlow.startProcessByProcessDefinition(function(result){},id)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "启动流程/通过流程定义id",
    name: "startProcessByProcessDefinition2",
    Class: "",
    insert: "\n // 通过流程定义id启动流程 返回下个节点信息 \n" +
    "hwWorkFlow.startProcessByProcessDefinition2(function(result){},id);",
    comment: getFormatComment("startProcessByProcessDefinition2",
        "通过流程定义id启动流程 返回下个节点信息",
        ["{Funtion/object} callback-成功回调，返回下个节点信息；object格式{success:function(result){},error:function(msg){}}",
            "{String} id-流程定义id"],
        "hwWorkFlow.startProcessByProcessDefinition2(function(result){},id)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "启动流程/通过模型id",
    name: "startProcessByModelId",
    Class: "",
    insert: "\n // 根据模型ID,参数启动流程，返回流程实例信息 \n" +
    "hwWorkFlow.startProcessByModelId(function(result){},modelId,startuser);",
    comment: getFormatComment("startProcessByModelId",
        "通过流程定义id启动流程 返回流程实例信息",
        ["{Funtion/object} callback-成功回调，返回流程实例信息；object格式{success:function(result){},error:function(msg){}}",
        "{String} modelId-模型id",
        "{Array} startuser-参数列表 如：[{name:'',value:''}]"],
        "hwWorkFlow.startProcessByModelId(function(result){},modelId,startuser)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "启动流程/通过模型id",
    name: "startProcessByModelId2",
    Class: "",
    insert: "\n // 根据模型ID,参数启动流程，返回下个节点信息 \n" +
    "hwWorkFlow.startProcessByModelId2(function(result){},modelId,startuser);",
    comment: getFormatComment("startProcessByModelId2",
        "根据模型ID,参数启动流程，返回下个节点信息",
        ["{Funtion/object} callback-成功回调，返回下个节点信息；object格式{success:function(result){},error:function(msg){}}",
            "{String} modelId-模型id",
            "{Array} startuser-参数列表 如：[{name:'',value:''}]"],
        "hwWorkFlow.startProcessByModelId2(function(result){},modelId,startuser)"),
    value: {},
    type: publicMethodsType.fun
},{
		text: "启动流程,并写入消息中心待办；通过模型id",
		name: "startProcess_StandbyCenter",
		Class: "",
		insert: "\n // 启动流程  并将待办信息写入到待办中心，无需再单独写待办 \n" +
			"hwWorkFlow.startProcess_StandbyCenter({ \n" +
			"	modelId:30057,//选填，通过模版id启动，非绑定表单模式下需要填写 \n" +
			"	variables:[{'name': '', 'value': ''}],//list 选填，提交的变量，为空会自己组织参数 {'name': '', 'value': ''} \n" +
			"	assigneeListId:'assigneeList',//string 选填，在启用会签时需要，此名称与流程图中要一致 \n" +
			"	assigneeList:['kermit','dbadmin','ceshi02'],//lsit 选填，在启用会签时需要，设置会签人员 \n" +
			"	msgData:'',//string 选填，消息体内容,消息推送用 \n" +
			"	isSendMsg:'',//bool 选填，是否发消息,默认true \n" +
			"	isGtask:'',//bool 选填，是否保存待办，默认true \n" +
			"	title:'',//string 选填，流程启动后待办名称，不传内部写入流程实例名称 \n" +
			"	content:'',//string 选填，流程启动后待办内容 \n" +
			"	remark:'',// 选填，备注\n" +
			"	tasklink:'',// 选填，任务链接，用于查询已办使用\n" +
			"	formusername:'',// 选填，表单处理人名称\n" +
			"	business:'',// 必填，业务键值,建立流程与业务对应关系\n" +
			"	effectivedate:'',//选填，生效时间，格式必须为yyyy-MM-dd HH:mm:ss \n" +
			"	type:'',//选填，为‘1’时，审批历程记录流程启动信息 \n" +
			"	success:function(){},//function 选填，成功回调 \n" +
			"	error:function(){}//function 选填，失败回调 \n" +
			"});",
		comment: getFormatComment("startProcess_StandbyCenter",
			"启动流程  并将待办信息写入到待办中心，无需再单独写待办", ["{object} startConfig-启动流程时设置的参数；格式 { \n" +
				"	modelId:30057,//选填 如以绑定模版，则可不填，否则需要传递 \n" +
				"	variables:[{'name': '', 'value': ''}],//list 选填，提交的变量，为空会自己组织参数 {'name': '', 'value': ''} \n" +
				"	assigneeListId:'assigneeList',//string 选填，在启用会签时需要，此名称与流程图中要一致 \n" +
				"	assigneeList:['kermit','dbadmin','ceshi02'],//lsit 选填，在启用会签时需要，设置会签人员 \n" +
				"	msgData:'',//string 选填，消息体内容,消息推送用 \n" +
				"	isSendMsg:'',//bool 选填，是否发消息,默认true \n" +
				"	isGtask:'',//bool 选填，是否保存待办，默认true \n" +
				"	title:'',//string 选填，流程启动后待办名称，不传内部写入流程实例名称 \n" +
				"	content:'',//string 选填，流程启动后待办内容 \n" +
				"	remark:'',// 选填，备注\n" +
				"	tasklink:'',// 选填，任务链接，用于查询已办使用\n" +
				"	formusername:'',// 选填，表单处理人名称\n" +
				"	business:'',// 必填，业务键值,建立流程与业务对应关系\n" +
				"	effectivedate:'',//选填，生效时间，格式必须为yyyy-MM-dd HH:mm:ss \n" +
				"	type:'',//选填，为‘1’时，审批历程记录流程启动信息 \n" +
				"	success:function(){},//function 选填，成功回调 \n" +
				"	error:function(){}//function 选填，失败回调 \n" +
				"}"
			],
			"hwWorkFlow.startProcess_StandbyCenter(startConfig)"),
		value: {},
		type: publicMethodsType.fun
},{
    text: "提交任务",
    name: "SubmitTask",
    Class: "",
    insert: "\n // 提交任务 返回提交状态信息（自动判断启动还是提交） \n" +
    "hwWorkFlow.SubmitTask(function(result){});",
    comment: getFormatComment("SubmitTask",
        "提交任务 返回提交状态信息（自动判断启动还是提交）",
        ["{Funtion/object} callback-成功回调，返回提交状态信息；object格式{success:function(result){},error:function(msg){}}"],
        "hwWorkFlow.SubmitTask(function(result){})"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "提交任务",
    name: "SubmitTask2",
    Class: "",
    insert: "\n // 提交任务 返回下个节点信息（自动判断启动还是提交） \n" +
    "hwWorkFlow.SubmitTask2(function(result){});",
    comment: getFormatComment("SubmitTask2",
        "提交任务 返回下个节点信息（自动判断启动还是提交）",
        ["{Funtion/object} callback-成功回调，返回下个节点信息；object格式{success:function(result){},error:function(msg){}}"],
        "hwWorkFlow.SubmitTask2(function(result){})"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "提交任务/通过任务id",
    name: "SubmitTaskById",
    Class: "",
    insert: "\n // 通过任务id、参数  提交任务，并返回下一个节点的任务信息 \n" +
    "hwWorkFlow.SubmitTaskById(function(result){},taskid,params);",
    comment: getFormatComment("SubmitTaskById",
        "通过任务id、参数  提交任务，并返回下一个节点的任务信息",
        ["{Funtion/object} callback-成功回调，返回下个节点信息；object格式{success:function(result){},error:function(msg){}}",
            "{String} taskid-任务id",
            "{Array} params-参数列表 如：[{name:'',value:''}]"],
        "hwWorkFlow.SubmitTaskById(function(result){},taskid,params)"),
    value: {},
    type: publicMethodsType.fun
},{
		text: "提交任务流程  并将待办信息写入到待办中心，无需再单独写待办",
		name: "submitTask_StandbyCenter",
		Class: "",
		insert: "\n // 启动流程  并将待办信息写入到待办中心，无需再单独写待办 \n" +
			"hwWorkFlow.submitTask_StandbyCenter({ \n" +
			"	taskId:30057,//选填， 通过任务id启动 ，如url中传递taskId 则可不填，未传递则需要\n" +
			"	properties:[{'id': '', 'value': ''}],//list 选填，提交的变量，为空会自己组织参数 {'name': '', 'value': ''} \n" +
			"	assigneeListId:'assigneeList',//string 选填，在启用会签时需要，此名称与流程图中要一致 \n" +
			"	assigneeList:['kermit','dbadmin','ceshi02'],//lsit 选填，在启用会签时需要，设置会签人员 \n" +
			"	msgData:'',//string 选填，消息体内容,消息推送用 \n" +
			"	isSendMsg:'',//bool 选填，是否发消息,默认true \n" +
			"	isGtask:'',//bool 选填，是否保存待办，默认true \n" +
			"	title:'',//string 选填，流程启动后待办名称，不传内部写入流程实例名称 \n" +
			"	content:'',//string 选填，流程启动后待办内容 \n" +
			"	auditresult:'',//string 选填，审批结果  1 同意 2 拒绝 3 退回 4 发起 5 中止 \n" +
			"	auditsug:'',//string 选填，审批意见 \n" +
			"	remark:'',// 选填，备注\n" +
			"	business:'',// 业务键值,建立流程与业务对应关系\n" +
			"	tasklink:'',// 选填，任务链接，用于查询已办使用\n" +
			"	formusername:'',// 选填，表单处理人名称\n" +
			"	effectivedate:'',//选填，生效时间，格式必须为yyyy-MM-dd HH:mm:ss \n" +
			"	success:function(){},//function 选填，成功回调 \n" +
			"	error:function(){}//function 选填，失败回调 \n" +
			"});",
		comment: getFormatComment("submitTask_StandbyCenter",
			"提交任务流程  并将待办信息写入到待办中心，无需再单独写待办", ["{object} submitConfig-启动流程时设置的参数；格式 { \n" +
				"	taskId:30057,//必填  通过任务id启动 ，如url中传递taskid 则可不填 \n" +
				"	properties:[{'id': '', 'value': ''}],//list 选填，提交的变量，为空会内部自动组织参数 {'id': '', 'value': ''} \n" +
				"	assigneeListId:'assigneeList',//string 选填，在启用会签时需要，此名称与流程图中要一致 \n" +
				"	assigneeList:['kermit','dbadmin','ceshi02'],//lsit 选填，在启用会签时需要，设置会签人员 \n" +
				"	msgData:'',//string 选填，消息体内容,消息推送用 \n" +
				"	isSendMsg:'',//bool 选填，是否发消息,默认true \n" +
				"	isGtask:'',//bool 选填，是否保存待办，默认true \n" +
				"	title:'',//string 选填，流程启动后待办名称，不传内部写入流程实例名称 \n" +
				"	content:'',//string 选填，流程启动后待办内容 \n" +
				"	auditresult:'',//string 选填，审批结果   1 同意 2 拒绝 3 退回 4 发起 5 中止  \n" +
				"	auditsug:'',//string 选填，审批意见 \n" +
				"	remark:'',// 选填，备注\n" +
				"	business:'',// 业务键值,建立流程与业务对应关系\n" +
				"	tasklink:'',// 选填，任务链接，用于查询已办使用\n" +
				"	formusername:'',// 选填，表单处理人名称\n" +
				"	effectivedate:'',//选填，生效时间，格式必须为yyyy-MM-dd HH:mm:ss \n" +
				"	success:function(){},//function 选填，成功回调 \n" +
				"	error:function(){}//function 选填，失败回调 \n" +
				"}"
			],
			"hwWorkFlow.submitTask_StandbyCenter(submitConfig)"),
		value: {},
		type: publicMethodsType.fun
},{
    text: "获取任务id",
    name: "getTaskIdByProcessInstanceId",
    Class: "",
    insert: "\n // 通过流程实例id获取任务id等信息（根据用户和用户组进行提取） \n" +
    "hwWorkFlow.getTaskIdByProcessInstanceId(function(result){},id);",
    comment: getFormatComment("getTaskIdByProcessInstanceId",
        "通过流程实例id获取任务id等信息（根据用户和用户组进行提取，自动读取cookie获取）",
        ["{Funtion/object} callback-成功回调，并返回当前任务信息；object格式{success:function(result){},error:function(msg){}}",
            "{String} id-工作流流程实例id"],
        "hwWorkFlow.getTaskIdByProcessInstanceId(function(result){},id)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取任务信息",
    name: "getTaskInfoByProcessInstanceId",
    Class: "",
    insert: "\n // 通过流程实例id获取任务信息，返回流程对象信息\n" +
    "hwWorkFlow.getTaskInfoByProcessInstanceId(function(result){},id);",
    comment: getFormatComment("getTaskInfoByProcessInstanceId",
        "通过流程实例id获取任务信息，返回流程对象信息，通过回调进行传递",
        ["{Funtion/object} callback-启动成功的回调，回调中参数为任务信息，流程对象信息；；object格式{success:function(result){},error:function(msg){}}",
        "{String} id-工作流流程实例id"],
        "hwWorkFlow.getTaskInfoByProcessInstanceId(function(result){},id)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "分配会签",
    name: "allotAssignee",
    Class: "",
    insert: "\n // 通过流程实例id获取任务信息，返回流程对象信息\n" +
    "hwWorkFlow.allotAssignee(function(result){},assigneeList,assigneelistName);",
    comment: getFormatComment("allotAssignee",
        "通过流程实例id获取任务信息，返回流程对象信息，通过回调进行传递",
        ["{Funtion/object} callback-启动成功的回调，回调中参数为任务信息，流程对象信息；object格式{success:function(result){},error:function(msg){}}",
        "{array} assigneeList-会签人员列表 此处为非加密的用户",
        "{string} assigneelistName-会签名称，次名称为节点启用会签时设置的名称，默认为“assigneeList”"],
        "hwWorkFlow.allotAssignee(function(result){},assigneeList,assigneelistName)"),
    value: {},
    type: publicMethodsType.fun
}, {
		text: "带审批历程的流程中断接口",
		name: "deleteinstance_StandbyCenter",
		Class: "",
		insert: "\n // 通过流程实例id或任务id关闭流程，并写入待办中心 \n" +
			"hwWorkFlow.deleteinstance_StandbyCenter({ \n" +
			"	taskId:30057,//string 选填，任务id, \n" +
			"	processInstanceId:'',//string 选填，流程实例id \n" +
			"	deleteReason:'',//string 选填，中断原因 \n" +
			"	formusername:'',// 表单处理人名称 \n" +
			"	title:'',//string 选填，流程启动后待办名称，不传内部写入流程实例名称 \n" +
			"	content:'',//string 选填，流程启动后待办内容			 \n" +
			"	remark:'',//string 选填，备注 \n" +
			"	business:'',//string 选填，修改业务主键 \n" +
			"	msgData:'',//string 选填，消息体内容,消息推送用 \n" +
			"	isSendMsg:'',//bool 选填，是否发消息,默认true \n" +
			"	isGtask:'',//bool 选填，是否保存待办，默认true \n" +
			"	success:function(result){},//function 选填，成功回调 \n" +
			"	error:function(result){}//function 选填，失败回调 \n" +
			"});",
		comment: getFormatComment("deleteinstance_StandbyCenter",
			" 通过流程实例id或任务id关闭流程，并写入待办中心", ["{object} deleteinstanceConfig-启动流程时设置的参数；object格式{ \n" +
				"	taskId:30057,//string 选填，任务id, \n" +
				"	processInstanceId:'',//string 选填，流程实例id \n" +
				"	deleteReason:'',//string 选填，中断原因 \n" +
				"	formusername:'',// 表单处理人名称 \n" +
				"	title:'',//string 选填，流程启动后待办名称，不传内部写入流程实例名称 \n" +
				"	content:'',//string 选填，流程启动后待办内容			 \n" +
				"	remark:'',//string 选填，备注 \n" +
				"	business:'',//string 选填，修改业务主键 \n" +
				"	msgData:'',//string 选填，消息体内容,消息推送用 \n" +
				"	isSendMsg:'',//bool 选填，是否发消息,默认true \n" +
				"	isGtask:'',//bool 选填，是否保存待办，默认true \n" +
				"	success:function(result){},//function 选填，成功回调 \n" +
				"	error:function(result){}//function 选填，失败回调 \n" +
				"}"
			],
			"hwWorkFlow.deleteinstance_StandbyCenter(deleteinstanceConfig)"),
		value: {},
		type: publicMethodsType.fun
	}]);

//pageRoot/----------------------------------------------------------------------------------------------------------------------
//添加到主分类-页面操作
addFunc(pageRoot,[]);
//pageRoot/pageRoot_Data----------------------------------------------------------------------------------------------------------------------
//添加到主分类-页面操作-数据操作
addFunc(pageRoot_Data,[{
		text: "获取数据集",
		name: "getStore",
		Class: "getStore",
		insert: " \n //通过id获取数据集对象 \n" +
			" var store=vmd.getStore(storename);",
		comment: getFormatComment("getStore",
			"获取数据集",
            [" {String} storename-要获取的数据集id ",
            " return {vmd.store.jsonstore} 数据集对象 "],
			" var store=vmd.getStore(storename)"),
		value: {},
		type: publicMethodsType.fun
	},
	{
		text: "创建数据集",
		name: "Store",
		Class: "",
		insert: " \n // 创建数据集。 \n" +
            "var store=new vmd.data.Store({ data:dataJson,fields: fields});",
		comment: getFormatComment("Store",
			"创建数据集",
            [" {Object} dataJson-创建数据集的数据 ",
            "{Object} fields-数据集的字段信息的集合 ",
            " return {vmd.store.jsonstore} 数据集对象 "],
			"var comData = [{name:'张三',id:12},{name:'李四',id:23}]" +
			"var store = new vmd.data.Store({\n" +
            "        data: comData,\n" +
            "        fields: ['id','name']\n" +
            "    })"),
		value: {},
		type: publicMethodsType.fun
	},
	{
		text: "创建数据集行记录",
		name: "Record",
		Class: "",
		insert: "\n // 创建record行记录。 \n" +
			"var records= vmd.data.Record.create({\"name\":\"王五\",id:52})  ;",
		comment: getFormatComment("Record",
			"创建数据集行记录",
            ["{Object} datajson-标准的json格式对象数组 ",
            "return {vmd.data.Record} "],
			" var records= vmd.data.Record.create({\"name\":\"王五\",id:52})  ;"),
		value: {},
		type: publicMethodsType.fun
	},
	{
		text: "添加记录",
		name: "add",
		Class: "",
		insert: "\n //获取要操作的数据集  \n" +
			" var store=vmd.getStore(storename)  \n" +
			" //创建插入的记录对象  \n" +
			" var records= vmd.data.Record.create({\"name\":\"王五\",id:52}); \n" +
			"var record1 =  vmd.data.Record.create({\"name\":\"张三\",id:53}); \n" +
			" // 往Store对象添加Records，并触发add事件。  \n" +
			" store.add(records,record1);",
		comment: getFormatComment("add",
			"创建数据集行记录",
            ["{vmd.data.Record} records  准备加入到缓存的vmd.data.Record对象数组  ",
            "return {void}" ],
			"store.add(records)"),
		value: {},
		type: publicMethodsType.fun
	},
    {
        text: "循环",
        name: "each",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
            "var store=vmd.getStore(storename)\n" +
            "// 对缓存中每个记录调用特点的函数。\n" +
            "var fn =function(record)\n" +
            "{\n" +
            "alert(record.name);\n" +
            "}\n" +
            "store.each(fn,[scope]);",
        comment: getFormatComment("each",
            "循环数据并调用指定函数",
            ["{Function} fn-要调用的函数。Record对象将是第一个参数。 ",
            "{Object} scope-函数的作用域（默认为Record对象）（可选的）",
            "return {void}"],
            "store.each(fn,scope)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "刷新",
        name: "toRefresh",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
        "var store=vmd.getStore(storename)\n" +
        "store.toRefresh();",
        comment: getFormatComment("toRefresh",
            "刷新数据集",
            [],
            "store.toRefresh()"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "筛选",
        name: "filter",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
        "var store=vmd.getStore(storename)\n" +
        "// 由指定的属性筛选记录\n" +
        "store.filter(field,value,[anyMatch],[caseSensitive]) ;",
        comment: getFormatComment("filter",
            "由指定的属性筛选记录",
            ["{String} field-要查询的字段。",
            "{String/RegExp} value-既可以是字段开头的字符串，也可以是针对该字段的正则表达式。",
            "{Boolean} anyMatch-True表示不一定要开头的，当中包含的亦可 。",
            "{Boolean} caseSensitive-True表示大小写敏感",
            "return {void}"],
            "store.filter(field,RegExpvalue,[anyMatch],[caseSensitive]) "),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "自定义筛选",
        name: "filterBy",
        Class: "",
        insert: "\n // 由外部函数进行筛选，Store里面的每个记录都经过这个函数内部使用。\n" +
        "// 如果函数返回true的话，就引入（included）到匹配的结果集中，否则就会被过滤掉。\n" +
            "//获取要操作的数据集\n" +
            "var store=vmd.getStore(storename)\n" +
            "store.filterBy（fn,scope）;",
        comment: getFormatComment("filterBy",
            "由外部函数进行筛选，Store里面的每个记录都经过这个函数内部使用。\n" +
            "//如果函数返回true的话，就引入（included）到匹配的结果集中，否则就会被过滤掉",
            ["{Function} fn  要执行的函数。它会被传入以下的参数 ",
            "     record : vmd.data.Record 对象用来测试过滤结果的。访问字段值就用vmd.data.Recordget方法。",
            "     id : Object 所传入的Record的ID ",
            "{Object} scope : Object 函数作用域（默认为this）。",
            "return {void}"],
            "store.filterBy（fn,scope）"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "根据属性查找",
        name: "find",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
        "var store=vmd.getStore(storename)\n" +
        "// 根据指定的属性域,以及指定的值,找出第一条匹配的记录的索引 index\n" +
        "store.find(property,value,[startIndex],[anyMatch],[caseSensitive]) ;",
        comment: getFormatComment("find",
            "根据指定的属性域,以及指定的值,找出第一条匹配的记录的索引 index",
            ["{String} property-查询对象的属性  ",
            "{String/RegExp} value-既可以是字段开头的字符串，也可以是针对该字段的正则表达式 ",
            "{Number} startIndex-查询的开始索引 ",
            "{Boolean} anyMatch-True表示不一定要开头的，当中包含的亦可 ",
            "return {Number} 匹配的索引，没有匹配项则返回-1"],
            "store.find(property,value,[startIndex],[anyMatch],[caseSensitive])"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "自定义查找",
        name: "findBy",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
            "var store=vmd.getStore(storename)\n" +
            "// 由外部函数从某个索引开始进行筛选。只考虑第一次匹配的结果\n" +
            "store.findBy(fn,[Oscope],[startIndex]) ;",
        comment: getFormatComment("findBy",
            "由外部函数从某个索引开始进行筛选。只考虑第一次匹配的结果。如果函数返回true的话，就被认为是一个匹配的结果",
            ["{Function} fn-要执行的函数。它会被传入以下的参数 ",
            " record : vmd.data.Record 对象用来测试过滤结果的。访问字段值就用vmd.data.Recordget方法。",
            " id : Object 所传入的Record的ID ",
            "{Object} scope-函数作用域（默认为this）。 ",
            "{Number} startIndex-查询的开始索引 ",
            "return {Number} 匹配的索引，没有匹配项则返回-1"],
            "store.findBy(fn,[scope],[startIndex]) "),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "根据索引找到Record",
        name: "getAt",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
        "var store=vmd.getStore(storename)\n" +
        "// 根据指定的索引找到Record\n" +
        "var record=store.getAt(startIndex) ;",
        comment: getFormatComment("getAt",
            "根据指定的索引找到Record",
            ["{Number} Index-要找的Record的索引 ",
            "return {vmd.data.Record 返回匹配索引的Record，如果未找到则返回undefined" ],
            "var record=store.getAt(startIndex) "),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "根据id找到Record",
        name: "getById",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
        "var store=vmd.getStore(storename)\n" +
        "// 根据指定的id找到Record。\n" +
        "var record=store.getById(id) ;",
        comment: getFormatComment("getById",
            "根据指定的id找到Record",
            ["{String} id-要找的Record的id ",
            "return {vmd.data.Record 返回匹配id的Record，如果未找到则返回undefined" ],
            "var record=store.getById(id)  "),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "获取缓存记录的总数",
        name: "getCount",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
            "var store=vmd.getStore(storename)\n" +
            "// 获取缓存记录的总数。\n" +
            "var count=store.getCount() ;",
        comment: getFormatComment("getCount",
            "获取缓存记录的总数",
            ["return {Number} Store-缓存中记录总数" ],
            "var count=store.getCount() "),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "查找指定范围里的Records",
        name: "getRange",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
            "var store=vmd.getStore(storename)\n" +
            "// 查找指定范围里的Records。\n" +
            "var Records=store.getRange(startIndex,endIndex);",
        comment: getFormatComment("getRange",
            "查找指定范围里的Records",
            ["{Number} startIndex-可选项,开始索引（默认为 0）  ",
            "{Number} endIndex-可选项,结束的索引 默认是Store中最后一个Record的索引）",
            "return {vmd.data.Record 返回一个Record数组"],
            "var Records=store.getRange(startIndex,endIndex)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "以对象的形式返回当前排序的状态",
        name: "getRange",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
            "var store=vmd.getStore(storename)\n" +
            "// 以对象的形式返回当前排序的状态。\n" +
            "var Records=store.getSortState();",
        comment: getFormatComment("getRange",
            "以对象的形式返回当前排序的状态",
            ["return {Object} 当前排序的状态：它是一个对象，有以下两个属性：",
            "field : String 一个是排序字段 ",
            "direction : String 一个是排序方向，\"ASC\"或\"DESC\""],
            "var Records=store.getSortState()"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "记录所在的索引",
        name: "indexOf",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
            "var store=vmd.getStore(storename)\n" +
            "// 传入一个记录，根据记录在缓存里查询的匹配的记录，返回其索引。\n" +
            "var index=store.indexOf(record);",
        comment: getFormatComment("indexOf",
            "传入一个记录，根据记录在缓存里查询的匹配的记录，返回其索引",
            ["{vmd.data.Record} record 要找寻的vmd.data.Record record ",
            "return {Number} 被传入的Record的索引，如果未找到返回-1" ],
            "var index=store.indexOf(record)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "通过id获取索引",
        name: "indexOfId",
        Class: "",
        insert: "//获取要操作的数据集\n" +
            "var store=vmd.getStore(storename)\n" +
            "// 传入一个id，根据id查询缓存里的Record，返回其索引。\n" +
            "var index=store.indexOfId(Id);",
        comment: getFormatComment("indexOfId",
            "传入一个id，根据id查询缓存里的Record，返回其索引",
            ["{String} id-要找到Record的id id ",
            "return {Number} 被传入的id的索引，如果未找到返回-1"] ,
            "var index=store.indexOfId(string Id)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "插入记录",
        name: "insert",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
            "var store=vmd.getStore(storename)\n" +
            "// 触发添加事件时插入records到指定的store位置 。\n" +
            "store.insert(index,records) ;",
        comment: getFormatComment("insert",
            "触发添加事件时插入records到指定的store位置",
            ["{Number} index-传入的Records插入的开始位置 ",
            "{vmd.data.Record} records-加入到缓存中的vmd.data.Record对象",
            "return {Number} 被传入的id的索引，如果未找到返回-1" ],
            "store.insert(index,records) "),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "是否筛选",
        name: "isFiltered",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
        "var store=vmd.getStore(storename)\n" +
        "// 返回true表明这个store当前是在筛选的。\n" +
        "store.isFiltered() ;",
        comment: getFormatComment("insert",
            "返回true表明这个store当前是在筛选的",
            ["return {Boolean}" ],
            "store.isFiltered() "),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "加载数据",
        name: "loadData",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
            "var store=vmd.getStore(storename)\n" +
            "// 从传入的数据块中装载数据，并触发load事件。\n" +
            "store.loadData(data,[add]) ;",
        comment: getFormatComment("loadData",
            "从传入的数据块中装载数据，并触发load事件",
            ["{Object} data-Json格式，要被转化为Records的数据块。",
            "{Boolean} add-True表示为是在缓存中追加新的Records而不是进行替换,默认为false。",
            "return {void}" ],
            "store.loadData(Object data,[Boolean add]) "),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "添加事件监听",
        name: "addListener",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
            "var store=vmd.getStore(storename)\n" +
            "// 为该元素添加事件处理函数\n" +
            "store.addListener(eventName,handler,[scope],options) ;",
        comment: getFormatComment("addListener",
            "为该元素添加事件处理函数",
            ["{String} eventName-事件名称",
            "{Function} handler-处理函数",
            "{Object} scope-执行处理函数的作用域。",
            "{Object} options-（可选的）(optional) @method ",
            "return {void}"],
            "store.addListener(eventName,handler,[scope],options) "),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "on添加事件监听",
        name: "on",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
            "var store=vmd.getStore(storename)\n" +
            "// 为该元素添加事件处理函数（addListener的简写方式）。\n" +
            "store.on(eventName,handler,[scope],options) ;",
        comment: getFormatComment("on",
            "为该元素添加事件处理函数（addListener的简写方式）",
            ["{String} eventName-事件名称",
            "{Function} handler-处理函数",
            "{Object} scope-执行处理函数的作用域。",
            "{Object} options-（可选的）(optional) @method ",
            "return {void}"],
            "store.on(eventName,handler,[scope],options) "),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "查询",
        name: "query",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
            "var store=vmd.getStore(storename)\n" +
            "// 由指定的属性查询记录。\n" +
            "var records=store.query(field,value,[anyMatch],[caseSensitive]) ;",
        comment: getFormatComment("query",
            "由指定的属性查询记录",
            ["{String} field-要查询的字段。",
            "{String/RegExp} value-既可以是字段开头的字符串，也可以是针对该字段的正则表达式 ",
            "{Boolean} anyMatch-True表示不一定要开头的，当中包含的亦可 ",
            "{Boolean} caseSensitive-True表示大小写敏感 ",
            "return {Collection}返回一个vmd.util.Collection实例，包含了匹配的记录"],
            "var records=store.query(field,value,[anyMatch],[caseSensitive]) "),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "放弃变更",
        name: "rejectChanges",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
        "var store=vmd.getStore(storename)\n" +
        "store.rejectChanges() ;",
        comment: getFormatComment("rejectChanges",
            "放弃所有的变更",
            [],
            "store.rejectChanges() "),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "重新加载",
        name: "reload",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
        "var store=vmd.getStore(storename)\n" +
        "store.reload() ;",
        comment: getFormatComment("reload",
            "重新加载",
            [],
            "store.reload() "),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "移除记录",
        name: "remove",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
            "var store=vmd.getStore(storename)\n" +
            "// 从Store中移除一Record对象，并触发remove移除事件。 \n" +
            "store.remove(record);",
        comment: getFormatComment("remove",
            "从Store中移除一Record对象，并触发remove移除事件",
            ["{vmd.data.Record} record-被从缓存中移除的vmd.data.Record对象 record ",
            "return {void} "],
            "store.remove(record)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "清空记录",
        name: "removeAll",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
        "var store=vmd.getStore(storename)\n" +
        "store.removeAll();",
        comment: getFormatComment("removeAll",
            "从Store中清空所有Record对象，并触发clear事件",
            [],
            "store.removeAll()"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "移除指定索引的记录",
        name: "removeAt",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
        "var store=vmd.getStore(storename)\n" +
        "// 根据指定的索引移除Store中的某个Record。触发remove事件。 \n" +
        "store.removeAt(index);",
        comment: getFormatComment("removeAt",
            "根据指定的索引移除Store中的某个Record。触发remove事件",
            ["{Number} index-要被移除的Record索引。",
            "return {void} " ],
            "store.removeAt(index)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "移除事件监听器",
        name: "removeListener",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
            "var store=vmd.getStore(storename)\n" +
            "// 移除侦听器。 \n" +
            "store.removeListener(eventName,handler,[scope]);",
        comment: getFormatComment("removeListener",
            "移除侦听器",
            ["{String} eventName-侦听事件的类型",
            "{Function} handler-移除的处理函数",
            "{Object} scope-（可选的）处理函数之作用域",
            "return {void}"],
            "store.removeListener(eventName,handler,[scope])"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "设置默认排序",
        name: "setDefaultSort",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
            "var store=vmd.getStore(storename)\n" +
            "// 设置默认的列排序，以便下次load操作时使用。 \n" +
            "store.setDefaultSort(fieldName,[dir]);",
        comment: getFormatComment("setDefaultSort",
            "设置默认的列排序，以便下次load操作时使用",
            ["{String} fieldName-要排序的字段",
            "{String} dir-排序顺序，“ASC”或“DESC”（默认为“ASC”） ",
            "return {void}"],
            "store.setDefaultSort(fieldName,[dir])"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "排序",
        name: "sort",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
        "var store=vmd.getStore(storename)\n" +
        "// 对记录排序。 \n" +
        "store.sort(fieldName,dir);",
        comment: getFormatComment("setDefaultSort",
            "对记录排序",
            ["{String} fieldName-要排序的字段",
            "{String} dir-排序顺序，“ASC”或“DESC”（默认为“ASC”） ",
            "return {void}"],
            "store.sort(fieldName,[dir])"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "统计记录属性个数",
        name: "sum",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
            "var store=vmd.getStore(storename)\n" +
            "// 统计记录属性个数。 \n" +
            "store.sum(property,start,end) ;",
        comment: getFormatComment("sum",
            "统计记录属性个数",
            ["{String} property-记录集中要统计的字段名称。",
            "{Number} start-计算的记录开始索引（默认为0）。",
            "{Number} end-计算的记录结尾索引（默认为length - 1，从零开始算）。",
            "return {Number} 总数 "],
            "store.sum(property,start,end)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "禁用所有事件",
        name: "suspendEvents",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
            "var store=vmd.getStore(storename)\n" +
            "// 暂停触发所有的事件。\n" +
            "store.suspendEvents(queueSuspended);",
        comment: getFormatComment("suspendEvents",
            "暂停触发所有的事件",
            ["{Boolean} queueSuspended  ",
            "return {void}"],
            "store.suspendEvents(queueSuspended)"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "un移除事件监听器",
        name: "un",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
        "var store=vmd.getStore(storename)\n" +
        "// 移除侦听器。 \n" +
        "store.un(eventName,handler,[scope]);",
        comment: getFormatComment("un",
            "移除侦听器",
            ["{String} eventName-侦听事件的类型",
            "{Function} handler-移除的处理函数",
            "{Object} scope-（可选的）处理函数之作用域",
            "return {void}"],
            "store.un(eventName,handler,[scope])"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "获取json",
        name: "getJson",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
        "var store=vmd.getStore(storename)\n" +
        "store.getJson();",
        comment: getFormatComment("getJson",
            "获取json数据",
            [],
            "store.getJson()"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "开始进入编辑",
        name: "beginEdit",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
        "var store=vmd.getStore(storename)\n" +
        "var record=store.getAt(0);\n" +
        "record.beginEdit();",
        comment: getFormatComment("beginEdit",
            "开始进入编辑。编辑期间，没有与所在的store任何关联的事件",
            [],
            "var store=vmd.getStore(”storename”)\n" +
            "var record=store.getAt(0);\n" +
            "record.beginEdit();"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "取消已修改过的数据",
        name: "cancelEdit",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
        "var store=vmd.getStore(storename)\n" +
        "var record=store.getAt(0);\n" +
        "record.cancelEdit();",
        comment: getFormatComment("cancelEdit",
            "取消所有已修改过的数据。",
            [],
            "var store=vmd.getStore(storename)\n" +
            "var record=store.getAt(0);\n" +
            "record.cancelEdit();"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "提交",
        name: "commit",
        Class: "",
        insert: "// 这个方法通常给Record对象所在的那个vmd.data.Store对象调用。\n" +
        "//获取要操作的数据集\n" +
        "var store=vmd.getStore(storename)\n" +
        "var record=store.getAt(0);\n" +
        "record.commit(true);",
        comment: getFormatComment("commit",
            "个方法通常给Record对象所在的那个vmd.data.Store对象调用",
            ["{Boolean } silent-可选，True表示不通知自身的store对象有所改变（默认为false）。",
            "return {void}"],
            "var store=vmd.getStore(storename)\n" +
            "var record=store.getAt(0);\n" +
            "record.commit(true);"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "复制",
        name: "copy",
        Class: "",
        insert:  "\n // 创建记录的副本。\n" +
        "//获取要操作的数据集\n" +
        "var store=vmd.getStore(”storename”)\n" +
        "var record=store.getAt(0);\n" +
        "var newRecord=record.copy();",
        comment: getFormatComment("copy",
            "创建记录的副本",
            ["{String} id-创建新的ID,如果你不想在ID上也雷同",
            "return {Record } 复制的行记录"],
            "var store=vmd.getStore(storename)\n" +
            "var record=store.getAt(0);\n" +
            "var newRecord=record.copy();"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "创建",
        name: "create",
        Class: "",
        insert: "\n // 生成一个构造函数，该函数能产生符合规定的Record对象。\n" +
            "var TopicRecord = vmd.data.Record.create([\n" +
            "    {name: 'title',mapping: 'topic_title'},\n" +
            "    {name: 'author',mapping: 'username'},\n" +
            "    {name: 'totalPosts',mapping: 'topic_replies',type: 'int'},\n" +
            "    {name: 'lastPost',mapping: 'post_time',type: 'date'},\n" +
            "    {name: 'lastPoster',mapping: 'user2'},\n" +
            "    {name: 'excerpt',mapping: 'post_text'}\n" +
            "]);\n;",
        comment: getFormatComment("create",
            "生成一个构造函数，该函数能产生符合规定的Record对象",
            ["{Array }  o-数组。各个字段的定义，包括字段名、数据类型（可选的）、映射项（用于在vmd.data.Reader的数据对象中提取真实的数据）。",
            "{String} name-Record对象所引用的字段名称。",
            "*{String} mapping-可选的,如果使用的是vmd.data.Reader，这是一个Reader能够获取数据对象的数组值创建到Record对象下面的对应的映射项；",
            "{String} type-可选的,指明数据类型，转化为可显示的值。[auto(默认),string,int,float,boolean .date]",
            "{Mixed} defaultValue-可选的,默认值。",
            "{String} sortDir-可选的,初始化的排序方向，“ASC”或“DESC”。",
            "{Function} convert-可选的,由Reader提供的用于转换值的函数，将值变为Record下面的对象。",
            "{Mixed} v-数据值，和Reader读取的一样。",
            "{Mixed} rec-包含行的数据对象，和Reader读取的一样。这可以是数组，对象，XML元素对象，这取决于Reader对象的类型。",
            "{String}dateFormat :  （可选的） 字符串格式的Date.parseDate函数",
            "return {function } 根据定义创建新Records的构造器"],
            "var TopicRecord = vmd.data.Record.create([\n" +
            "    {name: 'title',mapping: 'topic_title'},\n" +
            "    {name: 'author',mapping: 'username'},\n" +
            "    {name: 'totalPosts',mapping: 'topic_replies',type: 'int'},\n" +
            "    {name: 'lastPost',mapping: 'post_time',type: 'date'},\n" +
            "    {name: 'lastPoster',mapping: 'user2'},\n" +
            "    {name: 'excerpt',mapping: 'post_text'}\n" +
            "]);"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "结束编辑",
        name: "endEdit",
        Class: "",
        insert: "\n //获取要操作的数据集\n" +
        "var store=vmd.getStore(storename)\n" +
        "var record=store.getAt(0);\n" +
        "record.endEdit();",
        comment: getFormatComment("endEdit",
            "结束编辑，如果数据有变动，则会通知所在的store。",
            [],
            "var store=vmd.getStore(storename)\n" +
            "var record=store.getAt(0);\n" +
            "record.endEdit();"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "字段返回值",
        name: "get",
        Class: "",
        insert: "\n // 根据字段返回值。\n" +
        "var record=new vmd.data.Record({name:\"张三\",age:\"27\"})\n" +
        "var value=record.get(\"age\");",
        comment: getFormatComment("get",
            "根据字段返回值",
            ["{String} name 字段名称的字符串",
            "return {Object } 字段的值"],
            "var record=new vmd.data.Record({name:\"张三\",age:\"27\"})\n" +
            "var value=record.get(\"age\");"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "获取hash",
        name: "getChanges",
        Class: "",
        insert: "\n // 该对象被创建或提交之后，用来获取字段的哈希值（hash）。\n" +
        "//获取要操作的数据集\n" +
        "var store=vmd.getStore(storename)\n" +
        "var record=store.getAt(0);\n" +
        "record.getChanges();",
        comment: getFormatComment("getChanges",
            "该对象被创建或提交之后，用来获取字段的哈希值（hash）",
            ["return {Object } 获取修改的hash值"],
            "var store=vmd.getStore(storename)\n" +
            "var record=store.getAt(0)\n" +
            "record.getChanges();"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "字段修改状态",
        name: "isModified",
        Class: "",
        insert: "\n // 如果传入的字段是修改过的（load或上一次提交）就返回true。\n" +
        "var record=new vmd.data.Record({name:\"张三\",age:\"27\"})\n" +
        "record.set(\"age\",\"38\")\n" +
        "var isChange=record.isModified(\"age\");",
        comment: getFormatComment("isModified",
            "如果传入的字段是修改过的（load或上一次提交）就返回true",
            ["{String}   fieldName   字段名称的字符串",
            "return {Boolean}"],
            "var record=new vmd.data.Record({name:\"张三\",age:\"27\"})\n" +
            "record.set(\"age\",\"38\")\n" +
            "var isChange=record.isModified(\"age\");"),
        value: {},
        type: publicMethodsType.fun
    },
    {
        text: "设置字段值",
        name: "set",
        Class: "",
        insert: "\n // 根据字段设置值。\n" +
        "var record=new vmd.data.Record({name:\"张三\",age:\"27\"})\n" +
        "record.set(\"age\",\"38\");",
        comment: getFormatComment("set",
            "根据字段设置值",
            ["{String}  name   字段名称的字符串",
            "{Object } value   值",
            "return {void}"],
            "var record=new vmd.data.Record({name:\"张三\",age:\"27\"})\n" +
            "record.set(\"age\",\"38\");"),
        value: {},
        type: publicMethodsType.fun
    }
]);
//pageRoot/pageRoot_Load----------------------------------------------------------------------------------------------------------------------
//添加到主分类-页面操作-进度条
addFunc(pageRoot_Load,[{
    text: "创建进度条",
    name: "loadMask",
    Class: "",
    insert: "var myMask = new vmd.LoadMask(vmd.getBody(),{msg:\"进度加载中，请稍后\"});\n" +
    "myMask.show();",
    comment: getFormatComment("loadMask",
        "创建进度条",
        [],
        "var myMask = new vmd.LoadMask(vmd.getBody(),{msg:\\\"进度加载中，请稍后\\\"});\\n\" +\n" +
        "    \"myMask.show();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "关闭进度条",
    name: "hide",
    Class: "",
    insert: "myMask.hide();",
    comment: getFormatComment("hide",
        "关闭进度条",
        [],
        "myMask.hide();"),
    value: {},
    type: publicMethodsType.fun
}]);

//pageRoot/pageRoot_Tree----------------------------------------------------------------------------------------------------------------------
//添加到主分类-树操作-进度条
addFunc(pageRoot_Tree,[{
    text: "闭合所有节点",
    name: "collapseAll",
    Class: "",
    insert: "\n tree.collapseAll();",
    comment: getFormatComment("collapseAll",
        "闭合所有节点",
        [],
        "tree.collapseAll()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "展开所有节点",
    name: "expandAll",
    Class: "",
    insert: "\n tree.expandAll();",
    comment: getFormatComment("expandAll",
        "展开所有节点",
        [],
        "tree.expandAll()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "过滤树节点",
    name: "filterBy",
    Class: "",
    insert: "\n tree.filterBy('资源管理');",
    comment: getFormatComment("filterBy",
        "根据节点文本过滤掉指定节点",
        ["{string} -text需要过滤掉节点的text文本"],
        "tree.filterBy('资源管理')"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取选中节点",
    name: "getChecked",
    Class: "",
    insert: "\n var selNode = tree.getChecked();",
    comment: getFormatComment("getChecked",
        "获取选中节点",
        ["return {Arrayr} 选中节点信息的结合" ],
        "var selNode = tree.getChecked()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "根据ID查找节点",
    name: "getNodeById",
    Class: "",
    insert: "\n var node = tree.getNodeById(\"1\");",
    comment: getFormatComment("getNodeById",
        "根据ID查找节点",
        ["{string/number} Id-节点的id" ],
        "var node = tree.getNodeById(\"1\")"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取根节点",
    name: "getRootNode",
    Class: "",
    insert: "\n var node = tree.getRootNode();",
    comment: getFormatComment("getRootNode",
        "返回树的根节点",
        [],
        "var node = tree.getRootNode()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "根节点设置",
    name: "setRootNode",
    Class: "",
    insert: "\n tree.getRootNode(node);",
    comment: getFormatComment("getRootNode",
        "在初始化过程中设置该树的根节点",
        ["{Object} node-将要设置为根节点的节点"],
        "tree.getRootNode(node)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "移除节点",
    name: "removeNodeById",
    Class: "",
    insert: "\n tree.removeNodeById('0002');",
    comment: getFormatComment("removeNodeById",
        "移除制定id对应的节点",
        ["{String/Number} id-将要移除的节点的"],
        "tree.removeNodeById('0002')"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取选中节点",
    name: "getSelNode",
    Class: "",
    insert: "\n var node = tree.getSelNode();",
    comment: getFormatComment("getSelNode",
        "获取选中节点",
        ["return 选中的节点信息"],
        "var node = tree.getSelNode()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "添加子节点",
    name: "addNode",
    Class: "",
    insert: "\n tree.addNode('001','00011','子节点');",
    comment: getFormatComment("addNode",
        "指定节点下添加子节点",
        ["{String} pid-父节点id",
        "{String} cid-要添加节点id",
        "{String} cname-要添加节点名称",
        "{boolean} isleaf-可选-是否为叶子节点",
        "{boolean} changeStore-可选，是否修改绑定的数据集，无数据集则不绑定"],
        "tree.addNode('001','00011','子节点')"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "复制节点",
    name: "nodeCopy",
    Class: "",
    insert: "\n tree.nodeCopy(node);",
    comment: getFormatComment("nodeCopy",
        "对指定节点进行复制",
        ["{Object} node-要复制的节点"],
        "tree.nodeCopy(node)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "复制节点到",
    name: "nodeCopyTo",
    Class: "",
    insert: "\n tree.nodeCopyTo(node，tree,nodeId,copyParentNode,changeStore);",
    comment: getFormatComment("nodeCopyTo",
        "将节点复制到目标树的某个节点下",
        ["{Object} node-要复制的节点",
        "{Object} tree-目标树",
        "{String/Number} nodeId-目标节点的id",
        "{boolean} copyParentNode-是否对父节点进行拷贝",
        "{boolean} changeStore-是否修改目标树的数据集"],
        "tree.nodeCopyTo(node，tree,nodeId,copyParentNode,changeStore)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "设置节点复选框选中状态",
    name: "setNodeCheckById",
    Class: "",
    insert: "\n tree.setNodeCheckById(id,checkstate,cascading);",
    comment: getFormatComment("setNodeCheckById",
        "设置节点复选框选中状态",
        ["{String/Number} nodeId-目标节点的id",
        "{boolean} checkstate-节点选中状态",
        "{boolean} cascading-是否出发级联操作"],
        "tree.setNodeCheckById(id,checkstate)"),
    value: {},
    type: publicMethodsType.fun
}]);

//pageRoot/pageRoot_TreeNode----------------------------------------------------------------------------------------------------------------------
//添加到主分类-树节点操作-进度条
addFunc(pageRoot_TreeNode,[{
    text: "所有子节点",
    name: "childNodes",
    Class: "",
    insert: "\n var childNodes = node.childNodes;",
    comment: getFormatComment("childNodes",
        "获取该节点下的所有子节点",
        ["return Array 所有子节点的集合"],
        "var childNodes = node.childNodes;"),
    value: {},
    type: publicMethodsType.pro
},{
    text: "第一个子节点",
    name: "firstChild",
    Class: "",
    insert: "\n var firstChild = node.firstChild;",
    comment: getFormatComment("firstChild",
        "得到该节点的第一个直接子节点",
        ["return  该节点的第一个直接子节点"],
        "var firstChild = node.firstChild"),
    value: {},
    type: publicMethodsType.pro
},{
    text: "最后一个子节点",
    name: "lastChild",
    Class: "",
    insert: "\n var lastChild = node.lastChild;",
    comment: getFormatComment("lastChild",
        "得到该节点的最后一个直接子节点",
        ["return  该节点的最后一个直接子节点"],
        "var lastChild = node.lastChild"),
    value: {},
    type: publicMethodsType.pro
},{
    text: "下一个兄弟节点",
    name: "nextSibling",
    Class: "",
    insert: "\n var nextNode = node.nextSibling;",
    comment: getFormatComment("nextSibling",
        "树中紧跟此节点的下一个节点，如果没有兄弟节点，则为null",
        ["return 下一个兄弟节点 "],
        "var nextNode = node.nextSibling"),
    value: {},
    type: publicMethodsType.pro
},{
    text: "上一个兄弟节点",
    name: "previousSibling",
    Class: "",
    insert: "\n var preNode = node.previousSibling;",
    comment: getFormatComment("previousSibling",
        "树中紧跟此节点的上一个节点，如果没有兄弟节点，则为null",
        ["return 上一个兄弟节点 "],
        "var preNode = node.previousSibling"),
    value: {},
    type: publicMethodsType.pro
},{
    text: "父节点",
    name: "parentNode",
    Class: "",
    insert: "\n var parentNode = node.parentNode;",
    comment: getFormatComment("parentNode",
        "获取该节点的父节点",
        ["return 该节点的父节点 "],
        "var parentNode = node.parentNode"),
    value: {},
    type: publicMethodsType.pro
},{
    text: "隐藏节点",
    name: "hidden",
    Class: "",
    insert: "\n node.hidden=true;",
    comment: getFormatComment("hidden",
        "如果隐藏此节点，则为True",
        [],
        "node.hidden=true"),
    value: {},
    type: publicMethodsType.pro
},{
    text: "添加子节点",
    name: "appendChild",
    Class: "",
    insert: "\n node.appendChild(cNode);",
    comment: getFormatComment("appendChild",
        "移除制定id对应的节点",
        ["{Object/Array} cNode-将要添加的节点或者节点的集合"],
        "node.appendChild(cNode)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "闭合节点",
    name: "collapse",
    Class: "",
    insert: "\n node.collapse();",
    comment: getFormatComment("collapse",
        "闭合当前节点",
        ["{Boolean} deep-可选，为true则也闭合所有的子结点"],
        "node.collapse()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "闭合所有子节点",
    name: "collapseChildNodes",
    Class: "",
    insert: "\n node.collapseChildNodes();",
    comment: getFormatComment("collapseChildNodes",
        "闭合所有子节点",
        [ "{boolean} deep-可选，如果为true，子节点如果还有子节点也将被闭合"],
        "node.collapseChildNodes()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "遍历子节点",
    name: "eachChild",
    Class: "",
    insert: "\n node.eachChild(function(){});",
    comment: getFormatComment("nodeCopy",
        "整合此节点的子节点，使用每个节点调用指定的函数。函数的参数将是提供的args或当前节点。如果函数在任何时候返回false，则迭代停止",
        ["{Function } fn-要调用的函数",
        "{Object} scope-可选，函数作用域（默认为当前节点）",
        "{Array} args-可选，调用函数传入的参数，默认为遍历的子节点"],
        " node.eachChild(function(){})"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "展开节点",
    name: "expand",
    Class: "",
    insert: "\n node.expand();",
    comment: getFormatComment("expand",
        "展开当前节点",
        ["{Boolean} deep-可选，为true则也展开所有的子结点"],
        "node.expand()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "展开所有子节点",
    name: "expandChildNodes",
    Class: "",
    insert: "\n node.expandChildNodes();",
    comment: getFormatComment("expandChildNodes",
        "展开所有子节点",
        [ "{boolean} deep-可选，如果为true，子节点如果还有子节点也将被展开"],
        "node.expandChildNodes()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "查找子节点",
    name: "findChild",
    Class: "",
    insert: "\n var chNode = node.findChild('name','value');",
    comment: getFormatComment("findChild",
        "查找具有指定值属性的第一个子节点",
        [ "{String} name-属性名称",
        "{Mixed } value-属性名称对应的值",
        "return 符合条件的子节点"],
        "var chNode = node.findChild('name','value')"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "自定义查找子节点",
    name: "findChildBy",
    Class: "",
    insert: "\n var chNode = node.findChildBy(function(){});",
    comment: getFormatComment("findChildBy",
        "通过自定义的函数查找子节点，找到第一个合适的就返回。要求的条件是函数返回true",
        [ "{Function} fn-定义的函数",
        "{Object} scope-可选，函数的作用域",
        "return 符合条件的子节点"],
        "var chNode = node.findChildBy(function(){})"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "节点路径",
    name: "getPath",
    Class: "",
    insert: "\n var nodePath = node.getPath();",
    comment: getFormatComment("getPath",
        "返回该节点的路径，以方便控制这个节点展开或选择",
        [ "{String} attr -可选，路径采用的属性（默认为节点的id）",
        "return String 路径"],
        "var nodePath = node.getPath()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "是否有子节点",
    name: "hasChildNodes",
    Class: "",
    insert: "\n var hasChaild = node.hasChildNodes();",
    comment: getFormatComment("hasChaild",
        "如果有子节点返回true",
        ["return Boolean"],
        "var hasChaild = node.hasChildNodes()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "在某子节点之前插入节点",
    name: "insertBefore",
    Class: "",
    insert: "\n node.insertBefore(node1,node2);",
    comment: getFormatComment("insertBefore",
        "在某子节点之前插入节点",
        ["{Object} node1-要插入的节点",
        "{object} node2-插入到该节点之前"],
        "var  node.insertBefore(node1,node2)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "是否展开",
    name: "isExpanded",
    Class: "",
    insert: "\n var isExpanded = node.isExpanded();",
    comment: getFormatComment("isExpanded",
        "判断该节点是否为展开状态",
        ["return Boolean"],
        "var isExpanded = node.isExpanded()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "是否是叶子节点",
    name: "isLeaf",
    Class: "",
    insert: "\n var isLeaf = node.isLeaf();",
    comment: getFormatComment("isLeaf",
        "判断该节点是否叶子节点",
        ["return Boolean"],
        "var isLeaf = node.isLeaf()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "是否是首节点",
    name: "isFirst",
    Class: "",
    insert: "\n var isFirst = node.isFirst();",
    comment: getFormatComment("isFirst",
        "判断该节点是否是其父节点的第一个子节点",
        ["return Boolean"],
        "var isFirst = node.isFirst()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "是否是末节点",
    name: "isLast",
    Class: "",
    insert: "\n var isLast = node.isLast();",
    comment: getFormatComment("isFirst",
        "判断该节点是否是其父节点的最后一个子节点",
        ["return Boolean"],
        "var isLast = node.isLast()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "是否被选中",
    name: "isSelected",
    Class: "",
    insert: "\n var isSelected = node.isSelected();",
    comment: getFormatComment("isSelected",
        "判断该节点是否为选中状态",
        ["return Boolean"],
        "var isSelected = node.isSelected()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "移除该节点",
    name: "remove",
    Class: "",
    insert: "\n node.remove();",
    comment: getFormatComment("remove",
        "判断该节点是否为选中状态",
        ["return 该节点"],
        "node.remove()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "移除所有子节点",
    name: "removeAll",
    Class: "",
    insert: "\n node.removeAll();",
    comment: getFormatComment("removeAll",
        "判断该节点是否为选中状态",
        ["return 该节点"],
        "node.removeAll()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "移除指定子节点",
    name: "removeChild",
    Class: "",
    insert: "\n node.removeChild(cNode);",
    comment: getFormatComment("removeChild",
        "判断该节点是否为选中状态",
        ["{Object} cNode-要删除的子节点",
        "return 被删除的节点"],
        "node.removeChild(cNode)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "替换子节点",
    name: "replaceChild",
    Class: "",
    insert: "\n node.replaceChild(newNode,oldNode);",
    comment: getFormatComment("replaceChild",
        "替换子节点",
        ["{Object} newNode-新的子节点",
        "{Object} oldNode-将要被替换的节点",
        "return 被删除的节点"],
        "node.replaceChild(newNode,oldNode)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "设置节点文本",
    name: "setText",
    Class: "",
    insert: "\n node.setText('新的文本');",
    comment: getFormatComment("setText",
        "设置该节点的显示文本",
        ["{String} text-新的显示文本"],
        "node.setText('新的文本')"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "展开闭合状态切换",
    name: "toggle",
    Class: "",
    insert: "\n node.toggle();",
    comment: getFormatComment("toggle",
        "对该节点的闭合/展开状态进行切换",
        [],
        "node.toggle()"),
    value: {},
    type: publicMethodsType.fun
}]);


//pageRoot/pageRoot_Element----------------------------------------------------------------------------------------------------------------------
//添加到主分类-页面操作-元素操作

addFunc(pageRoot_Element,[{
    text: "获取元素",
    name: "getElement",
    Class: "getElement",
    insert: "\n // 通过id获取元素 \n"+
    "var el=vmd.getElement('my-element'); ",
    comment: getFormatComment("getElement",
        "通过id获取元素",
        ["{String} id-元素id","return  元素对象"],
        "var el=vmd.getElement('my-element');"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "添加class名",
    name: "addClass",
    Class: "",
    insert: "\n //给元素添加class名 \n"+
    "el.addClass('my-el'); ",
    comment: getFormatComment("addClass",
        "给元素添加class名",
        ["{String} className-要添加的class名","return  元素对象"],
        "var el=vmd.getElement('my-element');\n" +
        "el.addClass('my-el')"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "点击移除class名",
    name: "addClassOnClick",
    Class: "",
    insert: "\n //当鼠标在该元素单击时，设置事件处理器来移除css类\n"+
    "el.addClassOnClick('my-el'); ",
    comment: getFormatComment("addClassOnClick",
        "当鼠标在该元素单击时，设置事件处理器来移除css类",
        ["{String} className-要移除的class名","return  元素对象"],
        "var el=vmd.getElement('my-element');\n" +
        "el.addClassOnClick('my-el')"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "焦点class名",
    name: "addClassOnFocus",
    Class: "",
    insert: "\n //当元素得到焦点（focus）时作用的CSS样式类\n"+
    "el.addClassOnFocus('my-el'); ",
    comment: getFormatComment("addClassOnFocus",
        "当元素得到焦点（focus）时作用的CSS样式类",
        ["{String} className-要添加的class名","return  元素对象"],
        "var el=vmd.getElement('my-element');\n" +
        "el.addClassOnFocus('my-el')"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "鼠标移入class名",
    name: "addClassOnOver",
    Class: "",
    insert: "\n //当鼠标移入元素时作用的CSS样式类\n"+
    "el.addClassOnOver('my-el'); ",
    comment: getFormatComment("addClassOnOver",
        "当鼠标移入元素时作用的CSS样式类",
        ["{String} className-要添加的class名","return  元素对象"],
        "var el=vmd.getElement('my-element');\n" +
        "el.addClassOnOver('my-el')"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "事件处理函数",
    name: "addListener",
    Class: "",
    insert: "\n //加入一个事件处理函数。on是其简写方式\n"+
    "el.on('click',Fn,this,{\n" +
    "    delay: 100,\n" +
    "    stopEvent : true,\n" +
    "}); ",
    comment: getFormatComment("addListener",
        "加入一个事件处理函数。on是其简写方式",
        ["{String} eventName -事件处理函数的名称",
        "{Function} fn-事件处理函数，会传入以下参数 \n" +
        "evt : EventObject EventObject的事件对象 \n" +
        "t : Element 事件源对象 \n" +
        "o : Object 调用addListener时送入的选项对象 ",
        "{Object} scope-可选，事件处理函数执行时所在的作用域",
        "{Object} options-可选-包含配置属性的一个对象。该对象可能会下来的属性:\n" +
        "stopEvent {Boolean} : true表示为阻止事件。即停止传播、阻止默认动作 \n" +
        "preventDefault {Boolean} : true表示为阻止默认动作 \n" +
        "stopPropagation {Boolean} : true表示为阻止事件捕获、冒泡 \n" +
        "delay {Number} : 触发事件后处理函数延时执行的时间\n"],
        "var el=vmd.getElement('my-element');\n" +
        "function clFn(){\n" +
        "   alert('abc') \n" +
        "}\n" +
        "el.on('click',clFn,this,{\n" +
        "    delay: 100,\n" +
        "    stopEvent : true,\n" +
        "});"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "在元素上执行动画",
    name: "animate",
    Class: "",
    insert: "\n //在元素上执行动画\n"+
    "el.animate(args,[duration],[onComplete],easing,[animType]); ",
    comment: getFormatComment("animate",
        "在元素上执行动画",
        ["{Object} args-动画配置项参数",
        "{Float} duration-可选，动画持续多久（默认为 .35 秒）",
         "{Funtion} onComplete-可选，动画完成后调用的函数",
        "{String} easing-指定“收尾”的方法（默认为 'easeOut'）",
        "{String} animType-可选，默认为'run'，可以是'color'，'motion'，或'scroll'",
        "return  元素对象"],
        "var el=vmd.getElement('my-element');\n" +
        "el.animate(args,[duration],[onComplete],easing,[animType])"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "设置样式",
    name: "applyStyles",
    Class: "",
    insert: "\n //setStyle的另一个版本，更能灵活地设置样式属性\n"+
    "el.applyStyles({width:'100px'}); ",
    comment: getFormatComment("applyStyles",
        "setStyle的另一个版本，更能灵活地设置样式属性",
        ["{String/Object/Function } styles -表示样式的特定格式字符串，如“width:100px”，或是对象的形式如{width:\"100px\"}，或是能返回这些格式的函数",
        "return  元素对象"],
        "var el=vmd.getElement('my-element');\n" +
        "el.applyStyles({width:'100px'})"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取焦点",
    name: "focus",
    Class: "",
    insert: "\n //使这个元素获取焦点(focus). 捕获并忽略所有异常\n"+
    "el.focus(); ",
    comment: getFormatComment("focus",
        "使这个元素获取焦点(focus). 捕获并忽略所有异常.",
        ["return  元素对象"],
        "var el=vmd.getElement('my-element');\n" +
        "el.focus()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "失去焦点",
    name: "blur",
    Class: "",
    insert: "\n //使这个元素失去焦点。忽略任何已捕获的异常\n"+
    "el.blur(); ",
    comment: getFormatComment("blur",
        "使这个元素失去焦点。忽略任何已捕获的异常",
        ["return  元素对象"],
        "var el=vmd.getElement('my-element');\n" +
        "el.blur()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "元素居中",
    name: "center",
    Class: "",
    insert: "\n //在视图或其他元素中，居中元素\n"+
    "el.blur(); ",
    comment: getFormatComment("center",
        "将本元素置于 viewport 或者 另一个 Element 的中心. 当前元素的中心对齐到centerIn元素的中心",
        ["{String/HTMLElement/vmd.Element (optional)} centerIn-可选，相对居中的父元素",
        "return  元素对象"],
        "var el=vmd.getElement('my-element');\n" +
        "el.center()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "添加子元素",
    name: "appendChild",
    Class: "",
    insert: "\n //将传递进来的元素(列表)添加为当前元素的子元素\n"+
    "el.appendChild(el); ",
    comment: getFormatComment("appendChild",
        "将传递进来的元素(列表)添加为当前元素的子元素",
        ["{String/HTMLElement/vmd.Element} el-节点的id，一个DOM节点或现有元素",
            "return  元素对象"],
        "var el=vmd.getElement('my-element');\n" +
        "var fel = vmd.getElement('f-ele');\n" +
        "el.appendChild('fel')"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "添加到父节点",
    name: "appendTo",
    Class: "",
    insert: "\n //将当前元素添加到传递进来的元素之后\n"+
    "el.appendTo(el); ",
    comment: getFormatComment("appendTo",
        "将当前元素添加到传递进来的元素之后",
        ["{String/HTMLElement/vmd.Element} el-新的父节点，节点的id，一个DOM节点或现有元素",
        "return  元素对象"],
        "var el=vmd.getElement('my-element');\n" +
        "var fel = vmd.getElement('f-ele');\n" +
        "el.appendTo('fel')"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "对齐方式",
    name: "alignTo",
    Class: "",
    insert: "\n //通过指定的锚点将此元素与另一个元素对齐. 如果另一个元素是文档document本身,则对齐到 viewport\n"+
    "/* 所有支持的锚点位置" +
    "tl     左上角(top left corner) (默认值)\n" +
    "t      上边界(top edge)的中心\n" +
    "tr     右上角(top right)\n" +
    "l      左边界(left edge)的中心\n" +
    "c      元素的中心(center)\n" +
    "r      右边界(right edge)的中心\n" +
    "bl     左下角(bottom left)\n" +
    "b      下边界(bottom edge)的中心\n" +
    "br     左下角(bottom right)*/ \n" +
    "el.alignTo(\"other-el\",\"tr?\");",
    comment: getFormatComment("alignTo",
        "通过指定的锚点将此元素与另一个元素对齐. 如果另一个元素是文档document本身,则对齐到 viewport",
        ["{String/HTMLElement/vmd.Element} el-要对齐的元素",
        "{string} position-可选，要对齐的位置",
        "{Number/Object} offsets-可选，格式为 [x,y] 的位置偏移",
        "{Boolean} animate-可选，设置为 true 则使用默认动画(animation)",
        "return  元素对象"],
        "var el=vmd.getElement('my-element');\n" +
        "var fel = vmd.getElement('f-ele');\n" +
        "el.appendTo('fel')"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "根据css选择符选取子节点",
    name: "child",
    Class: "",
    insert: "\n //根据css选择符选取子节点\n"+
    "el.child('.my-el'); ",
    comment: getFormatComment("child",
        "传入一个CSS选择符的参数，然后基于该选择符，选取单个子节点",
        ["{String} selector -css选择符",
        "{Boolean} returnDom-可选，true表示为返回标准DOM类型的节点，false的话返回Ext.dom.Element类型的对象",
        "return  元素对象"],
        "var el=vmd.getElement('my-element');\n" +
        "el.child('.my-el')"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "清除空白节点",
    name: "clean",
    Class: "",
    insert: "\n //删除空的(Empty),或者全是空格填充的文本节点. 合并相邻的文本节点\n"+
    "el.clean(); ",
    comment: getFormatComment("clean",
        "删除空的(Empty),或者全是空格填充的文本节点. 合并相邻的文本节点",
        ["{Boolean} forceReclean -可选，默认情况下,如果元素被清空以后,将会记录下来. 因此调用多少次都没关系. 但如果更新了元素的内容,则可以指定为true来强制清理."],
        "var el=vmd.getElement('my-element');\n" +
        "el.clean()"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "创建子元素并插入",
    name: "createChild",
    Class: "",
    insert: "\n //创建传递进来的DomHelper配置，并将其添加到当前元素后面，或插入到所传入的子元素的前面\n"+
    "el.createChild({\n" +
    "    tag: 'ul',cls: 'my-list',children: [\n" +
    "        {tag: 'li',id: 'item0',html: 'List Item 0'},\n" +
    "        {tag: 'li',id: 'item1',html: 'List Item 1'},\n" +
    "        {tag: 'li',id: 'item2',html: 'List Item 2'},\n" +
    "        {tag: 'li',id: 'item3',html: 'List Item 3'},\n" +
    "        {tag: 'li',id: 'item4',html: 'List Item 4'}\n" +
    "    ]\n" +
    "});",
    comment: getFormatComment("createChild",
        "创建传递进来的DomHelper配置，并将其添加到当前元素后面，或者可以选择将 其插入到所传递的子元素的前面",
        ["{Object} DomHelper-元素配置对象。如果没有指定tag (例如.,{tag:'input'})， 那么将用指定的属性自动创建一个div",
         "{ HTMLElement (optional)} insertBefore-当前元素的一个子元素 ",
         "{Boolean} returnDom-设置为true将返回dom节点而不是创建一个 Element",
         "return  新的子元素"],
        "var el=vmd.getElement('my-element');\n" +
        "el.createChild({\n" +
        "    tag: 'ul',cls: 'my-list',children: [\n" +
        "        {tag: 'li',id: 'item0',html: 'List Item 0'},\n" +
        "        {tag: 'li',id: 'item1',html: 'List Item 1'},\n" +
        "        {tag: 'li',id: 'item2',html: 'List Item 2'},\n" +
        "        {tag: 'li',id: 'item3',html: 'List Item 3'},\n" +
        "        {tag: 'li',id: 'item4',html: 'List Item 4'}\n" +
        "    ]\n" +
        "});"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "淡入效果",
    name: "fadeIn",
    Class: "",
    insert: "\n //对元素显示淡入效果\n"+
    "el.fadeIn({ opacity: .75,duration: 2000});",
    comment: getFormatComment("fadeIn",
        "对元素显示淡入效果 (从 透明transparent 到 不透明opaque). 最终的透明度可以通过 opacity 配置项来指定",
        ["{Object} options -可选， 包含任意Fx配置选项的字面量对象.",
        "return  元素本身"],
        "var el=vmd.getElement('my-element');\n" +
        "el.fadeIn({ opacity: .75,duration: 2});"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "淡出效果",
    name: "fadeOut",
    Class: "",
    insert: "\n //对元素显示淡出效果\n"+
    "el.fadeOut({ opacity: .25,duration: 2000});",
    comment: getFormatComment("fadeOut",
        "对元素显示淡出效果 (从 不透明opaque 到 透明transparent). 最终的透明度可以通过 opacity 配置项来指定定",
        ["{Object} options -可选， 包含任意Fx配置选项的字面量对象.",
        "return  元素本身"],
        "var el=vmd.getElement('my-element');\n" +
        "el.fadeOut({ opacity: .25,duration: 2});"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "查找父节点",
    name: "findParent",
    Class: "",
    insert: "\n //向外围搜索外层的父节点，搜索条件必须符合并匹配传入的简易选择符(如 div.some-class 或 span:first-child)\n"+
    "el.findParent('div.className'); ",
    comment: getFormatComment("findParent",
        "向外围搜索外层的父节点，搜索条件必须符合并匹配传入的简易选择符(如 div.some-class 或 span:first-child)",
        ["{String} selector  -要进行测试的简易选择符.",
        "{Number/String} limit-搜索深度，可以为数字或元素，其导致向上遍历停止， 并不考虑纳入作为结果。(默认是 50) ",
        "{Boolean} returnEl-true表示为返回Ext.Element类型的对象，false的话返回标准DOM类型的节点",
        "return 匹配到的dom节点"],
        "var el=vmd.getElement('my-element');\n" +
        "el.findParent('div.className');"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "查找父父节点",
    name: "findParentNode",
    Class: "",
    insert: "\n //定位于此节点的\"父节点\"，以此节点的\"父节点\"为起点，向外围搜索外层的父父节点\n"+
    "el.findParentNode('div.className'); ",
    comment: getFormatComment("findParentNode",
        "定位于此节点的\"父节点\"，以此节点的\"父节点\"为起点，向外围搜索外层的父节点，搜索条件必须符合并匹配传入的简易选择符(简易选择符形如 div.some-class 或 span:first-child)",
        ["{String} selector  -要进行测试的简易选择符.",
        "{Number/String} limit-搜索深度，可以为数字或元素，其导致向上遍历停止， 并不考虑纳入作为结果。(默认是 50) ",
        "{Boolean} returnEl-true表示为返回Ext.Element类型的对象，false的话返回标准DOM类型的节点",
        "return 匹配到的dom节点"],
        "var el=vmd.getElement('my-element');\n" +
        "el.findParentNode('div.className');"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取第一个子元素",
    name: "first",
    Class: "",
    insert: "\n //获取第一个子元素，跳过文本节点\n"+
    "el.first(); ",
    comment: getFormatComment("first",
        "获取第一个子元素，跳过文本节点",
        ["{String} selector -可选，简易选择符来查找第一个子元素.",
        "{Boolean} returnEl-true表示为返回Ext.Element类型的对象，false的话返回标准DOM类型的节点",
        "return 匹配到的dom节点"],
        "var el=vmd.getElement('my-element');\n" +
        "el.first('div.className');"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取最后一个子元素",
    name: "last",
    Class: "",
    insert: "\n //获取最后一个子元素，跳过文本节点\n"+
    "el.last(); ",
    comment: getFormatComment("last",
        "获取最后一个子元素，跳过文本节点",
        ["{String} selector -可选，简易选择符来查找最后一个子元素.",
        "{Boolean} returnEl-true表示为返回Ext.Element类型的对象，false的话返回标准DOM类型的节点",
        "return 匹配到的dom节点"],
        "var el=vmd.getElement('my-element');\n" +
        "el.last('div.className');"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "底层节点的属性值",
    name: "getAttribute",
    Class: "",
    insert: "\n //返回元素的底层DOM节点的属性值\n"+
    "el.getAttribute('width'); ",
    comment: getFormatComment("getAttribute",
        "返回元素的底层DOM节点的属性值",
        ["{String} name -属性名",
        "{ String (optional)} namespace -可选，要查找属性所在的命名空间",
        "return {String} 属性值"],
        "var el =vmd.getElement('my-element');\n" +
        "var value = el.getAttribute('width');"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "顶部Y坐标",
    name: "getTop",
    Class: "",
    insert: "\n //获取元素的顶部Y坐标\n"+
    "el.getTop(); ",
    comment: getFormatComment("getTop",
        "获取元素的顶部Y坐标",
        ["{Boolean} local-true表示为获取局部CSS位置而非页面坐标",
            "return {Number} 坐标值"],
        "var el =vmd.getElement('my-element');\n" +
        "var top = el.getTop();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "底部Y坐标",
    name: "getBottom",
    Class: "",
    insert: "\n //获取元素的底部Y坐标(元素Y位置 + 元素高度)\n"+
    "el.getBottom(); ",
    comment: getFormatComment("getBottom",
        "获取元素的底部Y坐标(元素Y位置 + 元素宽度)",
        ["{Boolean} local-true表示为获取局部CSS位置而非页面坐标",
            "return {Number} 坐标值"],
        "var el =vmd.getElement('my-element');\n" +
        "var bottom = el.getBottom();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "左边X坐标",
    name: "getLeft",
    Class: "",
    insert: "\n //获取元素的底部X坐标\n"+
    "el.getLeft(); ",
    comment: getFormatComment("getLeft",
        "获取元素的底部X坐标",
        ["{Boolean} local-true表示为获取局部CSS位置而非页面坐标",
            "return {Number} 坐标值"],
        "var el =vmd.getElement('my-element');\n" +
        "var left = el.getLeft();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "右边X坐标",
    name: "getRight",
    Class: "",
    insert: "\n //获取元素的右边X坐标(元素X位置 + 元素宽度)\n"+
    "el.getRight(); ",
    comment: getFormatComment("getRight",
        "获取元素的右边X坐标(元素X位置 + 元素宽度)",
        ["{Boolean} local-true表示为获取局部CSS位置而非页面坐标",
            "return {Number} 坐标值"],
        "var el =vmd.getElement('my-element');\n" +
        "var right = el.getRight();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "居中坐标值",
    name: "getCenterXY",
    Class: "",
    insert: "\n //计算当前元素要居中对齐时的横纵坐标值\n"+
    "el.getCenterXY(); ",
    comment: getFormatComment("getCenterXY",
        "计算当前元素要居中对齐时的横纵坐标值",
        ["return {Number} 坐标值"],
        "var el =vmd.getElement('my-element');\n" +
        "var n = el.getCenterXY();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "可见高度",
    name: "getComputedHeight",
    Class: "",
    insert: "\n //返回offsetHeight,如果offsets不可用,则根据 CSS height 以及padding 或 borders来模拟此元素的高度\n"+
    "el.getComputedHeight(); ",
    comment: getFormatComment("getComputedHeight",
        "返回 offsetHeight,如果offsets不可用,则根据 CSS height 以及padding 或 borders来模拟此元素的高度",
        ["return {Number} 可见高度"],
        "var el =vmd.getElement('my-element');\n" +
        "var n = el.getComputedHeight();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "可见宽度",
    name: "getComputedWidth",
    Class: "",
    insert: "\n //返回offsetWidth,如果offsets不可用,则根据 CSS width 以及padding 或 borders来模拟此元素的宽度\n"+
    "el.getComputedWidth(); ",
    comment: getFormatComment("getComputedWidth",
        "返回 offsetWidth,如果offsets不可用,则根据 CSS width 以及padding 或 borders来模拟此元素的宽度",
        ["return {Number} 可见宽度"],
        "var el =vmd.getElement('my-element');\n" +
        "var n = el.getComputedWidth();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "高度",
    name: "getHeight",
    Class: "",
    insert: "\n //返回元素的高度偏移量\n"+
    "el.getHeight(); ",
    comment: getFormatComment("getHeight",
        "返回元素的高度偏移量",
        ["return {Number} 高度"],
        "var el =vmd.getElement('my-element');\n" +
        "var n = el.getHeight();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "宽度",
    name: "getWidth",
    Class: "",
    insert: "\n //返回元素宽度偏移量\n"+
    "el.getWidth(); ",
    comment: getFormatComment("getWidth",
        "返回元素宽度偏移量",
        ["return {Number} 宽度"],
        "var el =vmd.getElement('my-element');\n" +
        "var n = el.getWidth();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "相对偏移量",
    name: "getOffsetsTo",
    Class: "",
    insert: "\n //返回此元素到给定的el元素之间的偏移量\n"+
    "el.getOffsetsTo('my-div'); ",
    comment: getFormatComment("getOffsetsTo",
        "返回此元素到给定的el元素之间的偏移量. 两个元素都必须在DOM树中,不能有 display:none 这个属性",
        ["{String/HTMLElement/Ext.Element} element-指定的元素",
        "return {Array} 数字数组[x,y]"],
        "var el =vmd.getElement('my-element');\n" +
        "var xy = el.getOffsetsTo('my-div');"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "元素位置信息",
    name: "getPositioning",
    Class: "",
    insert: "\n //得到当前元素的位置信息,返回包含所有CSS位置属性的对象\n"+
    "el.getPositioning(); ",
    comment: getFormatComment("getPositioning",
        "得到当前元素的位置信息,返回包含所有CSS位置属性的对象",
        ["return {String} 元素的innerHTML"],
        "var el =vmd.getElement('my-element');\n" +
        "var pos = el.getPositioning();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "元素滚动位置",
    name: "getScroll",
    Class: "",
    insert: "\n //返回元素当前的滚动位置\n"+
    "el.getScroll(); ",
    comment: getFormatComment("getPositioning",
        "返回元素当前的滚动位置",
        ["return {Object} 返回一个保存滚动位置信息的对象"],
        "var el =vmd.getElement('my-element');\n" +
        "var pos = el.getScroll();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取样式属性值",
    name: "getStyle",
    Class: "",
    insert: "\n //返回一个指定样式属性值\n"+
    "el.getStyle('width'); ",
    comment: getFormatComment("getStyle",
        "返回此元素到给定的el元素之间的偏移量. 两个元素都必须在DOM树中,不能有 display:none 这个属性",
        ["{String/Array} property -样式属性(或数组中的多个属性名称)",
        "{Boolean} inline-如果设置为 true 则只返回内联样式 ",
        "return {String/Array} 属性值"],
        "var el =vmd.getElement('my-element');\n" +
        "var style = el.getStyle('width');"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "元素基于页面的坐标值",
    name: "getXY",
    Class: "",
    insert: "\n //基于页面坐标,取得元素的当前位置.即取得绝对坐标\n"+
    "el.getXY(); ",
    comment: getFormatComment("getXY",
        "基于页面坐标,取得元素的当前位置.即取得绝对坐标",
        ["return {Array} 数字数组[x,y]"],
        "var el =vmd.getElement('my-element');\n" +
        "var xy = el.getXY();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "元素基于页面的X坐标",
    name: "getX",
    Class: "",
    insert: "\n //基于页面坐标,取得元素的当前位置.即取得绝对X坐标\n"+
    "el.getX(); ",
    comment: getFormatComment("getX",
        "基于页面坐标,取得元素的当前位置.即取得绝对X坐标",
        ["return {Number} 数字"],
        "var el =vmd.getElement('my-element');\n" +
        "var x = el.getX();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "元素基于页面的Y坐标",
    name: "getY",
    Class: "",
    insert: "\n //基于页面坐标,取得元素的当前位置.即取得绝对Y坐标\n"+
    "el.getY(); ",
    comment: getFormatComment("getY",
        "基于页面坐标,取得元素的当前位置.即取得绝对Y坐标",
        ["return {Number} 数字"],
        "var el =vmd.getElement('my-element');\n" +
        "var y = el.getY();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "是否具有class名",
    name: "hasClass",
    Class: "",
    insert: "\n //基于页面坐标,取得元素的当前位置.即取得绝对Y坐标\n"+
    "var isHas = el.hasClass('active'); ",
    comment: getFormatComment("hasClass",
        "基于页面坐标,取得元素的当前位置.即取得绝对Y坐标",
        ["{String} className-要判断的class名",
        "return {Boolean} "],
        "var el =vmd.getElement('my-element');\n" +
        "var isHas = el.hasClass('active');"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "隐藏元素",
        name: "hide",
        Class: "",
        insert: "el.hide(); ",
    comment: getFormatComment("hide",
        "隐藏此元素",
        ["{Boolean} animate -设置为 true 则使用默认动画(animation)",
        "return 元素本身"],
        "var el =vmd.getElement('my-element');\n" +
        "el.hide();"),
        value: {},
    type: publicMethodsType.fun
},{
    text: "hover事件",
    name: "hover",
    Class: "",
    insert: "el.hover(function(){},function(){}); ",
    comment: getFormatComment("hover",
        "设置当鼠标移入和移出元素时的事件处理器",
        ["{Function} overFn-鼠标指针进入元素时的回调函数",
        "{Function} outFn -鼠标指针进出元素时的回调函数",
        "return 元素本身"],
        "var el =vmd.getElement('my-element');\n" +
        "el.hover();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "插入元素的第一个子节点",
    name: "insertFirst",
    Class: "",
    insert: "\n //插入（或创建）一个元素或者一个DomHelper配置），作为当前元素的第一个子节点\n"+
    "el.insertFirst({\n" +
    "    tag: 'ul',cls: 'my-list',children: [\n" +
    "        {tag: 'li',id: 'item0',html: 'List Item 0'},\n" +
    "        {tag: 'li',id: 'item1',html: 'List Item 1'},\n" +
    "        {tag: 'li',id: 'item2',html: 'List Item 2'},\n" +
    "        {tag: 'li',id: 'item3',html: 'List Item 3'},\n" +
    "        {tag: 'li',id: 'item4',html: 'List Item 4'}\n" +
    "    ]\n" +
    "});",
    comment: getFormatComment("insertFirst",
        "插入（或创建）一个元素或者一个DomHelper配置），作为当前元素的第一个子节点",
        ["{ HTMLElement (optional)} el-id或要插入的元素或一个 DomHelper 配置项来创建和插入 ",
        "return  新的子元素"],
        "var el=vmd.getElement('my-element');\n" +
        "el.insertFirst({\n" +
        "    tag: 'ul',cls: 'my-list',children: [\n" +
        "        {tag: 'li',id: 'item0',html: 'List Item 0'},\n" +
        "        {tag: 'li',id: 'item1',html: 'List Item 1'},\n" +
        "        {tag: 'li',id: 'item2',html: 'List Item 2'},\n" +
        "        {tag: 'li',id: 'item3',html: 'List Item 3'},\n" +
        "        {tag: 'li',id: 'item4',html: 'List Item 4'}\n" +
        "    ]\n" +
        "});"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "插入html",
    name: "insertHtml",
    Class: "",
    insert: "\n //插入HTML片断到当前元素\n"+
    "el.insertHtml('beforeBegin','<div>123456</div>');",
    comment: getFormatComment("insertHtml",
        "插入HTM到当前元素",
        ["{String} where -插入html的位置，与当前元素的位置关系 - beforeBegin,afterBegin,beforeEnd,afterEnd",
        "{ HTMLElement (optional)} html-插入的html片段",
        "return  被插入之前的元素"],
        "var el=vmd.getElement('my-element');\n" +
        "el.insertHtml('beforeBegin','<div>123456</div>');"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "样式值判断",
    name: "isStyle",
    Class: "",
    insert: "\n //检查一种样式的当前值是否等于给定的值\n"+
    "var isW = el.isStyle('width','100px');",
    comment: getFormatComment("isStyle",
        "检查一种样式的当前值是否等于给定的值",
        ["{String} styly -样式属性",
        "{String} value -要检查的值",
        "return {Boolean}"],
        "var el=vmd.getElement('my-element');\n" +
        "var isW = el.isStyle('width','100px');"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "添加遮罩层",
    name: "mask",
    Class: "",
    insert: "\n //在此元素上放置遮罩层,以阻止用户操作\n"+
    "el.mask('加载中，请稍等');",
    comment: getFormatComment("mask",
        "在此元素上放置遮罩层,以阻止用户操作. 需要 core.css 支持. 此方法只可以在接受子节点的元素对象上使用.",
        ["{String} msg -显示在遮罩层上的提示信息",
        "{String} msgCls -可选，应用到 msg 元素的css class",
        "return 遮罩层元素"],
        "var el=vmd.getElement('my-element');\n" +
        "el.mask('加载中，请稍等');"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取下一节点",
    name: "next",
    Class: "",
    insert: "\n //获取下一个侧边节点，跳过文本节点\n"+
    "var nextNode = el.next();",
    comment: getFormatComment("mask",
        "获取下一个侧边节点，跳过文本节点",
        ["{String} selector-可选，过简易选择符来查找下一个侧边节点",
        "{Boolean} returnDom-可选，true表示为返回原始过的DOM元素，而非Ext.Element类型的元素",
        "return 下一节点"],
        "var el=vmd.getElement('my-element');\n" +
        "var nextNode= el.next();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取父节点",
    name: "parent",
    Class: "",
    insert: "\n //返回当前节点的那个父节点，可选地可送入一个期待的选择符\n"+
    "var pNode = el.parent();",
    comment: getFormatComment("parent",
        "返回当前节点的那个父节点，可选地可送入一个期待的选择符",
        ["{String} selector-可选，过简易选择符来查找下一个侧边节点",
        "{Boolean} returnDom-可选，true表示为返回原始过的DOM元素，而非Ext.Element类型的元素",
        "return  父节点"],
        "var el=vmd.getElement('my-element');\n" +
        "var pNode = el.parent();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取上一节点",
    name: "prev",
    Class: "",
    insert: "\n //获取上一个侧边节点，跳过文本节点\n"+
    "var prevNode = el.prev();",
    comment: getFormatComment("prev",
        "获取上一个侧边节点，跳过文本节点",
        ["{String} selector-可选，过简易选择符来查找下一个侧边节点",
            "{Boolean} returnDom-可选，true表示为返回原始过的DOM元素，而非Ext.Element类型的元素",
            "return  父节点"],
        "var el=vmd.getElement('my-element');\n" +
        "var prevNode = el.prev();"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取类子节点",
    name: "query",
    Class: "",
    insert: "\n //传入一个CSS选择符的参数，然后基于该选择符选取其子节点\n"+
    "var nodes = el.query('.active');",
    comment: getFormatComment("query",
        "传入一个CSS选择符的参数，然后基于该选择符选取其子节点(因为id的元素唯一的，所以选择符不应是id的选择符)。",
        ["{String} selector-css选择符",
        "return  子节点数组"],
        "var el=vmd.getElement('my-element');\n" +
        "var nodes = el.query('.active');"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "删除节点",
    name: "remove",
    Class: "",
    insert: "el.remove();",
    comment: getFormatComment("remove",
        "删除此元素的dom引用",
        [],
        "var el=vmd.getElement('my-element');\n" +
        "el.remove();"),
    value: {},
    type: publicMethodsType.fun
    },{
    text: "删除class",
    name: "removeClass",
    Class: "",
    insert: "\n // 从元素中删除一个或多个CSS类 \n" +
    "el.removeClass(['my-div','active']);",
    comment: getFormatComment("removeClass",
        "从元素中删除一个或多个CSS类",
        ['{String/Number} className -将被删除的用空格隔开的 CSS 类，或一个类的数组'],
        "var el=vmd.getElement('my-element');\n" +
        "el.removeClass(['my-div','active'])"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "替换class",
    name: "replaceClass",
    Class: "",
    insert: "\n // 用另一个 CSS 类替换一个元素上的 CSS类。如果旧的名称不存在，新的名称将被直接添加 \n" +
    "el.replaceClass('my-div','active');",
    comment: getFormatComment("replaceClass",
        "用另一个 CSS 类替换一个元素上的 CSS类。如果旧的名称不存在，新的名称将被直接添加。",
        ['{String} oldClassName-将要被替换的class名',
        '{String} newClassName-新的的class名'],
        "var el=vmd.getElement('my-element');\n" +
        "el.replaceClass('my-div','active')"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "设置属性",
    name: "setStyle",
    Class: "",
    insert: "\n // 将传递进来的属性设置为当前元素的属性(可以是一个字符串或者一个对象) \n" +
    "el.setStyle('width','100px');",
    comment: getFormatComment("setStyle",
        "将传递进来的属性设置为当前元素的属性(样式属性可以是一个字符串、一个对象或者一个函数)",
        ['{String/Object} style-传入的属性',
        'return 当前元素'],
        "var el=vmd.getElement('my-element');\n" +
        "el.setStyle('width','100px')"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "切换class",
    name: "toggleClass",
    Class: "",
    insert: "\n // 切换此元素上指定的 CSS 类(如果它已经存在则移除，否则添加)\n" +
    "el.toggleClass('active');",
    comment: getFormatComment("toggleClass",
        "切换此元素上指定的 CSS 类(如果它已经存在则移除，否则添加)",
        ['{String} className -要切换的 CSS 类',
        'return 当前元素'],
        "var el=vmd.getElement('my-element');\n" +
        "el.toggleClass('active');"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "添加class名移除兄弟节点的同名class",
    name: "radioClass",
    Class: "",
    insert: "\n //添加一个或多个className到这个元素，并移除其所有兄弟节点上的同名样式\n" +
    "el.radioClass('active');",
    comment: getFormatComment("radioClass",
        " 添加一个或多个className到这个元素，并移除其所有兄弟节点上的同名样式",
        ['{String/Array} className -要添加的class名或者class名的数组',
		'return 当前元素'],
        "var el=vmd.getElement('my-element');\n" +
        "el.radioClass('active');"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "元素判断",
    name: "is",
    Class: "",
    insert: "\n //如果这个元素符合传入的简易选择符的条件就返回true\n" +
    "var isFs = el.is('span:first-child');",
    comment: getFormatComment("is",
        "如果这个元素符合传入的简易选择符的条件就返回true，简易选择符形如div.some-class或span:first-child",
        ['{String} selector-要进行测试的简易选择符',
		'return {Boolean}'],
        "var el=vmd.getElement('my-element');\n" +
        "var isFs = el.is('span:first-child');"),
    value: {},
    type: publicMethodsType.fun
}]);


//pageRoot/pageRoot_Dom----------------------------------------------------------------------------------------------------------------------
//添加到主分类-页面操作-dom操作
addFunc(pageRoot_Dom,[{
    text: "追加dom元素",
    name: "append",
    Class: "append",
    insert: "\n // 创建新的dom元素并加入到el中\n" +
    "vmd.DomHelper.append('my-div',{\n" +
    "    tag: 'ul',cls: 'my-list',children: [\n" +
    "        {tag: 'li',id: 'item0',html: 'List Item 0'},\n" +
    "        {tag: 'li',id: 'item1',html: 'List Item 1'},\n" +
    "        {tag: 'li',id: 'item2',html: 'List Item 2'},\n" +
    "        {tag: 'li',id: 'item3',html: 'List Item 3'},\n" +
    "        {tag: 'li',id: 'item4',html: 'List Item 4'}\n" +
    "    ]\n" +
    "});",
    comment: getFormatComment("append",
        "创建新的dom元素并加入到el中",
        ["{String/HTMLElement/Element} el-元素内容",
        "{Obejct/String} obj-指定的Dom对象或原始的html部分",
        "return {HTMLElement} 新节点"],
        "var dh=vmd.DomHelper;\n" +
        "var list = dh.append('my-div',{\n" +
        "    tag: 'ul',cls: 'my-list',children: [\n" +
        "        {tag: 'li',id: 'item0',html: 'List Item 0'},\n" +
        "        {tag: 'li',id: 'item1',html: 'List Item 1'},\n" +
        "        {tag: 'li',id: 'item2',html: 'List Item 2'},\n" +
        "        {tag: 'li',id: 'item3',html: 'List Item 3'},\n" +
        "        {tag: 'li',id: 'item4',html: 'List Item 4'}\n" +
        "    ]\n" +
        "});"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "设置样式",
    name: "applyStyles",
    Class: "applyStyles",
    insert: "\n // 把指定的样式应用到元素 \n"+
        "vmd.DomHelper.applyStyles('my-div',{width:\"100px\"});",
    comment: getFormatComment("applyStyles",
        "把指定的样式应用到元素",
        ["{String/HTMLElement} el-样式所应用的元素",
        "{String/Object/Function } styles-表示样式的特定格式字符串，如“width:100px”，或是对象的形式如{width:\"100px\"}，或是能返回这些格式的函数"],
        "vmd.DomHelper.applyStyles('my-div',{width:\"100px\"});"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "创建模版",
    name: "createTemplate",
    Class: "createTemplate",
    insert: "\n // 根据指定的Dom对象创建新的模版对象 \n"+
        "vmd.DomHelper.createTemplate(obj);",
    comment: getFormatComment("createTemplate",
        "根据指定的Dom对象创建新的模版对象",
        ["{Object} obj-指定的dom对象",
        "return {Object} 新模版"],
        "// 创建节点\n" +
        "var dh=vmd.DomHelper;\n" +
        "var list = dh.append('my-div',{tag: 'ul',cls: 'my-list'});\n" +
        "// 创建模版并追加到指定列表\n" +
        "var tpl = dh.createTemplate({tag: 'li',id: 'item{0}',html: 'List Item {0}'});\n" +
        "\n" +
        "for(var i = 0; i < 5;i++){\n" +
        "    tpl.append(list,[i]); // use template to append to the actual node\n" +
        "}"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "追加元素",
    name: "insertAfter",
    Class: "insertAfter",
    insert: "\n // 在指定元素后插入元素 \n"+
        "vmd.DomHelper.insertAfter('my-div',{tag: 'ul',cls: 'my-list'});",
    comment: getFormatComment("insertAfter",
        "在指定元素后插入元素",
        ["{String/HTMLElement/Element} el-元素内容",
        "{Object/String} obj-指定的dom对象",
        "return {HTMLElement} 新节点"],
        "vmd.DomHelper.insertAfter('my-div',{tag: 'ul',cls: 'my-list'})"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "前插入元素",
    name: "insertFirst",
    Class: "insertFirst",
    insert: "\n // 在指定元素前插入元素 \n"+
        "vmd.DomHelper.insertFirst('my-div',{tag: 'ul',cls: 'my-list'});",
    comment: getFormatComment("insertFirst",
        "在指定元素前插入元素",
        ["{String/HTMLElement/Element} el-元素内容",
        "{Object/String} obj-指定的dom对象",
        "return {HTMLElement} 新节点"],
        "vmd.DomHelper.insertFirst('my-div',{tag: 'ul',cls: 'my-list'})"),
    value: {},
    type: publicMethodsType.fun
}
//,{
//     text: "插入Html",
//     name: "insertHtml",
//     Class: "insertHtml",
//     insert: "\n // 插入html到dom元素 \n"+
//         "vmd.DomHelper.insertHtml('beforeBegin','my-div','<span>hello</span>');",
//     comment: getFormatComment("insertHtml",
//         "插入html到dom元素 ",
//         ["{String} where-插入的HTML要放到元素的位置-beforeBegin,afterBegin,beforeEnd,afterEnd",
//         "{THMLElement} el-元素",
//         "{String} html-要插入的html",
//         "return {HTMLElement} 新节点"],
//         "vmd.DomHelper.insertHtml('beforeBegin','my-div','<span>hello</span>')"),
//     value: {},
//     type: publicMethodsType.fun
// }
,{
    text: "覆盖元素",
    name: "overwrite",
    Class: "overwrite",
    insert: "\n // 创建新的dom元素并覆盖el的内容 \n"+
        "vmd.DomHelper.overwrite('my-div',{tag: 'ul',cls: 'my-list'});",
    comment: getFormatComment("overwrite",
        "创建新的dom元素并覆盖el的内容 ",
        ["{String/HTMLElement/Element} el-元素",
        "{Object/String} obj-新的元素内容",
        "return {HTMLElement} 新节点"],
        "vmd.DomHelper.overwrite('my-div',{tag: 'ul',cls: 'my-list'})"),
    value: {},
    type: publicMethodsType.fun
}]);



// 消息中心
addFunc(messageCenterRoot,[
	{
	text: "get请求",
	name: "getMsg",
	Class: "getMsg",
	insert: "\n hwMSC.getMsg('topic_query?con=10&page=1&appId=5263', function(result) {}, function(mas) {})",
	comment: getFormatComment("getMsg",
		"get请求方法",
		["{String} func-要执行的方法路径",
		"{Function} successback-成功回调",
		"{Function} successback-失败回调",
		],
		"hwMSC.getMsg('topic_query?con=10&page=1&appId=5263', function(result) {}, function(mas) {})"),
	value: {},
	type: publicMethodsType.fun
},
	{
    text: "post请求",
    name: "postMsg",
    Class: "postMsg",
    insert: "\n hwMSC.postMsg('topic_query?con=10&page=1&appId=5263',{\n" +
    "        appName: \"12\",\n" +
    "        unit: \"34\",\n" +
    "        contact: \"23\",\n" +
    "        phone: \"23\",\n" +
    "        appNote: \"345\"\n" +
    "    },\n" +
    "    function(result) {},\n" +
    "    function(mgs) {})",
    comment: getFormatComment("postMsg",
        "post请求方法",
        ["{String} func-要执行的方法路径",
		"{Object} args-方法需要的参数，对象格式",
		"{Function} successback-成功回调",
		"{Function} successback-失败回调",
        ],
        "hwMSC.postMsg('topic_query?con=10&page=1&appId=5263',{\n" +
        "        appName: \"12\",\n" +
        "        unit: \"34\",\n" +
        "        contact: \"23\",\n" +
        "        phone: \"23\",\n" +
        "        appNote: \"345\"\n" +
        "    },\n" +
        "    function(result) {},\n" +
        "    function(mgs) {})"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "初始化MQTT连接对象",
    name: "MQTTInitHost",
    Class: "MQTTInitHost",
    insert: "\n hwMSC.MQTTInitHost(clientId,ip,qtt_port)",
    comment: getFormatComment("MQTTInitHost",
        "初始化MQTT连接对象",
        ["{string/number} clientId-用户终端ID",
		"{String} ip-连接地址",
		"{number} qtt_port-端口号",
		"{object} client 返回MQTT连接对象"
        ],
        "hwMSC.MQTTInitHost('4562','http//:192.168.1.123','8000')"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "MQTT客户端初始化",
    name: "MQTTInit",
    Class: "MQTTInit",
    insert: "\n hwMSC.MQTTInit(clientId)",
    comment: getFormatComment("MQTTInit",
        "MQTT客户端初始化",
        ["{string/number} clientId-用户终端ID",
		"{object} hwMqttClient 返回消息对象"
        ],
        "hwMSC.MQTTInit('4562')"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "MQTT客户端连接",
    name: "MQTTConnect",
    Class: "MQTTConnect",
    insert: "\n hwMSC.MQTTConnect(hwMqttClient,timeout,keepAliveInterval,onConnect,onFailure,onMessageArrived,nConnectionLost)",
    comment: getFormatComment("MQTTConnect",
        "MQTT客户端连接",
        ["{Object} hwMqttClient-hwMSC.MQTTInit初始化的hwMqttClient",
		"{number} timeout-连接超时时间 默认为30秒",
		"{number} keepAliveInterval-心跳连接时间 默认为60秒  这里默认设置为10",
		"{function} onConnect-连接成功回调",
		"{function} onFailure-连接失败回调",
		"{function} onMessageArrived-接收消息回调",
		"{function} nConnectionLost-连接断开回调"
        ],
        "hwMSC.MQTTConnect(hwMqttClient,'40','20',\n function(){},\n function(){},\n function(){},\n function(){}"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "MQTT客户端连接断开",
    name: "MQTTDisconnect",
    Class: "MQTTDisconnect",
    insert: "\n hwMSC.MQTTDisconnect(hwMqttClient)",
    comment: getFormatComment("MQTTDisconnect",
        "MQTT客户端连接断开",
        ["{object} hwMqttClient-hwMSC.MQTTInit初始化的hwMqttClient"],
        "hwMSC.MQTTDisconnect(hwMqttClient)"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "MQTT订阅主题",
    name: "MQTTSubscribe",
    Class: "MQTTSubscribe",
    insert: "\n hwMSC.MQTTSubscribe(hwMqttClient,topicId,qos,onSubSuccess,onSubError)",
    comment: getFormatComment("MQTTSubscribe",
        "MQTT订阅主题",
        ["{object} hwMqttClient-hwMSC.MQTTInit初始化的hwMqttClient",
		"{String} topicName-订阅主题ID  --不可为空",
		"{number} qos-消息发送等级   不传设置为2  通常采用 2 \n" +
	" 		0 --  发送者只发送一次消息，不进行重试\n" +
        "      1--   发送者最少发送一次消息，确保消息到达Broker，Broker需要返回确认消息PUBACK\n" +
        "      2--   使用两阶段确认来保证消息的不丢失和不重复。",
		"{Function} onSubSuccess-订阅成功回调",
		"{Function} onSubSuccess-订阅失败回调"
        ],
        "hwMSC.MQTTSubscribe(hwMqttClient,'4144','2',\n function(result){},\n function(mgs){})"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "MQTT取消订阅主题",
    name: "MQTTUnSubscribe",
    Class: "MQTTUnSubscribe",
    insert: "\n hwMSC.MQTTUnSubscribe(clientId,subscriberName,function(result){},function(mgs){})",
    comment: getFormatComment("MQTTUnSubscribe",
        "MQTT取消订阅主题",
        ["{object} hwMqttClient-hwMSC.MQTTInit初始化的hwMqttClient",
            "{String} topicId -要取消的主题",
            "{Function} unSubSuccess-成功回调",
            "{Function} unSubError-失败回调",
        ],
        "hwMSC.cancelSub('4562','user',\n function(result){},\n function(mgs){})"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "消息发送",
    name: "MQTTSendMsg",
    Class: "MQTTSendMsg",
    insert: "\n hwMSC.MQTTSendMsg(hwMqttClient,topicId,msgStr)",
    comment: getFormatComment("MQTTSendMsg",
        "消息发送",
        ["{Object} hwMqttClient-hwMSC.MQTTInit初始化的hwMqttClient  --不可为空",
		"{String} topicId -订阅主题ID  发送的主题--不可为空",
		"{String} msgStr-要发送的消息  字符串"
        ],
        "hwMSC.MQTTSendMsg(hwMqttClient,'3643','发送的新消息')"),
    value: {},
    type: publicMethodsType.fun
},
	{
    text: "订阅主题",
    name: "subTopic",
    Class: "subTopic",
    insert: "\n hwMSC.subTopic(clientId,subscriberName,topicName,selector,function(result){},function(mgs){})",
    comment: getFormatComment("subTopic",
        "订阅主题",
        ["{String} clientId-客户端id",
		"{String} subscriberName-订阅者名称",
		"{String} topicName-订阅主题名称",
		"{Function} selector-选择器，用来过滤消息,可传空值",
		"{Function} successback-成功回调",
		"{Function} successback-失败回调",
        ],
        "hwMSC.subTopic('4562','user','新主题','',\n function(result){},\n function(mgs){})"),
    value: {},
    type: publicMethodsType.fun
},
	{
    text: "取消订阅主题",
    name: "cancelSub",
    Class: "cancelSub",
    insert: "\n hwMSC.cancelSub(clientId,subscriberName,function(result){},function(mgs){})",
    comment: getFormatComment("cancelSub",
        "取消订阅主题",
        ["{String} clientId-客户端id",
		"{String} subscriberName-订阅者名称",
		"{Function} successback-成功回调",
		"{Function} successback-失败回调",
        ],
        "hwMSC.cancelSub('4562','user',\n function(result){},\n function(mgs){})"),
    value: {},
    type: publicMethodsType.fun
},
	{
    text: "主题详情查看",
    name: "getTopicInfo",
    Class: "getTopicInfo",
    insert: "\n hwMSC.getTopicInfo(topicId,function(result){},function(mgs){})",
    comment: getFormatComment("getTopicInfo",
        "主题详情查看",
        ["{String} topicId-主题id",
            "{Function} successback-成功回调",
            "{Function} successback-失败回调",
        ],
        "hwMSC.getTopicInfo('51156654',\n function(result){},\n" +
		"function(mgs){})"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取待办",
    name: "taskTodoGet",
    Class: "taskTodoGet",
    insert: "\n hwMSC.taskTodoGet(user,userSentry,page,pageSize,successback,errorback)",
    comment: getFormatComment("taskTodoGet",
        "获取待办",
        ["{String} user-当前用户",
		"{String} userSentry-当前用户岗位",
		"{int} page-第几页",
		"{int} pageSize-每页条数",
            "{Function} successback-成功回调",
            "{Function} errorback-失败回调",
        ],
        "hwMSC.taskTodoGet('','',1,0, function(result){},\n" +
		"function(mgs){})"),
    value: {},
    type: publicMethodsType.fun
},{
    text: "获取已办",
    name: "taskDoGet",
    Class: "taskDoGet",
    insert: "\n hwMSC.taskDoGet(user,page,pageSize,successback,errorback)",
    comment: getFormatComment("taskDoGet",
        "获取待办",
        ["{String} user-当前用户",
		"{int} page-第几页",
		"{int} pageSize-每页条数",
            "{Function} successback-成功回调",
            "{Function} errorback-失败回调",
        ],
        "hwMSC.taskDoGet('',1,0, function(result){},\n" +
		"function(mgs){})"),
    value: {},
    type: publicMethodsType.fun
}
])



























//authRoot  认证中心
addFunc(authRoot, [{
	text: "登录认证",
	name: "login",
	Class: "login",
	insert: "\n //根据用户名密码登录 \n" + "hwAuth.login(host,'admin','123456',function(res){},function(res){})",
	comment: getFormatComment("login", "登录认证", ["{String} host-认证服务地址",
			"{String} login-登录名",
			"{String} password-密码",
			"{Function} callback-成功回调函数",
			"{Function} callback-失败回调函数",
			"return {void}"
		],
		"hwAuth.login(host,'admin','123456',function(res){},function(res){})"),
	value: {},
	type: publicMethodsType.fun
},{
	text: "获取token",
	name: "token",
	Class: "token",
	insert: "\n //根据用户名密码登录 \n" + "hwAuth.token(host,'','','',function(res){},function(res){})",
	comment: getFormatComment("token", "获取token", ["{String} host-认证服务地址",
			"{String} appid-应用id,默认为空",
			"{String} appkey-应用key,默认为空",
			"{String} code-登陆码,默认为空",
			"{Function} callback-成功回调函数",
			"{Function} callback-失败回调函数",
			"return {void}"
		],
		"hwAuth.token(host,'','','',function(res){},function(res){})"),
	value: {},
	type: publicMethodsType.fun
},{
	text: "刷新token",
	name: "refresh",
	Class: "refresh",
	insert: "\n //根据用户名密码登录 \n" + "hwAuth.refresh(host,'','','',function(res){},function(res){})",
	comment: getFormatComment("refresh", "刷新token", ["{String} host-认证服务地址",
			"{String} appid-应用id,默认为空",
			"{String} appkey-应用key,默认为空",
			"{String} code-登陆码,默认为空",
			"{Function} callback-成功回调函数",
			"{Function} callback-失败回调函数",
			"return {void}"
		],
		"hwAuth.refresh(host,'','','',function(res){},function(res){})"),
	value: {},
	type: publicMethodsType.fun
},{
	text: "单点登录",
	name: "signin",
	Class: "signin",
	insert: "\n //根据用户名密码登录 \n" + "hwAuth.signin(host,'','',function(res){},function(res){})",
	comment: getFormatComment("signin", "单点登录", ["{String} host-认证服务地址",
			"{String} appid-应用id,默认为空",
			"{String} appkey-应用key,默认为空",
			"{Function} callback-成功回调函数",
			"{Function} callback-失败回调函数",
			"return {void}"
		],
		"hwAuth.signin(host,'','',function(res){},function(res){})"),
	value: {},
	type: publicMethodsType.fun
},{
	text: "注销",
	name: "logout",
	Class: "logout",
	insert: "\n //根据用户名密码登录 \n" + "hwAuth.logout(host,'token',function(res){},function(res){})",
	comment: getFormatComment("logout", "注销", ["{String} host-认证服务地址",			
			"{String} token-hwToken值",
			"{Function} callback-成功回调函数",
			"{Function} callback-失败回调函数",
			"return {void}"
		],
		"hwAuth.logout(host,'token',function(res){},function(res){})"),
	value: {},
	type: publicMethodsType.fun
},{
	text: "认证,验证token",
	name: "auth",
	Class: "auth",
	insert: "\n //根据用户名密码登录 \n" + "hwAuth.logout(host,'','','token',function(res){},function(res){})",
	comment: getFormatComment("auth", "认证,验证token", ["{String} host-认证服务地址",
			"{String} appid-应用id,默认为空",
			"{String} appkey-应用key,默认为空",
			"{String} token-hwToken值",
			"{Function} callback-成功回调函数",
			"{Function} callback-失败回调函数",
			"return {void}"
		],
		"hwAuth.auth(host,'','','token',function(res){},function(res){})"),
	value: {},
	type: publicMethodsType.fun
}
])








//hwLGCRoot  日志中心
addFunc(hwLGCRoot, [{
		text: "创建日志中心",
		name: "HwLGC",
		Class: "",
		insert: "\n //创建日志中心对象 \n" + "var hwLGC=new HwLGC('192.168.1.188:8888','appid','appkey')",
		comment: getFormatComment("HwLGC", "创建日志中心", ["{String} host-日志中心地址",
				"{String} appid-应用id",
				"{String} appkey-应用key",
				"return {object}"
			],
			"new HwLGC(host,'appid','appkey')"),
		value: {},
		type: publicMethodsType.fun
	},
	{
		text: "初始化日志中心",
		name: "init",
		Class: "",
		insert: "\n //创建日志中心对象 \n" + "var hwLGC=new HwLGC('192.168.1.188:8888','appid','appkey')\n" +
			"\n //初始化日志中心对象 \n" + "hwLGC.init('192.168.1.188','8888','192.168.1.188:8888','appid','appkey')",
		comment: getFormatComment("init", "初始化日志中心", ["{String} ip-日志中心地址ip",
				"{String} port-日志中心地址端口",
				"{String} host-日志中心地址",
				"{String} appid-应用id",
				"{String} appkey-应用key",
				"return {void}"
			],
			"hwLGC.init(ip, mqtt_port, host,appid,appkey)"),
		value: {},
		type: publicMethodsType.fun
	},
	{
		text: "post形式的请求",
		name: "postMsgJson",
		Class: "",
		insert: "\n //创建日志中心对象 \n" + "var hwLGC=new HwLGC('192.168.1.188:8888','appid','appkey')\n" +
			"\n //post形式的请求  传递Json \n" + "hwLGC.postMsgJson('funcname','funcargs',function(){},function(){})",
		comment: getFormatComment("postMsgJson", "post形式的请求", ["{Function} func-要执行的方法名",
				"{string} args-方法需要的参数，字符串形式",
				"{Function} successback-成功回调",
				"{Function} errorback-失败回调",
				"return {void}"
			],
			"hwLGC.postMsgJson (func, args, successback, errorback) "),
		value: {},
		type: publicMethodsType.fun
	},
	{
		text: "写入日志",
		name: "logPush",
		Class: "",
		insert: "\n //创建日志中心对象 \n" + "var hwLGC=new HwLGC('192.168.1.188:8888','appid','appkey')\n" +
			"\n //写入日志 \n" + "hwLGC.logPush('日志信息','function(){},function(){})",
		comment: getFormatComment("logPush", "写入日志", ["{object} obj-日志数据对象",
				"{Function} successback-成功回调",
				"{Function} errorback-失败回调",
				"return {void}"
			],
			"hwLGC.logPush (obj, successback, errorback) "),
		value: {},
		type: publicMethodsType.fun
	}
])







//hwDMCRoot  文档中心
addFunc(hwDMCRoot, [{
	text: "创建文档中心",
	name: "HwDMC",
	Class: "",
	insert: ['//创建文档中心',
		'var dashost="192.168.1.188:8050"//文档数据服务地址',
		'var dochost="192.168.1.188:8051"//文档后台服务地址',
		'var _token=vmd.Cookie.get("hwToken")//当前用户token',
		'var hwDMC=new HwDMC(dashost,dochost,_token)'
	].join("\n"),
	comment: getFormatComment("HwDMC", "创建文档中心", ["{String} hwdas_host-文档数据服务地址",
			"{String} doc_host-文档后台服务地址",
			"{String} token-当前用户token"
		],
		"new HwDMC(hwdas_host, doc_host, token)"),
	value: {},
	type: publicMethodsType.fun
}])

//hwDMCRoot  文档操作
addFunc(hwDMCRoot_DocInfo, [{
	text: " 查询文档信息",
	name: "get",
	Class: "",
	insert: ['//创建文档中心',
		'var dashost="192.168.1.188:8050"//文档数据服务地址',
		'var dochost="192.168.1.188:8051"//文档后台服务地址',
		'var _token=vmd.Cookie.get("hwToken")//当前用户token',
		'var hwDMC=new HwDMC(dashost,dochost,_token)',
		'//获取文档信息',
		'hwDMC.docinfo.get(\'文档id\', function(){}, function(){})'
	].join("\n"),
	comment: getFormatComment("docinfo.get", "查询文档信息", ["{String} docid-文档id",
			"{function} successback-成功回调",
			"{function} errorback-失败回调"
		],
		"hwDMC.docinfo.get(docid, successback, errorback)"),
	value: {},
	type: publicMethodsType.fun
},{
	text: "添加文档信息",
	name: "adde",
	Class: "",
	insert: ['//创建文档中心',
		'var dashost="192.168.1.188:8050"//文档数据服务地址',
		'var dochost="192.168.1.188:8051"//文档后台服务地址',
		'var _token=vmd.Cookie.get("hwToken")//当前用户token',
		'var hwDMC=new HwDMC(dashost,dochost,_token)',
		'//添加文档信息',
		'hwDMC.docinfo.add(\'文档信息\', function(){}, function(){})'
	].join("\n"),
	comment: getFormatComment("docinfo.add", "添加文档信息", ["{object} datas-文档信息",
			"{function} successback-成功回调",
			"{function} errorback-失败回调"
		],
		"hwDMC.docinfo.add(datas, successback, errorback)"),
	value: {},
	type: publicMethodsType.fun
},{
	text: "编辑文档信息",
	name: "edit",
	Class: "",
	insert: ['//创建文档中心',
		'var dashost="192.168.1.188:8050"//文档数据服务地址',
		'var dochost="192.168.1.188:8051"//文档后台服务地址',
		'var _token=vmd.Cookie.get("hwToken")//当前用户token',
		'var hwDMC=new HwDMC(dashost,dochost,_token)',
		'//编辑文档信息',
		'hwDMC.docinfo.edit(\'文档信息\', function(){}, function(){})'
	].join("\n"),
	comment: getFormatComment("docinfo.edit", "编辑文档信息", ["{object} datas-文档信息",
			"{function} successback-成功回调",
			"{function} errorback-失败回调"
		],
		"hwDMC.docinfo.edit(datas, successback, errorback)"),
	value: {},
	type: publicMethodsType.fun
},{
	text: "删除文档信息",
	name: "del",
	Class: "",
	insert: ['//创建文档中心',
		'var dashost="192.168.1.188:8050"//文档数据服务地址',
		'var dochost="192.168.1.188:8051"//文档后台服务地址',
		'var _token=vmd.Cookie.get("hwToken")//当前用户token',
		'var hwDMC=new HwDMC(dashost,dochost,_token)',
		'//删除文档信息',
		'hwDMC.docinfo.del(\'文档id\', function(){}, function(){})'
	].join("\n"),
	comment: getFormatComment("docinfo.del", "删除文档信息", ["{object} docid-文档id",
			"{function} successback-成功回调",
			"{function} errorback-失败回调"
		],
		"hwDMC.docinfo.del(docid, successback, errorback)"),
	value: {},
	type: publicMethodsType.fun
},{
	text: "根据文档名称和id得到相关信息  ",
	name: "getdocinfobyidandname",
	Class: "",
	insert: ['//创建文档中心',
		'var dashost="192.168.1.188:8050"//文档数据服务地址',
		'var dochost="192.168.1.188:8051"//文档后台服务地址',
		'var _token=vmd.Cookie.get("hwToken")//当前用户token',
		'var hwDMC=new HwDMC(dashost,dochost,_token)',
		'//根据文档名称和id得到相关信息',
		'hwDMC.docinfo.getdocinfobyidandname(\'文档id\', \'文档name\',function(){}, function(){})'
	].join("\n"),
	comment: getFormatComment("docinfo.getdocinfobyidandname", "根据文档名称和id得到相关信息", ["{object} nodeid-文档id",
			"{object} docname-文档name",
			"{function} successback-成功回调",
			"{function} errorback-失败回调"
		],
		"hwDMC.docinfo.getdocinfobyidandname(nodeid, docname, successback, errorback)"),
	value: {},
	type: publicMethodsType.fun
},{
	text: "获取文档的上级路径 ",
	name: "getdocparentpath",
	Class: "",
	insert: ['//创建文档中心',
		'var dashost="192.168.1.188:8050"//文档数据服务地址',
		'var dochost="192.168.1.188:8051"//文档后台服务地址',
		'var _token=vmd.Cookie.get("hwToken")//当前用户token',
		'var hwDMC=new HwDMC(dashost,dochost,_token)',
		'//获取文档的上级路径',
		'hwDMC.docinfo.getdocparentpath(\'文档id\',function(){}, function(){})'
	].join("\n"),
	comment: getFormatComment("docinfo.getdocparentpath", "获取文档的上级路径", ["{object} docid-文档id",
			"{function} successback-成功回调",
			"{function} errorback-失败回调"
		],
		"hwDMC.docinfo.getdocparentpath(docid, successback, errorback)"),
	value: {},
	type: publicMethodsType.fun
},{
	text: "获取文档的目录 ",
	name: "getdocNodeid",
	Class: "",
	insert: ['//创建文档中心',
		'var dashost="192.168.1.188:8050"//文档数据服务地址',
		'var dochost="192.168.1.188:8051"//文档后台服务地址',
		'var _token=vmd.Cookie.get("hwToken")//当前用户token',
		'var hwDMC=new HwDMC(dashost,dochost,_token)',
		'//获取文档的目录',
		'hwDMC.docinfo.getdocNodeid(\'文档id\',function(){}, function(){})'
	].join("\n"),
	comment: getFormatComment("docinfo.getdocNodeid", "获取文档的目录", ["{object} docid-文档id",
			"{function} successback-成功回调",
			"{function} errorback-失败回调"
		],
		"hwDMC.docinfo.getdocNodeid(docid, successback, errorback)"),
	value: {},
	type: publicMethodsType.fun
}])







//hwAMCRoot  应用中心
addFunc(hwAMCRoot, [{
	text: "创建应用中心",
	name: "HwAMC",
	Class: "",
	insert: "\n //创建应用中心 \n" + "var hwAMC=new HwAMC('192.168.1.188:8888','appid','appkey')",
	comment: getFormatComment("HwAMC", "创建应用中心", ["{String} host-用户中心地址",
			"{String} appid-应用id",
			"{String} appkey-应用key",
			"return {object}"
		],
		"new HwAMC(host,'appid','appkey')"),
	value: {},
	type: publicMethodsType.fun
}, {
	text: "获取应用信息",
	name: "getappinfo",
	Class: "",
	insert: "\n //创建应用中心 \n" + "var hwAMC=new HwAMC('192.168.1.188:8888','appid','appkey')" +
		"\n //写入日志 \n" + "hwAMC.getappinfo('用户id','function(){},function(){})",
	comment: getFormatComment("HwAMC", "获取应用信息", ["{String} sw_application_id-用户id",
			"{Function} successback-成功回调",
			"{Function} errorback-失败回调",
			"return {void}"
		],
		"hwAMC.getappinfo(sw_application_id, successback, errorback)"),
	value: {},
	type: publicMethodsType.fun
}])




//hwEMCRoot  权限中心
addFunc(hwEMCRoot, [{
	text: "创建权限中心",
	name: "HwEMC",
	Class: "",
	insert: "\n //创建权限中心 \n" + "var hwEMC=new HwEMC('192.168.1.188:8888','appid','appkey')",
	comment: getFormatComment("HwEMC", "创建权限中心", ["{String} host-权限中心地址",
			"{String} appid-应用id",
			"{String} appkey-应用key",
			"return {object}"
		],
		"new HwEMC(host,'appid','appkey')"),
	value: {},
	type: publicMethodsType.fun
}, {
	text: "获取权限信息",
	name: "getentitlementinfo",
	Class: "",
	insert: "\n //创建权限中心 \n" + "var hwEMC=new HwEMC('192.168.1.188:8888','appid','appkey')" +
		"\n //获取权限信息 \n" + "hwEMC.getappinfo('权限id','function(){},function(){})",
	comment: getFormatComment("HwEMC", "获取权限信息", ["{String} entitlement_id-权限id",
			"{Function} successback-成功回调",
			"{Function} errorback-失败回调",
			"return {void}"
		],
		"hwEMC.getentitlementinfo (entitlement_id, successback, errorback)"),
	value: {},
	type: publicMethodsType.fun
}, {
	text: "获取权限下模块列表",
	name: "getentitlement_comp_app",
	Class: "",
	insert: "\n //创建权限中心 \n" + "var hwEMC=new HwEMC('192.168.1.188:8888','appid','appkey')" +
		"\n //获取权限下模块列表 \n" + "hwEMC.getentitlement_comp_app('权限id','function(){},function(){})",
	comment: getFormatComment("getentitlement_comp_app", "获取权限下模块列表", ["{String} entitlement_id-权限id",
			"{Function} successback-成功回调",
			"{Function} errorback-失败回调",
			"return {void}"
		],
		"hwEMC.getentitlement_comp_app (entitlement_id, successback, errorback)"),
	value: {},
	type: publicMethodsType.fun
}, {
	text: "获取权限列表",
	name: "getentitlementbyuser",
	Class: "",
	insert: "\n //创建权限中心 \n" + "var hwEMC=new HwEMC('192.168.1.188:8888','appid','appkey')" +
		"\n //获取权限列表 \n" + "hwEMC.getentitlementbyuser('function(){},function(){})",
	comment: getFormatComment("getentitlementbyuser", "获取权限列表", [
			"{Function} successback-成功回调",
			"{Function} errorback-失败回调",
			"return {void}"
		],
		"hwEMC.getentitlementbyuser ( successback, errorback)"),
	value: {},
	type: publicMethodsType.fun
}, {
	text: "核实权限是否存在",
	name: "checkentitlement",
	Class: "",
	insert: "\n //创建权限中心 \n" + "var hwEMC=new HwEMC('192.168.1.188:8888','appid','appkey')" +
		"\n //核实权限是否存在 \n" + "hwEMC.checkentitlement('权限id','function(){},function(){})",
	comment: getFormatComment("checkentitlement", "核实权限是否存在", [
			"{string} entitlement_id-权限id",
			"{Function} successback-成功回调",
			"{Function} errorback-失败回调",
			"return {void}"
		],
		"hwEMC.checkentitlement (entitlement_id， successback, errorback)"),
	value: {},
	type: publicMethodsType.fun
}, {
	text: "获取应用权限",
	name: "getentitlementcompfuc",
	Class: "",
	insert: "\n //创建权限中心 \n" + "var hwEMC=new HwEMC('192.168.1.188:8888','appid','appkey')" +
		"\n //获取应用权限 \n" + "hwEMC.getentitlementcompfuc('应用id','function(){},function(){})",
	comment: getFormatComment("getentitlementcompfuc", "获取应用权限", [
			"{string} sw_application_id-应用id",
			"{Function} successback-成功回调",
			"{Function} errorback-失败回调",
			"return {void}"
		],
		"hwEMC.getentitlementcompfuc (sw_application_id， successback, errorback)"),
	value: {},
	type: publicMethodsType.fun
}])
//hwTDCRoot  待办中心
addFunc(hwTDCRoot, [{
	text: "创建待办中心",
	name: "HwEMC",
	Class: "",
	insert: "\n //创建待办中心 \n" + "var hwTDC=new HwTDC('192.168.1.188:8888','appid','appkey')",
	comment: getFormatComment("HwTDC", "创建待办中心", ["{String} host-待办中心地址",
			"{String} appid-应用id",
			"{String} appkey-应用key",
			"return {object}"
		],
		"new HwTDC(host,'appid','appkey')"),
	value: {},
	type: publicMethodsType.fun
}, {
	text: "获取待办",
	name: "taskTodoGet",
	Class: "",
	insert: "\n //创建待办中心 \n" + "var hwTDC=new HwTDC('192.168.1.188:8888','appid','appkey')" +
		"\n hwTDC.taskTodoGet(user,userSentry,page,pageSize,successback,errorback)",
	comment: getFormatComment("taskTodoGet",
		"获取待办", ["{String} user-当前用户",
			"{String} userSentry-当前用户岗位",
			"{int} page-第几页",
			"{int} pageSize-每页条数",
			"{Function} successback-成功回调",
			"{Function} errorback-失败回调",
		],
		"hwTDC.taskTodoGet('','',1,0, function(result){},\n" +
		"function(mgs){})"),
	value: {},
	type: publicMethodsType.fun
}, {
	text: "获取已办",
	name: "taskDoGet",
	Class: "",
	insert: "\n //创建待办中心 \n" + "var hwTDC=new HwTDC('192.168.1.188:8888','appid','appkey')" +
		"\n hwTDC.taskDoGet(user,page,pageSize,successback,errorback)",
	comment: getFormatComment("taskDoGet",
		"获取已办", ["{String} user-当前用户",
			"{int} page-第几页",
			"{int} pageSize-每页条数",
			"{Function} successback-成功回调",
			"{Function} errorback-失败回调",
		],
		"hwTDC.taskDoGet('',1,0, function(result){},\n" +
		"function(mgs){})"),
	value: {},
	type: publicMethodsType.fun
}, {
	text: "查询审批历程",
	name: "taskHistoryGet",
	Class: "",
	insert: "\n //创建待办中心 \n" + "var hwTDC=new HwTDC('192.168.1.188:8888','appid','appkey')" +
		"\n 查询审批历程 \n hwTDC.taskHistoryGet('工作流实例Id','业务主键',successback,errorback)",
	comment: getFormatComment("taskHistoryGet",
		"查询审批历程", ["{String} flow_inst_id-工作流实例Id",
			"{String} business_key-业务主键",
			"{Function} successback-成功回调",
			"{Function} errorback-失败回调",
		],
		"hwTDC.taskHistoryGet(flow_inst_id, business_key, successback, errorback)"),
	value: {},
	type: publicMethodsType.fun
}, {
	text: "查询待办详情",
	name: "taskInfoGet",
	Class: "",
	insert: "\n //创建待办中心 \n" + "var hwTDC=new HwTDC('192.168.1.188:8888','appid','appkey')" +
		"\n 查询待办详情 \n hwTDC.taskInfoGet('任务id','工作流实例Id',successback,errorback)",
	comment: getFormatComment("taskInfoGet",
		"查询待办详情", ["{String} task_id-任务id",
			"{String} flow_task_id-工作流实例Id",
			"{Function} successback-成功回调",
			"{Function} errorback-失败回调",
		],
		"hwTDC.taskInfoGet(task_id, flow_task_id, successback, errorback)"),
	value: {},
	type: publicMethodsType.fun
}])
//hwUMCRoot  用户中心
addFunc(hwUMCRoot, [{
	text: "创建用户中心",
	name: "HwUMC",
	Class: "",
	insert: "\n //创建用户中心 \n" + "var hwUMC=new HwUMC('192.168.1.188:8888','appid','appkey')",
	comment: getFormatComment("HwUMC", "创建用户中心", ["{String} host-用户中心地址",
			"{String} appid-应用id",
			"{String} appkey-应用key",
			"return {object}"
		],
		"new HwUMC(host,'appid','appkey')"),
	value: {},
	type: publicMethodsType.fun
}, {
	text: "获取用户信息",
	name: "getuserinfo",
	Class: "",
	insert: "\n //创建用户中心 \n" + "var hwUMC=new HwUMC('192.168.1.188:8888','appid','appkey')" +
		"\n 获取用户信息 \n hwUMC.getuserinfo('用户id',successback,errorback)",
	comment: getFormatComment("getuserinfo",
		"获取用户信息", ["{String} employee_ba_id-用户id",
			"{Function} successback-成功回调",
			"{Function} errorback-失败回调",
		],
		"hwUMC.getuserinfo(employee_ba_id, successback, errorback)"),
	value: {},
	type: publicMethodsType.fun
}, {
	text: "获取单位下用户信息",
	name: "getuserinfobyunit",
	Class: "",
	insert: "\n //创建用户中心 \n" + "var hwUMC=new HwUMC('192.168.1.188:8888','appid','appkey')" +
		"\n 获取单位下用户信息 \n hwUMC.getuserinfobyunit('单位id','用户名称',successback,errorback)",
	comment: getFormatComment("getuserinfobyunit",
		"获取单位下用户信息", [
			"{String} org_ba_id-单位id",
			"{String} name-用户名称（模糊查询用）",
			"{Function} successback-成功回调",
			"{Function} errorback-失败回调",
		],
		"hwUMC.getuserinfobyunit(org_ba_id, name, successback, errorback)"),
	value: {},
	type: publicMethodsType.fun
}, {
	text: "查询用户岗位",
	name: "getuserposition",
	Class: "",
	insert: "\n //创建用户中心 \n" + "var hwUMC=new HwUMC('192.168.1.188:8888','appid','appkey')" +
		"\n 查询用户岗位 \n hwUMC.getuserposition(successback,errorback)",
	comment: getFormatComment("getuserposition",
		"查询用户岗位", [
			"{Function} successback-成功回调",
			"{Function} errorback-失败回调",
		],
		"hwUMC.getuserposition( successback, errorback)"),
	value: {},
	type: publicMethodsType.fun
}, {
	text: "查询用户所属单位",
	name: "getuserunit",
	Class: "",
	insert: "\n //创建用户中心 \n" + "var hwUMC=new HwUMC('192.168.1.188:8888','appid','appkey')" +
		"\n 查询用户所属单位 \n hwUMC.getuserunit(successback,errorback)",
	comment: getFormatComment("getuserunit",
		"查询用户所属单位", [
			"{Function} successback-成功回调",
			"{Function} errorback-失败回调",
		],
		"hwUMC.getuserunit( successback, errorback)"),
	value: {},
	type: publicMethodsType.fun
}])




//platformRoot/platformRoot_Auth
addFunc(platformRoot_Auth,[{
    text:"用户认证",
    name:"loginByParam",
    Class:"",
    insert:"\n //根据用户名密码登录 \n" + "vmd.webBase.loginByParam('admin','123456',function(res,usermodel){})",
    comment: getFormatComment("loginByParam","登录验证", 
    ["{String} login-登录名",
    "{String} password-密码",
    "{Function} callback-功回调函数",
    "return {void}"],
    "vmd.webBase.loginByParam('admin','123456',function(res,usermodel){})"),
    value:{},
    type:publicMethodsType.fun
}])

//platformRoot/platformRoot_User
addFunc(platformRoot_User,[{
    text:"用户信息",
    name:"getUserInfo",
    Class:"",
    insert:"\n //获取当前用户信息 \n" + "vmd.webBase.getUserInfo(function(res,usermodel){})",
   comment: getFormatComment("getUserInfo","获取用户信息", 
    ["return {void}"],
    "vmd.webBase.getUserInfo('token',function(res,usermodel){})"),
    value:{},
    type:publicMethodsType.fun
},{
    text:"用户岗位",
    name:"getUserPositionInfo",
    Class:"",
    insert:"\n //获取用户岗位信息 \n" + "vmd.webBase.getUserPositionInfo(function(res,model){})",
   comment: getFormatComment("getUserPositionInfo","获取用户岗位信息", 
    ["return {void}"],
    "vmd.webBase.getUserPositionInfo(function(res,model){})"),
    value:{},
    type:publicMethodsType.fun
},{
    text:"用户角色",
    name:"getUserRoleInfo",
    Class:"",
    insert:"\n //获取用户角色信息 \n" + "vmd.webBase.getUserRoleInfo(function(res,model){})",
   comment: getFormatComment("getUserRoleInfo","获取用户角色信息", 
    ["return {void}"],
    "vmd.webBase.getUserRoleInfo(function(res,model){})"),
    value:{},
    type:publicMethodsType.fun
}])

//platformRoot/platformRoot_Unit
addFunc(platformRoot_Unit,[{
    text:"单位信息",
    name:"getUnitInfo",
    Class:"",
    insert:"\n //获取单位信息 \n" + "vmd.webBase.getUnitInfo('dwdm',function(res,unitmodel){})",
    comment: getFormatComment("getUnitInfo","获取单位信息", 
    ["{String} dwdm-单位代码",
    "return {void}"],
    "vmd.webBase.getUnitInfo('dwdm',function(res,unitmodel){})"),
    value:{},
    type:publicMethodsType.fun
}])

//platformRoot/platformRoot_Module
addFunc(platformRoot_Module,[{
    text:"模块信息",
    name:"getModuleInfo",
    Class:"",
    insert:"\n //获取模块信息 \n" + "vmd.webBase.getModuleInfo(moduleid,moduleurl,function(res,model){})",
    comment: getFormatComment("getModuleInfo","获取模块信息", 
    ["{String} moduleid-模块编号",
    "{String} moduleurl-模块访问路径",
    "return {void}"],
    "vmd.webBase.getModuleInfo(moduleid,moduleurl,function(res,model){})"),
    value:{},
    type:publicMethodsType.fun
}])

//platformRoot/platformRoot_Power
addFunc(platformRoot_Power,[{
    text:"判断模块权限",
    name:"powerCheck",
    Class:"",
    insert:"\n //判断模块权限 \n" + "vmd.webBase.powerCheck(moduleid,function(res){})",
    comment: getFormatComment("powerCheck","判断模块权限", 
    ["{String} moduleid-模块编号",
    "return {void}"],
    "vmd.webBase.powerCheck(moduleid,function(res){})"),
    value:{},
    type:publicMethodsType.fun
},{
    text:"判断子功能权限",
    name:"powerCheckSubModule",
    Class:"",
    insert:"\n //判断子功能权限 \n" + "vmd.webBase.powerCheckSubModule(moduleid,functionname,function(res){})",
    comment: getFormatComment("powerCheckSubModule","判断子功能权限", 
    ["{String} moduleid-模块编号",
    "{String} functionname-子功能名称",
    "return {void}"],
    "vmd.webBase.powerCheckSubModule(moduleid,functionname,function(res){})"),
    value:{},
    type:publicMethodsType.fun
},{
    text:"获取用户权限",
    name:"getUserPower",
    Class:"",
    insert:"\n //获取用户权限，\n //powertype取值（module模块，function功能点，organization单位，unit单元，well单井） \n" + "vmd.webBase.getUserPower(powertype,function(res){})",
    comment: getFormatComment("getUserPower","获取用户权限", 
    ["{String} powertype-权限类型 取值范围：module模块，function功能点，organization单位，unit单元，well单井",
    "return {void}"],
    "vmd.webBase.powerCheckSubModule(moduleid,functionname,function(res){})"),
    value:{},
    type:publicMethodsType.fun
}])

//platformRoot/platformRoot_Log
addFunc(platformRoot_Log,[{
    text:"记录日志",
    name:"syslog",
    Class:"",
    insert:"\n //记录日志信息 \n //loginfo-日志内容 \n //logtype-日志类型 取值范围：info，debug，warn，error，fatal \n //operationtype-操作类型，\n //取值范围：login登录，logout注销，exit退出，query查询，save保存，delete删除，edit编辑，print打印，import导入，export导出 \n" + "vmd.webBase.syslog(loginfo,logtype,operationtype,function(res){})",
    comment: getFormatComment("syslog","记录日志信息", 
    ["{String} loginfo-日志内容",
    "{String} logtype-日志类型 取值范围：info，debug，warn，error，fatal ",
    "{String} operationtype-操作类型，取值范围：login登录，logout注销，exit退出，query查询，save保存，delete删除，edit编辑，print打印，import导入，export导出",
    "return {void}"],
    "vmd.webBase.syslog(loginfo,logtype,operationtype,function(res){})"),
    value:{},
    type:publicMethodsType.fun
}])
