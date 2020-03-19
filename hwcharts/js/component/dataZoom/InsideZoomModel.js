Vmd.define('hwchart.component.dataZoom.InsideZoomModel', {
    requires: ['hwchart.component.dataZoom.DataZoomModel']

}, function () {
    var DataZoomModel = hwchart.component.dataZoom.DataZoomModel;
    var _default = DataZoomModel.extend({
        type: 'dataZoom.inside',

        /**
         * @protected
         */
        defaultOption: {
            disabled: false,
            // Whether disable this inside zoom.
            zoomLock: false,
            // Whether disable zoom but only pan.
            zoomOnMouseWheel: true,
            // Can be: true / false / 'shift' / 'ctrl' / 'alt'.
            moveOnMouseMove: true,
            // Can be: true / false / 'shift' / 'ctrl' / 'alt'.
            moveOnMouseWheel: false,
            // Can be: true / false / 'shift' / 'ctrl' / 'alt'.
            preventDefaultMouseMove: true
        }
    });

    
    hwchart.component.dataZoom.InsideZoomModel = _default;
})