// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS

(function (HC, UNDEFINED) {
    var arrayMin = HC.arrayMin,
        addEvent = HC.addEvent,
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
        scrollProto = HC.Scrollbar.prototype,

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
    
    extend(defaultOptions, {

    });

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
            series = options.series,
            hasZoomed,
            min,max,
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

        min = event.xAxis[0].min;
        max = event.xAxis[0].max;

        var exportData = chart.getSelectSeriesData(min,max);
        var chartParent = chart.parentObject || chart.container;
        chartParent.fireEvent('getSelectData',chart,exportData);
    });
    
}(Highcharts));
