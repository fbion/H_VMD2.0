// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS

/**
 * @license Highcharts JS v4.2.5 (2016-05-06)
 *
 * (c) 2009-2016 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */

(function (factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory;
    } else {
        factory(Highcharts);
    }
}(function (Highcharts) {
var arrayMin = Highcharts.arrayMin,
        arrayMax = Highcharts.arrayMax,
        each = Highcharts.each,
        extend = Highcharts.extend,
        isNumber = Highcharts.isNumber,
        merge = Highcharts.merge,
        map = Highcharts.map,
        pick = Highcharts.pick,
        pInt = Highcharts.pInt,
        correctFloat = Highcharts.correctFloat,
        defaultPlotOptions = Highcharts.getOptions().plotOptions,
        seriesTypes = Highcharts.seriesTypes,
        extendClass = Highcharts.extendClass,
        splat = Highcharts.splat,
        wrap = Highcharts.wrap,
        Chart = Highcharts.Chart,
        Axis = Highcharts.Axis,
        Tick = Highcharts.Tick,
        Point = Highcharts.Point,
        Pointer = Highcharts.Pointer,
        CenteredSeriesMixin = Highcharts.CenteredSeriesMixin,
        TrackerMixin = Highcharts.TrackerMixin,
        Series = Highcharts.Series,
        math = Math,
        mathRound = math.round,
        mathFloor = math.floor,
        mathMax = math.max,
        Color = Highcharts.Color,
        noop = function () {},
        UNDEFINED;

    var axisProto = Axis.prototype,
        tickProto = Tick.prototype;

    var labelStyle = {
        fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif', // default font
        fontSize: '12px',
        color: '#000000',
        cursor: 'default',
        fontWeight:"normal"
    }
    /**
     * Augmented methods for the value axis
     */
    var stiffAxisMixin = {

        /**
         * The default options extend defaultYAxisOptions
         */

        // Circular axis around the perimeter of a polar chart
        defaultStiffXOptions: {
            gridLineWidth: 0, // spokes
            labels: {
                enabled:false,
                align: null, // auto
                distance: null,
                x: 0,
                y: null // auto
            },
            min:-1,
            max:1,
            tickInterval:1,
            maxPadding: 0,
            minPadding: 0,
            showLastLabel: true,
            startOnTick:true,
            endOnTick:true,
            tickmarkPlacement:"on",
            lineWidth:1,
            lineColor:"#000000",
            tickWidth:0,
            tickColor:"#000000",
            tickLength: 6,
            title: {
                x: 4,
                text: null,
                rotation: 90
            }
        },

        // Radial axis, like a spoke in a polar chart
        defaultStiffYOptions: {
            gridLineWidth: 0, // spokes
            labels: {
                // align: 'center',
                // x: 0,
                y: null,
                formatter:function() {
                    return Math.abs(this.value);
                }
            },
            lineWidth:1,
            lineColor:"#000000",
            tickWidth:1,
            tickColor:"#000000",
            tickLength: 6,
            title: {
                text:"ddd",
                x: 4,
                text: null,
                rotation: 90
            }
        },

        /**
         * Merge and set options
         */
        setOptions: function (userOptions) {

            var options = this.options = merge(
                this.defaultOptions,
                this.defaultStiffOptions,
                userOptions
            );

            // Make sure the plotBands array is instanciated for each Axis (#2649)
            if (!options.plotBands) {
                options.plotBands = [];
            }
        }
    };

    /**
     * Override axisProto.init to mix in special axis instance functions and function overrides
     */
    wrap(axisProto, 'init', function (proceed, chart, userOptions) {
        var axis = this,
            isX = userOptions.isX,
            chartOptions = chart.options,
            type = chartOptions.chart.type;

        // Before prototype.init

        if (type == "stiff") {
            extend(this,  stiffAxisMixin);
            this.defaultStiffOptions = isX ? this.defaultStiffXOptions : this.defaultStiffYOptions;
        }

        // Run prototype.init
        proceed.call(this, chart, userOptions);

    });
    
    wrap(Chart.prototype,"renderLabels", function(proceed){
        var chart = this,
            renderer = chart.renderer,
            yAxis = chart.yAxis[0],
            stiffNames = chart.options.stiffNames || [
                    {
                        text:"K<sup>+</sup>Na<sup>+</sup>",
                        // align:"high",
                        x:5,
                        y:5
                    },
                    {
                        text:"Ca<sup>2+</sup>",
                        align:"high",
                        x:5,
                        y:0
                    },
                    {
                        text:"Mg<sup>2+</sup>",
                        align:"high",
                        x:5,
                        y:-5
                    },
                    {
                        text:"Cl<sup>-</sup>",
                        align:"high",
                        x:-5,
                        y:5
                    },
                    {
                        text:"SO<sub>4</sub><sup>2-</sup>",
                        align:"high",
                        x:-5,
                        y:0
                    },
                    {
                        text:"HCO<sub>3</sub><sup>2-</sup>",
                        align:"high",
                        x:-5,
                        y:-5
                    }
                ];

        each(stiffNames, function (stiffName, i) {
            var style = merge(labelStyle, stiffName.style),
                align = stiffName.align || "high",
                x = 0,
                y = 0;

            var labelEle = chart.renderer.text(
                stiffName.text,
                x,
                y,
                true
            )
                .attr({ zIndex: 2 })
                .css(style)
                .add();

            var factor = {
                "low" : 1,
                "middle" : 0.5,
                "high" : 0
            };

            //左边的轴
            if(i == 0 || i == 1 || i == 2){
                x = chart.plotLeft + (yAxis.translate(0) - labelEle.getBBox().width) * factor[align || "high"];
            }
            //右边的轴
            else if(i == 3 || i == 4 || i == 5){
                x = chart.plotLeft + chart.plotWidth - (chart.plotWidth - yAxis.translate(0)) * factor[align || "high"] - labelEle.getBBox().width * (1 - factor[align || "high"]);
            }

            y = chart.plotTop + chart.plotHeight * (i % 3) * 0.5 + renderer.fontMetrics(style.fontSize, labelEle).b * (0.5 - (i % 3) * 0.5);

            labelEle.attr({
                x:x + (stiffName.x || 0),
                y:y + (stiffName.y || 0)
            });
        });

        proceed.apply(this, arguments);
    });

    /**
     * Extend the default options with map options
     */
    defaultPlotOptions.stiff = merge(defaultPlotOptions.line, {
        lineWidth: 1,
        marker:  {
            enabled: true,
            fillColor: "#FFFFFF",
            lineColor: null,
            lineWidth: 1,
            radius: 5,
            states: {
                hover: {
                    enabled: true,
                    fillColor:"#FFFFFF",
                    lineColor: null,
                    lineWidth: 0,
                    lineWidthPlus: 1,
                    radiusPlus: 1
                }
            },
            symbol:"circle"
        },
        threshold: null,
        dataLabels: {
            enabled:false,
            align: null,
            verticalAlign: null
        },
        states: {
            hover: {
                halo: false
            }
        }
    });

    /**
     * Add the series type
     */
    seriesTypes.stiff = extendClass(seriesTypes.line, {
        type: 'stiff',
        stiff: true,
        inverted: true,

        /**
         * Translate a point's plotHigh from the internal angle and radius measures to
         * true plotHigh coordinates. This is an addition of the toXY method found in
         * Polar.js, because it runs too early for arearanges to be considered (#3419).
         */

        setData:function(){
            var data = arguments[0] = arguments[0] || [];
            data[0][0] = -1;
            data[1][0] = 0;
            data[2][0] = 1;

            data[0][1] = -data[0][1];
            data[1][1] = -data[1][1];
            data[2][1] = -data[2][1];

            data[3][0] = -1;
            data[4][0] = 0;
            data[5][0] = 1;
            Series.prototype.setData.apply(this, arguments);
        },

        /**
         * Extend the line series' getSegmentPath method by applying the segment
         * path to both lower and higher values of the range
         */
        getGraphPath: function () {

            var points = this.points,
                getGraphPath = Series.prototype.getGraphPath,
                linePath;

            // Get the paths
            linePath = getGraphPath.call(this, points);
            linePath[9] = "M";

            //计算夹角
            this.leftRadian = Math.atan((points[0].plotY - points[1].plotY) / (points[0].plotX - points[1].plotX));
            this.rightRadian = Math.atan((points[4].plotY - points[3].plotY) / (points[3].plotX - points[4].plotX));

            //过滤负值
            this.leftRadian = this.leftRadian < 0 ? 0 : this.leftRadian;
            this.rightRadian = this.rightRadian < 0 ? 0 : this.rightRadian;

            this.averageRadian = (this.leftRadian + this.rightRadian) / 2;
            this.averageAngle = this.averageRadian * 180 / Math.PI;

            return linePath;
        },
        setStackedPoints: noop
    });
}));
