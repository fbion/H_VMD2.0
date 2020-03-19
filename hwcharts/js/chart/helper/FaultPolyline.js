Vmd.define('hwchart.chart.helper.FaultPolyline', {
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
    var zrUtil = zrender.util;
    var lineSymbolStorage = hwchart.util.lineSymbolStorage;
    var symbolDataStorage = hwchart.util.symbolDataStorage;
    var lineSymbolMap = hwchart.config.lineSymbolMap;
    var SymbolCtor = hwchart.chart.helper.Symbol;
    var ComposeSymbol = hwchart.chart.helper.ComposeSymbol;
    var lineSymbolUtil = hwchart.util.lineSymbol;

    /**
     * @constructor
     * @extends {module:zrender/graphic/Group}
     * @alias {module:hwcharts/chart/helper/Polyline}
     */
    function FaultPolyline(lineData, idx, seriesScope) {
        graphic.Group.call(this);

        this._createPolyline(lineData, idx, seriesScope);
    }

    var polylineProto = FaultPolyline.prototype;

    polylineProto._createPolyline = function (lineData, idx, seriesScope) {
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

    polylineProto._updateSymbol = function (lineData, idx, lineSymbol) {
        var self = this;
        this.symbolGroup.removeAll();

        //缩放
        var ecModel = lineData.hostModel.ecModel;
        var scale = lineData.hostModel.get('scale');
        var geo = ecModel.getComponent('geo');
        var zoom = geo.coordinateSystem._zoom;
        var zoomScale = Math.min(scale * zoom, 1);
        if (!isNaN(scale)) {
            lineSymbol = zrUtil.clone(lineSymbol);
            if(lineSymbol.lineStyle && lineSymbol.lineStyle.lineWidth){
                lineSymbol.lineStyle.lineWidth = lineSymbol.lineStyle.lineWidth * zoomScale;
            }
            if(lineSymbol.symbolStyle && lineSymbol.symbolStyle.size){
                lineSymbol.symbolStyle.size = zrUtil.map(lineSymbol.symbolStyle.size, function(item){return item * zoomScale})
            }
        }

        var symbolData = lineSymbolUtil.getSymbolData(lineData, idx, lineSymbol);
        symbolData && symbolData.each(function (idx) {
            var rawDataItem = symbolData.getRawDataItem(idx);
            symbolData.setItemLayout(idx, rawDataItem.value);
            symbolData.setItemVisual(idx, 'symbol', rawDataItem.symbol);
            symbolData.setItemVisual(idx,'symbolSize', rawDataItem.size);
            symbolData.setItemVisual(idx,'color', rawDataItem.color);
            symbolData.setItemVisual(idx,'animation', false);
            symbolData.setItemVisual(idx,'hover', false);

            var symbolEl = null;
            if(symbolDataStorage.retrieveComposeSymbol(rawDataItem.symbol)){
                symbolEl = new ComposeSymbol(rawDataItem.symbol);
            }
            else{
                symbolEl = new SymbolCtor(symbolData, idx);
            }

            symbolEl.attr('position', symbolData.getItemLayout(idx));
            symbolEl.attr('rotation', -rawDataItem.rotation);
            self.symbolGroup.add(symbolEl);
        });
    }

    polylineProto.clearSelect = function(lineData, idx, seriesScope){
        this._updateCommonStl(lineData, idx, seriesScope);
    }

    polylineProto.setSelect = function(lineData, idx, seriesScope, selectIndexs){
        var line = this.childAt(0);

        var rawDataItem = lineData.getRawDataItem(idx);
        var lineType = lineSymbolMap[lineData.hostModel.get('lineStyle.type')] || {};
        var faultLineStyle = (rawDataItem.faultType ==  1 ? lineType.antiLineStyle :
            (rawDataItem.wallType == 1 ? lineType.downLineStyle : lineType.upLineStyle)) || {};

        var lineSymbol = lineSymbolStorage.retrieveLineSymbol(faultLineStyle.type);
        var lineWidth = faultLineStyle.lineWidth;
        if(lineSymbol){
            var lineStyle = lineSymbol.lineStyle;
            lineWidth = lineStyle.lineWidth;
        }
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

        //上升盘和下降盘同时选中
        var anotherWallType = rawDataItem.wallType == 1 ? 0 : 1;
        var anotherId = rawDataItem.faultId + '_' + rawDataItem.wallId + '_' +  anotherWallType;
        var anotherIndex = lineData._idList.indexOf(anotherId);
        if(anotherIndex == -1){
            return;
        }
        var anotherLine = lineData.getItemGraphicEl(anotherIndex);

        var faultLineStyle = (rawDataItem.faultType ==  1 ? lineType.antiLineStyle :
            (anotherWallType == 1 ? lineType.downLineStyle : lineType.upLineStyle)) || {};
        var lineSymbol = lineSymbolStorage.retrieveLineSymbol(faultLineStyle.type);
        var lineWidth = faultLineStyle.lineWidth;
        if(lineSymbol){
            var lineStyle = lineSymbol.lineStyle;
            lineWidth = lineStyle.lineWidth;
        }
        anotherLine.childAt(0).setStyle({
            lineDash: [lineWidth * 4, lineWidth * 4]
        });
        anotherLine.childAt(0).animateStyle(true)
            .when(1000, {
                lineDashOffset: lineWidth * 8
            })
            .delay(100)
            .start();

        selectIndexs.push(anotherIndex);
    }

    polylineProto.updateData = function (lineData, idx, seriesScope) {
        var seriesModel = lineData.hostModel;

        var points = lineData.getItemLayout(idx);
        var line = this.childAt(0);
        var target = {
            shape: {
                points: points
            }
        };

        // graphic.updateProps(line, target, seriesModel, idx);
        line.setShape('points', points);

        this._updateCommonStl(lineData, idx, seriesScope);
    };

    polylineProto._updateCommonStl = function (lineData, idx, seriesScope) {
        var line = this.childAt(0);
        var itemModel = lineData.getItemModel(idx);
        var rawDataItem = lineData.getRawDataItem(idx);

        var visualColor = lineData.getItemVisual(idx, 'color');

        var lineStyle = seriesScope && seriesScope.lineStyle;
        var areaStyle = seriesScope && seriesScope.areaStyle;
        var hoverLineStyle = seriesScope && seriesScope.hoverLineStyle;

        var lineType = lineSymbolMap[lineData.hostModel.get('lineStyle.type')] || {};
        var faultLineStyle = (rawDataItem.faultType ==  1 ? lineType.antiLineStyle :
            (rawDataItem.wallType == 1 ? lineType.downLineStyle : lineType.upLineStyle)) || {};

        var lineSymbol = lineSymbolStorage.retrieveLineSymbol(faultLineStyle.type);
        // delete faultLineStyle.type;

        if (lineSymbol) {
            faultLineStyle = lineSymbol.lineStyle;
            this._updateSymbol(lineData, idx, lineSymbol);
        }

        //rawDataItem.faultType  rawDataItem.wallType
        if (!seriesScope || lineData.hasItemOption) {
            lineStyle = zrUtil.defaults(
                itemModel.getModel('lineStyle').getLineStyle(),
                faultLineStyle,
                true
            );
            hoverLineStyle = itemModel.getModel('lineStyle.emphasis').getLineStyle();
        }

        //缩放
        var ecModel = lineData.hostModel.ecModel;
        var scale = lineData.hostModel.get('scale');
        var geo = ecModel.getComponent('geo');
        var zoom = geo.coordinateSystem._zoom;
        if(!isNaN(scale) && lineStyle.lineWidth){
            lineStyle = zrUtil.clone(lineStyle);
            var zoomScale = Math.min(scale * zoom, 1);
            lineStyle.lineWidth *= zoomScale;
        }

        line.useStyle(zrUtil.defaults(
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

    polylineProto.updateLayout = function (lineData, idx) {
        var polyline = this.childAt(0);
        polyline.setShape('points', lineData.getItemLayout(idx));

        var rawDataItem = lineData.getRawDataItem(idx);
        var lineType = lineSymbolMap[lineData.hostModel.get('lineStyle.type')] || {};
        var faultLineStyle = (rawDataItem.faultType ==  1 ? lineType.antiLineStyle :
            (rawDataItem.wallType == 1 ? lineType.downLineStyle : lineType.upLineStyle)) || {};

        var lineSymbol = lineSymbolStorage.retrieveLineSymbol(faultLineStyle.type);

        //缩放
        var ecModel = lineData.hostModel.ecModel;
        var scale = lineData.hostModel.get('scale');
        var geo = ecModel.getComponent('geo');
        var zoom = geo.coordinateSystem._zoom;
        var zoomScale = Math.min(scale * zoom, 1);
        if(!isNaN(scale)){
            var lineWidth = faultLineStyle.lineWidth || (lineSymbol && lineSymbol.lineStyle && lineSymbol.lineStyle.lineWidth);
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

    zrUtil.inherits(FaultPolyline, graphic.Group);

    hwchart.chart.helper.FaultPolyline = FaultPolyline;
});