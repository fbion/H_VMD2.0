Vmd.define('hwchart.chart.Line', {
    requires: [
        'hwchart.chart.line.LineSeries',
        'hwchart.chart.line.LineView',
        'hwchart.chart.lines.linesLayout',
        'hwchart.chart.lines.linesVisual'
    ]

}, function (LineChart) {
    

    var linesLayout = hwchart.chart.lines.linesLayout;

    var linesVisual = hwchart.chart.lines.linesVisual;

    hwcharts.registerLayout(linesLayout);
    hwcharts.registerVisual(linesVisual);
})