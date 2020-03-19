Vmd.define('hwchart.chart.faultLine.FaultLineSeries', {
    requires: [
        'hwchart.model.Series',
        'hwchart.data.List',
        'hwchart.util.format',
        'hwchart.CoordinateSystem',
        'hwchart.chart.helper.createListFromArray'
    ]
},function(){
    var createListFromArray = hwchart.chart.helper.createListFromArray;

    var SeriesModel = hwchart.model.Series;

    var List = hwchart.data.List;

    var _util = zrender.util;

    var concatArray = _util.concatArray;

    var map = _util.map;

    var each = _util.each;

    var _format = hwchart.util.format;

    var encodeHTML = _format.encodeHTML;

    var CoordinateSystem = hwchart.CoordinateSystem;

    /* global Uint32Array, Float64Array, Float32Array */
    var Uint32Arr = typeof Uint32Array === 'undefined' ? Array : Uint32Array;
    var Float64Arr = typeof Float64Array === 'undefined' ? Array : Float64Array;

    //p1p2与p3p4是否相交，p3、p4在p1p2两边，同时p1、p2在p3p4两边
    function isCross(p1, p2, p3, p4){
        return ((p1[0] - p3[0]) * (p4[1] - p3[1]) - (p1[1] - p3[1]) * (p4[0] - p3[0])) *
            ((p2[0] - p3[0]) * (p4[1] - p3[1]) - (p2[1] - p3[1]) * (p4[0] - p3[0])) <= 0 &&
            ((p3[0] - p1[0]) * (p2[1] - p1[1]) - (p3[1] - p1[1]) * (p2[0] - p1[0])) *
            ((p4[0] - p1[0]) * (p2[1] - p1[1]) - (p4[1] - p1[1]) * (p2[0] - p1[0])) <= 0

    }

    // Convert [ [{coord: []}, {coord: []}] ]
    // to [ { coords: [[]] } ]
    function preprocessOption(seriesOpt) {
        var data = seriesOpt.data;
        if (data && data[0] && data[0].coords) {

            // seriesOpt.data = seriesOpt.data.filter(function(v){return v.id == '0_2_1' || v.id == '0_2_0'})
            // var data = seriesOpt.data;

            var groupData = {};
            each(data, function (itemOpt) {
                if(itemOpt.faultType == '1') { //逆断层不处理
                    return;
                }
                //断层id和断盘id相等的分成一组
                var id = itemOpt.faultId + '_' + itemOpt.wallId;
                groupData[id] = groupData[id] || {}; //wallType 0上升盘/1下降盘
                groupData[id][itemOpt.wallType] = itemOpt;
            });

            //遍历所有成对的断层线，调整下降盘的方向与上升盘方向异向
            each(groupData, function (itemOpt) {
                //要同时存在上升盘和下降盘才处理
                if (!itemOpt[0] || !itemOpt[1] || itemOpt[0].coords.length < 2 || itemOpt[1].coords.length < 2) {
                    return;
                }
                //调整下降盘的顺序
                //两条直线首尾相接，如果有交点，说明两条直线同向，反转下降盘顺序
                //第一个点可能是同一个点，所以取第二个点
                //取中间挨着的两个点
                var middleIndex_0 = Math.floor(itemOpt[0].coords.length / 2);
                var middleIndex_1 = Math.floor(itemOpt[1].coords.length / 2);
                var p1 = itemOpt[0].coords[middleIndex_0]; //上升盘的第一个点
                var p2 = itemOpt[0].coords[middleIndex_0 + 1]; //上升盘的第二个点
                var p3 = itemOpt[1].coords[middleIndex_1]; //下升盘的第一个点
                var p4 = itemOpt[1].coords[middleIndex_1 + 1]; //下升盘的第二个点

                if (isCross(p1, p4, p2, p3)) {
                        itemOpt[1].coords = itemOpt[1].coords.reverse();
                }
                //取上升盘的最后两个点和下降盘的第一个点，如果这三个点的顺序是逆时针，则反转下降盘方向
                if ((p2[0] - p1[0]) * (p3[1] - p2[1]) - (p2[1] - p1[1]) * (p3[0] - p2[0]) < 0) {
                    itemOpt[1].coords = itemOpt[1].coords.reverse();
                    itemOpt[0].coords = itemOpt[0].coords.reverse();
                }
            });
        }
    }

    var FaultLineSeries = SeriesModel.extend({

        type: 'series.faultLine',

        dependencies: ['grid', 'polar'],

        visualColorAccessPath: 'lineStyle.color',

        init: function (option) {
            // The input data may be null/undefined.
            option.data = option.data || []; // Not using preprocessor because mergeOption may not have series.type

            preprocessOption(option);

            var result = this._processFlatCoordsArray(option.data);

            this._flatCoords = result.flatCoords;
            this._flatCoordsOffset = result.flatCoordsOffset;

            if (result.flatCoords) {
                option.data = new Float32Array(result.count);
            }

            FaultLineSeries.superApply(this, 'init', arguments);
        },

        mergeOption: function (option) {
            preprocessOption(option);

            if (option.data) {
                // Only update when have option data to merge.
                var result = this._processFlatCoordsArray(option.data);

                this._flatCoords = result.flatCoords;
                this._flatCoordsOffset = result.flatCoordsOffset;

                if (result.flatCoords) {
                    option.data = new Float32Array(result.count);
                }
            }

            FaultLineSeries.superApply(this, 'mergeOption', arguments);
        },

        appendData: function (params) {
            var result = this._processFlatCoordsArray(params.data);

            if (result.flatCoords) {
                if (!this._flatCoords) {
                    this._flatCoords = result.flatCoords;
                    this._flatCoordsOffset = result.flatCoordsOffset;
                } else {
                    this._flatCoords = concatArray(this._flatCoords, result.flatCoords);
                    this._flatCoordsOffset = concatArray(this._flatCoordsOffset, result.flatCoordsOffset);
                }

                params.data = new Float32Array(result.count);
            }

            this.getRawData().appendData(params.data);
        },
        _getCoordsFromItemModel: function (idx) {
            var itemModel = this.getData().getItemModel(idx);
            var coords = itemModel.option instanceof Array ? itemModel.option : itemModel.getShallow('coords');
            return coords;
        },
        getLineCoordsCount: function (idx) {
            if (this._flatCoordsOffset) {
                return this._flatCoordsOffset[idx * 2 + 1];
            } else {
                return this._getCoordsFromItemModel(idx).length;
            }
        },
        getLineCoords: function (idx, out) {
            if (this._flatCoordsOffset) {
                var offset = this._flatCoordsOffset[idx * 2];
                var len = this._flatCoordsOffset[idx * 2 + 1];

                for (var i = 0; i < len; i++) {
                    out[i] = out[i] || [];
                    out[i][0] = this._flatCoords[offset + i * 2];
                    out[i][1] = this._flatCoords[offset + i * 2 + 1];
                }

                return len;
            } else {
                var coords = this._getCoordsFromItemModel(idx);

                for (var i = 0; i < coords.length; i++) {
                    out[i] = out[i] || [];
                    out[i][0] = coords[i][0];
                    out[i][1] = coords[i][1];
                }

                return coords.length;
            }
        },
        _processFlatCoordsArray: function (data) {
            var startOffset = 0;

            if (this._flatCoords) {
                startOffset = this._flatCoords.length;
            } // Stored as a typed array. In format
            // Points Count(2) | x | y | x | y | Points Count(3) | x |  y | x | y | x | y |


            if (typeof data[0] === 'number') {
                var len = data.length; // Store offset and len of each segment

                var coordsOffsetAndLenStorage = new Uint32Arr(len);
                var coordsStorage = new Float64Arr(len);
                var coordsCursor = 0;
                var offsetCursor = 0;
                var dataCount = 0;

                for (var i = 0; i < len;) {
                    dataCount++;
                    var count = data[i++]; // Offset

                    coordsOffsetAndLenStorage[offsetCursor++] = coordsCursor + startOffset; // Len

                    coordsOffsetAndLenStorage[offsetCursor++] = count;

                    for (var k = 0; k < count; k++) {
                        var x = data[i++];
                        var y = data[i++];
                        coordsStorage[coordsCursor++] = x;
                        coordsStorage[coordsCursor++] = y;

                        if (i > len) { }
                    }
                }

                return {
                    flatCoordsOffset: new Uint32Array(coordsOffsetAndLenStorage.buffer, 0, offsetCursor),
                    flatCoords: coordsStorage,
                    count: dataCount
                };
            }

            return {
                flatCoordsOffset: null,
                flatCoords: null,
                count: data.length
            };
        },

        getInitialData: function (option, ecModel) {
            if (__DEV__) {
                var CoordSys = CoordinateSystem.get(option.coordinateSystem);
                if (!CoordSys) {
                    throw new Error('Unkown coordinate system ' + option.coordinateSystem);
                }
            }

            return createListFromArray(this.getSource(), this, {useEncodeDefaulter: true});
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

            return encodeHTML(html.join(' > '));
        },

        preventIncremental: function () {
            return !!this.get('effect.show');
        },
        getProgressive: function () {
            var progressive = this.option.progressive;

            if (progressive == null) {
                return this.option.large ? 1e4 : this.get('progressive');
            }

            return progressive;
        },
        getProgressiveThreshold: function () {
            var progressiveThreshold = this.option.progressiveThreshold;

            if (progressiveThreshold == null) {
                return this.option.large ? 2e4 : this.get('progressiveThreshold');
            }

            return progressiveThreshold;
        },

        defaultOption: {
            coordinateSystem: 'geo',
            zlevel: 0,
            z: 2,
            legendHoverLink: true,

            scale: 0.3,

            hoverAnimation: true,
            // Cartesian coordinate system
            xAxisIndex: 0,
            yAxisIndex: 0,

            // Geo coordinate system
            geoIndex: 0,

            large: false,
            // Available when large is true
            largeThreshold: 2000,

            requestCompleted: false, //后台请求是否完成
            isHover: false,
            
            polyline: true,

            label: {
                normal: {
                    show: false,
                    position: 'end'
                    // distance: 5,
                    // formatter: 标签文本格式器，同Tooltip.formatter，不支持异步回调
                }
            },

            lineStyle: {
                opacity:0.6
               
            }
        }
    });

    hwchart.chart.faultLine.FaultLineSeries = FaultLineSeries;
})