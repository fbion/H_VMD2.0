/**
 * @license HWcharts JS v4.0.3 (2014-07-03)
 * Exporting module
 *
 * (c) 2010-2014 Torstein Honsi
 *
 * License: www.hwcharts.com/license
 */

// JSLint options:
/*global HWcharts, document, window, Math, setTimeout */

(function (H) { // encapsulate

// create shortcuts
    var Chart = H.Chart,
        addEvent = H.addEvent,
        removeEvent = H.removeEvent,
        createElement = H.createElement,
        discardElement = H.discardElement,
        css = H.css,
        merge = H.merge,
        each = H.each,
        extend = H.extend,
        pick = H.pick,
        math = Math,
        mathMax = math.max,
        doc = document,
        win = window,
        isTouchDevice = H.isTouchDevice,
        M = 'M',
        L = 'L',
        DIV = 'div',
        HIDDEN = 'hidden',
        NONE = 'none',
        PREFIX = 'H-',
        ABSOLUTE = 'absolute',
        PX = 'px',
        UNDEFINED,
        symbols = H.Renderer.prototype.symbols,
        defaultOptions = H.getOptions(),
        buttonOffset;

    /**
     * TODO 重新排列所有标签
     */
    Chart.prototype.reAlignDataLabels = function(){

        var chart = this,
            options = chart.options,
            labelYield = options.chart.dataLabelYield,
            series = chart.series,
            dataN = 0,
            inverted = chart.inverted,
            colPoints,
            i, j;

        if(options.forExport){

        }
        if (!labelYield) {
            return;
        }
        for (i = 0; i < series.length; i++) {
            dataN = math.max(dataN, series[i].data.length);
        }
        for (i = 0; i < dataN; i++) {
            colPoints = [];
            for (j = 0; j < series.length; j++) {
                var chart = series[j].chart,
                    optionsChart = chart.options.chart,
                    type = series[j].options.type || optionsChart.type || optionsChart.defaultSeriesType;
                if(type == "line"){
                    var p = series[j] && series[j].data[i];
                    if (p && p.dataLabel && p.plotY !== undefined) {
                        colPoints.push(p);
                    }
                }
            }
            computePos(chart, colPoints);
        }

        /**
         * 计算数组中点的标注位置
         */
        function computePos(chart, points) {

            if (points.length == 0) {
                return;
            }

            var inverted = chart.inverted;
            if (inverted) {

            }
            else {

                //将points中的点安装点在屏幕上的y的位置按照从小到大的顺序排列起来
                var i, j, k;
                var flag;

                flag = points.length;
                while (flag > 0) {
                    k = flag;
                    flag = 0;
                    for (j = 1; j < k; j++) {
                        if (points[j - 1].plotY > points[j].plotY) {
                            var tmp = points[j];
                            points[j] = points[j - 1];
                            points[j - 1] = tmp;
                            flag = j;
                        }
                    }
                }

                //建立链表
                for (i = 0; i < points.length; i++) {
                    points[i].prePiont = points[i - 1];
                    points[i].nextPiont = points[i + 1];
                }

                //标注高度
                var labelHeight = 0;
                for(var i = 0; i < points.length; i++){
                    labelHeight = mathMax(labelHeight, (points[i].dataLabel.getBBox() && points[i].dataLabel.getBBox().height)||0);
                }

                //建立一个可以放标注的数组，包含能最多放多少标注，标注的位置等
                var labelRooms = [];
                var room;

                for(var i = 0; i < points.length; i++){
                    room = {};
                    room.distance = points[i].plotY - ((points[i-1] && points[i-1].plotY) || 0);
                    room.maxCount = Math.floor((points[i].plotY - ((points[i-1] && points[i-1].plotY) || 0)) / labelHeight);
                    room.accupiedCount = 0;  //已经被占有的位置
                    room.cells = [];
                    for(var j = room.maxCount - 1; j >= 0; j--){
                        var cell = {};
                        cell.y = points[i].plotY - labelHeight * (room.maxCount - 1 - j);
                        //在点的上方时的偏移
                        cell.down_offsetY = labelHeight * j;
                        //在点的下方时的偏移
                        cell.up_offsetY = labelHeight * (room.maxCount - 1 - j);
                        room.cells[j] = cell;
                    }
                    labelRooms.push(room);
                }

                //最后点与下边界之间放的标签数
                room = {};
                room.distance = chart.plotHeight - points[points.length - 1].plotY;
                room.maxCount = Math.floor((chart.plotHeight - points[points.length - 1].plotY) / labelHeight);
                room.accupiedCount = 0;  //已经被占有的位置
                room.cells = [];
                for(var j = 0; j < room.maxCount; j++){
                    var cell = {};
                    cell.y = points[points.length - 1].plotY + labelHeight * j;
                    //在点的上方时的偏移
                    cell.down_offsetY = labelHeight * j;
                    //在点的下方时的偏移
                    cell.up_offsetY = labelHeight * (room.maxCount - 1 - j);
                    room.cells.push(cell);
                }
                labelRooms.push(room);

                for (i = 0; i < points.length; i++) {
                    var pSeries = points[i].series,
                        seriesDatalabelOptions = pSeries.options.dataLabels;

                    points[i].options.dataLabels = merge(seriesDatalabelOptions, points[i].options.dataLabels);
                    for(var j = 0; j < labelRooms.length; j++){
                        //查找点上面的空间
                        if(labelRooms[i - j] && (labelRooms[i - j].maxCount > labelRooms[i - j].accupiedCount)){
                            points[i].options.dataLabels.verticalAlign = 'bottom';
                            //循环没有占用的空间
                            for(var n = labelRooms[i - j].cells.length - 1; n >= 0; n--){
                                if(!labelRooms[i - j].cells[n].point){
                                    labelRooms[i - j].cells[n].point = points[i];
                                    if(points[i].options.dataLabels.y + labelHeight > labelRooms[i - j].distance){
                                        points[i].options.dataLabels.y =  - labelRooms[i - j].cells[n].up_offsetY;
                                    }
                                    else{
                                        points[i].options.dataLabels.y = - points[i].options.dataLabels.y - labelRooms[i - j].cells[n].up_offsetY;
                                    }
                                    points[i].alignTo = extend({
                                        x: pick(points[i].plotX, -999),
                                        y: pick(points[i].plotY, -999),
                                        width: 0,
                                        height: 0
                                    }, null);
                                    break;
                                }
//                                else{
//                                    labelRooms[i - j].cells[n].point.options.dataLabels.y -= labelHeight;
//                                    labelRooms[i - j].cells[n].point = null;
//                                }
                            }
                            labelRooms[i - j].accupiedCount++;
                            break;
                        }
                        //查找下面的空间
                        if(labelRooms[i + j + 1] && (labelRooms[i + j + 1].maxCount > labelRooms[i + j + 1].accupiedCount)){
                            points[i].options.dataLabels.verticalAlign = 'top';
                            //循环没有占用的空间
                            for(var n = 0; n < labelRooms[i + j + 1].cells.length; n++){
                                if(!labelRooms[i + j + 1].cells[n].point){
                                    labelRooms[i + j + 1].cells[n].point = points[i];
                                    if(points[i].options.dataLabels.y + labelHeight > labelRooms[i - j].distance){
                                        points[i].options.dataLabels.y = labelRooms[i + j + 1].cells[n].down_offsetY;
                                    }
                                    else{
                                        points[i].options.dataLabels.y += labelRooms[i + j + 1].cells[n].down_offsetY;
                                    }

                                    points[i].alignTo = extend({
                                        x: pick(points[i].plotX, -999),
                                        y: pick(points[i].plotY, -999),
                                        width: 0,
                                        height: 0
                                    }, null);
                                    break;
                                }
//                                else{
//                                    labelRooms[i + j + 1].cells[n].point.options.dataLabels.y += labelHeight;
//                                }
                            }
                            labelRooms[i + j + 1].accupiedCount++;
                            break;
                        }
                    }
                }

//                for (i = 0; i < points.length; i++) {
//
//                    var currentPoint = points[i],
//                        pSeries = currentPoint.series,
//                        seriesDatalabelOptions = pSeries.options.dataLabels,
//                        dataLabel = currentPoint.dataLabel,
//                        bBox = dataLabel && dataLabel.getBBox(),
//                        alignAttr,
//                        alignTo = null;
//
//                    currentPoint.options.dataLabels = merge(seriesDatalabelOptions, currentPoint.options.dataLabels);
//                    //最上边的点
//                    if (!currentPoint.prePiont) {
//                        //如果下边有点
//                        if (currentPoint.nextPiont) {
//                            //将标注放到点的上边，上下都能放开或者只有上边能放开
//                            if (((currentPoint.plotY - chart.plotTop > currentPoint.nextPiont.plotY - currentPoint.plotY) &&
//                                (currentPoint.nextPiont.plotY - currentPoint.plotY > (bBox.height + math.abs(currentPoint.options.dataLabels.y)))) ||
//                                (currentPoint.plotY - chart.plotTop > (bBox.height + math.abs(currentPoint.options.dataLabels.y)) &&
//                                    (currentPoint.nextPiont.plotY - currentPoint.plotY < (bBox.height + math.abs(currentPoint.options.dataLabels.y))))) {
//                                currentPoint.options.dataLabels.x = 0;
//                                currentPoint.options.dataLabels.y = -currentPoint.options.dataLabels.y;
//                                currentPoint.options.dataLabels.verticalAlign = 'bottom';
//                                currentPoint.alignTo = extend({
//                                    x: pick(currentPoint.plotX, -999),
//                                    y: pick(currentPoint.plotY, -999),
//                                    width: 0,
//                                    height: 0
//                                }, alignTo);
//                            }
//                            //将标注放到点的下边，上下都能放开或者只有下边能放开
//                            else if (((currentPoint.plotY - chart.plotTop < currentPoint.nextPiont.plotY - currentPoint.plotY) &&
//                                (currentPoint.plotY - chart.plotTop > (bBox.height + math.abs(currentPoint.options.dataLabels.y)))) ||
//                                (currentPoint.plotY - chart.plotTop < (bBox.height + math.abs(currentPoint.options.dataLabels.y)) &&
//                                    (currentPoint.nextPiont.plotY - currentPoint.plotY > (bBox.height + math.abs(currentPoint.options.dataLabels.y))))) {
//                                currentPoint.options.dataLabels.x = 0;
//                                currentPoint.options.dataLabels.verticalAlign = 'top';
//                                currentPoint.alignTo = extend({
//                                    x: pick(currentPoint.plotX, -999),
//                                    y: pick(currentPoint.plotY, -999),
//                                    width: 0,
//                                    height: 0
//                                }, alignTo);
//                            }
//                            //上下都放不开
//                            else {
//                                currentPoint.options.dataLabels.x = -currentPoint.options.dataLabels.x;
//                                currentPoint.options.dataLabels.y = 0;
//                                currentPoint.options.dataLabels.align = 'right';
//                                currentPoint.options.dataLabels.verticalAlign = 'middle';
//                                currentPoint.alignTo = extend({
//                                    x: pick(currentPoint.plotX, -999),
//                                    y: pick(currentPoint.plotY, -999),
//                                    width: 0,
//                                    height: 0
//                                }, alignTo);
//                            }
//                        }
//
//                        //如果下边没有点
//                        else {
//
//                            //将标注放到点的上边，上下都能放开或者只有上边能放开
//                            if (((currentPoint.plotY - chart.plotTop > chart.plotTop + chart.plotHeight - currentPoint.plotY) &&
//                                (chart.plotTop + chart.plotHeight - currentPoint.plotY > (bBox.height + math.abs(currentPoint.options.dataLabels.y)))) ||
//                                (currentPoint.plotY - chart.plotTop > (bBox.height + math.abs(currentPoint.options.dataLabels.y)) &&
//                                    (chart.plotTop + chart.plotHeight - currentPoint.plotY < (bBox.height + math.abs(currentPoint.options.dataLabels.y))))) {
//                                currentPoint.options.dataLabels.x = 0;
//                                currentPoint.options.dataLabels.y = -currentPoint.options.dataLabels.y;
//                                currentPoint.options.dataLabels.verticalAlign = 'bottom';
//                                currentPoint.alignTo = extend({
//                                    x: pick(currentPoint.plotX, -999),
//                                    y: pick(currentPoint.plotY, -999),
//                                    width: 0,
//                                    height: 0
//                                }, alignTo);
//                            }
//                            //将标注放到点的下边，上下都能放开或者只有下边能放开
//                            else if (((currentPoint.plotY - chart.plotTop < chart.plotTop + chart.plotHeight - currentPoint.plotY) &&
//                                (currentPoint.plotY - chart.plotTop > (bBox.height + math.abs(currentPoint.options.dataLabels.y)))) ||
//                                (currentPoint.plotY - chart.plotTop < (bBox.height + math.abs(currentPoint.options.dataLabels.y)) &&
//                                    (chart.plotTop + chart.plotHeight - currentPoint.plotY > (bBox.height + math.abs(currentPoint.options.dataLabels.y))))) {
//                                currentPoint.options.dataLabels.verticalAlign = 'top';
//                                currentPoint.options.dataLabels.x = 0;
//                                currentPoint.alignTo = extend({
//                                    x: pick(currentPoint.plotX, -999),
//                                    y: pick(currentPoint.plotY, -999),
//                                    width: 0,
//                                    height: 0
//                                }, alignTo);
//                            }
//                            //上下都放不开
//                            else {
//                                currentPoint.options.dataLabels.y = 0;
//                                currentPoint.options.dataLabels.x = -currentPoint.options.dataLabels.x;
//                                currentPoint.options.dataLabels.align = 'right';
//                                currentPoint.options.dataLabels.verticalAlign = 'middle';
//                                currentPoint.alignTo = extend({
//                                    x: pick(currentPoint.plotX, -999),
//                                    y: pick(currentPoint.plotY, -999),
//                                    width: 0,
//                                    height: 0
//                                }, alignTo);
//                            }
//                        }
//                    }
//
//                    //中间的点
//                    else if (currentPoint.prePiont && currentPoint.nextPiont) {
//                        //将标注放到点的上边，上下都能放开或者只有上边能放开
//                        if (((currentPoint.plotY - currentPoint.prePiont.plotY > currentPoint.nextPiont.plotY - currentPoint.plotY) &&
//                            (currentPoint.nextPiont.plotY - currentPoint.plotY > (bBox.height + math.abs(currentPoint.options.dataLabels.y)))) ||
//                            (currentPoint.plotY - currentPoint.prePiont.plotY > (bBox.height + math.abs(currentPoint.options.dataLabels.y)) &&
//                                (currentPoint.nextPiont.plotY - currentPoint.plotY < (bBox.height + math.abs(currentPoint.options.dataLabels.y))))) {
//                            currentPoint.options.dataLabels.y = -currentPoint.options.dataLabels.y;
//                            currentPoint.options.dataLabels.verticalAlign = 'bottom';
//                            currentPoint.options.dataLabels.x = 0;
//                            currentPoint.alignTo = extend({
//                                x: pick(currentPoint.plotX, -999),
//                                y: pick(currentPoint.plotY, -999),
//                                width: 0,
//                                height: 0
//                            }, alignTo);
//                        }
//                        //将标注放到点的下边，上下都能放开或者只有下边能放开
//                        else if (((currentPoint.plotY - currentPoint.prePiont.plotY < currentPoint.nextPiont.plotY - currentPoint.plotY) &&
//                            (currentPoint.plotY - currentPoint.prePiont.plotY > (bBox.height + math.abs(currentPoint.options.dataLabels.y)))) ||
//                            (currentPoint.plotY - currentPoint.prePiont.plotY < (bBox.height + math.abs(currentPoint.options.dataLabels.y)) &&
//                                (currentPoint.nextPiont.plotY - currentPoint.plotY > (bBox.height + math.abs(currentPoint.options.dataLabels.y))))) {
//                            currentPoint.options.dataLabels.verticalAlign = 'top';
//                            currentPoint.options.dataLabels.x = 0;
//                            currentPoint.alignTo = extend({
//                                x: pick(currentPoint.plotX, -999),
//                                y: pick(currentPoint.plotY, -999),
//                                width: 0,
//                                height: 0
//                            }, alignTo);
//                        }
//                        //上下都放不开
//                        else {
//                            currentPoint.options.dataLabels.x = -currentPoint.options.dataLabels.x;
//                            currentPoint.options.dataLabels.y = 0;
//                            currentPoint.options.dataLabels.align = 'right';
//                            currentPoint.options.dataLabels.verticalAlign = 'middle';
//                            currentPoint.alignTo = extend({
//                                x: pick(currentPoint.plotX, -999),
//                                y: pick(currentPoint.plotY, -999),
//                                width: 0,
//                                height: 0
//                            }, alignTo);
//                        }
//                    }
//
//                    //最下边的点
//                    else {
//                        //将标注放到点的上边，上下都能放开或者只有上边能放开
//                        if (((currentPoint.plotY - currentPoint.prePiont.plotY > chart.plotTop + chart.plotHeight - currentPoint.plotY) &&
//                            (chart.plotTop + chart.plotHeight - currentPoint.plotY > (bBox.height + math.abs(currentPoint.options.dataLabels.y)))) ||
//                            (currentPoint.plotY - currentPoint.prePiont.plotY > (bBox.height + math.abs(currentPoint.options.dataLabels.y)) &&
//                                (chart.plotTop + chart.plotHeight - currentPoint.plotY < (bBox.height + math.abs(currentPoint.options.dataLabels.y))))) {
//                            currentPoint.options.dataLabels.y = -currentPoint.options.dataLabels.y;
//                            currentPoint.options.dataLabels.verticalAlign = 'bottom';
//                            currentPoint.options.dataLabels.x = 0;
//                            currentPoint.alignTo = extend({
//                                x: pick(currentPoint.plotX, -999),
//                                y: pick(currentPoint.plotY, -999),
//                                width: 0,
//                                height: 0
//                            }, alignTo);
//                        }
//                        //将标注放到点的下边，上下都能放开或者只有下边能放开
//                        else if (((currentPoint.plotY - currentPoint.prePiont.plotY < chart.plotTop + chart.plotHeight - currentPoint.plotY) &&
//                            (currentPoint.plotY - currentPoint.prePiont.plotY > (bBox.height + math.abs(currentPoint.options.dataLabels.y)))) ||
//                            (currentPoint.plotY - currentPoint.prePiont.plotY < (bBox.height + math.abs(currentPoint.options.dataLabels.y)) &&
//                                (chart.plotTop + chart.plotHeight - currentPoint.plotY > (bBox.height + math.abs(currentPoint.options.dataLabels.y))))) {
//                            currentPoint.options.dataLabels.verticalAlign = 'top';
//                            currentPoint.options.dataLabels.x = 0;
//                            currentPoint.alignTo = extend({
//                                x: pick(currentPoint.plotX, -999),
//                                y: pick(currentPoint.plotY, -999),
//                                width: 0,
//                                height: 0
//                            }, alignTo);
//                        }
//                        //上下都放不开
//                        else {
//                            currentPoint.options.dataLabels.x = -currentPoint.options.dataLabels.x;
//                            currentPoint.options.dataLabels.y = 0;
//                            currentPoint.options.dataLabels.align = 'right';
//                            currentPoint.options.dataLabels.verticalAlign = 'middle';
//                            currentPoint.alignTo = extend({
//                                x: pick(currentPoint.plotX, -999),
//                                y: pick(currentPoint.plotY, -999),
//                                width: 0,
//                                height: 0
//                            }, alignTo);
//                        }
//                    }
//                }

                for (i = 0; i < points.length; i++) {
                    var dataLabel = points[i].dataLabel,
                        bBox = dataLabel && dataLabel.getBBox();
                    // Add the text size for alignment calculation
                    locateLabel(points[i].dataLabel,
                        merge(points[i].options, {
                            width: bBox.width,
                            height: bBox.height
                        },points[i].options.dataLabels), points[i].alignTo, null);
                }
            }
        }

        function locateLabel(dataLabel, options, alignTo, alignAttr) {
            if (options.rotation) { // Fancy box alignment isn't supported for rotated text
                alignAttr = {
                    align: options.align,
                    x: alignTo.x + options.x + alignTo.width / 2,
                    y: alignTo.y + options.y + alignTo.height / 2
                };
                dataLabel['animate'](alignAttr);
            } else {

                dataLabel.align(options, null, alignTo);
//                alignAttr = dataLabel.alignAttr;
            }
        }
    };

    H.wrap(H.Series.prototype, 'afterAnimate', function (proceed) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        var chart = this.chart;
        if(chart.hasRenderedSeries == undefined){
            chart.hasRenderedSeries = 0;
        }
        chart.hasRenderedSeries++;
        if(chart.hasRenderedSeries == chart.series.length){
            chart.reAlignDataLabels();
        }

    });

}(Highcharts));
