Vmd.define('hwchart.chart.EffectScatter', {
    requires: [
        'hwchart.chart.effectScatter.EffectScatterSeries',
        'hwchart.chart.effectScatter.EffectScatterView',
        'hwchart.visual.symbol',
        'hwchart.layout.points'
    ]


}, function () {
    var zrUtil = zrender.util;


    var visualSymbol = hwchart.visual.symbol;

    var layoutPoints = hwchart.layout.points;

   
    hwcharts.registerVisual(visualSymbol('effectScatter', 'circle'));
    hwcharts.registerLayout(layoutPoints('effectScatter'));
})
