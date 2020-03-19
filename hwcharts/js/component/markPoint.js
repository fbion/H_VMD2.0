Vmd.define('hwchart.component.MarkPoint', {
    requires: [
        'hwchart.component.marker.MarkPointModel',
        'hwchart.component.marker.MarkPointView'
    ]
},function(){
    hwcharts.registerPreprocessor(function (opt) {
        // Make sure markPoint component is enabled
        opt.markPoint = opt.markPoint || {};
    });
})