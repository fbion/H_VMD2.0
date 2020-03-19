Vmd.define('hwchart.component.visualMapContinuous', {
    requires: [
        'hwchart.component.visualMap.preprocessor',
        'hwchart.component.visualMap.typeDefaulter',
        'hwchart.component.visualMap.visualEncoding',
        'hwchart.component.visualMap.ContinuousModel',
        'hwchart.component.visualMap.ContinuousView',
        'hwchart.component.visualMap.visualMapAction'
    ]
}, function () {
    hwcharts.registerPreprocessor(
        hwchart.component.visualMap.preprocessor
    );
})