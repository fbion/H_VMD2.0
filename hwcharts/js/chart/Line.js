Vmd.define('hwchart.chart.Line', {
    requires: [
        'hwchart.chart.line.LineSeries',
        'hwchart.chart.line.LineView',
        'hwchart.visual.symbol',
        'hwchart.layout.points',
        'hwchart.component.gridSimple',
        'hwchart.processor.dataSample'
    ]

}, function (LineChart) {
    



    var visualSymbol = hwchart.visual.symbol;

    var layoutPoints = hwchart.layout.points;

    var dataSample = hwchart.processor.dataSample;


   
    // In case developer forget to include grid component
    hwcharts.registerVisual(visualSymbol('line', 'circle', 'line'));
    hwcharts.registerLayout(layoutPoints('line')); // Down sample after filter

    hwcharts.registerProcessor(hwcharts.PRIORITY.PROCESSOR.STATISTIC, dataSample('line'));
})