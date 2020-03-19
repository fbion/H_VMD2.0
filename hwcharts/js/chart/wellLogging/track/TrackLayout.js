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
            var vgridStyle = nodeModel.get('itemStyle.grid.vertical');
            var nodeLayout = treeNode.getLayout();
            var bodyLayout = nodeLayout.body;
            var VthickData = [];
            var VthinData = [];
            var HthickData = [];
            var HthinData = [];
            var HmidData =[];
            var borderWidth = vgridStyle.borderWidth;
            if(!vgridStyle || vgridStyle.show === false || treeNode.hasTrack){

            }else{
                var axisType = nodeModel.get('scaleType');
                if(axisType == 'lin'){
                    for(var i = 1; i < vgridStyle.cols; i++) {
                        var intervalWidth = bodyLayout.width / vgridStyle.cols;
                        var xPos = numberUtil.niceForLine(intervalWidth * i, borderWidth);
                        if(i == Math.round(vgridStyle.cols / 2)){
                            VthickData.push([xPos,0,0]);
                            VthickData.push([xPos,bodyLayout.height]);
                        }
                        else{
                            VthinData.push([xPos,0,0]);
                            VthinData.push([xPos,bodyLayout.height]);
                        }
                    }
                }else if(axisType == 'log'){
                    var coordinateSystem = nodeModel.coordinateSystem;
                    var xAxis = coordinateSystem.getAxis('x');
                    var scale = xAxis.scale;
                    var extent = zrUtil.map(scale._extent, function(v){return Math.round(v)});
                    for(var i = extent[0]; i < extent[1]; i++){
                        var start = Math.pow(scale.base, i);
                        var end = Math.pow(scale.base, i + 1);
                        var interval = (end - start) / vgridStyle.cols;
                        for(var j = start; j < end;j += interval)
                        {
                            var xPos = numberUtil.niceForLine(xAxis.dataToCoord(j), borderWidth);
                            if(j == start){
                                if(i!=extent[0]){
                                    VthickData.push([xPos,0,0]);
                                    VthickData.push([xPos,bodyLayout.height]);
                                }
                            }
                            else{
                                VthinData.push([xPos,0,0]);
                                VthinData.push([xPos,bodyLayout.height]);
                            }

                        }
                    }
                }
            }

            //HGrid
            var hgridStyle = nodeModel.get('itemStyle.grid.horizontal');
            if(!hgridStyle || hgridStyle.show === false || treeNode.hasTrack){

            }else{
                var coordinateSystem = nodeModel.coordinateSystem;
                var yAxis = coordinateSystem.getAxis('y');
                var scaleExtent = yAxis.scale.getExtent();
                var start = Math.floor(scaleExtent[0]);
                var end = Math.ceil(scaleExtent[1]);
                function fitInterval(){
                    if(hgridStyle.interval == 'auto'){
                        var scale = yAxis.model.get('scale');
                        var thinInterval = parseInt(scale / 100);
                        return {
                            thinInterval: thinInterval,
                            middleInterval: thinInterval * 5,
                            thickInterval: thinInterval * 10
                        };
                    }
                    return {
                        thinInterval: zrUtil.retrieve2(hgridStyle.thin && hgridStyle.thin.interval, 1),
                        middleInterval: zrUtil.retrieve2(hgridStyle.thin && hgridStyle.thin.interval, hgridStyle.interval),
                        thickInterval: zrUtil.retrieve2(hgridStyle.thick && hgridStyle.thick.interval, hgridStyle.interval * 2)
                    }
                }
                var intervals = fitInterval();
                for(var i = start; i < end; i++){
                    if(i == start){
                        continue;
                    }
                    var yPos = numberUtil.niceForLine(yAxis.dataToCoord(i), borderWidth);
                    if(i % intervals.thickInterval == 0){
                        HthickData.push([0,yPos,0]);
                        HthickData.push([bodyLayout.width,yPos]);
                    }
                    else if(i % intervals.middleInterval == 0){
                        HmidData.push([0,yPos,0]);
                        HmidData.push([bodyLayout.width,yPos]);
                    }
                    else if(i % intervals.thinInterval == 0){
                        HthinData.push([0,yPos,0]);
                        HthinData.push([bodyLayout.width,yPos]);
                    }
                    else{
                        continue;
                    }
                }
            }


            return {VthickData:VthickData,VthinData:VthinData,HthickData:HthickData,HmidData:HmidData,HthinData:HthinData};
        }
    };
})