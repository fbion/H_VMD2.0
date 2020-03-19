Vmd.define('hwchart.component.visualMapPiecewise', {
    requires: [
        'hwchart.component.visualMap.preprocessor',
        'hwchart.component.visualMap.typeDefaulter',
        'hwchart.component.visualMap.visualEncoding',
        'hwchart.component.visualMap.PiecewiseModel',
        'hwchart.component.visualMap.PiecewiseView',
        'hwchart.component.visualMap.visualMapAction'
    ]
}, function () {
    hwcharts.registerPreprocessor(
        hwchart.component.visualMap.preprocessor
    );
})