
//var groupAlgorithm = require("AreaAlgorithm");
Vmd.define('hwchart.chart.helper.AreaDraw', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.util.shape.segments'
    ]
}, function () {

    var _util = zrender.util;
    var graphic = hwchart.util.graphic;
    var SegmentsShape = hwchart.util.shape.segments;

    function isPointNaN(pt) {
        return isNaN(pt[0]) || isNaN(pt[1]);
    }
    function lineNeedsDraw(data, idx, isIgnore) {
        return true;
        var pts = data.getItemLayout(idx);
        var isShow = data.getRawDataItem(idx).show !== false;
        return isShow && pts[0] && pts[1] && !isPointNaN(pts[0]) && !isPointNaN(pts[1]);
    }

    /**
     * @constructor
     * @alias module:echarts/chart/helper/SymbolDraw
     * @param {module:zrender/graphic/Group} [symbolCtor]
     */
    function AreaDraw() {
        this.group = new graphic.Group();
    }

    var areaDrawProto = AreaDraw.prototype;

    /**
     * Update symbols draw by new data
     * @param {module:echarts/data/List} data
     * @param {Array.<boolean>} [isIgnore]
     */
    areaDrawProto.updateData = function (ecModel, data, isIgnore) {
        this.group.removeAll();
        var lineEl = new SegmentsShape({
            rectHover: true,
            cursor: 'default'
        });
        lineEl.setShape({
            segs: data.getLayout('linesPoints') || []
        });

        this._setCommon(lineEl, data); // Add back

        this.group.add(lineEl);
    };

    areaDrawProto.updateLayout = function (componentModel, ecModel, api, payload) {
        var data = this._data;
        //data.hostModel.mergeData(ecModel);
        data.eachItemGraphicEl(function (el, idx) {
            el.updateLayout(data, idx, ecModel, api);
        }, this);
    };

    areaDrawProto.remove = function (enableAnimation) {
        this.group.removeAll();
    };

    areaDrawProto._setCommon = function (lineEl, data) {
        var hostModel = data.hostModel;

        lineEl.useStyle(hostModel.getModel('lineStyle').getLineStyle());
        lineEl.style.strokeNoScale = true;
        var visualColor = data.getVisual('color');

        if (visualColor) {
            lineEl.setStyle('fill', visualColor);
        }

        // Enable tooltip
        // PENDING May have performance issue when path is extremely large
        lineEl.seriesIndex = hostModel.seriesIndex;
    };

    hwchart.chart.helper.AreaDraw = AreaDraw;
   
});