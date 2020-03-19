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
 * @license HWcharts JS v3.0.2 (2013-06-05)
 *
 * (c) 2009-2013 Torstein Hønsi
 *
 * License: www.hwcharts.com/license
 */

// JSLint options:
/*global HWcharts, HWchartsAdapter, document, window, navigator, setInterval, clearInterval, clearTimeout, setTimeout, location, jQuery, $, console */
(function (HC) {
    var pick = HC.pick,
        addEvent = HC.addEvent,
        removeEvent = HC.removeEvent,
        createElement = HC.createElement,
        discardElement = HC.discardElement,
        Color = HC.Color,
        css = HC.css,
        merge = HC.merge,
        each = HC.each,
        math = Math,
        mathMax = math.max,
        mathFloor = math.floor,
        doc = document,
        win = window,

        userAgent = navigator.userAgent,
        platform = navigator.platform,
        isOpera = win.opera,
        isIE = /msie/i.test(userAgent) && !isOpera,

        HIDDEN = 'hidden',
        NONE = 'none';

    var defaultOptions = {

        isDesign: false,  //定制时起作用，分定制模式和普通模式“design/normal”,定制模式时绘制每个图表的右上角显示行号和列号
        renderTo: null,
        rows: 2,
        cols: 3,

        hSpacing: 0,
        vSpacing: 0,
        width: null,
        height: null,
        charts: [],

        backgroundColor:"#FFFFFF",
        backgroundOpacity: 1,

        chartsItems: {
            minWidth: 200,
            minHeight: 200,
            isAxisYVAlign:true,
            isAxisYTitleVAlign:true,
            width: null,
            height: null
        }
    };

    function isObject(obj) {
        return typeof obj === 'object';
    }

    function MCharts() {
        this.init.apply(this, arguments);
    }

    MCharts.prototype = {

        /**
         * Initialize the chart
         */
        init: function (userOptions){
            var that = this;
            this.hasRenderedCharts = [];
            this.options = merge(defaultOptions, userOptions);  //合并属性
            this.charts = [];

            this.convertOptions();
            this.groupChartsOptions();
            this.preDealData();

            //缩放
            var isScale = false;
            if(this.options.chartsItems.isAxisYVAlign){
                var chartNums = that.chartNums = this.options.charts.length;
                for(var i = 0; i < chartNums; i++){
                    (function(){
                        var co = that.options.charts[i];
                        co.chart.events = co.chart.events || {};
                        var loadEvent = co.chart.events.load;
                        co.chart.events.load = function(){
                            if(loadEvent){
                                loadEvent.apply(this,[]);
                            }
                            that.hasRenderedCharts.push(this);
                            if(that.hasRenderedCharts.length == that.chartNums){
                                that.AfterAllChartRendered();
                            }
                        }

                        if((co.navigator && co.navigator.enabled) || (that.scrollbar && that.scrollbar.enabled)){
                            isScale = true;
                            return;
                        }
                    })()
                }
            }

            if(isScale && this.cols == 1){
                this.getStockOptions();
                this.createStockDiv();
                this.stockOptions.chart.renderTo = this.containerID + "-container";

                this.stockOptions = merge(this.options.globalOptions,  {
                    navigator: {
                        xAxis:{
                            labels: {
                                enabled: false
                            }
                        }
                    },
                    rangeSelector: {
                    enabled: true,
                    allButtonsEnabled:true,
                    inputEnabled:false,
                    selected: 0,
                    buttons: [{
                        type: 'month',
                        count: 1,
                        text: '1个月'
                    },  {
                        type: 'month',
                        count: 6,
                        text: '6个月'
                    }, {
                        type: 'year',
                        count: 1,
                        text: '1年'
                    }, {
                        type: 'all',
                        text: '全部'
                    }]
                }}, this.stockOptions);
                var c = new HC.Chart(this.stockOptions);
                this.charts.push(c);
            }
            else{
                this.creatDIV();
                this.render();
            }
        },

        AfterAllChartRendered:function(){
            var that = this;
            var chart;
            var colCharts = {};
            for (var i = 0; i < this.hasRenderedCharts.length; i++) {
                chart = this.hasRenderedCharts[i];
                var col = chart.options.chart.col;
                colCharts[col] = colCharts[col] || {};
                colCharts[col].chartMaxTop = colCharts[col].chartMaxTop == undefined ? chart.plotTop : Math.max(colCharts[col].chartMaxTop, chart.plotTop);
                colCharts[col].chartMaxLeft = colCharts[col].chartMaxLeft == undefined ? chart.plotLeft : Math.max(colCharts[col].chartMaxLeft, chart.plotLeft);
                colCharts[col].chartMaxWidth = colCharts[col].chartMaxWidth == undefined ? chart.plotWidth : Math.max(colCharts[col].chartMaxWidth, chart.plotWidth);
                colCharts[col].chartMaxHeight = colCharts[col].chartMaxHeight == undefined ? chart.plotHeight : Math.max(colCharts[col].chartMaxHeight, chart.plotHeight);
                colCharts[col].chartMaxMarginRight = colCharts[col].chartMaxMarginRight == undefined ? chart.marginRight : Math.max(colCharts[col].chartMaxMarginRight, chart.marginRight);
                colCharts[col].charts = colCharts[col].charts || [];
                colCharts[col].charts.push(chart);

                colCharts[col].leftYAxis = colCharts[col].leftYAxis || {};
                colCharts[col].rightYAxis = colCharts[col].rightYAxis || {};
                var leftYAxisIndex = 0;
                var rightYAxisIndex = 0;
                for(var j = 0; j < chart.yAxis.length; j++){
                    var axis = chart.yAxis[j];
                    if(axis.opposite){ //右轴
                        colCharts[col].rightYAxis[rightYAxisIndex] = colCharts[col].rightYAxis[rightYAxisIndex] || {};
                        colCharts[col].rightYAxis[rightYAxisIndex].MaxAxisTitleMargin = colCharts[col].rightYAxis[rightYAxisIndex].MaxAxisTitleMargin == undefined ? axis.axisTitleMargin : Math.max(colCharts[col].rightYAxis[rightYAxisIndex].MaxAxisTitleMargin, axis.axisTitleMargin);
                        colCharts[col].rightYAxis[rightYAxisIndex].axes = colCharts[col].rightYAxis[rightYAxisIndex].axes || [];
                        colCharts[col].rightYAxis[rightYAxisIndex].axes.push(axis);
                        rightYAxisIndex++;
                    }
                    else{ //左轴
                        colCharts[col].leftYAxis[leftYAxisIndex] = colCharts[col].leftYAxis[leftYAxisIndex] || {};
                        colCharts[col].leftYAxis[leftYAxisIndex].MaxAxisTitleMargin = colCharts[col].leftYAxis[leftYAxisIndex].MaxAxisTitleMargin == undefined ? axis.axisTitleMargin : Math.max(colCharts[col].leftYAxis[leftYAxisIndex].MaxAxisTitleMargin, axis.axisTitleMargin);
                        colCharts[col].leftYAxis[leftYAxisIndex].axes = colCharts[col].leftYAxis[leftYAxisIndex].axes || [];
                        colCharts[col].leftYAxis[leftYAxisIndex].axes.push(axis);
                        leftYAxisIndex++;
                    }
                }
            }

            function findAxisIndexInChartOptions(chart, axisId){
                var yAxisOptionsInChartOptions = chart.options.yAxis;
                for(var i = 0; i < yAxisOptionsInChartOptions.length; i++){
                    if(yAxisOptionsInChartOptions[i].id == axisId){
                        return i;
                    }
                }
                return null;
            }

            for(var col in colCharts){
                for (var i = 0; i < colCharts[col].charts.length; i++){
                    chart = colCharts[col].charts[i];
                    if(chart.plotLeft != colCharts[col].chartMaxLeft || (chart.chartWidth - chart.plotLeft - chart.plotWidth) != Math.ceil(colCharts[col].chartMaxMarginRight)){
                        chart.update({
                            chart:{
                                marginLeft:colCharts[col].chartMaxLeft,
                                marginRight:colCharts[col].chartMaxMarginRight
                            }
                        }, true)
                    }
                }
                // continue;
                //调整左轴标题
                for(var index in colCharts[col].leftYAxis){
                    for(var i = 0; i < colCharts[col].leftYAxis[index].axes.length; i++){
                        var axis = colCharts[col].leftYAxis[index].axes[i];
                        if(axis.options.title && axis.options.title.style && axis.options.title.style.writingMode){
                            var textHeightOvershoot = axis.axisTitle.getBBox(null, 0).height;
                            var fontMetrics = axis.chart.renderer.fontMetrics(
                                axis.options.title.style && axis.options.title.style.fontSize,
                                axis.axisTitle
                            );
                            var titleUpdateOptions;
                            if(this.options.chartsItems.isAxisYTitleVAlign){
                                titleUpdateOptions = {
                                    x: -colCharts[col].leftYAxis[index].MaxAxisTitleMargin + axis.axisTitleMargin + textHeightOvershoot - fontMetrics.h
                                }
                            }
                            else{
                                var matches = axis.options.title.text.match(/<br\/>/gi);
                                var repeatNum = (matches && matches.length + 1) || 1;
                                titleUpdateOptions = {
                                    x:  textHeightOvershoot - fontMetrics.h * repeatNum
                                }
                            }
                            axis.setTitle(titleUpdateOptions);
                            var axisIndexInChartOptions = findAxisIndexInChartOptions(axis.chart, axis.options.id);
                            if(axisIndexInChartOptions != null){
                                axis.chart.options.yAxis[axisIndexInChartOptions] = merge(axis.chart.options.yAxis[axisIndexInChartOptions], axis.options);
                            }
                        }
                        else{
                            if(axis.axisTitleMargin != colCharts[col].leftYAxis[index].MaxAxisTitleMargin){
                                var titleUpdateOptions;
                                if(this.options.chartsItems.isAxisYTitleVAlign){
                                    titleUpdateOptions = {
                                        offset:colCharts[col].leftYAxis[index].MaxAxisTitleMargin
                                    }
                                    axis.update({title:titleUpdateOptions},true);
                                    var axisIndexInChartOptions = findAxisIndexInChartOptions(axis.chart, axis.options.id);
                                    if(axisIndexInChartOptions != null){
                                        axis.chart.options.yAxis[axisIndexInChartOptions] = merge(axis.chart.options.yAxis[axisIndexInChartOptions], axis.options);
                                    }
                                }
                            }
                        }
                    }
                }

                for(var index in colCharts[col].rightYAxis){
                    for(var i = 0; i < colCharts[col].rightYAxis[index].axes.length; i++){
                        var axis = colCharts[col].rightYAxis[index].axes[i];
                        if(axis.options.title && axis.options.title.style && axis.options.title.style.writingMode){
                            var textHeightOvershoot = axis.axisTitle.getBBox(null, 0).height;
                            var fontMetrics = axis.chart.renderer.fontMetrics(
                                axis.options.title.style && axis.options.title.style.fontSize,
                                axis.axisTitle
                            )
                            var titleUpdateOptions;
                            if(this.options.chartsItems.isAxisYTitleVAlign){
                                titleUpdateOptions = {
                                    x: colCharts[col].rightYAxis[index].MaxAxisTitleMargin - axis.axisTitleMargin - textHeightOvershoot + fontMetrics.h
                                }
                            }
                            else{
                                var matches = axis.options.title.text.match(/<br\/>/gi);
                                var repeatNum = (matches && matches.length + 1) || 1;
                                titleUpdateOptions = {
                                    x:  - textHeightOvershoot + fontMetrics.h * repeatNum
                                }
                            }
                            axis.update({title:titleUpdateOptions},true)
                            var axisIndexInChartOptions = findAxisIndexInChartOptions(axis.chart, axis.options.id);
                            if(axisIndexInChartOptions != null){
                                axis.chart.options.yAxis[axisIndexInChartOptions] = merge(axis.chart.options.yAxis[axisIndexInChartOptions], axis.options);
                            }
                        }else{
                            if(axis.axisTitleMargin != colCharts[col].rightYAxis[index].MaxAxisTitleMargin){
                                var titleUpdateOptions;
                                if(this.options.chartsItems.isAxisYTitleVAlign){
                                    titleUpdateOptions = {
                                        offset:colCharts[col].rightYAxis[index].MaxAxisTitleMargin
                                    }
                                    axis.update({title:titleUpdateOptions},true)
                                    var axisIndexInChartOptions = findAxisIndexInChartOptions(axis.chart, axis.options.id);
                                    if(axisIndexInChartOptions != null){
                                        axis.chart.options.yAxis[axisIndexInChartOptions] = merge(axis.chart.options.yAxis[axisIndexInChartOptions], axis.options);
                                    }
                                }

                            }
                        }
                    }
                }
            }
        },
        render: function () {
            var mcharts = this;
            mcharts.charts = [];

            if(isIE){
                mcharts.container.css({
                    filter: "alpha(opacity="+(parseFloat(mcharts.options.backgroundOpacity) * 100)+")",
                    backgroundColor: mcharts.options.backgroundColor
//                    backgroundColor:Color(mcharts.options.backgroundColor).setOpacity(mcharts.options.backgroundOpacity).get()+""
                })
            }
            else{
                mcharts.container.css({
//                    filter: "alpha(opacity="+(parseFloat(mcharts.options.backgroundOpacity) * 100)+")",
//                backgroundColor: mcharts.options.backgroundColor
                    backgroundColor:Color(mcharts.options.backgroundColor).setOpacity(mcharts.options.backgroundOpacity).get()+""
                })
            }
            for (var i = 0; i < mcharts.rows; i++) {
                for (var j = 0; j < mcharts.cols; j++) {
                    var chartOptions = mcharts.chartsOptions[i][j];
                    if (chartOptions) {

                        chartOptions.exportOptions = deepCopy(chartOptions);

                        chartOptions.chart = chartOptions.chart || {};
                        chartOptions.exporting = merge(chartOptions.exporting, mcharts.options.exporting);
                        chartOptions.chart.renderTo = mcharts.containerID + "-container" + i + j;
                        chartOptions.chart.parentChart = mcharts;
                        chartOptions.allSeriesData = mcharts.options.allSeriesData;
                        var c;
                        if(chartOptions.chart.StockChart){
                            c = new Highcharts.StockChart(chartOptions)
                        }
                        else{
                            c = new HC.Chart(chartOptions);
                        }
                        mcharts.charts.push(c);
                        if(chartOptions.chart.selected){
                            $("#" + mcharts.containerID + "-container" + i + j).css("border","2px solid #0000FF");
                        }
                        else{
                            $("#" + mcharts.containerID + "-container" + i + j).css("border","0px solid #FFFFFF")
                        }
                    }
                }
            }
        },

        redraw: function () {
            var mcharts = this;
            mcharts.container.empty();
            mcharts.preDealData();
            mcharts.creatDIV();
            mcharts.render();
        },

        //处理从服务器端返回的json串，如渐变色等
        convertOptions: function(){

            var mcharts = this,
                options = mcharts.options;
            for(var k = 0; k < options.charts.length; k++){
                var chart = options.charts[k];

                if(this.options.isDesign){
                    options.charts[k] = merge({plotOptions:{
                        series: {
                            enableMouseTracking: false
                        }
                    }},chart);

                }

                var series = chart.series;
                for (var i = 0; i < series.length; i++) {
                    var serie = series[i];
                    if(serie.color){
                        serie.color = getGradientColor(serie.color);
                    }
                    if (serie.data) {
                        var n = serie.data.length;
                        for (var j = 0; j < n; j++) {
                            if(serie.data[j] && serie.data[j].color){
                                serie.data[j].color = getGradientColor(serie.data[j].color);
                            }
                        }
                    }
                }

                if(chart.chart && isObject(chart.chart.backgroundColor)){
                    chart.chart.backgroundColor = getGradientColor(chart.chart.backgroundColor);
                }

                if(chart.chart && isObject(chart.chart.plotBackgroundColor)){
                    chart.chart.plotBackgroundColor = getGradientColor(chart.chart.plotBackgroundColor);
                }

                if(chart.title && isObject(chart.title.backgroundColor)){
                    chart.title.backgroundColor = getGradientColor(chart.title.backgroundColor);
                }

                if(chart.legend && isObject(chart.legend.backgroundColor)){
                    chart.legend.backgroundColor = getGradientColor(chart.legend.backgroundColor);
                }
            }

            function getSize(obj) {
                var size = 0, key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) size++;
                }
                return size;
            };

            function getGradientColor(color){
                if(color.type == "pure"){
                    return color.stops[0][1];
                }
                else if(color.type == "linearGradient"){
                    return {linearGradient:[color.x1, color.y1, color.x2, color.y2], stops:color.stops}
                }
                else if(color.type == "radialGradient"){
                    return {radialGradient:{cx:color.x1,cy:color.y1,r:color.r},stops:color.stops}
                }
                else{
                    return color;
                }
            }
        },

        getStockOptions:function(){

            var mcharts = this,
                yAxisVSpacing = math.floor(mcharts.options.vSpacing * 100 / mcharts.chartHeight),
                yAxisHeight = math.floor((100 - (mcharts.rows - 1) * yAxisVSpacing) / mcharts.rows);
            for(var i = 0; i < mcharts.chartsOptions.length; i++){
                var chartOptions = mcharts.chartsOptions[i][0];

                for(var j = 0; j < chartOptions.series.length;j++){
                    var series = chartOptions.series[j];
//                    series.xAxis += "-" + i;
                    series.yAxis += "-" + i;
                    chartOptions.series[j] = merge(chartOptions.plotOptions && chartOptions.plotOptions.series, chartOptions.series[j]);
                }
//                for(var j = 0; j < chartOptions.xAxis.length; j++){
//                    chartOptions.xAxis[j].id += "-" + i;
//                }

                for(var j = 0; j < chartOptions.yAxis.length; j++){
                    chartOptions.yAxis[j].id += "-" + i;
                    chartOptions.yAxis[j].height = yAxisHeight + "%";
                    chartOptions.yAxis[j].top = yAxisHeight * i + i * yAxisVSpacing + "%";
                    chartOptions.yAxis[j].offset = 0;
                }

                if(i == 0){
                    mcharts.stockOptions = mcharts.chartsOptions[0][0];
                }
                else{
                    mcharts.stockOptions.series = mcharts.stockOptions.series.concat(chartOptions.series);
//                    mcharts.stockOptions.xAxis = mcharts.stockOptions.xAxis.concat(chartOptions.xAxis);
                    mcharts.stockOptions.yAxis = mcharts.stockOptions.yAxis.concat(chartOptions.yAxis);
                }
            }
        },

        /**
         * 根据每个图表所在的行与列，即row和col的值，将chart放到一个二维数组中
         */
        groupChartsOptions: function () {
            var mcharts = this,
                options = mcharts.options,
                rows = 0,  //多曲线图的行数
                cols = 0;  //多曲线图的列数

            mcharts.chartsOptions = [];

            //根据chart的row和col属性将chart分类到某行某列中
            for (var i = 0; i < options.charts.length; i++) {
                var oneOptions = options.charts[i];

                oneOptions.chart = oneOptions.chart || {};
                oneOptions.chart.row = oneOptions.chart.row != undefined ? oneOptions.chart.row : i;
                oneOptions.chart.col = oneOptions.chart.col != undefined ? oneOptions.chart.col : 0;
                var chartRow = oneOptions.chart.row;

                var flag = false; //标记图表是否已经归类
                var rowCharts;
                for (var j = 0; j < mcharts.chartsOptions.length; j++) {
                    rowCharts = mcharts.chartsOptions[j];
                    if ((rowCharts[0] && rowCharts[0].chart && rowCharts[0].chart.row == chartRow)
                        || (rowCharts[0] && !rowCharts[0].chart && chartRow == 0)) {
                        rowCharts.push(oneOptions);
                        flag = true;
                    }
                }
                if (!flag) {
                    rowCharts = [oneOptions];
                    mcharts.chartsOptions.push(rowCharts);
                }
            }

            //根据row大小排列charts中的行元素
            for( var i=0; i<mcharts.chartsOptions.length - 1; i++) {//循环比较
                for (var j = i + 1; j < mcharts.chartsOptions.length; j++) {
                    if (mcharts.chartsOptions[j][0].chart.row < mcharts.chartsOptions[i][0].chart.row) {//执行交换
                        var temp = mcharts.chartsOptions[i];
                        mcharts.chartsOptions[i] = mcharts.chartsOptions[j];
                        mcharts.chartsOptions[j] = temp;
                    }
                }
            }

            rows = mcharts.chartsOptions.length;

            //根据col的大小重新排列每行中的元素
            for (var n = 0; n < rows; n++) {
                var rowCharts = mcharts.chartsOptions[n];
                cols = mathMax(cols, rowCharts.length);

                for( var i=0; i<rowCharts.length - 1; i++) {//循环比较
                    for (var j = i + 1; j < rowCharts.length; j++) {
                        if (rowCharts[j].chart.col < rowCharts[i].chart.col) {//执行交换
                            var temp = rowCharts[i];
                            rowCharts[i] = rowCharts[j];
                            rowCharts[j] = temp;
                        }
                    }
                }
            }
            mcharts.rows = rows;
            mcharts.cols = cols;
        },

        //
        preDealData: function () {

            var mcharts = this,
                options = this.options;

            // mcharts.renderTo = options.renderTo;
            //
            // if (typeof mcharts.renderTo === 'string') {
            //     mcharts.renderTo = $(mcharts.renderTo);
            // }

            mcharts.container = mcharts.renderTo = $(options.renderTo);

            mcharts.containerWidth = mcharts.container.width();
            mcharts.containerHeight = mcharts.container.height();

            //确定最大行高和最大列宽
            var eachRowMaxHeight = {}; //每行的最大高度
            var eachColMaxWidth = {}; //每列的最大宽度
            for (var i = 0; i < mcharts.rows; i++) {
                for (var j = 0; j < mcharts.cols; j++) {
                    var tmpChart = mcharts.chartsOptions[i][j];
                    if (tmpChart) {
                        tmpChart.chart.row = i;
                        tmpChart.chart.col = j;
                        var tmpchartHeight = (tmpChart.chart && tmpChart.chart.height) || options.chartsItems.height || options.chartsItems.minHeight;
                        var tmpchartWidht = (tmpChart.chart && tmpChart.chart.width) || options.chartsItems.width || options.chartsItems.minWidth;
                        eachRowMaxHeight[i] = eachRowMaxHeight[i] == undefined ? tmpchartHeight : mathMax(eachRowMaxHeight[i], tmpchartHeight);
                        eachColMaxWidth[j] = eachColMaxWidth[j] == undefined ? tmpchartWidht : mathMax(eachColMaxWidth[j], tmpchartWidht);
                    }
                }
            }

            //设置每个图表的大小
            var definedHeightCharts = {}; //存储每列定义高度的图表
            var undefinedHeightCharts = {}; //存储每列未定义高度的图表
            for (var i = 0; i < mcharts.rows; i++) {
                var definedWidthCharts = []; //定义宽度的图表
                var undefinedWidthCharts = []; //未定义宽度的图表
                for (var j = 0; j < mcharts.cols; j++) {
                    var tmpChart = mcharts.chartsOptions[i][j];
                    if(tmpChart){
                        if(tmpChart.chart && tmpChart.chart.width){
                            definedWidthCharts.push(tmpChart);
                        }
                        else{
                            undefinedWidthCharts.push(tmpChart);
                        }
                        definedHeightCharts[j] = definedHeightCharts[j] || [];
                        undefinedHeightCharts[j] = undefinedHeightCharts[j] || [];
                        if(tmpChart.chart && tmpChart.chart.height){
                            definedHeightCharts[j].push(tmpChart);
                        }
                        else{
                            undefinedHeightCharts[j].push(tmpChart);
                        }
                    }
                }
                //对已定义宽度的图表进行宽度求和
                var totalWidth = 0;
                for(var n = 0; n < definedWidthCharts.length; n++){
                    var tmpChart = definedWidthCharts[n];
                    var maxWidth = Math.max(tmpChart.chart.width, eachColMaxWidth[tmpChart.chart.col]);
                    totalWidth += maxWidth + (n == 0 ? 0 : options.hSpacing);
                }
                totalWidth = (definedWidthCharts.length == 0 || definedWidthCharts.length == mcharts.chartsOptions[i].length) ? 0 : options.hSpacing;
                var remainWidth = (options.width || mcharts.containerWidth) - totalWidth;//剩余的宽度
                var remainChartMinWidth = options.chartsItems.width || options.chartsItems.minWidth; //剩余没有设置宽度的图表的最小宽度
                if(undefinedWidthCharts.length > 0){
                    var computeCols = mcharts.cols - definedWidthCharts.length;
                    var computeRemainChartWidth = (remainWidth - (computeCols - 1) * options.hSpacing) / computeCols;
                    for(var n = 0; n < undefinedWidthCharts.length; n++){
                        var tmpChart = undefinedWidthCharts[n];
                        tmpChart.chart.width = Math.max(computeRemainChartWidth, remainChartMinWidth);
                    }
                }
            }

            for(var i = 0; i < mcharts.cols; i++){
                var totalHeight = 0;
                var totalNum = definedHeightCharts[i].length + undefinedHeightCharts[i].length;
                for(var n = 0; n < definedHeightCharts[i].length; n++){
                    var tmpChart = definedHeightCharts[i][n];
                    var maxHeight = Math.max(tmpChart.chart.height, eachRowMaxHeight[tmpChart.chart.row]);
                    totalHeight += maxHeight + (n == 0 ? 0 : options.vSpacing);
                }

                totalHeight = (definedHeightCharts[i].length == 0 || definedHeightCharts[i].length == totalNum) ? 0 : options.vSpacing;
                var remainHeight = (options.height || mcharts.containerHeight) - totalHeight;//剩余的高度
                var remainChartMinHeight = options.chartsItems.height || options.chartsItems.minHeight; //剩余没有设置宽度的图表的最小宽度
                if(undefinedHeightCharts[i].length > 0){
                    var computeRows = mcharts.rows - definedHeightCharts[i].length;
                    var computeRemainChartHeight = (remainHeight - (computeRows - 1) * options.vSpacing) / computeRows;
                    for(var n = 0; n < undefinedHeightCharts[i].length; n++){
                        var tmpChart = undefinedHeightCharts[i][n];
                        tmpChart.chart.height = Math.max(computeRemainChartHeight, remainChartMinHeight);
                    }
                }
            }

            for (var i = 0; i < mcharts.rows; i++) {
                for (var j = 0; j < mcharts.cols; j++) {
                    var tmpChart = mcharts.chartsOptions[i][j];
                    if (tmpChart) {
                        eachRowMaxHeight[i] = eachRowMaxHeight[i] == undefined ? tmpChart.chart.height : mathMax(eachRowMaxHeight[i], tmpChart.chart.height);
                        eachColMaxWidth[j] = eachColMaxWidth[j] == undefined ? tmpChart.chart.width : mathMax(eachColMaxWidth[j], tmpChart.chart.width);
                    }
                }
            }

            //计算总的图表高度和宽度
            var totalChartHeight = 0;
            var totalChartWidth = 0;
            for(var i in eachRowMaxHeight){
                totalChartHeight += eachRowMaxHeight[i] + (i == 0 ? 0 : options.vSpacing);
            }
            for(var i in eachColMaxWidth){
                totalChartWidth += eachColMaxWidth[i] + (i == 0 ? 0 : options.hSpacing);
            }

            mcharts.chartWidth = parseInt(totalChartWidth); // #1393, 1460
            mcharts.chartHeight = parseInt(totalChartHeight);

            mcharts.containerID = mcharts.container[0].id;

            function accumulateWidth(index){
                var totalW = 0;
                for(var i = 0; i < index; i++){
                    totalW += eachColMaxWidth[i];
                }
                return totalW;
            }
            function accumulateHeight(index){
                var totalH = 0;
                for(var i = 0; i < index; i++){
                    totalH += eachRowMaxHeight[i];
                }
                return totalH;
            }

            //计算位置
            for (var i = 0; i < mcharts.rows; i++) {
                for (var j = 0; j < mcharts.cols; j++) {
                    var tmpChart = mcharts.chartsOptions[i][j];
                    if(tmpChart){
                        tmpChart.chart.x = accumulateWidth(j) + options.hSpacing * j;
                        tmpChart.chart.y = accumulateHeight(i) + options.vSpacing * i;
                    }
                }
            }

            //添加滚动条
           mcharts.container.css({
               overflowX: mcharts.chartWidth > mcharts.containerWidth ? "auto" : "hidden",
               overflowY: mcharts.chartHeight > mcharts.containerHeight ? "auto" : "hidden"
           });

        },

        creatDIV: function(){

            var mcharts = this,
                options = mcharts.options,
                width,
                height,
                hSpacing = options.hSpacing,
                vSpacing = options.vSpacing,
                diff = 1,
                chartOptions;

            mcharts.container.empty();
            if(((mcharts.chartWidth - diff) > mcharts.containerWidth) && ((mcharts.chartHeight - diff) > mcharts.containerHeight)){
                mcharts.container.css({
                    position: "relative",
                    overflowX: "scroll",
                    overflowY: "scroll"
                })
            }
            else if((mcharts.chartWidth - diff) > mcharts.containerWidth){
                mcharts.container.css({
                    position: "relative",
                    overflowX: "scroll",
                    overflowY: "hidden"
                })
                mcharts.chartHeight -= 20;
            }
            else if((mcharts.chartHeight - diff) > mcharts.containerHeight){
                mcharts.container.css({
                    position: "relative",
                    overflowX: "hidden",
                    overflowY: "scroll"
                })
                mcharts.chartWidth -= 20;
                for(var i = 0; i < mcharts.chartsOptions.length; i++){
                    if(mcharts.cols==1 && mcharts.chartsOptions[i][0].chart.width){
                        mcharts.chartsOptions[i][0].chart.width -= 20;
                    }
                }
            }
            else{
                mcharts.container.css({
                    position: "relative",
                    overflowX: "hidden",
                    overflowY: "hidden"
                })
            }

            //创建行
            for (var i = 0; i < mcharts.rows; i++) {
                //创建列
                for (var j = 0; j < mcharts.cols; j++) {
                    chartOptions = mcharts.chartsOptions[i][j];
                    if(!chartOptions){
                        continue;
                    }

                    $("<div></div>")
                        .attr({
                            id: mcharts.containerID + "-container" + i + j
                        })
                        .css({
                            position: "absolute",
                            top: chartOptions.chart.y,
                            left: chartOptions.chart.x,
                            "width": chartOptions.chart.width + "px",
                            "height": chartOptions.chart.height + "px"
                        })
                        .appendTo(mcharts.container);

                    if(this.options.isDesign){
                        $("<div></div>")
                            .attr({
                                id: mcharts.containerID + "-container-flag" + i + j
                            })
                            .css({
                                position: "absolute",
                                color: "#FF0000",
                                top: chartOptions.chart.y,
                                left: chartOptions.chart.x
                            })
                            .html((i+1) + ", " + (j+1))
                            .appendTo(mcharts.container);
                    }
                }
            }
        },

        createStockDiv: function(){
            var mcharts = this,
                options = mcharts.options,
                width,
                height,
                hSpacing = options.hSpacing,
                vSpacing = options.vSpacing,
                chartOptions;
            mcharts.container.empty();
            if((mcharts.chartWidth > mcharts.containerWidth) && (mcharts.chartHeight > mcharts.containerHeight)){
                mcharts.container.css({
                    position: "relative",
                    overflowX: "scroll",
                    overflowY: "scroll"
                })
            }
            else if(mcharts.chartWidth > mcharts.containerWidth){
                mcharts.container.css({
                    position: "relative",
                    overflowX: "scroll",
                    overflowY: "hidden"
                })
                mcharts.chartHeight -= 20;
            }
            else if(mcharts.chartHeight > mcharts.containerHeight){
                mcharts.container.css({
                    position: "relative",
                    overflowX: "hidden",
                    overflowY: "scroll"
                })
                mcharts.chartWidth -= 20;
            }
            else{
                mcharts.container.css({
                    position: "relative",
                    overflowX: "hidden",
                    overflowY: "hidden"
                })
            }

            $("<div></div>")
                .attr({
                    id: mcharts.containerID + "-container"
                })
                .css({
                    position: "absolute",
                    "width":  mcharts.chartWidth + "px",
                    "height": mcharts.chartHeight + "px"
                })
                .appendTo(mcharts.container);
        },
        
        setSize: function (w, h) {
            var mcharts = this;
            mcharts.container.css({
                width: w+"px",
                height:h+"px"
            })
            for (var i = 0; i < mcharts.rows; i++) {
                for (var j = 0; j < mcharts.cols; j++) {
                    var tmpChart = mcharts.chartsOptions[i][j];
                    if(tmpChart){
                        tmpChart.chart.width = null;
                        tmpChart.chart.height = null;
                    }
                }
            }
            mcharts.preDealData();

            for (var i = 0; i < mcharts.rows; i++) {
                //创建列
                for (var j = 0; j < mcharts.cols; j++) {
                    chartOptions = mcharts.chartsOptions[i][j];
                    if (!chartOptions) {
                        continue;
                    }
                    $("#" + mcharts.containerID + "-container" + i + j).css({
                        top: chartOptions.chart.y,
                        left: chartOptions.chart.x,
                        "width": chartOptions.chart.width + "px",
                        "height": chartOptions.chart.height + "px"
                    })
                    var c = $("#" + mcharts.containerID + "-container" + i + j).highcharts();
                    c.setSize(chartOptions.chart.width, chartOptions.chart.height);
                }
            }
        }
    }

    window.MCharts = MCharts;
} (Highcharts))