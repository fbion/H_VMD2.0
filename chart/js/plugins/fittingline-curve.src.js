// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS

(function(HC, UNDEFINED) {
	var each = HC.each,
		extend = HC.extend,
		Chart = HC.Chart,
		defaultOptions = HC.getOptions(),
		wrap = HC.wrap,
		Axis = HC.Axis,
		chartProto = HC.Chart.prototype,
		isSelectLable = false,
		bntType = 1,
		fitUrl,
		clUrl;

	var guid = vmd.getGuid();
	// var result = {   //  数据格式
	//     "responseData":
	//         [{
	//             "refIndex": 0,
	//             "name": "产量",
	//             "xAxis": "x-0",
	//             "yAxis": "y-0",
	//             "data": [[10, 740], [20, 700], [30, 680], [40, 660]],
	//             "fitData": [[10, 734], [20, 708], [30, 682], [40, 656]],
	// 							"foreData" : [[50, 734], [60, 708], [70, 682], [80, 656]],
	//             "fitStyle": 4,
	//             "b": -56.24986129611011,
	//             "c": 0.7196320000000003,
	//             "Di": -56.24986129611011,
	//             "Q0": 739.8591492975527,
	//             "n": 0.9800000000000006,
	//             "r": 0.222
	//         }],
	//     "guid": "3c009618-1d6e-8186-f95a-5cc2ae8cdef7"
	// }

	// 绘制拟合曲线
	Chart.prototype.renderFittingChart = function(data) {
		var chart = this;
		var responseData = data.responseData;
		var SYKCCL = data.SYKCCL;
		if (responseData) {
			for (var i = 0; i < responseData.length; i++) {
				// debugger
				var responseItem = responseData[i];
				var colorIndex = chart.series.length % HC.getOptions().colors.length;
				var seriesColor = HC.getOptions().colors[colorIndex];
				var addSeries = chart.addSeries({
					refIndex: responseItem.refIndex,
					refId: responseItem.refId,
					name: responseItem.name + '（拟合数据）',
					showInLegend: false,
					selected: false,
					color: seriesColor,
					xAxis: responseItem.xAxis,
					yAxis: responseItem.yAxis,
					data: responseItem.fitData,
					fitStyle: responseItem.fitStyle, // 拟合方式
					fit_b: responseItem.b,
					fit_c: responseItem.c,
					fit_a: responseItem.a,
					fit_Di: responseItem.Di,
					fit_Q0: responseItem.Q0,
					fit_n: responseItem.n,
					fit_r: responseItem.r,
					fit_N: responseItem.fitN,
					SYKCCL: SYKCCL,
					hasExpress: true, //显示的文本标签中是否包含公式
					hasR2: true, //是否包含相关系数的平方
					hasQ0: true, //是否保存Q0
					hasDi: true, //是否包含Di
					hasGr: false, //是否包含可采储量Gr=累产+Nh
					hasNh: false, //是否包含剩余可采储量Nh
					hasRange: true //是否包含范围
				}, true);

				if (responseItem.foreData && responseItem.foreData.length > 0) {
					var foreaddSeries = chart.addSeries({
						refIndex: responseItem.refIndex,
						refId: responseItem.refId,
						name: responseItem.name + '（预测数据）',
						showInLegend: false,
						selected: false,
						color: seriesColor,
						dashStyle: 'ShortDash',
						xAxis: responseItem.xAxis,
						yAxis: responseItem.yAxis,
						data: responseItem.foreData,
						fitStyle: responseItem.fitStyle, // 拟合方式
						fit_b: responseItem.b,
						fit_c: responseItem.c,
						fit_Di: responseItem.Di,
						fit_Q0: responseItem.Q0,
						fit_n: responseItem.n,
						fit_r: responseItem.r,
						fit_N: responseItem.fitN,
						hasExpress: true, //显示的文本标签中是否包含公式
						hasR2: true, //是否包含相关系数的平方
						hasQ0: true, //是否保存Q0
						hasDi: true, //是否包含Di
						hasGr: false, //是否包含可采储量Gr=累产+Nh
						hasNh: false, //是否包含剩余可采储量Nh
						hasRange: true //是否包含范围
					}, true);
				}

				//计算显示的文本
				var expressLabel = _getExpressText(chart, addSeries);

				var X = addSeries.xAxis.translate(responseItem.fitData[0][0]),
					Y = addSeries.yAxis.translate(responseItem.fitData[0][1]),
					posX = X + 60,
					posY = chart.plotTop + chart.plotHeight - Y;

				addSeries.expressLabel = chart.renderer.label(expressLabel,
						posX,
						posY, '',
						X + chart.plotLeft,
						Y + chart.plotTop)
					.css({
						color: seriesColor,
						fontWeight: 'blod'
					})
					.attr({
						'stroke-width': 2,
						stroke: seriesColor,
						dashstyle: 'dash',
						fill: 'rgba(255,255,255,0.3)',
						padding: 8,
						r: 5,
						zIndex: 666,
					}).add().on("mousedown", function(e) {
						chart.options.chart.zoomType = 'none';
						isSelectLable = true;
						addSeries.isDown = true;
						oriX = e.clientX,
						oriY = e.clientY;
						addSeries.expressLabel.toFront();

						document.addEventListener('mouseup', function mosUp(e) {
							isSelectLable = false;
							addSeries.isDown = false;
							posX = addSeries.expressLabel.attr().x;
							posY = addSeries.expressLabel.attr().y;
							//console.log(posX,posY)
							setTimeout(function() {
								chart.options.chart.zoomType = 'xy';
							}, 300)

							document.removeEventListener('mouseup', mosUp)
						})

					}).on('mousemove', function(e) {
						if (addSeries.isDown) {
							addSeries.expressLabel.attr({
								x: posX + (e.clientX - oriX),
								y: posY + (e.clientY - oriY)
							})
						}
					})
			}
		}

		/**
		 * 获取表达式文本
		 * @private
		 */
		function _getExpressText(chart, addSeries) {
			var options = addSeries.options;
			var labelText = "";
			if (options.hasExpress) {
				// 拟合方式.0:指数;1:双曲;2:调和;3:幂;4:直线;5:对数;6:幂律指数;7:翁氏旋回;8:多项式
				switch (options.fitStyle) {
					case 0: //指数
						labelText += "Qt = " + options.fit_Q0 + " * e^(-" + options.fit_Di + " * t)";
						break;
					case 1: //双曲
						labelText += "Qt = " + options.fit_Q0 + " * (1 + " + options.fit_n + " * " + options.fit_Di + " * t)^(-1 / " +
							options.fit_n + ")";
						break;
					case 2: //调和
						labelText += "Qt = " + options.fit_Q0 + " / (1 + " + options.fit_Di + " * t)";
						break;
					case 3: //幂
						labelText += "Qt = " + options.fit_Q0 + " * t^" + options.fit_Di;
						break;
					case 4: //直线
						labelText += "Qt = " + options.fit_Di + " * t + " + options.fit_Q0;
						break;
					case 5: //对数
						labelText += "Qt = " + options.fit_Di + " * ln(t) + " + options.fit_Q0;
						break;
					case 6: //幂律指数
						labelText += "Qt = " + options.fit_Q0 + " * e^( -" + options.fit_b + " * t - " + options.fit_Di + " * t^" +
							options.fit_n + ")";
						break;
					case 7: //翁氏旋回
						//labelText += "Qt = " + options.fit_Q0 + " * t^(" + options.fit_Di + ")e^(-t/" + options.fit_c + ")";
						labelText += "Qt = " + options.fit_b + "* t^" + options.fit_b + " * e^" + "(-t/" + options.fit_b + ")";
						break;
				}
				if (options.fitStyle == '8') {
					labelText += "Qt =(" + options.fit_N[2] + ')^t+(' + options.fit_N[1] + ')^t+(' + options.fit_N[0] + ')';
				}
			}
			if (options.fit_r) {
				labelText += labelText == "" ? "" : "<br/>";
				labelText += "R² = " + options.fit_r;
			}
			if (options.fit_Q0) {
				labelText += labelText == "" ? "" : "<br/>";
				labelText += "a = " + options.fit_Q0;
			}
			if (options.fit_Di) {
				labelText += labelText == "" ? "" : "<br/>";
				labelText += "b = " + options.fit_Di;
			}
			if (options.hasGr) {
				labelText += labelText == "" ? "" : "<br/>";
				labelText += "Gr = " + "";
			}
			if (options.hasNh) {
				labelText += labelText == "" ? "" : "<br/>";
				labelText += "Nh = " + "";
			}
			if (options.hasRange) {
				labelText += labelText == "" ? "" : "<br/>";
				if (chart.xAxis[0].userOptions.type === "datetime") {
					labelText += options.name + ":(" + HC.dateFormat('%Y-%m-%d', options.data[0][0]) + "," + HC.dateFormat(
						'%Y-%m-%d', options.data[options.data.length - 1][0]) + ")";
				} else {
					labelText += options.name + ":(" + options.data[0][0] + "," + options.data[options.data.length - 1][0] + ")";
				}
			}
			if (options.SYKCCL) {
				labelText += '<br/>可采储量：' + options.SYKCCL;
			}
			return labelText;
		}
	}


	// 绘制标签代替按钮进行框选状态的切换
	function initBnt(chart) {
		var fittingBnt = chart.bnt = chart.renderer.label(
			'拟合方式', chart.plotLeft, 5
		).css({
			color: '#333',
			align: 'center',
			class: 'bnt-lable',
		}).attr({
			'stroke-width': 1,
			stroke: '#ddd',
			dashstyle: 'solid',
			fill: 'rgb(221,236,254)',
			r: 3,
			zIndex: 100,
		}).add().on('click', function() {
			bntType = 1;
			fittingBnt.attr({
				fill: 'rgb(221,236,254)'
			})
			scopeBnt.attr({
				fill: 'rgb(255,255,255)'
			})
			allBnt.attr({
				fill: 'rgb(255,255,255)'
			})
		});
		var allBnt = chart.bnt = chart.renderer.label(
			'全点拟合', chart.plotLeft + 80, 5
		).css({
			color: '#333',
			class: 'bnt-lable',
			align: 'center'
		}).attr({
			'stroke-width': 1,
			stroke: '#ddd',
			dashstyle: 'solid',
			r: 3,
			zIndex: 100,
		}).add().on('click', function() {
			allBnt.attr({
				fill: 'rgb(221,236,254)'
			})
			fittingBnt.attr({
				fill: 'rgb(255,255,255)'
			})
			scopeBnt.attr({
				fill: 'rgb(255,255,255)'
			})

			var selectSeries = chart.getSelectedSeries();
			var selectedPoints = getAllPoints(selectSeries);
			chart.openRangeSetWindow({
				selectedPoints: selectedPoints
			});

		});

		var scopeBnt = chart.bnt = chart.renderer.label(
			'范围查看', chart.plotLeft + 160, 5
		).css({
			color: '#333',
			class: 'bnt-lable',
			align: 'center'
		}).attr({
			'stroke-width': 1,
			stroke: '#ddd',
			dashstyle: 'solid',
			r: 3,
			zIndex: 100,
		}).add().on('click', function() {
			bntType = 2;
			scopeBnt.attr({
				fill: 'rgb(221,236,254)'
			})
			fittingBnt.attr({
				fill: 'rgb(255,255,255)'
			})
			allBnt.attr({
				fill: 'rgb(255,255,255)'
			})
		});
	}



	function defined(obj) {
		return obj !== UNDEFINED && obj !== null;
	}

	extend(defaultOptions, {

	});

	/**
	 * 获取选中的点
	 * @param selectedSeries
	 * @param event
	 * @param type
	 * @returns {Array}
	 * @private
	 */
	function _getSelectedPoints(selectedSeries, event, type, max) {
		var resultData = []; //选中点的序列数组
		//选择满足横轴范围内的数据，纵轴方向无限制
		if (type == "x") {
			for (var i = 0; i < selectedSeries.length; i++) {
				var s = selectedSeries[i];
				var selectData = {
					refIndex: s.index, //生成的拟合数据的曲线对应的原始曲线的索引值
					name: s.name,
					refId: s.options.id,
					xAxis: s.options.xAxis,
					yAxis: s.options.yAxis,
					data: [],
					Xdata: []
				};
				var axisRange = _getSelectAxisRange(s, event.xAxis, max);
				if (axisRange) {
					var sPoints = s.points;
					for (var j = 0; j < sPoints.length; j++) {
						var p = sPoints[j];
						if (p.x >= axisRange[0] && p.x <= axisRange[1]) {
							if (/\d{10,}/.test(p.x)) {
								selectData.data.push([j, p.y]);
								selectData.Xdata.push(p.x);
							} else {
								selectData.data.push([p.x, p.y]);
								selectData.Xdata.push(p.x);
							}
						}
					}
				}
				resultData.push(selectData);
			}
		}
		//选择横向纵向都在范围内的数据
		else if (type == "xy") {
			for (var i = 0; i < selectedSeries.length; i++) {
				var s = selectedSeries[i];
				var selectData = {
					refIndex: s.index, //生成的拟合数据的曲线对应的原始曲线的索引值
					name: s.name,
					refId: s.options.id,
					xAxis: s.options.xAxis,
					yAxis: s.options.yAxis,
					data: [],
					Xdata: []
				};
				var axisXRange = _getSelectAxisRange(s, event.xAxis),
					axisYRange = _getSelectAxisRange(s, event.yAxis);
				if (axisXRange && axisYRange) {
					var sPoints = s.points;
					for (var j = 0; j < sPoints.length; j++) {
						var p = sPoints[j];
						if (p.x >= axisXRange[0] && p.x <= axisXRange[1] && p.y >= axisYRange[0] && p.y <= axisYRange[1]) {
							if (/\d{10,}/.test(p.x)) {
								selectData.data.push([j, p.y]);
								selectData.Xdata.push(p.x);
							} else {
								selectData.data.push([p.x, p.y]);
								selectData.Xdata.push(p.x);
							}
						}
					}
				}
				resultData.push(selectData);
			}
		}
		return resultData;
	}

	// 获取所有点
	function getAllPoints(selectedSeries) {
		var resultData = []; //选中点的序列数组
		//选择满足横轴范围内的数据，纵轴方向无限制
		for (var i = 0; i < selectedSeries.length; i++) {
			var s = selectedSeries[i];
			var selectData = {
				refIndex: s.index, //生成的拟合数据的曲线对应的原始曲线的索引值
				name: s.name,
				refId: s.options.id,
				xAxis: s.options.xAxis,
				yAxis: s.options.yAxis,
				data: [],
				Xdata: []
			};
			var sPoints = s.points;
			for (var j = 0; j < sPoints.length; j++) {
				var p = sPoints[j];
				if (!p.deleteMode) {
					if (/\d{10,}/.test(p.x)) {
						selectData.data.push([j, p.y]);
						selectData.Xdata.push(p.x);
					} else {
						selectData.data.push([p.x, p.y]);
						selectData.Xdata.push(p.x);
					}
				}
			}
			resultData.push(selectData);
		}
		return resultData;
	}

	/**
	 * 获取选中点的轴的范围
	 */
	function _getSelectAxisRange(series, axis, max) {
		for (var i = 0; i < axis.length; i++) {
			if (axis[i].axis.options.id == series.xAxis.options.id &&max) {
				if (!isNaN(max)) {
					if(axis[i].max>max){
						alert('框选范围请在标示线以内');
						return null;
					}else{
						return [axis[i].min, axis[i].max]
					}
				}
			} else {
				return [axis[i].min, axis[i].max]
			}
		}
		return null;
	}




	//将缩放时重新设置坐标轴范围屏蔽掉
	wrap(Axis.prototype, 'zoom', function(proceed, newMin, newMax) {
		return true;
	});

	/**
	 * Override axisProto.init to mix in special axis instance functions and function overrides
	 */
	wrap(chartProto, 'zoom', function(proceed, event) {

		if (isSelectLable) {
			return
		}
		var chart = this,
			options = chart.options,
			pointer = chart.pointer;

		// If zoom is called with no arguments, reset the axes
		if (!event || event.resetSelection) {
			each(chart.axes, function(axis) {
				hasZoomed = axis.zoom();
			});
		} else { // else, zoom in on all axes
			each(event.xAxis.concat(event.yAxis), function(axisData) {
				var axis = axisData.axis,
					isXAxis = axis.isXAxis;

				// don't zoom more than minRange
				if (pointer[isXAxis ? 'zoomX' : 'zoomY'] || pointer[isXAxis ? 'pinchX' : 'pinchY']) {
					hasZoomed = axis.zoom(axisData.min, axisData.max);
					if (axis.displayBtn) {
						displayButton = true;
					}
				}
			});
		}
		max = chart.userOptions.fittingMinValue || null;
		var selectSeries = chart.getSelectedSeries();
		var selectWay = options.selectWay || "0"; //"0"选择横向范围内的点，“1”选择矩形框内的点
		var selectedPoints = _getSelectedPoints(selectSeries, event, selectWay == "0" ? "x" : "xy", max);

		for (var i = 0; i < selectedPoints.length; i++) {
			if(max && selectedPoints[i].data.length == 0 ){
				return;
			}
			if (bntType === 2 && selectedPoints[i].data.length < 6) {
				alert("请至少选择6个数据！");
				return;
			}
			if (bntType === 1 && selectedPoints[i].data.length < 6) {
				alert("请至少选择6个数据！");
				return;
			}
		}
		if(chart.userOptions.hasFittingWin){
			if (bntType === 1) {
				chart.openRangeSetWindow({
					selectedPoints: selectedPoints
				});
			} else if (bntType === 2) {
				chart.openScopeWindow({
					selectedPoints: selectedPoints
				});
			}
		}else{ // 不要弹窗直接计算

			var fitType = 'exp',
				fitStyle = 0,
				firstPiont = options.series[0].data[0][0],
				endPoint = options.series[0].data[options.series[0].data.length-1][0];
			fitUrl = chart.userOptions.fittingPath || 'http://192.168.1.102:8889';
			if (!fitUrl) {
				alert("请确保已经传入拟合计算服务地址")
				return
			}
			var foreNumber = ( options.series[0].data.length-1) - (selectedPoints[0].data[selectedPoints[0].data.length-1][0])

			var reg = /^[0-9]*$/;
			if (!reg.test(foreNumber)) {
				alert("预测点数只能为数字")
				return;
			}
			var oriselectedPoints = chart.deepCopy(selectedPoints)
	
			for(var i = 0;i<selectedPoints.length;i++){
				selectedPoints[i].foreNum = foreNumber;
				selectedPoints[i].fitStyle = fitStyle;
				var data = selectedPoints[i].data;
				for(var j = 0;j<data.length;j++){
					data[j][0] = j+1;
				}
			}
			var obj = {
				responseData: selectedPoints,
				guid: guid
			}
			var spTime = 1; // 默认按月计算  2按天  3按年
			if(selectedPoints[0].Xdata[1]- selectedPoints[0].Xdata[0] < 25*60*60*1000){
				spTime = 2
			}else if(selectedPoints[0].Xdata[1]- selectedPoints[0].Xdata[0] > 32*24*60*60*1000){
				spTime = 3
			}
			//console.log(obj)
			var dataSend = JSON.stringify(obj)
			$.support.cors = true;
			// CurveFore  拟合与预测接口
			// CurveFit   单独的拟合接口
			$.ajax({
				url: fitUrl + "/CurveFore?func=" + fitType,
				type: "post",
				data: dataSend,
				dataType: 'json',
				contentType: 'application/json',
				success: function(data) {
					if (!data || JSON.parse(data).length == 0) {
						alert('请确认曲线数据为递减曲线');
						return;
					}
					var res = JSON.parse(data)
					res.responseData.forEach(function(item, i) {
						item.data = oriselectedPoints[i].data;
						item.fitData.forEach(function(value, j) {
							if (isNaN(value[1])) {
								alert('递减数据不支持翁氏旋回拟合方式！');
								return;
							}
							value[0] = oriselectedPoints[i].Xdata[j];
							value[1] = parseFloat(value[1] .toFixed(2));
						})
						// 有预测数据
						if (item.foreData) {
							if (/\d{10,}/.test(firstPiont)) {
								// 如果是日期格式的数据，预测的数据需要转换
								item.foreData.forEach(function(value,index) {
									if(chart.options.forFromEndPiont){
										if(spTime === 1){
											var t = AddMonthNumsDate(endPoint, index)
										}else if(spTime === 2){
											var t = AddDaysNumsDate(endPoint, index)
										}else if(spTime === 3){
											var t = AddYearsNumsDate(endPoint, index)
										}
									}else{
										if(spTime === 1){
											var t = AddMonthNumsDate(item.fitData[0][0], value[0]-1)
										}else if(spTime === 2){
											var t = AddDaysNumsDate(item.fitData[0][0], value[0]-1)
										}else if(spTime === 3){
											var t = AddYearsNumsDate(item.fitData[0][0], value[0]-1)
										}
									}
									value[0] = new Date(t).getTime();
									value[1] = parseFloat(value[1] .toFixed(2));
								})
							}else{
								if(chart.options.forFromEndPiont){
									item.foreData.forEach(function(value,index) {
										value[0] = endPoint + index;
									})
								}
							}
							//console.log(item.foreData)
						}

						// 处理拟合点与预测点不连贯的问题
						if (item.foreData && item.foreData.length > 1) {
							item.foreData.unshift(item.fitData[item.fitData.length - 1])
						}
					})
					// 绘制曲线
					//initData(chart,res);
					chart.renderFittingChart(res);
					var chartParent = chart.parentObject || chart.container;
					chartParent.fireEvent('onFitting', chart, oriselectedPoints, res);
				},
				error: function(returndata) {
					console.log(returndata)
				}
			});

		}
		
	});

	//打开拟合方式选择对话框
	HC.Chart.prototype.openRangeSetWindow = function(paras) {
		var chart = this,
			options = chart.options,
			firstPiont = options.series[0].data[0][0],
			endPoint = options.series[0].data[options.series[0].data.length-1][0];
			dhxWindows = chart.dhxWindows,
			selectedPoints = paras.selectedPoints,
			fitType = 'exp',
			fitStyle = 0;
			fitUrl = chart.userOptions.fittingPath || 'http://192.168.1.102:8889';

		if (!dhxWindows) {
			if (!chart.myLableWins) {
				chart.myLableWins = myLableWins = new dhtmlXWindows("dhx_blue");
				myLableWins.createWindow({
					id: "setRect",
					text: '趋势预测',
					center: true,
					width: 360,
					height: 220
				});
			} else {
				myLableWins.window("setRect").show();
			}

			dhxLableForm = chart.dhxLableForm = myLableWins.window("setRect").attachForm([{
					type: "block",
					width: 350,
					blockOffset: 5,
					list: [
						//    {type: "fieldset", label: '拟合方式', width:410, offsetLeft:1, offsetTop :10, list:[
						//            {type:"settings", offsetLeft:2, blockOffset:1, position:"label-right"},
						//            {type: "block",width:80, offsetLeft: 1,offsetTop: 5,name:"", blockOffset:0,list: [
						//                    {type: "radio",name: "fitting",value:'log', checked:true, label: "对数"},
						//                    {type: "radio",name: "fitting", value:'line', label: "直线"},
						//                ]},
						//    		{type: "newcolumn"},
						//    		{type: "block",width:90, offsetLeft: 1,offsetTop: 5,name:"", blockOffset:0,list: [
						//    				{type: "radio",name: "fitting", value:'hyper', label: "双曲"},
						//    				{type: "radio",name: "fitting", value:'attemper', label: "调和"},
						//    			]},
						//            {type: "newcolumn"},
						//            {type: "block",width:90, offsetLeft: 1,offsetTop: 5,name:"", blockOffset:0,list: [
						//                    {type: "radio",name: "fitting", value:'polynomial', label: "多项式"},
						//                    {type: "radio",name: "fitting", value:'exp', label: "指数"},
						//                ]},
						//    		{type: "newcolumn"},
						//    		{type: "block",width:90, offsetLeft: 1,offsetTop: 5,name:"", blockOffset:0,list: [
						//    				{type: "radio",name: "fitting", value:'power', label: "幂函数"},
						//    				{type: "radio",name: "fitting", value:'weng', label: "翁氏旋回"},
						//    			]}
						//        ]},
						{
							type: "fieldset",
							label: '趋势预测',
							width: 340,
							offsetLeft: 1,
							offsetTop: 10,
							list: [{
								type: "block",
								offsetLeft: 1,
								offsetTop: 1,
								name: "background_set",
								blockOffset: 0,
								list: [{
									type: "input",
									name: "foreNumber",
									width: 60,
									value: '0',
									label: "预测点数",
									labelWidth: 60
								}]
							}]
						},
					]
				},
				{
					type: "block",
					offsetLeft: 120,
					list: [{
							type: "button",
							width: 50,
							name: "confirm",
							value: unescape("%u786E%u5B9A"),
							offsetTop: 15,
							offsetLeft: 60
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
							offsetLeft: 10
						}
					]
				}
			]);

			myLableWins.attachEvent("onClose", function(win) {
				myLableWins.window("setRect").hide();
			});

			dhxLableForm.attachEvent("onButtonClick", function(name) {
				if (name == "confirm") {
					if (!fitUrl) {
						alert("请确保已经传入拟合计算服务地址")
						return
					}
					var foreNumber = parseFloat(dhxLableForm.getItemValue("foreNumber"));
					var reg = /^[0-9]*$/;
					if (!reg.test(foreNumber)) {
						alert("预测点数只能为数字")
						return;
					}
					var oriselectedPoints = chart.deepCopy(selectedPoints)
					selectedPoints.forEach(function(item) {
						item.foreNum = foreNumber;
						item.fitStyle = fitStyle;
					})
					var obj = {
						responseData: selectedPoints,
						guid: guid
					}
					var spTime = 1; // 默认按月计算  2按天  3按年
					if(selectedPoints[0].Xdata[1]- selectedPoints[0].Xdata[0] < 25*60*60*1000){
						spTime = 2
					}else if(selectedPoints[0].Xdata[1]- selectedPoints[0].Xdata[0] > 32*24*60*60*1000){
						spTime = 3
					}
					//console.log(obj)
					var dataSend = JSON.stringify(obj)
					$.support.cors = true;
					// CurveFore  拟合与预测接口
					// CurveFit   单独的拟合接口
					$.ajax({
						url: fitUrl + "/CurveFore?func=" + fitType,
						type: "post",
						data: dataSend,
						dataType: 'json',
						contentType: 'application/json',
						success: function(data) {
							if (!data || JSON.parse(data).length == 0) {
								alert('请确认曲线数据为递减曲线');
								return;
							}
							var res = JSON.parse(data)
							res.responseData.forEach(function(item, i) {
								item.data = oriselectedPoints[i].data;
								item.fitData.forEach(function(value, j) {
									if (isNaN(value[1])) {
										alert('递减数据不支持翁氏旋回拟合方式！');
										return;
									}
									value[0] = oriselectedPoints[i].Xdata[j]
								})
								// 有预测数据
								if (item.foreData) {
									if (/\d{10,}/.test(firstPiont)) {
										// 如果是日期格式的数据，预测的数据需要转换
										item.foreData.forEach(function(item,index) {
											if(chart.options.forFromEndPiont){
												if(spTime === 1){
													var t = AddMonthNumsDate(endPoint, index)
												}else if(spTime === 2){
													var t = AddDaysNumsDate(endPoint, index)
												}else if(spTime === 3){
													var t = AddYearsNumsDate(endPoint, index)
												}
											}else{
												if(spTime === 1){
													var t = AddMonthNumsDate(firstPiont, item[0])
												}else if(spTime === 2){
													var t = AddDaysNumsDate(firstPiont, item[0])
												}else if(spTime === 3){
													var t = AddYearsNumsDate(firstPiont, item[0])
												}
											}
											item[0] = new Date(t).getTime();
										})
									}else{
										if(chart.options.forFromEndPiont){
											item.foreData.forEach(function(item,index) {
												item[0] = endPoint + index;
											})
										}
									}
									//console.log(item.foreData)
								}

								// 处理拟合点与预测点不连贯的问题
								// if (item.foreData && item.foreData.length > 1) {
								// 	item.foreData.unshift(item.fitData[item.fitData.length - 1])
								// }
							})
							// 绘制曲线
							//initData(chart,res);
							chart.renderFittingChart(res);

							myLableWins.window("setRect").hide();
							var chartParent = chart.parentObject || chart.container;
							chartParent.fireEvent('onFitting', chart, oriselectedPoints, res);
						},
						error: function(returndata) {
							console.log(returndata)
						}
					});
				}
				if (name == "cancel") {
					myLableWins.window("setRect").hide();
				}
			})
			dhxLableForm.attachEvent("onChange", function(name, value) {
				if (name === 'fitting') {
					fitType = value;
					switch (value) {
						case 'log':
							fitStyle = 5;
							break;
						case 'power':
							fitStyle = 6;
							break;
						case 'polynomial':
							fitStyle = 8;
							break;
						case 'line':
							fitStyle = 4;
							break;
						case 'weng':
							fitStyle = 7;
							break;
						case 'exp':
							fitStyle = 0;
							break;
						case 'hyper':
							fitStyle = 1;
							break;
						case 'attemper':
							fitStyle = 2;
							break;
					}
				} else if (name === 'foreNumber') {
					var foreNumber = dhxLableForm.getItemValue("foreNumber");
					var reg = /^[0-9]*$/;
					if (!reg.test(foreNumber)) {
						alert("预测点数只能为数字")
					}
				}

			})
		}
	};

	//  范围最大最小值对话框
	HC.Chart.prototype.openScopeWindow = function(paras) {
		var chart = this,
			options = chart.options,
			dhxWindows = chart.dhxWindows,
			selectedPoints = paras.selectedPoints,
			xData = [],
			yData = [];
		selectedPoints[0].data.forEach(function(item) {
			xData.push(item[0]);
			yData.push(item[1]);
		})
		var x = quickSort(xData);
		var y = quickSort(yData);
		if (chart.xAxis[0].userOptions.type === "datetime") {
			var minX = dateToTime(x[0]);
			var maxX = dateToTime(x[x.length - 1]);
		} else {
			var minX = x[0];
			var maxX = x[x.length - 1];
		}
		if (!dhxWindows) {
			if (!chart.myScopeWins) {
				chart.myScopeWins = myScopeWins = new dhtmlXWindows("dhx_blue");
				myScopeWins.createWindow({
					id: "scopeRect",
					text: '范围查看',
					center: true,
					width: 490,
					height: 220
				});
			} else {
				myScopeWins.window("scopeRect").show();
			}

			dhxScopeForm = chart.dhxScopeForm = myScopeWins.window("scopeRect").attachForm([{
					type: "settings",
					offsetLeft: 2,
					blockOffset: 1,
					position: "label-left"
				},
				{
					type: "block",
					width: 480,
					blockOffset: 5,
					list: [{
						type: "fieldset",
						label: '范围查看',
						width: 420,
						offsetLeft: 0,
						offsetTop: 10,
						list: [{
								type: "block",
								width: 410,
								offsetLeft: 1,
								list: [{
										type: "block",
										width: 200,
										offsetLeft: 1,
										offsetTop: 5,
										name: "",
										blockOffset: 0,
										list: [{
											type: "input",
											name: "minX",
											width: 100,
											value: minX,
											labelWidth: 65,
											label: "X轴最小值"
										}]
									},
									{
										type: "newcolumn"
									},
									{
										type: "block",
										width: 200,
										offsetLeft: 1,
										offsetTop: 5,
										name: "",
										blockOffset: 0,
										list: [{
											type: "input",
											name: "manX",
											width: 100,
											value: maxX,
											labelWidth: 65,
											label: "X轴最大值"
										}]
									},
								]
							},
							{
								type: "block",
								width: 410,
								offsetLeft: 1,
								list: [{
										type: "block",
										width: 200,
										offsetLeft: 1,
										offsetTop: 5,
										name: "",
										blockOffset: 0,
										list: [{
											type: "input",
											name: "minY",
											width: 100,
											value: y[0],
											labelWidth: 65,
											label: "Y轴最小值"
										}]
									},
									{
										type: "newcolumn"
									},
									{
										type: "block",
										width: 200,
										offsetLeft: 1,
										offsetTop: 5,
										name: "",
										blockOffset: 0,
										list: [{
											type: "input",
											name: "manY",
											width: 100,
											value: y[y.length - 1],
											labelWidth: 65,
											label: "Y轴最大值"
										}]
									},
								]
							}
						]
					}, ]
				},
				{
					type: "block",
					offsetLeft: 360,
					list: [
						// {type: "button", width: 25, name: "confirm", value: unescape("%u786E%u5B9A"), offsetTop: 15, offsetLeft: 10},
						// {type: "newcolumn"},
						{
							type: "button",
							width: 25,
							name: "cancel",
							value: '关闭',
							offsetTop: 15,
							offsetLeft: 10
						}
					]
				}

			]);

			myScopeWins.attachEvent("onClose", function(win) {
				myScopeWins.window("scopeRect").hide();
			});

			dhxScopeForm.attachEvent("onButtonClick", function(name) {
				if (name == "confirm") {
					myScopeWins.window("scopeRect").hide();
				}
				if (name == "cancel") {
					myScopeWins.window("scopeRect").hide();
				}
			})
		}
	};


	// Add the buttons on chart load
	HC.Chart.prototype.callbacks.push(function(chart) {
		var series = chart.series,
			serLen = series.length,
			i = 0;
		for (i = 0; i < serLen; i++) {
			if (i == 0) {
				series[i].update({
					//showCheckbox: true,
					selected: true
				}, true);
			}
			series[i].update({
				//showCheckbox: true,
				events: {
					checkboxClick: function(event) {
						if (event.checked) {
							for (var j = 0; j < serLen; j++) {
								if (series[j].options.id != event.target.options.id) {
									series[j].select(false);
								}
							}
						}
					}
				}
			}, true);
		}
		//initBnt(chart);
	});

	function AddMonthNumsDate(p_date, MonthNums) {
		if (!MonthNums && MonthNums == '') {
			MonthNums = 0;
		}
		MonthNums = parseInt(MonthNums);
		var t_date = new Date(p_date);
		//记录开始月日
		var M = t_date.getMonth() + 1;
		var D = t_date.getDate();
		//获取当前月最大天数
		var s_max_D = GetMaxDays(t_date.getFullYear(), t_date.getMonth(), 0);
		var isMaxDay = false;
		if (D == s_max_D) isMaxDay = true;
		//
		t_date.setMonth(t_date.getMonth() + parseInt(MonthNums));
		//
		//ShowAlert(isMaxDay + " " + s_max_D + " " + D);
		if (isMaxDay == true) {
			var e_max_D = GetMaxDays(t_date.getFullYear(), t_date.getMonth(), 0);
			t_date.setDate(e_max_D);
		}
		if (0 != MonthNums) {
			t_date.setDate(t_date.getDate()); //减一天
		}
		//
		return t_date.Format('yyyy-MM-dd');
	};
	
	function AddDaysNumsDate(p_date, DaysNums) {
		if (!DaysNums && DaysNums == '') {
			DaysNums = 0;
		}
		DaysNums = parseInt(DaysNums);
		var newDate = p_date + DaysNums*24*60*60*1000;
		
		
		var t_date = new Date(newDate);
	
		return t_date.Format('yyyy-MM-dd');
	};
	
	function AddYearsNumsDate(p_date, yearsNums){
		if (!yearsNums && yearsNums == '') {
			yearsNums = 0;
		}
		yearsNums = parseInt(yearsNums);
		var t_date = new Date(p_date);
		//记录开始月日
		var Y = t_date.getYear();

		t_date.setYear(Y+yearsNums);
		
		return t_date.Format('yyyy-MM-dd');
	}

	function GetMaxDays(year, month, day_0) {
		//2月
		if (IsLeapYear(year) == true) {
			if (1 == month) return 29; //是闰年2月29天
		} else {
			if (1 == month) return 28; //是平年2月28天
		}
		if (0 == month) return 31; //1月
		if (2 == month) return 31; //3月
		if (3 == month) return 30; //4月
		if (4 == month) return 31; //5月
		if (5 == month) return 30; //6月
		if (6 == month) return 31; //7月
		if (7 == month) return 31; //8月
		//
		if (8 == month) return 30; //9月
		if (9 == month) return 31; //10月
		if (10 == month) return 30; //11月
		if (11 == month) return 31; //12月
	}

	function IsLeapYear(intYear) {
		if (intYear % 100 == 0) {
			if (intYear % 400 == 0) {
				return true;
			}
		} else {
			if ((intYear % 4) == 0) {
				return true;
			}
		}
		return false;
	};
	Date.prototype.Format = function(fmt) { //author: meizz   
		var o = {
			"M+": this.getMonth() + 1, //月份   
			"d+": this.getDate(), //日   
			"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时           
			"H+": this.getHours(), //小时 
			"m+": this.getMinutes(), //分   
			"s+": this.getSeconds(), //秒   
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度   
			"S": this.getMilliseconds() //毫秒   
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	};
}(Highcharts));
