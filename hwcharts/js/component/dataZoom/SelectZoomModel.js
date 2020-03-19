Vmd.define('hwchart.component.dataZoom.SelectZoomModel', {
    requires: ['hwchart.component.dataZoom.DataZoomModel']

}, function () {
    var DataZoomModel = hwchart.component.dataZoom.DataZoomModel;
    var SelectZoomModel = DataZoomModel.extend({

        type: 'dataZoom.select'

    });
    hwchart.component.dataZoom.SelectZoomModel = SelectZoomModel;
})