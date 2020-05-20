Vmd.define('hwchart.extension.openlayers.OpenLayersView', {
    requires: []

}, function () {

    var _default = hwcharts.extendComponentView({
        type: 'openlayers',
        render: function (openLayersModel, ecModel, api) {
            var rendering = true;
            var openlayers = openLayersModel.getOpenLayers();
            var viewportRoot = api.getZr().painter.getViewportRoot();
            var coordSys = openLayersModel.coordinateSystem;

            var moveHandler = function (type, target) {
                if (rendering) {
                    return;
                }

                var offsetEl = viewportRoot.parentNode.parentNode.parentNode;
                var mapOffset = [-parseInt(offsetEl.style.left, 10) || 0, -parseInt(offsetEl.style.top, 10) || 0];
                viewportRoot.style.left = mapOffset[0] + 'px';
                viewportRoot.style.top = mapOffset[1] + 'px';
                coordSys.setMapOffset(mapOffset);
                openLayersModel.__mapOffset = mapOffset;
                api.dispatchAction({
                    type: 'openlayersRoam'
                });
            };

            function zoomEndHandler() {
                if (rendering) {
                    return;
                }

                api.dispatchAction({
                    type: 'openlayersRoam'
                });
            }

            openlayers.un('pointerdrag', this._oldMoveHandler);
            openlayers.un('moveend', this._oldZoomEndHandler);
            openlayers.on('pointerdrag', moveHandler);
            openlayers.on('moveend', zoomEndHandler);
            this._oldMoveHandler = moveHandler;
            this._oldZoomEndHandler = zoomEndHandler;
            var roam = openLayersModel.get('roam');

            // if (roam && roam !== 'scale') {
            //   openlayers.enableDragging();
            // } else {
            //   openlayers.disableDragging();
            // }
            //
            // if (roam && roam !== 'move') {
            //   openlayers.enableScrollWheelZoom();
            //   openlayers.enableDoubleClickZoom();
            //   openlayers.enablePinchToZoom();
            // } else {
            //   openlayers.disableScrollWheelZoom();
            //   openlayers.disableDoubleClickZoom();
            //   openlayers.disablePinchToZoom();
            // }
            /* map 2.0 */


            var originalStyle = openLayersModel.__mapStyle;
            var newMapStyle = openLayersModel.get('mapStyle') || {}; // FIXME, Not use JSON methods

            var mapStyleStr = JSON.stringify(newMapStyle);

            if (JSON.stringify(originalStyle) !== mapStyleStr) {
                // FIXME May have blank tile when dragging if setMapStyle
                if (Object.keys(newMapStyle).length) {
                    // openlayers.setMapStyle(newMapStyle);
                }

                openLayersModel.__mapStyle = JSON.parse(mapStyleStr);
            }
            /* map 3.0 */


            var originalStyle2 = openLayersModel.__mapStyle2;
            var newMapStyle2 = openLayersModel.get('mapStyleV2') || {}; // FIXME, Not use JSON methods

            var mapStyleStr2 = JSON.stringify(newMapStyle2);

            if (JSON.stringify(originalStyle2) !== mapStyleStr2) {
                // FIXME May have blank tile when dragging if setMapStyle
                if (Object.keys(newMapStyle2).length) {
                    openlayers.setMapStyleV2(newMapStyle2);
                }

                openLayersModel.__mapStyle2 = JSON.parse(mapStyleStr2);
            }

            rendering = false;
        }
    });

    hwchart.extension.openlayers.OpenLayersView = _default;
});