Vmd.define('hwchart.chart.Scatter', {
    requires: [
        'hwchart.chart.scatter.ScatterSeries',
        'hwchart.chart.scatter.ScatterView',
        'hwchart.visual.symbol',
        'hwchart.layout.points',
        'hwchart.component.gridSimple'

    ]

}, function (LineChart) {




    var visualSymbol = hwchart.visual.symbol;

    var layoutPoints = hwchart.layout.points;


   
    // import * as zrUtil from 'zrender/src/core/util';
    // In case developer forget to include grid component
    hwcharts.registerVisual(visualSymbol('scatter', 'circle'));
    hwcharts.registerLayout(layoutPoints('scatter')); // hwcharts.registerProcessor(function (ecModel, api) {
    //     ecModel.eachSeriesByType('scatter', function (seriesModel) {
    //         var data = seriesModel.getData();
    //         var coordSys = seriesModel.coordinateSystem;
    //         if (coordSys.type !== 'geo') {
    //             return;
    //         }
    //         var startPt = coordSys.pointToData([0, 0]);
    //         var endPt = coordSys.pointToData([api.getWidth(), api.getHeight()]);
    //         var dims = zrUtil.map(coordSys.dimensions, function (dim) {
    //             return data.mapDimension(dim);
    //         });
    //         var range = {};
    //         range[dims[0]] = [Math.min(startPt[0], endPt[0]), Math.max(startPt[0], endPt[0])];
    //         range[dims[1]] = [Math.min(startPt[1], endPt[1]), Math.max(startPt[1], endPt[1])];
    //         data.selectRange(range);
    //     });
    // });
})