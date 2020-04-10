/******************************************************************
 ** 文件名: hwChartApi.src.js
 ** Copyright (c) 2017-2019 汉威公司技术研究院
 ** 创建人:黄娜娜
 ** 日 期:2019-08-24
 ** 修改人:黄娜娜
 ** 日 期:2018-08-24 
 ** 描 述:顶部工具条方法接口
 ** 版 本:1.0
 ******************************************************************/

(function(H) {
	var path = CreateJSPath("hwAPI.js", -1),
		Chart = H.Chart,
		merge = H.merge,
		each = H.each
		addEvent = H.addEvent,
		Axis = H.Axis,
		Tick = H.Tick,
		Point = H.Point,
		Pointer = H.Pointer,
		CenteredSeriesMixin = H.CenteredSeriesMixin,
		TrackerMixin = H.TrackerMixin,
		Series = H.Series,
		math = Math;
	/**
	 * 设置曲线类型
	 * @param newType 图表类型
	 */
	Chart.prototype.setChartType = function(newType,obj) {
		var chart = this,
			chartSeries = chart.options.series,
			exportOption = chart.options.exportOptions || {};
		exportOption.chart = exportOption.chart || {};
		exportOption.series = exportOption.series || [];
		exportOption.chart.type = newType;
		if (obj) {
			for (var i = 0; i < chartSeries.length; i++) {
				if(chartSeries[i].id == obj.userOptions.id){
					if (chartSeries[i].type) {
						chartSeries[i].type = newType;
						exportOption.series[i].type = newType;
						if (newType == 'scatter') { // 如果是散点图，线宽设置为0
							chartSeries[i].lineWidth = 0;
						} else {
							chartSeries[i].lineWidth = 2;
						}
					}
				}
			}
		} else {
			for (var i = 0; i < chartSeries.length; i++) {
				if (chartSeries[i].type) {
					chartSeries[i].type = newType;
					exportOption.series[i].type = newType;
					if (newType == 'scatter') { // 如果是散点图，线宽设置为0
						chartSeries[i].lineWidth = 0;
					} else {
						chartSeries[i].lineWidth = 2;
					}
				}
			}
		}
		chart.update({
			chart: {
				type: newType
			},
			series: chartSeries
		});
	}
	/**
	 * 字体设置
	 * @param isAdd  true增加字体 false 减小字体 
	 * @param type 设置的对像类型 title，axise，seties 
	 * @param obj  设置的对象
	 */
	Chart.prototype.setFontSize = function(isAdd, type, obj) {
		var chart = this,
			exportOption = chart.options.exportOptions || {};
		exportOption.chart = exportOption.chart || {};
		if (!type) {
			Ext.Msg.alert("提示", "请选择需要设置的对象");
			return;
		} else {
			switch (type) {
				case "title":
					var title = chart.options.title;
					var num = parseFloat(title.style.fontSize) || 12;
					if (isAdd) {
						num = num + 1;
					} else {
						num = num > 10 ? num - 1 : 10;
					}
					title.style.fontSize = num + "px";
					exportOption.title.style.fontSize = num + "px";
					chart.update({
						title: title
					});
					break;
				case "series":
					var chartSeries = chart.options.series;
					for (var i = 0; i < chartSeries.length; i++) {
						if (chartSeries[i].id == obj.userOptions.id) {
							var num = parseFloat(chartSeries[i].dataLabels.style.fontSize) || 12;
							if (isAdd) {
								num = num + 1;
							} else {
								num = num > 10 ? num - 1 : 10;
							}
							chartSeries[i].dataLabels.style.fontSize = num + "px";
							exportOption.series[i].dataLabels.style.fontSize = num + "px";
						}
					}
					chart.update({
						series: chartSeries
					});
					break;
				case "axise":
					var axisType = obj.coll,
						myAxis = chart.options[axisType];
					for (var i = 0; i < myAxis.length; i++) {
						if (myAxis[i].id == obj.userOptions.id) {
							var selectAxis = chart[axisType][i];
							var num1 = parseFloat(myAxis[i].title.style.fontSize) || 12,
								num2 = parseFloat(myAxis[i].labels.style.fontSize) || 12;
							if (isAdd) {
								num1 = num1 + 1;
								num2 = num2 + 1;
							} else {
								num1 = num1 > 10 ? num1 - 1 : 10;
								num2 = num2 > 10 ? num2 - 1 : 10;
							}
							myAxis[i].title.style.fontSize = num1 + "px";
							myAxis[i].labels.style.fontSize = num2 + "px";
							exportOption[axisType][i].title.style.fontSize = num1 + "px";
							exportOption[axisType][i].labels.style.fontSize = num2 + "px";
							selectAxis.update({
								title: {
									style: {
										fontSize: num1 + "px"
									}
								},
								labels: {
									style: {
										fontSize: num2 + "px"
									}
								}
							})
						}
					}
					break;
				default:
					break;
			}
		}
	}
	/**
	 * 线条粗细设置
	 * @param isAdd  true增加 false 减小 
	 * @param type 设置的对像类型 axise，seties 
	 * @param obj  设置的对象
	 */
	Chart.prototype.setLineWidth = function(isAdd, type, obj) {
		var chart = this,
			exportOption = chart.options.exportOptions || {};
		exportOption.chart = exportOption.chart || {};
		if (!type || type == 'title') {
			Ext.Msg.alert("提示", "请选择需要设置的对象");
			return;
		} else {
			switch (type) {
				case "series":
					var chartSeries = chart.options.series;
					for (var i = 0; i < chartSeries.length; i++) {
						if (chartSeries[i].id == obj.userOptions.id) {
							var num = parseFloat(chartSeries[i].lineWidth) || 2;
							if (isAdd) {
								num = num + 1;
							} else {
								num = num > 0 ? num - 1 : 0;
							}
							chartSeries[i].lineWidth = num;
							exportOption.series[i].lineWidth = num;
						}
					}
					chart.update({
						series: chartSeries
					});
					break;
				case "axise":
					var axisType = obj.coll,
						myAxis = chart.options[axisType];
					for (var i = 0; i < myAxis.length; i++) {
						if (myAxis[i].id == obj.userOptions.id) {
							var selectAxis = chart[axisType][i];
							var num1 = parseFloat(myAxis[i].lineWidth) || 1;
							if (isAdd) {
								num1 = num1 + 1;
							} else {
								num1 = num1 > 0 ? num1 - 1 : 0;
							}
							myAxis[i].lineWidth = num1;
							exportOption[axisType][i].lineWidth = num1;
							selectAxis.update({
								lineWidth: num1
							})
						}
					}
					break;
				default:
					break;
			}
		}
	}
	// 设置序列数据标签是否显示
	Chart.prototype.setlablesIsShow = function(series) {
		var chart = this,
			chartSeries = chart.options.series,
			exportOption = chart.options.exportOptions || {};
		exportOption.chart = exportOption.chart || {};
		exportOption.series = exportOption.series || [];
		if (series) {
			var sId = series.userOptions.id;
			for (var i = 0; i < chartSeries.length; i++) {
				if (chartSeries[i].id == sId) {
					chartSeries[i].dataLabels.enabled = !chartSeries[i].dataLabels.enabled;
					exportOption.series[i].dataLabels.enabled = !exportOption.series[i].dataLabels.enabled;
				}
			}
		} else {
			for (var i = 0; i < chartSeries.length; i++) {
				chartSeries[i].dataLabels.enabled = !chartSeries[i].dataLabels.enabled;
				exportOption.series[i].dataLabels.enabled = !exportOption.series[i].dataLabels.enabled;
			}
		}
		chart.update({
			series: chartSeries
		});

	};
	/**
	 * 标签小数位数改变
	 * @param isAdd  true增加 false 减小  
	 * @param obj  设置的对象
	 */
	Chart.prototype.ChangeDecimals = function(isAdd, obj) {
		var chart = this,
			chartSeries = chart.options.series,
			exportOption = chart.options.exportOptions || {};
		exportOption.chart = exportOption.chart || {};
		exportOption.series = exportOption.series || [];
		if (obj) {
			var sId = obj.userOptions.id;
			for (var i = 0; i < chartSeries.length; i++) {
				if (chartSeries[i].id == sId) {
					var num = null;
					if (isNaN(parseFloat(chartSeries[i].dataLabels.decimals))) {
						var n = (chartSeries[i].data[0].y || chartSeries[i].data[0][1]).toString().length - ((chartSeries[i].data[0].y ||
							chartSeries[i].data[0][1]).toString().indexOf(".") + 1);
						n = n < (chartSeries[i].data[0].y || chartSeries[i].data[0][1]).toString().length ? n : 0;
						num = isAdd ? n + 1 : n - 1;
					} else {
						num = isAdd ? chartSeries[i].dataLabels.decimals + 1 : chartSeries[i].dataLabels.decimals - 1;
					}
					num = num > 0 ? num : 0;
					chartSeries[i].dataLabels.decimals = num;
					exportOption.series[i].dataLabels.decimals = num;
				}
			}
		} else {
			for (var i = 0; i < chartSeries.length; i++) {
				var num = null;
				if (isNaN(parseFloat(chartSeries[i].dataLabels.decimals))) {
					var n = (chartSeries[i].data[0].y || chartSeries[i].data[0][1]).toString().length - ((chartSeries[i].data[0].y ||
						chartSeries[i].data[0][1]).toString().indexOf(".") + 1);
					n = n < (chartSeries[i].data[0].y || chartSeries[i].data[0][1]).toString().length ? n : 0;
					num = isAdd ? n + 1 : n - 1;
				} else {
					num = isAdd ? chartSeries[i].dataLabels.decimals + 1 : chartSeries[i].dataLabels.decimals - 1;
				}
				num = num > 0 ? num :0
				chartSeries[i].dataLabels.decimals = num;
				exportOption.series[i].dataLabels.decimals = num;
			}
		}
		chart.update({
			series: chartSeries
		});
	}
	/**
	 * 标签数据点加密抽稀
	 * @param isAdd  true加密 false 抽稀  
	 * @param obj  设置的对象
	 */
	Chart.prototype.ChangeStep = function(isAdd, obj) {
		var chart = this,
			chartSeries = chart.options.series,
			exportOption = chart.options.exportOptions || {};
		exportOption.chart = exportOption.chart || {};
		exportOption.series = exportOption.series || [];
		if (obj) {
			var sId = obj.userOptions.id;
			for (var i = 0; i < chartSeries.length; i++) {
				if (chartSeries[i].id == sId) {
					var markerOptions = chartSeries[i].marker,
						markerStep = (markerOptions && markerOptions.step) || 1,
						dataLabelsOptions = chartSeries[i].dataLabels,
						dataLabelStep = (dataLabelsOptions && dataLabelsOptions.step) || 1,
						points = obj.points;
					if (isAdd) {
						markerStep = markerStep + 1;
						dataLabelStep = dataLabelStep + 1;
					} else {
						markerStep = markerStep > 1 ? markerStep - 1 : 1;
						dataLabelStep = dataLabelStep > 1 ? dataLabelStep - 1 : 1;
					}
					chartSeries[i].marker.step = markerStep;
					chartSeries[i].dataLabels.step = dataLabelStep;
					if (markerStep || dataLabelStep) {
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
								point.dataLabel.attr({
									visibility: visibility
								});
							}
						})
					}
				}
			}
		} else {
			for (var i = 0; i < chartSeries.length; i++) {
				var markerOptions = chartSeries[i].marker,
					markerStep = (markerOptions && markerOptions.step) || 1,
					dataLabelsOptions = chartSeries[i].dataLabels,
					dataLabelStep = (dataLabelsOptions && dataLabelsOptions.step) || 1,
					points = chart.series[i].points;
				if (isAdd) {
					markerStep = markerStep + 1;
					dataLabelStep = dataLabelStep + 1;
				} else {
					markerStep = markerStep > 1 ? markerStep - 1 : 1;
					dataLabelStep = dataLabelStep > 1 ? dataLabelStep - 1 : 1;
				}
				chartSeries[i].marker.step = markerStep;
				chartSeries[i].dataLabels.step = dataLabelStep;
				if (markerStep || dataLabelStep) {
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
							point.dataLabel.attr({
								visibility: visibility
							});
						}
					})
				}
			}
		}
		chart.update({
			series: chartSeries
		});
	}
	/**
	 * 改变坐标轴的边距
	 * @param isAdd  true增加 false 减小  
	 * @param obj  设置的对象
	 */
	Chart.prototype.ChangePadding = function(isAdd, obj) {
		var chart = this,
			exportOption = chart.options.exportOptions || {};
			var type = null ,opposite = null;
		if (obj) {
			type = obj.coll,
			opposite = obj.opposite;
		}
		var left = chart.options.chart.marginLeft || chart.plotLeft;
		var bottom = chart.options.chart.marginBottom || chart.marginBottom;
		var top = chart.options.chart.marginTop || chart.plotTop;
		var right = chart.options.chart.marginRight || chart.marginRight;
		// 曲线改变事件的参数
		var params = [];
		var changeType = oldValue = newValue= null;
		if (type == 'xAxis' && opposite) {
			top = isAdd ? top + 2 : top - 2;
			params.push({
				changeType:'marginTop',
				oldValue:chart.options.chart.marginTop || chart.plotTop,
				newValue:top
			})
			exportOption.chart.marginTop = top;
		} else if (type == 'xAxis' && !opposite) {
			bottom = isAdd ? bottom + 2 : bottom - 2;
			params.push({
				changeType:'marginBottom',
				oldValue:chart.options.chart.marginBottom || chart.marginBottom,
				newValue:bottom
			})
			exportOption.chart.marginBottom = bottom;
		} else if (type == 'yAxis' && opposite) {
			right = isAdd ? right + 2 : right - 2;
			params.push({
				changeType:'marginRight',
				oldValue:chart.options.chart.marginRight || chart.marginRight,
				newValue:right
			})
			exportOption.chart.marginRight = right;
		} else if (type == 'yAxis' && !opposite) {
			left = isAdd ? left + 2 : left - 2;
			params.push({
				changeType:'marginLeft',
				oldValue:chart.options.chart.marginLeft || chart.plotLeft,
				newValue:left
			})
			exportOption.chart.marginLeft = left;
		} else if (obj == null) { // 没有传入坐标轴对象 默认设置左边距和下边距
			left = isAdd ? left + 2 : left - 2;
			bottom = isAdd ? bottom + 2 : bottom - 2;
			changeType = 'marginAll';
			params.push({
				changeType:'marginLeft',
				oldValue:chart.options.chart.marginLeft || chart.plotLeft,
				newValue:left
			})
			params.push({
				changeType:'marginBottom',
				oldValue:chart.options.chart.marginBottom || chart.marginBottom,
				newValue:bottom
			})
			exportOption.chart.marginLeft = left;
			exportOption.chart.marginBottom = bottom;
		}
		chart.update({
			chart: {
				marginLeft: left,
				marginBottom: bottom,
				marginTop: top,
				marginRight: right
			}
		});
		// 增加事件监听 
		var chartParent = chart.parentObject || chart.container;
		if(params.length>0){
			chartParent.fireEvent('chartChanged',chartParent,params);
		}
	};
	// 复制图片		
	Chart.prototype.copyChartImage = function() {
		var chart = this,
		chartOptions = chart.options;
		if (document.querySelector("#copyImage")) {
			var copyImage = document.querySelector("#copyImage");
			getSelect(copyImage)
			document.execCommand('copy');
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

			var copyImage = document.createElement("img");

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
			var spans = $(fillContent).find('span');

			spans.css({
				"transform": "rotate(0)",
			})

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
				//copyImage.innerHTML = imgUrl;
				copyImage.src = imgUrl;
				getSelect(copyImage)
				document.execCommand('copy');
			})
		}
	}
	// 获取图片的base64格式		
	Chart.prototype.getChartImage = function(callback) {
		var chart = this,
		chartOptions = chart.options;
		chartOptions = chartOptions || this.options;

		var parentChart = chartOptions.chart.parentChart,
			canvas = document.createElement("canvas"),
			scale = 2;
		var w = chartOptions.chart.width || chart.chartWidth|| chart.renderTo.style.width,
			h = chartOptions.chart.height || chart.chartHeight|| chart.renderTo.style.height;
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
			var imgUrl =canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
			if(callback){
				callback(imgUrl)
			}
		
		})		
	}
	// 导出数据
	Chart.prototype.exportChartData = function() {
		var chart = this;
		gridData = chart.seriesDataToExcelData();
		// 处理成后台需要的数据格式
		var exportData = {
			name: chart.title.textStr || 'chart',
			fixedColCount: 0,
			fixedRowCount: 0,
			isFillReport: false,
			style: {
				heights: [],
				widths: [],
				// borders:[]
			},
			data: []
		}
		var rows = gridData.rows.rows || [];
		var hear = gridData.header.value.split(',');
		rows.unshift({
			id: '',
			data: hear
		})
		for (var i = 0; i < rows.length; i++) {
			var rowNum = [];
			exportData.style.heights.push(30);
			var rowDatas = rows[i].data;
			if (rowDatas) {
				for (var j = 0; j < rowDatas.length; j++) {
					if (exportData.style.widths.length < rowDatas.length) {
						exportData.style.widths.push(100);
					}
					rowNum.push({
						sid: i + '_' + j,
						data: rows[i].data[j]
					})
				}
			}
			exportData.data.push(rowNum);
		}
		var tablehost = vmd.MicService.getDasIp();
		var reporthost = vmd.MicService.getReportIp();
		var hwRao = new HwRao(reporthost || tablehost, "report");
		hwRao.exportExcel(exportData);
	}
	
	// 数据查看
	Chart.prototype.chartDataViev = function () {
		var defaultDataViewOptions = {
			width: 700,
			height: 450,
			colWidth: 90,
			colAlign: "center"
		}
        var chart = this,
            dhxWindow = chart.dhxWindow,
            dataViewGrid = chart.dataViewGrid,
            dataViewToolBar = chart.dataViewToolBar,
            dataViewWindow = chart.dataViewWindow,
            dataViewForm = chart.dataViewForm,
            optionsChart = chart.options.chart,
            dataViewOptions = H.merge(defaultDataViewOptions, chart.options.dataview),
            dataExportUrl = dataViewOptions.url,
            gridData;
        if (optionsChart.showDialog == false) {
            return;
        }
        if (!dhxWindow) {

            if (_isTopWindow) {
                chart.dhxWindow = dhxWindow = new dhtmlXWindows();
            }
            else {
                chart.dhxWindow = dhxWindow = new dhtmlxPopWindow.dhtmlXWindows();
            }
            dhxWindow.vp.style.overflow = "auto";
        }
        if(chart.options.chart && chart.options.chart.propertypIframe ) {
            if(!chart._hoverFrame){
                chart._hoverFrame = $("<iframe style='position: absolute; display: block; border: 0px solid #FFFFFF;'>");
                $("body").append(chart._hoverFrame);
            }
            else{
                chart._hoverFrame.css({display: 'block'});
            }
        }
        if (!dataViewWindow) {
            var windowWidth = dataViewOptions.width,  //弹出窗口的宽度
                windowHeight = dataViewOptions.height,//弹出窗口的高度
                toolbarWidth = windowWidth - 30, //工具条的宽度
                girdWidth = windowWidth - 20,
                girdHeight = windowHeight - 150,
                buttonOffsetLeft = windowWidth - 200;
            chart.dataViewWindow = dataViewWindow = dhxWindow.createWindow({
				id:"dataViewWindow",
				width:windowWidth,
				height:windowHeight,
				center:true
			});
            if(chart._hoverFrame){
                chart._hoverFrame.css({top: "100px", left: "20px", width: windowWidth + "px", height: windowHeight + "px"});
            }
            else{
                dataViewWindow.centerOnScreen();
            }
            //dataViewWindow.button("park").hide();  //隐藏最小化按钮
            dataViewWindow.button("minmax2").hide(); //隐藏最大化按钮
            dataViewWindow.denyResize();             //禁止改变大小
            // dataViewWindow.denyMove();
            // dataViewWindow.hideHeader();

            dataViewWindow.setText("数据查看");
            dataViewWindow.attachEvent("onClose", function (win) {
                if(chart._hoverFrame){
                    chart._hoverFrame.css({display: 'none'});
                }
                win.hide();
            });
            dataViewWindow.attachEvent("onMoveFinish", function(win){
                if(chart._hoverFrame){
                    var position = win.getPosition();
                    chart._hoverFrame.css({top: position[1] + "px", left: position[0] + "px"});
                }
            });
            dataViewWindow.attachEvent("onShow", function (win) {
                if(chart._hoverFrame){
                    chart._hoverFrame.css({display: 'block'});
                }
                dataViewGrid.clearAll();
                dataViewGrid.clearSelection();
                gridData = chart.seriesDataToGridData();
                dataViewGrid.parse(gridData.rows, "json");

                //initToolBarState();
            });
            dataViewForm = chart.dataViewForm = dataViewWindow.attachForm([
                { type: "container", name: "dataViewToolBar", label: "", width: toolbarWidth, height: 30,offsetLeft: 5 },
                { type: "container", name: "dataViewGrid", label: "", width: girdWidth, inputHeight: girdHeight,offsetLeft: 4 },
                {
                    type: "block", offsetLeft: buttonOffsetLeft, list: [
                       { type: "button", width: 60, name: "confirm", value: "确定", offsetTop: 8, offsetLeft: 10 },
                       { type: "newcolumn" },
                       { type: "button", width: 60, name: "cancel", value: "取消", offsetTop: 8, offsetLeft: 10 }
                    ]
                }
            ]);
            dataViewForm.attachEvent("onButtonClick", function (name) {
                if (name == "confirm") {
                    if(chart._hoverFrame){
                        chart._hoverFrame.css({display: 'none'});
                    }
                    dataViewWindow.hide();
                    chart.updateFromGrid();
                }
                else if (name == "cancel") {
                    if(chart._hoverFrame){
                        chart._hoverFrame.css({display: 'none'});
                    }
                    dataViewWindow.hide();
                }
            });

			gridData = chart.seriesDataToGridData();
			console.log(gridData)
			
            if (_isTopWindow) {
                dataViewGrid = chart.dataViewGrid = new dhtmlXGridObject(dataViewForm.getContainer("dataViewGrid"));
            }
            else {
                dataViewGrid = chart.dataViewGrid = new dhtmlxPopWindow.dhtmlXGridObject(dataViewForm.getContainer("dataViewGrid"));
            }

            dataViewGrid.setImagePath(path + "/libs/dhtmlx/codebase/imgs/");
            dataViewGrid.setHeader(gridData.header.value, null, gridData.header.style);
            dataViewGrid.setInitWidths(gridData.cols.width);
            dataViewGrid.setColAlign(gridData.cols.align);
            dataViewGrid.setColSorting(gridData.cols.sort);
			dataViewGrid.setColTypes(gridData.cols.type);
			
            dataViewGrid.enableCSVHeader(true);
           
            dataViewGrid.enableBlockSelection();
            dataViewGrid.forceLabelSelection();
            dataViewGrid.enableColumnMove(true);
            dataViewGrid.enableUndoRedo();

            dataViewGrid.init();
            
            dataViewGrid.parse(gridData.rows, "json");

            dataViewGrid.hdrBox.style.borderBottomWidth = "1px";

            //            //初始化工具条
            if (_isTopWindow) {
                chart.dataViewToolBar = dataViewToolBar = new dhtmlXToolbarObject(dataViewForm.getContainer("dataViewToolBar"));
            }
            else {
                chart.dataViewToolBar = dataViewToolBar = new dhtmlxPopWindow.dhtmlXToolbarObject(dataViewForm.getContainer("dataViewToolBar"));
            }
            var iconPath = "";
            if(window.vmd){
                iconPath = path + "/../lib/dhtmlx/imgs/dhxtoolbar_material/";

            }
            else{
                iconPath = path + "/libs/dhtmlx/skins/skyblue/imgs/dhxtoolbar_skyblue/";
            }
            
            dataViewToolBar.addButton("save_cvs", 1, "", iconPath + "csv.gif", iconPath + "csv_dis.gif");
           
			dataViewToolBar.addSeparator("s1", 2);
			
            // dataViewToolBar.addButton("undo", 3, "", iconPath + "redo.gif", iconPath + "redo_dis.gif");
            // dataViewToolBar.addButton("redo", 4, "", iconPath + "undo.gif", iconPath + "undo_dis.gif");
                  

			dataViewToolBar.addListOption("file", "import_csv", 1, "button", "导入csv", iconPath + "import_csv.png");

			dataViewToolBar.addButton("import_csv", 1, "", iconPath + "import_csv.png", iconPath + "import_csv.png");

            //dataViewToolBar.addSpacer("redo");

			dataViewToolBar.setItemToolTip("save_cvs", "导出Excel");
			dataViewToolBar.setItemToolTip("import_csv", "导入Excel");
           
            //initToolBarState()

            dataViewToolBar.attachEvent("onClick", function (id) {
                switch (id) {
                    case "file":
                        break;
                    case "import_csv":
						var vmdreport = this;
						if (!vmdreport._importInputButton) {
							var inputdiv = document.createElement("div");
							inputdiv.id = "upload_excel_file_div";
							document.body.appendChild(inputdiv);
							inputdiv.style.hidden = "hidden";
							var input = ' <input type="file" id="upload_excel_file" hidden="hidden" >';
							inputdiv.innerHTML = input;

							var host = vmd.projectInfo ? (vmd.projectInfo.reportIp || vmdSettings.vmdReportIp || vmdSettings.dataServiceIp) : vmdSettings.vmdReportIp || vmdSettings.dataServiceIp;
							var hwRao = new HwRao(host, "report");
							var url = hwRao.getImportExcelUrl();
							var excelInput = vmdreport._importInputButton = document.getElementById("upload_excel_file");
							excelInput.url = url;
							excelInput.click();
							excelInput[-[1, ] ? "onchange" : "onpropertychange"] = function () {
								var fd = new FormData();
								fd.append("file", excelInput.files[0]);
								var msg = Ext.MessageBox;
								vmd.ajax({
									url: url,
									type: 'POST',
									cache: false,
									data: fd,
									processData: false,
									contentType: false,
									dataType: "json",
									beforeSend: function () {
										uploading = true;
									},
									success: function (data) {
										if (data.isSucceed) {
											datas=data.data;
											if (vmd.isString(data.data)) {
												eval("dhtmlx.imptemp=" + data.data + ";");
												datas = dhtmlx.imptemp;
											}
											var oriData = datas.datas;
											var gridDatas = chart.seriesDataToGridData();
											console.log(oriData)
											for(var i = 0;i<oriData.length;i++){
												if(i>0){
													var item = oriData[i];
													for(var j = 0;j<item.length;j++){
														gridDatas.rows.rows[i-1].data[j].value = item[j].data
													}
												}
											}
											console.log(gridDatas)
											dataViewGrid.clearAll();
											// dataViewGrid.clearSelection();
											dataViewGrid.parse(gridDatas.rows, "json");
											
										}
										else {
											Ext.Msg.show({
												title: "导入失败！",
												msg: data.errMsg,
												buttons: Ext.Msg.OK,
												icon: Ext.Msg.ERROR
											});
										}
									},
									error: function (data) {
										Ext.Msg.show({
											title: "导入失败！",
											msg: '上传失败，请重新上传！',
											buttons: Ext.Msg.OK,
											icon: Ext.Msg.ERROR
										});
									},
									complete: function () {
										//msg.hide();
									}
								});
							}
						}
						else {
							vmdreport._importInputButton.value = "";
							vmdreport._importInputButton.click();
						}
                        break;
                    case "save_cvs":
						chart.exportChartData();
                        break;
                    default:
                        break;
                }
            });

            function initToolBarState() {
                dataViewToolBar[dataViewGrid.getUndo().length > 0 ? "enableItem" : "disableItem"]("undo");
                dataViewToolBar[dataViewGrid.getRedo().length > 0 ? "enableItem" : "disableItem"]("redo");
            }

            function getFileName(filepath) {
                return filepath && (filepath.substring(filepath.lastIndexOf(".") + 1, filepath.length)).toLowerCase();
            }
        }
        else {
            if(chart._hoverFrame){
                var dimension = dataViewWindow.getDimension();
                chart._hoverFrame.css({top: "100px", left: "20px", width: dimension[0] + "px", height: dimension[1] + "px"})
            }
            //dataViewWindow.setPosition(e.clientX, e.clientY);
            dataViewWindow.show();
        }

        function onKeyPressed(code, ctrl, shift) {
            if (code == 67 && ctrl) {
                if (!dataViewGrid._selectionArea)
                    return alert("You need to select a block area in grid first");
                dataViewGrid.setCSVDelimiter("\t");
                dataViewGrid.copyBlockToClipboard();
            }
            if (code == 86 && ctrl) {
                dataViewGrid.setCSVDelimiter("\t");
                dataViewGrid.pasteBlockFromClipboard();
            }
            return true;
        }
    };

    //将曲线图序列数据转换成报表所识别的数据格式
    Chart.prototype.seriesDataToGridData = function () {
		var defaultDataViewOptions = {
			width: 500,
			height: 450,
			colWidth: 90,
			colAlign: "center"
		}
        var chart = this,
            options = chart.options,
            dataViewOptions = H.merge(defaultDataViewOptions, options.dataview),
            optionsChart = options.chart,
            parentChart = optionsChart.parentChart,
            series,
            i, j,
            gridData = {
                header: {
                    value: null,
                    style: ["text-align:center; font-size:14px; font-weight:bold"]
                },
                cols: {
                    width: dataViewOptions.colWidth,
                    align: dataViewOptions.colAlign,
                    type: "ro",
                    sort: null
                },
                rows: {
                    rows: []
                }
            };

        if (parentChart) {
            var charts = parentChart.charts;
            series = [];
            for (i = 0; i < charts.length; i++) {
                series = series.concat(charts[i].series);
            }
        }
        else {
            series = chart.series
        }

        for (i = 0; i < series.length; i++) {
            var s = series[i],
                points = s.points,
                xAxis = s.xAxis,
                xAxisOptions = xAxis && xAxis.options,
                tickPositions = xAxis && xAxis.tickPositions,
                tickPositionInfo = tickPositions && tickPositions.info,
                categories = xAxis && xAxis.categories,
                isDatetimeAxis = xAxis && xAxis.isDatetimeAxis,
                dateFormat = isDatetimeAxis && xAxisOptions.dateTimeLabelFormats[tickPositionInfo.unitName],
                split = i == 0 ? "" : ",";

            if(categories === true){
                categories = xAxis.names;
            }

            gridData.header.value = gridData.header.value || ((xAxisOptions && xAxisOptions.title && xAxisOptions.title.text) || "x轴") + ",";
            gridData.header.style.push("text-align:center; font-size:14px; font-weight:bold");
            gridData.cols.width += "," + dataViewOptions.colWidth;
            gridData.cols.align += "," + dataViewOptions.colAlign;
            gridData.cols.type += ",ed";
            gridData.cols.sort = gridData.cols.sort || (isDatetimeAxis ? "date" : (categories ? "str" : "int"));
            gridData.cols.sort += ",int";
            if (s.name.lastIndexOf("Navigator") != -1) {
                continue;
            }
            gridData.header.value += split + s.name;

            for (j = 0; j < points.length; j++) {
                var point = points[j],
                    rowID = categories ? categories[point.x] : point.x,
                    row = findRowByID(rowID);
                if (row) {
                    row.data.push({ value: point.y == null ? "" : point.y, chart_index: s.chart.index, series_index: s.index, point_index: point.index });
                }
                else {
                    gridData.rows.rows.push({
                        id: rowID, data: [
                            { value: isDatetimeAxis ? H.dateFormat(dateFormat, rowID, false) : rowID },
                            { value: point.y, chart_index: s.chart.index, series_index: s.index, point_index: point.index }
                        ]
                    });
                }
            }
        };

        function findRowByID(rowID) {
            for (var r = 0; r < gridData.rows.rows.length; r++) {
                var row = gridData.rows.rows[r];
                if (row.id == rowID) {
                    return row;
                }
            }
            return null;
        }
		
        return gridData;
    };
	
    //根据报表中改变的数据更新曲线图
    Chart.prototype.updateFromGrid = function () {
        var chart = this,
            parentChart = chart.options.chart.parentChart,
            dataViewGrid = chart.dataViewGrid,
            i, j;

        var changeRowsIDS = dataViewGrid.getAllRowIds(',').split(',');

        for (i = 0; i < changeRowsIDS.length; i++) {
            dataViewGrid.forEachCell(changeRowsIDS[i], function (cell, ind) {
                var chartIndex = cell.getAttribute("chart_index"),
                    seriesIndex = cell.getAttribute("series_index"),
                    pointIndex = cell.getAttribute("point_index"),
                    cellValue = cell.getValue() == "" ? null : parseFloat(cell.getValue()),
                    series;

                if (parentChart) {
                    var charts = parentChart.charts;
                    for (j = 0; j < charts.length; j++) {
                        if (charts[j].index == chartIndex) {
                            series = charts[j].series[seriesIndex];
                        }
                    }
                }
                else {
                    series = chart.series[seriesIndex];
                }

                //如果单元格对应的点存在，并且单元格的值与点的值不相等，则更新点
                if ((seriesIndex != undefined) && (pointIndex != undefined)) {
                    var changePoint;
                    for (j = 0; j < series.points.length; j++) {
                        if (series.points[j].index == pointIndex) {
                            changePoint = series.points[j];
                        }
                    }
                    if (changePoint && (changePoint.y != cellValue)) {
                        changePoint.update(cellValue);
                    }
                }

                    //如果单元格对应的点不存在，但是单元格中有值，则添加点
                else if ((seriesIndex == undefined) && (pointIndex == undefined)) {

                }
            })
        }
    };
	
	// 图片导出
	Chart.prototype.exportChartImage = function(e){
		var chart = this;
		if (!ContainsJS("html2canvas.js")) {
			$LAB.script(path + "/js/load/bluebird.js").wait();
			$LAB.script(path + "/js/load/html2canvas.js").wait();
			$LAB.script(path + "/js/load/downloadify.js").wait();
			$LAB.script(path + "/js/load/canvg.js").wait(function() {
				if (!chart.dhxSaveImageSetWindow) {
					chart.initSaveImageSetWindow();
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
				chart.initSaveImageSetWindow();
			} else {
				chart.dhxSaveImageSetWindow.bringToTop();
				if (chart.dhxSaveImageSetWindow.isHidden()) {
					//chart.dhxSaveImageSetWindow.setPosition(e.clientX, e.clientY);
					chart.dhxSaveImageSetWindow.show();
				}
			}
		}
	}
	// 初始化导出图片窗口
	Chart.prototype.initSaveImageSetWindow = function(e) {
		var chart = this,
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
				id:"saveImageSetWindow",
				width:windowWidth,
				height:windowHeight,
				center:true
			});
			dhxSaveImageSetWindow.centerOnScreen();
			dhxSaveImageSetWindow.setText(unescape("%u4FDD%u5B58%u56FE%u7247"));
			dhxSaveImageSetWindow.denyResize();
			dhxSaveImageSetWindow.attachEvent("onClose", function(win) {
				win.hide();
			});
			dhxSaveImageSetWindow.attachEvent("onShow", function(win) {
				initFormComponent(chart, dhxSaveImageForm);
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

			initFormComponent(chart, dhxSaveImageForm);

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
						swf: path + '/js/load/media/downloadify.swf',
						downloadImage: path + '/js/load/images/dload.png',
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
						chart._exportChart(exportOptions, merge(chart.options, chart.options.userExportOptions));
						exportOptions.histotyExportHeight = parseInt(heightInputValue);
						dhxSaveImageSetWindow.hide();
					}
				});
			}
		}
	}
	// 打印
	Chart.prototype.chartPrint = function(){
		var chart = this;
		var chartInner = "<div style='position: relative; padding:10px'>" + chart.container.innerHTML +"</div>";
		var odldHtml = window.document.body.innerHTML;
		$(chartInner).print();
		// window.document.body.innerHTML = chartInner;
		// window.print();
		// window.document.body.innerHTML = odldHtml;
	}
	//导出方法
	Chart.prototype._exportChart = function(options, chartOptions) {

		options = options || {};
		chartOptions = chartOptions || this.options;

		var chart = this,
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
	};
	//将曲线图序列数据转换成报表所识别的数据格式
	Chart.prototype.seriesDataToExcelData = function() {
		var chart = this,
			options = chart.options,
			optionsChart = options.chart,
			parentChart = optionsChart.parentChart,
			series,
			i, j,
			gridData = {
				header: {
					value: null,
					style: ["text-align:center; font-size:14px; font-weight:bold"]
				},
				cols: {
					width: 90,
					align: 'center',
					type: "ro",
					sort: null
				},
				rows: {
					rows: []
				}
			};

		if (parentChart) {
			var charts = parentChart.charts;
			series = [];
			for (i = 0; i < charts.length; i++) {
				series = series.concat(charts[i].series);
			}
		} else {
			series = chart.series
		}

		for (i = 0; i < series.length; i++) {
			var s = series[i],
				points = s.points,
				xAxis = s.xAxis,
				xAxisOptions = xAxis && xAxis.options,
				tickPositions = xAxis && xAxis.tickPositions,
				tickPositionInfo = tickPositions && tickPositions.info,
				categories = xAxis && xAxis.categories,
				isDatetimeAxis = xAxis && xAxis.isDatetimeAxis,
				dateFormat = isDatetimeAxis && xAxisOptions.dateTimeLabelFormats[tickPositionInfo.unitName],
				split = i == 0 ? "" : ",";

			if (categories === true) {
				categories = xAxis.names;
			}

			gridData.header.value = gridData.header.value || ((xAxisOptions && xAxisOptions.title && xAxisOptions.title.text) ||
				"x轴") + ",";
			gridData.header.style.push("text-align:center; font-size:14px; font-weight:bold");
			gridData.cols.width += "," + 90;
			gridData.cols.align += "," + "center";
			gridData.cols.type += ",ed";
			gridData.cols.sort = gridData.cols.sort || (isDatetimeAxis ? "date" : (categories ? "str" : "int"));
			gridData.cols.sort += ",int";
			if (s.name.lastIndexOf("Navigator") != -1) {
				continue;
			}
			gridData.header.value += split + s.name;

			for (j = 0; j < points.length; j++) {
				var point = points[j],
					rowID = categories ? categories[point.x] : point.x,
					row = findRowByID(rowID);
				if (row) {
					row.data.push(point.y == null ? "" : point.y);
				} else {
					gridData.rows.rows.push({
						id: rowID,
						data: [
							isDatetimeAxis ? H.dateFormat(dateFormat, rowID, false) : rowID, point.y
						]
					});
				}
			}
		};

		function findRowByID(rowID) {
			for (var r = 0; r < gridData.rows.rows.length; r++) {
				var row = gridData.rows.rows[r];
				if (row.id == rowID) {
					return row;
				}
			}
			return null;
		}

		return gridData;
	};
	// 获取选中曲线的表格形式的数据
	Chart.prototype.getSelectSeriesData = function(min,max){
		var chart = this,
			options = chart.options,
			optionsChart = options.chart,
			parentChart = optionsChart.parentChart,
			series,
			i, j,
			gridData = {
				header: {
					value: null,
					style: ["text-align:center; font-size:14px; font-weight:bold"]
				},
				cols: {
					width: 90,
					align: 'center',
					type: "ro",
					sort: null
				},
				rows: {
					rows: []
				}
			};

		if (parentChart) {
			var charts = parentChart.charts;
			series = [];
			for (i = 0; i < charts.length; i++) {
				series = series.concat(charts[i].series);
			}
		} else {
			series = chart.series
		}

		for (i = 0; i < series.length; i++) {
			var s = series[i],
				points = s.points,
				xAxis = s.xAxis,
				xAxisOptions = xAxis && xAxis.options,
				tickPositions = xAxis && xAxis.tickPositions,
				tickPositionInfo = tickPositions && tickPositions.info,
				categories = xAxis && xAxis.categories,
				isDatetimeAxis = xAxis && xAxis.isDatetimeAxis,
				dateFormat = isDatetimeAxis && xAxisOptions.dateTimeLabelFormats[tickPositionInfo.unitName],
				split = i == 0 ? "" : ",";

			if (categories === true) {
				categories = xAxis.names;
			}

			gridData.header.value = gridData.header.value || ((xAxisOptions && xAxisOptions.title && xAxisOptions.title.text) ||
				"x轴") + ",";
			gridData.header.style.push("text-align:center; font-size:14px; font-weight:bold");
			gridData.cols.width += "," + 90;
			gridData.cols.align += "," + "center";
			gridData.cols.type += ",ed";
			gridData.cols.sort = gridData.cols.sort || (isDatetimeAxis ? "date" : (categories ? "str" : "int"));
			gridData.cols.sort += ",int";
			if (s.name.lastIndexOf("Navigator") != -1) {
				continue;
			}
			gridData.header.value += split + s.name;

			for (j = 0; j < points.length; j++) {
                var point = points[j];
                if(min&&max){
                    if(point.x>=min&&point.x<=max){
                        var rowID = categories ? categories[point.x] : point.x,
                        row = findRowByID(rowID);
                        if (row) {
                            row.data.push(point.y == null ? "" : point.y);
                        } else {
                            gridData.rows.rows.push({
                                id: rowID,
                                data: [
                                    isDatetimeAxis ? H.dateFormat(dateFormat, rowID, false) : rowID, point.y
                                ]
                            });
                        }
                    }
                }else{
                    var rowID = categories ? categories[point.x] : point.x,
                        row = findRowByID(rowID);
                        if (row) {
                            row.data.push(point.y == null ? "" : point.y);
                        } else {
                            gridData.rows.rows.push({
                                id: rowID,
                                data: [
                                    isDatetimeAxis ? H.dateFormat(dateFormat, rowID, false) : rowID, point.y
                                ]
                            });
                        }
                }
                
			}
		};

		function findRowByID(rowID) {
			for (var r = 0; r < gridData.rows.rows.length; r++) {
				var row = gridData.rows.rows[r];
				if (row.id == rowID) {
					return row;
				}
			}
			return null;
		}
		// 处理成后台需要的数据格式
		var exportData = {
			name: chart.title.textStr || 'chart',
			data: []
		}
		var rows = gridData.rows.rows || [];
		var hear = gridData.header.value.split(',');
		rows.unshift({
			id: '',
			data: hear
		})
		for (var i = 0; i < rows.length; i++) {
			var rowNum = [];
			var rowDatas = rows[i].data;
			if (rowDatas) {
				for (var j = 0; j < rowDatas.length; j++) {
					rowNum.push({
						sid: i + '_' + j,
						data: rows[i].data[j]
					})
				}
			}
			exportData.data.push(rowNum);
		}
		return exportData;
	}
	// 获取选中区域的点
	Chart.prototype.getSelectedPoint = function(min,max){
		var chart = this,
			options = chart.options,
			series = chart.series,
			resultData = [];
			for (i = 0; i < series.length; i++) {
				var s = series[i],
					points = s.points,
					xAxis = s.xAxis,
					xAxisOptions = xAxis && xAxis.options,
					tickPositions = xAxis && xAxis.tickPositions,
					tickPositionInfo = tickPositions && tickPositions.info,
					categories = xAxis && xAxis.categories,
					isDatetimeAxis = xAxis && xAxis.isDatetimeAxis,
					dateFormat = isDatetimeAxis && xAxisOptions.dateTimeLabelFormats[tickPositionInfo.unitName],
					split = i == 0 ? "" : ",";
					var selectData = {
						refIndex: s.index, //生成的拟合数据的曲线对应的原始曲线的索引值
						name: s.name,
						refId: s.options.id,
						xAxis: s.options.xAxis,
						yAxis: s.options.yAxis,
						data: [],
						Xdata: []
					};
	
				if (categories === true) {
					categories = xAxis.names;
				}
				for (j = 0; j < points.length; j++) {
					var point = points[j];
					if(min&&max){
						if(point.x>=min&&point.x<=max){
							if (/\d{10,}/.test(point.x)) {
								selectData.data.push([j,  point.y]);
								selectData.Xdata.push(point.x);
							} else {
								selectData.data.push([point.x, point.y]);
								selectData.Xdata.push(point.x);
							}
						}
					}else{
						if (/\d{10,}/.test(p.x)) {
							selectData.data.push([j,  point.y]);
							selectData.Xdata.push(point.x);
						} else {
							selectData.data.push([point.x, point.y]);
							selectData.Xdata.push(point.x);
						}
					}
				}
			}
			resultData.push(selectData);
			return resultData;
	}
	// 保存模板
	Chart.prototype.saveTemplate = function(){
		var chart = this;
		if(chart.options.exportOptions){
			return chart.options.exportOptions;
		}else{
			return chart.userOptions;
		}
	}
	Chart.prototype.deepCopy = function(){
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
	// 初始化图片导出窗口
	function initFormComponent(chart, dhxSaveImageForm) {
		var exportOptions = chart.options.exporting || {},
			isKeepRatio,
			parentChart = chart.options.chart.parentChart,
			widthInput = dhxSaveImageForm.getInput("width"),
			heightInput = dhxSaveImageForm.getInput("height"),
			nameInput = dhxSaveImageForm.getInput("name"),
			formatCombo = dhxSaveImageForm.getCombo("format");

		var cssWidth = chart.chartWidth || chart.renderTo.style.width,
			cssHeight =chart.chartHeight || chart.renderTo.style.height,
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
	}
	// 判断是否加载了js文件
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
	// 建立选中的范围区域
	function getSelect(targetNode) {
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
	};
	// 判断是否是ie浏览器
	function isIE() {
		if (!!window.ActiveXObject || "ActiveXObject" in window || navigator.userAgent.indexOf("Edge") > -1) {
			return true;
		} else {
			return false;
		}
	};
	// 对SVG元素对象添加outerHTML属性
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
	function CreateJSPath(str,dis){
		var scripts = document.getElementsByTagName("script");
		var path = "";
		if(str && str.indexOf("js") != -1){
			for (var i = 0, l = scripts.length; i < l; i++) {
				var src = scripts[i].src;
				if (src.indexOf(str) != -1) {
					path = src.split(str)[0];
					break;
				}
			}
		}
	
		var href = location.href;
		href = href.split("#")[0].split("?")[0].split("/");
	
		var isAbsolutePath = true;
		if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
			isAbsolutePath = false;
			href.length = href.length - 1;
			path = path.split("/");
			path = href.concat(path);
		}
		if(isAbsolutePath){
			path = path.split("/");
		}
		path.length = path.length - 1 + (dis || 0);
		path = path.join("/");
		return path;
	}

///////////////////////////////////////////////////////////事件监听/////////////////////////////////////////////////////////////////////////
// 图表点事件
var allChart = [];
H.wrap(Pointer.prototype, 'init', function(proceed, e) {
	proceed.apply(this, Array.prototype.slice.call(arguments, 1));
	var chart = this.chart;
	var chartParent = chart.parentObject || chart.container;
	var chartId = chartParent.id;
	if(!chart.myChart){
		chart.myChart = {
			series: null,
			title: null,
			axise: null
		};
	}
});
H.wrap(Pointer.prototype, 'onContainerMouseDown', function(proceed, e) {
	proceed.apply(this, Array.prototype.slice.call(arguments, 1));
	var chart = this.chart;
	var chartParent = chart.parentObject || chart.container;
	if (allChart.length == 0) {
		allChart.push(chart)
	} else {
		for (var i = 0; i < allChart.length; i++) {
			if (allChart[i].chartParent&&allChart[i].chartParent.id != chartId) {
				allChart.push(chart)
			}
		}
	}
	if(chartParent.toolbar){
		chart.addTitleClick();
		chart.addAxisClick();
		chart.addSeriesClickOn();
		chart.addChartClick();
	}	
});
Chart.prototype.addChartClick = function() {
	var chart = this,
		renderer = chart.renderer,
		chartParent = chart.parentObject || chart.container;
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
		var myToolBar = Ext.getCmp(chartParent.toolbar);
		if(myToolBar){
			myToolBar.addToolBarEvent(chart)
		}
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
			var chartParent = chart.parentObject || chart.container;
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
		if(!series.isSeriesClick && chartParent.toolbar){
			chart.addSeriesClickOn();
		}
	});
	H.wrap(Series.prototype, 'select', function (proceed, selected) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        var series = this,
        chart = series.chart;
        if(series.selected){
            each(series.points, function (point) {
               if(!point.graphic){
                return;
               }
                point.graphic.states = point.graphic.states || {};
                point.historyMarkerOptions = point.historyMarkerOptions || merge({
                        fillColor: point.color,
                        lineColor: point.graphic.lineColor,
                        lineWidth:point.graphic.lineWidth
                    },point.graphic.states.normal);
                var pointArr = point.graphic.states.select;

                var pointChangeOptions = {
                    marker: pointArr
                };
                point.update(pointChangeOptions, false);
            });
            if(chart.myChart){
                chart.myChart.title = null;
                chart.myChart.axis = null;
                chart.myChart.series = series;
            }
            series.chart.redraw();
        }
        else{
            each(series.points, function (point) {
                if(!point.graphic){
                    return;
                   }
                point.graphic.states = point.graphic.states || {};
                var pointArr = point.historyMarkerOptions || merge({
                        fillColor: point.color,
                        lineColor: point.graphic.lineColor,
                        lineWidth:point.graphic.lineWidth
                    },point.graphic.states.normal);

                var pointChangeOptions = {
                    marker: pointArr
                };
                point.update(pointChangeOptions, false);
            });
            series.chart.redraw();
        }
    });
}
// 序列添加点击事件监听
Chart.prototype.addSeriesClickOn = function() {
	var chart = this,
	chartParent = chart.parentObject || chart.container;
	each(chart.series, function(series) {
		addEvent(series, 'click', function(e) {
			hideSeleBorder();
			var myToolBar = Ext.getCmp(chartParent.toolbar);
			setObjcAttr('series', chart.myChart, series);
			if(myToolBar){
				myToolBar.addToolBarEvent(chart)
			}
			var rect = series.group.element.childNodes[0].getBoundingClientRect();
			var chartRect = chart.container.getBoundingClientRect();
			chart.seleBorder.attr({
				visibility: 'visible',
				width: parseFloat(rect.width),
				height: parseFloat(rect.height),
				x: parseFloat(rect.x) - parseFloat(chartRect.left),
				y: parseFloat(rect.y) - parseFloat(chartRect.top)
			});
			// series.select();
		});
		series.isSeriesClick = true;
	});
}
// 标题添加点击事件监听
Chart.prototype.addTitleClick = function() {
	var chart = this,
	chartParent = chart.parentObject || chart.container;
	if (chart.title) {
		addEvent(chart.title.element, 'click', function(e) {
			hideSeleBorder();
			var myToolBar = Ext.getCmp(chartParent.toolbar);
			setObjcAttr('title', chart.myChart, chart.title);
			if(myToolBar){
				myToolBar.addToolBarEvent(chart)
			}
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
		});
	}
}
// 坐标轴添加点击事件监听
Chart.prototype.addAxisClick = function() {
	var chart = this,
	chartParent = chart.parentObject || chart.container;
	each(chart.axes, function(axis) {
		var options = axis.options;
		if (!axis.axisGroup) {
			return;
		}
		addEvent(axis.axisGroup.element, 'click', function(e) {
			hideSeleBorder();
			var myToolBar = Ext.getCmp(chartParent.toolbar);
			setObjcAttr('axise', chart.myChart, axis);
			if(myToolBar){
				myToolBar.addToolBarEvent(chart)
			}
			chart.seleBorder.attr(axis.getBackRect())
				.attr({
					visibility: 'visible',
				});
		});
		if (axis.labelGroup) {
			addEvent(axis.labelGroup.element, 'click', function(e) {
				hideSeleBorder();
				var myToolBar = Ext.getCmp(chartParent.toolbar);
				setObjcAttr('axise', chart.myChart, axis);
				if(myToolBar){
					myToolBar.addToolBarEvent(chart)
				}
				chart.seleBorder.attr(axis.getBackRect())
					.attr({
						visibility: 'visible',
					});
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
			visibility: 'hidden',
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
