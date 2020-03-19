/******************************************************************
 ** 文件名: Report.js
 ** Copyright (c) 2017-2019 汉威公司技术研究院
 ** 创建人:马飞
 ** 日 期:2019-08-26
 ** 修改人:颜克航宇
 ** 日 期:2018-08-26  增加了对象访问方式,先实例化对象,后使用的方式
 ** 描 述:报表设计模式创建及设计时组件构建
 ** 版 本:1.0
 ******************************************************************/
var hwRaoUrl;
//设计模式报表对象拆分
Ext.define('ide.ext.Report', {
	constructor: function() {}
})

if (typeof xds != "undefined") xds.vmdReport = Ext.extend(xds.Component, {
	cid: "vmdReport",
	category: "vmdReport组件",
	defaultName: "&lt;hwreport&gt;",
	text: "hwreport(报表)",
	dtype: "vmd.dreport",
	//这里的xtype主要是为了代码显示的类型，本身无任何作用
	// xtype: "vmd.report",
	xtype: "vmd.report2_2",
	xcls: "vmd.report2_2",
	iconCls: "icon-report",
	version: "2_2",
	isCanvasShow: true,
	ctype: 'vmd.creport',
	removeComponent: function(callback) {
		callback();
		delReport();
		return true
	},
	isResizable: function(a, b) {
		//a为上下左右的位置方向
		return true
	},
	nodeclick: function() {
		xds.eastlayout.activeSettings2('ContentProperty', '', this.id + '报表', function(reportInst) {
			xds.eastlayout.reportInst = reportInst;
		});

		var activeComponent = this.getExtComponent();
		if (activeComponent) {
			window.sheetHot = activeComponent.grid;
		}

	},
	naming: "hwreport",
	isContainer: false,
	tips: '   双击进入编辑状态',
	//是否显示右下角的组件说明
	filmCls: "el-film-middle",
	isValidParent: function(a) {

		return !a || a.cid == "panel";
	},
	//默认属性设置
	defaultConfig: {
		text: "hwreport",
		relativepath: "Resources//Report",
		align: "center",
		fillReport: false,
		autoHeight: false,
		autoWidth: false,
		isTitleFloat: true,
		loadMode: "nomal",
		nousedataset: false,
		isServer: true,
		isSelectStates: true,
		columnResize: false,
		ocx_version: "1,2,2,0",
		rptVersion: "2.2"
	},
	//属性设置
	configs: [{
		name: "rowselect",
		group: "事件",
		editor: "ace",
		ctype: "string",
		params: "rId"
	}, {
		name: "beforerowdeleted",
		group: "事件",
		editor: "ace",
		ctype: "string",
		params: "rId"
	}, {
		name: "rowdeleted",
		group: "事件",
		editor: "ace",
		ctype: "string",
		params: "rId"
	}, {
		name: "rowadded",
		group: "事件",
		editor: "ace",
		ctype: "string",
		params: "newId"
	}, {
		name: "subreportopen",
		group: "事件",
		editor: "ace",
		ctype: "string",
		params: "rId,cInd,sub"
	}, {
		name: "subreportclose",
		group: "事件",
		editor: "ace",
		ctype: "string",
		params: "rId,cInd,sub"
	}, {
		name: "beforeImpDatas",
		group: "事件",
		editor: "ace",
		ctype: "string",
		params: "datas"
	}, {
		name: "afterImpDates",
		group: "事件",
		editor: "ace",
		ctype: "string",
		params: "datas"
	}, {
		name: "fillReport",
		group: "外观",
		ctype: "boolean",
		hide: true
	}, {
		name: "configPath",
		group: "外观",
		ctype: "string",
		hide: true
	}, {
		name: "path",
		group: "外观",
		ctype: "string",
		// editor: "file",
		readOnly: true,
		hide: (function() {
			return xds.vmd.isDisableProp()
		}()),
		edConfig: {
			url: function() {
				var host = vmd.projectInfo ? (vmd.projectInfo.reportIp || vmdSettings.vmdReportIp || vmdSettings.dataServiceIp) : vmdSettings.vmdReportIp || vmdSettings.dataServiceIp;
				var hwRao = new HwRao(host, "report");
				var repath = "report/" + getUrlParam("path");
				repath = repath.substring(0, repath.indexOf(".vmd"));
				return hwRao.getUploadUrl(repath);
			},
			fileid: 'file',
			callback: function(vmdreport) {
				vmdreport.component.setConfig("isWebEdit", false);
				var repath = "report/" + getUrlParam("path");
				repath = repath.substring(0, repath.indexOf(".vmd"));
				vmdreport.component.setConfig("relativepath", repath);
			}
		}
	}, {
		name: "isServer",
		group: "外观",
		ctype: "boolean"
	}, {
		name: "ocx_version",
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
		name: "relativepath",
		group: "外观",
		ctype: "string"
	}, {
		name: "dsnames",
		group: "外观",
		ctype: "string",
		readOnly: true
	}, {
		name: "title",
		group: "外观",
		editor: "customString",
		ctype: "string"
	}, {
		name: "isTitleFloat",
		group: "外观",
		ctype: "boolean",
		value: true
	}, {
		name: "loadMode",
		group: "外观",
		ctype: "string",
		editor: "options",
		options: ["nomal", "smart", "paging"]
	}, {
		name: "loadNumber",
		group: "外观",
		ctype: "number"
	}, {
		name: "subrptds",
		group: "外观",
		ctype: "string",
		readOnly: true
	}, {
		name: "autoHeight",
		group: "外观",
		ctype: "boolean"
	}, {
		name: "autoWidth",
		group: "外观",
		ctype: "boolean"
	}, {
		name: "width",
		group: "外观",
		ctype: "number"
	}, {
		name: "height",
		group: "外观",
		ctype: "number"
	}, {
		name: "nousedataset",
		group: "外观",
		ctype: "boolean",
		hide: true
	}, {
		name: "align",
		group: "外观",
		ctype: "string",
		editor: "options",
		options: ["left", "center", "right"]
	}, {
		name: "isSelectStates",
		group: "外观",
		ctype: "boolean"
	}, {
		name: 'columnResize',
		group: '外观',
		ctype: 'boolean'
	}, {
		name: "rptVersion",
		group: "外观",
		ctype: "string",
		editor: "options",
		options: ["2.2", "2.3"],
		hide: true
	}, {
		name: "rptType",
		group: "外观",
		ctype: "string",
		readOnly: true,
		hide: true
	}, {
		name: "gridConfig",
		group: "外观",
		ctype: "string",
		editor: "defineWindow",
		edConfig: {
			url: getVirtualPath() + '/modules/hw39dc4349/hw9HxTCPqW/hw83848ec4.html',
			height: 485,
			width: 330,
			title: '表格属性设置'
		},
		hide: true
	}],
	initConfig: function(b, a) {
		var me = this;
		//初始化默认属性设置
		//默认fill填充

		if (this.owner) {
			var configs = this.owner.getConfig();
			if (configs.layout != 'fit') {
				this.owner.setConfig('layout', 'fit');
				this.owner.setConfig('x', 0);
				this.owner.setConfig('y', 0);
			}

			//拖拽增加query事件
			var reportId = this.id || 'report';
			var _afterrender = this.userConfig && this.userConfig.afterrender;
			var _funName = reportId + '_afterrender';
			var _eventName = 'function ' + _funName;
			var _newFn = "\n" + _eventName + "(render){\n " + reportId + ".query();\n}";
			if (xds.vmd.events == undefined) xds.vmd.events = '';
			if (!_afterrender) this.setConfig('afterrender', reportId + '_afterrender');
			if (xds.vmd.events.indexOf(_eventName) == -1) xds.vmd.events += _newFn;
		}
	},
	removeComponent: function(callback) {
		xds.vmd.canvaslist.removeKey(this.id);
		if (xds.vmdreportInfo.list) {
			for (var key in xds.vmdreportInfo.list) {
				if (xds.vmdreportInfo.list[key].viewerNode.id == this.id) {
					delete xds.vmdreportInfo.list[key]
					if (window.reportHistory && window.reportHistory[key]) {
						delete window.reportHistory[key]
					}
				}
			}
		}
		callback();
		return true
	},
	setConfig: function(a, b) {
		var oldId = this.id;
		if (a == 'id') {
			//删掉老的
			var cloneNode = xds.vmd.canvaslist.get(oldId);
			//替换新的
			xds.vmd.canvaslist.add(b, cloneNode);
			xds.vmd.canvaslist.removeKey(oldId);

			for (var key in xds && xds.vmdreportInfo && xds.vmdreportInfo.list) {
				if (oldId == key) {
					var clone = Ext.clone(xds.vmdreportInfo.list[key])
					delete xds.vmdreportInfo.list[key];
					xds.vmdreportInfo.list[b] = clone;
				}
			}
			var dcmp = this.getExtComponent();
			dcmp.localSave();
		}
		this.superclass.setConfig.call(this, a, b);
	},
	onFilmDblClick: function(b, iclear) {
		xds.canvasToolbar.enable();
		//双击值编辑功能
		var dcmp = this.getExtComponent();
		var t = document.getElementById("film-for-" + dcmp.viewerNode.id);
		if (t) {
			t.style.display = 'none';
			xds.vmd.hideFilm(dcmp.viewerNode.parentNode);
			var rootId = xds.inspector.root.childNodes[0].id;
			var rootMsk = document.getElementById("film-for-" + rootId);
			Ext.defer(function() {
				if (rootMsk) rootMsk.style.display = 'none';
			}, 100)
		}
		if (iclear) return;
		//显示组件
		//如果有就不删除
		try {
			var reportdom = vmd(dcmp.el.dom).find('img');
			if (reportdom && reportdom.length == 0) {
				this.onFilmDblClick(null, true)
				return
			}
		} catch (ex) {}

		xds.vmd.canvaslist.removeKey(dcmp.viewerNode.id);
		xds.canvas.setComponent2(xds.active.node);
		this.onFilmDblClick(null, true);
	},
	initToolbar: function(toolbar) {
		var report = Ext.getCmp(this.activeCmpId);
		if (!report) return;
		var cid = this.cid;
		var reportToolbar = window.myToolbar;
		if (!reportToolbar) {
			reportToolbar = new ReportToolbar();
			window.myToolbar = reportToolbar;
			var div = document.createElement('div');
			div.innerHTML = reportToolbar.getToolbarTpl();
			toolbar.body.dom.appendChild(div);
			reportToolbar.dom = div;
			//放到工具栏里
			toolbar.put(cid, div);
			reportToolbar.init();
			initExp()

			var maxbtn = document.getElementById('maxium');
			if (maxbtn) {
				//最大化功能
				var canvas = document.getElementById('canvas');

				maxbtn.onclick = function() {
					if (!sheetHot.maxium) {
						var rpt = xds.vmdreportInfo.list[sheetHot_me.viewerNode.id].gridEl.dom;
						sheetHot.maxcontainer = rpt.parentNode;
						sheetHot.maxium = true
						canvas.insertBefore(rpt, canvas.childNodes[0])
						sheetHot.updateSettings({
							height: xds.canvas.body.getHeight(),
							width: xds.canvas.body.getWidth()
						});
						Ext.fly(maxbtn).removeClass('icon-resize-full')
						Ext.fly(maxbtn).addClass('icon-resize-small')
					} else {
						var rpt = canvas.childNodes[0];
						sheetHot.maxcontainer.append(rpt);
						sheetHot.maxium = false
						sheetHot.updateSettings({
							height: sheetHot.maxcontainer.offsetHeight,
							width: sheetHot.maxcontainer.offsetWidth
						});
						Ext.fly(maxbtn).removeClass('icon-resize-small')
						Ext.fly(maxbtn).addClass('icon-resize-full')
					}
				}
			}
			document.body.addEventListener('mousedown', function() {
				if (vmd(arguments[0].srcElement).parents('.toolbar-border-palette').length != 1) {
					$("#toolbar_border_palette").hide();
				}
			})
		}
		toolbar.setActive(cid);
		report.reportToolbar = reportToolbar;
		reportToolbar.bind(report);

	}
});
xds.Registry.register(xds.vmdReport);


//#region vmdReport 
Ext.define("vmd.comp.DesignerReport", {
	extend: "Ext.BoxComponent",
	xtype: 'vmd.dreport',
	/**
	 * Read-only. True if this button is disabled
	 * @type Boolean
	 */
	disabled: false,
	/*
	 *type 种类有primary,success,warning,danger,info,text
	 */
	type: 'default',
	clickEvent: 'click',
	/**
	 * @cfg {Boolean} handleMouseEvents
	 * False to disable visual cues on mouseover, mouseout and mousedown (defaults to true)
	 */
	handleMouseEvents: true,
	/**
	 *@cfg {large、small、mini}
	 *默认为空，正常模式
	 */
	size: '',
	constructor: function(opts) {
		if (Ext.isObject(opts)) {
			this.isNestedTable = opts.isNes;
			this.nestedInitInfo = opts.iinfo;
		}
		this.callParent(arguments);
	},

	setSubRptInfo: function(initInfo, col, resultInfo, rr, colid) {
		//grid.nestedTableArray
		var subInfo = {};
		var index = parseInt(col.subrptindex);
		if (resultInfo.subs && resultInfo.subs[index]) {
			subInfo.sr = rr;
			subInfo.sc = colid;
			subInfo.info = {};
			subInfo.info.main = resultInfo.subs[index];
			if (col.colspan && parseInt(col.colspan) > 1 && col.rowspan && parseInt(col.rowspan) > 1) {
				subInfo.er = rr + parseInt(col.rowspan) - 1;
				subInfo.ec = colid + parseInt(col.colspan) - 1;
			} else if (col.colspan && parseInt(col.colspan) > 1) {
				subInfo.er = rr;
				subInfo.ec = colid + parseInt(col.colspan) - 1;
			} else if (col.rowspan && parseInt(col.rowspan) > 1) {
				subInfo.er = rr + parseInt(col.rowspan) - 1;
				subInfo.ec = colid;
			} else {
				subInfo.er = rr;
				subInfo.ec = colid;
			}
			subInfo.qtb_tableName = resultInfo.subs[index].name;
			initInfo.nestedTableArray.push(subInfo);
		}
	},
	onRender: function(ct, position) {
		var me = this;
		if (!xds.vmdreportInfo) xds.vmdreportInfo = {};
		if (!(xds.vmdreportInfo && xds.vmdreportInfo.list)) xds.vmdreportInfo.list = {};
		if (!xds.vmdreportInfo.canvaslist) xds.vmdreportInfo.canvaslist = {};

		// if (xds.vmd.canvaslist.get(me.viewerNode.id)&&(!this.path||(this.path&&this.path.indexOf('xml')>0)) ){
		if (xds.vmd.canvaslist.get(me.viewerNode.id) && (!this.path || (this.path && this.path.indexOf('xml') < 0))) {
			this.autoEl = {
				cls: 'vmd-report',
				cn: [{
					cls: 'vmd-report-grid'
				}]
			}
			this.callParent(arguments);
			this.reportcanvas = this.el.first();
			var canvas_base64 = xds.vmd.canvaslist.get(me.viewerNode.id)
			var img = new Image();
			img.src = canvas_base64;
			this.reportcanvas.appendChild(img)
			this.canvas = xds.vmd.canvaslist.get(me.viewerNode.id)
			this.canvasPic = img;
		} else if (!this.el) {
			this.autoEl = {
				cls: 'vmd-report',
				cn: [{
					cls: 'vmd-report-toolCt',
					cn: [{
						cls: 'vmd-report-toolbar'
					}, {
						cls: 'vmd-report-exp'
					}]
				}, {
					cls: 'vmd-report-grid'
				}, ]
			}
			this.callParent(arguments);
			this.toolCtEl = this.el.first();
			this.toolbarEl = this.toolCtEl.first();
			this.expEl = this.toolCtEl.last();
			this.gridEl = this.el.last();

			if (this.isNestedTable) {
				//引用designer/report.js
				//顶部工具条
				this.reportToolbar = new ReportToolbar();
				this.toolbarEl.dom.innerHTML = this.reportToolbar.getToolbarTpl();
				//表达式编辑区
				new initWebEditArea(this);
			}

			me.isWebEdit = true;
			var exits = false;
			xds.vmdreportInfo.list[me.viewerNode.id] = me;
			var done = false;
			if (this.isNestedTable) {
				if (this.nestedInitInfo) {
					var initInfo = {};
					this.loadWebModelOnClould(this.nestedInitInfo, initInfo)
					this.initHdTablee(initInfo);
				} else {
					this.initHdTablee(null)
				}
			} else {
				if (this && this.path && this.path.indexOf(".xml") > -1) {
					this.xmlModelParse(this);
					done = true;
				} else
				if (window.reportHistory && Object.keys(window.reportHistory).length > 0 && !done) {
					for (var key in reportHistory) {
						if (key == me.viewerNode.id) {

							var id = this.viewerNode.id;
							var list = xds.vmdreportInfo.list;

							for (var key in list) {
								if (key == id) {
									var reportInfo = window.reportHistory[id];
									var initInfo = {};
									this.loadWebModelOnClould(reportInfo, initInfo)
									this.initHdTablee(initInfo);
								}
							}
							var flag = true;
							for (var t in list) {
								for (var p in xds.inspector.nodeHash) {
									if (t == p) {
										flag = false;
										break;
									}
								}
								if (flag) delete list[t];
							}
							exits = true;
							// var et = new Date().getTime();
							// console.log('本地加载' + this.viewerNode.id + '使用' + (et - st) + 'ms')
						}
					}
					if (!exits) {
						if (this && this.path && this.path.indexOf(".xml") > -1) {
							this.xmlModelParse(this);
						} else if (this && this.path && this.path.indexOf(".json") > -1) {
							this.jsonModelParse(this);
						} else {
							//空表
							this.initHdTable();
						}
					}
				} else {
					if (this && this.path && this.path.indexOf(".json") > -1) {
						this.jsonModelParse(this);
					} else {
						//空表
						this.initHdTable();
					}
				}
			}

			//注册事件
			this.onEventsReg(me, me.grid);
			if (this.isNestedTable) {
				me.grid.rootScope = me;

				//初始化工具条
				Ext.defer(function() {
					me.reportToolbar.init({
						hot: me.grid
					});
					me.grid.toolbar = me.reportToolbar.toolbar
				}, 50)
			}
		}
		this.setDrag();

		this.convertPic(me);

		// 模板信息保存
		xds.vmd.saveReport = function(callBack) {
			var rptCount = 0;
            if(Object.keys(xds.vmdreportInfo.list)&&Object.keys(xds.vmdreportInfo.list).length>0){
				for (var key in xds.vmdreportInfo.list) {
					var me = xds.vmdreportInfo.list[key];
					if (!me.isWebEdit && me.path && me.path.indexOf(".json") == -1) {
						if (callBack) {
							xds.project.save(null, true)
						} else {
							xds.project.save();
						}
						if (callBack) {
							callBack();
						}
						return;
					}
					me.path = getUrlParam("name") + "_" + me.viewerNode.id + ".json";
					var modetype = getUrlParam("type");
					if (modetype == "ux") {
						me.relativepath = 'components/ux/' + getUrlParam("name") + "/" + getUrlParam("ver")
					} else {
						var repath = "report/" + getUrlParam("path");
						repath = repath.substring(0, repath.indexOf(".vmd"));
						me.relativepath = repath;
					}

					var reportInfo;
					if (me && me.grid) {
						reportInfo = me.grid.saveRptInfo(me.viewerNode.id);
					} else {
						if (window.reportHistory) reportInfo = reportHistory[me.viewerNode.id];
					}

					if (reportInfo && reportInfo.main) {
						if (me.config) {
							reportInfo.main.config = me.config;
						}
						me.viewerNode.component.setConfig("path", me.path);
						me.viewerNode.component.setConfig("relativepath", me.relativepath);
						me.viewerNode.component.setConfig("isWebEdit", true);
						if (reportInfo.main.body && reportInfo.main.body.sections && reportInfo.main.body.sections.length == 1) {
							var sr = reportInfo.main.body.sections[0].startrow;
							var er = reportInfo.main.body.sections[0].endrow;
							var sc = reportInfo.main.body.sections[0].startcol;
							var ec = reportInfo.main.body.sections[0].endcol;
							var fc = reportInfo.main.body.sections[0].data && reportInfo.main.body.sections[0].data[0] && reportInfo.main.body.sections[0].data[0].cells && reportInfo.main.body.sections[0].data[0].cells[0];
							var fcell = fc && (fc.data || fc.datavalue || fc.showvalue);
							if (sr == er == sc == ec == 1 && !fcell) {
								me.path = "";
								me.relativepath = "";
								me.viewerNode.component.setConfig("path", me.path);
								me.viewerNode.component.setConfig("relativepath", me.relativepath);
								me.viewerNode.component.setConfig("isWebEdit", true);
								if (callBack) {
									xds.project.save(null, true)
								} else {
									xds.project.save();
								}
								if (callBack) {
									callBack();
								}
								return
							}
						}
						if (reportInfo.main.datasource && reportInfo.main.datasource.tables) {
							var datasets = "";
							for (var key in reportInfo.main.datasource.tables) {
								datasets += reportInfo.main.datasource.tables[key].factname + ",";
							}
							datasets = datasets.substring(0, datasets.length - 1);
							if (!me.isDataSetEqual(me.viewerNode.component.getConfig("dsnames").dsnames, datasets)) me.viewerNode.component.setConfig("dsnames", datasets);
						}
						var sc = reportInfo.main.body.sections;

						if (sc && sc.length > 0) {
							if ((sc[0].title && sc[0].title.length > 0) || (sc[0].header && sc[0].header.length > 0) || (sc[0].data && sc[0].data.length > 0)) {
								var filePath = me.relativepath + "/" + me.path;
								var fileContent = Ext.encode(reportInfo);
								// me.hwRao.saveJson(filePath, fileContent, function(res) {
								// 	if (res.isSucceed) {
								// 		var str = Ext.encode(res.data);
								// 		// alert(str);
								// 	}
								// }, function(res) {
								// 	Ext.Msg.alert("错误信息", res.errMsg,
								// 		function() {})
								// });
								var host=vmdSettings.vmdFileServiceIp||vmdSettings.dataServiceIp;
								var hwFao = new HwFao( host, "report");//地址:端口和存储标识(服务管理员分配)
							 //var filepath = file.rptHeaderPath;
							// var content =JSON.stringify(paras);
							 hwFao.write(filePath, fileContent, function (res) {
								 if (res.isSucceed) {
									// var str = JSON.stringify(res.data);
								   
								 } else {
									Ext.Msg.alert("错误信息", res.errMsg,
											function() {})
								 }
							 }, function (res) { alert(res); });
						   
							}
							rptCount++;
							if (rptCount == Object.keys(xds.vmdreportInfo.list).length) {
								if (callBack) {
									xds.project.save(null, true)
								} else {
									xds.project.save();
								}
								if (callBack) {
									callBack();
								}
							}
					} else {
						me.path = "";
						if (callBack) {
							xds.project.save(null, true)
						} else {
							xds.project.save();
						}
						if (callBack) {
							callBack();
						}
						return;
					}
				}
			}
		}else{
			if (callBack) {
				xds.project.save(null, true)
			} else {
				xds.project.save();
			}
			if (callBack) {
				callBack();
			}
			return;
		}	
		}	
	},
	transformDsName: function(dataname) {
		var obj = {}
		var reportid = this.viewerNode.id;
		var storeRoot = xds.vmd.getRootNode("dataset");
		if (typeof storeRoot != 'undefined') {
			storeRoot.eachChild(function(n) {
				var dsname;
				if (n.component && n.component.getConfig()) {
					dsname = n.component.getConfig().dsName;
					if (reportid) {
						if (dsname && dsname.indexOf(reportid) > -1) {
							var indexCount = dsname.indexOf(reportid);
							if (dsname.length > indexCount) {
								dsname = dsname.substring(indexCount + reportid.length + 1);
							}
						}
					}
				}
				if (dataname == n.id || dsname == dataname) {
					var dsi = {};
					if (dsname) dsi.name = dsname;
					dsi.factname = n.id;
					obj.dataname = dsi;
				}
			}, this);
		}
		return obj;
	},
	localSave: function() {
		var list = xds.vmdreportInfo && xds.vmdreportInfo.list;
		if (list) {
			if (typeof window.reportHistory == 'undefined') window.reportHistory = {};
			for (var key in list) {
				if (list[key] && list[key].grid) {
					reportHistory[key] = list[key].grid.saveRptInfo();
				}
			}
		}
	},
	initComponent: function() {
		var host =  vmdSettings.vmdReportIp ;
		this.hwRao = new HwRao(host, "report");
		window.hwRaoUrl = this.hwRao.getUploadUrl(this.relativepath);
		this.callParent();
		this.addEvents(
			/**
			 * @event click
			 * Fires when this button is clicked
			 * @param {Button} this
			 * @param {EventObject} e The click event
			 */
			'click',
			'rowSelect',
			/**
			 * @event mouseout
			 * Fires when the mouse exits the button
			 * @param {Button} this
			 * @param {Event} e The event object
			 */
			'mouseout');

		var me = this;
		!xds.temp.reportevents_componentcopy && xds.on('componentcopy', function(oldNode, newNode) {
				var dealCopyNode = function(newNode) {
					if (newNode && newNode.childNodes) {
						for (var i = 0; i < newNode.childNodes.length; i++) {
							var son = newNode.childNodes[i] || false;
							if (son) {
								if (son.component && son.component.userConfig && son.component.userConfig.afterrender) {
									if (son.component && son.component.cid && son.component.cid == 'vmdReport') son.component.userConfig.afterrender = son.id + '_afterrender';
								}
								dealCopyNode(son)
							}
						}
					}
				}

				Ext.defer(function() {
					if (newNode.component && newNode.component.userConfig && newNode.component.userConfig.afterrender) newNode.component.userConfig.afterrender = newNode.id + '_afterrender';
					dealCopyNode(newNode);
				}, 500)
			})
			//组件树变动后报表改动
			!xds.temp.reportevents_beforecomponentchanged && xds.on('beforecomponentchanged', function(o) {
				if (xds.canvasToolbar) xds.canvasToolbar.disable()
				var list = xds.vmdreportInfo && xds.vmdreportInfo.list;
				for (var key in list) {
					var flag = false;
					for (var akey in xds.inspector && xds.inspector.nodeHash) {
						if (key == akey) {
							flag = true;
							break;
						}
					}
					if (!flag) {
						delete xds.vmdreportInfo.list[key]
						xds.vmd.canvaslist.removeKey(key)
					}
				}
				me.localSave();
			})

		xds.temp.reportevents_componentcopy = true;
		xds.temp.reportevents_beforecomponentchanged = true;


	},

	setCheckRules: function(info, initInfo) {
		initInfo.checkArray = [];
		for (var i = 0; i < info.length; i++) {
			initInfo.checkArray.push({
				id: info[i].id,
				name: info[i].name,
				expression: info[i].checkexp,
				falseAlert: info[i].errormsg,
				immediate: info[i].checktype
			})
		}
	},
	setSubmitRules: function(info, initInfo) {
		initInfo.submitArray = [];
		for (var i = 0; i < info.length; i++) {
			var temp = [];
			for (var n = 0; n < info[i].values.length; n++) {
				var obj = {
					noRe: info[i].values[n].norepeat,
					name: info[i].values[n].fieldname,
					cell: info[i].values[n].cellid,
					id: info[i].values[n].id || vmd.getGuid()
				}
				temp.push(obj)
			}
			initInfo.submitArray.push({
				name: info[i].name,
				definedname: info[i].definedname,
				saveserver: info[i].saveserver,
				banding: temp,
				id: info[i].id || vmd.getGuid(),
				updatemode: info[i].updatemode || false
			})
		}
	},
	loadWebModelOnClould: function(resultInfo, initInfo) {
		//main、兼容嵌套、subfields、checkrules、flfp
		if (resultInfo && resultInfo.main && resultInfo.main.body && resultInfo.main.body.sections) {
			var row = resultInfo.main.body.rowNum || resultInfo.main.body.sections[0].endrow;
			var cellCount = resultInfo.main.body.colNum || resultInfo.main.body.sections[0].endcol;
			row = parseInt(row);
			cellCount = parseInt(cellCount);

			// //增加行列
			// handsontable.addRowAndCol(row, cellCount);
			// //设有效标识
			// handsontable.changed(row, cellCount);
			// //设置列宽
			// handsontable.setCols(resultInfo);

			initInfo.row = row;
			initInfo.col = cellCount;
			initInfo.fixedColumnsLeft = resultInfo.main.body.fixedcol || 0;
			initInfo.fixedRowsTop = resultInfo.main.body.fixedrow || 0;
			initInfo.fpArray = [];
			initInfo.rowHeadArray = [];
			initInfo.rowHeadHeightArray = [];
			initInfo.colHeadArray = [];
			//组织列锁定和列隐藏

			for (var i = 0; i < 30; i++) {
				var colName = this.numToEng(i);
				if (i < resultInfo.main.body.fixedcol) {
					colName += '锁定'
				}
				if (resultInfo.main.body.columns.width[i] == 0) {
					//this.setCellMeta(0, i, 'col_hide', true);
					colName += "<i class='report-iconfont icon-yincang font-20'></i>"
				}
				initInfo.colHeadArray.push(colName);
			}

			initInfo.colHeadWidthArray = resultInfo.main.body.columns.width
			//80宽度补齐列宽
			for (var i = initInfo.colHeadWidthArray.length; i < 30; i++) {
				initInfo.colHeadWidthArray.push(80)
			}
			initInfo.data = []
			initInfo.mergeInfo = [];
			initInfo.hideRow = [];
			initInfo.readOnly = [];
			initInfo.fathers = [];
			initInfo.nestedTableArray = [];
			initInfo.attribute = [];
			initInfo.filter = [];
			initInfo.dataInfo = [];
			initInfo.checkArray = [];
			initInfo.submitArray = [];
			initInfo.events = []
			//兼容xml
			initInfo.menus = resultInfo.menus || resultInfo.main.menus;


			//打印信息
			initInfo.allPrintInfo = {
				print_paperSize: resultInfo.main.page ? resultInfo.main.page.pageproperty.type : resultInfo.page.pageproperty.type,
				print_quality: resultInfo.main.page ? resultInfo.main.page.pageproperty.printquality : resultInfo.page.pageproperty.printquality,
				print_direction: resultInfo.main.page ? resultInfo.main.page.pageproperty.pagedirection : resultInfo.page.pageproperty.pagedirection,
				print_marginTop: resultInfo.main.page ? resultInfo.main.page.pagemargin.top : resultInfo.page.pagemargin.top,
				print_marginBottom: resultInfo.main.page ? resultInfo.main.page.pagemargin.bottom : resultInfo.page.pagemargin.bottom,
				print_marginLeft: resultInfo.main.page ? resultInfo.main.page.pagemargin.left : resultInfo.page.pagemargin.left,
				print_marginRight: resultInfo.main.page ? resultInfo.main.page.pagemargin.right : resultInfo.page.pagemargin.right,
				print_header: resultInfo.main.page ? resultInfo.main.page.pagemargin.header : resultInfo.page.pagemargin.header,
				print_footer: resultInfo.main.page ? resultInfo.main.page.pagemargin.footer : resultInfo.page.pagemargin.footer
			}

			initInfo.tempMergeArray = []

			if (resultInfo.main.body.sections.length > 0) {
				var sectionTitleAndHeader = 0;
				for (var s in resultInfo.main.body.sections) {
					if (typeof resultInfo.main.body.sections[s] == 'object') {
						var section = resultInfo.main.body.sections[s];
						sectionTitleAndHeader = sectionTitleAndHeader + section.header.length + section.title.length;
						if (resultInfo.main.body.sections.length > 1) {
							var fp = {};
							fp.sliceName = section.name;
							fp.emptyRow = section.patchrow;
							fp.emptyCol = section.patchcol;
							fp.sr = section.startrow - 1;
							fp.er = section.endrow - 1;
							fp.sc = section.startcol - 1;
							fp.ec = section.endcol - 1;
							if (!initInfo.fpArray)
								initInfo.fpArray = [];
							initInfo.fpArray.push(fp);
						}
						var titleNum = 0;
						var headerNum = 0;
						var dataNum = 0;
						// 标题行
						if (section.title && section.title.length > 0) {
							titleNum = section.title.length;
							this.getCellInfoOnClould(section.title, section, resultInfo, 0, "title", initInfo);
						}
						if (section.header && section.header.length > 0) {
							headerNum = section.header.length;
							this.getCellInfoOnClould(section.header, section, resultInfo, titleNum, "header", initInfo);
						}
						if (section.data && section.data.length > 0) {
							dataNum = section.data[0].cells.length;
							this.getCellInfoOnClould(section.data, section, resultInfo, titleNum + headerNum, "data", initInfo);
						}

						//组织fathers数组存储左父上父信息
						if (!initInfo.fathers) initInfo.fathers = [];

						for (var i = 0; i < section.data.length; i++) {
							for (var n = 0; n < section.data[i].cells.length; n++) {
								if (section.data[i].cells[n] && section.data[i].cells[n].hparent) {
									var cr = i;
									if(resultInfo.main.body.sections.length ==1)
									{
										 cr = i + sectionTitleAndHeader;
									}
									var p = section.data[i].cells[n].hparent;
									var p1 = p.match(/^[a-z|A-Z]+/gi);
									var p2 = p.match(/\d+$/gi);
									var obj = {
										cc: n + parseInt(section.startcol) - 1,
										cr: cr + parseInt(section.startrow) - 1,
										fc: this.engToNum(p1[0]) - 1,
										fr: p2[0] - 1,
										type: "leftParent"
									}
									initInfo.fathers.push(obj)
								}
								if (section.data[i].cells[n] && section.data[i].cells[n].vparent) {
									//var cr = i + sectionTitleAndHeader;
									var cr = i ;
									if(resultInfo.main.body.sections.length ==1)
									{
										 cr = i + sectionTitleAndHeader;
									}
									var p = section.data[i].cells[n].vparent;
									var p1 = p.match(/^[a-z|A-Z]+/gi);
									var p2 = p.match(/\d+$/gi);
									var obj = {
										cc: n + parseInt(section.startcol) - 1,
										cr: cr + parseInt(section.startrow) - 1,
										fc: this.engToNum(p1[0]) - 1,
										fr: p2[0] - 1,
										type: "rightParent"
									}
									initInfo.fathers.push(obj)
								}
							}
						}
					}
				}
			}
		}

		//组织嵌套表数组
		if (resultInfo && resultInfo.subs && (Object.keys(resultInfo.subs)).length > 0) {
			var count = 0;
			var cellType = resultInfo.main.celltypes;
			initInfo.nestedTableArray = [];
			var info = resultInfo.main.body.sections;
			for (var i = 0; i < info.length; i++) {
				for (var n = 0; n < info[i].data.length; n++) {
					for (var x = 0; x < info[i].data[n].cells.length; x++) {
						if (info[i].data[n].cells[x].fillcelltype) {
							var name = info[i].data[n].cells[x].fillcelltype;
							var cellTypeInfo = cellType[name];
							var sr = n + info[i].header.length + info[i].title.length;
							var sc = x;
							var er;
							var ec;

							var merged = initInfo.mergeInfo;
							if (merged) {
								for (var t = 0; t < merged.length; t++) {
									if (merged[t].row == sr && merged[t].col == x) {
										er = sr + merged[t].rowspan - 1;
										ec = sc + merged[t].colspan - 1;
										subsInfo = resultInfo.subs[count];
										if (subsInfo) {
											initInfo.nestedTableArray.push({
												sr: sr,
												sc: sc,
												er: er,
												ec: ec,
												info: subsInfo,
												qtb_template: cellTypeInfo.subrptpath,
												qtb_tableName: cellTypeInfo.subrptname,
												qtb_unfold: cellTypeInfo.spread == '1' ? true : false,
												qtb_style: cellTypeInfo.subrptshowmode == 'embed' ? '0' : '1'
											})
											count++
										}
									}
								}
							}
						}
					}
				}
			}
		}

		if (resultInfo && resultInfo.main.subfields && resultInfo.main.subfields.length > 0) {
			for (f in resultInfo.main.subfields) {
				var section = resultInfo.main.subfields[f];
				var fl = new flSetting();
				fl.seg_columnsNumber.value = section.subfieldCount;
				fl.seg_style.value = section.subfieldTypeWraper;
				fl.seg_dividingLine.value = section.showSeparator;
				fl.seg_columnsMargin.value = section.subfieldSpace;
				fl.seg_applyTo.value = section.subfieldApplaycationWraper;
				fl.seg_condition.value = section.subCondition;
				fl.flSRow.value = section.startRow;
				fl.flSCol.value = section.startCol;
				fl.flERow.value = section.endRow;
				fl.flECol.value = section.endCol;
				if (!initInfo.flList) initInfo.flList = [];
				initInfo.flList.push(fl);
			}
		}

		if (resultInfo && resultInfo.main.checkrules) {
			this.setCheckRules(resultInfo.main.checkrules, initInfo)
		}
		if (resultInfo && resultInfo.main.submitrules) {
			this.setSubmitRules(resultInfo.main.submitrules, initInfo)
		}
	},

	initHdTable: function() {
		var me = this;
		var datas = [];
		var filename = me.relativepath + "/" + me.path;
		if (!me.path) {
			me.initHdTablee(null);
		} else {
			var url = vmd.vmdUploadPath + 'FileService?FileName=' + filename;
			var myMask2 = new Ext.LoadMask(xds.canvas.el, {
				msg: '模板解析中，请稍后...'
			});
			myMask2.show();
			me.hwRao.getJson(filename, "",
				function(result) {
					var reportInfo = Ext.decode(result.data);
					var initInfo = {};
					me.loadWebModelOnClould(reportInfo, initInfo)
					me.initHdTablee(initInfo);

					if (typeof window.reportHistory == 'undefined') window.reportHistory = {};
					window.reportHistory[me.viewerNode.id] = reportInfo;

					//创建快照
					me.convertPic(me);
					if (reportInfo.main.submitrules && reportInfo.main.submitrules.length > 0) {
						me.viewerNode.component.setConfig("fillReport", true);
					}
					if (reportInfo && reportInfo.main && reportInfo.main.config) {
						me.config = reportInfo.main.config;
					}
					myMask2.hide();

				},
				function(msg, f) {
					myMask2.hide();
					Ext.Msg.alert("错误信息", msg,
						function() {})
				});
		}
	},
	initHdTablee: function(initInfo) {

		var me = this;

		//重置报表高度
		me._resize();

		var data = (initInfo != null) ? initInfo.data : undefined;
		var mergeInfo = (initInfo != null) ? initInfo.mergeInfo : true;
		var row = (initInfo != null) ? initInfo.row : 30;
		var col = (initInfo != null) ? initInfo.col : 30;
		var colHeadWidthArray = (initInfo != null) ? initInfo.colHeadWidthArray : 80;
		var rowHeadHeightArray = (initInfo != null) ? initInfo.rowHeadHeightArray : 26;
		var rowHeadArray = (initInfo != null) ? initInfo.rowHeadArray : true;
		var colHeadArray = (initInfo != null) ? initInfo.colHeadArray : true;
		var fixedColumnsLeft = (initInfo != null) ? initInfo.fixedColumnsLeft : 0;
		var fixedRowsTop = (initInfo != null) ? initInfo.fixedRowsTop : 0;

		me.grid = new Handsontable(this.gridEl.dom, {
			// manualColumnMove: true,
			// manualRowMove: true, //行列拖动更换顺序
			// filters: true,
			// columnSorting: true,
			// sortIndicator: true,
			// rowHeaderWidth: 50,
			// undo: true,
			// redo: true, //撤销、反撤销
			// viewportColumnRenderingOffset: 60,
			// viewportRowRenderingOffset: 30, //设置可视行列外预渲染的行列数
			// customBorders: true,
			// dragToScroll :false, //拖动以滚动
			// manualColumnMove: false,
			// manualRowMove: false,
			// manualColumnFreeze: true, //列固定和解除
			startRows: row,
			startCols: col,
			data: data,
			mergeCells: mergeInfo,
			minCols: 30,
			minRows: 30,
			colWidths: colHeadWidthArray,
			rowHeights: rowHeadHeightArray,
			rowHeaders: rowHeadArray, //显示行头列头
			colHeaders: colHeadArray,
			fixedColumnsLeft: fixedColumnsLeft,
			fixedRowsTop: fixedRowsTop,
			renderAllRows: true,
			renderAllCols: true, //禁用虚拟渲染机制,提高加载速度，禁用仅渲染可视区域单元格
			fillHandle: true,
			autoInsertRow: false,
			currentRowClassName: '',
			currentColClassName: '', //当前行列样式
			autoColumnSize: true, //自适应列大小
			manualColumnResize: true,
			manualRowResize: true, //行列宽度拖动设置
			wordWrap: false,
			copyable: true,
			copyPaste: true,
			allowInsertRow: true,
			allowInsertColumn: true,
			outsideClickDeselects: false,
			minSpareRows: 1,
			minSpareCols: 1,
			contextMenu: {
				items: {
					'mergeCells': {
						name: function() {
							var cell = this.dealInvert()[0];
							var sr = cell.sr;
							var sc = cell.sc;
							var er = cell.er;
							var ec = cell.ec;
							var count1 = 0;
							var count0 = false;
							for (var i = sr; i <= er; i++) {
								for (var n = sc; n < ec; n++) {
									if (this.getCellMeta(i, n).mergeId == 1) {
										count1++;
									}
									if (this.getCellMeta(i, n).mergeId == 0) {
										count0 = true;
									}
								}
							}
							if (count1 == 0) {
								return '<i class="menuicon icons icons-16 icons-16-merge_on"></i>合并单元格'
							} else if (count1 == 1) {
								if (count0) {
									return '<i class="menuicon icons icons-16 icons-16-merge_on"></i>合并单元格'
								} else {
									return '<i class="menuicon icons icons-16 icons-16-merge_off"></i>取消合并单元格'
								}
							} else {
								return '<i class="menuicon icons icons-16 icons-16-merge_on"></i>合并单元格'
							}
						},
						hidden: false
					},
					'setFP': {
						name: function() {
							if (!this.fpArray || this.fpArray.length < 1) {
								return '定义为分片'
							} else {
								var flag = true;
								var cell = this.dealInvert()[0];
								var arr = this.fpArray;
								for (var i = 0; i < this.fpArray.length; i++) {
									if (arr[i].sr == cell.sr && arr[i].er == cell.er && arr[i].sc == cell.sc && arr[i].ec == cell.ec) {
										flag = false;
									}
								}
								if (flag) {
									return '定义为分片'
								} else {
									return '取消分片区域'
								}
							}
						},
						callback: function() {
							this.contextMenu_fpSet();
						},
						hidden: function() {
							return this.isCell();
						},
						disabled: function() {
							var cell = this.dealInvert()[0]
							if (cell.sr == cell.er && cell.sc == cell.ec) {
								return true;
							} else {
								return false;
							}
						}
					},
					'setQT': {
						name: function() {
							if (this.nestedStatus == 'new' || this.nestedStatus == 'forbid') {
								var cell = this.dealInvert()[0];
								this.inMerge();
								if ((cell.sr == cell.er && cell.sc == cell.ec) || this.inmerge) {
									return '设为嵌套区'
								} else {
									return '合并并设为嵌套表'
								}
							} else {
								return '取消嵌套区域'
							}
						},
						callback: function() {
							this.nestedTableHandle();
						},
						hidden: function() {
							return this.isCell();
						}
					},
					hsep3: "---------",
					'cut': {
						name: '剪切'
					},
					'copy': {
						name: '复制'
					},
					hsep1: "---------",
					'row_above': {
						name: '<i class="menuicon icons icons-16 icons-16-insert_row"></i>插入行<div class="rowinput hotmenuinput"></div>',
						hidden: function() {
							return !this.isCol()
						},
						callback: function() {
							this.insertRow(1)
							if (typeof inst != 'undefined' && inst.menu && inst.menu.hotMenu) {
								inst.menu.hotMenu.rootElement.style.display = 'none'
							}
						}
					},
					'remove_row': {
						name: '<i class="menuicon icons icons-16 icons-16-delete_row"></i>删除所在行',
						hidden: function() {
							return this.isRow()
						},
						callback: function() {
							this.contextMenu_removeRow();
						}
					},
					hsep2: "---------",
					'col_left': {
						name: '<i class="menuicon icons icons-16 icons-16-insert_column"></i>插入列<div class="colinput hotmenuinput"></div>',
						hidden: function() {
							return !this.isRow()
						},
						callback: function() {
							this.insertCol(1)
						}
					},
					'remove_col': {
						name: '<i class="menuicon icons icons-16 icons-16-delete_column"></i>删除所在列',
						hidden: function() {
							return this.isCol()
						},
						callback: function() {
							this.contextMenu_removeCol();
						}
					},
					hsep4: "---------",
					'title': {
						name: '标题',
						callback: function() {
							this.setRowHeader('title')
						},
						hidden: function() {
							return this.isRow()
						}
					},
					'header': {
						name: '表头',
						callback: function() {
							this.setRowHeader('header')
						},
						hidden: function() {
							return this.isRow()
						}
					},
					'data': {
						name: '数据',
						callback: function() {
							this.setRowHeader('data')
						},
						hidden: function() {
							return this.isRow()
						}
					},
					hsep6: "---------",
					'row_height': {
						name: '<i class="menuicon icons icons-16 icons-16-height"></i>行高<div class="rowheight hotmenuinputr"></div>',
						callback: function() {},

						hidden: function() {
							return this.isRow()
						}
					},
					'row_hide': {
						name: function() {
							var c = this.getCellMeta(0, 0).stateTemp
							var flag = this.getCellMeta(c, 0).row_hide;
							if (flag) {
								return '取消行隐藏'
							} else {
								return '行隐藏'
							}
						},
						callback: function() {
							this.setRowHeader('hide')
						},
						hidden: function() {
							return this.isRow()
						}
					},
					hsep5: "---------",
					'col_lock': {
						name: function() {

							var cell = this.dealInvert()[0];
							var ec = cell.ec;
							var flag = this.getCellMeta(0, ec).col_lock;
							if (flag) {
								return '取消列锁定'
							} else {
								return '列锁定'
							}
						},
						callback: function() {

							var cell = this.dealInvert()[0];
							var ec = cell.ec;
							if (this.getCellMeta(0, ec).col_lock) {
								this.freeze(null, null, true)
							} else {
								this.freeze(0, ec + 1, false)
							}

						},
						hidden: function() {
							return this.isCol()
						},
						disabled: function() {
							var cell = this.dealInvert()[0];
							var ec = cell.ec;
							if (this.getCellMeta(0, ec).col_lock && this.getCellMeta(0, ec + 1).col_lock) {
								return true
							}
						}
					},
					'col_width': {
						name: '<i class="menuicon icons icons-16 icons-16-width"></i>列宽<div class="colWidth hotmenuinputr"></div>',
						callback: function() {},

						hidden: function() {
							return this.isCol()
						}
					},
					'col_hide': {
						name: function() {
							var c = this.getCellMeta(0, 0).stateTemp
							var flag = this.getCellMeta(0, c).col_hide;
							if (flag) {
								return '取消列隐藏'
							} else {
								return '列隐藏'
							}
						},
						callback: function() {
							this.setColHeader('hide')
						},
						hidden: function() {
							return this.isCol()
						}
					},
					'clearCSS': {
						name: '清除样式',
						callback: function() {
							this.contextMenu_clearCSS();
							this.render()
						},
						hidden: function() {
							return this.isCell()
						}
					},
					'clearText': {
						name: '清除文本',
						callback: function() {
							this.contextMenu_clearText();
						},
						hidden: function() {
							return this.isCell()
						}
					},
					'clearAll': {
						name: '清除全部',
						callback: function() {
							this.contextMenu_clearAll();
						}
					}
				}
			},
			afterRender: function() {
				this.afterRender()
			},
			afterRenderer: function(td, row, col, prop, value, cellProperties) {
				this.afterRenderer(td, row, col, prop, value, cellProperties);
			},
			afterContextMenuShow: function(inst) {
				//插入行
				me.initMenuInput({
					menu: inst,
					cls: '.rowinput',
					unit: '',
					ok: function(val) {
						me.grid.insertRow(val)
						if (inst && inst.menu && inst.menu.hotMenu) {
							inst.menu.hotMenu.rootElement.style.display = 'none'
						}
					}
				});
				var rh = function() {
					var c = me.grid.getCellMeta(0, 0).stateTemp
					me.grid.fullRowHeightArray()
					return me.grid.rowHeadHeightArray[c];
				}
				//行高
				me.initMenuInput({
					menu: inst,
					cls: '.rowheight',
					unit: 'px',
					value: rh(),
					minValue: 1,
					maxValue: 1e4,
					// selectionStart = 0; //选中区域左边界
					// selectionEnd = .value.length; //选中区域右边界
					ok: function(val) {
						var hot = me.grid;
						var rowHeightInst = hot.getPlugin('ManualRowResize');
						if (hot.dealInvert()) {
							var start = hot.dealInvert()[0].sr
							var end = hot.dealInvert()[0].er
							hot.fullRowHeightArray()
							for (var i = start; i < end + 1; i++) {
								rowHeightInst.setManualSize(i, val)
								hot.rowHeadHeightArray[i] = val;
								hot.setCellMeta(i, 0, 'rowHeight', val)
								hot.setCellMeta(i, 0, 'theCellChanged', true)
								hot.render()
							}
						}
						if (inst && inst.menu && inst.menu.hotMenu) {
							inst.menu.hotMenu.rootElement.style.display = 'none'
						}
					}
				});
				//插入列
				me.initMenuInput({
					menu: inst,
					cls: '.colinput',
					unit: '',
					ok: function(val) {
						me.grid.insertCol(val)
						if (inst && inst.menu && inst.menu.hotMenu) {
							inst.menu.hotMenu.rootElement.style.display = 'none'
						}
					}
				});
				var cw = function() {
					var c = me.grid.getCellMeta(0, 0).stateTemp
					me.grid.fullColWidthArray()
					return me.grid.colHeadWidthArray[c];
				}
				//列宽
				me.initMenuInput({
					menu: inst,
					cls: '.colWidth',
					unit: 'px',
					value: cw(),
					minValue: 20,
					maxValue: 1e4,
					ok: function(val) {
						var hot = me.grid;
						var colWidthInst = hot.getPlugin('ManualColumnResize');
						if (hot.dealInvert()) {
							var start = hot.dealInvert()[0].sc;
							var end = hot.dealInvert()[0].ec;
							hot.fullColWidthArray()
							for (var i = start; i < end + 1; i++) {
								colWidthInst.setManualSize(i, val)
								hot.colHeadWidthArray[i] = val;
								hot.setCellMeta(0, i, 'colWidth', val)
								hot.setCellMeta(0, i, 'theCellChanged', true)
								hot.render()
							}
						}
						if (inst && inst.menu && inst.menu.hotMenu) {
							inst.menu.hotMenu.rootElement.style.display = 'none'
						}
					}
				});
				$('.input-value').on('focus', function() {
					this.selectionStart = 0
					this.selectionEnd = this.value.length
				})
			},
			afterSelection: function(sr, sc, er, ec) {
				if (this.nestedTimes) {
					var cssText = {
						'background-image': "none",
						'background-color': 'transparent',
						'cursor': 'se-resize',
						'height': '6px',
						'width': '6px'
					}
					vmd(me.el.dom).find('.htBorders .wtBorder.current').eq(4).removeClass('corner')
						.css(cssText)
					vmd(me.el.dom).find('.htBorders .wtBorder.area').eq(4).removeClass('corner')
						.css(cssText)
				}

				if (xds && xds.eastlayout && xds.eastlayout.reportInst) xds.eastlayout.reportInst.showRptId.setTitle(this.rootScope.viewerNode.id);
			},
			afterMergeCells: function(range, parent) {
				var sr = range.from.row;
				var sc = range.from.col;
				var er = range.to.row;
				var ec = range.to.col;

				for (var i = sr; i < er + 1; i++) {
					for (var n = sc; n < ec + 1; n++) {
						if (i == sr && n == sc) {
							this.setCellMeta(i, n, 'mergeId', 1)
						} else {
							this.setCellMeta(i, n, 'mergeId', 2)
						}
					}
				}
			},
			afterUnmergeCells: function(range, bool) {
				var sr = range.from.row;
				var sc = range.from.col;
				var er = range.to.row;
				var ec = range.to.col;
				for (var i = sr; i < er + 1; i++) {
					for (var n = sc; n < ec + 1; n++) {
						this.setCellMeta(i, n, 'mergeId', 0)
					}
				}
			},
			beforePaste: function(e) {
				var count = [];
				var cell = this.dealInvert()[0];
				var mArr = this.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
				var sr = cell.sr;
				var sc = cell.sc;
				var ec = cell.ec;
				var er = cell.er;
				if (e && e.mCopyText) {
					if (e.mCopyText != '') {
						er = sr + e.mCopyText.length - 1
						ec = sc + e.mCopyText[0].length - 1
					}
				} else {
					if (this.cvArray) {
						var ec = cell.ec > this.cvArray[0].length + cell.sc - 1 ? cell.ec : this.cvArray[0].length + cell.sc - 1;
						var er = cell.er > this.cvArray.length + cell.sr - 1 ? cell.er : this.cvArray.length + cell.sr - 1;
						this.unExpand = {
							endRow: er,
							startRow: sr,
							endCol: ec,
							startCol: sc
						}
					} else {
						return false;
					}
				}
				for (var i = sr; i < er + 1; i++) {
					for (var n = sc; n < ec + 1; n++) {
						if (this.getCellMeta(i, n).mergeId == 1) {
							for (var k = 0; k < mArr.length; k++) {
								if (mArr[k].row == i && mArr[k].col == n) {
									var endrow = n + mArr[k].rowspan - 1
									var endcol = i + mArr[k].colspan - 1
									this.getPlugin('MergeCells').unmerge(
										mArr[k].row,
										mArr[k].col,
										mArr[k].row + mArr[k].rowspan - 1,
										mArr[k].col + mArr[k].colspan - 1)
									count.push({
										row: i,
										col: n,
										endrow: endrow,
										endcol: endcol
									});
								}
							}
						}
					}
				}
				for (var i = sr; i < er + 1; i++) {
					for (var n = sc; n < ec + 1; n++) {
						if (this.getCellMeta(i, n).mergeId == 2) {
							for (var k = 0; k < count.length; k++) {
								this.getPlugin('MergeCells').merge(count[k].row, count[k].col, count[k].endcol - 1, count[k].endrow + 1);
							}
							vmd.alert('粘贴位置错误', '您不能从与合并单元格相交的部分执行剪切粘贴操作，建议取消合并单元格或选择包含整个合并单元格的区域。')
							return false;
						}
					}
				}
				return true;
			},
			afterCopy: function(data, cells) {
				this.afterCopy(data, cells);
			},
			afterPaste: function(data, cells) {
				this.afterPaste(data, cells);
			},
			beforeRemoveRow: function() {
				if (this.nestedTableArray) this.beforeNestedTableArray = JSON.parse(JSON.stringify(this.nestedTableArray));
			},
			beforeRemoveCol: function() {
				if (this.nestedTableArray) this.beforeNestedTableArray = JSON.parse(JSON.stringify(this.nestedTableArray));
			},
			beforeColumnResize: function() {
				if (this.nestedTableArray) this.beforeNestedTableArray = JSON.parse(JSON.stringify(this.nestedTableArray));
			},
			beforeRowResize: function() {
				if (this.nestedTableArray) this.beforeNestedTableArray = JSON.parse(JSON.stringify(this.nestedTableArray));
			},
			afterRemoveRow: function(index, amount, physicalRows) {
				//删除行后处理合并单元格数组方法
				this.handleMergeRemoveRow(index, amount, physicalRows);
				//删除行后处理分片数组的方法
				this.handleFPRemoveRow(index, amount, physicalRows);
				//删除行后处理嵌套表数组的方法
				this.handleNestedTableRemoveRow(index, amount, physicalRows);
				this.selectCells([0, 0, 0, 0], true)
			},
			afterRemoveCol: function(index, amount, physicalCols) {
				//删除列后处理合并单元格数组方法
				this.handleMergeRemoveCol(index, amount, physicalCols);
				//删除列后处理分片数组的方法
				this.handleFPRemoveCol(index, amount, physicalCols);
				//删除列后处理嵌套表数组的方法
				this.handleNestedTableRemoveCol(index, amount, physicalCols);
			},
			afterColumnResize: function(col, width) {
				this.fullColWidthArray()
				this.colHeadWidthArray[col] = width;
				this.setCellMeta(0, col, 'colWidth', width)
				this.setCellMeta(0, col, 'theCellChanged', true)
			},
			afterRowResize: function(row, height) {
				this.fullRowHeightArray()
				this.rowHeadHeightArray[row] = height;
				this.setCellMeta(row, 0, 'rowHeight', height)
				this.setCellMeta(row, 0, 'theCellChanged', true)
			},
			afterOnCellMouseDown: function() {
				var that = this;

				//报表设计模式下选中
				if (xds.active && xds.active.node && xds.active.node.id != me.viewerNode.id) {
					me.viewerNode.select();
				}

				window.sheetHot = me.grid;
				window.sheetHot_me = me;

				//添加颜色选择器
				if (!page.moreColorButtonSet) {

					var divArr = document.getElementsByClassName('colorPicker-palette-table-body');
					var length = divArr.length;
					var times = length / 2;
					var count = 0;
					for (var i = 0; i < times; i++) {
						var MyDiv = divArr[count];
						count++
						var MyDiv1 = divArr[count];
						count++

						var button = document.createElement("input");
						button.setAttribute("type", "button");
						button.setAttribute("value", "自定义颜色");
						button.setAttribute("class", 'vmd-button');
						button.style.width = "190px";
						MyDiv.appendChild(button);

						var button1 = document.createElement("input");
						button1.setAttribute("type", "button");
						button1.setAttribute("value", "自定义颜色");
						button1.setAttribute("class", 'vmd-button');
						button1.style.width = "190px";
						MyDiv1.appendChild(button1);

						button.onclick = function() {
							var value = ''
							dhtmlXColorPicker.prototype.i18n.zn = {
								labelHue: "H",
								labelSat: "S",
								labelLum: "L",
								labelRed: "R",
								labelGreen: "g",
								labelBlue: "B",
								btnSelect: "选择",
								btnCancel: "取消"
							}
							myColorPicker = new dhtmlXColorPicker({
								input: button,
								color: value,
								closeable: false
							});
							myColorPicker.loadUserLanguage('zn');
							myColorPicker.show();
							myColorPicker.base.childNodes[0].style["z-index"] = '60002'
							var myEvent = myColorPicker.attachEvent("onSelect", function(color, node) {
								selectColor = color
								var cell = me.grid.dealInvert()[0];
								for (var i = cell.sr; i < cell.er + 1; i++) {
									for (var n = cell.sc; n < cell.ec + 1; n++) {
										me.grid.changeAttributeInfo(i, n, 'fontColorSelect', selectColor);
										var el = me.grid.getCell(i, n);
										el.style.color = selectColor;
									}
								}
								myColorPicker.unload();
								myColorPicker = null;
								me.grid.render();
							});
							var myEvent = myColorPicker.attachEvent("onCancel", function(color, node) {
								myColorPicker.unload();
								myColorPicker = null;
							});
						}
						button1.onclick = function() {
							var value = ''
							dhtmlXColorPicker.prototype.i18n.zn = {
								labelHue: "H",
								labelSat: "S",
								labelLum: "L",
								labelRed: "R",
								labelGreen: "g",
								labelBlue: "B",
								btnSelect: "选择",
								btnCancel: "取消"
							}
							myColorPicker = new dhtmlXColorPicker({
								input: button1,
								color: value,
								closeable: false
							});

							myColorPicker.loadUserLanguage('zn');
							myColorPicker.show();
							myColorPicker.base.childNodes[0].style["z-index"] = '60002'
							var myEvent = myColorPicker.attachEvent("onSelect", function(color, node) {
								selectColor = color
								var cell = me.grid.dealInvert()[0];
								for (var i = cell.sr; i < cell.er + 1; i++) {
									for (var n = cell.sc; n < cell.ec + 1; n++) {
										me.grid.changeAttributeInfo(i, n, 'colorDisplay', selectColor);
										var el = me.grid.getCell(i, n);
										el.style.backgroundColor = selectColor;
									}
								}
								myColorPicker.unload();
								myColorPicker = null;
								me.grid.render();
							});
							var myEvent = myColorPicker.attachEvent("onCancel", function(color, node) {
								myColorPicker.unload();
								myColorPicker = null;
							});
						}
					}
					page.moreColorButtonSet = true;
				}

				var cell = this.dealInvert()[0];
				var sr = cell.sr;
				var sc = cell.sc;
				var er = cell.er;
				var ec = cell.ec;

				if (this.selectedCell) {
					var last = this.selectedCell;
					if (cell.sr == last.sr && cell.sc == last.sc && cell.er == last.er && cell.ec == last.ec) {
						this.selectChanged = false;
					} else {
						this.selectChanged = true;
					}
				}

				if (xds.eastlayout && xds.eastlayout.activeSettings) {

					//激活当前tab选项卡
					if (xds.eastlayout.ins_tab.activeTab.id != 'ins_rptconf') xds.eastlayout.ins_tab.activate('ins_rptconf');

					/*xds.eastlayout.activeSettings('ContentProperty', '', this.rootScope.viewerNode.id + '报表', function(reportInst) {
						xds.eastlayout.reportInst = reportInst;
					});*/

					for (var key in xds.vmd.reportdict) {
						var rpt = xds.vmd.reportdict[key];
						if (d_id != key) rpt.deselectCell();
					}
				}

				//需要优化，选中效果延迟太高
				this.fpCanDrag();
				this.nestedCanDrag();

				if (this.times) {
					this.allDrag('fp', me)
				} else if (this.nestedTimes) {
					this.allDrag('nested', me);
				} else {
					this.allDrag(null, me);
				}
				this.selectedCell = cell
			},
			afterSelectionEnd: function(sr, sc, er, ec, selectionLayerLevel) {
				var that = this;
				if (!this.OnOnce) {
					if (this.toolbar) {
						var hot = this;
						this.toolbar["sheet-textwrapbutton"].on('mouseover', function() {
							hot.toolbar['sheet-textwrapbutton'][0].style.backgroundColor = 'rgb(199,199,200)'
						})
						this.toolbar["sheet-textwrapbutton"].on('mouseout', function() {
							var cell = hot.dealInvert()[0];
							if (cell) {
								var align = hot.getCellMeta(cell.sr, cell.sc).cellAttributeInfo.alignInfo;
								if (align.autoenter.value == 1) {
									hot.toolbar["sheet-textwrapbutton"][0].style.backgroundColor = 'rgba(65,70,80,.3)'
								} else {
									hot.toolbar["sheet-textwrapbutton"][0].style.backgroundColor = '#fff'
								}
							}
						})
						this.toolbar["sheet-textwrapbutton"].on('mousedown', function() {
							var cell = hot.dealInvert()[0];
							if (cell) {
								var align = hot.getCellMeta(cell.sr, cell.sc).cellAttributeInfo.alignInfo;
								if (align.autoenter.value == 0) {
									hot.toolbar["sheet-textwrapbutton"][0].style.backgroundColor = 'rgba(65,70,80,.3)'
								} else {
									hot.toolbar["sheet-textwrapbutton"][0].style.backgroundColor = '#fff'
								}
							}
						})
						this.OnOnce = true;
					}
				}

				//互相绑定
				if (window.myToolbar) {
					this.toolbar = window.myToolbar.toolbar;
					window.myToolbar.hot = this;
				}
				// }

				if (xds.eastlayout && xds.eastlayout.reportInst && xds.eastlayout.reportInst.hwFP) {
					var fp = xds.eastlayout.reportInst.hwFP;
					var cell = this.dealInvert()[0]
					if (this.fpArray && this.fpArray.length > 0) {
						var arr = this.fpArray;
						for (var i = 0; i < arr.length; i++) {
							if (cell.sr == arr[i].sr && cell.sc == arr[i].sc && cell.er == arr[i].er && cell.ec == arr[i].ec) {
								fp.allEnable();
								fp.seg_sliceName.setValue(arr[i].sliceName);
								fp.seg_emptyCol.setValue(arr[i].emptyCol);
								fp.seg_emptyRow.setValue(arr[i].emptyRow);
								//break;
								return;
							}
							fp.allDisable()
						}
					} else {
						fp.allDisable()
					}
				}

				var cell = this.dealInvert()[0];
				var no = null;
				var sr = cell.sr;
				var sc = cell.sc;
				var er = cell.er;
				var ec = cell.ec;

				//toolbar交互方法
				this.toolbarMutual(cell);
				//与expedit交互
				this.expeditMutual(cell)

				if (this.selectedCell) {
					var last = this.selectedCell;
					if (cell.sr == last.sr && cell.sc == last.sc && cell.er == last.er && cell.ec == last.ec) {
						this.selectChanged = false;
					} else {
						this.selectChanged = true;
					}
				}
				var obj = [];
				var mArr = this.getPlugin('MergeCells').mergedCellsCollection.mergedCells
				for (var k = 0; k < mArr.length; k++) {
					var msr = mArr[k].row;
					var msc = mArr[k].col;
					var mer = mArr[k].row + mArr[k].rowspan - 1;
					var mec = mArr[k].col + mArr[k].colspan - 1;
					if (sr == msr && sc == msc && er == mer && ec == mec) {
						no = k;
						break;
					}
				}
				if (no == null) {
					for (var i = sr; i < er + 1; i++) {
						for (var n = sc; n < ec + 1; n++) {
							info = this.getCellMeta(i, n);
							var runtask = function() {
								cP = xds.eastlayout.reportInst;
								cP.setPropertyInfo(info, me.grid, cell);
								var title = that.rootScope.viewerNode.id + '属性设置';
								cP.setTitle(title)
							}
							if (xds.eastlayout && xds.eastlayout.reportInst) {
								runtask()
							} else if (this.reportInst) {
								cP = this.reportInst;
								cP.setPropertyInfo(info, me.grid, cell);
							} else {
								vmd.taskRunner(function() {
									if (xds.eastlayout && xds.eastlayout.reportInst) return true;
								}, function() {
									runtask()
								})
							}
						}
					}
				} else {
					info = this.getCellMeta(sr, sc)

					var runtask = function() {
						cP = xds.eastlayout.reportInst;
						cP.setPropertyInfo(info, me.grid, cell);
						var title = that.rootScope.viewerNode.id + '属性设置';
						cP.setTitle(title)
					}
					if (xds.eastlayout && xds.eastlayout.reportInst) {
						runtask()
					} else if (this.reportInst) {
						cP = this.reportInst;
						cP.setPropertyInfo(info, me.grid, cell);
					} else {
						vmd.taskRunner(function() {
							if (xds.eastlayout && xds.eastlayout.reportInst) return true;
						}, function() {
							runtask()
						})
					}
				}
				if (xds.eastlayout && xds.eastlayout.reportInst && xds.eastlayout.reportInst.FP) {
					this.fpAreaValid();
				}
				if (this.nestedTableArray) {
					this.nestedTableValid()
				}
				this.selectedCell = cell;

				if (xds && xds.canvasToolbar) {
					//启用工具条
					xds.canvasToolbar.enable()
					xds.canvasToolbar.setActive('vmdReport')
				}
			},
			afterChange: function(changes) {
				var that = this;
				var r
				var c
				var value
				var temp

				if (changes) {
					for (var i = 0; i < changes.length; i++) {
						r = changes[i][0];
						c = changes[i][1];
						oldValue = changes[i][2];
						value = changes[i][3];

						// if ((changes[i][2] != changes[i][3]) && changes[i][2] != null) {
						// 	that.changeAttributeInfo(r, c, 'txtValue', value)
						// }

						if (oldValue == null && value == '') {

						} else if (oldValue == value) {

						} else {
							that.changeAttributeInfo(r, c, 'txtValue', value)
						}

					}
				}
			},
			beforeOnCellContextMenu: function(event, croods, TD) {
				if (croods.col < 0) {
					this.setCellMeta(0, 0, 'state', 'col')
					this.setCellMeta(0, 0, 'stateTemp', croods.row)
				} else
				if (croods.row < 0) {
					this.setCellMeta(0, 0, 'state', 'row')
					this.setCellMeta(0, 0, 'stateTemp', croods.col)
				} else {
					this.setCellMeta(0, 0, 'state', 'cell')
					this.setCellMeta(0, 0, 'stateCell', [croods.row, croods.col])
				}
				this.nestedTableValid();
			}
		});
		me.grid.ClipBordInst = new vmd.report.ClipBord(me.grid);
		var oldpaste = me.grid.getPlugin('copyPaste').onPaste
		me.grid.getPlugin('copyPaste').onPaste = function(e) {
			if (e && e.clipboardData && e.clipboardData.getData('vmdcopyPaste')) {
				oldpaste.call(this, e);
			} else {
				me.grid.ClipBordInst.onpaste(e);
				me.grid.pasteFromOut(me.grid.copyFromOut)
			}
		}
		var oldCopy = me.grid.getPlugin('copyPaste').onCopy
		me.grid.getPlugin('copyPaste').onCopy = function(t) {
			var e = me.grid.pasteInfoForOut('copy');

			e && (e.plain || e.html) && (t.clipboardData ? (t.clipboardData.clearData(),
				e.plain && t.clipboardData.setData("text/plain", e.plain),
				e.html && t.clipboardData.setData("text/html", e.html),
				e.json && t.clipboardData.setData("text/json", e.json),
				t.preventDefault()) : window.clipboardData && (window.clipboardData.clearData(),
				e.plain && window.clipboardData.setData("text", e.plain),
				t.preventDefault()))
		}
		var oldCut = me.grid.getPlugin('copyPaste').onCut
		me.grid.getPlugin('copyPaste').onCut = function(t) {
			var e = me.grid.pasteInfoForOut('cut')
			e && (e.plain || e.html) && (t.clipboardData ? (t.clipboardData.clearData(),
				e.plain && t.clipboardData.setData("text/plain", e.plain),
				e.html && t.clipboardData.setData("text/html", e.html),
				e.json && t.clipboardData.setData("text/json", e.json),
				t.preventDefault()) : window.clipboardData && (window.clipboardData.clearData(),
				e.plain && window.clipboardData.setData("text", e.plain),
				t.preventDefault()))
		}

		me.grid.rootScope = me;
		//添加cellMeta,设置事件
		if (initInfo) {
			for (var i = 0; i < row; i++) {
				for (var n = 0; n < col; n++) {
					me.grid.setCellMeta(i, n, 'cellAttributeInfo',
						initInfo.attribute && initInfo.attribute[i] && initInfo.attribute[i][n] || new gridCellInfoObject());
					me.grid.setCellMeta(i, n, 'theCellChanged', true)
				}
			}
			var ine = initInfo.events;
			if (ine) {
				for (var i = 0; i < ine.length; i++) {
					me.grid.changeAttributeInfo(ine[i].row, ine[i].col, ine[i].name, ine[i].value)
				}
			}
			var filter = initInfo.filter;
			if (filter) {
				for (var i = 0; i < filter.length; i++) {
					me.grid.setCellMeta(filter[i].row, filter[i].col, filter[i].name, filter[i].value)
				}
			}
			var di = initInfo.dataInfo;
			if (di) {
				for (var i = 0; i < di.length; i++) {
					me.grid.setCellMeta(di[i].row, di[i].col, di[i].name, di[i].value)
				}
			}
			me.grid.addInitInfo(initInfo);
		}
	},
	initMenuInput: function(opts) {
		if (!Ext.isObject(opts)) return;
		var inst = opts.menu;
		var cls = opts.cls;
		var menuEl = inst.menu.hotMenu.container;
		var blurfn = opts.ok;
		var rowinputInst;
		var rowinputEl = Ext.fly(menuEl).child(cls);
		if (rowinputEl) rowinputInst = new vmd.InputNumber({
			renderTo: rowinputEl.dom,
			value: opts.value || 1,
			minValue: opts.minValue || 1,
			maxValue: opts.maxValue || 10,
			unit: opts.unit,
			isShowOk: true,
			listeners: {
				afterrender: function() {
					var me = this;
					this.el.on('mousedown', function() {
						me.inputEl.dom.focus()
						stopPP()
					})
				},
				ok: function(sender, val) {
					blurfn(rowinputInst.getValue());
				},
				blur: function() {

				}

			}
		})
	},
	onResize: function(w, h) {

		var me = this;
		if (!this.toolCtEl) {
			if (me.canvasPic) {
				if (window.myToolbar) {
					me.canvasPic.style.height = (h) + 'px';
					me.canvasPic.style.width = (w) + 'px';
				}
			}
			return
		}
		var toolbarH = this.toolCtEl.getHeight();

		if (h > 100 && !me.path) {
			if (this.grid) {
				this.grid.updateSettings({
					height: h - toolbarH,
					width: w
				}, false)
			}
		} else {
			this && this.grid && this.grid.render();
		}
	},
	afterRender: function() {
		this.callParent(arguments);
		if (this.path && this.fillReport) {
			//Ext.Msg.alert("提示", "加载模板方式不能编辑！", function () { })
			//return;
		}
		//return;
		//去掉遮罩层
		function hideFilm(parentNode) {
			var t = document.getElementById("film-for-" + parentNode.id);
			if (t) {
				var designerCmp = parentNode.component;
				//if (parentNode.component && parentNode.component.cid != 'tabpanel') {
				//    t.style.display = "none";
				//}
				if (designerCmp && (designerCmp.cid == 'panel' || designerCmp.cid == 'tabpanel')) {
					var cmp = Ext.getCmp(designerCmp.activeCmpId);
					cmp._isRpt = true;
				}
				hideFilm(parentNode.parentNode);
			}
		}
		var t = document.getElementById("film-for-" + this.viewerNode.id);
		if (t) {
			/*	t.style.display = "none";
			hideFilm(this.viewerNode.parentNode);
			//主viewport的遮罩层去掉
			var rootId = xds.inspector.root.childNodes[0].id;
			var rootMsk = document.getElementById("film-for-" + rootId);
			Ext.defer(function() {
				if (rootMsk) rootMsk.style.display = 'none';
			}, 100)
            */
		}
	},
	setCellTypes: function(cellType, col, attribute, r, c, initInfo, resultInfo) {
		var index = parseInt(col.fillcelltype);
		if (index > 0 && cellType) {
			var ctype = cellType[index];
			switch (ctype.type) {
				case "HyperLink":
					setHyperLink(ctype, attribute);
					break;
				case "id":
					setIdType(ctype, attribute)
					break;
				case "menu":
					setMenuType(ctype, attribute)
					break;
				case "Text":
					setTextInfo(ctype, attribute);
					break;
				case "order":
					setOrderType(ctype, attribute);
					break;
				case "guid":
					setGuidType(ctype, attribute);
					break;
				case "PassWord":
					setPasswordType(ctype, attribute)
					break;
				case "Number":
					setNumberType(ctype, attribute)
					break;
				case "Combox":
					setComboType(ctype, attribute, r, c, null, initInfo, this)
					break;
				case "dropdowntree":
					setDropDownTreeType(ctype, attribute, r, c, null, initInfo, this)
					break;
				case "vmdgrid":
					setDropDownGridType(ctype, attribute, r, c, null, initInfo, this)
					break;
				case "RadioGroup":
					setRadioGroupType(ctype, attribute, r, c, null, initInfo, this)
					break;
				case "CheckBoxGroup":
					setCheckBoxType(ctype, attribute, r, c, null, initInfo, this)
					break;
				case "UpLoad":
					setUpLoadType(ctype, attribute, r, c, null, initInfo, this)
					break;
				case "Approval":
					setApprovalType(ctype, attribute, r, c, null, initInfo, this)
					break;
				case "Date":
					setDateType(ctype, attribute, r, c, null, initInfo, this)
					break;
				case "Button":
					setButtonType(ctype, attribute, r, c, null, initInfo, this);
					break;
				case "SubRpt":
					setNestedType(ctype, attribute, r, c, null, initInfo, this)
					break;
				case "tx":
					break;
				case "jdt":
					break;
				case "RichEdit":
					setRichEditType(ctype, attribute)
					break;
			}
		} else {
			if (col.fillcelltype && cellType) {
				var ctype = cellType[col.fillcelltype];
				setNestedType(ctype, attribute)
				initInfo.readOnly.push({
					row: r,
					col: c
				})
			}
		}
	},
	// 判断两个数据集列表内容是否相等
	isDataSetEqual: function(ds1, ds2) {
		if (ds1 && ds2) {
			var dataset1 = ds1.split(',');
			var dataset2 = ds2.split(',');
			if (dataset1 && dataset2 && dataset1.length == dataset2.length) {
				var isEqual = [];
				for (var i = 0; i < dataset1.length; i++) {
					for (var j = 0; j < dataset2.length; j++) {
						if (dataset1[i] == dataset2[j]) {
							isEqual.push(true);
							break;
						} else {
							continue;
						}
					}
				}
				if (isEqual.length == dataset1.length == dataset2.length) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		}
	},
	/**
	 *@desc 兼容报表放到多层容器下不显示的问题，需重置承载容器高度和宽度
	 *@private
	 */
	_resize: function() {
		var me = this;
		var elH = me.getHeight();
		var elW = me.getWidth();
		var findParentCt = function(me) {
			var curH = me.getHeight();
			var curW = me.getWidth();
			//panel的header高度maxheight
			if ((curH < 80 || curW < 10) && me.ownerCt) {
				return findParentCt(me.ownerCt);
			} else return me;

		}
		if (elH < 10) {
			try {
				var ct = findParentCt(me.ownerCt);
				var ctH = ct.getHeight();
				if (ctH) {
					me.el.setHeight(ctH);
				}

			} catch (ex) {
				console.log('重新调整高度无效')
			}
		}
		if (elW < 10) {
			try {
				var ct = findParentCt(me.ownerCt);
				var ctW = ct.getWidth();
				var ctH = ct.getHeight();
				if (ctW) {

					me.el.setWidth(ctW);
					me.el.setHeight(ctH);
				}

			} catch (ex) {
				console.log('重新调整宽度无效')
			}
		}

		if (me.ownerCt.initialConfig.layout != 'fit') {
			//me.ownerCt.initialConfig.layout='fit';
			//me.ownerCt.initialConfig.x=0;
			//me.ownerCt.initialConfig.y=0;
			me.ownerCt.doLayout()
		}


	},
	// json结构模板的解析
	jsonModelParse: function(me) {
		var me = this;
		var filename = me.relativepath + "/" + me.path;
		var url = vmd.vmdUploadPath + 'FileService?FileName=' + filename;
		var myMask2 = new Ext.LoadMask(xds.canvas.el, {
			msg: '模板解析中，请稍后...'
		});
		myMask2.show();
		//debugger
		// me.hwRao.getJson(filename, "",
		// 	function(result) {
		//
		// 		var reportInfo = Ext.decode(result.data);
		// 		var initInfo = {};
		//
		// 		me.loadWebModelOnClould(reportInfo, initInfo);
		// 		me.initHdTablee(initInfo);
		//
		// 		if (reportInfo.main.submitrules && reportInfo.main.submitrules.length > 0) {
		// 			me.viewerNode.component.setConfig("fillReport", true);
		// 		}
		// 		if (reportInfo && reportInfo.main && reportInfo.main.config) {
		// 			me.config = reportInfo.main.config;
		// 		}
		//
		// 		if (typeof window.reportHistory == 'undefined') window.reportHistory = {};
		// 		window.reportHistory[me.viewerNode.id] = reportInfo;
		//
		// 		me.convertPic(me);
		//
		// 		myMask2.hide();
		// 		// var et = new Date().getTime();
		// 		// console.log('解析json模板加载' + me.viewerNode.id + '使用' + (et - st) + 'ms')
		// 	},
		// 	function(msg, f) {
		// 		myMask2.hide();
		// 		Ext.Msg.alert("错误信息", msg,
		// 			function() {})
		// 	}, me.configPath);
		hwDas.ajax({
			type: "get",
			url:vmd.virtualPath + "/" +filename,
			dataType: "json",
			success: function(res) {
				//debugger
				var reportInfo = res;
				var initInfo = {};

				me.loadWebModelOnClould(reportInfo, initInfo);
				me.initHdTablee(initInfo);

				if (reportInfo.main.submitrules && reportInfo.main.submitrules.length > 0) {
					me.viewerNode.component.setConfig("fillReport", true);
				}
				if (reportInfo && reportInfo.main && reportInfo.main.config) {
					me.config = reportInfo.main.config;
				}

				if (typeof window.reportHistory == 'undefined') window.reportHistory = {};
				window.reportHistory[me.viewerNode.id] = reportInfo;

				me.convertPic(me);

				myMask2.hide();
			}
		});
	},
	// xml模板的解析
	xmlModelParse: function(me) {

		if (!me.relativepath) {
			var repath = "report/" + getUrlParam("path");
			repath = repath.substring(0, repath.indexOf(".vmd"));
			me.relativepath = repath
		}
		filePath = me.relativepath + "/" + me.path
		if (me.relativepath.indexOf("report/") == -1 && (me.relativepath.indexOf("Resources//Report") != -1 || me.relativepath.indexOf("Resources/Report") != -1)) {
			if(filePath.indexOf("Resources//Report") != -1 	){
				   filePath=filePath.replace("Resources//Report","Resources/Report");
		        }
			filePath = "report/" + filePath;
		}
		var myMask2 = new Ext.LoadMask(xds.canvas.el, {
			msg: '模板解析中，请稍后...'
		});
		myMask2.show();
		me.hwRao.getJson(filePath, "",
			function(result) {
				try {
					var reportInfo = Ext.decode(result.data);
					var s = "";
					if (reportInfo && reportInfo.main && reportInfo.main.datasource && reportInfo.main.datasource.tables) {
						var tb = reportInfo.main.datasource.tables;
						var data = [];
						var dsArray;
						//if (me.dsnames) {
						//	dsArray = me.dsnames.split(',');
						//}
						var dsCount = 0;
						for (key in tb) {
							var storeName = tb[key];
							//if (dsArray && dsArray.length > dsCount) {
							//	s += dsArray[dsCount] + ",";
							//} else {
							s += storeName.factname + ",";
							//}
							var resultInfo = storeName.saveserver;
							if (resultInfo) {
								var store = "{";
								if (resultInfo.id) {
									store += "\"id\":\"" + resultInfo.id + "\",";
								}
								if (resultInfo.params && resultInfo.params.CallCode) {
									var callcode = resultInfo.params.CallCode.replace(/\"/g, "");
									store += "\"callcode\":\"" + callcode + "\",";
								}
								if (resultInfo.path) {
									store += "\"url\":\"" + resultInfo.path + "\",";
								}
								store += "\"host\":\"\",";
								store += "\"isHwRest\":true,";
								if (resultInfo.name) {
									store += "\"name\":\"" + resultInfo.name + "\",";
								}
								store += "\"fields\":[],";
								store += "\"getMethods\":[],";
								store += "\"postMethods\":[],";
								store += "\"putMethods\":[],";
								store += "\"deleteMethods\":[],";
								store += "\"saveMethods\":[]";
								store += "}";
								var name = storeName.factname || resultInfo.name || resultInfo.id;
								var dname = resultInfo.name || resultInfo.id;
								//if (dsArray && dsArray.length > dsCount) {
								//	name = dsArray[dsCount];
								//}
								data.push({
									cid: 'vmdJsonStore',
									id: name,
									storeConfig: store,
									autoLoad: false,
									dsName: storeName.name || storeName.factname,
									fieldname: tb[key].fieldname
								});
								var isChecked = /^[\u4e00-\u9fa5\w]+$/.test(name);
								if (!isChecked) {
									Ext.Msg.alert("错误信息", "数据集" + name + "命名不规范，含有特殊字符，请修改后再试！",
										function() {});
									myMask2.hide();
									return;
								}
								var currentDs = xds.vmd.getStoreByDsName(name, true);
								var dcurrentDs = xds.vmd.getStoreByDsName(dname, true);
								dsCount++;
								if (currentDs) {
									currentDs.component.setConfig("dsName", me.viewerNode.id + "_" + storeName.name || name);
									continue;
								}
								if (dcurrentDs) {
									dcurrentDs.component.setConfig("dsName", me.viewerNode.id + "_" + storeName.name || name);
									continue;
								}
								parent.xds.vmd.addNode(data)

							}
						}

						/*// 添加数据集下子节点
						for (var i = 0; i < data.length; i++) {
							debugger
							var fields = [];
							for (var n = 0; n < data[i].fieldname.length; n++) {
								fields.push({
									cid: 'datafield',
									name: data[i].fieldname[n]
								})
							}
							parent.xds.vmd.deleteChildNodeById(data[i].id)
							parent.xds.vmd.addNode(fields, data[i].id)
						}*/
						// 关联数据集
						if (reportInfo.main.datasource.relatetables) {
							me.relatetables = reportInfo.main.datasource.relatetables;
						}
					}
					if (s.length > 1) {
						s = s.substring(0, s.length - 1);
					}
					if (reportInfo && reportInfo.main && reportInfo.main.config) {
						me.config = reportInfo.main.config;
					}
					me.viewerNode.component.setConfig("dsnames", s);
					me.viewerNode.component.setConfig("relativepath", me.relativepath);
					var initInfo = {};

					me.loadWebModelOnClould(reportInfo, initInfo);
					me.initHdTablee(initInfo);
					if (typeof window.reportHistory == 'undefined') window.reportHistory = {};
					window.reportHistory[me.viewerNode.id] = reportInfo;
					me.convertPic(me);

					if (reportInfo.main.submitrules && reportInfo.main.submitrules.length > 0) {
						me.viewerNode.component.setConfig("fillReport", true);
					}
					myMask2.hide();
				} catch (ex) {
					myMask2.hide();
				}
			},
			function(msg, f) {
				myMask2.hide();
				Ext.Msg.alert("错误信息", msg,
					function() {})
			}, me.configPath);
	},
	// 分栏分片获取合并单元格的第一个单元格进行图形标识绘制 
	//2018.10.27 lf
	getSpanCell: function(me, row, col) {
		var cell = me.grid.cells2(row, col).cell;
		if (cell.colSpan > 1) {
			if (cell._cellIndex + cell.colSpan - 1 == col) {
				return cell;
			}
		}
		if (cell._cellIndex == col) {
			return cell;
		} else {
			cell = me.getSpanCell(me, row, col - 1);
			if (cell._cellIndex != col) {
				cell = me.getSpanCell(me, row - 1, col)
			}
			if (cell._cellIndex != col) {
				cell = me.getSpanCell(me, row - 1, col - 1)
			}
		}
		return cell;
	},
	//获取使用的数据集
	getApplayDataset: function(name, ds) {
		// 
		for (var key in ds) {
			if (name == ds[key].id) {
				return ds[key];
			}
		}
		return null;
	},
	//获取可视化中定义的所有数据集
	getDatasetNames: function() {
		var names = {};
		var i = 0;
		var storeRoot = xds.vmd.getRootNode("dataset");
		if (storeRoot) {
			storeRoot.eachChild(function(n) {
				names[i] = n;
				i++
			}, this);
		}

		return names;
	},
	setDrag: function(el) {
		var me = this;
		var formPanelDropTargetEl = this.el;
		dataArr = [];

		//formPanelDropTargetEl
		var formPanelDropTarget = this.gridEl && new Ext.dd.DropTarget(this.gridEl, {
			group: 'TreeDD',
			notifyOver: function(ddSource, e, data) {

				if (vmd(e.target).hasClass('el-film')) {
					xds.canvas && xds.canvas.dropZone.addToGroup('TreeDD')
				} else {
					//if(vmd(e.target).parent('th').length) xds.canvas && xds.canvas.dropZone.addToGroup('TreeDD');
					//else xds.canvas && xds.canvas.dropZone.removeFromGroup('TreeDD')
			
				}



				var td = e.target || e.srcElement;
				var nodeCmp = data.node && data.node.component;
				if (td.tagName == 'TD') {
					vmd(me.grid.table).find('td').removeClass('cell-active').removeClass('cell-active-leftnone');
					if (nodeCmp && nodeCmp.config && nodeCmp.config.xtype == "vmd.jsonStore") {
						//多个字段拖拽
						var cellprop = td.cellprop;
						var _inst = cellprop.instance;
						var _row = cellprop.row;
						var _col = cellprop.col;
						var nodes = nodeCmp.node && nodeCmp.node.childNodes;
						var ln = nodes && nodes.length || 1;
						for (var i = 0; i < ln; i++) {
							var td = _inst.getCell(_row, _col + i);

							if (i == 0) {
								vmd(td).addClass('cell-active');
							} else {
								vmd(td).addClass('cell-active-leftnone');
							}
						}
					} else {
						//单个字段拖拽
						vmd(td).addClass('cell-active');
					}
				}
				return "x-dd-drop-ok";
			},

			notifyOut: function(ddSource, e, data) {
				if (me && me.grid && me.grid.table) {
					vmd(me.grid.table).find('td').removeClass('cell-active').removeClass('cell-active-leftnone');
				}
			},
			notifyDrop: function(ddSource, e, data) {

				var setNodeConfig = function(_obj) {
					if (Ext.isEmptyObject(_obj.config)) {
						_obj.config = {
							xtype: _obj.cid,
							name: _obj.name
						}
					}
				}
				var setCellInfo = function(val, info, index) {
					cellprop = (e.target || e.srcElement).cellprop;
					if (!cellprop) return
					var cell_col = cellprop.col;
					var cell_row = cellprop.row;
					index = index || 0;
					var temp = [cell_row, cell_col + index, val];
					dataArr.push(temp)
					// 添加数据集信息
					// if (typeof gridCellInfoObject != 'undefined') {
					// 	if (!cellprop.cellAttributeInfo) {
					// 		cellprop.cellAttributeInfo = new gridCellInfoObject();
					// 	}
					// 	cellprop.cellAttributeInfo.dataSet = info.dataSet;
					// 	cellprop.cellAttributeInfo.field = info.field;
					// 	cellprop.cellAttributeInfo.opration = "single";
					// }
				}

				var tt = e.target;
				var selectCell, cellprop;
				var nodeCmp = data.node && data.node.component;
				if (data && data.node) {
					if (nodeCmp) {
						if (nodeCmp.config) {
							//mafei 兼容处理
							setNodeConfig(nodeCmp);
							if (nodeCmp.config.xtype == "datafield") {
								var val = "=" + nodeCmp.owner.config.id + "." + nodeCmp.config.name;
								setCellInfo(val, {
									dataSet: nodeCmp.owner.config.id,
									field: nodeCmp.config.name
								});
								me.grid.setDataAtCell(dataArr)
								dataArr = [];
								return true;
							} else if (nodeCmp.config.xtype == "vmd.jsonStore") {
								var nodes = nodeCmp.node && nodeCmp.node.childNodes;
								if (nodes && nodes.length > 0) {
									Ext.each(nodes, function(node, index) {
										var cmp = node.component;
										setNodeConfig(cmp);
										var val = "=" + nodeCmp.id + "." + cmp.config.name;
										setCellInfo(val, {
											dataSet: nodeCmp.owner.config.id,
											field: cmp.config.name
										}, index);
									})
									me.grid.setDataAtCell(dataArr)
									dataArr = [];
								}
								return true;
							}
						}
					}
				}

				//xds.canvas.dropZone.addToGroup('TreeDD')
				return false;

			}
		});
	},
	// 英文字母的转换
	convert: function(n) {
		var s = '';
		while (n > 0) {
			var m = n % 26;
			if (m == 0) m = 26;
			s = String.fromCharCode(m + 64) + s;
			n = (n - m) / 26;
		}
		return s;
	},
	onEventsReg: function(My, Mygrid) {},
	onEditCell: function(e) {},
	onEnter: function(e) {},
	onDestroy: function() {
		if (this.rendered) {
			//bug修复，清除dhx组件拖拽就在body中累加的combo的dom结构
			Ext.select('body>div[class*=dhxgridlist]').remove();
		}
	},
	setEvents_load: function(events, attribute, info, row, col, fillcelltype, initInfo) {
		// initInfo.events;
		var ctype = info.event;
		var type;

		switch (attribute.contentInfo.cmbType.value) {
			case 'wb':
				type = 'text'
				break;
			case 'sz':
				type = 'number'
				break;
			case 'xlk':
				type = 'combo'
				break;
			case 'xls':
				type = 'combotree'
				break;
			case 'xlwg':
				type = 'combogrid'
				break;
			case 'dxan':
				type = 'radio'
				break;
			case 'fxk':
				type = 'checkbox'
				break;
			case 'sczj':
				type = 'upload'
				break;
			case 'fwb':
				type = 'richedit'
				break;
			case 'spzj':
				type = 'approval'
				break;
			case 'rq':
				type = 'date'
				break;
			case 'an':
				type = 'button'
				break;
		}
		if (ctype) {
			var eve = events[ctype];
			if (eve && eve.change) {
				if (typeof eve.change == 'string') {
					initInfo.events.push({
						row: row,
						col: col,
						name: type + '_change',
						value: eve.change
					})
				} else {
					var event = eve.change;
					var text;
					for (var i = 0; i < event.length; i++) {
						if (event[i].name && event[i].dataSet) {
							text = "/*" + event[i].name + "(" + event[i].dataSet + ")" + "*/"
						} else
						if (event[i].name && event[i].javascript) {
							text = "/*" + event[i].javascript + "*/"
						} else
						if (event[i].name && event[i].rptName) {
							text = "/*" + event[i].name + "(" + event[i].rptName + ")" + "*/"
						} else {
							text = "/*" + event[i].name + "(" + ")" + "*/"
						}
					}
					var val;
					var funcName = (me.rootScope.viewerNode.id + "_" + me.numToEng(col) + (row + 1) + "_" + type + "_change").toLowerCase();
					var func = "function " + funcName + "(sender)" + "{\n" + text + "\n}"
					var code = xds.vmd.events;
					if (code.indexOf(func) == -1) {
						val = code + '\n' + func;
					} else {
						val = code
					}
					if (val.trim()) {
						xds.vmd.events = val;
						initInfo.events.push({
							row: row,
							col: col,
							name: type + '_change',
							value: funcName
						})
					}
				}
			}
			if (eve && eve.dbclick) {
				if (typeof eve.dbclick == 'string') {
					initInfo.events.push({
						row: row,
						col: col,
						name: type + '_dblclick',
						value: eve.dbclick
					})
				} else {
					var event = eve.dbclick;
					var text;
					for (var i = 0; i < event.length; i++) {
						if (event[i].name && event[i].dataSet) {
							text = "/*" + event[i].name + "(" + event[i].dataSet + ")" + "*/"
						} else
						if (event[i].name && event[i].javascript) {
							text = "/*" + event[i].javascript + "*/"
						} else
						if (event[i].name && event[i].rptName) {
							text = "/*" + event[i].name + "(" + event[i].rptName + ")" + "*/"
						} else {
							text = "/*" + event[i].name + "(" + ")" + "*/"
						}
					}
					var val;
					var funcName = (me.rootScope.viewerNode.id + "_" + me.numToEng(col) + (row + 1) + "_" + type + "_dbclick").toLowerCase();
					var func = "function " + funcName + "(sender)" + "{\n" + text + "\n}"
					var code = xds.vmd.events;
					if (code.indexOf(func) == -1) {
						val = code + '\n' + func;
					} else {
						val = code
					}
					if (val.trim()) {
						xds.vmd.events = val;
						initInfo.events.push({
							row: row,
							col: col,
							name: type + '_dblclick',
							value: funcName
						})
					}
				}
			}
			if (eve && eve.click) {
				if (typeof eve.click == 'string') {
					if (fillcelltype && fillcelltype.url) {
						initInfo.events.push({
							row: row,
							col: col,
							name: 'linkEvent',
							value: eve.click
						})
					} else {
						initInfo.events.push({
							row: row,
							col: col,
							name: type + '_click',
							value: eve.click
						})
					}
				} else {
					var event = eve.click;
					var text;
					for (var i = 0; i < event.length; i++) {
						if (event[i].name && event[i].dataSet) {
							text = "/*" + event[i].name + "(" + event[i].dataSet + ")" + "*/"
						} else
						if (event[i].name && event[i].javascript) {
							text = "/*" + event[i].javascript + "*/"
						} else
						if (event[i].name && event[i].rptName) {
							text = "/*" + event[i].name + "(" + event[i].rptName + ")" + "*/"
						} else {
							text = "/*" + event[i].name + "(" + ")" + "*/"
						}
					}
					var val;
					var funcName = (me.rootScope.viewerNode.id + "_" + me.numToEng(col) + (row + 1) + "_" + type + "_click").toLowerCase();
					var func = "function " + funcName + "(sender)" + "{\n" + text + "\n}"
					var code = xds.vmd.events;
					if (code.indexOf(func) == -1) {
						val = code + '\n' + func;
					} else {
						val = code
					}
					if (val.trim()) {
						xds.vmd.events = val;
						initInfo.events.push({
							row: row,
							col: col,
							name: type + '_click',
							value: funcName
						})
					}
				}
			}
			if (eve && eve.itemClick) {
				attribute.menu.menuEvent.value = eve.itemClick
			}
			if (eve && eve.approval) {
				attribute.cell_ApprovlInfo.spzj_approval.value = eve.approval
			}
		}
	},
	specialCharacter: function(str) {
		try {
			if (str != null) {
				str = str.replace(/&lt;/g, "<");
				str = str.replace(/&gt;/g, ">");
				str = str.replace(/&amp;/g, "&");
				str = str.replace(/&apos;/g, "\'");
				str = str.replace(/&quot;/g, "\"");
				return str;
			} else {
				return '';
			}
		} catch (ex) {

		}
	},
	getCellInfoOnClould: function(row, section, resultInfo, number, rowtype, initInfo) {

		var me = this;
		var style = resultInfo.style || resultInfo.main.style;
		var cellType = resultInfo.main.celltypes;
		for (var rw = 0; rw < row.length; rw++) {
			var rowInfo = row[rw];
			var rr = rw + number + parseInt(section.startrow) - 1;
			if (!initInfo.data[rr]) initInfo.data[rr] = [];

			if (!initInfo.attribute[rr]) initInfo.attribute[rr] = [];
			var cn = '';
			if (rowtype == 'title') cn = '标题';
			if (rowtype == 'header') cn = '表头';
			if (rowtype == 'data') cn = '数据';

			if (rowInfo.height == '0') {
				initInfo.rowHeadHeightArray[rr] = 0
				initInfo.hideRow.push(rr)
				initInfo.rowHeadArray[rr] = (rr + 1) + cn + "<i class='report-iconfont icon-yincang font-20'></i>"
			} else {
				initInfo.rowHeadHeightArray[rr] = rowInfo.height;
				initInfo.rowHeadArray[rr] = (rr + 1) + cn
			}
			var cellCount = rowInfo.cells.length;

			for (var c = 0; c < cellCount; c++) {
				var col = rowInfo.cells[c];
				var colid = c + parseInt(section.startcol) - 1;
				var attribute = new gridCellInfoObject();
				var colAlignId = parseInt(col.align);
				// if(resultInfo.main.body.columns.width[c] == 0){
				// 	this.setCellMeta(0, c, 'col_hide', true);
				// }
				if (style && style.aligns) {
					var colAlign = style.aligns[colAlignId];
					attribute.alignInfo.align.value.HAlign.value = colAlign.halign;
					attribute.alignInfo.align.value.VAlign.value = colAlign.valign;
				}
				//数据信息解析
				//
				var value;
				if (col.data == '') {
					attribute.textValue.value = ''
					value = ''
				} else {
					attribute.textValue.value = this.specialCharacter(col.data);
					value = this.specialCharacter(col.data);
				}

				if (col.datavalue) {
					attribute.textValue.value = this.specialCharacter(col.datavalue);
					value = this.specialCharacter(col.datavalue);
				}

				initInfo.data[rr].push(value)

				var linkid = parseInt(col.links)
				if (linkid && resultInfo && resultInfo.main && resultInfo.main.links) {
					var link = resultInfo.main.links[linkid];
					if(link){
						attribute.leftLink.linkParam.value = link.param;
					}		
				}
				var eventid = parseInt(col.event)
				if (eventid && resultInfo && resultInfo.main && resultInfo.main.events) {
					var event = resultInfo.main.events[eventid];
					if(event&&!col.fillcelltype){
						attribute.leftLink.linkEvent.value = event.click;
					    attribute.menu.menuEvent.value = event.itemClick;
					}
				}
				var menuId = parseInt(col.menus)
				if (menuId && resultInfo && resultInfo.main && resultInfo.main.menus) {
					var menu = resultInfo.main.menus[menuId];
					if(menu){
						attribute.menu.menuID.value = menu.id;
						attribute.menu.menuParam.value = menu.param;
						attribute.menu.menuSource.value = menu.source;
						attribute.menu.menuDataset.value = menu.sets;
						attribute.menu.cmbMenuID.value = menu.cmbMenuID;
						attribute.menu.menuChoose.checked = menu.choose;
						attribute.menu.menuPID.value = menu.pid;
						attribute.menu.menuText.value = menu.text;
					}
				}
				if (colAlign && colAlign.textcontrol) attribute.alignInfo.textControl.value = colAlign.textcontrol;
				if (colAlign && colAlign.escapelabel) {
					if (colAlign.escapelabel == 0) {
						attribute.alignInfo.escapelabel.checked = false;
					} else {
						attribute.alignInfo.escapelabel.checked = true;
					}
				}
				if (colAlign && colAlign.txtdirection) attribute.alignInfo.textDirection.value = colAlign.txtdirection;
				if (colAlign && colAlign.rotation) attribute.alignInfo.rotation.value = colAlign.rotation;
				if (colAlign && colAlign.singlerotation) attribute.alignInfo.singleRotation.value = colAlign.singlerotation;
				if (colAlign && colAlign.autoenter) attribute.alignInfo.autoenter.value = colAlign.autoenter;
				if (colAlign && colAlign.padding) {
					var p = colAlign.padding;
					var pp = p.split(' ');
					attribute.alignInfo.topPadding.value = pp[0];
					attribute.alignInfo.bottomPadding.value = pp[2];
					attribute.alignInfo.leftPadding.value = pp[3];
					attribute.alignInfo.rightPadding.value = pp[1];
				}
				if (colAlign && colAlign.rowspace) attribute.alignInfo.verticalSpace.value = colAlign.rowspace;
				if (col.hparent) {
					attribute.extraInfo.leftParent.value = col.hparent;
				}
				if (col.vparent) {
					attribute.extraInfo.rightParent.value = col.vparent;
				}
				if (col.expand == "1") {
					attribute.extraInfo.direction.value = "3";
				} else if (col.expand == "2") {
					attribute.extraInfo.direction.value = "2";
				} else {
					attribute.extraInfo.direction.value = "1";
				}
				if (col.bgcolorexp) {
					attribute.contentDetailInfo.nr_bgColorCheck.checked = true;
					attribute.contentDetailInfo.nr_bgColor.value = col.bgcolorexp;
				}
				if (col.forecolorexp) {
					attribute.contentDetailInfo.nr_frontColorCheck.checked = true;
					attribute.contentDetailInfo.nr_frontColor.value = col.forecolorexp;
				}
				if (col.leftmargin) {
					attribute.contentDetailInfo.nr_leftMarginCheck.checked = true;
					attribute.contentDetailInfo.nr_leftMargin.value = col.leftmargin;
				}
				if (col.fontsexp) {
					attribute.contentDetailInfo.nr_rowTextCheck.checked = true;
					attribute.contentDetailInfo.nr_rowText.value = col.fontsexp;
				}
				if (col.widthexp) {
					attribute.contentDetailInfo.nr_widthCheck.checked = true;
					attribute.contentDetailInfo.nr_width.value = col.widthexp;
				}
				if (col.enableexp) {
					attribute.contentDetailInfo.nr_availableCheck.checked = true;
					attribute.contentDetailInfo.nr_available.value = col.enableexp;
				}
				if (col.heightexp) {
					attribute.contentDetailInfo.nr_heightCheck.checked = true;
					attribute.contentDetailInfo.nr_height.value = col.heightexp;
				}
				if(col.bottomMerged){
					attribute.contentDetailInfo.nr_sameValueDown.checked = true;
				}
				if(col.btmmergeconditionexp){
					attribute.contentDetailInfo.nr_downDependencies.value = col.btmmergeconditionexp;
				}
				if(col.rightMerged){
					attribute.contentDetailInfo.nr_sameValueRight.checked = true;
				}
				if(col.rgtmergeconditionexp){
					attribute.contentDetailInfo.nr_rightDependencies.value = col.rgtmergeconditionexp;
				}
				var f = parseInt(col.fonts);
				if (style && style.fonts && style.fonts[f]) {
					var ff = style.fonts[f];
					attribute.fontInfos.fontFamily.value = ff.name;
					if ((ff.weight == "700" || ff.weight == "1") && ff.italic == "1") {
						attribute.fontInfos.fontShape.value = "italic";
						attribute.fontInfos.fontWeight.value = "bold";
					} else if (ff.weight == "700" || ff.weight == "1") {
						attribute.fontInfos.fontWeight.value = "bold";
					} else if (ff.italic == "1") {
						attribute.fontInfos.fontShape.value = "italic";
					} else {
						attribute.fontInfos.fontShape.value = "";
						attribute.fontInfos.fontWeight.value = "";
					}
					attribute.fontInfos.fontSize.value = ff.size;
					if (ff.unline == "1") {
						attribute.fontInfos.underline.value = "underline";
					} else {
						attribute.fontInfos.underline.value = "";
					}
					if (ff.color) {
						attribute.fontInfos.ColorSelect.value = ff.color.colorHex();
					}
					attribute.fontid = col.fonts;
					if (typeof col.forecolor == 'object') {
						var temp = ''
						for (var key in col.forecolor) {
							temp += col.forecolor[key]
						}
						attribute.fontInfos.ColorSelect.value = temp;
					} else if (typeof col.forecolor == 'string') {
						attribute.fontInfos.ColorSelect.value = col.forecolor.colorHex();
					}
				}
				var b = parseInt(col.borders);
				if (style && style.borders && style.borders[b]) {
					var bb = style.borders[b];
					if (bb.bottom && bb.bottom == "0,RGB(255,255,255),0") {
						attribute.borderInfo.borderB.value = 'none';
					} else {
						if (bb.bottom && bb.bottom != "1,RGB(204,204,204),0") {
							var temp = bb.bottom.split(',');
							var rgb = temp[1] + ',' + temp[2] + ',' + temp[3];
							if (rgb.indexOf('px') == -1) {
								attribute.borderInfo.borderB.value = '1px solid ' + rgb;
							} else {
								attribute.borderInfo.borderB.value = rgb;
							}
						}
					}
					if (bb.top && bb.top == "0,RGB(255,255,255),0") {
						attribute.borderInfo.borderT.value = 'none';
					} else {
						if (bb.top && bb.top != "1,RGB(204,204,204),0") {
							var temp = bb.top.split(',');
							var rgb = temp[1] + ',' + temp[2] + ',' + temp[3];
							if (rgb.indexOf('px') == -1) {
								attribute.borderInfo.borderT.value = '1px solid ' + rgb;
							} else {
								attribute.borderInfo.borderT.value = rgb;
							}
						}
					}
					if (bb.left && bb.left == "0,RGB(255,255,255),0") {
						attribute.borderInfo.borderL.value = 'none';
					} else {
						if (bb.left && bb.left != "1,RGB(204,204,204),0") {
							var temp = bb.left.split(',');
							var rgb = temp[1] + ',' + temp[2] + ',' + temp[3];
							if (rgb.indexOf('px') == -1) {
								attribute.borderInfo.borderL.value = '1px solid ' + rgb;
							} else {
								attribute.borderInfo.borderL.value = rgb;
							}
						}
					}
					if (bb.right && bb.right == "0,RGB(255,255,255),0") {
						attribute.borderInfo.borderR.value = 'none';
					} else {
						if (bb.right && bb.right != "1,RGB(204,204,204),0") {
							var temp = bb.right.split(',');
							var rgb = temp[1] + ',' + temp[2] + ',' + temp[3];
							if (rgb.indexOf('px') == -1) {
								attribute.borderInfo.borderR.value = '1px solid ' + rgb;
							} else {
								attribute.borderInfo.borderR.value = rgb;
							}
						}
					}
				}
				attribute.borderid = col.borders;
				if (col.backgroundcolor) {
					var bg = col.backgroundcolor;
					if (typeof bg == 'string') {
						attribute.bgcolorInfo.ColorSelectInner.value = col.backgroundcolor
					} else if (typeof bg == 'object') {
						var temp = '';
						for (var key in bg) {
							temp += bg[key];
						}
						attribute.bgcolorInfo.ColorSelectInner.value = temp
					}
				}
				var m = parseInt(col.number);
				if (style && style.numbers && style.numbers[m]) {
					var numinfo = style.numbers[m];
					if (numinfo.type == '0') {
						attribute.numberInfo.allSortCom.value = "myConventional";
					} else
					if (numinfo.type == "1") {
						attribute.numberInfo.allSortCom.value = "myNumber";
						if (typeof numinfo.decimal != 'undefined') {
							attribute.numberInfo.xs.value = parseInt(numinfo.decimal);
						} else {
							attribute.numberInfo.xs.value = 0;
						}
						if (typeof numinfo.separator != 'undefined') {
							attribute.numberInfo.useCommaCheckBox.checked = true;
						}
						if (numinfo.showzero) {
							attribute.numberInfo.noZeroCheckBox.checked = true;
						}
						if (numinfo.numbering) {
							attribute.numberInfo.numShowType.value = numinfo.numbering;
						}
					} else
					if (numinfo.type == "2") {
						attribute.numberInfo.allSortCom.value = "myCurrency";
						if (typeof numinfo.decimal != 'undefined') {
							attribute.numberInfo.xs1.value = parseInt(numinfo.decimal);
						} else {
							attribute.numberInfo.xs1.value = 0;
						}
						if (numinfo.showzero) {
							attribute.numberInfo.noZeroCheckBox1.checked = true;
						}
					} else
					if (numinfo.type == "3") {
						attribute.numberInfo.allSortCom.value = "myDate";
						attribute.numberInfo.dateSortCom.value = numinfo.dateformat;
					} else
					if (numinfo.type == "4") {
						attribute.numberInfo.allSortCom.value = "myTime";
					} else
					if (numinfo.type == "5") {
						attribute.numberInfo.allSortCom.value = "myPercentage";
						if (typeof numinfo.decimal != 'undefined') {
							attribute.numberInfo.xs3.value = parseInt(numinfo.decimal);
						} else {
							attribute.numberInfo.xs3.value = 0;
						}
						if (numinfo.showzero) {
							attribute.numberInfo.noZeroCheckBox3.checked = true;
						}
					} else
					if (numinfo.type == "6") {
						attribute.numberInfo.allSortCom.value = "mySciCounting";
						if (typeof numinfo.decimal != 'undefined') {
							attribute.numberInfo.xs4.value = parseInt(numinfo.decimal);
						} else {
							attribute.numberInfo.xs4.value = 0;
						}
						if (numinfo.showzero) {
							attribute.numberInfo.noZeroCheckBox4.checked = true;
						}
					} else
					if (numinfo.type == "7") {
						attribute.numberInfo.allSortCom.value = "myText";
					} else
					if (numinfo.type == "8") {
						attribute.numberInfo.allSortCom.value = "mySpecial";
					}
				}
				attribute.numberid = col.number;
				// 单元格类型
				me.setCellTypes(cellType, col, attribute, rr, colid, initInfo, resultInfo)

				if (col.showvalue) attribute.showValue.value = this.specialCharacter(col.showvalue);

				if (col.merged == "1") {
					var mobj;
					var cs;
					var rs;
					var colspan = 1;
					var rowspan = 1;
					if (col.colspan && parseInt(col.colspan)) {
						colspan = parseInt(col.colspan);
					}
					if (col.rowspan && parseInt(col.rowspan)) {
						rowspan = parseInt(col.rowspan);
					}
					cs = colspan;
					rs = rowspan;
					mobj = {
						row: rr,
						col: colid,
						rowspan: rs,
						colspan: cs
					};
					initInfo.mergeInfo.push(mobj)
					for (var i = mobj[0]; i < mobj[2]; i++) {
						for (n = mobj[1]; n < mobj[3]; n++) {}
					}
				}
				if (col.subrptindex != "undefined" && col.subrptindex >= 0) {
					me.setSubRptInfo(initInfo, col, resultInfo, rr, colid, initInfo);
				}
				if (resultInfo && resultInfo.main && resultInfo.main.events) {
					//设置取到的事件
					me.setEvents_load(resultInfo.main.events, attribute, col, rr, colid, resultInfo.main.celltypes[col.fillcelltype], initInfo)
				}
				try {
					initInfo.attribute[rr].push(attribute);
				} catch (ex) {

				}
			}
		}
	},
	engToNum: function(value) {
		if (value) {
			var num = '';
			if (value.length == 1) {
				num = value.charCodeAt() - 64;
			}
			if (value.length == 2) {
				var p1 = value.charAt(0);
				var p2 = value.charAt(1);
				var count = p1.charCodeAt() - 64;
				num = (count * 26) + p2.charCodeAt() - 64;
			}
			return num;
		}
	},
	numToEng: function(colIndex) {
		var num = colIndex + 1;
		var stringName = "";
		if (num > 0) {
			if (num >= 1 && num <= 26) {
				stringName = String.fromCharCode(64 + parseInt(num));
			} else {
				while (num > 26) {
					var count = parseInt(num / 26);
					var remainder = num % 26;
					if (remainder == 0) {
						remainder = 26;
						count--;
						stringName = String.fromCharCode(64 + parseInt(remainder)) + stringName;
					} else {
						stringName = String.fromCharCode(64 + parseInt(remainder)) + stringName;
					}
					num = count;
				}
				stringName = String.fromCharCode(64 + parseInt(num)) + stringName;
			}
		}
		return stringName;
	},
	/**
	 * 报表生产快照方法
	 * @param {Object} me 报表对象
	 */
	convertPic: function() {
		var me = this;
		if (html2canvas) {
			if (typeof me.canvasPic == 'undefined') {
				Ext.defer(function() {
					me.el.dom && html2canvas(me.el.dom, {
						logging: false
					}).then(function(canvas) {
						xds.vmd.canvaslist.add(me.viewerNode.id, canvas.toDataURL());
					});
				}, 50)
			}
		} else {
			vmd.tip('单个嵌套子表不允许最大化', 'error')
		}

	}
})

function empty(e) {
	for (var t; t = e.lastChild;) e.removeChild(t)
}

function fastInnerText(e, t) {
	var n = e.firstChild;
	n && 3 === n.nodeType && null === n.nextSibling ? textContextSupport ? n.textContent != t && (n.textContent = t) : n.data = t : (empty(e), t && e.appendChild(document.createTextNode(t)))
}

function BorderCalculate() {
	var e = function(e) {
		return e > 255 || e < 0 ? e : e >= 0 && e <= 10 ? e + 15 : e > 10 && e <= 30 ? e - 5 : e > 30 && e < 50 ? e - 10 : e > 50 && e <= 100 ? e - 15 : e > 100 && e <= 200 ? e - 30 : e > 200 && e <= 235 ? e - 40 : e > 235 && e <= 255 ? e - 50 : void 0
	};
	this.toCalculateColor = function(t) {
		var n = function(e) {
				var t = e.match(/^#(..)(..)(..)$/);
				if (t && t.length) return {
					r: parseInt(t[1], 16),
					g: parseInt(t[2], 16),
					b: parseInt(t[3], 16)
				}
			}(t),
			o = n && function(t, n, o) {
				var r = {};
				return r.r = e(t), r.g = e(n), r.b = e(o), r
			}(n.r, n.g, n.b);
		return o && function(e) {
			var t = "";
			return void 0 !== e.r && void 0 !== e.g && void 0 !== e.b && (t = "#" + (1 === e.r.toString(16).length ? "0" + e.r.toString(16) : e.r.toString(16)) + (1 === e.g.toString(16).length ? "0" + e.g.toString(16) : e.g.toString(16)) + (1 === e.b.toString(16).length ? "0" + e.b.toString(16) : e.b.toString(16))), t
		}(o)
	}
}