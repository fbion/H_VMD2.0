Vmd.define('hwchart.chart.Map', {
    requires: [
        'hwchart.chart.map.MapSeries',
        'hwchart.chart.map.MapView',
        'hwchart.chart.map.mapSymbolLayout',
        'hwchart.chart.map.mapVisual',
        'hwchart.chart.map.mapDataStatistic',
        'hwchart.chart.map.backwardCompat',
        'hwchart.action.geoRoam',
        'hwchart.coord.geo.geoCreator',
        'hwchart.action.createDataSelectAction'
       

    ]

}, function () {

  

    var mapSymbolLayout = hwchart.chart.map.mapSymbolLayout;

    var mapVisual = hwchart.chart.map.mapVisual;

    var mapDataStatistic = hwchart.chart.map.mapDataStatistic;

    var backwardCompat = hwchart.chart.map.backwardCompat;

    var createDataSelectAction = hwchart.action.createDataSelectAction;

    hwcharts.registerLayout(mapSymbolLayout);
    hwcharts.registerVisual(mapVisual);
    hwcharts.registerProcessor(hwcharts.PRIORITY.PROCESSOR.STATISTIC, mapDataStatistic);
    hwcharts.registerPreprocessor(backwardCompat);
    createDataSelectAction('map', [{
        type: 'mapToggleSelect',
        event: 'mapselectchanged',
        method: 'toggleSelected'
    }, {
        type: 'mapSelect',
        event: 'mapselected',
        method: 'select'
    }, {
        type: 'mapUnSelect',
        event: 'mapunselected',
        method: 'unSelect'
    }]);
})