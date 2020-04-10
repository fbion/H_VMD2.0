/**
 * 顶部工具条
 * 20190819
 */

(function(H) {
	vmd.tip('请重新拖拽工具条组件',"info",1000);
	var path = CreateJSPath("hwAPI.js", -2),
		addEvent = H.addEvent,
		removeEvent = H.removeEvent,
		each = H.each,
		merge = H.merge,
		Chart = H.Chart,
		Pointer = H.Pointer,
		Axis = H.Axis,
		Series = H.Series;


	var tbContainer = null,
		firstNode = null,
		ToolBarPlan = null,
		toolBarEvId;

	var allChart = [];

	H.wrap(H.Chart.prototype, 'init', function (proceed) {
		proceed.apply(this, Array.prototype.slice.call(arguments, 1));
		var chart = this;
		var chartParent = chart.parentObject || chart.container;
		var chartId = chartParent.id;
		if(!chart.myChart){
			chart.myChart = {
				series: null,
				title: null,
				axise: null
			};
		}
		if (allChart.length == 0) {
			allChart.push(chart)
		} else {
			for (var i = 0; i < allChart.length; i++) {
				if (allChart[i].chartParent&&allChart[i].chartParent.id != chartId) {
					allChart.push(chart)
				}
			}
		}
		if (!chart.seleBorder) {
			chart.selectElement();
		}
		if (!ToolBarPlan) {
			if (chart.userOptions.toolbarConfig) {
				imgPath = path + chart.userOptions.toolbarConfig.imgUrl;
				jsonPath = path + chart.userOptions.toolbarConfig.jsonUrl;
			} else {
				imgPath = path + "/chart/libs/toolbar/imgs/";
				jsonPath = path + "/chart/libs/toolbar/button.json"
			}
			createToolBar(imgPath, jsonPath)
		}
		addToolBarEvent(chart)
		chart.addAxisClick();
		chart.addSeriesClickOn();
	})

	H.wrap(Pointer.prototype, 'onContainerMouseDown', function(proceed, e) {
		proceed.apply(this, Array.prototype.slice.call(arguments, 1));
		var chart = this.chart;
		addToolBarEvent(chart, e)
		chart.addAxisClick();
		chart.addSeriesClickOn();
	});
	if(!ContainsJS("property-interact.src.js")){
		//添加序列中标记、数值标注间隔，数值标注小数位
		H.wrap(Series.prototype, 'render', function(proceed) {
			proceed.call(this);
			var series = this,
				chart = this.chart,
				markerOptions = series.options.marker,
				markerPixelSpace = (markerOptions && markerOptions.pixelSpace) || 0,
				markerStep = (markerOptions && markerOptions.step) || 1,
				dataLabelsOptions = series.options.dataLabels,
				dataLabelStep = (dataLabelsOptions && dataLabelsOptions.step) || 1,
				dataLabelDecimal = (dataLabelsOptions && dataLabelsOptions.decimals),
				dataLabelPixelSpace = (dataLabelsOptions && dataLabelsOptions.pixelSpace) || 0,
				points = series.points;

			if (markerPixelSpace || markerStep || dataLabelStep || dataLabelPixelSpace) {
				if (markerPixelSpace) {
					markerStep = math.round(markerPixelSpace * points.length / chart.chartWidth) + 1;
				}

				if (dataLabelPixelSpace) {
					dataLabelStep = math.round(dataLabelPixelSpace * points.length / chart.chartWidth) + 1;
				}

				each(points, function(point, i) {
					if (point.graphic) {
						if (point.clientX < 0 || point.clientX > point.series.chart.plotWidth) {
							var visibility = "hidden";
						} else {
							var visibility = i % markerStep != 0 ? "hidden" : "inherit";
						}
						point.graphic.attr({
							visibility: visibility
						});
					}

					if (point.dataLabel) {
						var visibility = i % dataLabelStep != 0 ? "hidden" : "inherit";
						if (point.y !== null && point.y !== undefined) {
							if (isNaN(parseFloat(dataLabelDecimal))) {
								var disLabel = parseFloat(point.y);
							} else {
								var disLabel = parseFloat(point.y).toFixed(dataLabelDecimal);
							}
							var textStr = point.dataLabel.text.textStr.replace(' ',''),
								num = parseFloat(textStr).toString().length,
								endStr = '';
							if (num < textStr.length) {
								var endStr = textStr.substring(num, textStr.length)
							}
							point.dataLabel.attr({
								text: disLabel.toString() + endStr
							});
						}
						point.dataLabel.attr({
							visibility: visibility
						});
					}
				})
			}
			if(!series.isSeriesClick){
				chart.addSeriesClickOn();
			}
		});
	}
	// 图表点事件
	Chart.prototype.addChartClick = function() {
		var chart = this;
		if (!chart.chartBackground) {
			chart.chartBackground = renderer.rect()
				.attr({
					x: 0,
					y: 0,
					width: chart.chartWidth,
					height: chart.chartHeight,
					fill: rgba(255, 255, 255, 0)
				})
				.addClass('hwcharts-background')
				.add()
		}
		addEvent(chart.chartBackground.element, 'click', function(e) {
			hideSeleBorder();
			addToolBarEvent(chart, e)
			if (chart.seleBorder) {
				chart.seleBorder.attr({
					visibility: 'visible',
					x: 0,
					y: 0,
					width: chart.chartWidth,
					height: chart.chartHeight
				})
			}
		});
	}
	// 序列添加点击事件监听
	Chart.prototype.addSeriesClickOn = function() {
		var chart = this;
		each(chart.series, function(series) {
			addEvent(series, 'click', function(e) {
				hideSeleBorder();
				addToolBarEvent(chart, e)
				var rect = series.group.element.childNodes[0].getBoundingClientRect();
				// console.log(chart.container.getBoundingClientRect())
				var chartRect = chart.container.getBoundingClientRect();
				chart.seleBorder.attr({
					visibility: 'visible',
					width: parseFloat(rect.width),
					height: parseFloat(rect.height),
					x: parseFloat(rect.x) - parseFloat(chartRect.left),
					y: parseFloat(rect.y) - parseFloat(chartRect.top)
				});
				setObjcAttr('series', chart.myChart, series);
			});
			series.isSeriesClick = true;
		});
		
	}
	// 标题添加点击事件监听
	Chart.prototype.addTitleClick = function() {
		var chart = this;
		if (chart.title) {
			addEvent(chart.title.element, 'click', function(e) {
				hideSeleBorder();
				addToolBarEvent(chart, e)
				var TitleData = chart.title.element.getBBox(null, 0);
				if (chart.seleBorder) {
					chart.seleBorder.attr({
						visibility: 'visible',
						width: parseInt(TitleData.width) + 70,
						height: parseInt(TitleData.height) + 10,
						x: parseInt(TitleData.x) - 35,
						y: parseInt(TitleData.y) - 5
					})
				}
				setObjcAttr('title', chart.myChart, chart.title);
			});
		}
	}
	// 坐标轴添加点击事件监听
	Chart.prototype.addAxisClick = function() {
		var chart = this;
		each(chart.axes, function(axis) {
			var options = axis.options;
			if (!axis.axisGroup) {
				return;
			}
			addEvent(axis.axisGroup.element, 'click', function(e) {
				hideSeleBorder();
				addToolBarEvent(chart, e)
				chart.seleBorder.attr(axis.getBackRect())
					.attr({
						visibility: 'visible',
					});
				setObjcAttr('axise', chart.myChart, axis);
			});
			if (axis.labelGroup) {
				addEvent(axis.labelGroup.element, 'click', function(e) {
					hideSeleBorder();
					addToolBarEvent(chart, e)
					chart.seleBorder.attr(axis.getBackRect())
						.attr({
							visibility: 'visible',
						});
					setObjcAttr('axise', chart.myChart, axis);
				});
			};
		});
	}
	//给图表元素点击选中效果
	Chart.prototype.selectElement = function() {
		var chart = this,
			optionsChart = chart.options.chart,
			renderer = chart.renderer;
		chart.seleBorder = renderer.rect()
			.attr({
				visibility: 'visible',
				stroke: '#666',
				'stroke-width': 1,
				dashstyle: 'dash',
				zIndex: 999
			})
			.attr({
				x: 0,
				y: 0,
				width: chart.chartWidth,
				height: chart.chartHeight
			})
			.add()
		chart.addTitleClick();
		chart.addAxisClick();
		chart.addSeriesClickOn();
		chart.addChartClick();
	};
	// 获取坐标轴范围
	Axis.prototype.getBackRect = function() {
		var axis = this,
			chart = axis.chart,
			options = axis.options,
			opposite = this.opposite,
			offset = this.offset,
			horiz = this.horiz,
			lineLeft = this.left + (opposite ? this.width : 0) + offset,
			lineTop = chart.chartHeight - this.bottom - (opposite ? this.height : 0) + offset,
			vBorderWidth = Math.max(this.axisTitleMargin + ((axis.axisTitle && (axis.axisTitle.getBBox()['width'])) || 0),
				10),
			hBorderHeight = Math.max(this.axisTitleMargin + ((axis.axisTitle && (axis.axisTitle.getBBox()['height'])) || 0),
				10);

		var obj = {
			x: horiz ? this.left : (lineLeft - (opposite ? 0 : vBorderWidth)),
			y: horiz ? (lineTop - (opposite ? hBorderHeight : 0)) : this.top,
			width: horiz ? this.width : vBorderWidth,
			height: horiz ? hBorderHeight : this.height,
		}
		if (isNaN(obj.x) || !obj.x || isNaN(obj.y) || !obj.y || isNaN(obj.width) || !obj.width || isNaN(obj.height) || !obj
			.height) {
			obj = {
				visibility: 'hidden'
			}
		}
		return obj
	};

	// 创建顶部工具条
	function createToolBar(imgPath, jsonPath) {
		tbContainer = document.createElement('div');
		tbContainer.style.width = document.body.clientWidth + "px";
		tbContainer.style.height = "36px";
		tbContainer.style.paddingLeft = "20px";
		tbContainer.style.position = 'fixed';
		tbContainer.style.top = '0px';
		tbContainer.style.zIndex = '9999';
		setNode(document.body.childNodes[0])
		document.body.insertBefore(tbContainer, document.body.childNodes[0]);
		ToolBarPlan = new dhtmlXToolbarObject({
			parent: tbContainer,
			icons_path: imgPath,
			json: jsonPath,
		});
	}
	
	// 顶部工具条加载时处理dom结构的位置
	function setNode(node){
		var nodeStyle = null;
		if(node.currentStyle){
			nodeStyle = node.currentStyle;
		}else{
			nodeStyle = document.defaultView.getComputedStyle(node, null); 
		}
		if(nodeStyle.display == 'none'){
			setNode(node.nextElementSibling);
		}else{
			node.style.marginTop = "38px";
			firstNode = node;
		}
	}
	
	// 工具条添加事件
	function addToolBarEvent(chart, e) {
		if (toolBarEvId) {
			ToolBarPlan.detachEvent(toolBarEvId);
		}
		var chartParent = chart.parentObject || chart.container;
		toolBarEvId = ToolBarPlan.attachEvent("onClick", function(id) {
			if(Object.getOwnPropertyNames(chart).length==0 || !e){
				Ext.Msg.alert("提示", "请选择曲线对象");
				return
			}
			switch (id) {
				case "copyChart":
					isFire = chartParent.fireEvent('toolBarClick', chartParent, chart, id);
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
					isFire = chartParent.fireEvent('toolBarClick', chartParent, chart, id);
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
					isFire = chartParent.fireEvent('toolBarClick', chartParent, chart, id);
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
					isFire = chartParent.fireEvent('toolBarClick', chartParent, chart, id);
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
					isFire = chartParent.fireEvent('toolBarClick', chartParent, chart, id);
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
					isFire = chartParent.fireEvent('toolBarClick', chartParent, chart, id);
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
					isFire = chartParent.fireEvent('toolBarClick', chartParent, chart, id);
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
					isFire = chartParent.fireEvent('toolBarClick', chartParent, chart, id);
					if (isFire) {
						chart.setlablesIsShow(chart.myChart.series);
					}
					break;
				case "delPoint": // 抽稀
					isFire = chartParent.fireEvent('toolBarClick', chartParent, chart, id);
					if (isFire) {
						var obj = null;
						if (chart.myChart.series) {
							obj = chart.myChart.series;
						}
						chart.ChangeStep(true, obj);
					}
					break;
				case "passPoint": // 加密
					isFire = chartParent.fireEvent('toolBarClick', chartParent, chart, id);
					if (isFire) {
						var obj = null;
						if (chart.myChart.series) {
							obj = chart.myChart.series;
						}
						chart.ChangeStep(false, obj);
					}
					break;
				case "delDecimals": // 减小小数位数
					isFire = chartParent.fireEvent('toolBarClick', chartParent, chart, id);
					if (isFire) {
						var obj = null;
						if (chart.myChart.series) {
							obj = chart.myChart.series;
						}
						chart.ChangeDecimals(false, obj);
					}
					break;
				case "addDecimals": // 增加小数位数
					isFire = chartParent.fireEvent('toolBarClick', chartParent, chart, id);
					if (isFire) {
						var obj = null;
						if (chart.myChart.series) {
							obj = chart.myChart.series;
						}
						chart.ChangeDecimals(true, obj);
					}
					break;
				case "delPadding":
					isFire = chartParent.fireEvent('toolBarClick', chartParent, chart, id);
					if (isFire) {
						var obj = null;
						if (chart.myChart.axise) {
							obj = chart.myChart.axise;
						}
						chart.ChangePadding(false, obj);
					}
					break;
				case "addPadding":
					isFire = chartParent.fireEvent('toolBarClick', chartParent, chart, id);
					if (isFire) {
						if (chart.myChart.axise) {
							obj = chart.myChart.axise;
						}
						chart.ChangePadding(true, obj);
					}
					break;
				case "line":
					isFire = chartParent.fireEvent('toolBarClick', chartParent, chart, id);
					if (isFire) {
						var obj = null;
						if (chart.myChart.series) {
							obj = chart.myChart.series;
						}
						chart.setChartType("line", obj);
					}
					break;
				case "area":
					isFire = chartParent.fireEvent('toolBarClick', chartParent, chart, id);
					if (isFire) {
						var obj = null;
						if (chart.myChart.series) {
							obj = chart.myChart.series;
						}
						chart.setChartType("area", obj);
					}
					break;
				case "column":
					isFire = chartParent.fireEvent('toolBarClick', chartParent, chart, id);
					if (isFire) {
						var obj = null;
						if (chart.myChart.series) {
							obj = chart.myChart.series;
						}
						chart.setChartType("column", obj);
					}
					break;
				case "pie":
					isFire = chartParent.fireEvent('toolBarClick', chartParent, chart, id);
					if (isFire) {
						var obj = null;
						if (chart.myChart.series) {
							obj = chart.myChart.series;
						}
						chart.setChartType("pie", obj);
					}
					break;
				case "scatter":
					isFire = chartParent.fireEvent('toolBarClick', chartParent, chart, id);
					if (isFire) {
						var obj = null;
						if (chart.myChart.series) {
							obj = chart.myChart.series;
						}
						chart.setChartType("scatter", obj);
					}
					break;
				case "exportChartData":
					isFire = chartParent.fireEvent('toolBarClick',chartParent,chart,id);
					if(isFire){
						chart.chartDataViev();
					}
					break;
				case "colseBar":
					isFire = chartParent.fireEvent('toolBarClick', chartParent, chart, id);
					if (isFire) {
						chart.seleBorder.attr({
							visibility: 'hidden'
						})
						ToolBarPlan = null;
					}
					break;
				case "saveTemplate":
					isFire = chartParent.fireEvent('toolBarClick', chartParent, chart, id);
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
					isFire = chartParent.fireEvent('toolBarClick', chartParent, chart, id);
					if (isFire) {
						chartParent.fireEvent('loadTemplate', chartParent, chart.parentObject.userTemplateUrl);
					}
					break;
				case "zoomOut":
					isFire = chartParent.fireEvent('toolBarClick',chartParent,chart,id);
					if(isFire){
						chart.zoomOut();
					}
					break;
				default:
					isFire = chartParent.fireEvent('toolBarClick', chartParent, chart, id);
					break;
			}
		});
	}
	// 隐藏页面中所有曲线的选中框
	function hideSeleBorder() {
		for (var i = 0; i < allChart.length; i++) {
			if (allChart[i].seleBorder) {
				allChart[i].seleBorder.attr({
					visibility: 'hidden'
				})
			}
		}
	}
	// 判断js文件是否加载
	function ContainsJS(jsName) {
		var scripts = document.getElementsByTagName("script");
		for (var i = 0, l = scripts.length; i < l; i++) {
			var src = scripts[i].src;
			if (src.indexOf(jsName) != -1) {
				return true;
			}
		}
		return false;
	};

	function isIE() {
		if (!!window.ActiveXObject || "ActiveXObject" in window || navigator.userAgent.indexOf("Edge") > -1) {
			return true;
		} else {
			return false;
		}
	};

	function setObjcAttr(attrNmae, obj, value) {
		for (var attr in obj) {
			if (attr == attrNmae) {
				obj[attr] = value;
			} else {
				obj[attr] = null;
			}
		}
	}

}(Highcharts));
