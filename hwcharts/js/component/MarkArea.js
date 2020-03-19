Vmd.define('hwchart.component.MarkArea', {
    requires: [
        'hwchart.component.marker.MarkAreaModel',
        'hwchart.component.marker.MarkAreaView'
    ]

}, function () {

    

    hwcharts.registerPreprocessor(function (opt) {
        // Make sure markArea component is enabled
        opt.markArea = opt.markArea || {};
    });
})