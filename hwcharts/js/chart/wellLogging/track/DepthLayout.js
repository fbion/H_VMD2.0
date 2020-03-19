Vmd.define('hwchart.chart.wellLogging.track.DepthLayout', {
    requires: [
        'hwchart.util.number'
    ]
}, function () {

    var numberUtil = hwchart.util.number;

    hwchart.chart.wellLogging.track.DepthLayout = {
        type: 'depth',
        reset: function (treeNode) {

            var nodeModel = treeNode.getModel();

            var xAxis = nodeModel.coordinateSystem.getAxis('x');
            var yAxis = nodeModel.coordinateSystem.getAxis('y');
            var right = xAxis._extent[1];
            var top = Math.floor(yAxis.scale._extent[0]);
            var bottom = Math.ceil(yAxis.scale._extent[1]);
            var tickdata1 = [];
            for(var i = top; i < bottom; i++){
                var y = numberUtil.niceForLine(yAxis.dataToCoord(i), 1);
                if(i % 10 == 0){
                    tickdata1.push([0,y,0]);
                    tickdata1.push([6,y]);
                    tickdata1.push([right - 6,y,0]);
                    tickdata1.push([right,y]);
                }
            }
            return {tickdata1:tickdata1}
        }
    };
})