Vmd.define('hwchart.component.dataZoom.SelectZoomView', {
    requires: [
        'hwchart.component.dataZoom.DataZoomView'
    ]

}, function () {
    var DataZoomView = hwchart.component.dataZoom.DataZoomView;
    var SelectZoomView = DataZoomView.extend({

        type: 'dataZoom.select'

    });

    hwchart.component.dataZoom.SelectZoomView = SelectZoomView;
})