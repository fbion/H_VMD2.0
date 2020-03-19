/*
 filename：dhtmlxgrid_excell_dhxcalendar_ext_tb.js
 creater：
 date created：2016.11.19
 description：
 date modified：2017.09.07
 modifier：刘志伟
 version：2.2.10.0907
 others：
 copyright：Copyright @1999-2016, hwkj, All Rights Reserved
 */
// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS

/**
 * @license HWcharts JS v4.0.3 (2014-07-03)
 *
 * (c) 2009-2014 Torstein Honsi
 *
 * License: www.hwcharts.com/license
 */

// JSLint options:
/*global HWcharts, HWchartsAdapter, document, window, navigator, setInterval, clearInterval, clearTimeout, setTimeout, location, jQuery, $, console */

(function (H, UNDEFINED) {
    var arrayMin = H.arrayMin,
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
        Axis = H.Axis,
        Tick = H.Tick,
        Point = H.Point,
        Pointer = H.Pointer,
        CenteredSeriesMixin = H.CenteredSeriesMixin,
        TrackerMixin = H.TrackerMixin,
        Series = H.Series,
        math = Math,
        PI = Math.PI,
        deg2rad = (PI / 180),
        mathRound = math.round,
        mathFloor = math.floor,
        mathMax = math.max,
        Color = H.Color,
        noop = function () {},
        LegendSymbolMixin = H.LegendSymbolMixin,

        platform = navigator.platform,
        M = "M",
        L = "L",
        NORMAL_STATE = '',
        HOVER_STATE = 'hover',
        SELECT_STATE = 'select';


    /* ****************************************************************************
     * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓开始新图表类型代码	↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*
     *****************************************************************************/


    /**
     * The ColumnWidthSeries class
     */
    defaultPlotOptions.columnwidth = merge(defaultPlotOptions.column, {});

    /**
     * ColumnWidthSeries object
     */
    seriesTypes.columnwidth = extendClass(seriesTypes.column, {
        type: 'columnwidth',
        pointArrayMap: ['y', 'w'],
        parallelArrays: ['x', 'y', 'w'],

        translate: function () {
            var series = this,
                wData = series.wData,
                maxW;

            seriesTypes.column.prototype.translate.apply(series);

            for(var i = 0; i < wData.length; i++){
                if(!isNaN(wData[i]) && (maxW === undefined || maxW < wData[i])){
                    maxW = wData[i];
                }
                else continue;
            }
            // 计算点的宽度
            each(series.points, function (point) {
                var shapeArgs = point.shapeArgs,
                    r = pick(point.w, maxW, 1) / pick(maxW, 1);
                shapeArgs.x += shapeArgs.width * (1 - r) * 0.5;  //重新计算柱子宽度后将柱子居中对齐
                shapeArgs.width *= r;
            });
        }
    });

    //添加十字星点样式
    H.SVGRenderer.prototype.symbols.cross = function (x, y, w, h, options) {
        return [
            M, x + w / 2, y,
            L, x + w / 2, y + h,
            M, x, y + h / 2 ,
            L, x + w, y + h / 2
        ];
    };


    //添加X字星点样式
    H.SVGRenderer.prototype.symbols.xcross = function (x, y, w, h, options) {
        return [
            M, x, y,
            L, x + w, y + h,
            M, x + w, y,
            L, x, y + h
        ];
    };

    //修复ie7下鼠标指向点显示数据提示时报错的问题
    H.SVGElement.prototype.strokeGetter = function(key){
        var ret = pick(
            this[key],
            this.element ? this.element.getAttribute(key) : null,
            0
        );
        if(typeof ret === 'object'){
            ret = pick(ret.color && ret.color.value, 0);
        }
        else if (/^[\-0-9\.]+$/.test(ret)) { // is numerical
            ret = parseFloat(ret);
        }
        return ret;
    }

    H.SVGElement.prototype.fillGetter = function(key){
        var ret = pick(
            this[key],
            this.element ? this.element.getAttribute(key) : null,
            0
        );
        if(typeof ret === 'object'){
            ret = pick(ret.color && ret.color.value, 0);
        }
        else if (/^[\-0-9\.]+$/.test(ret)) { // is numerical
            ret = parseFloat(ret);
        }
        return ret;
    }

    //累计增量柱状图
    H.wrap(H.Chart.prototype, 'initSeries', function (proceed, options) {
        var chart = this,
            optionsChart = chart.options.chart,
            seriesPlotOptions = chart.options.plotOptions && chart.options.plotOptions.series,
            type = options.type || optionsChart.type || optionsChart.defaultSeriesType,
            series,
            series_a,
            constr = seriesTypes[type];

        // No such series type
        if (!constr) {
            error(17, true);
        }

        function processData(options, options_a){
            //merge方法无法深拷贝数组，首先将options.data中的数据深拷贝到options_a.data中
            var data = options.data,
                tmp_y_arr = [];  //用于存放原始的y值
            options_a.data = [];
            for(var i = 0; i < data.length; i++){
                if(isArray(data[i])){
                    var a_arr = [];
                    for(var j = 0; j < data[i].length; j++){
                        a_arr[j] = data[i][j];
                    }
                    tmp_y_arr[i] = data[i][1];
                    options_a.data[i] = a_arr;
                }
                else if(typeof data[i] === 'object'){
                    options_a.data[i] = merge(data[i]);
                    tmp_y_arr[i] = data[i].y;
                }
                else{
                    options_a.data[i] = data[i];
                    tmp_y_arr[i] = data[i];
                }
            }

            if(options.data.length > 0){
                if(isArray(options.data[0])){
                    options.data[0][1] = tmp_y_arr[0];
                    options_a.data[0][1] = null;
                }
                else if(typeof options.data[0] === 'object'){
                    options.data[0].y = tmp_y_arr[0];
                    options_a.data[0].y = null;
                }
                else {
                    options.data[0] = tmp_y_arr[0];
                    options_a.data[0] = null;
                }
            }


            for(var i = 1 ; i < data.length; i++){
                if(isArray(options.data[i])){
                    options.data[i][1] = tmp_y_arr[i-1] || 0;
                    options_a.data[0][1] = tmp_y_arr[i] - (tmp_y_arr[i-1] || 0);
                }
                else if(typeof options.data[i] === 'object'){
                    options.data[i].y = tmp_y_arr[i-1] || 0;
                    options_a.data[i].y = tmp_y_arr[i] - (tmp_y_arr[i-1] || 0);
                }
                else {
                    options.data[i] = tmp_y_arr[i-1] || 0;
                    options_a.data[i] = tmp_y_arr[i] - (tmp_y_arr[i-1] || 0);
                }
            }
        }

        if(options.cumulative || (seriesPlotOptions && seriesPlotOptions.cumulative)){
            options.stacking = options.stacking || (seriesPlotOptions && seriesPlotOptions.stacking) || "normal";
            options.stack = options.name;
            var options_a = merge({}, options);
            options_a.stack = options.name;
            options_a.id = options.id + "_a";
            options_a.name = options.cumulativeName || unescape("%u7D2F%u8BA1");
            options_a.linkedTo = options.id;


            options_a.color = pick(options.cumulativeColor, (seriesPlotOptions && seriesPlotOptions.cumulativeColor),
                options.color, (seriesPlotOptions && seriesPlotOptions.color));
            options_a.borderWidth = pick(options.cumulativeBorderWidth, (seriesPlotOptions && seriesPlotOptions.cumulativeBorderWidth),
                options.borderWidth, (seriesPlotOptions && seriesPlotOptions.borderWidth), 1);
            options_a.borderColor =  pick(options.cumulativeBorderColor, (seriesPlotOptions && seriesPlotOptions.cumulativeBorderColor),
                options.borderColor, (seriesPlotOptions && seriesPlotOptions.borderColor), "#FFFFFF");
            options_a.borderRadius =  pick(options.cumulativeBorderRadius, (seriesPlotOptions && seriesPlotOptions.cumulativeBorderRadius),
                options.borderRadius, (seriesPlotOptions && seriesPlotOptions.borderRadius), 0);

            processData(options, options_a);
            series_a = new constr();
            series_a.init(this, options_a);

            series = new constr();
            series.init(this, options);
        }
        else{
            series = new constr();
            series.init(this, options);
        }
        return series;
    });

    /* ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
     * 结束新图表类型代码												*
     *↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/


    /* ****************************************************************************
     * 开始图表新功能扩展												*
     *****************************************************************************/

    /**
     * 添加显示孤点的功能-------当折线标记设置为隐藏时，如果一个点的上一个点和下一个点都为null，则这个点显示不出来
     */
    H.wrap(seriesTypes.line.prototype, 'drawPoints', function (proceed) {
        proceed.apply(this, [].slice.call(arguments, 1));

        var series = this,
            points = series.points,
            chart = series.chart,
            plotY,
            i,
            point,
            prePoint,
            nextPoint,
            symbol,
            graphic,
            options = series.options,
            seriesMarkerOptions = options.marker,
            pointMarkerOptions,
            hasPointMarker,
            enabled,
            isInside,
            markerGroup = series[series.specialGroup] || series.markerGroup,
            xAxis = series.xAxis,
            markerAttribs,
            globallyEnabled = pick(
                seriesMarkerOptions.enabled,
                xAxis.isRadial ? true : null,
                // Use larger or equal as radius is null in bubbles (#6321)
                series.closestPointRangePx >= 2 * seriesMarkerOptions.radius
            );

        if (!seriesMarkerOptions.enabled && (options.showIsLandPoints || chart.deletePointModule)) {

            for (i = 0; i < points.length; i++) {
                point = points[i];
                prePoint = points[i-1];
                nextPoint = points[i+1];
                plotY = point.plotY;
                graphic = point.graphic;
                pointMarkerOptions = point.marker || {};
                hasPointMarker = !!point.marker;
                enabled = (globallyEnabled && pointMarkerOptions.enabled === undefined) || pointMarkerOptions.enabled || ((options.showIsLandPoints && ((prePoint && prePoint.isNull && nextPoint && nextPoint.isNull)   //中间点
                            || (!prePoint && nextPoint && nextPoint.isNull)  //第一个点（大于两个点）
                            || (prePoint && prePoint.isNull  && !nextPoint) //最后一个点
                            || (!prePoint && !nextPoint))) //只有一个点
                            || (chart.deletePointModule && (point.deleteMode == "delete" || point.deleteMode == "recovery")));
                isInside = point.isInside;

                // only draw the point if y is defined
                if (enabled && isNumber(plotY) && point.y !== null) {

                    // Shortcuts
                    symbol = pick(pointMarkerOptions.symbol, series.symbol);
                    point.hasImage = symbol.indexOf('url') === 0;

                    markerAttribs = series.markerAttribs(
                        point,
                        point.selected && 'select'
                    );

                    if (graphic) { // update
                        graphic[isInside ? 'show' : 'hide'](true) // Since the marker group isn't clipped, each individual marker must be toggled
                            .animate(markerAttribs);
                    } else if (isInside && (markerAttribs.width > 0 || point.hasImage)) {

                        /**
                         * The graphic representation of the point. Typically
                         * this is a simple shape, like a `rect` for column
                         * charts or `path` for line markers, but for some
                         * complex series types like boxplot or 3D charts, the
                         * graphic may be a `g` element containing other shapes.
                         * The graphic is generated the first time {@link
                            * Series#drawPoints} runs, and updated and moved on
                         * subsequent runs.
                         *
                         * @memberof Point
                         * @name graphic
                         * @type {SVGElement}
                         */
                        point.graphic = graphic = chart.renderer.symbol(
                            symbol,
                            markerAttribs.x,
                            markerAttribs.y,
                            markerAttribs.width,
                            markerAttribs.height,
                            hasPointMarker ? pointMarkerOptions : seriesMarkerOptions
                            )
                            .add(markerGroup);
                    }


                    // Presentational attributes
                    if (graphic) {
                        graphic.attr(series.pointAttribs(point, point.selected && 'select'));
                    }


                    if (graphic) {
                        graphic.addClass(point.getClassName(), true);
                    }

                } else if (graphic) {
                    point.graphic = graphic.destroy(); // #1269
                }
            }
        }


        // var series = this,
        //     pointAttr,
        //     points = series.points,
        //     chart = series.chart,
        //     plotX,
        //     plotY,
        //     i,
        //     point,
        //     prePoint,
        //     nextPoint,
        //     radius,
        //     symbol,
        //     isImage,
        //     graphic,
        //     options = series.options,
        //     seriesMarkerOptions = options.marker,
        //     seriesPointAttr = series.pointAttr[''],
        //     pointMarkerOptions,
        //     hasPointMarker,
        //     enabled,
        //     isInside,
        //     markerGroup = series.markerGroup;
        //
        // if((seriesMarkerOptions.enabled == false && (options.showIsLandPoints || chart.deletePointModule))){
        //     i = points.length;
        //     while (i--) {
        //         point = points[i];
        //         prePoint = points[i-1];
        //         nextPoint = points[i+1];
        //         plotX = mathFloor(point.plotX); // #1843
        //         plotY = point.plotY;
        //         graphic = point.graphic;
        //         pointMarkerOptions = point.marker || {};
        //         hasPointMarker = !!point.marker;
        //
        //         enabled = (prePoint && prePoint.isNull
        //             && nextPoint && nextPoint.isNull)   //中间点
        //             || (!prePoint && nextPoint && nextPoint.isNull)  //第一个点（大于两个点）
        //             || (prePoint && prePoint.isNull  && !nextPoint) //最后一个点
        //             || (!prePoint && !nextPoint) //只有一个点
        //             || point.isDeleted
        //             || pointMarkerOptions.enabled;
        //
        //         isInside = chart.isInsidePlot(mathRound(plotX), plotY, chart.inverted); // #1858
        //
        //         // only draw the point if y is defined
        //         if (enabled && plotY !== UNDEFINED && !isNaN(plotY) && point.y !== null) {
        //
        //             // shortcuts
        //             pointAttr = point.pointAttr[point.selected ? SELECT_STATE : NORMAL_STATE] || seriesPointAttr;
        //             radius = pointAttr.r;
        //             symbol = pick(pointMarkerOptions.symbol, series.symbol);
        //             isImage = symbol.indexOf('url') === 0;
        //
        //             if (graphic) { // update
        //                 graphic[isInside ? 'show' : 'hide'](true) // Since the marker group isn't clipped, each individual marker must be toggled
        //                     .animate(extend({
        //                         x: plotX - radius,
        //                         y: plotY - radius
        //                     }, graphic.symbolName ? { // don't apply to image symbols #507
        //                         width: 2 * radius,
        //                         height: 2 * radius
        //                     } : {}));
        //             } else if (isInside && (radius > 0 || isImage)) {
        //                 point.graphic = graphic = chart.renderer.symbol(
        //                     symbol,
        //                         plotX - radius,
        //                         plotY - radius,
        //                         2 * radius,
        //                         2 * radius,
        //                     hasPointMarker ? pointMarkerOptions : seriesMarkerOptions
        //                 )
        //                     .attr(pointAttr)
        //                     .add(markerGroup);
        //             }
        //
        //         } else if (graphic) {
        //             point.graphic = graphic.destroy(); // #1269
        //         }
        //     }
        // }

    });

    /**
     * 日期坐标轴标签简化显示
     */
    H.wrap(H.Axis.prototype, 'defaultLabelFormatter', function (proceed) {
        var axis = this.axis,
            labelsOptions = axis.options.labels,
            isContract = labelsOptions && labelsOptions.isContract,
            value = this.value,
            categories = axis.categories,
            dateTimeLabelFormat = this.dateTimeLabelFormat,
            numericSymbols = H.getOptions().lang.numericSymbols,
            i = numericSymbols && numericSymbols.length,
            multi,
            ret,
            formatOption = axis.options.labels.format,

        // make sure the same symbol is added for all labels on a linear axis
            numericSymbolDetector = axis.isLog ? value : axis.tickInterval;

        if (formatOption) {
            ret = H.format(formatOption, this);

        } else if (categories) {
            ret = value;

        } else if (dateTimeLabelFormat) { // datetime axis

            ret = H.dateFormat(dateTimeLabelFormat, value);
            if(isContract){
                axis.referLableValue = (this.isFirst || !axis.referLableValue) ? value : axis.referLableValue;
                if (axis.referLableValue != value) {
                    var formatRex = /%[y|Y|b|B|m|n|a|A|d|e|w|H|I|l|M|p|P|S|L]/g,
                        allFormatArray = ['%y','%Y', '%b','%B','%m','%n', '%a','%A','%d','%e','%w', '%H','%I','%l','%M','%p','%P','%S','%L'],
                        separatorArr = dateTimeLabelFormat.split(formatRex),
                        formatArr = dateTimeLabelFormat.match(formatRex) || [],
                        formatWithSepArr = [],
                        j;

                    //ie9以下使用split分割字符串时，会把分隔符两侧的空字符串去掉，如"%Y".split("%Y")-->[],而ie9以上为["",""]
                    if(separatorArr.length == 0 || separatorArr[0] != ""){
                        separatorArr.unshift("");
                        separatorArr.push("");
                    }

                    function findIndexOfArray(array, value){
                        for(var j = 0; j < array.length; j++){
                            if(array[j] == value){
                                return j;
                            }
                        }
                        return -1;
                    }

                    for(j = 0; j < separatorArr.length; j++){
                        if(formatArr[j] !== undefined){
                            formatWithSepArr.push(separatorArr[j],formatArr[j]);
                        }
                        else{
                            formatWithSepArr.push(separatorArr[j]);
                        }
                    }

                    for(j = 0; j < allFormatArray.length; j++){
                        var format = allFormatArray[j];
                        var index = findIndexOfArray(formatWithSepArr, format);
                        if(index != -1){
                            if(H.dateFormat(format, axis.referLableValue) == H.dateFormat(format, value)){
                                if(index == 0){
                                    formatWithSepArr.splice(0, 2);
                                }
                                else if(index == 1){
                                    formatWithSepArr.splice(0, 3);
                                }
                                else if(index == (formatArr.length - 1)){
                                    formatWithSepArr.splice(formatWithSepArr.length - 2, 2)
                                }
                                else if(index == (formatArr.length - 2)){
                                    formatWithSepArr.splice(formatWithSepArr.length - 3, 3)
                                }
                                else{
                                    formatWithSepArr.splice(index - 1, 2);
                                }
                            }
                            else{
                                break;
                            }
                        }
                    }

                    axis.referLableValue = value;
                    ret = H.dateFormat(formatWithSepArr.join(""), value);

                }
            }
        } else if (i && numericSymbolDetector >= 1000) {
            // Decide whether we should add a numeric symbol like k (thousands) or M (millions).
            // If we are to enable this in tooltip or other places as well, we can move this
            // logic to the numberFormatter and enable it by a parameter.
            while (i-- && ret === UNDEFINED) {
                multi = Math.pow(1000, i + 1);
                if (numericSymbolDetector >= multi && numericSymbols[i] !== null) {
                    ret = H.numberFormat(value / multi, -1) + numericSymbols[i];
                }
            }
        }

        if (ret === UNDEFINED) {
            if (Math.abs(value) >= 10000) { // add thousands separators
                ret = H.numberFormat(value, 0);

            } else { // small numbers
                ret = H.numberFormat(value, -1, UNDEFINED, ''); // #2466
            }
        }

        return ret;
    });

    /**
     * 获取序列类型
     */
    H.Series.prototype.getSeriesType = function(){
        var series  = this,
            chart = series.chart,
            optionsChart =  chart.options.chart;

        return H.pick(series.options.type, optionsChart.type , optionsChart.defaultSeriesType)
    };

    /**
     * 获取面积图外包线路径
     */
    H.seriesTypes.area.prototype.getOutlinePath = function(){
        var chart = this.chart,
            series = chart.series,
            generateOutlinePath = true,
            outLinePoints = [],
            seriesLength = series.length,
            pointLength,
            outlinePath;

        for(var i = 0; i < seriesLength; i++){
            if(!series[i].points){
                generateOutlinePath = false;
                break;
            }
            pointLength = series[i].points.length;
        }
        if(generateOutlinePath){
            for(var i = 0; i < pointLength; i++){
                for(var j = 0; j < seriesLength; j++){
                    if(series[j].visible){
                        if(!outLinePoints[i]){
                            if(!series[j].points[i] || series[j].points[i].y == null){
                                continue;
                            }
                            outLinePoints[i] = series[j].points[i];
                        }

                        if(series[j].points[i].y != null && series[j].points[i].plotY < outLinePoints[i].plotY){
                            outLinePoints[i] = series[j].points[i]
                        }
                    }
                }

            }
            outlinePath = [];
            var extraPoints = [];
            for(var i = 0; i < outLinePoints.length; i++){
                if(outLinePoints[i]){
                    outlinePath.push(outlinePath.length == 0 ? M : L);
                    if(outLinePoints[i-1] && outLinePoints[i-1].series != outLinePoints[i].series){
                        if(outLinePoints[i].series.points[i-1] && outLinePoints[i].series.points[i-1].y == null){
                            outlinePath.push(
                                outLinePoints[i-1].series.points[i].plotX,
                                outLinePoints[i-1].series.points[i].plotY
                            );
                        }
                        if(outLinePoints[i-1].series.points[i] && outLinePoints[i-1].series.points[i].y == null){
                            outlinePath.push(
                                outLinePoints[i].series.points[i-1].plotX,
                                outLinePoints[i].series.points[i-1].plotY
                            );
                        }
                    }
                    outlinePath.push(
                        outLinePoints[i].plotX,
                        outLinePoints[i].plotY
                    );

                }

            }
        }

        return outlinePath;
    }

    /**
     * 堆栈面积图外包线
     */
    H.wrap(H.seriesTypes.area.prototype, 'drawGraph', function (proceed) {
        proceed.apply(this, [].slice.call(arguments, 1));
        var series = this,
            chart = series.chart,
            renderer = chart.renderer,
            optionsChart = chart.options.chart,
            outline = chart.seriesOutline,
            outlineEnabled = optionsChart.outlineEnabled,
            outlineColor = optionsChart.outlineColor,
            outlineWidth = optionsChart.outlineWidth,
            outlineStyle = optionsChart.outlineStyle,

            outlinePath = series.getOutlinePath();

        if(outlineEnabled && outlineWidth && outlinePath){
            if(!outline){
                outline = chart.seriesOutline = renderer.path().attr({
                    stroke: outlineColor,
                    'stroke-width': outlineWidth,
                    dashstyle: outlineStyle,
                    zIndex: 1 // #1069
                })
//                    .add(chart.seriesGroup)
            }
            outline.attr({
                d: series.getOutlinePath(),
                stroke: outlineColor,
                'stroke-width': outlineWidth,
                dashstyle: outlineStyle
            }).add(series.group)
        }
    })

    /**
     * 独立设置图例符号的填充色
     */
    // H.wrap(H.Legend.prototype, 'colorizeItem', function (proceed, item, visible) {
    //     var legend = this,
    //         options = legend.options,
    //         legendItem = item.legendItem,
    //         legendLine = item.legendLine,
    //         legendSymbol = item.legendSymbol,
    //         hiddenColor = legend.itemHiddenStyle.color,
    //         textColor = visible ? options.itemStyle.color : hiddenColor,
    //         symbolColor = visible ? (item.options.legendColor || item.color || '#CCC') : hiddenColor,
    //         markerOptions = item.options && item.options.marker,
    //         symbolAttr = { fill: symbolColor },
    //         key,
    //         val;
    //
    //     if (legendItem) {
    //         legendItem.css({ fill: textColor, color: textColor }); // color for #1553, oldIE
    //     }
    //     if (legendLine) {
    //         legendLine.attr({ stroke: symbolColor });
    //     }
    //
    //     if (legendSymbol) {
    //
    //         // Apply marker options
    //         if (markerOptions && legendSymbol.isMarker) { // #585
    //             symbolAttr.stroke = symbolColor;
    //             markerOptions = item.convertAttribs(markerOptions);
    //             for (key in markerOptions) {
    //                 val = markerOptions[key];
    //                 if (val !== UNDEFINED) {
    //                     symbolAttr[key] = val;
    //                 }
    //             }
    //         }
    //
    //         legendSymbol.attr(symbolAttr);
    //     }
    // });

    // H.wrap(H.Axis.prototype, 'setAxisSize', function (proceed) {
    //
    //     var chart = this.chart,
    //         options = this.options,
    //         offsetLeft = options.offsetLeft || 0,
    //         offsetRight = options.offsetRight || 0,
    //         horiz = this.horiz,
    //         width = pick(options.width, chart.plotWidth - offsetLeft + offsetRight),
    //         height = pick(options.height, chart.plotHeight),
    //         top = pick(options.top, chart.plotTop),
    //         left = pick(options.left, chart.plotLeft + offsetLeft),
    //         percentRegex = /%$/;
    //
    //     // Check for percentage based input values
    //     if (percentRegex.test(height)) {
    //         height = parseFloat(height) / 100 * chart.plotHeight;
    //     }
    //     if (percentRegex.test(top)) {
    //         top = parseFloat(top) / 100 * chart.plotHeight + chart.plotTop;
    //     }
    //
    //     if (percentRegex.test(width)) {
    //         width = parseFloat(width) / 100 * chart.plotWidth;
    //     }
    //     if (percentRegex.test(left)) {
    //         left = parseFloat(left) / 100 * chart.plotWidth + chart.plotLeft;
    //     }
    //
    //     // Expose basic values to use in Series object and navigator
    //     this.left = left;
    //     this.top = top;
    //     this.width = width;
    //     this.height = height;
    //     this.bottom = chart.chartHeight - height - top;
    //     this.right = chart.chartWidth - width - left;
    //
    //     // Direction agnostic properties
    //     this.len = mathMax(horiz ? width : height, 0); // mathMax fixes #905
    //     this.pos = horiz ? left : top; // distance from SVG origin
    // });
    /* ****************************************************************************
     * 结束图表新功能扩展											*
     *****************************************************************************/


    /* ****************************************************************************
     * 开始图表问题bug解决												*
     *****************************************************************************/

    //条形图与柱状图柱子的偏移角度相差90度
    H.wrap(seriesTypes.column.prototype, 'translate', function (proceed) {
        var series = this,
            chart = series.chart,
            options = chart.options,
            options3d = options.chart.options3d;

        if (chart.is3d && chart.is3d() && chart.inverted && !chart._adjustAlphaForBar && options3d.pseudo) {
            options3d.alpha = 90 - options3d.alpha;
            chart._adjustAlphaForBar = true;
        };
        proceed.apply(this, [].slice.call(arguments, 1));

    });

    /**
     * 三维条形图中，如果点从上往下绘制会出现下面的图形遮挡上面的图形的情况，这个方法的作用是使点从下向上绘制
     */
    // H.wrap(seriesTypes.column.prototype, 'drawPoints', function (proceed) {
    //     var series = this,
    //         chart = this.chart;
    //
    //     if (chart.is3d && chart.is3d() && chart.inverted) {
    //         series.points.reverse();
    //     };
    //     proceed.apply(this, [].slice.call(arguments, 1));
    // });

    /**
     * 没有数据时坐标轴默认显示标签
     */
    // H.wrap(H.Axis.prototype, 'getSeriesExtremes', function (proceed) {
    //     proceed.apply(this, [].slice.call(arguments, 1));
    //     var axis = this,
    //         chart = axis.chart;
    //
    //     // reset dataMin and dataMax in case we're redrawing
    //     var defaultDataMin,
    //         defaultDataMax;
    //     //分类坐标轴
    //     if(axis.categories){
    //         defaultDataMin = 0;
    //         defaultDataMax = axis.categories.length - 1;
    //     }
    //     //时间日期坐标轴
    //     else if(axis.isDatetimeAxis){
    //         defaultDataMin = 1136073600000;
    //         defaultDataMax = 1136678400000;
    //     }
    //     //其他
    //     else{
    //         defaultDataMin = 10;
    //         defaultDataMax = 90;
    //     }
    //     axis.dataMin = H.pick(axis.dataMin, axis.oldDataMin, defaultDataMin);
    //     axis.dataMax = H.pick(axis.dataMax, axis.oldDataMax, defaultDataMax);
    //     axis.oldDataMin = axis.dataMin;
    //     axis.oldDataMax = axis.dataMax;
    // });


    /**
     * 没有数据时坐标轴默认显示标签
     */
    // H.wrap(H.Axis.prototype, 'getTitlePosition', function (proceed) {
    //     // compute anchor points for each of the title align options
    //     var horiz = this.horiz,
    //         axisLeft = this.left,
    //         axisTop = this.top,
    //         axisLength = this.len,
    //         axisTitleOptions = this.options.title,
    //         margin = horiz ? axisLeft : axisTop,
    //         opposite = this.opposite,
    //         offset = this.offset,
    //         xOption = axisTitleOptions.x || 0,
    //         yOption = axisTitleOptions.y || 0,
    //         fontSize = pInt(axisTitleOptions.style.fontSize || 12),
    //
    //     // the position in the length direction of the axis
    //         alongAxis = {
    //             low: margin + (horiz ? 0 : axisLength),
    //             middle: margin + axisLength / 2,
    //             high: margin + (horiz ? axisLength : 0)
    //         }[axisTitleOptions.align],
    //
    //     // the position in the perpendicular direction of the axis
    //         offAxis = (horiz ? axisTop + this.height : axisLeft) +
    //             (horiz ? 1 : -1) * // horizontal axis reverses the margin
    //             (opposite ? -1 : 1) * // so does opposite axes
    //             this.axisTitleMargin +
    //             (this.side === 2 ? fontSize : 0);
    //
    //     var correctionY = 0;
    //     if(this.axisTitle && this.axisTitle.textStr){
    //         if(/<br>|<br\/>/.test(this.axisTitle.textStr)){
    //             var bBox = this.axisTitle.getBBox();
    //             correctionY = -bBox.height / 2;
    //         }
    //     }
    //
    //     return {
    //         x: horiz ?
    //             alongAxis + xOption :
    //             offAxis + (opposite ? this.width : 0) + offset + xOption,
    //         y: horiz ?
    //             offAxis + yOption - (opposite ? this.height : 0) + offset :
    //             alongAxis + yOption + correctionY
    //     };
    // });


//    H.Chart.prototype.callbacks.push(function (chart) {
//        if(chart.rangeSelector){
//            chart.rangeSelector.group.translate(0,-9999);
//        }
//    });

    /* ****************************************************************************
     * ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑结束图表问题bug解决↑↑↑↑↑↑↑↑↑↑↑↑↑↑ ↑↑ *
     *****************************************************************************/


}(Highcharts));

// 修改的源代码：
// 1、添加上中下旬支持
//    hwstock.src.js:  添加代码---'t':lang.tens ? lang.tens[Math.floor(((dayOfMonth > 30 ? 30 : dayOfMonth) - 1) / 10)] : ''
// 2、添加一位阿拉伯月份的支持
//    hwstock.src.js:  432行('m': pad(month + 1), // Two digit month number, 01 through 12)添加代码---'n': month + 1, // one digit month number, 1 through 12
// 3、添加禁止或启用图表边框和背景功能。
//    hwstock.src.js:  27332行-drawChartBox -- (plotBackgroundImage = optionsChart.plotBackgroundImage,)添加代码---
//                            chartBorderEnabled = optionsChart.borderEnabled && chartBorderWidth,
//                            plotBorderEnabled = optionsChart.plotBorderEnabled && plotBorderWidth,
//                            chartBackgroundOpacity = pick(optionsChart.backgroundOpacity, 1),
//                            plotBackgroundOpacity = pick(optionsChart.plotBackgroundOpacity, 1),

//                     27378行   fill: chartBackgroundColor || 'none' 改成 fill: chartBackgroundColor ? H.Color(chartBackgroundColor).setOpacity(chartBackgroundOpacity).get() : 'none'
//                     27414行   fill: plotBackgroundColor || 'none' 改成 fill: plotBackgroundColor ? H.Color(plotBackgroundColor).setOpacity(plotBackgroundOpacity).get() : 'none'
//                     12172行   bgAttr['stroke-width'] = chartBorderWidth; 改成 bgAttr['stroke-width'] = chartBorderEnabled && chartBorderWidth;
//                     12227行  'stroke-width': optionsChart.plotBorderWidth, 改成 'stroke-width': (plotBorderEnabled && optionsChart.plotBorderWidth) || 0,

// if (chartBorderEnabled && (chartBorderWidth || chartBackground['stroke-width'])) { // #980
//     bgAttr.stroke = optionsChart.borderColor;
//     bgAttr['stroke-width'] = chartBorderEnabled && chartBorderWidth;
// }
// else if(!chartBorderEnabled){
//     bgAttr['stroke-width'] = 0;
// }
// 4、添加伪三维柱状图
//    hwcharts-3d.src.js: 96行(return H.map(points, function(point) {)下面添加以下代码
// coordinate.x = coordinate.x * scale + origin.x;
// coordinate.y = coordinate.y * scale + origin.y;
// coordinate.z = rotated.z * scale + origin.z;

//添加代码
// if(options3d.pseudo){
//     coordinate.x= point.x + (point.z || 0) * angles.cosA;
//     coordinate.y= point.y - (point.z || 0) * angles.sinA;
//     coordinate.z= (point.z || 0);
// }

//===========================改后================================================
// return H.map(points, function(point) {
//     var rotated = rotate3D(
//             (inverted ? point.y : point.x) - origin.x,
//             (inverted ? point.x : point.y) - origin.y,
//             (point.z || 0) - origin.z,
//         angles
//         ),
//         coordinate = perspective3D(rotated, origin, origin.vd); // Apply perspective
//
//     // Apply translation
//     coordinate.x = coordinate.x * scale + origin.x;
//     coordinate.y = coordinate.y * scale + origin.y;
//     coordinate.z = rotated.z * scale + origin.z;
//
//     if(options3d.pseudo){
//         coordinate.x= point.x + (point.z || 0) * angles.cosA;
//         coordinate.y= point.y - (point.z || 0) * angles.sinA;
//         coordinate.z= (point.z || 0);
//     }
//
//     return {
//         x: (inverted ? coordinate.y : coordinate.x),
//         y: (inverted ? coordinate.x : coordinate.y),
//         z: coordinate.z
//     };
// });
//===========================结束================================================


//6、标签绘制添加paddingRight支持
//（1）方法"label: function (str, x, y, shape, anchorX, anchorY, useHTML, baseline, className) {"中语句"paddingLeft = 0,"下面加上"paddingRight = 0,"
//（2）方法 wrapper.paddingLeftSetter =  function (value) {
//                if (defined(value) && value !== paddingLeft) {
//                    paddingLeft = value;
//                    updateTextPadding();
//                }
//            };
//      下面添加
//            wrapper.paddingRightSetter =  function (value) {
//                if (defined(value) && value !== paddingRight) {
//                    paddingRight = value;
//                    updateTextPadding();
//                }
//            };
//（3）将wrapper.width = (width || bBox.width || 0) + 2 * padding + paddingLeft;改成
//wrapper.width = (width || bBox.width || 0) + 2 * padding + paddingLeft + paddingRight;

//7、解决加载数据标签时报错的问题 loadingOptions = options.loading,改成loadingOptions = (options && options.loading) || {},
//8、删除点功能
//   行附近方法getGraphPath: function(points, nullsAsZeroes, connectCliffs) {中添加代码 在

//      。。。
//      Area series, nullsAsZeroes is set
//      } else if (point.isNull && !nullsAsZeroes) {
//         gap = true;
//      }
//      ------添加的代码
// else if(point.deleteMode == "delete" || point.deleteMode == "recovery"){
// }
//      ------添加的代码

// 9、鸡爪图 30926--getGraphPath
// function getLastInVisible(){
//     var lastVisible = 0;
//     for(var i = 0; i < yAxis.series.length; i++){
//         if(yAxis.series[i].visible){
//             lastVisible = i;
//         }
//     }
//     return lastVisible;
// }
//
//
// if(!isNaN(options.gatherInterval) && (i % (options.gatherInterval + 1) == 0)){
//     graphPoints.push({
//         x: i,
//         plotX: plotX,
//         plotY: yAxis.translate(points[i].stackTotal, 0, 1, 0, 1)
//     });
//     if(seriesIndex != getLastInVisible()){
//         bottomPoints.push({
//             x: i,
//             plotX: plotX,
//             plotY: yAxis.translate(points[i].stackTotal, 0, 1, 0, 1)
//         });
//     }
// }

// 10、修改数据提示默认日期格式 ---10546
// dateTimeLabelFormats: {
//     millisecond: '%Y-%m-%d %H:%M:%S.%L',
//         second: '%Y-%m-%d %H:%M:%S',
//         minute: '%Y-%m-%d %H:%M',
//         hour: '%Y-%m-%d %H:%M',
//         day: '%Y-%m-%d',
//         week: '%Y-%m-%d',
//         month: '%Y-%m',
//         year: '%Y'
// },

//ie8下重新渲染后折线出来不全的问题 28389---invertGroups
// function setInvert() {
//     each(['group', 'markerGroup'], function (groupName) {
//         if (series[groupName]) {
//
//             // VML/HTML needs explicit attributes for flipping
//             if (chart.renderer.isVML) {
//                 series[groupName].attr({
//                     width: inverted ? series.yAxis.len : series.xAxis.len,
//                     height: inverted ? series.xAxis.len : series.yAxis.len
//                 });
//             }
//
//             series[groupName].width = inverted ? series.yAxis.len : series.xAxis.len;
//             series[groupName].height = inverted ? series.xAxis.len : series.yAxis.len;
//             series[groupName].invert(inverted);
//         }
//     });
// }

//单触控拖动；
// else if (self.followTouchMove && touchesLength === 1) {
//     this.runPointActions(self.normalize(e));
//
//     // Event type is touchmove, handle panning and pinching
// }
// 改成
// else if (self.followTouchMove && touchesLength === 1 && !chart.options.chart.singleTouchPane) {
//     this.runPointActions(self.normalize(e));
//
//     // Event type is touchmove, handle panning and pinching
// }
