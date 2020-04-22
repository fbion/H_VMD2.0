Vmd.define('hwchart.chart.WellLogging', {
    requires: [
        'hwchart.chart.wellLogging.WellLoggingSeries',
        'hwchart.chart.wellLogging.WellLoggingView',
        'hwchart.chart.wellLogging.wellLoggingAction',
        'hwchart.chart.wellLogging.wellLoggingVisual',
        'hwchart.chart.wellLogging.wellLoggingLayout',

        'hwchart.chart.wellLogging.track.TrackModel',
        'hwchart.chart.wellLogging.track.CurveModel',
        'hwchart.chart.wellLogging.track.DepthModel',
        'hwchart.chart.wellLogging.track.FillModel',

        'hwchart.chart.wellLogging.track.TrackView',
        'hwchart.chart.wellLogging.track.CurveView',
        'hwchart.chart.wellLogging.track.DepthView',
        'hwchart.chart.wellLogging.track.FillView',

        'hwchart.chart.wellLogging.track.CurveLayout',
        'hwchart.chart.wellLogging.track.DepthLayout',
        'hwchart.chart.wellLogging.track.TrackLayout',
        'hwchart.chart.wellLogging.track.FillLayout',

        'hwchart.chart.wellLogging.dataZoom.DataZoomModel',
        'hwchart.chart.wellLogging.dataZoom.DataZoomView',

        'hwchart.chart.wellLogging.dataZoom.dataZoomProcessor',
        'hwchart.chart.wellLogging.dataZoom.dataZoomAction'
    ]

}, function (wellLoggingChart) {

    hwcharts.registerVisual(hwchart.chart.wellLogging.wellLoggingVisual);

    hwcharts.registerLayout(hwcharts.PRIORITY.VISUAL.LAYOUT, hwchart.chart.wellLogging.wellLoggingLayout);

    hwcharts.registerWellLogLayout(hwchart.chart.wellLogging.track.TrackLayout);
    hwcharts.registerWellLogLayout(hwchart.chart.wellLogging.track.DepthLayout);
    hwcharts.registerWellLogLayout(hwchart.chart.wellLogging.track.CurveLayout);

})