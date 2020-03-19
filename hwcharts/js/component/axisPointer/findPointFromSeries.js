Vmd.define('hwchart.component.axisPointer.findPointFromSeries', {
    requires: [
       
        'hwchart.util.model'
        

    ]
}, function () {

    var zrUtil = zrender.util;

    var modelUtil = hwchart.util.model;

   
    /**
     * @param {Object} finder contains {seriesIndex, dataIndex, dataIndexInside}
     * @param {module:hwcharts/model/Global} ecModel
     * @return {Object} {point: [x, y], el: ...} point Will not be null.
     */
    function _default(finder, ecModel) {
        var point = [];
        var seriesIndex = finder.seriesIndex;
        var seriesModel;

        if (seriesIndex == null || !(seriesModel = ecModel.getSeriesByIndex(seriesIndex))) {
            return {
                point: []
            };
        }

        var data = seriesModel.getData();
        var dataIndex = modelUtil.queryDataIndex(data, finder);

        if (dataIndex == null || dataIndex < 0 || zrUtil.isArray(dataIndex)) {
            return {
                point: []
            };
        }

        var el = data.getItemGraphicEl(dataIndex);
        var coordSys = seriesModel.coordinateSystem;

        if (seriesModel.getTooltipPosition) {
            point = seriesModel.getTooltipPosition(dataIndex) || [];
        } else if (coordSys && coordSys.dataToPoint) {
            point = coordSys.dataToPoint(data.getValues(zrUtil.map(coordSys.dimensions, function (dim) {
                return data.mapDimension(dim);
            }), dataIndex, true)) || [];
        } else if (el) {
            // Use graphic bounding rect
            var rect = el.getBoundingRect().clone();
            rect.applyTransform(el.transform);
            point = [rect.x + rect.width / 2, rect.y + rect.height / 2];
        }

        return {
            point: point,
            el: el
        };
    }

  
    hwchart.component.axisPointer.findPointFromSeries = _default;
})