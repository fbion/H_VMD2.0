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
	var Pointer = H.Pointer,
		Chart = H.Chart;

	//添加右击事件
	H.wrap(Pointer.prototype, 'setDOMEvents', function(proceed) {
		proceed.apply(this, Array.prototype.slice.call(arguments, 1));

		var pointer = this,
			container = pointer.chart.container;

		container.oncontextmenu = function(e) {
			pointer.onContainerContextMenu(e);
			return false;
		};
	});

	//重写容器的点击事件，当点击容器时右键菜单消失
	H.wrap(Pointer.prototype, 'onContainerClick', function(proceed) {
		proceed.apply(this, Array.prototype.slice.call(arguments, 1));
		var pointer = this,
			chart = pointer.chart;
		chart.HideContextMenu();
	});

	Pointer.prototype.onContainerMouseDown = Pointer.prototype.onContainerMouseDown || function(e) {};
	H.wrap(Pointer.prototype, 'onContainerMouseDown', function(proceed, e) {
		proceed.apply(this, Array.prototype.slice.call(arguments, 1));
	});


	//添加鼠标右键事件
	Pointer.prototype.onContainerContextMenu = Pointer.prototype.onContainerContextMenu || function(e) {};
	H.wrap(Pointer.prototype, 'onContainerContextMenu', function(proceed, e) {
		proceed.apply(this, Array.prototype.slice.call(arguments, 1));

		var chart = this.chart,
			options = chart.options,
			optionsChart = options.chart,
			hoverSeries = chart.hoverSeries,
			dhxContextMenu_Edit = chart.dhxContextMenu_Edit,
			dhxContextMenu_Point = chart.dhxContextMenu_Point;

		getDhtmlxWindow();
		if (_isTopWindow) {
			chart.dhxContextMenu_Edit = dhxContextMenu_Edit = chart.dhxContextMenu_Edit || new dhtmlXMenuObject();
			chart.dhxContextMenu_Point = dhxContextMenu_Point = chart.dhxContextMenu_Point || new dhtmlXMenuObject();
		} else {
			chart.dhxContextMenu_Edit = dhxContextMenu_Edit = chart.dhxContextMenu_Edit || new dhtmlxPopWindow.dhtmlXMenuObject();
			chart.dhxContextMenu_Point = dhxContextMenu_Point = chart.dhxContextMenu_Point || new dhtmlxPopWindow.dhtmlXMenuObject();
		}
		dhxContextMenu_Edit.renderAsContextMenu();
		dhxContextMenu_Point.renderAsContextMenu();
	});

	/**
	 * 判断鼠标右键位置是否在点上
	 * @param e
	 * @returns {*}
	 */
	Chart.prototype.onPoint = function(e) {
		var chart = this,
			hoverSeries = chart.hoverSeries;
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

	/**
	 * 显示右键菜单
	 * @param e
	 * @param type
	 * @constructor
	 */
	Chart.prototype.ShowContextMenu = function(e, type) {
		var chart = this,
			options = chart.options,
			optionsChart = options.chart,
			dhxContextMenu_Edit = chart.dhxContextMenu_Edit,
			dhxContextMenu_Point = chart.dhxContextMenu_Point;

		var offsetX = 0,
			offsetY = 0;
		//没有嵌入到iframe中
		getDhtmlxWindow();
		if (parentFrame) {
			offsetX = $(parentFrame).offset().left;
			offsetY = $(parentFrame).offset().top;
		}
		chart.HideContextMenu();
		switch (type) {
			case "edit":
				if (dhxContextMenu_Edit) {
					dhxContextMenu_Edit.showContextMenu(offsetX + e.clientX + ___getPageScroll()[0], offsetY + e.clientY +
						___getPageScroll()[1]);
				}
				break;
			case "point":
				if (dhxContextMenu_Point) {
					dhxContextMenu_Point.showContextMenu(offsetX + e.clientX + ___getPageScroll()[0], offsetY + e.clientY +
						___getPageScroll()[1]);
				}
				break;
			default:

		}
	};

	/**
	 * 隐藏所有右键菜单
	 * @param e
	 * @param type
	 * @constructor
	 */
	Chart.prototype.HideContextMenu = function() {
		var chart = this,
			options = chart.options,
			optionsChart = options.chart,
			parentChart = optionsChart && optionsChart.parentChart,
			dhxContextMenu_Edit = chart.dhxContextMenu_Edit,
			dhxContextMenu_Point = chart.dhxContextMenu_Point;

		if (parentChart) {
			var charts = parentChart.charts;
			for (var i = 0; i < charts.length; i++) {
				dhxContextMenu_Edit = charts[i].dhxContextMenu_Edit;
				dhxContextMenu_Point = charts[i].dhxContextMenu_Point;
				//隐藏右键菜单
				if (dhxContextMenu_Edit) {
					dhxContextMenu_Edit.hide();
				}
				if (dhxContextMenu_Point) {
					dhxContextMenu_Point.hide();
				}
			}
		} else {
			//隐藏右键菜单
			if (dhxContextMenu_Edit) {
				dhxContextMenu_Edit.hide();
			}
			if (dhxContextMenu_Point) {
				dhxContextMenu_Point.hide();
			}
		}
	}
}(Highcharts));


(function(H) {
	var allSeries,
		hoverSeries,
		addEvent = H.addEvent,
		Pointer = H.Pointer,
		Chart = H.Chart,
		dhxContextMenu_Edit;

	H.wrap(Pointer.prototype, 'onContainerContextMenu', function(proceed, e) {
		proceed.apply(this, Array.prototype.slice.call(arguments, 1));
		e = this.normalize(e);
		hoverSeries = this.chart.hoverSeries;

		var chart = this.chart;

		addMenuItem(e, chart);
		if (chart.onPoint(e)) {
			chart.ShowContextMenu(e, "point");
		} else {
			chart.ShowContextMenu(e, "edit");
		}
	});


	//在右键菜单中添加数据查看项
	function addMenuItem(e, chart) {
		//初始化右键菜单
		var dhxContextMenu_Edit = chart.dhxContextMenu_Edit,
			isExistEdit = false,
			isExistAddSeries = false;
		getDhtmlxWindow();
		dhxContextMenu_Edit.forEachItem(function(itemId) {
			if (itemId == "edit") {
				isExistEdit = true;
			}
			// if(itemId == "addSeries"){
			if (itemId == "deleteSeries") {
				isExistAddSeries = true;
			}
		});

		if (!isExistEdit) {
			dhxContextMenu_Edit.addNewChild(dhxContextMenu_Edit.topId, 1, "edit", unescape("%u7F16%u8F91"));
		}

		if (!isExistAddSeries) {
			dhxContextMenu_Edit.addNewChild("edit", 1, "addSeries", unescape("%u6DFB%u52A0%u66F2%u7EBF"), false);
			dhxContextMenu_Edit.addNewChild("edit", 2, "deleteSeries", unescape("%u5220%u9664%u66F2%u7EBF"), false);
			//给右键菜单中数据查看添加事件
			dhxContextMenu_Edit.attachEvent("onClick", function(id, zoneId, cas) {
				if (id == "addSeries") {
					var dhxAddSeriesSetWindow = chart.dhxAddSeriesSetWindow;
					if (!dhxAddSeriesSetWindow) {
						chart.initAddAndDeleteSeriesSetWindow(e);
					} else {
						dhxAddSeriesSetWindow.bringToTop();
						if (dhxAddSeriesSetWindow.isHidden()) {
							dhxAddSeriesSetWindow.setPosition(e.clientX, e.clientY);
							dhxAddSeriesSetWindow.show();
						}
					}
				} else if (id == "deleteSeries") {
					if (hoverSeries) {
						if (_isTopWindow) {
							dhtmlx.confirm({
								title: unescape("%u5220%u9664%u5E8F%u5217"),
								text: unescape("%u662F%u5426%u5220%u9664%u9009%u4E2D%u7684%u7EBF%uFF1F"),
								ok: unescape("%u786E%u5B9A"),
								cancel: unescape("%u53D6%u6D88"),
								callback: function(result) {
									if (result) {
										chart['seriesClickEvent' + hoverSeries.name] = null;
										chart['seriesDblClickEvent' + hoverSeries.name] = null;
										for (var i = 0; i < hoverSeries.data.length; i++) {
											selePoint = hoverSeries.data[i];
											if (selePoint.ploLabel) {
												selePoint.ploLabel.destroy();
											}
										}
										removeSeries(chart, hoverSeries);
									}
								}
							})
						} else {
							dhtmlxPopWindow.dhtmlx.confirm({
								title: unescape("%u5220%u9664%u5E8F%u5217"),
								text: unescape("%u662F%u5426%u5220%u9664%u9009%u4E2D%u7684%u7EBF%uFF1F"),
								ok: unescape("%u786E%u5B9A"),
								cancel: unescape("%u53D6%u6D88"),
								callback: function(result) {
									if (result) {
										chart['seriesClickEvent' + hoverSeries.name] = null;
										chart['seriesDblClickEvent' + hoverSeries.name] = null;
										for (var i = 0; i < hoverSeries.data.length; i++) {
											selePoint = hoverSeries.data[i];
											if (selePoint.ploLabel) {
												selePoint.ploLabel.destroy();
											}
										}
										removeSeries(chart, hoverSeries);
									}
								}
							})
						}
					} else {
						if (_isTopWindow) {
							dhtmlx.confirm({
								title: unescape("%u5220%u9664%u5E8F%u5217"),
								text: unescape("%u662F%u5426%u5220%u9664%u6574%u7EC4%u66F2%u7EBF%uFF1F"),
								ok: unescape("%u786E%u5B9A"),
								cancel: unescape("%u53D6%u6D88"),
								callback: function(result) {
									if (result) {
										var series = chart.series;
										while (series.length > 0) {
											if (series[0]) {
												chart['seriesClickEvent' + series[0].name] = null;
												chart['seriesDblClickEvent' + series[0].name] = null;
												for (var i = 0; i < series[0].data.length; i++) {
													selePoint = series[0].data[i];
													if (selePoint.ploLabel) {
														selePoint.ploLabel.destroy();
													}
												}
												removeSeries(chart, series[0]);
											}
										}
									}
								}
							})
						} else {
							dhtmlxPopWindow.dhtmlx.confirm({
								title: unescape("%u5220%u9664%u5E8F%u5217"),
								text: unescape("%u662F%u5426%u5220%u9664%u6574%u7EC4%u66F2%u7EBF%uFF1F"),
								ok: unescape("%u786E%u5B9A"),
								cancel: unescape("%u53D6%u6D88"),
								callback: function(result) {
									if (result) {
										var series = chart.series;
										while (series.length > 0) {
											if (series[0]) {
												chart['seriesClickEvent' + series[0].name] = null;
												chart['seriesDblClickEvent' + series[0].name] = null;
												for (var i = 0; i < series[0].data.length; i++) {
													selePoint = series[0].data[i];
													if (selePoint.ploLabel) {
														selePoint.ploLabel.destroy();
													}
												}
												removeSeries(chart, series[0]);
											}
										}
									}
								}
							})
						}
					}
				}
			});
		}
	}
	
	Chart.prototype.initAddAndDeleteSeriesSetWindow = function(e) {
		var chart = this,
			data = chart.options.data;
		yAxis = chart.options.yAxis;
		dhxWindow = chart.dhxWindow,
			dhxAddSeriesSetWindow = chart.dhxAddSeriesSetWindow,
			dhxAddSeriesForm = chart.dhxAddSeriesForm;

		allSeries = chart.options.allSeriesData || chart.options.series

		if (!dhxWindow) {
			if (_isTopWindow) {
				chart.dhxWindow = dhxWindow = new dhtmlXWindows();
			} else {
				chart.dhxWindow = dhxWindow = new dhtmlxPopWindow.dhtmlXWindows();
			}
			dhxWindow.vp.style.overflow = "auto";
		}
		if (!dhxAddSeriesSetWindow) {
			var windowWidth = 460,
				windowHeight = 375,
				axisXItemOffsetTop = 0,
				axisYItemHeight = 129,
				seriesTypeComOffsetLeft = 225,
				buttonOffsetLeft = 200;

			var _browser = getBrowserType();
			if (_browser.chrome) {} else if (_browser.firefox) {
				windowWidth = 460;
				windowHeight = 375;
			} else if (_browser.ie || _isIE) {
				switch (getIEDocumentMode()) {
					case 5:
						windowWidth = 460;
						windowHeight = 360;
						axisXItemOffsetTop = 12;
						seriesTypeComOffsetLeft = 225;
						buttonOffsetLeft = 200;
						break;
					case 6:
						windowWidth = 460;
						windowHeight = 360;
						axisXItemOffsetTop = 12;
						seriesTypeComOffsetLeft = 225;
						buttonOffsetLeft = 200;
						break;
					case 7:
						windowWidth = 460;
						windowHeight = 360;
						axisXItemOffsetTop = 12;
						seriesTypeComOffsetLeft = 225;
						buttonOffsetLeft = 200;
						break;
					case 8:
						windowWidth = 460;
						windowHeight = 372;
						axisXItemOffsetTop = 12;
						seriesTypeComOffsetLeft = 225;
						buttonOffsetLeft = 200;
						axisYItemHeight = 117;
						break;
					case 9:
						windowWidth = 460;
						windowHeight = 372;
						seriesTypeComOffsetLeft = 225;
						buttonOffsetLeft = 200;
						break;
					case 10:
						windowWidth = 460;
						windowHeight = 372;
						seriesTypeComOffsetLeft = 225;
						buttonOffsetLeft = 200;
						break;
					case 11:
						break;
				}
			} else if (_browser.safari) {} else if (_browser.opera) {}
			chart.dhxAddSeriesSetWindow = dhxAddSeriesSetWindow = dhxWindow.createWindow("addSeriesSetWindow", e.clientX, e.clientY,
				windowWidth, windowHeight);

			dhxAddSeriesSetWindow.centerOnScreen();
			dhxAddSeriesSetWindow.setText(unescape("%u6DFB%u52A0%u4E00%u7EC4%u66F2%u7EBF"));
			dhxAddSeriesSetWindow.denyResize();
			dhxAddSeriesSetWindow.attachEvent("onClose", function(win) {
				win.hide();
			});
			dhxAddSeriesSetWindow.attachEvent("onShow", function(win) {

			});

			var allSeriesOptions = [];
			var xDataAttr = allSeries[0].xData;
			for (var attr in data.json[0]) {
				var seriesOptions = {};
				if (attr != xDataAttr) {
					seriesOptions.value = attr;
					seriesOptions.text = attr;
					allSeriesOptions.push(seriesOptions);
				}
			}

			var allAxisOptions = [];
			var reg = /<\/?.+?\/?>/g;
			for (var i = 0; i < yAxis.length; i++) {
				var axisOptions = {};
				axisOptions.value = yAxis[i].id;
				axisOptions.text = yAxis[i].title.text.replace(reg, "");
				allAxisOptions.push(axisOptions)
			}
			allAxisOptions.push({
				value: 'addNewY',
				text: '新添Y轴'
			})
			dhxAddSeriesForm = chart.dhxAddSeriesForm = dhxAddSeriesSetWindow.attachForm([{
					type: "block",
					blockOffset: 5,
					list: [{
						type: "block",
						width: 425,
						blockOffset: 5,
						offsetTop: 10,
						list: [{
								type: "combo",
								position: "label-top",
								name: "yAxis",
								label: '所属Y轴',
								offsetTop: axisXItemOffsetTop,
								labelHeight: 18,
								inputHeight: 50,
								inputWidth: 100,
								options: allAxisOptions
							},
							{
								type: "multiselect",
								position: "label-top",
								name: "y_data",
								label: unescape("%u7EB5%u8F74%u6570%u636E%u9879"),
								labelHeight: 18,
								inputHeight: axisYItemHeight,
								inputWidth: 100,
								offsetTop: 20,
								options: allSeriesOptions
							},
							{
								type: "newcolumn"
							},
							{
								type: "fieldset",
								label: "序列",
								width: 290,
								offsetLeft: 10,
								offsetTop: 10,
								list: [{
									type: "block",
									width: 260,
									blockOffset: 2,
									list: [{
											type: "input",
											name: "y_name",
											labelWidth: 36,
											labelHeight: 18,
											width: 194,
											offsetLeft: 0,
											offsetTop: 5,
											position: "label-left",
											label: '名称',
											value: '新序列'
										},
										{
											type: "combo",
											name: "series_type",
											label: unescape("%u66F2%u7EBF%u7C7B%u578B%3A"),
											offsetTop: 10,
											offsetLeft: 2,
											labelHeight: 18,
											inputHeight: 50,
											inputWidth: 100,
											options: [{
													value: "line",
													text: unescape("%u6298%u7EBF%u56FE"),
													selected: true
												},
												{
													value: "column",
													text: unescape("%u67F1%u72B6%u56FE")
												},
												{
													value: "area",
													text: unescape("%u9762%u79EF%u56FE")
												},
												{
													value: "scatter",
													text: unescape("%u6563%u70B9%u56FE")
												}
											]
										}
									]
								}]
							},
							{
								type: "fieldset",
								label: unescape("%u7EB5%u8F74"),
								width: 290,
								offsetLeft: 10,
								offsetTop: 5,
								list: [{
										type: "input",
										name: "y_pos",
										labelWidth: 36,
										labelHeight: 18,
										width: 194,
										offsetLeft: 0,
										offsetTop: 5,
										position: "label-left",
										label: '位置',
										value: '0'
									},
									{
										type: "block",
										width: 170,
										blockOffset: 0,
										list: [{
											type: "checkbox",
											position: "label-right",
											name: "opposite",
											labelHeight: 20,
											label: '对面显示'
										}]
									},
								]
							}
						]
					}]
				},
				{
					type: "block",
					width: 410,
					list: [{
						type: "block",
						width: 200,
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
					}]
				}
			]);
			dhxAddSeriesForm.disableItem("y_pos");
			dhxAddSeriesForm.disableItem("opposite");

			dhxAddSeriesForm.setItemWidth("y_name", 202);
			dhxAddSeriesForm.attachEvent("onChange", function(name, value) {
				switch (name) {
					case "yAxis":
						var yItem = dhxAddSeriesForm.getCombo("yAxis").getSelectedValue();
						if (yItem == 'addNewY') {
							dhxAddSeriesForm.enableItem("y_pos");
							dhxAddSeriesForm.enableItem("opposite");
						} else {
							dhxAddSeriesForm.disableItem("y_pos");
							dhxAddSeriesForm.disableItem("opposite");
						}
						break;
						// case "y_data":
						// 	var yDataMultiselect = dhxAddSeriesForm.getSelect("y_data");
						// 	for (var i = 0; i < yDataMultiselect.length; i++) {
						// 		var selectItem = yDataMultiselect[i];
						// 		if (selectItem && selectItem.selected) {
						// 			dhxAddSeriesForm.getInput("y_name").value = selectItem.text;
						// 		}
						// 	}
						// 	break;
				}
			});

			dhxAddSeriesForm.attachEvent("onButtonClick", function(name) {
				if (name == "confirm") {
					var yDataMultiselect = dhxAddSeriesForm.getSelect("y_data"),
						xAxis = 0,
						yAxis = dhxAddSeriesForm.getCombo("yAxis").getSelectedValue(),
						seriesTypeCombo = dhxAddSeriesForm.getCombo("series_type"),
						addYDataNames = dhxAddSeriesForm.getInput("y_name").value,
						addSeriesOptions = {};

					for (var i = 0; i < yDataMultiselect.length; i++) {
						var selectItem = yDataMultiselect[i];
						if (selectItem && selectItem.selected) {
							var yDataStr = selectItem.value;
						}
					}
					if (!yDataStr) {
						yDataStr = yDataMultiselect[0].value;
					}
					if (yAxis == "addNewY") {
						var opposite = dhxAddSeriesForm.isItemChecked('opposite'),
							y_pos = dhxAddSeriesForm.getInput("y_pos").value;
						yAxis = chart.addYaxisByOptions(opposite, y_pos, addYDataNames);
					}

					addSeriesOptions.yDataName = addYDataNames;
					addSeriesOptions.yDataStr = yDataStr;

					addSeriesOptions.type = seriesTypeCombo.getSelectedValue();
					chart.addSeriesByOptions(addSeriesOptions, parseInt(xAxis), yAxis, xDataAttr);
					dhxAddSeriesSetWindow.hide();

					if (chart.addSeriesDoubleClick) {
						chart.addSeriesDoubleClick();
					}
					if (chart.addSeriesClick) {
						chart.addSeriesClick();
					}
				} else if (name == "cancel") {
					dhxAddSeriesSetWindow.hide();
				}
			});
		}
	}
	// 删除曲线
	function removeSeries(chart, seleserise) {
		if (chart.navigator) {
			var yAxiseLen = chart.yAxis.length - 1;
		} else {
			var yAxiseLen = chart.yAxis.length;
		}
		var params = [];
		params.push({
			changeType: 'seriesDele',
			name: seleserise.name,
		})
		if (seleserise.yAxis.series.length == 1 && seleserise.yAxis.series[0].userOptions.id == seleserise.userOptions.id) {
			var myAxis = seleserise.yAxis,
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
				seleserise.yAxis.remove();
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
		} else {
			seleserise.remove();
		}
		// 重新获取计算后Y轴在排列方向上的关联关系
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
					// else if(myOffset == yOffset && myOpposite == yOpposite ){
					// 	myAxis.vAxisArr.push(allyAxis[j].id)
					// }
				}
			}
		}
		// 增加事件监听 
		var chartParent = chart.parentObject || chart.container;
		if (params.length > 0) {
			chartParent.fireEvent('chartChanged', chartParent, params);
		}
	}
	// 添加序列
	Chart.prototype.addSeriesByOptions = function(addSeriesOptions, xAxis, yAxis, xDataAttr) {
		var chart = this,
			oriData = chart.data.columns,
			yDataName = addSeriesOptions.yDataName,
			seriesType = addSeriesOptions.type,
			yDataStr = addSeriesOptions.yDataStr;
		var xData, yData, seriesData = [];
		//console.log(oriData)
		for (var i = 0; i < oriData.length; i++) {
			if (oriData[i].name == xDataAttr) {
				xData = oriData[i];
			}
			if (oriData[i].name == yDataStr) {
				yData = oriData[i];
			}
		}

		if (xData && yData) {
			for (var j = 0; j < xData.length; j++) {
				var valueArr = [];
				valueArr.push(xData[j], yData[j]);
				seriesData.push(valueArr)
			}
		}

		var seriesOptions = {
			id: "series"+yAxis,
			name: yDataName,
			type: seriesType,
			xAxis: xAxis,
			yAxis: yAxis,
			data: seriesData
		};
		if (addSeriesOptions.type == "scatter") {
			seriesOptions.lineWidth = 0;
		}
		chart.addSeries(seriesOptions);
		var s = chart.get(seriesOptions.id)
		var params = [];
		params.push({
			changeType: 'seriesAdd',
			name: seriesOptions.name,
			type: seriesType,
			color:s.color,
			style:'Solid'
		})
		 // 增加事件监听 
		var chartParent = chart.parentObject || chart.container;
		if(params.length>0){
		    chartParent.fireEvent('chartChanged',chartParent,params);
		}
	}
	// 添加坐标轴
	Chart.prototype.addYaxisByOptions = function(opposite, y_pos, name) {
		var chart = this,
			myOffset = offse = null,
			yAxisObj = chart.yAxisObj,	
			chartYAxis = chart.yAxis,
			def = JSON.parse(JSON.stringify(chartYAxis[0].userOptions)),
			id = 'y-' + chartYAxis.length.toString() + Math.random().toString();
		// 添加坐标轴
		var options = {
			id: id,
			title: {
				text: name,
				//myOffset:def.title.myOffset || def.title.offset ||40
			},
			opposite: opposite,
		}		
		options.title.text = chart.parentObject.addBr(name);
		options.title = $.extend(true, def.title, options.title);
		options = $.extend(true, def, options);
		var myAxis = chart.addAxis(options, false);
		var yArr = [];
		for(var k in yAxisObj){
			if(yAxisObj[k].length>0){
				yArr.push(yAxisObj[k]);
			}
		}
		if(parseFloat(y_pos)<yArr.length){
			yArr.splice(parseFloat(y_pos),0,[myAxis])
		}else{
			yArr.push([myAxis])
		}
		var n =yArr.length;
		var ch = 32;
		var zh = chart.clipBox.height;
		var h = ((zh-ch) - (n - 1) * 20) / n ;
		if(h<80){
			chart.setSize(undefined,n*100+(n-1)*20+ch);
			chart.userOptions.chart.height = n*100+(n-1)*20+ch;
		}
		zh = chart.clipBox.height;
		h = ((zh-ch) - (n - 1) * 20) / n ;
		// 计算轴的位置
		for(var i = 0;i<yArr.length;i++){
			var arr = yArr[i];
			for(var j = 0;j<arr.length;j++){
				if(i ==0){
					arr[j].update({
						height: h ,
						top: ch+12 
					});
					arr[j].userOptions.height = h ;
					arr[j].userOptions.top = ch+12;
				}else{
					arr[j].update({
						height: h ,
						top: (h * i + 20 * i + ch+12) 
					});
					arr[j].userOptions.height = h ;
					arr[j].userOptions.top = (h * i + 20 * i + ch+12) ;
				}
				
			}
		}
		// 重新计算轴之间的关联关系
		chart.parentObject.getlinkforyAxis();
		return id;
	}

	function deleKh(str) {
		var t = str.replace("(", "").replace(")", "").replace("（", "").replace("）", "");
		return t;
	}
	function sortRule (a,b) {
		return a.userOptions.number - b.userOptions.number;
	}
}(Highcharts));
