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

(function (H) {
    var addEvent = H.addEvent,
        arrayMin = H.arrayMin,
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
        Chart = H.Chart,
        Legend = H.Legend,
        Axis = H.Axis,
        Tick = H.Tick,
        Point = H.Point,
        Pointer = H.Pointer,
        CenteredSeriesMixin = H.CenteredSeriesMixin,
        TrackerMixin = H.TrackerMixin,
        Series = H.Series,
        math = Math,
        mathRound = math.round,
        mathFloor = math.floor,
        mathMax = math.max,
        Color = H.Color,
        noop = function () {},

        DIV = 'div',
        ABSOLUTE = 'absolute',
        RELATIVE = 'relative',
        HIDDEN = 'hidden',
        PREFIX = 'hwcharts-',
        VISIBLE = 'visible',
        PX = 'px',
        NONE = 'none',
        M = 'M',
        L = 'L',

        clickEvents = {},

        doc = document,
        SVG_NS = 'http://www.w3.org/2000/svg',
        hasSVG = !!doc.createElementNS && !!doc.createElementNS(SVG_NS, 'svg').createSVGRect,
        TRACKER_FILL = 'rgba(192,192,192,' + (hasSVG ? 0.0001 : 0.002) + ')';

    Axis.prototype.defaultOptions = merge(Axis.prototype.defaultOptions,{
        backgroundColor:"#FFFFFF",
        backgroundOpacity: 1,
        borderColor:"#000000",
        borderWidth: 0,
        borderStyle: null,
        selectBorder: {
            borderColor: '#000000',
            borderWidth: 2,
            borderStyle: 'dash',
            minWidth: 5,
            minHeight: 5
        }
    });

    Legend.prototype.setItemEvents = function (item, legendItem, useHTML) {

    };

    //给图表元素添加弹出设置窗口事件
    Chart.prototype.selectElement = function(){
        var chart = this,
            optionsChart = chart.options.chart,
            renderer = chart.renderer,
            chartWidth = chart.chartWidth,
            chartHeight = chart.chartHeight,
            chartBorderWidth = optionsChart.borderWidth || 0,
            mgn;

        // Chart area
        mgn = chartBorderWidth + (optionsChart.shadow ? 8 : 0);
        chart.seleBorder = renderer.rect()
            .attr({
                visibility: HIDDEN,
                stroke:'#000' ,
                'stroke-width': 2,
                dashstyle: 'dash',
                zIndex: 999
            })
            .attr({
                x:0,
                y:0,
                width:100,
                height:100
            })
            .add()

		chart.addChartEventListener();
		chart.addTitleEventListener();
		chart.addLegendEventListener();
    };

    Chart.prototype.addSeriesEventListener = function(){
        var chart = this;
        for(var i = 0; i < chart.series.length; i++){
            addEvent(chart.series[i], "click", function(e){
                if(clickEvents["series"]){
                    clickEvents["series"].apply(chart, [this]);
                }
            })
        }
    }
    Chart.prototype.addTitleEventListener = function(){
        var chart = this;
        if(chart.title){
            addEvent(chart.title.element, 'click', function (e) {
                if(clickEvents["title"]){
                    clickEvents["title"].apply(chart, [chart.title]);
                }
            });
        }
    }
    Chart.prototype.addLegendEventListener = function(){
        var chart = this;
        if(chart.legend && chart.legend.group){
            addEvent(chart.legend.group.element, 'click', function (e) {
                if(clickEvents["legend"]){
                    clickEvents["legend"].apply(chart, [chart.legend]);
                }
            });
        }
    }
    Chart.prototype.addAxisEventListener = function(){
        var chart = this;
        each(chart.axes, function (axis) {
            var options = axis.options;
            if(!axis.axisGroup){
                return;
            }
            if(!axis.background){
                axis.background = chart.renderer.rect()
                    .attr({
                        visibility: HIDDEN,
                        fill:	Color(options.backgroundColor).setOpacity(0).get(),
                        stroke: options.borderColor,
                        'stroke-width': options.selectBorder.borderWidth,
                        dashstyle: options.selectBorder.borderStyle,
                        zIndex: 2
                    })
                    .attr(axis.getBackRect())
                    .add(axis.axisGroup)
            }
            addEvent(axis.axisGroup.element, 'click', function (e) {
                if(clickEvents["axis"]){
                    clickEvents["axis"].apply(chart, [axis]);
                }
            });
            if(axis.labelGroup){
                addEvent(axis.labelGroup.element, 'click', function (e) {
                    if(clickEvents["axis"]){
                        clickEvents["axis"].apply(chart, [axis]);
                    }
                });
            };
        });
    }
    Chart.prototype.addChartEventListener = function(){
        var chart = this;
        if(!chart.chartBackground){
            chart.chartBackground = renderer.rect(mgn / 2, mgn / 2, chartWidth - mgn, chartHeight - mgn, 0, 0)
                .attr({
                    fill: optionsChart.backgroundColor || TRACKER_FILL,
                })
                .addClass(PREFIX + 'background')
                .add()
                .shadow(optionsChart.shadow);
        }
        addEvent(chart.chartBackground.element, 'click', function (e) {
            if(clickEvents["chart"]){
                clickEvents["chart"].apply(chart, []);
            }
        });
        if(chart.plotBackground){
            addEvent(chart.plotBackground.element, 'click', function (e) {
                if(clickEvents["chart"]){
                    clickEvents["chart"].apply(chart, []);
                }
            });
        }
        
        chart.addAxisEventListener();
        chart.addSeriesEventListener();
    }
    Chart.prototype.addClickEvents = function(elementName, func){
        clickEvents[elementName] = func;
    };

    H.wrap(H.Axis.prototype, 'redraw', function (proceed) {
        proceed.apply(this, [].slice.call(arguments, 1));
        var axis = this;
        if (axis.selectBorder) {
            axis.selectBorder.animate(axis.getBackRect());
        }
        if (axis.background) {
            axis.background.animate(axis.getBackRect());
        }
    });
    Axis.prototype.getBackRect = function () {
        var axis = this,
            chart = axis.chart,
            options = axis.options,
            opposite = this.opposite,
            offset = this.offset,
            horiz = this.horiz,
            lineLeft = this.left + (opposite ? this.width : 0) + offset,
            lineTop = chart.chartHeight - this.bottom - (opposite ? this.height : 0) + offset,
            vBorderWidth = mathMax(this.axisTitleMargin + ((axis.axisTitle && (axis.axisTitle.getBBox()['width'])) || 0), options.selectBorder.minWidth),
            hBorderHeight = mathMax(this.axisTitleMargin + ((axis.axisTitle && (axis.axisTitle.getBBox()['height'])) || 0), options.selectBorder.minHeight);

        var obj = {
            x: horiz ? this.left : (lineLeft - (opposite ? 0 : vBorderWidth)),
            y: horiz ? (lineTop - (opposite ? hBorderHeight : 0)) : this.top,
            width: horiz ? this.width : vBorderWidth,
            height: horiz ? hBorderHeight : this.height,
        }
        if(isNaN(obj.x)||!obj.x||isNaN(obj.y)||!obj.y||isNaN(obj.width)||!obj.width||isNaN(obj.height)||!obj.height){
            obj = {
                visibility:'hidden'
            }
        }
        return obj
    };
    Chart.prototype.getBackRect = function(){
        return{
            x:0,
            y:0,
            width: this.chartWidth,
            height: this.chartHeight,
        }
    }
    Legend.prototype.getBackRect = function(){
        if(!this.box){
            return {
                visibility:'hidden'
            }
        }
        return{
            visibility:'hidden',
            x: this.box.parentGroup.translateX-30,
            y: this.box.parentGroup.translateY,
            width:this.legendWidth +50 ,
            height: this.legendHeight,
        }
    }
    Series.prototype.getBackRect = function(){
        return{
			visibility:'hidden',
            x: 0,
            y: 0,
            width:this.legendWidth ,
            height: this.legendHeight,
        }
    }
    /**
     *
     */
    H.Chart.prototype.callbacks.push(function (chart) {
        H.addEvent(chart, 'load', chart.selectElement);
    });
}(Highcharts));