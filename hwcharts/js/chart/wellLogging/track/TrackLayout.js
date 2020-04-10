Vmd.define('hwchart.chart.wellLogging.track.TrackLayout', {
    requires: [
        'hwchart.util.number'
    ]
}, function () {

    var numberUtil = hwchart.util.number;
    var zrUtil = zrender.util;

    hwchart.chart.wellLogging.track.TrackLayout = {
        type: 'track',
        reset: function (treeNode) {
            var nodeModel = treeNode.getModel();
            var vGridStyle = nodeModel.get('itemStyle.grid.vertical');
            var nodeLayout = treeNode.getLayout();
            var bodyLayout = nodeLayout.body;

            var vThickData = [];
            var vThinData = [];

            var hThickData = [];
            var hThinData = [];
            var hMidData =[];

            var thickOffset = 0;
            var midOffset = 0;
            var thinOffset = 0;

            var borderWidth = vGridStyle.borderWidth;
            if(!vGridStyle || vGridStyle.show === false || treeNode.hasTrack){

            } else {
                var axisType = nodeModel.get('scaleType');
                if(axisType == 'lin') {
                    for(var i = 1; i < vGridStyle.cols; i++) {
                        var intervalWidth = bodyLayout.width / vGridStyle.cols;
                        var xPos = numberUtil.niceForLine(intervalWidth * i, borderWidth);
                        if(i == Math.round(vGridStyle.cols / 2)){
                            vThickData[thickOffset++] = 2;
                            vThickData[thickOffset++] = xPos;
                            vThickData[thickOffset++] = 0;
                            vThickData[thickOffset++] = xPos;
                            vThickData[thickOffset++] = bodyLayout.height;
                        }
                        else{
                            vThinData[thinOffset++] = 2;
                            vThinData[thinOffset++] = xPos;
                            vThinData[thinOffset++] = 0;
                            vThinData[thinOffset++] = xPos;
                            vThinData[thinOffset++] = bodyLayout.height;
                        }
                    }
                } else if(axisType == 'log'){
                    var coordinateSystem = nodeModel.coordinateSystem;
                    var xAxis = coordinateSystem.getAxis('x');
                    var scale = xAxis.scale;
                    var extent = zrUtil.map(scale._extent, function(v){return Math.round(v)});
                    for(var i = extent[0]; i < extent[1]; i++){
                        var start = Math.pow(scale.base, i);
                        var end = Math.pow(scale.base, i + 1);
                        var interval = (end - start) / vGridStyle.cols;
                        for(var j = start; j < end;j += interval)
                        {
                            var xPos = numberUtil.niceForLine(xAxis.dataToCoord(j), borderWidth);
                            if(j == start){
                                if(i!=extent[0]){
                                    vThickData[thickOffset++] = 2;
                                    vThickData[thickOffset++] = xPos;
                                    vThickData[thickOffset++] = 0;
                                    vThickData[thickOffset++] = xPos;
                                    vThickData[thickOffset++] = bodyLayout.height;
                                }
                            }
                            else{
                                vThinData[thinOffset++] = 2;
                                vThinData[thinOffset++] = xPos;
                                vThinData[thinOffset++] = 0;
                                vThinData[thinOffset++] = xPos;
                                vThinData[thinOffset++] = bodyLayout.height;
                            }

                        }
                    }
                }
            }

            //HGrid

            thickOffset = 0;
            midOffset = 0;
            thinOffset = 0;

            var hGridStyle = nodeModel.get('itemStyle.grid.horizontal');
            if(!hGridStyle || hGridStyle.show === false || treeNode.hasTrack){

            } else {
                var coordinateSystem = nodeModel.coordinateSystem;
                var yAxis = coordinateSystem.getAxis('y');
                var scaleExtent = yAxis.scale.getExtent();
                var start = Math.floor(scaleExtent[0]);
                var end = Math.ceil(scaleExtent[1]);

                function fitInterval(){
                    if(hGridStyle.interval == 'auto'){
                        var scale = yAxis.model.get('scale');
                        var thinInterval = parseInt(scale / 100);
                        return {
                            thinInterval: thinInterval,
                            middleInterval: thinInterval * 5,
                            thickInterval: thinInterval * 10
                        };
                    }
                    return {
                        thinInterval: zrUtil.retrieve2(hGridStyle.thin && hGridStyle.thin.interval, 1),
                        middleInterval: zrUtil.retrieve2(hGridStyle.thin && hGridStyle.thin.interval, hGridStyle.interval),
                        thickInterval: zrUtil.retrieve2(hGridStyle.thick && hGridStyle.thick.interval, hGridStyle.interval * 2)
                    }
                }

                var intervals = fitInterval();
                for(var i = start; i < end; i++){
                    if(i == start){
                        continue;
                    }
                    var yPos = numberUtil.niceForLine(yAxis.dataToCoord(i), borderWidth);
                    if(i % intervals.thickInterval == 0) {
                        hThickData[thickOffset++] = 2;
                        hThickData[thickOffset++] = 0;
                        hThickData[thickOffset++] = yPos;
                        hThickData[thickOffset++] = bodyLayout.width;
                        hThickData[thickOffset++] = yPos;
                    }
                    else if(i % intervals.middleInterval == 0) {
                        hMidData[midOffset++] = 2;
                        hMidData[midOffset++] = 0;
                        hMidData[midOffset++] = yPos;
                        hMidData[midOffset++] = bodyLayout.width;
                        hMidData[midOffset++] = yPos;
                    }
                    else if (i % intervals.thinInterval == 0) {
                        hThinData[thinOffset++] = 2;
                        hThinData[thinOffset++] = 0;
                        hThinData[thinOffset++] = yPos;
                        hThinData[thinOffset++] = bodyLayout.width;
                        hThinData[thinOffset++] = yPos;
                    }
                    else{
                        continue;
                    }
                }
            }

            return {
                vThickData:vThickData,
                vThinData:vThinData,
                hThickData:hThickData,
                hMidData:hMidData,
                hThinData:hThinData};
        }
    };
})