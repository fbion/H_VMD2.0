/*
@filename:ide-ext.js   //脚本文件名
@Copyright (c) 2017-2018 汉威公司技术研究院   //版权说明
@describe: 基础组件属性定义     //脚本功能描述
@major version:2.0.3      //主版本号  vmd的主版本号
@revision version:18.1113      //修订版本号   问题修改、bug修复的版本递增    年.月日
@owner:vmd     //所属分类   此处为 vmd 报表 曲线 工作流、消息中心  数据服务 等。
@creater:成兵   //创建人
@created date:2017-06-12   //创建日期
@editer:成兵    //修改人
@edited date:2018-11-13  //修改日期
@repair:扩展工作流属性,修复工作流组件无法删除的问题     //修复的问题     此处只填写最新的修复问题，同时要将修复的问题及版本更新到更新列表中
@exp:该文件不定时更新 //说明
*/

function getVirtualPath() {
    var path = window.location.href;
    //去除url中的参数
    path = path && path.replace(/\?.*/g, '');
    return path.substring(0, path.indexOf('design'));
}
//处理保存vmd文件时对微服务的对象创建
 xds.vmd.vmdServiceInit=function(lpad){
	 var outServer="";
	 var initHwMSC= function (lpad, vmdType) {
        var root = xds.vmd.getRootNode(vmdType);
        if (!root) return '';
        var out = '';
        out += '\t' + lpad + root.id + "=new " + root.component.xcls + '();\n';
        return out;
    }
	outServer+=initHwMSC(lpad, 'vmdHwMSC')	 	
	
	var initHwDMC = function(lpad, vmdType) {
		var root = xds.vmd.getRootNode(vmdType);
		if(!root) return '';
		var out = '';
		out += '\t' + lpad + root.id + "=new " + root.component.xcls + '();\n';
		return out;
	}
	outServer += initHwDMC(lpad, 'vmdHwDMC')

	var initHwAMC = function(lpad, vmdType) {
		var root = xds.vmd.getRootNode(vmdType);
		if(!root) return '';
		var out = '';
		out += '\t' + lpad + root.id + "=new " + root.component.xcls + '();\n';
		return out;
	}
	outServer += initHwAMC(lpad, 'vmdHwAMC')

	var initHwEMC = function(lpad, vmdType) {
		var root = xds.vmd.getRootNode(vmdType);
		if(!root) return '';
		var out = '';
		out += '\t' + lpad + root.id + "=new " + root.component.xcls + '();\n';
		return out;
	}
	outServer += initHwEMC(lpad, 'vmdHwEMC')

	var initHwUMC = function(lpad, vmdType) {
		var root = xds.vmd.getRootNode(vmdType);
		if(!root) return '';
		var out = '';
		out += '\t' + lpad + root.id + "=new " + root.component.xcls + '();\n';
		return out;
	}
	outServer += initHwUMC(lpad, 'vmdHwUMC')
	
	var initHwLGC = function(lpad, vmdType) {
		var root = xds.vmd.getRootNode(vmdType);
		if(!root) return '';
		var out = '';
		out += '\t' + lpad + root.id + "=new " + root.component.xcls + '();\n';
		return out;
	}
	outServer += initHwLGC(lpad, 'vmdHwLGC')
	
	var initHwTDC = function(lpad, vmdType) {
		var root = xds.vmd.getRootNode(vmdType);
		if(!root) return '';
		var out = '';
		out += '\t' + lpad + root.id + "=new " + root.component.xcls + '();\n';
		return out;
	}
	outServer += initHwTDC(lpad, 'vmdHwTDC')
	
	return outServer;
 }

//////////以下是对扩展组件的配置
//#region button designer 属性设置

xds.vmdButton = Ext.extend(xds.Component, {
    cid: "vmdButton",
    category: "vmd组件",
    defaultName: "&lt;button&gt;",
    text: "button(按钮)",
    dtype: "vmd.button",
    //这里的xtype主要是为了代码显示的类型，本身无任何作用
    xtype: "vmd.button",
    xcls: "vmd.comp.button",
    iconCls: "icon-vmdbutton",
    //控制是否可以拖拽
    isResizable: function (a, b) {
        //a为上下左右的位置方向
        //return a == "Right"
        //		&& !this.getConfigValue("anchor")
        return true;
    },
    naming: "button",
    isContainer: false,
    //是否显示右下角的组件说明
    filmCls: "el-film-nolabel",
    //默认属性设置
    defaultConfig: {
        text: "button",
        type: "(none)",
        size: "small"

    },
    //属性设置
    configs: [{
        name: "click",
        group: "事件",
        editor: "ace",
        ctype: "string",
        params: "e"
    },
		{
		    name: "text",
		    group: "外观",
		    ctype: "string"
		}, {
		    name: "cls",
		    group: "外观",
		    ctype: "string"
		}, {
		    name: "iconcls",
		    group: "外观",
		    ctype: "string"
		}, {
		    name: "disabled",
		    group: "外观",
		    ctype: "boolean"
		}, {
		    name: "hidden",
		    group: "外观",
		    ctype: "boolean"
		}, {
		    name: "id",
		    group: "设计",
		    ctype: "string"
		}, {
		    name: "style",
		    group: "外观",
		    ctype: "string"
		}, {
		    name: "width",
		    group: "外观",
		    ctype: "number"
		}, {
		    name: "height",
		    group: "外观",
		    ctype: "number"
		}, {
		    name: "size",
		    group: "外观",
		    ctype: "string",
		    editor: "options",
		    options: ["(none)", "mini", "small", "large"]
		}, {
		    name: "type",
		    group: "外观",
		    ctype: "string",
		    editor: "options",
		    options: ["(none)", "primary", "success", "warning", "danger", "info", "text"]
		},
		{
		    name: "icon",
		    group: "外观",
		    ctype: "string",
		    editor: "options",
		    options: ["(none)", "search", "success", "plus", "picture", "star-off", "close", "loading", "setting", "delete", "edit", "edit-outline"],
		    edConfig: {
		        editable: true,
		        forceSelection: false
		    }
		}
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
    },
    onFilmDblClick: function (b) {
        //双击值编辑功能  
        var a = this.getExtComponent();
        xds.canvas.startEdit(this, a.el, this
			.getConfigObject("text"), 80)
    }

});

xds.Registry.register(xds.vmdButton)
//#endregion 

//#region combo designer 属性设置
xds.vmdCombo = Ext.extend(xds.Component, {
    cid: "vmdCombo",
    category: "vmd组件",
    defaultName: "&lt;combo&gt;",
    text: "combo(下拉框)",
    dtype: "vmd.combo",
    //这里的xtype主要是为了代码显示的类型，本身无任何作用
    xtype: "vmd.combo",
    xcls: "vmd.comp.Combo",
    iconCls: "icon-vmdcombo",
    naming: "combo",
    //控制是否可以拖拽
    isResizable: function (a, b) {
        //a为上下左右的位置方向
        return a == "Right" &&
			!this.getConfigValue("anchor")
    },
    isContainer: false,
    //是否显示右下角的组件说明
    filmCls: "el-film-nolabel",
    //默认属性设置
    defaultConfig: {
        width: 150
    },
    configs: [{
        name: "change",
        group: "事件",
        editor: "ace",
        ctype: "string",
		    params: "value,text"
    },
		{
		    name: "store",
		    group: "数据",
		    ctype: "string",
		    editor: "options",
		    edConfig: {
		        type: "store"
		    }
		},
		{
		    name: "valueField",
		    group: "数据",
		    ctype: "string",
		    editor: "options",
		    edConfig: {
		        type: "storeField",
		        cname: "store"
		    }
		}, {
		    name: "displayField",
		    group: "数据",
		    ctype: "string",
		    editor: "options",
		    edConfig: {
		        type: "storeField",
		        cname: "store"
		    }
		},
		{
		    name: "firstSelected",
		    group: "数据",
		    ctype: "boolean"
		},
		{
		    name: "Multi",
		    group: "数据",
		    ctype: "boolean"
		},
		{
		    name: "readOnly",
		    group: "只读",
		    ctype: "boolean"
		}, {
		    name: "width",
		    group: "外观",
		    ctype: "number"
		}, {
		    name: "cls",
		    group: "外观",
		    ctype: "string"
		}, {
		    name: "disabled",
		    group: "外观",
		    ctype: "boolean"
		}, {
		    name: "hidden",
		    group: "外观",
		    ctype: "boolean"
		}, {
		    name: "id",
		    group: "设计",
		    ctype: "string"
		}, {
		    name: "style",
		    group: "外观",
		    ctype: "string"
		}, {
		    name: "compatibleOCX",
		    group: "外观",
		    ctype: "boolean"
		}
    ]

});
xds.Registry.register(xds.vmdCombo)
//#endregion
//#region combo designer ace编辑器
xds.vmdAce = Ext.extend(xds.Component, {
    cid: "vmdAceEditor",
    category: "vmd组件",
    defaultName: "&lt;MyAce&gt;",
    text: "aceEditor(代码编辑器)",
    dtype: "vmd.ace",
    //这里的xtype主要是为了代码显示的类型，本身无任何作用
    xtype: "vmd.ace",
    xcls: "vmd.comp.Ace",
    iconCls: "icon-ace",
    naming: "MyAce",
    requireJs: ["lib/ace/ace.js","lib/ace/mode-base.js","lib/ace/theme-xcode.js","lib/ace/ext-language_tools.js"],
    //控制是否可以拖拽
    isResizable: function (a, b) {
        //a为上下左右的位置方向
        return true
    },
    isContainer: false,
    //是否显示右下角的组件说明
    // filmCls: "el-film-nolabel",
    //默认属性设置
    defaultConfig: {
        height: 300,
        width: 600,
        language: 'javascript'
    },
    configs: [{
        name: "language",
        group: "设计",
        editor: "options",
        ctype: "string",
        options: ['javascript', 'css', 'html']
    },
		{
		    name: "value",
		    group: "设计",
		    ctype: "string"
		}, {
		    name: "width",
		    group: "外观",
		    ctype: "number"
		}, {
		    name: "height",
		    group: "外观",
		    ctype: "number"
		}, {
		    name: "cls",
		    group: "外观",
		    ctype: "string"
		}, {
		    name: "disabled",
		    group: "外观",
		    ctype: "boolean"
		}, {
		    name: "hidden",
		    group: "外观",
		    ctype: "boolean"
		}, {
		    name: "id",
		    group: "设计",
		    ctype: "string"
		}, {
		    name: "style",
		    group: "外观",
		    ctype: "string"
		}
    ]

});
xds.Registry.register(xds.vmdAce)
//#endregion

//#region vmdDateTime designer 日期组件
xds.vmdDateTime = Ext.extend(xds.Component, {
	cid: "vmdDateTime",
	category: "vmd组件",
	defaultName: "&lt;dateTime&gt;",
	text: "dateTime(日期时间)",
	dtype: "vmd.dateTime",
	xtype: "vmd.dateTime",
	xcls: "vmd.comp.dateTime",
	iconCls: "icon-datefield",
	//控制是否可以拖拽
	isResizable: function(a, b) {
		//a为上下左右的位置方向
		return a == "Right" &&
			!this.getConfigValue("anchor")
	},
	requireCss: ["lib/laydate/theme/default/laydate.css"],
	requireJs: ["lib/laydate/laydate.src.js"],
	naming: "dateTime",
	isContainer: false,
	//是否显示右下角的组件说明
	filmCls: "el-film-nolabel",
	//默认属性设置
	defaultConfig: {
		text: "dateTime",
		width: 150,
		height: 28,
		format: 'yyyy-MM-dd',
	},
	//属性设置
	configs: [{
			name: "change",
			group: "事件",
			editor: "ace",
			ctype: "string",
			params: "value, date, endDate"
		},
		{
			name: "format",
			group: "外观",
			editor: "options",
			ctype: "string",
			options: ['yyyy-MM-dd HH:mm:ss', 'yyyy-MM-dd HH:mm', 'yyyy-MM-dd HH', 'yyyy-MM-dd', 'yyyy-MM', 'yyyy', 'HH:mm:ss', 'HH:mm', 'HH']
		}, {
			name: "cls",
			group: "外观",
			ctype: "string"
		}, {
			name: "disabled",
			group: "外观",
			ctype: "boolean"
		}, {
			name: "hidden",
			group: "外观",
			ctype: "boolean"
		}, {
			name: "id",
			group: "设计",
			ctype: "string"
		}, {
			name: "width",
			group: "外观",
			ctype: "number"
		}, {
		    name: "compatibleOCX",
		    group: "外观",
		    ctype: "boolean"
		}
	],
	initConfig: function(b, a) {
		//初始化默认属性设置
	}
});

xds.Registry.register(xds.vmdDateTime)
//#endregion 
//#region vmdRichTextEditor designer 富文本编辑器
xds.vmdRichTextEditor = Ext.extend(xds.Component, {
	cid: "vmdRichTextEditor",
	category: "vmd组件",
	defaultName: "&lt;vmdRichTextEditor&gt;",
	text: "richTextEditor(富文本编辑器)",
	dtype: "vmd.richTextEditor",
	//这里的xtype主要是为了代码显示的类型，本身无任何作用
	xtype: "vmd.richTextEditor",
	xcls: "vmd.comp.richTextEditor",
	iconCls: "icon-textarea",
	naming: "hwRichTextEditor",
	requireJs: ["lib/ueditor/ueditor.config.js", "lib/ueditor/ueditor.all.js", "lib/ueditor/lang/zh-cn/zh-cn.js", "lib/ueditor/kityformula-plugin/addKityFormulaDialog.js", "lib/ueditor/kityformula-plugin/getKfContent.js", "lib/ueditor/kityformula-plugin/defaultFilterFix.js"],
	//控制是否可以拖拽
	isResizable: function(a, b) {
		//a为上下左右的位置方向
		return true
	},
	isContainer: false,
	//是否显示右下角的组件说明
	// filmCls: "el-film-nolabel",
	//默认属性设置
	defaultConfig: {
		height: 300,
		width: 600,
		zIndex:30000
	},
	configs: [{
			name: "width",
			group: "外观",
			ctype: "number"
		}, {
			name: "height",
			group: "外观",
			ctype: "number"
		}, {
			name: "cls",
			group: "外观",
			ctype: "string"
		}, {
			name: "disabled",
			group: "外观",
			ctype: "boolean"
		}, {
			name: "hidden",
			group: "外观",
			ctype: "boolean"
		}, {
			name: "id",
			group: "设计",
			ctype: "string"
		},{
			name: "style",
			group: "外观",
			ctype: "string"
		},{
			name: "zIndex",
			group: "外观",
			ctype: "number"
		},{	
			name: "isWdk",
			group: "外观",
			ctype: "boolean"
		},{
			name: "aftershow",
			group: "事件",
			editor: "ace",
			ctype: "string",
		    params: "value,text"
		}
	]
});
xds.Registry.register(xds.vmdRichTextEditor)
//#endregion 



xds.vmdJsonStore = Ext.extend(xds.Component, {
    category: "数据集",
    defaultName: "&lt;jsonstore&gt;",
    naming: "store",
    isContainer: false,
    isStore: true,
    cid: "vmdJsonStore",
    text: "jsonStore(数据集)",
    xtype: "vmd.jsonStore",
    dtype: "vmd.jsonStore",
    xcls: "vmd.store.jsonStore",
    iconCls: "icon-datatable",
    isContainer: true,
    validChildTypes: ["datafield"],
    createStore: function () { },

    dropHide: true,
    isVmdType: 'dataset', //读取数据集类型
    //默认属性设置
    defaultConfig: {
        autoLoad: true
    },
    initConfig:function(cfg,ct){
        
        if (this.userConfig && this.userConfig.isMaster&&this.userConfig.slave&&this.userConfig.slave.length>0) {
            this.node.setIconCls('icon-maindatatable')
        } if(this.userConfig && this.userConfig.virtualStore) {
            this.node.setIconCls('icon-virtualdatatable')
        }
    },
    configs: [{
        name: "storeConfig",
        group: "数据",
        ctype: "string",
        editor: "defineWindow",
        edConfig: {
            url: getVirtualPath() + '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwSeoyb2Ud.html',//hwf323f5b2.html',
            height: 485,
            width: 830,
            title: '数据集配置'
        }
    }, {
        name: "id",
        group: "Ext.Component",
        ctype: "string"
    }, {
        name: "autoLoad",
        group: "数据",
        ctype: "boolean"
    },{
        name: "dsName",
        group: "数据",
        ctype: "string"
    },{
        name: "timeout",
        group: "数据",
        ctype: "string"
    },{
        name: "master",
        group: "数据",
        ctype: "string",
		hide: true
	},{ 
		name: "slave",
        group: "数据",
        ctype: "string",
		hide: true
	},{ 
		name: "masterRelations",
        group: "数据",
        ctype: "string",
		hide: true
	},{ 
		name: "trueTables",
        group: "数据",
        ctype: "string",
		hide: true
	},{ 
		name: "cascadeDel",
        group: "数据",
        ctype: "boolean",
		hide: true
	},{ 
		name: "virtualStore",
        group: "数据",
        ctype: "boolean",
		hide: true
	},{
		    name: "load",
		    group: "事件",
		    editor: "ace",
		    ctype: "string",
		    params: "records,options"
	}
    ],
	getActions: function() {
        var pcid = this.node.parentNode.component.cid;
        var msItem = new Ext.Action({
            itemId: "setMSRelation",
            text: "设置从表信息",
            handler: function () {
				var selstore=this;			
               //this.node.component.setConfig('isMaster', true);			   
				if (xds.eastlayout && xds.eastlayout.activeSettings) {
					xds.eastlayout.activeSettings('MSRelations', '300', '主从关系', function(MSConfig) {
						xds.eastlayout.MSConfig = MSConfig;
						MSConfig.initMSRelations(selstore);
					});
				}			   
            },
            scope: this
        })
		var delmsItem = new Ext.Action({
            itemId: "delMSRelation",
            text: "移除从表信息",
            handler: function () {
				var selstore=this;	
				selstore.node.setIconCls('icon-datatable');
				var slaves=selstore.getConfigValue('slave')||[];
				//处理从表，将从表的主表信息移除，并设置从表是否还未主从表
				for(var i=0;i<slaves.length;i++)
				{
					var slavestore=xds.inspector.nodeHash[slaves[i]];
					if(!slavestore)
						continue;
					slavestore=slavestore.component;
					slavestore.setConfig('master',"");
					slavestore.setConfig('relation',[]);
					if(slavestore.getConfigValue('slave')&&slavestore.getConfigValue('slave').length>0)
					{}
					else
						slavestore.setConfig('isMaster',false);
				}	
				//设置主表的从表信息系
				selstore.setConfig('slave',[]);
				if(!selstore.getConfigValue('master'))
					selstore.setConfig('isMaster',false);					   
            },
            scope: this
        })
		//if (!this.actions) {
			this.actions = [new Ext.Action({
				itemId: "fileInfo",
				text: "字段信息",
				iconCls: "icon-auto-columns",
				handler: this.fileInfo,
				scope: this
			}), new Ext.Action({
				itemId: "ruleInfo",
				text: "规则定义",
				iconCls: "icon-auto-columns",
				handler: this.ruleInfo,
				scope: this
			}), new Ext.Action({
				itemId: "copyFileInfo",
				text: "复制字段信息",
				iconCls: "icon-auto-columns",
				handler: this.copyFileInfo,
				scope: this
			}), msItem,delmsItem]
		//}
		if (pcid == 'vmddataset'){msItem.hide();delmsItem.hide();} 
		else {msItem.show();delmsItem.show();}
		return this.actions;
	},
	removeComponent:function(callback){
		var selstore=this;	
				var slaves=selstore.getConfigValue('slave')||[];
				//处理从表，将从表的主表信息移除，并设置从表是否还未主从表
				for(var i=0;i<slaves.length;i++)
				{
					var slavestore=xds.inspector.nodeHash[slaves[i]];
					if(!slavestore)
						continue;
					slavestore=slavestore.component;
					slavestore.setConfig('master',"");
					slavestore.setConfig('relation',[]);
					if(slavestore.getConfigValue('slave')&&slavestore.getConfigValue('slave').length>0)
					{}
					else
						slavestore.setConfig('isMaster',false);
		}
				//	处理当前表的主表，将该表从主表的从表序列中移除
				var master=selstore.getConfigValue('master')
				if(master)
				{
					master=xds.inspector.nodeHash[master];
					mstore=master.component;
					var mslaves=mstore.getConfigValue('slave')||[];
					mslaves.remove(selstore.id);
					mstore.setConfig('slave',mslaves);
					if(mslaves.length>0||mstore.getConfigValue('master'))				
						mstore.setConfig('isMaster',true);	
					else
						mstore.setConfig('isMaster',false);
				}
		callback();
	},
	fileInfo: function() {
		var that = this;
		if (this.userConfig.storeConfig == "") {
			//为空调出表单选择界面先选择表单，确定之后再打开节点选择界面
			Ext.Msg.alert("提示", "未配置数据集，请先配置数据集后再进行字段配置！", function() {})
			return;
		} else {
			var modelId = ""
			var html = "<iframe src='" + getVirtualPath() + "/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwoIsUEAd9/hwd58t9kxh.html?r=" + new Date().getTime() + "' frameborder=0 scrolling=no style='height:100%;width:100%'></iframe>";
			var openWinFrom = new Ext.Window({
				title: "字段信息",
				modal: true,
				maximized: false,
				height: 550,
				width: 800,
				maximizable: true,
				resizable: true,
				bodyStyle: "background-color:#fff",
				closeAction: 'close'
			})
			//关闭选择框
			var me = this;
			window.storeFileInfo = this.userConfig.storeConfig
			window.changeFileInfo = function(editConfigInfo) {
				openWinFrom.hide();
				that.setConfig("storeConfig",editConfigInfo)
			}
			Ext.defer(function() {
				openWinFrom.html = html;
				openWinFrom.show()
			}, 50)
		}
	},
	ruleInfo: function(field) {
		if(typeof field !="string")
			field=""
		var that = this;
		if (this.userConfig.storeConfig == "") {
			//为空调出表单选择界面先选择表单，确定之后再打开节点选择界面
			Ext.Msg.alert("提示", "未配置数据集，请先配置数据集后再进行字段配置！", function() {})
			return;
		} else {
			var modelId = ""
			var html = "<iframe src='" + getVirtualPath() + "/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwoIsUEAd9/hw5f8b2870.html?storename=" + that.id + "&fieldname="+field+"&r=" + new Date().getTime() + "' frameborder=0 scrolling=no style='height:100%;width:100%'></iframe>";
			var openRuleFrom = new Ext.Window({
				title: "规则定义",
				modal: true,
				maximized: false,
				height: 550,
				width: 800,
				maximizable: true,
				resizable: true,
				bodyStyle: "background-color:#fff",
				closeAction: 'close'
			})
			//关闭选择框
			var me = this;
			window.rules_storeFileInfo = this.userConfig.storeConfig
			window.rules_changeFileInfo = function(editConfigInfo) {
				openRuleFrom.hide();
				//that.userConfig.storeConfig = editConfigInfo;
				that.setConfig("storeConfig",editConfigInfo)
			}
			Ext.defer(function() {
				openRuleFrom.html = html;
				openRuleFrom.show()
			}, 50)
			window.rules_editWin=function(name,editRule,callback)
			{
				var html = "<iframe src='" + getVirtualPath() + "/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwoIsUEAd9/hwsld8Ygmg.html?storename=" + that.id + "&r=" + new Date().getTime() + "' frameborder=0 scrolling=no style='height:100%;width:100%'></iframe>";
				var rulesEditWin = new Ext.Window({
					title: name + "的规则定义",
					modal: true,
					maximized: false,
					height: document.documentElement.clientHeight - 50, //_height - 50,
					width: document.documentElement.clientWidth - 100,
					maximizable: true,
					resizable: true,
					bodyStyle: "background-color:#fff",
					closeAction: 'close'
				})
				window.rulesEditWin_editRule=editRule;
				window.rulesEditWin_changeRule=function(code,xml,name,remark)
				{					
					if(callback)
					{
						callback(code,xml,name,remark)
					}
				rulesEditWin.hide();
				}				
				Ext.defer(function() {
					rulesEditWin.html = html;
					rulesEditWin.show()
				}, 50)			
			}
		}
	},
	copyFileInfo:function(field)
	{
		debugger
		var storeInfostr=this.userConfig.storeConfig
		var storeInfo= JSON.parse(storeInfostr);
		var storeFileInfo=storeInfo.fields||[];
		var _fileJson=[];
		for(var i=0;i<storeFileInfo.length;i++)
		{
			fields = {
				column_name: storeFileInfo[i].name,
				name: storeFileInfo[i].cname,
				data_type: storeFileInfo[i].type,
				primary: storeFileInfo[i].primary?"Y":"",
				nullable: storeFileInfo[i].nullable?"Y":"",
				data_length: storeFileInfo[i].length,
				data_precision: storeFileInfo[i].precision,
				unit: storeFileInfo[i].unit
			}
			_fileJson.push(fields);			
		}
		var copyFileStr=JSON.stringify(_fileJson)	
        var oInput = document.createElement('textarea');
        oInput.value = copyFileStr;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象		
		try {
			var successful = document.execCommand('copy');
			var msg = successful ? '成功复制到剪贴板' : '该浏览器不支持点击复制到剪贴板';
			Tips.tips(msg, 'success');  
		} catch (err) {
			Tips.tips('该浏览器不支持点击复制到剪贴板', 'success'); //('该浏览器不支持点击复制到剪贴板');
		}
		document.body.removeChild(oInput);	
	}
});
xds.Registry.register(xds.vmdJsonStore);

//#region Grid 属性设置
xds.vmdGrid = Ext.extend(xds.Component, {
    cid: "vmdGrid",
    category: "vmd组件",
    defaultName: "hwgrid",
    text: "grid(网格)",
    dtype: "vmd.grid",
    //这里的xtype主要是为了代码显示的类型，本身无任何作用
    xtype: "vmd.grid",
    xcls: "vmd.comp.Grid",
    iconCls: "icon-grid",
    naming: "hwGrid",
    hide: true,
    //控制是否可以拖拽
    isResizable: function (a, b) {
        //a为上下左右的位置方向
        // return a == "Right"
        //     && !this.getConfigValue("anchor")
        return true
    },
    isContainer: true,
    //是否显示右下角的组件说明
    filmCls: "el-film-nolabel",
    //默认属性设置
    defaultConfig: {
        skin: "material",
        width: 300,
        height: 200,
        isdesign: true
    },
    configs: [{
        name: "rowSelect",
        group: "事件",
        editor: "ace",
        ctype: "string",
        params: "id"
    }, {
        name: "beforeRowDeleted",
        group: "事件",
        editor: "ace",
        ctype: "string",
        params: "rowId"
    }, {
        name: "checkbox",
        group: "事件",
        editor: "ace",
        ctype: "string",
        params: "rowId, cellInd, state"
    }, {
        name: "enter",
        group: "事件",
        editor: "ace",
        ctype: "string",
        params: "rowId, cellInd"
    }, {
        name: "editCell",
        group: "事件",
        editor: "ace",
        ctype: "string",
        params: "stage, rowId, cellInd"
    }, {
        name: "beforeSelect",
        group: "事件",
        editor: "ace",
        ctype: "string",
        params: "new_row,old_row,new_col_index"
    }, {
        name: "dataStore",
        group: "数据",
        ctype: "string",
        editor: "options",
        options: ["(none)", "Dt1", "Dt2", "Dt3", "Dt4", "Dt5", "Dt6", "Dt7", "Dt8"]
    }, {
        name: "colunms",
        group: "数据",
        editor: "grid_Columns",
        ctype: "string"
    }, {
        name: "readOnly",
        group: "数据",
        ctype: "boolean"
    }, {
        name: "disabled",
        group: "外观",
        ctype: "boolean"
    }, {
        name: "id",
        group: "设计",
        ctype: "string"
    }, {
        name: "skin",
        group: "外观",
        ctype: "string",
        editor: "options",
        options: ["(none)", "material", "dhx_skyblue", "dhx_terrace", "dhx_web"]
    }, {
        name: "width",
        group: "外观",
        ctype: "number"
    }, {
        name: "height",
        group: "外观",
        ctype: "number"
    }]

});
xds.Registry.register(xds.vmdGrid)
//#endregion

//#region SimpleGrid 属性设置
xds.vmdSimpleGrid = Ext.extend(xds.Component, {
    cid: "vmdSimpleGrid",
    category: "vmd组件",
    defaultName: "hwsimplegrid",
    text: "simplegrid(简单网格)",
    dtype: "vmd.simplegrid",
    //这里的xtype主要是为了代码显示的类型，本身无任何作用
    xtype: "vmd.simplegrid",
    xcls: "vmd.comp.SimpleGrid",
    iconCls: "icon-grid",
    naming: "hwSimpleGrid",
    //控制是否可以拖拽
    isResizable: function (a, b) {
        return true
    },
    isContainer: true,
    //是否显示右下角的组件说明
    filmCls: "el-film-nolabel",
    requireJs: ["lib/dhtmlx/codebase/ext/dhtmlx_grid_hwSimpleGridExt.js"],
    //默认属性设置
    defaultConfig: {
        skin: "material",
        width: 300,
        height: 200,
        isdesign: true
    },nodeclick: function() {
		if(xds.eastlayout && xds.eastlayout.activeSettings) {
			xds.eastlayout.activeSettings('GridConfigInfo', '300', '简单网格', function(gridConfigInfo) {
				xds.eastlayout.gridConfigInfo = gridConfigInfo;
				gridConfigInfo.setValue();
			});
		}
	},
    configs: [{
        name: "rowSelect",
        group: "事件",
        editor: "ace",
        ctype: "string",
        params: "id"
    }, {
        name: "beforeSelect",
        group: "事件",
        editor: "ace",
        ctype: "string",
        params: "new_row,old_row,new_col_index"
    }, {
        name: "id",
        group: "设计",
        ctype: "string"
    }, {
        name: "width",
        group: "外观",
        ctype: "number"
    }, {
        name: "height",
        group: "外观",
        ctype: "number"
    }, {
        name: "gridConfig",
        group: "外观",
        ctype: "string",
        hide:true
    }],
	onFilmClick: function(b) {
		if(xds.eastlayout && xds.eastlayout.activeSettings) {
			xds.eastlayout.activeSettings('GridConfigInfo', '300', '简单网格', function(gridConfigInfo) {
				xds.eastlayout.gridConfigInfo = gridConfigInfo;
				gridConfigInfo.setValue();
			});
		}
	}
});
xds.Registry.register(xds.vmdSimpleGrid)
//#endregion


//#region Tree 属性设置
xds.vmdTree = Ext.extend(xds.Component, {
    cid: "vmdTree",
    category: "vmd组件",
    defaultName: "hwtree",
    text: "tree(树)",
    dtype: "vmd.tree",
    //这里的xtype主要是为了代码显示的类型，本身无任何作用
    xtype: "vmd.tree",
    xcls: "vmd.comp.Tree",
    iconCls: "icon-tree",
    hide: true,
    naming: "hwTree",
    //控制是否可以拖拽
    isResizable: function (a, b) {
        //a为上下左右的位置方向
        // return a == "Right"
        //     && !this.getConfigValue("anchor")
        this.isdesign = true;
        return true
    },
    isContainer: true,
    //是否显示右下角的组件说明
    filmCls: "el-film-nolabel",
    //默认属性设置
    defaultConfig: {
        skin: "material",
        width: 300,
        height: 200,
        isdesign: false
    },
    configs: [{
        name: "nodeSelected",
        group: "事件",
        editor: "ace",
        ctype: "string",
        params: "id"
    }, {
        name: "nodeClick",
        group: "事件",
        editor: "ace",
        ctype: "string",
        params: "id"
    }, {
        name: "onOpenEnd",
        group: "事件",
        editor: "ace",
        ctype: "string",
        params: "id,state"
    }, {
        name: "doubleClick",
        group: "事件",
        editor: "ace",
        ctype: "string",
        params: "id"
    }, {
        name: "Check",
        group: "事件",
        editor: "ace",
        ctype: "string",
        params: "id,state"
    },
		{
		    name: "dataStore",
		    group: "数据",
		    ctype: "string",
		    editor: "options",
		    edConfig: {
		        type: "store"
		    }
		}, {
		    name: "parentField",
		    group: "数据",
		    ctype: "string",
		    editor: "options",
		    edConfig: {
		        type: "storeField",
		        cname: "dataStore"
		    }
		}, {
		    name: "childField",
		    group: "数据",
		    ctype: "string",
		    editor: "options",
		    edConfig: {
		        type: "storeField",
		        cname: "dataStore"
		    }
		}, {
		    name: "valueField",
		    group: "数据",
		    ctype: "string",
		    editor: "options",
		    edConfig: {
		        type: "storeField",
		        cname: "dataStore"
		    }
		}, {
		    name: "textField",
		    group: "数据",
		    ctype: "string",
		    editor: "options",
		    edConfig: {
		        type: "storeField",
		        cname: "dataStore"
		    }
		}, {
		    name: "LodeType",
		    group: "数据",
		    ctype: "string",
		    editor: "options",
		    options: ["分级加载", "全部加载"]
		}, {
		    name: "RootValue",
		    group: "数据",
		    ctype: "string"
		}, {
		    name: "CheckBox",
		    group: "数据",
		    ctype: "boolean"
		}, {
		    name: "cls",
		    group: "外观",
		    ctype: "string"
		}, {
		    name: "disabled",
		    group: "外观",
		    ctype: "boolean"
		}, {
		    name: "id",
		    group: "设计",
		    ctype: "string"
		}, {
		    name: "skin",
		    group: "外观",
		    ctype: "string",
		    editor: "options",
		    options: ["(none)", "material", "dhx_skyblue", "dhx_terrace", "dhx_web"]
		}, {
		    name: "width",
		    group: "外观",
		    ctype: "number"
		}, {
		    name: "height",
		    group: "外观",
		    ctype: "number"
		}
    ]

});
xds.Registry.register(xds.vmdTree)
//#endregion

//#region Dataview 属性设置
xds.vmdDataView = Ext.extend(xds.Component, {
    cid: "vmdDataView",
    category: "vmd组件",
    defaultName: "hwdataview",
    text: "dataview(视图)",
    dtype: "vmd.dataview",
    //这里的xtype主要是为了代码显示的类型，本身无任何作用
    xtype: "vmd.dataview",
    xcls: "vmd.comp.dataview",
    iconCls: "icon-dataview",
    naming: "hwDataView",
    //控制是否可以拖拽
    isResizable: function (a, b) {
        //a为上下左右的位置方向
        // return a == "Right"
        //     && !this.getConfigValue("anchor")
        this.isdesign = true;
        return true
    },
    isContainer: true,
    //显示右下角的组件说明,l-film-nolabel为不显示
    filmCls: "el-film-nolabel",
    //默认属性设置
    defaultConfig: {
        width: 350,
        height: 270,
        itemSelector: 'li.info',
        overClass: 'info-hover',
        selectedClass: 'x-view-selected',
        singleSelect: true,
        multiSelect: true,
        autoScroll: true

    },
    initConfig: function (config, ct) {

        var tpl = ['<ul>',
			'<tpl for=".">',
			'<li class="info" style="float:left;padding:8px 17px;margin:5px;text-align:center; line-height: 1.25em;  color: #333;height: 113px; width: 112px; overflow: hidden;border-top: 1px solid transparent;cursor: pointer;">',
			'<img  src="/system/img/dataview/layout/{picname}" />',
			'<h4>{desc}</h4>',
			'</li>',
			'</tpl>',
			'</ul>'
        ]

        // config.tpl = "new Ext.XTemplate(\n'" + tpl.join("',\n'") + "'\n)";
        config.tpl = tpl.join('');

        //测试数据
        var data = [{
            id: 1,
            picname: "border-layout.gif",
            name: 'Border Layout',
            desc: '方位布局'
        }, {
            id: 2,
            picname: "layout-accordion.gif",
            name: 'Accordion Layout',
            desc: '手风琴布局'
        }, {
            id: 3,
            picname: "layout-anchor.gif",
            name: 'Accordion Layout',
            desc: '百分比布局'
        }, {
            id: 4,
            picname: "layout-form.gif",
            name: 'Absolute Layout',
            desc: '绝对定位布局'
        }, {
            id: 5,
            picname: "layout-column.gif",
            name: 'Column Layout',
            desc: '列布局'
        }, {
            id: 6,
            picname: "layout-table.gif",
            name: 'Table Layout',
            desc: '表格布局'
        }]
        var _data = "var data={0};return data;"
        config.data = String.format(_data, Ext.encode(data));
    },
    configs: [{
        name: "click",
        group: "事件",
        editor: "ace",
        ctype: "string",
        params: "index,node,e"
    }, {
        name: "dblclick",
        group: "事件",
        editor: "ace",
        ctype: "string",
        params: "index,node,e"
    },
         {
             name: "contextmenu",
             group: "事件",
             editor: "ace",
             ctype: "string",
             params: "index,node,e"
         },
		{
		    name: "tpl",
		    group: "数据",
		    ctype: "string",
		    editor: "html"

		},
		{
		    name: "store",
		    group: "数据",
		    ctype: "string",
		    editor: "options",
		    edConfig: {
		        type: "store"
		    }

		},
		{
		    name: "data",
		    group: "数据",
		    ctype: "string",
		    editor: 'js'

		},
		{
		    name: "autoHeight",
		    group: "外观",
		    ctype: "boolean"
		},
		{
		    name: "itemSelector",
		    group: "外观",
		    ctype: "string"
		},
		{
		    name: "overClass",
		    group: "外观",
		    ctype: "string"
		},
		{
		    name: "selectedClass",
		    group: "外观",
		    ctype: "string"
		},
		{
		    name: "singleSelect",
		    group: "外观",
		    ctype: "boolean"
		},
		{
		    name: "multiSelect",
		    group: "外观",
		    ctype: "boolean"
		},
		{
		    name: "autoScroll",
		    group: "外观",
		    ctype: "boolean"
		}, {
		    name: "cls",
		    group: "外观",
		    ctype: "string"
		}, {
		    name: "disabled",
		    group: "外观",
		    ctype: "boolean"
		},
        {
            name: "hidden",
            group: "外观",
            ctype: "boolean"
        }, {
            name: "id",
            group: "设计",
            ctype: "string"
        }, {
            name: "width",
            group: "外观",
            ctype: "number"
        }, {
            name: "height",
            group: "外观",
            ctype: "number"
        }
    ]

});
xds.Registry.register(xds.vmdDataView)
//#endregion

xds.datasets = Ext.extend(xds.Component, {
    cid: 'vmddataset',
    category: "数据集(隐藏不可用)",
    name: '数据',
    iconCls: 'icon-json',
    isInvisible: true, //功能根节点不能点击
    isContainer: true,
    validChildTypes: ["vmdJsonStore", "vmdDataSet"],
    isValidParent: function (a) {
        return !a
    }
})
xds.Registry.register(xds.datasets);
//数据集
xds.datasets2 = Ext.extend(xds.Component, {
    cid: 'vmdDataSet',
    category: "数据集(隐藏不可用)",
    naming: 'dataset',
    iconCls: 'icon-dataset',
    isInvisible: true, //功能根节点不能点击
    isContainer: true,
    //新增启用右键菜单并指定菜单项
    enableContextMenu: {
        delete:true
    },
    validChildTypes: ["vmdJsonStore"],
    isValidParent: function (a) {
        return !a
    },
    getActions: function () {
        if (!this.actions) {
            this.actions = [new Ext.Action({
                itemId: "newDataTable",
                text: "新建数据表",
                iconCls: "icon-datatable",
                handler: this._newDataTable,
                scope: this
            })
            ]
        }
        return this.actions
    },
    _newDataTable: function () {
       var addNodeComp= xds.vmd.addNode([{
            cid: 'vmdJsonStore'
        }], this.node);
		if(addNodeComp&&addNodeComp.length>0)
		{addNodeComp[0].select()}
    },
    _setMSRelation: function () {
    }
})
xds.Registry.register(xds.datasets2);

xds.variable = Ext.extend(xds.Component, {
    cid: 'vmdvariable',
    category: "变量(隐藏不可用)",
    name: '变量',
    iconCls: 'icon-var',
    isInvisible: true, //功能根节点不能点击
    isContainer: true,
    validChildTypes: ["vmdVariable"],
    isValidParent: function (a) {
        return !a
    }
})
xds.Registry.register(xds.variable);

/*subviewport节点*/
xds.subviewport = Ext.extend(xds.Component, {
    cid: 'vmdsubviewport',
    category: "子视图根节点(隐藏不可用)",
    name: 'SubView_Window',
    iconCls: 'icon-subviewport',
    isInvisible: true, //功能根节点不能点击
    isContainer: true,
	deleteMenuHide:true,
    validChildTypes: ["vmdSubView", "vmdSubWindow"],
	  getActions: function () {
        if (!this.actions) {
            this.actions = [new Ext.Action({
                itemId: "newSubView",
                text: "新建子视图（subView）",
                iconCls: "icon-subpanel",
                handler: this._newSubView,
                scope: this
            }), new Ext.Action({
                itemId: "newSubWindow",
                text: "新建子窗口(subWindow)",
                iconCls: "icon-subiframe",
                handler: this._newSubWindow,
                scope: this
            })
            ]
        }
        return this.actions
    },
    _newSubView: function () {
        var nodeList = xds.vmd.addNode([{
            cid: 'vmdSubView'
        }], this.node);
        if (nodeList.length > 0) nodeList[nodeList.length - 1].select();
    },
    _newSubWindow: function () {
        var nodeList = xds.vmd.addNode([{
            cid: 'vmdSubWindow'
        }], this.node);
        if (nodeList.length > 0) nodeList[nodeList.length - 1].select();
    },
    isValidParent: function (a) {
        return !a
    }
})
xds.Registry.register(xds.subviewport);



//复合组件容器
xds.types.uxPanel = Ext.extend(xds.PanelBase, {
    cid: "uxpanel",
    defaultName: "&lt;uxpanel&gt;",
    text: "Panel(隐藏不可见)",
    dtype: "xdpanel",
    xtype: "vmd.uxbase",
    xcls: "vmd.base.Ux",
    iconCls: "icon-panel",
    naming: "panel",
    hide: true,
    defaultConfig: {
        title: "Panel",
        header: false,
        border: false,
        panelWidth: 240

    },
    configs: [
	 {
		name: 'panelName',
		group: 'propertySettings',
		ctype: 'string'
	 },
	 {
		name: 'bindCmp',
		group: 'propertySettings',
		ctype: 'string',
		editor: "defineWindow",
		edConfig: {
			url:vmdSettings.uxSelectPath+'?proIns=true',
			auto: false,
			width: 880,
			height: 610,
			enableLoading: true,
			title: '属性面板选择',
			callback:function(settings,cmp){
				cmp.component.setConfig('bindCmp',settings.cls);
				cmp.component.setConfig('bindCmpVersion',settings.version);
				cmp.view.fireEvent("change", cmp.view, settings.cls);
			}
		}
	}, 
	{
		name: 'panelWidth',
		group: 'propertySettings',
		ctype: 'number'
	},	
	{
        name: "autoScroll",
        group: "Ext.Panel",
        ctype: "boolean"
    }, {
        name: "baseCls",
        group: "Ext.Panel",
        ctype: "string"
    }, {
        name: "bodyStyle",
        group: "Ext.Panel",
        ctype: "string"
    }, {
        name: "border",
        group: "Ext.Panel",
        ctype: "boolean"
    }, {
        name: "disabled",
        group: "Ext.Panel",
        ctype: "boolean"
    }, {
        name: "header",
        group: "Ext.Panel",
        ctype: "boolean"
    }, {
        name: "html",
        group: "Ext.Panel",
        ctype: "string",
		hide:(function () {return xds.vmd.isDisableHtmlProp()}())
    }, {
        name: "padding",
        group: "Ext.Panel",
        ctype: "string"
    }, {
        name: "title",
        group: "Ext.Panel",
        ctype: "string",
        updateFn: "setTitle"
    }, {
        name: "layout",
        group: "Ext.Container",
        ctype: "string",
        editor: "options",
        options: xds.layouts
    }, {
        name: "unstyled",
        group: "Ext.Panel",

        ctype: "boolean"
    }, {
        name: "autoHeight",
        group: "Ext.BoxComponent",
        ctype: "boolean"
    }, {
        name: "height",
        group: "Ext.BoxComponent",
        ctype: "number",
        updateFn: "setHeight"
    }, {
        name: "width",
        group: "Ext.BoxComponent",
        ctype: "number"
    }, {
        name: "cls",
        group: "Ext.Component",
        ctype: "string"
    }, {
        name: "ctCls",
        group: "Ext.Component",
        ctype: "string"
    }, {
        name: "disabled",
        group: "Ext.Component",
        ctype: "boolean"
    }, {
        name: "id",
        group: "Ext.Component",
        ctype: "string"
    },
		{
		    name: "region",
		    group: "Ext.Panel",
		    ctype: "string"
		}, {
		    name: "style",
		    group: "Ext.Component",
		    ctype: "string"
		}
    ]
});
xds.Registry.register(xds.types.uxPanel);

//复合组件属性面板配置
xds.types.uxPanelSettings = Ext.extend(xds.PanelBase, {
    cid: "uxpanelsettings",
    defaultName: "&lt;uxpanel&gt;",
    text: "Panel(隐藏不可见)",
    dtype: "xdpanel",
    xtype: "vmd.uxpropertysettings",
    xcls: "vmd.base.UxPropertySettings",
    iconCls: "icon-panel",
    naming: "panel",
    hide: true,
    defaultConfig: {
        title: "Panel",
        header: false,
        border: false
    },
    configs: [
        {
            name: "autoScroll",
            group: "Ext.Panel",
            ctype: "boolean"
        }, {
            name: "baseCls",
            group: "Ext.Panel",
            ctype: "string"
        }, {
            name: "bodyStyle",
            group: "Ext.Panel",
            ctype: "string"
        }, {
            name: "border",
            group: "Ext.Panel",
            ctype: "boolean"
        }, {
            name: "disabled",
            group: "Ext.Panel",
            ctype: "boolean"
        }, {
            name: "header",
            group: "Ext.Panel",
            ctype: "boolean"
        }, {
            name: "html",
            group: "Ext.Panel",
            ctype: "string",
            hide: (function () { return xds.vmd.isDisableHtmlProp() }())
        }, {
            name: "padding",
            group: "Ext.Panel",
            ctype: "string"
        }, {
            name: "title",
            group: "Ext.Panel",
            ctype: "string",
            updateFn: "setTitle"
        }, {
            name: "layout",
            group: "Ext.Container",
            ctype: "string",
            editor: "options",
            options: xds.layouts
        }, {
            name: "unstyled",
            group: "Ext.Panel",
            ctype: "boolean"
        }, {
            name: "autoHeight",
            group: "Ext.BoxComponent",
            ctype: "boolean"
        }, {
            name: "height",
            group: "Ext.BoxComponent",
            ctype: "number",
            updateFn: "setHeight"
        }, {
            name: "width",
            group: "Ext.BoxComponent",
            ctype: "number"
        }, {
            name: "cls",
            group: "Ext.Component",
            ctype: "string"
        }, {
            name: "ctCls",
            group: "Ext.Component",
            ctype: "string"
        }, {
            name: "disabled",
            group: "Ext.Component",
            ctype: "boolean"
        }, {
            name: "id",
            group: "Ext.Component",
            ctype: "string"
        },
		{
		    name: "region",
		    group: "Ext.Panel",
		    ctype: "string"
		}, {
		    name: "style",
		    group: "Ext.Component",
		    ctype: "string"
		}
    ]
});
xds.Registry.register(xds.types.uxPanelSettings);
//复合组件属性
xds.uxprops = Ext.extend(xds.Component, {
    cid: 'vmduxprops',
    category: "属性节点(隐藏不可用)",
    defaultName: '属性',

    iconCls: 'icon-prop',
    isInvisible: true,
    isContainer: true,
    nextid: 0,
    validChildTypes: ["uxprop"],
    getActions: function () {

        if (!this.actions) {
            this.actions = [new Ext.Action({
                itemId: "ux-newprop",
                text: "新建属性",
                iconCls: "icon-new",
                handler: this.newProp,
                scope: this
            }),
				new Ext.Action({
				    itemId: "ux-newgroup",
				    text: "新建分组",
				    iconCls: "icon-group",
				    handler: this.newGroup,
				    scope: this
				})
            ]
        }
        return this.actions
    },
    newProp: function () {

        var conf = {
            cid: 'uxprop',
            id: 'ksrq' + this.nextid,
            userConfig: {
                text: 'aa'
            }
        };
        var root = this.node;
        // xds.interface.restore(conf, root);
        propWin = new vmd.window({
            url: '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hw5a7dbecc.html',
            title: '属性设置',
            enableLoading: true,
            auto: false,
            maximizable: false,
            closable: false
        })
        propWin.show()

        //var vmd = xds.project.getData2();
    },
    newGroupWin: function () {

        var propGroupWin = new vmd.window({
            title: '新建分组',
            auto: false,
            layout: 'form',
            padding: 10,
            labelWidth: 60,
            maximizable: false,
            //closeAction : 'hide',
            items: [{
                xtype: 'textfield',
                itemId: 'name',
                allowBlank: false,
                anchor: '100%',
                fieldLabel: '分组名称'
            }],
            height: 150,
            width: 380,
            buttons: [{
                xtype: 'vmd.button',
                size: 'small',
                type: 'primary',
                width: 70,
                text: '确定',
                handler: function () {

                    var name = propGroupWin.getComponent('name').getValue();

                    if (propGroupWin.edit) {

                        //先删除该节点，然后再重新添加
                        var node = xds.interface.nodeHash[propGroupWin.originalValue];

                        var _data = node.component.getInternals(true);
                        var data = Ext.decode(Ext.encode(_data));
                        data.id = name;
                        data.userConfig.id = name;
                        Ext.each(data.cn, function (item) {
                            if (item.userConfig) {
                                item.userConfig.group = name;
                            }
                        })
                        node.remove();
                        var root = xds.vmd.getUxPropNode();
                        xds.interface.restore(data, root);

                    } else {
                        if (!name) {
                            Ext.Msg.alert('提示', '分组名称不能为空！')
                            return;
                        } else {
                            //判断id是否重复

                            if (xds.interface.hasPropGroupNodeById(name)) {
                                Ext.Msg.alert('提示', '已存在相同分组名称，请重新修改！')
                                return
                            }

                        }

                        var data = [{
                            id: name
                        }];
                        xds.vmd.addPropGroupNodes(data);
                    }

                    propGroupWin.close();
                }

            }, {
                xtype: 'vmd.button',
                size: 'small',
                width: 70,
                text: '取消',
                handler: function () {

                    propGroupWin.close()
                }
            }],

            buttonAlign: 'center'

        })
        return propGroupWin
    },
    newGroup: function () {

        var propGroupWin = this.newGroupWin();
        propGroupWin.show()
    },
    isValidParent: function (a) {
        return !a
    }
})

xds.Registry.register(xds.uxprops);

xds.uxprop = Ext.extend(xds.Component, {
    cid: 'uxprop',
    category: "",
    defaultName: '属性接口',
    iconCls: 'icon-iprop',
    isInvisible: true,
    getActions: function () {

        if (!this.actions) {
            this.actions = [new Ext.Action({
                itemId: "ux-editprop",
                text: "编辑",
                iconCls: "icon-edit",
                handler: this.editProp,
                scope: this
            })]
        }
        return this.actions
    },
    editProp: function () {

        var node = this.node;
        propWin = new vmd.window({
            url: '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hw5a7dbecc.html?id=' + node.id,
            title: '属性设置',
            enableLoading: true,
            auto: false,
            maximizable: false,
            height:670

        })
        propWin.show()
    }
})
xds.Registry.register(xds.uxprop);

xds.uxpropGroup = Ext.extend(xds.uxprop, {
    cid: 'uxpropgroup',
    defaultName: '分组接口',
    iconCls: 'icon-group',
    isContainer: true,
    editProp: function () {

        var win = this.owner.newGroupWin();

        var val = this.node.id;
        //重写分组编辑
        win.on('afterrender', function () {
            this.getComponent('name').setValue(val);
        })
        win.edit = true;
        win.originalValue = val;
        win.show(true);
    }
})

xds.Registry.register(xds.uxpropGroup);

//复合组件方法
xds.uxmethods = Ext.extend(xds.Component, {
    cid: 'vmduxmethods',
    category: "方法(隐藏不可用)",
    name: '方法',
    iconCls: 'icon-function',
    isInvisible: true,
    isContainer: true,
    validChildTypes: ["uxmethod"],
    getActions: function () {

        if (!this.actions) {
            this.actions = [new Ext.Action({
                itemId: "ux-newmethod",
                text: "新建方法",
                iconCls: "icon-new",
                handler: this.newMethod,
                scope: this
            })]
        }
        return this.actions
    },
    newMethod: function () {
        var node = this.node;
        propWin = new vmd.window({
            url: '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hw637926c3.html?id=' + node.id,
            title: '方法设置',
            enableLoading: true,
            width: 960,
            height: 620,
            auto: false
        })
        propWin.show();

    },
    isValidParent: function (a) {
        return !a
    }
})
xds.Registry.register(xds.uxmethods);

xds.uxmethod = Ext.extend(xds.Component, {
    cid: 'uxmethod',
    category: "",
    defaultName: '方法接口',
    iconCls: 'icon-imethod',
    isInvisible: true,
    getActions: function () {

        if (!this.actions) {
            this.actions = [new Ext.Action({
                itemId: "ux-editmethod",
                text: "编辑",
                iconCls: "icon-edit",
                handler: this.editMethod,
                scope: this
            })]
        }
        return this.actions
    },
    editMethod: function () {

        var node = this.node;
        propWin = new vmd.window({
            url: '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hw637926c3.html?id=' + node.id,
            title: '方法设置',
            height: 610,
            enableLoading: true,
            auto: false
        })

        propWin.show()

    }
})
xds.Registry.register(xds.uxmethod);

//复合组件事件

xds.uxevents = Ext.extend(xds.Component, {
    cid: 'vmduxevents',
    category: "事件(隐藏不可用)",
    name: '事件',
    iconCls: 'icon-event',
    isInvisible: true,
    isContainer: true,
    validChildTypes: ["uxevent"],
    getActions: function () {

        if (!this.actions) {
            this.actions = [new Ext.Action({
                itemId: "ux-newevent",
                text: "新建事件",
                iconCls: "icon-new",
                handler: this.newEvent,
                scope: this
            })]
        }
        return this.actions
    },
    newEvent: function () {
        var node = this.node;
        propWin = new vmd.window({
            url: '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hw064d655c.html?id=' + node.id,
            title: '方法设置',
            enableLoading: true,
            maximizable: false,
            auto: false
        })
        propWin.show()

    },
    isValidParent: function (a) {
        return !a
    }
})
xds.Registry.register(xds.uxevents);
xds.uxevent = Ext.extend(xds.Component, {
    cid: 'uxevent',
    category: "",
    defaultName: '事件接口',
    iconCls: 'icon-ievent',
    isInvisible: true,
    getActions: function () {

        if (!this.actions) {
            this.actions = [new Ext.Action({
                itemId: "ux-editevent",
                text: "编辑",
                iconCls: "icon-edit",
                handler: this.editEvent,
                scope: this
            })]
        }
        return this.actions
    },
    editEvent: function () {

        var node = this.node;
        propWin = new vmd.window({
            url: '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hw064d655c.html?id=' + node.id,
            title: '事件设置',
            height: 500,
            enableLoading: true,
            maximizable: false,
            auto: false
        })

        propWin.show()

    }
})
xds.Registry.register(xds.uxevent);

xds.vmdVariable = Ext.extend(xds.Component, {
    category: "变量",
    defaultName: "&lt;variable&gt;",
    naming: "hwvar",
    isContainer: false,
    cid: "vmdVariable",
    text: "var(变量)",
    xtype: "vmd.variable",
    dtype: "vmd.variable",
    xcls: "vmd.Variable",
    iconCls: "icon-var2",
    defaultConfig: {},
    dropHide: true,
    isVmdType: 'variable', //读取数据集类型
    //isValidParent: function (a) {
    //    return !a || a.cid == "vmddataset"
    //},
    configs: [{
        name: "value",
        group: "数据",
        editor: "js",
        ctype: "string"
    }, {
        name: "id",
        group: "数据",
        ctype: "string"
    }]
});
xds.Registry.register(xds.vmdVariable);

xds.getExtendConfigs = function (base, extendConfigs) {

    var baseConfigs = base.prototype.configs;
    var configs = [];
    baseConfigs.items.forEach(function (item) {
        var obj = {}
        for (var key in item) {
            if (item.hasOwnProperty(key)) obj[key] = item[key];
        }
        configs.push(obj);
    })
    Ext.apply(configs, extendConfigs);
    return configs;
}

xds.subView = Ext.extend(xds.Component, {
    category: "窗口",
    defaultName: "&lt;subView&gt;",
    naming: "subView",
    isContainer: true,
	hide:true,
    cid: "vmdSubView",
    text: "subView(子视图)",
    dtype: "xdview",
    xtype: "vmd.subview",
    xcls: "vmd.comp.SubView",
    iconCls: "icon-subpanel",
    defaultConfig: {
        width: 600,
        height: 400,
        layout: 'absolute',
        closable: true,
        draggable: false,
        maximizable: true,
        modal: true,
        resizable: true,
        autoScroll: true,
        closeAction: 'close',
        header: false

    },
    isResizable: function (a, b) {
        return true
    },
    //dropHide: true,
    isVmdType: 'subview',
    isValidDrop: function (a) {

        return a && a.cid != "vmdSubView";
    },
    enableFlyout: true,
    onFlyout: function () {
        var a = [{
            xtype: "flyoutselect",
            fieldLabel: "选择一种布局方式",
            data: xds.layouts,
            bindTo: {
                component: this,
                name: "layout",
                event: "select",
                defaultValue: "auto"
            }
        }];
        if (this.owner && this.owner.hasConfig("layout", "border")) {
            a.push({
                xtype: "flyoutselect",
                fieldLabel: "Select a region",
                data: ["north", "east", "center", "south",
					"west"
                ],
                bindTo: {
                    component: this,
                    name: "region",
                    event: "select"
                }
            })
        }
        return new xds.Flyout({
            title: this.getNode().text,
            component: this,
            items: a
        })
    },
    configs: [{
        name: "bodyStyle",
        group: "Ext.Panel",
        ctype: "string"
    }, {
        name: "html",
        group: "Ext.Panel",
        ctype: "string"
    }, {
        name: "padding",
        group: "Ext.Panel",
        ctype: "string"
    }, {
        name: "layout",
        group: "Ext.Container",
        ctype: "string",
        editor: "options",
        options: xds.layouts
    }, {
        name: "height",
        group: "Ext.BoxComponent",
        ctype: "number",
        updateFn: "setHeight"
    }, {
        name: "width",
        group: "Ext.BoxComponent",
        ctype: "number"
    }, {
        name: "cls",
        group: "Ext.Component",
        ctype: "string"
    },
     {
         name: "id",
         group: "Ext.Component",
         ctype: "string"
     },
     {
         name: "style",
         group: "Ext.Component",
         ctype: "string"
     },
     {
         name: "autoScroll",
         group: "vmd.Window",
         ctype: "boolean"
     },
      {
          name: "title",
          group: "vmd.Window",
          ctype: "string"
      },
      {
          name: "fixedHeight",
          group: "vmd.Window",
          ctype: "number"
      },
      {
          name: "fixedWidth",
          group: "vmd.Window",
          ctype: "number"
      },
      {
          name: "closeAction",
          group: "vmd.Window",
          ctype: "string",
          editor: "options",
          options: ["close", "hide"]
      },
        {
            name: "autoAdjust",
            group: "vmd.Window",
            ctype: "boolean"
        },
        {
            name: "offset",
            group: "vmd.Window",
            ctype: "string"
        },
        {
            name: "closable",
            group: "vmd.Window",
            ctype: "boolean"
        }, {
            name: "draggable",
            group: "vmd.Window",
            ctype: "boolean"
        }, {
            name: "maximizable",
            group: "vmd.Window",
            ctype: "boolean"
        }, {
            name: "modal",
            group: "vmd.Window",
            ctype: "boolean"
        }, {
            name: "resizable",
            group: "vmd.Window",
            ctype: "boolean"
        }, {
            name: "hide",
            group: "事件",
            editor: "ace",
            ctype: "string"

        }
    ]

});

xds.Registry.register(xds.subView);
xds.subView = Ext.extend(Ext.Panel, {
    baseCls: 'subview',
    initComponent: function () {
        this.title = '';
        this.autoScroll = false;
        this.callParent(arguments);
    },
    onShow: function () {

        //xds.subView.superclass.onShow.call(this);

        var me = this;
        this.callParent();
        this.onCanvasResize();
        xds.canvas.on("resize", this.onCanvasResize, this)


    },
    onCanvasResize: function () {
        //mafei 20180824
        var me = this;
        if (xds.canvas.overflowScroll && (_canvasbody = xds.canvas.bwrap)) {
            _canvasbody.first().dom.scrollLeft = xds.canvas.overflowScroll.left;
            _canvasbody.first().dom.scrollTop = xds.canvas.overflowScroll.top;
        }


        /*node.bubble(function (node) {
            var cmp = node.component;
            if (cmp) {
                if (cmp.cid.toLowerCase() == "vmdsubview") {
                    _node = node;
                    return false;
                }
            }
        })*/
        var node = xds.canvas.getTargetComponent(me.film);
        if (!node) return;
        //用于区分是分隔条split拖拽（浏览器窗口拖拽）还是组件拖放
        var rootNode = node;
        var cmpDom = Ext.getDom(me.el);


        var resizeObj;
        var _canvasResize = function () {
            //xds.canvas.bwrap.first()
            resizeObj = xds.canvas.body.getStyleSize();
            var _ch = xds.canvas.body.dom.scrollHeight;
            var _cw = xds.canvas.body.dom.scrollWidth;
            var pageWidth = cmpDom.scrollWidth;
            var pageHeight = cmpDom.scrollHeight;


            /* if (_ch > resizeObj.height && pageHeight < _ch) {
                 resizeObj.height = _ch + 5;
             } else {
                 resizeObj.height = pageHeight + 5;
             }
             if (_cw > resizeObj.width && pageWidth < _cw) {
                 resizeObj.width = _cw + 5;
             } else {
                 resizeObj.width = pageWidth + 5;
             }*/
            //absolute

            if (_cw > resizeObj.width) {
                resizeObj.width = _cw;
            } else {
                resizeObj.width = pageWidth;
            }
            if (_ch > resizeObj.height) {
                resizeObj.height = _ch;
            } else {
                resizeObj.height = pageHeight;;
            }


            me.viewerNode && (me.viewerNode._wh = {
                width: resizeObj.width,
                height: resizeObj.height
            })

            if (me.el.dom) me.setSize(resizeObj);


        }
        _canvasResize();


        Ext.lib.Event.resume();
        xds.canvas.syncAll.defer(30, xds.canvas);



        //20180822 修复容器内组件宽度和高度多大导致的画板显示不全问题
        Ext.defer(function () {
            _canvasResize();
        }, 30)

        return false

    }

});
Ext.reg("xdview", xds.subView);

xds.subWindow = Ext.extend(xds.Component, {
    category: "窗口",
    defaultName: "&lt;subWin&gt;",
    naming: "subWin",
    isContainer: false,
	hide:true,
    cid: "vmdSubWindow",
    text: "subWindow(独立窗口)",
    dtype: "xdpanel",
    xtype: "vmd.subwindow",
    xcls: "vmd.comp.SubWindow",
    iconCls: "icon-subiframe",
    defaultConfig: {
        width: 600,
        height: 400,
        hide: true,
        closable: true,
        draggable: false,
        maximizable: true,
        modal: true,
        resizable: true,
        autoScroll: true,
        closeAction: 'close'
    },
    dropHide: true,
    addRoot: true,
    isVmdType: 'subwindow',
    //isValidDrop: function (a) {
    //    //可允许的目标拖拽
    //    return a && (a.cid == "vmdsubviewport" || a.cid == "viewport");
    //},
    removeComponent: function (callaback) {
        //Ext.Msg.wait("内容", "Extjs进度条应用", {
        //    text: "正在加载。。。"
        //});
        var cmp = this;
        var deleteFile = function (path) {
            hwDas.remove("vmd", path, function (result) { }, function (msg) {
                Ext.Msg.alert("提示", "删除子窗口失败:"+path)
            })
        }
		var deleteModuleInfo=function(path,id)
		{	if(!id)
				return ;
			hwDas.del( "CDEServcie/module/info",{}, { id: id},
                function(result) {
					if(result.data[0].record>0)
					{cmp.save()}
                    Tips.tips("删除模块成功", "success");
					//删除关联文件
					deleteFile(path + id + ".vmd");
					deleteFile(path + id + ".html");
					deleteFile(path + id + "_r.html");
					callaback()
                },
                function(msg) {                        
                    Tips.tips("删除模块信息失败", "error");                    
                })
		}
        vmd.alert('提示', '确认要删除该窗口吗', function (type) {
            
            if (type == 'ok') {
                var id = cmp.config.moduleId;
                var path = cmp.config.path;
                if (path) {
                    path = path.substr(0, path.lastIndexOf('/')+1);
                } else {
                    var _path=getUrlParam('path');
                    path = _path.substr(0, _path.lastIndexOf('/')+1);
                }
                path = path.indexOf('/')!=0?path:path.substring(1);                
                //删除关联文件
				deleteModuleInfo(path,id)
                //deleteFile(path + id + ".vmd");
                //deleteFile(path + id + ".html");
                //deleteFile(path + id + "_r.html");
                //callaback()
            }
        }, { buttons: Ext.Msg.OKCANCEL })
       
    },
    save:function(){
        
        if (!this.isModuleExist) {
            xds.project.save(null, { saveTipShow: false })
        }

    },
    nodedblClick:function(node,e){
       
        var me = this;
        var tplWin, desginWin, path, subModulePath, workspaceid;

      
        workspaceid = getUrlParam('workspaceid');

        var getSubModuleInfo = function () {
            var subModuleId = xds.props.getValue('moduleId');
            var path = getUrlParam('path');
            if (path.indexOf('/') != 0) path = "/" + path;
            var moduleId = getUrlParam('id');
            var subModulePath = '';
            if (!subModuleId) subModuleId = 'hw' + vmd.getGuid(8);
            if (path.indexOf('.vmd') != -1) {
                var _fileName = path.substring(path.lastIndexOf('/') + 1);
                moduleId = moduleId || _fileName.replace('.vmd', '');
                var tpl = "{pathPerf}/{dict}/{submoduleId}.vmd";

                subModulePath = tpl.format({
                    pathPerf: path.substr(0, path.lastIndexOf('/')),
                    dict: moduleId,
                    submoduleId: subModuleId
                });
            }

            return { id: subModuleId, path: subModulePath };
        }
        var openDesginerWin = function (params) {
            desginWin = new top.vmd.window({
                title: title,
                url: vmd.virtualPath + '/design/default.html?' + params,
                maximizable: false,
                resizable: false,
                draggable: false
            })
            desginWin.show();
        }


        var title = xds.props.getValue('title');
       
        var subModule = getSubModuleInfo();
        var subModuleId = subModule.id;
        var subModulePath = subModule.path || "";

        window.closeSelMode = function (state,params) {
            //这里做跳转,state=true为打开设计界面，false为关闭窗口
            tplWin.close();
            if (state) {
                xds.props.setValue('moduleId', subModuleId);
                xds.props.setValue('path', subModulePath);
                xds.props.setValue('createTime', new Date().format('Y-m-d h:m:s'));

                openDesginerWin(params);
            }
        }
       
        if (!title) {
            vmd.tip('请填写窗口标题', "warning")
            return
        }
        var _path = subModulePath.indexOf('/') != 0 ? subModulePath : subModulePath.substring(1);
        vmd.isCheckFileExist(_path, function (data) {
            
            var _params = {
                id: subModuleId,
                name: title,
                path: subModulePath,
                workspaceid: workspaceid,
                pid: getUrlParam('id')
            }
            if (data) {
                //模块存在直接打开
                me.isModuleExist = true;
                
                params = Ext.urlEncode(_params);
                openDesginerWin(params);
            } else {
                //模块不存在打开模版选择界面
                me.isModuleExist = false;
                
                params = Ext.urlEncode(_params);
                 tplWin = new vmd.window({
                    title: '模版选择',
                    url: vmd.virtualPath + '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hw3b9ae460.html?isSubView=true&'+params,
                    auto: false,
                    width: 900,
                    height: 600
                 })

                tplWin.show();
            }
           

        },true)


    },
    configs: [
        {
            name: "id",
            group: "vmd.Window",
            ctype: "string"
        },
        {
            name: "title",
            group: "vmd.Window",
            ctype: "string"
        },
        {
            name: "height",
            group: "vmd.Window",
            ctype: "number",
            updateFn: "setHeight"
        }, {
            name: "width",
            group: "vmd.Window",
            ctype: "number"
        },

        {
            name: "autoAdjust",
            group: "vmd.Window",
            ctype: "boolean"
        },
        {
            name: "offset",
            group: "vmd.Window",
            ctype: "string"
        },
        {
            name: "closable",
            group: "vmd.Window",
            ctype: "boolean"
        }, {
            name: "draggable",
            group: "vmd.Window",
            ctype: "boolean"
        }, {
            name: "maximizable",
            group: "vmd.Window",
            ctype: "boolean"
        }, {
            name: "modal",
            group: "vmd.Window",
            ctype: "boolean"
        }, {
            name: "resizable",
            group: "vmd.Window",
            ctype: "boolean"
        },
        {
            name: "moduleId",
            group: "pageInfo",
            ctype: "string",
            readOnly: true
        },
        {
            name: "path",
            group: "pageInfo",
            ctype: "string",
            readOnly:true
        }
        ,
        {
            name: "createTime",
            group: "pageInfo",
            ctype: "string",
            readOnly: true
        }
        ,
        {
            name: "modifyTime",
            group: "pageInfo",
            ctype: "string",
            readOnly: true
        },
        {
            name: "url",
            group: "pageInfo",
            ctype: "string"
        }
    ]
});

xds.Registry.register(xds.subWindow);

xds.vmdHwMSC = Ext.extend(xds.Component, {
    category: "微服务",
    defaultName: "&lt;msc&gt;",
    naming: "hwMSC",
    cid: "vmdHwMSC",
    text: "hwMSC(消息)",
    xtype: "vmd.hwMSC",
    dtype: "vmd.hwMSC",
    xcls: "vmd.service.HwMSC",
    iconCls: "icon-hwMSC",
    requireCss: [],
    requireJs: ["js/hwMSC.js"],
    isVmdType: 'hwMSC', 
    isContainer: false,
    defaultConfig: {},
    dropHide: true    
});
xds.Registry.register(xds.vmdHwMSC);
//日志
xds.vmdHwLGC = Ext.extend(xds.Component, {
    category: "微服务",
    defaultName: "&lt;lgc&gt;",
    naming: "hwLGC",
    cid: "vmdHwLGC",
    text: "hwLGC(日志)",
    xtype: "vmd.hwLGC",
    dtype: "vmd.hwLGC",
    xcls: "vmd.service.HwLGC",
    iconCls: "icon-hwLGC",
    requireCss: [],
    requireJs: ["js/HwLGC.js"],
    isVmdType: 'hwLGC', 
    isContainer: false,
    defaultConfig: {},
    dropHide: true    
});
xds.Registry.register(xds.vmdHwLGC);
//待办操作
xds.vmdHwTDC = Ext.extend(xds.Component, {
    category: "微服务",
    defaultName: "&lt;tdc&gt;",
    naming: "hwTDC",
    cid: "vmdHwTDC",
    text: "hwTDC(待办)",
    xtype: "vmd.hwTDC",
    dtype: "vmd.hwTDC",
    xcls: "vmd.service.HwTDC",
    iconCls: "icon-hwTDC",
    requireCss: [],
    requireJs: ["js/HwTDC.js"],
    isVmdType: 'hwTDC', 
    isContainer: false,
    defaultConfig: {},
    dropHide: true    
});
xds.Registry.register(xds.vmdHwTDC);
//文档中心
xds.vmdHwDMC = Ext.extend(xds.Component, {
    category: "微服务",
    defaultName: "&lt;dmc&gt;",
    naming: "hwDMC",
    cid: "vmdHwDMC",
    text: "hwDMC(文档)",
    xtype: "vmd.hwDMC",
    dtype: "vmd.hwDMC",
    xcls: "vmd.service.HwDMC",
    iconCls: "icon-hwDMC",
    requireCss: [],
    requireJs: ["js/HwDMC.js"],
    isVmdType: 'hwDMC', 
    isContainer: false,
    defaultConfig: {},
    dropHide: true    
});
xds.Registry.register(xds.vmdHwDMC);

//用户中心
xds.vmdHwUMC = Ext.extend(xds.Component, {
    category: "微服务",
    defaultName: "&lt;umc&gt;",
    naming: "hwUMC",
    cid: "vmdHwUMC",
    text: "hwUMC(用户)",
    xtype: "vmd.hwUMC",
    dtype: "vmd.hwUMC",
    xcls: "vmd.service.HwUMC",
    iconCls: "icon-hwUMC",
    requireCss: [],
    requireJs: ["js/HwUMC.js"],
    isVmdType: 'hwUMC', 
    isContainer: false,
    defaultConfig: {},
    dropHide: true    
});
xds.Registry.register(xds.vmdHwUMC);

//权限中心
xds.vmdHwEMC= Ext.extend(xds.Component, {
    category: "微服务",
    defaultName: "&lt;emc&gt;",
    naming: "hwEMC",
    cid: "vmdHwEMC",
    text: "hwEMC(权限)",
    xtype: "vmd.hwEMC",
    dtype: "vmd.hwEMC",
    xcls: "vmd.service.HwEMC",
    iconCls: "icon-hwEMC",
    requireCss: [],
    requireJs: ["js/HwEMC.js"],
    isVmdType: 'hwEMC', 
    isContainer: false,
    defaultConfig: {},
    dropHide: true    
});
xds.Registry.register(xds.vmdHwEMC);

//应用中心
xds.vmdHwAMC = Ext.extend(xds.Component, {
    category: "微服务",
    defaultName: "&lt;amc&gt;",
    naming: "hwAMC",
    cid: "vmdHwAMC",
    text: "hwAMC(应用)",
    xtype: "vmd.hwAMC",
    dtype: "vmd.hwAMC",
    xcls: "vmd.service.HwAMC",
    iconCls: "icon-hwAMC",
    requireCss: [],
    requireJs: ["js/HwAMC.js"],
    isVmdType: 'hwAMC', 
    isContainer: false,
    defaultConfig: {},
    dropHide: true    
});
xds.Registry.register(xds.vmdHwAMC);

xds.vmdWorkFlow = Ext.extend(xds.Component, {
    category: "微服务",
    defaultName: "&lt;workFlow&gt;",
    naming: "hwWorkFlow",
    cid: "vmdWorkFlow",
    text: "workFlow(工作流)",
    xtype: "vmd.workflow",
    dtype: "vmd.workflow",
    xcls: "vmd.workFlow",
    iconCls: "icon-workflow",
    requireCss: [],
    requireJs: ["js/hwWorkFlow.js"],
    //validChildTypes: ["workFlowNode", 'vmdWorkFlowVarFord'],
    isContainer: false,
    defaultConfig: {},
    dropHide: true,
    isVmdType: 'workflow', //读取数据集类型
    configs: [{
		name: "flowName",
		group: "数据",
		ctype: "string",
		editor: "defineWindow",
		edConfig: {
			url: getVirtualPath() + 'system/modules/eQ9ULgcVb1/hw4acf2f8b/hwYsGADdu1.html',
			height: document.documentElement.clientHeight-50,//_height - 50,
			width: document.documentElement.clientWidth - 100,
			title: '流程选择'
		}
	}, {
        name: "flowInfo",
        group: "数据",
        ctype: "string",
        editor: "defineWindow",
		hide: true,
        edConfig: {
            url: getVirtualPath() + '/system/modules/eQ9ULgcVb1/hw4acf2f8b/hwc1826584.html',
            height: 505,
            width: 400,
            title: '流程选择'
        }
    }, {
        name: "configInfo",
        group: "数据",
        ctype: "string",
        editor: "defineWindow",
		hide: true,
        edConfig: {
            url: getVirtualPath() + '/system/modules/eQ9ULgcVb1/hw4acf2f8b/hw37bfb338.html',
            height: document.documentElement.clientHeight-50,//_height - 50,
            width: document.documentElement.clientWidth - 100,
            title: '节点选择'
        }
    }, {
        name: "id",
        group: "数据",
        ctype: "string",
		readOnly:true

    }, {
		name: "beforeInit",
		group: "事件",
		editor: "ace",
		ctype: "string",
		params: ""
	}],
    initConfig: function (b, a) { },
    setConfig: function (a, b) {
      if(a == "id") return;
		this.superclass.setConfig.call(this, a, b);
		if(a == "configInfo" || a == "flowInfo") return;
		this.setNodeVarValue(a, b)
    },
	setNodeVarValue: function(varName, varValue, nodeId) {
		var varnodeid = nodeId || ""
		for(var i = 0; i < this.configs.items.length; i++) {
			if(this.configs.items[i].name == varName) {
				varnodeid = this.configs.items[i].nodeid
				break;
			}
		}
		var configObj = Ext.decode(this.userConfig.configInfo) || {};
		if(!configObj.variantNode)
			configObj.variantNode = []
		var vname = varName.trim()
		for(var i = 0; i < configObj.variantNode.length; i++) {
			if(configObj.variantNode[i].taskNodeid == varnodeid) {
				var varObj = configObj.variantNode[i].formProperties || [];
				var hasrule = false
				for(var j = 0; j < varObj.length; j++) {
					if(varObj[j].name == vname) {						
						varObj[j].value = varValue;
					}
					if(varObj[j].name == "调用规则")
						hasrule = true
				}
				if(!hasrule) {
					if(vname=="调用规则")
						varObj.push({
						name: "调用规则",
						value: varValue
						})
					else
						varObj.push({
						name: "调用规则",
						value: ""
						})
				}
			}
		}
		this.setConfig("configInfo", Ext.encode(configObj))
	},
	//自定义属性值的方法
	getVarExp: function(varname, value) {

		if(varname == "flowName") {
			var flowObj = Ext.decode(this.userConfig.flowInfo) || {};
			return value || configObj.flowObj.moduleName || ""
		}
		//当属性记录的值不为空时，则以当前值为准，否则去对象中获取
		if(value !== "" && value !== undefined && value !== null)
			return value
		//根据变量找到节点
		var varnodeid = ""
		for(var i = 0; i < this.configs.items.length; i++) {
			if(this.configs.items[i].name == varname) {
				varnodeid = this.configs.items[i].nodeid
				break;
			}
		}
		//从对象中遍历获取变量的值
		var varExp = "";
		var configObj = Ext.decode(this.userConfig.configInfo) || {};
		if(!configObj) return
		var vname = varname.trim()
		for(var i = 0; i < configObj.variantNode.length; i++) {
			if(configObj.variantNode[i].taskNodeid == varnodeid) {
				var varObj = configObj.variantNode[i].formProperties || [];
				for(var j = 0; j < varObj.length; j++) {
					if(varObj[j].name == vname && varObj[j].value != undefined) {
						varExp = varObj[j].value
						break
					};
				}
				if(varExp)
					break;
			}
		}
		return varExp;
	},
	/*
	setVarExp: function(value, name, nodeId) {
		var configObj = Ext.decode(this.userConfig.configInfo);
		//添加变量节点到工作流节点下
		if(nodeId == "hwglobalvariable") {
			var varObj = configObj.variantProcess || [];
			for(var j = 0; j < varObj.length; j++) {
				if(varObj[j].name == name)
					varObj[j].exp = value;
			}
		} else {
			for(var i = 0; i < configObj.variantNode.length; i++) {
				if(configObj.variantNode[i].taskNodeid == nodeId) {
					var varObj = configObj.variantNode[i].formProperties || [];
					for(var j = 0; j < varObj.length; j++) {
						if(varObj[j].name == name)
							varObj[j].exp = value;
					}
				}
			}
		}
		this.setConfig("configInfo", Ext.encode(configObj))
	},*/
    getActions: function () {
        /*if (!this.actions) {
            this.actions = [new Ext.Action({
                itemId: "addnode",
                text: "添加节点",
                iconCls: "icon-auto-columns",
                handler: this.addNewNode,
                scope: this
            })]
        }*/
        return this.actions
    },
    addNewNode: function () {
       /* if (this.userConfig.flowInfo == "") {
            //为空调出表单选择界面先选择表单，确定之后再打开节点选择界面
            Ext.Msg.alert("提示", "未选择工作流，请选择工作流后再进行添加！", function () { })
            return;
        } else {
            var modelId = Ext.decode(this.userConfig.flowInfo).modelId
            var html = "<iframe src='" + getVirtualPath() + "/system/modules/eQ9ULgcVb1/hw4acf2f8b/hwd4fa4ca2.html?modelId=" + modelId + "&id=" + getUrlParam("id") + "&r=" + new Date().getTime() + "' frameborder=0 scrolling=no style='height:100%;width:100%'></iframe>";
            var openWinFrom = new Ext.Window({
                title: "选择节点",
                modal: true,
                maximized: false,
                height: document.body.clientHeight - 50,
                width: document.body.clientWidth - 100,
                maximizable: true,
                resizable: true,
                bodyStyle: "background-color:#fff",
                closeAction: 'close'
            })
            //关闭选择框
            var me = this;
            window.addWFNodeWinClose = function (isAdd, value) {
                if (isAdd) {
                    var selNode = value;
                    var configObj = Ext.decode(me.userConfig.configInfo);
                    //添加变量节点到工作流节点下
                    var hasNode = false;
                    if (!configObj.variantNode)
                        configObj.variantNode = [];
                    configObj.startNodeId = selNode.variantProcess.taskNodeid;
                    for (var i = 0; i < configObj.variantNode.length; i++) {
                        if (configObj.variantNode[i].taskNodeid == selNode.variantNode.taskNodeid) {
                            hasNode = true;
                            break
                        }
                    }
                    if (!hasNode) {
                        configObj.variantNode.push(selNode.variantNode);
                        //添加工作流节点
                        xds.vmd.addNode([{
                            cid: 'vmdWorkFlowNode',
                            name: selNode.variantNode.taskNodeName,
                            nodeId: selNode.variantNode.taskNodeid,
                            id: selNode.variantNode.taskNodeid
                        }], me.id);
                        //添加节点变量
                        var varObj = selNode.variantNode.formProperties || [];
                        var varData = [];
                        for (var j = 0; j < varObj.length; j++) {
                            varData.push({
                                cid: 'vmdWorkFlowNodeVar',
                                name: varObj[j].name,
                                type: varObj[j].type
                            })
                        }
                        //parent.xds.vmd.addNode(varData, selNode.variantNode.taskNodeid)
                    }
                    //判断有无全局变量节点   无则创建
                    if (!configObj.variantProcess) {
                        var varObj = selNode.variantProcess || [];
                        if (varObj.length > 0) {
                            configObj.variantProcess = selNode.variantProcess.formProperties;
                            //添加工作流节点
                            xds.vmd.addNode([{
                                cid: 'vmdWorkFlowVarFord',
                                name: "全局变量",
                                nodeId: "hwglobalvariable",
                                id: "hwglobalvariable"
                            }], me.id);
                            //添加节点变量
                            var varData = [];
                            for (var j = 0; j < varObj.length; j++) {
                                varData.push({
                                    cid: 'vmdWorkFlowNodeVar',
                                    name: varObj[j].name,
                                    type: varObj[j].type
                                })
                            }
                            //parent.xds.vmd.addNode(varData, "hwglobalvariable")
                        }
                    }
                    me.setConfig("configInfo", Ext.encode(configObj))
                }
                openWinFrom.hide();
            }
            Ext.defer(function () {
                openWinFrom.html = html;
                openWinFrom.show()
            }, 50)
        }*/
    },
    addPropConfigs: function() {
		//自定义属性设置
		for(var j = this.configs.keys.length - 1; j >= 0; j--) {
			if(this.configs.get(this.configs.keys[j]) != undefined &&
				this.configs.get(this.configs.keys[j]).group != "数据" &&
				this.configs.get(this.configs.keys[j]).group != "事件") {
				this.configs.removeKey(this.configs.keys[j])
			}
		}
		var configObj = Ext.decode(this.config.configInfo);
		if(!configObj) return
		for(var j = 0; j < configObj.variantNode.length; j++) {
			var _suffix = "";
			for(var k = 0; k < j; k++) {
				_suffix += " ";
			}
			var variantNode = configObj.variantNode[j];
			if(variantNode.formProperties&&variantNode.formProperties.length>0)
			{
				for(var i = 0; i < variantNode.formProperties.length; i++) {
					if(variantNode.formProperties[i].name != "调用规则") {
						this.configs.add(
							new xds.Config.types["string"]({
								name: variantNode.formProperties[i].name + _suffix,
								nodeid: variantNode.taskNodeid,
								ctype: 'string',
								group: variantNode.taskNodeName + '变量',
								disabled: false,
								editor: "customString"
							})
						)
						this.setConfig(variantNode.formProperties[i].name + _suffix,variantNode.formProperties[i].value)
					}
				}
			}
			this.configs.add(
				new xds.Config.types["string"]({
					name: "调用规则" + _suffix,
					nodeid: variantNode.taskNodeid,
					ctype: 'string',
					group: variantNode.taskNodeName + '变量',
					readOnly: true,
					disabled: false,
					editor: "customString"
				})
			)
		}
		//此处处理默认值
		//处理兼容老版本，默认将流程名称添加到flowname中 
		var flowName = this.getConfigValue("flowName")
		if(!flowName) {
			var flowObj = Ext.decode(this.config.flowInfo);
			this.setConfig("flowName", flowObj.modelName || "")
		}		
	}
});
xds.Registry.register(xds.vmdWorkFlow);
/*
xds.vmdWorkFlowNode = Ext.extend(xds.Component, {
    category: "工作流",
    defaultName: "&lt;workFlowNode&gt;",
    cid: "vmdWorkFlowNode",
    category: "工作流",
    text: "workFlowNode(工作流节点)",
    xtype: "vmd.workflownode",
    dtype: "vmd.workflownode",
    xcls: "vmd.workFlow.workFlowNode",
    iconCls: "icon-node",
    naming: "workFlowNode",
    validChildTypes: ["workFlowNodeVar"],
    isVisual: false,
    isNotComponent: true,
    isInvisible: true,
    isContainer: true,
    defaultConfig: {},
	initConfig: function(b, a) {
	},
    setConfig: function (a, b) {
			this.setNodeVarValue(a, b)
			this.superclass.setConfig.call(this, a, b);		
			},
    configs: [
	{
        name: "nodeId",
        group: "数据",
        ctype: "string",
		hide:true
	
    }, {
        name: "name",
        group: "数据",
        ctype: "string",
		hide:true
    }],
    setNodeVarValue: function (varId, varValue) {
        this.owner.setNodeVarValue(this.config.nodeId, varId, varValue);
    },
    removeComponent: function (callback) {
        this.owner.removeNode(this.config.nodeId,callback);
    },
	getVarExp: function(varname) {
		return this.owner.getVarExp(varname, this.config.nodeId)
	},
	setVarExp:function(value,name){
		return this.owner.setVarExp(value,name,this.config.nodeId)
	},
	addPropConfigs: function() {
		//自定义属性设置
		for(var j = this.configs.keys.length - 1; j >= 0; j--) {
			if(this.configs.get(this.configs.keys[j])!=undefined&&this.configs.get(this.configs.keys[j]).group!="数据")
			{this.configs.removeKey(this.configs.keys[j])}			
		}
		var nodevars = this.owner._getNodeVars(this.config.nodeId)
		var userconfigs = this.getConfig()
		for(var i = 0; i < nodevars.length; i++) {
			userconfigs[nodevars[i].name] = nodevars[i].value
			this.configs.add(
				new xds.Config.types["string"]({
					name: nodevars[i].name,
					ctype: 'string',
					group: this.config.name + '变量',
					readOnly: false,
					disabled: false,
					editor: "customString"
				})
			)
		}
	},
	_getNodeVars: function() {
		return this.owner._getNodeVars(this.config.nodeId)
	}

});
xds.Registry.register(xds.vmdWorkFlowNode);

xds.vmdWorkFlowVarFord = Ext.extend(xds.Component, {
    category: "工作流",
    defaultName: "&lt;workFlowVarFord&gt;",
    cid: "vmdWorkFlowVarFord",
    category: "工作流",
    text: "workFlowVarFord(工作流全局变量节点)",
    xtype: "vmd.workflowvarford",
    dtype: "vmd.workflowvarford",
    xcls: "vmd.workFlow.workFlowVarFord",
    iconCls: "icon-var2",
    naming: "workFlowVarFord",
    validChildTypes: ["workFlowNodeVar"],
    isVisual: false,
    isNotComponent: true,
    isInvisible: true,
    isContainer: true,
    defaultConfig: {},
	initConfig: function(b, a) {
	},
    setConfig: function (a, b) { 
			this.setNodeVarValue(a, b)
			this.superclass.setConfig.call(this, a, b);		
			},
    configs: [{
        name: "nodeId",
        group: "数据",
        ctype: "string",
		hide:true
    }, {
        name: "name",
        group: "数据",
        ctype: "string",
		hide:true
    }],
	addPropConfigs: function() {
		//自定义属性设置
		for(var j = this.configs.keys.length - 1; j >= 0; j--) {
			if(this.configs.get(this.configs.keys[j])!=undefined&&this.configs.get(this.configs.keys[j]).group!="数据")
			{this.configs.removeKey(this.configs.keys[j])}			
		}
		var allvars = this.owner._getAllVars(this.config.nodeId)
		var userconfigs = this.getConfig()
		for(var i = 0; i < allvars.length; i++) {
			userconfigs[allvars[i].name] = allvars[i].value
			this.configs.add(
				new xds.Config.types["string"]({
					name: allvars[i].name,
					ctype: 'string',
					group: '全局变量',
					readOnly: true,
					disabled: true,
					editor: "customString"
				})
			)
		}
	},
    setNodeVarValue: function (varId, varValue) {
        this.owner.setNodeVarValue(this.config.nodeId, varId, varValue);
    },
    removeComponent: function () {
        this.owner.removeNode(this.config.nodeId);
    },
	getVarExp: function(varname) {
		return this.owner.getVarExp(varname, this.config.nodeId)
	},
	setVarExp:function(value,name){
		return this.owner.setVarExp(value,name,this.config.nodeId)
	},
	_getAllVars: function() {
		return this.owner._getAllVars(this.config.nodeId)
	}
});
xds.Registry.register(xds.vmdWorkFlowVarFord);

xds.vmdWorkFlowNodeVar = Ext.extend(xds.Component, {
    category: "工作流",
    defaultName: "&lt;workFlowNodeVar&gt;",
    cid: "vmdWorkFlowNodeVar",
    text: "workFlowNodeVar(工作流节点变量)",
    xtype: "vmd.workflownodevar",
    dtype: "vmd.workflownodevar",
    xcls: "vmd.workFlow.workFlowNodeVar",
    iconCls: "icon-var2",
    naming: "workFlowNodeVar",
    isVisual: false,
    isNotComponent: true,
    isInvisible: true,
    defaultConfig: {},
    initConfig: function (b, a) { },
    setConfig: function (a, b) {
        //xds.StoreBase.superclass.setConfig.call(this, a, b);
        if (a == "formVar") {
            this.setNodeVarValue(this.config.name, b)
            this.superclass.setConfig.call(this, a, b);
        }
    },
    configs: [{
        name: "name",
        group: "数据",
        ctype: "string"
    }, {
        name: "type",
        group: "数据",
        ctype: "string"
    }, {
		name: "formVar",
		group: "数据",
		ctype: "string",
		editor: "customOptions",
		edConfig: {
		        type: "var"
		    }
		}
    ],
    setNodeVarValue: function (id, value) {
        this.owner.setNodeVarValue(id, value);
    },
	getVarExp: function() {
		return this.owner.getVarExp(this.config.name)
	},
	setVarExp:function(value){
		return this.owner.setVarExp( value,this.config.name)
	}
});
xds.Registry.register(xds.vmdWorkFlowNodeVar);
*/

xds.vmdComlist = Ext.extend(xds.Component, {
    cid: "vmdComlist",
    category: "vmd组件",
    defaultName: "&lt;comlist&gt;",
    text: "comlist(下拉列表)",
    dtype: "vmd.comlist",
    //这里的xtype主要是为了代码显示的类型，本身无任何作用
    xtype: "vmd.comlist",
    xcls: "vmd.comp.comlist",
    iconCls: "icon-vmdcombo",
    naming: "comlist",
    //isInvisible: true,
    //控制是否可以拖拽
    isResizable: function (a, b) {
        //a为上下左右的位置方向
        return a == "Right" &&
			!this.getConfigValue("anchor")
    },
    isContainer: false,
    //是否显示右下角的组件说明
    filmCls: "el-film-nolabel",
    //默认属性设置	
    defaultConfig: {
        width: 350,
        height: 270
    },

    configs: [{
        name: "selectChanged",
        group: "事件",
        editor: "ace",
        ctype: "string",
        params: "combo, record, index"
    },
		{
		    name: "store",
		    group: "数据",
		    ctype: "string",
		    editor: "options",
		    edConfig: {
		        type: "store"
		    }
		}, {
		    name: "editable",
		    group: "数据",
		    ctype: "boolean"
		}, {
		    name: "query",
		    group: "数据",
		    ctype: "boolean"
		},
		{
		    name: "valueField",
		    group: "数据",
		    ctype: "string",
		    editor: "options",
		    edConfig: {
		        type: "storeField",
		        cname: "store"
		    }
		}, {
		    name: "displayField",
		    group: "数据",
		    ctype: "string",
		    editor: "options",
		    edConfig: {
		        type: "storeField",
		        cname: "store"
		    }
		}, {
		    name: "dropDownFields",
		    group: "数据",
		    ctype: "string",
		    editor: "multiOptions",
		    edConfig: {
		        type: "storeField",
		        cname: "store"
		    }
		}, {
		    name: "queryField",
		    group: "数据",
		    ctype: "string",
		    editor: "multiOptions",
		    edConfig: {
		        type: "storeField",
		        cname: "store"
		    }
		},

		{
		    name: "width",
		    group: "外观",
		    ctype: "number"
		},
		{
		    name: "listWidth",
		    group: "外观",
		    ctype: "number"
		}, {
		    name: "cls",
		    group: "外观",
		    ctype: "string"
		}, {
		    name: "disabled",
		    group: "外观",
		    ctype: "boolean"
		}, {
		    name: "hidden",
		    group: "外观",
		    ctype: "boolean"
		}, {
		    name: "id",
		    group: "设计",
		    ctype: "string"
		}, {
		    name: "style",
		    group: "外观",
		    ctype: "string"
		}, {
		    name: "compatibleOCX",
		    group: "外观",
		    ctype: "boolean"
		}
    ]
})
xds.Registry.register(xds.vmdComlist)

xds.types.vmdImg = Ext.extend(xds.Component, {
    cid: "vmdImg",
    category: "vmd组件",
    defaultName: "&lt;img&gt;",
    text: "img(图片)",
    dtype: "xdsimg",
    //这里的xtype主要是为了代码显示的类型，本身无任何作用
    xtype: "vmd.img",
    xcls: "vmd.comp.Img",
    iconCls: "icon-img",
    naming: "hwImg",
    //isInvisible: true,
    //控制是否可以拖拽
    isResizable: function (a, b) {
        return true
    },
    isContainer: false,
    filmCls: "el-film-nolabel",
    //默认属性设置	
    defaultConfig: {
        width: 200,
        height: 200
    },

    configs: [{
        name: "click",
        group: "事件",
        editor: "ace",
        ctype: "string"
    },
		{
		    name: "width",
		    group: "外观",
		    ctype: "number"
		},
		{
		    name: "height",
		    group: "外观",
		    ctype: "number"
		},
		{
		    name: "cls",
		    group: "外观",
		    ctype: "string"
		}, {
		    name: "disabled",
		    group: "外观",
		    ctype: "boolean"
		}, {
		    name: "hidden",
		    group: "外观",
		    ctype: "boolean"
		}, {
		    name: "id",
		    group: "设计",
		    ctype: "string"
		}, {
		    name: "style",
		    group: "外观",
		    ctype: "string"
		}, {
		    name: "src",
		    group: "外观",
		    ctype: "string",
		    editor: "defineWindow",
		    edConfig: {
		        url: bootPATH + '/js/plugins/image/index.html',
		        height: 500,
		        width: 690,
		        title: '图片上传',
		        callback: function (data, edobj) { }
		    }
		}
    ]
})
xds.Registry.register(xds.types.vmdImg)
xds.Img = Ext.extend(vmd.comp.Img, {

    onRender: function (ct, position) {
        var me = this;

        if (!this.src) {

            //this.autoEl = {
            //    tag: 'div',
            //    width: '200px',
            //    height: '200px',
            //    style: {
            //        border: '1px solid #ddd'
            //    },
            //    cls:' icon-expand'
            //}
            //if (Ext.isString(this.autoEl)) {
            //    this.el = document.createElement(this.autoEl);
            //} else {
            //    var div = document.createElement('div');
            //    Ext.DomHelper.overwrite(div, this.autoEl);
            //    this.el = div.firstChild;
            //}
            this.src = vmd.virtualPath + '/design/images/pic200.png';

        } else {

            //异步加载等待

            this._src = this.src;

            if (xds.vmd.resource.loadComplete) {
                this.src = vmd.replaceResVars(this.src);
            } else {

                vmd.taskRunner(function () {
                    return xds.vmd.resource.loadComplete;
                }, function () {
                    me.setSrc(vmd.replaceResVars(me._src))
                })
            }

        }
        xds.Img.superclass.onRender.apply(this, arguments);

    }
});
Ext.reg("xdsimg", xds.Img);

xds.vmdTreeEx = Ext.extend(xds.Component, {
    cid: "vmdTreeEx",
    category: "vmd组件",
    defaultName: "&lt;treeex&gt;",
    text: "tree(树)",
    dtype: "vmd.treeex",
    //这里的xtype主要是为了代码显示的类型，本身无任何作用
    xtype: "vmd.treeex",
    xcls: "vmd.comp.treeex",
    iconCls: "icon-tree",
    naming: "tree",
    //控制是否可以拖拽
    isResizable: function (a, b) {
        //a为上下左右的位置方向
        return a == "Right" &&
			!this.getConfigValue("anchor")
    },
    isContainer: false,
    //是否显示右下角的组件说明
    filmCls: "el-film-nolabel",
    //默认属性设置	
    defaultConfig: {
        width: 350,
        height: 270,
        hideRoot: false,
		loadType:"全部加载"
    },
    configs: [{
        name: "nodeclick",
        group: "事件",
        editor: "ace",
        ctype: "string",
        params: "node,e"
    },
		{
		    name: "beforeNodeCollapse",
		    group: "事件",
		    editor: "ace",
		    ctype: "string",
		    params: "node, deep, anim"
		},
		{
		    name: "beforeNodeExpand",
		    group: "事件",
		    editor: "ace",
		    ctype: "string",
		    params: "node, deep, anim"
		}, {
		    name: "checkChanged",
		    group: "事件",
		    editor: "ace",
		    ctype: "string",
		    params: "node, checked"
		}, {
		    name: "afterNodeCollapse",
		    group: "事件",
		    editor: "ace",
		    ctype: "string",
		    params: "node"
		}, {
		    name: "afterNodeExpand",
		    group: "事件",
		    editor: "ace",
		    ctype: "string",
		    params: "node"
		}, {
		    name: "nodeDblClick",
		    group: "事件",
		    editor: "ace",
		    ctype: "string",
		    params: "node, e"
		}, {
		    name: "afterBindData", //绑定完数据集后触发
		    group: "事件",
		    editor: "ace",
		    ctype: "string"
		}, {
		    name: "beforeShowMenu", //显示右键菜单前
		    group: "事件",
		    editor: "ace",
		    ctype: "string",
		    params: "node, e"
		}, {
		    name: "afterShowMenu", //显示右键菜单后 
		    group: "事件",
		    editor: "ace",
		    ctype: "string",
		    params: "node, e"
		}, {
		    name: "beforeBodyShowMenu", //树空白处右键菜单前
		    group: "事件",
		    editor: "ace",
		    ctype: "string",
		    params: " e"
		}, {
		    name: "afterBodyShowMenu", //树空白处右键菜单后 
		    group: "事件",
		    editor: "ace",
		    ctype: "string",
		    params: " e"
		}, {
		    name: "nodeover", //节点鼠标移动事件 
		    group: "事件",
		    editor: "ace",
		    ctype: "string",
		    params: "e, node"
		}, {
		    name: "nodeout", //节点鼠标离开事件
		    group: "事件",
		    editor: "ace",
		    ctype: "string",
		    params: "e,node"
		},
		//---------节点拖拽事件-------------
		{
		    name: "beforeMove", //当这棵树有节点被被移动到另外一个地方的时候触发，若有false返回就取消移 
		    group: "事件",
		    editor: "ace",
		    ctype: "string",
		    params: " Tree ,  node,  oldParent,  newParent,  index "
		}, {
		    name: "beforeDrop", //节点鼠标离开事件
		    group: "事件",
		    editor: "ace",
		    ctype: "string",
		    params: "dropEvent"
		}, {
		    name: "afterDrop", //当树节点有一个DD对象被投放后触发。
		    group: "事件",
		    editor: "ace",
		    ctype: "string",
		    params: "dropEvent"
		}, {
		    name: "dragOver", //当树节点有一个DD对象被投放后触发。
		    group: "事件",
		    editor: "ace",
		    ctype: "string",
		    params: "dragOverEvent "
		}, 		
		//---------------------------	
		{
		    name: "store",
		    group: "数据",
		    ctype: "string",
		    editor: "options",
		    edConfig: {
		        type: "store"
		    }
		}, {
		    name: "parentField",
		    group: "数据",
		    ctype: "string",
		    editor: "options",
		    edConfig: {
		        editable: true,
		        forceSelection: false,
		        type: "storeField",
		        cname: "store"
		    }
		}, {
		    name: "valueField",
		    group: "数据",
		    ctype: "string",
		    editor: "options",
		    edConfig: {
		        editable: true,
		        forceSelection: false,
		        type: "storeField",
		        cname: "store"
		    }
		}, {
		    name: "textField",
		    group: "数据",
		    ctype: "string",
		    editor: "options",
		    edConfig: {
		        editable: true,
		        forceSelection: false,
		        type: "storeField",
		        cname: "store"
		    }
		}, {
		    name: "loadType",
		    group: "数据",
		    ctype: "string",
		    editor: "options",
		    options: ["分级加载", "全部加载"]
		}, {
		    name: "rootValue",
		    group: "数据",
		    ctype: "string"
		}, {
		    name: "rootText",
		    group: "数据",
		    ctype: "string"
		}, {
		    name: "allowSameNode",
		    group: "数据",
		    ctype: "boolean"
		}, {
		    name: "hideRoot",
		    group: "数据",
		    ctype: "boolean"
		},{
		    name: "queryVar",
		    group: "数据",
		    ctype: "string",
		    editor: "options",
		    edConfig: {
		        type: "var"
		    }
		},{
		    name: "checkBox",
		    group: "复选框设置",
		    ctype: "boolean"
		}, {
		    name: "cascading",
		    group: "复选框设置",
		    ctype: "boolean"
		}, { //选中节点的标识字段
		    name: "checkBoxFiled",
		    group: "复选框设置",
		    ctype: "string",
		    editor: "options",
		    edConfig: {
		        type: "storeField",
		        cname: "store"
		    }
		}, { //选中节点的标识字段 值
		    name: "checkedValue",
		    group: "复选框设置",
		    ctype: "string"
		}, { 
		    name: "contentMenu",
		    group: "菜单",
		    ctype: "string",
		    editor: "options",
		    edConfig: {
		        type: "menu"
		    }
		},
		//节点图标的属性控制		
		{ //根节点图标
		    name: "rootImg",
		    group: "图标",
		    ctype: "string",
		    editor: "defineWindow",
		    edConfig: {
		        url: bootPATH + '/js/plugins/image/index.html',
		        height: 500,
		        width: 690,
		        title: '图片上传',
		        callback: function (data, edobj) {
		        }
		    }
		},{ //分类图标
		    name: "folderImg",
		    group: "图标",
		    ctype: "string",
		    editor: "defineWindow",
		    edConfig: {
		        url: bootPATH + '/js/plugins/image/index.html',
		        height: 500,
		        width: 690,
		        title: '图片上传',
		        callback: function (data, edobj) {
		        }
		    }
		},{ //叶子节点图标
		    name: "leafImg",
		    group: "图标",
		    ctype: "string",
		    editor: "defineWindow",
		    edConfig: {
		        url: bootPATH + '/js/plugins/image/index.html',
		        height: 500,
		        width: 690,
		        title: '图片上传',
		        callback: function (data, edobj) {
		        }
		    }
		},{ //叶子节点 or 分类节点的标识字段
		    name: "nodeMarkFiled",
		    group: "叶子节点",
		    ctype: "string",
		    editor: "options",
		    edConfig: {
		        type: "storeField",
		        cname: "store"
		    }
		},{ //分类节点的标识字段 值
		    name: "folderValue",
		    group: "叶子节点",
		    ctype: "string"
		},
		{ //叶子节点的标识字段 值
		    name: "leafValue",
		    group: "叶子节点",
		    ctype: "string"
		},		{
		    name: "disabled",
		    group: "外观",
		    ctype: "boolean"
		}, {
		    name: "id",
		    group: "设计",
		    ctype: "string"
		}, {
		    name: "cls",
		    group: "外观",
		    ctype: "string"
		}, {
		    name: "width",
		    group: "外观",
		    ctype: "number"
		}, {
		    name: "height",
		    group: "外观",
		    ctype: "number"
		}, {
			name: "nodedraggable",
		    group: "操作",
		    ctype: "boolean"
		}
    ]
})
xds.Registry.register(xds.vmdTreeEx)

//vmdmenu
xds.types.vmdMenu = Ext.extend(xds.Component, {
    cid: "vmdMenu",
    category: "Menu",
    defaultName: "&lt;menu&gt;",
    text: "menu(菜单)",
    dtype: "xdsmenu",
    //这里的xtype主要是为了代码显示的类型，本身无任何作用
    xtype: "vmd.menu",
    xcls: "vmd.cmp.Menu",
    iconCls: "icon-menu",
    naming: "hwMenu",
    //isInvisible: true,
    //控制是否可以拖拽
    isResizable: function (a, b) {
        return true
    },
    isContainer: true,
    validChildTypes: ["vmdMenuItem", "vmdMenuSeparator"],
    //filmCls: "el-film-nolabel",
    //默认属性设置	
    defaultConfig: {
        width: 120,
        hidden: true,
        floating: true
    },
    initConfig: function (a, b) {

    },
    getDefaultInternals: function () {

        return {
            cid: this.cid,
            cn: [{
                cid: "vmdMenuItem",
                userConfig: {
                    text: 'Menu Item',
                    hidden: false

                }
            }, {
                cid: "vmdMenuItem",
                userConfig: {
                    text: 'Menu Item',
                    hidden: false

                }
            }, {
                cid: "vmdMenuItem",
                userConfig: {
                    text: 'Menu Item',
                    hidden: false
                }
            }]
        }
    },
    configs: [{
        name: "click",
        group: "事件",
        editor: "ace",
        ctype: "string",
        params: "menuItem,e"
    },
		{
		    name: "floating",
		    group: "设置",
		    ctype: "boolean"
		},
		{
		    name: "width",
		    group: "外观",
		    ctype: "number"
		},
		{
		    name: "height",
		    group: "外观",
		    ctype: "number"
		},
		{
		    name: "cls",
		    group: "外观",
		    ctype: "string"
		}, {
		    name: "disabled",
		    group: "外观",
		    ctype: "boolean"
		}, {
		    name: "hidden",
		    group: "外观",
		    ctype: "boolean"
		}, {
		    name: "id",
		    group: "设计",
		    ctype: "string"
		}, {
		    name: "style",
		    group: "外观",
		    ctype: "string"
		}
    ]
})
xds.Registry.register(xds.types.vmdMenu)

xds.vmdMenu = Ext.extend(vmd.cmp.Menu, {

    onRender: function (ct, position) {
        var me = this;
        xds.vmdMenu.superclass.onRender.apply(this, arguments);
        this.el.addClass('designer-menu');

        me.on('afterrender', function () {

            //var xdsCmp = me.viewerNode.component;
            //var owner = xdsCmp.owner;
            //if (me.hidden) return;
            //if (owner.getConfigValue("layout") == 'absolute') {

            //    me.showAt([undefined, undefined])

            //}
            //else {

            //    var pdom = me.el.dom && me.el.dom.parentNode;
            //    var pEl = me.el
            //    pEl.applyStyles({
            //        visibility: 'visible',
            //        left: 0,
            //        top: 0,
            //        position: 'relative'
            //    })

            //}
        })

    }
});
Ext.reg("xdsmenu", xds.vmdMenu);
//Ext.getDoc().on('click', function () { 
//})
xds.types.vmdMenuItem = Ext.extend(xds.Component, {
    cid: "vmdMenuItem",
    category: "Menu",
    defaultName: "&lt;menuitem&gt;",
    text: "menuItem(菜单项)",
    dtype: "xdsmenuitem",
    //这里的xtype主要是为了代码显示的类型，本身无任何作用
    xtype: "menuitem",
    xcls: "Ext.menu.Item",
    iconCls: "icon-menuitem",
    naming: "hwMenuItem",
    //isInvisible: true,
    //控制是否可以拖拽
    isResizable: function (a, b) {
        return false
    },
    isContainer: true,
    validChildTypes: ["vmdMenu"],
    isValidParent: function (a) {
        //应该递归查找
        return !a || a.cid == "vmdMenu";
    },
    //validChildTypes: ["datafield"],
    filmCls: "el-film-nolabel",
    //默认属性设置	
    defaultConfig: {
        width: 120,
        text: 'Menu Item'

    },

    configs: [
        {
            name: "click",
            group: "事件",
            editor: "ace",
            ctype: "string",
            params: "e"
        },
		{
		    name: "text",
		    group: "设置",
		    ctype: "string"
		},
		{
		    name: "icon",
		    group: "图标",
		    ctype: "string",
		    editor: "image"
		},
		{
		    name: "iconCls",
		    group: "图标",
		    ctype: "string"
		},
		{
		    name: "width",
		    group: "外观",
		    ctype: "number"
		},
		{
		    name: "height",
		    group: "外观",
		    ctype: "number"
		},
		{
		    name: "cls",
		    group: "外观",
		    ctype: "string"
		}, {
		    name: "disabled",
		    group: "外观",
		    ctype: "boolean"
		}, {
		    name: "hidden",
		    group: "外观",
		    ctype: "boolean"
		}, {
		    name: "id",
		    group: "设计",
		    ctype: "string"
		}, {
		    name: "style",
		    group: "外观",
		    ctype: "string"
		}
    ]
})
xds.Registry.register(xds.types.vmdMenuItem)
xds.vmdMenuItem = Ext.extend(Ext.menu.Menu, {
    initComponent: function () {

        xds.vmdMenuItem.superclass.initComponent.apply(this, arguments);

    }

});
Ext.reg("xdsmenuitem", xds.vmdMenuItem);

xds.types.vmdMenuSeparator = Ext.extend(xds.Component, {
    cid: "vmdMenuSeparator",
    category: "Menu",
    defaultName: "&lt;menuSeparator&gt;",
    text: "menuSeparator(分割线)",
    dtype: "xdsmenuseparator",
    //这里的xtype主要是为了代码显示的类型，本身无任何作用
    xtype: "menuseparator",
    xcls: "Ext.menu.Separator",
    iconCls: "icon-separator",
    naming: "hwSeparator",
    //isInvisible: true,
    //控制是否可以拖拽
    isResizable: function (a, b) {
        return false
    },
    isContainer: false,
    isValidParent: function (a) {
        //应该递归查找
        return !a || a.cid == "vmdMenu";
    },
    filmCls: "el-film-nolabel",
    //默认属性设置	
    defaultConfig: {

    },
    configs: [
          {
              name: "cls",
              group: "外观",
              ctype: "string"
          }, {
              name: "hidden",
              group: "外观",
              ctype: "boolean"
          }, {
              name: "id",
              group: "设计",
              ctype: "string"
          }, {
              name: "style",
              group: "外观",
              ctype: "string"
          }
    ]
})
xds.Registry.register(xds.types.vmdMenuSeparator)
xds.vmdMenuSeparator = Ext.extend(Ext.menu.Separator, {});
Ext.reg("xdsmenuseparator", xds.vmdMenuSeparator);

//资源组件
xds.rescsss = Ext.extend(xds.Component, {
    cid: 'vmdrescsss',
    category: "样式根节点(隐藏不可用)",
    defaultName: '样式',
    iconCls: 'res-css',
    isInvisible: true,
    isContainer: true,
    validChildTypes: ["rescss"],
    isValidParent: function (a) {
        return !a
    }
})

xds.Registry.register(xds.rescsss);

xds.rescss = Ext.extend(xds.Component, {
    cid: 'rescss',
    category: "",
    defaultName: 'css',
    iconCls: 'res-file',
    isInvisible: true,
    isValidParent: function (a) {
        if (a.cid != 'vmdrescsss') return !a;

    },
	 nodedblClick:function(node,e){
		  xds.vmd.openUxControllerjs(this);
	 }

})
xds.Registry.register(xds.rescss);

xds.resjss = Ext.extend(xds.Component, {
    cid: 'vmdresjss',
    category: "脚本根节点(隐藏不可用)",
    defaultName: '脚本',
    iconCls: 'res-js',
    isInvisible: true,
    isContainer: true,
    nextid: 0,
    validChildTypes: ["resjs"],

    isValidParent: function (a) {
        return !a
    }
})

xds.Registry.register(xds.resjss);

xds.resjs = Ext.extend(xds.Component, {
    cid: 'resjs',
    category: "",
    defaultName: 'js',
    iconCls: 'res-file',
    isInvisible: true,
    isValidParent: function (a) {
        if (a.cid != 'vmdresjss') return !a;
    },
	 nodedblClick:function(node,e){
		  xds.vmd.openUxControllerjs(this);
	 }

})
xds.Registry.register(xds.resjs);

xds.resimgs = Ext.extend(xds.Component, {
    cid: 'vmdresimgs',
    category: "图片根节点(隐藏不可用)",
    defaultName: '图片',
    iconCls: 'res-img2',
    isInvisible: true,
    isContainer: true,
    nextid: 0,
    validChildTypes: ["resimg"],

    isValidParent: function (a) {
        return !a
    }
})

xds.Registry.register(xds.resimgs);

xds.resimg = Ext.extend(xds.Component, {
    cid: 'resimg',
    category: "",
    defaultName: 'img',
    iconCls: 'res-file',
    naming: "hwImg",
    defaultName: "&lt;img&gt;",
    dtype: "xdsimg",
    //这里的xtype主要是为了代码显示的类型，本身无任何作用
    xtype: "vmd.img",
    text: "testtest",
    dtype: "xdsimg",
    xcls: "vmd.comp.Img",
    isContainer: false,
    isInvisible: true,
    initConfig: function (b, a) {
        //var that = this;
        //if (!that.userConfig.src) {
        //    var curDragNode = xds.resource.curDragNode;
        //    var nodeData = curDragNode._data;
        //    if (nodeData) {
        //        var path = "{" + nodeData.servName + "}" + "/" + nodeData.path;
        //        //默认拖拽路径
        //        that.userConfig.src = path;
        //    }
        //}

    },
    //自定义拖拽
    isValidDrop: function (a) {
        return !a || a.cid == "container" || a.cid == "vmdImg"
    },
    ddPropsMap: {
        vmdImg: "src",
        container: "backgroundImage"
    }


})
xds.Registry.register(xds.resimg);



xds.vmdDataPre = Ext.extend(xds.vmdButton, {
	cid: "vmdDataPre",
	category: "通用录入",
	defaultName: "&lt;vmdDataPre&gt;",
	text: "dataPre(数据准备)",
	dtype: "vmd.dataPre",
	//这里的xtype主要是为了代码显示的类型，本身无任何作用
	xtype: "vmd.dataPre",
	xcls: "vmd.comp.DataPre",
	//控制是否可以拖拽
	isResizable: function(a, b) {
		//a为上下左右的位置方向
		return false;
	},
	naming: "hwDataPro",
	isContainer: false,	
	defaultConfig: {
        text: "数据准备",
        type: "(none)",
        size: "small"
	},
	//属性设置
	configs: [{
			name: "text",
			group: "外观",
			ctype: "string"
		}, {
			name: "cls",
			group: "外观",
			ctype: "string"
		}, {
			name: "iconcls",
			group: "外观",
			ctype: "string"
		}, {
			name: "disabled",
			group: "外观",
			ctype: "boolean"
		}, {
			name: "hidden",
			group: "外观",
			ctype: "boolean"
		}, {
			name: "id",
			group: "设计",
			ctype: "string"
		}, {
			name: "style",
			group: "外观",
			ctype: "string"
		}, {
			name: "width",
			group: "外观",
			ctype: "number"
		}, {
			name: "height",
			group: "外观",
			ctype: "number"
		}, {
			name: "size",
			group: "外观",
			ctype: "string",
			editor: "options",
			options: ["(none)", "mini", "small", "large"]
		}, {
			name: "type",
			group: "外观",
			ctype: "string",
			editor: "options",
			options: ["(none)", "primary", "success", "warning", "danger", "info", "text"]
		},
		{
			name: "icon",
			group: "外观",
			ctype: "string",
			editor: "options",
			options: ["(none)", "search", "success", "plus", "picture", "star-off", "close", "loading", "setting", "delete",
				"edit", "edit-outline"
			],
			edConfig: {
				editable: true,
				forceSelection: false
			}
		},{
		name: "beforeDataPre",
		group: "事件",
		editor: "ace",
		ctype: "string",
		params: "e"
	}, {
		name: "afterDataPre",
		group: "事件",
		editor: "ace",
		ctype: "string",
		params: "e"
	}, {
		name: "dateInput",
		group: "配置",
		ctype: "string",
		editor: "options",
		edConfig: {
			cid: "vmdDataInput"
		}
	}, {
		name: "store",
		group: "配置",
		ctype: "string",
		editor: "options",
		edConfig: {
			type: "store"
		}
	}, {
		name: "dataConfig",
		group: "配置",
		ctype: "string",
		editor: "defineWindow",
		edConfig: {
			url: getVirtualPath() + '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwRZz6ri7C/hw4eef9124.html',
			height: 600,
			width: 800,
			title: '数据准备配置'
		}
	}]
})
xds.Registry.register(xds.vmdDataPre)




xds.vmdDataInput = Ext.extend(xds.Component, {
	cid: "vmdDataInput",
	category: "通用录入",
	defaultName: "&lt;datainput&gt;",
	text: "datainput(采集录入)",
	dtype: "vmd.design.datainput",
	//这里的xtype主要是为了代码显示的类型，本身无任何作用
	xtype: "vmd.datainput",
	xcls: "vmd.comp.DataInput",
	iconCls: "icon-datainput",
	//控制是否可以拖拽
	isResizable: function(a, b) {
		//a为上下左右的位置方向
		return true;
	},
	naming: "hwDataInput",
	isContainer: false,
	isPropPanel: true, //是否是属性面板
	requireJs: [
		"js/Datainput.js", "lib/express/complete.js", "report/js/hwreport_core.js"
	], //"lib/dhtmlx/sources/dhtmlxGrid/codebase/dhtmlxgrid.js",
	//是否显示右下角的组件说明
	//filmCls: "el-film-nolabel",
	//默认属性设置
	defaultConfig: {
		height: 600,
		width: 800
	},
	//属性设置
	isPropPanel: true,
	nodeclick: function() {
		if (xds.eastlayout && xds.eastlayout.activeSettings) {
			xds.eastlayout.activeSettings('ContentFrame', '300', '通用录入', function(dataInputSetting) {
				xds.eastlayout.dataInputSetting = dataInputSetting;
				dataInputSetting.setValue();
			});
		}
	}, //2019.7.25颜克航宇点击组件树节点出现设置界面
	configs: [{
		name: "gridrowidchange",
		group: "事件",
		editor: "ace",
		ctype: "string",
		params: "e"

	}, {
		name: "gridrowselect",
		group: "事件",
		editor: "ace",
		ctype: "string",
		params: "e"

	}, {
		name: "cls",
		group: "外观",
		ctype: "string"
	}, {
		name: "disabled",
		group: "外观",
		ctype: "boolean"
	}, {
		name: "hidden",
		group: "外观",
		ctype: "boolean"
	}, {
		name: "id",
		group: "设计",
		ctype: "string"
	}, {
		name: "style",
		group: "外观",
		ctype: "string"
	}, {
		name: "width",
		group: "外观",
		ctype: "number"
	}, {
		name: "height",
		group: "外观",
		ctype: "number"
	}, {
		name: "inputConfig",
		group: "外观",
		ctype: "string",
		hide: true
	}],
	initConfig: function(b, a) {
		//初始化默认属性设置
	},
	onFilmDblClick: function(b) {
		//双击值编辑功能  
		var a = this.getExtComponent();
	},
	onFilmClick: function(b) {
		if (xds.eastlayout && xds.eastlayout.activeSettings) {
			xds.eastlayout.activeSettings('ContentFrame', '300', '通用录入', function(dataInputSetting) {
				xds.eastlayout.dataInputSetting = dataInputSetting;
				dataInputSetting.setValue();
			});
		}
	}
});

xds.Registry.register(xds.vmdDataInput)
//设计模式
Ext.define('vmd.design.Datainput', {
	extend: 'Ext.BoxComponent',
	xtype: 'vmd.design.datainput',
	requires: xds.vmd.getCmpRequires(["vmd.ux.DataInputOperateBar$1.0$DataInputOperateBar", "vmd.ux.DataInputNavBar$1.0$DataInputNavBar"]),
	displayMode: 'topbottom',
	isShowGrid: true,
	isShowForm: true,
	isShowStatus: false,
	isShowToolbar: true,
	isShowNavBar: true,
	isShowEditBar: true,
	toolbarHeight: 45,
	statusHeight: 30,
	initComponent: function() {
		this.callParent(arguments);
	},
	onRender: function(ct, positon) {
		this.defaultInputConfig = JSON.stringify({
			layout: {
				displayMode: "style1",
				isShowGrid: true,
				isShowForm: true,
				isShowNavigation: true,
				isShowOperation: true,
				isShowStatistics: true
			},
			form: {
				settings: {
					storeName: "Dt1",
					columns: 3,
					fields: []
				},
				events: {}
			},
			grid: {
				settings: {
					storeName: "Dt1",
					fields: []
				},
				events: {}
			},
			navigation: {},
			operation: {},
			statistics: {}
		})


		var ICStr = this.inputConfig || this.defaultInputConfig
		
		var IC =Ext.isObject(ICStr)?ICStr:JSON.parse(ICStr);
		var me = this;
		var layType = IC.layout.displayMode || "style1";
		var layInfo = IC.layout;
		this.isShowGrid = layInfo.isShowGrid;
		this.isShowForm = layInfo.isShowForm;
		this.isShowStatus = layInfo.isShowStatistics;
		this.isShowToolbar = (layInfo.isShowOperation || layInfo.isShowNavigation);
		this.isShowNavBar = layInfo.isShowNavigation;
		this.isShowEditBar = layInfo.isShowOperation;
		//网格上 自由下
		var gridFormCls = []
		//处理默认布局样式数组
		if (this.isShowGrid)
			gridFormCls.push({
				cls: 'vmd-datainput-grid'
			})
		if (this.isShowStatus)
			gridFormCls.push({
				cls: 'vmd-datainput-status'
			})
		if (this.isShowForm)
			gridFormCls.push({
				cls: 'vmd-datainput-form'
			})
		if (this.isShowToolbar)
			gridFormCls.push({
				cls: 'vmd-datainput-toolbar'
			})
		if (layType == "style2") {
			gridFormCls = []
			if (this.isShowForm)
				gridFormCls.push({
					cls: 'vmd-datainput-form'
				})
			if (this.isShowGrid)
				gridFormCls.push({
					cls: 'vmd-datainput-grid'
				})
			if (this.isShowStatus)
				gridFormCls.push({
					cls: 'vmd-datainput-status'
				})
			if (this.isShowToolbar)
				gridFormCls.push({
					cls: 'vmd-datainput-toolbar'
				})
		}

		if (!this.el) {
			this.autoEl = {
				cls: 'vmd-datainput',
				cn: gridFormCls
			}
			this.callParent(arguments);
			//网格上 自由下
			this.gridEl = this.isShowGrid ? this.el.child('.vmd-datainput-grid') : null;
			this.statusEl = this.isShowStatus ? this.el.child('.vmd-datainput-status') : null;
			this.formEl = this.isShowForm ? this.el.child('.vmd-datainput-form') : null;
			this.toolbarEl = this.isShowToolbar ? this.el.child('.vmd-datainput-toolbar') : null;
			//初始化
			this.init();
		}
	},
	init: function() {
		//初始化自由格式		
		if (this.isShowForm)
			this._initForm();
		//初始化网格
		if (this.isShowGrid)
			this._initGrid();
		//初始化状态栏
		if (this.isShowStatus)
			this._initStatus();
		//初始化工具栏
		if (this.isShowToolbar)
			this._initToolbar();
	},

	//private
	_initGrid: function() {
		var header = "Package,Version,Maintainer";
		var width = "";
			var headerStyle = [];
		var _setGridLayout = function(gridSettings) {
			var headerArr = [];
			var widthArr = [];
			var dWidth = "100";
			var fileConfig = gridSettings.fields || [];
			for (var i = 0; i < fileConfig.length; i++) {
				var cell = fileConfig[i];
				var cellDic = cell.dictionary || {};
				var cellCon = cell.fieldsConfig || {};
				if (cellCon) {
					headerArr.push(cellCon.name || cellCon.id || cellDic.cname || cellDic.name)
					widthArr.push(cellCon.width || "100")
				} else {
					headerArr.push(cellDic.cname || cellDic.name)
					widthArr.push("100")
				}
				
					if(cellDic.primary=="Y")
						headerStyle.push("color:red");
					else if(cellDic.nullable!="Y")
						headerStyle.push("color:blue");
					else headerStyle.push(" ");
				
			}
			header = headerArr.join(",");
			
			width = widthArr.join(",");
		}
		var ICStr = this.inputConfig || this.defaultInputConfig
		var IC =Ext.isObject(ICStr)?ICStr:JSON.parse(ICStr);
		var fset = IC.form ? IC.grid.settings : (JSON.parse(this.defaultInputConfig).grid.settings);
		_setGridLayout(fset);
		
		if (!this.grid)
			this.grid = new dhtmlXGridObject(this.gridEl.dom);
		this.grid.setImagePath("../../../codebase/imgs/");
		this.grid.setHeader(header,null,headerStyle);
		this.grid.setInitWidths(width);
		this.grid.init();
		if(!header)
		{
			var tipgrid_div = document.createElement('div');
			tipgrid_div.innerHTML = '<div style="text-align:center;font-size:30px;color:#c5c5c5">网格格式区域</div>';
			this.gridEl.dom.firstElementChild.style.border="0px"
			this.gridEl.insertFirst(tipgrid_div)			
		}
	},
	//private
	_initForm: function(w, h) {
		var formData = [];
		var w = w || this.width;
		var _setFromLayout = function(formSettings) {
			var cols = 3; //列数
			var colWidth; //每列宽
			var unitWidth = 50; //单位的宽度
			var labelWidth = 80; //标签的的宽度
			var labelHeight = 20; //标签的高度
			if (formSettings)
				cols = formSettings.columns || "3";
			//处理列的最小列数			如果小于最小宽度150  则不按照设置的列数显示	
			if (cols >= ((w - 80) / 150))
				cols = parseInt((w - 80) / 150)
			//设置每列宽 总宽度 - 左边距20-右侧20-每列的便宜*列数
			colWidth = (w - 20 - 20 - (cols * 9)) / cols;
			var inputWidth = colWidth - labelWidth - unitWidth;
			//获取自耦段信息  并设置当前行，当前行的第几列
			var fileConfig = formSettings.fields || [];
			var rowNum = 0; //当前行
			var rowColNum = 0; //当前行的第几列
			for (var i = 0; i < fileConfig.length; i++) {
				var cell = fileConfig[i];
				var cellDic = cell.dictionary || {};
				var cellCon = cell.fieldsConfig || {};
				//每行的第一列，创建列的信息
				if (rowColNum == 0) {
					var rowInfo = {};
					rowInfo.type = "label";
					rowInfo.labelHeight = 0;
					rowInfo.inputHeight = 0;
					rowInfo.offsetTop = 0;
					rowInfo.list = [];				
					if(cellDic.primary=="Y")
						rowInfo.style = "color:red";
					else if(cellDic.nullable!="Y")
						rowInfo.style = "color:blue";
						
					formData.push(rowInfo);
				}
				//获取跨行 跨列
				var fixCol = cellCon.fixColumns || 1;
				var fixRow = cellCon.fixRows || 1;
				//每列内容信息  文本 录入区
				var childInfo = {
					type:  "input",
					name: cellCon.id,
					labelWidth: labelWidth,
					labelHeight: labelHeight,
					label: (cellCon.name ? cellCon.name : (cellDic.cname || cellDic.name)) + ":",
					inputWidth: inputWidth
				};
				//单位
				var childInfoUnit = {
					type: "label",
					labelWidth: unitWidth,
					labelHeight: labelHeight,
					label: cellCon.unit || "",
					labelLeft: 0
				};
				//是计算显示长度  如果跨的列数大于设置的列数  则跨列数=列数，即整行显示
				if (fixCol >= cols)
					fixCol = cols
				if (fixRow > 1) //跨行数大于1   则将置为整行显示，在设置显示的行数 
					fixCol = cols
				//设置跨行跨列后的区域大小 
				var newInputWidth = fixCol * colWidth - labelWidth - unitWidth;
				childInfo.inputWidth = newInputWidth
				var newInputHeight = labelHeight * fixRow;
				childInfo.rows = fixRow //支持 文本、富文本  的多行显示				
				//判断在改行里边继续添加，总列数是否超出，超出则添加该列再创建一列；未超出则在改行添加
				if ((rowColNum + fixCol) >= cols && fixCol > 1) {
					if ((rowColNum + fixCol) > cols) {
						var rowInfo = {};
						rowInfo.type = "label";
						rowInfo.labelHeight = 0;
						rowInfo.inputHeight = 0;
						rowInfo.offsetTop = 0;
						rowInfo.list = [];
						formData.push(rowInfo);
						rowColNum = 0;
						rowNum++;
					}
				}
				//添加每行的子列信息
				if (rowColNum > 0)
					formData[rowNum].list.push({
						type: "newcolumn"
					});
				formData[rowNum].list.push(childInfo);
				formData[rowNum].list.push({
					type: "newcolumn"
				});
				formData[rowNum].list.push(childInfoUnit);
				rowColNum += fixCol;
				//如果列数超出设置的列数  设置下行重新开始
				if (rowColNum >= cols) {
					rowNum++
					rowColNum = 0
				}
			}
		}
		var ICStr = this.inputConfig || this.defaultInputConfig
		var IC =Ext.isObject(ICStr)?ICStr:JSON.parse(ICStr);
		var fset = IC.form ? IC.form.settings : (JSON.parse(this.defaultInputConfig).form.settings);
		_setFromLayout(fset);
		if (this.form) {
			if (this.formEl.dom.children.length > 0)
				this.formEl.dom.children[0].remove()
		}
		this.formEl.dom.style.overflow = "auto";
			this.form = new dhtmlXForm(this.formEl.dom, formData);
			Ext.fly(this.form.cont).addClass('vmd-datainput-form');		
		if(formData.length<=0)
		{
			var tipForm_div = document.createElement('div');
			tipForm_div.innerHTML = '<div style="text-align:center;font-size:30px;color:#c5c5c5">自由格式区域</div>';
			this.formEl.insertFirst(tipForm_div)			
		}
	},
	//private
	_initToolbar: function() {
		if (!this.isShowToolbar)
			return;
		var ICStr = this.inputConfig || this.defaultInputConfig
		var IC =Ext.isObject(ICStr)?ICStr:JSON.parse(ICStr);
		var navset = IC.navigation || {};
		var editset = IC.operation || {};
		this.toolbarEl.setHeight(this.toolbarHeight)
		if (this.isShowNavBar && vmd.ux.DataInputNavBar) {
			var navBar = new vmd.ux.DataInputNavBar({
				renderTo: this.toolbarEl.dom,
				style: "float: left;",
				startDisplay: navset.first == undefined ? false : !navset.first,
				forwardDisplay: navset.prev == undefined ? false : !navset.prev,
				nextDisplay: navset.next == undefined ? false : !navset.next,
				endDisplay: navset.last == undefined ? false : !navset.last,
				positionDisplay: navset.pageNum == undefined ? false : !navset.pageNum
			})
		}
		if (this.isShowEditBar && vmd.ux.DataInputOperateBar) {
			var editBar = new vmd.ux.DataInputOperateBar({
				renderTo: this.toolbarEl.dom,
				style: "float: right;",
				addDisplay: editset.addbar == undefined ? false : !editset.addbar,
				deleteDisplay: editset.deletebar == undefined ? false : !editset.deletebar,
				saveDisplay: editset.savebar == undefined ? false : !editset.savebar,
				printDisplay: editset.printbar == undefined ? false : !editset.printbar,
				importDisplay: editset.exData == undefined ? false : !editset.exData
			})
		}
	},
	//private
	_initStatus: function() {
		if (!this.isShowStatus) return;
		this.statusEl.setHeight(this.statusHeight)		
			var tipStatus_div = document.createElement('div');
			tipStatus_div.innerHTML = '<div style="text-align:center;font-size:25px;color:#c5c5c5">统计栏区域</div>';
			this.statusEl.insertFirst(tipStatus_div)	
	},
	afterRender: function(ct) {
		this.callParent(arguments)
	},
	//private
	_resize: function(w, h) {
		if (this.isShowStatus) h = h - this.statusHeight;
		if (this.isShowToolbar) h = h - this.toolbarHeight;

		if (this.isShowForm && this.isShowGrid) {
			this.gridEl.setHeight(Math.floor(h / 2));
			this.gridEl.setWidth(w);
			this.grid.setSizes();
			this.formEl.setHeight(Math.ceil(h / 2));
			this.formEl.setWidth(w);
			this._initForm(w, h / 2)
		} else if (this.isShowGrid && !this.isShowForm) {
			this.gridEl.setHeight(Math.floor(h));
			this.gridEl.setWidth(w);
			this.grid.setSizes();
		} else if (this.isShowForm && !this.isShowGrid) {
			this.formEl.setHeight(Math.ceil(h));
			this.formEl.setWidth(w);
			this._initForm(w, h)
		}
	},

	onResize: function(w, h) {
		if (this.ownerCt.initialConfig.layout == 'fit') {}
		this._resize(w, h);
	}
})




