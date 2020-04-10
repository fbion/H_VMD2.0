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
            var nodeLayout = treeNode.getLayout();
            var bodyLayout = nodeLayout.body;

            var length = nodeModel.get("tick.length");
            var tickShow = nodeModel.get("tick.show");

            var coordinateSystem = nodeModel.coordinateSystem;
            var yAxis = coordinateSystem.getAxis('y');

            var scaleExtent = yAxis.scale.getExtent();
            var start = Math.floor(scaleExtent[0]);
            var end = Math.ceil(scaleExtent[1]);

            var mainTickData = [];
            var textData = [];

            var mainTickOffset = 0;
            var textOffset = 0;
            for(var i = start; i < end; i++){
                var y = numberUtil.niceForLine(yAxis.dataToCoord(i), 1);
                if(i % 10 == 0){
                    mainTickData[mainTickOffset++] = 2;
                    mainTickData[mainTickOffset++] = 0;
                    mainTickData[mainTickOffset++] = y;
                    mainTickData[mainTickOffset++] = length;
                    mainTickData[mainTickOffset++] = y;

                    mainTickData[mainTickOffset++] = 2;
                    mainTickData[mainTickOffset++] = bodyLayout.width - length;
                    mainTickData[mainTickOffset++] = y;
                    mainTickData[mainTickOffset++] = bodyLayout.width;
                    mainTickData[mainTickOffset++] = y;

                    textData[textOffset++] = i;
                    textData[textOffset++] = y;
                    textData[textOffset++] = bodyLayout.width;
                }
            }
            return {
                mainTickData: tickShow ? mainTickData : [],
                textData: textData
            }
        }
    };
})