Vmd.define('hwchart.chart.wellTrace.WellTraceSeries', {
    requires: [
        'hwchart.model.Series',
        'hwchart.data.List',
        'hwchart.util.format',
        'hwchart.CoordinateSystem'
      
    ]
},function(){
    var SeriesModel = hwchart.model.Series;
    var List = hwchart.data.List;
    var zrUtil = zrender.util;
    var formatUtil = hwchart.util.format;
    var CoordinateSystem = hwchart.CoordinateSystem;

    // Convert [ [{coord: []}, {coord: []}] ]
    // to [ { coords: [[]] } ]
    function preprocessOption(seriesOpt) {
        var data = seriesOpt.data;
        if (data && data[0] && data[0][0] && data[0][0].coord) {
            if (__DEV__) {
                console.warn('Lines data configuration has been changed to'
                    + ' { coords:[[1,2],[2,3]] }');
            }
            seriesOpt.data = zrUtil.map(data, function (itemOpt) {
                var coords = [
                    itemOpt[0].coord, itemOpt[1].coord
                ];
                var target = {
                    coords: coords
                };
                if (itemOpt[0].name) {
                    target.fromName = itemOpt[0].name;
                }
                if (itemOpt[1].name) {
                    target.toName = itemOpt[1].name;
                }
                return zrUtil.mergeAll([target, itemOpt[0], itemOpt[1]]);
            });
        }
    }

    var WellTraceSeries = SeriesModel.extend({

        type: 'series.wellTrace',

        dependencies: ['grid', 'polar'],

        visualColorAccessPath: 'lineStyle.color',

        init: function (option) {
            // Not using preprocessor because mergeOption may not have series.type
            preprocessOption(option);

            WellTraceSeries.superApply(this, 'init', arguments);
        },

        mergeOption: function (option) {
            preprocessOption(option);

            WellTraceSeries.superApply(this, 'mergeOption', arguments);
        },

        getInitialData: function (option, ecModel) {
            // option.data = [{
            //     id:'2132133',
            //     coords:[[18438909.43, 3460166.68],[18443959.05, 3461251.15],[18435656.36, 3460921.63],[18442854.27, 3459508.46]]
            // }]
            if (__DEV__) {
                var CoordSys = CoordinateSystem.get(option.coordinateSystem);
                if (!CoordSys) {
                    throw new Error('Unkown coordinate system ' + option.coordinateSystem);
                }
            }

            var lineData = new List(['x','y','a','b'], this);
            lineData.hasItemOption = false;
            lineData.initData(option.data, [], function (dataItem, dimName, dataIndex, dimIndex) {
                // dataItem is simply coords
                if (dataItem instanceof Array) {
                    return NaN;
                }
                else {
                    lineData.hasItemOption = true;
                    var value = dataItem.value;
                    if (value != null) {
                        return value instanceof Array ? value[dimIndex] : value;
                    }
                }
            });

            return lineData;
        },

        formatTooltip: function (dataIndex) {
            var data = this.getData();
            var itemModel = data.getItemModel(dataIndex);
            var name = itemModel.get('name');
            if (name) {
                return name;
            }
            var fromName = itemModel.get('fromName');
            var toName = itemModel.get('toName');
            var html = [];
            fromName != null && html.push(fromName);
            toName != null && html.push(toName);

            return formatUtil.encodeHTML(html.join(' > '));
        },

        defaultOption: {
            coordinateSystem: 'geo',
            zlevel: 0,
            z: 2,
            legendHoverLink: true,
            scale:1,
            hoverAnimation: true,
            // Cartesian coordinate system
            xAxisIndex: 0,
            yAxisIndex: 0,

            // Geo coordinate system
            geoIndex: 0,

            effect: {
                show: false,
                period: 4,
                // Animation delay. support callback
                // delay: 0,
                // If move with constant speed px/sec
                // period will be ignored if this property is > 0,
                constantSpeed: 0,
                symbol: 'circle',
                symbolSize: 3,
                loop: true,
                // Length of trail, 0 - 1
                trailLength: 0.2
                // Same with lineStyle.normal.color
                // color
            },

            large: false,
            // Available when large is true
            largeThreshold: 2000,

            requestCompleted: false, //后台请求是否完成

            // If lines are polyline
            // polyline not support curveness, label, animation
            polyline: false,

            label: {
                normal: {
                    show: false,
                    position: 'end'
                    // distance: 5,
                    // formatter: 标签文本格式器，同Tooltip.formatter，不支持异步回调
                }
            },

            lineStyle: {
                normal: {
                    opacity: 0.5
                }
            }
        }
    });

    hwchart.chart.wellTrace.WellTraceSeries = WellTraceSeries;
})