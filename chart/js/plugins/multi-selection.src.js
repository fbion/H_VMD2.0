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
        pointerProto = Pointer.prototype,

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

    wrap(pointerProto, "dragStart", function(proceed, e){
        var chart = this.chart;
        if(!chart.selections){
            proceed.apply(this, Array.prototype.slice.call(arguments, 1));
            return;
        }
        this.zoomX = true;
        chart.mouseIsDown = e.type;
        chart.cancelClick = false;
        chart.mouseDownX = this.mouseDownX = e.chartX;
        chart.mouseDownY = this.mouseDownY = e.chartY;
        chart.dragging = this.dragging = true;
        chart.selectionMarkerId = chart.selectionMarkerId == undefined ? 0 : ++chart.selectionMarkerId;
        console.log(chart.selectionMarkerId);
    });

    wrap(pointerProto, "drag", function(proceed, e) {
        var chart = this.chart,
            chartOptions = chart.options.chart,
            panKey = chartOptions.panKey && e[chartOptions.panKey + 'Key'],
            plotLeft = chart.plotLeft,
            plotTop = chart.plotTop,
            plotWidth = chart.plotWidth,
            plotHeight = chart.plotHeight,
            chartX = e.chartX,
            chartY = e.chartY,
            mouseDownX = this.mouseDownX,
            mouseDownY = this.mouseDownY;
        if (!chart.selections) {
            proceed.apply(this, Array.prototype.slice.call(arguments, 1));
            return;
        }
        chart.selections[chart.selectionMarkerId] = chart.selections[chart.selectionMarkerId] || {};
        var selectionMarker = chart.selections[chart.selectionMarkerId].marker;
        // determine if the mouse has moved more than 10px
        this.hasDragged = Math.sqrt(
            Math.pow(mouseDownX - chartX, 2) +
            Math.pow(mouseDownY - chartY, 2)
        );

        if (this.hasDragged > 10 && this.dragging) {
            var clickedInside = chart.isInsidePlot(mouseDownX - plotLeft, mouseDownY - plotTop);

            // make a selection
            if (chart.hasCartesianSeries && (this.zoomX || this.zoomY) && clickedInside && !panKey) {
                if(!selectionMarker){
                    selectionMarker = chart.selections[chart.selectionMarkerId].marker = chart.renderer.rect(
                        plotLeft,
                        plotTop,
                        1,
                        plotHeight,
                        0
                        )
                        .attr({
                            fill: chartOptions.selectionMarkerFill || 'rgba(69,114,167,0.25)',
                            zIndex: 7
                        })
                        .add();
                }
                var size = chartX - mouseDownX;
                selectionMarker.attr({
                    width: mathAbs(size),
                    x: (size > 0 ? 0 : size) + mouseDownX
                });
            }
        }

    });

    wrap(pointerProto, "drop", function(proceed, e){
        var chart = this.chart;
        if(!chart.selections){
            proceed.apply(this, Array.prototype.slice.call(arguments, 1));
            return;
        }
        chart.dragging = this.dragging = false;
        var selection = chart.selections[chart.selectionMarkerId];
        var selectionMarker = selection && selection.marker;
        if(selectionMarker){
            var selectionData = {
                    originalEvent: e, // #4890
                    xAxis: [],
                    yAxis: []
                },
                selectionBox = selectionMarker,
                selectionLeft = selectionBox.attr ? selectionBox.attr('x') : selectionBox.x,
                selectionTop = selectionBox.attr ? selectionBox.attr('y') : selectionBox.y,
                selectionWidth = selectionBox.attr ? selectionBox.attr('width') : selectionBox.width,
                selectionHeight = selectionBox.attr ? selectionBox.attr('height') : selectionBox.height;

            // a selection has been made
            if (this.hasDragged) {

                // record each axis' min and max
                each(chart.axes, function (axis) {
                    var horiz = axis.horiz,
                        minPixelPadding = e.type === 'touchend' ? axis.minPixelPadding : 0, // #1207, #3075
                        selectionMin = axis.toValue((horiz ? selectionLeft : selectionTop) + minPixelPadding),
                        selectionMax = axis.toValue((horiz ? selectionLeft + selectionWidth : selectionTop + selectionHeight) - minPixelPadding);

                    selectionData[axis.coll].push({
                        axis: axis,
                        min: mathMin(selectionMin, selectionMax), // for reversed axes
                        max: mathMax(selectionMin, selectionMax)
                    });
                });
                selection.data = selectionData;
            }
        }

        // Reset all
        if (chart) { // it may be destroyed on mouse up - #877
            css(chart.container, { cursor: chart._cursor });
            chart.cancelClick = this.hasDragged > 10; // #370
            chart.mouseIsDown = this.hasDragged = this.hasPinched = false;
        }
    });

    chartProto._inSelection = function(point){
        var chart = this,
            selections = chart.selections;
        if(selections){
            for(var i in selections){
                var selection = selections[i];
                var selectionData = selection.data;
                var xAxis = selectionData.xAxis;
                for(var j = 0; j < xAxis.length; j++){
                    var xaxis = xAxis[j];
                    if(point.x >= xaxis.min && point.x <= xaxis.max){
                        return true;
                    }
                }
            }
        }
        return false;
    };

    chartProto.multiSelectStart = function(){
        var chart = this;
        chart.selections = {};
    };

    chartProto.multiSelectComplete = function(){
        var chart = this,
            series = chart.series,
            selectData = {
                x:[],
                sections:{},
                series:[]
            };

        var selectedXPoints = {};
        if(chart.selections){
            for(var i in chart.selections){
                var selection = chart.selections[i];
                var selectionData = selection.data;
                var xAxis = selectionData.xAxis;

                selectData.sections[i] = {
                    min: Math.ceil(xAxis[0].min),
                    max: Math.floor(xAxis[0].max)
                };
            }
            for(var i = 0; i < series.length; i++){
                var points = series[i].points;
                var selectSeries = {
                    name: series[i].name,
                    points: []
                };
                for(var j = 0; j < points.length; j++){
                    var point = points[j];
                    if(chart._inSelection(point)){
                        selectedXPoints[point.x] = selectedXPoints[point.x] || [];
                        selectedXPoints[point.x].push(point);
                        selectSeries.points.push(point);
                    }
                }
                selectData.series.push(selectSeries);
            }
            for(var i in chart.selections){
                var marker = chart.selections[i].marker;
                marker.destroy();
            }
        }
        for(var i in selectedXPoints){
            selectData.x.push(i);
        }
        chart.selections = null;
        chart.selectionMarkerId = undefined;
        return selectData;
    };
}(Highcharts));
