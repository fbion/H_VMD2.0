Vmd.define('hwchart.chart.scatter.ScatterView', {
    requires: [
        'hwchart.chart.helper.SymbolDraw',
        'hwchart.chart.helper.LargeSymbolDraw',
        'hwchart.layout.points'
    ]
}, function () {

    var SymbolDraw = hwchart.chart.helper.SymbolDraw;
    var LargeSymbolDraw = hwchart.chart.helper.LargeSymbolDraw;
    var pointsLayout = hwchart.layout.points;

  
    hwcharts.extendChartView({
        type: 'scatter',
        render: function (seriesModel, ecModel, api) {
            var data = seriesModel.getData();

            var symbolDraw = this._updateSymbolDraw(data, seriesModel);

            symbolDraw.updateData(data, {
                // TODO
                // If this parameter should be a shape or a bounding volume
                // shape will be more general.
                // But bounding volume like bounding rect will be much faster in the contain calculation
                clipShape: this._getClipShape(seriesModel)
            });
            this._finished = true;
        },
        incrementalPrepareRender: function (seriesModel, ecModel, api) {
            var data = seriesModel.getData();

            var symbolDraw = this._updateSymbolDraw(data, seriesModel);

            symbolDraw.incrementalPrepareUpdate(data);
            this._finished = false;
        },
        incrementalRender: function (taskParams, seriesModel, ecModel) {
            this._symbolDraw.incrementalUpdate(taskParams, seriesModel.getData(), {
                clipShape: this._getClipShape(seriesModel)
            });

            this._finished = taskParams.end === seriesModel.getData().count();
        },
        updateTransform: function (seriesModel, ecModel, api) {
            var data = seriesModel.getData(); // Must mark group dirty and make sure the incremental layer will be cleared
            // PENDING

            this.group.dirty();

            if (!this._finished || data.count() > 1e4 || !this._symbolDraw.isPersistent()) {
                return {
                    update: true
                };
            } else {
                var res = pointsLayout().reset(seriesModel);

                if (res.progress) {
                    res.progress({
                        start: 0,
                        end: data.count()
                    }, data);
                }

                this._symbolDraw.updateLayout(data);
            }
        },
        _getClipShape: function (seriesModel) {
            var coordSys = seriesModel.coordinateSystem;
            var clipArea = coordSys && coordSys.getArea && coordSys.getArea();
            return seriesModel.get('clip', true) ? clipArea : null;
        },
        _updateSymbolDraw: function (data, seriesModel) {
            var symbolDraw = this._symbolDraw;
            var pipelineContext = seriesModel.pipelineContext;
            var isLargeDraw = pipelineContext.large;

            if (!symbolDraw || isLargeDraw !== this._isLargeDraw) {
                symbolDraw && symbolDraw.remove();
                symbolDraw = this._symbolDraw = isLargeDraw ? new LargeSymbolDraw() : new SymbolDraw();
                this._isLargeDraw = isLargeDraw;
                this.group.removeAll();
            }

            this.group.add(symbolDraw.group);
            return symbolDraw;
        },
        remove: function (ecModel, api) {
            this._symbolDraw && this._symbolDraw.remove(true);
            this._symbolDraw = null;
        },
        dispose: function () { }
    });

})