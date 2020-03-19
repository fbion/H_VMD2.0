/**
 * HWcharts Drilldown plugin
 *
 * Author: Torstein Honsi
 * License: MIT License
 *
 * Demo: http://jsfiddle.net/hwcharts/Vf3yT/
 */

/*global HWchartsAdapter*/
(function (H) {
    var noop = function () {},
        defaultOptions = H.getOptions(),
        each = H.each,
        extend = H.extend,
        format = H.format,
        pick = H.pick,
        Chart = H.Chart,
        Point = H.Point,
        Pointer = H.Pointer,
        seriesTypes = H.seriesTypes,
        PieSeries = seriesTypes.pie,
        ColumnSeries = seriesTypes.column,
        fireEvent = HighchartsAdapter.fireEvent,
        inArray = HighchartsAdapter.inArray;

    //鼠标在容器中的按下事件
    H.wrap(Pointer.prototype, 'onContainerMouseDown', function (proceed,e) {

        var pointer = this,
            chart = pointer.chart,
            e = pointer.normalize(e);

        //拖动点与图表的缩放不能同时进行
        if(chart.clickPoint){
            chart.mouseType = e.type;
            chart.mouseDownX = e.chartX;
            chart.mouseDownY = e.chartY;
            chart.movePointPlotY = chart.clickPoint.plotY;

            //记录移动点的小数位
            var digitsNums = (chart.clickPoint.y).toString().split('.');      //获取点的小数位数
            var corretDigitsNums = digitsNums[1] ? digitsNums[1].length : 0;  //修正的小数位，使得拖动后y值的小数位与原来y值的小数位一致
            chart.clickPoint.digitsNums = corretDigitsNums;
        }
        else{
            proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        }
    });

    //鼠标移动事件
    H.wrap(Pointer.prototype, 'onContainerMouseMove', function (proceed,e) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        var pointer = this,
            chart = pointer.chart,
            clickPoint = chart.clickPoint,
            pointSeries = clickPoint && clickPoint.series,
            yAxis = pointSeries && pointSeries.yAxis,
            e = pointer.normalize(e);

        if(clickPoint && chart.mouseType == "mousedown"){
            var moveDistance = chart.inverted ? chart.mouseDownX - e.chartX : e.chartY - chart.mouseDownY,
                yValue = yAxis.translate(chart.movePointPlotY + moveDistance, 1, 1, 0, 1);

            yValue = parseFloat(yValue.toFixed(chart.clickPoint.digitsNums));
            clickPoint.update(yValue, true, false);
        }
    });

    //鼠标在容器中松开事件
    H.wrap(Pointer.prototype, 'drop', function (proceed) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));

        var pointer = this,
            chart = pointer.chart;
        chart.clickPoint = null;
        chart.mouseType = null;
    });

    //拖动点时屏蔽鼠标经过其他点的事件
    H.wrap(Pointer.prototype, 'runPointActions', function (proceed) {
        var pointer = this,
            chart = pointer.chart;
        if(chart.mouseType != "mousedown"){
            proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        }
    });

    //添加鼠标指针指向点时的动作
    Pointer.prototype.onContainerMouseOver = Pointer.prototype.onContainerMouseOver || noop;
    H.wrap(Pointer.prototype, 'onContainerMouseOver', function (proceed,e) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));

        var pointer = this,
            chart = pointer.chart;
        e = pointer.normalize(e);

        // loop over all series and find the ones with points closest to the mouse
        var mouseX = chart.inverted ? chart.plotHeight + chart.plotTop - e.chartY : e.chartX - chart.plotLeft,
            mouseY = chart.inverted ? chart.plotWidth + chart.plotLeft - e.chartX : e.chartY - chart.plotTop;
        if(chart.mouseType != "mousedown"){
            this.getPointAtPos(mouseX, mouseY);
        }

        var cursor = chart.clickPoint ? 'pointer' : 'default';
        H.css(chart.container,{cursor: cursor});
    });

    //添加onmouseover事件
    H.wrap(Pointer.prototype, 'setDOMEvents', function (proceed) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));

        var pointer = this,
            container = pointer.chart.container;
        container.onmouseover = function (e) {
            pointer.onContainerMouseOver(e);
            return false;
        };
    });

    //获得点击的点
    Pointer.prototype.getPointAtPos = function(x, y){
        var pointer = this,
            chart = pointer.chart,
            series = chart.series,
            hasPoint = false,
            j;

        for (j = 0; j < series.length; j++) {
            if (series[j].visible) {
                each(series[j].points,function(point){
                    var clickRange = pick(point.pointAttr && point.pointAttr["hover"] && point.pointAttr["hover"].r,
                            point.pointAttr && point.pointAttr[""] && point.pointAttr[""].r, 4);
                    if(Math.abs(x - point.clientX) < clickRange && Math.abs(y - point.plotY) < clickRange){
                        chart.clickPoint = point;
                        hasPoint = true;
                    }
                })
            }
        };
        if(!hasPoint){
            chart.clickPoint = null;
        }
    };

}(Highcharts));