Vmd.define('hwchart.util.lineSymbol',{
    requires: [
        'hwchart.util.layout',
        'hwchart.data.List'
    ]
},function () {

    var graphic = hwchart.util.graphic;
    var BoundingRect = zrender.BoundingRect;
    var zrUtil = zrender.util;
    var List = hwchart.data.List;
    var layout = hwchart.util.layout;

    var lineSymbolUtil = {

        _getOffset: function (p1, p2, offsetLen, symbolSize, pos) {
            if(!offsetLen || offsetLen == 1) {
                return [0,0];
            }
            var d = zrender.vector.distance(p1, p2);
            var out1 = [-(p2[1] - p1[1]) * offsetLen / d, (p2[0] - p1[0]) * offsetLen / d];
            var out2 = [(p2[1] - p1[1]) * offsetLen / d, -(p2[0] - p1[0]) * offsetLen / d];
            pos = pos || 'out';
            var crossVal = (p2[0] - p1[0]) * out1[1] - (p2[1] - p1[1]) * out1[0];
            if((pos == 'in' && crossVal < 0) || (pos == 'out' && crossVal > 0)) {
                return out1;
            }
            return out2;
        },

        getSymbolData: function (lineData, idx, lineSymbol) {
            var seriesModel = lineData.hostModel;
            var points = lineData.getItemLayout(idx);

            var symbolStyle = lineSymbol.symbolStyle || {};
            var lineStyle = lineSymbol.lineStyle || {};
            if(!symbolStyle.type || symbolStyle.type.length == 0 || !points || points.length < 2){
                return;
            }

            var types = zrUtil.isArray(symbolStyle.type) ? symbolStyle.type : [symbolStyle.type];
            var colors = zrUtil.isArray(symbolStyle.color) ? symbolStyle.color : [symbolStyle.color];
            var sizes = zrUtil.isArray(symbolStyle.size) ? symbolStyle.size : [symbolStyle.size];
            var intervals = zrUtil.isArray(symbolStyle.interval) ? symbolStyle.interval : [symbolStyle.interval];
            var positions = zrUtil.isArray(symbolStyle.position) ? symbolStyle.position : [symbolStyle.position];
            for(var i = 0; i < types.length; i++) {
                if (colors.length > 0 && !colors[i]) {
                    colors[i] = colors[0];
                }
                if (sizes.length > 0 && !sizes[i]) {
                    sizes[i] = sizes[0];
                }
                if (intervals.length > 0 && !intervals[i]) {
                    intervals[i] = intervals[0];
                }
                if (positions.length > 0 && !positions[i]) {
                    positions[i] = positions[0];
                }
            }

            var symbolIndex = 0; //第几个符号
            var interval = intervals[symbolIndex] || 100;
            // var stepLen;
            // if(this.stepLen === undefined || this.stepLen > interval / 2){
            //     this.stepLen = 0;
            // }
            var stepLen = interval / 2;
            var totalSegLen = 0;

            var symbols = [];
            var symbolData = new List([], seriesModel);
            for(var i = 0; i < points.length - 1; i++) {
                var p = points[i];
                var nextP = points[i + 1];
                var d = zrender.vector.distance(p, nextP);

                //当前位置在线段之间
                while (stepLen >= totalSegLen && (stepLen <= (totalSegLen + d))) {
                    var t = (stepLen - totalSegLen) / d;
                    var out = [];
                    zrender.vector.lerp(out, p, nextP, t);
                    var symbolSize = sizes[symbolIndex % types.length] || 8;
                    var pos = positions[symbolIndex % types.length];
                    var offset = this._getOffset(p, nextP, lineStyle.lineWidth, symbolSize, pos);
                    var outValue = [out[0] + offset[0], out[1] + offset[1]];
                    var rotation = Math.atan((nextP[1] - p[1]) / (nextP[0] - p[0]));
                    rotation += (nextP[0] - p[0]) < 0 ? (pos == 'out' ? 0 : Math.PI) : (pos == 'out' ? Math.PI : 0);
                    if(layout.isPointInBody(outValue)){
                        symbols.push({
                            symbol: types[symbolIndex % types.length] || 'rect',
                            size: symbolSize,
                            color: colors[symbolIndex % types.length] || lineStyle.stroke || lineData.getVisual('color'),
                            value: outValue,
                            rotation: rotation
                        });
                    }
                    symbolIndex++;
                    stepLen += intervals[symbolIndex % types.length] || interval;
                }
                totalSegLen += d;
            }

            symbolData.initData(symbols, []);
            return symbolData;
        }

    };
    hwchart.util.lineSymbol = lineSymbolUtil;

})