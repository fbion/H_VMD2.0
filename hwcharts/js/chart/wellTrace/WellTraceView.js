Vmd.define('hwchart.chart.wellTrace.WellTraceView', {
    requires: [
        'hwchart.view.Chart',
        'hwchart.chart.helper.WellTraceDraw',
        // 'hwchart.chart.helper.Line',
        'hwchart.chart.helper.Polyline',
    ]
}, function () {

    var LineDraw = hwchart.chart.helper.WellTraceDraw;
    var Line = hwchart.chart.helper.Line;
    var Polyline = hwchart.chart.helper.Polyline;
    var WellTraceView=hwcharts.extendChartView({

        type: 'wellTrace',

        init: function () {},

        render: function (seriesModel, ecModel, api) {
            var data = seriesModel.getData();
            var lineDraw = this._lineDraw;

            if (!this.__hasFetchData) {
                api.dispatchAction({
                    type: 'fetchData',
                    id: seriesModel.id,
                    mainType: seriesModel.mainType,
                    name: seriesModel.name,
                    seriesIndex:seriesModel.seriesIndex,
                    subType: seriesModel.subType,
                    traceType:seriesModel.option.traceType,
                    z:seriesModel.option.z,
                });
                this.__hasFetchData = true;
            }

            var hasEffect = seriesModel.get('effect.show');
            var isPolyline = seriesModel.get('polyline');
            var isLarge = seriesModel.get('large') && data.count() >= seriesModel.get('largeThreshold');

            if (__DEV__) {
                if (hasEffect && isLarge) {
                    console.warn('Large lines not support effect');
                }
            }
            if (hasEffect !== this._hasEffet || isPolyline !== this._isPolyline || isLarge !== this._isLarge) {
                if (lineDraw) {
                    lineDraw.remove();
                }
                lineDraw = this._lineDraw = isLarge
                    ? new LargeLineDraw()
                    : new LineDraw(
                        isPolyline
                            ? Polyline
                            : Polyline,
                        seriesModel, ecModel, api
                    );
                this._hasEffet = hasEffect;
                this._isPolyline = isPolyline;
                this._isLarge = isLarge;
            }

            var zlevel = seriesModel.get('zlevel');
            var trailLength = seriesModel.get('effect.trailLength');

            var zr = api.getZr();
            // Avoid the drag cause ghost shadow
            // FIXME Better way ?
            //zr.painter.getLayer(zlevel).clear(true);
            // Config layer with motion blur
            if (this._lastZlevel != null) {
                zr.configLayer(this._lastZlevel, {
                    motionBlur: false
                });
            }
            if (hasEffect && trailLength) {
                if (__DEV__) {
                    var notInIndividual = false;
                    ecModel.eachSeries(function (otherSeriesModel) {
                        if (otherSeriesModel !== seriesModel && otherSeriesModel.get('zlevel') === zlevel) {
                            notInIndividual = true;
                        }
                    });
                    notInIndividual && console.warn('Lines with trail effect should have an individual zlevel');
                }

                zr.configLayer(zlevel, {
                    motionBlur: true,
                    lastFrameAlpha: Math.max(Math.min(trailLength / 10 + 0.9, 1), 0)
                });
            }

            this.group.add(lineDraw.group);

            lineDraw.updateData(ecModel,api,data);

            this._lastZlevel = zlevel;
        },

        updateLayout: function (seriesModel, ecModel, api) {
            var data =seriesModel.getData();
            if(data){
                this._lineDraw.updateData(ecModel,api,data);
            }
            // this._lineDraw.updateLayout(seriesModel);
            // // Not use motion when dragging or zooming
            // var zr = api.getZr();
            // //zr.painter.getLayer(this._lastZlevel).clear(true);
        },

        remove: function (ecModel, api) {
            this._lineDraw && this._lineDraw.remove(api, true);
        },

        dispose: function () { }
    });
    hwchart.chart.wellTrace.WellTraceView = WellTraceView;
})