// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS

(function (HC, UNDEFINED) {
    var arrayMin = HC.arrayMin,
        arrayMax = HC.arrayMax,
        each = HC.each,
        extend = HC.extend,
        merge = HC.merge,
        map = HC.map,
        pick = HC.pick,
        pInt = HC.pInt,
        defaultOptions = HC.getOptions(),
        defaultPlotOptions = defaultOptions.plotOptions,
        seriesTypes = HC.seriesTypes,
        extendClass = HC.extendClass,
        splat = HC.splat,
        wrap = HC.wrap,
        Axis = HC.Axis,
        Tick = HC.Tick,
        Point = HC.Point,
        Pointer = HC.Pointer,
        CenteredSeriesMixin = HC.CenteredSeriesMixin,
        TrackerMixin = HC.TrackerMixin,
        Series = HC.Series,
        math = Math,
        mathRound = math.round,
        mathFloor = math.floor,
        mathMax = math.max,
        mathMin = math.min,
        mathAbs = math.abs,
        Color = HC.Color,
        noop = function () {},
        userAgent = navigator.userAgent,
        isTouchDevice = /(Mobile|Android|Windows Phone)/.test(userAgent),

        fireEvent = HC.fireEvent,
        css = HC.css,

        chartProto = HC.Chart.prototype,
        seriesProto = Series.prototype,
        axisProto = Axis.prototype,
        tickProto = Tick.prototype,
        scrollProto = HC.Scroller.prototype,

        DATA_GROUPING = 'dataGrouping',
        baseProcessData = seriesProto.processData,
        baseGeneratePoints = seriesProto.generatePoints,
        baseDestroy = seriesProto.destroy,
        NUMBER = 'number',
        M = "M",
        L = "L",
        DIV = 'div',
        ABSOLUTE = 'absolute',
        RELATIVE = 'relative',
        HIDDEN = 'hidden',
        PREFIX = 'hwcharts-',
        VISIBLE = 'visible';
    
    var guid = Guid.NewGuid().ToString(),
        paras,
        hasReconnect,
        socket;

    function initSocket(chart) {
        try {
            io;
        } catch (e) {
            alert("服务未启动！");
            return;
        }
        var options = chart.options;
        if (!socket) {
            socket = io.connect('ws://' + options.socketURL);

            socket.on('connect', function (result) {
                //            console.log("连接成功！");
                if (hasReconnect) {
                    hasReconnect = false;
                }
            });

            socket.on('disconnect', function (result) {
                //            console.log("断开连接！");
                hasReconnect = true;
                //与服务器失去连接！
                //视频画面变成（与服务器失去连接，尝试重连...）
            });

            socket.on('init_completed', function (result) {
                // alert(result.guid);
            });

            socket.on('response_fit_data', function (result) {
                //返回的result格式
                //{"responseData":
                //    [{"refIndex":0,
                //      "name":"产量",
                //      "xAxis":"x-0",
                //      "yAxis":"y-0",
                //      "data":[[1333238400000,740],[1335830400000,700],[1338508800000,680],[1341100800000,660]],
                //      "fitData":[[1333238400000,734],[1335830400000,708],[1338508800000,682],[1341100800000,656]],
                //      "fitStyle":4,
                //      "b":-56.24986129611011,
                //      "c":0.7196320000000003,
                //      "Di":-56.24986129611011,
                //      "Q0":739.8591492975527,
                //      "n":0.9800000000000006,
                //      "r":0.222
                //    }],
                // "guid":"3c009618-1d6e-8186-f95a-5cc2ae8cdef7"}

                var responseData = result.responseData;
                if(responseData){
                    for(var i = 0; i < responseData.length; i++){
                        var responseItem = responseData[i];
                        var colorIndex = chart.series.length % HC.getOptions().colors.length;
                        var seriesColor = HC.getOptions().colors[colorIndex];
                        var addSeries = chart.addSeries({
                            refIndex: responseItem.refIndex,
                            refId: responseItem.refId,
                            name: responseItem.name,
                            showInLegend:false,
                            selected:false,
                            color:seriesColor,
                            xAxis: responseItem.xAxis,
                            yAxis: responseItem.yAxis,
                            data: responseItem.fitData,
                            fitStyle: responseItem.fitStyle,  // 拟合方式
                            fit_b: responseItem.b,
                            fit_c: responseItem.c,
                            fit_Di: responseItem.Di,
                            fit_Q0: responseItem.Q0,
                            fit_n: responseItem.n,
                            fit_r: responseItem.r,
                            hasExpress: true, //显示的文本标签中是否包含公式
                            hasR2:true, //是否包含相关系数的平方
                            hasQ0:true, //是否保存Q0
                            hasDi:true, //是否包含Di
                            hasGr:true, //是否包含可采储量Gr=累产+Nh
                            hasNh:false, //是否包含剩余可采储量Nh
                            hasRange:true //是否包含范围
                        }, true);

                        //计算显示的文本
                        var expressLabel = _getExpressText(addSeries);

                        var posX = addSeries.xAxis.translate(responseItem.fitData[0][0]),
                            posY = addSeries.yAxis.translate(responseItem.fitData[0][1]);

                        addSeries.expressLabel = chart.renderer.label(expressLabel,
                            posX + 60,
                            chart.plotTop + chart.plotHeight - posY, 'callout',
                            posX + chart.plotLeft,
                            posY + chart.plotTop)
                            .css({
                                color: 'rgb(255, 255, 255)'
                            })
                            .attr({
                                fill: seriesColor,
                                padding: 8,
                                r: 5,
                                zIndex: 100
                            })
                            .add();
                    }
                }
            });

            //窗口点击确认按钮
            socket.on('confirm', function (result) {
                if(result.win_flag == "range"){
                    if(chart.rangeSetWindow){
                        chart.rangeSetWindow.close();
                    }
                }
            });

            //窗口点击取消按钮
            socket.on('cancel', function (result) {
                if(result.win_flag == "range"){
                    if(chart.rangeSetWindow){
                        chart.rangeSetWindow.close();
                    }
                }
            });

            //窗口元素改变
            socket.on('change', function (result) {

            });
        }

        socket.emit('abc', {guid: guid });
    };
    
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
    function _getSelectedPoints(selectedSeries, event, type){
        var resultData = []; //选中点的序列数组
        //选择满足横轴范围内的数据，纵轴方向无限制
        if(type == "x"){
            for(var i = 0; i < selectedSeries.length; i++){
                var s = selectedSeries[i];
                var selectData = {
                    refIndex:s.index, //生成的拟合数据的曲线对应的原始曲线的索引值
                    name:s.name,
                    refId:s.options.id,
                    xAxis:s.options.xAxis,
                    yAxis:s.options.yAxis,
                    data:[]
                };
                var axisRange = _getSelectAxisRange(s, event.xAxis);
                if(axisRange){
                    var sPoints = s.points;
                    for(var j = 0; j < sPoints.length; j++){
                        var p = sPoints[j];
                        if(p.x >= axisRange[0] && p.x <= axisRange[1]){
                            selectData.data.push([p.x, p.y]);
                        }
                    }
                }
                resultData.push(selectData);
            }
        }
        //选择横向纵向都在范围内的数据
        else if(type == "xy"){
            for(var i = 0; i < selectedSeries.length; i++){
                var s = selectedSeries[i];
                var selectData = {
                    refIndex:s.index, //生成的拟合数据的曲线对应的原始曲线的索引值
                    name:s.name,
                    refId:s.options.id,
                    xAxis:s.options.xAxis,
                    yAxis:s.options.yAxis,
                    data:[]
                };
                var axisXRange = _getSelectAxisRange(s, event.xAxis),
                    axisYRange = _getSelectAxisRange(s, event.yAxis);;
                if(axisXRange && axisYRange){
                    var sPoints = s.points;
                    for(var j = 0; j < sPoints.length; j++){
                        var p = sPoints[j];
                        if(p.x >= axisXRange[0] && p.x <= axisXRange[1] && p.y >= axisYRange[0] && p.y <= axisYRange[1]){
                            selectData.data.push([p.x, p.y]);
                        }
                    }
                }
                resultData.push(selectData);
            }
        }
        return resultData;
    }

    /**
     * 获取选中点的轴的范围
     */
    function _getSelectAxisRange(series, axis) {
        for(var i = 0; i < axis.length; i++){
            if(axis[i].axis.options.id == series.xAxis.options.id){
                return [axis[i].min, axis[i].max]
            }
        }
        return null;
    }

    /**
     * 获取表达式文本
     * @private
     */
    function _getExpressText(addSeries){
        var options = addSeries.options;
        var labelText = "";
        if(options.hasExpress){
            // 拟合方式.0:指数;1:双曲;2:调和;3:幂;4:直线;5:对数;6:幂律指数;7:翁氏旋回;8:Weibull模型;9:衰减方程;10:丁-张-刘模型；100最佳拟合方式
            switch (options.fitStyle){
                case 0: //指数
                    labelText += "Qt = " + options.fit_Q0 + " * e^(-" + options.fit_Di + " * t)";
                    break;
                case 1: //双曲
                    labelText += "Qt = " + options.fit_Q0 + " * (1 + " + options.fit_n + " * " + options.fit_Di + " * t)^(-1 / " + options.fit_n + ")";
                    break;
                case 2: //调和
                    labelText += "Qt = " + options.fit_Q0 + " / (1 + "  + options.fit_Di + " * t)";
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
                    labelText += "Qt = " + options.fit_Q0 + " * e^( -" + options.fit_b + " * t - " + options.fit_Di + " * t^" + options.fit_n + ")";
                    break;
                case 7: //翁氏旋回
                    labelText += "Qt = " + options.fit_Q0 + " * t^(" + options.fit_Di + ")e^(-t/" + options.fit_c + ")";
                    break;
            }
        }
        if(options.hasR2){
            labelText += labelText == "" ? "" : "<br/>";
            labelText += "R^2 = " + options.fit_r;
        }
        if(options.hasQ0){
            labelText += labelText == "" ? "" : "<br/>";
            labelText += "Q0 = " + options.fit_Q0;
        }
        if(options.hasDi){
            labelText += labelText == "" ? "" : "<br/>";
            labelText += "Di = " + options.fit_Di;
        }
        if(options.hasGr){
            labelText += labelText == "" ? "" : "<br/>";
            labelText += "Gr = " + "";
        }
        if(options.hasNh){
            labelText += labelText == "" ? "" : "<br/>";
            labelText += "Nh = " + "";
        }
        if(options.hasRange){
            labelText += labelText == "" ? "" : "<br/>";
            labelText += options.name + ":(" + HC.dateFormat('%Y-%m-%d',options.data[0][0]) + "," + HC.dateFormat('%Y-%m-%d',options.data[options.data.length - 1][0]) + ")";
        }
        return labelText;
    }

    //将缩放时重新设置坐标轴范围屏蔽掉
    wrap(Axis.prototype, 'zoom', function (proceed, newMin, newMax) {
        return true;
    });

    /**
     * Override axisProto.init to mix in special axis instance functions and function overrides
     */
    wrap(chartProto, 'zoom', function (proceed, event) {
        var chart = this,
            options = chart.options,
            hasZoomed,
            pointer = chart.pointer,
            displayButton = false,
            resetZoomButton;

        // If zoom is called with no arguments, reset the axes
        if (!event || event.resetSelection) {
            each(chart.axes, function (axis) {
                hasZoomed = axis.zoom();
            });
        } else { // else, zoom in on all axes
            each(event.xAxis.concat(event.yAxis), function (axisData) {
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

        var selectSeries = chart.getSelectedSeries();
        var selectWay = options.selectWay || "0"; //"0"选择横向范围内的点，“1”选择矩形框内的点
        var selectedPoints = _getSelectedPoints(selectSeries, event, selectWay == "0" ? "x" : "xy");
        if(selectedPoints.length == 0){
            alert("没有选中任何数据！");
            return;
        }
        
        for(var i = 0; i < selectedPoints.length; i++){
            if(selectedPoints[i].data.length < 4){
                alert("请至少选择4个数据！");
                return;
            }
        }

        chart.openRangeSetWindow({selectedPoints: selectedPoints});
        // socket.emit('get_fit_data', {paras: {selectedPoints: selectedPoints}, guid: guid });
    });

    //打开范围选择对话框
    HC.Chart.prototype.openRangeSetWindow = function(paras){
        var chart = this,
            options = chart.options,
            dhxWindows = chart.dhxWindows,
            rangeSetWindow = chart.rangeSetWindow;

        socket.emit('initWindowParas', {
            guid: guid,
            selectedPoints: paras.selectedPoints,
            win_flag: "range"
        });

        if(!dhxWindows){
            dhxWindows = chart.dhxWindows = new dhtmlXWindows();
        }
        var width = 460;
        var height = 370;
        var left = (document.body.clientWidth - width) / 2;
        var top = (document.body.clientHeight - height) / 2
        rangeSetWindow = chart.rangeSetWindow = dhxWindows.createWindow("rangeSetWindow", left, top, width, height);
        rangeSetWindow.setModal(true);
        var url = "http://" + options.parseURL + "/ParseEngineDebug.aspx?FileName=test%5cFitStyle.hwcs&ClintPcGuid=FC4DD4491812&publicparams=%7b%22MainForm%22%3anull%2c%22ParentControl%22%3anull%2c%22PublicVarHash%22%3a%7b%22SysTime%22%3a%2217%3a49%3a10%22%2c%22LoginName%22%3a%22test%22%2c%22UserName%22%3a%22%e7%ae%a1%e7%90%86%e5%91%98%22%2c%22dydm%22%3a%220%22%2c%22UnitName%22%3a%22%e8%83%9c%e5%88%a9%e9%87%87%e6%b2%b9%e5%8e%82%22%2c%22UnitCode%22%3a%2231350043%22%2c%22SysDate%22%3a%222014-6-19%22%2c%22LoginTime%22%3a%2217%3a49%3a10%22%7d%2c%22Args%22%3a%22%22%2c%22PtDbInfo%22%3anull%2c%22BasicInfo%22%3a%7b%22LoginName%22%3a%22test%22%2c%22UserName%22%3a%22%e7%ae%a1%e7%90%86%e5%91%98%22%2c%22UserPwdStr%22%3a%22%22%2c%22UnitCode%22%3a%2231350043%22%2c%22UnitName%22%3a%22%e8%83%9c%e5%88%a9%e9%87%87%e6%b2%b9%e5%8e%82%22%2c%22DepartmentName%22%3a%22%22%2c%22LoginTime%22%3a%222016-05-26T14%3a22%3a41.8262315%2b08%3a00%22%2c%22UserIp%22%3a%22192.168.6.120%22%7d%2c%22Tag%22%3anull%2c%22PtTag%22%3anull%2c%22PtModuleInfo%22%3a%7b%22RunPtType%22%3a0%2c%22PtNodeID%22%3a%22%22%2c%22PtNodeText%22%3a%22%22%2c%22PtModuleID%22%3a%22%22%7d%2c%22DbInfo%22%3anull%7d&debugger=close"
            + "&guid=" + guid
            + "&socketURL=" + options.socketURL
            + "&selectWay=" + (options.selectWay || "0") //"0"选择横向范围内的点，“1”选择矩形框内的点
            + "&isForecast=" + (options.isForecast || "0")//是否预测曲线
            + "&forecastPoint=" + (options.forecastPoint || 12); //预测的点的个数
        rangeSetWindow.attachURL(url, false, {guid:guid});
        rangeSetWindow.show();
    };

    // Add the buttons on chart load
    HC.Chart.prototype.callbacks.push(function (chart) {

        var series = chart.series,
            serLen = series.length,
            i = 0;
        for (i = 0; i < serLen; i++) {
            series[i].update({
                events: {
                    checkboxClick: function(event){
                        if(event.checked){
                            for(var j = 0; j < serLen; j++){
                                if(series[j].options.id != event.target.options.id){
                                    series[j].select(false);
                                }
                            }
                        }
                    }
                }
            }, true);
        }

        initSocket(chart);
    });
}(Highcharts));
