Vmd.define('hwchart.chart.area.AreaView', {
    requires: [
        'hwchart.chart.helper.AreaDraw'
    ]
}, function () {

    var AreaDraw = hwchart.chart.helper.AreaDraw;

    var _util = zrender.util;

    var AreaView=hwcharts.extendChartView({

        type: 'area',

        init: function () {
            this._areaDraw = new AreaDraw();
        },

        getServerData: function(seriesModel, ecModel, api){

            var needServerData = true;
            ecModel.eachSeries(function (series) {
                var applyDataTo= series.get("applyDataTo");
                if(applyDataTo && _util.indexOf(applyDataTo, seriesModel.name) != -1){
                    needServerData = false;
                }
            });

            if(!needServerData){
                return;
            }

            // 获取井组数据
            if (!this.__hasFetchData) { // 获取数据
                api.dispatchAction({
                    type: 'fetchData',
                    id: seriesModel.id,
                    mainType: seriesModel.mainType,
                    name: seriesModel.name,
                    seriesIndex: seriesModel.seriesIndex,
                    subType: seriesModel.subType
                });
                this.__hasFetchData = true;
            }
        },

        render: function (seriesModel, ecModel, api) {

            this.getServerData(seriesModel, ecModel, api);

            var data = seriesModel.getData();
            this._areaDraw.updateData(ecModel, data);
            this.group.add(this._areaDraw.group);
        },

        updateTransform2: function (seriesModel, ecModel, api) {
            this._areaDraw.updateLayout(seriesModel, ecModel, api);
            // Not use motion when dragging or zooming
            // var zr = api.getZr();
            // zr.painter.getLayer(this._lastZlevel).clear(true);
        },

        remove: function (ecModel, api) {
            this._areaDraw && this._areaDraw.remove(api, true);
        },

        dispose: function () { }
    });
    hwchart.chart.area.AreaView = AreaView;
})