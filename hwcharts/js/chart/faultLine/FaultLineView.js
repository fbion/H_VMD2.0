Vmd.define('hwchart.chart.faultLine.FaultLineView', {
    requires: [
        'hwchart.view.Chart',
        'hwchart.chart.helper.LineDraw',
        'hwchart.chart.helper.FaultPolyline',
        'hwchart.chart.helper.LargeLineDraw',
        'hwchart.layout.polyline'
    ]
}, function () {

    var LineDraw = hwchart.chart.helper.LineDraw;
    var Polyline = hwchart.chart.helper.FaultPolyline;
    var LargeLineDraw = hwchart.chart.helper.LargeLineDraw;
    var layoutPolyline = hwchart.layout.polyline;

    var FaultLineView=hwcharts.extendChartView({

        type: 'faultLine',

        init: function () { },

        render: function (seriesModel, ecModel, api) {
            if (!this.__hasFetchData) {
                api.dispatchAction({
                    type: 'fetchData',
                    id: seriesModel.id,
                    mainType: seriesModel.mainType,
                    name: seriesModel.name,
                    seriesIndex:seriesModel.seriesIndex,
                    subType: seriesModel.subType
                });
                this.__hasFetchData = true;
            }

            var data = seriesModel.getData();

            var lineDraw = this._updateLineDraw(data, seriesModel, ecModel, api);

            var zlevel = seriesModel.get('zlevel');

            var zr = api.getZr();
            // Avoid the drag cause ghost shadow
            // FIXME Better way ?
            // !zrender.env.browser.id && zr.painter.getLayer(zlevel).clear(true);
            // Config layer with motion blur
            if (this._lastZlevel != null) {
                zr.configLayer(this._lastZlevel, {
                    motionBlur: false
                });
            }

            lineDraw.updateData(data);

            this._lastZlevel = zlevel;
        },

        updateTransform: function (seriesModel, ecModel, api) {
            var data = seriesModel.getData();
            this.group.dirty();
            var res = layoutPolyline(this.type).reset(seriesModel);

            if (res.progress) {
                res.progress({
                    start: 0,
                    end: data.count()
                }, data);
            }

            this._lineDraw.updateLayout(data);
        },

        _updateLineDraw: function (data, seriesModel, ecModel, api) {
            var lineDraw = this._lineDraw;

            var pipelineContext = seriesModel.pipelineContext;
            var isLargeDraw = pipelineContext.large;

            if (!lineDraw || isLargeDraw !== this._isLargeDraw) {
                if (lineDraw) {
                    lineDraw.remove();
                }

                lineDraw = this._lineDraw = isLargeDraw ? new LargeLineDraw() : new LineDraw(Polyline, seriesModel, ecModel, api);
                this._isLargeDraw = isLargeDraw;
                this.group.removeAll();
            }

            this.group.add(lineDraw.group);
            return lineDraw;
        },

        remove: function (ecModel, api) {
            this._lineDraw && this._lineDraw.remove(api, true);
        },

        dispose: function () { }
    });
    hwchart.chart.faultLine.FaultLineView = FaultLineView;
})