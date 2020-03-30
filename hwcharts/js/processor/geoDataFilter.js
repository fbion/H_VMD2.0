Vmd.define('hwchart.processor.geoDataFilter', {
    requires: []
}, function () {
    function _default(seriesType) {
        return {
            seriesType: seriesType,
            modifyOutputEnd: true,
            reset: function (seriesModel, ecModel, api) {
                var data = seriesModel.getRawData().cloneShallow();
                var data = seriesModel.getData();
                var coordSys = seriesModel.coordinateSystem; // Only cartesian2d support down sampling

                if (coordSys.type === 'geo') {
                    var leftTopVal = coordSys.pointToData([0, 0]);
                    var rightBottomVal = coordSys.pointToData([api.getWidth(), api.getHeight()]);

                    data.filterSelf(coordSys.dimensions, function(lng, lat, idx){
                        return lng > leftTopVal[0] && lng < rightBottomVal[0] && lat < leftTopVal[1] && lat > rightBottomVal[1]
                    });
                }
                // seriesModel.setData(data);
            }
        };
    }

    hwchart.processor.geoDataFilter = _default;
})