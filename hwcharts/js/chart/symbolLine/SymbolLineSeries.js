Vmd.define('hwchart.chart.symbolLine.SymbolLineSeries', {
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

    var _format = hwchart.util.format;

    var encodeHTML = _format.encodeHTML;

    var CoordinateSystem = hwchart.CoordinateSystem;


    /* global Uint32Array, Float64Array, Float32Array */
    var Uint32Arr = typeof Uint32Array === 'undefined' ? Array : Uint32Array;
    var Float64Arr = typeof Float64Array === 'undefined' ? Array : Float64Array;

    function preprocessOption(seriesOpt) {
        var data = seriesOpt.data;
        if (data && data[0] && data[0].coords) {
            seriesOpt.data = map(data, function (itemOpt) {
                var parseValue = parseFloat(itemOpt.value);
                itemOpt.text = isNaN(parseValue) ? parseValue : parseValue.toFixed(2);
                itemOpt.show = itemOpt.type != -1;

                _util.each(itemOpt.coords, function (coord) {
                    coord[0] += +itemOpt.baseX;
                    coord[1] += +itemOpt.baseY;
                })
                return itemOpt;
            });
        }
    }

    var SymbolLineSeries = SeriesModel.extend({

        type: 'series.symbolLine',

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

            SymbolLineSeries.superApply(this, 'init', arguments);
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

            SymbolLineSeries.superApply(this, 'mergeOption', arguments);
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

            allowSelect: true,
            autoCompute: true,

            visualColorAccessPath: 'lineStyle.color',

            hoverAnimation: true,
            // Cartesian coordinate system
            xAxisIndex: 0,
            yAxisIndex: 0,

            xGrid: 100, //横向网格数
            yGrid: 100, //纵向网格数
            dense: 0,

            // Geo coordinate system
            geoIndex: 0,

            large: false,
            // Available when large is true
            largeThreshold: 2000,
            scale: 0.3,

            polyline: true,

            requestCompleted: false, //后台请求是否完成
            isHover: false,

            label: {
                show: true,
                position: 'end'
                // distance: 5,
                // formatter: 标签文本格式器，同Tooltip.formatter，不支持异步回调
            },

            lineStyle: {
                opacity: 1
            }
        }
    });

    hwchart.chart.symbolLine.SymbolLineSeries = SymbolLineSeries;
})