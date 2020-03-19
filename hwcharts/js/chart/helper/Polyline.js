Vmd.define('hwchart.chart.helper.Polyline', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.util.BreakPolyline'
    ]
   
}, function () {
    var graphic = hwchart.util.graphic;
    var zrUtil = zrender.util;
    var BreakPolyline = hwchart.util.BreakPolyline;

    /**
     * @constructor
     * @extends {module:zrender/graphic/Group}
     * @alias {module:hwcharts/chart/helper/Polyline}
     */
    function Polyline(lineData, idx, seriesScope) {
        graphic.Group.call(this);

        this._createPolyline(lineData, idx, seriesScope);
    }

    var polylineProto = Polyline.prototype;

    polylineProto._createPolyline = function (lineData, idx, seriesScope) {
        var seriesModel = lineData.hostModel;
        var itemLayout = lineData.getItemLayout(idx);
        var line = new BreakPolyline({
            shape: {
                points:  itemLayout.coords || itemLayout
            }
        });

        line._seriesName = lineData.hostModel.name;
        this.add(line);

        this._updateCommonStl(lineData, idx, seriesScope);
    };

    polylineProto.updateData = function (lineData, idx, seriesScope) {
        var seriesModel = lineData.hostModel;
        var itemLayout = lineData.getItemLayout(idx);
        var points = itemLayout.coords || itemLayout ;

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

        var visualColor = lineData.getItemVisual(idx, 'color');

        var lineStyle = seriesScope && seriesScope.lineStyle;
        var areaStyle = seriesScope && seriesScope.areaStyle;
        var hoverLineStyle = seriesScope && seriesScope.hoverLineStyle;

        if (!seriesScope || lineData.hasItemOption) {
            lineStyle = itemModel.getModel('lineStyle.normal').getLineStyle();
            areaStyle = itemModel.getModel('areaStyle.normal').getLineStyle();
            hoverLineStyle = itemModel.getModel('lineStyle.emphasis').getLineStyle();
        }
        var isArea = lineData.hostModel.get('isArea');
        line.useStyle(zrUtil.defaults(
            {
                strokeNoScale: true,
                fill: isArea ? visualColor : 'none',
                stroke: visualColor
            },
            isArea ? areaStyle : lineStyle
        ));
        var isHover = lineData.hostModel.get('isHover');
        if (isHover !== false) {
            line.hoverStyle = hoverLineStyle;

            graphic.setHoverStyle(this);
        }
    };

    polylineProto.updateLayout = function (lineData, idx) {
        var polyline = this.childAt(0);
        var seriesModel = lineData.hostModel;
        var itemLayout = lineData.getItemLayout(idx);
        //if (itemLayout)
        {
            var points = itemLayout.coords || itemLayout;
            polyline.setShape('points', points);
        }    
        
    };
    
    polylineProto.clearSelect = function(lineData, idx, seriesScope){
        this._updateCommonStl(lineData, idx, seriesScope);
    }

    polylineProto.setSelect = function(lineData, idx, seriesScope, selectIndexs){
        var line = this.childAt(0);
        var itemModel = lineData.getItemModel(idx);
        lineStyle = itemModel.getModel('lineStyle.normal').getLineStyle();
        var lineWidth = lineStyle.lineWidth;
        line.setStyle({
            lineDash: [lineWidth * 4, lineWidth * 4]
        })
        line.animateStyle(true)
            .when(1000, {
                lineDashOffset: lineWidth * 8
            })
            .delay(100)
            .start();

        selectIndexs.push(idx);
    }
    zrUtil.inherits(Polyline, graphic.Group);

    hwchart.chart.helper.Polyline = Polyline;
})