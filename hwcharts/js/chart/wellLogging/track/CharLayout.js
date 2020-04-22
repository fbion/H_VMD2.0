Vmd.define('hwchart.chart.wellLogging.track.CharLayout', {
    requires: [
        'hwchart.util.number'
    ]
}, function () {

    /**
     * 过滤min-max之外的数据
     * @param data
     * @param min
     * @param max
     * @returns {[]|*}
     */
    function filterDataByAxis(data, min, max){
        if(!data || data.length == 0) {
            return [];
        }

        var result = [];
        for(var i = 0; i < data.length; i++) {
            if((data[i].start < min && data[i].end < min) || (data[i].start > max && data[i].end > max)){
                continue;
            }
            result.push(data[i]);
        }

        return result;
    };

    hwchart.chart.wellLogging.track.CharLayout = {
        type: 'char',
        reset: function (treeNode) {

            var nodeModel = treeNode.getModel();
            var nodeLayout = treeNode.getLayout();
            var bodyLayout = nodeLayout.body;

            var coordinateSystem = nodeModel.coordinateSystem;
            var xAxis = coordinateSystem.getAxis('x');
            var yAxis = coordinateSystem.getAxis('y');

            var yAxisScaleExtent = yAxis.scale.getExtent();
            var data = filterDataByAxis(nodeModel.get('data'), yAxisScaleExtent[0], yAxisScaleExtent[1]);

            var points = [];
            var offset = 0;
            for(var i = 0; i < data.length; i++) {
                points[offset++] = yAxis.dataToCoord(data[i].start);
                points[offset++] = yAxis.dataToCoord(data[i].end);
                points[offset++] = data[i].text;
            }
            return {
                points: points
            }
        }
    };
})