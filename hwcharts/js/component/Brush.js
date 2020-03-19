Vmd.define('hwchart.component.Brush', {
    requires: [
        'hwchart.component.brush.visualEncoding',
        'hwchart.component.brush.BrushModel',
        'hwchart.component.brush.BrushView',
        'hwchart.component.brush.brushAction',
        'hwchart.component.toolbox.feature.Brush',
        'hwchart.component.brush.preprocessor'
    ]


}, function () {
    hwcharts.registerPreprocessor(
        hwchart.component.brush.preprocessor
    );
})