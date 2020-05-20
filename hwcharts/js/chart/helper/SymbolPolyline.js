Vmd.define('hwchart.chart.helper.SymbolPolyline', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.util.lineSymbolStorage',
        'hwchart.util.lineSymbol',
        'hwchart.chart.helper.ComposeSymbol',
        'hwchart.chart.helper.Symbol',
        'hwchart.util.symbolDataStorage',
        'hwchart.config.lineSymbolMap'
    ]
   
}, function () {
    var graphic = hwchart.util.graphic;
    var _util = zrender.util;
    var isObject = _util.isObject;
    var isArray = _util.isArray;
    var filter = _util.filter;
    var indexOf = _util.indexOf;
    var each = _util.each;
    var defaults = _util.defaults;
    var isFunction = _util.isFunction;
    var clone = _util.clone;
    var retrieve3 = _util.retrieve3;
    var inherits = _util.inherits;
    var map = _util.map;

    var lineSymbolStorage = hwchart.util.lineSymbolStorage;
    var symbolDataStorage = hwchart.util.symbolDataStorage;
    var lineSymbolMap = hwchart.config.lineSymbolMap;
    var SymbolCtor = hwchart.chart.helper.Symbol;
    var ComposeSymbol = hwchart.chart.helper.ComposeSymbol;
    var lineSymbolUtil = hwchart.util.lineSymbol;

    function normalizeSymbolScale(symbolSize, rect) {
        if (!isArray(symbolSize)) {
            symbolSize = [symbolSize, symbolSize];
        }
        return [symbolSize[0] / rect.width, symbolSize[1] / rect.height];
    }

    /**
     * @constructor
     * @extends {module:zrender/graphic/Group}
     * @alias {module:hwcharts/chart/helper/Polyline}
     */
    function SymbolPolyline(lineData, idx, seriesScope) {
        graphic.Group.call(this);

        this._createPolyline(lineData, idx, seriesScope);
    }

    var symbollineProto = SymbolPolyline.prototype;

    symbollineProto._createPolyline = function (lineData, idx, seriesScope) {
        // var seriesModel = lineData.hostModel;
        var points = lineData.getItemLayout(idx);

        var line = new graphic.Polyline({
            shape: {
                points: points
            }
        });

        this.add(line);

        this.symbolGroup = new graphic.Group();
        this.add(this.symbolGroup);
        this._updateCommonStl(lineData, idx, seriesScope);
    };

    symbollineProto._updateSymbol = function (lineData, idx, lineSymbol) {
        var self = this;
        this.symbolGroup.removeAll();

        //缩放
        var seriesModel = lineData.hostModel;
        var ecModel = seriesModel.ecModel;
        var scale = lineData.hostModel.get('scale');

        var coordinateSystem = seriesModel.coordinateSystem;
        var zoom = coordinateSystem.getZoom();

        var zoomScale = Math.min(scale * zoom, 1);
        if (!isNaN(scale)) {
            lineSymbol = clone(lineSymbol);
            if(lineSymbol.lineStyle && lineSymbol.lineStyle.lineWidth){
                lineSymbol.lineStyle.lineWidth = lineSymbol.lineStyle.lineWidth * zoomScale;
            }
            if(lineSymbol.symbolStyle && lineSymbol.symbolStyle.size){
                lineSymbol.symbolStyle.size = map(lineSymbol.symbolStyle.size, function(item){return item * zoomScale})
            }
        }

        var symbolData = lineSymbolUtil.getSymbolData(lineData, idx, lineSymbol);
        symbolData && symbolData.each(function (idx) {
            var rawDataItem = symbolData.getRawDataItem(idx);
            symbolData.setItemLayout(idx, rawDataItem.value);
            symbolData.setItemVisual(idx, 'symbol', rawDataItem.symbol);
            symbolData.setItemVisual(idx, 'symbolSize', rawDataItem.size);
            symbolData.setItemVisual(idx, 'color', rawDataItem.color);
            symbolData.setItemVisual(idx, 'animation', false);
            symbolData.setItemVisual(idx, 'hover', false);

            var symbolEl = null;
            if(symbolDataStorage.retrieveComposeSymbol(rawDataItem.symbol)){
                symbolEl = new ComposeSymbol(rawDataItem.symbol);
                var scale = normalizeSymbolScale(rawDataItem.size, symbolEl.getBoundingRect());
                symbolEl.attr('scale', scale);
            }
            else{
                symbolEl = new SymbolCtor(symbolData, idx);
            }

            symbolEl.attr('position', symbolData.getItemLayout(idx));
            symbolEl.attr('rotation', -rawDataItem.rotation);
            self.symbolGroup.add(symbolEl);
        });
    }

    symbollineProto.clearSelect = function(lineData, idx, seriesScope){
        this._updateCommonStl(lineData, idx, seriesScope);
    }

    symbollineProto.setSelect = function(lineData, idx, seriesScope, selectIndexs){
        var line = this.childAt(0);

        var lineStyle = lineData.hostModel.getModel('lineStyle').getLineStyle();
        var symbolLineStyle = lineSymbolMap[lineData.hostModel.get('lineStyle.type')] || {};
        var lineSymbol = lineSymbolStorage.retrieveLineSymbol(symbolLineStyle.type) || {};
        var lineWidth = retrieve3(lineSymbol.lineStyle && lineSymbol.lineStyle.lineWidth, symbolLineStyle.lineWidth, lineStyle.lineWidth);
        line.setStyle({
            lineDash: [lineWidth * 4, lineWidth * 4]
        });
        line.animateStyle(true)
            .when(1000, {
                lineDashOffset: lineWidth * 8
            })
            .delay(100)
            .start();

        selectIndexs.push(idx);
    }

    symbollineProto.updateData = function (lineData, idx, seriesScope) {
        var seriesModel = lineData.hostModel;

        var itemLayout = lineData.getItemLayout(idx);

        var line = this.childAt(0);
        var target = {
            shape: {
                points: itemLayout
            }
        };
        // graphic.updateProps(line, target, seriesModel, idx);
        line.setShape('points', itemLayout);

        this._updateCommonStl(lineData, idx, seriesScope);
    };

    symbollineProto._updateCommonStl = function (lineData, idx, seriesScope) {
        var line = this.childAt(0);
        var itemModel = lineData.getItemModel(idx);

        var visualColor = lineData.getItemVisual(idx, 'color');

        var lineStyle = seriesScope && seriesScope.lineStyle;
        var areaStyle = seriesScope && seriesScope.areaStyle;
        var hoverLineStyle = seriesScope && seriesScope.hoverLineStyle;

        var symbolLineStyle = lineSymbolMap[lineData.hostModel.get('lineStyle.type')] || {};

        var lineSymbol = lineSymbolStorage.retrieveLineSymbol(symbolLineStyle.type);

        if (lineSymbol) {
            symbolLineStyle = lineSymbol.lineStyle;
            this._updateSymbol(lineData, idx, lineSymbol);
        }

        if (!seriesScope || lineData.hasItemOption) {
            lineStyle = defaults(
                itemModel.getModel('lineStyle').getLineStyle(),
                symbolLineStyle,
                true
            );
            hoverLineStyle = itemModel.getModel('lineStyle.emphasis').getLineStyle();
        }

        //缩放
        var seriesModel = lineData.hostModel;
        var ecModel = seriesModel.ecModel;
        var scale = lineData.hostModel.get('scale');

        var coordinateSystem = seriesModel.coordinateSystem;
        var zoom = coordinateSystem.getZoom();

        if(!isNaN(scale) && lineStyle.lineWidth){
            lineStyle = clone(lineStyle);
            var zoomScale = Math.min(scale * zoom, 1);
            lineStyle.lineWidth *= zoomScale;
        }

        line.useStyle(defaults(
            {
                strokeNoScale: true,
                fill: 'none',
                stroke: visualColor
            },
            lineStyle,
            true
        ));
        var isHover = lineData.hostModel.get('isHover');
        if (isHover !== false) {
            line.hoverStyle = hoverLineStyle;

            graphic.setHoverStyle(this);
        }
    };

    symbollineProto.updateLayout = function (lineData, idx) {
        var polyline = this.childAt(0);
        polyline.setShape('points', lineData.getItemLayout(idx));

        var lineStyle = lineData.hostModel.getModel('lineStyle').getLineStyle();
        var symbolLineStyle = lineSymbolMap[lineData.hostModel.get('lineStyle.type')] || {};
        var lineSymbol = lineSymbolStorage.retrieveLineSymbol(symbolLineStyle.type) || {};

        //缩放
        var seriesModel = lineData.hostModel;
        var ecModel = seriesModel.ecModel;
        var scale = lineData.hostModel.get('scale');

        var coordinateSystem = seriesModel.coordinateSystem;
        var zoom = coordinateSystem.getZoom();

        var zoomScale = Math.min(scale * zoom, 1);
        if(!isNaN(scale)){
            var lineWidth = retrieve3(lineSymbol.lineStyle && lineSymbol.lineStyle.lineWidth, symbolLineStyle.lineWidth, lineStyle.lineWidth);
            if(!isNaN(lineWidth)){
                polyline.setStyle({
                    lineWidth: lineWidth * zoomScale
                })
            }
        }

        if (lineSymbol) {
            this._updateSymbol(lineData, idx, lineSymbol);
        }
    };

    inherits(SymbolPolyline, graphic.Group);

    hwchart.chart.helper.SymbolPolyline = SymbolPolyline;
});