Vmd.define('hwchart.chart.helper.WellLabelDraw', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.chart.helper.WellManager'
    ]
}, function () {

    var graphic = hwchart.util.graphic;
    var WellManager = hwchart.chart.helper.WellManager;
    var zrUtil = zrender.util;

    /**
     * @constructor
     * @alias module:echarts/chart/helper/SymbolDraw
     * @param {module:zrender/graphic/Group} [symbolCtor]
     */
    function WellLabelDraw() {
    }

    var wellLabelDrawProto = WellLabelDraw.prototype;

    wellLabelDrawProto._getTextStyle = function (data) {
        var seriesModel = data.hostModel;
        var ecModel = data.hostModel.ecModel;

        var textStyle = zrUtil.defaults({},
            zrUtil.defaults(
                seriesModel.get('itemStyle.normal'),
                seriesModel.getShallow('textStyle')
            )
        )
        return textStyle;
    };

    /**
     * Update symbols draw by new data
     * @param {module:echarts/data/List} data
     */
    wellLabelDrawProto.updateData = function (ecModel, data) {
        var self = this;
        var group = this.group;
        var seriesModel = data.hostModel;
        var oldData = this._data;


        var ecModel = seriesModel.ecModel;
        var scale = seriesModel.get('scale');
        var geo = ecModel.getComponent('geo');
        var zoom = geo.coordinateSystem._zoom;
        var zoomScale = !isNaN(scale) ? Math.min(scale * zoom, 1) : 1;

        var seriesScope = {
            itemStyle: seriesModel.getModel('itemStyle').getItemStyle(['color']),
            hoverItemStyle: seriesModel.getModel('itemStyle.emphasis').getItemStyle(),
            symbolRotate: seriesModel.get('symbolRotate'),
            symbolOffset: seriesModel.get('symbolOffset'),
            hoverAnimation: seriesModel.get('hoverAnimation'),

            labelModel: seriesModel.getModel('label.normal'),
            hoverLabelModel: seriesModel.getModel('label.emphasis')
        };
        var isShow = seriesModel.get('itemStyle.show');
        data.diff(oldData)
            .add(function (newIdx) {
                var rawDataItem = data.getRawDataItem(newIdx);
                if (WellManager.checkSymbolShow(data,newIdx)&&isShow) {
                    var elStyle = {};
                    graphic.setText(elStyle, seriesModel.getModel('itemStyle.normal'), data.getItemVisual(newIdx, 'color'));
                    elStyle = zrUtil.defaults(self._getTextStyle(data), elStyle);
                    elStyle.text = rawDataItem.value;
                    var labelEl = new zrender.Text({
                        style: elStyle
                    });

                    labelEl.attr('scale', [zoomScale,zoomScale]);
                    labelEl._tag = 'label';
                    data.setItemGraphicEl(newIdx, labelEl);

                    labelEl._position = WellManager.addWellEl(data, newIdx, labelEl, null,
                        WellManager.getWellLayout(data,newIdx),
                        seriesModel.get('itemStyle.normal.position'),
                        seriesModel.get('itemStyle.normal.distance'),
                        seriesModel.get('itemStyle.normal.offset'),
                        zoomScale);
                }
            })
            .update(function (newIdx, oldIdx) {
                var labelEl = oldData.getItemGraphicEl(oldIdx);
                var rawDataItem = data.getRawDataItem(newIdx);
                if (!WellManager.checkSymbolShow(data,newIdx)||!isShow) {
                    WellManager.removeWellEl(data, newIdx);
                    return;
                }
                if (!labelEl) {
                    var elStyle = {};
                    graphic.setText(elStyle, seriesModel.getModel('itemStyle.normal'),data.getItemVisual(newIdx, 'color'));
                    elStyle = zrUtil.defaults(self._getTextStyle(data), elStyle);
                    elStyle.text = rawDataItem.value;
                    var labelEl = new zrender.Text({
                        style: elStyle
                    });

                    labelEl._tag = 'label';
                }
                else {
                    labelEl._state = '';
                }

                labelEl.attr('scale', [zoomScale,zoomScale]);
                data.setItemGraphicEl(newIdx, labelEl);

                labelEl._position = WellManager.addWellEl(data, newIdx, labelEl, null,
                    WellManager.getWellLayout(data,newIdx),
                    seriesModel.get('itemStyle.normal.position'),
                    seriesModel.get('itemStyle.normal.distance'),
                    seriesModel.get('itemStyle.normal.offset'),
                    zoomScale);
            })
            .remove(function (oldIdx) {
                var el = oldData.getItemGraphicEl(oldIdx);
                el && el.fadeOut(function () {
                    WellManager.removeWellEl(data, newIdx);
                });
            })
            .execute();

        this._data = data;
    };

    wellLabelDrawProto.remove = function (enableAnimation) {
        var data = this._data;
        if (data) {
            data.eachItemGraphicEl(function (wellGroup, idx) {
                WellManager.removeWellSymbol(data, idx);
            });
        }
    };

    hwchart.chart.helper.WellLabelDraw = WellLabelDraw;
   
})