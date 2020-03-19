Vmd.define('hwchart.chart.isoLine.IsoLineView', {
    requires: [
        'hwchart.view.Chart',
        'hwchart.chart.helper.LineDraw',
        'hwchart.chart.helper.IsoPolyline',
        'hwchart.chart.helper.LargeLineDraw',
        'hwchart.layout.polyline'
    ]
}, function () {

    var _util = zrender.util;
    var LineDraw = hwchart.chart.helper.LineDraw;
    var IsoPolyline = hwchart.chart.helper.IsoPolyline;
    var LargeLineDraw = hwchart.chart.helper.LargeLineDraw;
    var layoutPolyline = hwchart.layout.polyline;

    var IsoLineView=hwcharts.extendChartView({

        type: 'isoLine',

        init: function () { },

        getRequireData: function(seriesModel, ecModel){

            var data = {
                property: {
                    Xwg: seriesModel.get('xGrid'),
                    Ywg: seriesModel.get('yGrid'),
                    Dense: seriesModel.get('dense')
                },
                welldata: [],
                borderdata: []
            };

            var dependentSeriesName = seriesModel.get('dependentSeries') || [];
            if(dependentSeriesName.length == 0) {
                return data;
            };

            var isAllRequestCompleted = true; //所有序列请求完成
            var dependentSeriesModel = [];
            ecModel.eachSeries(function (series) {
                //没有依赖或者没有请求完成
                if(_util.indexOf(dependentSeriesName, series.name) < 0){
                    return;
                }
                if(!series.get('requestCompleted')){
                    isAllRequestCompleted = false;
                }
            });
            if(!isAllRequestCompleted){
                return null;
            }

            var dependentSeriesModel = _util.filter(_util.map(dependentSeriesName, function(seriesName){
                return ecModel.getSeriesByName(seriesName)[0];
            }), function(onSeries){return !!onSeries});

            var wellData = {}; //所有井口数据；
            var labelData = []; //所有井属性数据

            _util.each(dependentSeriesModel, function(onSeries){
                if (onSeries.subType == 'wellSymbol' && onSeries.getData()._nameList.length > 0) {
                    for(var i = 0 ; i < onSeries.getData()._rawData._data.length; i++) {
                        var rawData = onSeries.getData()._rawData._data[i];
                        wellData[rawData.id] = rawData;
                    }
                }
                if (onSeries.subType == 'faultLine') {
                    data.faultdata = (data.faultdata || []).concat(onSeries.getData()._rawData._data.map(
                        function(v) {
                            return {
                                coords: v.coords,
                                faultId: v.faultId,
                                faultType: v.faultType,
                                wallId: v.wallId,
                                wallType: v.wallType
                            };
                        }));
                    data.faultdata = [];
                }
                if (onSeries.subType == 'wellLabel') {
                    labelData = labelData.concat(onSeries.getData()._rawData._data);
                }
            });

            ecModel.eachComponent('geo', function (geoModel, idx) {
                var coordinateSystem = geoModel.coordinateSystem;
                var rect = coordinateSystem._rect;
                data.borderdata.push([rect.x, rect.y]);
                data.borderdata.push([rect.x + rect.width, rect.y]);
                data.borderdata.push([rect.x + rect.width, rect.y + rect.height]);
                data.borderdata.push([rect.x, rect.y + rect.height]);
                data.borderdata.push([rect.x, rect.y]);
            });
            for (var i = 0; i < labelData.length; i++) {
                var item = labelData[i];
                if (wellData[item.id]) {
                    data.welldata.push(wellData[item.id].value.concat([item.value]));
                }
            }
            return data;
        },

        render: function (seriesModel, ecModel, api) {
            var requireData = this.getRequireData(seriesModel, ecModel);

            if (!this.__hasFetchData && requireData) {
                api.dispatchAction({
                    type: 'fetchData',
                    id: seriesModel.id,
                    mainType: seriesModel.mainType,
                    name: seriesModel.name,
                    seriesIndex:seriesModel.seriesIndex,
                    subType: seriesModel.subType,
                    params: requireData
                });
                this.__hasFetchData = true;
            }

            var data = seriesModel.getData();

            var lineDraw = this._updateLineDraw(data, seriesModel, ecModel, api);

            var zlevel = seriesModel.get('zlevel');
            var trailLength = seriesModel.get('effect.trailLength');

            var zr = api.getZr();
            // Avoid the drag cause ghost shadow
            // FIXME Better way ?
            // zr.painter.getLayer(zlevel).clear(true);
            // Config layer with motion blur
            if (this._lastZlevel != null) {
                zr.configLayer(this._lastZlevel, {
                    motionBlur: false
                });
            }
            if (trailLength) {
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

                lineDraw = this._lineDraw = isLargeDraw ? new LargeLineDraw() : new LineDraw(IsoPolyline, seriesModel, ecModel, api);
                this._isLargeDraw = isLargeDraw;
                this.group.removeAll();
            }

            this.group.add(lineDraw.group);
            return lineDraw;
        },

        remove: function (ecModel, api) {
            this._lineDraw && this._lineDraw.remove(api, true);
            this._lineDraw = null; // Clear motion when lineDraw is removed
        },

        dispose: function () { }
    });
    hwchart.chart.isoLine.IsoLineView = IsoLineView;
})