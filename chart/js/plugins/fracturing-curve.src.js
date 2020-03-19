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
        VISIBLE = 'visible',

        commonOptions = {
            approximation: 'average', // average, open, high, low, close, sum
            //enabled: null, // (true for stock charts, false for basic),
            //forced: undefined,
            groupPixelWidth: 2,
            // the first one is the point or start value, the second is the start value if we're dealing with range,
            // the third one is the end value if dealing with a range
            dateTimeLabelFormats: {
                millisecond: ['%A, %b %e, %H:%M:%S.%L', '%A, %b %e, %H:%M:%S.%L', '-%H:%M:%S.%L'],
                second: ['%A, %b %e, %H:%M:%S', '%A, %b %e, %H:%M:%S', '-%H:%M:%S'],
                minute: ['%A, %b %e, %H:%M', '%A, %b %e, %H:%M', '-%H:%M'],
                hour: ['%A, %b %e, %H:%M', '%A, %b %e, %H:%M', '-%H:%M'],
                day: ['%A, %b %e, %Y', '%A, %b %e', '-%A, %b %e, %Y'],
                week: ['Week from %A, %b %e, %Y', '%A, %b %e', '-%A, %b %e, %Y'],
                month: ['%B %Y', '%B', '-%B %Y'],
                year: ['%Y', '%Y', '-%Y']
            }
            // smoothed = false, // enable this for navigator series only
        },

        specificOptions = { // extends common options
            line: {},
            spline: {},
            area: {},
            areaspline: {},
            column: {
                approximation: 'sum',
                groupPixelWidth: 10
            },
            arearange: {
                approximation: 'range'
            },
            areasplinerange: {
                approximation: 'range'
            },
            columnrange: {
                approximation: 'range',
                groupPixelWidth: 10
            },
            candlestick: {
                approximation: 'ohlc',
                groupPixelWidth: 10
            },
            ohlc: {
                approximation: 'ohlc',
                groupPixelWidth: 5
            }
        },

    // units are defined in a separate array to allow complete overriding in case of a user option
        defaultDataGroupingUnits = [[
            'millisecond', // unit name
            [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
        ], [
            'second',
            [1, 2, 5, 10, 15, 30]
        ], [
            'minute',
            [1, 2, 5, 10, 15, 30]
        ], [
            'hour',
            [1, 2, 3, 4, 6, 8, 12]
        ], [
            'day',
            [1]
        ], [
            'week',
            [1]
        ], [
            'month',
            [1, 3, 6]
        ], [
            'year',
            null
        ]
        ],


        /**
         * Define the available approximation types. The data grouping approximations takes an array
         * or numbers as the first parameter. In case of ohlc, four arrays are sent in as four parameters.
         * Each array consists only of numbers. In case null values belong to the group, the property
         * .hasNulls will be set to true on the array.
         */
        approximations = {
            sum: function (arr) {
                var len = arr.length,
                    ret;

                // 1. it consists of nulls exclusively
                if (!len && arr.hasNulls) {
                    ret = null;
                    // 2. it has a length and real values
                } else if (len) {
                    ret = 0;
                    while (len--) {
                        ret += arr[len];
                    }
                }
                // 3. it has zero length, so just return undefined
                // => doNothing()

                return ret;
            },
            average: function (arr) {
                var len = arr.length,
                    ret = approximations.sum(arr);

                // If we have a number, return it divided by the length. If not, return
                // null or undefined based on what the sum method finds.
                if (typeof ret === NUMBER && len) {
                    ret = ret / len;
                }

                return ret;
            },
            open: function (arr) {
                return arr.length ? arr[0] : (arr.hasNulls ? null : UNDEFINED);
            },
            high: function (arr) {
                return arr.length ? arrayMax(arr) : (arr.hasNulls ? null : UNDEFINED);
            },
            low: function (arr) {
                return arr.length ? arrayMin(arr) : (arr.hasNulls ? null : UNDEFINED);
            },
            close: function (arr) {
                return arr.length ? arr[arr.length - 1] : (arr.hasNulls ? null : UNDEFINED);
            },
            // ohlc and range are special cases where a multidimensional array is input and an array is output
            ohlc: function (open, high, low, close) {
                open = approximations.open(open);
                high = approximations.high(high);
                low = approximations.low(low);
                close = approximations.close(close);

                if (typeof open === NUMBER || typeof high === NUMBER || typeof low === NUMBER || typeof close === NUMBER) {
                    return [open, high, low, close];
                }
                // else, return is undefined
            },
            range: function (low, high) {
                low = approximations.low(low);
                high = approximations.high(high);

                if (typeof low === NUMBER || typeof high === NUMBER) {
                    return [low, high];
                }
                // else, return is undefined
            }
        };
    function defined(obj) {
        return obj !== UNDEFINED && obj !== null;
    }

    extend(defaultOptions, {
        navigator: {
            //enabled: true,
            handles: {
                backgroundColor: '#ebe7e8',
                borderColor: '#b2b1b6'
            },
            height: 20,
            margin: 25,
            maskFill: 'rgba(128,179,236,0.3)',
            maskInside: true,
            outlineColor: '#b2b1b6',
            outlineWidth: 1,
            series: {
                type: "line",
                color: '#4572A7',
                compare: null,
                fillOpacity: 0.05,
                dataGrouping: {
                    approximation: 'average',
                    enabled: false,
                    groupPixelWidth: 2,
                    smoothed: true
//                    units: units
                },
                dataLabels: {
                    enabled: false,
                    zIndex: 2 // #1839
                },
//                id: PREFIX + 'navigator-series',
                lineColor: '#4572A7',
                lineWidth: 1,
                marker: {
                    enabled: false
                },
                pointRange: 0,
                shadow: false,
                threshold: null
            },
            //top: undefined,
            xAxis: {
                tickWidth: 0,
                lineWidth: 0,
                gridLineColor: '#EEE',
                gridLineWidth: 0,
                tickPixelInterval: 200,
                labels: {
                    align: 'left',
                    style: {
                        color: '#888'
                    },
                    x: 3,
                    y: -4
                },
                crosshair: false
            },
            yAxis: {
                gridLineWidth: 0,
                startOnTick: false,
                endOnTick: false,
                minPadding: 0.1,
                maxPadding: 0.1,
                labels: {
                    enabled: false
                },
                crosshair: false,
                title: {
                    text: null
                },
                tickWidth: 0
            }
        },
        scrollbar: {
            //enabled: true
            height: isTouchDevice ? 20 : 5,
            barBackgroundColor: '#bfc8d1',
            barBorderRadius: 0,
            barBorderWidth: 1,
            barBorderColor: '#bfc8d1',
            buttonArrowColor: '#666',
            buttonBackgroundColor: '#ebe7e8',
            buttonBorderColor: '#bbb',
            buttonBorderRadius: 0,
            buttonBorderWidth: 1,
            minWidth: 6,
            rifleColor: '#666',
            trackBackgroundColor: '#eeeeee',
            trackBorderColor: '#eeeeee',
            trackBorderWidth: 1
            // trackBorderRadius: 0
//            liveRedraw: hasSVG && !isTouchDevice
        }
    });
    /**
     * Override axisProto.init to mix in special axis instance functions and function overrides
     */
    wrap(axisProto, 'init', function (proceed, chart, userOptions) {

        // Run prototype.init
        proceed.call(this, chart, userOptions);
        var axis = this,
            options = this.options,
            sections = options.sections;
        if(sections && sections.length > 0){

            axis.userMin = sections[0].min;
            axis.userMax = sections[sections.length - 1].max;
            axis.minFracID = sections[0].id;
            axis.maxFracID = sections[sections.length - 1].id;
            axis.sectionPadding = options.sectionPadding || 0;
            axis.sections = [];
            each(sections, function (section,i) {
                axis.sections.push(merge({},sections[i]));
            });
            this.initSections();

        }
    });

    axisProto.initSections = function(){
        var axis = this,
            sections = this.sections;

        //计算每个片段的数据长度
        each(sections, function (section, i) {
            section.dataL = section.max - section.min;
            axis.totalDataL = axis.totalDataL || 0;
            axis.totalDataL += section.dataL;
        });

        //计算每个片段的占比
        each(sections, function (section,i) {
            section.dataRatio = section.dataL / axis.totalDataL;
        });

    }

    wrap(axisProto, 'setAxisSize', function (proceed) {

        // Run prototype.init
        proceed.call(this);

        var axis = this,
            options = this.options,
            sectionPadding = axis.sectionPadding,
            type = options.type,
            isDatetimeAxis = type === 'datetime',
            sections = axis.sections;

        if(sections && sections.length > 0){
            var sectionsNum = sections.length;
            //计算每个片段的轴长度
            for(var i = 0; i < sectionsNum; i++){
                var section = sections[i];
                section.len = mathRound((axis.len - (sectionsNum - 1) * sectionPadding) * section.dataRatio);
                if(i == 0){
                    section.left = 0;
                }
                else{
                    section.left = sections[i-1].left + sections[i-1].len + sectionPadding;
                }
            }
        }
    });

    wrap(axisProto, 'setExtremes', function (proceed, newMin, newMax, redraw, animation, eventArguments) {
        var axis = this,
            chart = axis.chart;

        redraw = pick(redraw, true); // defaults to true

        each(axis.series, function (serie) {
            delete serie.kdTree;
        });

        // Extend the arguments with min and max
        eventArguments = extend(eventArguments, {
            min: newMin,
            max: newMax
        });

        // Fire the event
        HC.fireEvent(axis, 'setExtremes', eventArguments, function () { // the default event handler

            axis.userMin = newMin;
            axis.userMax = newMax;
            axis.eventArgs = eventArguments;

            if (redraw) {
                chart.redraw(animation);
            }
        });
    }),

    wrap(axisProto, 'translate', function (proceed, val, backwards, cvsCoord, old, handleLog, pointPlacement, flags, fracID) {

        var axis = this,
            options = this.options,
            sectionPadding = this.sectionPadding,
            type = options.type,
            isDatetimeAxis = type === 'datetime',
            sections = axis.sections,
            returnValue = 0;

        if(sections && sections.length > 0){

            var section;
            // From pixels to value
            if (backwards) {

                if(fracID){
                    for(var i = 0; i < sections.length; i++){
                        if(sections[i].id == fracID){
                            section = sections[i];
                            break;
                        }
                    }
                }
                else{
                    for(var i = 0; i < sections.length; i++){
                        if(val >= sections[i].left && val <= (sections[i].left + sections[i].len)){
                            section = sections[i];
                        }
                    }
                }

                if(section){
                    returnValue = section.min + (val - section.left) * (section.max - section.min)/section.len; // from chart pixel to value
                }
            }
            // From value to pixels
            else {
                if(fracID){
                    for(var i = 0; i < sections.length; i++){
                        if(sections[i].id == fracID){
                            section = sections[i];
                            break;
                        }
                    }
                }
                else{
                    for(var i = 0; i < sections.length; i++){
                        if(val >= sections[i].min && val <= sections[i].max){
                            section = sections[i];
                        }
                    }
                }

                if(section){
                    returnValue = section.left + (val - section.min) * section.len / section.dataL;
                }
            }

            return returnValue;
        }
        else{
            // Run prototype.init
            return proceed.call(this,val, backwards, cvsCoord, old, handleLog, pointPlacement);
        }

    });

    wrap(axisProto, 'setTickPositions', function (proceed, val, backwards, cvsCoord, old, handleLog, pointPlacement) {

        var options = this.options,
            sections = this.sections,
            tickPositions,
            tickPositionsOption = options.tickPositions,
            tickPositioner = options.tickPositioner,
            startOnTick = options.startOnTick,
            endOnTick = options.endOnTick,
            single;

        // Set the tickmarkOffset
        this.tickmarkOffset = (this.categories && options.tickmarkPlacement === 'between' &&
            this.tickInterval === 1) ? 0.5 : 0; // #3202


        // get minorTickInterval
        this.minorTickInterval = options.minorTickInterval === 'auto' && this.tickInterval ?
            this.tickInterval / 5 : options.minorTickInterval;

        // Find the tick positions
        this.tickPositions = tickPositions = tickPositionsOption && tickPositionsOption.slice(); // Work on a copy (#1565)
        if (!tickPositions) {

            if (this.isDatetimeAxis) {
                if(sections && sections.length > 0){
                    tickPositions = [];
                    for(var i = 0; i < sections.length; i++){
                        var section = sections[i];
                        var tmp = this.getTimeTicks(
                            this.normalizeTimeTickInterval((section.max - section.min) / Math.ceil(section.len / options.tickPixelInterval), options.units),
                            section.min,
                            section.max,
                            options.startOfWeek
                        );

                        var l = tmp.length;
                        while(l--){
                            if(tmp[l] < section.min || tmp[l] > section.max){
                                tmp.splice(l,1);
                            }
                        }
                        tickPositions = tickPositions.concat(tmp);
                        tickPositions.info = tmp.info;
                    }
                }
                else{
                    tickPositions = this.getTimeTicks(
                        this.normalizeTimeTickInterval(this.tickInterval, options.units),
                        this.min,
                        this.max,
                        options.startOfWeek,
                        this.ordinalPositions,
                        this.closestPointRange,
                        true
                    );
                }

            } else if (this.isLog) {
                tickPositions = this.getLogTickPositions(this.tickInterval, this.min, this.max);
            } else {
                tickPositions = this.getLinearTickPositions(this.tickInterval, this.min, this.max);
            }

            // Too dense ticks, keep only the first and last (#4477)
            if (tickPositions.length > this.len) {
                tickPositions = [tickPositions[0], tickPositions.pop()];
            }

            this.tickPositions = tickPositions;

            // Run the tick positioner callback, that allows modifying auto tick positions.
            if (tickPositioner) {
                tickPositioner = tickPositioner.apply(this, [this.min, this.max]);
                if (tickPositioner) {
                    this.tickPositions = tickPositions = tickPositioner;
                }
            }

        }

        if (!this.isLinked) {

            // reset min/max or remove extremes based on start/end on tick
            this.trimTicks(tickPositions, startOnTick, endOnTick);

            // When there is only one point, or all points have the same value on this axis, then min
            // and max are equal and tickPositions.length is 0 or 1. In this case, add some padding
            // in order to center the point, but leave it with one tick. #1337.
            if (this.min === this.max && (this.min !== undefined && this.min !== null) && !this.tickAmount) {
                // Substract half a unit (#2619, #2846, #2515, #3390)
                single = true;
                this.min -= 0.5;
                this.max += 0.5;
            }
            this.single = single;

            if (!tickPositionsOption && !tickPositioner) {
                this.adjustTickAmount();
            }
        }
    });

    wrap(axisProto, 'render', function (proceed) {
        proceed.call(this);

        var axis = this,
            sectionElement = axis.sectionElement,
            chart = axis.chart,
            sections = this.sections;

        if(axis.options.id == "navigator-x-axis" || sectionElement){
            return;
        }
        if(sections && sections.length > 0){
            for(var i = 0; i < sections.length; i++){
                if(sections[i+1]){
                    var left = chart.plotLeft + axis.translate(sections[i].max, null, null, null, null, null,null, sections[i].id),
                        top = chart.plotTop,
                        width = chart.plotLeft + axis.translate(sections[i+1].min, null, null, null, null, null,null, sections[i+1].id) - left,
                        height = chart.plotHeight;
                    axis.sectionElement = chart.renderer.rect(
                        left,
                        top,
                        width,
                        height,
                        0
                    )
                        .attr({
                            fill:Color(axis.options.sectionPaddingColor || 'rgba(69,114,167,0)').setOpacity(axis.options.sectionPaddingOpacity || 1).get(),
                            zIndex: 7
                        })
                        .add();
                }
            }

        }

    });

//    wrap(seriesProto, 'getSegments', function (proceed) {
//        proceed.call(this);
//        var series = this,
//            xAxis = series.xAxis,
//            sections = xAxis.sections,
//            segments = series.segments,
//            i, j, k,
//            sectionSegments = [],
//            points = series.points;
//
//        if(sections && sections.length > 0){
//            for(i = 0; i < sections.length; i++){
//                for(j = 0; j < segments.length; j++){
//                    var sectionSegment = [];
//                    for(k = 0; k < segments[j].length; k++){
//                        var point = segments[j][k];
//                        if(point.fracID == sections[i].id){
//                            sectionSegment.push(point);
//                        }
//                    }
//                    if(sectionSegment.length > 0){
//                        sectionSegments.push(sectionSegment);
//                    }
//                }
//            }
//            series.segments = sectionSegments;
//        }
//    });

    wrap(seriesProto, 'generatePoints', function (proceed) {
        proceed.call(this);
        var series = this,
            xAxis = series.xAxis,
            sections = xAxis.sections,
            points = series.points,
            pointsLength = points.length;

        if(sections && sections.length > 0){
            var initSectionIndex = 0;
            for(var i = 0; i < pointsLength; i++){
                var point = points[i],
                    nextPoint = points[i+1];
                if(nextPoint && nextPoint.x < point.x){
                    point.fracID = sections[initSectionIndex].id;
                    initSectionIndex++;
                }
                else{
                    if(point.x >= sections[initSectionIndex].min && point.x <= sections[initSectionIndex].max){
                        point.fracID = sections[initSectionIndex].id;
                    }
                    else{
                        initSectionIndex++;
                        point.fracID = sections[initSectionIndex].id;
                    }
                }
            }
        };

    });

//    wrap(seriesProto, 'translate', function (proceed) {
//        if (!this.processedXData) { // hidden series
//            this.processData();
//        }
//        this.generatePoints();
//        var series = this,
//            options = series.options,
//            stacking = options.stacking,
//            xAxis = series.xAxis,
//            categories = xAxis.categories,
//            yAxis = series.yAxis,
//            points = series.points,
//            dataLength = points.length,
//            hasModifyValue = !!series.modifyValue,
//            i,
//            pointPlacement = options.pointPlacement,
//            dynamicallyPlaced = pointPlacement === 'between' || isNumber(pointPlacement),
//            threshold = options.threshold,
//            stackThreshold = options.startFromThreshold ? threshold : 0,
//            plotX,
//            plotY,
//            lastPlotX,
//            closestPointRangePx = Number.MAX_VALUE;
//
//        // Translate each point
//        for (i = 0; i < dataLength; i++) {
//            var point = points[i],
//                xValue = point.x,
//                yValue = point.y,
//                yBottom = point.low,
//                stack = stacking && yAxis.stacks[(series.negStacks && yValue < (stackThreshold ? 0 : threshold) ? '-' : '') + series.stackKey],
//                pointStack,
//                stackValues;
//
//            // Discard disallowed y values for log axes (#3434)
//            if (yAxis.isLog && yValue !== null && yValue <= 0) {
//                point.y = yValue = null;
//                error(10);
//            }
//
//            // Get the plotX translation
//            point.plotX = plotX = mathMin(mathMax(-1e5, xAxis.translate(xValue, 0, 0, 0, 1, pointPlacement, this.type === 'flags',point.fracID)), 1e5); // #3923
//
//
//            // Calculate the bottom y value for stacked series
//            if (stacking && series.visible && stack && stack[xValue]) {
//
//                pointStack = stack[xValue];
//                stackValues = pointStack.points[series.index + ',' + i];
//                yBottom = stackValues[0];
//                yValue = stackValues[1];
//
//                if (yBottom === stackThreshold) {
//                    yBottom = pick(threshold, yAxis.min);
//                }
//                if (yAxis.isLog && yBottom <= 0) { // #1200, #1232
//                    yBottom = null;
//                }
//
//                point.total = point.stackTotal = pointStack.total;
//                point.percentage = pointStack.total && (point.y / pointStack.total * 100);
//                point.stackY = yValue;
//
//                // Place the stack label
//                pointStack.setOffset(series.pointXOffset || 0, series.barW || 0);
//
//            }
//
//            // Set translated yBottom or remove it
//            point.yBottom = defined(yBottom) ?
//                yAxis.translate(yBottom, 0, 1, 0, 1) :
//                null;
//
//            // general hook, used for HWstock compare mode
//            if (hasModifyValue) {
//                yValue = series.modifyValue(yValue, point);
//            }
//
//            // Set the the plotY value, reset it for redraws
//            point.plotY = plotY = (typeof yValue === 'number' && yValue !== Infinity) ?
//                mathMin(mathMax(-1e5, yAxis.translate(yValue, 0, 1, 0, 1)), 1e5) : // #3201
//                UNDEFINED;
//            point.isInside = plotY !== UNDEFINED && plotY >= 0 && plotY <= yAxis.len && // #3519
//                plotX >= 0 && plotX <= xAxis.len;
//
//
//            // Set client related positions for mouse tracking
//            point.clientX = dynamicallyPlaced ? xAxis.translate(xValue, 0, 0, 0, 1) : plotX; // #1514
//
//            point.negative = point.y < (threshold || 0);
//
//            // some API data
//            point.category = categories && categories[point.x] !== UNDEFINED ?
//                categories[point.x] : point.x;
//
//            // Determine auto enabling of markers (#3635)
//            if (i) {
//                closestPointRangePx = mathMin(closestPointRangePx, mathAbs(plotX - lastPlotX));
//            }
//            lastPlotX = plotX;
//
//        }
//
//        series.closestPointRangePx = closestPointRangePx;
//
//        // now that we have the cropped data, build the segments
//        series.getSegments();
//    });

    wrap(Pointer.prototype, 'drop', function (proceed, e) {
        var pointer = this,
            chart = this.chart,
            hasPinched = this.hasPinched;

        if (this.selectionMarker) {
            var tempSections,
                selectionBox = this.selectionMarker,
                selectionLeft = selectionBox.attr ? selectionBox.attr('x') : selectionBox.x,
                selectionTop = selectionBox.attr ? selectionBox.attr('y') : selectionBox.y,
                selectionWidth = selectionBox.attr ? selectionBox.attr('width') : selectionBox.width,
                selectionHeight = selectionBox.attr ? selectionBox.attr('height') : selectionBox.height,
                runZoom;

            // a selection has been made
            if (this.hasDragged || hasPinched) {

                var xAxis = chart.xAxis[0],
                    sections = xAxis.sections;

                if (xAxis.zoomEnabled && defined(xAxis.min) && (hasPinched || pointer[{ xAxis: 'zoomX', yAxis: 'zoomY' }[xAxis.coll]])) { // #859, #3569
                    if(sections && sections.length > 0){
                        var horiz = xAxis.horiz,
                            minPixelPadding = e.type === 'touchend' ? xAxis.minPixelPadding : 0, // #1207, #3075
                            selectionMin = xAxis.toValue((horiz ? selectionLeft : selectionTop) + minPixelPadding),
                            selectionMax = xAxis.toValue((horiz ? selectionLeft + selectionWidth : selectionTop + selectionHeight) - minPixelPadding);

                        var forward = 0,
                            backward = sections.length - 1,
                            sectionChartLeft = selectionLeft - xAxis.left,
                            sectionChartRight = selectionLeft + selectionWidth - xAxis.left,
                            sConfirm = false,
                            eConfirm = false;
                        do{
                            if(!sConfirm){
                                if(sectionChartLeft >= sections[forward].left && sectionChartLeft <= (sections[forward].left + sections[forward].len)){
                                    if(forward == backward){
                                        sections[forward].querySTime = selectionMin;
                                        sections[forward].queryETime = selectionMax;
                                    }
                                    else{
                                        sections[forward].querySTime = selectionMin;
                                        sections[forward].queryETime = sections[forward].max;
                                    }
                                    sConfirm = true;
                                }
                                else if(sectionChartLeft >= (sections[forward].left + sections[forward].len) && sections[forward + 1] && sectionChartLeft <= sections[forward + 1].left){
                                    forward++;
                                    if(forward == backward){
                                        sections[forward].querySTime = sections[forward].min;
                                        sections[forward].queryETime = selectionMax;
                                    }
                                    else{
                                        sections[forward].querySTime = sections[forward].min;
                                        sections[forward].queryETime = sections[forward].max;
                                    }
                                    sConfirm = true;
                                }
                                else {
                                    forward++;
                                }
                            }

                            if(!eConfirm){
                                if(sectionChartRight > sections[backward].left && sectionChartRight <= (sections[backward].left + sections[backward].len)){
                                    if(forward == backward){
                                        sections[backward].querySTime = selectionMin;
                                        sections[backward].queryETime = selectionMax;
                                    }
                                    else{
                                        sections[backward].querySTime = sections[backward].min;
                                        sections[backward].queryETime = selectionMax;
                                    }
                                    eConfirm = true;
                                }
                                else if(sectionChartRight <= sections[backward].left && sections[backward - 1] && sectionChartRight >= (sections[backward - 1].left + sections[backward - 1].len)){
                                    backward--;
                                    if(forward == backward){
                                        sections[backward].querySTime = selectionMin;
                                        sections[backward].queryETime = sections[backward].max;
                                    }
                                    else{
                                        sections[backward].querySTime = sections[backward].min;
                                        sections[backward].queryETime = sections[backward].max;
                                    }
                                    eConfirm = true;
                                }
                                else {
                                    backward--;
                                }
                            }
                        } while((!eConfirm || !sConfirm) && forward <= backward)
                    }


                    tempSections = sections.slice(forward, backward+1);

                    runZoom = true;
                }

                if (runZoom) {
//                    fireEvent(chart, 'selection', selectionData, function (args) {
//                        chart.zoom(extend(args, hasPinched ? { animation: false } : null));
//                    });
                    chart.xAxis[0].setExtremes(
                        xAxis.min,
                        xAxis.max,
                        true,
                        false,
                        {
                            tempSections:tempSections,
                            trigger: 'zoom',
                            triggerOp: 'drag',
                            DOMEvent: e // #1838
                        }
                    );
                }

            }
            this.selectionMarker = this.selectionMarker.destroy();

            // Reset scaling preview
            if (hasPinched) {
                this.scaleGroups();
            }
        }

        // Reset all
        if (chart) { // it may be destroyed on mouse up - #877
            css(chart.container, { cursor: chart._cursor });
            chart.cancelClick = this.hasDragged > 10; // #370
            chart.mouseIsDown = this.hasDragged = this.hasPinched = false;
            this.pinchDown = [];
        }
    });

    wrap(HC.Scroller.prototype, 'init', function (proceed, newMin, newMax) {

        var scroller = this,
            chart = scroller.chart,
            xAxis,
            yAxis,
            scrollbarHeight = scroller.scrollbarHeight,
            navigatorOptions = scroller.navigatorOptions,
            height = scroller.height,
            top = scroller.top,
            dragOffset,
            hasDragged,
            baseSeries = scroller.baseSeries;

        /**
         * Event handler for the mouse down event.
         */
        scroller.mouseDownHandler = function (e) {
            e = chart.pointer.normalize(e);

            var zoomedMin = scroller.zoomedMin,
                zoomedMax = scroller.zoomedMax,
                top = scroller.top,
                scrollbarHeight = scroller.scrollbarHeight,
                scrollerLeft = scroller.scrollerLeft,
                scrollerWidth = scroller.scrollerWidth,
                navigatorLeft = scroller.navigatorLeft,
                navigatorWidth = scroller.navigatorWidth,
                scrollbarPad = scroller.scrollbarPad,
                range = scroller.range,
                chartX = e.chartX,
                chartY = e.chartY,
                baseXAxis = chart.xAxis[0],
                fixedMax,
                ext,
                handleSensitivity = isTouchDevice ? 10 : 7,
                left,
                isOnNavigator;

            if (chartY > top && chartY < top + height + scrollbarHeight) { // we're vertically inside the navigator
                isOnNavigator = !scroller.scrollbarEnabled || chartY < top + height;

                // grab the left handle
                if (isOnNavigator && math.abs(chartX - zoomedMin - navigatorLeft) < handleSensitivity) {
                    scroller.grabbedLeft = true;
                    scroller.otherHandlePos = zoomedMax;
                    scroller.fixedExtreme = baseXAxis.max;
                    chart.fixedRange = null;

                    // grab the right handle
                } else if (isOnNavigator && math.abs(chartX - zoomedMax - navigatorLeft) < handleSensitivity) {
                    scroller.grabbedRight = true;
                    scroller.otherHandlePos = zoomedMin;
                    scroller.fixedExtreme = baseXAxis.min;
                    chart.fixedRange = null;

                    // grab the zoomed range
                } else if (chartX > navigatorLeft + zoomedMin - scrollbarPad && chartX < navigatorLeft + zoomedMax + scrollbarPad) {
                    scroller.grabbedCenter = chartX;
                    scroller.fixedWidth = range;

                    dragOffset = chartX - zoomedMin;


                    // shift the range by clicking on shaded areas, scrollbar track or scrollbar buttons
                } else if (chartX > scrollerLeft && chartX < scrollerLeft + scrollerWidth) {

                    // Center around the clicked point
                    if (isOnNavigator) {
                        left = chartX - navigatorLeft - range / 2;

                        // Click on scrollbar
                    } else {

                        // Click left scrollbar button
                        if (chartX < navigatorLeft) {
                            left = zoomedMin - range * 0.2;

                            // Click right scrollbar button
                        } else if (chartX > scrollerLeft + scrollerWidth - scrollbarHeight) {
                            left = zoomedMin + range * 0.2;

                            // Click on scrollbar track, shift the scrollbar by one range
                        } else {
                            left = chartX < navigatorLeft + zoomedMin ? // on the left
                                zoomedMin - range :
                                zoomedMax;
                        }
                    }
                    if (left < 0) {
                        left = 0;
                    } else if (left + range >= navigatorWidth) {
                        left = navigatorWidth - range;
                        fixedMax = scroller.getUnionExtremes().dataMax; // #2293, #3543
                    }
                    if (left !== zoomedMin) { // it has actually moved
                        scroller.fixedWidth = range; // #1370

                        ext = xAxis.toFixedRange(left, left + range, null, fixedMax);
                        baseXAxis.setExtremes(
                            ext.min,
                            ext.max,
                            true,
                            false,
                            {
                                zoomMin: scroller.zoomedMin,
                                zoomMax: scroller.zoomedMax,
                                trigger: 'navigator' }
                        );
                    }
                }

            }
        };

        /**
         * Event handler for the mouse move event.
         */
        scroller.mouseMoveHandler = function (e) {
            var scrollbarHeight = scroller.scrollbarHeight,
                navigatorLeft = scroller.navigatorLeft,
                navigatorWidth = scroller.navigatorWidth,
                scrollerLeft = scroller.scrollerLeft,
                scrollerWidth = scroller.scrollerWidth,
                range = scroller.range,
                chartX;

            // In iOS, a mousemove event with e.pageX === 0 is fired when holding the finger
            // down in the center of the scrollbar. This should be ignored.
            if (e.pageX !== 0) {

                e = chart.pointer.normalize(e);
                chartX = e.chartX;

                // validation for handle dragging
                if (chartX < navigatorLeft) {
                    chartX = navigatorLeft;
                } else if (chartX > scrollerLeft + scrollerWidth - scrollbarHeight) {
                    chartX = scrollerLeft + scrollerWidth - scrollbarHeight;
                }

                // drag left handle
                if (scroller.grabbedLeft) {
                    hasDragged = true;
                    scroller.render(0, 0, chartX - navigatorLeft, scroller.otherHandlePos);

                    // drag right handle
                } else if (scroller.grabbedRight) {
                    hasDragged = true;
                    scroller.render(0, 0, scroller.otherHandlePos, chartX - navigatorLeft);

                    // drag scrollbar or open area in navigator
                } else if (scroller.grabbedCenter) {

                    hasDragged = true;
                    if (chartX < dragOffset) { // outside left
                        chartX = dragOffset;
                    } else if (chartX > navigatorWidth + dragOffset - range) { // outside right
                        chartX = navigatorWidth + dragOffset - range;
                    }

                    scroller.render(0, 0, chartX - dragOffset, chartX - dragOffset + range);

                }
                if (hasDragged && scroller.scrollbarOptions.liveRedraw) {
                    setTimeout(function () {
                        scroller.mouseUpHandler(e);
                    }, 0);
                }
            }
        };

        /**
         * Event handler for the mouse up event.
         */
        scroller.mouseUpHandler = function (e) {
            var ext,
                fixedMin,
                fixedMax;

            if (hasDragged) {
                // When dragging one handle, make sure the other one doesn't change
                if (scroller.zoomedMin === scroller.otherHandlePos) {
                    fixedMin = scroller.fixedExtreme;
                } else if (scroller.zoomedMax === scroller.otherHandlePos) {
                    fixedMax = scroller.fixedExtreme;
                }

                ext = xAxis.toFixedRange(scroller.zoomedMin, scroller.zoomedMax, fixedMin, fixedMax);
                chart.xAxis[0].setExtremes(
                    ext.min,
                    ext.max,
                    true,
                    false,
                    {
                        zoomMin: scroller.zoomedMin,
                        zoomMax: scroller.zoomedMax,
                        trigger: 'navigator',
                        triggerOp: 'navigator-drag',
                        DOMEvent: e // #1838
                    }
                );
            }

            if (e.type !== 'mousemove') {
                scroller.grabbedLeft = scroller.grabbedRight = scroller.grabbedCenter = scroller.fixedWidth =
                    scroller.fixedExtreme = scroller.otherHandlePos = hasDragged = dragOffset = null;
            }

        };



        var xAxisIndex = chart.xAxis.length,
            yAxisIndex = chart.yAxis.length;

        // make room below the chart
        chart.extraBottomMargin = scroller.outlineHeight + navigatorOptions.margin;

        if (scroller.navigatorEnabled) {
            // an x axis is required for scrollbar also
            scroller.xAxis = xAxis = new Axis(chart, merge({
                // inherit base xAxis' break and ordinal options
                breaks: baseSeries && baseSeries.xAxis.options.breaks,
                ordinal: baseSeries && baseSeries.xAxis.options.ordinal
            }, navigatorOptions.xAxis, {
                id: 'navigator-x-axis',
                isX: true,
                type: 'datetime',
                labels:{
                    enabled:false
                },
                index: xAxisIndex,
                height: height,
                offset: 0,
                offsetLeft: scrollbarHeight,
                offsetRight: -scrollbarHeight,
                keepOrdinalPadding: true, // #2436
                startOnTick: false,
                endOnTick: false,
                minPadding: 0,
                maxPadding: 0,
                zoomEnabled: false
            }));

            scroller.yAxis = yAxis = new Axis(chart, merge(navigatorOptions.yAxis, {
                id: 'navigator-y-axis',
                alignTicks: false,
                height: height,
                offset: 0,
                index: yAxisIndex,
                zoomEnabled: false
            }));

            // If we have a base series, initialize the navigator series
            if (baseSeries || navigatorOptions.series.data) {
                scroller.addBaseSeries();

                // If not, set up an event to listen for added series
            } else if (chart.series.length === 0) {

                wrap(chart, 'redraw', function (proceed, animation) {
                    // We've got one, now add it as base and reset chart.redraw
                    if (chart.series.length > 0 && !scroller.series) {
                        scroller.setBaseSeries();
                        chart.redraw = proceed; // reset
                    }
                    proceed.call(chart, animation);
                });
            }


            // in case of scrollbar only, fake an x axis to get translation
        } else {
            scroller.xAxis = xAxis = {
                translate: function (value, reverse) {
                    var axis = chart.xAxis[0],
                        ext = axis.getExtremes(),
                        scrollTrackWidth = chart.plotWidth - 2 * scrollbarHeight,
                        min = numExt('min', axis.options.min, ext.dataMin),
                        valueRange = numExt('max', axis.options.max, ext.dataMax) - min;

                    return reverse ?
                        // from pixel to value
                        (value * valueRange / scrollTrackWidth) + min :
                        // from value to pixel
                        scrollTrackWidth * (value - min) / valueRange;
                },
                toFixedRange: Axis.prototype.toFixedRange
            };
        }


        /**
         * For stock charts, extend the Chart.getMargins method so that we can set the final top position
         * of the navigator once the height of the chart, including the legend, is determined. #367.
         */
        wrap(chart, 'getMargins', function (proceed) {

            var legend = this.legend,
                legendOptions = legend.options;

            proceed.apply(this, [].slice.call(arguments, 1));

            // Compute the top position
            scroller.top = top = scroller.navigatorOptions.top ||
                this.chartHeight - scroller.height - scroller.scrollbarHeight - this.spacing[2] -
                (legendOptions.verticalAlign === 'bottom' && legendOptions.enabled && !legendOptions.floating ?
                    legend.legendHeight + pick(legendOptions.margin, 10) : 0);

            if (xAxis && yAxis) { // false if navigator is disabled (#904)

                xAxis.options.top = yAxis.options.top = top;

                xAxis.setAxisSize();
                yAxis.setAxisSize();
            }
        });


        scroller.addEvents();
    });

    wrap(HC.Scroller.prototype, 'render', function (proceed, min, max, pxMin, pxMax) {
        var scroller = this,
            chart = scroller.chart,
            renderer = chart.renderer,
            navigatorLeft,
            navigatorWidth,
            scrollerLeft,
            scrollerWidth,
            scrollbarGroup = scroller.scrollbarGroup,
            navigatorGroup = scroller.navigatorGroup,
            scrollbar = scroller.scrollbar,
            xAxis = scroller.xAxis,
            scrollbarTrack = scroller.scrollbarTrack,
            scrollbarHeight = scroller.scrollbarHeight,
            scrollbarEnabled = scroller.scrollbarEnabled,
            navigatorOptions = scroller.navigatorOptions,
            scrollbarOptions = scroller.scrollbarOptions,
            scrollbarMinWidth = scrollbarOptions.minWidth,
            height = scroller.height,
            top = scroller.top,
            navigatorEnabled = scroller.navigatorEnabled,
            outlineWidth = navigatorOptions.outlineWidth,
            halfOutline = outlineWidth / 2,
            zoomedMin,
            zoomedMax,
            range,
            scrX,
            scrWidth,
            scrollbarPad = 0,
            outlineHeight = scroller.outlineHeight,
            barBorderRadius = scrollbarOptions.barBorderRadius,
            strokeWidth,
            scrollbarStrokeWidth = scrollbarOptions.barBorderWidth,
            centerBarX,
            outlineTop = top + halfOutline,
            verb,
            unionExtremes;

        // Don't render the navigator until we have data (#486, #4202)
        if (!defined(min) || isNaN(min)) {
            return;
        }

        scroller.navigatorLeft = navigatorLeft = pick(
            xAxis.left,
                chart.plotLeft + scrollbarHeight // in case of scrollbar only, without navigator
        );
        scroller.navigatorWidth = navigatorWidth = pick(xAxis.len, chart.plotWidth - 2 * scrollbarHeight);
        scroller.scrollerLeft = scrollerLeft = navigatorLeft - scrollbarHeight;
        scroller.scrollerWidth = scrollerWidth = scrollerWidth = navigatorWidth + 2 * scrollbarHeight;

        // Set the scroller x axis extremes to reflect the total. The navigator extremes
        // should always be the extremes of the union of all series in the chart as
        // well as the navigator series.
        if (xAxis.getExtremes) {
            unionExtremes = scroller.getUnionExtremes(true);

            if (unionExtremes && (unionExtremes.dataMin !== xAxis.min || unionExtremes.dataMax !== xAxis.max)) {
                xAxis.setExtremes(unionExtremes.dataMin, unionExtremes.dataMax, true, false);
            }
        }

        var sXAxis = null;
        for(var i = 0; i < chart.xAxis.length; i++){
            if(chart.xAxis[0].options.id != "navigator-x-axis"){
                sXAxis = chart.xAxis[0];
            }
        }
        // Get the pixel position of the handles
        pxMin = pick(pxMin, xAxis.translate(min, null, null, null, null, null,null, sXAxis && sXAxis.minFracID));
        pxMax = pick(pxMax, xAxis.translate(max, null, null, null, null, null,null, sXAxis && sXAxis.maxFracID));
        if (isNaN(pxMin) || Math.abs(pxMin) === Infinity) { // Verify (#1851, #2238)
            pxMin = 0;
            pxMax = scrollerWidth;
        }

        // Are we below the minRange? (#2618)
        if (xAxis.translate(pxMax, true) - xAxis.translate(pxMin, true) < chart.xAxis[0].minRange) {
            return;
        }


        // handles are allowed to cross, but never exceed the plot area
        scroller.zoomedMax = Math.min(mathMax(pxMin, pxMax), navigatorWidth);
        scroller.zoomedMin =
            mathMax(scroller.fixedWidth ? scroller.zoomedMax - scroller.fixedWidth : mathMin(pxMin, pxMax), 0);
        scroller.range = scroller.zoomedMax - scroller.zoomedMin;
        zoomedMax = mathRound(scroller.zoomedMax);
        zoomedMin = mathRound(scroller.zoomedMin);
        range = zoomedMax - zoomedMin;


        // on first render, create all elements
        if (!scroller.rendered) {

            if (navigatorEnabled) {

                // draw the navigator group
                scroller.navigatorGroup = navigatorGroup = renderer.g('navigator')
                    .attr({
                        zIndex: 3
                    })
                    .add();

                scroller.leftShade = renderer.rect()
                    .attr({
                        fill: navigatorOptions.maskFill
                    }).add(navigatorGroup);

                if (navigatorOptions.maskInside) {
                    scroller.leftShade.css({ cursor: 'ew-resize '});
                } else {
                    scroller.rightShade = renderer.rect()
                        .attr({
                            fill: navigatorOptions.maskFill
                        }).add(navigatorGroup);
                }


                scroller.outline = renderer.path()
                    .attr({
                        'stroke-width': outlineWidth,
                        stroke: navigatorOptions.outlineColor
                    })
                    .add(navigatorGroup);
            }

            if (scrollbarEnabled) {

                // draw the scrollbar group
                scroller.scrollbarGroup = scrollbarGroup = renderer.g('scrollbar').add();

                // the scrollbar track
                strokeWidth = scrollbarOptions.trackBorderWidth;
                scroller.scrollbarTrack = scrollbarTrack = renderer.rect().attr({
                    x: 0,
                    y: -strokeWidth % 2 / 2,
                    fill: scrollbarOptions.trackBackgroundColor,
                    stroke: scrollbarOptions.trackBorderColor,
                    'stroke-width': strokeWidth,
                    r: scrollbarOptions.trackBorderRadius || 0,
                    height: scrollbarHeight
                }).add(scrollbarGroup);

                // the scrollbar itself
                scroller.scrollbar = scrollbar = renderer.rect()
                    .attr({
                        y: -scrollbarStrokeWidth % 2 / 2,
                        height: scrollbarHeight,
                        fill: scrollbarOptions.barBackgroundColor,
                        stroke: scrollbarOptions.barBorderColor,
                        'stroke-width': scrollbarStrokeWidth,
                        r: barBorderRadius
                    })
                    .add(scrollbarGroup);

                scroller.scrollbarRifles = renderer.path()
                    .attr({
                        stroke: scrollbarOptions.rifleColor,
                        'stroke-width': 1
                    })
                    .add(scrollbarGroup);
            }
        }

        // place elements
        verb = chart.isResizing ? 'animate' : 'attr';

        if (navigatorEnabled) {
            scroller.leftShade[verb](navigatorOptions.maskInside ? {
                x: navigatorLeft + zoomedMin,
                y: top,
                width: zoomedMax - zoomedMin,
                height: height
            } : {
                x: navigatorLeft,
                y: top,
                width: zoomedMin,
                height: height
            });
            if (scroller.rightShade) {
                scroller.rightShade[verb]({
                    x: navigatorLeft + zoomedMax,
                    y: top,
                    width: navigatorWidth - zoomedMax,
                    height: height
                });
            }

            scroller.outline[verb]({ d: [
                M,
                scrollerLeft, outlineTop, // left
                L,
                    navigatorLeft + zoomedMin - halfOutline, outlineTop, // upper left of zoomed range
                    navigatorLeft + zoomedMin - halfOutline, outlineTop + outlineHeight, // lower left of z.r.
                L,
                    navigatorLeft + zoomedMax - halfOutline, outlineTop + outlineHeight, // lower right of z.r.
                L,
                    navigatorLeft + zoomedMax - halfOutline, outlineTop, // upper right of z.r.
                    scrollerLeft + scrollerWidth, outlineTop // right
            ].concat(navigatorOptions.maskInside ? [
                    M,
                        navigatorLeft + zoomedMin + halfOutline, outlineTop, // upper left of zoomed range
                    L,
                        navigatorLeft + zoomedMax - halfOutline, outlineTop // upper right of z.r.
                ] : [])});
            // draw handles
            scroller.drawHandle(zoomedMin + halfOutline, 0);
            scroller.drawHandle(zoomedMax + halfOutline, 1);
        }

        // draw the scrollbar
        if (scrollbarEnabled && scrollbarGroup) {

            // draw the buttons
            scroller.drawScrollbarButton(0);
            scroller.drawScrollbarButton(1);

            scrollbarGroup[verb]({
                translateX: scrollerLeft,
                translateY: mathRound(outlineTop + height)
            });

            scrollbarTrack[verb]({
                width: scrollerWidth
            });

            // prevent the scrollbar from drawing to small (#1246)
            scrX = scrollbarHeight + zoomedMin;
            scrWidth = range - scrollbarStrokeWidth;
            if (scrWidth < scrollbarMinWidth) {
                scrollbarPad = (scrollbarMinWidth - scrWidth) / 2;
                scrWidth = scrollbarMinWidth;
                scrX -= scrollbarPad;
            }
            scroller.scrollbarPad = scrollbarPad;
            scrollbar[verb]({
                x: mathFloor(scrX) + (scrollbarStrokeWidth % 2 / 2),
                width: scrWidth
            });

            centerBarX = scrollbarHeight + zoomedMin + range / 2 - 0.5;

            scroller.scrollbarRifles
                .attr({
                    visibility: range > 12 ? VISIBLE : HIDDEN
                })[verb]({
                d: [
                    M,
                        centerBarX - 3, scrollbarHeight / 4,
                    L,
                        centerBarX - 3, 2 * scrollbarHeight / 3,
                    M,
                    centerBarX, scrollbarHeight / 4,
                    L,
                    centerBarX, 2 * scrollbarHeight / 3,
                    M,
                        centerBarX + 3, scrollbarHeight / 4,
                    L,
                        centerBarX + 3, 2 * scrollbarHeight / 3
                ]
            });
        }

        scroller.scrollbarPad = scrollbarPad;
        scroller.rendered = true;
    });
}(Highcharts));
