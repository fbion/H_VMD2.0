/**
 * HWcharts plugin for dragging a legend by its title
 *
 * Author: Torstein H?nsi
 * License: MIT License
 * Last revision: 2013-02-14
 * Requires: HWcharts 3.0+
 *
 * Usage: Set draggable:true and floating:true in the legend options. The legend
 * preserves is alignment after dragging. For example if it is aligned to the right,
 * if will keep the same distance to the right edge even after chart resize or
 * when exporting to a different size.
 */

(function(H) {
	var addEvent = H.addEvent,
		removeEvent = H.removeEvent,
		arrayMin = H.arrayMin,
		arrayMax = H.arrayMax,
		each = H.each,
		extend = H.extend,
		merge = H.merge,
		map = H.map,
		pick = H.pick,
		pInt = H.pInt,
		defaultPlotOptions = H.getOptions().plotOptions,
		seriesTypes = H.seriesTypes,
		extendClass = H.extendClass,
		splat = H.splat,
		wrap = H.wrap,
		Chart = H.Chart,
		Axis = H.Axis,
		Tick = H.Tick,
		Point = H.Point,
		Pointer = H.Pointer,

		Series = H.Series,
		math = Math,

		Color = H.Color,

		doc = document,
		SVG_NS = 'http://www.w3.org/2000/svg',
		hasSVG = !!doc.createElementNS && !!doc.createElementNS(SVG_NS, 'svg').createSVGRect,
		TRACKER_FILL = 'rgba(192,192,192,' + (hasSVG ? 0.0001 : 0.002) + ')';

	var path = CreateJSPath("hwAPI.js", -1),
		fontStyleObj = {},
		currentAxis,
		currentSeries,
		currentPoint,
		isDbclick;

	/**
	 * 添加colorpicker中文支持
	 */
	function initColorPickerLanguage() {
		if (!dhtmlXColorPicker.prototype.i18n["ch"]) {
			dhtmlXColorPicker.prototype.i18n["ch"] = {
				labelHue: unescape("%u8272%u76F8"),
				labelSat: unescape("%u9971%u548C%u5EA6"),
				labelLum: unescape("%u660E%u5EA6"),
				labelRed: "R",
				labelGreen: "G",
				labelBlue: "B",
				btnAddColor: unescape("%u6DFB%u52A0%u989C%u8272"),
				btnSelect: unescape("%u786E%u5B9A"),
				btnCancel: unescape("%u53D6%u6D88")
			};
		}

		dhtmlXColorPicker.prototype.colorAIP.rgb2hsl = function(r, g, b) {
			var H, S, L;
			var max = Math.max(r, g, b),
				min = Math.min(r, g, b);

			//** L **
			L = 0.5 * (max + min);

			//** H **
			if (max == min) H = 0;
			else if (max == r) {
				H = 60 * (g - b) / (max - min);
				if (g < b) H += 360;
			} else if (max == g) H = 60 * (b - r) / (max - min) + 120;
			else H = 60 * (r - g) / (max - min) + 240;

			//** S **
			if (max == min) {
				S = 1;
			} else if (L == 0 || max == min) S = 0;
			else if (L <= 0.5) S = 0.5 * (max - min) / L;
			else S = 0.5 * (max - min) / (1 - L);

			return {
				h: H,
				s: S,
				l: L
			};
		}
	}

	function _setColorPickerColor(colorPicker, color) {
		colorPicker.setColor(color);
		for (var i = 0; i < colorPicker._nodes.length; i++) {
			var node = colorPicker._nodes[i].node;
			node.style.backgroundColor = color;
			node.style.color = color;
		}
	};

	//添加双击事件
	H.wrap(Pointer.prototype, 'setDOMEvents', function(proceed) {
		proceed.apply(this, Array.prototype.slice.call(arguments, 1));

		var pointer = this,
			chart = pointer.chart,
			container = pointer.chart.container;

		container.ondblclick = function(e) {
			isDbclick = true;
			e = pointer.normalize(e);
			currentPoint = onPoint(e, chart);
			if (currentPoint) {
				currentSeries = currentPoint.series;
				if (currentSeries.selected) {
					chart.initPointSetWindow();
					var dhxPointSetWindow = chart.dhxPointSetWindow;
					//var pos = chart.getWindowPosition(e.chartX, e.chartY, 380, 310);
					var x = document.body.clientWidth / 2 - 190;
					dhxPointSetWindow.setPosition(x, 60);
					dhxPointSetWindow.bringToTop();
					if (dhxPointSetWindow.isHidden()) {
						if (chart._hoverFrame) {
							var dimension = dhxPointSetWindow.getDimension();
							chart._hoverFrame.css({
								top: pos.y + "px",
								left: pos.x + "px",
								width: dimension[0] + "px",
								height: dimension[1] + "px"
							})
						}
						dhxPointSetWindow.show();
					}
				} else {
					chart.initSeriesSetWindow();
					var dhxSeriesSetWindow = chart.dhxSeriesSetWindow;

					if (dhxSeriesSetWindow) {
						//var pos = chart.getWindowPosition(e.chartX, e.chartY, 400, 450)
						var x = document.body.clientWidth / 2 - 205;
						dhxSeriesSetWindow.setPosition(x, 60);
						dhxSeriesSetWindow.bringToTop();
						if (dhxSeriesSetWindow.isHidden()) {
							if (chart._hoverFrame) {
								var dimension = dhxSeriesSetWindow.getDimension();
								chart._hoverFrame.css({
									top: pos.y + "px",
									left: pos.x + "px",
									width: dimension[0] + "px",
									height: dimension[1] + "px"
								})
							}
							dhxSeriesSetWindow.show();
						}
					}
				}
			} else {
				currentSeries = chart.hoverSeries;
			}
			return false;
		};

		function clickFunc(e) {
			options = chart.options,
				optionsChart = options.chart,
				hoverSeries = chart.hoverSeries,
				e = pointer.normalize(e);
			hoverPoint = chart.onPoint(e);
			var polxAxis, polyAxis;
			if (hoverSeries) {
				polxAxis = hoverSeries.xAxis;
				polyAxis = hoverSeries.yAxis;
			} else {
				polxAxis = chart.xAxis[0];
				polyAxis = chart.yAxis[0];
			}
			if (polxAxis.crosshair&&polxAxis.crosshair.width) {
				var crosX = polxAxis.crosshair;
				if (hoverPoint && hoverPoint.hasPol) {
					hoverPoint.series.xAxis.removePlotLine(hoverPoint.x)
					hoverPoint.series.yAxis.removePlotLine(hoverPoint.y)
					//crosX.width = 0;
					polxAxis.update({
						crosshair: crosX
					});
					polyAxis.update({
						crosshair: crosX
					});
					hoverPoint.hasPol = false;
					return;
				}
				if (crosX.width && crosX.width > 0) {
					//crosX.width = 0;
					if (hoverPoint) {
						var oriData = options.data.json;
						var xValue = options.data.json[hoverPoint.index][hoverSeries.userOptions.xData];
						var plotLine = {
							id: hoverPoint.y,
							width: 1,
							color: '#666',
							value: hoverPoint.y,
							dashStyle: 'dashdot',
							zIndex: 10,
							label: {
								text: '<span style="color:#000">' + hoverPoint.y + '</span>',
								align: 'left',
								x: 10,
							}
						}
						hoverPoint.hasPol = true;
						hoverPoint.series.yAxis.addPlotLine(plotLine);
						var plotLine1 = {
							id: hoverPoint.x,
							width: 1,
							color: '#666',
							dashStyle: 'dashdot',
							value: hoverPoint.x,
							zIndex: 10,
							label: {
								text: '<span style="color:#000">' + xValue + '</span>',
								verticalAlign: 'top',
								textAlign: 'center',
								y: 30
							}
						}
						hoverPoint.series.xAxis.addPlotLine(plotLine1)
					}
				} else {
					crosX.width = 1;
					crosX.color = '#666';
					crosX.dashStyle = 'dashdot';
				}
				polxAxis.update({
					crosshair: crosX
				});
				polyAxis.update({
					crosshair: crosX
				});
			}

			e = pointer.normalize(e);
			currentPoint = onPoint(e, chart);
			if (currentPoint) {
				currentSeries = currentPoint.series;

				if (!currentSeries.selected) {
					//currentSeries.select();
				} else {
					for (var i = 0; i < currentSeries.points.length; i++) {
						var p = currentSeries.points[i];
						var pointArr = p.historyMarkerOptions || merge({
							fillColor: p.color,
							lineColor: p.graphic.lineColor,
							lineWidth: p.graphic.lineWidth
						}, p.graphic.states.normal);
						var opt = {
							marker: pointArr
						};
						p.update(opt, false);
					}

					currentPoint.historyMarkerOptions = currentPoint.historyMarkerOptions || merge({
						fillColor: p.color,
						lineColor: p.graphic.lineColor,
						lineWidth: p.graphic.lineWidth
					}, p.graphic.states.normal);

					var pointArr = currentPoint.graphic.states.select;

					var pointChangeOptions = {
						marker: pointArr
					};
					currentPoint.update(pointChangeOptions, false);

					chart.redraw();
				}
			}

			return false;
		}
		container.onclick = function(e) {
			isDbclick = false;
			window.setTimeout(function() {
				if (isDbclick != false) {
					return;
				}
				clickFunc(e);
			}, 500);
		};
	});

	//添加序列选中
	H.wrap(Series.prototype, 'select', function(proceed, selected) {
		proceed.apply(this, Array.prototype.slice.call(arguments, 1));
		var series = this,
			chart = series.chart;
		if (series.selected) {
			each(series.points, function(point) {
				if (!point.graphic) {
					return;
				}
				point.graphic.states = point.graphic.states || {};
				point.historyMarkerOptions = point.historyMarkerOptions || merge({
					fillColor: point.color,
					lineColor: point.graphic.lineColor,
					lineWidth: point.graphic.lineWidth
				}, point.graphic.states.normal);
				var pointArr = point.graphic.states.select;

				var pointChangeOptions = {
					marker: pointArr
				};
				point.update(pointChangeOptions, false);
			});
			if (chart.myChart) {
				chart.myChart.title = null;
				chart.myChart.axis = null;
				chart.myChart.series = series;
			}
			series.chart.redraw();
		} else {
			each(series.points, function(point) {
				if (!point.graphic) {
					return;
				}
				point.graphic.states = point.graphic.states || {};
				var pointArr = point.historyMarkerOptions || merge({
					fillColor: point.color,
					lineColor: point.graphic.lineColor,
					lineWidth: point.graphic.lineWidth
				}, point.graphic.states.normal);

				var pointChangeOptions = {
					marker: pointArr
				};
				point.update(pointChangeOptions, false);
			});
			series.chart.redraw();
		}
	});

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
						var textStr = point.dataLabel.text.textStr.replace(' ', ''),
							num = parseFloat(textStr).toString().length,
							endStr = '';
						if (num < textStr.length && isNaN(parseFloat(textStr.substring(num, textStr.length)))) {
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
		//if(!series.isSeriesClick){
		chart.addSeriesClickOn();
		//}
	});


	//给图表元素添加弹出设置窗口事件
	Chart.prototype.addAxesDoubleClick = function() {

		var chart = this;

		function axiaDoubleFun(axis, e) {
			currentAxis = axis;
			chart.initAxisSetWindow();
			chart.initFontSetWindow();
			var dhxAxisSetWindow = chart.dhxAxisSetWindow;

			if (dhxAxisSetWindow) {
				e = chart.pointer.normalize(e);
				//var pos = chart.getWindowPosition(e.chartX, e.chartY, 575, 440);
				var x = document.body.clientWidth / 2 - 330;
				dhxAxisSetWindow.setPosition(x, 60);
				dhxAxisSetWindow.bringToTop();

				if (dhxAxisSetWindow.isHidden()) {
					if (chart._hoverFrame) {
						var dimension = dhxAxisSetWindow.getDimension();
						chart._hoverFrame.css({
							top: pos.y + "px",
							left: pos.x + "px",
							width: dimension[0] + "px",
							height: dimension[1] + "px"
						})
					}
					dhxAxisSetWindow.show();
				}
			}
		}
		each(chart.axes, function(axis) {
			if (!axis.axisGroup) return;
			addEvent(axis.axisGroup.element, 'dblclick', function(e) {
				axiaDoubleFun(axis, e);
			});
			if (axis.labelGroup) {
				addEvent(axis.labelGroup.element, 'dblclick', function(e) {
					axiaDoubleFun(axis, e);
				});
			};
			if (axis.axisTitle) {
				addEvent(axis.axisTitle.element, 'dblclick', function(e) {
					axiaDoubleFun(axis, e);
				});
			}
		});
	};

	Chart.prototype.addBackgroundDoubleClick = function() {

		var chart = this;

		function backDlclickFunc(e) {
			chart.initChartSetWindow();
			var dhxChartSetWindow = chart.dhxChartSetWindow;

			if (dhxChartSetWindow) {
				e = chart.pointer.normalize(e);
				//var pos = chart.getWindowPosition(e.chartX, e.chartY, 360, 390);
				var x = document.body.clientWidth / 2 - 195;
				dhxChartSetWindow.setPosition(x, 80);
				dhxChartSetWindow.bringToTop();

				if (dhxChartSetWindow.isHidden()) {
					if (chart._hoverFrame) {
						var dimension = dhxChartSetWindow.getDimension();
						chart._hoverFrame.css({
							top: pos.y + "px",
							left: pos.x + "px",
							width: dimension[0] + "px",
							height: dimension[1] + "px"
						})
					}
					dhxChartSetWindow.show();
				}
			}
		}
		addEvent(chart.chartBackground.element, 'dblclick', backDlclickFunc);

		if (chart.plotBackground && chart.plotBackground.element) {
			addEvent(chart.plotBackground.element, 'dblclick', backDlclickFunc);
		}

	};

	Chart.prototype.addTitleDoubleClick = function() {

		var chart = this;
		if (chart.title) {
			addEvent(chart.title.element, 'dblclick', function(e) {

				chart.initTitleSetWindow();
				chart.initFontSetWindow();
				var dhxTitleSetWindow = chart.dhxTitleSetWindow;
				if (dhxTitleSetWindow) {
					e = chart.pointer.normalize(e);
					//var pos = chart.getWindowPosition(e.chartX, e.chartY, 400, 360)
					var x = document.body.clientWidth / 2 - 240;
					dhxTitleSetWindow.setPosition(x, 100);
					dhxTitleSetWindow.bringToTop();

					if (dhxTitleSetWindow.isHidden()) {

						if (chart._hoverFrame) {
							var dimension = dhxTitleSetWindow.getDimension();
							chart._hoverFrame.css({
								top: pos.y + "px",
								left: pos.x + "px",
								width: dimension[0] + "px",
								height: dimension[1] + "px"
							})
						}
						dhxTitleSetWindow.show();
					}
				}
			});
		}

		//给子标题添加设置窗口
		if (chart.subtitle) {
			chart.initTitleSetWindow();
			chart.initFontSetWindow();
			addEvent(chart.subtitle.element, 'dblclick', function(e) {
				var dhxTitleSetWindow = chart.dhxTitleSetWindow;
				if (dhxTitleSetWindow) {
					e = chart.pointer.normalize(e);
					//var pos = chart.getWindowPosition(e.chartX, e.chartY, 400, 360)
					var x = document.body.clientWidth / 2 - 240;
					dhxTitleSetWindow.setPosition(x, 60);
					dhxTitleSetWindow.bringToTop();

					if (dhxTitleSetWindow.isHidden()) {
						if (chart._hoverFrame) {
							var dimension = dhxTitleSetWindow.getDimension();
							chart._hoverFrame.css({
								top: pos.y + "px",
								left: pos.x + "px",
								width: dimension[0] + "px",
								height: dimension[1] + "px"
							})
						}
						dhxTitleSetWindow.show();
					}
				}
			});
		}
	}

	Chart.prototype.addSeriesDoubleClick = function() {
		var chart = this;
		each(chart.series, function(series) {

			if (!series.group) return;

			(function(s) {
				if (!chart['seriesDblClickEvent' + s.name]) {
					chart['seriesDblClickEvent' + s.name] = function(e) {
						isDbclick = true;
						currentSeries = s;
						e = chart.pointer.normalize(e);
						chart.initSeriesSetWindow();
						var dhxSeriesSetWindow = chart.dhxSeriesSetWindow;

						if (!currentPoint && dhxSeriesSetWindow) {
							// var pos = chart.getWindowPosition(e.chartX, e.chartY, 400, 450)
							var x = document.body.clientWidth / 2 - 205;
							dhxSeriesSetWindow.setPosition(x, 60);
							dhxSeriesSetWindow.bringToTop();

							if (dhxSeriesSetWindow.isHidden()) {
								if (chart._hoverFrame) {
									var dimension = dhxSeriesSetWindow.getDimension();
									chart._hoverFrame.css({
										top: pos.y + "px",
										left: pos.x + "px",
										width: dimension[0] + "px",
										height: dimension[1] + "px"
									})
								}
								dhxSeriesSetWindow.show();
							}
						}
					};
					addEvent(s.group.element, 'dblclick', chart['seriesDblClickEvent' + s.name]);
				}
			}(series));
		});
	};

	Chart.prototype.addSeriesClick = function() {
		var chart = this,
			chartParent = chart.parentObject || chart.container;
		each(chart.series, function(series) {
			if (!series.group) return;
			(function(s) {
				if (!chart['seriesClickEvent' + s.name]) {
					chart['seriesClickEvent' + s.name] = function(e) {
						isDbclick = false;
						window.setTimeout(function() {

							// (function(e){
							//     if(isDbclick != false) return;
							//     currentSeries = s;

							//     e = chart.pointer.normalize(e);
							//     // alert(currentSeries.name);
							//     if(currentSeries){
							//         //currentSeries.select();
							//     }
							//     if (!currentPoint) {
							//     }
							// })(e)

							var myToolBar = Ext.getCmp((chart.parentObject || chart.container).toolbar);
							if (chart.myChart) {
								chart.myChart.title = null;
								chart.myChart.axis = null;
								chart.myChart.series = s;
							}
							if (myToolBar) {
								myToolBar.addToolBarEvent(chart);
								var rect = series.group.element.childNodes[0].getBoundingClientRect();
								var chartRect = chart.container.getBoundingClientRect();
								chart.seleBorder.attr({
									visibility: 'visible',
									width: parseFloat(rect.width),
									height: parseFloat(rect.height),
									x: parseFloat(rect.x) - parseFloat(chartRect.left),
									y: parseFloat(rect.y) - parseFloat(chartRect.top)
								});
							}
						}, 500);
					};
					addEvent(s.group.element, 'click', chart['seriesClickEvent' + s.name]);
				}
			}(series));
		});
	};

	function onPoint(e, chart) {
		var hoverSeries = chart.hoverSeries;
		var range = 8; //点的半径
		var points = (hoverSeries && hoverSeries.points) || [];
		for (var j = 0; j < points.length; j++) {
			var p = points[j],
				x = Math.abs(p.plotX + hoverSeries.yAxis.left - e.chartX),
				y = Math.abs(p.plotY + hoverSeries.yAxis.top - e.chartY);
			if (x <= range && y <= range) {
				return p;
			}
		}
	}

	//设置options对象中属性的值
	Chart.prototype.setOptions = function(n, v) {
		if (v === undefined) {
			return;
		}
		var A = n.split("."),
			L = A.length - 1,
			V = this;
		for (var i = 0; i < L; i++) {
			if (!V[A[i]])
				V[A[i]] = {};
			V = V[A[i]];
		}
		V[A[L]] = v;
		return v;
	};

	//获取options对象中属性的值
	Chart.prototype.getOptions = function(n) {
		var A = n.split("."),
			V = this[A[0]];
		for (var i = 1; i < A.length; i++) {
			if (!V)
				return null;
			V = V[A[i]];
		}
		return V;
	};

	Chart.prototype.findAxisByIdInHistory = function(id) {
		for (var i = 0; i < this.history.axes.length; i++) {
			if (this.history.axes[i].id == id) {
				return this.history.axes[i];
			}
		}
		return null;
	}

	Chart.prototype.findAxisByIdInExport = function(id) {
		var export_xAxis = this.getOptions("options.exportOptions.xAxis");
		var export_yAxis = this.getOptions("options.exportOptions.yAxis");
		var result = null;
		each(export_xAxis.concat(export_yAxis), function(axis) {
			if (axis.id == id) {
				result = axis;
				return;
			}
		})
		return result;
	}
Chart.prototype.findAxisById = function(id) {
		var export_xAxis = this.xAxis;
		var export_yAxis = this.yAxis;
		var result = null;
		each(export_xAxis.concat(export_yAxis), function(axis) {
			if (axis.userOptions.id == id) {
				result = axis;
				return;
			}
		})
		return result;
	}
	Chart.prototype.findSeriesByIdInExport = function(id) {
		var export_series = this.getOptions("options.exportOptions.series");
		var result = null;
		each(export_series, function(series) {
			if (series.id == id) {
				result = series;
				return;
			}
		})
		return result;
	}

	Chart.prototype.addPopupSetWindow = function() {
		var chart = this;
		if (chart._initPopupSetWindow) {
			return;
		}
		chart._initPopupSetWindow = true;

		if (chart.options.chart && chart.options.chart.propertypIframe) {
			chart._hoverFrame = $("<iframe style='position: absolute; display: none; border: 0px solid #FFFFFF;'>");
			chart._hoverFontFrame = $("<iframe style='position: absolute; display: none; border: 0px solid #FFFFFF;'>");
			$("body").append(chart._hoverFrame);
			$("body").append(chart._hoverFontFrame);
			// $("#" + chart.options.chart.renderTo).after(chart._hoverFrame);
			// $("#" + chart.options.chart.renderTo).after(chart._hoverFontFrame);
		}

		getDhtmlxWindow();
		chart.setOptions("history.title.text", chart.getOptions("options.title.text"));

		chart.history.axes = chart.history.axes || [];
		for (var i = 0; i < chart.options.xAxis.length; i++) {
			var x_axis = merge({}, chart.options.xAxis[i]);
			chart.history.axes.push(x_axis);
		}
		for (var i = 0; i < chart.options.yAxis.length; i++) {
			var y_axis = merge({}, chart.options.yAxis[i]);
			chart.history.axes.push(y_axis);
		}

		chart.addAxesDoubleClick();
		chart.addBackgroundDoubleClick();
		//给标题添加设置窗口
		chart.addTitleDoubleClick();
		chart.addSeriesDoubleClick();
		chart.addSeriesClick();
		chart.addSeriesClickOn();
		//给图例添加设置窗口
		//        if(chart.legend && chart.legend.group){
		//            addEvent(chart.legend.group.element, 'dblclick', function (e) {
		//
		//            });
		//        }
	}

	//初始化图表设置对话框
	Chart.prototype.initChartSetWindow = function() {
		var chart = this,
			dhxWindow = chart.dhxWindow,
			dhxChartSetWindow = chart.dhxChartSetWindow,
			dhxChartForm = chart.dhxChartForm,
			isLegendChanged,
			isChanged; //form组件中是否有组件的值发生变化

		initColorPickerLanguage();
		if (!dhxWindow) {
			if (_isTopWindow) {
				chart.dhxWindow = dhxWindow = new dhtmlXWindows();
			} else {
				chart.dhxWindow = dhxWindow = new dhtmlxPopWindow.dhtmlXWindows();
			}

			dhxWindow.vp.style.overflow = "auto";
		}
		if (!dhxChartSetWindow) {
			var windowWidth = 390,
				windowHeight = 480,
				backObjOffsetLeft = 12, //背景对象左侧偏移量
				showObjOffsetLeft = 10, //显示对象复选框左侧偏移量
				buttonOffsetLeft = 200, //确定取消按钮偏移量
				backgroundColorPicker,
				plotBackgroundColorPicker;

			chart.dhxChartSetWindow = dhxChartSetWindow = dhxWindow.createWindow("chartSetWindow", 0, 0, windowWidth,
				windowHeight);
			dhxChartSetWindow.setText(unescape("%u56FE%u8868%u8BBE%u7F6E"));
			dhxChartSetWindow.denyResize();
			dhxChartSetWindow.hide();

			dhxChartForm = chart.dhxChartForm = dhxChartSetWindow.attachForm([{
					type: "settings",
					offsetLeft: 2,
					blockOffset: 1,
					position: "label-right"
				},
				{
					type: "block",
					width: 380,
					blockOffset: 5,
					list: [{
							type: "fieldset",
							label: unescape("%u663E%u793A%u5BF9%u8C61"),
							width: 360,
							offsetLeft: 1,
							offsetTop: 10,
							list: [{
									type: "block",
									width: 100,
									offsetLeft: showObjOffsetLeft,
									blockOffset: 1,
									list: [{
											type: "checkbox",
											name: "show_title",
											label: unescape("%u6807%u9898")
										},
										{
											type: "checkbox",
											name: "show_bottom_axis",
											label: unescape("%u5E95%u8F74")
										},

									]
								},
								{
									type: "newcolumn"
								},
								{
									type: "block",
									width: 100,
									blockOffset: 1,
									list: [{
											type: "checkbox",
											name: "show_legend",
											label: unescape("%u56FE%u4F8B")
										},
										{
											type: "checkbox",
											name: "show_left_axis",
											label: unescape("%u5DE6%u8F74")
										},
										//{type: "checkbox", name:"show_top_axis",  label: unescape("%u9876%u8F74")},
										// {type: "checkbox", name:"show_bottom_axis", label: unescape("%u5E95%u8F74")},
										// {type: "checkbox", name:"show_right_axis", label: unescape("%u53F3%u8F74")}
									]
								},
								{
									type: "newcolumn"
								},
								{
									type: "block",
									width: 100,
									blockOffset: 1,
									list: [{
											type: "checkbox",
											name: "show_grid",
											label: unescape("%u7F51%u683C")
										},
										// {type: "checkbox", name:"show_left_axis", label: unescape("%u5DE6%u8F74")},
										// {type: "checkbox", name:"show_top_axis",  label: unescape("%u9876%u8F74")},

										{
											type: "checkbox",
											name: "show_right_axis",
											label: unescape("%u53F3%u8F74")
										}
									]
								}
							]
						},

						{
							type: "fieldset",
							label: unescape("%u80CC%u666F%u586B%u5145"),
							width: 360,
							position: "label-left",
							labelWidth: 50,
							offsetLeft: 1,
							offsetTop: 10,
							list: [{
									type: "block",
									blockOffset: 1,
									list: [{
										type: "label",
										label: unescape("%u56FE%u8868%u533A%u80CC%u666F%3A")
									}]
								},
								{
									type: "block",
									blockOffset: 3,
									list: [
										//                            {type: "colorpicker", name: "background_color", position:"label-left", width: 70, labelWidth: 50, offsetLeft:10, label: "背景色:",  value: "#2a87eb"},
										{
											type: "input",
											name: "background_color",
											width: 60,
											labelWidth: 50,
											offsetLeft: 0,
											position: "label-left",
											label: unescape("%u80CC%u666F%u8272%3A"),
											value: ""
										},
										{
											type: "newcolumn"
										},
										{
											type: "input",
											name: "background_alpha",
											width: 60,
											labelWidth: 50,
											offsetLeft: 20,
											position: "label-left",
											label: unescape("%u900F%u660E%u5EA6%3A"),
											value: "1"
										}
									]
								},
								{
									type: "block",
									blockOffset: 1,
									list: [{
										type: "label",
										label: unescape("%u66F2%u7EBF%u533A%u80CC%u666F%3A")
									}]
								},
								{
									type: "block",
									blockOffset: 3,
									list: [
										//                            {type: "colorpicker", name: "plot_background_color", position:"label-left", width: 70,labelWidth: 50,  offsetLeft:10, label: "背景色:", value: "#2a87eb"},
										{
											type: "input",
											name: "plot_background_color",
											width: 60,
											labelWidth: 50,
											offsetLeft: 0,
											position: "label-left",
											label: unescape("%u80CC%u666F%u8272%3A"),
											value: ""
										},
										{
											type: "newcolumn"
										},
										{
											type: "input",
											name: "plot_background_alpha",
											width: 60,
											labelWidth: 50,
											offsetLeft: 20,
											position: "label-left",
											label: unescape("%u900F%u660E%u5EA6%3A"),
											value: "1"
										}
									]
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
							width: 50,
							name: "confirm",
							value: unescape("%u786E%u5B9A"),
							offsetTop: 20,
							offsetLeft: 10
						},
						{
							type: "newcolumn"
						},
						{
							type: "button",
							width: 50,
							name: "cancel",
							value: unescape("%u53D6%u6D88"),
							offsetTop: 20,
							offsetLeft: 10
						}
					]
				}
			]);

			dhxChartForm.setItemWidth("background_color", 70);
			dhxChartForm.setItemWidth("background_alpha", 70);
			dhxChartForm.setItemWidth("plot_background_color", 70);
			dhxChartForm.setItemWidth("plot_background_alpha", 70);

			if (_isTopWindow) {
				backgroundColorPicker = new dhtmlXColorPicker(dhxChartForm.getInput("background_color"));
				plotBackgroundColorPicker = new dhtmlXColorPicker(dhxChartForm.getInput("plot_background_color"));
			} else {
				backgroundColorPicker = new dhtmlxPopWindow.dhtmlXColorPicker(dhxChartForm.getInput("background_color"));
				plotBackgroundColorPicker = new dhtmlxPopWindow.dhtmlXColorPicker(dhxChartForm.getInput("plot_background_color"));
			}
			backgroundColorPicker.loadUserLanguage("ch");
			plotBackgroundColorPicker.loadUserLanguage("ch");

			//关闭对话框
			dhxChartSetWindow.attachEvent("onClose", function(win) {
				if (chart._hoverFrame) {
					chart._hoverFrame.css({
						display: 'none'
					});
				}
				win.hide();
			});

			dhxChartSetWindow.attachEvent("onMoveFinish", function(win) {
				if (chart._hoverFrame) {
					var position = win.getPosition();
					chart._hoverFrame.css({
						top: position[1] + "px",
						left: position[0] + "px"
					});
				}
			});

			//显示对话框
			dhxChartSetWindow.attachEvent("onShow", function(win) {
				var isShowGrid = false,
					isShowLeftAxis = false,
					isShowRightAxis = false,
					isShowTopAxis = false,
					isShowBottomAxis = false,
					hasLeftAxis = false,
					hasRightAxis = false,
					hasTopAxis = false,
					hasBottomAxis = false,
					isChanged = false;

				if (chart._hoverFrame) {
					chart._hoverFrame.css({
						display: 'block'
					});
				}

				dhxChartForm.setItemValue("show_title", !!chart.options.title.text);
				dhxChartForm.setItemValue("show_legend", chart.options.legend.enabled);
				for (var i = 0; i < chart.axes.length; i++) {
					var axis_opt = chart.axes[i].options;
					if (axis_opt.gridLineWidth) {
						isShowGrid = true;
					}
					//左轴
					if (!axis_opt.isX && !axis_opt.opposite) {
						hasLeftAxis = true;
						if (axis_opt.lineWidth || axis_opt.tickWidth || (axis_opt.labels && axis_opt.labels.enabled)) {
							isShowLeftAxis = true;
						}
					}
					//右轴
					else if (!axis_opt.isX && axis_opt.opposite) {
						hasRightAxis = true;
						if (axis_opt.lineWidth || axis_opt.tickWidth || (axis_opt.labels && axis_opt.labels.enabled)) {
							isShowRightAxis = true;
						}
					}
					//上轴
					else if (axis_opt.isX && axis_opt.opposite) {
						hasTopAxis = true;
						if (axis_opt.lineWidth || axis_opt.tickWidth || (axis_opt.labels && axis_opt.labels.enabled)) {
							isShowTopAxis = true;
						}
					}
					//下轴
					else {
						hasBottomAxis = true;
						if (axis_opt.lineWidth || axis_opt.tickWidth || (axis_opt.labels && axis_opt.labels.enabled)) {
							isShowBottomAxis = true;
						}
					}

				}
				// if(!hasLeftAxis){
				//     dhxChartForm.disableItem('show_left_axis');
				// }
				// if(!hasTopAxis){
				//     dhxChartForm.disableItem('show_top_axis');
				// }
				// if(!hasBottomAxis){
				//     dhxChartForm.disableItem('show_bottom_axis');
				// }
				// if(!hasRightAxis){
				//     dhxChartForm.disableItem('show_right_axis');
				// }

				dhxChartForm.setItemValue("show_grid", isShowGrid);
				dhxChartForm.setItemValue("show_left_axis", isShowLeftAxis);
				dhxChartForm.setItemValue("show_top_axis", isShowTopAxis);
				dhxChartForm.setItemValue("show_bottom_axis", isShowBottomAxis);
				dhxChartForm.setItemValue("show_right_axis", isShowRightAxis);

				_setColorPickerColor(backgroundColorPicker, chart.options.chart.backgroundColor || "#FFFFFF");
				dhxChartForm.setItemValue("background_color", chart.options.chart.backgroundColor || "#FFFFFF");
				_setColorPickerColor(plotBackgroundColorPicker, chart.options.chart.plotBackgroundColor || "#FFFFFF");
				dhxChartForm.setItemValue("plot_background_color", chart.options.chart.plotBackgroundColor || "#FFFFFF");

				dhxChartForm.setItemValue("background_alpha", H.pick(chart.options.chart.backgroundOpacity, 1));
				dhxChartForm.setItemValue("plot_background_alpha", H.pick(chart.options.chart.plotBackgroundOpacity, 1));

				//                alert(dhxChartForm.isItemChecked("show_title"));
				//                 dhxChartForm.setItemValue("series_type", H.pick(chart.options.chart.type, chart.options.chart.defaultSeriesType, "line"));

			});
			//对话框中图表背景色颜色改变
			backgroundColorPicker.attachEvent("onSelect", function(color, node) {
				//your code here
				//                alert(color);
				node.style.color = color;
			});
			plotBackgroundColorPicker.attachEvent("onSelect", function(color, node) {
				//your code here
				node.style.color = color;
				//                alert(color);
			});

			//对话框中复选框组件、输入框组件改变事件
			dhxChartForm.attachEvent("onChange", function(name, value) {
				var isShow;
				isChanged = true;
				switch (name) {
					case "show_title":
						isShow = dhxChartForm.isItemChecked(name);
						break;
					case "show_legend":
						isShow = dhxChartForm.isItemChecked(name);
						isLegendChanged = dhxChartForm.isItemChecked(name) != chart.legend.options.enabled;
						//                        alert("show_legend:" +isShow);
						break;
					case "show_grid":
						isShow = dhxChartForm.isItemChecked(name);
						//                        alert("show_grid:" +isShow);
						break;
					case "show_left_axis":
						isShow = dhxChartForm.isItemChecked(name);
						//                        alert("show_left_axis:" +isShow);
						break;
					case "show_right_axis":
						isShow = dhxChartForm.isItemChecked(name);
						//                        alert("show_right_axis:" +isShow);
						break;
					case "show_top_axis":
						isShow = dhxChartForm.isItemChecked(name);
						//                        alert("show_top_axis:" +isShow);
						break;
					case "show_bottom_axis":
						isShow = dhxChartForm.isItemChecked(name);
						//                        alert("show_bottom_axis:" +isShow);
						break;
					case "background_alpha":
						//                        alert("background_alpha:" +value);
						break;
					case "plot_background_alpha":
						//                        alert("plot_background_alpha:" +value);
						break;
				}
			});

			//对话框中点击按钮事件
			dhxChartForm.attachEvent("onButtonClick", function(name) {
				if (name == "confirm") {
					var params = [];
					dhxChartSetWindow.hide();
					if (chart._hoverFrame) {
						chart._hoverFrame.css({
							display: 'none'
						});
					}

					var isShowTitle = dhxChartForm.isItemChecked("show_title"),
						isShowLegend = dhxChartForm.isItemChecked("show_legend"),
						isShowGrid = dhxChartForm.isItemChecked("show_grid"),
						isShowLeftAxis = dhxChartForm.isItemChecked("show_left_axis"),
						isShowRightAxis = dhxChartForm.isItemChecked("show_right_axis"),
						isShowTopAxis = dhxChartForm.isItemChecked("show_top_axis"),
						isShowBottomAxis = dhxChartForm.isItemChecked("show_bottom_axis"),
						hasLeftAxis = false,
						hasRightAxis = false,
						hasTopAxis = false,
						hasBottomAxis = false,
						linkLeftAxisOptions,
						linkRightAxisOptions,
						linkTopAxisOptions,
						linkBottomAxisOptions,
						backgroundColor = backgroundColorPicker.getSelectedColor(),
						plotBackgroundColor = plotBackgroundColorPicker.getSelectedColor(),
						backgroundAlpha = dhxChartForm.getInput("background_alpha").value,
						plotBackgroundAlpha = dhxChartForm.getInput("plot_background_alpha").value,
						seriesTypeCombo = dhxChartForm.getCombo("series_type");

					if (backgroundColor[0] != chart.options.chart.backgroundColor || plotBackgroundColor[0] != chart.options.chart
						.plotBackgroundColor) {
						params.push({
							changeType: 'backgroundColor',
							oldValue: chart.options.chart.plotBackgroundColor,
							newValue: plotBackgroundColor[0]
						})
					}

					chart.options.chart.backgroundColor = backgroundColor[0];
					chart.options.chart.backgroundOpacity = backgroundAlpha;

					chart.options.chart.plotBackgroundColor = plotBackgroundColor[0];
					chart.options.chart.plotBackgroundOpacity = plotBackgroundAlpha;

					chart.setOptions("options.exportOptions.chart.backgroundColor", backgroundColor[0]);
					chart.setOptions("options.exportOptions.chart.backgroundOpacity", backgroundAlpha);

					chart.setOptions("options.exportOptions.chart.plotBackgroundColor", plotBackgroundColor[0]);
					chart.setOptions("options.exportOptions.chart.plotBackgroundOpacity", plotBackgroundAlpha);

					chart.setOptions("options.exportOptions.title.text", isShowTitle ? (chart.getOptions("history.title.text") ||
						"标题") : "");
					chart.setOptions("options.exportOptions.legend.enabled", isShowLegend);
					//
					chart.chartBackground.attr({
						fill: Color(backgroundColor[0]).setOpacity(backgroundAlpha).get()
					});

					chart.plotBackground.attr({
						fill: Color(plotBackgroundColor[0]).setOpacity(plotBackgroundAlpha).get()
					});

					chart.setTitle({
						text: isShowTitle ? (chart.getOptions("history.title.text") || "标题") : ""
					}, {}, false);

					for (var i = 0; i < chart.axes.length; i++) {
						var axis_opt = chart.axes[i].options,
							history_axis = H.merge(axis_opt, chart.findAxisByIdInHistory(axis_opt.id)),
							isShowAxis = false;

						if (axis_opt.id == "navigator-y-axis" || axis_opt.id == "navigator-x-axis") {
							continue;
						}
						//左轴
						if (!axis_opt.isX && !axis_opt.opposite) {
							hasLeftAxis = true;
							linkLeftAxisOptions = axis_opt;
							isShowAxis = isShowLeftAxis;
						}
						//右轴
						else if (!axis_opt.isX && axis_opt.opposite) {
							hasRightAxis = true;
							linkRightAxisOptions = axis_opt;
							isShowAxis = isShowRightAxis;
						}
						//上轴
						else if (axis_opt.isX && axis_opt.opposite) {
							hasTopAxis = true;
							linkTopAxisOptions = axis_opt;
							isShowAxis = isShowTopAxis;
						}
						//下轴
						else if (axis_opt.isX && !axis_opt.opposite) {
							hasBottomAxis = true;
							linkBottomAxisOptions = axis_opt;
							isShowAxis = isShowBottomAxis;
						}

						var gridLineWidth = isShowGrid ? ((history_axis && history_axis.gridLineWidth) || 1) : 0;

						var history_tickWidth = (history_axis && history_axis.tickWidth) || 1;
						var history_lineWidth = (history_axis && history_axis.lineWidth) || 1;

						chart.axes[i].update({
							gridLineWidth: gridLineWidth,
							tickWidth: isShowAxis ? history_tickWidth : 0,
							lineWidth: isShowAxis ? history_lineWidth : 0,
							title: {
								enabled: isShowAxis && history_axis && history_axis.title && history_axis.title.enabled,
								text: isShowAxis ? ((history_axis && history_axis.title && history_axis.title.text) || "") : null
							},
							labels: {
								enabled: isShowAxis
							}
						}, false);

						var export_axis = chart.findAxisByIdInExport(axis_opt.id);
						if (export_axis) {
							export_axis.gridLineWidth = gridLineWidth;
							export_axis.tickWidth = isShowAxis ? history_tickWidth : 0;
							export_axis.lineWidth = isShowAxis ? history_lineWidth : 0;
							export_axis.labels = export_axis.labels || {};
							export_axis.labels.enabled = isShowAxis;
							export_axis.title = export_axis.title || {};
							export_axis.title.enabled = isShowAxis;
							export_axis.title.text = isShowAxis ? ((history_axis && history_axis.title && history_axis.title.text) || "") :
								null;
						}
					}

					if (isShowTopAxis && !hasTopAxis) {
						chart.addAxis({
							type: linkBottomAxisOptions.type,
							linkedTo: linkBottomAxisOptions.index,
							opposite: true
						}, true, false);
					}

					if (isShowBottomAxis && !hasBottomAxis) {
						chart.addAxis({
							type: linkTopAxisOptions.type,
							linkedTo: linkTopAxisOptions.index
						}, true, false);
					}

					if (isShowRightAxis && !hasRightAxis) {
						chart.addAxis({
							type: linkLeftAxisOptions.type,
							linkedTo: linkLeftAxisOptions.index,
							opposite: true
						}, false, false);
					}

					if (isShowLeftAxis && !hasLeftAxis) {
						chart.addAxis({
							type: linkRightAxisOptions.type,
							linkedTo: linkRightAxisOptions.index
						}, false, false);
					}

					chart.options = merge(chart.options, {
						// chart:{
						//     type:seriesTypeCombo.getSelectedValue()
						// },
						legend: {
							enabled: isShowLegend
						}
					});

					if (chart.legend) {
						if (isShowLegend && !chart.legend.group) {
							chart.legend.render();
						} else if (!isShowLegend) {
							chart.legend.destroy();
						}
					}

					chart.redraw();

					chart.addTitleDoubleClick();
					chart.addAxesDoubleClick();
					chart.addSeriesDoubleClick();
					chart.addSeriesClick();
					chart.addSeriesClickOn();
					// 增加事件监听 
					var chartParent = chart.parentObject || chart.container;
					if (params.length > 0) {
						chartParent.fireEvent('chartChanged', chartParent, params);
					}
				} else if (name == "cancel") {
					if (chart._hoverFrame) {
						chart._hoverFrame.css({
							display: 'none'
						});
					}
					dhxChartSetWindow.hide();
				}
			});
		};
	};

	//初始化标题设置对话框
	Chart.prototype.initTitleSetWindow = function() {
		var chart = this,
			dhxWindow = chart.dhxWindow,
			dhxTitleSetWindow = chart.dhxTitleSetWindow,
			dhxTitleForm = chart.dhxTitleForm,
			backgroundColorPicker,
			lineColorPicker,
			isChanged;

		initColorPickerLanguage();

		if (!dhxWindow) {
			if (_isTopWindow) {
				chart.dhxWindow = dhxWindow = new dhtmlXWindows();
			} else {
				chart.dhxWindow = dhxWindow = new dhtmlxPopWindow.dhtmlXWindows();
			}

			dhxWindow.vp.style.overflow = "auto";
		}
		if (!dhxTitleSetWindow) {
			var titleWindowWidth = 480,
				titleWindowHeight = 230;

			chart.dhxTitleSetWindow = dhxTitleSetWindow = dhxWindow.createWindow("titleSetWindow", 0, 0, titleWindowWidth,
				titleWindowHeight);
			dhxTitleSetWindow.setText(unescape("%u6807%u9898%u8BBE%u7F6E"));
			dhxTitleSetWindow.denyResize();
			dhxTitleForm = chart.dhxTitleForm = dhxTitleSetWindow.attachForm([{
					type: "block",
					offsetLeft: 5,
					blockOffset: 1,
					width: 460,
					list: [{
						type: "block",
						width: 350,
						blockOffset: 2,
						list: [{
								type: "checkbox",
								position: "label-right",
								name: "title_show",
								offsetLeft: 12,
								offsetTop: 10,
								labelHeight: 30,
								label: unescape("%u663E%u793A%u6807%u9898")
							},
							{
								type: "newcolumn"
							},
							{
								type: "block",
								name: "title_position",
								blockOffset: 10,
								offsetTop: 9,
								list: [{
										type: "label",
										label: unescape("%u4F4D%u7F6E%3A"),
										offsetLeft: 10,
										offsetTop: 0,
										labelWidth: 60,
										labelHeight: 18
									},
									{
										type: "newcolumn"
									},
									{
										type: "block",
										blockOffset: 0,
										offsetTop: 2,
										list: [{
												type: "radio",
												position: "label-right",
												value: "left",
												name: "title_position",
												labelHeight: 18,
												offsetLeft: 5,
												offsetTop: 0,
												label: unescape("%u5C45%u5DE6")
											},
											{
												type: "newcolumn"
											},
											{
												type: "radio",
												position: "label-right",
												value: "center",
												name: "title_position",
												labelHeight: 18,
												offsetLeft: 5,
												offsetTop: 0,
												label: unescape("%u5C45%u4E2D")
											},
											{
												type: "newcolumn"
											},
											{
												type: "radio",
												position: "label-right",
												value: "right",
												name: "title_position",
												labelHeight: 18,
												offsetLeft: 5,
												offsetTop: 0,
												label: unescape("%u5C45%u53F3")
											}
										]
									}
								]
							}
						]
					}, ]
				},
				{
					type: "block",
					name: "text_set",
					offsetLeft: 10,
					blockOffset: 1,
					list: [{
							type: "input",
							name: "title_text",
							labelWidth: 60,
							inputWidth: 208,
							offsetLeft: 10,
							offsetTop: 10,
							position: "label-left",
							label: unescape("%u6807%u9898%u6587%u672C"),
							value: "1"
						},
						{
							type: "newcolumn"
						},
						{
							type: "button",
							width: 40,
							name: "font_set",
							value: unescape("%u5B57%u4F53"),
							offsetTop: 4,
							offsetLeft: 30
						}
					]
				},
				{
					type: "block",
					offsetLeft: 230,
					list: [{
							type: "button",
							width: 50,
							name: "confirm",
							value: unescape("%u786E%u5B9A"),
							offsetTop: 15,
							offsetLeft: 15
						},
						{
							type: "newcolumn"
						},
						{
							type: "button",
							width: 50,
							name: "cancel",
							value: unescape("%u53D6%u6D88"),
							offsetTop: 15,
							offsetLeft: 15
						}
					]
				}
			]);

			if (_isTopWindow) {
				backgroundColorPicker = new dhtmlXColorPicker(dhxTitleForm.getInput("title_background_color"));
				lineColorPicker = new dhtmlXColorPicker(dhxTitleForm.getInput("title_line_color"));
			} else {
				backgroundColorPicker = new dhtmlxPopWindow.dhtmlXColorPicker(dhxTitleForm.getInput("title_background_color"));
				lineColorPicker = new dhtmlxPopWindow.dhtmlXColorPicker(dhxTitleForm.getInput("title_line_color"));
			}

			backgroundColorPicker.loadUserLanguage("ch");
			lineColorPicker.loadUserLanguage("ch");

			dhxTitleSetWindow.hide();
			dhxTitleSetWindow.attachEvent("onClose", function(win) {
				if (chart._hoverFrame) {
					chart._hoverFrame.css({
						display: 'none'
					});
				}
				win.hide();
			});
			dhxTitleSetWindow.attachEvent("onMoveFinish", function(win) {
				if (chart._hoverFrame) {
					var position = win.getPosition();
					chart._hoverFrame.css({
						top: position[1] + "px",
						left: position[0] + "px"
					});
				}
			});

			//显示对话框
			dhxTitleSetWindow.attachEvent("onShow", function(win) {
				var title = chart.title;
				isChanged = false;
				fontStyleObj = chart.options.title.style;

				if (chart._hoverFrame) {
					chart._hoverFrame.css({
						display: 'block'
					});
				}

				dhxTitleForm.setItemValue("title_show", !!chart.title);
				dhxTitleForm.setItemValue("title_position", "center");
				_setColorPickerColor(backgroundColorPicker, "#FFFFFF");
				_setColorPickerColor(lineColorPicker, "#FFFFFF");
				if (chart.options.title) {
					dhxTitleForm.setItemValue("title_position", chart.options.title.align);
				}
				dhxTitleForm.setItemValue("title_text", chart.options.title && chart.options.title.text);

			});

			dhxTitleForm.attachEvent("onButtonClick", function(name) {
				var isSetToSeries,
					inputMarkerStep,
					inputDataLabelStep,
					align;

				if (name == "confirm") {
					var params = [];
					if (chart._hoverFrame) {
						chart._hoverFrame.css({
							display: 'none'
						});
					}
					dhxTitleSetWindow.hide();
					if (dhxTitleForm.isItemChecked("title_position", "left")) {
						align = "left";
					} else if (dhxTitleForm.isItemChecked("title_position", "right")) {
						align = "right";
					} else {
						align = "center";
					}
					if (dhxTitleForm.getInput("title_text").value) {
						chart.setOptions("history.title.text", dhxTitleForm.getInput("title_text").value);
					}
					// 如果标题发生改变 添加曲线变化事件监听
					if (chart.title.textStr != dhxTitleForm.getInput("title_text").value) {
						params.push({
							changeType: 'chartTitle',
							oldValue: chart.title.textStr || '',
							newValue: dhxTitleForm.isItemChecked("title_show") ? chart.getOptions("history.title.text") : "",
						})
					}
					chart.setTitle({
						align: align,
						text: dhxTitleForm.isItemChecked("title_show") ? chart.getOptions("history.title.text") : "",
						style: {
							fontWeight: fontStyleObj.fontWeight || "normal", //"normal"
							fontStyle: fontStyleObj.fontStyle || "normal", //"italic"
							fontSize: fontStyleObj.fontSize || "16px", //"36px"
							color: fontStyleObj.color || "#333333",
							textDecoration: fontStyleObj.textDecoration || "none" //overline,line-through,underline
						}
					});

					chart.setOptions("options.exportOptions.title.text", dhxTitleForm.isItemChecked("title_show") ? chart.getOptions(
						"history.title.text") : "");
					chart.setOptions("options.exportOptions.title.align", align);
					chart.setOptions("options.exportOptions.title.style.fontWeight", fontStyleObj.fontWeight || "normal");
					chart.setOptions("options.exportOptions.title.style.fontStyle", fontStyleObj.fontStyle || "normal");
					chart.setOptions("options.exportOptions.title.style.fontSize", fontStyleObj.fontSize || "16px");
					chart.setOptions("options.exportOptions.title.style.color", fontStyleObj.color || "#333333");
					chart.setOptions("options.exportOptions.title.style.textDecoration", fontStyleObj.textDecoration || "none");

					chart.addTitleDoubleClick();
					chart.addAxesDoubleClick();
					chart.addSeriesDoubleClick();
					chart.addSeriesClick();
					chart.addSeriesClickOn();
					if (params.length > 0) {
						// 增加事件监听 
						var chartParent = chart.parentObject || chart.container;
						chartParent.fireEvent('chartChanged', chartParent, params);
					}
				} else if (name == "cancel") {
					if (chart._hoverFrame) {
						chart._hoverFrame.css({
							display: 'none'
						});
					}
					dhxTitleSetWindow.hide();
				} else if (name == "font_set") {
					var dhxFontSetWindow = chart.dhxFontSetWindow;
					if (dhxFontSetWindow && dhxFontSetWindow.isHidden()) {
						//var pos = dhxTitleSetWindow.getPosition();
						var x = document.body.clientWidth / 2 - 195;
						dhxFontSetWindow.setPosition(x, 60);
						dhxFontSetWindow.bringToTop();
						if (chart._hoverFontFrame) {
							var dimension = dhxFontSetWindow.getDimension();
							chart._hoverFontFrame.css({
								top: pos[1] + 20 + "px",
								left: pos[0] + 20 + "px",
								width: dimension[0] + "px",
								height: dimension[1] + "px"
							})
						}

						dhxFontSetWindow.show();
					}
				}
			});
		};
	};

	//初始化字体设置对话框
	Chart.prototype.initFontSetWindow = function() {
		var chart = this,
			dhxWindow = chart.dhxWindow,
			dhxFontSetWindow = chart.dhxFontSetWindow,
			dhxFontForm = chart.dhxFontForm,
			isChanged;

		initColorPickerLanguage();

		if (!dhxWindow) {
			if (_isTopWindow) {
				chart.dhxWindow = dhxWindow = new dhtmlXWindows();
			} else {
				chart.dhxWindow = dhxWindow = new dhtmlxPopWindow.dhtmlXWindows();
			}
			dhxWindow.vp.style.overflow = "auto";
		}
		if (!dhxFontSetWindow) {
			var fontWindowWidth = 460,
				fontWindowHeight = 370,
				//                backObjOffsetLeft = 20, //背景对象左侧偏移量
				//                showObjOffsetLeft = 20, //显示对象复选框左侧偏移量
				fontSizeInputWidth = 85,
				selectLabelHeight = 20, //文本样式复选框和文本方向单选框标签高度
				btnOffsetLeft = 260,
				effectFieldsetWidth = 300,
				fontColorPicker;

			var _browser = getBrowserType();
			if (_browser.chrome) {} else if (_browser.firefox) {
				fontWindowWidth = 500;
				fontWindowHeight = 390;
			} else if (_browser.ie || _isIE) {
				switch (getIEDocumentMode()) {}
			} else if (_browser.safari) {} else if (_browser.opera) {}
			chart.dhxFontSetWindow = dhxFontSetWindow = dhxWindow.createWindow("fontSetWindow", 0, 0, fontWindowWidth,
				fontWindowHeight);
			dhxFontSetWindow.setText(unescape("%u5B57%u4F53%u8BBE%u7F6E"));
			dhxFontSetWindow.denyResize();
			dhxFontForm = chart.dhxFontForm = dhxFontSetWindow.attachForm([{
					type: "block",
					width: 450,
					list: [{
							type: "block",
							width: 410,
							blockOffset: 0,
							offsetTop: 10,
							list: [{
									type: "combo",
									position: "label-left",
									label: unescape("%u5B57%u4F53%3A"),
									labelWidth: 37,
									labelHeight: 18,
									offsetLeft: 2,
									width: 85,
									name: "font_family",
									options: [{
											value: 'SimSun',
											text: '宋体'
										},
										{
											value: 'SimHei',
											text: '黑体'
										},
										{
											value: 'Microsoft YaHei',
											text: '微软雅黑'
										},
										{
											value: 'Microsoft JhengHei',
											text: '微软正黑体'
										},
										{
											value: 'NSimSun',
											text: '新宋体'
										},
										{
											value: 'PMingLiU',
											text: '新细明体'
										},
										{
											value: 'FangSong',
											text: '仿宋'
										},
										{
											value: 'KaiTi',
											text: '楷体'
										},
										{
											value: 'FangSong_GB2312',
											text: '仿宋_GB2312'
										},
										{
											value: 'KaiTi_GB2312',
											text: '楷体_GB2312'
										},
										{
											value: 'STHeiti Light',
											text: '华文细黑'
										},
										{
											value: "Arial",
											text: "Arial"
										}
									]
								},
								{
									type: "newcolumn"
								},
								{
									type: "combo",
									position: "label-left",
									label: unescape("%u5B57%u53F7%3A"),
									labelWidth: 37,
									labelHeight: 18,
									offsetLeft: 10,
									width: fontSizeInputWidth,
									name: "font_size",
									options: [{
											value: 5,
											text: "5"
										},
										{
											value: 5.5,
											text: "5.5"
										},
										{
											value: 6.5,
											text: "6.5"
										},
										{
											value: 7.5,
											text: "7.5"
										},
										{
											value: 8,
											text: "8"
										},
										{
											value: 9,
											text: "9"
										},
										{
											value: 10,
											text: "10"
										},
										{
											value: 11,
											text: "11"
										},
										{
											value: 12,
											text: "12"
										},
										{
											value: 14,
											text: "14"
										},
										{
											value: 16,
											text: "16"
										},
										{
											value: 18,
											text: "18"
										},
										{
											value: 20,
											text: "20"
										},
										{
											value: 22,
											text: "22"
										},
										{
											value: 24,
											text: "24"
										},
										{
											value: 26,
											text: "26"
										},
										{
											value: 28,
											text: "28"
										},
										{
											value: 36,
											text: "36"
										},
										{
											value: 48,
											text: "48"
										},
										{
											value: 72,
											text: "72"
										}
									]
								},
								{
									type: "newcolumn"
								},
								{
									type: "input",
									name: "font_color",
									width: 80,
									labelWidth: 37,
									offsetLeft: 10,
									labelHeight: 18,
									inputWidth: 80,
									position: "label-left",
									label: unescape("%u989C%u8272%3A"),
									value: "#000000"
								}
								//                        {type: "colorpicker", position:"label-left", name: "font_color",labelWidth:37,labelHeight:18, inputWidth: 78, offsetLeft:10, label: "颜色:", value: "#2a87eb", enableCustomColors: "1"}
							]
						},
						{
							type: "block",
							width: 410,
							blockOffset: 0,
							list: [{
									type: "fieldset",
									label: unescape("%u5B57%u5F62"),
									width: 135,
									offsetLeft: 0,
									offsetTop: 15,
									list: [{
											type: "checkbox",
											position: "label-right",
											name: "font_italic",
											labelHeight: selectLabelHeight,
											offsetLeft: 0,
											offsetTop: 10,
											label: unescape("%u503E%u659C")
										},
										{
											type: "newcolumn"
										},
										{
											type: "checkbox",
											position: "label-right",
											name: "font_weight",
											labelHeight: selectLabelHeight,
											offsetLeft: 0,
											offsetTop: 10,
											label: unescape("%u52A0%u7C97")
										}
									]
								},
								{
									type: "newcolumn"
								},
								{
									type: "fieldset",
									label: unescape("%u6587%u5B57%u65B9%u5411"),
									width: 135,
									offsetLeft: 10,
									offsetTop: 15,
									list: [{
											type: "radio",
											position: "label-right",
											value: "horizontal",
											name: "direction",
											labelHeight: selectLabelHeight,
											offsetLeft: 0,
											offsetTop: 10,
											label: unescape("%u6C34%u5E73")
										},
										{
											type: "newcolumn"
										},
										{
											type: "radio",
											position: "label-right",
											value: "vertical",
											name: "direction",
											labelHeight: selectLabelHeight,
											offsetLeft: 0,
											offsetTop: 10,
											label: unescape("%u5782%u76F4")
										}
									]
								},
								{
									type: "newcolumn"
								},
								{
									type: "fieldset",
									label: unescape("%u6587%u5B57%u65CB%u8F6C"),
									width: 80,
									offsetLeft: 10,
									offsetTop: 15,
									list: [{
										type: "input",
										name: "font_rotation",
										labelWidth: 50,
										labelHeight: 26,
										inputWidth: 50,
										offsetLeft: 0,
										offsetTop: 10,
										position: "label-left",
										label: "",
										value: "0"
									}]
								}
							]
						},
						{
							type: "block",
							blockOffset: 0,
							width: 420,
							offsetTop: 2,
							list: [{
								type: "fieldset",
								label: unescape("%u6548%u679C"),
								width: 420,
								offsetLeft: 0,
								offsetTop: 20,
								list: [{
									type: "block",
									blockOffset: 0,
									width: 360,
									offsetTop: 2,
									list: [{
											type: "radio",
											position: "label-right",
											value: "none",
											name: "font_effect",
											labelHeight: 20,
											offsetLeft: 5,
											offsetTop: 2,
											label: unescape("%u65E0%u6548%u679C")
										},
										{
											type: "newcolumn"
										},
										{
											type: "radio",
											position: "label-right",
											value: "overline",
											name: "font_effect",
											labelHeight: 20,
											offsetLeft: 24,
											offsetTop: 2,
											label: unescape("%u4E0A%u5212%u7EBF")
										},
										{
											type: "newcolumn"
										},
										{
											type: "radio",
											position: "label-right",
											value: "line-through",
											name: "font_effect",
											labelHeight: 20,
											offsetLeft: 24,
											offsetTop: 2,
											label: unescape("%u5220%u9664%u7EBF")
										},
										{
											type: "newcolumn"
										},
										{
											type: "radio",
											position: "label-right",
											value: "underline",
											name: "font_effect",
											labelHeight: 20,
											offsetLeft: 24,
											offsetTop: 2,
											label: unescape("%u4E0B%u5212%u7EBF")
										}
									]
								}]
							}]
						}
					]
				},
				{
					type: "block",
					offsetLeft: btnOffsetLeft,
					list: [{
							type: "button",
							width: 50,
							name: "confirm",
							value: unescape("%u786E%u5B9A"),
							offsetTop: 4,
							offsetLeft: 10
						},
						{
							type: "newcolumn"
						},
						{
							type: "button",
							width: 50,
							name: "cancel",
							value: unescape("%u53D6%u6D88"),
							offsetTop: 4,
							offsetLeft: 10
						}
					]
				}
			]);

			if (_isTopWindow) {
				fontColorPicker = new dhtmlXColorPicker(dhxFontForm.getInput("font_color"));
			} else {
				fontColorPicker = new dhtmlxPopWindow.dhtmlXColorPicker(dhxFontForm.getInput("font_color"));
			}
			fontColorPicker.loadUserLanguage("ch");
			//对话框中图表背景色颜色改变
			fontColorPicker.attachEvent("onSelect", function(color, node) {
				//your code here
				//                alert(color);
				node.style.color = color;
			});
			dhxFontSetWindow.hide();

			dhxFontSetWindow.attachEvent("onShow", function(win) {

				var title = chart.title,
					legend = chart.legend,
					axes = chart.axes;
				isChanged = false;

				if (chart._hoverFontFrame) {
					chart._hoverFontFrame.css({
						display: 'block'
					});
				}
				dhxFontForm.disableItem("direction", "horizontal");
				dhxFontForm.disableItem("direction", "vertical");

				dhxFontForm.setItemValue("font_family", fontStyleObj.fontFamily || "Microsoft YaHei");
				dhxFontForm.setItemValue("font_size", (H.pick(fontStyleObj.fontSize, 12) + "").replace("px", ""));
				_setColorPickerColor(fontColorPicker, fontStyleObj.color || "#707070");
				dhxFontForm.setItemValue("font_color", fontStyleObj.color || "#707070");

				dhxFontForm.setItemValue("font_italic", fontStyleObj.fontStyle == "italic");
				dhxFontForm.setItemValue("font_weight", fontStyleObj.fontWeight == "bold" || fontStyleObj.fontWeight == 700 ||
					fontStyleObj.fontWeight == 900);
				dhxFontForm.setItemValue("font_rotation", fontStyleObj.rotation || "0");

				dhxFontForm.setItemValue("font_effect", fontStyleObj.textDecoration || "none");
			});

			dhxFontSetWindow.attachEvent("onMoveFinish", function(win) {
				if (chart._hoverFontFrame) {
					var position = win.getPosition();
					chart._hoverFontFrame.css({
						top: position[1] + "px",
						left: position[0] + "px"
					});
				}
			});

			dhxFontSetWindow.attachEvent("onClose", function(win) {
				if (chart._hoverFontFrame) {
					chart._hoverFontFrame.css({
						display: 'none'
					});
				}
				win.hide();
			});
			dhxFontForm.attachEvent("onButtonClick", function(name) {
				var isSetToSeries,
					inputMarkerStep,
					inputDataLabelStep;

				if (name == "confirm") {
					if (chart._hoverFontFrame) {
						chart._hoverFontFrame.css({
							display: 'none'
						});
					}
					dhxFontSetWindow.hide();
					var fontFamilyCombo = dhxFontForm.getCombo("font_family"),
						fontSizeCombo = dhxFontForm.getCombo("font_size");

					if (fontFamilyCombo.getSelectedText() != "") {
						fontStyleObj.fontFamily = fontFamilyCombo.getSelectedValue();
					}
					fontStyleObj.fontSize = parseInt(fontSizeCombo.getSelectedText()) + "px";
					fontStyleObj.color = fontColorPicker.getSelectedColor()[0];

					fontStyleObj.fontWeight = dhxFontForm.isItemChecked("font_weight") ? "bold" : "normal";
					fontStyleObj.fontStyle = dhxFontForm.isItemChecked("font_italic") ? "italic" : "normal";

					fontStyleObj.rotation = parseInt(dhxFontForm.getInput("font_rotation").value);

					if (dhxFontForm.isItemChecked("font_effect", "overline")) {
						fontStyleObj.textDecoration = "overline";
					} else if (dhxFontForm.isItemChecked("font_effect", "line-through")) {
						fontStyleObj.textDecoration = "line-through";
					} else if (dhxFontForm.isItemChecked("font_effect", "underline")) {
						fontStyleObj.textDecoration = "underline";
					} else {
						fontStyleObj.textDecoration = "none";
					}
				} else if (name == "cancel") {
					if (chart._hoverFontFrame) {
						chart._hoverFontFrame.css({
							display: 'none'
						});
					}
					dhxFontSetWindow.hide();
				}
			});
		};
	};

	//初始化坐标轴设置对话框
	Chart.prototype.initAxisSetWindow = function() {
		var chart = this,
			dhxWindow = chart.dhxWindow,
			dhxAxisSetWindow = chart.dhxAxisSetWindow,
			dhxAxisForm = chart.dhxAxisForm,
			lineColorPicker,
			isChanged;

		initColorPickerLanguage();

		if (!dhxWindow) {
			if (_isTopWindow) {
				chart.dhxWindow = dhxWindow = new dhtmlXWindows();
			} else {
				chart.dhxWindow = dhxWindow = new dhtmlxPopWindow.dhtmlXWindows();
			}
			dhxWindow.vp.style.overflow = "auto";
		}
		if (!dhxAxisSetWindow) {
			var axisWindowWidth = 680,
				axisWindowHeight = 500,
				styleFieldSetWidth = 200,
				tickCheckBoxLabelHeight = 18,
				axisNamePosOffsetTop = 6,
				buttonOffsetLeft = 360;

			var _browser = getBrowserType();
			chart.dhxAxisSetWindow = dhxAxisSetWindow = dhxWindow.createWindow("axisSetWindow", 0, 0, axisWindowWidth,
				axisWindowHeight);
			dhxAxisSetWindow.setText(unescape("%u5750%u6807%u8F74%u8BBE%u7F6E"));
			dhxAxisSetWindow.denyResize();
			dhxAxisForm = chart.dhxAxisForm = dhxAxisSetWindow.attachForm([{
					type: "settings",
					position: "label-left"
				},
				{
					type: "block",
					width: 670,
					list: [{
							type: "fieldset",
							label: unescape("%u6837%u5F0F"),
							width: 170,
							offsetLeft: 0,
							offsetTop: 10,
							list: [{
									type: "block",
									width: 130,
									blockOffset: 0,
									list: [{
										type: "combo",
										name: "line_width",
										label: unescape("%u7EBF%u5BBD%3A"),
										labelWidth: 36,
										labelHeight: 18,
										position: "label-left",
										width: 80,
										comboType: "image",
										options: [
											// {value: 0, text: "0px", img:path +  "/graphics/lineWidth/1px.png"},
											{
												value: 1,
												text: "1px",
												img: path + "/graphics/lineWidth/1px.png"
											},
											{
												value: 2,
												text: "2px",
												img: path + "/graphics/lineWidth/2px.png"
											},
											{
												value: 3,
												text: "3px",
												img: path + "/graphics/lineWidth/3px.png"
											},
											{
												value: 4,
												text: "4px",
												img: path + "/graphics/lineWidth/4px.png"
											},
											{
												value: 5,
												text: "5px",
												img: path + "/graphics/lineWidth/5px.png"
											},
											{
												value: 6,
												text: "6px",
												img: path + "/graphics/lineWidth/6px.png"
											},
											{
												value: 7,
												text: "7px",
												img: path + "/graphics/lineWidth/7px.png"
											}
										]
									}]
								},
								{
									type: "block",
									width: 130,
									blockOffset: 0,
									list: [{
										type: "combo",
										name: "line_style",
										label: unescape("%u7EBF%u578B%3A"),
										labelWidth: 36,
										labelHeight: 18,
										position: "label-left",
										width: 80,
										comboType: "image",
										options: [{
												value: "Solid",
												text: unescape("%u5B9E%u7EBF"),
												img: path + "/graphics/lineStyle/0.gif"
											},
											{
												value: "ShortDash",
												text: unescape("%u77ED%u5212%u7EBF"),
												img: path + "/graphics/lineStyle/1.gif"
											},
											{
												value: "Dash",
												text: unescape("%u4E2D%u5212%u7EBF"),
												img: path + "/graphics/lineStyle/2.gif"
											},
											{
												value: "LongDash",
												text: unescape("%u957F%u5212%u7EBF"),
												img: path + "/graphics/lineStyle/3.gif"
											},
											{
												value: "ShortDot",
												text: unescape("%u70B9%u7EBF"),
												img: path + "/graphics/lineStyle/4.gif"
											},
											{
												value: "Dot",
												text: unescape("%u957F%u70B9%u7EBF"),
												img: path + "/graphics/lineStyle/5.gif"
											},
											{
												value: "ShortDashDot",
												text: unescape("%u70B9%u5212%u7EBF"),
												img: path + "/graphics/lineStyle/6.gif"
											},
											{
												value: "DashDot",
												text: unescape("%u4E2D%u70B9%u5212%u7EBF"),
												img: path + "/graphics/lineStyle/7.gif"
											},
											{
												value: "LongDashDot",
												text: unescape("%u957F%u70B9%u5212%u7EBF"),
												img: path + "/graphics/lineStyle/8.gif"
											},
											{
												value: "ShortDashDotDot",
												text: unescape("%u53CC%u70B9%u5212%u7EBF"),
												img: path + "/graphics/lineStyle/9.gif"
											},
											{
												value: "LongDashDotDot",
												text: unescape("%u957F%u53CC%u70B9%u5212%u7EBF"),
												img: path + "/graphics/lineStyle/10.gif"
											}
										]
									}]
								},
								{
									type: "block",
									width: 130,
									blockOffset: 0,
									list: [{
											type: "input",
											name: "axis_line_color",
											width: 80,
											labelWidth: 36,
											offsetLeft: 0,
											labelHeight: 18,
											inputWidth: 70,
											position: "label-left",
											label: unescape("%u7EBF%u8272%3A"),
											value: H.pick(currentAxis && currentAxis.options.lineColor, "#C0D0E0")
										}
										//                            {type: "colorpicker", name: "axis_line_color",labelWidth:36,labelHeight:18,position:"label-left", inputWidth: 70, offsetLeft:0, label: "线色:", value: "#2a87eb", enableCustomColors: "1"}
									]
								},
								{
									type: "block",
									width: 130,
									blockOffset: 0,
									list: [{
										type: "checkbox",
										name: "axis_show_main_grid",
										position: "label-right",
										labelHeight: tickCheckBoxLabelHeight,
										label: unescape("%u663E%u793A%u4E3B%u7F51%u683C")
									}]
								},
								{
									type: "block",
									width: 130,
									blockOffset: 0,
									list: [{
										type: "checkbox",
										name: "axis_show_minor_grid",
										position: "label-right",
										labelHeight: tickCheckBoxLabelHeight,
										label: unescape("%u663E%u793A%u6B21%u7F51%u683C")
									}]
								},
								{
									type: "block",
									width: 130,
									blockOffset: 0,
									list: [{
										type: "input",
										name: "axis_minor_tick_divide",
										labelWidth: 80,
										labelHeight: 18,
										width: 30,
										offsetLeft: 0,
										position: "label-left",
										label: unescape("%u6B21%u523B%u5EA6%u5206%u5272%u6570%3A"),
										value: "1"
									}]
								}
							]
						},
						{
							type: "newcolumn"
						},
						{
							type: "fieldset",
							label: unescape("%u523B%u5EA6"),
							width: 220,
							offsetLeft: 15,
							offsetTop: 10,
							list: [{
									type: "block",
									width: 170,
									blockOffset: 0,
									list: [{
										type: "checkbox",
										position: "label-right",
										name: "auto_adjust",
										labelHeight: 20,
										label: unescape("%u81EA%u52A8%u6807%u6CE8")
									}]
								},
								{
									type: "block",
									width: 170,
									blockOffset: 0,
									list: [{
										type: "input",
										name: "axis_min",
										labelWidth: 50,
										labelHeight: 18,
										width: 100,
										offsetLeft: 0,
										offsetTop: 17,
										position: "label-left",
										label: unescape("%u6700%u5C0F%u503C%3A"),
										value: "1"
									}]
								},
								{
									type: "block",
									width: 170,
									blockOffset: 0,
									list: [{
										type: "input",
										name: "axis_max",
										labelWidth: 50,
										labelHeight: 18,
										width: 100,
										offsetLeft: 0,
										offsetTop: 13,
										position: "label-left",
										label: unescape("%u6700%u5927%u503C%3A"),
										value: "1"
									}]
								},
								{
									type: "block",
									width: 170,
									blockOffset: 0,
									list: [{
										type: "input",
										name: "axis_interval",
										labelWidth: 50,
										labelHeight: 18,
										width: 100,
										offsetLeft: 0,
										offsetTop: 13,
										position: "label-left",
										label: unescape("%u95F4%u9694%u503C%3A"),
										value: "1"
									}]
								},
								{
									type: "block",
									width: 170,
									blockOffset: 0,
									list: [{
										type: "input",
										name: "axis_decimal",
										labelWidth: 50,
										labelHeight: 18,
										width: 100,
										offsetLeft: 0,
										offsetTop: 13,
										position: "label-left",
										label: unescape("%u5C0F%u6570%u4F4D%3A"),
										value: "1"
									}]
								}
							]
						},
						{
							type: "newcolumn"
						},
						{
							type: "fieldset",
							label: unescape("%u8F74%u540D"),
							width: 180,
							offsetLeft: 10,
							offsetTop: 10,
							list: [{
									type: "block",
									width: 160,
									blockOffset: 10,
									list: [{
											type: "checkbox",
											position: "label-right",
											name: "axis_show_axis_name",
											width: 45,
											labelHeight: 18,
											label: unescape("%u663E%u793A")
										},
										{
											type: "newcolumn"
										},
										{
											type: "button",
											width: 40,
											name: "axis_font_set",
											value: unescape("%u5B57%u4F53"),
											offsetTop: -5,
											offsetLeft: 10
										}
									]
								},
								{
									type: "block",
									name: "axis_name_sets",
									width: 170,
									blockOffset: 0,
									offsetTop: axisNamePosOffsetTop,
									list: [{
											type: "label",
											label: unescape("%u8F74%u540D%u4F4D%u7F6E%3A"),
											name: "axis_name_position_label",
											offsetLeft: 0,
											offsetTop: 23,
											labelWidth: 80,
											labelHeight: 18
										},
										{
											type: "newcolumn"
										},
										//{type: "",  width: 50, blockOffset: 0, list: [
										{
											type: "radio",
											position: "label-right",
											value: "high",
											name: "axis_name_position",
											labelHeight: 18,
											offsetLeft: 0,
											offsetTop: 0,
											label: unescape("%u9876%u90E8")
										},
										//]},
										//{type: "block",  width: 50, blockOffset: 0, list: [
										{
											type: "radio",
											position: "label-right",
											value: "middle",
											name: "axis_name_position",
											labelHeight: 18,
											offsetLeft: 0,
											offsetTop: 0,
											label: unescape("%u5C45%u4E2D")
										},
										//]},
										//{type: "block",  width: 50, blockOffset: 0, list: [
										{
											type: "radio",
											position: "label-right",
											value: "low",
											name: "axis_name_position",
											labelHeight: 18,
											offsetLeft: 0,
											offsetTop: 0,
											label: unescape("%u5E95%u90E8")
										}
										//]}
									]
								},
								{
									type: "block",
									width: 160,
									blockOffset: 0,
									list: [{
										type: "input",
										name: "axis_name_x_offset",
										labelWidth: 60,
										labelHeight: 18,
										width: 50,
										offsetLeft: 4,
										offsetTop: 10,
										position: "label-left",
										label: unescape("%u6A2A%u5411%u504F%u79FB%3A"),
										value: "1"
									}]
								},
								{
									type: "block",
									width: 160,
									blockOffset: 0,
									list: [{
										type: "input",
										name: "axis_name_y_offset",
										labelWidth: 60,
										labelHeight: 18,
										width: 50,
										offsetLeft: 4,
										offsetTop: 10,
										position: "label-left",
										label: unescape("%u7EB5%u5411%u504F%u79FB%3A"),
										value: "1"
									}]
								}
							]
						}
					]
				},
				{
					type: "block",
					width: 670,
					list: [{
						type: "fieldset",
						label: unescape("%u8BBE%u7F6E"),
						width: 630,
						offsetLeft: 0,
						offsetTop: 5,
						list: [{
								type: "block",
								blockOffset: 0,
								width: 580,
								list: [{
										type: "input",
										name: "axis_y_offset",
										labelWidth: 70,
										labelHeight: 18,
										width: 50,
										offsetLeft: 4,
										offsetTop: 9,
										position: "label-left",
										label: unescape("%u7EB5%u8F74%u504F%u79FB%u91CF%3A"),
										value: "1"
									},
									{
										type: "newcolumn"
									},
									{
										type: "checkbox",
										position: "label-right",
										name: "axis_value_inverse",
										labelHeight: 18,
										offsetLeft: 60,
										offsetTop: 9,
										label: unescape("%u6570%u503C%u6B21%u5E8F%u53CD%u8F6C")
									},
									{
										type: "newcolumn"
									},
									{
										type: "checkbox",
										position: "label-right",
										name: "axis_show",
										labelHeight: 18,
										offsetLeft: 60,
										offsetTop: 9,
										label: unescape("%u5750%u6807%u8F74%u53EF%u89C1")
									}
								]
							},
							{
								type: "block",
								blockOffset: 0,
								width: 580,
								list: [{
										type: "input",
										name: "axis_cross_value",
										labelWidth: 70,
										labelHeight: 18,
										width: 50,
										offsetLeft: 4,
										offsetTop: 9,
										position: "label-left",
										label: unescape("%u7EB5%u8F74%u4EA4%u53C9%u503C%3A"),
										value: "1"
									},
									{
										type: "newcolumn"
									},
									{
										type: "checkbox",
										position: "label-right",
										name: "is_log_axis",
										labelHeight: 18,
										offsetLeft: 60,
										offsetTop: 9,
										label: unescape("%u5BF9%u6570%u523B%u5EA6Log%3A")
									},
									{
										type: "newcolumn"
									},
									{
										type: "input",
										name: "axis_log_set",
										labelWidth: 60,
										labelHeight: 18,
										width: 60,
										offsetLeft: 4,
										offsetTop: 9,
										position: "label-left",
										label: "",
										value: "1"
									}
								]
							}
						]
					}]
				},

				{
					type: "block",
					offsetLeft: buttonOffsetLeft,
					list: [{
							type: "button",
							width: 50,
							name: "confirm",
							value: unescape("%u786E%u5B9A"),
							offsetTop: 10,
							offsetLeft: 20
						},
						{
							type: "newcolumn"
						},
						{
							type: "button",
							width: 50,
							name: "cancel",
							value: unescape("%u53D6%u6D88"),
							offsetTop: 10,
							offsetLeft: 20
						}
					]
				}
			]);

			if (_isTopWindow) {
				lineColorPicker = new dhtmlXColorPicker(dhxAxisForm.getInput("axis_line_color"));
			} else {
				lineColorPicker = new dhtmlxPopWindow.dhtmlXColorPicker(dhxAxisForm.getInput("axis_line_color"));
			}

			lineColorPicker.loadUserLanguage("ch");
			lineColorPicker.attachEvent("onSelect", function(color, node) {
				node.style.color = color;
			});
			dhxAxisSetWindow.hide();

			dhxAxisSetWindow.attachEvent("onShow", function(win) {

				var options = currentAxis.options,
					axisLineWidthCombo = dhxAxisForm.getCombo("line_width"),
					axisLineStyleCombo = dhxAxisForm.getCombo("line_style")
				//                    lineColorPicker,
				;

				if (chart._hoverFrame) {
					chart._hoverFrame.css({
						display: 'block'
					});
				}
				isChanged = false;
				fontStyleObj = options.title.style || {};
				fontStyleObj.rotation = options.title.rotation || 0;

				dhxAxisForm.disableItem("line_style"); //不支持轴线的样式修改
				dhxAxisForm.disableItem("axis_log_set");
				dhxAxisForm.disableItem("is_log_axis");
				dhxAxisForm.disableItem("axis_show_minor_grid");
				dhxAxisForm.disableItem("axis_minor_tick_divide");

				if (currentAxis.isXAxis) {
					dhxAxisForm.setItemLabel("axis_y_offset", unescape("%u6A2A%u8F74%u504F%u79FB%u91CF"));
					dhxAxisForm.setItemLabel("axis_cross_value", unescape("%u6A2A%u8F74%u4EA4%u53C9%u503C"));
				} else {
					dhxAxisForm.setItemLabel("axis_y_offset", unescape("%u7EB5%u8F74%u504F%u79FB%u91CF"));
					dhxAxisForm.setItemLabel("axis_cross_value", unescape("%u7EB5%u8F74%u4EA4%u53C9%u503C"));
				}

				//线宽
				dhxAxisForm.setItemValue("line_width", H.pick(options.lineWidth, 1));
				//                axisLineWidthCombo.selectOption(H.pick(options.lineWidth,1));
				//线型
				axisLineStyleCombo.selectOption(0);
				//线色
				_setColorPickerColor(lineColorPicker, options.lineColor || "#C0D0E0");
				dhxAxisForm.setItemValue("axis_line_color", options.lineColor || "#C0D0E0");

				dhxAxisForm.setItemValue("axis_show_main_grid", !!currentAxis.options.gridLineWidth);
				dhxAxisForm.setItemValue("axis_show_minor_grid", false);
				dhxAxisForm.setItemValue("axis_minor_tick_divide", 5);

				var isAutoAdjust = !currentAxis.options.min && !currentAxis.options.max;
				if (isAutoAdjust) {
					dhxAxisForm.disableItem("axis_min");
					dhxAxisForm.disableItem("axis_max");
					dhxAxisForm.disableItem("axis_interval");
					dhxAxisForm.disableItem("axis_decimal");
				} else {
					dhxAxisForm.enableItem("axis_min");
					dhxAxisForm.enableItem("axis_max");
					dhxAxisForm.enableItem("axis_interval");
					dhxAxisForm.disableItem("axis_decimal");
				}
				dhxAxisForm.disableItem("axis_cross_value");

				dhxAxisForm.setItemValue("auto_adjust", isAutoAdjust);
				dhxAxisForm.setItemValue("axis_min", currentAxis.min);
				dhxAxisForm.setItemValue("axis_max", currentAxis.max);
				dhxAxisForm.setItemValue("axis_interval", currentAxis.tickInterval);
				dhxAxisForm.setItemValue("axis_decimal", 0);

				dhxAxisForm.setItemValue("axis_show_axis_name", !!currentAxis.axisTitle);
				if (!!currentAxis.axisTitle) {
					dhxAxisForm.enableItem("axis_font_set");
					dhxAxisForm.enableItem("axis_name_position_label");
					dhxAxisForm.enableItem("axis_name_position", "low");
					dhxAxisForm.enableItem("axis_name_position", "middle");
					dhxAxisForm.enableItem("axis_name_position", "high");
					dhxAxisForm.enableItem("axis_name_x_offset");
					dhxAxisForm.enableItem("axis_name_y_offset");
				} else {
					dhxAxisForm.disableItem("axis_font_set");
					dhxAxisForm.disableItem("axis_name_position_label");
					dhxAxisForm.disableItem("axis_name_position", "low");
					dhxAxisForm.disableItem("axis_name_position", "middle");
					dhxAxisForm.disableItem("axis_name_position", "high");
					dhxAxisForm.disableItem("axis_name_x_offset");
					dhxAxisForm.disableItem("axis_name_y_offset");
				}

				dhxAxisForm.setItemValue("axis_name_position", currentAxis.options.title.align); // bottom middle top

				dhxAxisForm.setItemValue("axis_name_x_offset", options.title.x || 0);
				dhxAxisForm.setItemValue("axis_name_y_offset", options.title.y || 0);

				dhxAxisForm.setItemValue("axis_y_offset", options.offset || 0);
				dhxAxisForm.setItemValue("axis_value_inverse", options.reversed);
				var isShowAxis = false;
				if (options.lineWidth || options.tickWidth || (options.labels && options.labels.enabled)) {
					isShowAxis = true;
				}
				dhxAxisForm.setItemValue("axis_show", isShowAxis);
				dhxAxisForm.setItemValue("axis_cross_value", 0);
			});

			dhxAxisSetWindow.attachEvent("onClose", function(win) {
				if (chart._hoverFrame) {
					chart._hoverFrame.css({
						display: 'none'
					});
				}
				win.hide();
			});

			dhxAxisSetWindow.attachEvent("onMoveFinish", function(win) {
				if (chart._hoverFrame) {
					var position = win.getPosition();
					chart._hoverFrame.css({
						top: position[1] + "px",
						left: position[0] + "px"
					});
				}
			});

			dhxAxisForm.attachEvent("onChange", function(name, value) {
				var isEnabled;
				isChanged = true;
				switch (name) {
					case "auto_adjust":
						isEnabled = dhxAxisForm.isItemChecked(name);
						if (isEnabled) {
							dhxAxisForm.disableItem("axis_min");
							dhxAxisForm.disableItem("axis_max");
							dhxAxisForm.disableItem("axis_interval");
							dhxAxisForm.disableItem("axis_decimal");
						} else {
							dhxAxisForm.enableItem("axis_min");
							dhxAxisForm.enableItem("axis_max");
							dhxAxisForm.enableItem("axis_interval");
							dhxAxisForm.enableItem("axis_decimal");
						}
						break;
					case "axis_show_axis_name":
						isEnabled = dhxAxisForm.isItemChecked(name);
						if (isEnabled) {
							dhxAxisForm.enableItem("axis_font_set");
							dhxAxisForm.enableItem("axis_name_position_label");
							dhxAxisForm.enableItem("axis_name_position", "low");
							dhxAxisForm.enableItem("axis_name_position", "middle");
							dhxAxisForm.enableItem("axis_name_position", "high");
							dhxAxisForm.enableItem("axis_name_x_offset");
							dhxAxisForm.enableItem("axis_name_y_offset");
						} else {
							dhxAxisForm.disableItem("axis_font_set");
							dhxAxisForm.disableItem("axis_name_position_label");
							dhxAxisForm.disableItem("axis_name_position", "low");
							dhxAxisForm.disableItem("axis_name_position", "middle");
							dhxAxisForm.disableItem("axis_name_position", "high");
							dhxAxisForm.disableItem("axis_name_x_offset");
							dhxAxisForm.disableItem("axis_name_y_offset");
						}
						break;
				}
			});


			dhxAxisForm.attachEvent("onButtonClick", function(name) {
				var isShow = dhxAxisForm.isItemChecked("axis_show"),
					isAutoAdjust = dhxAxisForm.isItemChecked("auto_adjust"),
					minInput = dhxAxisForm.getInput("axis_min"),
					maxInput = dhxAxisForm.getInput("axis_max"),
					intervalInput = dhxAxisForm.getInput("axis_interval"),
					axisNamePos;

				if (name == "confirm") {
					if (chart._hoverFrame) {
						chart._hoverFrame.css({
							display: 'none'
						});
					}
					dhxAxisSetWindow.hide();
					var histoty_Opt = H.merge(currentAxis.options, chart.findAxisByIdInHistory(currentAxis.options.id));
					histoty_Opt.lineWidth = parseInt(dhxAxisForm.getCombo("line_width").getSelectedValue());

					if (currentAxis) {
						if (dhxAxisForm.isItemChecked("axis_name_position", "high")) {
							axisNamePos = "high";
						} else if (dhxAxisForm.isItemChecked("axis_name_position", "low")) {
							axisNamePos = "low";
						} else {
							axisNamePos = "middle";
						}
						currentAxis.update({
							lineWidth: isShow ? histoty_Opt.lineWidth : 0,
							lineColor: lineColorPicker.getSelectedColor()[0],
							tickWidth: isShow ? histoty_Opt.tickWidth : 0,
							gridLineWidth: dhxAxisForm.isItemChecked("axis_show_main_grid") ? (histoty_Opt && histoty_Opt.gridLineWidth) :
								0,
							labels: {
								enabled: isShow
							},
							min: !isAutoAdjust ? parseFloat(minInput.value) : null,
							max: !isAutoAdjust ? parseFloat(maxInput.value) : null,
							tickInterval: !isAutoAdjust ? parseFloat(intervalInput.value) : null,
							offset: parseInt(dhxAxisForm.getInput("axis_y_offset").value),
							reversed: dhxAxisForm.isItemChecked("axis_value_inverse"),
							title: {
								align: axisNamePos,
								enabled: dhxAxisForm.isItemChecked("axis_show_axis_name") && isShow,
								rotation: fontStyleObj.rotation,
								style: fontStyleObj,
								x: parseInt(dhxAxisForm.getInput("axis_name_x_offset").value),
								y: parseInt(dhxAxisForm.getInput("axis_name_y_offset").value)
							}
						});

						var history_axis = chart.findAxisByIdInHistory(currentAxis.options.id);
						if (history_axis) {
							history_axis.title = history_axis.title || {};
							history_axis.title.enabled = dhxAxisForm.isItemChecked("axis_show_axis_name");
						}

						var export_axis = chart.findAxisByIdInExport(currentAxis.options.id);
						if (export_axis) {

							export_axis.lineWidth = isShow ? histoty_Opt.lineWidth : 0;
							export_axis.lineColor = lineColorPicker.getSelectedColor()[0];
							export_axis.tickWidth = isShow ? histoty_Opt.tickWidth : 0;
							export_axis.labels = export_axis.labels || {};
							export_axis.labels.enabled = isShow;

							export_axis.min = !isAutoAdjust ? parseInt(minInput.value) : null;
							export_axis.max = !isAutoAdjust ? parseInt(maxInput.value) : null;
							export_axis.tickInterval = !isAutoAdjust ? parseInt(intervalInput.value) : null;
							export_axis.offset = parseInt(dhxAxisForm.getInput("axis_y_offset").value);
							export_axis.reversed = dhxAxisForm.isItemChecked("axis_value_inverse");
							export_axis.title = export_axis.title || {};

							export_axis.title.align = axisNamePos;
							export_axis.title.enabled = dhxAxisForm.isItemChecked("axis_show_axis_name");
							export_axis.title.rotation = fontStyleObj.rotation;

							export_axis.title.x = parseInt(dhxAxisForm.getInput("axis_name_x_offset").value);
							export_axis.title.y = parseInt(dhxAxisForm.getInput("axis_name_y_offset").value);

							export_axis.title.style = export_axis.title.style || {};
							if (fontStyleObj.fontWeight) {
								export_axis.title.style.fontWeight = fontStyleObj.fontWeight || "normal";
							}
							if (fontStyleObj.fontStyle) {
								export_axis.title.style.fontStyle = fontStyleObj.fontStyle || "normal";
							}
							if (fontStyleObj.fontSize) {
								export_axis.title.style.fontSize = fontStyleObj.fontSize || "16px";
							}
							if (fontStyleObj.color) {
								export_axis.title.style.color = fontStyleObj.color || "#333333";
							}
							if (fontStyleObj.textDecoration) {
								export_axis.title.style.textDecoration = fontStyleObj.textDecoration || "none";
							}
						}
					}
					// addAxesDoubleClick();

					chart.addAxesDoubleClick();
				} else if (name == "cancel") {
					if (chart._hoverFrame) {
						chart._hoverFrame.css({
							display: 'none'
						});
					}
					dhxAxisSetWindow.hide();
				} else if (name == "axis_font_set") {
					var dhxFontSetWindow = chart.dhxFontSetWindow;
					if (dhxFontSetWindow && dhxFontSetWindow.isHidden()) {
						//var pos = dhxAxisSetWindow.getPosition();
						var x = document.body.clientWidth / 2 - 195;
						dhxFontSetWindow.setPosition(x, 60);
						dhxFontSetWindow.bringToTop();
						if (chart._hoverFontFrame) {
							var dimension = dhxFontSetWindow.getDimension();
							chart._hoverFontFrame.css({
								top: pos[1] + 20 + "px",
								left: pos[0] + 20 + "px",
								width: dimension[0] + "px",
								height: dimension[1] + "px"
							})
						}
						dhxFontSetWindow.show();
					}
				}
			});
		};
	};

	//初始化序列设置对话框
	Chart.prototype.initSeriesSetWindow = function() {
		var chart = this,
			dhxWindow = chart.dhxWindow,
			dhxSeriesSetWindow = chart.dhxSeriesSetWindow,
			dhxSeriesForm = chart.dhxSeriesForm,
			lineColorPicker,
			markerLineColorPicker,
			markerFillColorPicker,
			yAxis = chart.options.yAxis;
			var allAxisOptions = [];
			var reg = /<\/?.+?\/?>/g;
			
			for (var i = 0; i < yAxis.length; i++) {
				var axisOptions = {};
				axisOptions.value = yAxis[i].id;
				axisOptions.text = yAxis[i].title.text.replace(reg, "");
				allAxisOptions.push(axisOptions)
			}

		initColorPickerLanguage();

		if (!dhxWindow) {
			if (_isTopWindow) {
				chart.dhxWindow = dhxWindow = new dhtmlXWindows();
			} else {
				chart.dhxWindow = dhxWindow = new dhtmlxPopWindow.dhtmlXWindows();
			}
			dhxWindow.vp.style.overflow = "auto";
		}
		if (!dhxSeriesSetWindow) {
			var titleWindowWidth = 410,
				titleWindowHeight = 520;

			chart.dhxSeriesSetWindow = dhxSeriesSetWindow = dhxWindow.createWindow("seriesSetWindow", 0, 0, titleWindowWidth,
				titleWindowHeight);
			dhxSeriesSetWindow.setText('序列设置');
			dhxSeriesSetWindow.denyResize();
			dhxSeriesForm = chart.dhxSeriesForm = dhxSeriesSetWindow.attachForm([
				{
					type: "block",
					offsetLeft: 0,
					list: [{
							type: "combo",
							position: "label-left",
							label: "类型:",
							labelWidth: 50,
							labelHeight: 18,
							offsetTop: 10,
							offsetLeft: 0,
							width: 90,
							name: "series_type",
							options: [{
									value: "line",
									text: "折线图"
								},
								{
									value: 'spline',
									text: "平滑折线图"
								},
								{
									value: 'area',
									text: "面积图"
								},
								{
									value: 'areaspline',
									text: "平滑面积图"
								},
								// {value: 'bar', text: "条形图"},
								{
									value: 'column',
									text: "柱状图"
								},
								{
									value: 'scatter',
									text: "散点图"
								},
								{
									value: 'pie',
									text: "饼图"
								}
							]
						},
						{
							type: "newcolumn"
						},
						{
							type: "combo",
							position: "label-left",
							label: "所属Y轴:",
							labelWidth: 60,
							labelHeight: 18,
							offsetTop: 10,
							offsetLeft: 20,
							width: 120,
							name: "apply-yAxis",
							options: allAxisOptions
						}
					]
				},
				{
					type: "block",
					offsetLeft: 5,
					blockOffset: 1,
					width: 400,
					list: [{
						type: "fieldset",
						offsetLeft: 1,
						blockOffset: 1,
						label: unescape("%u7EBF%u663E%u793A"),
						width: 340,
						offsetTop: 10,
						list: [{
							type: "block",
							offsetLeft: 1,
							blockOffset: 1,
							width: 340,
							list: [{
									type: "block",
									name: "line_style_set",
									blockOffset: 0,
									list: [{
											type: "combo",
											position: "label-left",
											label: unescape("%u7EBF%26nbsp%3B%26nbsp%3B%26nbsp%3B%u5BBD%3A"),
											labelWidth: 50,
											labelHeight: 18,
											offsetLeft: 0,
											width: 90,
											comboType: "image",
											name: "line_width",
											options: [
												// {value: 0, text: "1px", img:path +  "/graphics/lineWidth/1px.png"},
												{
													value: 1,
													text: "1px",
													img: path + "/graphics/lineWidth/2px.png"
												},
												{
													value: 2,
													text: "2px",
													img: path + "/graphics/lineWidth/3px.png"
												},
												{
													value: 3,
													text: "3px",
													img: path + "/graphics/lineWidth/4px.png"
												},
												{
													value: 4,
													text: "4px",
													img: path + "/graphics/lineWidth/5px.png"
												},
												{
													value: 5,
													text: "5px",
													img: path + "/graphics/lineWidth/6px.png"
												},
												{
													value: 6,
													text: "6px",
													img: path + "/graphics/lineWidth/7px.png"
												}
											]
										},
										{
											type: "newcolumn"
										},

										{
											type: "combo",
											position: "label-left",
											label: "线&nbsp;&nbsp;&nbsp;型：",
											labelWidth: 50,
											labelHeight: 18,
											offsetLeft: 10,
											width: 90,
											comboType: "image",
											name: "line_style",
											options: [{
													value: "Solid",
													text: unescape("%u5B9E%u7EBF"),
													img: path + "/graphics/lineStyle/0.gif"
												},
												{
													value: "ShortDash",
													text: unescape("%u77ED%u5212%u7EBF"),
													img: path + "/graphics/lineStyle/1.gif"
												},
												{
													value: "Dash",
													text: unescape("%u4E2D%u5212%u7EBF"),
													img: path + "/graphics/lineStyle/2.gif"
												},
												{
													value: "LongDash",
													text: unescape("%u957F%u5212%u7EBF"),
													img: path + "/graphics/lineStyle/3.gif"
												},
												{
													value: "ShortDot",
													text: unescape("%u70B9%u7EBF"),
													img: path + "/graphics/lineStyle/4.gif"
												},
												{
													value: "Dot",
													text: unescape("%u957F%u70B9%u7EBF"),
													img: path + "/graphics/lineStyle/5.gif"
												},
												{
													value: "ShortDashDot",
													text: unescape("%u70B9%u5212%u7EBF"),
													img: path + "/graphics/lineStyle/6.gif"
												},
												{
													value: "DashDot",
													text: unescape("%u4E2D%u70B9%u5212%u7EBF"),
													img: path + "/graphics/lineStyle/7.gif"
												},
												{
													value: "LongDashDot",
													text: unescape("%u957F%u70B9%u5212%u7EBF"),
													img: path + "/graphics/lineStyle/8.gif"
												},
												{
													value: "ShortDashDotDot",
													text: unescape("%u53CC%u70B9%u5212%u7EBF"),
													img: path + "/graphics/lineStyle/9.gif"
												},
												{
													value: "LongDashDotDot",
													text: unescape("%u957F%u53CC%u70B9%u5212%u7EBF"),
													img: path + "/graphics/lineStyle/10.gif"
												}
											]
										}
									]
								},
								{
									type: "block",
									name: "background_set",
									blockOffset: 0,
									list: [
										//                                {type: "colorpicker", position:"label-left", name:"title_background_color", labelWidth:45, labelHeight:18, inputWidth: 90, offsetLeft:20, offsetTop: 10, label: "背景色:", value: "#2a87eb", enableCustomColors: "1"},
										{
											type: "input",
											name: "line_color",
											width: 82,
											labelWidth: 50,
											labelHeight: 18,
											offsetLeft: 0,
											offsetTop: 5,
											position: "label-left",
											label: unescape("%u7EBF%26nbsp%3B%26nbsp%3B%26nbsp%3B%u8272%3A"),
											value: ""
										},
										{
											type: "newcolumn"
										},
										{
											type: "checkbox",
											position: "label-right",
											name: "axis-changen",
											labelHeight: 18,
											offsetLeft: 15,
											offsetTop: 1,
											label: '同步坐标轴'
										},
									]
								}
							]
						}]
					}]
				},
				{
					type: "block",
					offsetLeft: 5,
					blockOffset: 1,
					width: 400,
					list: [

						{
							type: "fieldset",
							offsetLeft: 1,
							blockOffset: 1,
							label: unescape("%u70B9%u663E%u793A"),
							width: 340,
							offsetTop: 10,
							list: [{
									type: "checkbox",
									position: "label-right",
									name: "marker_show",
									labelHeight: 18,
									offsetLeft: 0,
									offsetTop: 1,
									label: unescape("%u70B9%u7B26%u53F7")
								},
								{
									type: "block",
									offsetLeft: 1,
									blockOffset: 1,
									width: 340,
									list: [{
											type: "block",
											name: "marker_set",
											blockOffset: 0,
											list: [{
													type: "input",
													name: "marker_size",
													width: 80,
													labelWidth: 50,
													labelHeight: 18,
													offsetLeft: 0,
													position: "label-left",
													label: unescape("%u5927%26nbsp%3B%26nbsp%3B%26nbsp%3B%u5C0F%3A"),
													value: "1"
												},
												{
													type: "newcolumn"
												},
												{
													type: "combo",
													position: "label-left",
													label: unescape("%u6837%26nbsp%3B%26nbsp%3B%26nbsp%3B%u5F0F%3A"),
													labelWidth: 50,
													labelHeight: 18,
													offsetLeft: 15,
													width: 90,
													comboType: "image",
													name: "marker_style",
													options: [{
															value: "circle",
															text: unescape("%u5706%u5F62"),
															img: path + "/graphics/pointStyle/circle.png"
														},
														{
															value: 'diamond',
															text: unescape("%u83F1%u5F62"),
															img: path + "/graphics/pointStyle/diamond.png"
														},
														{
															value: 'square',
															text: unescape("%u65B9%u5F62"),
															img: path + "/graphics/pointStyle/square.png"
														},
														{
															value: 'triangle',
															text: unescape("%u4E09%u89D2%u5F62"),
															img: path + "/graphics/pointStyle/triangle.png"
														},
														{
															value: 'triangle-down',
															text: unescape("%u5012%u4E09%u89D2"),
															img: path + "/graphics/pointStyle/triangle-down.png"
														},
														{
															value: 'cross',
															text: unescape("%u52A0%u53F7"),
															img: path + "/graphics/pointStyle/cross.png"
														},
														{
															value: 'xcross',
															text: unescape("%u4E58%u53F7"),
															img: path + "/graphics/pointStyle/xcross.png"
														}
													]
												}
											]
										},
										{
											type: "block",
											name: "background_set",
											blockOffset: 0,
											list: [
												//                                {type: "colorpicker", position:"label-left", name:"title_background_color", labelWidth:45, labelHeight:18, inputWidth: 90, offsetLeft:20, offsetTop: 10, label: "背景色:", value: "#2a87eb", enableCustomColors: "1"},
												{
													type: "input",
													name: "marker_line_color",
													width: 80,
													labelWidth: 50,
													labelHeight: 18,
													offsetLeft: 0,
													offsetTop: 5,
													position: "label-left",
													label: unescape("%u8FB9%u754C%u8272%3A"),
													value: ""
												},
												{
													type: "newcolumn"
												},
												{
													type: "input",
													name: "marker_fill_color",
													width: 82,
													labelWidth: 50,
													labelHeight: 18,
													offsetLeft: 15,
													offsetTop: 5,
													position: "label-left",
													label: unescape("%u586B%u5145%u8272%3A"),
													value: ""
												}
											]
										}
									]
								},
								{
									type: "checkbox",
									position: "label-right",
									name: "datalabels_show",
									labelHeight: 18,
									offsetLeft: 0,
									offsetTop: 10,
									label: unescape("%u6570%u503C%u6807%u6CE8")
								},
								{
									type: "block",
									offsetLeft: 1,
									blockOffset: 1,
									width: 340,
									list: [{
											type: "block",
											name: "datalabels_set",
											blockOffset: 0,
											list: [
												//                                {type: "colorpicker", position:"label-left", name:"title_background_color", labelWidth:45, labelHeight:18, inputWidth: 90, offsetLeft:20, offsetTop: 10, label: "背景色:", value: "#2a87eb", enableCustomColors: "1"},
												{
													type: "input",
													name: "x_offset",
													width: 82,
													labelWidth: 50,
													labelHeight: 18,
													offsetLeft: 0,
													offsetTop: 5,
													position: "label-left",
													label: unescape("%u6C34%26nbsp%3B%26nbsp%3B%26nbsp%3B%u5E73%3A"),
													value: "0"
												},
												{
													type: "newcolumn"
												},
												{
													type: "input",
													name: "y_offset",
													width: 82,
													labelWidth: 50,
													labelHeight: 18,
													offsetLeft: 15,
													offsetTop: 5,
													position: "label-left",
													label: unescape("%u5782%26nbsp%3B%26nbsp%3B%26nbsp%3B%u76F4%3A"),
													value: "0"
												}
											]
										},
										{
											type: "block",
											name: "background_set",
											blockOffset: 0,
											list: [
												//                                {type: "colorpicker", position:"label-left", name:"title_background_color", labelWidth:45, labelHeight:18, inputWidth: 90, offsetLeft:20, offsetTop: 10, label: "背景色:", value: "#2a87eb", enableCustomColors: "1"},
												{
													type: "input",
													name: "jiange",
													width: 82,
													labelWidth: 50,
													labelHeight: 18,
													offsetLeft: 0,
													offsetTop: 5,
													position: "label-left",
													label: unescape("%u95F4%26nbsp%3B%26nbsp%3B%26nbsp%u9694%3A"),
													value: "1"
												},
												{
													type: "newcolumn"
												},
												{
													type: "input",
													name: "decimal",
													width: 82,
													labelWidth: 50,
													labelHeight: 18,
													offsetLeft: 15,
													offsetTop: 5,
													position: "label-left",
													label: unescape("%u5C0F%u6570%u4F4D%3A"),
													value: "0"
												}
											]
										}
									]
								}
							]
						}
					]
				},
				{
					type: "block",
					offsetLeft: 5,
					list: [
						{
							type: "checkbox",
							position: "label-right",
							name: "apply_all",
							labelHeight: 18,
							offsetLeft: 0,
							offsetTop: 5,
							label: unescape("%u5E94%u7528%u5230%u5168%u90E8")
						},
						{
							type: "newcolumn"
						},
						{
							type: "button",
							width: 50,
							name: "confirm",
							value: unescape("%u786E%u5B9A"),
							offsetTop: 30,
							offsetLeft: 80
						},
						{
							type: "newcolumn"
						},
						{
							type: "button",
							width: 50,
							name: "cancel",
							value: unescape("%u53D6%u6D88"),
							offsetTop: 30,
							offsetLeft: 10
						}
					]
				}
			]);

			if (_isTopWindow) {
				lineColorPicker = new dhtmlXColorPicker(dhxSeriesForm.getInput("line_color"));
				markerLineColorPicker = new dhtmlXColorPicker(dhxSeriesForm.getInput("marker_line_color"));
				markerFillColorPicker = new dhtmlXColorPicker(dhxSeriesForm.getInput("marker_fill_color"));
			} else {
				lineColorPicker = new dhtmlxPopWindow.dhtmlXColorPicker(dhxSeriesForm.getInput("line_color"));
				markerLineColorPicker = new dhtmlxPopWindow.dhtmlXColorPicker(dhxSeriesForm.getInput("marker_line_color"));
				markerFillColorPicker = new dhtmlxPopWindow.dhtmlXColorPicker(dhxSeriesForm.getInput("marker_fill_color"));
			}

			lineColorPicker.loadUserLanguage("ch");
			markerLineColorPicker.loadUserLanguage("ch");
			markerFillColorPicker.loadUserLanguage("ch");

			lineColorPicker.attachEvent("onSelect", function(color, node) {
				node.style.color = color;
			});

			// lineColorPicker.attachEvent("onShow", function(node){
			//     debugger
			// });

			markerLineColorPicker.attachEvent("onSelect", function(color, node) {
				node.style.color = color;
			});
			markerFillColorPicker.attachEvent("onSelect", function(color, node) {
				node.style.color = color;
			});

			function hideOrShow3dItem(flag) {
				if (!Highcharts.perspective) {
					dhxSeriesForm.hideItem("check_3d");
					return;
				}
				if (chart.is3d()) {
					dhxSeriesForm.checkItem("check_3d");
				} else {
					dhxSeriesForm.uncheckItem("check_3d");
				}

				if (Highcharts.perspective && (dhxSeriesForm.getItemValue("series_type") == "column" || dhxSeriesForm.getItemValue(
						"series_type") == "pie")) {
					dhxSeriesForm.showItem("check_3d");
				} else {
					dhxSeriesForm.hideItem("check_3d");
				}
			}

			var seriesTypeCombo = dhxSeriesForm.getCombo("series_type");
			// seriesTypeCombo.attachEvent("onChange", function(){
			//     hideOrShow3dItem();
			// });

			dhxSeriesSetWindow.hide();
			dhxSeriesSetWindow.attachEvent("onClose", function(win) {
				if (chart._hoverFrame) {
					chart._hoverFrame.css({
						display: 'none'
					});
				}
				win.hide();
			});

			dhxSeriesSetWindow.attachEvent("onMoveFinish", function(win) {
				if (chart._hoverFrame) {
					var position = win.getPosition();
					chart._hoverFrame.css({
						top: position[1] + "px",
						left: position[0] + "px"
					});
				}
			});

			//显示对话框
			dhxSeriesSetWindow.attachEvent("onShow", function(win) {
				// currentSeries = chart.hoverSeries;
				var options = currentSeries.options,
					chartOptions = currentSeries.chart.options,
					dataLabelOptions = options.dataLabels,
					markerOptions = options.marker || {},
					dataLabelStep = dataLabelOptions && dataLabelOptions.step,
					dataLabelecimal = dataLabelOptions && dataLabelOptions.decimals,
					markerStep = markerOptions && markerOptions.step;
				if (!dataLabelecimal) {
					dataLabelecimal = (currentSeries.data[0].y || currentSeries.data[0][1] || '0').toString().length - ((
						currentSeries.data[0].y || currentSeries.data[0][1] || '0').toString().indexOf(".") + 1);
					dataLabelecimal = dataLabelecimal < (currentSeries.data[0].y || currentSeries.data[0][1] || '0').toString().length ?
						dataLabelecimal : 0;
					options.dataLabels = options.dataLabels || {};
					options.dataLabels.decimals = dataLabelecimal;
				}
				isChanged = false;
				if (chart._hoverFrame) {
					chart._hoverFrame.css({
						display: 'block'
					});
				}
				dhxSeriesForm.disableItem("line_alpha");
				// dhxSeriesForm.disableItem("can_drag");
				if(chart.yAxis[options.yAxis]){
					var yAxiseId = chart.yAxis[options.yAxis].userOptions.id;
				}else{
					var yAxiseId = options.yAxis;
				}
				dhxSeriesForm.setItemValue("apply-yAxis", H.pick(yAxiseId, ""));
				dhxSeriesForm.setItemValue("line_width", H.pick(options.lineWidth, 1));
				dhxSeriesForm.setItemValue("line_style", H.pick(options.dashStyle, "Solid"));
				_setColorPickerColor(lineColorPicker, currentSeries.color);
				_setColorPickerColor(markerLineColorPicker, markerOptions.lineColor || currentSeries.color);
				_setColorPickerColor(markerFillColorPicker, markerOptions.fillColor || currentSeries.color);

				dhxSeriesForm.setItemValue("marker_show", markerOptions.enabled == false ? false : true);
				dhxSeriesForm.setItemValue("marker_size", markerOptions.radius || 4);
				dhxSeriesForm.setItemValue("marker_style", markerOptions.symbol || "circle");

				dhxSeriesForm.setItemValue("datalabels_show", !!options.dataLabels.enabled);
				dhxSeriesForm.setItemValue("x_offset", options.dataLabels.x || 0);
				dhxSeriesForm.setItemValue("y_offset", options.dataLabels.y || 0);

				dhxSeriesForm.setItemValue("jiange", dataLabelStep || 1);
				dhxSeriesForm.setItemValue("decimal", dataLabelecimal || 0);

				dhxSeriesForm.setItemValue("series_type", H.pick(options.type, chartOptions.chart.type, chartOptions.chart.defaultSeriesType,
					"line"));
				//hideOrShow3dItem();
			});

			dhxSeriesForm.attachEvent("onButtonClick", function(name) {
				var lineWidthCombo = dhxSeriesForm.getCombo("line_width"),
					lineStyleCombo = dhxSeriesForm.getCombo("line_style"),
					markerStyleCombo = dhxSeriesForm.getCombo("marker_style"),
					seriesTypeCombo = dhxSeriesForm.getCombo("series_type"),
					applyAxie = dhxSeriesForm.getCombo("apply-yAxis");

				if (name == "confirm") {
					var params = [];
					if (chart._hoverFrame) {
						chart._hoverFrame.css({
							display: 'none'
						});
					}
					dhxSeriesSetWindow.hide();

					var seriesChangeOptions = {
						color: lineColorPicker.getSelectedColor()[0],
						dashStyle: lineStyleCombo.getSelectedValue(),
						type: seriesTypeCombo.getSelectedValue(),
						dataLabels: {
							enabled: dhxSeriesForm.isItemChecked("datalabels_show"),
							x: parseInt(dhxSeriesForm.getInput("x_offset").value),
							y: parseInt(dhxSeriesForm.getInput("y_offset").value),
							step: parseInt(dhxSeriesForm.getInput("jiange").value),
							decimals: parseInt(dhxSeriesForm.getInput("decimal").value)
						},

						lineWidth: seriesTypeCombo.getSelectedValue() == "scatter" ? 0 : parseInt(lineWidthCombo.getSelectedValue()),

						marker: {
							enabled: dhxSeriesForm.isItemChecked("marker_show"),
							fillColor: markerFillColorPicker.getSelectedColor()[0],
							lineColor: markerLineColorPicker.getSelectedColor()[0],
							step: parseInt(dhxSeriesForm.getInput("jiange").value),
							radius: parseInt(dhxSeriesForm.getInput("marker_size").value),
							symbol: markerStyleCombo.getSelectedValue()
						}
					};

					var chartOptions = chart.options.chart;
					//不支持三维
					if (dhxSeriesForm.isItemHidden("check_3d")) {
						if (chartOptions.options3d && chartOptions.options3d.enabled) {
							chart.update({
								chart: {
									options3d: {
										enabled: false
									}
								}
							}, false);
						}
					} else {
						//三维图
						if (dhxSeriesForm.isItemChecked("check_3d")) {
							var options3d = chartOptions.options3d || {};
							options3d.enabled = true;
							if (dhxSeriesForm.getItemValue("series_type") == "column") {
								options3d.alpha = options3d.alpha || 45;
								options3d.beta = options3d.beta || 15;
								options3d.depth = options3d.depth || currentSeries.options.depth || 25;
								options3d.viewDistance = options3d.viewDistance || 25;
								options3d.pseudo = true;
								options3d.fitToPlot = true;
								options3d.axisLabelPosition = 'auto';
								seriesChangeOptions.depth = currentSeries.options.depth || 25;
							} else if (dhxSeriesForm.getItemValue("series_type") == "pie") {
								options3d.alpha = options3d.alpha || 45;
								options3d.beta = 0;
								options3d.depth = options3d.depth || currentSeries.options.depth || 25;
								options3d.viewDistance = options3d.viewDistance || 25;
								options3d.pseudo = true;
								options3d.fitToPlot = true;
								options3d.axisLabelPosition = 'auto';
								seriesChangeOptions.depth = currentSeries.options.depth || 25;
							};
							chart.update({
								chart: {
									options3d: options3d
								}
							}, false);
						} else {
							chart.update({
								chart: {
									options3d: {
										enabled: false
									}
								}
							}, false);
						}
					}

					for (var i = 0; i < chart.options.exportOptions.series.length; i++) {
						chart.options.exportOptions.series[i] = merge(chart.options.exportOptions.plotOptions && chart.options.exportOptions
							.plotOptions.series,
							chart.options.exportOptions.series[i]);
					}
						currentSeries.update({
							color:lineColorPicker.getSelectedColor()[0]
						});
						var export_series = chart.findSeriesByIdInExport(currentSeries.options.id);
						export_series.color = lineColorPicker.getSelectedColor()[0];

					if (dhxSeriesForm.isItemChecked("apply_all")) {
						delete(seriesChangeOptions.color);
						for (var i = 0; i < chart.series.length; i++) {
							chart.series[i].update(seriesChangeOptions);
						}
						for (var i = 0; i < chart.options.exportOptions.series.length; i++) {

							if (chart.options.exportOptions.series[i].type != seriesChangeOptions.type) {
								params.push({
									changeType: 'seriesType',
									name: chart.options.exportOptions.series[i].name,
									oldValue: chart.options.exportOptions.series[i].type,
									newValue: seriesChangeOptions.type,
								})
							}
							if (chart.options.exportOptions.series[i].dashStyle != seriesChangeOptions.dashStyle) {
								params.push({
									changeType: 'seriesStyle',
									name: chart.options.exportOptions.series[i].name,
									oldValue: chart.options.exportOptions.series[i].dashStyle,
									newValue: seriesChangeOptions.dashStyle,
								})
							}

							chart.options.exportOptions.series[i].color = lineColorPicker.getSelectedColor()[0];
							chart.options.exportOptions.series[i].dashStyle = lineStyleCombo.getSelectedValue();
							chart.options.exportOptions.series[i].lineWidth = parseInt(lineWidthCombo.getSelectedValue());
							chart.options.exportOptions.series[i].type = seriesTypeCombo.getSelectedValue();

							chart.options.exportOptions.series[i].dataLabels = chart.options.exportOptions.series[i].dataLabels || {};
							chart.options.exportOptions.series[i].dataLabels.enabled = dhxSeriesForm.isItemChecked("datalabels_show");
							chart.options.exportOptions.series[i].dataLabels.x = parseInt(dhxSeriesForm.getInput("x_offset").value);
							chart.options.exportOptions.series[i].dataLabels.y = parseInt(dhxSeriesForm.getInput("y_offset").value);

							chart.options.exportOptions.series[i].marker = chart.options.exportOptions.series[i].marker || {};

							chart.options.exportOptions.series[i].marker.enabled = dhxSeriesForm.isItemChecked("marker_show");
							chart.options.exportOptions.series[i].marker.fillColor = markerFillColorPicker.getSelectedColor()[0];
							chart.options.exportOptions.series[i].marker.lineColor = markerLineColorPicker.getSelectedColor()[0];
							chart.options.exportOptions.series[i].marker.radius = parseInt(dhxSeriesForm.getInput("marker_size").value);
							chart.options.exportOptions.series[i].marker.symbol = markerStyleCombo.getSelectedValue();
						}
						currentSeries.update({
							color:lineColorPicker.getSelectedColor()[0]
						});
						var export_series = chart.findSeriesByIdInExport(currentSeries.options.id);

						export_series.color = lineColorPicker.getSelectedColor()[0];
					} else {
						// 如果序列颜色发生改变 添加曲线变化事件监听
						if (currentSeries.color != seriesChangeOptions.color) {
							params.push({
								changeType: 'seriesColor',
								name: currentSeries.name,
								oldValue: currentSeries.color,
								newValue: seriesChangeOptions.color,
							})
						}
						if (currentSeries.type != seriesChangeOptions.type) {
							params.push({
								changeType: 'seriesType',
								name: currentSeries.name,
								oldValue: currentSeries.type,
								newValue: seriesChangeOptions.type,
							})
						}
						if (currentSeries.dashStyle != seriesChangeOptions.dashStyle) {
							params.push({
								changeType: 'seriesStyle',
								name: currentSeries.name,
								oldValue: currentSeries.dashStyle,
								newValue: seriesChangeOptions.dashStyle,
							})
						}
						currentSeries.update(seriesChangeOptions);
						export_series.color = lineColorPicker.getSelectedColor()[0];
						export_series.dashStyle = lineStyleCombo.getSelectedValue();
						export_series.lineWidth = parseInt(lineWidthCombo.getSelectedValue());
						export_series.type = seriesTypeCombo.getSelectedValue();

						export_series.dataLabels = export_series.dataLabels || {};
						export_series.dataLabels.enabled = dhxSeriesForm.isItemChecked("datalabels_show");
						export_series.dataLabels.x = parseInt(dhxSeriesForm.getInput("x_offset").value);
						export_series.dataLabels.y = parseInt(dhxSeriesForm.getInput("y_offset").value);

						export_series.marker = export_series.marker || {};

						export_series.marker.enabled = dhxSeriesForm.isItemChecked("marker_show");
						export_series.marker.fillColor = markerFillColorPicker.getSelectedColor()[0];
						export_series.marker.lineColor = markerLineColorPicker.getSelectedColor()[0];
						export_series.marker.radius = parseInt(dhxSeriesForm.getInput("marker_size").value);
						export_series.marker.symbol = markerStyleCombo.getSelectedValue();
					}
					// 同步坐标轴颜色
					if(chart.yAxis[export_series.yAxis]&&chart.yAxis[export_series.yAxis].userOptions){
						var yAxiId = chart.yAxis[export_series.yAxis].userOptions.id
					}else{
						var yAxiId = export_series.yAxis
					}
					var export_axis = chart.findAxisByIdInExport(yAxiId);
					if(dhxSeriesForm.isItemChecked("axis-changen")){
						export_axis.lineColor = lineColorPicker.getSelectedColor()[0];
						export_axis.tickColor = lineColorPicker.getSelectedColor()[0];
						chart.findAxisById(yAxiId).update({
							lineColor:lineColorPicker.getSelectedColor()[0],
							tickColor:lineColorPicker.getSelectedColor()[0]
						})

					}
					// 改变所属轴
					if(yAxiId !=applyAxie.getSelectedValue()){
						currentSeries.update({
							yAxis:applyAxie.getSelectedValue()
						})
						export_series.yAxis = applyAxie.getSelectedValue();
						// 如果轴上没有了序列，删除该轴
						if(chart.findAxisById(yAxiId).series.length<2){
							
							var myAxis = chart.findAxisById(yAxiId),
								axisId = myAxis.userOptions.id,
								axisTop = myAxis.userOptions.oriTop,
								yAxisObj = chart.yAxisObj,
								axisArr = null;
								// 拿到与该Y轴同组的所有Y轴
								for(var a in yAxisObj){
									if(a == axisTop){
										axisArr = yAxisObj[a];
									}
								}
								for(var i = 0;i<axisArr.length;i++){
									if(axisArr[i].userOptions.id ==axisId){
										axisArr.splice(i,1)
									}
								}
								chart.findAxisById(yAxiId).remove();
								if(axisArr.length>0){  // 横向变化
									var offsetArr = axisArr[0].userOptions.offsetArr;
									for(var i = 0;i<axisArr.length;i++){
										axisArr[i].update({
											offset: offsetArr[i],
										});
										axisArr[i].offset = offsetArr[i];
									}
								}else{  //纵向变化
									var n = 0;
									var yArr = [];
									for(var k in yAxisObj){
										if(yAxisObj[k].length>0){
											n++;
											yArr.push(yAxisObj[k]);
										}
									}
									var h = Math.round((100 - (n - 1) * 3) / n * 100) / 100;
									for(var i = 0;i<yArr.length;i++){
										var arr = yArr[i];
										for(var j = 0;j<arr.length;j++){
											arr[j].update({
												height: h + "%",
												top: (h * i + 3 * i) + "%"
											});
											arr[j].userOptions.height = h + "%";
											arr[j].userOptions.top = (h * i + 3 * i) + "%";
										}
									}
								}
								
							var allyAxis = chart.userOptions.yAxis;
							if(allyAxis.length>1){
								for(var i = 0;i<allyAxis.length;i++){
									var myAxis = allyAxis[i],
										myId = myAxis.id,
										myTop = myAxis.top,
										myOffset = myAxis.offset,
										myOpposite = myAxis.opposite;
									// myAxis.vAxisArr = [];
									myAxis.hAxisArr = [];
									for (var j = 0; j < allyAxis.length; j++) {
										var yTop = allyAxis[j].top,
											yOffset = allyAxis[j].offset,
											yOpposite = allyAxis[j].opposite
										if (yTop == myTop && myOpposite == yOpposite) {
											myAxis.hAxisArr.push(allyAxis[j].id)
										}
									}
								}
							}
							// 增加事件监听 
							var chartParent = chart.parentObject || chart.container;
							if (params.length > 0) {
								chartParent.fireEvent('chartChanged', chartParent, params);
							}
						}
					}

					chart.addTitleDoubleClick();
					chart.addAxesDoubleClick();
					chart.addSeriesDoubleClick();
					chart.addSeriesClick();
					chart.addSeriesClickOn();
					// 增加事件监听 
					var chartParent = chart.parentObject || chart.container;
					if (params.length > 0) {
						chartParent.fireEvent('chartChanged', chartParent, params);
					}
				} else if (name == "cancel") {
					if (chart._hoverFrame) {
						chart._hoverFrame.css({
							display: 'none'
						});
					}
					dhxSeriesSetWindow.hide();
				}
			});
		};
	};

	//初始化点设置对话框
	Chart.prototype.initPointSetWindow = function() {
		var chart = this,
			dhxWindow = chart.dhxWindow,
			dhxPointSetWindow = chart.dhxPointSetWindow,
			dhxPointForm = chart.dhxPointForm,
			markerLineColorPicker,
			markerFillColorPicker,
			isChanged;

		initColorPickerLanguage();

		if (!dhxWindow) {
			if (_isTopWindow) {
				chart.dhxWindow = dhxWindow = new dhtmlXWindows();
			} else {
				chart.dhxWindow = dhxWindow = new dhtmlxPopWindow.dhtmlXWindows();
			}
			dhxWindow.vp.style.overflow = "auto";
		}
		if (!dhxPointSetWindow) {
			var titleWindowWidth = 380,
				titleWindowHeight = 380;
			//                backObjOffsetLeft = 20, //背景对象左侧偏移量
			//                showObjOffsetLeft = 20, //显示对象复选框左侧偏移量;

			var _browser = getBrowserType();
			if (_browser.chrome) {} else if (_browser.firefox) {} else if (_browser.ie || _isIE) {
				switch (getIEDocumentMode()) {
					case 5:
						break;
					case 6:
						break;
					case 7:
						break;
					case 8:
						break;
					case 9:
						break;
					case 10:
						break;
					case 11:
						break;
				}
			} else if (_browser.safari) {} else if (_browser.opera) {}

			chart.dhxPointSetWindow = dhxPointSetWindow = dhxWindow.createWindow("seriesSetWindow", 0, 0, titleWindowWidth,
				titleWindowHeight);
			dhxPointSetWindow.setText(unescape("%u70B9%u8BBE%u7F6E"));
			dhxPointSetWindow.denyResize();
			dhxPointForm = chart.dhxPointForm = dhxPointSetWindow.attachForm([{
					type: "block",
					offsetLeft: 5,
					blockOffset: 1,
					width: 370,
					list: [
						//                    {type: "checkbox",position:"label-right", name:"marker_show",labelHeight:18, offsetLeft:0, offsetTop: 5,  label: "点符号"},
						//                    {type: "block",offsetLeft:1, blockOffset:1, width: 320, list:[
						{
							type: "fieldset",
							offsetLeft: 1,
							blockOffset: 1,
							label: unescape("%u70B9%u7B26%u53F7"),
							width: 350,
							offsetTop: 10,
							list: [{
									type: "block",
									name: "marker_set",
									blockOffset: 0,
									list: [{
											type: "input",
											name: "marker_size",
											width: 70,
											labelWidth: 45,
											labelHeight: 18,
											offsetLeft: 0,
											position: "label-left",
											label: unescape("%u5927%26nbsp%3B%26nbsp%3B%26nbsp%3B%u5C0F%3A"),
											value: "1"
										},
										{
											type: "newcolumn"
										},
										{
											type: "combo",
											position: "label-left",
											label: unescape("%u6837%26nbsp%3B%26nbsp%3B%26nbsp%3B%u5F0F%3A"),
											labelWidth: 45,
											labelHeight: 18,
											offsetLeft: 15,
											width: 90,
											comboType: "image",
											position: "label-left",
											name: "marker_style",
											options: [{
													value: "circle",
													text: unescape("%u5706%u5F62"),
													img: path + "/graphics/pointStyle/circle.png"
												},
												{
													value: 'diamond',
													text: unescape("%u83F1%u5F62"),
													img: path + "/graphics/pointStyle/diamond.png"
												},
												{
													value: 'square',
													text: unescape("%u65B9%u5F62"),
													img: path + "/graphics/pointStyle/square.png"
												},
												{
													value: 'triangle',
													text: unescape("%u4E09%u89D2%u5F62"),
													img: path + "/graphics/pointStyle/triangle.png"
												},
												{
													value: 'triangle-down',
													text: unescape("%u5012%u4E09%u89D2"),
													img: path + "/graphics/pointStyle/triangle-down.png"
												},
												{
													value: 'cross',
													text: unescape("%u52A0%u53F7"),
													img: path + "/graphics/pointStyle/cross.png"
												},
												{
													value: 'xcross',
													text: unescape("%u4E58%u53F7"),
													img: path + "/graphics/pointStyle/xcross.png"
												}
											]
										}
									]
								},
								{
									type: "block",
									name: "background_set",
									blockOffset: 0,
									list: [
										//                                {type: "colorpicker", position:"label-left", name:"title_background_color", labelWidth:45, labelHeight:18, inputWidth: 90, offsetLeft:20, offsetTop: 10, label: "背景色:", value: "#2a87eb", enableCustomColors: "1"},
										{
											type: "input",
											name: "marker_line_color",
											width: 70,
											labelWidth: 45,
											labelHeight: 18,
											offsetLeft: 0,
											offsetTop: 15,
											position: "label-left",
											label: unescape("%u8FB9%u754C%u8272%3A"),
											value: ""
										},
										{
											type: "newcolumn"
										},
										{
											type: "input",
											name: "marker_fill_color",
											width: 82,
											labelWidth: 45,
											labelHeight: 18,
											offsetLeft: 15,
											offsetTop: 15,
											position: "label-left",
											label: unescape("%u586B%u5145%u8272%3A"),
											value: ""
										}
									]
								}
							]
						},
						//                    {type: "checkbox",position:"label-right", name:"datalabels_show",labelHeight:18, offsetLeft:0, offsetTop: 15,  label: "数值标注"},
						//                    {type: "block",offsetLeft:1, blockOffset:1, width: 320, list:[
						{
							type: "fieldset",
							offsetLeft: 1,
							blockOffset: 1,
							label: unescape("%u6570%u503C%u6807%u6CE8"),
							width: 350,
							offsetTop: 10,
							list: [{
								type: "block",
								name: "datalabels_set",
								blockOffset: 0,
								list: [
									//                                {type: "colorpicker", position:"label-left", name:"title_background_color", labelWidth:45, labelHeight:18, inputWidth: 90, offsetLeft:20, offsetTop: 10, label: "背景色:", value: "#2a87eb", enableCustomColors: "1"},
									{
										type: "input",
										name: "x_offset",
										width: 60,
										labelWidth: 45,
										labelHeight: 18,
										offsetLeft: 0,
										offsetTop: 5,
										position: "label-left",
										label: unescape("%u6C34%26nbsp%3B%26nbsp%3B%26nbsp%3B%u5E73%3A"),
										value: "1"
									},
									{
										type: "newcolumn"
									},
									{
										type: "input",
										name: "y_offset",
										width: 60,
										labelWidth: 45,
										labelHeight: 18,
										offsetLeft: 15,
										offsetTop: 5,
										position: "label-left",
										label: unescape("%u5782%26nbsp%3B%26nbsp%3B%26nbsp%3B%u76F4%3A"),
										value: "1"
									}
								]
							}]
						}
					]
				},
				{
					type: "block",
					offsetLeft: 0,
					list: [{
							type: "checkbox",
							position: "label-right",
							name: "apply_all",
							labelHeight: 18,
							offsetLeft: 0,
							offsetTop: 5,
							label: unescape("%u5E94%u7528%u5230%u5168%u90E8")
						},
						// {type: "newcolumn"},
						// {type: "checkbox",position:"label-right", name:"can_drag",labelHeight:18, offsetLeft:85, offsetTop: 5,  label: unescape("%u62D6%u52A8")}
					]
				},
				{
					type: "block",
					offsetLeft: 180,
					list: [{
							type: "button",
							width: 50,
							name: "confirm",
							value: unescape("%u786E%u5B9A"),
							offsetTop: 30,
							offsetLeft: 10
						},
						{
							type: "newcolumn"
						},
						{
							type: "button",
							width: 50,
							name: "cancel",
							value: unescape("%u53D6%u6D88"),
							offsetTop: 30,
							offsetLeft: 10
						}
					]
				}
			]);

			if (_isTopWindow) {
				markerLineColorPicker = new dhtmlXColorPicker(dhxPointForm.getInput("marker_line_color"));
				markerFillColorPicker = new dhtmlXColorPicker(dhxPointForm.getInput("marker_fill_color"));
			} else {
				markerLineColorPicker = new dhtmlxPopWindow.dhtmlXColorPicker(dhxPointForm.getInput("marker_line_color"));
				markerFillColorPicker = new dhtmlxPopWindow.dhtmlXColorPicker(dhxPointForm.getInput("marker_fill_color"));
			}

			markerLineColorPicker.loadUserLanguage("ch");
			markerFillColorPicker.loadUserLanguage("ch");

			markerLineColorPicker.attachEvent("onSelect", function(color, node) {
				node.style.color = color;
			});
			markerFillColorPicker.attachEvent("onSelect", function(color, node) {
				node.style.color = color;
			});

			dhxPointSetWindow.hide();
			dhxPointSetWindow.attachEvent("onClose", function(win) {
				if (chart._hoverFrame) {
					chart._hoverFrame.css({
						display: 'none'
					});
				}
				win.hide();
			});

			dhxPointSetWindow.attachEvent("onMoveFinish", function(win) {
				if (chart._hoverFrame) {
					var position = win.getPosition();
					chart._hoverFrame.css({
						top: position[1] + "px",
						left: position[0] + "px"
					});
				}
			});

			//显示对话框
			dhxPointSetWindow.attachEvent("onShow", function(win) {
				var options = currentPoint.options,
					marker = currentPoint.marker,
					dataLabels = currentPoint.dataLabels,
					markerOptions = currentPoint.series.options.marker,
					datalabelsOptions = currentPoint.series.options.dataLabels;
				isChanged = false;
				//

				if (chart._hoverFrame) {
					chart._hoverFrame.css({
						display: 'block'
					});
				}
				//dhxPointForm.disableItem("can_drag");

				_setColorPickerColor(markerLineColorPicker, (marker && marker.lineColor) || markerOptions.lineColor ||
					currentPoint.series.color);
				setColorPickerColor(markerFillColorPicker, (marker && marker.fillColor) || markerOptions.fillColor ||
					currentPoint.series.color);

				dhxPointForm.setItemValue("marker_size", (marker && marker.radius) || markerOptions.radius || 4);
				dhxPointForm.setItemValue("marker_style", (marker && marker.symbol) || markerOptions.symbol || "circle");

				dhxPointForm.setItemValue("x_offset", H.pick(dataLabels && dataLabels.x, datalabelsOptions.x));
				dhxPointForm.setItemValue("y_offset", H.pick(dataLabels && dataLabels.y, datalabelsOptions.y));
			});

			dhxPointForm.attachEvent("onButtonClick", function(name) {
				var markerStyleCombo = dhxPointForm.getCombo("marker_style");

				if (name == "confirm") {
					if (chart._hoverFrame) {
						chart._hoverFrame.css({
							display: 'none'
						});
					}
					dhxPointSetWindow.hide();
					if (chart._hoverFrame) {
						chart._hoverFrame.css({
							display: 'block'
						});
					}

					var pointChangeOptions = {
						dataLabels: {
							//                            enabled: dhxPointForm.isItemChecked("datalabels_show"),
							x: parseInt(dhxPointForm.getInput("x_offset").value),
							y: parseInt(dhxPointForm.getInput("y_offset").value)
						},

						marker: {
							//                            enabled: dhxPointForm.isItemChecked("marker_show"),
							fillColor: markerFillColorPicker.getSelectedColor()[0],
							lineColor: markerLineColorPicker.getSelectedColor()[0],
							radius: parseInt(dhxPointForm.getInput("marker_size").value),
							symbol: markerStyleCombo.getSelectedValue()
						}
					};

					//                    for(var i = 0; i < chart.options.exportOptions.series.length; i++) {
					//                        chart.options.exportOptions.series[i] = merge(chart.options.exportOptions.plotOptions && chart.options.exportOptions.plotOptions.series,
					//                            chart.options.exportOptions.series[i]);
					//                    }

					if (dhxPointForm.isItemChecked("apply_all")) {
						delete(pointChangeOptions.color);
						for (var i = 0; i < currentSeries.points.length; i++) {
							currentSeries.points[i].update(pointChangeOptions);
						}
						//                        for(var i = 0; i < chart.series.length; i++){
						//                            chart.series[i].update(pointChangeOptions);
						//                        }
						//                        for(var i = 0; i < chart.options.exportOptions.series.length; i++){
						//
						//                            chart.options.exportOptions.series[i].dataLabels = chart.options.exportOptions.series[i].dataLabels || {};
						//                            chart.options.exportOptions.series[i].dataLabels.enabled = dhxPointForm.isItemChecked("datalabels_show");
						//                            chart.options.exportOptions.series[i].dataLabels.x = parseInt(dhxPointForm.getInput("x_offset").value);
						//                            chart.options.exportOptions.series[i].dataLabels.y = parseInt(dhxPointForm.getInput("y_offset").value);
						//
						//                            chart.options.exportOptions.series[i].marker = chart.options.exportOptions.series[i].marker || {};
						//
						//                            chart.options.exportOptions.series[i].marker.enabled = dhxPointForm.isItemChecked("marker_show");
						//                            chart.options.exportOptions.series[i].marker.fillColor = markerFillColorPicker.getSelectedColor()[0];
						//                            chart.options.exportOptions.series[i].marker.lineColor = markerLineColorPicker.getSelectedColor()[0];
						//                            chart.options.exportOptions.series[i].marker.radius = parseInt(dhxPointForm.getInput("marker_size").value);
						//                            chart.options.exportOptions.series[i].marker.symbol = markerStyleCombo.getSelectedValue();
						//                        }
					} else {
						currentPoint.update(pointChangeOptions);
						//                        var export_point = chart.findSeriesByIdInExport(currentPoint.options.id);
						//
						//                        export_point.dataLabels = export_point.dataLabels || {};
						//                        export_point.dataLabels.enabled = dhxPointForm.isItemChecked("datalabels_show");
						//                        export_point.dataLabels.x = parseInt(dhxPointForm.getInput("x_offset").value);
						//                        export_point.dataLabels.y = parseInt(dhxPointForm.getInput("y_offset").value);
						//
						//                        export_point.marker = export_point.marker || {};
						//
						//                        export_point.marker.enabled = dhxPointForm.isItemChecked("marker_show");
						//                        export_point.marker.fillColor = markerFillColorPicker.getSelectedColor()[0];
						//                        export_point.marker.lineColor = markerLineColorPicker.getSelectedColor()[0];
						//                        export_point.marker.radius = parseInt(dhxPointForm.getInput("marker_size").value);
						//                        export_point.marker.symbol = markerStyleCombo.getSelectedValue();

					}

					chart.addTitleDoubleClick();
					chart.addAxesDoubleClick();
					chart.addSeriesDoubleClick();
					chart.addSeriesClick();
					chart.addSeriesClickOn();
				} else if (name == "cancel") {
					if (chart._hoverFrame) {
						chart._hoverFrame.css({
							display: 'none'
						});
					}
					dhxPointSetWindow.hide();
				}
			});
		};
	};

	/**
	 * 获取窗口弹出时的位置
	 * @param clickX 鼠标点击位置
	 * @param clickY 鼠标点击位置
	 * @param width 窗体宽度
	 * @param height 窗体高度
	 */
	Chart.prototype.getWindowPosition = function(clickX, clickY, width, height) {
		var chart = this,
			chartWidth = chart.chartWidth,
			chartHeight = chart.chartHeight,
			pos = {
				x: clickX + ___getPageScroll()[0],
				y: clickY + ___getPageScroll()[1]
			};

		var offsetX = 0,
			offsetY = 0;
		//没有嵌入到iframe中
		getDhtmlxWindow();
		if (!_isTopWindow && parentFrame) {
			offsetX = $(parentFrame).offset().left;
			offsetY = $(parentFrame).offset().top;
		}

		//如果窗体在点击位置右侧显示不开，并且能在左侧显示开，调整
		if ((pos.x - width) > 0 && (pos.x + width) > chartWidth) {
			pos.x -= width;
		}
		if ((pos.y - height) > 0 && (pos.y + height) > chartHeight) {
			pos.y -= height;
		}
		return pos;
	};

	/**
	 *
	 */
	H.Chart.prototype.callbacks.push(function(chart) {
		H.addEvent(chart, 'load', chart.addPopupSetWindow);
		H.addEvent(chart, 'redraw', chart.addPopupSetWindow);
	});
}(Highcharts));
