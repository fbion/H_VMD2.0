// 运行模式下 
Ext.define("vmd.comp.Chart", {
	extend: "Ext.BoxComponent",
	xtype: 'vmd.chart',
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
		this.myMask = new Ext.LoadMask(Ext.getBody(), {
			msg: "数据加载中,请稍后...",
			msgCls: 'z-index:10000;'
		});
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
		this.chart = null;
	},
	setUserTemplate: function(url) {
		this.userTemplateUrl = url;
	},
	onRender: function(ct, position) {
		var me = this;
		me.myMask.show();
		if (!this.el) {
			this.el = document.createElement("div");

			if (this.userTemplate && this.userTemplateUrl) {
				me.getJSON(this.userTemplateUrl, function(json) {
						if (json instanceof Object) {
							var data = json;
						} else if (typeof json == 'string') {
							var data = JSON.parse(json);
						}
						me.tplJSON = me.deepCopy(data);
					},
					function(msg) {
						Ext.Msg.alert("错误信息", '获取模板信息失败')
					})
			} else if (this.path) {
				this.query();
			} else if (this.tplJSON) {
				if (this.tplJSON.series) {
					for (var i = 0; i < this.tplJSON.series.length; i++) {
						this.tplJSON.series[i].name = this.tplJSON.series[i].sname;
					}
				}
			} else {
				me.myMask.hide();
			}
			
			this.el.id = this.id;
			//属性赋值
			Ext.applyIf(me, me.chart);

			//重改指向，保证dhx的原生态
			//this.el = this.el.children[0];
			Ext.fly(this.el).addClass('vmd-chart');

			//注册事件           
			this.onEventsReg(me, me.grid);
			window[me.id] = this;
		}
		//vmd.comp.Grid.superclass.onRender.call(this, ct, position);
		this.callParent(arguments);
	},

	afterRender: function(ct) {
		var me = this;
		this.callParent(arguments);
		if (this.tplJSON && this.tplJSON.data.storeName) { // //绑定store
			this.bindStore(this.tplJSON.data.storeName, true);
		} else if (this.path) {
			var me = this;
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
					//console.log(me.tplJSON)
					me.getJSON(vmd.virtualPath + "/chart/data/data.js", function(data) {
						me.tplJSON = me.deepCopy(tpjson);
						me.tplJSON.data.seriesCountsByOptions = true;
						me.tplJSON.data.json = data;

						if (me.tplJSON.data.storeName) {
							me.bindStore(me.tplJSON.data.storeName, true);

						}
					})
				},
				function(msg, f) {
					Ext.Msg.alert("错误信息", msg,
						function() {})
				});
		} else {
			this.myMask.hide();
			Ext.Msg.alert("提示", "曲线没有添加数据")
			return
		}
	},
	refresh: function(store) {
		var me = this;
		//var data = store.getJson();
		for (var i = 0; i < me.tplJSON.series.length; i++) {
			me.tplJSON.data.seriesMapping[i].x = me.tplJSON.series[i].xData;
			me.tplJSON.data.seriesMapping[i].y = me.tplJSON.series[i].yData;
			me.tplJSON.series[i].events = me.tplJSON.series[i].events || {};
			me.tplJSON.series[i].events.click = function(e) {
				me.fireEvent('SeriesClick', me, this, e)
			}
			me.tplJSON.series[i].events.legendItemClick = function(e) {
				me.fireEvent('legendItemClick', me, this, e)
			}
			me.tplJSON.series[i].events.mouseOut = function(e) {
				me.fireEvent('SeriesMouseOut', me, this, e)
			}
			me.tplJSON.series[i].events.mouseOver = function(e) {
				me.fireEvent('SeriesMouseOver', me, this, e)
			}
		}
		me.tplJSON.xAxis[0].events = me.tplJSON.xAxis[0].events || {}
		me.tplJSON.xAxis[0].events.afterSetExtremes = function(e) {
			me.fireEvent('xAisAfterSetExtremes', me, this, e)
		}

		me.tplJSON.data.json = store.getJson();
		me.tplJSON.chart = me.tplJSON.chart || {};
		me.tplJSON.chart.events = me.tplJSON.chart.events || {};
		me.tplJSON.chart.events.load = function() {
			me.fireEvent('load', me, this);
		}
		me.tplJSON.chart.events.click = function(event) {
			me.fireEvent('click', me, this, event);
		}
		var modulesNums = (me.tplJSON.modules && me.tplJSON.modules.length) || 0;

		if (me.tplJSON.legend && me.tplJSON.legend.draging) {
			modulesNums++;
			me.tplJSON.modules = me.tplJSON.modules || [];
			me.tplJSON.modules.push("legendDraging");
		}
		var loadedModules = 0;

		function loadSuccess() {
			if (me.tplJSON.hasNavigator) {
				me.tplJSON.navigator = {
					adaptToUpdatedData: false,
					enabled: true,
					height: 30,
					margin: 25,
					outlineColor: "#cccccc",
					outlineWidth: 2,
					series: {
						type: me.tplJSON.series[0].type,
						visible: false
					}
				};
				if (me.tplJSON.xAxis[0].type == 'datetime') {
					me.tplJSON.navigator.xAxis = {
						type: me.tplJSON.xAxis[0].type,
						dateTimeLabelFormats: me.tplJSON.xAxis[0].dateTimeLabelFormats
					}
				}
				me.tplJSON.scrollbar = {
					liveRedraw: false
				};
			} else {
				me.tplJSON.navigator = {
					enabled: false,
				}
			}
			for (var i = 0; i < me.tplJSON.yAxis.length; i++) {
				// 处理因为tickAmount为空对象导致的曲线绘制问题
				if (me.tplJSON.yAxis[i].tickAmount && typeof me.tplJSON.yAxis[i].tickAmount != 'number') {
					delete me.tplJSON.yAxis[i].tickAmount
				}
			}
			if (me.tplJSON.title.useHTML) {
				delete me.tplJSON.title.useHTML
			}
			if (me.tplJSON.xAxis[0].startOnTick) {
				delete me.tplJSON.xAxis[0].startOnTick
			}
			
			// 把数据项的第一项赋给X轴的最小值
			if(me.tplJSON.xAxis[0].type == 'datetime'){
				var xData =  me.tplJSON.series[0].xData;
				if(me.tplJSON.data.json.length>0){
					var minValue = me.tplJSON.data.json[0][xData];
					minValue = me.date_getMillisecond(minValue)
					me.tplJSON.xAxis[0].min = minValue;
				}
			}
			
			me.chart = Highcharts.chart(me.el.dom, me.tplJSON, function(oThis) {
				// 记录模板对象到到导出对象中
				oThis.options.exportOptions = me.deepCopy(oThis.options);
				oThis.options.exportOptions.globalOptions = oThis.globalOptions;
				oThis.options.globalOptions = oThis.globalOptions;
				if (me.tplJSON.chart.minWidth && me.tplJSON.chart.minWidth > parseFloat(me.el.dom.style.width)) {
					oThis.setSize(me.tplJSON.chart.minWidth, undefined);
				}
				if (me.tplJSON.chart.minHeight && me.tplJSON.chart.minHeight > parseFloat(me.el.dom.style.height)) {
					me.el.dom.style.width = (me.el.dom.offsetWidth - 20 )+"px"
					oThis.setSize(undefined, me.tplJSON.chart.minHeight);
				}
			});
			me.chart.parentObject = me;
			me.fireEvent('afterChartRender', me);
			if(me.initialConfig.toolbar){
				me.chart.resetZoomButton = true;
			}
			me.addChartEvent();
			me.getlinkforyAxis(function() {
				for (var i = 0; i < me.tplJSON.yAxis.length; i++) {
					if (!me.GetAxisSpacing && me.chart.yAxis[i].userOptions.direction == "vertical" && me.tplJSON.chart.axisSpacing &&
						me.chart.yAxis[i].series.length == 1) {
						var se = me.chart.yAxis[i].series[0].name
						me.deleSeries(se)
						me.restoreSeries(se);
						me.GetAxisSpacing = true;
						break;
					}
				}
			});
			me.myMask.hide();
		}
		if (me.tplJSON.modules && me.tplJSON.modules.length > 0) {
			for (var j = 0; j < me.tplJSON.modules.length; j++) {
				if (me.toolbar && me.tplJSON.modules[j] == "toolBar") {
					me.tplJSON.modules.splice(j, 1)
					modulesNums = (me.tplJSON.modules && me.tplJSON.modules.length) || 0;
				}
			}
			for (var i = 0; i < me.tplJSON.modules.length; i++) {
				if (me.tplJSON.modules[i] == "dataviews") {
					$LAB.script(vmd.virtualPath + "/chart/js/plugins/export-csv.js").wait();
					//$LAB.script(vmd.virtualPath + "/chart/js/plugins/coorLine.src.js").wait();
					$LAB.script(vmd.virtualPath + "/chart/js/plugins/data-review-5.src.js").wait(function() {
						loadedModules++;
						if (loadedModules == modulesNums) {
							loadSuccess();
						}
					});
				}else if (me.tplJSON.modules[i] == "dataExtract") {
					$LAB.script(vmd.virtualPath + "/chart/js/plugins/data-extract.src.js").wait(function(){
						loadedModules++;
						if (loadedModules == modulesNums) {
							loadSuccess();
						}
					});
				} else if (me.tplJSON.modules[i] == "imgexport") {
					me.tplJSON.exporting = me.tplJSON.exporting || {};
					me.tplJSON.exporting.url = vmd.virtualPath + "/chart/ashx/ImageExport.ashx";
					$LAB.script(vmd.virtualPath + "/chart/js/load/bluebird.js").wait();
					$LAB.script(vmd.virtualPath + "/chart/js/load/html2canvas.js").wait();
					$LAB.script(vmd.virtualPath + "/chart/js/load/canvg.js").wait();
					$LAB.script(vmd.virtualPath + "/chart/js/load/downloadify.js").wait();
					$LAB.script(vmd.virtualPath + "/chart/js/load/swfobject.js").wait();
					$LAB.script(vmd.virtualPath + "/chart/js/modules/exporting.src.js").wait();
					$LAB.script(vmd.virtualPath + "/chart/js/modules/exporting-plug-5.src.js").wait(function() {
						loadedModules++;
						if (loadedModules == modulesNums) {
							loadSuccess();
						}
					});
				} else if (me.tplJSON.modules[i] == "legendDraging") {
					$LAB.script(vmd.virtualPath + "/chart/js/plugins/drag-legend.src.js").wait(function() {
						loadedModules++;
						if (loadedModules == modulesNums) {
							loadSuccess();
						}
					});
				} else if (me.tplJSON.modules[i] == "setProperty") {
					$LAB.script(vmd.virtualPath + "/chart/js/plugins/point-delete-recovery.src.js").wait();
					$LAB.script(vmd.virtualPath + "/chart/js/plugins/series-add-delete.src.js").wait();
					$LAB.script(vmd.virtualPath + "/chart/js/plugins/property-interact.src.js").wait(function() {
						loadedModules++;
						if (loadedModules == modulesNums) {
							loadSuccess();
						}
					});
				} else if (me.tplJSON.modules[i] == "toolBar") {
					$LAB.script(vmd.virtualPath + "/chart/js/plugins/toolbar.src.js").wait(function() {
						loadedModules++;
						if (loadedModules == modulesNums) {
							loadSuccess();
						}
					});
				} else if (me.tplJSON.modules[i] == "zoomData") {
					$LAB.script(vmd.virtualPath + "/chart/js/plugins/zoom-select-series.src.js").wait(function() {
						loadedModules++;
						if (loadedModules == modulesNums) {
							loadSuccess();
						}
					});
				} else if (me.tplJSON.modules[i] == "fitting") {
					$LAB.script(vmd.virtualPath + "/chart/js/plugins/fittingline-curve.src.js").wait(function() {
						loadedModules++;
						if (loadedModules == modulesNums) {
							loadSuccess();
						}
					});
				}
			}
		} else {
			loadSuccess();
		}
	},
	addChartEvent: function() {
		var me = this,
			myToolBar;
		if (!me.toolbar) {
			return;
		} else {
			myToolBar = Ext.getCmp(me.toolbar);
		}
		//console.log(me.chart)
		me.chart.selectElement();
		// myToolBar-(me.chart);
	},
	setObjcAttr: function(attrNmae, obj, value) {
		for (var attr in obj) {
			if (attr == attrNmae) {
				obj[attr] = value;
			} else {
				obj[attr] = null;
			}
		}
	},
	onUpdate: function(ds, record) {
		if (record) {
			var recordJson = record.data;
			var unode = this.getNodeById(recordJson[this.textField]);
			if (unode)
				unode.setText(recordJson[this.textField])
		}
	},
	onDataChanged: function(store) {
		this.refresh(store);
	},

	bindStore: function(store, initial) {
		if (store) {
			store = Ext.StoreMgr.lookup(store);
			store.on({
				scope: this,
				//beforeload: this.onBeforeLoad,
				datachanged: this.onDataChanged,
				//add: this.onAdd,
				//remove: this.onRemove,
				update: this.onUpdate
				//clear: this.refresh //store.removeAll清空所有数据调用此接口
			});
		}
		this.store = store;
		if (store) {
			this.refresh(store);
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
			var outterBorderW = w - (this.el.dom.offsetWidth - this.el.dom.clientWidth);
			var outterBorderH = h - (this.el.dom.offsetHeight - this.el.dom.clientHeight);
			if (this.chart.userOptions.chart.width) {
				outterBorderW = this.chart.userOptions.chart.width;
			} else {
				if (this.chart.userOptions.chart.minWidth && this.chart.userOptions.chart.minWidth > outterBorderW) {
					outterBorderW = this.chart.userOptions.chart.minWidth;
				}else{
					outterBorderW = outterBorderW-15;
					this.el.dom.style.width = (outterBorderW)+'px';
					this.el.dom.firstElementChild.style.width = (outterBorderW)+'px';
				}
			}
			if (this.chart.userOptions.chart.height) {
				outterBorderH = this.chart.userOptions.chart.height;
			} else {
				if (this.chart.userOptions.chart.minHeight && this.chart.userOptions.chart.minHeight > outterBorderH) {
					outterBorderH = this.chart.userOptions.chart.minHeight;
				}
			}
			this.chart.setSize(outterBorderW, outterBorderH);
		}
	},

	onDestroy: function() {

	},

	query: function() {
		var me = this;
		if (!this.path) {
			return;
		}
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
				// 加载图片导出文件
				$LAB.script(vmd.virtualPath + "/chart/js/load/bluebird.js").wait();
				$LAB.script(vmd.virtualPath + "/chart/js/load/html2canvas.js").wait();
				$LAB.script(vmd.virtualPath + "/chart/js/load/canvg.js").wait();
				$LAB.script(vmd.virtualPath + "/chart/js/load/downloadify.js").wait();
				$LAB.script(vmd.virtualPath + "/chart/js/load/swfobject.js").wait();
				$LAB.script(vmd.virtualPath + "/chart/js/modules/exporting.src.js").wait();
				$LAB.script(vmd.virtualPath + "/chart/js/modules/exporting-plug-5.src.js").wait(function() {
					me.getJSON(vmd.virtualPath + "/chart/data/data.js", function(data) {
						me.tplJSON = me.deepCopy(tpjson);
						me.tplJSON.data.seriesCountsByOptions = true;
						if (me.tplJSON.data.storeName) {
							var store = Ext.StoreMgr.lookup(me.tplJSON.data.storeName);
							store.toRefresh();
						}
					})
				});
			},
			function(msg, f) {
				Ext.Msg.alert("错误信息", msg,
					function() {})
			});
	},

	getCharts: function() {
		return this;
	},
	// 加载模板
	loadUserTemplate: function(json) {
		var me = this;
		if (!json) {
			return;
		}
		var data = JSON.parse(json);
		me.tplJSON = me.deepCopy(data);
		me.getJSON(vmd.virtualPath + "/chart/data/data.js", function(data) {
			me.tplJSON.data.seriesCountsByOptions = true;
			if (me.tplJSON.data.storeName) {
				var store = Ext.StoreMgr.lookup(me.tplJSON.data.storeName);
				store.toRefresh();
			}
		})
	},
	/*.......................................运行模式下方法接口....................................................*/
	// 设置标题
	setTitle: function(text) {
		if (this.chart) {
			exportOption = this.chart.options.exportOptions || {};
			exportOption.title = exportOption.title || {};
			this.chart.setTitle({
				text: text
			});
			exportOption.title.text = text;
		} else if (this.tplJSON) {
			this.tplJSON.title = this.tplJSON.title || {};
			this.tplJSON.title.text = text;
		}
	},
	// 设置曲线宽度
	setChartWidth:function(width) {
		if (this.chart) {
			exportOption = this.chart.options.exportOptions || {};
			exportOption.title = exportOption.title || {};
			this.chart.setSize(width, undefined);
			exportOption.chart.width = width;
		} else if (this.tplJSON) {
			this.tplJSON.chart.width = width;
		}
	},
	// 设置曲线高度
	setChartHeight:function(height) {
		if (this.chart) {
			exportOption = this.chart.options.exportOptions || {};
			exportOption.title = exportOption.title || {};
			this.chart.setSize(undefined,height);
			exportOption.chart.height = height;
		} else if (this.tplJSON) {
			this.tplJSON.chart.height = height;
		}
	},
	// 获取图表宽高
	getChartSize: function(type) {
		var This = this,
			chart = This.chart,
			value = '';
		switch (type) {
			case 'width':
				value = chart.options.chart.width || chart.chartWidth;
				break;
			case 'height':
				value = chart.options.chart.height || chart.chartHeight;
				break;
			default:
				break;
		}
		return value;
	},
	// 设置序列名称
	setSerierName: function(seriesNameArr) {
		if (!seriesNameArr instanceof Array) {
			Ext.Msg.alert("提示", "请确认setSerierName方法传入参数为数组");
			return;
		}
		var seriesNameArr = seriesNameArr.map(function(v) {
			return v.trim() == "" ? null : v.trim()
		})
		for (var i = 0; i < this.tplJSON.series.length; i++) {
			this.tplJSON.series[i].name = seriesNameArr[i] || null;
		}
	},
	// 设置序列的显示隐藏
	setSeriesShow: function(seriesName, isShow) {
		var This = this;
		if (This.chart) {
			exportOption = This.chart.options.exportOptions || {};
			exportOption.series = exportOption.series || [];
			for (var i = 0; i < This.chart.series.length; i++) {
				if (This.chart.series[i].name == seriesName) {
					This.chart.series[i].setVisible(isShow);
					exportOption.series[i].visible = isShow;
				}
			}
		} else if (This.tplJSON) {
			for (var i = 0; i < This.tplJSON.series.length; i++) {
				if (This.tplJSON.series[i].name == seriesName) {
					This.tplJSON.series[i].visible = isShow;
				}
			}
		}
	},
	// 删除序列  参数 要删除的序列名称  返回被删除的序列对象
	deleSeries: function(seriesName) {
		var me = this,
			chart = me.chart,
			yAxisObj = chart.yAxisObj,
			seleserise = null,
			diOffset = null,
			dOption = null,
			exportOption = chart.options.exportOptions || {};
		exportOption.series = exportOption.series || [];
		chart.deleOption = chart.deleOption || [];
		if (seriesName) {
			// 根据序列名称获取被删除序列的相关信息
			for (var i = 0; i < chart.series.length; i++) {
				if (chart.series[i].name == seriesName) {
					seleserise = chart.series[i];
					dOption = {
						deleSeries: me.deepCopy(seleserise.userOptions),
						delAxis: me.deepCopy(seleserise.yAxis.userOptions)
					}
					exportOption.series.splice(i, 1)
				}
			}
			// 被删除的序列单独占用一条Y轴时处理
			if (seleserise.yAxis.series.length == 1 && seleserise.yAxis.series[0].userOptions.id == seleserise.userOptions.id) {
				var myAxis = seleserise.yAxis,
					axisId = myAxis.userOptions.id,
					axisTop = myAxis.userOptions.oriTop,
					axisArr = null;
				// 拿到与该Y轴同组的所有Y轴
				for (var a in yAxisObj) {
					if (a == axisTop) {
						axisArr = yAxisObj[a];
					}
				}
				for (var i = 0; i < axisArr.length; i++) {
					if (axisArr[i].userOptions.id == axisId) {
						axisArr.splice(i, 1)
					}
				}
				var n = seleserise.yAxis.userOptions.index;
				exportOption.yAxis.splice(n, 1);
				seleserise.yAxis.remove();
				if (axisArr.length > 0) { // 横向变化
					var offsetArr = axisArr[0].userOptions.offsetArr;
					for (var i = 0; i < axisArr.length; i++) {
						axisArr[i].update({
							offset: offsetArr[i],
						});
						axisArr[i].offset = offsetArr[i];
						findAxisById(exportOption.yAxis,axisArr[i].userOptions.id).offset = offsetArr[i];
					}
				} else { //纵向变化
					var n = 0;
					var yArr = [];
					for (var k in yAxisObj) {
						if (yAxisObj[k].length > 0) {
							n++;
							yArr.push(yAxisObj[k]);
						}
					}

					if (chart.userOptions.chart.marginTop) {
						var ch = 0;
					} else {
						var ch = 36 / chart.clipBox.height * 100;
					}
					if (chart.userOptions.chart.axisSpacing) {
						var spacing = chart.userOptions.chart.axisSpacing / chart.clipBox.height * 100;
					} else {
						var spacing = 20 / chart.clipBox.height * 100;
					}

					var h = Math.round(((100 - ch) - (n - 1) * spacing) / n * 100) / 100;
					for (var i = 0; i < yArr.length; i++) {
						var arr = yArr[i];
						for (var j = 0; j < arr.length; j++) {
							arr[j].update({
								height: h + "%",
								top: (h * i + spacing * i + ch) + "%"
							});
							arr[j].userOptions.height = h + "%";
							arr[j].userOptions.top = (h * i + spacing * i + ch) + "%";
							console.log(findAxisById(exportOption.yAxis,arr[j].userOptions.id))
							findAxisById(exportOption.yAxis,arr[j].userOptions.id).height = h + "%";
							findAxisById(exportOption.yAxis,arr[j].userOptions.id).top = (h * i + spacing * i + ch) + "%";
						}
					}
				}

			} else {
				seleserise.remove();
			}
			
			chart.deleOption.push(dOption);
			
			function findAxisById (arr,id) {
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].id == id) {
						return arr[i];
					}
				}
				return null;
			}


			return chart.deleOption;
		}
	},
	// 恢复序列
	restoreSeries: function(seriesName) {
		var me = this,
			chart = me.chart,
			deleOption = chart.deleOption;
		for (var i = 0; i < deleOption.length; i++) {
			if (deleOption[i].deleSeries.name == seriesName) {
				var de = deleOption[i];
				var deIndex = i;
			}
		}
		if (de) {
			var chartYAxis = chart.yAxis,
				hasAxis = false;
			for (var i = 0; i < chartYAxis.length; i++) {
				if (chartYAxis[i].userOptions.id == de.delAxis.id) {
					hasAxis = true;
				}
			}
			if (!hasAxis) {
				me.addYaxisByOptions(de.delAxis);
			}
			var s = chart.addSeries(de.deleSeries);
			s.hide();
			s.show();
			deleOption.splice(deIndex, 1)
		}
	},
	// 恢复加坐标轴
	addYaxisByOptions: function(options) {
		var me = this,
			chart = me.chart,
			yAxisObj = chart.yAxisObj,
			mySeriseAxis = null,
			axisTop = options.oriTop,
			axisOffset = options.offset,
			axisId = options.id;
		for (var a in yAxisObj) {
			if (a == axisTop) {
				if (yAxisObj[a][0]) {
					options.height = yAxisObj[a][0].height;
					options.top = yAxisObj[a][0].top;
				}
				mySeriseAxis = chart.addAxis(options, false),
					yAxisObj[a].unshift(mySeriseAxis);
				axisArr = yAxisObj[a];
				axisArr.sort(me.sortRule_h);
			}
		}
		if (axisArr.length > 1) { // 横向变化
			var offsetArr = axisArr[0].userOptions.offsetArr;
			for (var i = 0; i < axisArr.length; i++) {
				axisArr[i].update({
					offset: offsetArr[i],
				});
				axisArr[i].offset = offsetArr[i];
			}
		} else { //纵向变化
			var n = 0;
			var yArr = [];
			var keys = [];
			for (var k in yAxisObj) {
				if (yAxisObj[k].length > 0) {
					n++;
					// if(parseFloat(key)<=parseFloat(k)){
					// 	yArr.push(yAxisObj[k]);
					// }else{
					// 	yArr.unshift(yAxisObj[k]);
					// }
					keys.push(k);
				}
			}
			keys.sort();
			keys.forEach(function(item) {
				yArr.push(yAxisObj[item]);
			})
			if (chart.userOptions.chart.marginTop) {
				var ch = 0;
			} else {
				var ch = 36 / chart.clipBox.height * 100;
			}
			if (chart.userOptions.chart.axisSpacing) {
				var spacing = chart.userOptions.chart.axisSpacing / chart.clipBox.height * 100;
			} else {
				var spacing = 20 / chart.clipBox.height * 100;
			}
			var h = Math.round(((100 - ch) - (n - 1) * spacing) / n * 100) / 100;
			for (var i = 0; i < yArr.length; i++) {
				var arr = yArr[i];
				for (var j = 0; j < arr.length; j++) {
					arr[j].update({
						height: h + "%",
						top: (h * i + spacing * i + ch) + "%"
					});
					arr[j].userOptions.height = h + "%";
					arr[j].userOptions.top = (h * i + spacing * i + ch) + "%";
				}
			}
		}
	},
	// 设置图表背景颜色
	setChartBackgroundColor: function(color) {
		var This = this;
		if (This.chart) {
			exportOption = This.chart.options.exportOptions || {};
			This.chart.update({
				chart: {
					plotBackgroundColor: color,
					backgroundColor: color
				}
			});
			exportOption.chart.plotBackgroundColor = color;
			exportOption.chart.backgroundColor = color;
		} else if (This.tplJSON) {
			This.tplJSON.chart.plotBackgroundColor = value;
			This.tplJSON.chart.backgroundColor = value;
		}
	},
	// 设置递减指数曲线服务配置地址
	setFittingPath: function(url) {
		var This = this.chart || this;
		This.tplJSON.fittingPath = url;
	},
	// 设置图表边距
	setChartMagin: function(type, value) {
		var This = this;
		if (This.chart) {
			exportOption = This.chart.options.exportOptions || {};
			switch (type) {
				case 'left':
					This.chart.update({
						chart: {
							marginLeft: parseFloat(value)
						}
					});
					exportOption.chart.marginLeft = parseFloat(value);
					break;
				case 'right':
					This.chart.update({
						chart: {
							marginRight: parseFloat(value)
						}
					});
					exportOption.chart.marginRight = parseFloat(value);
					break;
				case 'top':
					This.chart.update({
						chart: {
							marginTop: parseFloat(value)
						}
					});
					exportOption.chart.marginTop = parseFloat(value);
					break;
				case 'bottom':
					This.chart.update({
						chart: {
							marginBottom: parseFloat(value)
						}
					});
					exportOption.chart.marginBottom = parseFloat(value);
					break;
				default:
					break;
			}

		} else if (This.tplJSON) {
			switch (type) {
				case 'left':
					This.tplJSON.chart.marginLeft = parseFloat(value);
					break;
				case 'right':
					This.tplJSON.chart.marginRight = parseFloat(value);
					break;
				case 'top':
					This.tplJSON.chart.marginTop = parseFloat(value);
					break;
				case 'bottom':
					This.tplJSON.chart.marginBottom = parseFloat(value);
					break;
				default:
					break;
			}
		}
	},
	// 获取图表边距 type 获取的边界 top、bottom、left、righ
	getChartMagin: function(type) {
		var This = this,
			chart = This.chart,
			value = '';
		switch (type) {
			case 'left':
				value = chart.options.chart.marginLeft || chart.plotLeft;
				break;
			case 'right':
				value = chart.options.chart.marginRight || chart.marginRight;
				break;
			case 'top':
				value = chart.options.chart.marginTop || chart.plotTop;
				break;
			case 'bottom':
				value = chart.options.chart.marginBottom || chart.marginBottom;
				break;
			default:
				break;
		}
		return value;
	},
	// 获取序列颜色  name 序列名称
	getSeriesConfig: function(name) {
		var This = this,
			chart = This.chart,
			json = {},
			data = [];
		allSeries = chart.options.series;
		if (name) {
			for (var i = 0; i < allSeries.length; i++) {
				if (allSeries[i].name == name || allSeries[i].sname == name) {
					json.color = allSeries[i].color || allSeries[i].lineColor;
					json.type = allSeries[i].type;
					json.isShou = allSeries[i].visible;
					if (allSeries[i].type == 'line' || allSeries[i].type == 'spline') {
						json.style = allSeries[i].dashStyle;
					}
				}
			}
			return json;
		} else {
			for (var i = 0; i < allSeries.length; i++) {
				var j = {};
				j.color = allSeries[i].color || allSeries[i].lineColor;
				j.type = allSeries[i].type;
				j.isShow = allSeries[i].visible || true;
				j.name = allSeries[i].name || allSeries[i].sname || 'series' + i;
				if (allSeries[i].type == 'line' || allSeries[i].type == 'spline') {
					j.style = allSeries[i].dashStyle;
				}
				data.push(j)
			}
			return data;
		}
	},
	// 获取绘图区颜色
	getChartBackgroundColor: function() {
		var This = this,
			chart = This.chart,
			color = '';
		if (chart.options) {
			color = chart.options.chart.plotBackgroundColor;
		}
		return color;
	},
	// 获取标题名称
	getChartTitle: function() {
		var This = this,
			chart = This.chart,
			title = '';
		if (chart.title) {
			title = chart.title.textStr
		}
		return title;
	},
	// 设置饼图颜色
	setPieColor: function(ColorArr) {
		var type = this.tplJSON.chart.type;
		if (type != "pie") {
			//Ext.Msg.alert("提示", "请确认setPieColor方法设置的曲线为饼状图或环形图");
			return;
		}
		if (ColorArr instanceof Array) {
			if (!this.tplJSON.plotOptions.pie) {
				this.tplJSON.plotOptions.pie = {};
			}
			this.tplJSON.plotOptions.pie.colors = ColorArr;
		} else {
			Ext.Msg.alert("提示", "请确认setPieColor方法传入参数为数组");
			return;
		}
	},
	// 添加类储层标识
	addXrangelable: function(seriesData) {
		/*
		 * 数据参数
		 * @param x1  X轴起点数据
		 * @param x2  X轴终点数据
		 * @param color 颜色
		 */
		var that = this,
			Chart = that.chart;
		for (var i = 0; i < seriesData.length; i++) {
			if (seriesData[i].y == 1) {
				var y1 = Chart.yAxis[0].tickPositions[Chart.yAxis[0].tickPositions.length - 2];
				var y2 = Chart.yAxis[0].tickPositions[Chart.yAxis[0].tickPositions.length - 1];
			} else if (seriesData[i].y == 2) {
				var y1 = Chart.yAxis[0].tickPositions[Chart.yAxis[0].tickPositions.length - 3];
				var y2 = Chart.yAxis[0].tickPositions[Chart.yAxis[0].tickPositions.length - 2];
			}
			that.renderRect(0, {
				x1: seriesData[i].x1,
				x2: seriesData[i].x2,
				y1: y2,
				y2: y1,
				text: seriesData[i].text || null,
				fontSize: seriesData[i].fontSize || '12px',
				textColor: seriesData[i].textColor || '#333',
				fillcolor: seriesData[i].color,
				borderColor: seriesData[i].borderColor,
			})

		}
	},
	/**
	 * 设置折线的颜色、宽度
	 * @param lColor 折线图中指线的颜色，柱状图中柱子的颜色
	 * @param lWidth 线宽
	 * @param sName  所属序列名称，不传默认是曲线所有序列
	 * @constructor
	 */
	setLinesStyle: function(lWidth, lColor, sName) {
		var me = this;
		var allSeries = me.tplJSON.series;
		//console.log(allSeries)
		if (sName) {
			for (var i = 0; i < allSeries.length; i++) {
				if (allSeries[i].name == sName) {
					allSeries[i].lineWidth = parseFloat(lWidth) || allSeries[i].lineWidth;
					allSeries[i].color = lColor || allSeries[i].color;
					//allSeries[i].dashStyle = me.getLineStyle(lStyle) || allSeries[i].dashStyle;
				}
			}
		} else {
			for (var i = 0; i < allSeries.length; i++) {
				allSeries[i].lineWidth = parseFloat(lWidth) || allSeries[i].lineWidth;
				allSeries[i].color = lColor || allSeries[i].color;
				//allSeries[i].dashStyle = me.getLineStyle(lStyle) || allSeries[i].dashStyle;
			}
		}
	},
	/**
	 * 设置点的颜色、半径
	 * @param lWidth 点半径
	 * @param fillColor 点的颜色
	 * @param sName  所属序列名称，不传默认是曲线所有序列
	 * @constructor
	 */
	setPointStyle: function(lWidth, fillColor, sName) {
		var allSeries = this.tplJSON.series;
		if (sName) {
			for (var i = 0; i < allSeries.length; i++) {
				if (allSeries[i].name == sName) {
					allSeries[i].marker.radius = parseFloat(lWidth) || allSeries[i].marker.radius;
					allSeries[i].marker.fillColor = fillColor || allSeries[i].marker.fillColor;
					//allSeries[i].marker.borderColor = borderColor || allSeries[i].marker.borderColor;
				}
			}
		} else {
			for (var i = 0; i < allSeries.length; i++) {
				allSeries[i].marker.radius = parseFloat(lWidth) || allSeries[i].marker.radius;
				allSeries[i].marker.fillColor = fillColor || allSeries[i].marker.fillColor;
				//allSeries[i].marker.borderColor = borderColor || allSeries[i].marker.borderColor;
			}
		}
	},
	// 设置X轴标示线
	setxAxisePlotLines: function(AxiseIndex, width, color, value, textOption) {
		var that = this,
			textOption = textOption || {},
			num = AxiseIndex || 0;
		var type = that.tplJSON.xAxis[num].type;
		var r = 90;
		if(textOption.rotation!=undefined &&textOption.rotation!=null) {
			r = textOption.rotation
		}
		var plotLine = {
			width: parseFloat(width),
			color: color,
			value: type == "datetime" ? that.date_getMillisecond(value) : parseFloat(value),
			label: {
				text: textOption.text || '',
				style: {
					color: textOption.color || '#333',
					verticalAlign: textOption.align || 'top',
					y: 10
				},
				rotation: r,
				useHTML: true,
				x: textOption.x || 0,
			}
		}
		that.tplJSON.xAxis[num].plotLines = that.tplJSON.xAxis[num].plotLines || [];
		that.tplJSON.xAxis[num].plotLines.push(plotLine)
	},
	// 清除标示线
	deleAxisePlotLines: function(axiseType, AxiseIndex) {
		var that = this,
			num = AxiseIndex || 0;
		if (axiseType == 'x' || axiseType == 'X') {
			that.tplJSON.xAxis[num].plotLines = [];
		} else if (axiseType == 'y' || axiseType == 'Y') {
			that.tplJSON.yAxis[num].plotLines = [];
		}
	},
	// 设置Y轴标示线
	setyAxisePlotLines: function(AxiseIndex, width, color, value, textOption) {
		var that = this,
			textOption = textOption || {},
			num = AxiseIndex || 0;
		var type = that.tplJSON.yAxis[num].type;
		var plotLine = {
			width: parseFloat(width),
			color: color,
			value: type == "datetime" ? that.date_getMillisecond(value) : parseFloat(value),
			label: {
				text: textOption.text || '',
				style: {
					color: textOption.color || '#333',
					align: textOption.align || 'left',
					y: 10
				},
				rotation: textOption.rotation || 0,
				useHTML: true,
				x: textOption.x || 0,
			}
		}
		that.tplJSON.yAxis[num].plotLines = that.tplJSON.yAxis[num].plotLines || [];
		that.tplJSON.yAxis[num].plotLines.push(plotLine)
	},
	// 设置Y轴标题名称
	setyAxiseTileName: function(AxiseIndex, newName) {
		var num = AxiseIndex || 0;
		if (this.tplJSON.yAxis[num].title.show && this.tplJSON.yAxis[num].title.show == 'vertical') {
			this.tplJSON.yAxis[num].title.text = this.addBr(newName);
		} else {
			this.tplJSON.yAxis[num].title.text = newName;
		}
	},
	// 设置轴标题名称
	setAxiseTileName: function(AxisType, AxiseIndex, newName) {
		var num = AxiseIndex || 0;
		if (AxisType == 'y' || AxisType == 'Y') {
			if (this.tplJSON.yAxis[num].title.show && this.tplJSON.yAxis[num].title.show == 'vertical') {
				this.tplJSON.yAxis[num].title.text = this.addBr(newName);
				// console.log(this.tplJSON.yAxis[num].title)
			} else {
				this.tplJSON.yAxis[num].title.text = newName;
			}
		} else if (AxisType == 'x' || AxisType == 'x') {
			if (this.tplJSON.xAxis[num].title.show && this.tplJSON.xAxis[num].title.show == 'vertical') {
				this.tplJSON.xAxis[num].title.text = this.addBr(newName);
			} else {
				this.tplJSON.xAxis[num].title.text = newName;
			}
		}

	},
	// 设置数据提示框格式
	ISetTooltipFormatter: function(fun) {
		var tp = this.tplJSON.tooltip || {};
		tp.formatter = fun;
		this.tplJSON.tooltip = tp;
	},
	// 设置X轴标签格式
	setxAxisLablesFormatter: function(fun) {
		var tp = this.tplJSON.xAxis[0].labels || {};
		tp.formatter = fun;
		this.tplJSON.xAxis[0].labels = tp;
	},
	// 设置序列标签格式
	setSeriesLablesFormatter: function(fun, seriesName) {
		var plotOptions = this.tplJSON.plotOptions || {},
			se = plotOptions.series || {},
			da = se.dataLabels || {};
		if (da.format) {
			da.format = null
		}
		da.formatter = fun;
		se.dataLabels = da;
		var allSeries = this.tplJSON.series;
		for (var i = 0; i < allSeries.length; i++) {
			var tp = allSeries[i].dataLabels || {};
			if (tp.format) {
				tp.format = null
			}
			tp.formatter = fun;
			allSeries[i].dataLabels = tp;
		}
		// if(seriesName){
		// 	for(var i = 0;i<allSeries.length;i++){
		// 		if(allSeries[i].name == seriesName|| allSeries[i].sname == seriesName){
		// 			var tp = allSeries[i].dataLabels ||{};
		// 			if(tp.format){
		// 				tp.format = null
		// 			}
		// 			tp.formatter = fun;
		// 			allSeries[i].dataLabels = tp;
		// 		}
		// 	}
		// }else{
		// 	for(var i = 0;i<allSeries.length;i++){
		// 		var tp = allSeries[i].dataLabels ||{};
		// 		if(tp.format){
		// 			tp.format = null
		// 		}
		// 		tp.formatter = fun;
		// 		allSeries[i].dataLabels = tp;
		// 	}
		// }
	},
	// 绘制背景区域
	renderRect: function(yAxisIndex, option) {
		/**
		 * 绘制背景
		 * @param yAxisIndex 所属Y轴
		 * @param x1 x轴起点位置
		 * @param x2 x轴终点位置
		 * @param y1 y轴起点位置(从顶端开始算起)
		 * @param y2 y轴终点位置
		 * @param fillcolor 填充颜色
		 * @param opacity 透明度
		 * @param borderWidth 边框宽度
		 * @param borderColor 边框颜色
		 * @param text 文本
		 * @param fontSize 文本字体
		 * @param textColor 文本颜色
		 */
		var defaultOption = {
			x1: 0, //@param x1 x轴起点位置
			x2: 2, //x2 x轴终点位置
			y1: 0, // @param y1 y轴起点位置(从顶端开始算起)
			y2: 0, //@param y2 y轴终点位置
			fillcolor: '#fff', //@param fillcolor 填充颜色
			borderColor: '#000', // @param borderColor 边框颜色
			opacity: 1, //@param opacity 透明度
			text: null, // @param text 文本
			fontSize: '12px', //@param fontSize 文本字体
			textColor: '#333', // @param textColor 文本颜色
		}
		if (!option) {
			option = defaultOption
		}
		var Chart = this.chart,
			ren = Chart.renderer,
			xAxis = Chart.xAxis[0],
			yAxis = Chart.yAxis[yAxisIndex];
		var iorColor = option.fillcolor || defaultOption.fillcolor;
		var typeX = xAxis.userOptions.type;
		var typeY = yAxis.userOptions.type;

		var id = option.x1.toString() + option.y1.toString();

		option.x1 = typeX == "datetime" ? this.date_getMillisecond(option.x1 || defaultOption.x1) : parseFloat(option.x1 ||
			defaultOption.x1)
		option.x2 = typeX == "datetime" ? this.date_getMillisecond(option.x2 || defaultOption.x2) : parseFloat(option.x2 ||
			defaultOption.x2)
		option.y1 = typeY == "datetime" ? this.date_getMillisecond(option.y1 || defaultOption.y1) : parseFloat(option.y1 ||
			defaultOption.y1)
		option.y2 = typeY == "datetime" ? this.date_getMillisecond(option.y2 || defaultOption.y2) : parseFloat(option.y2 ||
			defaultOption.y2)

		option.x1 = yAxis.left + xAxis.translate(option.x1, 0, 0, 0, 1);
		option.x2 = yAxis.left + xAxis.translate(option.x2, 0, 0, 0, 1);
		option.y1 = yAxis.top + yAxis.translate(option.y1, 0, 1, 0, 1);
		option.y2 = yAxis.top + yAxis.translate(option.y2, 0, 1, 0, 1);
		var x = option.x1,
			y = option.y1,
			w = (option.x2 - option.x1),
			h = (option.y2 - option.y1);
		Chart.renderRects = Chart.renderRects || [];
		for (var i = 0; i < Chart.renderRects.length; i++) {
			if (Chart.renderRects[i].id == id) {
				Chart.renderRects[i].renderRect.destroy();
				Chart.renderRects[i].renderLable.destroy();
				Chart.renderRects.remove(Chart.renderRects[i])
			}
		}
		var reclable = ren.rect(x, y, w, h).attr({
			'stroke-width': option.borderWidth || 1,
			stroke: option.borderColor || iorColor || '#000',
			fill: iorColor,
			opacity: option.opacity || 1
		}).add().on('click', function(e) {
			if (option.callback) {
				option.callback();
			}
		});
		option.text = option.text || '';
		var html = '<div style="width:' + w + 'px;height:' + h + 'px;text-align:center">' + option.text + '</div>'
		var renderLable = ren.label(html, x, y, '', 0, 0, true)
			.css({
				color: option.textColor || defaultOption.textColor,
				fontSize: option.fontSize || defaultOption.fontSize,
			}).add();

		Chart.renderRects.push({
			id: id,
			renderRect: reclable,
			renderLable: renderLable
		})
	},
	// 绘制点标注
	renderLabel: function(seriesName, option) {
		/**
		 * 绘制标签
		 * @param x  点的X轴对应的值
		 * @param y  点的Y轴对应的值
		 * @param text 文本内容
		 * @param size 文本字体
		 * @param textColor 文本颜色
		 * @param borderWidth 边框宽度
		 * @param borderColor 边框颜色
		 * @param opacity 透明度
		 * @param callback 回调函数
		 */
		var defaultOption = {
			x: 0, //@param x  点的X轴对应的值
			y: 0, //@param y  点的Y轴对应的值
			text: '示例标注', //@param text 文本内容
			size: '10px', // @param size 文本字体
			textColor: "#000", //@param textColor 文本颜色
			borderWidth: 0, //@param borderWidth 边框宽度
			borderColor: '#000', //@param borderColor 边框颜色
			bgColor: 'rgba(255,255,255,0)', // @param borderColor 边框颜色
			opacity: 1, // @param opacity 透明度
			callback: null // @param callback 回调函数
		}
		if (!option) {
			option = defaultOption
		}
		var Chart = this.chart,
			ren = Chart.renderer,
			xAxis = Chart.xAxis[0],
			typeX = xAxis.userOptions.type;
		var oriData = Chart.data.options.json;
		var series = Chart.series,
			seleSeries, selePoint;
		for (var i = 0; i < series.length; i++) {
			if (series[i].name == seriesName) {
				seleSeries = series[i]
			}
		}
		if (seleSeries) {
			var zdStr = seleSeries.userOptions.xData;
			for (var i = 0; i < oriData.length; i++) {
				if (oriData[i][zdStr] == option.x) {
					selePoint = seleSeries.data[i];
					if (selePoint.ploLabel) {
						selePoint.ploLabel.destroy();
					}
				}
			}
			var x = selePoint.plotX + seleSeries.yAxis.left;
			var addX = parseFloat(option.size || defaultOption.size) + 10;
			var n = option.text.split('<br>').length - 1;
			var m = option.text.split('</br>').length - 1;
			var addY = addX * (m + n + 1) + addX + 3;
			if (selePoint.plotY) {
				var y = selePoint.plotY + seleSeries.yAxis.top;
				var callType = 'callout'
			} else {
				var y = seleSeries.yAxis.top + addY;
				var callType = null
			}
		} else {
			console.log("提示：绘制数据点标注请确认传入了正确的序列名称");
			return
		}
		selePoint.ploLabel = ren.label(option.text || defaultOption.text, x - addX, y - addY, callType, x, y, true)
			.css({
				color: option.textColor || defaultOption.textColor,
				fontSize: option.size || defaultOption.size,
				fontWeight: 'blod'
			}).attr({
				'stroke-width': option.borderWidth || defaultOption.borderWidth,
				stroke: option.borderColor || defaultOption.borderColor,
				fill: option.bgColor || defaultOption.bgColor,
				opacity: option.opacity || defaultOption.opacity,
				padding: 8,
				r: 5,
				zIndex: 3
			}).add().on('click', function(e) {
				if (option.callback) {
					option.callback();
				}
			});
	},
	// 补br换行标签
	addBr: function(str) {
		if (!str) {
			return
		}
		var me = this;
		var str = me.removeBr(str);
		var strArr1 = [],
			strArr2 = [],
			slicer1, endStr, slicer2, slicer3;
		if (str.indexOf("(") > -1) {
			slicer1 = "(";
			slicer2 = ")";

		} else if (str.indexOf("（") > -1) {
			slicer1 = "（";
			slicer2 = "）";
		} else {
			slicer1 = "";
			slicer2 = "";
		}
		if (slicer1) {
			strArr1 = str.split(slicer1)[0].split(""); // 括号前面的部分 
		} else {
			strArr1 = str.split(slicer1);
		}
		var other = str.split(slicer1)[1];
		if (other.split(slicer2)[1]) {
			strArr2 = other.split(slicer2)[1].split(""); // 括号后面的部分
		}
		// 括号中的部分的处理
		//if(other.split(slicer2)[0].indexOf("/") > -1){
		//    endStr = other.split(slicer2)[0].split("/");
		//    slicer3 = '/';
		//}else{
		endStr = other.split(slicer2)[0].split(" ");
		slicer3 = '';
		//}
		var reg = /^[\u4e00-\u9fa5]+$/;
		var reg1 = /^[a-zA-Z0-9]/;
		strArr1.forEach(function(item, index) {
			strArr1[index] = '<div style="text-align: center;min-width:60px">' + item + '</div>';
		})
		strArr2.forEach(function(item, index) {
			strArr2[index] = '<div style="text-align: center;min-width:60px">' + item + '</div>';
		})
		if (slicer1 && slicer2) {
			if (slicer3) {
				var str = strArr1.join('') +
					"<div style='text-align: center;'><div style='transform: rotate(90deg); min-width:60px'>" + slicer1 + "</div>" +
					"<div style='text-align: center; min-width:60px'>" + endStr[0] + "</div>" +
					"<div style='text-align: center; min-width:60px'>" + slicer3 + "</div>" +
					"<div style='text-align: center; min-width:60px'>" + endStr[1] + "</div>" +
					"<div style='transform: rotate(90deg); min-width:60px'>" + slicer2 + "</div></div>" + strArr2.join('');
			} else {
				var str = strArr1.join('') +
					"<div style='text-align: center;'><div style='transform: rotate(90deg); min-width:60px'>" + slicer1 + "</div>" +
					"<div style='text-align: center; min-width:60px'>" + endStr[0] + "</div>" +
					"<div style='transform: rotate(90deg); min-width:60px'>" + slicer2 + "</div></div>" + strArr2.join('');
			}
		} else {
			var str = strArr1.join('');
		}
		return str;
	},
	removeBr: function(str) {
		var reg = /<[^>]*>|<\/[^>]*>/gm;
		var s = str.replace(reg, "")
		s = titleEscape(s);
		return s;

		function titleEscape(text) {
			var codeObj = [{
					num: '1',
					code: '&#185;'
				},
				{
					num: '2',
					code: '&#178;'
				},
				{
					num: '3',
					code: '&#179;'
				},
				{
					num: '4',
					code: '&#8308;'
				},
				{
					num: '5',
					code: '&#8309;'
				},
				{
					num: '6',
					code: '&#8310;'
				},
				{
					num: '7',
					code: '&#8311;'
				},
				{
					num: '8',
					code: '&#8312;'
				},
				{
					num: '9',
					code: '&#8313;'
				},
				{
					num: 'n',
					code: '&#8319;'
				},
				{
					num: '0',
					code: '&#8304;'
				}
			]
			// 查找un码
			function getCode(str) {
				for (var i = 0; i < codeObj.length; i++) {
					if (codeObj[i].num == str) {
						return codeObj[i].code;
					}
				}
			}
			var t = text
			if (text.indexOf("^") != -1) {
				var strArr = text.split('^');
				var arr = [];
				strArr.forEach(function(item, index) {
					if (index > 0) {
						if (item.substring(0, 1) == '-') {
							var v = '&#8315;' + getCode(item.substring(1, 2));
							var v1 = item.substring(2, item.length)
							arr.push(v + v1);
						} else {
							if (getCode(item.substring(0, 1))) {
								var v = getCode(item.substring(0, 1));
								var v1 = item.substring(1, item.length)
								arr.push(v + v1);
							} else {
								vmd.alert('提示', '该上标数字不存在')
							}
						}

					} else {
						arr.push(item);
					}
				})
				t = arr.join('');
			}
			return t;
		}
	},
	// 添加顶部工具条配置
	addToolBarConfig: function(imgUrl, jsonUrl) {
		var This = this.chart || this;
		This.tplJSON.toolbarConfig = This.tplJSON.toolbarConfig || {},
			This.tplJSON.toolbarConfig.imgUrl = imgUrl;
		This.tplJSON.toolbarConfig.jsonUrl = jsonUrl;
	},
	// 设置顶部工具条是否初始加载时便加载
	setToolBarIsLoad: function(bool) {
		var This = this.chart || this;
		This.tplJSON.toolbarConfig = This.tplJSON.toolbarConfig || {},
			This.tplJSON.toolbarConfig.isLoad = bool || false;
	},
	//深度拷贝对象或数组
	deepCopy: function() {
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
	},
	getLineStyle: function(style) {
		if (style === undefined) {
			return undefined;
		}
		style += "";
		switch (style) {
			case '1':
				return 'ShortDash';
			case '2':
				return 'ShortDot';
			case '3':
				return 'ShortDashDot';
			case '4':
				return 'ShortDashDotDot';
			case '5':
				return 'Dot';
			case '6':
				return 'Dash';
			case '7':
				return 'LongDash';
			case '8':
				return 'DashDot';
			case '9':
				return 'LongDashDot';
			case '10':
				return 'LongDashDotDot';
			default:
				return 'Solid';
		}
	},
	getJSON: function(url, success, error) {
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
	//时间转utc时间戳
	date_getMillisecond: function(sDate) {
		var year, month, day, hour, minute, second, milliseconds = 0;
		sDate += "";
		sDate = sDate.replace(/\//g, "-");

		//2014-1-20 8:50:00
		if (/\d{4}(-\d{1,2}){1,2}\s{1,}\d{1,2}(:\d{1,2}){1,2}(\.\d+){0,1}/.test(sDate)) {
			var date_time_arr = this.array_filter(sDate.split(/\s+/), function(v) {
				return v != null
			}, null);
			var date_arr = this.array_map(date_time_arr[0].split("-"), function(v) {
				return parseInt(v.trim(), 10)
			}, null);
			var time_arr = this.array_map(date_time_arr[1].split(":"), function(v) {
				return parseInt(v.trim(), 10)
			}, null);

			year = date_arr[0];
			month = date_arr[1];
			day = date_arr[2];

			hour = time_arr[0];
			minute = time_arr[1];
			second = time_arr[2];

			if (sDate.indexOf(".") != -1) {
				milliseconds = parseInt(sDate.split(".")[1], 10);
			}
		}

		//11-MAY-15 20:52:48.0 日-月-年 时:分:秒.毫秒
		else if (/\d{1,2}-([a-zA-Z]+)-\d{2,4}\s{1,}\d{1,2}(:\d{1,2}){2}(\.\d+){0,1}/.test(sDate)) {

			var monthsMap = {
				'january': 1,
				'february': 2,
				'march': 3,
				'april': 4,
				'may': 5,
				'june': 6,
				'july': 7,
				'august': 8,
				'september': 9,
				'october': 10,
				'november': 11,
				'december': 12,
				'jan': 1,
				'feb': 2,
				'mar': 3,
				'apr': 4,
				'may': 5,
				'jun': 6,
				'jul': 7,
				'aug': 8,
				'sep': 9,
				'oct': 10,
				'nov': 11,
				'dec': 12
			}
			var date_time_arr = this.array_filter(sDate.split(/\s+/), function(v) {
				return v != null
			}, null);
			var date_arr = this.array_map(date_time_arr[0].split("-"), function(v) {
				return v.trim()
			}, null);

			year = parseInt(date_arr[2].length == 2 ? ("20" + date_arr[2]) : date_arr[2], 10);
			month = monthsMap[date_arr[1].toLowerCase()];
			day = parseInt(date_arr[0]);

			var time_arr = this.array_map(date_time_arr[1].split(":"), function(v) {
				return parseInt(v.trim(), 10)
			}, null);
			hour = time_arr[0];
			minute = time_arr[1];
			second = time_arr[2];

			if (sDate.indexOf(".") != -1) {
				milliseconds = parseInt(sDate.split(".")[1], 10);
			}
		}

		//2014-1-20
		else if (/\d{4}(-\d{1,2}){1,2}/.test(sDate)) {
			var date_arr = this.array_map(sDate.split("-"), function(v) {
				return parseInt(v.trim(), 10)
			}, null);

			year = date_arr[0];
			month = date_arr[1];
			day = date_arr[2];
		}

		//8:50:00
		else if (/\d{1,2}(:\d{1,2}){1,2}(\.\d+){0,1}/.test(sDate)) {
			var time_arr = this.array_map(sDate.split(":"), function(v) {
				return parseInt(v.trim(), 10)
			}, null);
			hour = time_arr[0];
			minute = time_arr[1];
			second = time_arr[2];
			if (sDate.indexOf(".") != -1) {
				milliseconds = parseInt(sDate.split(".")[1], 10);
			}
		}

		//毫秒值 1390176000000
		else if (/\d{10,}/.test(sDate)) {
			return parseInt(sDate, 10);
		}

		//20140120 || 2014 || 201401
		else if (/\d{4,8}/.test(sDate)) {
			year = parseInt(sDate.substr(0, 4), 10);
			month = parseInt(sDate.substr(4, 2), 10);
			day = parseInt(sDate.substr(6, 2), 10);
		} else if (sDate == "0") {
			return 0;
		}
		//日期格式不正确
		else {
			alert("日期格式不正确");
			return;
		}

		//修正年月日
		year = isNaN(year) ? 2000 : year;
		month = isNaN(month) ? 1 : month;
		day = isNaN(day) ? 1 : day;

		//修正时分秒
		hour = isNaN(hour) ? 0 : hour;
		minute = isNaN(minute) ? 0 : minute;
		second = isNaN(second) ? 0 : second;

		return Date.UTC(year, month - 1, day, hour, minute, second, milliseconds);
	},
	// utc时间戳转指定格式日期
	date_getFormatDate: function(millisecond, format) {
		var that = this;
		if (!/\d{10,}/.test(millisecond)) {
			return "";
		}
		format = format || "YYYY-mm-dd hh:mi:ss.ms";
		var date = new Date(parseInt(millisecond));
		return format
			.replace(/YYYY/i, date.getFullYear())
			.replace(/YY/i, date.getFullYear().toString().substr(2, 2))
			.replace(/MM/g, that.pad(date.getUTCMonth() + 1))
			.replace(/mm/g, date.getUTCMonth() + 1)
			.replace(/DD/i, date.getUTCDate())
			.replace(/HH/i, date.getUTCHours())
			.replace(/MI/i, date.getUTCMinutes())
			.replace(/SS/i, date.getUTCSeconds())
			.replace(/MS/i, date.getUTCMilliseconds());
	},
	pad: function(number, length) {
		// Create an array of the remaining length +1 and join it with 0's
		return new Array((length || 2) + 1 - String(number).length).join(0) + number;
	},
	array_map: function(arr, fn, context) {
		var arr_tmp = [];
		if (typeof fn === "function") {
			for (var k = 0, length = arr.length; k < length; k++) {
				arr_tmp.push(fn.call(context, arr[k], k, arr));
			}
		}
		return arr_tmp;
	},
	array_filter: function(arr, fn, context) {
		var arr_tmp = [];
		if (typeof fn === "function") {
			for (var k = 0, length = arr.length; k < length; k++) {
				fn.call(context, arr[k], k, arr) && arr_tmp.push(arr[k]);
			}
		}
		return arr_tmp;
	},
	copyChartImageBase: function(callback) {
		var me = this;
		me.tplJSON.exporting = me.tplJSON.exporting || {};
		$LAB.script(vmd.virtualPath + "/chart/js/load/bluebird.js").wait();
		$LAB.script(vmd.virtualPath + "/chart/js/load/html2canvas.js").wait();
		$LAB.script(vmd.virtualPath + "/chart/js/load/downloadify.js").wait();
		$LAB.script(vmd.virtualPath + "/chart/js/load/canvg.js").wait(function() {
			me._copyChartImage(callback)
		});
	},
	_copyChartImage: function(callback) {
		var This = this,
			chart = this.chart,
			chartOptions = this.chart.options;

		if (document.querySelector("#copyImage")) {
			var copyImage = document.querySelector("#copyImage");
			This.getSelect(copyImage)
			document.execCommand('copy');
			if (callback) {
				callback();
			}
		} else {
			chartOptions = chartOptions || this.options;

			var parentChart = chartOptions.chart.parentChart,
				canvas = document.createElement("canvas"),
				scale = 2;
			var w = chartOptions.chart.width || chart.renderTo.style.width,
				h = chartOptions.chart.height || chart.renderTo.style.height;
			canvas.width = parseInt(w) * scale;
			canvas.height = parseInt(h) * scale;
			canvas.getContext("2d").scale(scale, scale);

			var opts = {
				scale: scale,
				canvas: canvas,
				logging: false,
				width: parseInt(w),
				height: parseInt(h)
			};

			var fillContent = document.createElement('div');
			fillContent.style.position = 'absolute';
			fillContent.style.top = "-99999px";

			var copyImage = document.createElement("p");
			// copyImage.style.width = w;
			// copyImage.style.height = h;
			copyImage.style.position = 'absolute';
			copyImage.style.top = "-99999px";
			copyImage.id = 'copyImage';
			document.body.appendChild(copyImage);

			if (parentChart) {
				for (var i = 0; i < parentChart.charts.length; i++) {
					fillContent.innerHTML += "<div class='export-svg-html' style='position: relative;'>" + parentChart.charts[i].container
						.innerHTML + "</div>";
				}
			} else {
				fillContent.innerHTML = "<div class='export-svg-html' style='position: relative;'>" + chart.container.innerHTML +
					"</div>";
			}
			// var spans = $(fillContent).find('span');

			// spans.css({
			// 	"transform": "rotate(0)",
			// })

			var nodesToRecover = [];
			var nodesToRemove = [];

			var svgElem = $(fillContent).find('svg'); //divReport为需要截取成图片的dom的id

			svgElem.each(function(index, node) {
				var parentNode = node.parentNode;
				var svg = node.outerHTML.trim();

				var canvas = document.createElement('canvas');
				canvg(canvas, svg);
				if (node.style.position) {
					canvas.style.position += node.style.position;
					canvas.style.left += node.style.left;
					canvas.style.top += node.style.top;
				}

				nodesToRecover.push({
					parent: parentNode,
					child: node
				});
				parentNode.removeChild(node);

				nodesToRemove.push({
					parent: parentNode,
					child: canvas
				});

				parentNode.appendChild(canvas);
			});
			document.body.appendChild(fillContent);
			html2canvas(fillContent, opts).then(function(canvas) {
				var imgUrl = canvas.toDataURL("image/jpeg");
				copyImage.innerHTML = imgUrl;
				This.getSelect(copyImage)
				document.execCommand('copy');
				if (callback) {
					callback();
				}
			})
		}
	},
	getSelect: function(targetNode) {
		if (window.getSelection) {
			//chrome等主流浏览器
			var selection = window.getSelection();
			var range = document.createRange();
			range.selectNode(targetNode);
			selection.removeAllRanges();
			selection.addRange(range);
		} else if (document.body.createTextRange) {
			//ie
			var range = document.body.createTextRange();
			range.moveToElementText(targetNode);
			range.select();
		}
	},
	// 导出图片
	exportChartImage: function() {
		var me = this,
			chart = this.chart;
		if (!ContainsJS("html2canvas.js")) {
			$LAB.script(vmd.virtualPath + "/chart/js/load/bluebird.js").wait();
			$LAB.script(vmd.virtualPath + "/chart/js/load/html2canvas.js").wait();
			$LAB.script(vmd.virtualPath + "/chart/js/load/downloadify.js").wait();
			$LAB.script(vmd.virtualPath + "/chart/js/load/canvg.js").wait(function() {
				if (!me.dhxSaveImageSetWindow) {
					me.initSaveImageSetWindow();
				} else {
					chart.dhxSaveImageSetWindow.bringToTop();
					if (chart.dhxSaveImageSetWindow.isHidden()) {
						//chart.dhxSaveImageSetWindow.setPosition(e.clientX, e.clientY);
						chart.dhxSaveImageSetWindow.show();
					}
				}
			});
		} else {
			if (!chart.dhxSaveImageSetWindow) {
				me.initSaveImageSetWindow();
			} else {
				chart.dhxSaveImageSetWindow.bringToTop();
				if (chart.dhxSaveImageSetWindow.isHidden()) {
					//chart.dhxSaveImageSetWindow.setPosition(e.clientX, e.clientY);
					chart.dhxSaveImageSetWindow.show();
				}
			}
		}
	},
	initSaveImageSetWindow: function() {
		var me = this,
			chart = this.chart,
			parentChart = chart.options.chart.parentChart,
			dhxWindow = chart.dhxWindow,
			dhxSaveImageSetWindow = chart.dhxSaveImageSetWindow,
			dhxSaveImageForm = chart.dhxSaveImageForm;
		// 生成导出图片对话框
		if (!dhxWindow) {
			chart.dhxWindow = dhxWindow = new dhtmlXWindows();
			dhxWindow.vp.style.overflow = "auto";
		}
		if (!dhxSaveImageSetWindow) {
			var windowWidth = 350,
				windowHeight = 280,
				buttonOffsetLeft = 132;
			if (dhx.version == "5.0.8") {
				windowWidth = 350;
				windowHeight = 280;
				buttonOffsetLeft = 132;
			} else {
				windowWidth = 360;
				windowHeight = 280;
				buttonOffsetLeft = 132;
			}
			chart.dhxSaveImageSetWindow = dhxSaveImageSetWindow = dhxWindow.createWindow({
				id: "saveImageSetWindow",
				width: windowWidth,
				height: windowHeight,
				center: true
			});
			dhxSaveImageSetWindow.centerOnScreen();
			dhxSaveImageSetWindow.setText(unescape("%u4FDD%u5B58%u56FE%u7247"));
			dhxSaveImageSetWindow.denyResize();
			dhxSaveImageSetWindow.attachEvent("onClose", function(win) {
				win.hide();
			});
			dhxSaveImageSetWindow.attachEvent("onShow", function(win) {
				me.initFormComponent(chart, dhxSaveImageForm);
			});

			dhxSaveImageForm = chart.dhxSaveImageForm = dhxSaveImageSetWindow.attachForm([

				{
					type: "block",
					width: 330,
					blockOffset: 5,
					offsetTop: 10,
					list: [

						{
							type: "fieldset",
							label: unescape("%u5927%u5C0F"),
							width: 288,
							offsetLeft: 10,
							offsetTop: 2,
							list: [{
									type: "block",
									width: 260,
									blockOffset: 0,
									list: [{
											type: "input",
											name: "width",
											labelWidth: 36,
											labelHeight: 18,
											width: 80,
											offsetLeft: 0,
											offsetTop: 5,
											position: "label-left",
											label: unescape("%u5BBD%u5EA6%3A"),
											value: "1"
										},
										{
											type: "newcolumn"
										},
										{
											type: "label",
											label: unescape("%u50CF%u7D20")
										}
									]
								},
								{
									type: "block",
									width: 260,
									blockOffset: 0,
									list: [{
											type: "input",
											name: "height",
											labelWidth: 36,
											labelHeight: 18,
											width: 80,
											offsetLeft: 0,
											offsetTop: 5,
											position: "label-left",
											label: unescape("%u9AD8%u5EA6%3A"),
											value: "1"
										},
										{
											type: "newcolumn"
										},
										{
											type: "label",
											label: unescape("%u50CF%u7D20")
										},
										{
											type: "newcolumn"
										},
										{
											type: "checkbox",
											position: "label-right",
											name: "keep_ratio",
											width: 50,
											offsetLeft: 5,
											offsetTop: 5,
											labelHeight: 20,
											labelWidth: 60,
											label: unescape("%u4FDD%u6301%u539F%u6BD4%u4F8B")
										}
									]
								}
							]
						}
					]
				},
				{
					type: "block",
					width: 345,
					blockOffset: 20,
					offsetTop: 10,
					list: [{
							type: "input",
							name: "name",
							labelWidth: 60,
							labelHeight: 18,
							width: 80,
							offsetLeft: 0,
							position: "label-left",
							label: unescape("%u56FE%u7247%u540D%u79F0%3A"),
							value: "chart"
						},
						{
							type: "newcolumn"
						},
						{
							type: "combo",
							position: "label-left",
							name: "format",
							offsetLeft: 5,
							label: unescape("%u5BFC%u51FA%u683C%u5F0F%3A"),
							inputHeight: 50,
							inputWidth: 80,
							options: [{
									value: "png",
									text: "PNG",
									selected: true
								},
								{
									value: "jpeg",
									text: "JPG"
								},
								{
									value: "pdf",
									text: "PDF"
								}
							]
						}
					]
				},
				{
					type: "block",
					offsetLeft: buttonOffsetLeft,
					list: [{
							type: "button",
							width: 60,
							name: "confirm",
							value: unescape("%u786E%u5B9A"),
							offsetTop: 10,
							offsetLeft: 10
						},
						{
							type: "newcolumn"
						},
						{
							type: "button",
							width: 60,
							name: "cancel",
							value: unescape("%u53D6%u6D88"),
							offsetTop: 10,
							offsetLeft: 10
						}
					]
				}
			]);

			me.initFormComponent(chart, dhxSaveImageForm);

			dhxSaveImageForm.attachEvent("onChange", function(name, value) {
				var exportOptions = chart.options.exporting || {},
					widthInput = dhxSaveImageForm.getInput("width"),
					heightInput = dhxSaveImageForm.getInput("height");
				switch (name) {
					case "keep_ratio":
						exportOptions.keepRatio = dhxSaveImageForm.isItemChecked("keep_ratio");
						var oldHeightValue = heightInput.value;
						if (exportOptions.keepRatio) {
							heightInput.value = parseInt(widthInput.value / exportOptions.ratio);
						} else {
							heightInput.value = exportOptions.histotyExportHeight;
						}
						break;
					case "width":
						if (dhxSaveImageForm.isItemChecked("keep_ratio")) {
							heightInput.value = parseInt(widthInput.value / exportOptions.ratio);
						}
						break;
					case "height":
						if (dhxSaveImageForm.isItemChecked("keep_ratio")) {
							widthInput.value = parseInt(heightInput.value * exportOptions.ratio);
						}
						break;
				}
			});

			dhxSaveImageForm.attachEvent("onInputChange", function(name, value) {
				var exportOptions = chart.options.exporting || {},
					widthInput = dhxSaveImageForm.getInput("width"),
					heightInput = dhxSaveImageForm.getInput("height");
				switch (name) {
					case "width":
						if (dhxSaveImageForm.isItemChecked("keep_ratio")) {
							heightInput.value = parseInt(value / exportOptions.ratio);
						}
						break;
					case "height":
						if (dhxSaveImageForm.isItemChecked("keep_ratio")) {
							widthInput.value = parseInt(value * exportOptions.ratio);
						}
						break;
				}
			});

			dhxSaveImageForm.attachEvent("onButtonClick", function(name) {
				if (name == "cancel") {
					dhxSaveImageSetWindow.hide();
				}
			});
			// ie浏览器下处理 
			if (isIE()) {
				var widthInputValue = dhxSaveImageForm.getInput("width").value,
					heightInputValue = dhxSaveImageForm.getInput("height").value,
					isKeepRatio = dhxSaveImageForm.isItemChecked("keep_ratio"),
					nameInputValue = dhxSaveImageForm.getInput("name").value,
					formatCombo = dhxSaveImageForm.getCombo("format"),
					formatValue = formatCombo.getSelectedValue();

				var options = {
					width: widthInputValue,
					height: heightInputValue,
					type: formatValue,
					filename: nameInputValue
				};

				var chartOptions = merge(chart.options, chart.options.userExportOptions)

				var parentChart = chartOptions.chart.parentChart,
					canvas = document.createElement("canvas"),
					scale = 2;
				// 创建cavans对象
				canvas.width = options.width * scale;
				canvas.height = options.height * scale;
				canvas.getContext("2d").scale(scale, scale);

				var opts = {
					scale: scale,
					canvas: canvas,
					logging: false,
					width: parseInt(options.width),
					height: parseInt(options.height)
				};

				var fillContent = document.createElement('div');
				fillContent.style.position = 'absolute';
				fillContent.style.top = "-99999px";

				if (parentChart) {
					for (var i = 0; i < parentChart.charts.length; i++) {
						fillContent.innerHTML += "<div class='export-svg-html' style='position: relative;'>" + parentChart.charts[i].container
							.innerHTML + "</div>";
					}
				} else {
					fillContent.innerHTML = "<div class='export-svg-html' style='position: relative;'>" + chart.container.innerHTML +
						"</div>";
				}


				var nodesToRecover = [];
				var nodesToRemove = [];

				var svgElem = $(fillContent).find('svg'); //divReport为需要截取成图片的dom的id

				svgElem.each(function(index, node) {
					var parentNode = node.parentNode;
					var svg = node.outerHTML.trim();

					var canvas = document.createElement('canvas');
					canvg(canvas, svg); // svg转canvas
					if (node.style.position) {
						canvas.style.position += node.style.position;
						canvas.style.left += node.style.left;
						canvas.style.top += node.style.top;
					}

					nodesToRecover.push({
						parent: parentNode,
						child: node
					});
					parentNode.removeChild(node);

					nodesToRemove.push({
						parent: parentNode,
						child: canvas
					});
					parentNode.appendChild(canvas);
				});

				console.log(fillContent)
				document.body.appendChild(fillContent);

				html2canvas(fillContent, opts).then(function(canvas) {
					var imgUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
					var item = $(".dhxform_btn")[$(".dhxform_btn").length - 2];
					item.style.height = '30px'
					Downloadify.create(item, {
						filename: function() {
							return dhxSaveImageForm.getInput("name").value + '.' + formatCombo.getSelectedValue();
						},
						data: function() {
							return imgUrl.split('base64,')[1]
						},
						onComplete: function() {
							dhxSaveImageSetWindow.hide();
						},
						onCancel: function() {
							dhxSaveImageSetWindow.hide();
						},
						onError: function() {
							alert('图片下载失败，请刷新后重试')
							dhxSaveImageSetWindow.hide();
						},
						swf: vmd.virtualPath + '/chart/js/load/media/downloadify.swf',
						downloadImage: vmd.virtualPath + '/chart/js/load/images/dload.png',
						width: 70,
						height: 30,
						dataType: "base64",
						transparent: true,
						append: false
					});
				})
			} else {
				dhxSaveImageForm.attachEvent("onButtonClick", function(name) {
					if (name == "confirm") {
						var widthInputValue = dhxSaveImageForm.getInput("width").value,
							heightInputValue = dhxSaveImageForm.getInput("height").value,
							isKeepRatio = dhxSaveImageForm.isItemChecked("keep_ratio"),
							nameInputValue = dhxSaveImageForm.getInput("name").value,
							formatCombo = dhxSaveImageForm.getCombo("format"),
							formatValue = formatCombo.getSelectedValue();

						var exportOptions = {
							width: widthInputValue,
							height: heightInputValue,
							type: formatValue,
							filename: nameInputValue
						};
						me._exportChart(exportOptions, chart.options);
						exportOptions.histotyExportHeight = parseInt(heightInputValue);
						dhxSaveImageSetWindow.hide();
					}
				});
			}
		}
	},
	// 初始化图片导出窗口
	initFormComponent: function(chart, dhxSaveImageForm) {
		var exportOptions = chart.options.exporting || {},
			isKeepRatio,
			parentChart = chart.options.chart.parentChart,
			widthInput = dhxSaveImageForm.getInput("width"),
			heightInput = dhxSaveImageForm.getInput("height"),
			nameInput = dhxSaveImageForm.getInput("name"),
			formatCombo = dhxSaveImageForm.getCombo("format");

		var cssWidth = chart.chartWidth || chart.renderTo.style.width,
			cssHeight = chart.chartHeight || chart.renderTo.style.height,
			sourceWidth = exportOptions.sourceWidth || chart.options.chart.width ||
			(parseFloat(cssWidth)) || chart.renderTo.clientWidth || 600, //没有显式设置div的width时(设置了min-width)获取clientWidth的值

			sourceHeight = exportOptions.sourceHeight || chart.options.chart.height ||
			(parseFloat(cssHeight)) || chart.renderTo.clientHeight || 400; //没有显式设置div的height时(设置了min-width)获取clientHeight的值

		if (exportOptions.height) {
			isKeepRatio = false;
		} else {
			isKeepRatio = exportOptions.keepRatio === false ? false : true
		}
		if (parentChart) {
			widthInput.value = parentChart.chartWidth;
			heightInput.value = parentChart.chartHeight;
			exportOptions.ratio = parentChart.chartWidth / parentChart.chartHeight;
			dhxSaveImageForm.disableItem("keep_ratio");
		} else {
			exportOptions.ratio = sourceWidth / sourceHeight;
			widthInput.value = exportOptions.width || sourceWidth;
			heightInput.value = exportOptions.height || sourceHeight;
		}

		dhxSaveImageForm.setItemValue("keep_ratio", isKeepRatio);
		if (!isIE()) {
			nameInput.value = exportOptions.filename || (chart.options.title && chart.options.title.text) || 'chart';
		}
		exportOptions.histotyExportHeight = heightInput.value;
	},
	_exportChart: function(options, chartOptions) {

		options = options || {};
		chartOptions = chartOptions || this.options;

		var chart = this.chart,
			parentChart = chartOptions.chart.parentChart,
			canvas = document.createElement("canvas"),
			scale = 2;

		canvas.width = options.width * scale;
		canvas.height = options.height * scale;
		canvas.getContext("2d").scale(scale, scale);

		var opts = {
			scale: scale,
			canvas: canvas,
			logging: false,
			width: parseInt(options.width),
			height: parseInt(options.height)
		};

		var fillContent = document.createElement('div');
		fillContent.style.position = 'absolute';
		fillContent.style.top = "-99999px";

		if (parentChart) {
			for (var i = 0; i < parentChart.charts.length; i++) {
				fillContent.innerHTML += "<div class='export-svg-html' style='position: relative;'>" + parentChart.charts[i].container
					.innerHTML + "</div>";
			}
		} else {
			fillContent.innerHTML = "<div class='export-svg-html' style='position: relative;'>" + chart.container.innerHTML +
				"</div>";
		}
		// var spans = $(fillContent).find('span');

		// spans.css({
		// 	"transform": "rotate(0)",
		// })

		var nodesToRecover = [];
		var nodesToRemove = [];

		var svgElem = $(fillContent).find('svg'); //divReport为需要截取成图片的dom的id

		svgElem.each(function(index, node) {
			var parentNode = node.parentNode;
			var svg = node.outerHTML.trim();

			var canvas = document.createElement('canvas');
			canvg(canvas, svg);
			if (node.style.position) {
				canvas.style.position += node.style.position;
				canvas.style.left += node.style.left;
				canvas.style.top += node.style.top;
			}

			nodesToRecover.push({
				parent: parentNode,
				child: node
			});
			parentNode.removeChild(node);

			nodesToRemove.push({
				parent: parentNode,
				child: canvas
			});

			parentNode.appendChild(canvas);
		});

		document.body.appendChild(fillContent);

		html2canvas(fillContent, opts).then(function(canvas) {
			var imgUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
			var save_link = document.createElement('a')
			save_link.setAttribute("id", "downloadify");
			save_link.href = imgUrl;
			save_link.download = options.filename + '.' + options.type;
			var event = document.createEvent('MouseEvents');
			event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			save_link.dispatchEvent(event);
			//document.body.removeChild(save_link);
			document.body.removeChild(fillContent);
		})
	},
	// sortRule_v:function (a,b) {
	// 	return parseFloat(a.userOptions.oriSet) - parseFloat(b.userOptions.oriSet);
	// },
	sortRule_h: function(a, b) {
		return parseFloat(a.userOptions.oriSet) - parseFloat(b.userOptions.oriSet);
	},
	getlinkforyAxis: function(callback) {
		// Y轴在排列方向上的关联关系
		var me = this,
			chart = this.chart,
			allyAxis = chart.yAxis;
		if (allyAxis.length > 1) {
			var yAxisObj = {};
			for (var i = 0; i < allyAxis.length; i++) {
				// 根据top值把y轴分组
				if(!allyAxis[i].userOptions.top){
					allyAxis[i].userOptions.top = '0.0001%';
				}
				allyAxis[i].userOptions.oriTop = allyAxis[i].userOptions.top || '0.0001%';
				allyAxis[i].userOptions.oriSet = allyAxis[i].userOptions.offset;
				if (allyAxis[i].userOptions.id != 'navigator-y-axis') {
					if (!yAxisObj[allyAxis[i].userOptions.top]) {
						yAxisObj[allyAxis[i].userOptions.top] = [];
						yAxisObj[allyAxis[i].userOptions.top].push(allyAxis[i])
					} else {
						yAxisObj[allyAxis[i].userOptions.top].push(allyAxis[i])
					}
				}
			}
			// 每组按照偏移值排序
			for (var j in yAxisObj) {
				yAxisObj[j].sort(me.sortRule_h);
				if (yAxisObj[j].length > 1) {
					var arr = [];
					for (var i = 0; i < yAxisObj[j].length; i++) {
						arr.push(yAxisObj[j][i].userOptions.offset);
					}
					for (var i = 0; i < yAxisObj[j].length; i++) {
						yAxisObj[j][i].userOptions.offsetArr = arr;
					}
				}
			}
			chart.yAxisObj = yAxisObj
		}
		if (callback) {
			callback(chart.yAxisObj);
		}
	},
	setFittingMinValue: function(value) {
		var This = this;
		var type = This.tplJSON.xAxis[0].type;
		if (type == "datetime") {
			value = This.date_getMillisecond(value)
		} else {
			value = parseFloat(value)
		}
		This.tplJSON.fittingMinValue = value;
		if (This.chart) {
			This.chart.userOptions.fittingMinValue = value;
		}
	},
	setHasFittingWin:function(bool){
		var This = this;
		This.tplJSON.hasFittingWin = bool;
		if (This.chart) {
			This.chart.userOptions.hasFittingWin = bool;
		}
	},
	setForStarFromEnd:function(bool){
		var This = this;
		This.tplJSON.forFromEndPiont = bool;
		if (This.chart) {
			This.chart.userOptions.forFromEndPiont = bool;
		}
	}

})

Object.defineProperty(SVGElement.prototype, 'outerHTML', {
	get: function() {
		var $node, $temp;
		$temp = document.createElement('div');
		$node = this.cloneNode(true);
		$temp.appendChild($node);
		return $temp.innerHTML;
	},
	enumerable: false,
	configurable: true
});



/******************************************************************
 ** 描 述:曲线顶部工具条组件构建
 ******************************************************************/

// 运行模式下
Ext.define("vmd.comp.ChartToolBar", {
	extend: "Ext.BoxComponent",
	xtype: 'vmd.ctoolbar',
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
		if (!me.jsonPath) {
			me.jsonPath = vmd.virtualPath + "/chart/libs/toolbar/button.json"
		}
		//vmd.comp.Grid.superclass.initComponent.call(this);
		me.addEvents(
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

	},

	onRender: function(ct, position) {
		var me = this;
		if (!me.el) {
			me.autoEl = {
				cls: 'vmd-chart',
				cn: [{
					cls: 'vmd-chart-grid'
				}]
			}
		}
		me.callParent(arguments);

		// 20190104  顶部工具条容器
		me.tbContainer = this.el.first().dom;
		//console.log(me.tbContainer)

		me.tbContainer.style.height = "36px";
		me.tbContainer.style.paddingLeft = "20px";

		ToolBarPlan = new dhtmlXToolbarObject({
			parent: me.tbContainer,
			icons_path: me.imgPath,
			json: me.jsonPath,
		});

		//console.log(me)


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
		if (me.chart) {
			// 根据id 获取对象
			var cmp = Ext.getCmp(me.chart).chart;
			this.addToolBarEvent(cmp);
		} else {
			if (!chart) {
				Ext.Msg.alert("提示", "工具栏未绑定曲线对象");
				return
			}
		}
	},

	addToolBarEvent: function(chart) {
		var me = this,
			chartParent,
			isFire = true;
		if (me.toolBarEvId) {
			ToolBarPlan.detachEvent(me.toolBarEvId);
		}
		me.toolBarEvId = ToolBarPlan.attachEvent("onClick", function(id) {
			if (!chart) {
				chart = Ext.getCmp(me.chart).chart;
			}
			if (!chart.myChart) {
				chart.myChart = {
					series: null,
					title: null,
					axise: null
				};
			}
			chartParent = chart.parentObject || chart.container;
			switch (id) {
				case "copyChart":
					isFire = me.fireEvent('toolBarClick', me, chart, id);
					if (isFire) {
						if (chart.seleBorder) {
							chart.seleBorder.attr({
								visibility: 'hidden',
							})
						}
						if (!ContainsJS("html2canvas.js")) {
							$LAB.script(vmd.virtualPath + "/chart/js/load/bluebird.js").wait();
							$LAB.script(vmd.virtualPath + "/chart/js/load/html2canvas.js").wait();
							$LAB.script(vmd.virtualPath + "/chart/js/load/downloadify.js").wait();
							$LAB.script(vmd.virtualPath + "/chart/js/load/canvg.js").wait(function() {
								chart.copyChartImage();
							});
						} else {
							chart.copyChartImage();
						}
					}
					break;
				case "saveChart":
					isFire = me.fireEvent('toolBarClick', me, chart, id);
					if (isFire) {
						if (chart.seleBorder) {
							chart.seleBorder.attr({
								visibility: 'hidden',
							})
						}
						if (!ContainsJS("html2canvas.js")) {
							$LAB.script(vmd.virtualPath + "/chart/js/load/bluebird.js").wait();
							$LAB.script(vmd.virtualPath + "/chart/js/load/html2canvas.js").wait();
							$LAB.script(vmd.virtualPath + "/chart/js/load/downloadify.js").wait();
							$LAB.script(vmd.virtualPath + "/chart/js/load/canvg.js").wait(function() {
								chart.exportChartImage();
							});
						} else {
							chart.exportChartImage();;
						}
					}
					break;
				case "printChart":
					isFire = me.fireEvent('toolBarClick', me, chart, id);
					if (isFire) {
						if (chart.seleBorder) {
							chart.seleBorder.attr({
								visibility: 'hidden',
							})
						}
						if (!ContainsJS("jQuery.print.js")) {
							$LAB.script(vmd.virtualPath + "/chart/libs/jquery/jQuery.print.js").wait(function() {
								chart.chartPrint();
							});
						}
					}
					break;
				case "addFontSize":
					isFire = me.fireEvent('toolBarClick', me, chart, id);
					if (isFire) {
						var type = null,
							obj = null;
						for (var attr in chart.myChart) {
							if (chart.myChart[attr]) {
								type = attr;
								obj = chart.myChart[attr]
							}
						}
						chart.setFontSize(true, type, obj);
					}
					break;
				case "delFontSize":
					isFire = me.fireEvent('toolBarClick', me, chart, id);
					if (isFire) {
						var type = null,
							obj = null;
						for (var attr in chart.myChart) {
							if (chart.myChart[attr]) {
								type = attr;
								obj = chart.myChart[attr]
							}
						}
						chart.setFontSize(false, type, obj);
					}
					break;
				case "addLine":
					isFire = me.fireEvent('toolBarClick', me, chart, id);
					if (isFire) {
						var type = null,
							obj = null;
						for (var attr in chart.myChart) {
							if (chart.myChart[attr]) {
								type = attr;
								obj = chart.myChart[attr]
							}
						}
						chart.setLineWidth(true, type, obj);
					}
					break;
				case "delLine":
					isFire = me.fireEvent('toolBarClick', me, chart, id);
					if (isFire) {
						var type = null,
							obj = null;
						for (var attr in chart.myChart) {
							if (chart.myChart[attr]) {
								type = attr;
								obj = chart.myChart[attr]
							}
						}
						chart.setLineWidth(false, type, obj);
					}
					break;
				case "lableShow":
					isFire = me.fireEvent('toolBarClick', me, chart, id);
					if (isFire) {
						chart.setlablesIsShow(chart.myChart.series);
					}
					break;
				case "delPoint": // 抽稀
					isFire = me.fireEvent('toolBarClick', me, chart, id);
					if (isFire) {
						var obj = null;
						if (chart.myChart.series) {
							obj = chart.myChart.series;
						}
						chart.ChangeStep(true, obj);
					}
					break;
				case "passPoint": // 加密
					isFire = me.fireEvent('toolBarClick', me, chart, id);
					if (isFire) {
						var obj = null;
						if (chart.myChart.series) {
							obj = chart.myChart.series;
						}
						chart.ChangeStep(false, obj);
					}
					break;
				case "delDecimals": // 减小小数位数
					isFire = me.fireEvent('toolBarClick', me, chart, id);
					if (isFire) {
						var obj = null;
						if (chart.myChart.series) {
							obj = chart.myChart.series;
						}
						chart.ChangeDecimals(false, obj);
					}
					break;
				case "addDecimals": // 增加小数位数
					isFire = me.fireEvent('toolBarClick', me, chart, id);
					if (isFire) {
						var obj = null;
						if (chart.myChart.series) {
							obj = chart.myChart.series;
						}
						chart.ChangeDecimals(true, obj);
					}
					break;
				case "delPadding":
					isFire = me.fireEvent('toolBarClick', me, chart, id);
					if (isFire) {
						var obj = null;
						if (chart.myChart.axise) {
							obj = chart.myChart.axise;
						}
						chart.ChangePadding(false, obj);
					}
					break;
				case "addPadding":
					isFire = me.fireEvent('toolBarClick', me, chart, id);
					if (isFire) {
						if (chart.myChart.axise) {
							obj = chart.myChart.axise;
						}
						chart.ChangePadding(true, obj);
					}
					break;
				case "line":
					isFire = me.fireEvent('toolBarClick', me, chart, id);
					if (isFire) {
						var obj = null;
						if (chart.myChart.series) {
							obj = chart.myChart.series;
						}
						chart.setChartType("line", obj);
					}
					break;
				case "area":
					isFire = me.fireEvent('toolBarClick', me, chart, id);
					if (isFire) {
						var obj = null;
						if (chart.myChart.series) {
							obj = chart.myChart.series;
						}
						chart.setChartType("area", obj);
					}
					break;
				case "column":
					isFire = me.fireEvent('toolBarClick', me, chart, id);
					if (isFire) {
						var obj = null;
						if (chart.myChart.series) {
							obj = chart.myChart.series;
						}
						chart.setChartType("column", obj);
					}
					break;
				case "pie":
					isFire = me.fireEvent('toolBarClick', me, chart, id);
					if (isFire) {
						var obj = null;
						if (chart.myChart.series) {
							obj = chart.myChart.series;
						}
						chart.setChartType("pie", obj);
					}
					break;
				case "scatter":
					isFire = me.fireEvent('toolBarClick', me, chart, id);
					if (isFire) {
						var obj = null;
						if (chart.myChart.series) {
							obj = chart.myChart.series;
						}
						chart.setChartType("scatter", obj);
					}
					break;
				case "exportChartData":
					isFire = me.fireEvent('toolBarClick',me,chart,id);
					if(isFire){
						chart.chartDataViev();
					}
					break;
				case "colseBar":
					isFire = me.fireEvent('toolBarClick', me, chart, id);
					if (isFire) {
						chart.seleBorder.attr({
							visibility: 'hidden'
						})
						ToolBarPlan = null;
					}
					break;
				case "saveTemplate":
					isFire = me.fireEvent('toolBarClick', me, chart, id);
					if (isFire) {
						if (chart.seleBorder) {
							chart.seleBorder.attr({
								visibility: 'hidden',
							})
						}
						var tpJson = JSON.stringify(chart.saveTemplate());
						if (!ContainsJS("html2canvas.js")) {
							$LAB.script(vmd.virtualPath + "/chart/js/load/bluebird.js").wait();
							$LAB.script(vmd.virtualPath + "/chart/js/load/html2canvas.js").wait();
							$LAB.script(vmd.virtualPath + "/chart/js/load/downloadify.js").wait();
							$LAB.script(vmd.virtualPath + "/chart/js/load/canvg.js").wait(function() {
								chart.getChartImage(function(imgUrl) {
									var params = {
										tpJson: tpJson,
										imgUrl: imgUrl
									}
									chartParent.fireEvent('saveTemplate', chart, params);
								});
							});
						} else {
							chart.getChartImage(function(imgUrl) {
								var params = {
									tpJson: tpJson,
									imgUrl: imgUrl
								}
								chartParent.fireEvent('saveTemplate', chart, params);
							});
						}
					}
					break;
				case "loadTemplate":
					isFire = me.fireEvent('toolBarClick', me, chart, id);
					if (isFire) {
						chartParent.fireEvent('loadTemplate', chartParent, chart.parentObject.userTemplateUrl);
					}
					break;
				case "zoomOut":
					isFire = me.fireEvent('toolBarClick',me,chart,id);
					if(isFire){
						chart.zoomOut();
					}
					break;
				default:
					isFire = me.fireEvent('toolBarClick', me, chart, id);
					break;
			}
		});
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
