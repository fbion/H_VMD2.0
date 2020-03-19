/******************************************************************
 ** 文件名: Chart.js
 ** Copyright (c) 2017-2019 汉威公司技术研究院
 ** 创建人:马飞
 ** 日 期:2019-08-26
 ** 修改人:黄娜
 ** 日 期:2018-08-26 
 ** 描 述:曲线设计模式创建及设计时组件构建
 ** 版 本:1.0
 ******************************************************************/
//设计模式曲线对象拆分
Ext.define('ide.ext.Chart', {
	constructor: function() {}
})

if (typeof xds != "undefined") {
	xds.vmdChart = Ext.extend(xds.Component, {
		cid: "vmdChart",
		category: "vmdChart组件",
		defaultName: "&lt;chart&gt;",
		text: "chart(曲线)",
		dtype: "vmd.dchart",
		//这里的xtype主要是为了代码显示的类型，本身无任何作用
		xtype: "vmd.chart",
		xcls: "vmd.chart",
		iconCls: "icon-chart",
		version: "",
		//控制是否可以拖拽
		isResizable: function(a, b) {
			//a为上下左右的位置方向
			return true;
		},
		naming: "chart",
		isContainer: false,
		//是否显示右下角的组件说明
		filmCls: "el-film-nolabel",
		//默认属性设置
		defaultConfig: {
			text: "chart",
			relativepath: "Resources//Report",
			size: "small",
			nousedataset: false
		},
		//属性设置
		configs: [{
				name: "load",
				group: "事件",
				editor: "ace",
				ctype: "string",
				params: "chart"
			}, {
				name: "click",
				group: "事件",
				editor: "ace",
				ctype: "string",
				params: "chart,e"
			}, {
				name: "SeriesClick",
				group: "事件",
				editor: "ace",
				ctype: "string",
				params: "series,e"
			}, {
				name: "legendItemClick",
				group: "事件",
				editor: "ace",
				ctype: "string",
				params: "series,e"
			}, {
				name: "SeriesMouseOut",
				group: "事件",
				editor: "ace",
				ctype: "string",
				params: "series,e"
			}, {
				name: "SeriesMouseOver",
				group: "事件",
				editor: "ace",
				ctype: "string",
				params: "series,e"
			}, {
				name: "xAisAfterSetExtremes",
				group: "事件",
				editor: "ace",
				ctype: "string",
				params: "series,e"
			}, {
				name: "afterChartRender",
				group: "事件",
				editor: "ace",
				ctype: "string",
				params: "e"
			},
			{
				name: "saveTemplate",
				group: "事件",
				editor: "ace",
				ctype: "string",
				params: "params"
			},
			{
				name: "loadTemplate",
				group: "事件",
				editor: "ace",
				ctype: "string",
				params: "userTemplateUrl"
			},
			{
				name: "chartChanged",
				group: "事件",
				editor: "ace",
				ctype: "string",
				params: "params"
			},
			{
				name: "toolBarEvent",
				group: "事件",
				editor: "ace",
				ctype: "string",
				params: "bntId"
			},
			{
				name:'getSelectData',
				group: "事件",
				editor: "ace",
				ctype: "string",
				params: "exportData"
			},
			{
				name:'onFitting',
				group: "事件",
				editor: "ace",
				ctype: "string",
				params: "oriPonits,fittingData"
			},
			{
				name: "text",
				group: "外观",
				ctype: "string"
			}, {
				name: "id",
				group: "设计",
				ctype: "string"
			}, {
				name: "relativepath",
				group: "外观",
				ctype: "string"
			},{
				name: "toolbar",
				group: "外观",
				ctype: "string",
				editor: "options",
				edConfig: {
					cid: 'vmdChartToolBar'
				}
			}, {
				name: "templateSelect",
				group: "外观",
				ctype: "string",
				editor: "combo",
				options: [{
					text: '多轴曲线',
					value: 'multi_axis'
				}, {
					text: '混合曲线',
					value: 'mix_chart'
				}, {
					text: '堆叠面积图',
					value: 'area_stack'
				}, {
					text: '堆叠柱形图',
					value: 'column_stack'
				}]
			}, {
				name: "userTemplate",
				group: "外观",
				ctype: "boolean"
			},{
				name: "width",
				group: "外观",
				ctype: "number"
			}, {
				name: "height",
				group: "外观",
				ctype: "number"
			}
		],
		initConfig: function(b, a) {
			//初始化默认属性设置
		},

		onFilmClick: function() {

		},

		onFilmDblClick: function(b) {
			return;
			//双击值编辑功能 
			var t = document.getElementById("film-for-" + this.id);
			t.style.display = "none";
			if (this.owner) {
				this.setParentDisVisible(this.owner);
			}
		},
		initToolbar: function(toolbar) {
			//启用工具栏
			toolbar.enable();
			var chart = Ext.getCmp(this.activeCmpId);
			if (!chart) return;
			var cid = this.cid;
			var chartToolbar = toolbar.getToolbarByCid(cid);
			//chart.toolbar = toolbar;
			chart.hideSeleBorder();
			if (!chartToolbar) {
				Ext.Loader.setPath('vmd.ux.TopTitle', vmd.virtualPath + '/components/ux/toptitle/1.0/TopTitle.js');
				Ext.require('vmd.ux.TopTitle', function() {
					Ext.defer(function() {
						var div = document.createElement('div');
						// div.innerHTML = reportToolbar.getToolbarTpl();
						toolbar.body.dom.appendChild(div);
						chart.toolbarInst = new vmd.ux.TopTitle({
							renderTo: div,
							listeners: {
								vmdafterrender: function() {
									var inst = this;
									vmd.taskRunner(function() {
										if (chart.tplJSON) return true;
									}, function() {
										inst.setObject("chart", chart);
										chart.chart.seleBorder.attr({
											visibility: 'visible',
										})
									})
								}
							}
						})
						//工具栏添加对象
						div.toolbarInst = chart.toolbarInst;
						toolbar.put(cid, div);
						toolbar.setActive(cid);
					}, 10)
				})
			} else {
				chart.toolbarInst = chartToolbar.toolbarInst;
				chart.toolbarInst.setObject("chart", chart);
				chart.chart.seleBorder.attr({
					visibility: 'visible',
				})
				//chart.chart.seleBorder.attr(chart.chart.getBackRect());
				toolbar.setActive(cid);
			}
		},
		onFilmDblClick: function(b) {
			return;
			//双击值编辑功能 
			var t = document.getElementById("film-for-" + this.id);
			t.style.display = "none";
			if (this.owner) {
				this.setParentDisVisible(this.owner);
			}
		},
		nodeclick: function() {
			var e;
			var id = this.id;
			var cmp = Ext.getCmp(this.activeCmpId);
			if (!cmp) {
				return
			}
			var node = this.node;
			if (this.node && this.node.disableresize) return;
			var me = cmp.chart.vmdChart;
			me.hideSeleBorder();
			me.stores = me.getDatasetNames();
			me.clickChart = cmp.chart;
			xds.eastlayout.activeSettings2('ChartSeting', 320, me.viewerNode.id + '属性设置', function(chartinst) {
				me.propertyCom = chartinst;
				me.propertyCom.MyTabs.setActiveTab(4);
				chartinst.bindChart('chart', me, e);
				vmd.taskRunner(function() {
					if (me.toolbarInst) return true;
				}, function() {
					me.toolbarInst.setObject("chart", me);
				})
				me.clickChart.seleBorder.attr({
					visibility: 'visible',
				})
				me.clickChart.seleBorder.attr(me.clickChart.getBackRect());
			});
		},
		setParentDisVisible: function(a) {
			var t = document.getElementById("film-for-" + a.id);
			if (t) {
				t.style.display = "none";
				if (a.owner) {
					this.setParentDisVisible(a.owner);
				}
			}
		}
	});

	xds.Registry.register(xds.vmdChart);
}
// 设计模式下
Ext.define("vmd.comp.DesignerChart", {
	extend: "Ext.BoxComponent",
	xtype: 'vmd.dchart',
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
	/**
	 *变量参数
	 **/
	paramsList: "",
	initComponent: function() {
		this.callParent();
		//vmd.comp.Grid.superclass.initComponent.call(this);
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
			'mouseout'

		);

		this.getJSON = function(url, success, error) {
				vmd.ajax({
					das: false,
					url: url,
					type: 'get',
					timeout: 10000,
					dataType: "json",
					data: {},
					success: function(result) {
						success.apply(null, [result]);
					},
					error: function(msg, f) {
						error.apply(null, [msg]);
					}
				})
			},

		//深度拷贝对象或数组
		this.deepCopy = function() {
			var i,
				args = arguments,
				len,
				ret = {},
				doCopy = function(copy, original) {
					var value, key;

					// An object is replacing a primitive
					if (typeof copy !== 'object') {
						copy = {};
					}

					for (key in original) {
						if (original.hasOwnProperty(key)) {
							value = original[key];

							// Copy the contents of objects, but not arrays or DOM nodes
							if (value && typeof value === 'object' && Object.prototype.toString.call(value) !== '[object Array]' &&
								key !== 'renderTo' && typeof value.nodeType !== 'number') {
								copy[key] = doCopy(copy[key] || {}, value);

								// Primitives and arrays are copied over directly
							} else if (Object.prototype.toString.call(value) === '[object Array]') {
								copy[key] = doCopy(copy[key] || [], value);
							} else {
								copy[key] = original[key];
							}
						}
					}
					return copy;
				};

			// If first argument is true, copy into the existing object. Used in setOptions.
			if (args[0] === true) {
				ret = args[1];
				args = Array.prototype.slice.call(args, 2);
			}

			// For each argument, extend the return
			len = args.length;
			for (i = 0; i < len; i++) {
				ret = doCopy(ret, args[i]);
			}

			return ret;
		}
	},

	onRender: function(ct, position) {
		var me = this;
		if (!this.el) {
			this.autoEl = {
				cls: 'vmd-chart',
				cn: [{
					cls: 'vmd-chart-grid'
				}]
			}
		}
		this.callParent(arguments);

		// 20190104  顶部工具条容器
		this.chartEl = this.el.first();
		var ownerCt = (me.ownerCt.body || me.ownerCt.el).dom;
		if (me.tplJSON) {
			me.isXAxisDateTime = me.tplJSON.xAxis && me.tplJSON.xAxis[0] && me.tplJSON.xAxis[0].type;
			// 判断是否是第一次加载右侧曲线属性的模板选择
			if (me.tplJSON.chart.htype) {
				var type = me.tplJSON.chart.htype;
			} else {
				var type = me.tplJSON.chart.type;
			}
			if (me.templateSelect && me.templateSelect != type) { // 在界面选择模板切换
				me.tplJSON.chart.htype = me.templateSelect;
				this.charttplpath = "/chart/template/" + me.templateSelect + ".js";
				//加载模版和数据都成功后
				function loadSuccess() {
					if (me.runJSON && me.chartdata) {
						me.runJSON.data.json = me.chartdata;
						me.chart = Highcharts.chart(me.chartEl.dom, me.runJSON);
						me.chart.vmdChart = me;
						me.addChartEvent();
					}
				}
				//加载模版 (已定义的模板)
				me.getJSON(vmd.virtualPath + this.charttplpath, function(template) {

					me.chartEl.dom.style.width = (ownerCt.clientWidth-20) + "px";
					me.chartEl.dom.style.height = (ownerCt.clientHeight - 45) + "px";

					me.tplJSON = me.deepCopy(template);
					me.runJSON = me.deepCopy(template);
				
					if(me.runJSON.title.useHTML){
						delete me.runJSON.title.useHTML
					}
					me.viewerNode.component.setConfig("tplJSON", me.tplJSON);

					loadSuccess();
				}, function(msg) {
					Ext.Msg.show({
						title: "提示",
						msg: "加载模版失败！" + msg,
						buttons: Ext.Msg.OK,
						icon: Ext.Msg.ERROR
					});
				});
				//加载数据
				me.getJSON(vmd.virtualPath + "/chart/data/data.js", function(data) {
					loadDataSuccess = true;
					me.chartdata = data;
					loadSuccess();
				}, function(msg) {
					Ext.Msg.show({
						title: "提示",
						msg: "加载数据失败！" + msg,
						buttons: Ext.Msg.OK,
						icon: Ext.Msg.ERROR
					});
				});
			} else {
				//加载数据
				me.getJSON(vmd.virtualPath + "/chart/data/data.js", function(data) {

					me.chartEl.dom.style.width = ownerCt.clientWidth + "px";
					me.chartEl.dom.style.height = (ownerCt.clientHeight - 45) + "px";

					me.runJSON = me.deepCopy(me.tplJSON);
				
					if(me.runJSON.title.useHTML){
						delete me.runJSON.title.useHTML
					}
					me.runJSON.data.seriesCountsByOptions = true;
					me.runJSON.data.json = data;

					me.chart = Highcharts.chart(me.chartEl.dom, me.runJSON);
					me.chart.vmdChart = me;
					me.addChartEvent();
				}, function(msg) {
					Ext.Msg.show({
						title: "提示",
						msg: "加载数据失败！" + msg,
						buttons: Ext.Msg.OK,
						icon: Ext.Msg.ERROR
					});
				});
			}
		} else if (this.path) {
			//  模板引入的曲线 请求json数据串
			var host = vmd.workspace ? (vmd.workspace.dataServiceIp || vmdSettings.dataServiceIp) : vmdSettings.dataServiceIp;
			var hwRao = new HwRao(host, "report");
			var filePath = 'report/' + this.relativepath + "/" + this.path;
			hwRao.getJson(filePath, this.dsnames,
				function(result) {
					var tpjson = eval('(' + result.data + ')');
					if (tpjson.legend) {
						if (tpjson.legend.align == 'right' || tpjson.legend.align == 'left') {
							tpjson.legend.layout = 'vertical'
						}
					}
					me.tplJSON = tpjson;
					me.getJSON(vmd.virtualPath + "/chart/data/data.js", function(data) {

						me.chartEl.dom.style.width = ownerCt.clientWidth + "px";
						me.chartEl.dom.style.height = (ownerCt.clientHeight - 45) + "px";

						me.runJSON = me.deepCopy(tpjson);
						me.runJSON.data.seriesCountsByOptions = true;
						me.viewerNode.component.setConfig("tplJSON", me.tplJSON);
						me.runJSON.data.json = data;
						console.log(me.runJSON)
						me.chart = Highcharts.chart(me.chartEl.dom, me.runJSON);
						me.chart.vmdChart = me;
						me.addChartEvent();
					}, function(msg) {
						Ext.Msg.show({
							title: "提示",
							msg: "加载数据失败！" + msg,
							buttons: Ext.Msg.OK,
							icon: Ext.Msg.ERROR
						});
					});
				},
				function(msg, f) {
					Ext.Msg.alert("错误信息", msg,
						function() {})
				});

		} else { //  新加载的模板
			
			this.charttplpath = "/chart/template/" + (getUrlParam("charttplpath") || "line") + ".js";
			//加载模版和数据都成功后
			function loadSuccess() {
				if (me.runJSON && me.chartdata) {
					me.runJSON.data.json = me.chartdata;
					me.chart = Highcharts.chart(me.chartEl.dom, me.runJSON);
					me.chart.vmdChart = me;
					me.addChartEvent();
				}
			}
			//加载模版
			me.getJSON(vmd.virtualPath + this.charttplpath, function(template) {

				me.chartEl.dom.style.width = ownerCt.clientWidth + "px";
				me.chartEl.dom.style.height = (ownerCt.clientHeight - 45) + "px";

				me.tplJSON = me.deepCopy(template);
				me.runJSON = me.deepCopy(template);

				me.viewerNode.component.setConfig("tplJSON", me.tplJSON);

				loadSuccess();
			}, function(msg) {
				Ext.Msg.show({
					title: "提示",
					msg: "加载模版失败！" + msg,
					buttons: Ext.Msg.OK,
					icon: Ext.Msg.ERROR
				});
			});
			//加载数据
			me.getJSON(vmd.virtualPath + "/chart/data/data.js", function(data) {
				loadDataSuccess = true;
				me.chartdata = data;
				loadSuccess();
			}, function(msg) {
				Ext.Msg.show({
					title: "提示",
					msg: "加载数据失败！" + msg,
					buttons: Ext.Msg.OK,
					icon: Ext.Msg.ERROR
				});
			});
		}
		//me.chart = Highcharts.chart(me.chartEl, {});

		me.el.id = me.id;
		//属性赋值
		Ext.applyIf(me, me.chart);
		//重改指向，保证dhx的原生态
		//this.el = this.el.children[0];
		Ext.fly(me.el).addClass('vmd-chart');

		//注册事件           
		me.onEventsReg(me, me.grid)

		window[me.id] = me;

		//  me.callParent(arguments);

		// 记录页面的曲线对象
		vmd.taskRunner(function() {
			if (me.chart) return true;
		}, function() {
			if (!xds.vmd.chartdict) xds.vmd.chartdict = {};
			var d_id = me.viewerNode.id;
			xds.vmd.chartdict[d_id] = me.chart;
		})

	},

	afterRender: function() {
		var me = this;
		this.callParent(arguments);

		//去掉遮罩层
		/*function hideFilm(parentNode) {
		    var t = document.getElementById("film-for-" + parentNode.id);
		    if (t) {
		        t.style.display = "none";
		        hideFilm(parentNode.parentNode);
		    }
		}*/
		function hideFilm(parentNode) {
			var t = document.getElementById("film-for-" + parentNode.id);
			if (t) {
				var designerCmp = parentNode.component;
				if (designerCmp && (designerCmp.cid == 'panel' || designerCmp.cid == 'tabpanel')) {
					var cmp = Ext.getCmp(designerCmp.activeCmpId);
					cmp._isRpt = true;
				} else {
					t.style.display = "none";
				}
				hideFilm(parentNode.parentNode);
			}
		}

		var t = document.getElementById("film-for-" + this.viewerNode.id);
		if (t) {
			t.style.display = "none";
			hideFilm(this.viewerNode.parentNode);
		}
		if (xds.eastlayout.ins_tab) {
			xds.eastlayout.ins_tab.on('tabchange', function(sender, tab) {
				if (tab.id === "ins_rptconf" && me.propertyCom) {
					me.stores = me.getDatasetNames();
					me.propertyCom.receiveStoreData(me.stores);
				}
			})
		}
	},
	nodeselect: function() {
		var me = this;
		if (xds.active && xds.active.node && xds.active.node.id != me.viewerNode.id) {
			me.viewerNode.disableresize = true;
			me.viewerNode.select();
			me.viewerNode.disableresize = false;
		}
	},
	addChartEvent: function() {
		this.chart.addClickEvents("title", function(e) {
			var me = this.vmdChart;
			var clickEvent = me.id + 'title';
			if (me.propertyCom  && !me.propertyCom.hidden &&  me.propertyCom.clickEvent == clickEvent) {
				return;
			}
			me.nodeselect();
			me.hideSeleBorder();
			me.stores = me.getDatasetNames();
			me.clickChart = this;

			xds.eastlayout.activeSettings('ChartSeting', 320, me.viewerNode.id + '属性设置', function(chartinst) {
				me.propertyCom = chartinst;
				me.propertyCom.clickEvent = clickEvent;
				me.propertyCom.MyTabs.setActiveTab(0);
				chartinst.bindChart('title', me, e);

				var TitleData = e.element.getBBox(null, 0);
				me.clickChart.seleBorder.attr({
					visibility: 'visible',
					width: parseInt(TitleData.width) + 50,
					height: parseInt(TitleData.height) + 10,
					x: parseInt(TitleData.x) - 30,
					y: parseInt(TitleData.y) - 5
				})
			});
		})
		this.chart.addClickEvents("chart", function(e) {
			var me = this.vmdChart;
			var clickEvent = me.id + 'chart';
			if (me.propertyCom && !me.propertyCom.hidden && me.propertyCom.clickEvent == clickEvent) {
				return;
			}
			me.nodeselect();
			me.hideSeleBorder();
			me.stores = me.getDatasetNames();
			me.clickChart = this;

			xds.eastlayout.activeSettings('ChartSeting', 320, me.viewerNode.id + '属性设置', function(chartinst) {
				me.propertyCom = chartinst;
				me.propertyCom.clickEvent = clickEvent;
				me.propertyCom.MyTabs.setActiveTab(4);
				chartinst.bindChart('chart', me, e);
				me.clickChart.seleBorder.attr(me.clickChart.getBackRect());
				me.clickChart.seleBorder.attr({
					visibility: 'visible',
				})

			});
		})
		this.chart.addClickEvents("axis", function(e) {
			var me = this.vmdChart;
			var clickEvent = me.id + e.userOptions.id;
			if (me.propertyCom && !me.propertyCom.hidden && me.propertyCom.clickEvent == clickEvent) {
				return;
			}
			me.nodeselect();
			me.hideSeleBorder();
			me.stores = me.getDatasetNames();
			me.clickChart = this;

			xds.eastlayout.activeSettings('ChartSeting', 320, me.viewerNode.id + '属性设置', function(chartinst) {
				me.propertyCom = chartinst;
				me.propertyCom.clickEvent = clickEvent;
				me.propertyCom.MyTabs.setActiveTab(1);
				chartinst.bindChart('axis', me, e);
				me.clickChart.seleBorder.attr(e.getBackRect())
				me.clickChart.seleBorder.attr({
					visibility: 'visible',
				})
			});
		})
		this.chart.addClickEvents("legend", function(e) {
			var me = this.vmdChart;
			var clickEvent = me.id + 'legend';
			if (me.propertyCom && !me.propertyCom.hidden && me.propertyCom.clickEvent == clickEvent) {
				return;
			}
			me.nodeselect();
			me.hideSeleBorder();
			me.stores = me.getDatasetNames();
			me.clickChart = this;

			xds.eastlayout.activeSettings('ChartSeting', 320, me.viewerNode.id + '属性设置', function(chartinst) {
				me.propertyCom = chartinst;
				me.propertyCom.clickEvent = clickEvent;
				me.propertyCom.MyTabs.setActiveTab(2);
				chartinst.bindChart('legend', me, e);
				me.chart.seleBorder.attr(e.getBackRect())
				me.chart.seleBorder.attr({
					visibility: 'visible',
				})
			});
		})
		this.chart.addClickEvents("series", function(e) {
			var me = this.vmdChart;
			var clickEvent = me.id + e.userOptions.id;
			if (me.propertyCom && !me.propertyCom.hidden && me.propertyCom.clickEvent == clickEvent) {
				return;
			}
			me.nodeselect();
			me.hideSeleBorder();
			me.stores = me.getDatasetNames();
			me.clickChart = this;

			xds.eastlayout.activeSettings('ChartSeting', 320, me.viewerNode.id + '属性设置', function(chartinst) {
				me.propertyCom = chartinst;
				me.propertyCom.clickEvent = clickEvent;
				me.propertyCom.MyTabs.setActiveTab(3);
				chartinst.bindChart('series', me, e);

				me.chart.seleBorder.attr({
					visibility: 'visible',
					x: me.clickChart.plotLeft,
					y: me.clickChart.plotTop,
					width: me.clickChart.plotWidth,
					height: me.clickChart.plotHeight
				})
			});
		})
	},
	//获取可视化中定义的所有数据集
	getDatasetNames: function() {
		var names = [];
		var storeRoot = xds.vmd.getRootNode("dataset");
		if (storeRoot) {
			storeRoot.eachChild(function(n) {
				names.push(n)
			}, this);
		}
		return names;
	},
	renderChart: function() {
		var me = this;
		//me.runJSON = me.deepCopy(me.tplJSON);
		me.chart = Highcharts.chart(me.el.dom, me.runJSON);
		me.chart.vmdChart = me;
		me.addChartEvent();
	},
	hideSeleBorder: function() {
		for (var key in xds.vmd.chartdict) {
			var cha = xds.vmd.chartdict[key];
			cha.seleBorder.attr({
				visibility: 'hidden'
			})
		}
	},
	onEventsReg: function(My, Mygrid) {

	},

	onEnter: function(e) {

	},

	doLayout: function() {

	},

	onResize: function(w, h) {
		if (this.chart) {
			if (this.chart.vmdChart === 'undefined' || this.chart.vmdChart == null || this.chart.vmdChart.tplJSON.chart.width ===
				'undefined' || this.chart.vmdChart.tplJSON.chart.width == null) {
				var outterBorderW = this.el.dom.offsetWidth - this.el.dom.clientWidth;
				var outterBorderH = this.el.dom.offsetHeight - this.el.dom.clientHeight;
				this.chart.setSize(w - outterBorderW, h - outterBorderH - 45);
			}
		}
	},

	onDestroy: function() {

	},
})


/******************************************************************
 ** 描 述:曲线顶部工具条组件构建
 ******************************************************************/

if (typeof xds != "undefined") {
	xds.vmdEchart = Ext.extend(xds.Component, {
		cid: "vmdChartToolBar",
		category: "vmdChart组件",
		defaultName: "&lt;chart&gt;",
		text: "ChartToolBar(曲线工具条)",
		dtype: "vmd.charttb",
		//这里的xtype主要是为了代码显示的类型，本身无任何作用
		xtype: "vmd.ctoolbar",
		xcls: "vmd.ChartToolBar",
		iconCls: "icon-toolbar",
		version: "",
		//控制是否可以拖拽
		isResizable: function(a, b) {
			//a为上下左右的位置方向
			return true;
		},
		naming: "ChartToolBar",
		isContainer: false,
		//是否显示右下角的组件说明
		filmCls: "el-film-nolabel",
		//默认属性设置
		defaultConfig: {
			text: "ChartToolBar",
			size: "small",
			nousedataset: false,
			jsonPath:'/chart/libs/toolbar/button.json',
			imgPath:'/chart/libs/toolbar/imgs/'
		},
		//属性设置
		configs: [
			{
				name: "text",
				group: "外观",
				ctype: "string"
			}, {
				name: "id",
				group: "设计",
				ctype: "string"
			},{
				name: "jsonPath",
				group: "外观",
				ctype: "string"
			}, {
				name: "imgPath",
				group: "外观",
				ctype: "string"
			},{
				name: "chart",
				group: "外观",
				ctype: "string",
				editor: "options",
				edConfig: {
					cid: 'vmdChart'
				}
			},
			{
				name: "toolBarClick",
				group: "事件",
				editor: "ace",
				ctype: "string",
				params: "com,id"
			},
		],
		initConfig: function(b, a) {
			//初始化默认属性设置
			
		},
		onFilmClick: function() {

		},
	});

	xds.Registry.register(xds.vmdEchart);
}
// 设计模式下
Ext.define("vmd.comp.DesignerToolBar", {
	extend: "Ext.BoxComponent",
	xtype: 'vmd.charttb',
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
	/**
	 *变量参数
	 **/
	paramsList: "",
	initComponent: function() {
		var me = this;
		me.callParent();
		if (!me.imgPath) {
			me.imgPath = vmd.virtualPath + "/chart/libs/toolbar/imgs/";
		}
		if (!me.jsonPath)  {
			me.jsonPath = vmd.virtualPath + "/chart/libs/toolbar/button.json"
		}
		//vmd.comp.Grid.superclass.initComponent.call(this);
		me.addEvents(
			/**
			 * @event click
			 * Fires when this button is clicked
			 * @param {Button} this
			 * -
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
			'mouseout'
		);

	},

	onRender: function(ct, position) {
		var me = this;
		if (!me.el) {
			me.autoEl = {
				cls: 'vmd-chart-toolbar',
				cn: [{
					cls: 'vmd-chart-grid'
				}]
			}
		}
		me.callParent(arguments);

		// 20190104  顶部工具条容器
		me.tbContainer = this.el.first().dom;
		console.log(me.tbContainer)

		me.tbContainer.style.height = "36px";
		me.tbContainer.style.paddingLeft = "20px";
		
		ToolBarPlan = new dhtmlXToolbarObject({
			parent: me.tbContainer,
			icons_path: me.imgPath,
			json: me.jsonPath,
		});

		console.log(me)

		me.el.id = me.id;
		//属性赋值
		Ext.applyIf(me, me.chart);
		//重改指向，保证dhx的原生态
		

		//注册事件           
		me.onEventsReg(me, me.grid)

		window[me.id] = me;

		//  me.callParent(arguments);

	},

	afterRender: function() {
		var me = this;
		this.callParent(arguments);
	},
	
	onEventsReg: function(My, Mygrid) {

	},

	onEnter: function(e) {

	},

	doLayout: function() {

	},

	onResize: function(w, h) {
		
	},

	onDestroy: function() {

	},
})