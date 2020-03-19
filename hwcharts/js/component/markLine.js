Vmd.define('hwchart.component.MarkLine', {
    requires: [
        'hwchart.component.marker.MarkLineModel',
        'hwchart.component.marker.MarkLineView'
    ]

}, function () {

    

    hwcharts.registerPreprocessor(function (opt) {
        // Make sure markLine component is enabled
        opt.markLine = opt.markLine || {};
    });
})